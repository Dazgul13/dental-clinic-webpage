<template>
  <section id="services" class="services">
    <h2 class="section-title">Our Services</h2>
    <div class="cards">
      <router-link v-for="s in services" :key="s.id" :to="`/service/${s.id}`" class="card-link">
        <Card :img="s.img" :title="s.title" :desc="s.short" />
      </router-link>
    </div>
  </section>
</template>

<script>
import Card from './Card.vue'
import services from '../data/services'
export default { components: { Card }, data(){ return { services } } }
</script>
