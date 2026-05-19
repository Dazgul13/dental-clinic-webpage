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

          <!-- Desktop: scroll hint. Mobile: prev/next buttons -->
          <p class="deck-scroll-hint fade-up" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" width="13" height="13">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
            Scroll to explore
          </p>

          <div class="deck-mobile-controls fade-up" aria-label="Card navigation">
            <button
              class="deck-mobile-btn"
              :disabled="activeStep === 0"
              aria-label="Previous card"
              @click="tryStep(activeStep - 1)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                   stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              class="deck-mobile-btn deck-mobile-btn--primary"
              :disabled="activeStep === cards.length - 1"
              aria-label="Next card"
              @click="tryStep(activeStep + 1)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                   stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- RIGHT: card stack -->
        <div class="deck-right">
          <div
            class="deck-slider"
            ref="sliderRef"
            @touchstart.passive="onTouchStart"
            @touchend.passive="onTouchEnd"
          >
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

    const deckOrder = ref([...props.cards].reverse())

    const COOLDOWN  = 650
    let lockedUntil = 0
    let currentStep = 0
    let pinST       = null

    // Touch tracking for swipe
    let touchStartX = 0
    let touchStartY = 0

    function stackStyle(i) {
      const total   = deckOrder.value.length
      const fromTop = total - 1 - i
      const offset  = 18
      return {
        left:   `${fromTop * offset}px`,
        top:    `${-fromTop * offset}px`,
        zIndex: i
      }
    }

    function goForward(toStep) {
      const slider = sliderRef.value
      if (!slider) return
      const topCard = slider.lastElementChild
      if (!topCard) return

      currentStep      = toStep
      activeStep.value = toStep

      gsap.to(topCard, {
        duration: 0.4,
        x: -60,
        y: 40,
        opacity: 0,
        ease: 'expo.in',
        onComplete() {
          gsap.set(topCard, { clearProps: 'x,y,opacity' })
          const arr = deckOrder.value
          deckOrder.value = [arr[arr.length - 1], ...arr.slice(0, -1)]
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

    function goBackward(toStep) {
      const slider = sliderRef.value
      if (!slider) return

      currentStep      = toStep
      activeStep.value = toStep

      const arr = deckOrder.value
      deckOrder.value = [...arr.slice(1), arr[0]]

      nextTick(() => {
        const newTop = slider.lastElementChild
        if (newTop) {
          gsap.fromTo(newTop,
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'expo.out' }
          )
        }
      })
    }

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

    // ── Touch / swipe handlers ─────────────────────────────────
    function onTouchStart(e) {
      touchStartX = e.changedTouches[0].clientX
      touchStartY = e.changedTouches[0].clientY
    }

    function onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - touchStartX
      const dy = e.changedTouches[0].clientY - touchStartY

      // Only trigger if horizontal swipe is dominant and long enough
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return

      if (dx < 0) {
        // Swipe left → next card
        tryStep(currentStep + 1)
      } else {
        // Swipe right → previous card
        tryStep(currentStep - 1)
      }
    }

    function scrollToContact() {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    onMounted(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced || !sectionRef.value) return

      gsap.from(sectionRef.value.querySelectorAll('.fade-up'), {
        y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // ── Desktop: GSAP pin + scroll-driven steps ────────────
      if (window.innerWidth > 767) {
        const N       = props.cards.length
        const perCard = 800
        const total   = N * perCard

        pinST = ScrollTrigger.create({
          trigger:    sectionRef.value,
          start:      'top top',
          end:        `+=${total}`,
          pin:        pinnedRef.value,
          pinSpacing: true,
          onUpdate(self) {
            const target = Math.min(
              Math.floor(self.progress * N),
              N - 1
            )
            tryStep(target)
          }
        })
      }
      // Mobile: swipe is handled by touch events on the slider
      // Prev/next buttons are shown via CSS (deck-mobile-controls)
    })

    onUnmounted(() => {
      if (pinST) pinST.kill()
    })

    return {
      sectionRef, pinnedRef, sliderRef,
      deckOrder, activeStep, cards: props.cards,
      stackStyle, scrollToContact,
      tryStep, onTouchStart, onTouchEnd
    }
  }
}
</script>
