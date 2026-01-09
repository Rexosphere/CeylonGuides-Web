<template>
  <section class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-bold text-neutral-dark dark:text-white">Nearest Hospitals</h2>
      <button 
        @click="requestLocation"
        class="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
        :disabled="locationStatus === 'loading'"
      >
        <span class="material-symbols-outlined text-sm">{{ locationStatus === 'loading' ? 'sync' : 'my_location' }}</span>
        {{ locationStatus === 'loading' ? 'Detecting...' : 'Update' }}
      </button>
    </div>

    <!-- Location denied warning -->
    <div 
      v-if="locationStatus === 'denied'" 
      class="p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-2 text-xs"
    >
      <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-sm">location_off</span>
      <span class="text-amber-800 dark:text-amber-300">Location access needed — Showing Colombo hospitals</span>
    </div>

    <!-- Hospital List -->
    <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] overflow-hidden">
      <div class="divide-y divide-neutral-100 dark:divide-[#3a2d28] max-h-[300px] overflow-y-auto custom-scrollbar">
        <div 
          v-for="hospital in sortedHospitals" 
          :key="hospital.name"
          @click="selectHospital(hospital)"
          class="p-3 hover:bg-neutral-50 dark:hover:bg-[#32241e] transition-colors cursor-pointer border-l-4"
          :class="isSelected(hospital) ? 'border-l-primary bg-primary/5 dark:bg-primary/10' : 'border-l-transparent'"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-sm text-neutral-dark dark:text-white truncate">{{ hospital.name }}</h4>
              <p class="text-xs text-neutral-soft truncate mt-0.5">{{ hospital.address }}</p>
            </div>
            <div class="flex gap-1 flex-shrink-0">
              <span 
                class="text-[10px] px-1.5 py-0.5 rounded font-medium"
                :class="hospital.type === 'public' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'"
              >
                {{ hospital.type === 'public' ? 'Public' : 'Private' }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 mt-2">
            <span 
              class="text-[10px] px-1.5 py-0.5 rounded font-medium"
              :class="hospital.open24h ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-600'"
            >
              {{ hospital.open24h ? 'Open 24/7' : 'Daytime' }}
            </span>
            <span class="text-xs text-primary font-medium">{{ hospital.distance }}</span>
          </div>

          <div class="flex gap-2 mt-2">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { hospitals, type Hospital } from '~/data/emergency'

const props = defineProps<{
  isOffline?: boolean
  highlighted?: boolean
  selectedHospitalId?: string | null
}>()

const emit = defineEmits<{
  (e: 'select-hospital', hospital: Hospital): void
}>()

// Colombo default coordinates (fallback)
const COLOMBO_COORDS = { lat: 6.9271, lng: 79.8612 }

const userLocation = ref<{ lat: number; lng: number } | null>(null)
const locationStatus = ref<'idle' | 'loading' | 'granted' | 'denied'>('idle')

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

function isSelected(hospital: typeof sortedHospitals.value[0]): boolean {
  return props.selectedHospitalId === hospital.name
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
    },
    (error) => {
      console.warn('Location error:', error)
      locationStatus.value = 'denied'
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}

// Select hospital and emit event
function selectHospital(hospital: typeof sortedHospitals.value[0]) {
  const originalHospital = hospitals.find(h => h.name === hospital.name)
  if (originalHospital) {
    emit('select-hospital', originalHospital)
  }
}

// Open hospital in native maps app
function openInMaps(hospital: typeof sortedHospitals.value[0]) {
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
