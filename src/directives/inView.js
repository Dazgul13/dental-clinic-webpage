export default {
  mounted(el, binding) {
    const opts = { threshold: 0.12 }
    const cb = (entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add('in-view')
          if (binding.value && binding.value.once) obs.unobserve(el)
        }
      })
    }
    const io = new IntersectionObserver(cb, opts)
    io.observe(el)
    el.__io = io
  },
  unmounted(el) {
    if (el.__io) el.__io.disconnect()
  }
}
