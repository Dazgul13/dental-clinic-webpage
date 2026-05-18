<template>
  <section class="footer-cta" id="footer-cta" aria-labelledby="footer-cta-heading">
    <div class="footer-cta-bg" aria-hidden="true"></div>
    <div class="container footer-cta-content">
      <h2 class="footer-cta-headline" id="footer-cta-heading">
        Your smile is more<br />important than ever
      </h2>
      <p class="footer-cta-sub fade-up">
        Join thousands of patients who trust us with their dental health.
      </p>
      <a
        href="#contact"
        class="btn btn-primary btn-lg footer-cta-btn fade-up"
        @click.prevent="scrollTo('#contact')"
      >
        Book your appointment
      </a>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'FooterCTA',
  setup() {
    function scrollTo(selector) {
      const el = document.querySelector(selector)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    onMounted(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      gsap.from('.footer-cta-headline', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-cta',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from('.footer-cta .fade-up', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.footer-cta',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return { scrollTo }
  }
}
</script>
