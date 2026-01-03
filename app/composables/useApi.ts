/**
 * API Composables for CeylonGuide
 * Provides typed access to all backend endpoints
 */

// API Response Types
export interface ApiResponse<T> {
    success: boolean
    data: T
    count?: number
    message?: string
    error?: string
}

export interface Location {
    latitude: number
    longitude: number
    name: string
    district?: string
}

// Phrasebook Types
export interface Phrase {
    id: string
    english: string
    sinhala: string
    tamil: string
    pronunciation: string
    category: string
    cultural_context?: string
    audio_url?: string
}

export interface EtiquetteTip {
    id: string
    title: string
    description: string
    category: string
    do_list: string[]
    dont_list: string[]
    icon_emoji?: string
}

// Scam Types
export interface ScamAlert {
    id: string
    title: string
    description: string
    location: Location
    category: string
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    report_count: number
    is_verified: boolean
    prevention_tips: string[]
    last_reported: string
}

// Restaurant Types
export interface Restaurant {
    id: string
    name: string
    description: string
    location: Location
    category: string
    rating: number
    price_range: string
    is_verified_halal: boolean
    cuisine_types: string[]
    hygiene_rating: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'UNRATED'
    dietary_options: string[]
    review_count: number
    photo_url?: string
}

// Transport Types
export interface FareEstimate {
    origin: string
    destination: string
    distance_km: number
    transport_type: string
    estimated_fare_lkr: number
    fair_range_min: number
    fair_range_max: number
    estimated_duration_minutes: number
    tips: string[]
}

// Safety Types
export interface SafetyAlert {
    id: string
    title: string
    description: string
    alert_type: 'WEATHER' | 'POLITICAL' | 'HEALTH' | 'GENERAL'
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    affected_areas: string[]
    source?: string
    action_required?: string
    issued_at: string
    expires_at: string
}

// Emergency Types
export interface EmergencyContact {
    id: string
    name: string
    phone_number: string
    category: string
    description?: string
    is_available_24x7: boolean
    emoji?: string
}

// Facility Types
export interface Facility {
    id: string
    name: string
    facility_type: 'RESTROOM' | 'BEACH' | 'ATTRACTION'
    location: Location
    average_rating: number
    cleanliness_rating: number
    safety_rating: number
    rating_count: number
    photos: string[]
}

/**
 * Main API composable for accessing CeylonGuide backend
 */
export function useApi() {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBase

    // Generic fetch wrapper with proper Nitro types
    async function apiFetch<T>(
        endpoint: string,
        options: {
            method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
            body?: string
            headers?: Record<string, string>
        } = {}
    ): Promise<ApiResponse<T>> {
        const response = await $fetch<ApiResponse<T>>(`${baseUrl}${endpoint}`, {
            method: options.method,
            body: options.body,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        })
        return response
    }

    // ============================================
    // PHRASES API
    // ============================================
    const phrases = {
        list: (params?: { category?: string; search?: string }) => {
            const query = new URLSearchParams()
            if (params?.category) query.set('category', params.category)
            if (params?.search) query.set('search', params.search)
            const queryStr = query.toString()
            return apiFetch<Phrase[]>(`/api/phrases${queryStr ? `?${queryStr}` : ''}`)
        },

        get: (id: string) => apiFetch<Phrase>(`/api/phrases/${id}`),

        getEtiquetteTips: (category?: string) => {
            const query = category ? `?category=${category}` : ''
            return apiFetch<EtiquetteTip[]>(`/api/phrases/etiquette/tips${query}`)
        },

        getCategories: () =>
            apiFetch<{ category: string; count: number }[]>('/api/phrases/categories/list'),
    }

    // ============================================
    // SCAMS API
    // ============================================
    const scams = {
        list: (params?: {
            category?: string
            severity?: string
            lat?: number
            lng?: number
            radius?: number
        }) => {
            const query = new URLSearchParams()
            if (params?.category) query.set('category', params.category)
            if (params?.severity) query.set('severity', params.severity)
            if (params?.lat) query.set('lat', params.lat.toString())
            if (params?.lng) query.set('lng', params.lng.toString())
            if (params?.radius) query.set('radius', params.radius.toString())
            const queryStr = query.toString()
            return apiFetch<ScamAlert[]>(`/api/scams${queryStr ? `?${queryStr}` : ''}`)
        },

        get: (id: string) => apiFetch<ScamAlert>(`/api/scams/${id}`),

        report: (data: {
            title: string
            description: string
            location_lat: number
            location_lng: number
            location_name: string
            district?: string
            category: string
            severity?: string
            prevention_tips?: string[]
        }) => apiFetch<{ id: string }>('/api/scams', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

        confirm: (id: string) =>
            apiFetch<void>(`/api/scams/${id}/confirm`, { method: 'POST' }),
    }

    // ============================================
    // TRANSPORT API
    // ============================================
    const transport = {
        calculateFare: (data: {
            origin: string
            destination: string
            distance_km: number
            transport_type: 'TUK_TUK' | 'TAXI' | 'BUS' | 'TRAIN' | 'RIDESHARE'
        }) => apiFetch<FareEstimate>('/api/transport/fare', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

        getRoutes: (type?: string) => {
            const query = type ? `?type=${type}` : ''
            return apiFetch<any[]>(`/api/transport/routes${query}`)
        },

        getRates: () => apiFetch<Record<string, { base: number; perKm: number; minFare: number }>>(
            '/api/transport/rates'
        ),
    }

    // ============================================
    // DINING API
    // ============================================
    const dining = {
        list: (params?: {
            category?: string
            dietary?: string
            hygiene?: string
            halal?: boolean
            search?: string
            min_rating?: number
        }) => {
            const query = new URLSearchParams()
            if (params?.category) query.set('category', params.category)
            if (params?.dietary) query.set('dietary', params.dietary)
            if (params?.hygiene) query.set('hygiene', params.hygiene)
            if (params?.halal) query.set('halal', 'true')
            if (params?.search) query.set('search', params.search)
            if (params?.min_rating) query.set('min_rating', params.min_rating.toString())
            const queryStr = query.toString()
            return apiFetch<Restaurant[]>(`/api/dining${queryStr ? `?${queryStr}` : ''}`)
        },

        get: (id: string) => apiFetch<Restaurant>(`/api/dining/${id}`),

        addReview: (restaurantId: string, data: {
            rating: number
            comment?: string
            photo_urls?: string[]
        }) => apiFetch<{ id: string }>(`/api/dining/${restaurantId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

        getCategories: () =>
            apiFetch<{ category: string; count: number }[]>('/api/dining/categories/list'),
    }

    // ============================================
    // SAFETY API
    // ============================================
    const safety = {
        list: (params?: { type?: string; severity?: string; active?: boolean }) => {
            const query = new URLSearchParams()
            if (params?.type) query.set('type', params.type)
            if (params?.severity) query.set('severity', params.severity)
            if (params?.active !== undefined) query.set('active', params.active.toString())
            const queryStr = query.toString()
            return apiFetch<SafetyAlert[]>(`/api/safety${queryStr ? `?${queryStr}` : ''}`)
        },

        get: (id: string) => apiFetch<SafetyAlert>(`/api/safety/${id}`),

        getWeather: (lat?: number, lng?: number) => {
            const query = new URLSearchParams()
            if (lat) query.set('lat', lat.toString())
            if (lng) query.set('lng', lng.toString())
            const queryStr = query.toString()
            return apiFetch<any>(`/api/safety/weather/current${queryStr ? `?${queryStr}` : ''}`)
        },
    }

    // ============================================
    // EMERGENCY API
    // ============================================
    const emergency = {
        list: (category?: string) => {
            const query = category ? `?category=${category}` : ''
            return apiFetch<EmergencyContact[]>(`/api/emergency${query}`)
        },

        getQuickDial: () => apiFetch<EmergencyContact[]>('/api/emergency/quick'),

        getCategories: () =>
            apiFetch<{ category: string; count: number }[]>('/api/emergency/categories/list'),
    }

    // ============================================
    // FACILITIES API
    // ============================================
    const facilities = {
        list: (params?: { type?: string; min_rating?: number; district?: string }) => {
            const query = new URLSearchParams()
            if (params?.type) query.set('type', params.type)
            if (params?.min_rating) query.set('min_rating', params.min_rating.toString())
            if (params?.district) query.set('district', params.district)
            const queryStr = query.toString()
            return apiFetch<Facility[]>(`/api/facilities${queryStr ? `?${queryStr}` : ''}`)
        },

        get: (id: string) => apiFetch<Facility>(`/api/facilities/${id}`),

        rate: (facilityId: string, data: {
            overall_rating: number
            cleanliness_rating: number
            safety_rating: number
            comment?: string
            photo_urls?: string[]
        }) => apiFetch<{ id: string }>(`/api/facilities/${facilityId}/rate`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    }

    // ============================================
    // AI CHAT API
    // ============================================
    const ai = {
        chat: (message: string, sessionId?: string) =>
            apiFetch<{
                session_id: string
                response: string
                suggestions: string[]
                action?: string
            }>('/api/ai/chat', {
                method: 'POST',
                body: JSON.stringify({ message, session_id: sessionId }),
            }),

        getHistory: (sessionId: string) =>
            apiFetch<any[]>(`/api/ai/chat/${sessionId}`),

        getSuggestions: () =>
            apiFetch<{ text: string; category: string }[]>('/api/ai/suggestions'),
    }

    return {
        phrases,
        scams,
        transport,
        dining,
        safety,
        emergency,
        facilities,
        ai,
    }
}
