<template>
  <div 
    :id="`accommodation-${accommodation.id}`" 
    class="group flex flex-col gap-4 overflow-hidden rounded-xl border border-neutral-light bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-white/5 sm:flex-row cursor-pointer"
    :class="{ 'ring-2 ring-primary ring-offset-2': isHighlighted }"
    @mouseenter="$emit('hover', accommodation.id)"
    @mouseleave="$emit('hover', null)"
  >
    <div class="relative h-48 w-full shrink-0 overflow-hidden rounded-lg sm:h-auto sm:w-48 bg-neutral-200">
      <img 
        :src="accommodation.image" 
        :alt="accommodation.title" 
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div v-if="accommodation.type" class="absolute right-2 top-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-dark backdrop-blur-sm">
        {{ formatType(accommodation.type) }}
      </div>
      <div v-if="accommodation.tag" class="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-[10px] font-bold text-white shadow-lg">
        {{ accommodation.tag }}
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-between">
      <div>
        <div class="flex items-start justify-between">
          <div>
            <h4 class="text-lg font-bold text-neutral-dark dark:text-white group-hover:text-primary">{{ accommodation.title }}</h4>
            <div class="mt-1 flex items-center gap-1 text-neutral-gray dark:text-neutral-400">
              <span class="material-symbols-outlined text-[14px]">location_on</span>
              <span class="text-xs">{{ accommodation.location }}</span>
            </div>
          </div>
          <button 
            class="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-red-500 dark:hover:bg-white/10 transition-colors"
            :class="{ 'text-red-500': isSaved }"
            @click.stop="toggleFavorite"
            :title="isSaved ? 'Remove from saved' : 'Save this stay'"
          >
            <span class="material-symbols-outlined text-[20px]" :class="{ 'fill-current': isSaved }">
              {{ isSaved ? 'favorite' : 'favorite_border' }}
            </span>
          </button>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <span 
            v-if="accommodation.isSafetyCertified" 
            class="inline-flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-300"
          >
            <span class="material-symbols-outlined text-[12px]">verified_user</span>
            Safety Certified
          </span>
          <span 
            v-else-if="accommodation.rating >= 4.5" 
            class="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          >
            <span class="material-symbols-outlined text-[12px]">stars</span>
            Review-based Confidence
          </span>
          <span 
            v-for="amenity in accommodation.amenities" 
            :key="amenity.label"
            class="inline-flex items-center gap-1 rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:bg-white/10 dark:text-neutral-300"
          >
            <span class="material-symbols-outlined text-[12px]">{{ amenity.icon }}</span> 
            {{ amenity.label }}
          </span>
        </div>
      </div>
      <div class="mt-4 flex items-end justify-between border-t border-neutral-light pt-3 dark:border-white/10">
        <div class="flex flex-col">
          <span class="text-xs text-neutral-gray dark:text-neutral-400">Starting from</span>
          <div class="flex items-baseline gap-1">
            <span class="text-xl font-bold text-neutral-dark dark:text-white">${{ accommodation.price }}</span>
            <span class="text-xs text-neutral-gray">/ night</span>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px] text-yellow-500 fill-current">star</span>
            <span class="text-xs font-bold text-neutral-dark dark:text-white">{{ accommodation.rating }}</span>
            <span class="text-xs text-neutral-gray">({{ accommodation.reviews }} reviews)</span>
          </div>
          <div class="flex items-center gap-2">
            <button 
              class="text-xs font-bold text-neutral-gray hover:text-primary flex items-center gap-1"
              @click.stop="$emit('viewOnMap', accommodation.id)"
              title="View on map"
            >
              <span class="material-symbols-outlined text-[14px]">map</span>
              Map
            </button>
            <button 
              class="text-sm font-bold text-primary hover:underline" 
              @click.stop="emit('view', accommodation.id)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAccommodationFavorites } from '~/composables/useAccommodationFavorites'

interface Amenity {
  icon: string
  label: string
}

interface Accommodation {
  id: string | number
  image: string
  title: string
  location: string
  type: string
  tag?: string
  isSafetyCertified?: boolean
  safetyScore?: number
  amenities: Amenity[]
  price: number
  rating: number
  reviews: number
  lat?: number
  lng?: number
}

const props = defineProps<{
  accommodation: Accommodation
  isHighlighted?: boolean
}>()

const emit = defineEmits<{
  (e: 'view', id: string | number): void
  (e: 'viewOnMap', id: string | number): void
  (e: 'hover', id: string | number | null): void
}>()

const { isFavorite, toggleFavorite: toggle } = useAccommodationFavorites()

const isSaved = computed(() => isFavorite(props.accommodation.id))

function toggleFavorite() {
  toggle(props.accommodation.id)
}

function formatType(type: string): string {
  return type.replace(/_/g, ' ')
}
</script>
