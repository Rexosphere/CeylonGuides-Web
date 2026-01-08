/**
 * Sri Lanka Accommodation Data Module
 * Structured data extracted from accommodation.md
 */

// =============================================================================
// CITY COORDINATES LOOKUP
// =============================================================================

interface CityCoordinates {
    [key: string]: { lat: number; lng: number }
    
    // West Coast / Colombo Region
    colombo: { lat: number; lng: number }
    negombo: { lat: number; lng: number }
    kotugoda: { lat: number; lng: number }

    // Cultural Triangle
    sigiriya: { lat: number; lng: number }
    dambulla: { lat: number; lng: number }
    anuradhapura: { lat: number; lng: number }
    polonnaruwa: { lat: number; lng: number }
    habarana: { lat: number; lng: number }

    // Hill Country
    kandy: { lat: number; lng: number }
    nuwara_eliya: { lat: number; lng: number }
    ella: { lat: number; lng: number }
    haputale: { lat: number; lng: number }
    matale: { lat: number; lng: number }

    // South Coast
    galle: { lat: number; lng: number }
    tangalle: { lat: number; lng: number }
    dickwella: { lat: number; lng: number }
    mirissa: { lat: number; lng: number }
    weligama: { lat: number; lng: number }
    hikkaduwa: { lat: number; lng: number }
    unawatuna: { lat: number; lng: number }
    udawalawe: { lat: number; lng: number }
    yala: { lat: number; lng: number }

    // East Coast
    trincomalee: { lat: number; lng: number }
    arugam_bay: { lat: number; lng: number }
    batticaloa: { lat: number; lng: number }
    passikudah: { lat: number; lng: number }

    // North
    jaffna: { lat: number; lng: number }
}

export const cityCoordinates: CityCoordinates = {
    // West Coast / Colombo Region
    colombo: { lat: 6.9271, lng: 79.8612 },
    negombo: { lat: 7.2008, lng: 79.8358 },
    kotugoda: { lat: 7.1833, lng: 79.8833 },

    // Cultural Triangle
    sigiriya: { lat: 7.9570, lng: 80.7603 },
    dambulla: { lat: 7.8675, lng: 80.6517 },
    anuradhapura: { lat: 8.3114, lng: 80.4037 },
    polonnaruwa: { lat: 7.9403, lng: 81.0008 },
    habarana: { lat: 8.0383, lng: 80.7517 },

    // Hill Country
    kandy: { lat: 7.2906, lng: 80.6337 },
    nuwara_eliya: { lat: 6.9497, lng: 80.7891 },
    ella: { lat: 6.8667, lng: 81.0466 },
    haputale: { lat: 6.7667, lng: 80.9500 },
    matale: { lat: 7.4675, lng: 80.6234 },

    // South Coast
    galle: { lat: 6.0535, lng: 80.2210 },
    tangalle: { lat: 6.0240, lng: 80.7960 },
    dickwella: { lat: 5.9711, lng: 80.6847 },
    mirissa: { lat: 5.9464, lng: 80.4525 },
    weligama: { lat: 5.9707, lng: 80.4170 },
    hikkaduwa: { lat: 6.1378, lng: 80.1055 },
    unawatuna: { lat: 6.0097, lng: 80.2497 },
    udawalawe: { lat: 6.4386, lng: 80.8989 },
    yala: { lat: 6.3697, lng: 81.5046 },

    // East Coast
    trincomalee: { lat: 8.5874, lng: 81.2152 },
    arugam_bay: { lat: 6.8406, lng: 81.8369 },
    batticaloa: { lat: 7.7310, lng: 81.6747 },
    passikudah: { lat: 7.9167, lng: 81.5500 },

    // North
    jaffna: { lat: 9.6615, lng: 80.0255 },
}

// =============================================================================
// REGION DEFINITIONS
// =============================================================================

export interface Region {
    regionKey: string
    label: string
    highlightNote: string
}

export const regions: Region[] = [
    {
        regionKey: 'west_colombo',
        label: 'Colombo & West Coast',
        highlightNote: 'Gateway city & beach escapes near the airport'
    },
    {
        regionKey: 'cultural_triangle',
        label: 'Cultural Triangle',
        highlightNote: 'Ancient kingdoms, rock fortresses & UNESCO sites'
    },
    {
        regionKey: 'hill_country',
        label: 'Hill Country & Central Highlands',
        highlightNote: 'Tea plantations, cool climate & scenic train rides'
    },
    {
        regionKey: 'south',
        label: 'Southern Coast & Wildlife',
        highlightNote: 'Pristine beaches, colonial Galle & safari parks'
    },
    {
        regionKey: 'east',
        label: 'East Coast',
        highlightNote: 'Surf spots, quieter beaches & diverse culture'
    },
    {
        regionKey: 'north',
        label: 'Northern Province',
        highlightNote: 'Rich Tamil heritage & emerging destinations'
    }
]

// =============================================================================
// STAY INTERFACE
// =============================================================================

export interface Stay {
    id: string
    name: string
    regionKey: string
    district?: string
    city: string
    type: 'hotel' | 'guesthouse' | 'resort' | 'villa' | 'homestay' | 'boutique'
    priceFromUSD: number
    ratingScore10: number
    reviewCount: number
    amenities: string[]
    safetyScore10?: number
    safetyCertified: boolean
    description: string
    source: 'booking' | 'expedia' | 'agoda' | 'direct'
    lat: number
    lng: number
}

// =============================================================================
// STAYS DATA
// =============================================================================

export const stays: Stay[] = [
    // ─────────────────────────────────────────────────────────────────────────────
    // COLOMBO & WEST COAST
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'belmont-boutique-hotel-negombo',
        name: 'Belmont Boutique Hotel',
        regionKey: 'west_colombo',
        district: 'Gampaha',
        city: 'Negombo',
        type: 'hotel',
        priceFromUSD: 99,
        ratingScore10: 9.0,
        reviewCount: 1612,
        amenities: ['pool', 'wifi', 'parking', 'garden', 'airport_shuttle'],
        safetyScore10: 9.0,
        safetyCertified: false,
        description: 'Located in Negombo, a 10-minute walk from Wellaweediya Beach, with outdoor swimming pool, free private parking and a garden.',
        source: 'booking',
        lat: cityCoordinates.negombo.lat,
        lng: cityCoordinates.negombo.lng
    },
    {
        id: 'mango-house-japanese-guesthouse-negombo',
        name: 'Mango House Japanese Guest House',
        regionKey: 'west_colombo',
        district: 'Gampaha',
        city: 'Negombo',
        type: 'guesthouse',
        priceFromUSD: 50,
        ratingScore10: 9.8,
        reviewCount: 1184,
        amenities: ['wifi', 'pool', 'terrace', 'bicycles'],
        safetyScore10: 9.8,
        safetyCertified: false,
        description: 'Providing free bikes, features accommodations with garden views, a terrace and a swimming pool.',
        source: 'booking',
        lat: cityCoordinates.negombo.lat + 0.005,
        lng: cityCoordinates.negombo.lng + 0.003
    },
    {
        id: 'marino-beach-colombo',
        name: 'Marino Beach Colombo',
        regionKey: 'west_colombo',
        district: 'Colombo',
        city: 'Colombo',
        type: 'hotel',
        priceFromUSD: 75,
        ratingScore10: 9.2,
        reviewCount: 10380,
        amenities: ['pool', 'spa', 'gym', 'restaurant', 'wifi', 'parking'],
        safetyScore10: 9.2,
        safetyCertified: false,
        description: 'Located in Colombo, a few steps from Bambalapitiya Beach, with outdoor pool, fitness center and a garden.',
        source: 'booking',
        lat: cityCoordinates.colombo.lat,
        lng: cityCoordinates.colombo.lng
    },
    {
        id: 'swanee-grand-negombo',
        name: 'Swanee Grand',
        regionKey: 'west_colombo',
        district: 'Gampaha',
        city: 'Negombo',
        type: 'hotel',
        priceFromUSD: 78,
        ratingScore10: 9.2,
        reviewCount: 1076,
        amenities: ['pool', 'wifi', 'garden', 'airport_shuttle', 'breakfast'],
        safetyScore10: 9.2,
        safetyCertified: false,
        description: 'Provides accommodations with an outdoor swimming pool, free private parking, a garden and a terrace.',
        source: 'booking',
        lat: cityCoordinates.negombo.lat - 0.003,
        lng: cityCoordinates.negombo.lng + 0.002
    },
    {
        id: 'sebastian-transit-villa-kotugoda',
        name: 'Sebastian Transit Villa',
        regionKey: 'west_colombo',
        district: 'Gampaha',
        city: 'Kotugoda',
        type: 'villa',
        priceFromUSD: 26,
        ratingScore10: 9.6,
        reviewCount: 123,
        amenities: ['aircon', 'patio', 'airport_shuttle', 'wifi'],
        safetyScore10: 9.6,
        safetyCertified: false,
        description: 'With free airport shuttle, ideal for travelers with early flights. Set in Kotugoda with a patio.',
        source: 'booking',
        lat: cityCoordinates.kotugoda.lat,
        lng: cityCoordinates.kotugoda.lng
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // CULTURAL TRIANGLE
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'atha-resort-sigiriya',
        name: 'Atha Resort',
        regionKey: 'cultural_triangle',
        district: 'Matale',
        city: 'Sigiriya',
        type: 'boutique',
        priceFromUSD: 150,
        ratingScore10: 9.6,
        reviewCount: 1293,
        amenities: ['pool', 'spa', 'wifi', 'breakfast', 'lake_views'],
        safetyScore10: 9.6,
        safetyCertified: false,
        description: 'Located in Sigiriya, 3.3 miles from Sigiriya Rock and 5.2 miles from Pidurangala Rock. Luxurious leisure rooms with garden/pool access.',
        source: 'booking',
        lat: cityCoordinates.sigiriya.lat,
        lng: cityCoordinates.sigiriya.lng
    },
    {
        id: 'sigiri-lion-lodge-sigiriya',
        name: 'Sigiri Lion Lodge',
        regionKey: 'cultural_triangle',
        district: 'Matale',
        city: 'Sigiriya',
        type: 'guesthouse',
        priceFromUSD: 23,
        ratingScore10: 9.1,
        reviewCount: 1049,
        amenities: ['aircon', 'sauna', 'wifi', 'parking', 'private_entrance'],
        safetyScore10: 9.1,
        safetyCertified: false,
        description: 'Features accommodations with access to a sauna. Charming accommodation near the rock fortress.',
        source: 'booking',
        lat: cityCoordinates.sigiriya.lat + 0.004,
        lng: cityCoordinates.sigiriya.lng - 0.003
    },
    {
        id: 'royal-rock-sigiriya',
        name: 'Royal Rock Sigiriya',
        regionKey: 'cultural_triangle',
        district: 'Matale',
        city: 'Sigiriya',
        type: 'hotel',
        priceFromUSD: 57,
        ratingScore10: 9.0,
        reviewCount: 1058,
        amenities: ['pool', 'garden', 'wifi', 'parking', 'lounge'],
        safetyScore10: 9.0,
        safetyCertified: false,
        description: 'Provides accommodations with an outdoor swimming pool, free private parking, a garden and a shared lounge. Hilltop views of Sigiriya Rock.',
        source: 'booking',
        lat: cityCoordinates.sigiriya.lat - 0.002,
        lng: cityCoordinates.sigiriya.lng + 0.004
    },
    {
        id: 'il-frangipane-sigiriya',
        name: 'il Frangipane',
        regionKey: 'cultural_triangle',
        district: 'Matale',
        city: 'Sigiriya',
        type: 'boutique',
        priceFromUSD: 99,
        ratingScore10: 9.6,
        reviewCount: 1525,
        amenities: ['pool', 'wifi', 'garden', 'terrace', 'spa'],
        safetyScore10: 9.6,
        safetyCertified: false,
        description: 'Secluded eco-luxury resort with rooftop dining. Provides accommodations with an outdoor swimming pool, a garden and a terrace.',
        source: 'booking',
        lat: cityCoordinates.sigiriya.lat + 0.006,
        lng: cityCoordinates.sigiriya.lng + 0.005
    },
    {
        id: 'heritance-kandalama-dambulla',
        name: 'Heritance Kandalama',
        regionKey: 'cultural_triangle',
        district: 'Matale',
        city: 'Dambulla',
        type: 'resort',
        priceFromUSD: 250,
        ratingScore10: 9.0,
        reviewCount: 663,
        amenities: ['pool', 'spa', 'restaurant', 'wifi', 'gym'],
        safetyScore10: 9.5,
        safetyCertified: true,
        description: 'Architecturally famous 5★ hotel by Geoffrey Bawa, overlooking Kandalama Lake. SLTDA-certified with smoke detectors, fire extinguishers, and safety systems.',
        source: 'expedia',
        lat: cityCoordinates.dambulla.lat + 0.02,
        lng: cityCoordinates.dambulla.lng - 0.03
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // HILL COUNTRY & CENTRAL HIGHLANDS
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'santani-wellness-resort-kandy',
        name: 'Santani Wellness Resort & Spa',
        regionKey: 'hill_country',
        district: 'Kandy',
        city: 'Kandy',
        type: 'boutique',
        priceFromUSD: 300,
        ratingScore10: 9.6,
        reviewCount: 43,
        amenities: ['pool', 'spa', 'yoga', 'wifi', 'restaurant', 'parking'],
        safetyScore10: 9.8,
        safetyCertified: false,
        description: 'Award-winning detox and yoga resort near Kandy. Mountain retreat features spa with detox wraps and aromatherapy.',
        source: 'expedia',
        lat: cityCoordinates.kandy.lat + 0.05,
        lng: cityCoordinates.kandy.lng + 0.03
    },
    {
        id: 'terrace-kandy',
        name: 'Terrace Kandy',
        regionKey: 'hill_country',
        district: 'Kandy',
        city: 'Kandy',
        type: 'guesthouse',
        priceFromUSD: 15,
        ratingScore10: 9.0,
        reviewCount: 145,
        amenities: ['wifi', 'breakfast', 'terrace', 'parking', 'private_entrance'],
        safetyScore10: 9.0,
        safetyCertified: false,
        description: 'Simple, eco-friendly stay with city views. Features free bikes and accommodations in the center of Kandy.',
        source: 'booking',
        lat: cityCoordinates.kandy.lat,
        lng: cityCoordinates.kandy.lng
    },
    {
        id: 'swp-eco-lodge-kandy',
        name: 'SWP Eco Lodge',
        regionKey: 'hill_country',
        district: 'Kandy',
        city: 'Kandy',
        type: 'hotel',
        priceFromUSD: 81,
        ratingScore10: 9.2,
        reviewCount: 1456,
        amenities: ['wifi', 'garden', 'breakfast', 'parking', 'eco_friendly'],
        safetyScore10: 9.2,
        safetyCertified: false,
        description: 'Rustic-chic, sustainably-run lodge near the city. Offers air-conditioned rooms and a garden.',
        source: 'booking',
        lat: cityCoordinates.kandy.lat + 0.008,
        lng: cityCoordinates.kandy.lng - 0.005
    },
    {
        id: 'golden-ridge-nuwara-eliya',
        name: 'The Golden Ridge',
        regionKey: 'hill_country',
        district: 'Nuwara Eliya',
        city: 'Nuwara Eliya',
        type: 'hotel',
        priceFromUSD: 270,
        ratingScore10: 9.2,
        reviewCount: 1238,
        amenities: ['pool', 'gym', 'restaurant', 'wifi', 'mountain_views'],
        safetyScore10: 9.2,
        safetyCertified: false,
        description: 'Set among scenic landscapes of a tea plantation with heated indoor swimming pool and picturesque view of Bambarakelle Mountain.',
        source: 'booking',
        lat: cityCoordinates.nuwara_eliya.lat,
        lng: cityCoordinates.nuwara_eliya.lng
    },
    {
        id: 'suriya-guest-nuwara-eliya',
        name: 'Suriya Guest',
        regionKey: 'hill_country',
        district: 'Nuwara Eliya',
        city: 'Nuwara Eliya',
        type: 'guesthouse',
        priceFromUSD: 50,
        ratingScore10: 9.4,
        reviewCount: 1236,
        amenities: ['parking', 'garden', 'private_bathroom'],
        safetyScore10: 9.4,
        safetyCertified: false,
        description: 'Cozy mountain lodge close to city center, 0.7 mi from Gregory Lake and 4.3 mi from Hakgala Botanical Garden.',
        source: 'booking',
        lat: cityCoordinates.nuwara_eliya.lat + 0.005,
        lng: cityCoordinates.nuwara_eliya.lng + 0.003
    },
    {
        id: 'kandy-living-homestay',
        name: 'Kandy Living Homestay',
        regionKey: 'hill_country',
        district: 'Kandy',
        city: 'Kandy',
        type: 'homestay',
        priceFromUSD: 26,
        ratingScore10: 9.4,
        reviewCount: 483,
        amenities: ['wifi', 'garden', 'parking', 'family_run'],
        safetyScore10: 9.4,
        safetyCertified: false,
        description: 'Warm local hospitality just outside the city. Features accommodation with a garden as well as free private parking.',
        source: 'booking',
        lat: cityCoordinates.kandy.lat - 0.01,
        lng: cityCoordinates.kandy.lng + 0.008
    },
    {
        id: 'surveyors-residence-bungalow-kandy',
        name: "Surveyor's Residence Bungalow",
        regionKey: 'hill_country',
        district: 'Kandy',
        city: 'Kandy',
        type: 'villa',
        priceFromUSD: 136,
        ratingScore10: 9.3,
        reviewCount: 145,
        amenities: ['pool', 'wifi', 'terrace', 'parking', 'tea_views'],
        safetyScore10: 9.3,
        safetyCertified: false,
        description: 'Heritage bungalow with tea-garden views. Features accommodation with a private pool, free WiFi and free private parking.',
        source: 'booking',
        lat: cityCoordinates.kandy.lat + 0.02,
        lng: cityCoordinates.kandy.lng - 0.015
    },

    // ─────────────────────────────────────────────────────────────────────────────
    // SOUTHERN COAST & WILDLIFE
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'brixia-cafe-guest-galle',
        name: 'Brixia Café & Guest',
        regionKey: 'south',
        district: 'Galle',
        city: 'Galle',
        type: 'guesthouse',
        priceFromUSD: 60,
        ratingScore10: 9.5,
        reviewCount: 1158,
        amenities: ['wifi', 'private_bathroom', 'terrace', 'cafe', 'parking'],
        safetyScore10: 9.5,
        safetyCertified: false,
        description: 'Chic urban retreat within Galle Fort area. A 13-minute walk from Mahamodara Beach in the center of Galle.',
        source: 'booking',
        lat: cityCoordinates.galle.lat,
        lng: cityCoordinates.galle.lng
    },
    {
        id: 'kaas-villas-dickwella',
        name: 'Kaas Villas',
        regionKey: 'south',
        district: 'Matara',
        city: 'Dickwella',
        type: 'villa',
        priceFromUSD: 235,
        ratingScore10: 9.6,
        reviewCount: 166,
        amenities: ['pool', 'garden', 'bathtub', 'wifi', 'kitchen'],
        safetyScore10: 9.6,
        safetyCertified: false,
        description: 'Seaside hideaway near unspoiled beaches. Recently renovated 2BR villa with private pool, open-air bath and garden.',
        source: 'booking',
        lat: cityCoordinates.dickwella.lat,
        lng: cityCoordinates.dickwella.lng
    },
    {
        id: 'finch-tangalle',
        name: 'Finch Tangalle',
        regionKey: 'south',
        district: 'Hambantota',
        city: 'Tangalle',
        type: 'villa',
        priceFromUSD: 53,
        ratingScore10: 9.5,
        reviewCount: 248,
        amenities: ['aircon', 'private_bathroom', 'wifi', 'garden'],
        safetyScore10: 9.5,
        safetyCertified: false,
        description: 'Modern design near Tangalle beaches. Within less than 1 km of Red Beach and 12 km of Hummanaya Blow Hole.',
        source: 'booking',
        lat: cityCoordinates.tangalle.lat,
        lng: cityCoordinates.tangalle.lng
    },
    {
        id: 'hanguk-lanka-lagoon-villa-tangalle',
        name: 'Hanguk Lanka Lagoon Villa',
        regionKey: 'south',
        district: 'Hambantota',
        city: 'Tangalle',
        type: 'villa',
        priceFromUSD: 32,
        ratingScore10: 9.9,
        reviewCount: 266,
        amenities: ['kitchenette', 'wifi', 'garden', 'lagoon_views'],
        safetyScore10: 9.9,
        safetyCertified: false,
        description: 'Peaceful beachfront bungalow on the lagoon, set within 800 metres of Tangalle Beach.',
        source: 'booking',
        lat: cityCoordinates.tangalle.lat + 0.008,
        lng: cityCoordinates.tangalle.lng - 0.005
    },
    {
        id: 'nature-house-udawalawe',
        name: 'Nature House',
        regionKey: 'south',
        district: 'Ratnapura',
        city: 'Udawalawe',
        type: 'guesthouse',
        priceFromUSD: 45,
        ratingScore10: 9.7,
        reviewCount: 1494,
        amenities: ['wifi', 'terrace', 'garden', 'rustic'],
        safetyScore10: 9.7,
        safetyCertified: false,
        description: 'Perfect base for safari tours of Udawalawe National Park. Offers rustic accommodations with spacious private terrace.',
        source: 'booking',
        lat: cityCoordinates.udawalawe.lat,
        lng: cityCoordinates.udawalawe.lng
    },
    {
        id: 'pearls-homestay-matale',
        name: "Pearl's Homestay",
        regionKey: 'hill_country',
        district: 'Matale',
        city: 'Matale',
        type: 'homestay',
        priceFromUSD: 19,
        ratingScore10: 9.5,
        reviewCount: 316,
        amenities: ['wifi', 'garden', 'mountain_views', 'kitchen'],
        safetyScore10: 9.5,
        safetyCertified: false,
        description: 'Authentic country lodging in the spice-trail town. Recently renovated holiday home with garden and views of mountain.',
        source: 'booking',
        lat: cityCoordinates.matale.lat,
        lng: cityCoordinates.matale.lng
    }
]

// =============================================================================
// HELPER UTILITIES
// =============================================================================

/**
 * Price tier thresholds (USD)
 */
export const priceTiers = {
    budget: { min: 0, max: 30, label: 'Budget' },
    mid: { min: 30, max: 100, label: 'Mid-Range' },
    luxury: { min: 100, max: Infinity, label: 'Luxury' }
} as const

export type PriceTier = keyof typeof priceTiers

/**
 * Get price tier for a given USD amount
 */
export function getPriceTier(priceUSD: number): PriceTier {
    if (priceUSD < priceTiers.budget.max) return 'budget'
    if (priceUSD < priceTiers.mid.max) return 'mid'
    return 'luxury'
}

/**
 * Get price tier label
 */
export function getPriceTierLabel(priceUSD: number): string {
    return priceTiers[getPriceTier(priceUSD)].label
}

/**
 * Amenity icon and label mapping
 */
export const amenityLabels: Record<string, { icon: string; label: string }> = {
    pool: { icon: 'pool', label: 'Pool' },
    spa: { icon: 'spa', label: 'Spa' },
    wifi: { icon: 'wifi', label: 'Free WiFi' },
    restaurant: { icon: 'restaurant', label: 'Restaurant' },
    garden: { icon: 'yard', label: 'Garden' },
    parking: { icon: 'local_parking', label: 'Parking' },
    breakfast: { icon: 'free_breakfast', label: 'Breakfast' },
    airport_shuttle: { icon: 'airport_shuttle', label: 'Airport Shuttle' },
    gym: { icon: 'fitness_center', label: 'Gym' },
    aircon: { icon: 'ac_unit', label: 'A/C' },
    terrace: { icon: 'deck', label: 'Terrace' },
    bicycles: { icon: 'pedal_bike', label: 'Free Bikes' },
    sauna: { icon: 'hot_tub', label: 'Sauna' },
    yoga: { icon: 'self_improvement', label: 'Yoga' },
    lounge: { icon: 'weekend', label: 'Lounge' },
    kitchen: { icon: 'kitchen', label: 'Kitchen' },
    kitchenette: { icon: 'countertops', label: 'Kitchenette' },
    bathtub: { icon: 'bathtub', label: 'Bathtub' },
    patio: { icon: 'deck', label: 'Patio' },
    lake_views: { icon: 'water', label: 'Lake Views' },
    mountain_views: { icon: 'landscape', label: 'Mountain Views' },
    lagoon_views: { icon: 'water', label: 'Lagoon Views' },
    tea_views: { icon: 'local_cafe', label: 'Tea Garden Views' },
    private_entrance: { icon: 'door_front', label: 'Private Entrance' },
    private_bathroom: { icon: 'bathroom', label: 'Private Bathroom' },
    cafe: { icon: 'local_cafe', label: 'Café' },
    rustic: { icon: 'cabin', label: 'Rustic Style' },
    eco_friendly: { icon: 'eco', label: 'Eco-Friendly' },
    family_run: { icon: 'family_restroom', label: 'Family Run' }
}

/**
 * Get formatted amenity with icon
 */
export function getAmenityInfo(amenityKey: string): { icon: string; label: string } {
    return amenityLabels[amenityKey] || { icon: 'check', label: amenityKey.replace(/_/g, ' ') }
}

/**
 * Filter stays by region
 */
export function getStaysByRegion(regionKey: string): Stay[] {
    return stays.filter(s => s.regionKey === regionKey)
}

/**
 * Filter stays by price tier
 */
export function getStaysByPriceTier(tier: PriceTier): Stay[] {
    const { min, max } = priceTiers[tier]
    return stays.filter(s => s.priceFromUSD >= min && s.priceFromUSD < max)
}

/**
 * Filter stays by type
 */
export function getStaysByType(type: Stay['type']): Stay[] {
    return stays.filter(s => s.type === type)
}

/**
 * Get stays with safety certification
 */
export function getSafetyCertifiedStays(): Stay[] {
    return stays.filter(s => s.safetyCertified)
}

/**
 * Search stays by name or city
 */
export function searchStays(query: string): Stay[] {
    const q = query.toLowerCase()
    return stays.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    )
}

/**
 * Get coordinates for a city name
 */
export function getCityCoordinates(cityName: string): { lat: number; lng: number } | null {
    const key = cityName.toLowerCase().replace(/\s+/g, '_')
    return cityCoordinates[key] || null
}

// =============================================================================
// SUMMARY STATISTICS
// =============================================================================

export const staysSummary = {
    totalCount: stays.length,
    byRegion: regions.map(r => ({
        regionKey: r.regionKey,
        label: r.label,
        count: stays.filter(s => s.regionKey === r.regionKey).length
    })),
    byType: ['hotel', 'guesthouse', 'resort', 'villa', 'homestay', 'boutique'].map(type => ({
        type,
        count: stays.filter(s => s.type === type).length
    })),
    byPriceTier: (['budget', 'mid', 'luxury'] as PriceTier[]).map(tier => ({
        tier,
        label: priceTiers[tier].label,
        count: getStaysByPriceTier(tier).length
    })),
    priceRange: {
        min: Math.min(...stays.map(s => s.priceFromUSD)),
        max: Math.max(...stays.map(s => s.priceFromUSD)),
        avg: Math.round(stays.reduce((sum, s) => sum + s.priceFromUSD, 0) / stays.length)
    },
    ratingRange: {
        min: Math.min(...stays.map(s => s.ratingScore10)),
        max: Math.max(...stays.map(s => s.ratingScore10)),
        avg: parseFloat((stays.reduce((sum, s) => sum + s.ratingScore10, 0) / stays.length).toFixed(1))
    },
    safetyCertifiedCount: getSafetyCertifiedStays().length
}
