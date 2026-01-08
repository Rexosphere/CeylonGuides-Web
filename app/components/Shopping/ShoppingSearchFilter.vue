<script setup lang="ts">
import { useShoppingData } from '~/composables/useShoppingData'

const { filters, setSearchQuery, addTag, removeTag, clearFilters } = useShoppingData()

const availableTags = [
  { label: 'Tea', value: 'tea' },
  { label: 'Spices', value: 'spices' },
  { label: 'Gems', value: 'gems' },
  { label: 'Textiles', value: 'textiles' },
  { label: 'Handicrafts', value: 'handicrafts' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Markets', value: 'market' },
  { label: 'Boutiques', value: 'boutique' },
  { label: 'Fixed-Price', value: 'fixed-price' },
  { label: 'Bargaining', value: 'bargaining' },
  { label: 'Scam-Risk', value: 'scam-alert' },
  { label: 'VAT', value: 'vat-refund' }
]

const toggleTag = (tagValue: string) => {
  if (filters.value.tags.includes(tagValue)) {
    removeTag(tagValue)
  } else {
    addTag(tagValue)
  }
}

const isTagActive = (tagValue: string) => {
  return filters.value.tags.includes(tagValue)
}

const hasActiveFilters = computed(() => {
  return filters.value.searchQuery !== '' || filters.value.tags.length > 0
})
</script>

<template>
  <div class="w-full px-4 md:px-20 lg:px-40 py-8 flex justify-center bg-white dark:bg-[#181311]">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1 gap-6">
      <!-- Search Bar -->
      <div class="relative">
        <div class="relative flex items-center">
          <span class="material-symbols-outlined absolute left-4 text-gray-400 pointer-events-none">
            search
          </span>
          <input
            type="text"
            :value="filters.searchQuery"
            @input="setSearchQuery(($event.target as HTMLInputElement).value)"
            placeholder="Search items, districts, tips... (e.g., 'gems', 'Pettah', 'scam')"
            class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-[#221510] text-text-main dark:text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
          />
          <button
            v-if="filters.searchQuery"
            @click="setSearchQuery('')"
            class="absolute right-4 text-gray-400 hover:text-primary transition-colors"
            aria-label="Clear search"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <!-- Tag Chips -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider">
            Filter by Tags
          </h3>
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            <span class="material-symbols-outlined text-base">restart_alt</span>
            Clear All Filters
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in availableTags"
            :key="tag.value"
            @click="toggleTag(tag.value)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              isTagActive(tag.value)
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 dark:bg-neutral-800 text-text-main dark:text-white hover:bg-primary/20 dark:hover:bg-primary/20'
            ]"
          >
            {{ tag.label }}
          </button>
        </div>
      </div>

      <!-- Active Filters Summary -->
      <div v-if="hasActiveFilters" class="flex items-center gap-2 text-sm text-text-muted dark:text-gray-400">
        <span class="material-symbols-outlined text-primary">filter_alt</span>
        <span>
          <strong>{{ filters.tags.length }}</strong> tag{{ filters.tags.length !== 1 ? 's' : '' }} active
          <template v-if="filters.searchQuery">
            + searching for "<strong class="text-primary">{{ filters.searchQuery }}</strong>"
          </template>
        </span>
      </div>
    </div>
  </div>
</template>
