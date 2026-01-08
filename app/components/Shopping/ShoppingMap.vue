<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import type { ShoppingDistrict } from '~/data/shopping.data'
import type * as LeafletTypes from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Props {
  districts: ShoppingDistrict[]
  highlightedDistrictId?: string | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  districtClick: [districtId: string]
}>()

const mapContainer = ref<HTMLDivElement | null>(null)
let map: LeafletTypes.Map | null = null
let L: typeof LeafletTypes | null = null
const markers = ref<Map<string, LeafletTypes.Marker>>(new Map())
const isMapReady = ref(false)

// Coordinates for multi-location districts
const multiLocationCoords: Record<string, Array<{ lat: number; lng: number; label: string }>> = {
  laksala: [
    { lat: 6.9271, lng: 79.8612, label: 'Colombo' },
    { lat: 7.2906, lng: 80.6337, label: 'Kandy' },
    { lat: 6.0535, lng: 80.2210, label: 'Galle' }
  ]
}

const initMap = async () => {
  if (!mapContainer.value || map) return

  try {
    // Dynamic import Leaflet only on client side
    L = (await import('leaflet')).default

    // Fix default icon paths for webpack/vite
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })

    // Initialize map centered on Sri Lanka
    map = L.map(mapContainer.value, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([7.8731, 80.7718], 8)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    isMapReady.value = true
    addMarkers()
  } catch (error) {
    console.error('Failed to initialize map:', error)
  }
}

const createCustomIcon = (isHighlighted: boolean, isMultiLocation: boolean = false) => {
  if (!L) return undefined

  const iconHtml = isMultiLocation
    ? `<div class="flex items-center justify-center w-10 h-10 rounded-full ${isHighlighted ? 'bg-amber-500' : 'bg-blue-500'} shadow-lg border-3 border-white">
        <span class="material-symbols-outlined text-white text-xl" style="font-variation-settings: 'FILL' 1">store</span>
      </div>`
    : `<div class="flex items-center justify-center w-10 h-10 rounded-full ${isHighlighted ? 'bg-primary' : 'bg-blue-600'} shadow-lg border-3 border-white">
        <span class="material-symbols-outlined text-white text-xl" style="font-variation-settings: 'FILL' 1">location_on</span>
      </div>`

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })
}

const addMarkers = () => {
  if (!map || !L || !isMapReady.value) return

  // TypeScript type guards - these are guaranteed non-null after the check above
  const leaflet = L
  const mapInstance = map

  // Clear existing markers
  markers.value.forEach((marker) => marker.remove())
  markers.value.clear()

  props.districts.forEach((district) => {
    // Check if this district has multiple locations
    const multiLocs = multiLocationCoords[district.id]

    if (multiLocs) {
      // Create multiple markers for this district
      multiLocs.forEach((loc, index) => {
        const isHighlighted = props.highlightedDistrictId === district.id
        const marker = leaflet.marker([loc.lat, loc.lng], {
          icon: createCustomIcon(isHighlighted, true),
        }).addTo(mapInstance)

        const popupContent = `
          <div class="p-2 min-w-[200px]">
            <h3 class="font-bold text-base mb-1">${district.name}</h3>
            <p class="text-sm text-gray-600 mb-1">${loc.label} Branch</p>
            <p class="text-xs text-gray-500">${district.areaLabel}</p>
            <button class="mt-2 px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90 transition" onclick="window.dispatchEvent(new CustomEvent('map-district-click', { detail: '${district.id}' }))">
              View Details
            </button>
          </div>
        `

        marker.bindPopup(popupContent)
        marker.on('click', () => {
          emit('districtClick', district.id)
        })

        // Store marker with unique key
        markers.value.set(`${district.id}-${index}`, marker)
      })
    } else {
      // Single marker for regular districts
      const { lat, lng } = district.approxLatLng
      const isHighlighted = props.highlightedDistrictId === district.id

      const marker = leaflet.marker([lat, lng], {
        icon: createCustomIcon(isHighlighted),
      }).addTo(mapInstance)

      const popupContent = `
        <div class="p-2 min-w-[200px]">
          <h3 class="font-bold text-base mb-1">${district.name}</h3>
          <p class="text-sm text-gray-600 mb-1">${district.areaLabel}</p>
          <p class="text-xs text-gray-500 mb-2">${district.description.substring(0, 100)}...</p>
          <button class="mt-2 px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90 transition" onclick="window.dispatchEvent(new CustomEvent('map-district-click', { detail: '${district.id}' }))">
            View Details
          </button>
        </div>
      `

      marker.bindPopup(popupContent)
      marker.on('click', () => {
        emit('districtClick', district.id)
      })

      markers.value.set(district.id, marker)
    }
  })
}

const fitToSriLanka = () => {
  if (!map || !L) return
  // Fit to Sri Lanka bounds
  const bounds = L.latLngBounds(
    L.latLng(5.9, 79.5), // Southwest
    L.latLng(9.9, 82.0)  // Northeast
  )
  map.fitBounds(bounds, { padding: [20, 20] })
}

const fitToMarkers = () => {
  if (!map || !L || markers.value.size === 0) return

  const markerLatLngs: Array<[number, number]> = []
  
  props.districts.forEach((district) => {
    const multiLocs = multiLocationCoords[district.id]
    if (multiLocs) {
      multiLocs.forEach((loc) => markerLatLngs.push([loc.lat, loc.lng]))
    } else {
      markerLatLngs.push([district.approxLatLng.lat, district.approxLatLng.lng])
    }
  })

  if (markerLatLngs.length > 0) {
    const bounds = L.latLngBounds(markerLatLngs)
    map.fitBounds(bounds, { padding: [50, 50] })
  }
}

const highlightMarker = (districtId: string | null) => {
  if (!districtId || !map) return

  // Check if it's a multi-location district
  const multiLocs = multiLocationCoords[districtId]

  if (multiLocs) {
    // Update all markers for this district
    multiLocs.forEach((_, index) => {
      const key = `${districtId}-${index}`
      const marker = markers.value.get(key)
      const icon = createCustomIcon(true, true)
      if (marker && icon) {
        marker.setIcon(icon)
        // Open popup on first marker
        if (index === 0) {
          marker.openPopup()
          map?.setView(marker.getLatLng(), 12, { animate: true })
        }
      }
    })
  } else {
    // Single marker
    const marker = markers.value.get(districtId)
    const icon = createCustomIcon(true)
    if (marker && icon) {
      marker.setIcon(icon)
      marker.openPopup()
      map?.setView(marker.getLatLng(), 13, { animate: true })
    }
  }
}

const unhighlightMarker = (districtId: string | null) => {
  if (!districtId) return

  const multiLocs = multiLocationCoords[districtId]

  if (multiLocs) {
    multiLocs.forEach((_, index) => {
      const key = `${districtId}-${index}`
      const marker = markers.value.get(key)
      const icon = createCustomIcon(false, true)
      if (marker && icon) {
        marker.setIcon(icon)
      }
    })
  } else {
    const marker = markers.value.get(districtId)
    const icon = createCustomIcon(false)
    if (marker && icon) {
      marker.setIcon(icon)
    }
  }
}

// Watch for highlighted district changes
watch(() => props.highlightedDistrictId, (newId, oldId) => {
  if (oldId) unhighlightMarker(oldId)
  if (newId) highlightMarker(newId)
})

// Watch for districts changes
watch(() => props.districts, () => {
  if (isMapReady.value) {
    nextTick(() => {
      addMarkers()
    })
  }
}, { deep: true })

// Listen to custom events from popup buttons
onMounted(() => {
  initMap()

  window.addEventListener('map-district-click', ((event: CustomEvent) => {
    emit('districtClick', event.detail)
  }) as EventListener)
})

defineExpose({
  fitToSriLanka,
  fitToMarkers,
})
</script>

<template>
  <div class="relative w-full h-full">
    <!-- Map Container -->
    <div ref="mapContainer" class="w-full h-full rounded-lg overflow-hidden shadow-lg" />

    <!-- Control Buttons -->
    <div class="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        class="bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 text-text-main dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition flex items-center gap-2"
        @click="fitToSriLanka"
      >
        <span class="material-symbols-outlined text-lg">public</span>
        Fit to Sri Lanka
      </button>
      <button
        class="bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 text-text-main dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition flex items-center gap-2"
        @click="fitToMarkers"
      >
        <span class="material-symbols-outlined text-lg">pin_drop</span>
        Fit to Markers
      </button>
    </div>
  </div>
</template>

<style scoped>
:deep(.custom-marker) {
  background: transparent;
  border: none;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 0.5rem;
}

:deep(.leaflet-popup-content) {
  margin: 0;
}
</style>
