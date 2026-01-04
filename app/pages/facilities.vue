<template>
  <div class="min-h-screen bg-gray-50 dark:bg-background-dark">
    <Header variant="solid" />
    
    <!-- Hero -->
    <section class="bg-gradient-to-r from-primary to-deep-teal text-white pt-28 pb-16">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-4xl">🏢</span>
          <h1 class="text-4xl font-bold">Facilities Finder</h1>
        </div>
        <p class="text-xl text-white/90">
          Community-rated restrooms, beaches, and attractions across Sri Lanka
        </p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <div class="max-w-6xl mx-auto px-6 -mt-6 relative z-10">
      <div class="bg-white dark:bg-surface-dark rounded-xl shadow-lg p-2 flex gap-2">
        <button
          v-for="type in facilityTypes"
          :key="type.value"
          @click="selectedType = type.value"
          :class="[
            'flex-1 px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2',
            selectedType === type.value
              ? 'bg-primary text-white shadow-md'
              : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
          ]"
        >
          <span class="text-xl">{{ type.icon }}</span>
          <span class="hidden sm:inline">{{ type.label }}</span>
        </button>
      </div>
    </div>

    <!-- Location Status -->
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div v-if="userLocation" class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <span class="material-symbols-outlined text-green-500 text-sm">location_on</span>
        Showing facilities near you • Sorted by distance
      </div>
      <div v-else class="text-sm text-amber-600 flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">location_off</span>
        Location not available • Enable for distance sorting
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-6 pb-20">
      
      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-16">
        <div class="animate-spin size-10 border-3 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-500">Finding facilities...</p>
      </div>

      <!-- Facilities Grid -->
      <div v-else-if="facilities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="facility in facilities"
          :key="facility.id"
          class="bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100 dark:border-white/10"
        >
          <!-- Type Icon & Distance Badge -->
          <div class="flex items-start justify-between mb-4">
            <div class="text-4xl">
              {{ facilityTypes.find(t => t.value === facility.type)?.icon || '📍' }}
            </div>
            <div v-if="userLocation && facility.latitude && facility.longitude" class="text-xs bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
              {{ getDistance(userLocation.lat, userLocation.lng, facility.latitude, facility.longitude).toFixed(1) }} km
            </div>
          </div>

          <!-- Name & Location -->
          <h3 class="font-bold text-lg mb-2 dark:text-white">{{ facility.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">location_on</span>
            {{ facility.location || facility.district || 'Sri Lanka' }}
          </p>

          <!-- Rating Display -->
          <div class="flex items-center gap-2 mb-4">
            <div class="flex text-amber-400">
              <span v-for="i in 5" :key="i" class="text-lg">
                {{ i <= Math.round(facility.average_rating || 0) ? '★' : '☆' }}
              </span>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ facility.average_rating?.toFixed(1) || 'No ratings' }}
              <span v-if="facility.rating_count" class="text-gray-400">({{ facility.rating_count }})</span>
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
              class="text-xs bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-gray-600 dark:text-gray-400"
            >
              {{ amenity }}
            </span>
          </div>

          <!-- Actions -->
          <button 
            @click="openRatingModal(facility)"
            class="w-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-lg">star</span>
            Rate This
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-gray-600 dark:text-gray-400 text-lg mb-2">No {{ selectedTypeLabel }} found</p>
        <p class="text-sm text-gray-500">Try a different category or be the first to add one!</p>
      </div>

    </div>

    <!-- Rating Modal -->
    <Teleport to="body">
      <div 
        v-if="showRatingModal" 
        class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        @click.self="showRatingModal = false"
      >
        <div class="bg-white dark:bg-surface-dark rounded-2xl max-w-md w-full p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold dark:text-white">
              Rate {{ selectedFacility?.name }}
            </h3>
            <button @click="showRatingModal = false" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Star Rating -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-3 dark:text-gray-300">Your Rating</label>
            <div class="flex gap-2 justify-center">
              <button
                v-for="i in 5"
                :key="i"
                @click="ratingForm.overall_rating = i"
                class="text-4xl hover:scale-110 transition-transform"
              >
                <span :class="i <= ratingForm.overall_rating ? 'text-amber-400' : 'text-gray-300'">
                  {{ i <= ratingForm.overall_rating ? '★' : '☆' }}
                </span>
              </button>
            </div>
            <p class="text-center text-sm text-gray-500 mt-2">
              {{ ratingLabels[ratingForm.overall_rating - 1] }}
            </p>
          </div>

          <!-- Comment -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2 dark:text-gray-300">Comment (optional)</label>
            <textarea
              v-model="ratingForm.comment"
              rows="3"
              class="w-full px-4 py-3 border dark:border-white/10 rounded-xl resize-none bg-gray-50 dark:bg-white/5 focus:ring-2 focus:ring-primary outline-none dark:text-white"
              placeholder="Share your experience..."
            />
          </div>

          <!-- Submit -->
          <div class="flex gap-3">
            <button 
              @click="showRatingModal = false"
              class="flex-1 px-4 py-3 border dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 font-medium dark:text-white transition-colors"
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
  { value: 'RESTROOM', label: 'Restrooms', icon: '🚻' },
  { value: 'BEACH', label: 'Beaches', icon: '🏖️' },
  { value: 'ATTRACTION', label: 'Attractions', icon: '🎭' }
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
