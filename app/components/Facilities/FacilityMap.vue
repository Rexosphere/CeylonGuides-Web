<template>
  <div class="h-full w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-700 relative">
    <!-- Map Container -->
    <div ref="mapContainer" class="w-full h-full"></div>
    
    <!-- Legend -->
    <div class="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 z-10">
      <div class="text-xs font-bold text-slate-500 mb-2">Legend</div>
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-emerald-500"></div>
          <span class="text-xs text-slate-600 dark:text-slate-300">Free</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-amber-500"></div>
          <span class="text-xs text-slate-600 dark:text-slate-300">Paid</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full border-2 border-white shadow-sm bg-blue-500"></div>
          <span class="text-xs text-slate-600 dark:text-slate-300">You</span>
        </div>
      </div>
    </div>

    <!-- Fit All Button -->
    <button 
      @click="fitBounds"
      class="absolute top-4 left-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors"
      title="Fit all locations"
    >
      <span class="material-symbols-outlined text-slate-600 dark:text-slate-300">fit_screen</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Restroom } from '~/data/restrooms'

const props = defineProps<{
  restrooms: Restroom[]
  selectedRestroom?: Restroom | null
  userLocation?: { lat: number; lon: number } | null
}>()

const emit = defineEmits<{
  (e: 'select-restroom', restroom: Restroom): void
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: any = null
let markers: any[] = []
let userMarker: any = null
let L: any = null

// Sri Lanka bounds
const sriLankaBounds: [[number, number], [number, number]] = [[5.9, 79.5], [10.0, 82.0]]
const defaultCenter: [number, number] = [7.8731, 80.7718]
const defaultZoom = 8

async function initMap() {
  if (!mapContainer.value || map) return
  
  try {
    L = await import('leaflet').then(m => m.default || m)
    await import('leaflet/dist/leaflet.css')
    
    map = L.map(mapContainer.value, {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 7,
      maxZoom: 17,
      maxBounds: sriLankaBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false
    })
    
    L.control.zoom({ position: 'topright' }).addTo(map)
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)
    
    updateMarkers()
    updateUserMarker()
    
  } catch (e) {
    console.error('Map init failed:', e)
  }
}

function createMarkerIcon(restroom: Restroom, isSelected: boolean = false) {
  const color = restroom.fees.isFree ? '#10b981' : '#f59e0b'
  const size = isSelected ? 48 : 40
  
  return L.divIcon({
    html: `<div class="flex items-center justify-center transition-transform ${isSelected ? 'scale-125' : ''}" style="width: ${size}px; height: ${size}px;">
      <div class="w-full h-full rounded-full flex items-center justify-center shadow-lg" style="background-color: ${color};">
        <span class="material-symbols-outlined text-white text-[${isSelected ? 24 : 20}px]">wc</span>
      </div>
    </div>`,
    className: 'facility-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  })
}

function updateUserMarker() {
  if (!map || !L) return

  if (userMarker) {
    map.removeLayer(userMarker)
    userMarker = null
  }

  if (props.userLocation) {
    const icon = L.divIcon({
      html: `<div class="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg pulse-ring"></div>`,
      className: 'user-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    })

    userMarker = L.marker([props.userLocation.lat, props.userLocation.lon], { icon })
      .addTo(map)
      .bindPopup('You are here')

    // Pan to user if just located
    map.flyTo([props.userLocation.lat, props.userLocation.lon], 13, { duration: 1 })
  }
}

function updateMarkers() {
  if (!map || !L) return
  
  markers.forEach(m => map.removeLayer(m))
  markers = []
  
  props.restrooms.forEach(restroom => {
    if (!restroom.coordinates) return
    
    const isSelected = props.selectedRestroom?.id === restroom.id
    const icon = createMarkerIcon(restroom, isSelected)
    
    const marker = L.marker([restroom.coordinates.lat, restroom.coordinates.lon], { 
      icon,
      riseOnHover: true
    }).addTo(map)
    
    // Popup with name, rating, fee - using new schema
    const feeText = restroom.fees.isFree 
      ? 'Free' 
      : (restroom.fees.amountLKR ? `Rs ${restroom.fees.amountLKR}` : 'Paid')
    
    const popupContent = `
      <div class="p-2 min-w-[150px]">
        <div class="font-bold text-gray-800 text-sm mb-1">${restroom.name}</div>
        <div class="text-xs text-gray-500 mb-1">${restroom.area || restroom.city}</div>
        <div class="flex items-center gap-1 text-xs">
          <span class="text-amber-500">★</span> ${restroom.communityRating}/5
          <span class="${restroom.fees.isFree ? 'text-emerald-600' : 'text-amber-600'} ml-2">
            ${feeText}
          </span>
        </div>
      </div>
    `
    
    marker.bindPopup(popupContent, { maxWidth: 200 })
    
    marker.on('click', () => {
      emit('select-restroom', restroom)
    })
    
    markers.push(marker)
  })
}

function fitBounds() {
  if (!map || !L || props.restrooms.length === 0) return
  
  const validRestrooms = props.restrooms.filter(r => r.coordinates)
  if (validRestrooms.length === 0) return
  
  const bounds = L.latLngBounds(
    validRestrooms.map(r => [r.coordinates!.lat, r.coordinates!.lon])
  )
  
  map.fitBounds(bounds, { padding: [50, 50] })
}

// Watch for restroom list changes (filters/search)
watch(() => props.restrooms, () => {
  nextTick(updateMarkers)
}, { deep: true })

// Watch for selection changes - highlight marker and pan to it
watch(() => props.selectedRestroom, (newRestroom) => {
  updateMarkers()
  if (newRestroom?.coordinates && map) {
    map.flyTo([newRestroom.coordinates.lat, newRestroom.coordinates.lon], 14, { duration: 0.5 })
  }
})

watch(() => props.userLocation, () => {
  updateUserMarker()
})

onMounted(() => {
  setTimeout(initMap, 100)
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style>
.facility-marker {
  background: transparent;
  border: none;
}
.user-marker {
  background: transparent;
  border: none;
}
.pulse-ring {
  box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  animation: pulse-blue 2s infinite;
}
@keyframes pulse-blue {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}
</style>
