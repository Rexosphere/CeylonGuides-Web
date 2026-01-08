<template>
  <section class="py-12 bg-white dark:bg-[#1a100c] border-y border-gray-200 dark:border-neutral-700">
    <div class="px-4 md:px-10 max-w-7xl mx-auto w-full">
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="lg:w-1/3 flex flex-col justify-center space-y-6">
          <div class="space-y-2">
            <h2 class="text-3xl font-bold tracking-tight text-text-main dark:text-white">Trusted ATMs & Exchange</h2>
            <p class="text-text-muted dark:text-gray-400">
              Avoid unauthorized money changers. Stick to registered banks and official ATMs for the best rates and safety.
            </p>
          </div>
          <div class="space-y-4">
            <div class="flex gap-4 items-start">
              <div class="size-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined">account_balance</span>
              </div>
              <div>
                <h4 class="font-bold text-lg text-text-main dark:text-white">Trusted Banks</h4>
                <p class="text-sm text-text-muted dark:text-gray-400">{{ atmGuidance.trustedBanks.join(', ') }}</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <div class="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined">local_atm</span>
              </div>
              <div>
                <h4 class="font-bold text-lg text-text-main dark:text-white">ATM Limits & Fees</h4>
                <p class="text-sm text-text-muted dark:text-gray-400">{{ atmGuidance.feeNotes }}</p>
              </div>
            </div>
          </div>
          
          <!-- Location Permission Banner -->
          <div v-if="showLocationBanner" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">location_off</span>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-blue-800 dark:text-blue-300">Enable Location</h4>
                <p class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Allow location access to find ATMs near you and get directions.
                </p>
                <button 
                  @click="requestLocation"
                  class="mt-2 text-xs font-bold text-blue-700 dark:text-blue-300 hover:underline"
                >
                  Enable Location →
                </button>
              </div>
              <button @click="showLocationBanner = false" class="text-blue-400 hover:text-blue-600">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>
          
          <!-- Nearest ATMs List -->
          <div v-if="nearestATMs.length > 0" class="space-y-3">
            <h4 class="font-bold text-sm text-text-muted uppercase tracking-wide">Nearest ATMs</h4>
            <div class="space-y-2">
              <div 
                v-for="(atm, index) in nearestATMs" 
                :key="atm.id"
                @click="focusATM(atm)"
                class="bg-gray-50 dark:bg-white/5 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-primary/30"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div 
                      class="size-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      :class="index === 0 ? 'bg-primary' : 'bg-gray-400'"
                    >
                      {{ index + 1 }}
                    </div>
                    <div>
                      <div class="font-bold text-sm text-text-main dark:text-white">{{ atm.name }}</div>
                      <div class="text-xs text-text-muted flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">{{ atm.type === 'atm' ? 'local_atm' : 'account_balance' }}</span>
                        {{ atm.type === 'atm' ? 'ATM' : 'Bank' }}
                        <span class="mx-1">•</span>
                        {{ formatDistance(atm.distance) }}
                      </div>
                    </div>
                  </div>
                  <a 
                    :href="getGoogleMapsUrl(atm)"
                    target="_blank"
                    @click.stop
                    class="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span class="material-symbols-outlined text-sm">open_in_new</span>
                    Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Stats -->
          <div v-if="atmLocations.length > 0 && !nearestATMs.length" class="bg-primary/5 dark:bg-primary/10 rounded-lg p-3 text-sm">
            <span class="font-bold text-primary">{{ atmLocations.length }}</span>
            <span class="text-text-muted"> ATMs found in view</span>
          </div>
          
          <button 
            @click="findNearestATM"
            :disabled="loadingLocation"
            class="flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-6 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            <span v-if="loadingLocation" class="material-symbols-outlined animate-spin">sync</span>
            <span v-else class="material-symbols-outlined">{{ nearestATMs.length ? 'refresh' : 'near_me' }}</span>
            {{ loadingLocation ? 'Finding...' : nearestATMs.length ? 'Refresh Results' : 'Find Nearest ATM' }}
          </button>
        </div>
        
        <div class="lg:w-2/3 h-[400px] lg:h-auto min-h-[400px] rounded-2xl overflow-hidden relative shadow-lg">
          <!-- Leaflet Map Container -->
          <div ref="mapContainer" class="w-full h-full min-h-[400px] z-0"></div>
          
          <!-- Loading Overlay -->
          <div v-if="loadingATMs" class="absolute inset-0 bg-white/80 dark:bg-black/60 flex items-center justify-center z-10">
            <div class="flex flex-col items-center gap-2">
              <span class="material-symbols-outlined text-4xl text-primary animate-spin">sync</span>
              <span class="text-sm font-medium text-text-muted">Loading ATMs...</span>
            </div>
          </div>
          
          <!-- Use My Location Button -->
          <div class="absolute bottom-4 right-4 z-10">
            <button 
              @click="useMyLocation"
              :disabled="loadingLocation"
              class="bg-white dark:bg-surface-dark text-text-main dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              <span v-if="loadingLocation" class="material-symbols-outlined text-primary animate-spin">sync</span>
              <span v-else class="material-symbols-outlined text-primary">my_location</span>
              Use my location
            </button>
          </div>
          
          <!-- Error Message -->
          <div v-if="error" class="absolute top-4 left-4 right-4 z-10 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
            <span class="material-symbols-outlined">error</span>
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { atmGuidance } from '~/data/moneyData'

interface ATMLocation {
  id: string
  name: string
  lat: number
  lon: number
  type: 'atm' | 'bank'
  operator?: string
  distance?: number
}

const mapContainer = ref<HTMLDivElement | null>(null)
const atmLocations = ref<ATMLocation[]>([])
const loadingATMs = ref(false)
const loadingLocation = ref(false)
const error = ref<string | null>(null)
const userLocation = ref<{ lat: number; lon: number } | null>(null)
const showLocationBanner = ref(false)
const nearestATMs = ref<ATMLocation[]>([])

let map: any = null
let L: any = null
let atmMarkers: any[] = []
let userMarker: any = null

// Colombo center
const defaultCenter: [number, number] = [6.9271, 79.8612]
const defaultZoom = 14

// Sri Lanka bounds
const sriLankaBounds: [[number, number], [number, number]] = [[5.9, 79.5], [10.0, 82.0]]

// Sample trusted bank ATM locations in Colombo (fallback data)
const trustedATMData: ATMLocation[] = [
  { id: 'com1', name: 'Commercial Bank - Fort', lat: 6.9344, lon: 79.8428, type: 'bank', operator: 'Commercial Bank' },
  { id: 'com2', name: 'Commercial Bank ATM - Kollupitiya', lat: 6.9108, lon: 79.8487, type: 'atm', operator: 'Commercial Bank' },
  { id: 'sam1', name: 'Sampath Bank - Colpetty', lat: 6.9062, lon: 79.8525, type: 'bank', operator: 'Sampath Bank' },
  { id: 'sam2', name: 'Sampath Bank ATM - Bambalapitiya', lat: 6.8902, lon: 79.8565, type: 'atm', operator: 'Sampath Bank' },
  { id: 'hnb1', name: 'HNB - World Trade Center', lat: 6.9321, lon: 79.8434, type: 'bank', operator: 'HNB' },
  { id: 'hnb2', name: 'HNB ATM - Liberty Plaza', lat: 6.9063, lon: 79.8518, type: 'atm', operator: 'HNB' },
  { id: 'boc1', name: 'Bank of Ceylon - Fort', lat: 6.9336, lon: 79.8431, type: 'bank', operator: 'Bank of Ceylon' },
  { id: 'boc2', name: 'BOC ATM - Galle Face', lat: 6.9218, lon: 79.8456, type: 'atm', operator: 'Bank of Ceylon' },
  { id: 'com3', name: 'Commercial Bank ATM - Majestic City', lat: 6.8957, lon: 79.8558, type: 'atm', operator: 'Commercial Bank' },
  { id: 'hnb3', name: 'HNB ATM - Crescat Boulevard', lat: 6.9167, lon: 79.8482, type: 'atm', operator: 'HNB' },
]

async function initMap() {
  if (!mapContainer.value || map) return
  
  try {
    L = await import('leaflet').then(m => m.default || m)
    await import('leaflet/dist/leaflet.css')
    
    map = L.map(mapContainer.value, {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 10,
      maxZoom: 18,
      maxBounds: sriLankaBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false
    })
    
    // Add zoom control top-right
    L.control.zoom({ position: 'topright' }).addTo(map)
    
    // CartoDB Voyager tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)
    
    // Load ATMs when map moves
    map.on('moveend', () => {
      fetchATMsInView()
    })
    
    // Initial load
    await fetchATMsInView()
    
  } catch (e) {
    console.error('Map init failed:', e)
    error.value = 'Failed to load map'
  }
}

function createATMIcon(type: 'atm' | 'bank', isNearest: boolean = false) {
  const color = type === 'atm' ? '#ee5f2b' : '#10b981'
  const icon = type === 'atm' ? 'local_atm' : 'account_balance'
  const size = isNearest ? 'w-10 h-10' : 'w-8 h-8'
  const border = isNearest ? 'border-3 ring-2 ring-primary/30' : 'border-2'
  
  return L.divIcon({
    html: `
      <div class="atm-marker group">
        <div class="${size} rounded-full bg-white shadow-lg flex items-center justify-center ${border} transition-transform group-hover:scale-110" style="border-color: ${color}">
          <span class="material-symbols-outlined text-lg" style="color: ${color}">${icon}</span>
        </div>
      </div>
    `,
    className: 'atm-marker-container',
    iconSize: isNearest ? [40, 40] : [32, 32],
    iconAnchor: isNearest ? [20, 20] : [16, 16]
  })
}

function createUserIcon() {
  return L.divIcon({
    html: `
      <div class="user-marker">
        <div class="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg animate-pulse"></div>
        <div class="absolute inset-0 w-4 h-4 rounded-full bg-blue-500/30 animate-ping"></div>
      </div>
    `,
    className: 'user-marker-container',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  })
}

async function fetchATMsInView() {
  if (!map) return
  
  loadingATMs.value = true
  error.value = null
  
  try {
    const bounds = map.getBounds()
    const south = bounds.getSouth()
    const west = bounds.getWest()
    const north = bounds.getNorth()
    const east = bounds.getEast()
    
    // Overpass API query for ATMs and banks
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="atm"](${south},${west},${north},${east});
        node["amenity"="bank"](${south},${west},${north},${east});
      );
      out body;
    `
    
    const response = await $fetch<{ elements: any[] }>(
      'https://overpass-api.de/api/interpreter',
      {
        method: 'POST',
        body: query,
        headers: { 'Content-Type': 'text/plain' }
      }
    )
    
    if (response.elements && response.elements.length > 0) {
      atmLocations.value = response.elements.map((el: any) => ({
        id: String(el.id),
        name: el.tags?.name || el.tags?.operator || (el.tags?.amenity === 'atm' ? 'ATM' : 'Bank'),
        lat: el.lat,
        lon: el.lon,
        type: el.tags?.amenity === 'atm' ? 'atm' : 'bank',
        operator: el.tags?.operator
      }))
      
      updateATMMarkers()
    } else {
      // Use fallback data if Overpass returns nothing
      atmLocations.value = trustedATMData
      updateATMMarkers()
    }
  } catch (e) {
    console.warn('Failed to fetch ATMs from Overpass, using fallback data:', e)
    // Use fallback trusted ATM data
    atmLocations.value = trustedATMData
    updateATMMarkers()
  } finally {
    loadingATMs.value = false
  }
}

function updateATMMarkers() {
  if (!map || !L) return
  
  // Clear existing markers
  atmMarkers.forEach(marker => map.removeLayer(marker))
  atmMarkers = []
  
  // Check if ATM is in nearest list
  const nearestIds = new Set(nearestATMs.value.map(a => a.id))
  
  // Add new markers
  atmLocations.value.forEach(atm => {
    const isNearest = nearestIds.has(atm.id)
    const icon = createATMIcon(atm.type, isNearest)
    const marker = L.marker([atm.lat, atm.lon], { icon, zIndexOffset: isNearest ? 1000 : 0 })
    
    const distanceText = atm.distance ? `<div class="text-xs text-gray-500 mt-1">${formatDistance(atm.distance)} away</div>` : ''
    const popupContent = `
      <div class="p-2 min-w-[150px]">
        <div class="font-bold text-sm mb-1">${atm.name}</div>
        ${atm.operator ? `<div class="text-xs text-gray-500">${atm.operator}</div>` : ''}
        ${distanceText}
        <div class="flex items-center justify-between mt-2">
          <div class="text-xs px-2 py-0.5 rounded inline-block ${atm.type === 'atm' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}">
            ${atm.type === 'atm' ? 'ATM' : 'Bank Branch'}
          </div>
          <a href="${getGoogleMapsUrl(atm)}" target="_blank" class="text-xs text-blue-600 hover:underline">Open in Maps</a>
        </div>
      </div>
    `
    
    marker.bindPopup(popupContent, { 
      className: 'atm-popup',
      closeButton: false,
      offset: [0, -5]
    })
    
    marker.addTo(map)
    atmMarkers.push(marker)
  })
}

async function useMyLocation() {
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by your browser'
    return
  }
  
  loadingLocation.value = true
  error.value = null
  showLocationBanner.value = false
  
  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      })
    })
    
    const { latitude, longitude } = position.coords
    userLocation.value = { lat: latitude, lon: longitude }
    
    if (map && L) {
      // Remove existing user marker
      if (userMarker) {
        map.removeLayer(userMarker)
      }
      
      // Add user location marker
      userMarker = L.marker([latitude, longitude], { icon: createUserIcon() })
        .addTo(map)
        .bindPopup('<div class="p-2 font-bold text-sm">You are here</div>')
      
      // Center map on user location
      map.setView([latitude, longitude], 15)
    }
  } catch (e: any) {
    if (e.code === 1) {
      error.value = 'Location permission denied'
      showLocationBanner.value = true
    } else if (e.code === 2) {
      error.value = 'Location unavailable'
    } else {
      error.value = 'Failed to get your location'
    }
  } finally {
    loadingLocation.value = false
  }
}

async function requestLocation() {
  showLocationBanner.value = false
  await useMyLocation()
}

async function findNearestATM() {
  // First get user location if not available
  if (!userLocation.value) {
    await useMyLocation()
  }
  
  if (!userLocation.value) {
    showLocationBanner.value = true
    return
  }
  
  // Calculate distances for all ATMs
  const atmsWithDistance = atmLocations.value.map(atm => ({
    ...atm,
    distance: getDistance(
      userLocation.value!.lat, 
      userLocation.value!.lon,
      atm.lat,
      atm.lon
    )
  }))
  
  // Sort by distance and get nearest 3
  atmsWithDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity))
  nearestATMs.value = atmsWithDistance.slice(0, 3)
  
  // Update all ATM locations with distances
  atmLocations.value = atmsWithDistance
  
  // Update markers to highlight nearest
  updateATMMarkers()
  
  // Focus on the nearest one
  if (nearestATMs.value.length > 0 && map) {
    const nearest = nearestATMs.value[0]
    if (!nearest) return
    
    map.setView([nearest.lat, nearest.lon], 16)
    
    // Find and open the marker popup
    const nearestLat = nearest.lat
    const nearestLon = nearest.lon
    const marker = atmMarkers.find(m => {
      const pos = m.getLatLng()
      return pos.lat === nearestLat && pos.lng === nearestLon
    })
    if (marker) {
      setTimeout(() => marker.openPopup(), 300)
    }
  }
}

function focusATM(atm: ATMLocation) {
  if (!map) return
  
  map.setView([atm.lat, atm.lon], 17)
  
  // Find and open the marker popup
  const marker = atmMarkers.find(m => {
    const pos = m.getLatLng()
    return pos.lat === atm.lat && pos.lng === atm.lon
  })
  if (marker) {
    setTimeout(() => marker.openPopup(), 300)
  }
}

function getGoogleMapsUrl(atm: ATMLocation): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${atm.lat},${atm.lon}`
}

function formatDistance(km: number | undefined): string {
  if (!km) return ''
  if (km < 1) {
    return `${Math.round(km * 1000)}m`
  }
  return `${km.toFixed(1)}km`
}

// Haversine distance in km
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

onMounted(async () => {
  await nextTick()
  await initMap()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style>
.atm-marker-container {
  background: transparent;
  border: none;
}

.user-marker-container {
  background: transparent;
  border: none;
}

.atm-popup .leaflet-popup-content-wrapper {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.atm-popup .leaflet-popup-tip {
  display: none;
}

/* Custom Leaflet Control Styling */
:global(.leaflet-control-zoom) {
  border: none !important;
  box-shadow: none !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
}

:global(.leaflet-bar a) {
  background-color: white !important;
  color: #94a3b8 !important;
  border-bottom: none !important;
  border-radius: 8px !important;
  width: 36px !important;
  height: 36px !important;
  line-height: 36px !important;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-weight: bold !important;
  font-size: 18px !important;
  transition: all 0.2s ease !important;
}

:global(.leaflet-bar a:hover) {
  background-color: #f8fafc !important;
  color: #475569 !important;
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
}
</style>
