import { ref, computed } from 'vue'
import type { ScamType, Location, Activity, ScamSeverity, RiskLevel } from '~/types/scamData'
import {
  scamTypes,
  locations,
  activities,
  reportingInfo,
  getScamTypeById,
  getLocationById,
  getScamsByCategory,
  getScamsBySeverity,
  getScamsByLocation,
  getLocationsByRisk,
  searchScams
} from '~/data/scamData'

/**
 * Composable for Scam Alert System
 * Uses structured data from scam.md as single source of truth
 */
export function useScamData() {
  // Core data references
  const allScams = ref<ScamType[]>(scamTypes)
  const allLocations = ref<Location[]>(locations)
  const allActivities = ref<Activity[]>(activities)
  const emergencyInfo = ref(reportingInfo)

  // Filter state
  const selectedSeverity = ref<ScamSeverity | 'all'>('all')
  const selectedLocation = ref<string>('all')
  const selectedCategory = ref<string>('all')
  const selectedActivity = ref<string>('all')
  const searchQuery = ref<string>('')
  const userLocation = ref<{ lat: number; lng: number } | null>(null)

  // Filtered scams based on all active filters
  const filteredScams = computed(() => {
    let filtered = [...allScams.value]

    // Filter by severity
    if (selectedSeverity.value !== 'all') {
      filtered = getScamsBySeverity(selectedSeverity.value)
    }

    // Filter by category
    if (selectedCategory.value !== 'all') {
      filtered = filtered.filter(scam => scam.category === selectedCategory.value)
    }

    // Filter by location
    if (selectedLocation.value !== 'all') {
      const locationScams = getScamsByLocation(selectedLocation.value)
      filtered = filtered.filter(scam => locationScams.some(ls => ls.id === scam.id))
    }

    // Filter by activity
    if (selectedActivity.value !== 'all') {
      const activity = allActivities.value.find(a => a.id === selectedActivity.value)
      if (activity) {
        filtered = filtered.filter(scam => activity.relatedScams.includes(scam.id))
      }
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      filtered = searchScams(searchQuery.value)
    }

    return filtered
  })

  // Filtered locations based on risk level and active scams
  const filteredLocations = computed(() => {
    let filtered = [...allLocations.value]

    // If scams are filtered, only show locations related to those scams
    if (filteredScams.value.length < allScams.value.length) {
      const scamIds = filteredScams.value.map(s => s.id)
      filtered = filtered.filter(loc => 
        loc.commonScams.some(scamId => scamIds.includes(scamId))
      )
    }

    return filtered
  })

  // Get locations near user (within 50km radius)
  const nearbyLocations = computed(() => {
    if (!userLocation.value) return []

    return filteredLocations.value
      .map(location => ({
        ...location,
        distance: calculateDistance(
          userLocation.value!.lat,
          userLocation.value!.lng,
          location.coordinates.lat,
          location.coordinates.lng
        )
      }))
      .filter(loc => loc.distance <= 50)
      .sort((a, b) => a.distance - b.distance)
  })

  // Statistics
  const stats = computed(() => ({
    totalScams: allScams.value.length,
    filteredScams: filteredScams.value.length,
    criticalScams: allScams.value.filter(s => s.severity === 'critical').length,
    highRiskLocations: allLocations.value.filter(l => l.riskLevel === 'high').length,
    activeFilters: [
      selectedSeverity.value !== 'all' ? 1 : 0,
      selectedLocation.value !== 'all' ? 1 : 0,
      selectedCategory.value !== 'all' ? 1 : 0,
      selectedActivity.value !== 'all' ? 1 : 0,
      searchQuery.value.trim() ? 1 : 0
    ].reduce((a, b) => a + b, 0)
  }))

  // Severity counts
  const severityCounts = computed(() => ({
    critical: allScams.value.filter(s => s.severity === 'critical').length,
    high: allScams.value.filter(s => s.severity === 'high').length,
    medium: allScams.value.filter(s => s.severity === 'medium').length,
    low: allScams.value.filter(s => s.severity === 'low').length
  }))

  // Category counts
  const categoryCounts = computed(() => {
    const counts: Record<string, number> = {}
    allScams.value.forEach(scam => {
      counts[scam.category] = (counts[scam.category] || 0) + 1
    })
    return counts
  })

  // Get scams by activity
  function getScamsForActivity(activityId: string): ScamType[] {
    const activity = allActivities.value.find(a => a.id === activityId)
    if (!activity) return []
    return allScams.value.filter(scam => activity.relatedScams.includes(scam.id))
  }

  // Get high-priority tips for filtered scams
  const contextualTips = computed(() => {
    const tips = new Set<string>()
    filteredScams.value.forEach(scam => {
      scam.preventionTips.slice(0, 2).forEach(tip => tips.add(tip))
    })
    return Array.from(tips).slice(0, 10)
  })

  // Get locations for filtered scams
  const relatedLocations = computed(() => {
    const locationIds = new Set<string>()
    filteredScams.value.forEach(scam => {
      scam.commonLocations.forEach(locId => locationIds.add(locId))
    })
    return allLocations.value.filter(loc => locationIds.has(loc.id))
  })

  // Reset all filters
  function resetFilters() {
    selectedSeverity.value = 'all'
    selectedLocation.value = 'all'
    selectedCategory.value = 'all'
    selectedActivity.value = 'all'
    searchQuery.value = ''
  }

  // Get user's geolocation
  function getUserLocation() {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported')
      return Promise.reject(new Error('Geolocation not supported'))
    }

    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          userLocation.value = coords
          resolve(coords)
        },
        (error) => {
          console.error('Geolocation error:', error)
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      )
    })
  }

  // Calculate distance between two coordinates (Haversine formula)
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  function toRad(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  // Get map markers from filtered locations
  const mapMarkers = computed(() => {
    return filteredLocations.value.map(location => ({
      id: location.id,
      position: [location.coordinates.lat, location.coordinates.lng] as [number, number],
      name: location.name,
      riskLevel: location.riskLevel,
      scamCount: location.commonScams.length,
      scamTypes: location.commonScams
    }))
  })

  return {
    // Data
    allScams,
    allLocations,
    allActivities,
    emergencyInfo,

    // Filters
    selectedSeverity,
    selectedLocation,
    selectedCategory,
    selectedActivity,
    searchQuery,
    userLocation,

    // Computed
    filteredScams,
    filteredLocations,
    nearbyLocations,
    stats,
    severityCounts,
    categoryCounts,
    contextualTips,
    relatedLocations,
    mapMarkers,

    // Methods
    getScamTypeById,
    getLocationById,
    getScamsForActivity,
    resetFilters,
    getUserLocation,
    calculateDistance
  }
}
