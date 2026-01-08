<template>
  <div
    class="p-6 pb-2 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
    <!-- Search Bar -->
    <AccommodationSearchBar :modelValue="searchInput" @update:modelValue="handleSearchUpdate" />

    <!-- Category Filter -->
    <AccommodationCategoryFilter :modelValue="category" @update:modelValue="emit('update:category', $event)" />

    <!-- Filter Bar -->
    <AccommodationFilterBar :sort="sort" :region="region" :city="city" :safetyCertified="safetyCertified"
      :showFavoritesOnly="showFavoritesOnly" @update:sort="emit('update:sort', $event)"
      @update:region="emit('update:region', $event)" @update:city="emit('update:city', $event)"
      @update:safetyCertified="emit('update:safetyCertified', $event)"
      @update:showFavoritesOnly="emit('update:showFavoritesOnly', $event)" />

    <!-- Amenity Filter -->
    <AccommodationAmenityFilter :modelValue="amenities" @update:modelValue="emit('update:amenities', $event)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AccommodationSearchBar from './AccommodationSearchBar.vue'
import AccommodationCategoryFilter from './AccommodationCategoryFilter.vue'
import AccommodationFilterBar from './AccommodationFilterBar.vue'
import AccommodationAmenityFilter from './AccommodationAmenityFilter.vue'

const props = defineProps<{
  regions: Array<{ region_key: string; label: string; count: number }>
  category: string | null
  region: string | null
  search: string | null
  priceMinUsd: number | null
  priceMaxUsd: number | null
  minRating: string | null
  safetyCertified: boolean
  amenities: string[]
  sort: string
  showFavoritesOnly: boolean
  city: string | null
  cities: Array<{ name: string; district?: string }>
}>()

const emit = defineEmits<{
  (e: 'update:category', value: string | null): void
  (e: 'update:region', value: string | null): void
  (e: 'update:search', value: string | null): void
  (e: 'update:priceMinUsd', value: number | null): void
  (e: 'update:priceMaxUsd', value: number | null): void
  (e: 'update:minRating', value: string | null): void
  (e: 'update:safetyCertified', value: boolean): void
  (e: 'update:amenities', value: string[]): void
  (e: 'update:sort', value: string): void
  (e: 'update:showFavoritesOnly', value: boolean): void
  (e: 'update:city', value: string | null): void
}>()

const searchInput = ref(props.search || '')

// Watch for external search changes
watch(() => props.search, (val) => {
  if (val !== searchInput.value) {
    searchInput.value = val || ''
  }
})

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout> | null = null
function handleSearchUpdate(value: string) {
  searchInput.value = value

  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    emit('update:search', value || null)
  }, 300)
}
</script>
