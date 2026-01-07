<template>
  <div 
    :class="[
      'group relative flex flex-col sm:flex-row gap-4 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm border-2 transition-all cursor-pointer hover:shadow-md',
      isSelected 
        ? 'border-primary ring-2 ring-primary/20' 
        : 'border-transparent hover:border-slate-200 dark:hover:border-gray-600'
    ]"
    @click="$emit('click')"
  >
    <!-- Icon/Badge Area -->
    <div class="flex-shrink-0">
      <div 
        :class="[
          'w-16 h-16 rounded-xl flex items-center justify-center',
          restroom.fees.isFree 
            ? 'bg-emerald-100 dark:bg-emerald-900/30' 
            : 'bg-amber-100 dark:bg-amber-900/30'
        ]"
      >
        <span 
          :class="[
            'material-symbols-outlined text-3xl',
            restroom.fees.isFree ? 'text-emerald-600' : 'text-amber-600'
          ]"
        >wc</span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <!-- Header -->
      <div class="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 class="font-bold text-lg text-slate-800 dark:text-white leading-tight">
            {{ restroom.name }}
          </h3>
          <div class="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <span class="material-symbols-outlined text-[16px]">location_on</span>
            {{ restroom.area || restroom.city }}
            <!-- Distance indicator -->
            <span v-if="distance" class="ml-2 text-xs text-emerald-600 dark:text-emerald-400">
              • {{ distance }}
            </span>
            <!-- Geocoding status indicator -->
            <template v-else-if="!restroom.coordinates">
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
        </div>
        <!-- Rating Badge -->
        <div class="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-gray-700">
          <span class="material-symbols-outlined text-amber-500 text-[16px]">star</span>
          <span class="text-sm font-bold text-slate-700 dark:text-white">{{ restroom.communityRating }}</span>
          <span v-if="restroom.reviewCount" class="text-xs text-slate-500">({{ restroom.reviewCount }})</span>
        </div>
      </div>

      <!-- Fee Badge + Accessibility -->
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <span 
          :class="[
            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold',
            restroom.fees.isFree 
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' 
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
          ]"
        >
          <span class="material-symbols-outlined text-[14px]">
            {{ restroom.fees.isFree ? 'check_circle' : 'payments' }}
          </span>
          {{ restroom.fees.isFree ? 'Free' : (restroom.fees.amountLKR ? `Rs ${restroom.fees.amountLKR}` : 'Paid') }}
        </span>
        <span 
          v-if="restroom.accessibility.wheelchairAccessible" 
          class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
        >
          <span class="material-symbols-outlined text-[14px]">accessible</span>
          Accessible
        </span>
        <span class="text-xs text-slate-500 dark:text-slate-400">{{ restroom.city }}</span>
      </div>

      <!-- Notes -->
      <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
        {{ restroom.communityNotes }}
      </p>

      <!-- View Details Button -->
      <button 
        @click.stop="$emit('view-details')"
        class="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        <span>View Details</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Restroom } from '~/data/restrooms'

defineProps<{
  restroom: Restroom
  isSelected?: boolean
  distance?: string
  geocodingStatus?: 'locating' | 'found' | 'not_found' | 'error' | null
}>()

defineEmits<{
  (e: 'click'): void
  (e: 'view-details'): void
}>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
