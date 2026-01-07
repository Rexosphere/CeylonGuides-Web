import { ref, computed } from 'vue'
import type { Coordinates } from '~/data/dining'

interface GeocodingResult {
    success: boolean
    cached?: boolean
    rateLimited?: boolean
    retryAfter?: number
    lat?: number
    lon?: number
    message?: string
}

interface GeocodingState {
    status: 'idle' | 'locating' | 'found' | 'not_found' | 'error'
    coordinates: Coordinates | null
}

// Global state for geocoding
const geocodingStates = ref<Map<string, GeocodingState>>(new Map())
const geocodingQueue = ref<string[]>([])
const isProcessing = ref(false)
const processedCount = ref(0)

// Rate limit: process one every 2 seconds
const PROCESS_INTERVAL = 2000

export function useGeocoding() {
    // Get the state for a restaurant
    function getState(restaurantId: string): GeocodingState {
        return geocodingStates.value.get(restaurantId) || {
            status: 'idle',
            coordinates: null
        }
    }

    // Queue a restaurant for geocoding
    function queueGeocode(restaurantId: string, name: string, city: string, area?: string | null) {
        const existing = geocodingStates.value.get(restaurantId)
        if (existing && existing.status !== 'idle') {
            return // Already being processed or completed
        }

        // Set initial state
        geocodingStates.value.set(restaurantId, {
            status: 'idle',
            coordinates: null
        })

        // Add to queue with search query
        const searchQuery = area
            ? `${name}, ${area}, ${city}, Sri Lanka`
            : `${name}, ${city}, Sri Lanka`

        geocodingQueue.value.push(JSON.stringify({
            id: restaurantId,
            query: searchQuery
        }))

        // Start processing if not already
        if (!isProcessing.value) {
            processQueue()
        }
    }

    // Process the geocoding queue
    async function processQueue() {
        if (isProcessing.value || geocodingQueue.value.length === 0) return

        isProcessing.value = true

        while (geocodingQueue.value.length > 0) {
            const item = geocodingQueue.value.shift()
            if (!item) continue

            const { id, query } = JSON.parse(item) as { id: string; query: string }

            // Update status to locating
            geocodingStates.value.set(id, {
                status: 'locating',
                coordinates: null
            })

            try {
                const result = await $fetch<GeocodingResult>('/api/geocode', {
                    params: { q: query }
                })

                if (result.rateLimited) {
                    // Put back in queue and wait
                    geocodingQueue.value.unshift(item)
                    await new Promise(r => setTimeout(r, (result.retryAfter || 2) * 1000))
                    continue
                }

                if (result.success && result.lat && result.lon) {
                    geocodingStates.value.set(id, {
                        status: 'found',
                        coordinates: { lat: result.lat, lon: result.lon }
                    })
                    processedCount.value++
                } else {
                    geocodingStates.value.set(id, {
                        status: 'not_found',
                        coordinates: null
                    })
                }
            } catch (error) {
                console.error(`Geocoding failed for ${id}:`, error)
                geocodingStates.value.set(id, {
                    status: 'error',
                    coordinates: null
                })
            }

            // Wait before processing next item
            if (geocodingQueue.value.length > 0) {
                await new Promise(r => setTimeout(r, PROCESS_INTERVAL))
            }
        }

        isProcessing.value = false
    }

    // Get resolved coordinates for a restaurant
    function getResolvedCoordinates(restaurantId: string): Coordinates | null {
        const state = geocodingStates.value.get(restaurantId)
        return state?.coordinates || null
    }

    // Check if any geocoding is in progress
    const isGeocodingActive = computed(() => isProcessing.value)

    // Count of pending items
    const pendingCount = computed(() => geocodingQueue.value.length)

    // Count of successfully processed
    const resolvedCount = computed(() => processedCount.value)

    return {
        getState,
        queueGeocode,
        getResolvedCoordinates,
        isGeocodingActive,
        pendingCount,
        resolvedCount
    }
}
