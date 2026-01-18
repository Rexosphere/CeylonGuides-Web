import { ref, computed } from 'vue'

// Popular Sri Lanka destinations with coordinates
export const popularDestinations = [
    { id: 'airport', name: 'Bandaranaike International Airport', lat: 7.1739, lon: 79.8828, region: 'Western' },
    { id: 'colombo', name: 'Colombo', lat: 6.9271, lon: 79.8612, region: 'Western' },
    { id: 'kandy', name: 'Kandy', lat: 7.2906, lon: 80.6337, region: 'Central' },
    { id: 'galle', name: 'Galle', lat: 6.0535, lon: 80.2210, region: 'Southern' },
    { id: 'ella', name: 'Ella', lat: 6.8667, lon: 81.0466, region: 'Uva' },
    { id: 'nuwara-eliya', name: 'Nuwara Eliya', lat: 6.9497, lon: 80.7891, region: 'Central' },
    { id: 'sigiriya', name: 'Sigiriya', lat: 7.9570, lon: 80.7603, region: 'North Central' },
    { id: 'trincomalee', name: 'Trincomalee', lat: 8.5711, lon: 81.2335, region: 'Eastern' },
    { id: 'jaffna', name: 'Jaffna', lat: 9.6615, lon: 80.0255, region: 'Northern' },
    { id: 'mirissa', name: 'Mirissa', lat: 5.9483, lon: 80.4589, region: 'Southern' },
    { id: 'anuradhapura', name: 'Anuradhapura', lat: 8.3114, lon: 80.4037, region: 'North Central' },
    { id: 'dambulla', name: 'Dambulla', lat: 7.8742, lon: 80.6511, region: 'Central' },
    { id: 'polonnaruwa', name: 'Polonnaruwa', lat: 7.9403, lon: 81.0188, region: 'North Central' },
    { id: 'arugam-bay', name: 'Arugam Bay', lat: 6.8406, lon: 81.8361, region: 'Eastern' },
    { id: 'hikkaduwa', name: 'Hikkaduwa', lat: 6.1395, lon: 80.1034, region: 'Southern' },
    { id: 'unawatuna', name: 'Unawatuna', lat: 6.0096, lon: 80.2492, region: 'Southern' }
]

export interface Location {
    name: string
    lat: number
    lon: number
}

export interface TransportOption {
    mode: 'train' | 'bus' | 'tuktuk' | 'taxi' | 'uber'
    label: string
    icon: string
    duration: string
    durationMinutes: number
    cost: string
    costLKR: number
    description: string
    tips: string[]
    pros: string[]
    cons: string[]
    recommended: boolean
}

export interface RouteResult {
    origin: Location
    destination: Location
    distanceKm: number
    durationMinutes: number
    options: TransportOption[]
    polyline: [number, number][]
}

// Transport mode configurations with pricing models
const transportModes = {
    train: {
        label: 'Train',
        icon: '🚂',
        speedKmh: 35,
        baseCostLKR: 100,
        costPerKmLKR: 4,
        description: 'Scenic railway journey through tea plantations and mountains',
        pros: ['Most scenic option', 'Very cheap', 'Authentic experience'],
        cons: ['Can be crowded', 'Limited routes', 'Slower than bus'],
        tips: ['Book reserved seats 30 days ahead', 'Sit on the right side from Colombo for views', 'Bring snacks and water']
    },
    bus: {
        label: 'Express Bus',
        icon: '🚌',
        speedKmh: 50,
        baseCostLKR: 50,
        costPerKmLKR: 3,
        description: 'Fast A/C express buses via highways',
        pros: ['Faster than train', 'Frequent departures', 'A/C comfort'],
        cons: ['Less scenic', 'Can be crowded', 'Some drivers drive fast'],
        tips: ['Use highway express for long distances', 'Book A/C buses in advance', 'Makumbura terminal for expressway buses']
    },
    tuktuk: {
        label: 'Tuk-Tuk',
        icon: '🛺',
        speedKmh: 25,
        baseCostLKR: 100,
        costPerKmLKR: 60,
        description: 'Local three-wheeler for short distances',
        pros: ['Flexible stops', 'Door-to-door', 'Fun experience'],
        cons: ['Not for long distances', 'Open to elements', 'Negotiate needed'],
        tips: ['Insist on meter in cities', 'Negotiate before starting', 'Not recommended over 30km']
    },
    taxi: {
        label: 'Private Taxi',
        icon: '🚕',
        speedKmh: 60,
        baseCostLKR: 500,
        costPerKmLKR: 80,
        description: 'Comfortable private car with driver',
        pros: ['Most comfortable', 'Flexible timing', 'A/C and safe'],
        cons: ['Most expensive', 'Need to negotiate', 'Return fee may apply'],
        tips: ['Book through hotel for trusted drivers', 'Clarify toll costs upfront', 'Good for groups (split cost)']
    },
    uber: {
        label: 'PickMe / Uber',
        icon: '📱',
        speedKmh: 55,
        baseCostLKR: 300,
        costPerKmLKR: 70,
        description: 'App-based ride with fixed pricing',
        pros: ['Fixed upfront price', 'No negotiating', 'Tracked ride'],
        cons: ['Limited in rural areas', 'Surge pricing possible', 'Driver may refuse long trips'],
        tips: ['Check both Uber and PickMe for best price', 'Works well in cities', 'Use for airport transfers']
    }
}

// Recommended Route Interface
export interface RecommendedRoute {
    id: string
    from: string
    to: string
    options: {
        mode: string
        title: string
        subtitle: string
        cost: string
        duration: string
        tag?: string
        tagClass?: string
        tips?: string[]
        badges?: string[]
    }[]
}

// Knowledge Base for Smart Recommendations
const RoutesKnowledgeBase: RecommendedRoute[] = [
    {
        id: 'colombo-ella',
        from: 'Colombo',
        to: 'Ella',
        options: [
            {
                mode: 'train',
                title: 'Scenic Train (Blue Line)',
                subtitle: 'World famous views',
                cost: 'Rs. 800 - 3000',
                duration: '9h',
                tag: 'Must Do',
                tagClass: 'bg-green-100 text-green-700',
                tips: ['Sit on RIGHT side for best views', 'Book 1st Class observation car early'],
                badges: ['Scenic', 'Popular']
            },
            {
                mode: 'taxi',
                title: 'Private Taxi / Van',
                subtitle: 'Fastest & Comfortable',
                cost: 'Rs. 35,000+',
                duration: '5h',
                tag: 'Fastest',
                tagClass: 'bg-purple-100 text-purple-700',
                tips: ['Ask for highway route', 'Stop at Ravana Falls on the way']
            }
        ]
    },
    {
        id: 'colombo-kandy',
        from: 'Colombo',
        to: 'Kandy',
        options: [
            {
                mode: 'train',
                title: 'Intercity Express',
                subtitle: 'Comfortable A/C train',
                cost: 'Rs. 2000',
                duration: '2.5h',
                tag: 'Best Value',
                tagClass: 'bg-blue-100 text-blue-700',
                tips: ['Book 1st Class A/C', 'Departing form Fort Station']
            },
            {
                mode: 'bus',
                title: 'Highway Bus',
                subtitle: 'Fast & Frequent',
                cost: 'Rs. 950',
                duration: '3h',
                tag: 'Frequent',
                tagClass: 'bg-orange-100 text-orange-700',
                tips: ['Catch from Bastian Mawatha', 'Look for "Normal" vs "Semi-Luxury"']
            }
        ]
    },
    {
        id: 'kandy-ella',
        from: 'Kandy',
        to: 'Ella',
        options: [
            {
                mode: 'train',
                title: 'The Blue Train',
                subtitle: 'The most beautiful train ride',
                cost: 'Rs. 600 - 2500',
                duration: '7h',
                tag: 'Iconic',
                tagClass: 'bg-teal-100 text-teal-700',
                tips: ['Sit on RIGHT side Kandy to Nanu Oya', 'LEFT side Nanu Oya to Ella'],
                badges: ['Must Do', 'Instagrammable']
            }
        ]
    },
    {
        id: 'colombo-galle',
        from: 'Colombo',
        to: 'Galle',
        options: [
            {
                mode: 'bus',
                title: 'Southern Expressway Bus',
                subtitle: 'Very fast highway bus',
                cost: 'Rs. 1100',
                duration: '1.5h',
                tag: 'Fastest',
                tagClass: 'bg-green-100 text-green-700',
                tips: ['Makumbura Multimodal Center is best starting point', 'A/C and comfortable']
            },
            {
                mode: 'train',
                title: 'Coastal Train',
                subtitle: 'Runs along the ocean',
                cost: 'Rs. 300 - 800',
                duration: '2.5h',
                tag: 'Scenic',
                tagClass: 'bg-blue-100 text-blue-700',
                tips: ['Sit on RIGHT side (ocean view)', 'Try "Ruhunu Kumari" express']
            }
        ]
    },
    {
        id: 'kandy-sigiriya',
        from: 'Kandy',
        to: 'Sigiriya',
        options: [
            {
                mode: 'taxi',
                title: 'Private Taxi / Tuk',
                subtitle: 'Direct to Lion Rock',
                cost: 'Rs. 8,000 - 12,000',
                duration: '2.5h',
                tag: 'Recommended',
                tagClass: 'bg-purple-100 text-purple-700',
                tips: ['Visit Dambulla Cave Temple on the way', 'Start early (7 AM) to beat heat']
            },
            {
                mode: 'bus',
                title: 'Public Bus',
                subtitle: 'Cheapest option',
                cost: 'Rs. 350',
                duration: '3.5h',
                tag: 'Budget',
                tagClass: 'bg-orange-100 text-gray-700',
                tips: ['Bus to Dambulla first', 'Transfer to Sigiriya bus']
            }
        ]
    }
]

// Route persistence key
const STORAGE_KEY = 'transport_route_cache'
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 30 // 30 days essentially permanent for routes

interface RouteCacheEntry {
    result: RouteResult
    timestamp: number
}

// Load cache from storage
function getRouteCache(): Map<string, RouteCacheEntry> {
    if (typeof window === 'undefined') return new Map()
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            return new Map(JSON.parse(stored))
        }
    } catch (e) {
        console.warn('Failed to load route cache', e)
    }
    return new Map()
}

function saveRouteCache(map: Map<string, RouteCacheEntry>) {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(map.entries())))
    } catch (e) {
        console.warn('Failed to save route cache', e)
    }
}

// Global cache instance
const routeCache = getRouteCache()

export function useTransportRoutes() {
    const origin = ref<Location | null>(null)
    const destination = ref<Location | null>(null)
    const routeResult = ref<RouteResult | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const isStale = ref(false) // New: Indicates displayed data might be old
    const searchQuery = ref('')
    const searchResults = ref<typeof popularDestinations>([])

    // Calculate route using OSRM (free routing)
    async function calculateRoute(forceRefresh = false): Promise<void> {
        if (!origin.value || !destination.value) {
            error.value = null
            return
        }

        const cacheKey = `${origin.value.lat},${origin.value.lon};${destination.value.lat},${destination.value.lon}`
        const cached = routeCache.get(cacheKey)
        const now = Date.now()

        // Use cache if fresh and not forcing refresh
        if (!forceRefresh && cached && (now - cached.timestamp < CACHE_DURATION)) {
            routeResult.value = cached.result
            error.value = null
            isStale.value = false
            return
        }

        isLoading.value = true
        error.value = null
        isStale.value = false

        try {
            const url = `https://router.project-osrm.org/route/v1/driving/${origin.value.lon},${origin.value.lat};${destination.value.lon},${destination.value.lat}?overview=full&geometries=geojson`

            const response = await $fetch<any>(url, { retry: 1 })

            if (response.code !== 'Ok' || !response.routes?.length) {
                throw new Error('No route found')
            }

            const route = response.routes[0]
            const distanceKm = route.distance / 1000
            const durationMinutes = Math.round(route.duration / 60)

            // Extract polyline coordinates
            const coordinates = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]] as [number, number])

            // Generate transport options
            const options = generateTransportOptions(distanceKm)

            const result: RouteResult = {
                origin: origin.value,
                destination: destination.value,
                distanceKm: Math.round(distanceKm * 10) / 10,
                durationMinutes,
                options,
                polyline: coordinates
            }

            // Update cache and persist
            routeCache.set(cacheKey, { result, timestamp: now })
            saveRouteCache(routeCache)

            routeResult.value = result

        } catch (e) {
            console.error('Route calculation failed:', e)

            // Fallback to STALE cache if available
            if (cached) {
                console.log('Serving stale route cache')
                routeResult.value = cached.result
                isStale.value = true // Mark as stale
                error.value = 'Network error. Showing cached route.'
            } else {
                error.value = 'Could not calculate route. Check internet connection.'
            }
        } finally {
            isLoading.value = false
        }
    }

    // Generate transport options based on distance
    function generateTransportOptions(distanceKm: number): TransportOption[] {
        const options: TransportOption[] = []

        for (const [mode, config] of Object.entries(transportModes)) {
            const durationMinutes = Math.round((distanceKm / config.speedKmh) * 60)
            const costLKR = Math.round(config.baseCostLKR + (distanceKm * config.costPerKmLKR))

            // Skip tuk-tuk for distances over 50km
            if (mode === 'tuktuk' && distanceKm > 50) continue

            // Determine if recommended
            let recommended = false
            if (mode === 'train' && distanceKm > 50) recommended = true
            if (mode === 'bus' && distanceKm > 30 && distanceKm < 150) recommended = true
            if (mode === 'tuktuk' && distanceKm < 15) recommended = true
            if (mode === 'uber' && distanceKm < 50) recommended = true

            options.push({
                mode: mode as TransportOption['mode'],
                label: config.label,
                icon: config.icon,
                duration: formatDuration(durationMinutes),
                durationMinutes,
                cost: formatCost(costLKR),
                costLKR,
                description: config.description,
                tips: config.tips,
                pros: config.pros,
                cons: config.cons,
                recommended
            })
        }

        // Sort by cost (cheapest first)
        return options.sort((a, b) => a.costLKR - b.costLKR)
    }

    function formatDuration(minutes: number): string {
        if (minutes < 60) return `${minutes} min`
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }

    function formatCost(lkr: number): string {
        if (lkr < 1000) return `Rs. ${lkr}`
        return `Rs. ${Math.round(lkr / 100) * 100}`
    }

    // Search destinations
    function searchDestinations(query: string) {
        searchQuery.value = query
        if (!query.trim()) {
            searchResults.value = []
            return
        }

        const q = query.toLowerCase()
        searchResults.value = popularDestinations.filter(d =>
            d.name.toLowerCase().includes(q) ||
            d.region.toLowerCase().includes(q)
        ).slice(0, 5)
    }

    // Geocode a custom location using Nominatim (free)
    async function geocodeLocation(query: string): Promise<Location | null> {
        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', Sri Lanka')}&format=json&limit=1`
            const response = await $fetch<any[]>(url, {
                headers: { 'User-Agent': 'CeylonWiki/1.0' }
            })

            if (response.length > 0) {
                return {
                    name: response[0].display_name.split(',')[0],
                    lat: parseFloat(response[0].lat),
                    lon: parseFloat(response[0].lon)
                }
            }
            return null
        } catch (e) {
            console.error('Geocoding failed:', e)
            return null
        }
    }

    // Set origin from popular destination
    function setOrigin(dest: typeof popularDestinations[0]) {
        origin.value = { name: dest.name, lat: dest.lat, lon: dest.lon }
        routeResult.value = null
    }

    // Set destination from popular destination
    function setDestination(dest: typeof popularDestinations[0]) {
        destination.value = { name: dest.name, lat: dest.lat, lon: dest.lon }
        routeResult.value = null
    }

    // Swap origin and destination
    function swapLocations() {
        const temp = origin.value
        origin.value = destination.value
        destination.value = temp
        routeResult.value = null
    }

    // Clear route
    function clearRoute() {
        origin.value = null
        destination.value = null
        routeResult.value = null
        error.value = null
        isStale.value = false
    }

    // Get smart recommendations based on route matching
    function getRouteRecommendations(): RecommendedRoute['options'] | null {
        if (!origin.value || !destination.value) return null

        const fromName = origin.value.name.toLowerCase()
        const toName = destination.value.name.toLowerCase()

        // Find matching route in knowledge base (loose matching on city names)
        const matchedRoute = RoutesKnowledgeBase.find(route => {
            const kbFrom = route.from.toLowerCase()
            const kbTo = route.to.toLowerCase()

            return fromName.includes(kbFrom) && toName.includes(kbTo)
        })

        if (matchedRoute) {
            return matchedRoute.options
        }

        return null
    }

    return {
        origin,
        destination,
        routeResult,
        isLoading,
        error,
        isStale,
        searchQuery,
        searchResults,
        popularDestinations,
        calculateRoute,
        searchDestinations,
        geocodeLocation,
        setOrigin,
        setDestination,
        swapLocations,
        clearRoute,
        getRouteRecommendations
    }
}
