<template>
  <section class="contact-section" id="contact" aria-labelledby="contact-heading">
    <div class="container">
      <div class="section-eyebrow fade-up">Get in Touch</div>
      <h2 class="section-heading fade-up" id="contact-heading">
        Book your appointment
      </h2>

      <div class="contact-grid">
        <!-- Form -->
        <div class="contact-form-wrap fade-up">
          <form class="contact-form" @submit.prevent="submit" novalidate>
            <label>
              Full Name
              <input v-model="form.name" type="text" placeholder="Jane Smith" required autocomplete="name" />
            </label>
            <label>
              Email Address
              <input v-model="form.email" type="email" placeholder="jane@example.com" required autocomplete="email" />
            </label>
            <label>
              Phone (optional)
              <input v-model="form.phone" type="tel" placeholder="(212) 555-0100" autocomplete="tel" />
            </label>
            <label>
              Service Needed
              <select v-model="form.service">
                <option value="">Select a service…</option>
                <option>Teeth Cleaning</option>
                <option>Cosmetic Dentistry</option>
                <option>Orthodontics</option>
                <option>Dental Implants</option>
                <option>Root Canal</option>
                <option>Emergency Care</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Message
              <textarea v-model="form.message" rows="4" placeholder="Tell us about your needs or preferred appointment time…"></textarea>
            </label>

            <!-- Math CAPTCHA -->
            <div class="captcha-wrap" role="group" aria-labelledby="captcha-label">
              <div class="captcha-box">
                <span id="captcha-label" class="captcha-label">Security check</span>
                <div class="captcha-question" aria-live="polite">
                  <span class="captcha-math">{{ captcha.a }} + {{ captcha.b }} = ?</span>
                  <button
                    type="button"
                    class="captcha-refresh"
                    aria-label="Get a new question"
                    @click="refreshCaptcha"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true">
                      <path d="M23 4v6h-6M1 20v-6h6"/>
                      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                    </svg>
                  </button>
                </div>
                <input
                  v-model="captchaAnswer"
                  type="number"
                  inputmode="numeric"
                  placeholder="Your answer"
                  class="captcha-input"
                  :class="{ 'captcha-error': captchaWrong }"
                  aria-describedby="captcha-error-msg"
                  autocomplete="off"
                />
                <p v-if="captchaWrong" id="captcha-error-msg" class="captcha-error-msg" role="alert">
                  ✕ Incorrect — please try again
                </p>
              </div>
            </div>

            <button class="btn btn-primary btn-lg" type="submit">Send Message</button>
            <p v-if="sent" class="form-success" role="alert">✓ Thanks! We'll be in touch within one business day.</p>
          </form>
        </div>

        <!-- Info + Map -->
        <div class="contact-info fade-up">
          <div class="contact-info-card">
            <h3 class="contact-info-heading">Clinic Hours</h3>
            <ul class="hours-list" role="list">
              <li><span>Monday – Friday</span><span>8:00 am – 6:00 pm</span></li>
              <li><span>Saturday</span><span>9:00 am – 3:00 pm</span></li>
              <li><span>Sunday</span><span>Closed</span></li>
            </ul>
          </div>

          <div class="contact-info-card">
            <h3 class="contact-info-heading">Find Us</h3>
            <address>
              123 Smile Street, Suite 4<br />
              New York, NY 10001
            </address>
            <a href="tel:+12125550100" class="contact-phone">📞 (212) 555-0100</a>
          </div>

          <div class="map-wrap" ref="mapEl" aria-label="Clinic location map"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import L from 'leaflet'
gsap.registerPlugin(ScrollTrigger)

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
  name: 'Contact',
  setup() {
    const mapEl        = ref(null)
    const sent         = ref(false)
    const captchaAnswer = ref('')
    const captchaWrong  = ref(false)
    const form = ref({ name: '', email: '', phone: '', service: '', message: '' })

    // Generate a simple addition question
    const captcha = ref({ a: randomInt(1, 12), b: randomInt(1, 12) })

    function refreshCaptcha() {
      captcha.value = { a: randomInt(1, 12), b: randomInt(1, 12) }
      captchaAnswer.value = ''
      captchaWrong.value  = false
    }

    function submit() {
      // Validate captcha
      const correct = captcha.value.a + captcha.value.b
      if (parseInt(captchaAnswer.value, 10) !== correct) {
        captchaWrong.value = true
        refreshCaptcha()
        return
      }

      captchaWrong.value = false
      sent.value = true
      setTimeout(() => (sent.value = false), 5000)
      form.value = { name: '', email: '', phone: '', service: '', message: '' }
      captchaAnswer.value = ''
      refreshCaptcha()
    }

    onMounted(() => {
      // Map
      const map = L.map(mapEl.value, { scrollWheelZoom: false }).setView([40.7128, -74.006], 14)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)
      L.marker([40.7128, -74.006]).addTo(map)
        .bindPopup('<strong>DentalCare Clinic</strong><br/>123 Smile Street').openPopup()

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      gsap.from('#contact .fade-up', {
        y: 28, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: {
          trigger: '#contact', start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return { mapEl, form, submit, sent, captcha, captchaAnswer, captchaWrong, refreshCaptcha }
  }
}
</script>
