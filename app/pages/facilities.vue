<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark text-slate-700 dark:text-slate-300 font-sans antialiased flex flex-col transition-colors duration-300">
    <Header variant="solid" />
    
    <!-- Hero Section -->
    <header class="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          alt="Sri Lankan Coastline" 
          class="w-full h-full object-cover" 
          src="/images/downloaded_d71015a3329c.avif"
        />
        <div class="absolute inset-0 bg-primary/20 dark:bg-primary/40 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-slate-900/60"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10 text-center text-white mt-10">
        <div class="flex flex-col items-center justify-center gap-6">
          <div class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
            <span class="material-icons-round text-xl text-secondary">explore</span>
            <span class="text-sm font-medium tracking-wide uppercase">Travel Essentials</span>
          </div>
          <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg tracking-tight leading-tight">
            Facilities Finder
          </h1>
          <p class="text-lg md:text-xl font-light text-blue-50/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Discover community-rated restrooms, pristine beaches, and cultural attractions across the island.
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="relative z-20 -mt-24 px-4 pb-24">
      <div class="container mx-auto max-w-5xl">
        
        <!-- Filter Tabs -->
        <div class="bg-surface-light dark:bg-surface-dark p-2 rounded-2xl shadow-soft dark:shadow-none border border-slate-100 dark:border-slate-700 mx-auto max-w-3xl mb-8 transform translate-y-0 transition-transform hover:-translate-y-1 duration-300">
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="type in facilityTypes"
              :key="type.value"
              @click="selectedType = type.value"
              :class="[
                'group flex flex-col md:flex-row items-center justify-center gap-2 py-4 md:py-5 rounded-xl transition-all font-medium relative overflow-hidden',
                selectedType === type.value 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              ]"
            >
              <div v-if="selectedType === type.value" class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span class="material-icons-round text-2xl" :class="type.iconClass">{{ type.iconName }}</span>
              <span>{{ type.label }}</span>
            </button>
          </div>
        </div>

        <!-- Location Access Alert -->
        <div v-if="!userLocation" class="flex items-center justify-center mb-16">
          <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 text-orange-600 dark:text-orange-400 text-sm font-medium shadow-sm">
            <span class="material-icons-round text-lg animate-pulse">location_disabled</span>
            <span>Location access unavailable • <button @click="requestLocation" class="underline hover:text-orange-700 dark:hover:text-orange-300">Enable location</button> for distance sorting</span>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-16">
          <div class="animate-spin size-10 border-3 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-slate-500 dark:text-slate-400">Finding facilities...</p>
        </div>

        <!-- Facilities Grid -->
        <div v-else-if="facilities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="facility in facilities"
            :key="facility.id"
            class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-100 dark:border-white/10"
          >
            <!-- Type Icon & Distance Badge -->
            <div class="flex items-start justify-between mb-4">
              <div class="text-4xl">
                {{ facilityTypes.find(t => t.value === facility.type)?.icon || '📍' }}
              </div>
              <div v-if="userLocation && facility.latitude && facility.longitude" class="text-xs bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-full text-slate-600 dark:text-slate-300">
                {{ getDistance(userLocation.lat, userLocation.lng, facility.latitude, facility.longitude).toFixed(1) }} km
              </div>
            </div>

            <!-- Name & Location -->
            <h3 class="font-bold text-lg mb-2 text-slate-800 dark:text-white">{{ facility.name }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-1">
              <span class="material-icons-round text-sm">location_on</span>
              {{ facility.location || facility.district || 'Sri Lanka' }}
            </p>

            <!-- Rating Display -->
            <div class="flex items-center gap-2 mb-4">
              <div class="flex text-amber-400">
                <span v-for="i in 5" :key="i" class="text-lg">
                  {{ i <= Math.round(facility.average_rating || 0) ? '★' : '☆' }}
                </span>
              </div>
              <span class="text-sm text-slate-600 dark:text-slate-400">
                {{ facility.average_rating?.toFixed(1) || 'No ratings' }}
                <span v-if="facility.rating_count" class="text-slate-400">({{ facility.rating_count }})</span>
              </span>
            </div>

            <!-- Cleanliness Badge (for restrooms) -->
            <div v-if="facility.type === 'RESTROOM' && facility.cleanliness_score" class="mb-4">
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  facility.cleanliness_score >= 4 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                  facility.cleanliness_score >= 3 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                  'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                ]"
              >
                🧹 Cleanliness: {{ facility.cleanliness_score }}/5
              </span>
            </div>

            <!-- Safety Badge (for beaches) -->
            <div v-if="facility.type === 'BEACH' && facility.safety_rating" class="mb-4">
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  facility.safety_rating >= 4 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                  facility.safety_rating >= 3 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                  'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                ]"
              >
                🏊 Safety: {{ facility.safety_rating }}/5
              </span>
            </div>

            <!-- Amenities Tags -->
            <div v-if="facility.amenities && facility.amenities.length" class="flex flex-wrap gap-1 mb-4">
              <span 
                v-for="amenity in facility.amenities.slice(0, 3)" 
                :key="amenity"
                class="text-xs bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400"
              >
                {{ amenity }}
              </span>
            </div>

            <!-- Actions -->
            <button 
              @click="openRatingModal(facility)"
              class="w-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-icons-round text-lg">star</span>
              Rate This
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center text-center py-12 px-4 border border-dashed border-slate-200 dark:border-slate-700 rounded-3xl bg-slate-50/50 dark:bg-slate-800/20 max-w-4xl mx-auto">
          <div class="relative mb-8">
            <div class="absolute -inset-8 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-60 blur-2xl"></div>
            <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-full shadow-soft relative inline-block">
              <span class="material-icons-round text-6xl text-slate-400 dark:text-slate-500">travel_explore</span>
              <div class="absolute bottom-0 right-0 bg-secondary text-white rounded-full p-1.5 shadow-md border-4 border-surface-light dark:border-surface-dark">
                <span class="material-icons-round text-lg block">priority_high</span>
              </div>
            </div>
          </div>
          <h2 class="text-3xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4">
            No locations found nearby
          </h2>
          <p class="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-lg leading-relaxed mb-8">
            We couldn't find any {{ selectedTypeLabel }} in this specific area yet. Try selecting a different category above, or help fellow travelers by adding a spot you know.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <button 
              @click="clearFilters"
              class="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium shadow-sm"
            >
              <span class="material-icons-round text-lg">filter_list</span>
              Clear Filters
            </button>
            <button class="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all font-medium shadow-glow transform hover:-translate-y-0.5">
              <span class="material-icons-round text-lg">add_location_alt</span>
              Contribute a Location
            </button>
          </div>
        </div>

      </div>
    </main>

    <!-- Rating Modal -->
    <Teleport to="body">
      <div 
        v-if="showRatingModal" 
        class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        @click.self="showRatingModal = false"
      >
        <div class="bg-surface-light dark:bg-surface-dark rounded-2xl max-w-md w-full p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white">
              Rate {{ selectedFacility?.name }}
            </h3>
            <button @click="showRatingModal = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <span class="material-icons-round">close</span>
            </button>
          </div>

          <!-- Star Rating -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">Your Rating</label>
            <div class="flex gap-2 justify-center">
              <button
                v-for="i in 5"
                :key="i"
                @click="ratingForm.overall_rating = i"
                class="text-4xl hover:scale-110 transition-transform"
              >
                <span :class="i <= ratingForm.overall_rating ? 'text-amber-400' : 'text-slate-300'">
                  {{ i <= ratingForm.overall_rating ? '★' : '☆' }}
                </span>
              </button>
            </div>
            <p class="text-center text-sm text-slate-500 mt-2">
              {{ ratingLabels[ratingForm.overall_rating - 1] }}
            </p>
          </div>

          <!-- Comment -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Comment (optional)</label>
            <textarea
              v-model="ratingForm.comment"
              rows="3"
              class="w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl resize-none bg-slate-50 dark:bg-white/5 focus:ring-2 focus:ring-primary outline-none text-slate-700 dark:text-white"
              placeholder="Share your experience..."
            />
          </div>

          <!-- Submit -->
          <div class="flex gap-3">
            <button 
              @click="showRatingModal = false"
              class="flex-1 px-4 py-3 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 font-medium text-slate-700 dark:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="submitRating"
              :disabled="submitting"
              class="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium transition-colors disabled:opacity-50"
            >
              {{ submitting ? 'Submitting...' : 'Submit Rating' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- AI Chat Widget -->
    <button class="fixed bottom-6 right-6 bg-secondary hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-50 group">
      <span class="material-icons-round text-2xl group-hover:rotate-12 transition-transform">smart_toy</span>
      <span class="absolute top-2 right-3 w-3 h-3 bg-green-400 rounded-full border-2 border-secondary"></span>
      <span class="absolute right-16 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Ask AI Guide
      </span>
    </button>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

definePageMeta({
  layout: false
})

useHead({
  title: 'Facilities Finder - CeylonGuides',
  meta: [
    { name: 'description', content: 'Find and rate clean restrooms, safe beaches, and tourist attractions across Sri Lanka' }
  ]
})

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

interface Facility {
  id: string
  name: string
  type: string
  location?: string
  district?: string
  latitude?: number
  longitude?: number
  average_rating?: number
  rating_count?: number
  cleanliness_score?: number
  safety_rating?: number
  amenities?: string[]
}

const selectedType = ref<string>('RESTROOM')
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const facilities = ref<Facility[]>([])
const isLoading = ref(false)
const showRatingModal = ref(false)
const selectedFacility = ref<Facility | null>(null)
const submitting = ref(false)

const ratingForm = ref({
  overall_rating: 5,
  cleanliness_rating: 5,
  safety_rating: 5,
  comment: ''
})

const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

const facilityTypes = [
  { value: 'RESTROOM', label: 'Restrooms', icon: '🚻', iconName: 'wc', iconClass: '' },
  { value: 'BEACH', label: 'Beaches', icon: '🏖️', iconName: 'beach_access', iconClass: 'text-secondary group-hover:scale-110 transition-transform' },
  { value: 'ATTRACTION', label: 'Attractions', icon: '🎭', iconName: 'attractions', iconClass: 'text-blue-400 group-hover:scale-110 transition-transform' }
]

const selectedTypeLabel = computed(() => 
  facilityTypes.find(t => t.value === selectedType.value)?.label.toLowerCase() || 'facilities'
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
      facilities.value.sort((a, b) => {
        const distA = a.latitude && a.longitude 
          ? getDistance(userLocation.value!.lat, userLocation.value!.lng, a.latitude, a.longitude)
          : Infinity
        const distB = b.latitude && b.longitude 
          ? getDistance(userLocation.value!.lat, userLocation.value!.lng, b.latitude, b.longitude)
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

function openRatingModal(facility: Facility) {
  selectedFacility.value = facility
  showRatingModal.value = true
  ratingForm.value = { overall_rating: 5, cleanliness_rating: 5, safety_rating: 5, comment: '' }
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

watch(selectedType, loadFacilities)

onMounted(async () => {
  userLocation.value = await getUserLocation()
  loadFacilities()
})
</script>
