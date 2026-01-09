<template>
  <div class="relative h-full w-full">
    <!-- Loading Skeleton -->
    <div 
      v-if="!mapReady" 
      class="absolute inset-0 z-10 bg-neutral-100 dark:bg-[#1a120e] rounded-lg flex flex-col items-center justify-center animate-pulse"
    >
      <div class="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-3"></div>
      <div class="h-3 w-32 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
      <div class="h-2 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
      <p class="text-xs text-neutral-400 mt-4">Loading map...</p>
    </div>

    <!-- Map Container -->
    <div ref="mapContainer" class="h-full w-full rounded-lg"></div>

    <!-- Map Controls -->
    <div v-if="mapReady" class="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
      <!-- Fullscreen Button -->
      <button
        @click="toggleFullscreen"
        class="p-2 bg-white dark:bg-[#2a1d18] rounded-lg shadow-md hover:bg-neutral-100 dark:hover:bg-[#3a2d28] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        :aria-label="isFullscreen ? 'Exit fullscreen map' : 'View map in fullscreen'"
        :title="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'"
      >
        <span class="material-symbols-outlined text-neutral-600 dark:text-neutral-400" aria-hidden="true">
          {{ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }}
        </span>
      </button>

      <!-- My Location Button -->
      <button
        @click="getUserLocation"
        class="p-2 bg-white dark:bg-[#2a1d18] rounded-lg shadow-md hover:bg-neutral-100 dark:hover:bg-[#3a2d28] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        :class="{ 'ring-2 ring-primary': userLocation }"
        :disabled="locationStatus === 'loading'"
        aria-label="Use my location to find nearby hospitals"
        title="Use my location"
      >
        <span 
          class="material-symbols-outlined"
          :class="{
            'text-primary': userLocation,
            'text-neutral-600 dark:text-neutral-400': !userLocation,
            'animate-spin': locationStatus === 'loading'
          }"
          aria-hidden="true"
        >
          {{ locationStatus === 'loading' ? 'sync' : 'my_location' }}
        </span>
      </button>
    </div>

    <!-- Location Status Banner -->
    <div 
      v-if="locationStatus === 'denied' && mapReady"
      class="absolute bottom-3 left-3 right-3 z-[1000] bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs px-3 py-2 rounded-lg flex items-center gap-2"
      role="status"
      aria-live="polite"
    >
      <span class="material-symbols-outlined text-sm" aria-hidden="true">location_off</span>
      Location not enabled — distances unavailable
    </div>

    <!-- Legend -->
    <div 
      v-if="mapReady"
      class="absolute bottom-3 right-3 z-[1000] bg-white/90 dark:bg-[#2a1d18]/90 backdrop-blur-sm rounded-lg shadow-md p-2 text-xs"
      aria-label="Map legend"
    >
      <div class="flex items-center gap-2 mb-1">
        <span class="w-3 h-3 bg-purple-500 rounded-full" aria-hidden="true"></span>
        <span class="text-neutral-600 dark:text-neutral-400">Private</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-blue-500 rounded-full" aria-hidden="true"></span>
        <span class="text-neutral-600 dark:text-neutral-400">Public</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick, shallowRef } from 'vue'
import type { Hospital } from '~/types/medical'

// Props
const props = defineProps<{
  hospitals: Hospital[]
  selectedHospitalId?: string | null
}>()

// Emits
const emit = defineEmits<{
  (e: 'select-hospital', hospitalId: string): void
  (e: 'user-location', location: { lat: number; lng: number } | null): void
  (e: 'location-status', status: 'idle' | 'loading' | 'granted' | 'denied'): void
}>()

// Refs - using shallowRef for heavy objects to avoid deep reactivity
const mapContainer = ref<HTMLElement | null>(null)
const mapReady = ref(false)
let map: any = null
let markersLayer: any = null
let userMarker: any = null
let L: any = null
let markersMap = new Map<string, any>() // Store markers by hospital ID for quick lookup

// State
const isFullscreen = ref(false)
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const locationStatus = ref<'idle' | 'loading' | 'granted' | 'denied'>('idle')

// Sri Lanka center coordinates
const SRI_LANKA_CENTER = [7.8731, 80.7718]
const DEFAULT_ZOOM = 8

// City fallback coordinates for hospitals without lat/lng
const CITY_FALLBACK: Record<string, { lat: number; lng: number }> = {
  'Colombo': { lat: 6.9271, lng: 79.8612 },
  'Kandy': { lat: 7.2906, lng: 80.6337 },
  'Galle': { lat: 6.0535, lng: 80.2210 },
  'Anuradhapura': { lat: 8.3114, lng: 80.4037 },
  'Badulla': { lat: 6.9934, lng: 81.0550 },
  'Jaffna': { lat: 9.6615, lng: 80.0255 },
  'Matara': { lat: 5.9549, lng: 80.5550 },
}

// Custom marker icons
function createMarkerIcon(type: 'private' | 'public', isApproximate: boolean = false) {
  if (!L) return null
  const color = type === 'private' ? '#a855f7' : '#3b82f6'
  const opacity = isApproximate ? '0.7' : '1'
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px; 
        height: 32px; 
        background: ${color}; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        opacity: ${opacity};
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-size: 14px;
          font-weight: bold;
        ">🏥</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })
}

// User location marker icon
function createUserLocationIcon() {
  if (!L) return null
  return L.divIcon({
    className: 'user-location-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: #ef4444;
        border-radius: 50%;
        border: 4px solid white;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3), 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  })
}

// Dynamic import and initialize map
async function initMap() {
  if (!mapContainer.value || map) return

  try {
    // Dynamic import Leaflet to avoid SSR issues
    const leaflet = await import('leaflet')
    await import('leaflet/dist/leaflet.css')
    L = leaflet.default || leaflet

    map = L.map(mapContainer.value, {
      center: SRI_LANKA_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false
    })

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map)

    // Add zoom control to bottom left
    L.control.zoom({ position: 'bottomleft' }).addTo(map)

    // Create markers layer
    markersLayer = L.layerGroup().addTo(map)

    // Add hospital markers
    updateMarkers()
    
    mapReady.value = true
  } catch (error) {
    console.error('Failed to load map:', error)
  }
}

// Update markers based on hospitals prop
function updateMarkers() {
  if (!map || !markersLayer || !L) return

  markersLayer.clearLayers()
  markersMap.clear()

  props.hospitals.forEach(hospital => {
    const hasCoords = hospital.lat && hospital.lng
    const defaultCoords = { lat: 6.9271, lng: 79.8612 }
    const fallbackCoords = CITY_FALLBACK[hospital.city] ?? defaultCoords
    const coords = hasCoords 
      ? { lat: hospital.lat!, lng: hospital.lng! }
      : fallbackCoords
    
    const isApproximate = !hasCoords
    const marker = L.marker([coords.lat, coords.lng], {
      icon: createMarkerIcon(hospital.type, isApproximate)
    })

    // Create popup content with accessibility
    const popupContent = createPopupContent(hospital, isApproximate)
    marker.bindPopup(popupContent, {
      maxWidth: 280,
      className: 'hospital-popup'
    })

    // Handle marker click
    marker.on('click', () => {
      emit('select-hospital', hospital.id)
    })

    // Store marker reference
    markersMap.set(hospital.id, marker)
    markersLayer.addLayer(marker)
  })
}

// Create popup HTML content with accessibility
function createPopupContent(hospital: Hospital, isApproximate: boolean): string {
  const typeLabel = hospital.type === 'private' ? 'Private' : 'Public'
  const phone = hospital.phone || 'Not provided'
  const displayPhone = phone !== 'Not provided' ? phone : null
  
  const mapsUrl = hospital.lat && hospital.lng
    ? `https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ', ' + hospital.city + ', Sri Lanka')}`

  return `
    <div class="p-1" role="dialog" aria-label="${hospital.name} information">
      <div class="flex items-start justify-between gap-2 mb-2">
        <h4 class="font-bold text-neutral-800 text-sm leading-tight">${hospital.name}</h4>
        <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-${hospital.type === 'private' ? 'purple' : 'blue'}-100 text-${hospital.type === 'private' ? 'purple' : 'blue'}-700 font-medium whitespace-nowrap">
          ${typeLabel}
        </span>
      </div>
      <p class="text-xs text-neutral-500 mb-2">${hospital.city}, ${hospital.region} Province</p>
      ${isApproximate ? `<p class="text-[10px] text-amber-600 mb-2 flex items-center gap-1">
        <span aria-hidden="true">⚠️</span> <span>Approximate location</span>
      </p>` : ''}
      <div class="flex gap-2 mt-2">
        ${displayPhone ? `
          <a 
            href="tel:${phone}" 
            class="flex-1 text-xs bg-primary text-white px-2 py-1.5 rounded text-center font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Call ${hospital.name}"
          >
            📞 Call
          </a>
        ` : `
          <span class="flex-1 text-xs bg-neutral-200 text-neutral-500 px-2 py-1.5 rounded text-center">
            📞 No phone
          </span>
        `}
        <a 
          href="${mapsUrl}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex-1 text-xs bg-neutral-100 text-neutral-700 px-2 py-1.5 rounded text-center font-medium hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Get directions to ${hospital.name}"
        >
          🗺️ Directions
        </a>
      </div>
    </div>
  `
}

// Get user location
async function getUserLocation() {
  if (!navigator.geolocation) {
    locationStatus.value = 'denied'
    emit('location-status', 'denied')
    return
  }

  locationStatus.value = 'loading'
  emit('location-status', 'loading')

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      userLocation.value = location
      locationStatus.value = 'granted'
      emit('user-location', location)
      emit('location-status', 'granted')

      // Add/update user marker
      if (map && L) {
        if (userMarker) {
          userMarker.setLatLng([location.lat, location.lng])
        } else {
          userMarker = L.marker([location.lat, location.lng], {
            icon: createUserLocationIcon(),
            zIndexOffset: 1000
          })
            .addTo(map)
            .bindPopup('<div class="text-sm font-medium">📍 Your Location</div>')
        }
        
        // Center map on user location
        map.setView([location.lat, location.lng], 12)
      }
    },
    (error) => {
      console.warn('Geolocation error:', error)
      locationStatus.value = 'denied'
      emit('user-location', null)
      emit('location-status', 'denied')
    },
    { enableHighAccuracy: true, timeout: 10000 }
  )
}

// Toggle fullscreen
function toggleFullscreen() {
  if (!mapContainer.value) return

  const container = mapContainer.value.closest('.relative') as HTMLElement
  if (!container) return

  if (!isFullscreen.value) {
    if (container.requestFullscreen) {
      container.requestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

// Handle fullscreen change
function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
  nextTick(() => {
    map?.invalidateSize()
  })
}

// Focus on selected hospital
function focusOnHospital(hospitalId: string) {
  if (!map || !markersMap.has(hospitalId)) return

  const marker = markersMap.get(hospitalId)
  if (marker) {
    const latLng = marker.getLatLng()
    map.setView(latLng, 14, { animate: true })
    marker.openPopup()
  }
}

// Debounce utility
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Debounced marker update for performance
const debouncedUpdateMarkers = debounce(updateMarkers, 100)

// Watch for selected hospital changes
watch(() => props.selectedHospitalId, (newId) => {
  if (newId) {
    focusOnHospital(newId)
  }
})

// Watch for hospitals changes with debounce
watch(() => props.hospitals, () => {
  debouncedUpdateMarkers()
}, { deep: false }) // Shallow watch for better performance

// Lifecycle
onMounted(() => {
  initMap()
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
  if (map) {
    map.remove()
    map = null
  }
  markersMap.clear()
})

// Expose methods
defineExpose({
  focusOnHospital,
  getUserLocation
})
</script>

<style>
/* Hospital popup styling */
.hospital-popup .leaflet-popup-content-wrapper {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.hospital-popup .leaflet-popup-content {
  margin: 8px 12px;
}

.hospital-popup .leaflet-popup-tip {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Custom marker animation */
.custom-marker {
  transition: transform 0.2s ease;
}

.custom-marker:hover {
  transform: scale(1.1);
}

/* User location pulse animation */
.user-location-marker {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3), 0 2px 8px rgba(0,0,0,0.3);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.1), 0 2px 8px rgba(0,0,0,0.3);
  }
}

/* Dark mode support for popups */
@media (prefers-color-scheme: dark) {
  .hospital-popup .leaflet-popup-content-wrapper {
    background: #2a1d18;
    color: white;
  }
  .hospital-popup .leaflet-popup-tip {
    background: #2a1d18;
  }
}
</style>
