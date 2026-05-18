<template>
  <header class="nav-wrapper" :class="{ scrolled }" role="banner">
    <nav class="navbar container" aria-label="Main navigation">
      <!-- Logo -->
      <a href="#" class="nav-logo" aria-label="Dental Care home" @click.prevent="scrollTop">
        <span class="logo-icon" aria-hidden="true">🦷</span>
        <span class="logo-text">DentalCare</span>
      </a>

      <!-- Desktop links -->
      <ul class="nav-links" role="list">
        <li><a href="#services" class="nav-link" @click.prevent="scrollTo('#services')">Services</a></li>
        <li><a href="#care-platform" class="nav-link" @click.prevent="scrollTo('#care-platform')">Treatments</a></li>
        <li><a href="#why" class="nav-link" @click.prevent="scrollTo('#why')">About</a></li>
        <li><a href="#contact" class="nav-link" @click.prevent="scrollTo('#contact')">Contact</a></li>
      </ul>

      <a href="#contact" class="btn btn-primary nav-cta" @click.prevent="scrollTo('#contact')">Book Appointment</a>

      <!-- Hamburger -->
      <button
        class="hamburger"
        :aria-expanded="mobileOpen.toString()"
        aria-label="Open navigation menu"
        aria-controls="mobile-menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </nav>
  </header>

  <!-- Mobile overlay -->
  <div
    class="mobile-menu"
    id="mobile-menu"
    :class="{ open: mobileOpen }"
    role="dialog"
    aria-modal="true"
    aria-label="Mobile navigation"
  >
    <button class="mobile-close" aria-label="Close navigation menu" @click="mobileOpen = false">✕</button>
    <ul class="mobile-nav-links" role="list">
      <li><a href="#services" class="mobile-nav-link" @click="mobileNav('#services')">Services</a></li>
      <li><a href="#care-platform" class="mobile-nav-link" @click="mobileNav('#care-platform')">Treatments</a></li>
      <li><a href="#why" class="mobile-nav-link" @click="mobileNav('#why')">About</a></li>
      <li><a href="#contact" class="mobile-nav-link" @click="mobileNav('#contact')">Contact</a></li>
    </ul>
    <a href="#contact" class="btn btn-primary mobile-cta" @click="mobileNav('#contact')">Book Appointment</a>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Navbar',
  setup() {
    const scrolled = ref(false)
    const mobileOpen = ref(false)

    function onScroll() {
      scrolled.value = window.scrollY > 80
    }

    function scrollTop(e) {
      e && e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function scrollTo(selector) {
      const el = document.querySelector(selector)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    function mobileNav(selector) {
      mobileOpen.value = false
      setTimeout(() => scrollTo(selector), 300)
    }

    onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
    onUnmounted(() => window.removeEventListener('scroll', onScroll))

    return { scrolled, mobileOpen, scrollTop, scrollTo, mobileNav }
  }
}
</script>
