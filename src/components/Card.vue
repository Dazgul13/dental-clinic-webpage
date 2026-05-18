<template>
  <article ref="root" class="card">
    <img :src="img" :alt="title" class="card-img" />
    <div class="card-body">
      <h3>{{ title }}</h3>
      <p>{{ desc }}</p>
    </div>
  </article>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  props: {
    img: String,
    title: String,
    desc: String
  },
  setup() {
    const root = ref(null)
    let anim = null

    onMounted(() => {
      if (!root.value) return
      anim = gsap.from(root.value, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root.value,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    onBeforeUnmount(() => {
      if (anim) {
        if (anim.scrollTrigger) anim.scrollTrigger.kill()
        anim.kill()
      }
    })

    return { root }
  }
}
</script>
