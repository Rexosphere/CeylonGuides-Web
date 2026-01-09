<template>
  <section class="pb-12">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-bold text-neutral-dark dark:text-white">Nearest Hospitals</h2>
        <p v-if="locationStatus === 'granted'" class="text-xs text-neutral-soft mt-1">
          Sorted by distance from your location
        </p>
      </div>
      <button 
        @click="requestLocation"
        class="text-primary text-sm font-bold flex items-center hover:underline"
        :disabled="locationStatus === 'loading'"
      >
        <span class="material-symbols-outlined text-sm mr-1">{{ locationStatus === 'loading' ? 'sync' : 'my_location' }}</span>
        {{ locationStatus === 'loading' ? 'Detecting...' : 'Update Location' }}
      </button>
    </div>

    <!-- Location denied warning -->
    <div 
      v-if="locationStatus === 'denied'" 
      class="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-3"
    >
      <span class="material-symbols-outlined text-amber-600 dark:text-amber-400">location_off</span>
      <div>
        <p class="text-sm font-medium text-amber-800 dark:text-amber-300">Location access needed for nearby results</p>
        <p class="text-xs text-amber-600 dark:text-amber-400">Showing Colombo hospitals by default</p>
      </div>
    </div>

    <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] overflow-hidden shadow-sm flex flex-col md:flex-row h-[450px]">
      
      <!-- Hospital List Sidebar -->
      <div class="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-[#3a2d28] overflow-y-auto custom-scrollbar bg-neutral-50/50 dark:bg-[#2a1d18]">
        
        <div 
          v-for="(hospital, index) in sortedHospitals" 
          :key="hospital.name"
          @click="selectHospital(hospital)"
          class="p-4 border-b border-neutral-100 dark:border-[#3a2d28] cursor-pointer hover:bg-white dark:hover:bg-[#32241e] transition-colors border-l-4"
          :class="selectedHospital?.name === hospital.name ? 'border-l-primary bg-white dark:bg-[#32241e]' : 'border-l-transparent'"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-neutral-dark dark:text-white text-sm truncate">{{ hospital.name }}</h4>
              <p class="text-xs text-neutral-soft mt-0.5 truncate">{{ hospital.address }}</p>
            </div>
            <span 
              class="text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap"
              :class="hospital.type === 'public' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'"
            >
              {{ hospital.type === 'public' ? 'Public' : 'Private' }}
            </span>
          </div>
          
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center gap-2">
              <span 
                class="text-xs px-2 py-0.5 rounded font-medium"
                :class="hospital.open24h ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'"
              >
                {{ hospital.open24h ? 'Open 24/7' : 'Daytime' }}
              </span>
              <span class="text-xs text-primary font-medium">{{ hospital.distance }}</span>
            </div>
          </div>

          <div class="flex gap-2 mt-3">
            <a 
              :href="`tel:${hospital.emergencyPhone || hospital.phone}`"
              @click.stop
              class="flex-1 text-xs bg-primary/10 text-primary px-2 py-1.5 rounded font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1"
            >
              <span class="material-symbols-outlined text-sm">call</span>
              Call
            </a>
            <button 
              @click.stop="openInMaps(hospital)"
              class="flex-1 text-xs bg-neutral-100 dark:bg-[#3a2d28] text-neutral-600 dark:text-neutral-400 px-2 py-1.5 rounded font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1"
            >
              <span class="material-symbols-outlined text-sm">directions</span>
              Directions
            </button>
          </div>
        </div>

      </div>

      <!-- Map Area (hidden when offline) -->
      <div v-if="!isOffline" class="w-full md:w-3/5 relative bg-neutral-100 dark:bg-[#1a120e]">
        <div v-if="selectedHospital" class="absolute inset-0">
          <iframe
            :src="`https://www.google.com/maps?q=${selectedHospital.mapCoordinates.lat},${selectedHospital.mapCoordinates.lng}&z=15&output=embed`"
            class="w-full h-full border-0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-neutral-soft">
          <span class="material-symbols-outlined text-5xl mb-3">local_hospital</span>
          <p class="text-sm">Select a hospital to view on map</p>
        </div>
      </div>
      <!-- Offline fallback -->
      <div v-else class="w-full md:w-3/5 flex flex-col items-center justify-center gap-3 bg-neutral-50 dark:bg-[#1a120e] text-neutral-soft py-10">
        <span class="material-symbols-outlined text-4xl">cloud_off</span>
        <p class="text-sm">Map unavailable offline</p>
        <p class="text-xs">Use "Directions" button to open phone's map app</p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { hospitals, type Hospital } from '~/data/emergency'

const props = defineProps<{
  isOffline?: boolean
  highlighted?: boolean
}>()

// Colombo default coordinates (fallback)
const COLOMBO_COORDS = { lat: 6.9271, lng: 79.8612 }

const userLocation = ref<{ lat: number; lng: number } | null>(null)
const locationStatus = ref<'idle' | 'loading' | 'granted' | 'denied'>('idle')
const selectedHospital = ref<Hospital | null>(null)

// Calculate distance using Haversine formula
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Format distance for display
function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`
  }
  return `${km.toFixed(1)} km`
}

// Get hospitals sorted by distance
const sortedHospitals = computed(() => {
  const origin = userLocation.value || COLOMBO_COORDS
  
  return hospitals
    .map(hospital => ({
      ...hospital,
      distanceKm: calculateDistance(
        origin.lat,
        origin.lng,
        hospital.mapCoordinates.lat,
        hospital.mapCoordinates.lng
      ),
      distance: formatDistance(
        calculateDistance(
          origin.lat,
          origin.lng,
          hospital.mapCoordinates.lat,
          hospital.mapCoordinates.lng
        )
      )
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
})

// Request user location
async function requestLocation() {
  if (!navigator.geolocation) {
    locationStatus.value = 'denied'
    return
  }
  
  locationStatus.value = 'loading'
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      locationStatus.value = 'granted'
      // Auto-select nearest hospital
      const nearestHospital = sortedHospitals.value[0]
      if (nearestHospital) {
        selectedHospital.value = nearestHospital
      }
    },
    (error) => {
      console.warn('Location error:', error)
      locationStatus.value = 'denied'
      // Default to first Colombo hospital
      const firstHospital = sortedHospitals.value[0]
      if (firstHospital) {
        selectedHospital.value = firstHospital
      }
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}

// Select hospital and show on map
function selectHospital(hospital: Hospital & { distance: string }) {
  selectedHospital.value = hospital
}

// Open hospital in native maps app
function openInMaps(hospital: Hospital) {
  const url = `https://www.google.com/maps/search/?api=1&query=${hospital.mapCoordinates.lat},${hospital.mapCoordinates.lng}`
  window.open(url, '_blank')
}

// Request location on mount
onMounted(() => {
  requestLocation()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e5e5e5;
    border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #3a2d28;
}
</style>

