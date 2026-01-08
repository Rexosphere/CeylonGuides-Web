<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <Header variant="solid" />
    
    <!-- Main Content Layout -->
    <main class="relative flex min-h-[calc(100vh-80px)] w-full flex-col md:flex-row pt-[73px] lg:pt-[80px]">
      <!-- Left Panel: Filters & List -->
      <div class="flex flex-1 flex-col overflow-y-auto md:max-w-[60%] border-r border-neutral-light dark:border-white/10 bg-white dark:bg-background-dark">
        <AccommodationHero />
        <AccommodationFilters
          :regions="regions"
          :category="selectedCategory"
          :region="selectedRegion"
          :search="searchQuery"
          :priceMinUsd="priceMinUsd"
          :priceMaxUsd="priceMaxUsd"
          :minRating="selectedMinRating"
          :safetyCertified="safetyCertifiedOnly"
          :amenities="selectedAmenities"
          :sort="selectedSort"
          :city="selectedCity"
          :cities="availableCities"
          :showFavoritesOnly="showFavoritesOnly"
          @update:category="selectedCategory = $event"
          @update:region="selectedRegion = $event"
          @update:search="searchQuery = $event"
          @update:priceMinUsd="priceMinUsd = $event"
          @update:priceMaxUsd="priceMaxUsd = $event"
          @update:minRating="selectedMinRating = $event"
          @update:safetyCertified="safetyCertifiedOnly = $event"
          @update:amenities="selectedAmenities = $event"
          @update:sort="selectedSort = $event"
          @update:city="selectedCity = $event"
          @update:showFavoritesOnly="showFavoritesOnly = $event"
        />
        <AccommodationList 
          :category="selectedCategory" 
          :region="selectedRegion"
          :search="searchQuery"
          :priceMinUsd="priceMinUsd"
          :priceMaxUsd="priceMaxUsd"
          :minRating="selectedMinRating"
          :safetyCertified="safetyCertifiedOnly"
          :amenities="selectedAmenities"
          :sort="selectedSort"
          :city="selectedCity"
          :showFavoritesOnly="showFavoritesOnly"
          :highlightedId="highlightedId"
          @accommodationsLoaded="onAccommodationsLoaded"
          @viewOnMap="handleViewOnMap"
          @hover="handleListHover"
          @clearFilters="clearAllFilters"
        />
      </div>

      <!-- Right Panel: Map -->
      <AccommodationMap 
        ref="mapRef"
        :accommodations="accommodationsForMap" 
        :highlightedId="highlightedId"
        @select="handleMapSelect"
        @hover="handleMapHover"
      />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Accommodation } from '~/types/api'
import AccommodationHero from '~/components/Accommodation/AccommodationHero.vue'
import AccommodationFilters from '~/components/Accommodation/AccommodationFilters.vue'
import AccommodationList from '~/components/Accommodation/AccommodationList.vue'
import AccommodationMap from '~/components/Accommodation/AccommodationMap.vue'
import Header from '~/components/Shared/Header.vue'
import Footer from '~/components/Shared/Footer.vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// Filter state
const selectedCategory = ref<string | null>(null)
const selectedRegion = ref<string | null>(null)
const searchQuery = ref<string | null>(null)
const priceMinUsd = ref<number | null>(null)
const priceMaxUsd = ref<number | null>(null)
const selectedMinRating = ref<string | null>(null)
const safetyCertifiedOnly = ref(false)
const selectedAmenities = ref<string[]>([])
const selectedSort = ref('recommended')
const showFavoritesOnly = ref(false)
const selectedCity = ref<string | null>(null)
const availableCities = ref<Array<{ name: string; district?: string }>>([])

// Sync state for list↔map
const highlightedId = ref<string | number | null>(null)
const mapRef = ref<InstanceType<typeof AccommodationMap> | null>(null)

// Fetch regions
const { data: regionsResponse } = await useFetch<{
  success: boolean
  data: Array<{ region_key: string; label: string; count: number }>
}>(`${apiBase}/api/accommodations/regions/list`)

const regions = computed(() => regionsResponse.value?.data || [])

// Fetch accommodations for map (same filters as list)
const { data: accommodationsResponse } = await useFetch<{
  success: boolean
  data: Accommodation[]
}>(() => {
  const params = new URLSearchParams()
  if (selectedCategory.value) params.set('category', selectedCategory.value)
  if (selectedRegion.value) params.set('region', selectedRegion.value)
  if (searchQuery.value) params.set('search', searchQuery.value)
  if (priceMinUsd.value) params.set('price_min_usd', String(priceMinUsd.value))
  if (priceMaxUsd.value) params.set('price_max_usd', String(priceMaxUsd.value))
  if (selectedMinRating.value) params.set('min_rating', selectedMinRating.value)
  if (safetyCertifiedOnly.value) params.set('safety_certified', 'true')
  if (selectedAmenities.value.length) params.set('amenities', selectedAmenities.value.join(','))
  params.set('sort', selectedSort.value)
  const queryStr = params.toString()
  return `${apiBase}/api/accommodations${queryStr ? `?${queryStr}` : ''}`
}, { 
  watch: [
    selectedCategory, selectedRegion, searchQuery, 
    priceMinUsd, priceMaxUsd, selectedMinRating, 
    safetyCertifiedOnly, selectedAmenities, selectedSort
  ] 
})

const accommodationsForMap = computed(() => {
  let list = accommodationsResponse.value?.data || []
  
  // Filter by city if selected
  if (selectedCity.value) {
    list = list.filter(a => a.location?.name === selectedCity.value)
  }

  return list.map(a => ({
    id: a.id,
    name: a.name,
    location: a.location,
    category: a.category,
    price_per_night_lkr: a.price_per_night_lkr,
    price_per_night_usd: a.price_per_night_usd,
    rating: a.rating,
    amenities: a.amenities || [],
    safety_certified: a.safety_certified
  }))
})


function onAccommodationsLoaded(accs: Accommodation[]) {
  // Extract unique cities from loaded data
  const citiesMap = new Map<string, string | undefined>()
  accs.forEach(a => {
    if (a.location?.name) {
      citiesMap.set(a.location.name, a.location.district)
    }
  })
  
  availableCities.value = Array.from(citiesMap.entries())
    .map(([name, district]) => ({ name, district }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

function handleMapSelect(id: string) {
  // Highlight the matching card
  highlightedId.value = id
  
  // Scroll to the accommodation in the list
  const el = document.getElementById(`accommodation-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  
  // Clear highlight after a delay
  setTimeout(() => {
    highlightedId.value = null
  }, 3000)
}

function handleViewOnMap(id: string | number) {
  // Center map on the accommodation
  if (mapRef.value) {
    mapRef.value.centerOnAccommodation(id)
  }
  highlightedId.value = id
  setTimeout(() => {
    highlightedId.value = null
  }, 3000)
}

function handleListHover(id: string | number | null) {
  highlightedId.value = id
}

function handleMapHover(id: string | null) {
  highlightedId.value = id
}

function clearAllFilters() {
  selectedCategory.value = null
  selectedRegion.value = null
  searchQuery.value = null
  priceMinUsd.value = null
  priceMaxUsd.value = null
  selectedMinRating.value = null
  safetyCertifiedOnly.value = false
  showFavoritesOnly.value = false
  selectedCity.value = null
  selectedAmenities.value = []
}

definePageMeta({
  layout: false
})

useHead({
  title: 'Accommodation Finder - CeylonGuide',
  meta: [
    { name: 'description', content: 'Discover curated hotels, guesthouses, and homestays verified for safety and comfort in Sri Lanka.' }
  ]
})
</script>
