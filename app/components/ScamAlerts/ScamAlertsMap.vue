<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  scams: Array<{
    id: string
    title: string
    location?: {
      latitude: number
      longitude: number
      name?: string
    }
    severity: string
    category: string
  }>
  highlightedId?: string | null
  reportMode?: boolean
}>()

const emit = defineEmits<{
  (e: 'selectScam', id: string): void
  (e: 'reportAt', coords: { lat: number; lng: number }): void
  (e: 'mapCenter', coords: { lat: number; lng: number }): void
  (e: 'pinDrag', coords: { lat: number; lng: number }): void
  (e: 'contextReport', coords: { lat: number; lng: number }): void
}>()

const mapContainer = ref<HTMLElement>()
let L: any = null
let map: any = null
let tileLayer: any = null
const markersById = new Map<string, any>()
let reportMarker: any = null
let longPressTimer: any = null
let longPressCoords: { lat: number; lng: number } | null = null
let markerClusterGroup: any = null
const userLocationMarker = ref<any>(null)
const locatingUser = ref(false)
const locationError = ref('')

// Pan and zoom to a specific scam by ID
function panToScam(scamId: string) {
  const marker = markersById.get(scamId)
  if (marker && map) {
    const latlng = marker.getLatLng()
    map.setView(latlng, 14, { animate: true })
    marker.openPopup()
  }
}

// Remove report marker from map
function clearReportMarker() {
  if (reportMarker) {
    reportMarker.remove()
    reportMarker = null
  }
}

// Force map to recalculate size (fixes rendering issues)
function invalidateSize() {
  console.log('🔄 invalidateSize called, map exists:', !!map, 'tileLayer exists:', !!tileLayer)
  
  if (!map) return
  
  // Use setTimeout to ensure DOM has updated
  setTimeout(() => {
    if (map) {
      console.log('🔄 Calling map.invalidateSize() [0ms]')
      map.invalidateSize({ pan: false, animate: false })
      
      // Force tile layer to redraw
      if (tileLayer) {
        console.log('🔄 Calling tileLayer.redraw() [0ms]')
        tileLayer.redraw()
      }
    }
  }, 0)
  
  // Additional delayed call with tile refresh
  setTimeout(() => {
    if (map) {
      console.log('🔄 Calling map.invalidateSize() [100ms]')
      map.invalidateSize({ pan: false, animate: false })
      if (tileLayer) {
        console.log('🔄 Calling tileLayer.redraw() [100ms]')
        tileLayer.redraw()
      }
    }
  }, 100)
  
  // Final call for stubborn cases
  setTimeout(() => {
    if (map) {
      console.log('🔄 Calling map.invalidateSize() [300ms]')
      map.invalidateSize({ pan: false, animate: false })
      if (tileLayer) {
        console.log('🔄 Calling tileLayer.redraw() [300ms]')
        tileLayer.redraw()
        
        // Check if tiles are actually present in DOM
        setTimeout(() => {
          const tiles = document.querySelectorAll('.leaflet-tile')
          console.log('📊 Number of tiles in DOM:', tiles.length)
          if (tiles.length > 0) {
            const firstTile = tiles[0] as HTMLImageElement
            console.log('📊 First tile src:', firstTile.src)
            console.log('📊 First tile complete:', firstTile.complete)
            console.log('📊 First tile naturalWidth:', firstTile.naturalWidth)
            
            // Check CSS properties
            const tileStyle = window.getComputedStyle(firstTile)
            console.log('🎨 Tile opacity:', tileStyle.opacity)
            console.log('🎨 Tile visibility:', tileStyle.visibility)
            console.log('🎨 Tile display:', tileStyle.display)
            console.log('🎨 Tile z-index:', tileStyle.zIndex)
            
            // Check tile pane
            const tilePane = document.querySelector('.leaflet-tile-pane') as HTMLElement
            if (tilePane) {
              const paneStyle = window.getComputedStyle(tilePane)
              console.log('🎨 Tile pane opacity:', paneStyle.opacity)
              console.log('🎨 Tile pane z-index:', paneStyle.zIndex)
              console.log('🎨 Tile pane transform:', paneStyle.transform)
            }
            
            // Check leaflet container
            const container = document.querySelector('.leaflet-container') as HTMLElement
            if (container) {
              const containerStyle = window.getComputedStyle(container)
              console.log('🎨 Container background:', containerStyle.backgroundColor)
              
              // Check all panes and their z-indices
              const allPanes = container.querySelectorAll('[class*="pane"]')
              console.log('🎨 All panes:')
              allPanes.forEach((pane: Element) => {
                const paneEl = pane as HTMLElement
                const paneStyle = window.getComputedStyle(paneEl)
                console.log(`  - ${paneEl.className}: z-index=${paneStyle.zIndex}, opacity=${paneStyle.opacity}, pointer-events=${paneStyle.pointerEvents}`)
              })
            }
            
            // If tiles haven't loaded, force a full reload
            if (!firstTile.complete || firstTile.naturalWidth === 0) {
              console.warn('⚠️ Tiles not loading properly, forcing refresh...')
              // Remove and re-add tile layer
              if (tileLayer && L) {
                map.removeLayer(tileLayer)
                setTimeout(() => {
                  tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
                    updateWhenIdle: false,
                    updateWhenZooming: false,
                    keepBuffer: 2
                  }).addTo(map)
                  console.log('✅ Tile layer recreated')
                }, 50)
              }
            }
          }
        }, 200)
      }
    }
  }, 300)
}

// Force complete tile layer reload (for stubborn rendering issues)
function forceReload() {
  if (!map || !tileLayer || !L) return
  
  // Remove existing tile layer
  map.removeLayer(tileLayer)
  
  // Wait a tick, then recreate and add tile layer
  setTimeout(() => {
    tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
      updateWhenIdle: false,
      updateWhenZooming: false,
      keepBuffer: 2
    }).addTo(map)
    
    // Invalidate size after reload
    setTimeout(() => {
      map?.invalidateSize({ pan: false, animate: false })
    }, 100)
  }, 50)
}

// Locate user's current position
function locateMe() {
  if (!navigator.geolocation) {
    locationError.value = 'Geolocation not supported'
    setTimeout(() => locationError.value = '', 3000)
    return
  }
  
  locatingUser.value = true
  locationError.value = ''
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      
      if (map) {
        // Remove previous user location marker
        if (userLocationMarker.value) {
          userLocationMarker.value.remove()
        }
        
        // Add user location marker
        userLocationMarker.value = L.circleMarker([latitude, longitude], {
          radius: 8,
          fillColor: '#3b82f6',
          color: '#fff',
          weight: 3,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map)
        
        userLocationMarker.value.bindPopup('<div class="text-sm font-semibold">📍 Your Location</div>').openPopup()
        
        // Pan to user location
        map.setView([latitude, longitude], 13, { animate: true })
      }
      
      locatingUser.value = false
    },
    (error) => {
      console.error('Geolocation error:', error)
      locationError.value = 'Could not get your location'
      locatingUser.value = false
      setTimeout(() => locationError.value = '', 3000)
    },
    { timeout: 10000, enableHighAccuracy: true }
  )
}

// Zoom in
function zoomIn() {
  if (map) {
    map.zoomIn()
  }
}

// Zoom out
function zoomOut() {
  if (map) {
    map.zoomOut()
  }
}

// Expose methods to parent components
defineExpose({ panToScam, clearReportMarker, invalidateSize, forceReload })

// Severity colors
const severityColors: Record<string, string> = {
  LOW: '#10b981',
  MEDIUM: '#f59e0b',
  HIGH: '#ef4444',
  CRITICAL: '#991b1b'
}

// Category icons
const categoryIcons: Record<string, string> = {
  TRANSPORT_SCAM: '🛺',
  GEM_SCAM: '💎',
  TOUR_GUIDE_SCAM: '👤',
  SHOPPING_SCAM: '🛍️',
  RESTAURANT_SCAM: '🍽️',
  ACCOMMODATION_SCAM: '🏨',
  OTHER: '⚠️'
}

async function initMap() {
  if (!mapContainer.value || map) return
  
  console.log('🗺️ Initializing map...')
  
  // Dynamic import for SSR compatibility
  L = await import('leaflet')
  await import('leaflet/dist/leaflet.css')
  
  // Import marker clustering
  try {
    const MarkerCluster = await import('leaflet.markercluster')
    await import('leaflet.markercluster/dist/MarkerCluster.css')
    await import('leaflet.markercluster/dist/MarkerCluster.Default.css')
    console.log('✅ Marker clustering loaded')
  } catch (e) {
    console.warn('⚠️ Marker clustering not available:', e)
  }
  
  console.log('✅ Leaflet loaded')
  
  // Fix Leaflet default icon issue
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
  
  // Center on Sri Lanka
  map = L.map(mapContainer.value, {
    zoomAnimation: false,
    fadeAnimation: false,
    markerZoomAnimation: false
  }).setView([7.8731, 80.7718], 8)
  
  console.log('✅ Map instance created')
  
  // Create and save tile layer reference
  tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    updateWhenIdle: false,
    updateWhenZooming: false,
    keepBuffer: 2
  }).addTo(map)
  
  console.log('✅ Tile layer added')
  
  // Add load event listener
  tileLayer.on('load', () => {
    console.log('✅ Tiles loaded successfully')
  })
  
  tileLayer.on('tileerror', (error: any) => {
    console.error('❌ Tile load error:', error)
  })
  
  // Click handler - only triggers in Report Mode
  map.on('click', (e: any) => {
    if (!props.reportMode) return
    
    placeReportMarker(e.latlng.lat, e.latlng.lng)
    emit('reportAt', { lat: e.latlng.lat, lng: e.latlng.lng })
  })
  
  // Right-click context menu (desktop)
  map.on('contextmenu', (e: any) => {
    e.originalEvent.preventDefault()
    emit('contextReport', { lat: e.latlng.lat, lng: e.latlng.lng })
  })
  
  // Long-press detection for mobile
  map.on('mousedown', (e: any) => {
    longPressCoords = { lat: e.latlng.lat, lng: e.latlng.lng }
    longPressTimer = setTimeout(() => {
      if (longPressCoords) {
        emit('contextReport', longPressCoords)
      }
    }, 600)
  })
  
  map.on('mouseup', () => {
    clearTimeout(longPressTimer)
    longPressCoords = null
  })
  
  map.on('mousemove', () => {
    clearTimeout(longPressTimer)
    longPressCoords = null
  })
  
  // Emit map center on move/zoom for dynamic danger banner
  map.on('moveend', () => {
    const center = map.getCenter()
    emit('mapCenter', { lat: center.lat, lng: center.lng })
  })
  
  // Emit initial center
  const initialCenter = map.getCenter()
  emit('mapCenter', { lat: initialCenter.lat, lng: initialCenter.lng })
  
  updateMarkers()
}

// Place or move the report marker
function placeReportMarker(lat: number, lng: number) {
  if (!L || !map) return
  
  // Remove previous report marker if exists
  if (reportMarker) {
    reportMarker.remove()
  }
  
  // Create a draggable marker at click location
  reportMarker = L.marker([lat, lng], {
    draggable: true,
    icon: L.divIcon({
      className: 'report-marker',
      html: `<div class="report-pin-marker">
        <div class="pin-head">📍</div>
        <div class="pin-pulse"></div>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    })
  }).addTo(map)
  
  reportMarker.bindPopup('<div class="text-sm font-semibold">Report location</div><div class="text-xs text-gray-500">Drag to adjust</div>').openPopup()
  
  // Handle drag events
  reportMarker.on('drag', (e: any) => {
    const latlng = e.target.getLatLng()
    emit('pinDrag', { lat: latlng.lat, lng: latlng.lng })
  })
  
  reportMarker.on('dragend', (e: any) => {
    const latlng = e.target.getLatLng()
    emit('pinDrag', { lat: latlng.lat, lng: latlng.lng })
    reportMarker.openPopup()
  })
}

function updateMarkers() {
  if (!map || !L) return
  
  // Clear existing markers and cluster group
  markersById.forEach(m => m.remove())
  markersById.clear()
  
  if (markerClusterGroup) {
    map.removeLayer(markerClusterGroup)
  }
  
  // Create new marker cluster group if available
  if (L.markerClusterGroup) {
    markerClusterGroup = L.markerClusterGroup({
      maxClusterRadius: 60,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true
    })
  }
  
  // Add new markers
  props.scams.forEach(scam => {
    if (!scam.location?.latitude || !scam.location?.longitude) return
    
    const color = severityColors[scam.severity] || '#6b7280'
    const icon = categoryIcons[scam.category] || '⚠️'
    
    const marker = L.circleMarker([scam.location.latitude, scam.location.longitude], {
      radius: scam.severity === 'HIGH' || scam.severity === 'CRITICAL' ? 12 : 8,
      fillColor: color,
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    })
    
    marker.bindPopup(`
      <div style="min-width: 150px;">
        <div style="font-size: 20px; margin-bottom: 4px;">${icon}</div>
        <strong style="font-size: 14px;">${scam.title}</strong><br>
        <span style="display: inline-block; margin-top: 4px; padding: 2px 8px; border-radius: 4px; background: ${color}20; color: ${color}; font-weight: bold; font-size: 12px;">
          ${scam.severity}
        </span>
        <span style="color: #666; font-size: 12px; margin-left: 4px;">${scam.category.replace(/_/g, ' ')}</span>
        ${scam.location.name ? `<br><span style="color: #888; font-size: 11px;">📍 ${scam.location.name}</span>` : ''}
      </div>
    `)
    
    marker.on('click', () => {
      emit('selectScam', scam.id)
    })
    
    // Add to cluster group or directly to map
    if (markerClusterGroup) {
      markerClusterGroup.addLayer(marker)
    } else {
      marker.addTo(map)
    }
    
    markersById.set(scam.id, marker)
  })
  
  // Add cluster group to map
  if (markerClusterGroup) {
    map.addLayer(markerClusterGroup)
  }
  
  // Fit bounds if we have markers
  const markersArray = Array.from(markersById.values())
  if (markersArray.length > 1) {
    const group = L.featureGroup(markersArray)
    map.fitBounds(group.getBounds().pad(0.1))
  } else if (markersArray.length === 1) {
    const scam = props.scams.find(s => s.location?.latitude && s.location?.longitude)
    if (scam?.location) {
      map.setView([scam.location.latitude, scam.location.longitude], 12)
    }
  }
}

onMounted(() => {
  initMap()
})

// Watch for report mode changes to update cursor (but don't call invalidateSize)
watch(() => props.reportMode, (newVal) => {
  if (mapContainer.value) {
    if (newVal) {
      mapContainer.value.classList.add('report-mode-cursor')
    } else {
      mapContainer.value.classList.remove('report-mode-cursor')
      clearReportMarker()
    }
  }
})

watch(() => props.scams, () => {
  updateMarkers()
}, { deep: true })

onUnmounted(() => {
  clearTimeout(longPressTimer)
  map?.remove()
  map = null
})
</script>

<template>
  <div class="relative w-full h-full bg-gray-200 dark:bg-gray-800">
    <!-- Zoom Controls -->
    <div class="absolute top-4 left-4 z-[400] flex flex-col gap-1 shadow-lg">
      <button
        @click="zoomIn"
        class="size-10 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 transition-colors shadow-sm"
        title="Zoom in"
      >
        <span class="material-symbols-outlined text-[20px]">add</span>
      </button>
      <button
        @click="zoomOut"
        class="size-10 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 transition-colors shadow-sm"
        title="Zoom out"
      >
        <span class="material-symbols-outlined text-[20px]">remove</span>
      </button>
    </div>

    <!-- Locate Me Button -->
    <div class="absolute top-4 left-16 z-[400]">
      <button
        @click="locateMe"
        :disabled="locatingUser"
        class="size-10 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center transition-colors shadow-lg disabled:opacity-50 disabled:cursor-wait"
        title="Show my location"
      >
        <span v-if="locatingUser" class="animate-spin material-symbols-outlined text-[20px] text-blue-500">progress_activity</span>
        <span v-else class="material-symbols-outlined text-[20px] text-blue-500">my_location</span>
      </button>
      <Transition name="fade">
        <div v-if="locationError" class="absolute top-12 left-0 bg-red-500 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap">
          {{ locationError }}
        </div>
      </Transition>
    </div>

    <!-- Severity Legend -->
    <div class="absolute bottom-4 left-4 z-[400] bg-white dark:bg-surface-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 text-xs">
      <div class="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1">
        <span class="material-symbols-outlined text-[16px]">info</span>
        Risk Levels
      </div>
      <div class="space-y-1.5">
        <div class="flex items-center gap-2">
          <div class="size-3 rounded-full bg-[#991b1b]"></div>
          <span class="text-gray-600 dark:text-gray-300">Critical</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="size-3 rounded-full bg-[#ef4444]"></div>
          <span class="text-gray-600 dark:text-gray-300">High</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="size-3 rounded-full bg-[#f59e0b]"></div>
          <span class="text-gray-600 dark:text-gray-300">Medium</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="size-3 rounded-full bg-[#10b981]"></div>
          <span class="text-gray-600 dark:text-gray-300">Low</span>
        </div>
      </div>
    </div>
    <div
      ref="mapContainer"
      class="w-full h-full bg-gray-200 dark:bg-gray-800"
      :class="{ 'report-mode-cursor': reportMode }"
    />
    
    <!-- Map Legend -->
    <div class="absolute bottom-4 left-4 bg-white dark:bg-surface-dark rounded-lg shadow-lg p-3 z-[1000]">
      <div class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-2">Severity</div>
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2 text-xs">
          <span class="size-3 rounded-full bg-red-600"></span>
          <span class="text-gray-600 dark:text-gray-400">High/Critical</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="size-3 rounded-full bg-amber-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Medium</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="size-3 rounded-full bg-emerald-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Low</span>
        </div>
      </div>
    </div>
    
    <!-- Scam count badge -->
    <div class="absolute top-4 right-4 bg-white dark:bg-surface-dark rounded-lg shadow-lg px-3 py-2 z-[1000]">
      <span class="text-sm font-bold text-gray-800 dark:text-white">{{ scams.filter(s => s.location?.latitude).length }}</span>
      <span class="text-xs text-gray-500 ml-1">alerts on map</span>
    </div>
  </div>
</template>

<style>
/* Ensure Leaflet controls are visible */
.leaflet-control-zoom {
  border: none !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1) !important;
}
.leaflet-control-zoom a {
  background: white !important;
  color: #333 !important;
}

/* Fix Leaflet container background */
.leaflet-container {
  background: transparent !important;
}

@media (prefers-color-scheme: dark) {
  .leaflet-container {
    background: transparent !important;
  }
}

/* Report Mode Cursor */
.report-mode-cursor {
  cursor: crosshair !important;
}
.report-mode-cursor .leaflet-container {
  cursor: crosshair !important;
}
.report-mode-cursor .leaflet-interactive {
  cursor: crosshair !important;
}

/* Report Pin Marker Styles */
.report-pin-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.report-pin-marker .pin-head {
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  animation: bounce-in 0.3s ease-out;
}
.report-pin-marker .pin-pulse {
  position: absolute;
  bottom: -4px;
  width: 20px;
  height: 8px;
  background: rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: pulse-shadow 1.5s ease-in-out infinite;
}

@keyframes bounce-in {
  0% { transform: translateY(-20px) scale(0.8); opacity: 0; }
  60% { transform: translateY(4px) scale(1.05); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

@keyframes pulse-shadow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.5); opacity: 0.2; }
}

/* Draggable hint */
.leaflet-marker-draggable .report-pin-marker .pin-head {
  cursor: grab;
}
.leaflet-marker-draggable:active .report-pin-marker .pin-head {
  cursor: grabbing;
}

/* Fade transition for error messages */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
