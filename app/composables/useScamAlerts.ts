import { ref, computed } from 'vue'
import type { ScamAlert, RiskLocation, ScamSeverity } from '~/types/scam'
import { parseScamAlerts, getRiskLocations, getScamCategories, getSafetyTips } from '~/utils/scamDataParser'

export function useScamAlerts() {
  // Data sources
  const allScams = ref<ScamAlert[]>(parseScamAlerts())
  const allLocations = ref<RiskLocation[]>(getRiskLocations())
  const categories = ref(getScamCategories())
  const safetyTips = ref(getSafetyTips())

  // Filters
  const selectedSeverity = ref<ScamSeverity | 'all'>('all')
  const selectedLocation = ref<string>('all')
  const selectedCategory = ref<string>('all')
  const searchQuery = ref<string>('')
  const userLocation = ref<{ lat: number; lng: number } | null>(null)

  // Filtered scams based on all active filters
  const filteredScams = computed(() => {
    let filtered = [...allScams.value]

    // Filter by severity
    if (selectedSeverity.value !== 'all') {
      filtered = filtered.filter(scam => scam.severity === selectedSeverity.value)
    }

    // Filter by category
    if (selectedCategory.value !== 'all') {
      filtered = filtered.filter(scam => 
        scam.categories.includes(selectedCategory.value)
      )
    }

    // Filter by location (match scam types to location scam types)
    if (selectedLocation.value !== 'all') {
      const location = allLocations.value.find(loc => loc.id === selectedLocation.value)
      if (location) {
        filtered = filtered.filter(scam => 
          location.scamTypes.some(type => 
            scam.id === type || scam.categories.some(cat => type.includes(cat))
          )
        )
      }
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(scam =>
        scam.title.toLowerCase().includes(query) ||
        scam.description.toLowerCase().includes(query) ||
        scam.tips.some(tip => tip.toLowerCase().includes(query)) ||
        scam.categories.some(cat => cat.toLowerCase().includes(query))
      )
    }

    return filtered
  })

  // Filtered locations
  const filteredLocations = computed(() => {
    if (selectedSeverity.value === 'all' && selectedCategory.value === 'all') {
      return allLocations.value
    }

    return allLocations.value.filter(location => {
      // Filter by risk/severity
      if (selectedSeverity.value !== 'all') {
        if (selectedSeverity.value === 'high' && location.risk !== 'high') return false
        if (selectedSeverity.value === 'medium' && !['medium', 'medium-high'].includes(location.risk)) return false
        if (selectedSeverity.value === 'low' && location.risk !== 'low') return false
      }

      // Filter by category (check if location has scams of that category)
      if (selectedCategory.value !== 'all') {
        const categoryScams = allScams.value.filter(scam => 
          scam.categories.includes(selectedCategory.value)
        )
        return categoryScams.some(scam => 
          location.scamTypes.includes(scam.id)
        )
      }

      return true
    })
  })

  // Get scams for a specific location
  const getScamsForLocation = (locationId: string) => {
    const location = allLocations.value.find(loc => loc.id === locationId)
    if (!location) return []

    return allScams.value.filter(scam => 
      location.scamTypes.includes(scam.id) ||
      scam.categories.some(cat => location.scamTypes.some(type => type.includes(cat)))
    )
  }

  // Get nearby locations based on user location
  const getNearbyLocations = (userLat: number, userLng: number, radiusKm: number = 50) => {
    return allLocations.value
      .map(location => {
        const distance = calculateDistance(userLat, userLng, location.lat, location.lng)
        return { ...location, distance }
      })
      .filter(location => location.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance)
  }

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const toRad = (value: number): number => {
    return value * Math.PI / 180
  }

  // Get contextual safety tips based on filters
  const getContextualSafetyTips = () => {
    const tips: string[] = []

    // Add general tips
    tips.push(...safetyTips.value.find(t => t.category === 'general')?.tips || [])

    // Add category-specific tips
    if (selectedCategory.value !== 'all') {
      const categoryTips = safetyTips.value.find(t => 
        selectedCategory.value.includes(t.category)
      )
      if (categoryTips) {
        tips.push(...categoryTips.tips)
      }
    }

    // Add location-specific tips if location is selected
    if (selectedLocation.value !== 'all') {
      const location = allLocations.value.find(loc => loc.id === selectedLocation.value)
      if (location) {
        tips.push(`High alert area: ${location.area}`)
        tips.push(`Risk level: ${location.risk.toUpperCase()}`)
      }
    }

    return [...new Set(tips)] // Remove duplicates
  }

  // Get scam statistics
  const scamStats = computed(() => {
    const high = allScams.value.filter(s => s.severity === 'high').length
    const medium = allScams.value.filter(s => s.severity === 'medium').length
    const low = allScams.value.filter(s => s.severity === 'low').length
    
    return {
      total: allScams.value.length,
      high,
      medium,
      low,
      highRiskLocations: allLocations.value.filter(l => l.risk === 'high').length,
      mediumRiskLocations: allLocations.value.filter(l => l.risk === 'medium' || l.risk === 'medium-high').length
    }
  })

  // Set user location
  const setUserLocation = (lat: number, lng: number) => {
    userLocation.value = { lat, lng }
  }

  // Get user's current location
  const getUserLocation = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(coords.lat, coords.lng)
          resolve(coords)
        },
        (error) => reject(error)
      )
    })
  }

  // Reset all filters
  const resetFilters = () => {
    selectedSeverity.value = 'all'
    selectedLocation.value = 'all'
    selectedCategory.value = 'all'
    searchQuery.value = ''
  }

  return {
    // Data
    allScams,
    allLocations,
    categories,
    safetyTips,
    
    // Filters
    selectedSeverity,
    selectedLocation,
    selectedCategory,
    searchQuery,
    userLocation,
    
    // Computed
    filteredScams,
    filteredLocations,
    scamStats,
    
    // Methods
    getScamsForLocation,
    getNearbyLocations,
    getContextualSafetyTips,
    setUserLocation,
    getUserLocation,
    resetFilters,
    calculateDistance
  }
}
