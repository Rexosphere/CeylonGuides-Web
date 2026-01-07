import { ref, computed } from 'vue'
import {
    restaurants as allRestaurantsData,
    type Restaurant,
    type CertificationType,
    type FeatureTag,
    getCities
} from '~/data/dining'

// Re-export types for convenience
export type { Restaurant, CertificationType, FeatureTag } from '~/data/dining'

// Filter types
export type DiningFilter =
    | 'all'
    | 'safeAndSecure'
    | 'gradeA'
    | 'gradeB'
    | 'vegetarian'
    | 'vegan'
    | 'halal'
    | 'highHygiene'
    | 'premium'
    | 'seafood'
    | 'cafe'
    | 'outdoor'
    | 'wifi'
    | 'family_friendly'
    | 'gluten_free'

// Sort options
export type SortOption = 'recommended' | 'hygiene' | 'alphabetical' | 'city' | 'distance'

export function useDining() {
    // State
    const selectedFilter = ref<DiningFilter>('all')
    const selectedCity = ref<string>('all')
    const selectedRestaurant = ref<Restaurant | null>(null)
    const showDetails = ref(false)
    const searchQuery = ref('')
    const selectedSort = ref<SortOption>('recommended')

    // Geolocation state
    const userLocation = ref<{ lat: number; lon: number } | null>(null)
    const isLocating = ref(false)
    const locationError = ref<string | null>(null)

    // Derived state
    const cities = computed(() => getCities())

    // Calculate distance between two points (Haversine formula)
    function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371 // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    // Get distance from user for a restaurant
    function getDistanceFromUser(restaurant: Restaurant): number | null {
        if (!userLocation.value || !restaurant.coordinates) return null
        return calculateDistance(
            userLocation.value.lat,
            userLocation.value.lon,
            restaurant.coordinates.lat,
            restaurant.coordinates.lon
        )
    }

    const filteredRestaurants = computed(() => {
        return allRestaurantsData.filter(r => {
            // Search filter
            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase()
                const matchesSearch =
                    r.name.toLowerCase().includes(query) ||
                    r.cuisineType.toLowerCase().includes(query) ||
                    r.description.toLowerCase().includes(query) ||
                    r.city.toLowerCase().includes(query) ||
                    r.tags.some(t => t.toLowerCase().includes(query))

                if (!matchesSearch) return false
            }

            // City filter
            if (selectedCity.value !== 'all' && r.city !== selectedCity.value) {
                return false
            }

            // Category filter
            switch (selectedFilter.value) {
                case 'safeAndSecure':
                    return r.certificationType === 'SafeAndSecure'
                case 'gradeA':
                    return r.certificationType === 'TouristFriendlyGradeA'
                case 'gradeB':
                    return r.certificationType === 'TouristFriendlyGradeB'
                case 'vegetarian':
                    return r.features.includes('vegetarian')
                case 'vegan':
                    return r.features.includes('vegan')
                case 'halal':
                    return r.features.includes('halal')
                case 'highHygiene':
                    return r.hygieneScore >= 4
                case 'premium':
                    return r.features.includes('premium')
                case 'seafood':
                    return r.features.includes('seafood')
                case 'cafe':
                    return r.cuisineType.toLowerCase().includes('café') ||
                        r.cuisineType.toLowerCase().includes('cafe') ||
                        r.cuisineType.toLowerCase().includes('tea')
                case 'outdoor':
                    return r.features.includes('outdoor')
                case 'wifi':
                    return r.features.includes('wifi')
                case 'family_friendly':
                    return r.features.includes('family_friendly')
                case 'gluten_free':
                    return r.features.includes('gluten_free')
                default:
                    return true
            }
        })
    })

    // Geocoded coordinates storage (resolved at runtime)
    const geocodedCoordinates = ref<Map<string, { lat: number; lon: number }>>(new Map())
    const geocodingStatus = ref<Map<string, 'locating' | 'found' | 'not_found' | 'error'>>(new Map())

    // Get effective coordinates (original or geocoded)
    function getEffectiveCoordinates(restaurant: Restaurant): { lat: number; lon: number } | null {
        if (restaurant.coordinates) return restaurant.coordinates
        return geocodedCoordinates.value.get(restaurant.id) || null
    }

    // Restaurants with coordinates (for map) - includes geocoded ones
    const mappableRestaurants = computed(() => {
        return sortedRestaurants.value.filter(r => getEffectiveCoordinates(r) !== null)
    })

    // Sorted restaurants
    const sortedRestaurants = computed(() => {
        const restaurants = [...filteredRestaurants.value]

        switch (selectedSort.value) {
            case 'recommended':
                // High hygiene + certified first
                return restaurants.sort((a, b) => {
                    // First by certification (SafeAndSecure > GradeA > GradeB > Unknown)
                    const certOrder: Record<string, number> = {
                        'SafeAndSecure': 0,
                        'TouristFriendlyGradeA': 1,
                        'TouristFriendlyGradeB': 2,
                        'Unknown': 3
                    }
                    const certDiff = (certOrder[a.certificationType] || 3) - (certOrder[b.certificationType] || 3)
                    if (certDiff !== 0) return certDiff
                    // Then by hygiene score (descending)
                    return b.hygieneScore - a.hygieneScore
                })

            case 'hygiene':
                return restaurants.sort((a, b) => b.hygieneScore - a.hygieneScore)

            case 'alphabetical':
                return restaurants.sort((a, b) => a.name.localeCompare(b.name))

            case 'city':
                return restaurants.sort((a, b) => {
                    const cityCompare = a.city.localeCompare(b.city)
                    if (cityCompare !== 0) return cityCompare
                    return a.name.localeCompare(b.name)
                })

            case 'distance':
                if (!userLocation.value) return restaurants
                return restaurants.sort((a, b) => {
                    const distA = getDistanceFromUser(a)
                    const distB = getDistanceFromUser(b)
                    // Restaurants without coordinates go to the end
                    if (distA === null && distB === null) return 0
                    if (distA === null) return 1
                    if (distB === null) return -1
                    return distA - distB
                })

            default:
                return restaurants
        }
    })

    // Restaurants needing geocoding
    const restaurantsNeedingGeocode = computed(() => {
        return allRestaurantsData.filter(r => !r.coordinates && !geocodedCoordinates.value.has(r.id))
    })

    // Initialize geocoding for restaurants without coordinates
    async function initGeocoding() {
        const needsGeocode = restaurantsNeedingGeocode.value
        if (needsGeocode.length === 0) return

        for (const restaurant of needsGeocode) {
            // Skip if already being processed
            if (geocodingStatus.value.get(restaurant.id) === 'locating') continue

            geocodingStatus.value.set(restaurant.id, 'locating')

            try {
                const query = restaurant.area
                    ? `${restaurant.name}, ${restaurant.area}, ${restaurant.city}, Sri Lanka`
                    : `${restaurant.name}, ${restaurant.city}, Sri Lanka`

                const result = await $fetch<{
                    success: boolean
                    cached?: boolean
                    rateLimited?: boolean
                    retryAfter?: number
                    lat?: number
                    lon?: number
                }>('/api/geocode', {
                    params: { q: query }
                })

                if (result.rateLimited) {
                    geocodingStatus.value.set(restaurant.id, 'locating')
                    // Wait and retry
                    await new Promise(r => setTimeout(r, (result.retryAfter || 2) * 1000))
                    continue
                }

                if (result.success && result.lat && result.lon) {
                    geocodedCoordinates.value.set(restaurant.id, {
                        lat: result.lat,
                        lon: result.lon
                    })
                    geocodingStatus.value.set(restaurant.id, 'found')
                } else {
                    geocodingStatus.value.set(restaurant.id, 'not_found')
                }
            } catch {
                geocodingStatus.value.set(restaurant.id, 'error')
            }

            // Rate limit: wait 2 seconds between requests
            await new Promise(r => setTimeout(r, 2000))
        }
    }

    // Get geocoding status for a restaurant
    function getGeocodingStatus(restaurantId: string): 'locating' | 'found' | 'not_found' | 'error' | null {
        return geocodingStatus.value.get(restaurantId) || null
    }

    // Actions
    function setFilter(filter: DiningFilter) {
        selectedFilter.value = filter
    }

    function setCity(city: string) {
        selectedCity.value = city
    }

    function setSearch(query: string) {
        searchQuery.value = query
    }

    function setSort(sort: SortOption) {
        selectedSort.value = sort
    }

    // Get user's location using browser geolocation API
    async function getUserLocation(): Promise<boolean> {
        if (!navigator.geolocation) {
            locationError.value = 'Geolocation is not supported by your browser'
            return false
        }

        isLocating.value = true
        locationError.value = null

        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userLocation.value = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }
                    isLocating.value = false
                    // Automatically switch to distance sorting
                    selectedSort.value = 'distance'
                    resolve(true)
                },
                (error) => {
                    isLocating.value = false
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            locationError.value = 'Location access denied'
                            break
                        case error.POSITION_UNAVAILABLE:
                            locationError.value = 'Location unavailable'
                            break
                        case error.TIMEOUT:
                            locationError.value = 'Location request timed out'
                            break
                        default:
                            locationError.value = 'Unknown location error'
                    }
                    resolve(false)
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
            )
        })
    }

    // Format distance for display
    function formatDistance(distance: number | null): string {
        if (distance === null) return ''
        if (distance < 1) return `${Math.round(distance * 1000)}m away`
        return `${distance.toFixed(1)}km away`
    }

    function openDetails(restaurant: Restaurant) {
        selectedRestaurant.value = restaurant
        showDetails.value = true
    }

    function closeDetails() {
        showDetails.value = false
        // Keep selectedRestaurant for map highlighting until explicit clear
    }

    function selectRestaurant(restaurant: Restaurant | null) {
        selectedRestaurant.value = restaurant
    }

    function clearSelection() {
        selectedRestaurant.value = null
        showDetails.value = false
    }

    function resetFilters() {
        selectedFilter.value = 'all'
        selectedCity.value = 'all'
        searchQuery.value = ''
        selectedRestaurant.value = null
    }

    // Utilities
    function getCertificationLabel(type: CertificationType): string {
        switch (type) {
            case 'SafeAndSecure': return 'Safe & Secure'
            case 'TouristFriendlyGradeA': return 'Grade A'
            case 'TouristFriendlyGradeB': return 'Grade B'
            default: return 'Unknown'
        }
    }

    function getCertificationColor(type: CertificationType): { bg: string; text: string } {
        switch (type) {
            case 'SafeAndSecure':
                return { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' }
            case 'TouristFriendlyGradeA':
                return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' }
            case 'TouristFriendlyGradeB':
                return { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' }
            default:
                return { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400' }
        }
    }

    function getFeatureIcon(feature: FeatureTag): string {
        const iconMap: Record<FeatureTag, string> = {
            vegetarian: 'spa',
            vegan: 'eco',
            halal: 'restaurant_menu',
            gluten_free: 'nutrition',
            outdoor: 'deck',
            wifi: 'wifi',
            family_friendly: 'family_restroom',
            premium: 'diamond',
            seafood: 'set_meal',
            bar: 'local_bar',
            budget_friendly: 'savings',
            scenic_view: 'landscape',
            credit_cards: 'credit_card',
            air_conditioned: 'ac_unit',
            pork_free: 'do_not_disturb_on'
        }
        return iconMap[feature] || 'check_circle'
    }

    function getFeatureLabel(feature: FeatureTag): string {
        const labelMap: Record<FeatureTag, string> = {
            vegetarian: 'Vegetarian',
            vegan: 'Vegan',
            halal: 'Halal',
            gluten_free: 'Gluten-Free',
            outdoor: 'Outdoor Seating',
            wifi: 'Wi-Fi',
            family_friendly: 'Family Friendly',
            premium: 'Premium',
            seafood: 'Seafood',
            bar: 'Bar',
            budget_friendly: 'Budget Friendly',
            scenic_view: 'Scenic View',
            credit_cards: 'Credit Cards',
            air_conditioned: 'Air Conditioned',
            pork_free: 'Pork-Free'
        }
        return labelMap[feature] || feature
    }

    return {
        // Data
        restaurants: sortedRestaurants,
        mappableRestaurants,
        allRestaurants: allRestaurantsData,
        cities,

        // State
        selectedFilter,
        selectedCity,
        selectedRestaurant,
        showDetails,
        searchQuery,
        selectedSort,
        userLocation,
        isLocating,
        locationError,

        // Actions
        setFilter,
        setCity,
        setSearch,
        setSort,
        openDetails,
        closeDetails,
        selectRestaurant,
        clearSelection,
        resetFilters,
        getUserLocation,

        // Geocoding
        initGeocoding,
        getGeocodingStatus,
        getEffectiveCoordinates,
        restaurantsNeedingGeocode,

        // Utilities
        getCertificationLabel,
        getCertificationColor,
        getFeatureIcon,
        getFeatureLabel,
        getDistanceFromUser,
        formatDistance
    }
}
