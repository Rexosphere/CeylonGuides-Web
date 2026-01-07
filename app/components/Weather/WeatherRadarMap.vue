<template>
  <ClientOnly>
    <div class="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
      <!-- Map Container -->
      <div ref="mapContainer" class="absolute inset-0 z-0"></div>

      <!-- Controls Overlay -->
      <div class="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-3">
        <!-- Playback Controls -->
        <div class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <div class="flex items-center gap-3 mb-2">
            <button 
              @click="togglePlayback"
              class="w-10 h-10 rounded-full bg-weather-primary text-white flex items-center justify-center shadow-md hover:bg-weather-primary/90 transition-colors"
            >
              <span class="material-symbols-outlined">{{ isPlaying ? 'pause' : 'play_arrow' }}</span>
            </button>
            <div class="flex-1">
              <input 
                type="range" 
                :min="0" 
                :max="allFrames.length - 1" 
                v-model.number="currentFrameIndex"
                @input="pauseAndSeek"
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-weather-primary"
              />
            </div>
            <span class="text-xs font-mono text-weather-text-muted min-w-[60px] text-right">
              {{ currentFrameTime }}
            </span>
          </div>
          
          <!-- Secondary Controls -->
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <button 
                @click="layerMode = 'radar'"
                class="px-3 py-1 text-xs font-bold rounded-full transition-colors"
                :class="layerMode === 'radar' ? 'bg-weather-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-weather-text-muted'"
              >
                Radar
              </button>
              <button 
                @click="layerMode = 'satellite'"
                class="px-3 py-1 text-xs font-bold rounded-full transition-colors"
                :class="layerMode === 'satellite' ? 'bg-weather-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-weather-text-muted'"
              >
                Satellite
              </button>
            </div>
            
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-weather-text-muted">opacity</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                v-model.number="overlayOpacity"
                class="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-weather-primary"
              />
            </div>
            
            <button 
              @click="centerOnRegion"
              class="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-gray-200 dark:bg-gray-700 text-weather-text-muted rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <span class="material-symbols-outlined text-sm">my_location</span>
              Center
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="absolute inset-0 z-30 flex items-center justify-center bg-white/80 dark:bg-gray-900/80">
        <div class="flex flex-col items-center gap-2">
          <div class="w-8 h-8 border-4 border-weather-primary border-t-transparent rounded-full animate-spin"></div>
          <span class="text-sm text-weather-text-muted">Loading radar data...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="absolute top-4 left-4 right-4 z-30 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
        <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Map as LeafletMap, TileLayer, Marker, LatLngExpression } from 'leaflet'
import { useWeather } from '../../composables/useWeather'
import { cities } from '../../utils/weatherConfig'

// Weather state
const { cityWeatherMap, selectedRegionKey, getDisplayTemp, temperatureUnit } = useWeather()

// Map refs
const mapContainer = ref<HTMLElement | null>(null)
let map: LeafletMap | null = null
let baseLayer: TileLayer | null = null
let radarLayer: TileLayer | null = null
let cityMarkers: Marker[] = []

// State
const isLoading = ref(true)
const error = ref<string | null>(null)
const isPlaying = ref(false)
const currentFrameIndex = ref(0)
const layerMode = ref<'radar' | 'satellite'>('radar')
const overlayOpacity = ref(70)

// RainViewer data
interface RainViewerFrame {
  time: number
  path: string
}

interface RainViewerData {
  host: string
  radar: {
    past: RainViewerFrame[]
    nowcast: RainViewerFrame[]
  }
  satellite: {
    infrared: RainViewerFrame[]
  }
}

const rainViewerData = ref<RainViewerData | null>(null)
const rainViewerCacheTime = ref<number>(0)
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

// Computed frames based on mode
const allFrames = computed(() => {
  if (!rainViewerData.value) return []
  
  if (layerMode.value === 'radar') {
    return [
      ...rainViewerData.value.radar.past,
      ...rainViewerData.value.radar.nowcast
    ]
  } else {
    return rainViewerData.value.satellite.infrared
  }
})

const currentFrame = computed(() => {
  return allFrames.value[currentFrameIndex.value] || null
})

const currentFrameTime = computed(() => {
  if (!currentFrame.value) return '--:--'
  const date = new Date(currentFrame.value.time * 1000)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
})

// Sri Lanka bounds
const sriLankaBounds: [[number, number], [number, number]] = [
  [5.9, 79.5],  // Southwest
  [9.9, 82.0]   // Northeast
]

const sriLankaCenter: LatLngExpression = [7.8731, 80.7718]

// City markers config
const markerCities = [
  { id: 'colombo', name: 'Colombo', lat: 6.9271, lon: 79.8612, regionKey: 'west_south' },
  { id: 'galle', name: 'Galle', lat: 6.0535, lon: 80.2210, regionKey: 'west_south' },
  { id: 'kandy', name: 'Kandy', lat: 7.2906, lon: 80.6337, regionKey: 'hill_country' },
  { id: 'trincomalee', name: 'Trincomalee', lat: 8.5874, lon: 81.2152, regionKey: 'east' },
  { id: 'jaffna', name: 'Jaffna', lat: 9.6615, lon: 80.0255, regionKey: 'northern' }
]

// Weather emoji helper
function getWeatherEmoji(condition: string): string {
  if (!condition) return '🌡️'
  const c = condition.toLowerCase()
  if (c.includes('rain') || c.includes('drizzle')) return '🌧️'
  if (c.includes('thunder') || c.includes('storm')) return '⛈️'
  if (c.includes('cloud') || c.includes('overcast')) return '☁️'
  if (c.includes('sun') || c.includes('clear')) return '☀️'
  if (c.includes('mist') || c.includes('fog')) return '🌫️'
  if (c.includes('snow') || c.includes('ice')) return '❄️'
  if (c.includes('partly')) return '⛅'
  return '🌤️'
}

// Fetch RainViewer data
async function fetchRainViewerData() {
  const now = Date.now()
  
  // Check cache
  if (rainViewerData.value && (now - rainViewerCacheTime.value) < CACHE_DURATION) {
    return
  }
  
  try {
    const response = await $fetch<RainViewerData>('https://api.rainviewer.com/public/weather-maps.json')
    rainViewerData.value = response
    rainViewerCacheTime.value = now
    error.value = null
  } catch (e) {
    error.value = 'Failed to load radar data'
    console.error('RainViewer fetch error:', e)
  }
}

// Update radar layer
function updateRadarLayer() {
  if (!map || !rainViewerData.value || !currentFrame.value) {
    console.warn('updateRadarLayer skipped:', { map: !!map, rainViewerData: !!rainViewerData.value, currentFrame: !!currentFrame.value })
    return
  }
  
  const L = (window as any).L
  if (!L) {
    console.warn('updateRadarLayer: L not available')
    return
  }
  
  // Remove existing radar layer
  if (radarLayer) {
    map.removeLayer(radarLayer)
  }
  
  // Build tile URL
  const host = rainViewerData.value.host
  const path = currentFrame.value.path
  const size = 256
  const color = 1 // Original color scheme
  const options = '1_1' // Smooth + snow
  
  const tileUrl = `${host}${path}/${size}/{z}/{x}/{y}/${color}/${options}.png`
  
  console.log('Radar tile URL:', tileUrl)
  
  radarLayer = L.tileLayer(tileUrl, {
    opacity: overlayOpacity.value / 100,
    zIndex: 10,
    maxZoom: 10,
    crossOrigin: 'anonymous'
  })
  
  radarLayer!.addTo(map)
  console.log('Radar layer added')
}

// Playback controls
let playbackInterval: ReturnType<typeof setInterval> | null = null

function togglePlayback() {
  if (isPlaying.value) {
    stopPlayback()
  } else {
    startPlayback()
  }
}

function startPlayback() {
  isPlaying.value = true
  playbackInterval = setInterval(() => {
    if (currentFrameIndex.value >= allFrames.value.length - 1) {
      currentFrameIndex.value = 0
    } else {
      currentFrameIndex.value++
    }
    updateRadarLayer()
  }, 500)
}

function stopPlayback() {
  isPlaying.value = false
  if (playbackInterval) {
    clearInterval(playbackInterval)
    playbackInterval = null
  }
}

function pauseAndSeek() {
  stopPlayback()
  updateRadarLayer()
}

// Center on selected region
function centerOnRegion() {
  if (!map) return
  
  const regionCenters: Record<string, LatLngExpression> = {
    'all': sriLankaCenter,
    'west_south': [6.5, 80.0],
    'east': [8.0, 81.5],
    'hill_country': [7.0, 80.5],
    'cultural_triangle': [8.0, 80.5],
    'northern': [9.5, 80.2]
  }
  
  const center = regionCenters[selectedRegionKey.value] || sriLankaCenter
  map.setView(center, 8, { animate: true })
}

// Create city markers
function createMarkers() {
  if (!map) {
    console.warn('createMarkers: map not ready')
    return
  }
  
  const L = (window as any).L
  if (!L) {
    console.warn('createMarkers: L not available')
    return
  }
  
  console.log('Creating markers, L.marker:', typeof L.marker, 'cities:', markerCities.length)
  
  // Clear existing markers
  cityMarkers.forEach(m => m.remove())
  cityMarkers = []
  
  markerCities.forEach(city => {
    const weather = cityWeatherMap.value[city.id]?.data
    const temp = weather ? `${getDisplayTemp(weather.temperatureC)}°` : '--'
    const condition = weather?.conditionText || ''
    const icon = getWeatherEmoji(condition)
    
    // Check if this city's region matches the selected region
    const isSelected = selectedRegionKey.value === 'all' || city.regionKey === selectedRegionKey.value
    const markerClass = isSelected ? 'weather-marker weather-marker-selected' : 'weather-marker weather-marker-dimmed'
    
    try {
      const marker = L.marker([city.lat, city.lon], {
        icon: L.divIcon({
          html: `<div class="${markerClass}">
            <span class="weather-marker-icon">${icon}</span>
            <div class="weather-marker-info">
              <span class="weather-marker-city">${city.name}</span>
              <span class="weather-marker-temp">${temp}</span>
            </div>
          </div>`,
          className: 'weather-marker-container',
          iconSize: [100, 40],
          iconAnchor: [50, 20]
        })
      })
      
      marker.bindTooltip(`
        <div class="text-center">
          <div class="font-bold text-sm">${city.name}</div>
          <div class="text-xl font-bold">${temp}${temperatureUnit.value}</div>
          <div class="text-xs opacity-80">${condition || 'Loading...'}</div>
        </div>
      `, { 
        direction: 'top',
        offset: [0, -20],
        className: 'weather-tooltip'
      })
      
      marker.on('click', () => {
        selectedRegionKey.value = city.regionKey
      })
      
      marker.addTo(map!)
      cityMarkers.push(marker)
      console.log('Marker added for:', city.name)
    } catch (e) {
      console.error('Failed to create marker for', city.name, e)
    }
  })
}

// Initialize map
async function initMap() {
  if (!mapContainer.value) {
    console.warn('Map container not ready')
    return
  }
  
  isLoading.value = true
  
  try {
    // Dynamic import Leaflet using namespace import
    const L = await import('leaflet').then(m => m.default ? m.default : m)
    
    // Store L globally for other functions
    ;(window as any).L = L
    
    console.log('Leaflet loaded:', typeof L, Object.keys(L).slice(0, 5))
    
    // Import CSS
    await import('leaflet/dist/leaflet.css')
    
    // Verify L.map exists
    if (typeof L.map !== 'function') {
      throw new Error('Leaflet L.map is not a function')
    }
    
    // Create map
    map = L.map(mapContainer.value, {
      center: sriLankaCenter,
      zoom: 7,
      minZoom: 6,
      maxZoom: 10,
      zoomControl: true,
      attributionControl: true
    })
    
    console.log('Map created:', map)
    
    // Add base layer (CartoDB Positron - production safe)
    baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    })
    
    baseLayer.addTo(map)
    
    // Create city markers first
    createMarkers()
    
    // Loading complete - map is now visible
    isLoading.value = false
    
    // Fetch radar data in background (non-blocking)
    fetchRainViewerData().then(() => {
      if (rainViewerData.value && allFrames.value.length > 0) {
        // Start with the last PAST frame (actual radar data), not nowcast
        const pastFrameCount = rainViewerData.value.radar.past?.length || 0
        console.log('Radar frames available:', { 
          past: pastFrameCount, 
          nowcast: rainViewerData.value.radar.nowcast?.length || 0,
          total: allFrames.value.length 
        })
        
        // Use the most recent past frame if available
        currentFrameIndex.value = pastFrameCount > 0 ? pastFrameCount - 1 : allFrames.value.length - 1
        updateRadarLayer()
      }
    }).catch(err => {
      console.warn('Radar data fetch failed:', err)
    })
    
  } catch (e) {
    console.error('Failed to initialize map:', e)
    error.value = `Failed to load map: ${e instanceof Error ? e.message : 'Unknown error'}`
    isLoading.value = false
  }
}

// Watchers
watch(layerMode, () => {
  currentFrameIndex.value = 0
  stopPlayback()
  updateRadarLayer()
})

watch(overlayOpacity, () => {
  if (radarLayer && map) {
    radarLayer.setOpacity(overlayOpacity.value / 100)
  }
})

watch(() => cityWeatherMap.value, () => {
  createMarkers()
}, { deep: true })

// Watch for region selection changes - pan map and update markers
watch(selectedRegionKey, (newRegion) => {
  if (!map) return
  
  // Pan to region center
  const regionCenters: Record<string, [number, number]> = {
    'all': [7.8731, 80.7718],
    'west_south': [6.5, 80.0],
    'east': [8.0, 81.5],
    'hill_country': [7.0, 80.5],
    'cultural_triangle': [8.0, 80.5],
    'northern': [9.5, 80.2]
  }
  
  const center: [number, number] = regionCenters[newRegion] ?? [7.8731, 80.7718]
  const zoom = newRegion === 'all' ? 7 : 8
  
  map.setView(center, zoom, { animate: true })
  
  // Recreate markers to update highlighting
  createMarkers()
})

// Lifecycle
onMounted(async () => {
  // Wait for next tick to ensure DOM is ready (needed for ClientOnly)
  await nextTick()
  initMap()
})

onBeforeUnmount(() => {
  stopPlayback()
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style>
/* Ensure Leaflet container has proper sizing */
.leaflet-container {
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Leaflet marker styles */
.weather-marker-container {
  background: transparent !important;
  border: none !important;
  z-index: 1000 !important;
}

.weather-marker {
  display: flex;
  align-items: center;
  gap: 6px;
  background: white;
  padding: 6px 10px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  border: 2px solid #f45c25;
}

.weather-marker-icon {
  font-size: 18px;
  line-height: 1;
}

.weather-marker-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.weather-marker-city {
  font-size: 11px;
  color: #666;
  font-weight: 500;
}

.weather-marker-temp {
  font-size: 14px;
  font-weight: 700;
  color: #333;
}

/* Selected marker (in current region) */
.weather-marker-selected {
  border-color: #f45c25;
  background: white;
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(244, 92, 37, 0.3);
}

/* Dimmed marker (not in current region) */
.weather-marker-dimmed {
  border-color: #ccc;
  background: #f5f5f5;
  opacity: 0.7;
}

.weather-marker-label {
  color: #333;
}

.weather-tooltip {
  background: white !important;
  border: none !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
  padding: 8px 12px !important;
}

.weather-tooltip::before {
  border-top-color: white !important;
}

/* Dark mode */
.dark .weather-marker {
  background: #1a1a1a;
}

.dark .weather-marker-label {
  color: white;
}

.dark .weather-tooltip {
  background: #1a1a1a !important;
  color: white !important;
}
</style>
