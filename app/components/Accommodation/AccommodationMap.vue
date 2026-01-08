<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import type { Accommodation } from '~/types/api'

const props = defineProps<{
  accommodations: Accommodation[]
  highlightedId?: string | number | null
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'hover', id: string | null): void
}>()

const mapContainer = ref<HTMLElement>()
let L: any = null
let map: any = null
const markers: Map<string, any> = new Map()
const isMapReady = ref(false)

// Category colors - distinct by type
const categoryColors: Record<string, string> = {
  'BOUTIQUE': '#ec4899',     // Pink
  'GUESTHOUSE': '#10b981',   // Emerald
  'HOTEL': '#8b5cf6',        // Purple
  'RESORT': '#06b6d4',       // Cyan
  'VILLA': '#6366f1',        // Indigo
  'HOMESTAY': '#f59e0b',     // Amber
  'LUXURY_HOTEL': '#8b5cf6',
  'BOUTIQUE_HOTEL': '#ec4899',
  'ECO_LODGE': '#22c55e',
  'BEACH_RESORT': '#06b6d4',
  'HOSTEL': '#f97316',
}

function getPrice(acc: Accommodation): string {
    return acc.price ? `$${acc.price}` : '$?'
}

// Count accommodations with valid coordinates
const staysOnMapCount = computed(() => {
  return props.accommodations.filter(a => a.lat && a.lng).length
})

function createMarkerIcon(acc: Accommodation, isHighlighted: boolean = false) {
  const typeKey = acc.type || 'HOTEL'
  const color = categoryColors[typeKey] || '#6b7280'
  const price = getPrice(acc)
  const scale = isHighlighted ? 1.2 : 1
  const shadow = isHighlighted ? '0 0 20px rgba(59, 130, 246, 0.6), 0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.2)'
  const borderWidth = isHighlighted ? 3 : 2
  const animation = isHighlighted ? 'bounce 0.5s ease-in-out' : 'none'
  
  return L.divIcon({
    className: `accommodation-marker ${isHighlighted ? 'highlighted' : ''}`,
    html: `
      <div class="marker-bubble" style="
        background: ${isHighlighted ? color : 'white'};
        border: ${borderWidth}px solid ${color};
        padding: 4px 10px;
        border-radius: 12px;
        font-weight: bold;
        font-size: 12px;
        white-space: nowrap;
        box-shadow: ${shadow};
        cursor: pointer;
        transform: scale(${scale});
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        color: ${isHighlighted ? 'white' : '#333'};
        animation: ${animation};
      ">
        ${acc.isSafetyCertified ? '<span style="font-size: 10px;">✓</span> ' : ''}${price}
      </div>
    `,
    iconSize: [70, 30],
    iconAnchor: [35, 15]
  })
}

function createPopupContent(acc: Accommodation) {
  const typeKey = acc.type || 'HOTEL'
  const color = categoryColors[typeKey] || '#6b7280'
  const price = getPrice(acc)
  
  // Format amenities (show first 4)
  const amenities = (acc.amenities || []).slice(0, 4)
  
  // Amenities are objects {icon, label}
  const amenitiesHtml = amenities.length > 0
    ? `<div style="margin-top: 8px; display: flex; gap: 4px; flex-wrap: wrap;">
        ${amenities.map(a => {
            const label = a.label
            const icon = a.icon // Material symbol name
            return `<span style="font-size: 14px; display: inline-flex; align-items: center;" title="${label}">
                <span class="material-symbols-outlined" style="font-size: 16px;">${icon}</span>
            </span>`
        }).join('')}
       </div>`
    : ''
  
  const title = acc.title
  const cat = typeKey.replace(/_/g, ' ')

  return `
    <div style="min-width: 200px; padding: 4px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <strong style="font-size: 14px; flex: 1;">${title}</strong>
        ${acc.isSafetyCertified ? '<span style="color: #10b981; font-size: 12px;" title="Safety Certified">✓</span>' : ''}
      </div>
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <span style="padding: 2px 8px; border-radius: 4px; background: ${color}15; color: ${color}; font-weight: 600; font-size: 11px;">
          ${cat}
        </span>
        ${acc.rating ? `<span style="color: #f59e0b; font-size: 12px; font-weight: 600;">⭐ ${acc.rating.toFixed(1)}</span>` : ''}
      </div>
      ${acc.location ? `<div style="color: #666; font-size: 11px; margin-top: 6px;">📍 ${acc.location}</div>` : ''}
      ${amenitiesHtml}
      <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;">
        <span style="color: #10b981; font-weight: bold; font-size: 16px;">${price}</span>
        <span style="color: #888; font-size: 11px;">/night</span>
      </div>
    </div>
  `
}

async function initMap() {
  if (!mapContainer.value || map) return
  
  // Dynamic import for SSR compatibility
  L = await import('leaflet')
  await import('leaflet/dist/leaflet.css')
  
  // Fix Leaflet default icon issue
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
  
  // Center on Sri Lanka
  map = L.map(mapContainer.value).setView([7.8731, 80.7718], 8)
  
  // Use CartoDB Voyager for cleaner look
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)
  
  isMapReady.value = true
  updateMarkers()
}

function updateMarkers() {
  if (!map || !L) return
  
  // Clear existing markers
  markers.forEach(m => m.remove())
  markers.clear()
  
  // Add new markers
  props.accommodations.forEach(acc => {
    // Only use flat lat/lng
    const lat = acc.lat
    const lng = acc.lng
    
    if (!lat || !lng) return
    
    const isHighlighted = props.highlightedId === acc.id
    const priceIcon = createMarkerIcon(acc, isHighlighted)
    
    const marker = L.marker([lat, lng], {
      icon: priceIcon,
      zIndexOffset: isHighlighted ? 1000 : 0
    })
    
    marker.bindPopup(createPopupContent(acc), {
      maxWidth: 280,
      className: 'accommodation-popup'
    })
    
    marker.on('click', () => {
      emit('select', acc.id)
    })
    
    marker.on('mouseover', () => {
      emit('hover', acc.id)
    })
    
    marker.on('mouseout', () => {
      emit('hover', null)
    })
    
    marker.addTo(map)
    markers.set(acc.id, marker)
  })
  
  // Auto fit bounds on initial load
  fitBoundsToMarkers()
}

function updateHighlightedMarker() {
  if (!map || !L) return
  
  markers.forEach((marker, id) => {
    const acc = props.accommodations.find(a => a.id === id)
    if (acc) {
      const isHighlighted = props.highlightedId === id
      const newIcon = createMarkerIcon(acc, isHighlighted)
      marker.setIcon(newIcon)
      marker.setZIndexOffset(isHighlighted ? 1000 : 0)
      
      // Bring highlighted marker to front
      if (isHighlighted) {
        marker.openPopup()
      }
    }
  })
}

// Fit bounds to all markers
function fitBoundsToMarkers() {
  if (!map || !L || markers.size === 0) return
  
  if (markers.size > 1) {
    const group = L.featureGroup(Array.from(markers.values()))
    map.fitBounds(group.getBounds().pad(0.1), {
      animate: true,
      duration: 0.5
    })
  } else if (markers.size === 1) {
    // Find the one valid acc
    const acc = props.accommodations.find(a => a.lat && a.lng)
    if (acc && acc.lat && acc.lng) {
      map.setView([acc.lat, acc.lng], 12, {
        animate: true
      })
    }
  }
}

// Center map on specific accommodation
function centerOnAccommodation(id: string | number) {
  const acc = props.accommodations.find(a => a.id === id)
  
  if (acc && acc.lat && acc.lng && map) {
    map.setView([acc.lat, acc.lng], 14, {
      animate: true,
      duration: 0.5
    })
    const marker = markers.get(String(id))
    if (marker) {
      marker.openPopup()
    }
  }
}

// Expose methods for parent
defineExpose({ centerOnAccommodation, fitBoundsToMarkers })

onMounted(() => {
  initMap()
})

watch(() => props.accommodations, () => {
  updateMarkers()
}, { deep: true })

watch(() => props.highlightedId, () => {
  updateHighlightedMarker()
})

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <div class="relative w-full h-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
    <div 
      ref="mapContainer" 
      class="w-full h-full"
    />
    
    <!-- Stays Count Badge -->
    <div class="absolute top-4 right-4 bg-white dark:bg-surface-dark rounded-xl shadow-lg px-4 py-2.5 z-[1000] flex items-center gap-2">
      <span class="text-lg font-bold text-primary">{{ staysOnMapCount }}</span>
      <span class="text-xs text-gray-500 dark:text-gray-400">stays on map</span>
    </div>

    <!-- Fit Bounds Button -->
    <button
      v-if="staysOnMapCount > 1"
      class="absolute top-16 right-4 bg-white dark:bg-surface-dark rounded-xl shadow-lg px-3 py-2 z-[1000] flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
      @click="fitBoundsToMarkers"
    >
      <span class="material-symbols-outlined text-[18px]">fit_screen</span>
      Fit All
    </button>
    
    <!-- Map Legend: Same as before but verified working -->
    <div class="absolute bottom-4 left-4 bg-white dark:bg-surface-dark rounded-xl shadow-lg p-3 z-[1000]">
      <div class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-2">Categories</div>
      <div class="grid grid-cols-2 gap-x-4 gap-y-1">
        <div class="flex items-center gap-2 text-xs">
          <span class="size-2.5 rounded-full bg-purple-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Hotel</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="size-2.5 rounded-full bg-pink-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Boutique</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="size-2.5 rounded-full bg-emerald-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Guesthouse</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="size-2.5 rounded-full bg-amber-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Homestay</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="size-2.5 rounded-full bg-cyan-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Resort</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="size-2.5 rounded-full bg-indigo-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Villa</span>
        </div>
      </div>
    </div>

    <!-- Interaction hint -->
    <div class="absolute bottom-4 right-4 bg-white/90 dark:bg-surface-dark/90 rounded-lg shadow-lg px-3 py-2 z-[1000] backdrop-blur-sm">
      <span class="text-xs text-gray-500 flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">touch_app</span>
        Click marker for details
      </span>
    </div>
  </div>
</template>

<style>
/* Marker animations */
@keyframes bounce {
  0%, 100% { transform: translateY(0) scale(1.2); }
  50% { transform: translateY(-8px) scale(1.2); }
}

.accommodation-marker.highlighted .marker-bubble {
  animation: bounce 0.5s ease-in-out;
}

/* Leaflet control styling */
.leaflet-control-zoom {
  border: none !important;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
}

.leaflet-control-zoom a {
  background: white !important;
  color: #333 !important;
  width: 32px !important;
  height: 32px !important;
  line-height: 32px !important;
}

.leaflet-control-zoom a:hover {
  background: #f3f4f6 !important;
}

/* Popup styling */
.accommodation-popup .leaflet-popup-content-wrapper {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.accommodation-popup .leaflet-popup-content {
  margin: 12px;
}

.accommodation-popup .leaflet-popup-tip {
  background: white;
}

/* Marker z-index */
.accommodation-marker {
  z-index: 10 !important;
}

.accommodation-marker.highlighted {
  z-index: 1000 !important;
}
</style>
