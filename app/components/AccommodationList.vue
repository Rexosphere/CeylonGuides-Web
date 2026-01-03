<template>
  <div class="flex flex-col gap-6 p-6">
    <h3 class="text-lg font-bold text-neutral-dark dark:text-white">{{ accommodations.length }} Stays found in Sri Lanka</h3>
    <AccommodationCard 
      v-for="accommodation in accommodations" 
      :key="accommodation.id" 
      :accommodation="accommodation" 
    />
    <!-- Load More -->
    <div class="flex justify-center p-8">
      <button class="rounded-lg border border-neutral-light bg-white px-6 py-3 text-sm font-bold text-neutral-dark transition-colors hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
        Show More Stays
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccommodationCard from './AccommodationCard.vue'

const accommodations = [
  {
    id: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZM8OEZTlSaYTJTD9YvNLLltH6Mxj54Sb5lw_cVqEzuyNpfGdSNxxddht8ohKzjvP2IPHnlVDQnltv4e4klfJIYp7fuOvFMPkcxb9vTCeFIXoQrkwlfmZv5I6O0Zd_LLWeZfF04Jsso4HKY6exTlY3LVwL_oPrZT4NM50MkLd--k3Akh4EGnQQbp3-HBNpBAuNLWrZchKDWYzKyMygr3S7w0iQaDNawJ0oVOuszggCDYRY15Fj9QfMkQ-EOz5ayVg0vGYMkomK6ms',
    title: 'Galle Fort Heritage Villa',
    location: 'Galle Fort, Southern Province',
    type: 'Hotel',
    safetyScore: 9.8,
    isFavorite: true,
    amenities: [
      { icon: 'wifi', label: 'Free WiFi' },
      { icon: 'pool', label: 'Pool' }
    ],
    price: 120,
    rating: 4.8,
    reviews: 210
  },
  {
    id: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvUhDmYITqqTVj3tC7wxXxWTZCbpZfBv7XERfeAe3QQE1I5ckCmboRcCVJI4bYnHBGjso7bJJPXgY2H-BY55bIkkYzFLgO33pUq2rWokgmCdPTKDDUoZlifuG6oCma5Zjz54Bs8_bG7tRNZu-FDJ9TBJAIIIM_BLBZtGqBo-I_4RlR7OS19a8VjuUpRu1IFU0mTp9VLfacxU-ggqLwQ3r56TmI_zNed9zIQgTkeNDBMsmwPX188HpDNql2uscMBT_3Xee6yvd-NCU',
    title: 'Ella Jungle Retreat',
    location: 'Ella, Uva Province',
    type: 'Homestay',
    safetyScore: 10,
    isFavorite: false,
    amenities: [
      { icon: 'hiking', label: 'Guided Hikes' },
      { icon: 'restaurant', label: 'Breakfast' }
    ],
    price: 45,
    rating: 4.9,
    reviews: 56
  },
  {
    id: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtlR4cJV-CbhoW8ArDQvBbIKv-WUjRhQN91BlR5zjeL-XyQzolIDhdrlSfHVL1baz-HHGyHRcbvvukgYNy9dpDaKkCRtmWRXnLXg8HACnN-eRGig2vmGQiQDr-pDD_BlQBKkpkp9yok8yM1p6GwouGF109UxhE4gBDp8DT8fPX4YzuIyh6M6tBFt7E3k6x3-HgbN1jvBp9PT7Pbnz8GbkD7OH-RtsEVfN5r6GUycx7VMzGnXjfFfgv_hsBna6TGhU48-zWj6Iv2M0',
    title: 'Mirissa Ocean Villa',
    location: 'Mirissa, Southern Province',
    type: 'Villa',
    tag: 'Top Pick',
    safetyScore: 8.5,
    isFavorite: false,
    amenities: [
      { icon: 'ac_unit', label: 'AC' },
      { icon: 'pool', label: 'Private Pool' }
    ],
    price: 210,
    rating: 4.9,
    reviews: 112
  }
]
</script>
