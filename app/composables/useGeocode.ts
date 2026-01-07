import { ref } from 'vue'

export interface GeocodedPlace {
    id: string
    name: string
    displayName: string
    lat: number
    lon: number
    type: string
    area: string
}

// In-memory cache for geocoding results (backed by localStorage)
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 7 // 7 days cache
const MIN_REQUEST_INTERVAL = 1000 // 1 second between requests
let lastRequestTime = 0

// LocalStorage key
const STORAGE_KEY = 'transport_geocode_cache'

interface CacheEntry {
    results: GeocodedPlace[]
    timestamp: number
}

function getCache(): Map<string, CacheEntry> {
    if (typeof window === 'undefined') return new Map()
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            return new Map(JSON.parse(stored))
        }
    } catch (e) {
        console.warn('Failed to load geocode cache', e)
    }
    return new Map()
}

function setCache(map: Map<string, CacheEntry>) {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(map.entries())))
    } catch (e) {
        console.warn('Failed to save geocode cache', e)
    }
}

// Initial load
const geocodeCache = getCache()

export function useGeocode() {
    const isSearching = ref(false)
    const searchError = ref<string | null>(null)
    const searchResults = ref<GeocodedPlace[]>([])

    // Debounce timer
    let debounceTimer: ReturnType<typeof setTimeout> | null = null

    /**
     * Search for places using Nominatim API
     * Includes debouncing, persistent caching, and network resilience
     */
    async function searchPlaces(query: string): Promise<GeocodedPlace[]> {
        if (debounceTimer) clearTimeout(debounceTimer)

        if (!query || query.trim().length < 2) {
            searchResults.value = []
            return []
        }

        const normalizedQuery = query.trim().toLowerCase()
        const cached = geocodeCache.get(normalizedQuery)

        // Serve cache immediately if valid
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            searchResults.value = cached.results
            return cached.results
        }

        return new Promise((resolve) => {
            debounceTimer = setTimeout(async () => {
                await executeSearch(normalizedQuery, resolve)
            }, 300)
        })
    }

    async function executeSearch(
        query: string,
        resolve: (results: GeocodedPlace[]) => void
    ) {
        const now = Date.now()
        const timeSinceLastRequest = now - lastRequestTime

        if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
            await new Promise(r => setTimeout(r, MIN_REQUEST_INTERVAL - timeSinceLastRequest))
        }

        isSearching.value = true
        searchError.value = null

        try {
            const params = new URLSearchParams({
                q: query,
                format: 'json',
                limit: '6',
                countrycodes: 'lk',
                addressdetails: '1',
                'accept-language': 'en'
            })

            const response = await $fetch<any[]>(
                `https://nominatim.openstreetmap.org/search?${params}`,
                {
                    headers: { 'User-Agent': 'CeylonGuides/1.0' },
                    retry: 1 // Simple retry
                }
            )

            lastRequestTime = Date.now()

            const results: GeocodedPlace[] = response.map((item, index) => ({
                id: item.place_id?.toString() || `place-${index}`,
                name: extractName(item),
                displayName: item.display_name,
                lat: parseFloat(item.lat),
                lon: parseFloat(item.lon),
                type: item.type || 'place',
                area: extractArea(item)
            }))

            // Update cache and persist
            geocodeCache.set(query, { results, timestamp: Date.now() })
            setCache(geocodeCache)

            searchResults.value = results
            resolve(results)

        } catch (error) {
            console.error('Geocoding error:', error)

            // On failure, check if we have STALE cache
            const cached = geocodeCache.get(query)
            if (cached) {
                console.log('Serving stale cache for', query)
                searchResults.value = cached.results
                resolve(cached.results)
                return
            }

            searchError.value = 'Offline. Could not find place.'
            searchResults.value = []
            resolve([])
        } finally {
            isSearching.value = false
        }
    }

    /**
     * Extract a clean name from Nominatim result
     */
    function extractName(item: any): string {
        if (item.name) return item.name
        const addr = item.address || {}
        return addr.city || addr.town || addr.village || addr.hamlet ||
            addr.suburb || addr.neighbourhood || addr.road ||
            item.display_name?.split(',')[0] || 'Unknown'
    }

    /**
     * Extract area/region from Nominatim result
     */
    function extractArea(item: any): string {
        const addr = item.address || {}
        const parts: string[] = []
        if (addr.suburb) parts.push(addr.suburb)
        if (addr.city && addr.city !== extractName(item)) parts.push(addr.city)
        if (addr.state_district) parts.push(addr.state_district)
        if (addr.state) parts.push(addr.state)

        if (parts.length === 0) {
            const displayParts = item.display_name?.split(',').slice(1, 3) || []
            return displayParts.map((p: string) => p.trim()).join(', ')
        }
        return parts.slice(0, 2).join(', ')
    }

    function clearSearch() {
        searchResults.value = []
        searchError.value = null
    }

    function clearCache() {
        geocodeCache.clear()
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY)
        }
    }

    return {
        searchPlaces,
        clearSearch,
        clearCache,
        isSearching,
        searchError,
        searchResults
    }
}
