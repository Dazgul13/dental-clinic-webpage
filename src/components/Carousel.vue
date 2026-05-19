<template>
  <section class="photo-carousel" aria-label="Clinic photo gallery">
    <div class="carousel-header container">
      <div class="section-eyebrow">Our Clinic</div>
      <h2 class="section-heading">A welcoming space<br />built for your comfort</h2>
    </div>

    <div class="carousel-stage">
      <!-- Image strip -->
      <div class="carousel-container" ref="containerRef">
        <div
          v-for="(slide, i) in slides"
          :key="slide.id"
          class="carousel-item"
          :class="{ active: i === activeIndex }"
        >
          <img :src="slide.src" :alt="slide.alt" :loading="i < 2 ? 'eager' : 'lazy'" />
        </div>
      </div>

      <!-- Controls -->
      <div class="carousel-controls">
        <button
          class="carousel-btn"
          id="carousel-prev"
          aria-label="Previous photo"
          :disabled="isAnimating"
          @click="prev"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Previous
        </button>
        <div class="carousel-counter" aria-live="polite" aria-atomic="true">
          <span class="counter-current">{{ activeIndex + 1 }}</span>
          <span class="counter-sep">/</span>
          <span class="counter-total">{{ slides.length }}</span>
        </div>
        <button
          class="carousel-btn carousel-btn--primary"
          id="carousel-next"
          aria-label="Next photo"
          :disabled="isAnimating"
          @click="next"
        >
          Next
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <!-- Dot indicators -->
      <div class="carousel-dots" role="tablist" aria-label="Photo indicators">
        <button
          v-for="(slide, i) in slides"
          :key="i"
          class="carousel-dot"
          :class="{ active: i === activeIndex }"
          role="tab"
          :aria-selected="(i === activeIndex).toString()"
          :aria-label="`Photo ${i + 1}: ${slide.caption}`"
          @click="goTo(i)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
gsap.registerPlugin(Flip)

export default {
  name: 'Carousel',
  setup() {
    const containerRef = ref(null)
    const isAnimating = ref(false)
    const activeIndex = ref(0)
    let autoTimer = null

    // ── Slides ─────────────────────────────────────────────────
    // To use your own photos: place files in /public/photos/ and
    // update src to e.g. '/photos/my-photo.jpg'
    const slides = [
      {
        id: 1,
        src: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=900&q=80',
        alt: 'Young woman with a bright white smile at the dentist',
        caption: 'Confident, radiant smiles'
      },
      {
        id: 2,
        src: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=900&q=80',
        alt: 'Dentist discussing treatment options with a patient',
        caption: 'Personalised consultations'
      },
      {
        id: 3,
        src: 'https://unsplash.com/photos/a-group-of-people-holding-a-white-object-in-their-hands-WFsNCIn8OF4',
        alt: 'Candid',
        caption: 'Advanced digital diagnostics'
      },
      {
        id: 4,
        src: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=900&q=80',
        alt: 'Modern dental treatment room',
        caption: 'Modern treatment rooms'
      },
      {
        id: 5,
        src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80',
        alt: 'Friendly dentist smiling with a patient',
        caption: 'A team that genuinely cares'
      }
    ]

    // ── Core Flip caterpillar animation ────────────────────────
    function updateCaterpillar(forward) {
      if (isAnimating.value || !containerRef.value) return
      isAnimating.value = true

      const items = Array.from(containerRef.value.children)
      // Capture current state before DOM change
      const state = Flip.getState(items)

      if (forward) {
        // Move first item to end
        containerRef.value.appendChild(items[0])
        activeIndex.value = (activeIndex.value + 1) % slides.length
      } else {
        // Move last item to front
        containerRef.value.prepend(items[items.length - 1])
        activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length
      }

      // Animate from old positions to new
      Flip.from(state, {
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: {
          amount: 0.12,
          from: forward ? 'start' : 'end'
        },
        onComplete: () => { isAnimating.value = false }
      })
    }

    function next() { updateCaterpillar(true) }
    function prev() { updateCaterpillar(false) }

    function goTo(targetIndex) {
      if (isAnimating.value) return
      const diff = targetIndex - activeIndex.value
      if (diff === 0) return
      // Step forward or backward the required number of times
      const steps = Math.abs(diff)
      const forward = diff > 0
      let count = 0
      const step = () => {
        if (count >= steps) return
        count++
        updateCaterpillar(forward)
        if (count < steps) setTimeout(step, 680)
      }
      step()
    }

    function startAuto() {
      autoTimer = setInterval(() => { if (!isAnimating.value) next() }, 4500)
    }
    function stopAuto() { clearInterval(autoTimer) }

    onMounted(() => {
      startAuto()
    })
    onUnmounted(() => { stopAuto() })

    return { containerRef, slides, isAnimating, activeIndex, next, prev, goTo }
  }
}
</script>
