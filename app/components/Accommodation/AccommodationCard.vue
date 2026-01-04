<template>
  <div class="group flex flex-col gap-4 overflow-hidden rounded-xl border border-neutral-light bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-white/5 sm:flex-row">
    <div class="relative h-48 w-full shrink-0 overflow-hidden rounded-lg sm:h-auto sm:w-48 bg-neutral-200">
      <img 
        :src="accommodation.image" 
        :alt="accommodation.title" 
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div v-if="accommodation.type" class="absolute right-2 top-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-dark backdrop-blur-sm">
        {{ accommodation.type }}
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
          <button class="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-red-500 dark:hover:bg-white/10">
            <span class="material-symbols-outlined text-[20px]" :class="{ 'fill-current': accommodation.isFavorite }">favorite{{ accommodation.isFavorite ? '' : '_border' }}</span>
          </button>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <span 
            v-if="accommodation.safetyScore" 
            class="inline-flex items-center gap-1 rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-300"
          >
            <span class="material-symbols-outlined text-[12px]">verified_user</span>
            Safety {{ accommodation.safetyScore }}/10
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
        <div class="flex flex-col items-end gap-1">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px] text-yellow-500 fill-current">star</span>
            <span class="text-xs font-bold text-neutral-dark dark:text-white">{{ accommodation.rating }}</span>
            <span class="text-xs text-neutral-gray">({{ accommodation.reviews }} reviews)</span>
          </div>
          <button class="text-sm font-bold text-primary hover:underline">View Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  safetyScore?: number
  amenities: Amenity[]
  price: number
  rating: number
  reviews: number
  isFavorite?: boolean
}

defineProps<{
  accommodation: Accommodation
}>()
</script>
