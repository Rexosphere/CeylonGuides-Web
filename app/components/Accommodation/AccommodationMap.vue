<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  accommodations: Array<{
    id: string
    name: string
    location?: {
      latitude?: number
      longitude?: number
      name?: string
    }
    category: string
    price_per_night_lkr?: number
    rating?: number
  }>
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const mapContainer = ref<HTMLElement>()
let L: any = null
let map: any = null
const markers: any[] = []

// Category icons
const categoryIcons: Record<string, string> = {
  'LUXURY_HOTEL': '🏨',
  'BOUTIQUE_HOTEL': '🏩',
  'GUESTHOUSE': '🏠',
  'HOMESTAY': '🏡',
  'ECO_LODGE': '🌿',
  'BEACH_RESORT': '🏖️',
  'VILLA': '🏰',
  'HOSTEL': '🛏️'
}

// Category colors
const categoryColors: Record<string, string> = {
  'LUXURY_HOTEL': '#8b5cf6',
  'BOUTIQUE_HOTEL': '#ec4899',
  'GUESTHOUSE': '#10b981',
  'HOMESTAY': '#f59e0b',
  'ECO_LODGE': '#22c55e',
  'BEACH_RESORT': '#06b6d4',
  'VILLA': '#6366f1',
  'HOSTEL': '#f97316'
}

function toUsd(lkr?: number) {
  if (!lkr) return '?'
  return `$${Math.round(lkr / 300)}`
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
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>'
  }).addTo(map)
  
  updateMarkers()
}

function updateMarkers() {
  if (!map || !L) return
  
  // Clear existing markers
  markers.forEach(m => m.remove())
  markers.length = 0
  
  // Add new markers
  props.accommodations.forEach(acc => {
    if (!acc.location?.latitude || !acc.location?.longitude) return
    
    const color = categoryColors[acc.category] || '#6b7280'
    const icon = categoryIcons[acc.category] || '🏨'
    const price = toUsd(acc.price_per_night_lkr)
    
    // Create custom div icon with price
    const priceIcon = L.divIcon({
      className: 'accommodation-marker',
      html: `
        <div style="
          background: white;
          border: 2px solid ${color};
          padding: 4px 8px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 12px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          ${price}
        </div>
      `,
      iconSize: [60, 30],
      iconAnchor: [30, 15]
    })
    
    const marker = L.marker([acc.location.latitude, acc.location.longitude], {
      icon: priceIcon
    })
    
    marker.bindPopup(`
      <div style="min-width: 180px;">
        <div style="font-size: 18px; margin-bottom: 4px;">${icon}</div>
        <strong style="font-size: 14px;">${acc.name}</strong><br>
        <span style="display: inline-block; margin-top: 4px; padding: 2px 8px; border-radius: 4px; background: ${color}20; color: ${color}; font-weight: bold; font-size: 11px;">
          ${acc.category.replace(/_/g, ' ')}
        </span>
        ${acc.rating ? `<span style="color: #f59e0b; font-size: 12px; margin-left: 4px;">⭐ ${acc.rating.toFixed(1)}</span>` : ''}
        ${acc.location.name ? `<br><span style="color: #888; font-size: 11px;">📍 ${acc.location.name}</span>` : ''}
        <br><span style="color: #10b981; font-weight: bold; font-size: 13px;">${price}/night</span>
      </div>
    `)
    
    marker.on('click', () => {
      emit('select', acc.id)
    })
    
    marker.addTo(map)
    markers.push(marker)
  })
  
  // Fit bounds if we have markers
  if (markers.length > 1) {
    const group = L.featureGroup(markers)
    map.fitBounds(group.getBounds().pad(0.1))
  } else if (markers.length === 1) {
    const acc = props.accommodations.find(a => a.location?.latitude && a.location?.longitude)
    if (acc?.location) {
      map.setView([acc.location.latitude, acc.location.longitude], 12)
    }
  }
}

onMounted(() => {
  initMap()
})

watch(() => props.accommodations, () => {
  updateMarkers()
}, { deep: true })

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <div class="relative hidden md:block md:flex-1 bg-neutral-100 dark:bg-neutral-900 overflow-hidden sticky top-[80px] h-[calc(100vh-80px)]">
    <div 
      ref="mapContainer" 
      class="w-full h-full"
    />
    
    <!-- Map Legend -->
    <div class="absolute bottom-4 left-4 bg-white dark:bg-surface-dark rounded-lg shadow-lg p-3 z-[1000]">
      <div class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-2">Categories</div>
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2 text-xs">
          <span class="size-3 rounded-full bg-purple-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Luxury</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="size-3 rounded-full bg-emerald-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Guesthouse</span>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span class="size-3 rounded-full bg-amber-500"></span>
          <span class="text-gray-600 dark:text-gray-400">Homestay</span>
        </div>
      </div>
    </div>
    
    <!-- Accommodation count badge -->
    <div class="absolute top-4 right-4 bg-white dark:bg-surface-dark rounded-lg shadow-lg px-3 py-2 z-[1000]">
      <span class="text-sm font-bold text-gray-800 dark:text-white">{{ accommodations.filter(a => a.location?.latitude).length }}</span>
      <span class="text-xs text-gray-500 ml-1">stays on map</span>
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
</style>
