<template>
  <section id="sim-providers" class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-white">Network Providers</h2>
          <p class="text-text-muted mt-1">Compare Sri Lanka's major mobile networks</p>
        </div>
        <button 
          v-if="selectedProvider"
          @click="$emit('select', null)"
          class="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <span class="material-symbols-outlined text-sm">close</span>
          Clear filter
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="provider in providers"
          :key="provider.id"
          @click="$emit('select', selectedProvider === provider.id ? null : provider.id)"
          class="bg-white dark:bg-surface-dark p-5 rounded-xl border-2 transition-all text-left hover:shadow-lg"
          :class="selectedProvider === provider.id 
            ? 'border-primary shadow-lg ring-2 ring-primary/20' 
            : 'border-gray-200 dark:border-neutral-700 hover:border-primary/50'"
        >
          <!-- Header -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div 
                class="size-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                :style="{ backgroundColor: provider.brandColor || '#666' }"
              >
                {{ provider.name?.split(' ')[0]?.slice(0, 3).toUpperCase() }}
              </div>
              <div>
                <h3 class="font-bold text-text-main dark:text-white">{{ provider.name }}</h3>
                <p v-if="provider.marketShareApprox" class="text-xs text-text-muted">~{{ provider.marketShareApprox }}% market share</p>
              </div>
            </div>
            <span 
              v-if="provider.has5G"
              class="px-2 py-0.5 text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded"
            >
              5G
            </span>
          </div>
          
          <!-- Rating Badge -->
          <div class="mb-3">
            <span 
              class="text-xs font-bold px-2 py-1 rounded"
              :class="getRatingClass(provider.touristRatingLabel)"
            >
              {{ provider.touristRatingLabel }}
            </span>
          </div>
          
          <!-- Scores -->
          <div class="flex flex-col gap-2 mb-3 text-xs">
            <div class="flex items-center gap-1">
              <span class="text-text-muted">Coverage:</span>
              <div class="flex">
                <span 
                  v-for="i in 5" 
                  :key="i"
                  class="material-symbols-outlined text-xs"
                  :class="i <= provider.coverageScore ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'"
                >
                  signal_cellular_alt
                </span>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-text-muted">Speed:</span>
              <div class="flex">
                <span 
                  v-for="i in 5" 
                  :key="i"
                  class="material-symbols-outlined text-xs"
                  :class="i <= provider.speedScore ? 'text-blue-500' : 'text-gray-300 dark:text-gray-600'"
                >
                  speed
                </span>
              </div>
            </div>
          </div>
          
          <!-- Notes -->
          <p class="text-xs text-text-muted line-clamp-2 mb-3">{{ provider.notes }}</p>
          
          <!-- Best For Tags -->
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="(tag, idx) in provider.bestFor.slice(0, 3)" 
              :key="idx"
              class="text-[10px] px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full capitalize"
            >
              {{ tag.replace('_', ' ') }}
            </span>
            <span 
              v-if="provider.esimAvailable"
              class="text-[10px] px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full"
            >
              eSIM ✓
            </span>
          </div>
          
          <!-- Selection indicator -->
          <div 
            v-if="selectedProvider === provider.id"
            class="mt-3 pt-3 border-t border-gray-100 dark:border-neutral-700 flex items-center justify-center gap-2 text-primary text-sm font-medium"
          >
            <span class="material-symbols-outlined text-sm">check_circle</span>
            Selected - showing plans
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { providers, type TouristRatingLabel } from '~/data/simData'

defineProps<{
  selectedProvider: string | null
}>()

defineEmits<{
  (e: 'select', providerId: string | null): void
}>()

function getRatingClass(rating: TouristRatingLabel): string {
  switch (rating) {
    case 'Excellent': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    case 'Very Good': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
    case 'Good': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
    case 'Fair': return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
    default: return 'bg-gray-100 text-gray-600'
  }
}
</script>
