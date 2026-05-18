<template>
  <div>
    <Banner />
    <Carousel />
    <PinnedServices />
    <PinnedTreatments />
    <WhyChoose />
    <Testimonials />
    <FAQ />
    <Contact />
    <FooterCTA />
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import Carousel from '../components/Carousel.vue'
import PinnedServices from '../components/PinnedServices.vue'
import PinnedTreatments from '../components/PinnedTreatments.vue'
import WhyChoose from '../components/WhyChoose.vue'
import Testimonials from '../components/Testimonials.vue'
import FAQ from '../components/FAQ.vue'
import Contact from '../components/Contact.vue'
import FooterCTA from '../components/FooterCTA.vue'

export default {
  name: 'Home',
  components: { Banner, Carousel, PinnedServices, PinnedTreatments, WhyChoose, Testimonials, FAQ, Contact, FooterCTA }
}
</script>
