<template>
  <div
    class="min-h-screen bg-background-light dark:bg-background-dark text-slate-700 dark:text-slate-300 font-sans antialiased flex flex-col transition-colors duration-300">
    <Header variant="solid" />

    <!-- Hero Section -->
    <FacilitiesHero />

    <!-- Filter Bar -->
    <FacilitiesFilterBar :search-query="searchQuery" :sort-by="sortBy" :selected-city="selectedCity"
      :active-filters="activeFilters" :has-location="!!userLocation" :results-count="filteredFacilities.length"
      :free-count="freeCount" :avg-rating="avgRating" @update:search-query="searchQuery = $event"
      @update:sort-by="sortBy = $event" @update:selected-city="selectedCity = $event"
      @update:active-filters="activeFilters = $event" @near-me="findNearestRestroom"
      @enable-location="requestLocation" />

    <!-- Main Content Area -->
    <main
      class="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-400px)] min-h-[600px]">
      <!-- Facilities List -->
      <div class="w-full lg:w-1/3 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide pb-10">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-16">
          <div class="animate-spin size-10 border-3 border-primary border-t-transparent rounded-full mx-auto mb-4">
          </div>
          <p class="text-slate-500 dark:text-slate-400">Finding facilities...</p>
        </div>

        <!-- Facility Cards -->
        <template v-else-if="filteredFacilities.length > 0">
          <FacilitiesFacilityCard v-for="facility in filteredFacilities" :key="facility.id" :name="facility.name"
            :location-type="facility.location?.name || 'Location'" :rating="facility.average_rating || 0"
            :review-count="facility.rating_count || 0" :is-free="!facility.price || facility.price === 0"
            :price="facility.price ? `Rs ${facility.price}` : 'Free'"
            :is-accessible="facility.amenities?.includes('Accessible') || false"
            :city="facility.location?.district || 'Sri Lanka'"
            :description="facility.description || getDefaultDescription(facility)"
            :color-scheme="getColorScheme(facility)" @click="openDetails(facility.id)" />
        </template>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center text-center py-12 px-4">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">No facilities found</h3>
          <p class="text-slate-600 dark:text-slate-400 mb-4">
            Try adjusting your filters or search criteria
          </p>
          <button @click="clearAllFilters"
            class="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
            Clear All Filters
          </button>
        </div>
      </div>

      <!-- Map -->
      <FacilitiesMap :markers="mapMarkers" @marker-click="handleMarkerClick" @zoom-in="handleZoomIn"
        @zoom-out="handleZoomOut" />
    </main>

    <!-- Rating Modal -->
    <Teleport to="body">
      <div v-if="showRatingModal" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        @click.self="showRatingModal = false">
        <div class="bg-surface-light dark:bg-surface-dark rounded-2xl max-w-md w-full p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white">
              Rate {{ selectedFacility?.name }}
            </h3>
            <button @click="showRatingModal = false"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <span class="material-icons-round">close</span>
            </button>
          </div>

          <!-- Star Rating -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">Your Rating</label>
            <div class="flex gap-2 justify-center">
              <button v-for="i in 5" :key="i" @click="ratingForm.rating = i"
                class="text-4xl hover:scale-110 transition-transform">
                <span :class="i <= ratingForm.rating ? 'text-amber-400' : 'text-slate-300'">
                  {{ i <= ratingForm.rating ? '★' : '☆' }} </span>
              </button>
            </div>
            <p class="text-center text-sm text-slate-500 mt-2">
              {{ ratingLabels[ratingForm.rating - 1] }}
            </p>
          </div>

          <!-- Comment -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Comment (optional)</label>
            <textarea v-model="ratingForm.comment" rows="3"
              class="w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl resize-none bg-slate-50 dark:bg-white/5 focus:ring-2 focus:ring-primary outline-none text-slate-700 dark:text-white"
              placeholder="Share your experience..." />
          </div>

          <!-- Submit -->
          <div class="flex gap-3">
            <button @click="showRatingModal = false"
              class="flex-1 px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 font-medium text-slate-700 dark:text-white transition-colors">
              Cancel
            </button>
            <button @click="submitRating" :disabled="submitting"
              class="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium transition-colors disabled:opacity-50">
              {{ submitting ? 'Submitting...' : 'Submit Rating' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Details Modal -->
    <Teleport to="body">
      <div v-if="showDetailsModal" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        @click.self="closeDetails">
        <div
          class="bg-white rounded-3xl shadow-modal w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col relative animate-in fade-in zoom-in duration-300">
          <!-- Header -->
          <div class="flex items-start justify-between p-6 pb-2">
            <div class="flex gap-4">
              <div :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                getIconBgColor(facilityDetails)
              ]">
                <span class="material-icons">{{ getIconName(facilityDetails) }}</span>
              </div>
              <div>
                <h2 class="font-bold text-gray-900 text-lg leading-tight">
                  {{ facilityDetails?.name || 'Facility Details' }}
                </h2>
                <div class="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <span class="material-icons text-[16px]">location_on</span>
                  {{ facilityDetails?.location?.name || facilityDetails?.location?.district || 'Sri Lanka' }}
                </div>
              </div>
            </div>
            <button @click="closeDetails"
              class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <span class="material-icons">close</span>
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="detailsLoading" class="px-6 py-12 text-center">
            <div class="animate-spin size-8 border-3 border-primary border-t-transparent rounded-full mx-auto mb-3">
            </div>
            <p class="text-sm text-gray-500">Loading details...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="detailsError" class="px-6 py-12 text-center">
            <span class="material-icons text-red-500 text-4xl mb-3">error_outline</span>
            <p class="text-sm text-red-600">{{ detailsError }}</p>
          </div>

          <!-- Content -->
          <template v-else-if="facilityDetails">
            <!-- Rating & Price Badges -->
            <div class="px-6 flex gap-3 mb-6">
              <div
                class="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-700 border border-gray-100">
                <span class="material-icons text-primary text-[16px]">star</span>
                <span>{{ facilityDetails.average_rating?.toFixed(1) || 'N/A' }}/5</span>
                <span class="text-gray-500 font-normal text-xs">({{ facilityDetails.rating_count || 0 }} reviews)</span>
              </div>
              <div v-if="facilityDetails.price !== undefined"
                class="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-700 border border-gray-100">
                <span class="material-icons text-gray-500 text-[16px]">
                  {{ facilityDetails.price > 0 ? 'payments' : 'check_circle' }}
                </span>
                <span>{{ facilityDetails.price > 0 ? `Rs ${facilityDetails.price}` : 'Free' }}</span>
              </div>
            </div>

            <!-- Scrollable Content -->
            <div class="px-6 overflow-y-auto space-y-5 pb-6">
              <!-- Description / Community Notes -->
              <div v-if="facilityDetails.description">
                <h2 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Community Notes</h2>
                <p class="text-sm text-gray-600 leading-relaxed">{{ facilityDetails.description }}</p>
              </div>

              <!-- Accessibility -->
              <div v-if="facilityDetails.amenities?.length">
                <h2 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Amenities</h2>
                <div class="flex flex-wrap gap-2">
                  <span v-for="amenity in facilityDetails.amenities" :key="amenity"
                    class="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                    <span class="material-icons text-[14px]">check</span>
                    {{ amenity }}
                  </span>
                </div>
              </div>

              <!-- Ratings Breakdown -->
              <div v-if="facilityDetails.cleanliness_rating || facilityDetails.safety_rating">
                <h2 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ratings Breakdown</h2>
                <div class="grid grid-cols-3 gap-2">
                  <div v-if="facilityDetails.cleanliness_rating"
                    class="rounded-lg bg-gray-50 p-3 text-center border border-gray-100">
                    <div class="font-bold text-lg text-gray-900">{{ facilityDetails.cleanliness_rating.toFixed(1) }}
                    </div>
                    <div class="text-[10px] uppercase tracking-wide text-gray-500 mt-1">Cleanliness</div>
                  </div>
                  <div v-if="facilityDetails.safety_rating"
                    class="rounded-lg bg-gray-50 p-3 text-center border border-gray-100">
                    <div class="font-bold text-lg text-gray-900">{{ facilityDetails.safety_rating.toFixed(1) }}</div>
                    <div class="text-[10px] uppercase tracking-wide text-gray-500 mt-1">Safety</div>
                  </div>
                  <div class="rounded-lg bg-gray-50 p-3 text-center border border-gray-100">
                    <div class="font-bold text-lg text-gray-900">{{ facilityDetails.average_rating?.toFixed(1) || 'N/A'
                    }}</div>
                    <div class="text-[10px] uppercase tracking-wide text-gray-500 mt-1">Overall</div>
                  </div>
                </div>
              </div>

              <!-- Recent Reviews -->
              <div v-if="facilityDetails.ratings?.length">
                <h2 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Recent Reviews</h2>
                <div class="space-y-3">
                  <div v-for="rating in facilityDetails.ratings.slice(0, 3)" :key="rating.id"
                    class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div class="flex items-center justify-between mb-1">
                      <span class="font-semibold text-sm text-gray-900">{{ rating.user_name || 'Traveler' }}</span>
                      <div class="flex items-center gap-1">
                        <span class="material-icons text-yellow-500 text-[14px]">star</span>
                        <span class="text-sm font-semibold text-gray-700">{{ rating.overall_rating.toFixed(1) }}</span>
                      </div>
                    </div>
                    <p v-if="rating.comment" class="text-xs text-gray-600 leading-relaxed">{{ rating.comment }}</p>
                  </div>
                </div>
              </div>

              <!-- Location Map Placeholder -->
              <div>
                <h2 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location</h2>
                <div class="w-full h-40 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative">
                  <div class="absolute inset-0 bg-blue-50/50 flex items-center justify-center">
                    <span class="material-icons text-blue-200 text-4xl">map</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="p-6 border-t border-gray-100 bg-white sticky bottom-0 rounded-b-3xl">
              <div class="flex gap-3 mb-4">
                <button @click="getDirections"
                  class="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all">
                  <span class="material-icons text-sm">directions</span> Get Directions
                </button>
                <button @click="closeDetails"
                  class="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold py-2.5 px-4 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all">
                  <span class="material-icons text-sm">close</span> Close
                </button>
              </div>
              <button @click="reportIssue"
                class="w-full text-center text-xs font-medium text-gray-500 hover:text-primary flex items-center justify-center gap-1.5 transition-colors">
                <span class="material-icons text-[14px]">flag</span> Report Issue / Update
              </button>
            </div>
          </template>

          <!-- Empty State -->
          <div v-else class="px-6 py-12 text-center">
            <span class="material-icons text-gray-300 text-4xl mb-3">info</span>
            <p class="text-sm text-gray-500">No details available.</p>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- AI Chat Widget -->
    <button
      class="fixed bottom-6 right-6 bg-secondary hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-50 group">
      <span class="material-icons-round text-2xl group-hover:rotate-12 transition-transform">smart_toy</span>
      <span class="absolute top-2 right-3 w-3 h-3 bg-green-400 rounded-full border-2 border-secondary"></span>
      <span
        class="absolute right-16 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Ask AI Guide
      </span>
    </button>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useFacilities, type Restroom, type RestroomFilter, type FacilitySortOption } from '~/composables/useFacilities'
import type { Facility } from '~/types/api'

// SEO Meta
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Restrooms Finder - CeylonWiki',
  meta: [
    { name: 'description', content: 'Find and rate clean restrooms, safe beaches, and tourist attractions across Sri Lanka' }
  ]
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

type ApiFacility = Facility

const selectedType = ref<string>('RESTROOM')
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const facilities = ref<Facility[]>([])
const isLoading = ref(false)
const showRatingModal = ref(false)
const selectedFacility = ref<Facility | null>(null)
const submitting = ref(false)
const showDetailsModal = ref(false)
const detailsLoading = ref(false)
const detailsError = ref('')
const facilityDetails = ref<Facility | null>(null)

// New filter state
const searchQuery = ref('')
const sortBy = ref('recommended')
const selectedCity = ref('all')
const activeFilters = ref<string[]>(['all'])

const ratingForm = ref({
  rating: 5,
  comment: ''
})

// Nearest Restroom feature
const findingNearest = ref(false)
const nearestRestrooms = ref<(Facility & { distance?: number })[]>([])

const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

// Computed: Filtered facilities based on search and filters
const filteredFacilities = computed(() => {
  let result = [...facilities.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(f =>
      f.name.toLowerCase().includes(query) ||
      f.location?.name?.toLowerCase().includes(query) ||
      f.location?.district?.toLowerCase().includes(query)
    )
  }

  // City filter
  if (selectedCity.value !== 'all') {
    result = result.filter(f =>
      f.location?.district?.toLowerCase() === selectedCity.value.toLowerCase()
    )
  }

  // Active filters
  if (!activeFilters.value.includes('all')) {
    result = result.filter(f => {
      if (activeFilters.value.includes('free') && (!f.price || f.price === 0)) return true
      if (activeFilters.value.includes('paid') && f.price && f.price > 0) return true
      if (activeFilters.value.includes('rated') && f.average_rating && f.average_rating >= 4) return true
      if (activeFilters.value.includes('accessible') && f.amenities?.includes('Accessible')) return true
      if (activeFilters.value.includes('transport') && f.location?.name?.toLowerCase().includes('transport')) return true
      return false
    })
  }

  // Sort
  if (sortBy.value === 'rating') {
    result.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
  } else if (sortBy.value === 'distance' && userLocation.value) {
    result.sort((a, b) => {
      const distA = a.location?.latitude && a.location?.longitude
        ? getDistance(userLocation.value!.lat, userLocation.value!.lng, a.location.latitude, a.location.longitude)
        : Infinity
      const distB = b.location?.latitude && b.location?.longitude
        ? getDistance(userLocation.value!.lat, userLocation.value!.lng, b.location.latitude, b.location.longitude)
        : Infinity
      return distA - distB
    })
  }

  return result
})

// Computed: Stats
const freeCount = computed(() =>
  filteredFacilities.value.filter(f => !f.price || f.price === 0).length
)

const avgRating = computed(() => {
  const rated = filteredFacilities.value.filter(f => f.average_rating)
  if (rated.length === 0) return 0
  const sum = rated.reduce((acc, f) => acc + (f.average_rating || 0), 0)
  return Number((sum / rated.length).toFixed(1))
})

// Computed: Map markers
const mapMarkers = computed(() => {
  return filteredFacilities.value
    .filter(f => f.location?.latitude && f.location?.longitude)
    .slice(0, 10) // Limit to 10 markers for performance
    .map((f, idx) => ({
      id: f.id,
      top: `${60 + (idx % 3) * 3}%`,
      left: `${30 + (idx % 4) * 2}%`,
      color: f.price && f.price > 0 ? 'bg-orange-500' : 'bg-primary'
    }))
})

const { data: typesResponse } = await useFetch<{
  success: boolean
  data: Array<{ facility_type: string; count: number; category?: string }>
}>(`${apiBase}/api/facilities/types/list`)

const iconMap: Record<string, { icon: string; iconName: string; iconClass: string }> = {
  RESTROOM: { icon: '🚻', iconName: 'wc', iconClass: '' },
  BEACH: { icon: '🏖️', iconName: 'beach_access', iconClass: 'text-secondary group-hover:scale-110 transition-transform' },
  ATTRACTION: { icon: '🎭', iconName: 'attractions', iconClass: 'text-blue-400 group-hover:scale-110 transition-transform' }
}

const facilityTypes = computed(() => {
  const data = typesResponse.value?.data || []
  if (!data.length) {
    return [
      { value: 'RESTROOM', label: 'Restrooms', icon: '🚻', iconName: 'wc', iconClass: '' },
      { value: 'BEACH', label: 'Beaches', icon: '🏖️', iconName: 'beach_access', iconClass: 'text-secondary group-hover:scale-110 transition-transform' },
      { value: 'ATTRACTION', label: 'Attractions', icon: '🎭', iconName: 'attractions', iconClass: 'text-blue-400 group-hover:scale-110 transition-transform' }
    ]
  }

  return data.map((item) => {
    const type = item.facility_type || item.category || 'OTHER'
    const iconInfo = iconMap[type] || { icon: '📍', iconName: 'place', iconClass: '' }
    return {
      value: type,
      label: type.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase()),
      ...iconInfo
    }
  })
})

const selectedTypeLabel = computed(() =>
  facilityTypes.value.find(t => t.value === selectedType.value)?.label.toLowerCase() || 'facilities'
)

async function getUserLocation(): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      () => resolve(null),
      { timeout: 10000 }
    )
  })
}

async function requestLocation() {
  const location = await getUserLocation()
  if (location) {
    userLocation.value = location
    await loadFacilities()
  }
}

function clearFilters() {
  selectedType.value = 'RESTROOM'
}

function clearAllFilters() {
  searchQuery.value = ''
  sortBy.value = 'recommended'
  selectedCity.value = 'all'
  activeFilters.value = ['all']
  selectedType.value = 'RESTROOM'
}

function getDefaultDescription(facility: Facility): string {
  if (facility.type === 'RESTROOM') {
    return 'Community-rated restroom facility.'
  } else if (facility.type === 'BEACH') {
    return 'Beautiful beach location in Sri Lanka.'
  } else {
    return 'Tourist attraction in Sri Lanka.'
  }
}

function getColorScheme(facility: Facility): 'green' | 'orange' | 'blue' | 'purple' {
  if (facility.price && facility.price > 0) {
    return 'orange'
  }
  if (facility.type === 'BEACH') {
    return 'blue'
  }
  if (facility.type === 'ATTRACTION') {
    return 'purple'
  }
  return 'green'
}

function handleMarkerClick(id: string) {
  openDetails(id)
}

function handleZoomIn() {
  // Map zoom functionality - can be implemented with actual map library
  console.log('Zoom in')
}

function handleZoomOut() {
  // Map zoom functionality - can be implemented with actual map library
  console.log('Zoom out')
}

// Find nearest restroom function
async function findNearestRestroom() {
  if (!userLocation.value) return

  findingNearest.value = true
  try {
    const response = await $fetch<{ success: boolean; data: Facility[] }>(`${apiBase}/api/facilities`, {
      params: {
        type: 'RESTROOM',
        lat: userLocation.value.lat,
        lng: userLocation.value.lng,
        radius: 50
      }
    })

    const restrooms = (response.data || []).map(r => ({
      ...r,
      distance: r.location?.latitude && r.location?.longitude
        ? getDistance(userLocation.value!.lat, userLocation.value!.lng, r.location.latitude, r.location.longitude)
        : Infinity
    }))

    // Sort by distance and take closest 3
    restrooms.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity))
    nearestRestrooms.value = restrooms.slice(0, 3)

    // Also switch to restroom view
    selectedType.value = 'RESTROOM'

  } catch (error) {
    console.error('Failed to find nearest restroom:', error)
    nearestRestrooms.value = []
  } finally {
    findingNearest.value = false
  }
}

async function loadFacilities() {
  isLoading.value = true
  try {
    const params: Record<string, any> = {
      type: selectedType.value
    }

    if (userLocation.value) {
      params.lat = userLocation.value.lat
      params.lng = userLocation.value.lng
      params.radius = 50
    }

    const response = await $fetch<{ success: boolean; data: Facility[] }>(`${apiBase}/api/facilities`, {
      params
    })

    facilities.value = response.data || []

    // Sort by distance if we have user location
    if (userLocation.value) {
      facilities.value.sort((a: ApiFacility, b: ApiFacility) => {
        const distA = a.location?.latitude && a.location?.longitude
          ? getDistance(userLocation.value!.lat, userLocation.value!.lng, a.location.latitude, a.location.longitude)
          : Infinity
        const distB = b.location?.latitude && b.location?.longitude
          ? getDistance(userLocation.value!.lat, userLocation.value!.lng, b.location.latitude, b.location.longitude)
          : Infinity
        return distA - distB
      })
    }

  } catch (error) {
    console.error('Failed to load facilities:', error)
    facilities.value = []
  } finally {
    isLoading.value = false
  }
}

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function clearSearch() {
  searchQuery.value = ''
}

async function submitRating() {
  if (!selectedFacility.value) return

  submitting.value = true
  try {
    await $fetch(`${apiBase}/api/facilities/${selectedFacility.value.id}/rate`, {
      method: 'POST',
      body: ratingForm.value
    })

    showRatingModal.value = false
    await loadFacilities()

  } catch (error) {
    console.error('Failed to submit rating:', error)
    alert('Failed to submit rating. Please try again.')
  } finally {
    submitting.value = false
  }
}

async function openDetails(id: string) {
  showDetailsModal.value = true
  detailsLoading.value = true
  detailsError.value = ''
  try {
    const response = await $fetch<{ success: boolean; data: Facility }>(`${apiBase}/api/facilities/${id}`)
    if (response.success) {
      facilityDetails.value = response.data
    }
  } catch (err: any) {
    detailsError.value = err?.data?.error || 'Failed to load facility details.'
  } finally {
    detailsLoading.value = false
  }
}

function closeDetails() {
  showDetailsModal.value = false
  facilityDetails.value = null
}

function getIconBgColor(facility: Facility | null): string {
  if (!facility) return 'bg-gray-50 text-gray-600'

  const colorScheme = getColorScheme(facility)
  const colorMap = {
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600'
  }
  return colorMap[colorScheme]
}

function getIconName(facility: Facility | null): string {
  if (!facility) return 'place'

  if (facility.type === 'RESTROOM') return 'wc'
  if (facility.type === 'BEACH') return 'beach_access'
  if (facility.type === 'ATTRACTION') return 'attractions'
  return 'place'
}

function getDirections() {
  if (!facilityDetails.value?.location) return

  const { latitude, longitude } = facilityDetails.value.location
  const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
  window.open(url, '_blank')
}

function reportIssue() {
  // Placeholder for report issue functionality
  alert('Report issue functionality coming soon!')
}

watch(selectedType, loadFacilities)

// Handle ?id= deep-link query param
const route = useRoute()

function scrollToFacility(id: string) {
  nextTick(() => {
    const el = document.getElementById(`facility-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')
      }, 3000)
    }
  })
}

onMounted(async () => {
  userLocation.value = await getUserLocation()
  await loadFacilities()

  // Handle deep-link ?id= param
  const targetId = route.query.id as string
  if (targetId) {
    await openDetails(targetId)
    scrollToFacility(targetId)
  }
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
