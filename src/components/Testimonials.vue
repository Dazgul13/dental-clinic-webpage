<template>
  <section class="testimonials-section" id="testimonials" aria-labelledby="testimonials-heading">
    <div class="container">
      <div class="section-eyebrow fade-up">Patient Stories</div>
      <h2 class="section-heading fade-up" id="testimonials-heading">
        What our patients say
      </h2>
    </div>

    <!-- Carousel track -->
    <div
      class="testi-viewport"
      @mouseenter="pause"
      @mouseleave="resume"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div
        class="testi-track"
        ref="trackRef"
        :style="trackStyle"
      >
        <article
          v-for="(t, i) in extendedList"
          :key="i"
          class="testi-card"
          :aria-hidden="!isVisible(i)"
        >
          <div class="testi-card-top">
            <img :src="t.photo" :alt="`Photo of ${t.name}`" class="testi-avatar" loading="lazy" />
            <div class="testi-meta">
              <strong class="testi-name">{{ t.name }}</strong>
              <span class="testi-role">{{ t.role }}</span>
              <div class="testi-stars" aria-label="5 stars">
                <span v-for="s in 5" :key="s" aria-hidden="true">★</span>
              </div>
            </div>
          </div>
          <blockquote class="testi-quote">
            <p>{{ t.quote }}</p>
          </blockquote>
          <div class="testi-service">{{ t.service }}</div>
        </article>
      </div>

      <!-- Arrows -->
      <button class="testi-arrow testi-arrow--prev" @click="prev" aria-label="Previous review">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button class="testi-arrow testi-arrow--next" @click="next" aria-label="Next review">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>

    <!-- Dots -->
    <div class="testi-dots" role="tablist" aria-label="Testimonial navigation">
      <button
        v-for="(t, i) in testimonials"
        :key="i"
        class="testi-dot"
        :class="{ active: i === activeIndex }"
        role="tab"
        :aria-selected="(i === activeIndex).toString()"
        :aria-label="`Review by ${t.name}`"
        @click="goTo(i)"
      ></button>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'Testimonials',
  setup() {
    const testimonials = [
      {
        name: 'Sarah M.',
        role: 'Patient since 2021',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        quote: 'I used to dread going to the dentist, but this team completely changed that. The cleaning was painless and everyone made me feel so at ease. My smile has never looked better!',
        service: 'Teeth Cleaning'
      },
      {
        name: 'James T.',
        role: 'Patient since 2020',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        quote: 'Got my veneers done here and the results are absolutely stunning. The cosmetic team took the time to understand exactly what I wanted. Worth every penny.',
        service: 'Cosmetic Dentistry'
      },
      {
        name: 'Priya K.',
        role: 'Patient since 2022',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
        quote: 'My clear aligners were fitted perfectly and the whole process was explained step by step. Six months later and my teeth are straight — I couldn\'t be happier.',
        service: 'Orthodontics'
      },
      {
        name: 'David L.',
        role: 'Patient since 2019',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        quote: 'Had a dental emergency on a Saturday morning and they fit me in within the hour. The pain relief was immediate and the follow-up care was exceptional.',
        service: 'Emergency Care'
      },
      {
        name: 'Aisha R.',
        role: 'Patient since 2023',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        quote: 'My implant looks and feels completely natural. The procedure was far more comfortable than I expected and the healing was quick. Highly recommend.',
        service: 'Dental Implants'
      }
    ]

    const activeIndex = ref(0)
    const cardWidth   = ref(380)  // updated on mount
    const gap         = 24
    const isTransitioning = ref(false)
    let timer = null

    // Extend list with clones for seamless loop
    const extendedList = computed(() => [
      testimonials[testimonials.length - 1],
      ...testimonials,
      testimonials[0]
    ])

    // Offset: +1 because of leading clone
    const trackStyle = computed(() => ({
      transform: `translateX(-${(activeIndex.value + 1) * (cardWidth.value + gap)}px)`,
      transition: isTransitioning.value
        ? 'transform 500ms cubic-bezier(0.4,0,0.2,1)'
        : 'none'
    }))

    function isVisible(i) {
      return i === activeIndex.value + 1
    }

    function next() {
      if (isTransitioning.value) return
      isTransitioning.value = true
      activeIndex.value++

      if (activeIndex.value >= testimonials.length) {
        setTimeout(() => {
          isTransitioning.value = false
          activeIndex.value = 0
        }, 520)
      } else {
        setTimeout(() => { isTransitioning.value = false }, 520)
      }
    }

    function prev() {
      if (isTransitioning.value) return
      isTransitioning.value = true
      activeIndex.value--

      if (activeIndex.value < 0) {
        setTimeout(() => {
          isTransitioning.value = false
          activeIndex.value = testimonials.length - 1
        }, 520)
      } else {
        setTimeout(() => { isTransitioning.value = false }, 520)
      }
    }

    function goTo(i) {
      if (isTransitioning.value) return
      isTransitioning.value = true
      activeIndex.value = i
      setTimeout(() => { isTransitioning.value = false }, 520)
    }

    function pause() { clearInterval(timer) }
    function resume() { timer = setInterval(next, 5000) }

    let touchStartX = 0
    function onTouchStart(e) { touchStartX = e.changedTouches[0].clientX }
    function onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - touchStartX
      if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
    }

    onMounted(() => {
      // Measure actual card width
      const card = document.querySelector('.testi-card')
      if (card) cardWidth.value = card.offsetWidth

      window.addEventListener('resize', () => {
        const c = document.querySelector('.testi-card')
        if (c) cardWidth.value = c.offsetWidth
      })

      timer = setInterval(next, 5000)

      // Entrance animation
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced) {
        gsap.from('#testimonials .fade-up', {
          y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: '#testimonials', start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      }
    })

    onUnmounted(() => clearInterval(timer))

    return {
      testimonials, extendedList, activeIndex,
      trackStyle, isVisible,
      next, prev, goTo, pause, resume,
      onTouchStart, onTouchEnd
    }
  }
}
</script>
