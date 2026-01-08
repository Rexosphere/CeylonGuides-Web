<template>
  <div class="bg-white dark:bg-[#181311] rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
    <div class="p-6 border-b border-gray-200 dark:border-neutral-800">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-primary">verified</span>
        </div>
        <h3 class="text-lg font-bold text-text-main dark:text-white">Quick Picks</h3>
      </div>
      <p class="text-xs text-text-muted dark:text-gray-400">
        {{ subtitle }}
      </p>
    </div>

    <div class="p-6 space-y-4">
      <div 
        v-for="place in topPlaces" 
        :key="place.id"
        class="group cursor-pointer p-4 rounded-lg border border-gray-200 dark:border-neutral-800 hover:border-primary hover:bg-primary/5 transition-all"
        @click="$emit('placeClick', place.id)"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-text-main dark:text-white text-sm mb-1 group-hover:text-primary transition-colors">
              {{ place.name }}
            </h4>
            <p class="text-xs text-text-muted dark:text-gray-400 mb-2">
              {{ place.areaLabel }}
            </p>
            <div class="flex items-center gap-2 flex-wrap">
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  place.bargaining === 'expected'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                ]"
              >
                {{ place.bargaining === 'expected' ? 'Bargaining' : 'Fixed Price' }}
              </span>
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  place.priceLevel === 'budget'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : place.priceLevel === 'moderate'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                ]"
              >
                {{ place.priceLevel === 'budget' ? '$' : place.priceLevel === 'moderate' ? '$$' : '$$$' }}
              </span>
            </div>
          </div>
          <span class="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
            arrow_forward
          </span>
        </div>
      </div>

      <div v-if="topPlaces.length === 0" class="text-center py-8">
        <span class="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 mb-2">storefront</span>
        <p class="text-sm text-text-muted dark:text-gray-400">
          Select a category to see recommended places
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ShoppingDistrict } from '~/data/shopping.data'

const props = defineProps<{
  districts: ShoppingDistrict[]
  selectedTag?: string
  activeFilters?: string[]
}>()

defineEmits<{
  placeClick: [districtId: string]
}>()

const subtitle = computed(() => {
  if (props.selectedTag) {
    const tagLabels: Record<string, string> = {
      tea: 'Best places to buy Ceylon Tea',
      gems: 'Safest gem shops',
      textiles: 'Top textile boutiques',
      spices: 'Authentic spice markets',
      handicrafts: 'Traditional handicraft stores',
      wellness: 'Ayurvedic product shops',
      market: 'Popular market districts',
      boutique: 'Curated boutiques',
      'fixed-price': 'No-haggle shopping',
      bargaining: 'Great bargaining spots'
    }
    return tagLabels[props.selectedTag] || 'Recommended shopping locations'
  }
  return 'Top 3 safest places to shop'
})

const topPlaces = computed(() => {
  let filtered = [...props.districts]

  // Filter by selected tag
  if (props.selectedTag) {
    filtered = filtered.filter(d => {
      // Map search tags to district tags
      if (props.selectedTag === 'market') return d.tags.includes('market')
      if (props.selectedTag === 'boutique') return d.tags.includes('boutique')
      if (props.selectedTag === 'fixed-price') return d.bargaining === 'fixed'
      if (props.selectedTag === 'bargaining') return d.bargaining === 'expected'
      return d.tags.some(tag => tag.includes(props.selectedTag!))
    })
  }

  // Apply active filters
  if (props.activeFilters && props.activeFilters.length > 0) {
    filtered = filtered.filter(d => {
      return props.activeFilters!.some(filter => d.tags.includes(filter))
    })
  }

  // Sort by safety (prefer fixed price and premium/moderate) and return top 3
  return filtered
    .sort((a, b) => {
      // Prioritize fixed price
      if (a.bargaining === 'fixed' && b.bargaining !== 'fixed') return -1
      if (b.bargaining === 'fixed' && a.bargaining !== 'fixed') return 1

      // Then by price level (premium > moderate > budget for safety)
      const priceOrder = { premium: 3, moderate: 2, budget: 1 }
      return priceOrder[b.priceLevel] - priceOrder[a.priceLevel]
    })
    .slice(0, 3)
})
</script>
