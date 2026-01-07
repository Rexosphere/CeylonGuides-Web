import { defineEventHandler, getQuery, createError } from 'h3'

// In-memory cache with rate limiting
const cache = new Map<string, { lat: number; lon: number; timestamp: number } | 'not_found'>()
let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 1500 // 1.5 seconds between requests (Nominatim policy: max 1/sec)

interface NominatimResult {
    lat: string
    lon: string
    display_name: string
}

function normalizeQuery(query: string): string {
    return query.toLowerCase().trim().replace(/\s+/g, ' ')
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const searchQuery = query.q as string

    if (!searchQuery) {
        throw createError({
            statusCode: 400,
            message: 'Missing query parameter "q"'
        })
    }

    const normalizedQuery = normalizeQuery(searchQuery)

    // Check cache first
    const cached = cache.get(normalizedQuery)
    if (cached !== undefined) {
        if (cached === 'not_found') {
            return {
                success: false,
                cached: true,
                message: 'Location not found (cached)'
            }
        }
        return {
            success: true,
            cached: true,
            lat: cached.lat,
            lon: cached.lon
        }
    }

    // Rate limiting
    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
        return {
            success: false,
            rateLimited: true,
            retryAfter: Math.ceil((MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000),
            message: 'Rate limited, please retry later'
        }
    }

    lastRequestTime = now

    try {
        // Call Nominatim API
        const nominatimUrl = new URL('https://nominatim.openstreetmap.org/search')
        nominatimUrl.searchParams.set('q', searchQuery)
        nominatimUrl.searchParams.set('format', 'json')
        nominatimUrl.searchParams.set('limit', '1')
        nominatimUrl.searchParams.set('countrycodes', 'lk') // Limit to Sri Lanka

        const response = await fetch(nominatimUrl.toString(), {
            headers: {
                'User-Agent': 'CeylonGuides/1.0 (https://ceylonguides.com)'
            }
        })

        if (!response.ok) {
            throw new Error(`Nominatim API returned ${response.status}`)
        }

        const results: NominatimResult[] = await response.json()

        if (results.length === 0) {
            // Cache negative result
            cache.set(normalizedQuery, 'not_found')

            return {
                success: false,
                cached: false,
                message: 'Location not found'
            }
        }

        const result = results[0]
        if (!result) {
            cache.set(normalizedQuery, 'not_found')
            return {
                success: false,
                cached: false,
                message: 'Location not found'
            }
        }

        const lat = parseFloat(result.lat)
        const lon = parseFloat(result.lon)

        // Cache successful result
        cache.set(normalizedQuery, { lat, lon, timestamp: now })

        return {
            success: true,
            cached: false,
            lat,
            lon,
            displayName: result.display_name
        }

    } catch (error) {
        console.error('Geocoding error:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to geocode location'
        })
    }
})
