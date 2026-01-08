<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <Header variant="solid" />

    <!-- Hero Section -->
    <AccommodationHero />

    <!-- Main Content Layout -->
    <div class="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
      <!-- Left Panel: Filters & List -->
      <div
        class="w-full lg:w-[55%] xl:w-[60%] h-full overflow-y-auto bg-background-light dark:bg-background-dark flex flex-col">
        <!-- Filters Container -->
        <AccommodationFilters :regions="regions" :category="selectedCategory" :region="selectedRegion"
          :search="searchQuery" :priceMinUsd="priceMinUsd" :priceMaxUsd="priceMaxUsd" :minRating="selectedMinRating"
          :safetyCertified="safetyCertifiedOnly" :amenities="selectedAmenities" :sort="selectedSort"
          :city="selectedCity" :cities="availableCities" :showFavoritesOnly="showFavoritesOnly"
          @update:category="selectedCategory = $event" @update:region="selectedRegion = $event"
          @update:search="searchQuery = $event" @update:priceMinUsd="priceMinUsd = $event"
          @update:priceMaxUsd="priceMaxUsd = $event" @update:minRating="selectedMinRating = $event"
          @update:safetyCertified="safetyCertifiedOnly = $event" @update:amenities="selectedAmenities = $event"
          @update:sort="selectedSort = $event" @update:city="selectedCity = $event"
          @update:showFavoritesOnly="showFavoritesOnly = $event" />

        <!-- List Container -->
        <AccommodationList :accommodations="filteredAccommodations" :highlightedId="highlightedId"
          @viewOnMap="handleViewOnMap" @hover="handleListHover" @clearFilters="clearAllFilters" />
      </div>

      <!-- Right Panel: Map -->
      <div
        class="w-full lg:w-[45%] xl:w-[40%] bg-neutral-100 dark:bg-neutral-900 lg:sticky lg:top-0 lg:h-screen border-l border-neutral-light dark:border-white/10">
        <AccommodationMap ref="mapRef" :accommodations="accommodationsForMap" :highlightedId="highlightedId"
          @select="handleMapSelect" @hover="handleMapHover" />
      </div>
    </div>


    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAccommodationFavorites } from '~/composables/useAccommodationFavorites'
import type { Accommodation } from '~/types/api' // We might need to adjust or extend this type if local API returns slightly diff format but ideally it matches
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
// availableCities is computed below
const activeTab = ref('list')

// Sync state for list↔map
const highlightedId = ref<string | number | null>(null)
const mapRef = ref<InstanceType<typeof AccommodationMap> | null>(null)

// Fetch regions
// Local Data Fetching
const { data: localResponse } = await useFetch<{ success: boolean; data: Accommodation[] }>('/api/local-accommodations')
const allAccommodations = computed(() => localResponse.value?.data || [])

// Extract unique regions dynamically
const regions = computed(() => {
  const map = new Map<string, number>()
  allAccommodations.value.forEach(a => {
    if (a.region) {
      map.set(a.region, (map.get(a.region) || 0) + 1)
    }
  })
  return Array.from(map.entries()).map(([label, count]) => ({
    region_key: label, // Using label as key for simplicity since parsed data has full names
    label,
    count
  })).sort((a, b) => b.count - a.count)
})

// Extract unique cities
const availableCities = computed(() => {
  const citiesMap = new Map<string, string | undefined>()
  allAccommodations.value.forEach(a => {
    // Parser returns string location "City (District)" or just "City"
    // We should parse it or just use it as is? 
    // The parser cleans it to just City usually?
    // Let's assume location string is the city name for now or simpler strings
    // In parser: `location = titlePart.substring(lastCommaIndex + 1).trim()`
    if (a.location) {
      // Simple extraction
      const city = a.location.split('(')[0]?.trim()
      const districtMatch = a.location.match(/\((.*?)\)/)
      const district = districtMatch ? districtMatch[1] : undefined
      if (city) {
        citiesMap.set(city, district)
      }
    }
  })
  return Array.from(citiesMap.entries())
    .map(([name, district]) => ({ name, district }))
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
})

// Helper: Check for amenity match (with keywords)
const amenityKeywords: Record<string, string[]> = {
  pool: ['pool', 'swimming', 'swim'],
  spa: ['spa', 'massage', 'wellness'],
  wifi: ['wifi', 'wi-fi', 'internet'],
  restaurant: ['restaurant', 'dining', 'food'],
  gym: ['gym', 'fitness', 'workout'],
  breakfast: ['breakfast', 'morning meal'],
  garden: ['garden', 'gardens'],
  parking: ['parking', 'car park'],
  airport_shuttle: ['airport', 'shuttle', 'transfer'],
  yoga: ['yoga', 'meditation'],
  beach: ['beach', 'beachfront', 'seaside'],
  terrace: ['terrace', 'balcony', 'deck']
}

function matchesAmenity(amenities: Array<{ label: string }> | undefined, query: string): boolean {
  if (!amenities) return false
  const q = query.toLowerCase()
  // Check mapped amenities
  const labels = amenities.map(a => a.label.toLowerCase())
  if (labels.some(l => l.includes(q))) return true

  // Keyword check
  for (const [key, keywords] of Object.entries(amenityKeywords)) {
    if (keywords.some(k => q.includes(k))) {
      // If query matches a keyword (e.g. "swim"), check if amenity (e.g. "pool") exists
      if (labels.some(l => l.includes(key))) return true
    }
  }
  return false
}

// Client-Side Filtering
const { isFavorite } = useAccommodationFavorites()

const filteredAccommodations = computed(() => {
  let results = [...allAccommodations.value]

  // Category
  if (selectedCategory.value) {
    results = results.filter(a => a.type === selectedCategory.value)
  }

  // Region
  if (selectedRegion.value) {
    results = results.filter(a => a.region === selectedRegion.value)
  }

  // City
  if (selectedCity.value) {
    results = results.filter(a => a.location?.includes(selectedCity.value!))
  }

  // Price
  if (priceMinUsd.value !== null) {
    results = results.filter(a => a.price >= priceMinUsd.value!)
  }
  if (priceMaxUsd.value !== null) {
    results = results.filter(a => a.price <= priceMaxUsd.value!)
  }

  // Rating
  if (selectedMinRating.value) {
    results = results.filter(a => a.rating >= parseFloat(selectedMinRating.value!))
  }

  // Safety
  if (safetyCertifiedOnly.value) {
    results = results.filter(a => a.isSafetyCertified)
  }

  // Favorites
  if (showFavoritesOnly.value) {
    results = results.filter(a => isFavorite(a.id))
  }

  // Amenities
  if (selectedAmenities.value.length > 0) {
    results = results.filter(a => {
      const itemAmenities = (a.amenities || []).map(am => am.label) // Parser returns {icon, label}
      // Check if ALL selected amenities are present (AND logic)
      // OR Logic? Usually AND for amenities
      // Let's use AND
      // Wait, props.amenities are values like 'pool', 'wifi'. 
      // Parser amenities labels are 'Pool', 'WiFi'.
      // Need to normalize match.
      return selectedAmenities.value.every(req => {
        const reqLower = req.toLowerCase()
        return itemAmenities.some(ia => {
          const iaLower = ia.toLowerCase()
          // Map 'wifi' to 'WiFi', 'pool' to 'Pool' etc.
          if (reqLower === 'wifi') return iaLower.includes('wifi')
          if (reqLower === 'pool') return iaLower.includes('pool')
          return iaLower.includes(reqLower)
        })
      })
    })
  }

  // Search Query
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    results = results.filter(a => {
      const titleMatch = a.title.toLowerCase().includes(q)
      const locMatch = a.location.toLowerCase().includes(q)
      const descMatch = (a.description || '').toLowerCase().includes(q)
      const amenityMatch = matchesAmenity(a.amenities, q)
      return titleMatch || locMatch || descMatch || amenityMatch
    })
  }

  // Sorting
  results.sort((a, b) => {
    switch (selectedSort.value) {
      case 'price_asc': return a.price - b.price
      case 'price_desc': return b.price - a.price
      case 'rating_desc': return b.rating - a.rating
      case 'most_reviewed': return b.reviews - a.reviews
      default: return b.rating - a.rating // Recommended
    }
  })

  return results
})

// Map View Data (Directly use filtered results for consistency)
const accommodationsForMap = computed(() => {
  return filteredAccommodations.value
})

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
