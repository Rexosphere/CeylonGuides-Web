<template>
  <div :id="`accommodation-${accommodation.id}`" @mouseenter="$emit('hover', accommodation.id)"
    @mouseleave="$emit('hover', null)" :class="{ 'ring-2 ring-primary': isHighlighted }"
    class="bg-white dark:bg-card-dark rounded-xl shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row h-auto md:h-52">
    <!-- Image Section -->
    <div class="w-full md:w-64 h-48 md:h-full relative shrink-0">
      <img :alt="accommodation.title" class="w-full h-full object-cover" :src="accommodation.image" />

      <!-- Top Rated Badge -->
      <div v-if="accommodation.rating >= 9.5"
        class="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
        Top Rated
      </div>

      <!-- Best Value Badge -->
      <div v-else-if="accommodation.price < 30"
        class="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
        Best Value
      </div>

      <!-- Type Badge -->
      <div
        class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-text-main text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
        {{ accommodation.type }}
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex-1 p-5 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start mb-1">
          <h3 class="text-lg font-bold text-text-main dark:text-white">{{ accommodation.title }}</h3>
          <button @click="toggleFavorite"
            :class="isFavorite(accommodation.id) ? 'text-accent-danger' : 'text-gray-300 hover:text-accent-danger'"
            class="transition-colors">
            <span class="material-symbols-outlined">favorite</span>
          </button>
        </div>

        <div class="flex items-center gap-1 text-text-muted text-xs mb-3">
          <span class="material-symbols-outlined text-sm">location_on</span>
          {{ accommodation.location }}
        </div>

        <!-- Badges -->
        <div class="flex flex-wrap gap-2 mb-3">
          <!-- Safety Badge -->
          <span v-if="accommodation.isSafetyCertified"
            class="bg-accent-info/10 text-accent-info border border-accent-info/20 px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
            <span class="material-symbols-outlined text-[10px] filled">verified_user</span>
            Safety Certified
          </span>

          <!-- Review-based Confidence -->
          <span v-else-if="accommodation.reviews > 500"
            class="bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
            <span class="material-symbols-outlined text-[10px] filled">reviews</span>
            Review-based Confidence
          </span>

          <!-- Amenities (show first 3) -->
          <span v-for="amenity in displayAmenities" :key="amenity.label"
            class="bg-gray-100 dark:bg-gray-700 text-text-muted px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
            <span class="material-symbols-outlined text-[10px]">{{ amenity.icon }}</span>
            {{ amenity.label }}
          </span>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-end border-t border-gray-100 dark:border-gray-700 pt-3">
        <div>
          <div class="text-[10px] text-text-muted uppercase mb-0.5">Starting from</div>
          <div class="flex items-baseline gap-1">
            <span class="text-xl font-bold text-primary dark:text-white">${{ accommodation.price }}</span>
            <span class="text-xs text-text-muted">/ night</span>
          </div>
        </div>

        <div class="flex flex-col items-end gap-2">
          <div class="flex items-center gap-1 text-xs">
            <span class="material-symbols-outlined text-sm filled text-yellow-500">star</span>
            <span class="font-bold text-text-main dark:text-white">{{ accommodation.rating.toFixed(1) }}</span>
            <span class="text-text-muted">({{ accommodation.reviews }} reviews)</span>
          </div>

          <div class="flex gap-2">
            <a @click.prevent="$emit('viewOnMap', accommodation.id)"
              class="text-xs font-semibold text-text-muted hover:text-primary flex items-center gap-1 cursor-pointer"
              href="#">
              <span class="material-symbols-outlined text-sm">map</span> Map
            </a>
            <a class="text-xs font-semibold text-primary hover:text-secondary flex items-center gap-1" href="#">
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAccommodationFavorites } from '~/composables/useAccommodationFavorites'
import type { Accommodation } from '~/types/api'

const props = defineProps<{
  accommodation: Accommodation
  isHighlighted?: boolean
}>()

defineEmits<{
  hover: [id: string | number | null]
  viewOnMap: [id: string | number]
}>()

const { isFavorite, toggleFavorite: toggle } = useAccommodationFavorites()

const displayAmenities = computed(() => {
  return (props.accommodation.amenities || []).slice(0, 3)
})

function toggleFavorite() {
  toggle(props.accommodation.id)
}
</script>
