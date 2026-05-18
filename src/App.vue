<template>
  <div class="app">
    <Navbar />
    <main id="main-content">
      <router-view />
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import SiteFooter from './components/SiteFooter.vue'
import BackToTop from './components/BackToTop.vue'

export default {
  name: 'App',
  components: { Navbar, SiteFooter, BackToTop }
}
</script>
