// Emergency Support Data for Sri Lanka - Parsed from emergency.md
// All data is available offline

export interface EmergencyNumber {
    id: string;
    name: string;
    category: 'police' | 'ambulance' | 'tourist' | 'disaster';
    primaryNumber: string;
    secondaryNumber?: string;
    description: string;
    priority: 'critical' | 'medical' | 'tourist';
    languagesSupported: string[];
    offlineAvailable: true;
}

export interface Embassy {
    country: string;
    missionType: 'embassy' | 'high commission' | 'consulate';
    city: string;
    address: string;
    phone: string;
    emergencyPhone?: string;
    mapCoordinates: {
        lat: number;
        lng: number;
    };
}

export interface EmergencyPhrase {
    intent: 'ambulance' | 'police' | 'help' | 'lost' | 'doctor';
    english: string;
    sinhala: string;
    tamil: string;
    pronunciationHint?: string;
}

export interface Hospital {
    name: string;
    type: 'public' | 'private';
    city: string;
    address: string;
    phone: string;
    emergencyPhone?: string;
    open24h: boolean;
    specialties: string[];
    mapCoordinates: {
        lat: number;
        lng: number;
    };
}

// ============================================================================
// EMERGENCY NUMBERS
// ============================================================================

export const emergencyNumbers: EmergencyNumber[] = [
    {
        id: 'police-119',
        name: 'Police Emergency',
        category: 'police',
        primaryNumber: '119',
        secondaryNumber: '118',
        description: 'Primary police emergency number for crime, assault, traffic accidents. Police will dispatch officers or advise on safety.',
        priority: 'critical',
        languagesSupported: ['Sinhala', 'Tamil', 'English'],
        offlineAvailable: true,
    },
    {
        id: 'ambulance-1990',
        name: 'Suwa Seriya Ambulance',
        category: 'ambulance',
        primaryNumber: '1990',
        secondaryNumber: '011-2691111',
        description: 'Free emergency ambulance service with GPS-tracked ambulances. Average response time of 11-15 minutes. Uses AI to identify the fastest ambulance. Available in Sinhala, English, and Tamil. Works with limited network or no call credit.',
        priority: 'medical',
        languagesSupported: ['Sinhala', 'Tamil', 'English'],
        offlineAvailable: true,
    },
    {
        id: 'tourist-police',
        name: 'Tourist Police',
        category: 'tourist',
        primaryNumber: '011-2421052',
        description: 'Assistance for foreign visitors including lost passport, theft, harassment, and minor disputes. Specially trained to help tourists.',
        priority: 'tourist',
        languagesSupported: ['Sinhala', 'Tamil', 'English'],
        offlineAvailable: true,
    },
    {
        id: 'tourism-hotline',
        name: 'Tourism Hotline 1912',
        category: 'tourist',
        primaryNumber: '1912',
        description: '24/7 tourism emergency and assistance hotline operated by Sri Lanka Tourism. Coordinates with police and disaster management. Provides safety advice, travel updates, and emergency support.',
        priority: 'tourist',
        languagesSupported: ['English'],
        offlineAvailable: true,
    },
    {
        id: 'disaster-management',
        name: 'Disaster Management Centre',
        category: 'disaster',
        primaryNumber: '177',
        description: 'For road-related issues, landslides, flooding, and natural disaster emergencies.',
        priority: 'critical',
        languagesSupported: ['Sinhala', 'Tamil', 'English'],
        offlineAvailable: true,
    },
];

// ============================================================================
// EMBASSIES & HIGH COMMISSIONS
// ============================================================================

export const embassies: Embassy[] = [
    {
        country: 'United States',
        missionType: 'embassy',
        city: 'Colombo',
        address: '210 Galle Road, Colombo 03',
        phone: '+94 (11) 202-8500',
        mapCoordinates: {
            lat: 6.9177,
            lng: 79.8515,
        },
    },
    {
        country: 'United Kingdom',
        missionType: 'high commission',
        city: 'Colombo',
        address: '389 Bauddhaloka Mawatha, Colombo 7',
        phone: '+94 (11) 539 0639',
        mapCoordinates: {
            lat: 6.9045,
            lng: 79.8671,
        },
    },
    {
        country: 'Australia',
        missionType: 'high commission',
        city: 'Colombo',
        address: 'No. 21, Srimath RG Senanayake Mawatha, Colombo 7',
        phone: '+94 (11) 246 3200',
        mapCoordinates: {
            lat: 6.9063,
            lng: 79.8612,
        },
    },
    {
        country: 'Canada',
        missionType: 'high commission',
        city: 'Colombo',
        address: '33A, 5th Lane, Colpetty, Colombo 03',
        phone: '+94 (11) 532 6232',
        mapCoordinates: {
            lat: 6.9114,
            lng: 79.8512,
        },
    },
    {
        country: 'India',
        missionType: 'high commission',
        city: 'Colombo',
        address: '36-38, Galle Road, Colombo 03',
        phone: '+94 (11) 232 7587',
        mapCoordinates: {
            lat: 6.9186,
            lng: 79.8508,
        },
    },
    {
        country: 'India',
        missionType: 'consulate',
        city: 'Kandy',
        address: 'No. 31, Rajapihilla Mawatha, Kandy',
        phone: '+94 (81) 222 4563',
        mapCoordinates: {
            lat: 7.2937,
            lng: 80.6365,
        },
    },
];

// ============================================================================
// EMERGENCY PHRASES
// ============================================================================

export const emergencyPhrases: EmergencyPhrase[] = [
    {
        intent: 'help',
        english: 'Help!',
        sinhala: 'උදව්!',
        tamil: 'உதவி!',
        pronunciationHint: 'Sinhala: "Udavā!" | Tamil: "Utavi!"',
    },
    {
        intent: 'help',
        english: 'Help me!',
        sinhala: 'මට උදව් කරන්න!',
        tamil: 'எனக்கு உதவி செய்யுங்கள்!',
        pronunciationHint: 'Sinhala: "Maṭa udav karanna!" | Tamil: "Enakku utavi seyyuṅkaḷ!"',
    },
    {
        intent: 'lost',
        english: "I'm lost.",
        sinhala: 'මම අතුරුදහන් වුණා',
        tamil: 'நான் தொலைந்துவிட்டேன்',
        pronunciationHint: 'Sinhala: "Mama atarudahan vunā" | Tamil: "Nāṉ tolaintuvittēṉ"',
    },
    {
        intent: 'doctor',
        english: 'Where is the hospital?',
        sinhala: 'රෝහල කොහෙද?',
        tamil: 'மருத்துவமனை எங்கே?',
        pronunciationHint: 'Sinhala: "Rōhala kohēda?" | Tamil: "Maruttuvamanai eṅkē irukkiṟatu?"',
    },
    {
        intent: 'ambulance',
        english: 'Call an ambulance!',
        sinhala: 'ගිලන් රථයක් ගෙන්වන්න!',
        tamil: 'ஆம்புலன்ஸ் அழையுங்கள்!',
        pronunciationHint: 'Sinhala: "Gilan rathayak genvanna!" | Tamil: "Āmpulans aḻaiyuṅkaḷ!"',
    },
    {
        intent: 'police',
        english: 'Call the police!',
        sinhala: 'පොලිසියට කතා කරන්න!',
        tamil: 'காவல்துறையை அழையுங்கள்!',
        pronunciationHint: 'Sinhala: "Polisiyata katha karanna!" | Tamil: "Kāvaltuṟaiyai aḻaiyuṅkaḷ!"',
    },
];

// ============================================================================
// HOSPITALS
// ============================================================================

export const hospitals: Hospital[] = [
    // Colombo - Public
    {
        name: 'National Hospital of Sri Lanka',
        type: 'public',
        city: 'Colombo',
        address: 'Regent Street & Kynsey Road, Colombo 10',
        phone: '011-269 1111',
        emergencyPhone: '011-269 1111',
        open24h: true,
        specialties: ['Neurosurgery', 'Cardiology', 'Nephrology', 'Oncology', 'Trauma', 'General Surgery'],
        mapCoordinates: {
            lat: 6.9167,
            lng: 79.8683,
        },
    },
    // Colombo - Private
    {
        name: 'Lanka Hospitals',
        type: 'private',
        city: 'Colombo',
        address: '578 Elvitigala Mawatha, Colombo 05',
        phone: '011-553 0000',
        emergencyPhone: '011-553 0000',
        open24h: true,
        specialties: ['Cardiology', 'Oncology', 'Advanced Imaging', 'Surgery', 'Multi-specialty'],
        mapCoordinates: {
            lat: 6.8929,
            lng: 79.8747,
        },
    },
    {
        name: 'Asiri Central Hospital',
        type: 'private',
        city: 'Colombo',
        address: 'No. 114 Norris Canal Road, Colombo 10',
        phone: '011-466 5500',
        emergencyPhone: '011-466 5500',
        open24h: true,
        specialties: ['Multi-specialty', 'Patient Safety', 'International Standards'],
        mapCoordinates: {
            lat: 6.9277,
            lng: 79.8692,
        },
    },
    {
        name: 'Durdans Hospital',
        type: 'private',
        city: 'Colombo',
        address: '3 Alfred Place, Colombo 00500',
        phone: '011-541 0000',
        emergencyPhone: '011-541 0000',
        open24h: true,
        specialties: ['JCI Accredited', 'International Patient Services', 'Multi-specialty'],
        mapCoordinates: {
            lat: 6.8998,
            lng: 79.8541,
        },
    },
    {
        name: 'Nawaloka Hospital',
        type: 'private',
        city: 'Colombo',
        address: 'Deshamanya HK Dharmadasa Mawatha, Colombo 00200',
        phone: '011-254 4444',
        emergencyPhone: '011-254 4444',
        open24h: true,
        specialties: ['Diagnostic Imaging', 'Laboratory Services', 'Multi-specialty', 'Corporate Healthcare'],
        mapCoordinates: {
            lat: 6.9326,
            lng: 79.8505,
        },
    },
    {
        name: 'Ninewells Hospital',
        type: 'private',
        city: 'Colombo',
        address: '398/1 Swarnadisi Place, Kirimandala Mawatha, Colombo 05',
        phone: '011-455 6789',
        emergencyPhone: '011-455 6789',
        open24h: true,
        specialties: ['Women Healthcare', 'Childcare', 'Maternity', 'Neonatal'],
        mapCoordinates: {
            lat: 6.8937,
            lng: 79.8692,
        },
    },
    {
        name: 'Kings Hospital Colombo',
        type: 'private',
        city: 'Colombo',
        address: 'Narahenpita, Colombo',
        phone: '011-451 2345',
        emergencyPhone: '011-451 2345',
        open24h: true,
        specialties: ['Multi-specialty', 'International Standards'],
        mapCoordinates: {
            lat: 6.8976,
            lng: 79.8773,
        },
    },
    // Kandy
    {
        name: 'Teaching Hospital Kandy',
        type: 'public',
        city: 'Kandy',
        address: 'William Gopallawa Mawatha, Kandy',
        phone: '081-222 2261',
        emergencyPhone: '081-222 2261',
        open24h: true,
        specialties: ['General Surgery', 'Medicine', 'Obstetrics', 'Pediatrics', 'Trauma'],
        mapCoordinates: {
            lat: 7.2894,
            lng: 80.6338,
        },
    },
    // Galle
    {
        name: 'Teaching Hospital Karapitiya',
        type: 'public',
        city: 'Galle',
        address: 'Karapitiya, Galle',
        phone: '091-223 2267',
        emergencyPhone: '091-223 2267',
        open24h: true,
        specialties: ['General Surgery', 'Medicine', 'Obstetrics', 'Pediatrics', 'Tertiary Care'],
        mapCoordinates: {
            lat: 6.0505,
            lng: 80.2137,
        },
    },
    // Other regions
    {
        name: 'Anuradhapura Teaching Hospital',
        type: 'public',
        city: 'Anuradhapura',
        address: 'Anuradhapura',
        phone: '025-222 2261',
        emergencyPhone: '025-222 2261',
        open24h: true,
        specialties: ['General Surgery', 'Medicine', 'Obstetrics', 'Pediatrics'],
        mapCoordinates: {
            lat: 8.3355,
            lng: 80.4103,
        },
    },
    {
        name: 'Badulla General Hospital',
        type: 'public',
        city: 'Badulla',
        address: 'Badulla',
        phone: '055-222 2261',
        emergencyPhone: '055-222 2262',
        open24h: true,
        specialties: ['General Surgery', 'Medicine', 'Obstetrics', 'Pediatrics'],
        mapCoordinates: {
            lat: 6.9895,
            lng: 81.0557,
        },
    },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get emergency numbers by category
 */
export function getEmergencyNumbersByCategory(category: EmergencyNumber['category']): EmergencyNumber[] {
    return emergencyNumbers.filter((num) => num.category === category);
}

/**
 * Get emergency numbers by priority
 */
export function getEmergencyNumbersByPriority(priority: EmergencyNumber['priority']): EmergencyNumber[] {
    return emergencyNumbers.filter((num) => num.priority === priority);
}

/**
 * Get hospitals by city
 */
export function getHospitalsByCity(city: string): Hospital[] {
    return hospitals.filter((h) => h.city.toLowerCase() === city.toLowerCase());
}

/**
 * Get hospitals by type
 */
export function getHospitalsByType(type: Hospital['type']): Hospital[] {
    return hospitals.filter((h) => h.type === type);
}

/**
 * Get 24-hour hospitals
 */
export function get24HourHospitals(): Hospital[] {
    return hospitals.filter((h) => h.open24h);
}

/**
 * Get emergency phrases by intent
 */
export function getEmergencyPhrasesByIntent(intent: EmergencyPhrase['intent']): EmergencyPhrase[] {
    return emergencyPhrases.filter((p) => p.intent === intent);
}

/**
 * Get embassy by country
 */
export function getEmbassyByCountry(country: string): Embassy | undefined {
    return embassies.find((e) => e.country.toLowerCase() === country.toLowerCase());
}

/**
 * Get all data for offline caching
 */
export function getAllEmergencyData() {
    return {
        emergencyNumbers,
        embassies,
        emergencyPhrases,
        hospitals,
    };
}
