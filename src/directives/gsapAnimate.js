import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  mounted(el, binding) {
    // allow custom options via value: { start, stagger, distance, duration, mode }
    const opts = Object.assign({ start: 'top 85%', stagger: 0.12, distance: 30, duration: 0.7, ease: 'power2.out', mode: 'default' }, binding.value || {})

    // If page mode, animate immediate children (sections) with a stagger
    let targets
    if (opts.mode === 'page') {
      targets = el.children && el.children.length ? Array.from(el.children) : [el]
    } else {
      // choose targets: multiple .card or direct child elements, else the element itself
      targets = el.querySelectorAll('.card')
      if (!targets || targets.length === 0) {
        targets = el.children && el.children.length ? el.children : [el]
      }
      targets = Array.from(targets)
    }

    // create animation
    try {
      const tl = gsap.from(targets, {
        y: opts.distance,
        opacity: 0,
        duration: opts.duration,
        ease: opts.ease,
        stagger: targets.length > 1 ? opts.stagger : 0,
        scrollTrigger: {
          trigger: el,
          start: opts.start,
          toggleActions: 'play none none reverse'
        }
      })

      // store refs for cleanup
      el.__gsapAnim = tl
    } catch (e) {
      // fail silently
      console.warn('GSAP animate directive error', e)
    }
  },
  unmounted(el) {
    if (el.__gsapAnim) {
      if (el.__gsapAnim.scrollTrigger) el.__gsapAnim.scrollTrigger.kill()
      el.__gsapAnim.kill()
      delete el.__gsapAnim
    }
  }
}
