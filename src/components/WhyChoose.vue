<template>
  <section class="why-section" id="why" aria-labelledby="why-heading">
    <div class="container">
      <div class="why-header">
        <div class="section-eyebrow fade-up">Why Choose Us</div>
        <h2 class="section-heading fade-up" id="why-heading">
          Care you can trust,<br />results you can see
        </h2>
      </div>

      <ul class="why-list" role="list">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="why-item fade-up"
          role="listitem"
          ref="itemRefs"
        >
          <article>
            <div class="why-item-top">
              <span class="why-tag">{{ item.tag }}</span>
              <span class="why-icon" aria-hidden="true">{{ item.icon }}</span>
            </div>
            <h3 class="why-title">{{ item.title }}</h3>
            <p class="why-desc">{{ item.desc }}</p>
          </article>
        </li>
      </ul>

      <div class="why-footer fade-up">
        <a href="#contact" class="btn btn-outline" @click.prevent="scrollTo('#contact')">
          Meet our team <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'WhyChoose',
  setup() {
    const itemRefs = ref([])

    const items = [
      {
        tag: 'Experience',
        icon: '🏆',
        title: 'Certified & Experienced Team',
        desc: 'Our dentists hold advanced certifications and bring over 15 years of combined clinical experience across general, cosmetic, and specialist dentistry.'
      },
      {
        tag: 'Technology',
        icon: '⚙️',
        title: 'State-of-the-Art Equipment',
        desc: 'Digital X-rays, 3D scanning, and laser dentistry mean faster diagnoses, less discomfort, and more precise treatments than traditional methods.'
      },
      {
        tag: 'Patient Care',
        icon: '🤝',
        title: 'Comfort-First Approach',
        desc: 'We take time to listen, explain every step, and offer sedation options for anxious patients — because your comfort is as important as your oral health.'
      },
      {
        tag: 'Accessibility',
        icon: '💳',
        title: 'Flexible Payment Plans',
        desc: 'We accept all major insurance plans and offer in-house financing with 0% interest options, so cost is never a barrier to the care you deserve.'
      }
    ]

    function scrollTo(selector) {
      const el = document.querySelector(selector)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    onMounted(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      const fadeEls = document.querySelectorAll('#why .fade-up')
      gsap.from(fadeEls, {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#why',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return { items, itemRefs, scrollTo }
  }
}
</script>
