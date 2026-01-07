import { reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useTransportRoutes, type TransportOption, type RouteResult } from './useTransportRoutes'
import { useGeocode } from './useGeocode'

// Centralized State Interfaces
interface JourneyState {
    origin: string
    destination: string
    transportMode: 'TRAIN' | 'BUS' | 'TAXI' | 'TUKTUK' | 'UBER'
    rateStructure: 'standard' | 'tourist'
    passengers: number
    date: Date
}

interface SearchState {
    isSearching: boolean
    lastSearch: any | null
    error: string | null
    timestamp: number | null
}

interface ResultsState {
    routes: RouteResult | null // Integrating with useTransportRoutes structure
    selectedRoute: TransportOption | null
    sortBy: 'recommended' | 'price' | 'time'
}

interface UIState {
    activeTab: 'routes' | 'tips' | 'phrases' | 'safety'
    infoPanelExpanded: boolean
    showMap: boolean
    isMobile: boolean
    searchHistory: any[]
}

interface ValidationState {
    originError: string | null
    destinationError: string | null
    formValid: boolean
}

export function useTransportSearch() {
    // Integrate existing composables
    const {
        calculateRoute,
        routeResult: rawRouteResult,
        isLoading: isRouteLoading,
        error: routeError,
        origin: mapOrigin,
        destination: mapDestination
    } = useTransportRoutes()

    // ===== CENTRALIZED STATE =====

    const journeyState = reactive<JourneyState>({
        origin: '',
        destination: '',
        transportMode: 'TRAIN',
        rateStructure: 'standard', // 'standard' | 'tourist'
        passengers: 1,
        date: new Date()
    })

    // Search state
    const searchState = reactive<SearchState>({
        isSearching: false,
        lastSearch: null,
        error: null,
        timestamp: null
    })

    // Results state
    const resultsState = reactive<ResultsState>({
        routes: null,
        selectedRoute: null,
        sortBy: 'recommended'
    })

    // UI state
    const uiState = reactive<UIState>({
        activeTab: 'tips',
        infoPanelExpanded: true,
        showMap: true,
        isMobile: false,
        searchHistory: []
    })

    // Validation state
    const validationState = reactive<ValidationState>({
        originError: null,
        destinationError: null,
        formValid: false
    })

    // ===== COMPUTED PROPERTIES =====

    const canSearch = computed(() => {
        return validationState.formValid &&
            !searchState.isSearching &&
            journeyState.origin.length > 0 &&
            journeyState.destination.length > 0
    })

    const hasResults = computed(() => {
        return !!resultsState.routes
    })

    const sortedOptions = computed(() => {
        if (!resultsState.routes?.options) return []

        // Create a copy to sort
        const options = [...resultsState.routes.options]

        switch (resultsState.sortBy) {
            case 'price':
                return options.sort((a, b) => a.costLKR - b.costLKR)
            case 'time':
                return options.sort((a, b) => a.durationMinutes - b.durationMinutes)
            case 'recommended':
            default:
                // Custom logic: Recommended flag first, then cost
                return options.sort((a, b) => {
                    if (a.recommended === b.recommended) return a.costLKR - b.costLKR
                    return a.recommended ? -1 : 1
                })
        }
    })

    const cheapestRoute = computed(() => {
        if (!resultsState.routes?.options?.length) return null
        return resultsState.routes.options.reduce((min, route) =>
            route.costLKR < min.costLKR ? route : min
            , resultsState.routes.options[0] as TransportOption)
    })

    const fastestRoute = computed(() => {
        if (!resultsState.routes?.options?.length) return null
        return resultsState.routes.options.reduce((min, route) =>
            route.durationMinutes < min.durationMinutes ? route : min
            , resultsState.routes.options[0] as TransportOption)
    })

    // ===== WATCHERS =====

    // Sync routeResult from useTransportRoutes to our local state
    watch(rawRouteResult, (newVal) => {
        if (newVal) {
            resultsState.routes = newVal
            // Auto-select recommended or first option
            const recommended = newVal.options.find(o => o.recommended)
            resultsState.selectedRoute = recommended || newVal.options[0] || null

            uiState.activeTab = 'routes'
            uiState.infoPanelExpanded = true
        }
    })

    // Sync loading/error states
    watch(isRouteLoading, (val) => { searchState.isSearching = val })
    watch(routeError, (val) => { searchState.error = val })

    // Validate form on input changes
    watch(() => journeyState.origin, (newVal) => {
        if (!newVal) {
            validationState.originError = 'Origin is required'
        } else if (newVal.length < 2) {
            validationState.originError = 'Enter at least 2 characters'
        } else if (newVal.toLowerCase() === journeyState.destination.toLowerCase()) {
            validationState.originError = 'Origin and destination must be different'
        } else {
            validationState.originError = null
        }
        updateFormValidity()
    })

    watch(() => journeyState.destination, (newVal) => {
        if (!newVal) {
            validationState.destinationError = 'Destination is required'
        } else if (newVal.length < 2) {
            validationState.destinationError = 'Enter at least 2 characters'
        } else if (newVal.toLowerCase() === journeyState.origin.toLowerCase()) {
            validationState.destinationError = 'Origin and destination must be different'
        } else {
            validationState.destinationError = null
        }
        updateFormValidity()
    })

    // Sync selected route with recent history
    watch(() => resultsState.selectedRoute, (newRoute) => {
        if (newRoute) {
            // Could emit event or logic here
        }
    })

    // Auto-save draft
    watch(() => [journeyState.origin, journeyState.destination], () => {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('journey_draft', JSON.stringify({
                origin: journeyState.origin,
                destination: journeyState.destination
            }))
        }
    })

    // ===== ACTIONS =====

    const updateFormValidity = () => {
        validationState.formValid =
            !validationState.originError &&
            !validationState.destinationError &&
            journeyState.origin.length > 0 &&
            journeyState.destination.length > 0
    }

    const performSearch = async () => {
        // Rely on useTransportRoutes for the logic (which uses OSRM)
        // We just trigger it. 
        // Note: useTransportRoutes requires 'origin' and 'destination' refs to be set with lat/lon coords.
        // Ideally we Geocode first if we only have strings.

        // Check if we need to geocode strings -> Coordinates logic is implicitly handled in transport.vue currently 
        // by selecting from dropdown. 
        // Assumption: journeyState.origin IS the text, but mapOrigin (from useTransportRoutes) expects {name, lat, lon}.
        // We will need to ensure those are synced in the component or handle geocoding here.

        // For now, assuming mapOrigin/mapDestination are already set by the component's existing logic logic before search.
        // Or we trigger calculateRoute() which uses them.

        searchState.lastSearch = { ...journeyState, timestamp: Date.now() }
        addToSearchHistory(searchState.lastSearch)

        await calculateRoute(true) // Force refresh
    }

    const selectRoute = (route: TransportOption) => {
        resultsState.selectedRoute = route
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50)
        }
    }

    const clearSearch = () => {
        resultsState.routes = null
        resultsState.selectedRoute = null
        searchState.error = null
        searchState.lastSearch = null
    }

    const resetForm = () => {
        journeyState.origin = ''
        journeyState.destination = ''
        journeyState.transportMode = 'TRAIN'
        journeyState.rateStructure = 'standard'
        validationState.originError = null
        validationState.destinationError = null
        validationState.formValid = false
        clearSearch()
    }

    const addToSearchHistory = (search: any) => {
        const historyItem = {
            ...search,
            id: `search_${Date.now()}`
        }

        uiState.searchHistory.unshift(historyItem)
        if (uiState.searchHistory.length > 10) {
            uiState.searchHistory = uiState.searchHistory.slice(0, 10)
        }

        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('transport_history', JSON.stringify(uiState.searchHistory))
            } catch (e) { }
        }
    }

    const loadSearchHistory = () => {
        if (typeof localStorage === 'undefined') return
        try {
            const saved = localStorage.getItem('transport_history')
            if (saved) {
                uiState.searchHistory = JSON.parse(saved)
            }
        } catch (e) { }
    }

    const loadDraft = () => {
        if (typeof sessionStorage === 'undefined') return
        try {
            const saved = sessionStorage.getItem('journey_draft')
            if (saved) {
                const draft = JSON.parse(saved)
                journeyState.origin = draft.origin || ''
                journeyState.destination = draft.destination || ''
            }
        } catch (e) { }
    }

    // ===== LIFECYCLE =====

    onMounted(() => {
        loadSearchHistory()
        loadDraft()

        uiState.isMobile = window.innerWidth < 768
        const handleResize = () => {
            uiState.isMobile = window.innerWidth < 768
        }
        window.addEventListener('resize', handleResize)

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
        })
    })

    return {
        journeyState,
        searchState,
        resultsState,
        uiState,
        validationState,

        // Computed
        canSearch,
        hasResults,
        sortedOptions,
        cheapestRoute,
        fastestRoute,

        // Actions
        performSearch,
        selectRoute,
        clearSearch,
        resetForm,
        addToSearchHistory,

        // Geo Refs (for Map Binding)
        mapOrigin,
        mapDestination
    }
}
