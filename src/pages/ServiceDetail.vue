<template>
  <section class="service-detail container">
    <button class="back" @click="$router.push('/')">← Back</button>
    <div v-if="service">
      <h1>{{ service.title }}</h1>
      <img :src="service.img" alt="" class="detail-img" />
      <p class="price"><strong>Price range:</strong> {{ service.price }}</p>
      <p class="long">{{ service.long }}</p>
    </div>
    <div v-else>
      <p>Service not found.</p>
    </div>
  </section>
</template>

<script>
import services from '../data/services'
export default {
  props: ['id'],
  computed: {
    service() { return services.find(s => s.id === this.$route.params.id) }
  }
}
</script>
