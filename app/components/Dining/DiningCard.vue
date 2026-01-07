<template>
  <div 
    class="group flex flex-col gap-4 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm ring-1 ring-slate-100 dark:ring-gray-700 transition-all hover:shadow-md md:flex-row md:items-stretch cursor-pointer"
    @click="$emit('click')"
    :class="{ 'ring-2 ring-primary': isSelected }"
  >
    <div class="h-56 w-full shrink-0 overflow-hidden rounded-xl md:h-auto md:w-64">
      <div 
        class="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
        :style="`background-image: url('${restaurant.image}');`"
      >
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-between py-2">
      <div>
        <div class="mb-2 flex items-start justify-between gap-2">
          <h3 class="text-xl font-bold text-dark-charcoal dark:text-white">{{ restaurant.name }}</h3>
          <span 
            :class="[
              'flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold',
              certificationColor.bg,
              certificationColor.text
            ]"
          >
            <span class="material-symbols-outlined text-[14px]">{{ certificationIcon }}</span>
            {{ certificationLabel }}
          </span>
        </div>
        
        <!-- Hygiene Rating -->
        <div class="mb-3 flex items-center gap-1">
          <template v-for="i in restaurant.hygieneScore" :key="i">
            <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
          </template>
          <template v-for="i in (5 - restaurant.hygieneScore)" :key="'empty-' + i">
            <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[20px]">local_florist</span>
          </template>
          <span class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">({{ restaurant.hygieneScore }}/5 Hygiene)</span>
        </div>
        
        <!-- Location -->
        <div class="mb-2 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          <span class="material-symbols-outlined text-[16px]">location_on</span>
          {{ restaurant.area || restaurant.city }}
          <!-- Distance indicator -->
          <span v-if="distance" class="ml-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
            <span class="material-symbols-outlined text-[14px]">near_me</span>
            {{ distance }}
          </span>
          <!-- Geocoding status indicator -->
          <template v-else-if="!restaurant.coordinates">
            <span v-if="geocodingStatus === 'locating'" class="ml-2 flex items-center gap-1 text-xs text-amber-500">
              <span class="material-symbols-outlined text-[14px] animate-spin">sync</span>
              Locating…
            </span>
            <span v-else-if="geocodingStatus === 'not_found'" class="ml-2 flex items-center gap-1 text-xs text-slate-400">
              <span class="material-symbols-outlined text-[14px]">location_off</span>
              Not on map
            </span>
          </template>
        </div>
        
        <!-- Description -->
        <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {{ restaurant.description }}
        </p>
        
        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in displayTags" 
            :key="tag"
            class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button 
          @click.stop="$emit('view-details')"
          class="group/btn flex items-center gap-1 text-sm font-bold text-deep-teal dark:text-primary hover:text-primary transition-colors"
        >
          View Details
          <span class="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Restaurant, CertificationType } from '~/data/dining'

const props = defineProps<{
  restaurant: Restaurant
  isSelected?: boolean
  geocodingStatus?: 'locating' | 'found' | 'not_found' | 'error' | null
  distance?: string
}>()

defineEmits<{
  (e: 'click'): void
  (e: 'view-details'): void
}>()

const certificationLabel = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure': return 'Safe & Secure'
    case 'TouristFriendlyGradeA': return 'Grade A'
    case 'TouristFriendlyGradeB': return 'Grade B'
    default: return 'Certified'
  }
})

const certificationIcon = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure': return 'verified_user'
    case 'TouristFriendlyGradeA': return 'check_circle'
    case 'TouristFriendlyGradeB': return 'verified'
    default: return 'info'
  }
})

const certificationColor = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure':
      return { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-300' }
    case 'TouristFriendlyGradeA':
      return { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300' }
    case 'TouristFriendlyGradeB':
      return { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-300' }
    default:
      return { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400' }
  }
})

const displayTags = computed(() => {
  return props.restaurant.tags.slice(0, 4)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
