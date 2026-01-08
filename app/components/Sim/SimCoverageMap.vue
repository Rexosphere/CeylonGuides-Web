<template>
  <div class="flex flex-col gap-4 h-full relative">
    
    <!-- Map Container -->
    <div class="h-[400px] md:h-[350px] shrink-0 w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-sm relative z-0">
      <client-only>
        <div id="coverage-map" class="w-full h-full bg-gray-100 dark:bg-neutral-800"></div>
      </client-only>
      
      <!-- Overlay User Loc Button -->
      <button 
        @click="requestLocation"
        class="absolute bottom-4 right-4 z-[500] bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md border border-gray-200 dark:border-neutral-600 text-primary hover:bg-gray-50 focus:outline-none"
        :title="loadingLocation ? 'Locating...' : 'Find Near Me'"
      >
        <span class="material-symbols-outlined text-xl" :class="{'animate-spin': loadingLocation}">
          {{ loadingLocation ? 'progress_activity' : 'my_location' }}
        </span>
      </button>
    </div>

    <!-- Controls -->
    <div class="flex-grow flex flex-col gap-3 min-h-0">
       
       <!-- Layer Toggles (Horizontal Scroll or Compact Grid) -->
       <div class="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-700 p-3 shadow-sm shrink-0">
          <h3 class="text-xs font-bold text-text-muted uppercase mb-2">Layers</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <button 
              @click="layers.regions = !layers.regions"
              class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all"
              :class="layers.regions ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300' : 'bg-gray-50 border-transparent text-text-muted dark:bg-neutral-800'"
            >
              <span class="material-symbols-outlined text-sm">public</span>
              Coverage
            </button>
            <button 
              @click="layers.wifi = !layers.wifi"
              class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all"
              :class="layers.wifi ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' : 'bg-gray-50 border-transparent text-text-muted dark:bg-neutral-800'"
            >
              <span class="material-symbols-outlined text-sm">wifi</span>
              WiFi
            </button>
            <button 
              @click="layers.coworking = !layers.coworking"
              class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all"
              :class="layers.coworking ? 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300' : 'bg-gray-50 border-transparent text-text-muted dark:bg-neutral-800'"
            >
              <span class="material-symbols-outlined text-sm">laptop_mac</span>
              Nomad
            </button>
            <button 
              @click="layers.sellers = !layers.sellers"
              class="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all"
              :class="layers.sellers ? 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300' : 'bg-gray-50 border-transparent text-text-muted dark:bg-neutral-800'"
            >
              <span class="material-symbols-outlined text-sm">store</span>
              Shops
            </button>
          </div>
       </div>

       <!-- Location List -->
       <div class="flex-grow overflow-y-auto bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-700 p-3 shadow-sm min-h-[200px]">
          <div class="sticky top-0 bg-white dark:bg-surface-dark z-10 pb-2 mb-2 border-b border-gray-100 dark:border-neutral-700 flex justify-between items-center">
            <h3 class="text-xs font-bold text-text-muted uppercase">
              {{ userLocation ? `Nearby (${visibleLocations.length})` : `Locations (${visibleLocations.length})` }}
            </h3>
            <button 
              v-if="userLocation" 
              @click="clearLocation"
              class="text-[10px] text-red-500 hover:text-red-600 font-medium"
            >
              Clear
            </button>
          </div>
          
          <div class="space-y-2">
            <button
              v-for="(loc, idx) in visibleLocations.slice(0, 50)"
              :key="idx"
              @click="flyToLocation(loc)"
              class="w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors flex items-start gap-3 group relative"
            >
               <span 
                class="material-symbols-outlined text-lg mt-0.5 shrink-0"
                :class="loc.iconClass"
              >
                {{ loc.icon }}
              </span>
              <div class="flex-grow min-w-0">
                <div class="flex justify-between items-start gap-2">
                   <div class="text-sm font-bold text-text-main dark:text-white group-hover:text-primary truncate">{{ loc.name }}</div>
                   <span v-if="loc.distance !== undefined" class="text-[10px] font-bold bg-gray-100 dark:bg-neutral-700 text-text-muted px-1.5 py-0.5 rounded whitespace-nowrap">
                    {{ loc.distance.toFixed(1) }}km
                  </span>
                </div>
                <div class="text-xs text-text-muted line-clamp-1">{{ loc.desc }}</div>
              </div>
            </button>
             <div v-if="visibleLocations.length === 0" class="text-xs text-text-muted text-center py-8">
               No locations visible.
             </div>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import {
  regionCoverage,
  wifiAndNomad,
  purchaseLocations,
  publicWifiZones,
  getProviderById,
  type RegionCoverage
} from '~/data/simData'

// State
const layers = ref({
  regions: true,
  wifi: true,
  coworking: true,
  sellers: true
})

interface MapLocation {
  name: string
  desc?: string
  lat: number
  lng: number
  type: 'region' | 'wifi' | 'coworking' | 'seller'
  icon: string
  iconClass: string
  details?: any
  distance?: number
}

let map: any = null
let markerLayers: any = {
  regions: null,
  wifi: null,
  coworking: null,
  sellers: null,
  user: null
}

const userLocation = ref<{ lat: number; lng: number } | null>(null)
const loadingLocation = ref(false)

function requestLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
    return
  }

  loadingLocation.value = true

  navigator.geolocation.getCurrentPosition(
    (position) => {
      loadingLocation.value = false
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      
      // Pan to user
      if (import.meta.client && map) {
        map.flyTo([userLocation.value.lat, userLocation.value.lng], 13)
        // Update layers to add user marker
        import('leaflet').then(L => updateMapLayers(L))
      }
    },
    (error) => {
      loadingLocation.value = false
      console.error(error)
      alert('Unable to retrieve your location. Please check your permissions.')
    }
  )
}

function clearLocation() {
  userLocation.value = null
  if (import.meta.client && map) {
    import('leaflet').then(L => updateMapLayers(L))
  }
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius in km
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180)
}

const visibleLocations = computed<MapLocation[]>(() => {
  const locs: MapLocation[] = []

  // Helper to add loc with distance
  const addLoc = (item: MapLocation) => {
    if (userLocation.value) {
      item.distance = getDistanceFromLatLonInKm(
        userLocation.value.lat, userLocation.value.lng,
        item.lat, item.lng
      )
    }
    locs.push(item)
  }

  // Sellers
  if (layers.value.sellers) {
    purchaseLocations.airportLocations.forEach(ap => {
      if (ap.coordinates) {
        addLoc({
          name: ap.name,
          desc: 'Airport SIM Counter',
          lat: ap.coordinates.lat,
          lng: ap.coordinates.lng,
          type: 'seller',
          icon: 'store',
          iconClass: 'text-orange-500',
          details: ap
        })
      }
    })
  }

  // Coworking
  if (layers.value.coworking) {
    wifiAndNomad.coworkingSpaces.forEach(cw => {
      if (cw.coordinates) {
        addLoc({
          name: cw.name,
          desc: cw.city,
          lat: cw.coordinates.lat,
          lng: cw.coordinates.lng,
          type: 'coworking',
          icon: 'laptop_mac',
          iconClass: 'text-purple-500',
          details: cw
        })
      }
    })
  }

  // WiFi
  if (layers.value.wifi) {
    publicWifiZones.forEach(wf => {
      if (wf.coordinates) {
        addLoc({
          name: wf.name,
          desc: 'Public WiFi Zone',
          lat: wf.coordinates.lat,
          lng: wf.coordinates.lng,
          type: 'wifi',
          icon: 'wifi',
          iconClass: 'text-green-500',
          details: wf
        })
      }
    })
  }

  // Regions
  if (layers.value.regions) {
    regionCoverage.forEach(rg => {
      // Regions don't usually sort by distance in same way (center point maybe)
      addLoc({
        name: rg.regionName,
        desc: 'Network Coverage Area',
        lat: rg.coordinates.lat,
        lng: rg.coordinates.lng,
        type: 'region',
        icon: 'public',
        iconClass: 'text-blue-500',
        details: rg
      })
    })
  }
  
  // Sort by distance if user location is set
  if (userLocation.value) {
    locs.sort((a, b) => (a.distance || 99999) - (b.distance || 99999))
  }
  
  return locs
})


onMounted(async () => {
  // Dynamic import Leaflet logic solely on client
  if (import.meta.client) {
    const L = await import('leaflet')
    await import('leaflet/dist/leaflet.css')

    // Initialize Map
    map = L.map('coverage-map', {
      center: [7.8731, 80.7718], // Lanka Center
      zoom: 7,
      zoomControl: false
    })

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Dark/Light Mode Tile Layer
    // Using CartoDB Voyager for a nice clean look
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)

    // Update Layers
    updateMapLayers(L)
  }
})

// Watch for layer changes
watch(layers, () => {
  if (import.meta.client && map) {
    import('leaflet').then(L => {
      updateMapLayers(L)
    })
  }
}, { deep: true })

function createCustomIcon(L: any, iconName: string, colorClass: string) {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="bg-white dark:bg-neutral-800 p-1.5 rounded-full shadow-md border border-gray-100 dark:border-neutral-600 flex items-center justify-center transform hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-lg ${colorClass}">${iconName}</span>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16], 
    popupAnchor: [0, -16]
  })
}

function updateMapLayers(L: any) {
  // Clear existing layers
  Object.values(markerLayers).forEach((layer: any) => {
    if (layer) map.removeLayer(layer)
  })

  // 1. Regions Layer
  if (layers.value.regions) {
    const regionMarkers = regionCoverage.map(r => {
      // Circle for range coverage
      const circle = L.circle([r.coordinates.lat, r.coordinates.lng], {
        color: '#3B82F6',
        fillColor: '#3B82F6',
        fillOpacity: 0.1,
        radius: 25000, // 25km radius approx
        weight: 1
      })
      
      const marker = L.marker([r.coordinates.lat, r.coordinates.lng], {
        icon: createCustomIcon(L, 'public', 'text-blue-500')
      }).bindPopup(`
        <div class="font-sans">
          <h3 class="font-bold text-gray-900">${r.regionName}</h3>
          <p class="text-sm text-gray-600 mb-2">${r.description}</p>
          <div class="text-xs space-y-1">
             <div class="font-semibold text-gray-500">Best Providers:</div>
             ${r.recommendedProviders.slice(0,2).map(pid => 
               `<span class="inline-block px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 mr-1 capitalize">${getProviderById(pid)?.name || pid}</span>`
             ).join('')}
          </div>
        </div>
      `)
      
      return L.layerGroup([circle, marker])
    })
    markerLayers.regions = L.layerGroup(regionMarkers).addTo(map)
  }

  // 2. WiFi Layer
  if (layers.value.wifi) {
    const wifiMarkers = publicWifiZones.map(w => 
      L.marker([w.coordinates.lat, w.coordinates.lng], {
        icon: createCustomIcon(L, 'wifi', 'text-green-500')
      }).bindPopup(`
        <div class="font-sans">
          <h3 class="font-bold text-gray-900">${w.name}</h3>
          <p class="text-xs text-green-600 font-medium uppercase mb-1">Public WiFi Zone</p>
          <p class="text-sm text-gray-600">${w.notes}</p>
        </div>
      `)
    )
    markerLayers.wifi = L.layerGroup(wifiMarkers).addTo(map)
  }

  // 3. Coworking Layer
  if (layers.value.coworking) {
    const cwMarkers = wifiAndNomad.coworkingSpaces
      .filter(c => c.coordinates)
      .map(c => 
        L.marker([c.coordinates!.lat, c.coordinates!.lng], {
          icon: createCustomIcon(L, 'laptop_mac', 'text-purple-500')
        }).bindPopup(`
          <div class="font-sans">
            <h3 class="font-bold text-gray-900">${c.name}</h3>
            <p class="text-xs text-purple-600 font-medium uppercase mb-1">Coworking Space</p>
            <p class="text-sm text-gray-600 mb-2">${c.notes || c.features[0]}</p>
             <div class="flex flex-wrap gap-1">
              ${c.features.slice(0,2).map(f => `<span class="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">${f}</span>`).join('')}
            </div>
          </div>
        `)
      )
    markerLayers.coworking = L.layerGroup(cwMarkers).addTo(map)
  }

  // 4. Sellers Layer
  if (layers.value.sellers) {
    const sMarkers = purchaseLocations.airportLocations
      .filter(s => s.coordinates)
      .map(s => 
        L.marker([s.coordinates!.lat, s.coordinates!.lng], {
          icon: createCustomIcon(L, 'store', 'text-orange-500')
        }).bindPopup(`
           <div class="font-sans">
            <h3 class="font-bold text-gray-900">${s.name}</h3>
            <p class="text-xs text-orange-600 font-medium uppercase mb-1">SIM Card Seller</p>
            <p class="text-sm text-gray-600 mb-2">Providers: ${s.providersAvailable.map(p => p.toUpperCase()).join(', ')}</p>
            <p class="text-xs text-gray-500 italic">${s.notes}</p>
          </div>
        `)
      )
    markerLayers.sellers = L.layerGroup(sMarkers).addTo(map)
  }

  // 5. User Location Layer
  if (userLocation.value) {
    const userMarker = L.marker([userLocation.value.lat, userLocation.value.lng], {
      icon: L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="bg-primary/90 p-1.5 rounded-full shadow-lg border-2 border-white flex items-center justify-center transform hover:scale-110 transition-transform animate-pulse">
                <span class="material-symbols-outlined text-lg text-white">my_location</span>
               </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
      })
    }).bindPopup(`
      <div class="font-sans">
        <h3 class="font-bold text-gray-900">Your Location</h3>
      </div>
    `)
    markerLayers.user = L.layerGroup([userMarker]).addTo(map)
  }
}

function flyToLocation(loc: MapLocation) {
  if (import.meta.client && map) {
    map.flyTo([loc.lat, loc.lng], 13, {
      duration: 1.5
    })
  }
}
</script>

<style>
/* Leaflet Overrides for Dark Mode if needed */
.leaflet-popup-content-wrapper {
  border-radius: 0.75rem;
  padding: 0;
  overflow: hidden;
}
.leaflet-popup-content {
  margin: 1rem;
}
</style>
