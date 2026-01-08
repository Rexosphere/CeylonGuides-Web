<template>
  <div class="flex flex-col gap-6 p-6">
    <h3 class="text-lg font-bold text-neutral-dark dark:text-white">
      {{ displayedAccommodations.length }} Stays found in Sri Lanka
    </h3>
    <div v-if="pending" class="py-10 text-center text-sm text-neutral-gray">Loading stays...</div>
    <div v-else-if="error" class="py-10 text-center text-sm text-red-600">Failed to load stays.</div>
    <div v-else-if="displayedAccommodations.length === 0" class="py-10 text-center">
      <div class="flex flex-col items-center gap-4">
        <span class="material-symbols-outlined text-[48px] text-neutral-gray">search_off</span>
        <div class="text-sm text-neutral-gray dark:text-neutral-400">
          No stays found matching your filters.
        </div>
        <button
          class="text-sm font-bold text-primary hover:underline"
          @click="$emit('clearFilters')"
        >
          Clear all filters
        </button>
      </div>
    </div>
    <template v-else>
      <AccommodationCard 
        v-for="accommodation in displayedAccommodations"
        :key="accommodation.id" 
        :accommodation="accommodation"
        :isHighlighted="highlightedId === accommodation.id"
        @view="openDetails"
        @viewOnMap="$emit('viewOnMap', $event)"
        @hover="$emit('hover', $event)"
      />
    </template>
    <!-- Load More -->
    <div v-if="displayedAccommodations.length > 0" class="flex justify-center p-8">
      <button class="rounded-lg border border-neutral-light bg-white px-6 py-3 text-sm font-bold text-neutral-dark transition-colors hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
        Show More Stays
      </button>
    </div>
  </div>

  <!-- Details Drawer -->
  <AccommodationDetailsDrawer 
    :isOpen="showDetails"
    :accommodationId="selectedAccommodationId"
    @close="closeDetails"
  />
</template>

<script setup lang="ts">
import AccommodationCard from './AccommodationCard.vue'
import AccommodationDetailsDrawer from './AccommodationDetailsDrawer.vue'
import { computed, ref, nextTick, watch } from 'vue'
import type { Accommodation } from '~/types/api'
import { useAccommodationFavorites } from '~/composables/useAccommodationFavorites'

const props = defineProps<{
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
  highlightedId: string | number | null
  city: string | null
}>()

const emit = defineEmits<{
  (e: 'accommodationsLoaded', data: Accommodation[]): void
  (e: 'viewOnMap', id: string | number): void
  (e: 'hover', id: string | number | null): void
  (e: 'clearFilters'): void
}>()

const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const { favorites, isFavorite } = useAccommodationFavorites()

const { data: accommodationsResponse, pending, error } = await useFetch<{
  success: boolean
  data: Accommodation[]
  count: number
}>(() => {
  const params = new URLSearchParams()
  if (props.category) params.set('category', props.category)
  if (props.region) params.set('region', props.region)
  if (props.search) params.set('search', props.search)
  if (props.priceMinUsd) params.set('price_min_usd', String(props.priceMinUsd))
  if (props.priceMaxUsd) params.set('price_max_usd', String(props.priceMaxUsd))
  if (props.minRating) params.set('min_rating', props.minRating)
  if (props.safetyCertified) params.set('safety_certified', 'true')
  if (props.amenities?.length) params.set('amenities', props.amenities.join(','))
  params.set('sort', props.sort)
  const queryStr = params.toString()
  return `${apiBase}/api/accommodations${queryStr ? `?${queryStr}` : ''}`
}, { watch: [() => props.category, () => props.region, () => props.search, () => props.priceMinUsd, () => props.priceMaxUsd, () => props.minRating, () => props.safetyCertified, () => props.amenities, () => props.sort] })

const accommodations = computed(() => accommodationsResponse.value?.data || [])

// Region labels for search matching
const regionLabels: Record<string, string[]> = {
  west_colombo: ['west', 'colombo', 'western', 'negombo'],
  cultural_triangle: ['cultural', 'triangle', 'sigiriya', 'dambulla', 'anuradhapura'],
  hill_country: ['hill', 'hills', 'highland', 'highlands', 'kandy', 'ella', 'nuwara eliya'],
  south: ['south', 'southern', 'galle', 'tangalle', 'mirissa', 'unawatuna'],
  east: ['east', 'eastern', 'trincomalee', 'arugam', 'batticaloa'],
  north: ['north', 'northern', 'jaffna']
}

// Amenity keywords for search matching
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

// Check if search query matches any amenity
function matchesAmenity(amenities: string[], query: string): boolean {
  const q = query.toLowerCase()
  // Direct match on amenity name
  if (amenities.some(a => a.toLowerCase().includes(q))) return true
  // Check against amenity keywords
  for (const [amenity, keywords] of Object.entries(amenityKeywords)) {
    if (keywords.some(k => q.includes(k)) && amenities.some(a => a.toLowerCase().includes(amenity))) {
      return true
    }
  }
  return false
}

// Check if search query matches region
function matchesRegion(location: any, query: string): boolean {
  const q = query.toLowerCase()
  for (const keywords of Object.values(regionLabels)) {
    if (keywords.some(k => q.includes(k))) {
      // Check if accommodation's location matches this region
      const locName = (location?.name || '').toLowerCase()
      const district = (location?.district || '').toLowerCase()
      if (keywords.some(k => locName.includes(k) || district.includes(k))) {
        return true
      }
    }
  }
  return false
}

// Filter by saved and enhanced search
const filteredAccommodations = computed(() => {
  let results = accommodations.value

  // Filter by city (secondary location filter)
  if (props.city) {
    results = results.filter(a => a.location?.name === props.city)
  }

  // Filter by favorites if enabled
  if (props.showFavoritesOnly) {
    results = results.filter(a => isFavorite(a.id))
  }

  // Additional client-side filtering for amenities/region when search is present
  if (props.search) {
    const q = props.search.toLowerCase()
    results = results.filter(a => {
      // Already matched by backend (name, description, location)
      const nameMatch = a.name.toLowerCase().includes(q)
      const locationMatch = (a.location?.name || '').toLowerCase().includes(q)
      const districtMatch = (a.location?.district || '').toLowerCase().includes(q)
      
      // Additional matches
      const amenityMatch = matchesAmenity(a.amenities || [], q)
      const regionMatch = matchesRegion(a.location, q)
      
      return nameMatch || locationMatch || districtMatch || amenityMatch || regionMatch
    })
  }

  return results
})

const amenityIcons: Record<string, string> = {
  WiFi: 'wifi',
  Pool: 'pool',
  Spa: 'spa',
  Restaurant: 'restaurant',
  'Room Service': 'room_service',
  'Hiking Trails': 'hiking',
  Garden: 'yard',
  'Home Cooking': 'restaurant',
  'Tour Help': 'support',
}

function toUsd(lkr?: number) {
  if (!lkr) return 0
  return Math.round(lkr / 300)
}

const displayedAccommodations = computed(() => {
  return filteredAccommodations.value.map((a) => ({
    id: a.id,
    image: a.image_url || '/images/downloaded_eea297ee51ba.avif',
    title: a.name,
    location: a.location?.name || a.location?.district || 'Sri Lanka',
    type: a.category,
    isSafetyCertified: a.safety_certified,
    safetyScore: a.rating ? Math.round((a.rating / 5) * 10) : undefined,
    amenities: (a.amenities || []).slice(0, 3).map((item) => ({
      icon: amenityIcons[item] || 'check',
      label: item,
    })),
    price: toUsd(a.price_per_night_lkr),
    rating: a.rating || 0,
    reviews: a.review_count || 0,
    lat: a.location?.latitude,
    lng: a.location?.longitude,
  }))
})

const showDetails = ref(false)
const selectedAccommodationId = ref<string | number | null>(null)
const deepLinkHandled = ref(false)

const route = useRoute()

function scrollToAccommodation(id: string) {
  nextTick(() => {
    const el = document.getElementById(`accommodation-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')
      }, 3000)
    }
  })
}

function openDetails(id: string | number) {
  selectedAccommodationId.value = id
  showDetails.value = true
}

function closeDetails() {
  showDetails.value = false
  selectedAccommodationId.value = null
}

watch(
  () => [route.query.id, accommodations.value.length],
  async ([id]) => {
    if (!id || deepLinkHandled.value || accommodations.value.length === 0) return
    deepLinkHandled.value = true
    await openDetails(id as string)
    scrollToAccommodation(id as string)
  },
  { immediate: true }
)

// Emit loaded accommodations
watch(accommodations, (val) => {
  emit('accommodationsLoaded', val)
}, { immediate: true })
</script>
