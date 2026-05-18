<template>
  <CardDeck
    section-id="care-platform"
    eyebrow="Advanced Treatments"
    heading="Restore, protect and transform"
    sub="Our specialist team delivers advanced restorative and surgical treatments using the latest technology for lasting results."
    link-prefix="Learn about"
    :alt="true"
    :cards="cards"
  />
</template>

<script>
import CardDeck from './CardDeck.vue'

export default {
  name: 'PinnedTreatments',
  components: { CardDeck },
  setup() {
    const cards = [
      {
        id: 't1',
        title: 'Dental Implants',
        desc: 'Permanent, natural-looking tooth replacements anchored directly into the jawbone. Implants restore full chewing function and prevent bone loss — built to last a lifetime.',
        img: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <rect x="20" y="4" width="8" height="20" rx="4" fill="#fff" opacity="0.3" stroke="#fff" stroke-width="1.5"/>
          <rect x="14" y="28" width="20" height="16" rx="4" fill="#fff" opacity="0.2" stroke="#fff" stroke-width="1.5"/>
          <line x1="24" y1="24" x2="24" y2="28" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 't2',
        title: 'Root Canal Therapy',
        desc: 'Modern root canal treatment is comfortable and quick — saving infected teeth that would otherwise need extraction. Our gentle technique means most patients feel little to no discomfort.',
        img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <path d="M14 8C10 10 10 20 10 20C10 28 14 34 18 38C20 40 22 44 24 44C26 44 28 40 30 38C34 34 38 28 38 20C38 10 34 8 34 8C30 6 26 8 24 8C22 8 18 6 14 8Z" fill="#fff" opacity="0.15" stroke="#fff" stroke-width="1.5"/>
          <line x1="24" y1="16" x2="24" y2="36" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <line x1="20" y1="20" x2="28" y2="20" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 't3',
        title: 'Emergency Care',
        desc: 'Same-day appointments for dental emergencies — toothache, broken teeth, lost fillings, or swelling. We keep daily slots open so you are never left waiting when pain strikes.',
        img: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <circle cx="24" cy="24" r="18" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
          <line x1="24" y1="14" x2="24" y2="26" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
          <circle cx="24" cy="32" r="2.5" fill="#fff"/>
        </svg>`
      },
      {
        id: 't4',
        title: 'Teeth Whitening',
        desc: 'Professional in-chair whitening delivers results up to 8 shades brighter in a single session. Safe, fast, and long-lasting — far more effective than any over-the-counter product.',
        img: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <circle cx="24" cy="24" r="10" fill="#fff" opacity="0.2" stroke="#fff" stroke-width="1.5"/>
          <line x1="24" y1="6" x2="24" y2="12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <line x1="24" y1="36" x2="24" y2="42" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <line x1="6" y1="24" x2="12" y2="24" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <line x1="36" y1="24" x2="42" y2="24" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      {
        id: 't5',
        title: 'Dentures & Bridges',
        desc: 'Custom-fitted dentures and dental bridges that restore your smile, speech, and ability to eat comfortably. We use high-quality materials for a natural look and a secure, comfortable fit.',
        img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
        icon: `<svg viewBox="0 0 48 48" fill="none" width="28" height="28">
          <rect x="6" y="20" width="36" height="14" rx="7" fill="#fff" opacity="0.15" stroke="#fff" stroke-width="1.5"/>
          <rect x="12" y="14" width="8" height="10" rx="4" fill="#fff" opacity="0.5"/>
          <rect x="28" y="14" width="8" height="10" rx="4" fill="#fff" opacity="0.5"/>
          <line x1="20" y1="27" x2="28" y2="27" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
      }
    ]
    return { cards }
  }
}
</script>
