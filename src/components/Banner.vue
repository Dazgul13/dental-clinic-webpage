<template>
  <section class="hero" id="hero" aria-labelledby="hero-heading">
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-gradient"></div>
      <div class="hero-pattern"></div>
    </div>

    <div class="hero-content container">
      <div class="hero-badge animate-hero">
        <span class="badge-dot" aria-hidden="true"></span>
        <span>Accepting new patients</span>
      </div>

      <h1 class="hero-headline animate-hero" id="hero-heading">
        Bright Smiles,<br />
        <em class="hero-headline-em">Healthy Lives</em>
      </h1>

      <p class="hero-sub animate-hero">
        Comprehensive dental care with a gentle touch — from routine cleanings to full smile transformations, all under one roof.
      </p>

      <div class="hero-ctas animate-hero">
        <a href="#contact" class="btn btn-primary btn-lg" @click.prevent="scrollTo('#contact')">Book Appointment</a>
        <a href="#services" class="btn btn-ghost btn-lg" @click.prevent="scrollTo('#services')">Our Services</a>
      </div>

      <div class="hero-trust animate-hero">
        <div class="trust-item">
          <span class="trust-num">2,400+</span>
          <span class="trust-label">Happy patients</span>
        </div>
        <div class="trust-divider" aria-hidden="true"></div>
        <div class="trust-item">
          <span class="trust-num">15+</span>
          <span class="trust-label">Years of care</span>
        </div>
        <div class="trust-divider" aria-hidden="true"></div>
        <div class="trust-item">
          <span class="trust-num">4.9★</span>
          <span class="trust-label">Patient rating</span>
        </div>
      </div>
    </div>

    <div class="hero-scroll-hint animate-hero" aria-hidden="true">
      <div class="scroll-line"></div>
      <span>Scroll</span>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'Banner',
  setup() {
    function scrollTo(selector) {
      const el = document.querySelector(selector)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    onMounted(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        document.querySelectorAll('.animate-hero').forEach(el => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
        return
      }
      gsap.from(document.querySelectorAll('.animate-hero'), {
        y: 32, opacity: 0, duration: 0.8,
        ease: 'power2.out', stagger: 0.15, delay: 0.2
      })
    })

    return { scrollTo }
  }
}
</script>
