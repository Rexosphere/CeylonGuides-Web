/**
 * Structured Dining Dataset
 * Derived from dining.md - Clean & Hygienic Restaurants in Sri Lanka
 */

// ============================================================================
// Types
// ============================================================================

export type CertificationType =
    | 'SafeAndSecure'
    | 'TouristFriendlyGradeA'
    | 'TouristFriendlyGradeB'
    | 'Unknown'

export type FeatureTag =
    | 'vegetarian'
    | 'vegan'
    | 'halal'
    | 'gluten_free'
    | 'outdoor'
    | 'wifi'
    | 'family_friendly'
    | 'premium'
    | 'seafood'
    | 'bar'
    | 'budget_friendly'
    | 'scenic_view'
    | 'credit_cards'
    | 'air_conditioned'
    | 'pork_free'

export interface Coordinates {
    lat: number
    lon: number
}

export interface Restaurant {
    id: string
    name: string
    cuisineType: string
    certificationType: CertificationType
    hygieneScore: number // 1-5
    city: string
    area: string | null
    description: string
    features: FeatureTag[]
    tags: string[] // UI display chips
    sourceLinks: string[]
    coordinates: Coordinates | null
    image: string
}

// ============================================================================
// Helper Functions
// ============================================================================

function normalizeCertification(raw: string): { type: CertificationType; score: number } {
    const lower = raw.toLowerCase()

    if (lower.includes('safe & secure') || lower.includes('safe and secure')) {
        return { type: 'SafeAndSecure', score: 5 }
    }
    if (lower.includes('grade a')) {
        return { type: 'TouristFriendlyGradeA', score: 5 }
    }
    if (lower.includes('grade b')) {
        return { type: 'TouristFriendlyGradeB', score: 4 }
    }
    return { type: 'Unknown', score: 3 }
}

function generateId(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 50)
}

function parseFeatures(featuresRaw: string, cuisineType: string): FeatureTag[] {
    const features: FeatureTag[] = []
    const lower = (featuresRaw + ' ' + cuisineType).toLowerCase()

    if (lower.includes('vegetarian')) features.push('vegetarian')
    if (lower.includes('vegan')) features.push('vegan')
    if (lower.includes('halal')) features.push('halal')
    if (lower.includes('gluten-free') || lower.includes('gluten free')) features.push('gluten_free')
    if (lower.includes('outdoor') || lower.includes('terrace')) features.push('outdoor')
    if (lower.includes('wi-fi') || lower.includes('wifi')) features.push('wifi')
    if (lower.includes('family')) features.push('family_friendly')
    if (lower.includes('premium') || lower.includes('heritage')) features.push('premium')
    if (lower.includes('seafood')) features.push('seafood')
    if (lower.includes('bar') || lower.includes('beer') || lower.includes('cocktail')) features.push('bar')
    if (lower.includes('budget') || lower.includes('value')) features.push('budget_friendly')
    if (lower.includes('view') || lower.includes('scenic') || lower.includes('waterfall')) features.push('scenic_view')
    if (lower.includes('credit card')) features.push('credit_cards')
    if (lower.includes('a/c') || lower.includes('air-conditioned')) features.push('air_conditioned')
    if (lower.includes('pork-free') || lower.includes('pork free')) features.push('pork_free')

    return features
}

function generateTags(cuisineType: string, features: FeatureTag[], certType: CertificationType): string[] {
    const tags: string[] = []

    // Add cuisine type as first tag
    const cuisineParts = cuisineType.split('/')
    const firstPart = cuisineParts[0] ?? ''
    const cuisineMain = (firstPart.split('(')[0] ?? '').trim()
    if (cuisineMain) tags.push(cuisineMain)

    // Add feature-based tags
    if (features.includes('vegetarian')) tags.push('Vegetarian')
    if (features.includes('halal')) tags.push('Halal')
    if (features.includes('seafood')) tags.push('Seafood')
    if (features.includes('gluten_free')) tags.push('Gluten-Free')
    if (features.includes('outdoor')) tags.push('Outdoor Seating')
    if (features.includes('wifi')) tags.push('Wi-Fi')
    if (features.includes('premium')) tags.push('Premium')
    if (features.includes('budget_friendly')) tags.push('Budget')
    if (features.includes('scenic_view')) tags.push('Scenic View')

    // Add certification tag
    if (certType === 'SafeAndSecure') tags.push('Safe & Secure')
    if (certType === 'TouristFriendlyGradeA') tags.push('Grade A')
    if (certType === 'TouristFriendlyGradeB') tags.push('Grade B')

    return tags.slice(0, 5) // Limit to 5 tags for UI
}

// ============================================================================
// Restaurant Data (from dining.md)
// ============================================================================

export const restaurants: Restaurant[] = [
    {
        id: generateId('Paradise Road The Gallery Cafe'),
        name: 'Paradise Road The Gallery Café',
        cuisineType: 'International / European',
        ...normalizeCertification('SLTDA "Safe & Secure" (COVID-safe protocols)'),
        get certificationType() { return normalizeCertification('SLTDA "Safe & Secure"').type },
        get hygieneScore() { return normalizeCertification('SLTDA "Safe & Secure"').score },
        city: 'Colombo',
        area: 'Colombo 7',
        description: 'Stylish café in a Geoffrey Bawa heritage building offering international and Sri Lankan dishes. Famous for cocktails and desserts (e.g. bomba ila aluwa, jaggery sweets) and consistently "good food".',
        features: parseFeatures('Outdoor seating, gluten‑free & vegetarian options', 'International / European (Vegetarian-friendly)'),
        tags: [],
        sourceLinks: ['tripadvisor.com', 'srilanka.travel'],
        coordinates: { lat: 6.9054, lon: 79.8660 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOyJB0PUaR1LeNhV5kSLLX-t9dLJkClvwTnhPl7x6gq38QU6xKQTBg7Ve4MMbDUhHJwzYP_OWA8R073ZfZgRDHgCxNVl2y981AAxlwcJAS7d8QTBjT_gl3zFW6lY2DMVVdaDlI7obiA4NaujRXmBNuwHPk40mS82gNYqCjv3zxGlX6ynGHdcW9VHmUromJ2sCvY86e_YiFZpQJeJ6L9dZ7BZsJG_QAvRZCkj7hR6caYyGII2AJwsdYB0N_aKQaFIS0nx-t4dsc-k4'
    },
    {
        id: generateId('A Minute By Tuk Tuk'),
        name: 'A Minute By Tuk Tuk',
        cuisineType: 'Sri Lankan / Seafood',
        certificationType: 'TouristFriendlyGradeA',
        hygieneScore: 5,
        city: 'Galle',
        area: 'Galle Fort',
        description: 'Colorful open-air eatery on the oceanfront (Old Dutch Hospital) with a seafood-centric menu. Specialties include southern-style prawn curries, tuna steaks and other local dishes with creative names. Casual vibe popular with tourists.',
        features: parseFeatures('Sea-view terrace, family-friendly, bar (seafood, beer)', 'Sri Lankan (Seafood-centric; also vegetarian)'),
        tags: [],
        sourceLinks: ['yamu.lk', 'srilanka.travel'],
        coordinates: { lat: 6.0257, lon: 80.2173 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYFjLkWSPHb9yQj3GwN7D4xWEV_LYQs7Eql27oGcdnkVOcHmC3QUG4Bd8w9NtLt_Jft6uNOONmddhd28jSkZbOWWLJlauMJlcBoiQaW8p3CSBcNh20VKy4U9wuqemdi5KQErAjo6uX3NJuBGt54KzXZmLKOhczV8Lvv5dGQk3_zMI25YxWxDwC0cVxcaokNMEzAUSR8EK5bKDmg0Ci_dWKn0riuArya9COCAs60vufTXZnHlhjo26mZp3vLupxIJ_jCnyCkCrm5nc'
    },
    {
        id: generateId('Dinemore Restaurant'),
        name: 'Dinemore Restaurant',
        cuisineType: 'Halal / Middle Eastern / Sri Lankan',
        certificationType: 'TouristFriendlyGradeA',
        hygieneScore: 5,
        city: 'Colombo',
        area: 'Colombo 3 (Thurstan Rd)',
        description: 'Long-standing local chain serving Halal kebabs, shawarma, submarines (meat-filled subs) and other grilled sandwiches. Known for value-for-money Middle Eastern/Sri Lankan fare and quick service.',
        features: parseFeatures('A/C seating, casual family-friendly, some gluten-free sandwiches', 'Halal (Middle Eastern / Sri Lankan snacks)'),
        tags: [],
        sourceLinks: ['life.lk', 'srilanka.travel'],
        coordinates: { lat: 6.9097, lon: 79.8528 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOHd0eHrPpfadjBcE2EH8HccXm4ufhtFweYXeVchLHS2mrKvqoX1X7-V5vQGZsqv6KNBrH7MDkaT7UUoUXrC0GJ_eemg0CYsW5Hz1ApSnK-rFXmxCWR7Ji3_wWl6QcYPhHAdTMOePYSJ29YqN9bOCKS9igfKrPwT9QBADkFDL334DsSntQPTzROeLktRgIPVd9fzl6r09IbjLIMMdqn8rZFtQNZrQEfB_uXkO5DoDcfqsFsm5p9wnmjCK2WdMJIGBPlQWbn2XTwJE'
    },
    {
        id: generateId('Siam House Thai Restaurant'),
        name: 'Siam House Thai Restaurant',
        cuisineType: 'Thai',
        certificationType: 'SafeAndSecure',
        hygieneScore: 5,
        city: 'Colombo',
        area: 'Colombo 4',
        description: 'Popular Thai restaurant offering classic Thai curries, stir-fries and soups. Established since 1993, it is renowned for authentic Thai flavors (e.g. pad Thai, green curry) in a casual setting. Outdoor seating available.',
        features: parseFeatures('Outdoor seating, accepts credit cards, vegetarian options available', 'Thai (Authentic Thai cuisine)'),
        tags: [],
        sourceLinks: ['srilanka.travel'],
        coordinates: { lat: 6.8963, lon: 79.8554 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2xNtC6Msj0wV0Tayt-tD_VIILj7f1Irigig_tna9kLLbT8-yAmzXL7uDX1mX-Mu8FyRfrnVPT8wtNLwicbBZYF3c83iuJZnwt8fQ8SpoWNfszslkw1kJg8Svwc3IO5FYie78bOYCpvDWUafqt0fDRZ844Z1_HSJKr-ZMRfyAgJ98kc6VDgrWi7qCG4Gj4kfQFV7vgIxMbsCNdjMjYfTT2sce-YdFHHUUeUm_BgKc6N_FpNZOpooDYXNTQN94wUkFRTxEiGsobQeA'
    },
    {
        id: generateId('Avandra Family Restaurant'),
        name: 'Avandra Family Restaurant',
        cuisineType: 'Sri Lankan',
        certificationType: 'TouristFriendlyGradeA',
        hygieneScore: 5,
        city: 'Gampaha',
        area: 'Badalgama',
        description: 'Family-run eatery offering hearty Sri Lankan meals. Dishes include rice & curry and local specialties. Earned SLTDA Grade A for hygiene. A no-frills local favorite (rice packets, short eats).',
        features: parseFeatures('Family-friendly, simple setting, pork-free dishes', 'Sri Lankan (Home-style curries)'),
        tags: [],
        sourceLinks: ['srilanka.travel'],
        coordinates: { lat: 7.2147, lon: 79.9954 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOyJB0PUaR1LeNhV5kSLLX-t9dLJkClvwTnhPl7x6gq38QU6xKQTBg7Ve4MMbDUhHJwzYP_OWA8R073ZfZgRDHgCxNVl2y981AAxlwcJAS7d8QTBjT_gl3zFW6lY2DMVVdaDlI7obiA4NaujRXmBNuwHPk40mS82gNYqCjv3zxGlX6ynGHdcW9VHmUromJ2sCvY86e_YiFZpQJeJ6L9dZ7BZsJG_QAvRZCkj7hR6caYyGII2AJwsdYB0N_aKQaFIS0nx-t4dsc-k4'
    },
    {
        id: generateId('Amaka Restaurant'),
        name: 'Amaka Restaurant',
        cuisineType: 'Sri Lankan / Chinese',
        certificationType: 'TouristFriendlyGradeA',
        hygieneScore: 5,
        city: 'Galle',
        area: 'Karandeniya Rd',
        description: 'Roadside diner serving Sri Lankan-Chinese fusion – rice, noodles and curries. Well-rated for cleanliness (Grade A) and caters to local tastes. Simple décor, known locally for generous portions.',
        features: parseFeatures('Budget-friendly, casual seating, open-air stalls', 'Sri Lankan (Mixed menu)'),
        tags: [],
        sourceLinks: ['srilanka.travel'],
        coordinates: { lat: 6.0356, lon: 80.2170 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYFjLkWSPHb9yQj3GwN7D4xWEV_LYQs7Eql27oGcdnkVOcHmC3QUG4Bd8w9NtLt_Jft6uNOONmddhd28jSkZbOWWLJlauMJlcBoiQaW8p3CSBcNh20VKy4U9wuqemdi5KQErAjo6uX3NJuBGt54KzXZmLKOhczV8Lvv5dGQk3_zMI25YxWxDwC0cVxcaokNMEzAUSR8EK5bKDmg0Ci_dWKn0riuArya9COCAs60vufTXZnHlhjo26mZp3vLupxIJ_jCnyCkCrm5nc'
    },
    {
        id: generateId('Addara Family Restaurant'),
        name: 'Addara Family Restaurant',
        cuisineType: 'Sri Lankan',
        certificationType: 'TouristFriendlyGradeB',
        hygieneScore: 4,
        city: 'Matara',
        area: null,
        description: 'Local family-style restaurant serving traditional Sri Lankan rice & curry and hoppers. Certified Tourist-Friendly (Grade B). Popular with locals for breakfast and lunch; simple but very clean.',
        features: parseFeatures('Spacious seating, family-friendly, value meals', 'Sri Lankan (Family-style)'),
        tags: [],
        sourceLinks: ['srilanka.travel'],
        coordinates: { lat: 5.9495, lon: 80.5353 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOHd0eHrPpfadjBcE2EH8HccXm4ufhtFweYXeVchLHS2mrKvqoX1X7-V5vQGZsqv6KNBrH7MDkaT7UUoUXrC0GJ_eemg0CYsW5Hz1ApSnK-rFXmxCWR7Ji3_wWl6QcYPhHAdTMOePYSJ29YqN9bOCKS9igfKrPwT9QBADkFDL334DsSntQPTzROeLktRgIPVd9fzl6r09IbjLIMMdqn8rZFtQNZrQEfB_uXkO5DoDcfqsFsm5p9wnmjCK2WdMJIGBPlQWbn2XTwJE'
    },
    {
        id: generateId('Barista Kandy'),
        name: 'Barista (Kandy)',
        cuisineType: 'Café / Bakery',
        certificationType: 'TouristFriendlyGradeA',
        hygieneScore: 5,
        city: 'Kandy',
        area: 'Kandy City',
        description: 'Branch of Sri Lanka\'s largest coffee chain. Serves espresso-based drinks, teas and Western pastries. Hygienic café environment with Wi-Fi. (Multiple Barista outlets were Grade A certified).',
        features: parseFeatures('Outdoor seating, Wi-Fi, dessert and pastry menu', 'Café / Bakery (Coffee & Snacks)'),
        tags: [],
        sourceLinks: ['life.lk'],
        coordinates: { lat: 7.2906, lon: 80.6337 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2xNtC6Msj0wV0Tayt-tD_VIILj7f1Irigig_tna9kLLbT8-yAmzXL7uDX1mX-Mu8FyRfrnVPT8wtNLwicbBZYF3c83iuJZnwt8fQ8SpoWNfszslkw1kJg8Svwc3IO5FYie78bOYCpvDWUafqt0fDRZ844Z1_HSJKr-ZMRfyAgJ98kc6VDgrWi7qCG4Gj4kfQFV7vgIxMbsCNdjMjYfTT2sce-YdFHHUUeUm_BgKc6N_FpNZOpooDYXNTQN94wUkFRTxEiGsobQeA'
    },
    {
        id: generateId('Mlesna Tea Castle Cafe'),
        name: 'Mlesna Tea Castle Café',
        cuisineType: 'Tea House / Café',
        certificationType: 'SafeAndSecure',
        hygieneScore: 5,
        city: 'Nuwara Eliya',
        area: 'Talawakele',
        description: 'Café at the famed "tea castle" overlooking St. Clair waterfall. Specializes in Ceylon tea and baked goods – butter cake, chocolate cake – and light meals (sandwiches, fish & chips). Popular tea-tasting spot.',
        features: parseFeatures('Scenic terrace with waterfall view, family-friendly, gluten-free tea options', 'Tea House / Café (Bakery, light meals)'),
        tags: [],
        sourceLinks: ['airial.travel', 'srilanka.travel'],
        coordinates: { lat: 6.9497, lon: 80.7891 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOyJB0PUaR1LeNhV5kSLLX-t9dLJkClvwTnhPl7x6gq38QU6xKQTBg7Ve4MMbDUhHJwzYP_OWA8R073ZfZgRDHgCxNVl2y981AAxlwcJAS7d8QTBjT_gl3zFW6lY2DMVVdaDlI7obiA4NaujRXmBNuwHPk40mS82gNYqCjv3zxGlX6ynGHdcW9VHmUromJ2sCvY86e_YiFZpQJeJ6L9dZ7BZsJG_QAvRZCkj7hR6caYyGII2AJwsdYB0N_aKQaFIS0nx-t4dsc-k4'
    },
    {
        id: generateId('Coco Veranda'),
        name: 'Coco Veranda',
        cuisineType: 'Café / International',
        certificationType: 'TouristFriendlyGradeA',
        hygieneScore: 5,
        city: 'Colombo',
        area: 'Colombo 3 (Crescat Blvd)',
        description: 'Part of a homegrown cafe chain. Offers international cuisine (salads, burgers, pastas) in a relaxed cafe setting. Also known for coffee and baked desserts. Certified Grade A for hygiene; popular with expats.',
        features: parseFeatures('Outdoor terrace, vegetarian and gluten-free menu items', 'Café / International'),
        tags: [],
        sourceLinks: ['life.lk'],
        coordinates: { lat: 6.9155, lon: 79.8489 },
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYFjLkWSPHb9yQj3GwN7D4xWEV_LYQs7Eql27oGcdnkVOcHmC3QUG4Bd8w9NtLt_Jft6uNOONmddhd28jSkZbOWWLJlauMJlcBoiQaW8p3CSBcNh20VKy4U9wuqemdi5KQErAjo6uX3NJuBGt54KzXZmLKOhczV8Lvv5dGQk3_zMI25YxWxDwC0cVxcaokNMEzAUSR8EK5bKDmg0Ci_dWKn0riuArya9COCAs60vufTXZnHlhjo26mZp3vLupxIJ_jCnyCkCrm5nc'
    }
]

// Generate tags for each restaurant
restaurants.forEach(r => {
    r.tags = generateTags(r.cuisineType, r.features, r.certificationType)
})

// ============================================================================
// Data Access Utilities
// ============================================================================

/** Get all unique cities */
export function getCities(): string[] {
    return [...new Set(restaurants.map(r => r.city))].sort()
}

/** Get all unique areas */
export function getAreas(): string[] {
    return [...new Set(restaurants.map(r => r.area).filter((a): a is string => a !== null))].sort()
}

/** Get all unique cuisine types */
export function getCuisineTypes(): string[] {
    return [...new Set(restaurants.map(r => r.cuisineType))].sort()
}

/** Get restaurants by certification type */
export function getByTCertification(type: CertificationType): Restaurant[] {
    return restaurants.filter(r => r.certificationType === type)
}

/** Get restaurants by feature */
export function getByFeature(feature: FeatureTag): Restaurant[] {
    return restaurants.filter(r => r.features.includes(feature))
}

/** Get restaurants by city */
export function getByCity(city: string): Restaurant[] {
    return restaurants.filter(r => r.city.toLowerCase() === city.toLowerCase())
}

/** Get restaurant by ID */
export function getById(id: string): Restaurant | undefined {
    return restaurants.find(r => r.id === id)
}

/** Get restaurants with coordinates (for map) */
export function getWithCoordinates(): Restaurant[] {
    return restaurants.filter(r => r.coordinates !== null)
}

// ============================================================================
// Export Default
// ============================================================================

export default restaurants
