<template>
  <div class="scam-map-container">
    <div ref="mapContainer" class="map-element"></div>
    
    <!-- Map Controls -->
    <div class="map-controls">
      <button 
        @click="centerOnUserLocation" 
        class="control-btn"
        title="Find my location"
        :disabled="isGettingLocation"
      >
        {{ isGettingLocation ? '⏳' : '📍' }} My Location
      </button>
      <button 
        @click="resetMapView" 
        class="control-btn"
        title="Reset map view to Sri Lanka"
      >
        🔄 Reset View
      </button>
      <button 
        @click="toggleClustering" 
        class="control-btn"
        :class="{ active: clusteringEnabled }"
        title="Toggle marker clustering"
      >
        {{ clusteringEnabled ? '🔗' : '📌' }} Clustering
      </button>
    </div>

    <!-- Legend -->
    <div class="map-legend">
      <div class="legend-title">Risk Levels</div>
      <div class="legend-items">
        <div class="legend-item">
          <span class="legend-marker" style="background-color: #dc2626;">🔴</span>
          <span>High Risk</span>
        </div>
        <div class="legend-item">
          <span class="legend-marker" style="background-color: #ea580c;">🟠</span>
          <span>Medium Risk</span>
        </div>
        <div class="legend-item">
          <span class="legend-marker" style="background-color: #16a34a;">🟢</span>
          <span>Low Risk</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import type { Location } from '~/types/scamData'
import { scamTypes } from '~/data/scamData'

const props = defineProps<{
  locations: Location[]
  selectedLocationId?: string | null
  nearbyMode?: boolean
  userLocation?: { lat: number; lng: number } | null
}>()

const emit = defineEmits<{
  locationSelected: [locationId: string]
  viewLocationDetails: [locationId: string]
}>()

// Helper to get scams for a location
const getScamsForLocation = (locationId: string) => {
  return scamTypes.filter(scam => scam.commonLocations.includes(locationId))
}

const mapContainer = ref<HTMLDivElement | null>(null)
let map: any = null
let L: any = null
let markerClusterGroup: any = null
const markers: any[] = []
const userLocationMarker = ref<any>(null)
const isGettingLocation = ref(false)
const clusteringEnabled = ref(true)

// Initialize Leaflet map
onMounted(async () => {
  // Dynamically import Leaflet (client-side only)
  if (process.client) {
    L = await import('leaflet')
    await import('leaflet/dist/leaflet.css')
    
    // Import marker cluster
    // @ts-ignore - leaflet.markercluster types are not available
    await import('leaflet.markercluster')
    await import('leaflet.markercluster/dist/MarkerCluster.css')
    await import('leaflet.markercluster/dist/MarkerCluster.Default.css')
    
    // Fix default marker icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })

    initMap()
  }
})

const initMap = () => {
  if (!mapContainer.value || !L) return

  // Initialize map centered on Sri Lanka
  map = L.map(mapContainer.value).setView([7.8731, 80.7718], 8)

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map)

  // Initialize marker cluster group
  markerClusterGroup = L.markerClusterGroup({
    maxClusterRadius: 60,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    iconCreateFunction: function(cluster: any) {
      const childCount = cluster.getChildCount()
      const markers = cluster.getAllChildMarkers()
      
      // Determine cluster color based on highest risk level
      let highRiskCount = 0
      let mediumRiskCount = 0
      
      markers.forEach((marker: any) => {
        if (marker.options.riskLevel === 'high') highRiskCount++
        else if (marker.options.riskLevel === 'medium') mediumRiskCount++
      })
      
      let clusterClass = 'marker-cluster-low'
      if (highRiskCount > 0) clusterClass = 'marker-cluster-high'
      else if (mediumRiskCount > 0) clusterClass = 'marker-cluster-medium'
      
      return L.divIcon({
        html: `<div><span>${childCount}</span></div>`,
        className: `marker-cluster ${clusterClass}`,
        iconSize: L.point(40, 40)
      })
    }
  })

  // Add location markers
  addLocationMarkers()
}

const addLocationMarkers = () => {
  if (!L || !map) return

  // Clear existing markers
  if (markerClusterGroup) {
    markerClusterGroup.clearLayers()
  }
  markers.length = 0

  // Add markers for each location
  props.locations.forEach(location => {
    const riskColor = getRiskColor(location.riskLevel)
    
    // Create custom icon based on risk level
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-pin" style="background-color: ${riskColor};">
               <span class="marker-icon">${getRiskIcon(location.riskLevel)}</span>
             </div>`,
      iconSize: [35, 45],
      iconAnchor: [17.5, 45],
      popupAnchor: [0, -45]
    })

    const marker = L.marker([location.coordinates.lat, location.coordinates.lng], { 
      icon,
      riskLevel: location.riskLevel
    })

    // Get scams for this location
    const locationScams = getScamsForLocation(location.id)
    const topScams = locationScams.slice(0, 3)
    
    // Create popup content
    const popupContent = `
      <div class="location-popup-content">
        <h3 class="popup-title">${location.name}</h3>
        <div class="popup-risk-badge risk-${location.riskLevel}">
          ${getRiskIcon(location.riskLevel)} ${location.riskLevel.toUpperCase()} RISK
        </div>
        <div class="popup-scams">
          <strong>Top Scams Here:</strong>
          <ul>
            ${topScams.map((scam: any) => `<li class="scam-item severity-${scam.severity}">${scam.title}</li>`).join('')}
          </ul>
          ${locationScams.length > 3 ? `<p class="more-scams">+${locationScams.length - 3} more scams</p>` : ''}
        </div>
        <button class="view-alerts-btn" onclick="window.filterScamsByLocation('${location.id}')">
          🔍 View Alerts for ${location.name}
        </button>
      </div>
    `

    marker.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'custom-popup'
    })

    // Add tooltip
    marker.bindTooltip(location.name, {
      permanent: false,
      direction: 'top',
      offset: [0, -45]
    })

    markers.push(marker)
    
    // Add to cluster group or map directly
    if (clusteringEnabled.value) {
      markerClusterGroup.addLayer(marker)
    } else {
      marker.addTo(map)
    }
  })
  
  // Add cluster group to map if clustering is enabled
  if (clusteringEnabled.value && !map.hasLayer(markerClusterGroup)) {
    map.addLayer(markerClusterGroup)
  }
}

const getRiskColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'high': return '#dc2626' // Red
    case 'medium': return '#ea580c' // Orange
    case 'low': return '#16a34a' // Green
    default: return '#64748b' // Gray
  }
}

const getRiskIcon = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'high': return '🔴'
    case 'medium': return '🟠'
    case 'low': return '🟢'
    default: return '⚠️'
  }
}

const centerOnUserLocation = async () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
    return
  }

  isGettingLocation.value = true

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      })
    })

    const { latitude, longitude } = position.coords

    if (map && L) {
      // Remove existing user location marker
      if (userLocationMarker.value) {
        userLocationMarker.value.remove()
      }

      // Add user location marker
      const userIcon = L.divIcon({
        className: 'user-marker',
        html: '<div class="user-location-pin">📍 You</div>',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
      })

      userLocationMarker.value = L.marker([latitude, longitude], { icon: userIcon })
        .addTo(map)
        .bindPopup('<strong>You are here</strong>')

      // Pan to user location
      map.setView([latitude, longitude], 12)
    }
  } catch (error) {
    console.error('Geolocation error:', error)
    alert('Unable to get your location. Please enable location services.')
  } finally {
    isGettingLocation.value = false
  }
}

const resetMapView = () => {
  if (map) {
    map.setView([7.8731, 80.7718], 8)
    
    // Remove user location marker
    if (userLocationMarker.value) {
      userLocationMarker.value.remove()
      userLocationMarker.value = null
    }
  }
}

const toggleClustering = () => {
  clusteringEnabled.value = !clusteringEnabled.value
  
  if (map && L) {
    // Remove all markers first
    if (markerClusterGroup) {
      map.removeLayer(markerClusterGroup)
    }
    markers.forEach(marker => marker.remove())
    
    // Re-add markers with new clustering setting
    addLocationMarkers()
  }
}

// Setup global function for popup button clicks
onMounted(() => {
  if (process.client) {
    (window as any).filterScamsByLocation = (locationId: string) => {
      emit('locationSelected', locationId)
      
      // Close any open popups
      if (map) {
        map.closePopup()
      }
    }
  }
})

// Watch for location changes from parent
watch(() => props.selectedLocationId, (newId) => {
  if (newId && map && L) {
    const location = props.locations.find(loc => loc.id === newId)
    if (location) {
      map.setView([location.coordinates.lat, location.coordinates.lng], 13)
      
      // Find and open the popup for this location
      const marker = markers.find(m => m._locationId === newId)
      if (marker) {
        marker.openPopup()
      }
    }
  }
})

// Watch for nearby mode changes - center on user location when enabled
watch(() => props.nearbyMode, (isNearby) => {
  if (isNearby && props.userLocation && map) {
    // Center on user location in nearby mode
    map.setView([props.userLocation.lat, props.userLocation.lng], 12)
    
    // Add user location marker if not exists
    if (!userLocationMarker.value && L) {
      const userIcon = L.divIcon({
        className: 'user-marker',
        html: '<div class="user-location-pin nearby-mode">📍 You</div>',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
      })

      userLocationMarker.value = L.marker([props.userLocation.lat, props.userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<strong>You are here</strong><br><small>Showing nearby scam hotspots</small>')
        .openPopup()
    }
  } else if (!isNearby && userLocationMarker.value) {
    // Remove user marker when nearby mode is disabled
    userLocationMarker.value.remove()
    userLocationMarker.value = null
  }
})

// Watch for locations prop changes
watch(() => props.locations, () => {
  if (map && L) {
    addLocationMarkers()
  }
}, { deep: true })

onUnmounted(() => {
  if (map) {
    map.remove()
  }
  
  // Cleanup global function
  if (process.client) {
    delete (window as any).filterScamsByLocation
  }
})
</script>

<style scoped>
.scam-map-container {
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  background: #f8fafc;
}

.map-element {
  width: 100%;
  height: 100%;
  z-index: 1;
}

.map-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-btn {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  white-space: nowrap;
}

.control-btn:hover:not(:disabled) {
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #cbd5e1;
}

.control-btn:active:not(:disabled) {
  transform: translateY(0);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.control-btn.active:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

/* Map Legend */
.map-legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border: 2px solid #e2e8f0;
}

.legend-title {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #475569;
}

.legend-marker {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Custom marker styles */
:deep(.custom-marker) {
  background: none;
  border: none;
}

:deep(.marker-pin) {
  width: 35px;
  height: 45px;
  border-radius: 50% 50% 50% 0;
  position: relative;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid white;
}

:deep(.marker-icon) {
  transform: rotate(45deg);
  font-size: 16px;
}

:deep(.user-marker) {
  background: none;
  border: none;
}

:deep(.user-location-pin) {
  background: #2563eb;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  animation: pulse 2s infinite;
}

:deep(.user-location-pin.nearby-mode) {
  background: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.6);
  }
}

/* Marker Cluster Styles */
:deep(.marker-cluster) {
  background-clip: padding-box;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

:deep(.marker-cluster div) {
  width: 32px;
  height: 32px;
  margin-left: 4px;
  margin-top: 4px;
  border-radius: 50%;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

:deep(.marker-cluster-high) {
  background: rgba(220, 38, 38, 0.6);
}

:deep(.marker-cluster-high div) {
  background: #dc2626;
}

:deep(.marker-cluster-medium) {
  background: rgba(234, 88, 12, 0.6);
}

:deep(.marker-cluster-medium div) {
  background: #ea580c;
}

:deep(.marker-cluster-low) {
  background: rgba(22, 163, 74, 0.6);
}

:deep(.marker-cluster-low div) {
  background: #16a34a;
}

/* Popup Styles */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

:deep(.leaflet-popup-content) {
  margin: 0;
  width: 280px !important;
}

:deep(.custom-popup .leaflet-popup-content-wrapper) {
  border-radius: 12px;
}

:deep(.location-popup-content) {
  padding: 20px;
}

:deep(.popup-title) {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

:deep(.popup-risk-badge) {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
}

:deep(.popup-risk-badge.risk-high) {
  background: #fee2e2;
  color: #dc2626;
}

:deep(.popup-risk-badge.risk-medium) {
  background: #ffedd5;
  color: #ea580c;
}

:deep(.popup-risk-badge.risk-low) {
  background: #dcfce7;
  color: #16a34a;
}

:deep(.popup-description) {
  font-size: 13px;
  line-height: 1.6;
  color: #64748b;
  margin-bottom: 14px;
}

:deep(.popup-scams) {
  margin-bottom: 14px;
}

:deep(.popup-scams strong) {
  display: block;
  margin-bottom: 8px;
  color: #1e293b;
  font-size: 13px;
}

:deep(.popup-scams ul) {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

:deep(.scam-item) {
  font-size: 12px;
  color: #475569;
  margin-bottom: 6px;
  padding-left: 20px;
  position: relative;
}

:deep(.scam-item::before) {
  content: '⚠️';
  position: absolute;
  left: 0;
  font-size: 12px;
}

:deep(.scam-item.severity-critical::before) {
  content: '🔴';
}

:deep(.scam-item.severity-high::before) {
  content: '🟠';
}

:deep(.scam-item.severity-medium::before) {
  content: '🟡';
}

:deep(.scam-item.severity-low::before) {
  content: '🟢';
}

:deep(.more-scams) {
  font-size: 11px;
  color: #94a3b8;
  font-style: italic;
  margin-top: 6px;
  margin-bottom: 0;
}

:deep(.view-alerts-btn) {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

:deep(.view-alerts-btn:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

:deep(.view-alerts-btn:active) {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .scam-map-container {
    height: 450px;
    border-radius: 8px;
  }

  .map-controls {
    top: 8px;
    right: 8px;
    gap: 6px;
  }

  .control-btn {
    padding: 8px 12px;
    font-size: 12px;
  }

  .map-legend {
    bottom: 10px;
    left: 10px;
    padding: 10px 12px;
  }

  .legend-title {
    font-size: 12px;
  }

  .legend-item {
    font-size: 11px;
  }

  .legend-marker {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }

  :deep(.leaflet-popup-content) {
    width: 240px !important;
  }

  :deep(.location-popup-content) {
    padding: 16px;
  }

  :deep(.popup-title) {
    font-size: 16px;
  }
}
</style>
