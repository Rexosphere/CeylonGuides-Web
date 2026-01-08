<template>
  <div class="sticky top-0 z-20 flex w-full flex-col gap-4 border-b border-neutral-light bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-white/10 dark:bg-background-dark/95">
    <!-- Search Bar -->
    <div class="relative">
      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-gray text-[18px]">search</span>
      <input
        v-model="searchInput"
        type="text"
        placeholder="Where in Sri Lanka? Try 'Ella', 'pool', 'beach'..."
        class="w-full rounded-xl border border-neutral-light bg-white py-3 pl-10 pr-4 text-sm text-neutral-dark placeholder:text-neutral-gray focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-400"
        @input="debouncedSearch"
      />
      <button
        v-if="searchInput"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-gray hover:text-neutral-dark dark:hover:text-white"
        @click="clearSearch"
      >
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>

    <!-- Type Pills -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="type in typeOptions"
        :key="type.value || 'all'"
        class="flex h-8 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-colors"
        :class="activeType === (type.value || 'all')
          ? 'border-primary bg-primary/10 text-primary hover:bg-primary hover:text-white'
          : 'border-neutral-light bg-transparent text-neutral-dark hover:border-primary hover:text-primary dark:border-white/20 dark:text-white dark:hover:border-primary'"
        @click="setType(type.value)"
      >
        <span v-if="type.icon" class="material-symbols-outlined text-[16px]">{{ type.icon }}</span>
        {{ type.label }}
      </button>
    </div>

    <!-- Secondary Filters Row -->
    <div class="flex items-center gap-3 flex-wrap">
      <!-- Sort Dropdown -->
      <div class="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/20 px-3 py-1.5 dark:bg-primary/10">
        <span class="material-symbols-outlined text-[14px] text-primary">sort</span>
        <select
          class="bg-transparent text-xs font-bold text-primary focus:outline-none cursor-pointer"
          :value="sort"
          @change="setSort(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Region Selector -->
      <div class="flex items-center gap-2 rounded-lg bg-background-light px-3 py-1.5 dark:bg-white/5">
        <span class="material-symbols-outlined text-[14px] text-neutral-gray">map</span>
        <select
          class="bg-transparent text-xs font-bold text-neutral-dark dark:text-white focus:outline-none cursor-pointer"
          :value="region || ''"
          @change="setRegion(($event.target as HTMLSelectElement).value)"
        >
          <option value="">All Regions</option>
          <option v-for="r in regionOptions" :key="r.region_key" :value="r.region_key">
            {{ r.label }}
          </option>
        </select>
      </div>

      <!-- City Selector (Secondary) -->
      <div class="flex items-center gap-2 rounded-lg bg-background-light px-3 py-1.5 dark:bg-white/5">
        <span class="material-symbols-outlined text-[14px] text-neutral-gray">location_city</span>
        <select
          class="bg-transparent text-xs font-bold text-neutral-dark dark:text-white focus:outline-none cursor-pointer max-w-[120px]"
          :value="city || ''"
          @change="setCity(($event.target as HTMLSelectElement).value)"
        >
          <option value="">All Cities</option>
          <template v-for="(group, district) in groupedCities" :key="district">
            <optgroup v-if="district !== 'Other'" :label="district">
              <option v-for="c in group" :key="c.name" :value="c.name">
                {{ c.name }}
              </option>
            </optgroup>
            <template v-else>
              <option v-for="c in group" :key="c.name" :value="c.name">
                {{ c.name }} -- {{ c.district }}
              </option>
            </template>
          </template>
        </select>
      </div>

      <!-- Price Range -->
      <div class="flex items-center gap-2 rounded-lg bg-background-light px-3 py-1.5 dark:bg-white/5">
        <span class="material-symbols-outlined text-[14px] text-neutral-gray">payments</span>
        <select
          class="bg-transparent text-xs font-bold text-neutral-dark dark:text-white focus:outline-none cursor-pointer"
          :value="pricePreset"
          @change="setPricePreset(($event.target as HTMLSelectElement).value)"
        >
          <option value="">All Prices</option>
          <option value="budget">$10–30</option>
          <option value="mid">$30–100</option>
          <option value="luxury">$100–250</option>
          <option value="ultra">$250+</option>
        </select>
      </div>

      <!-- Rating Filter -->
      <div class="flex items-center gap-2 rounded-lg bg-background-light px-3 py-1.5 dark:bg-white/5">
        <span class="material-symbols-outlined text-[14px] text-neutral-gray">star</span>
        <select
          class="bg-transparent text-xs font-bold text-neutral-dark dark:text-white focus:outline-none cursor-pointer"
          :value="minRating || ''"
          @change="setMinRating(($event.target as HTMLSelectElement).value)"
        >
          <option value="">Any Rating</option>
          <option value="3">3+ ⭐</option>
          <option value="4">4+ ⭐</option>
          <option value="4.5">4.5+ ⭐</option>
        </select>
      </div>

      <!-- Safe Certified Toggle -->
      <button
        class="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors"
        :class="safetyCertified 
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
          : 'bg-background-light text-neutral-gray hover:text-green-600 dark:bg-white/5 dark:hover:text-green-400'"
        @click="toggleSafetyCertified"
      >
        <span class="material-symbols-outlined text-[14px]">verified_user</span>
        <span class="text-xs font-bold">Safe Certified</span>
      </button>

      <!-- Favorites Toggle -->
      <button
        class="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors"
        :class="showFavoritesOnly 
          ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300' 
          : 'bg-background-light text-neutral-gray hover:text-rose-500 dark:bg-white/5 dark:hover:text-rose-400'"
        @click="toggleShowFavorites"
      >
        <span class="material-symbols-outlined text-[14px]" :class="{ 'fill-current': showFavoritesOnly }">favorite</span>
        <span class="text-xs font-bold">Favorites</span>
        <span 
          v-if="favoritesCount > 0" 
          class="ml-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white"
        >
          {{ favoritesCount }}
        </span>
      </button>
    </div>

    <!-- Amenities Multi-Select -->
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-medium text-neutral-gray">Amenities:</span>
      <button
        v-for="amenity in amenityOptions"
        :key="amenity.value"
        class="flex h-7 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors"
        :class="selectedAmenities.includes(amenity.value)
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-neutral-light bg-transparent text-neutral-dark hover:border-primary/50 dark:border-white/20 dark:text-white'"
        @click="toggleAmenity(amenity.value)"
      >
        <span class="material-symbols-outlined text-[14px]">{{ amenity.icon }}</span>
        {{ amenity.label }}
      </button>
    </div>

    <!-- Active Filters Summary -->
    <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-light/50 dark:border-white/5">
      <span class="text-xs font-medium text-neutral-gray">Active:</span>
      
      <!-- Type Chip -->
      <span 
        v-if="category" 
        class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
      >
        {{ formatLabel(category) }}
        <button @click="clearFilter('category')" class="hover:text-primary/70">
          <span class="material-symbols-outlined text-[12px]">close</span>
        </button>
      </span>
      
      <!-- Region Chip -->
      <span 
        v-if="region" 
        class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
      >
        {{ regionLabels[region] || region }}
        <button @click="clearFilter('region')" class="hover:text-blue-500">
          <span class="material-symbols-outlined text-[12px]">close</span>
        </button>
      </span>
      
      <!-- City Chip -->
      <span 
        v-if="city" 
        class="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300"
      >
        {{ city }}
        <button @click="clearFilter('city')" class="hover:text-cyan-500">
          <span class="material-symbols-outlined text-[12px]">close</span>
        </button>
      </span>
      
      <!-- Price Chip -->
      <span 
        v-if="pricePreset" 
        class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
      >
        {{ priceLabels[pricePreset] }}
        <button @click="clearFilter('price')" class="hover:text-amber-500">
          <span class="material-symbols-outlined text-[12px]">close</span>
        </button>
      </span>
      
      <!-- Safety Chip -->
      <span 
        v-if="safetyCertified" 
        class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300"
      >
        Safe Certified
        <button @click="clearFilter('safety')" class="hover:text-green-500">
          <span class="material-symbols-outlined text-[12px]">close</span>
        </button>
      </span>
      
      <!-- Favorites Chip -->
      <span 
        v-if="showFavoritesOnly" 
        class="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600 dark:bg-rose-900/20 dark:text-rose-300"
      >
        Favorites Only
        <button @click="clearFilter('favorites')" class="hover:text-rose-500">
          <span class="material-symbols-outlined text-[12px]">close</span>
        </button>
      </span>
      
      <!-- Amenity Chips -->
      <span 
        v-for="amenity in selectedAmenities" 
        :key="amenity"
        class="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
      >
        {{ formatAmenity(amenity) }}
        <button @click="removeAmenity(amenity)" class="hover:text-purple-500">
          <span class="material-symbols-outlined text-[12px]">close</span>
        </button>
      </span>
      
      <!-- Search Chip -->
      <span 
        v-if="search" 
        class="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-white/10 dark:text-neutral-300"
      >
        "{{ search }}"
        <button @click="clearFilter('search')" class="hover:text-neutral-500">
          <span class="material-symbols-outlined text-[12px]">close</span>
        </button>
      </span>

      <!-- Clear All -->
      <button
        class="ml-auto flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600"
        @click="clearAllFilters"
      >
        <span class="material-symbols-outlined text-[14px]">filter_alt_off</span>
        Clear All
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAccommodationFavorites } from '~/composables/useAccommodationFavorites'

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

const { favorites } = useAccommodationFavorites()
const favoritesCount = computed(() => favorites.value.length)

const searchInput = ref(props.search || '')

// Watch for external search changes
watch(() => props.search, (val) => {
  if (val !== searchInput.value) {
    searchInput.value = val || ''
  }
})

// Type options (hardcoded as per requirements)
const typeOptions = [
  { value: null, label: 'All', icon: 'hotel_class' },
  { value: 'BOUTIQUE', label: 'Boutique', icon: 'storefront' },
  { value: 'GUESTHOUSE', label: 'Guesthouse', icon: 'cottage' },
  { value: 'HOTEL', label: 'Hotel', icon: 'hotel' },
  { value: 'RESORT', label: 'Resort', icon: 'pool' },
  { value: 'VILLA', label: 'Villa', icon: 'villa' },
  { value: 'HOMESTAY', label: 'Homestay', icon: 'home' },
]

// Region labels
const regionLabels: Record<string, string> = {
  west_colombo: 'Colombo & West',
  cultural_triangle: 'Cultural Triangle',
  hill_country: 'Hill Country',
  south: 'Southern Coast',
  east: 'East Coast',
  north: 'Northern',
}

// Price labels
const priceLabels: Record<string, string> = {
  budget: '$10–30',
  mid: '$30–100',
  luxury: '$100–250',
  ultra: '$250+',
}

// Sort options
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'rating_desc', label: 'Rating: High → Low' },
  { value: 'most_reviewed', label: 'Most Reviewed' },
]

// Amenity options
const amenityOptions = [
  { value: 'wifi', label: 'WiFi', icon: 'wifi' },
  { value: 'pool', label: 'Pool', icon: 'pool' },
  { value: 'spa', label: 'Spa', icon: 'spa' },
  { value: 'breakfast', label: 'Breakfast', icon: 'free_breakfast' },
  { value: 'parking', label: 'Parking', icon: 'local_parking' },
  { value: 'restaurant', label: 'Restaurant', icon: 'restaurant' },
  { value: 'airport_shuttle', label: 'Airport Shuttle', icon: 'airport_shuttle' },
  { value: 'garden', label: 'Garden', icon: 'yard' },
]

// Computed price preset from min/max USD
const pricePreset = computed(() => {
  const min = props.priceMinUsd
  const max = props.priceMaxUsd
  if (min === 10 && max === 30) return 'budget'
  if (min === 30 && max === 100) return 'mid'
  if (min === 100 && max === 250) return 'luxury'
  if (min === 250 && max === null) return 'ultra'
  return ''
})

const regionOptions = computed(() => {
  // Use passed regions or fallback to static list
  if (props.regions?.length) return props.regions
  return Object.entries(regionLabels).map(([key, label]) => ({
    region_key: key,
    label,
    count: 0
  }))
})

const groupedCities = computed(() => {
  const groups: Record<string, Array<{ name: string; district?: string }>> = {}
  
  // Sort cities first
  const sorted = [...(props.cities || [])].sort((a, b) => a.name.localeCompare(b.name)) // Already sorted but ensuring
  
  sorted.forEach(c => {
    const d = c.district || 'Other'
    if (!groups[d]) groups[d] = []
    groups[d].push(c)
  })
  
  return groups
})

const activeType = computed(() => props.category || 'all')
const selectedAmenities = computed(() => props.amenities || [])

const hasActiveFilters = computed(() => {
  return props.category || props.region || props.search || props.city ||
         props.priceMinUsd || props.safetyCertified || props.showFavoritesOnly ||
         props.minRating || (props.amenities?.length > 0)
})

function formatLabel(value: string) {
  return value.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, t => t.toUpperCase())
}

function formatAmenity(value: string) {
  const option = amenityOptions.find(a => a.value === value)
  return option?.label || formatLabel(value)
}

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout> | null = null
function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    emit('update:search', searchInput.value || null)
  }, 300)
}

function clearSearch() {
  searchInput.value = ''
  emit('update:search', null)
}

function setType(value: string | null) {
  emit('update:category', value)
}

function setRegion(value: string) {
  emit('update:region', value || null)
}

function setCity(value: string) {
  emit('update:city', value || null)
}

function setPricePreset(preset: string) {
  switch (preset) {
    case 'budget':
      emit('update:priceMinUsd', 10)
      emit('update:priceMaxUsd', 30)
      break
    case 'mid':
      emit('update:priceMinUsd', 30)
      emit('update:priceMaxUsd', 100)
      break
    case 'luxury':
      emit('update:priceMinUsd', 100)
      emit('update:priceMaxUsd', 250)
      break
    case 'ultra':
      emit('update:priceMinUsd', 250)
      emit('update:priceMaxUsd', null)
      break
    default:
      emit('update:priceMinUsd', null)
      emit('update:priceMaxUsd', null)
  }
}

function setMinRating(value: string) {
  emit('update:minRating', value || null)
}

function setSort(value: string) {
  emit('update:sort', value)
}

function toggleSafetyCertified() {
  emit('update:safetyCertified', !props.safetyCertified)
}

function toggleShowFavorites() {
  emit('update:showFavoritesOnly', !props.showFavoritesOnly)
}

function toggleAmenity(amenity: string) {
  const current = [...selectedAmenities.value]
  const index = current.indexOf(amenity)
  if (index >= 0) {
    current.splice(index, 1)
  } else {
    current.push(amenity)
  }
  emit('update:amenities', current)
}

function removeAmenity(amenity: string) {
  const current = selectedAmenities.value.filter(a => a !== amenity)
  emit('update:amenities', current)
}

function clearFilter(type: string) {
  switch (type) {
    case 'category':
      emit('update:category', null)
      break
    case 'region':
      emit('update:region', null)
      break
    case 'city':
      emit('update:city', null)
      break
    case 'price':
      emit('update:priceMinUsd', null)
      emit('update:priceMaxUsd', null)
      break
    case 'safety':
      emit('update:safetyCertified', false)
      break
    case 'favorites':
      emit('update:showFavoritesOnly', false)
      break
    case 'search':
      searchInput.value = ''
      emit('update:search', null)
      break
  }
}

function clearAllFilters() {
  searchInput.value = ''
  emit('update:category', null)
  emit('update:region', null)
  emit('update:city', null)
  emit('update:search', null)
  emit('update:priceMinUsd', null)
  emit('update:priceMaxUsd', null)
  emit('update:minRating', null)
  emit('update:safetyCertified', false)
  emit('update:showFavoritesOnly', false)
  emit('update:amenities', [])
}
</script>
