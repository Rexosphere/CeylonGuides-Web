import { ref, computed } from 'vue'
import { restrooms as allRestrooms, type Restroom, getCities } from '~/data/restrooms'

export type { Restroom, RestroomFees, RestroomAccessibility } from '~/data/restrooms'

export type RestroomFilter = 'all' | 'free' | 'paid' | 'highRated' | 'wheelchairAccessible' | 'transportHub'
export type FacilitySortOption = 'recommended' | 'rating' | 'alphabetical' | 'city' | 'distance'

export function useFacilities() {
    // State
    const selectedFilter = ref<RestroomFilter>('all')
    const selectedCity = ref<string>('all')
    const selectedRestroom = ref<Restroom | null>(null)
    const showDetails = ref(false)
    const searchQuery = ref('')
    const selectedSort = ref<FacilitySortOption>('recommended')

    // Geolocation state
    const userLocation = ref<{ lat: number; lon: number } | null>(null)
    const isLocating = ref(false)
    const locationError = ref<string | null>(null)

    // Geocoding state for restrooms without coordinates
    const geocodedCoordinates = ref<Map<string, { lat: number; lon: number }>>(new Map())
    const geocodingStatus = ref<Map<string, 'locating' | 'found' | 'not_found' | 'error'>>(new Map())

    // Reviews state
    const reviews = ref<any[]>([])

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

    // Get effective coordinates (original or geocoded)
    function getEffectiveCoordinates(restroom: Restroom): { lat: number; lon: number } | null {
        if (restroom.coordinates) return restroom.coordinates
        return geocodedCoordinates.value.get(restroom.id) || null
    }

    // Get distance from user for a restroom
    function getDistanceFromUser(restroom: Restroom): number | null {
        const coords = getEffectiveCoordinates(restroom)
        if (!userLocation.value || !coords) return null
        return calculateDistance(
            userLocation.value.lat,
            userLocation.value.lon,
            coords.lat,
            coords.lon
        )
    }

    // Merged restrooms (Static + Dynamic Reviews)
    const mergedRestrooms = computed(() => {
        return allRestrooms.map(r => {
            const facilityReviews = reviews.value.filter((rv: any) => rv.restroomId === r.id)
            if (facilityReviews.length === 0) return r

            // Calculate new rating
            const staticWeight = r.reviewCount || 1 // Trust static rating as at least 1 review equivalent
            const staticSum = r.communityRating * staticWeight
            const dynamicSum = facilityReviews.reduce((sum: number, rv: any) => sum + rv.rating, 0)
            const totalCount = staticWeight + facilityReviews.length
            const newRating = (staticSum + dynamicSum) / totalCount

            return {
                ...r,
                communityRating: Number(newRating.toFixed(1)),
                reviewCount: (r.reviewCount || 0) + facilityReviews.length
            }
        })
    })

    // Filtered restrooms
    const filteredRestrooms = computed(() => {
        return mergedRestrooms.value.filter(r => {
            // Search filter
            if (searchQuery.value) {
                const query = searchQuery.value.toLowerCase()
                const matchesSearch =
                    r.name.toLowerCase().includes(query) ||
                    r.city.toLowerCase().includes(query) ||
                    (r.area?.toLowerCase().includes(query) ?? false) ||
                    r.communityNotes.toLowerCase().includes(query) ||
                    r.accessibility.notes.toLowerCase().includes(query)
                if (!matchesSearch) return false
            }

            // City filter
            if (selectedCity.value !== 'all' && r.city !== selectedCity.value) {
                return false
            }

            // Category filter
            switch (selectedFilter.value) {
                case 'free':
                    return r.fees.isFree
                case 'paid':
                    return !r.fees.isFree
                case 'highRated':
                    return r.communityRating >= 4.0
                case 'wheelchairAccessible':
                    return r.accessibility.wheelchairAccessible === true
                case 'transportHub':
                    const keywords = ['terminal', 'station', 'center', 'hub', 'transport', 'bus', 'train', 'railway', 'airport']
                    const text = (r.name + ' ' + r.communityNotes + ' ' + (r.area || '')).toLowerCase()
                    return keywords.some(k => text.includes(k))
                default:
                    return true
            }
        })
    })

    // Sorted restrooms
    const sortedRestrooms = computed(() => {
        const items = [...filteredRestrooms.value]

        switch (selectedSort.value) {
            case 'recommended':
                return items.sort((a, b) => {
                    // Score based on: Rating, Free status, Cleanliness keywords
                    const getScore = (r: Restroom) => {
                        let score = r.communityRating * 2 // Base score (0-10)
                        if (r.fees.isFree) score += 2 // Bonus for free

                        const cleanKeywords = ['clean', 'good', 'well maintained', 'hygienic', 'excellent']
                        const notes = r.communityNotes.toLowerCase()
                        if (cleanKeywords.some(k => notes.includes(k))) score += 3

                        return score
                    }
                    return getScore(b) - getScore(a)
                })

            case 'rating':
                return items.sort((a, b) => b.communityRating - a.communityRating)

            case 'alphabetical':
                return items.sort((a, b) => a.name.localeCompare(b.name))

            case 'city':
                return items.sort((a, b) => {
                    const cityCompare = a.city.localeCompare(b.city)
                    if (cityCompare !== 0) return cityCompare
                    return a.name.localeCompare(b.name)
                })

            case 'distance':
                if (!userLocation.value) return items
                return items.sort((a, b) => {
                    const distA = getDistanceFromUser(a)
                    const distB = getDistanceFromUser(b)
                    if (distA === null && distB === null) return 0
                    if (distA === null) return 1
                    if (distB === null) return -1
                    return distA - distB
                })

            default:
                return items
        }
    })

    // Restrooms with coordinates (for map) - includes geocoded ones
    const mappableRestrooms = computed(() => {
        return sortedRestrooms.value.filter(r => getEffectiveCoordinates(r) !== null)
    })

    // Restrooms needing geocoding
    const restroomsNeedingGeocode = computed(() => {
        return allRestrooms.filter(r => !r.coordinates && !geocodedCoordinates.value.has(r.id))
    })

    // Initialize geocoding for restrooms without coordinates
    async function initGeocoding() {
        const needsGeocode = restroomsNeedingGeocode.value
        if (needsGeocode.length === 0) return

        for (const restroom of needsGeocode) {
            // Skip if already being processed
            if (geocodingStatus.value.get(restroom.id) === 'locating') continue

            geocodingStatus.value.set(restroom.id, 'locating')

            try {
                const query = restroom.area
                    ? `${restroom.name}, ${restroom.area}, ${restroom.city}, Sri Lanka`
                    : `${restroom.name}, ${restroom.city}, Sri Lanka`

                const result = await $fetch<any>('/api/geocode', {
                    params: { q: query }
                })

                if (result.rateLimited) {
                    geocodingStatus.value.set(restroom.id, 'locating')
                    // Wait and retry
                    await new Promise(r => setTimeout(r, (result.retryAfter || 2) * 1000))
                    continue
                }

                if (result.success && result.lat && result.lon) {
                    geocodedCoordinates.value.set(restroom.id, {
                        lat: result.lat,
                        lon: result.lon
                    })
                    geocodingStatus.value.set(restroom.id, 'found')
                } else {
                    geocodingStatus.value.set(restroom.id, 'not_found')
                }
            } catch {
                geocodingStatus.value.set(restroom.id, 'error')
            }

            // Rate limit: wait 2 seconds between requests
            await new Promise(r => setTimeout(r, 2000))
        }
    }

    // Fetch reviews from server
    async function fetchReviews() {
        try {
            const data = await $fetch<any[]>('/api/reviews')
            if (Array.isArray(data)) {
                reviews.value = data
            }
        } catch (e) {
            console.error('Failed to fetch reviews:', e)
        }
    }

    // Add a review locally (optimistic) and refresh
    async function addReview(review: any) {
        reviews.value.push(review)
        // Re-fetch to confirm
        await fetchReviews()
    }

    // Get geocoding status for a restroom
    function getGeocodingStatus(restroomId: string): 'locating' | 'found' | 'not_found' | 'error' | null {
        return geocodingStatus.value.get(restroomId) || null
    }

    // Actions
    function setFilter(filter: RestroomFilter) {
        selectedFilter.value = filter
    }

    function setCity(city: string) {
        selectedCity.value = city
    }

    function setSearch(query: string) {
        searchQuery.value = query
    }

    function setSort(sort: FacilitySortOption) {
        selectedSort.value = sort
    }

    function openDetails(restroom: Restroom) {
        selectedRestroom.value = restroom
        showDetails.value = true
    }

    function closeDetails() {
        showDetails.value = false
    }

    function selectRestroom(restroom: Restroom) {
        selectedRestroom.value = restroom
    }

    function clearSelection() {
        selectedRestroom.value = null
    }

    function resetFilters() {
        selectedFilter.value = 'all'
        selectedCity.value = 'all'
        searchQuery.value = ''
        selectedSort.value = 'recommended'
    }

    // Get user's location using browser geolocation API
    async function getUserLocation(): Promise<boolean> {
        if (typeof navigator === 'undefined' || !navigator.geolocation) {
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

    // Format fee for display
    function formatFee(restroom: Restroom): string {
        if (restroom.fees.isFree) return 'Free'
        if (restroom.fees.amountLKR) return `Rs ${restroom.fees.amountLKR}`
        return 'Paid'
    }

    // Stats
    const freeCount = computed(() => sortedRestrooms.value.filter(r => r.fees.isFree).length)
    const paidCount = computed(() => sortedRestrooms.value.filter(r => !r.fees.isFree).length)
    const highRatedCount = computed(() => sortedRestrooms.value.filter(r => r.communityRating >= 4.0).length)
    const visibleAvgRating = computed(() => {
        if (sortedRestrooms.value.length === 0) return 0
        const total = sortedRestrooms.value.reduce((sum, r) => sum + r.communityRating, 0)
        return Number((total / sortedRestrooms.value.length).toFixed(1))
    })

    return {
        // Data
        restrooms: sortedRestrooms,
        mappableRestrooms,
        allRestrooms,
        cities,

        // State
        selectedFilter,
        selectedCity,
        selectedRestroom,
        showDetails,
        searchQuery,
        selectedSort,
        userLocation,
        isLocating,
        locationError,

        // Stats
        freeCount,
        paidCount,
        highRatedCount,
        visibleAvgRating,

        // Actions
        setFilter,
        setCity,
        setSearch,
        setSort,
        openDetails,
        closeDetails,
        selectRestroom,
        clearSelection,
        resetFilters,
        getUserLocation,

        // Reviews
        reviews,
        fetchReviews,
        addReview,

        // Geocoding
        initGeocoding,
        getGeocodingStatus,
        getEffectiveCoordinates,

        // Utilities
        getDistanceFromUser,
        formatDistance,
        formatFee
    }
}
