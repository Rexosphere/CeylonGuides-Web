<template>
  <div class="relative w-full h-full">
    <div ref="mapContainer" class="w-full h-full min-h-[400px] z-0"></div>
    
    <!-- Legend Box -->
    <div class="absolute bottom-6 left-4 z-10 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-xs">
      <div class="font-medium mb-2 text-gray-700 dark:text-gray-200">Hygiene Rating</div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-emerald-500"></div>
          <span class="text-gray-600 dark:text-gray-300">Safe & Secure / Grade A</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-amber-500"></div>
          <span class="text-gray-600 dark:text-gray-300">Grade B</span>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute top-4 left-4 z-10 flex flex-col gap-2">
      <button 
        @click="fitAllMarkers"
        class="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        title="Fit All Restaurants"
      >
        <span class="material-symbols-outlined text-xl">crop_free</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Restaurant } from '~/data/dining'

const props = defineProps<{
  restaurants: Restaurant[]
  selectedRestaurant?: Restaurant | null
}>()

const emit = defineEmits<{
  (e: 'select-restaurant', restaurant: Restaurant): void
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: any = null
let markers: any[] = []
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
    
    // Add zoom control top-right
    L.control.zoom({ position: 'topright' }).addTo(map)
    
    // CartoDB Positron tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)
    
    updateMarkers()
    
  } catch (e) {
    console.error('Map init failed:', e)
  }
}

function getMarkerColor(restaurant: Restaurant): string {
  // Based on hygieneScore and certificationType
  if (restaurant.hygieneScore >= 5) return '#10b981' // Emerald
  if (restaurant.hygieneScore >= 4) return '#f59e0b' // Amber
  return '#64748b' // Slate
}

function createMarkerIcon(restaurant: Restaurant, isSelected: boolean = false) {
  const color = getMarkerColor(restaurant)
  const size = isSelected ? 48 : 40
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5" class="w-full h-full drop-shadow-md">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="4" fill="white"></circle>
    </svg>
  `

  return L.divIcon({
    html: `<div class="dining-marker-content group ${isSelected ? 'selected' : ''}">
      <div class="marker-pin" style="width: ${size}px; height: ${size}px;">
        ${svg}
        <span class="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-[14px]" style="color: ${color}">restaurant</span>
      </div>
    </div>`,
    className: 'dining-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size]
  })
}

function updateMarkers() {
  if (!map || !L) return
  
  // Clear existing markers
  markers.forEach(m => map.removeLayer(m))
  markers = []
  
  // Add markers for each restaurant with coordinates
  props.restaurants.forEach(restaurant => {
    if (!restaurant.coordinates) return
    
    const isSelected = props.selectedRestaurant?.id === restaurant.id
    const icon = createMarkerIcon(restaurant, isSelected)
    
    const marker = L.marker([restaurant.coordinates.lat, restaurant.coordinates.lon], { 
      icon,
      riseOnHover: true
    }).addTo(map)
    
    // Popup content
    const certLabel = restaurant.certificationType === 'SafeAndSecure' ? 'Safe & Secure' 
      : restaurant.certificationType === 'TouristFriendlyGradeA' ? 'Grade A'
      : restaurant.certificationType === 'TouristFriendlyGradeB' ? 'Grade B'
      : 'Certified'
    
    const certClass = restaurant.hygieneScore >= 5 
      ? 'bg-emerald-100 text-emerald-700' 
      : 'bg-amber-100 text-amber-700'
    
    const popupContent = `
      <div class="dining-popup p-2 min-w-[180px]">
        <div class="font-bold text-gray-800 text-sm mb-1">${restaurant.name}</div>
        <div class="text-xs text-gray-500 mb-2">${restaurant.area || restaurant.city}</div>
        <div class="flex items-center gap-1 mb-2">
          <span class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${certClass}">
            ${certLabel}
          </span>
        </div>
        <div class="text-xs text-gray-600">${restaurant.hygieneScore}/5 Hygiene</div>
      </div>
    `
    
    marker.bindPopup(popupContent, {
      className: 'dining-popup-container',
      maxWidth: 250
    })
    
    marker.on('click', () => {
      emit('select-restaurant', restaurant)
    })
    
    markers.push(marker)
  })
  
  if (props.restaurants.length > 0) {
    fitAllMarkers()
  }
}

function fitAllMarkers() {
  if (!map || !L || markers.length === 0) return
  
  const bounds = L.latLngBounds([])
  markers.forEach(m => bounds.extend(m.getLatLng()))
  
  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
  }
}

watch(() => props.restaurants, updateMarkers, { deep: true })
watch(() => props.selectedRestaurant, () => {
  updateMarkers()
  if (props.selectedRestaurant?.coordinates) {
    map?.setView(
      [props.selectedRestaurant.coordinates.lat, props.selectedRestaurant.coordinates.lon],
      14
    )
  }
})

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

defineExpose({ fitAllMarkers })
</script>

<style>
.dining-marker {
  background: transparent;
  border: none;
}

.dining-marker-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dining-marker-content.selected .marker-pin {
  transform: scale(1.2);
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
}

.marker-pin {
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
  transition: transform 0.2s, filter 0.2s;
}

.dining-marker:hover .marker-pin {
  transform: scale(1.1) translateY(-2px);
}

/* Popup styles */
.dining-popup-container .leaflet-popup-content-wrapper {
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
}

.dining-popup-container .leaflet-popup-tip {
  background: white;
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
