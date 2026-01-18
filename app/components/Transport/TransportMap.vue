<template>
  <div class="relative w-full h-full">
    <div ref="mapContainer" class="w-full h-full min-h-[400px] z-0"></div>
    
    <!-- Legend Box -->
    <div class="absolute bottom-6 left-4 z-10 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-xs">
      <div class="font-medium mb-2 text-gray-700 dark:text-gray-200">Route Style</div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <div class="w-8 h-1 bg-orange-500 rounded"></div>
          <span>Tuk-Tuk</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-8 h-1 bg-teal-600 rounded"></div>
          <span>Taxi/Car</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-8 h-1 bg-slate-500 border-dashed border-b-2 border-transparent" style="background: repeating-linear-gradient(90deg, #64748b 0, #64748b 5px, transparent 5px, transparent 10px)"></div>
          <span>Bus (Highway)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-8 h-1 bg-green-500" style="background: repeating-linear-gradient(90deg, #22c55e 0, #22c55e 8px, transparent 8px, transparent 14px)"></div>
          <span>Train</span>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="absolute top-4 left-4 z-10 flex flex-col gap-2">
      <button 
        @click="fitBounds"
        class="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        title="Fit Route"
      >
        <span class="material-symbols-outlined text-xl">crop_free</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Location } from '~/composables/useTransportRoutes'

const props = defineProps<{
  origin: Location | null
  destination: Location | null
  polyline: [number, number][]
  mode?: string
}>()

const emit = defineEmits<{
  (e: 'select-location', location: { lat: number; lon: number; name: string }): void
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: any = null
let originMarker: any = null
let destinationMarker: any = null
let routeLine: any = null
let L: any = null

// Sri Lanka bounds
const sriLankaBounds: [[number, number], [number, number]] = [[5.9, 79.5], [10.0, 82.0]]
const defaultCenter: [number, number] = [7.8731, 80.7718]
const defaultZoom = 8

// Mode styles
const modeStyles: Record<string, any> = {
  tuktuk: { color: '#f97316', weight: 5, dashArray: null }, // Orange solid
  taxi: { color: '#0d9488', weight: 6, opacity: 0.8, dashArray: null },   // Teal (Primary)
  bus: { color: '#64748b', weight: 5, dashArray: '10, 10' }, // Slate dashed
  train: { color: '#22c55e', weight: 5, dashArray: '15, 15' }, // Green dashed
  uber: { color: '#000000', weight: 5, dashArray: null }    // Black solid
}

async function initMap() {
  if (!mapContainer.value || map) return
  
  try {
    L = await import('leaflet').then(m => m.default || m)
    await import('leaflet/dist/leaflet.css')
    
    map = L.map(mapContainer.value, {
      center: defaultCenter,
      zoom: defaultZoom,
      minZoom: 7,
      maxZoom: 15,
      maxBounds: sriLankaBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false // Custom position
    })
    
    // Add zoom control top-right
    L.control.zoom({ position: 'topright' }).addTo(map)
    
    // CartoDB Positron tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)
    
    // Map click handler
    map.on('click', handleMapClick)
    
    updateMarkers()
    updateRoute()
    
  } catch (e) {
    console.error('Map init failed:', e)
  }
}

function handleMapClick(e: any) {
  const { lat, lng } = e.latlng
  reverseGeocode(lat, lng)
}

function createMarkerIcon(type: 'origin' | 'destination', label: string) {
  const color = type === 'origin' ? '#10b981' : '#ef4444' // Emerald-500 : Red-500
  const letter = type === 'origin' ? 'A' : 'B'
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full drop-shadow-md">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>
  `

  return L.divIcon({
    html: `<div class="transport-marker-content group">
      <div class="marker-pin w-10 h-10 transition-transform duration-200 group-hover:-translate-y-1">
        ${svg}
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] font-bold text-[10px] text-${type === 'origin' ? 'emerald-600' : 'red-600'}">${letter}</div>
      </div>
      <div class="marker-label opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-[10px] font-bold whitespace-nowrap z-50 pointer-events-none border border-slate-100">
        ${label}
      </div>
    </div>`,
    className: 'transport-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  })
}

async function reverseGeocode(lat: number, lon: number) {
  // Emit immediately with coords, name will update if available
  // This feels faster to user
  emit('select-location', { lat, lon, name: `${lat.toFixed(4)}, ${lon.toFixed(4)}` })

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    const response = await $fetch<any>(url, {
      headers: { 'User-Agent': 'CeylonWiki/1.0' }
    })
    
    const name = response.display_name?.split(',')[0] 
    if (name) {
       emit('select-location', { lat, lon, name })
    }
  } catch (e) {
    // Keep coord name
  }
}

function updateMarkers() {
  if (!map || !L) return
  
  // Clear existing
  if (originMarker) {
    map.removeLayer(originMarker)
    originMarker = null
  }
  if (destinationMarker) {
    map.removeLayer(destinationMarker)
    destinationMarker = null
  }
  
  // Origin
  if (props.origin) {
    const icon = createMarkerIcon('origin', props.origin.name)
    originMarker = L.marker([props.origin.lat, props.origin.lon], { 
      icon,
      draggable: true 
    }).addTo(map)

    originMarker.on('dragend', (e: any) => {
      const { lat, lng } = e.target.getLatLng()
      reverseGeocode(lat, lng)
    })
  }
  
  // Destination
  if (props.destination) {
    const icon = createMarkerIcon('destination', props.destination.name)
    destinationMarker = L.marker([props.destination.lat, props.destination.lon], { 
      icon,
      draggable: true 
    }).addTo(map)

    destinationMarker.on('dragend', (e: any) => {
      const { lat, lng } = e.target.getLatLng()
      reverseGeocode(lat, lng)
    })
  }
  
  fitBounds()
}

function updateRoute() {
  if (!map || !L) return
  
  if (routeLine) {
    map.removeLayer(routeLine)
    routeLine = null
  }
  
  if (props.polyline.length > 0) {
    const style = modeStyles[props.mode || 'tuktuk'] || modeStyles.tuktuk
    
    routeLine = L.polyline(props.polyline, {
      ...style,
      opacity: 0.8,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map)
    
    fitBounds()
  }
}

function fitBounds() {
  if (!map || !L) return
  
  const bounds = L.latLngBounds([])
  if (props.origin) bounds.extend([props.origin.lat, props.origin.lon])
  if (props.destination) bounds.extend([props.destination.lat, props.destination.lon])
  if (routeLine) bounds.extend(routeLine.getBounds())
  
  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
  }
}

watch(() => props.origin, updateMarkers, { deep: true })
watch(() => props.destination, updateMarkers, { deep: true })
watch(() => props.polyline, updateRoute, { deep: true })
watch(() => props.mode, updateRoute)

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
.transport-marker {
  background: transparent;
  border: none;
}

.transport-marker-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-50%); /* Center anchor on bottom */
}

.marker-pin {
  font-size: 30px;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
  transition: transform 0.2s;
}

.transport-marker:hover .marker-pin {
  transform: scale(1.1) translateY(-2px);
}

.marker-label {
  font-size: 11px;
  font-weight: 700;
  background: white;
  padding: 2px 6px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  white-space: nowrap;
  margin-top: -2px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
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
  color: #94a3b8 !important; /* slate-400 */
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
  background-color: #f8fafc !important; /* slate-50 */
  color: #475569 !important; /* slate-600 */
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
}
</style>
