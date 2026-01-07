import { cities, regions } from '~/utils/weatherConfig'

interface WeatherData {
    temperatureC: number
    weatherCode: number
    conditionText: string
    windKmh: number
    humidityPercent: number | null
    observedAt: string
    fetchedAt: string
}

interface CityWeatherState {
    data: WeatherData | null
    loading: boolean
    error: string | null
    updatedAt: number | null // timestamp
    stale: boolean
}

// 30 minutes in milliseconds
const CACHE_DURATION = 30 * 60 * 1000
const CACHE_KEY = 'ceylon-guide-weather-cache'

export const useWeather = () => {
    // Reactive state for each city, keyed by city ID
    const cityWeatherMap = useState<Record<string, CityWeatherState>>('weather-state', () => ({}))

    // Track largest last updated timestamp for global indicator
    const lastUpdatedAt = computed(() => {
        let max = 0
        Object.values(cityWeatherMap.value).forEach(state => {
            if (state.updatedAt && state.updatedAt > max) {
                max = state.updatedAt
            }
        })
        return max ? new Date(max).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null
    })

    // Initialize: load from cache, set defaults
    const init = async () => {
        // Only run on client for localStorage
        if (import.meta.client) {
            const cached = localStorage.getItem(CACHE_KEY)
            if (cached) {
                try {
                    const parsed: Record<string, CityWeatherState> = JSON.parse(cached)
                    // Merge cache into state
                    cities.forEach(city => {
                        const saved = parsed[city.id]
                        if (saved) {
                            // Ensure we don't overwrite if already loaded (e.g. hydration), though useState handles this.
                            // We need to check freshness.
                            cityWeatherMap.value[city.id] = saved
                        }
                    })
                } catch (e) {
                    console.error('Failed to parse weather cache', e)
                }
            }
        }

        // Ensure all cities have an entry
        cities.forEach(city => {
            if (!cityWeatherMap.value[city.id]) {
                cityWeatherMap.value[city.id] = {
                    data: null,
                    loading: false,
                    error: null,
                    updatedAt: null,
                    stale: true
                }
            }
        })

        // Auto-fetch if missing or stale
        // We do this one by one to avoid blocking everything? Or just fire all.
        // Let's fire requests for any needed data.
        cities.forEach(city => {
            const state = cityWeatherMap.value[city.id]
            if (!state) return

            const now = Date.now()
            const isFresh = state.updatedAt && (now - state.updatedAt < CACHE_DURATION)

            if (!state.data || !isFresh) {
                // Background fetch
                fetchCity(city.id)
            }
        })

        // We don't await here to let UI show cache immediately
    }

    const saveCache = () => {
        if (import.meta.client) {
            localStorage.setItem(CACHE_KEY, JSON.stringify(cityWeatherMap.value))
        }
    }

    const fetchCity = async (cityId: string, force = false) => {
        const city = cities.find(c => c.id === cityId)
        if (!city) return

        const state = cityWeatherMap.value[cityId]
        if (!state) return

        // If fetch already in progress? Maybe debounce/dedupe. 
        // For simplicity, just set loading.

        // Check cache valid again if not forced
        if (!force && state.updatedAt && (Date.now() - state.updatedAt < CACHE_DURATION)) {
            return
        }

        state.loading = true
        state.error = null // Clear previous error if retrying? Or keep error until success?
        // standard: clear error on new attempt

        try {
            const response = await $fetch<{
                temperatureC: number
                weatherCode: number
                conditionText: string
                windKmh: number
                humidityPercent: number | null
                observedAt: string
                fetchedAt: string
            }>('/api/weather/current', {
                params: { lat: city.lat, lon: city.lon }
            })

            if (response) {
                state.data = response
                state.updatedAt = Date.now()
                state.stale = false
                state.error = null
                saveCache()
            }
        } catch (err) {
            state.error = 'Failed to update'
            state.stale = true // Old data stays compliant with "keep cached data visible"
            // If we have no data at all, error is visible.
        } finally {
            state.loading = false
        }
    }

    const refreshAll = async () => {
        await Promise.all(cities.map(city => fetchCity(city.id, true)))
    }

    const refreshCity = async (cityId: string) => {
        await fetchCity(cityId, true)
    }

    // --- Region Logic ---
    const route = useRoute()
    const router = useRouter()

    const selectedRegionKey = useState<string>('weather-region', () => {
        const queryRegion = route.query.region as string
        // Validate if region exists in config, else default to 'all'
        return regions.find(r => r.key === queryRegion) ? queryRegion : 'all'
    })

    // Sync state changes to URL
    watch(selectedRegionKey, (newVal) => {
        router.replace({
            query: { ...route.query, region: newVal }
        })
    })

    const selectedRegionConfig = computed(() => {
        return regions.find(r => r.key === selectedRegionKey.value) || regions[0]
    })

    const displayedCities = computed(() => {
        if (selectedRegionKey.value === 'all') {
            return cities
        }

        const config = selectedRegionConfig.value
        if (!config) return cities

        // Filter: Only return cities belonging to the selected region
        return cities.filter(c => config.cityIds.includes(c.id))
    })

    const primaryCityId = computed(() => {
        return selectedRegionConfig.value?.primaryCityId || 'colombo'
    })

    // --- Control Panel Logic ---
    const temperatureUnit = useState<'C' | 'F'>('weather-unit', () => 'C')
    const autoRefreshEnabled = useState<boolean>('weather-auto-refresh', () => false)
    let refreshInterval: ReturnType<typeof setTimeout> | null = null

    const toggleUnit = () => {
        temperatureUnit.value = temperatureUnit.value === 'C' ? 'F' : 'C'
    }

    const getDisplayTemp = (tempC: number | undefined | null) => {
        if (tempC === null || tempC === undefined) return '--'
        if (temperatureUnit.value === 'C') return Math.round(tempC)
        return Math.round((tempC * 9 / 5) + 32)
    }

    const checkCacheAndRefresh = async () => {
        // fetchCity with force=false checks cache validity internally
        await Promise.all(cities.map(city => fetchCity(city.id, false)))
    }

    const handleAutoRefresh = () => {
        if (import.meta.server) return

        if (refreshInterval) {
            clearInterval(refreshInterval)
            refreshInterval = null
        }

        if (autoRefreshEnabled.value) {
            // Check every minute if data needs refreshing
            refreshInterval = setInterval(() => {
                checkCacheAndRefresh()
            }, 60 * 1000)
        }
    }

    const toggleAutoRefresh = () => {
        autoRefreshEnabled.value = !autoRefreshEnabled.value
        handleAutoRefresh()
    }

    // Ensure auto-refresh starts on init if enabled
    const originalInit = init
    const enhancedInit = async () => {
        await originalInit()
        if (autoRefreshEnabled.value) {
            handleAutoRefresh()
        }
    }

    return {
        cityWeatherMap,
        lastUpdatedAt,
        selectedRegionKey,
        selectedRegionConfig,
        displayedCities,
        primaryCityId,
        temperatureUnit,
        autoRefreshEnabled,
        init: enhancedInit,
        refreshAll,
        refreshCity,
        toggleUnit,
        toggleAutoRefresh,
        getDisplayTemp
    }
}
