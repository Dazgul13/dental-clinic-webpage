<template>
  <section
    class="deck-section"
    :class="alt ? 'deck-section--alt' : ''"
    :id="sectionId"
    :aria-labelledby="`${sectionId}-heading`"
    ref="sectionRef"
  >
    <div class="deck-pinned" ref="pinnedRef">
      <div class="deck-inner container">

        <!-- LEFT: info panel -->
        <div class="deck-left">
          <div class="section-eyebrow fade-up">{{ eyebrow }}</div>
          <h2 class="section-heading fade-up" :id="`${sectionId}-heading`">{{ heading }}</h2>
          <p class="section-sub fade-up">{{ sub }}</p>

          <transition name="deck-fade" mode="out-in">
            <div class="deck-info" :key="activeStep">
              <div class="deck-info-icon" aria-hidden="true" v-html="cards[activeStep].icon"></div>
              <h3 class="deck-info-title">{{ cards[activeStep].title }}</h3>
              <p class="deck-info-desc">{{ cards[activeStep].desc }}</p>
              <a href="#contact" class="card-link" @click.prevent="scrollToContact">
                {{ linkPrefix }} {{ cards[activeStep].title }}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </transition>

          <div class="deck-counter fade-up" aria-live="polite">
            <span class="deck-counter-num">{{ String(activeStep + 1).padStart(2, '0') }}</span>
            <span class="deck-counter-sep"> / {{ String(cards.length).padStart(2, '0') }}</span>
          </div>

          <p class="deck-scroll-hint fade-up" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" width="13" height="13">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
            Scroll to explore
          </p>
        </div>

        <!-- RIGHT: card stack -->
        <div class="deck-right">
          <div class="deck-slider" ref="sliderRef">
            <!--
              deckOrder[0]      = bottom of visual stack (most offset, lowest z)
              deckOrder[last]   = top of visual stack    (no offset, highest z)
              stackStyle(i) positions each card by its index in deckOrder
            -->
            <div
              v-for="(card, i) in deckOrder"
              :key="card.id"
              class="deck-item"
              :style="stackStyle(i)"
            >
              <img :src="card.img" :alt="card.title" loading="lazy" />
            </div>
          </div>

          <div class="deck-pips" aria-hidden="true">
            <span
              v-for="(_, i) in cards"
              :key="i"
              class="deck-pip"
              :class="{ active: i === activeStep }"
            ></span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'CardDeck',
  props: {
    sectionId:  { type: String, required: true },
    eyebrow:    { type: String, required: true },
    heading:    { type: String, required: true },
    sub:        { type: String, required: true },
    linkPrefix: { type: String, default: 'Book' },
    alt:        { type: Boolean, default: false },
    cards:      { type: Array, required: true }
  },
  setup(props) {
    const sectionRef = ref(null)
    const pinnedRef  = ref(null)
    const sliderRef  = ref(null)
    const activeStep = ref(0)

    // deckOrder: index 0 = bottom of stack, last = top/front card
    // We rotate this array — never remove elements — so Vue keeps all cards mounted
    const deckOrder = ref([...props.cards].reverse())

    // Cooldown prevents double-firing from rapid scroll ticks
    const COOLDOWN = 700   // ms — must be > animation duration (500ms)
    let lockedUntil = 0
    let currentStep = 0
    let pinST       = null

    // Each card's CSS position in the stack based on its index in deckOrder
    function stackStyle(i) {
      const total   = deckOrder.value.length
      const fromTop = total - 1 - i   // 0 = top card
      const offset  = 18
      return {
        left:   `${fromTop * offset}px`,
        top:    `${-fromTop * offset}px`,
        zIndex: i
      }
    }

    // ── Scroll DOWN: top card flies off, next card rises ───────
    function goForward(toStep) {
      const slider = sliderRef.value
      if (!slider) return

      // The top card is the last DOM child (highest z-index)
      const topCard = slider.lastElementChild
      if (!topCard) return

      currentStep      = toStep
      activeStep.value = toStep

      // 1. Fly the current top card off screen
      gsap.to(topCard, {
        duration: 0.45,
        x: -60,
        y: 40,
        opacity: 0,
        ease: 'expo.in',
        onComplete() {
          // 2. Reset its transform so it looks normal when it's at the bottom
          gsap.set(topCard, { clearProps: 'x,y,opacity' })

          // 3. Rotate deckOrder: move last item to front (it becomes the new bottom)
          const arr = deckOrder.value
          deckOrder.value = [arr[arr.length - 1], ...arr.slice(0, -1)]

          // 4. Animate the new top card rising in
          nextTick(() => {
            const newTop = slider.lastElementChild
            if (newTop) {
              gsap.fromTo(newTop,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: 'expo.out' }
              )
            }
          })
        }
      })
    }

    // ── Scroll UP: previous card comes back to top ─────────────
    function goBackward(toStep) {
      const slider = sliderRef.value
      if (!slider) return

      currentStep      = toStep
      activeStep.value = toStep

      // 1. Rotate deckOrder backward: move first item to end (it becomes new top)
      const arr = deckOrder.value
      deckOrder.value = [...arr.slice(1), arr[0]]

      // 2. Animate the restored top card dropping in from above
      nextTick(() => {
        const newTop = slider.lastElementChild
        if (newTop) {
          gsap.fromTo(newTop,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'expo.out' }
          )
        }
      })
    }

    // Called by ScrollTrigger — only acts if cooldown has expired
    function tryStep(targetStep) {
      if (Date.now() < lockedUntil) return
      if (targetStep === currentStep) return
      if (targetStep < 0 || targetStep >= props.cards.length) return

      lockedUntil = Date.now() + COOLDOWN

      if (targetStep > currentStep) {
        goForward(targetStep)
      } else {
        goBackward(targetStep)
      }
    }

    function scrollToContact() {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    onMounted(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced || !sectionRef.value) return

      // Entrance fade-up for text elements
      gsap.from(sectionRef.value.querySelectorAll('.fade-up'), {
        y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // No pinning on mobile — cards just stack visually
      if (window.innerWidth <= 767) return

      const N       = props.cards.length
      const perCard = 800   // px of scroll per card step
      const total   = N * perCard

      // Pin the inner layout while the section scrolls
      // onUpdate maps scroll progress → card step
      pinST = ScrollTrigger.create({
        trigger:    sectionRef.value,
        start:      'top top',
        end:        `+=${total}`,
        pin:        pinnedRef.value,
        pinSpacing: true,
        onUpdate(self) {
          // progress 0→1 maps to steps 0→(N-1)
          // Zone 0: 0.00 → 1/N  (card 1, no flip needed)
          // Zone 1: 1/N  → 2/N  (flip to card 2)
          // Zone 2: 2/N  → 3/N  (flip to card 3)  etc.
          const target = Math.min(
            Math.floor(self.progress * N),
            N - 1
          )
          tryStep(target)
        }
      })
    })

    onUnmounted(() => {
      if (pinST) pinST.kill()
    })

    return {
      sectionRef, pinnedRef, sliderRef,
      deckOrder, activeStep, cards: props.cards,
      stackStyle, scrollToContact
    }
  }
}
</script>
