<template>
  <section class="faq-section" id="faq" aria-labelledby="faq-heading">
    <div class="container">
      <div class="section-eyebrow fade-up">FAQ</div>
      <h2 class="section-heading fade-up" id="faq-heading">
        Common questions<br />answered
      </h2>

      <div class="accordion" ref="accordionRef">
        <div
          v-for="(f, i) in faqs"
          :key="i"
          class="accordion-item fade-up"
        >
          <button
            class="accordion-question"
            :aria-expanded="(open === i).toString()"
            @click="toggle(i)"
          >
            <span>{{ f.q }}</span>
            <span class="accordion-chev" aria-hidden="true">{{ open === i ? '−' : '+' }}</span>
          </button>
          <div class="accordion-answer" v-show="open === i">
            <p>{{ f.a }}</p>
          </div>
        </div>
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
  name: 'FAQ',
  setup() {
    const open = ref(null)
    const accordionRef = ref(null)

    const faqs = [
      { q: 'Do you accept new patients?', a: 'Yes — we warmly welcome new patients of all ages. You can book online or call us directly to schedule your first visit.' },
      { q: 'What insurance plans do you accept?', a: 'We accept most major dental insurance plans. We also offer in-house financing with 0% interest options for patients without insurance.' },
      { q: 'Do you offer emergency appointments?', a: 'Absolutely. We reserve same-day slots for dental emergencies every day. Call us first thing in the morning and we will fit you in.' },
      { q: 'How often should I get a dental check-up?', a: 'Most patients benefit from a check-up and clean every six months. Your dentist will recommend a personalised schedule based on your oral health.' },
      { q: 'Is teeth whitening safe?', a: 'Yes — professional whitening performed in our clinic is safe and effective. We use clinically tested products and monitor the process throughout.' }
    ]

    function toggle(i) {
      open.value = open.value === i ? null : i
    }

    onMounted(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      gsap.from('#faq .fade-up', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#faq',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return { faqs, open, toggle, accordionRef }
  }
}
</script>
