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
    image: '/images/downloaded_eea297ee51ba.avif',
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
    image: '/images/downloaded_d3a4f75fb70f.avif',
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
    image: '/images/downloaded_7e6a29c0e4e2.avif',
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
