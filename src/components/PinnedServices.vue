<template>
  <CardDeck
    section-id="services"
    eyebrow="Our Services"
    heading="Comprehensive care for every smile"
    sub="From your first check-up to a complete smile makeover, we offer the full spectrum of modern dental treatments."
    link-prefix="Book"
    :cards="cards"
  />
</template>

<script>
import CardDeck from './CardDeck.vue'

export default {
  name: 'PinnedServices',
  components: { CardDeck },
  setup() {
    const cards = [
      {
        id: 's1',
        title: 'Teeth Cleaning',
        desc: 'Professional scaling and polishing to remove plaque, tartar, and surface stains — keeping your gums healthy and your smile bright. Recommended every six months for optimal oral health.',
        img: 'https://images.unsplash.com/photo-1588776814546-1c4e4a4b31d8?auto=format&fit=crop&w=800&q=80',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <path d="M12 8C8 10 8 18 8 18C8 26 12 32 16 36C18 38 20 44 24 44C28 44 30 38 32 36C36 32 40 26 40 18C40 10 36 8 36 8C32 6 28 8 24 8C20 8 16 6 12 8Z" fill="#3b9eff" opacity="0.3" stroke="#3b9eff" stroke-width="1.5"/>
          <path d="M20 20L24 24L32 16" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
      },
      {
        id: 's2',
        title: 'Cosmetic Dentistry',
        desc: 'Veneers, teeth whitening, bonding, and full smile makeovers tailored to your goals. Our cosmetic team blends artistry with precision for results that look and feel completely natural.',
        img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <circle cx="24" cy="24" r="16" stroke="#fff" stroke-width="1.5" opacity="0.6"/>
          <path d="M16 24C16 28 19.6 32 24 32C28.4 32 32 28 32 24" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <circle cx="19" cy="20" r="2" fill="#fff" opacity="0.9"/>
          <circle cx="29" cy="20" r="2" fill="#fff" opacity="0.9"/>
        </svg>`
      },
      {
        id: 's3',
        title: 'Orthodontics',
        desc: 'Clear aligners and traditional braces for children, teens, and adults. We straighten teeth discreetly and comfortably, with flexible payment plans to suit every budget.',
        img: 'https://unsplash.com/photos/a-group-of-people-holding-a-white-object-in-their-hands-WFsNCIn8OF4',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <rect x="8" y="18" width="32" height="12" rx="6" fill="#fff" opacity="0.2" stroke="#fff" stroke-width="1.5"/>
          <circle cx="16" cy="24" r="3" fill="#fff" opacity="0.9"/>
          <circle cx="24" cy="24" r="3" fill="#fff" opacity="0.9"/>
          <circle cx="32" cy="24" r="3" fill="#fff" opacity="0.9"/>
        </svg>`
      },
      {
        id: 's4',
        title: 'Pediatric Dentistry',
        desc: 'Gentle, fun, and anxiety-free dental care designed specifically for children. We build positive habits early with check-ups, sealants, and fluoride treatments in a welcoming environment.',
        img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <circle cx="24" cy="20" r="10" stroke="#fff" stroke-width="1.5" opacity="0.6"/>
          <path d="M14 38C14 32 34 32 34 38" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/>
          <path d="M20 18C20 20 22 22 24 22C26 22 28 20 28 18" stroke="#fff" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        </svg>`
      },
      {
        id: 's5',
        title: 'Gum Disease Treatment',
        desc: 'Deep cleaning, scaling and root planing, and ongoing periodontal maintenance to halt gum disease in its tracks. Healthy gums are the foundation of a healthy smile.',
        img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <path d="M8 32C8 24 16 16 24 16C32 16 40 24 40 32" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.7"/>
          <path d="M16 32C16 28 20 24 24 24C28 24 32 28 32 32" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/>
          <circle cx="24" cy="34" r="3" fill="#fff" opacity="0.8"/>
        </svg>`
      }
    ]
    return { cards }
  }
}
</script>
