// Restroom Facility Data - Parsed from facilities.md
// This module contains structured restroom data for Sri Lanka

export interface RestroomFees {
    isFree: boolean
    amountLKR: number | null
    rulesNotes: string
}

export interface RestroomAccessibility {
    wheelchairAccessible: boolean | null  // null = unknown
    notes: string
}

export interface Restroom {
    id: string
    name: string
    city: string
    area: string | null
    type: 'restroom'
    accessibility: RestroomAccessibility
    communityRating: number  // 0-5
    reviewCount: number | null
    communityNotes: string
    fees: RestroomFees
    sourceLinks: string[]
    coordinates: { lat: number; lon: number } | null
}

// Parse rating string like "Rated ~4.1/5 (15 reviews)" into { rating, reviewCount }
function parseRating(ratingStr: string): { rating: number; reviewCount: number | null } {
    const ratingMatch = ratingStr.match(/~?(\d+\.?\d*)\/5/)
    const reviewMatch = ratingStr.match(/\((\d+)\s*review/)

    return {
        rating: ratingMatch && ratingMatch[1] ? parseFloat(ratingMatch[1]) : 0,
        reviewCount: reviewMatch && reviewMatch[1] ? parseInt(reviewMatch[1]) : null
    }
}

// Parse fee string like "≈Rs 20" or "LKR 1,500" into amountLKR
function parseFeeAmount(feeStr: string): number | null {
    // Match patterns like "Rs 20", "≈Rs 20", "LKR 1,500", "~LKR 1500"
    const match = feeStr.match(/[≈~]?\s*(?:Rs|LKR)\s*([\d,]+)/i)
    if (match && match[1]) {
        return parseInt(match[1].replace(/,/g, ''))
    }
    return null
}

// Determine if facility is free
function isFree(feeStr: string): boolean {
    const lowerFee = feeStr.toLowerCase()
    return lowerFee.includes('free') ||
        lowerFee.includes('no charge') ||
        lowerFee.includes('no separate toilet fee')
}

/**
 * Restroom facilities data - parsed and normalized from facilities.md
 */
export const restrooms: Restroom[] = [
    {
        id: 'colombo-fort-public-toilet',
        name: 'Public Toilet (Colombo Fort)',
        city: 'Colombo',
        area: 'Colombo Fort area',
        type: 'restroom',
        accessibility: {
            wheelchairAccessible: null, // Unknown from source
            notes: 'Ground floor; centrally located (Colombo Fort area)'
        },
        communityRating: 4.1,
        reviewCount: 15,
        communityNotes: 'Maintained by city authorities; users report it is generally clean.',
        fees: {
            isFree: false,
            amountLKR: 20,
            rulesNotes: 'Small use fee (≈Rs 20) or donation required. Ladies\' & men\'s sections.'
        },
        sourceLinks: ['rentechdigital.com'],
        coordinates: { lat: 6.9344, lon: 79.8428 }
    },
    {
        id: 'makumbura-multimodal-center',
        name: 'Makumbura Multi-Modal Center',
        city: 'Maharagama',
        area: 'Transport hub',
        type: 'restroom',
        accessibility: {
            wheelchairAccessible: null, // Unknown from source
            notes: 'At suburban transport hub (Maharagama)'
        },
        communityRating: 4.6,
        reviewCount: 8,
        communityNotes: 'Travelers praise cleanliness.',
        fees: {
            isFree: true,
            amountLKR: null,
            rulesNotes: 'Free (no charge); near bus/train interchange.'
        },
        sourceLinks: ['rentechdigital.com'],
        coordinates: { lat: 6.8490, lon: 79.9280 }
    },
    {
        id: 'peradeniya-botanical-gardens',
        name: 'Royal Botanic Gardens Washrooms',
        city: 'Kandy',
        area: 'Peradeniya Gardens',
        type: 'restroom',
        accessibility: {
            wheelchairAccessible: true, // Paved paths mentioned
            notes: 'Inside Peradeniya Gardens (paved paths)'
        },
        communityRating: 4.0,
        reviewCount: 1,
        communityNotes: 'Facilities exist at garden entrance.',
        fees: {
            isFree: true, // No separate toilet fee
            amountLKR: 1500, // Garden entry fee (for reference)
            rulesNotes: 'Botanical Garden entry ~LKR 1,500 (foreigners); no separate toilet fee, shoes off for gardens.'
        },
        sourceLinks: ['rentechdigital.com'],
        coordinates: { lat: 7.2716, lon: 80.5959 }
    }
]

// ============ Helper Functions ============

/**
 * Get all unique cities from restroom data
 */
export function getCities(): string[] {
    const cities = new Set(restrooms.map(r => r.city))
    return Array.from(cities).sort()
}

/**
 * Get restroom by ID
 */
export function getById(id: string): Restroom | undefined {
    return restrooms.find(r => r.id === id)
}

/**
 * Get all free restrooms
 */
export function getFreeRestrooms(): Restroom[] {
    return restrooms.filter(r => r.fees.isFree)
}

/**
 * Get restrooms by city
 */
export function getByCity(city: string): Restroom[] {
    return restrooms.filter(r => r.city === city)
}

/**
 * Get highly rated restrooms (4.0+)
 */
export function getHighlyRated(): Restroom[] {
    return restrooms.filter(r => r.communityRating >= 4.0)
}

/**
 * Get wheelchair accessible restrooms
 */
export function getWheelchairAccessible(): Restroom[] {
    return restrooms.filter(r => r.accessibility.wheelchairAccessible === true)
}

/**
 * Search restrooms by query string
 */
export function searchRestrooms(query: string): Restroom[] {
    const lowerQuery = query.toLowerCase()
    return restrooms.filter(r =>
        r.name.toLowerCase().includes(lowerQuery) ||
        r.city.toLowerCase().includes(lowerQuery) ||
        (r.area?.toLowerCase().includes(lowerQuery) ?? false) ||
        r.communityNotes.toLowerCase().includes(lowerQuery)
    )
}
