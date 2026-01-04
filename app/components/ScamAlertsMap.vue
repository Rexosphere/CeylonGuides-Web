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
}>()

const emit = defineEmits<{
  (e: 'selectScam', id: string): void
}>()

const mapContainer = ref<HTMLElement>()
let L: any = null
let map: any = null
const markers: any[] = []

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
    
    marker.addTo(map)
    markers.push(marker)
  })
  
  // Fit bounds if we have markers
  if (markers.length > 1) {
    const group = L.featureGroup(markers)
    map.fitBounds(group.getBounds().pad(0.1))
  } else if (markers.length === 1) {
    const scam = props.scams.find(s => s.location?.latitude && s.location?.longitude)
    if (scam?.location) {
      map.setView([scam.location.latitude, scam.location.longitude], 12)
    }
  }
}

onMounted(() => {
  initMap()
})

watch(() => props.scams, () => {
  updateMarkers()
}, { deep: true })

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <div class="relative">
    <div 
      ref="mapContainer" 
      class="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10"
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
</style>
