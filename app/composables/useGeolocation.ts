/**
 * useGeolocation Composable
 * 
 * Provides reactive geolocation state with localStorage caching.
 */

import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { GeolocationState, GeolocationStatus } from '../types/safetyMode'

const STORAGE_KEY = 'ceylonguide_geolocation'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

interface CachedLocation {
    lat: number
    lng: number
    accuracy: number
    timestamp: number
}

export function useGeolocation() {
    const state = ref<GeolocationState>({
        status: 'idle',
        coords: null,
        accuracy: null,
        lastUpdated: null,
        error: null
    })

    let watchId: number | null = null

    // Load cached location from localStorage
    function loadCachedLocation(): CachedLocation | null {
        if (typeof window === 'undefined') return null

        try {
            const cached = localStorage.getItem(STORAGE_KEY)
            if (!cached) return null

            const data: CachedLocation = JSON.parse(cached)

            // Check if cache is still valid
            if (Date.now() - data.timestamp < CACHE_DURATION) {
                return data
            }

            // Cache expired
            localStorage.removeItem(STORAGE_KEY)
            return null
        } catch {
            return null
        }
    }

    // Save location to localStorage
    function cacheLocation(lat: number, lng: number, accuracy: number) {
        if (typeof window === 'undefined') return

        const data: CachedLocation = {
            lat,
            lng,
            accuracy,
            timestamp: Date.now()
        }

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        } catch {
            // Storage full or unavailable
        }
    }

    // Request location permission and start tracking
    function requestLocation() {
        if (typeof window === 'undefined' || !('geolocation' in navigator)) {
            state.value.status = 'error'
            state.value.error = 'Geolocation not supported'
            return
        }

        state.value.status = 'loading'
        state.value.error = null

        // Try to use cached location first
        const cached = loadCachedLocation()
        if (cached) {
            state.value.coords = { lat: cached.lat, lng: cached.lng }
            state.value.accuracy = cached.accuracy
            state.value.lastUpdated = cached.timestamp
            state.value.status = 'granted'
        }

        // Get fresh location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords

                state.value.coords = { lat: latitude, lng: longitude }
                state.value.accuracy = accuracy
                state.value.lastUpdated = Date.now()
                state.value.status = 'granted'
                state.value.error = null

                cacheLocation(latitude, longitude, accuracy)
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    state.value.status = 'denied'
                    state.value.error = 'Location permission denied'
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    state.value.status = 'error'
                    state.value.error = 'Location unavailable'
                } else if (error.code === error.TIMEOUT) {
                    state.value.status = 'error'
                    state.value.error = 'Location request timed out'
                } else {
                    state.value.status = 'error'
                    state.value.error = 'Failed to get location'
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: CACHE_DURATION
            }
        )
    }

    // Watch location for updates
    function watchLocation() {
        if (typeof window === 'undefined' || !('geolocation' in navigator)) return

        watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords

                state.value.coords = { lat: latitude, lng: longitude }
                state.value.accuracy = accuracy
                state.value.lastUpdated = Date.now()
                state.value.status = 'granted'

                cacheLocation(latitude, longitude, accuracy)
            },
            () => {
                // Silently handle watch errors
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: CACHE_DURATION
            }
        )
    }

    // Stop watching location
    function stopWatching() {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId)
            watchId = null
        }
    }

    // Set manual coordinates
    function setManualLocation(lat: number, lng: number) {
        state.value.coords = { lat, lng }
        state.value.accuracy = null
        state.value.lastUpdated = Date.now()
        state.value.status = 'granted'
        state.value.error = null
    }

    // Generate share message
    function generateShareMessage(): string {
        if (!state.value.coords) return ''

        const { lat, lng } = state.value.coords
        const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`
        const accuracy = state.value.accuracy ? `±${Math.round(state.value.accuracy)}m` : 'Unknown'
        const time = new Date().toLocaleString()

        return `🚨 I need help!\n\n📍 My Location:\n${mapsLink}\n\nCoordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}\nAccuracy: ${accuracy}\nTime: ${time}\n\nSent via CeylonGuide Safety Mode`
    }

    // Share via WhatsApp
    function shareViaWhatsApp() {
        const message = encodeURIComponent(generateShareMessage())
        window.open(`https://wa.me/?text=${message}`, '_blank')
    }

    // Share via SMS
    function shareViaSMS() {
        const message = encodeURIComponent(generateShareMessage())
        window.location.href = `sms:?body=${message}`
    }

    // Copy to clipboard
    async function copyToClipboard(): Promise<boolean> {
        try {
            await navigator.clipboard.writeText(generateShareMessage())
            return true
        } catch {
            return false
        }
    }

    onMounted(() => {
        // Load cached location on mount
        const cached = loadCachedLocation()
        if (cached) {
            state.value.coords = { lat: cached.lat, lng: cached.lng }
            state.value.accuracy = cached.accuracy
            state.value.lastUpdated = cached.timestamp
        }
    })

    onBeforeUnmount(() => {
        stopWatching()
    })

    return {
        state,
        requestLocation,
        watchLocation,
        stopWatching,
        setManualLocation,
        generateShareMessage,
        shareViaWhatsApp,
        shareViaSMS,
        copyToClipboard
    }
}

export default useGeolocation
