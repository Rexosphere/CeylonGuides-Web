/**
 * Safety Mode Data
 * 
 * IMPORTANT: All content sourced from /safetymode.md and /hospital.md
 * Emergency contact numbers verified as of January 2025.
 */

import type {
    EmergencyContact,
    EmergencyPhrase,
    Hospital,
    SafetyModeData
} from '../types/safetyMode'

// ============================================================================
// Emergency Contacts (from safetymode.md)
// ============================================================================

export const emergencyContacts: EmergencyContact[] = [
    {
        id: 'police',
        title: 'Police Emergency',
        number: '119',
        altNumbers: ['118'],
        description: 'National police emergency hotline for immediate assistance with crime, assault, or accidents.',
        icon: 'local_police',
        category: 'police',
        color: 'red'
    },
    {
        id: 'ambulance',
        title: 'Ambulance (Suwa Seriya)',
        number: '1990',
        description: 'Free national emergency medical service. GPS-tracked ambulances, 11-15 min response. Available 24/7.',
        icon: 'emergency',
        category: 'medical',
        color: 'red'
    },
    {
        id: 'tourist',
        title: 'Tourism Hotline / Tourist Police',
        number: '1912',
        altNumbers: ['011-2421052'],
        description: '24/7 English-speaking tourist assistance. Safety advice, travel updates, and emergency coordination.',
        icon: 'support_agent',
        category: 'tourist',
        color: 'orange'
    },
    {
        id: 'disaster',
        title: 'Disaster Management',
        number: '177',
        description: 'For road-related issues, landslides, and natural disaster emergencies.',
        icon: 'warning',
        category: 'disaster',
        color: 'amber'
    },
    {
        id: 'fire',
        title: 'Fire & Rescue',
        number: '110',
        description: 'Alternate Emergency Line for fire and rescue services.',
        icon: 'local_fire_department',
        category: 'police',
        color: 'red'
    }
]

// ============================================================================
// Emergency Phrases (from safetymode.md)
// ============================================================================

export const emergencyPhrases: EmergencyPhrase[] = [
    // HELP category
    {
        id: 'help-1',
        category: 'help',
        english: 'Help!',
        sinhala: 'උදව්!',
        tamil: 'உதவி!',
        pronunciation: 'Udavā! / Utavi!'
    },
    {
        id: 'help-2',
        category: 'help',
        english: 'Help me!',
        sinhala: 'මට උදව් කරන්න!',
        tamil: 'எனக்கு உதவி செய்யுங்கள்!',
        pronunciation: 'Maṭa udav karanna! / Enakku utavi seyyuṅkaḷ!'
    },
    {
        id: 'help-3',
        category: 'help',
        english: 'I need help',
        sinhala: 'මට උදව් ඕන',
        tamil: 'எனக்கு உதவி தேவை',
        pronunciation: 'Mata udaw ona'
    },
    {
        id: 'help-4',
        category: 'help',
        english: 'Can you help me?',
        sinhala: 'මට උදව් කරන්න පුළුවන්ද?',
        pronunciation: 'Mata udaw karanna puluwanda?'
    },
    // MEDICAL category
    {
        id: 'medical-1',
        category: 'medical',
        english: 'Call an ambulance',
        sinhala: 'ඇම්බියුලන්ස් එකට කතා කරන්න',
        pronunciation: 'Ambulance ekakata kathakaranna'
    },
    {
        id: 'medical-2',
        category: 'medical',
        english: 'I need a doctor',
        sinhala: 'මට වෛද්‍යවරයෙක් බලන්න ඕනෙ',
        pronunciation: 'Mama daeāsatara balanana ōnae'
    },
    {
        id: 'medical-3',
        category: 'medical',
        english: 'I am sick / in pain',
        sinhala: 'මට වේදනාව තියෙනවා',
        pronunciation: 'Mata vedanawa thiyenawa'
    },
    {
        id: 'medical-4',
        category: 'medical',
        english: 'Where is the hospital?',
        sinhala: 'රෝහල කොහෙද?',
        tamil: 'மருத்துவமனை எங்கே?',
        pronunciation: 'Rōhala kohēda? / Maruttuvamanai eṅkē?'
    },
    {
        id: 'medical-5',
        category: 'medical',
        english: 'I am allergic',
        sinhala: 'මට ආසාත්මිකයි',
        pronunciation: 'Maṭa āsaātamaikayai'
    },
    // POLICE category
    {
        id: 'police-1',
        category: 'police',
        english: 'Call the police',
        sinhala: 'පොලිසියට කතා කරන්න',
        pronunciation: 'Police-iyata katha karanna'
    },
    {
        id: 'police-2',
        category: 'police',
        english: 'Where is the police station?',
        sinhala: 'පොලිස් ස්ථානය කොහෙද?',
        pronunciation: 'Police sthanaya koheda?'
    },
    // DIRECTIONS category
    {
        id: 'directions-1',
        category: 'directions',
        english: "I'm lost",
        sinhala: 'මම අතරමං වුණා',
        tamil: 'நான் தொலைந்துவிட்டேன்',
        pronunciation: 'Mama atarudahan vunā / Nāṉ tolaintuvittēṉ'
    },
    {
        id: 'directions-2',
        category: 'directions',
        english: 'Where is the toilet?',
        sinhala: 'වැසිකිළිය තියෙන්නේ කොහේද?',
        pronunciation: 'væ∙si∙ki∙li∙yȧ thi∙yén∙né ko∙hé∙dhȧ?'
    },
    // GENERAL category
    {
        id: 'general-1',
        category: 'general',
        english: 'I cannot speak Sinhala',
        sinhala: 'මම සිංහල කතා කරන්න බෑ',
        pronunciation: 'Mama Sinhale katha karanna ba'
    },
    {
        id: 'general-2',
        category: 'general',
        english: 'Thank you',
        sinhala: 'ස්තුතියි / බොහොම ස්තූතියි',
        pronunciation: 'Isthuti / Bohoma sthuthi'
    }
]

// ============================================================================
// Hospitals (from hospital.md with coordinates)
// ============================================================================

export const hospitals: Hospital[] = [
    // COLOMBO - Private
    {
        id: 'lanka-hospitals',
        name: 'Lanka Hospitals',
        location: '578 Elvitigala Mawatha, Narahenpita',
        city: 'Colombo',
        phone: '+94 11 543 0000',
        type: 'private',
        lat: 6.8947,
        lng: 79.8773,
        specialties: ['Cardiac', 'Oncology', 'Imaging'],
        is24hr: true,
        hasInternationalServices: true
    },
    {
        id: 'asiri-central',
        name: 'Asiri Central Hospital',
        location: '114 Norris Canal Road',
        city: 'Colombo',
        phone: '+94 11 466 5500',
        type: 'private',
        lat: 6.9271,
        lng: 79.8612,
        is24hr: true,
        hasInternationalServices: true
    },
    {
        id: 'durdans',
        name: 'Durdans Hospital',
        location: 'Alfred Place',
        city: 'Colombo',
        phone: '+94 11 257 5410',
        type: 'private',
        lat: 6.8995,
        lng: 79.8548,
        is24hr: true,
        hasInternationalServices: true
    },
    {
        id: 'nawaloka',
        name: 'Nawaloka Hospital',
        location: '23 Sri Sugathodaya Mawatha',
        city: 'Colombo',
        phone: '+94 11 254 4444',
        type: 'private',
        lat: 6.9312,
        lng: 79.8489,
        is24hr: true
    },
    // COLOMBO - Public
    {
        id: 'national-hospital',
        name: 'National Hospital of Sri Lanka',
        location: 'Regent Street',
        city: 'Colombo',
        phone: '011-2691111',
        type: 'public',
        lat: 6.9188,
        lng: 79.8669,
        specialties: ['Neurosurgery', 'Cardiology', 'Nephrology', 'Oncology'],
        is24hr: true
    },
    // KANDY
    {
        id: 'teaching-kandy',
        name: 'Teaching Hospital Kandy',
        location: 'William Gopallawa Mawatha',
        city: 'Kandy',
        phone: '081-2222261',
        type: 'public',
        lat: 7.2906,
        lng: 80.6337,
        is24hr: true
    },
    {
        id: 'suwasewana',
        name: 'Suwasewana Hospital',
        location: 'Kandy',
        city: 'Kandy',
        phone: '+94 81 222 2404',
        type: 'private',
        lat: 7.2926,
        lng: 80.6350
    },
    // GALLE
    {
        id: 'karapitiya',
        name: 'Teaching Hospital Karapitiya',
        location: 'Karapitiya',
        city: 'Galle',
        phone: '091-2232267',
        type: 'public',
        lat: 6.0549,
        lng: 80.2068,
        is24hr: true
    },
    // Other regions
    {
        id: 'anuradhapura',
        name: 'Anuradhapura Hospital',
        location: 'Anuradhapura',
        city: 'Anuradhapura',
        phone: '025-2222261',
        type: 'public',
        lat: 8.3114,
        lng: 80.4037,
        is24hr: true
    },
    {
        id: 'badulla',
        name: 'Badulla Hospital',
        location: 'Badulla',
        city: 'Badulla',
        phone: '055-2222261',
        type: 'public',
        lat: 6.9934,
        lng: 81.0550,
        is24hr: true
    }
]

// ============================================================================
// Complete Data Export
// ============================================================================

export const safetyModeData: SafetyModeData = {
    contacts: emergencyContacts,
    phrases: emergencyPhrases,
    hospitals
}

// ============================================================================
// Helper Functions
// ============================================================================

export function getContactsByCategory(category: string): EmergencyContact[] {
    return emergencyContacts.filter(c => c.category === category)
}

export function getPhrasesByCategory(category: string): EmergencyPhrase[] {
    return emergencyPhrases.filter(p => p.category === category)
}

export function getPhraseCategories(): string[] {
    const categories = new Set(emergencyPhrases.map(p => p.category))
    return Array.from(categories)
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
): number {
    const R = 6371 // Earth's radius in km
    const dLat = toRad(lat2 - lat1)
    const dLng = toRad(lng2 - lng1)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

function toRad(deg: number): number {
    return deg * (Math.PI / 180)
}

/**
 * Get nearest hospitals to a given location
 */
export function getNearestHospitals(
    lat: number,
    lng: number,
    limit: number = 3
): (Hospital & { distance: number })[] {
    return hospitals
        .map(h => ({
            ...h,
            distance: calculateDistance(lat, lng, h.lat, h.lng)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, limit)
}

export default safetyModeData
