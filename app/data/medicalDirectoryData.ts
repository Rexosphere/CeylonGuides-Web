/**
 * Medical Directory Data
 * Source: hospital.md
 * 
 * This file exports structured data parsed from hospital.md.
 * All hospital names, phone numbers, addresses, and emergency numbers
 * are sourced directly from the markdown file.
 * 
 * Last updated: 2025-01-09
 */

import type {
    MedicalDirectoryData,
    EmergencyService,
    Hospital,
    HealthAlert,
    Vaccination,
    InsuranceCoverage,
    PackingItem
} from '~/types/medical'

// ============================================================================
// EMERGENCY SERVICES
// ============================================================================

export const emergencyServices: EmergencyService[] = [
    {
        id: 'suwa-seriya',
        name: 'Suwa Seriya Ambulance',
        phone: '1990',
        note: 'Free national ambulance service with GPS tracking',
        isPrimary: true
    },
    {
        id: 'alternative-ambulance',
        name: 'Alternative Ambulance',
        phone: '011-2691111',
        note: 'National Hospital direct line',
        isPrimary: false
    },
    {
        id: 'police-emergency',
        name: 'Police Emergency',
        phone: '119',
        note: 'Also available on 118',
        isPrimary: true
    },
    {
        id: 'tourism-hotline',
        name: 'Tourism Hotline',
        phone: '1912',
        note: '24/7 assistance in English',
        isPrimary: true
    }
]

// ============================================================================
// HOSPITALS
// ============================================================================

export const hospitals: Hospital[] = [
    // COLOMBO - PRIVATE HOSPITALS
    {
        id: 'lanka-hospitals',
        name: 'Lanka Hospitals',
        city: 'Colombo',
        region: 'Western',
        type: 'private',
        address: '578 Elvitigala Mawatha, Narahenpita, Colombo 05',
        phone: '+94 11 543 0000',
        specialties: [
            'Cardiac care',
            'Advanced imaging',
            'Oncology',
            'Comprehensive surgical facilities'
        ],
        notes: [
            'Formerly known as Apollo',
            'Multi-specialty tertiary care hospital',
            'One of the largest private hospitals in the country',
            'Subsidiary of Sri Lanka Insurance Corporation'
        ],
        accreditation: [],
        hasInternationalPatientServices: true,
        is24_7: true,
        lat: 6.8914,
        lng: 79.8773
    },
    {
        id: 'asiri-central',
        name: 'Asiri Central Hospital',
        city: 'Colombo',
        region: 'Western',
        type: 'private',
        address: 'No. 114 Norris Canal Road, Colombo 10',
        phone: '+94 11 466 5500',
        specialties: [],
        notes: [
            'Leading private healthcare provider',
            'Network of 6 internationally accredited hospitals in Colombo, Kandy, Galle, and Matara',
            'Asiri Port City Hospital opening in 2027'
        ],
        accreditation: ['International accreditation for Patient Safety and Care'],
        hasInternationalPatientServices: true,
        is24_7: true,
        lat: 6.9271,
        lng: 79.8612
    },
    {
        id: 'durdans',
        name: 'Durdans Hospital',
        city: 'Colombo',
        region: 'Western',
        type: 'private',
        address: 'Colombo 00500',
        phone: '+94 11 254 0000',
        specialties: [],
        notes: [
            'Founded in 1945',
            '2nd most loved hospital in Sri Lanka',
            '15th among all service sector brands',
            'Dedicated international patient team',
            'Coordinates hospital stay, insurance coverage, airport transfers, and hotel accommodation'
        ],
        accreditation: ['JCI-accredited (meets international healthcare standards)'],
        hasInternationalPatientServices: true,
        is24_7: true,
        lat: 6.9147,
        lng: 79.8536
    },
    {
        id: 'nawaloka',
        name: 'Nawaloka Hospital',
        city: 'Colombo',
        region: 'Western',
        type: 'private',
        address: 'Colombo 00200',
        phone: '+94 11 254 4444',
        specialties: [
            'Diagnostic imaging',
            'Laboratory services'
        ],
        notes: [
            'Hundreds of beds',
            'Busy outpatient department',
            'Large pool of visiting consultants',
            'Faster test results',
            'Primary users: Corporate clients and insured expats'
        ],
        accreditation: [],
        hasInternationalPatientServices: true,
        is24_7: true,
        lat: 6.9344,
        lng: 79.8428
    },
    {
        id: 'ninewells',
        name: 'Ninewells Hospital',
        city: 'Colombo',
        region: 'Western',
        type: 'private',
        address: '398/1 Swarnadisi Place, Kirimandala Mawatha, Colombo 05',
        phone: '+94 11 450 4504',
        specialties: [
            'Women and Childcare',
            'Maternity services'
        ],
        notes: [
            'Only dedicated Women and Childcare private hospital in Sri Lanka',
            'Over 500 monthly baby deliveries'
        ],
        accreditation: [],
        hasInternationalPatientServices: false,
        is24_7: true,
        lat: 6.8883,
        lng: 79.8750
    },
    {
        id: 'kings-colombo',
        name: 'Kings Hospital Colombo',
        city: 'Colombo',
        region: 'Western',
        type: 'private',
        address: 'Narahenpita, Colombo',
        phone: '+94 11 269 3693',
        specialties: [
            'Multi-specialty care'
        ],
        notes: [
            'Ultra-modern multi-specialty 120-bedded corporate hospital',
            'International standards of medical care'
        ],
        accreditation: [],
        hasInternationalPatientServices: true,
        is24_7: true,
        lat: 6.8970,
        lng: 79.8720
    },

    // COLOMBO - PUBLIC HOSPITAL
    {
        id: 'national-hospital-colombo',
        name: 'National Hospital of Sri Lanka',
        city: 'Colombo',
        region: 'Western',
        type: 'public',
        address: 'Regent Street & Kynsey Road, Colombo 10',
        phone: '011-2691111',
        specialties: [
            'Neurosurgery',
            'Cardiology',
            'Nephrology',
            'Oncology',
            'Major trauma'
        ],
        notes: [
            'Largest public hospital in Sri Lanka',
            'Top referral center for major trauma and complex cases',
            'Thousands of beds',
            'Backbone of government hospital system'
        ],
        accreditation: [],
        hasInternationalPatientServices: false,
        is24_7: true,
        lat: 6.9167,
        lng: 79.8667
    },

    // KANDY HOSPITALS
    {
        id: 'teaching-hospital-kandy',
        name: 'Teaching Hospital Kandy',
        city: 'Kandy',
        region: 'Central',
        type: 'public',
        address: 'William Gopallawa Mawatha, Kandy',
        phone: '081-2222261',
        specialties: [],
        notes: [
            'Largest hospital in the Central Province',
            'Handles most local emergencies',
            'Private clinics and smaller hospitals also available in the city'
        ],
        accreditation: [],
        hasInternationalPatientServices: false,
        is24_7: true,
        lat: 7.2906,
        lng: 80.6337
    },
    {
        id: 'suwasewana-kandy',
        name: 'Suwasewana Hospital',
        city: 'Kandy',
        region: 'Central',
        type: 'private',
        address: 'Kandy',
        phone: '+94 81 222 2404',
        specialties: [],
        notes: [],
        accreditation: [],
        hasInternationalPatientServices: false,
        is24_7: true,
        lat: 7.2906,
        lng: 80.6337
    },

    // GALLE HOSPITALS
    {
        id: 'karapitiya-galle',
        name: 'Teaching Hospital, Karapitiya',
        city: 'Galle',
        region: 'Southern',
        type: 'public',
        address: 'Karapitiya, Galle',
        phone: '091-2232267',
        specialties: [],
        notes: [
            'Main tertiary care center for the Southern Province',
            'Major facility for Galle and surrounding tourist areas',
            'Tourist areas have clinics, but Karapitiya is the major facility'
        ],
        accreditation: [],
        hasInternationalPatientServices: false,
        is24_7: true,
        lat: 6.0535,
        lng: 80.2210
    },
    {
        id: 'ruhunu-galle',
        name: 'Ruhunu Hospital',
        city: 'Galle',
        region: 'Southern',
        type: 'private',
        address: 'Galle',
        phone: '+94 91 223 4059',
        specialties: [],
        notes: [],
        accreditation: [],
        hasInternationalPatientServices: false,
        is24_7: true,
        lat: 6.0367,
        lng: 80.2170
    },

    // OTHER REGIONAL HOSPITALS
    {
        id: 'anuradhapura-hospital',
        name: 'Anuradhapura Teaching Hospital',
        city: 'Anuradhapura',
        region: 'North Central',
        type: 'public',
        address: 'Anuradhapura',
        phone: '025-2222261',
        specialties: [],
        notes: [],
        accreditation: [],
        hasInternationalPatientServices: false,
        is24_7: true,
        lat: 8.3114,
        lng: 80.4037
    },
    {
        id: 'badulla-hospital',
        name: 'Badulla General Hospital',
        city: 'Badulla',
        region: 'Uva',
        type: 'public',
        address: 'Badulla',
        phone: '055-2222261',
        specialties: [],
        notes: [],
        accreditation: [],
        hasInternationalPatientServices: false,
        is24_7: true,
        lat: 6.9934,
        lng: 81.0550
    }
]

// ============================================================================
// HEALTH ALERTS
// ============================================================================

export const healthAlerts: HealthAlert[] = [
    {
        id: 'dengue',
        title: 'Dengue Fever',
        severity: 'high',
        icon: '🦟',
        description: 'Dengue fever cases are on the rise in Sri Lanka—more than 20,000 cases year to date in 2025, with almost 50% of notifications coming from Western Province.',
        prevention: [
            'Use insect repellent with DEET or Picaridin',
            'Wear long-sleeved shirts and pants',
            'Stay in places with air conditioning or window screens',
            'Aedes mosquito is most active early morning and late afternoon'
        ],
        seasonalInfo: 'Two annual peaks in association with monsoon rains. Outbreaks common after peak wet season (October-December).'
    },
    {
        id: 'chikungunya',
        title: 'Chikungunya Outbreak (2025)',
        severity: 'high',
        icon: '🦟',
        description: 'CDC Level 2 Travel Health Notice issued for Sri Lanka as of December 2025. Vaccination now available and recommended for travelers.',
        prevention: [
            'Get Chikungunya vaccine before travel',
            'Use insect repellent 24/7',
            'Wear long sleeves and pants',
            'Stay in air-conditioned accommodations',
            'Pregnant travelers should reconsider travel, especially if close to delivery'
        ],
        seasonalInfo: 'Ongoing outbreak as of December 2025.'
    },
    {
        id: 'sun-heat',
        title: 'Sun & Heat Exposure',
        severity: 'high',
        icon: '☀️',
        description: 'Sri Lanka is tropical and close to the equator. Tourists will experience significant heat and humidity.',
        prevention: [
            'Stay hydrated with water or electrolyte drinks',
            'Rest in shade during hottest hours (10am-4pm)',
            'Apply SPF 50+ sunscreen and reapply regularly',
            'Wear hats and sunglasses'
        ]
    },
    {
        id: 'leeches',
        title: 'Leeches',
        severity: 'low',
        icon: '🐛',
        description: 'Leeches are common in rainforest and highland areas during wet season.',
        prevention: [
            'Wear leech socks when hiking in jungle areas',
            'Use insect repellent on exposed skin',
            'Check clothing and skin regularly during hikes'
        ]
    },
    {
        id: 'leptospirosis',
        title: 'Leptospirosis',
        severity: 'medium',
        icon: '💧',
        description: 'Bacterial infection that can be spread through fresh water contact.',
        prevention: [
            'Avoid swimming in fresh, unchlorinated water',
            'Stay away from lakes, ponds, or rivers',
            'Use protective footwear in flood-prone areas'
        ]
    }
]

// ============================================================================
// VACCINATIONS
// ============================================================================

export const vaccinations: Vaccination[] = [
    {
        id: 'mmr',
        name: 'Measles-Mumps-Rubella (MMR)',
        category: 'routine',
        isRequired: false,
        description: 'Ensure you are up to date with routine MMR vaccination.'
    },
    {
        id: 'tdap',
        name: 'Diphtheria-Tetanus-Pertussis (Tdap)',
        category: 'routine',
        isRequired: false,
        description: 'Routine booster recommended every 10 years.'
    },
    {
        id: 'covid19',
        name: 'COVID-19',
        category: 'routine',
        isRequired: false,
        description: 'Stay up to date with COVID-19 vaccinations.'
    },
    {
        id: 'hepatitis-a',
        name: 'Hepatitis A',
        category: 'travel-specific',
        isRequired: false,
        description: 'Recommended due to potential food and water contamination. Important for most travelers.'
    },
    {
        id: 'hepatitis-b',
        name: 'Hepatitis B',
        category: 'travel-specific',
        isRequired: false,
        description: 'Recommended due to potential exposure through contaminated food and water.'
    },
    {
        id: 'typhoid',
        name: 'Typhoid',
        category: 'travel-specific',
        isRequired: false,
        description: 'Especially recommended if visiting smaller cities or rural areas. Both oral and injectable options available.'
    },
    {
        id: 'yellow-fever',
        name: 'Yellow Fever',
        category: 'travel-specific',
        isRequired: true,
        description: 'Required only if arriving from or transiting through countries with yellow fever risk.',
        specialNotes: 'Exemptions for children under 9 months and passengers not leaving transit areas.'
    },
    {
        id: 'chikungunya',
        name: 'Chikungunya',
        category: 'travel-specific',
        isRequired: false,
        description: 'NEW (2025): CDC recommends vaccination due to ongoing outbreak. Two vaccines available: Vimkunya and Ixchiq.',
        specialNotes: 'Single-dose vaccine. Pregnant travelers should reconsider travel to affected areas.'
    },
    {
        id: 'japanese-encephalitis',
        name: 'Japanese Encephalitis',
        category: 'optional',
        isRequired: false,
        description: 'May be offered depending on itinerary and length of visit.'
    },
    {
        id: 'rabies',
        name: 'Rabies',
        category: 'optional',
        isRequired: false,
        description: 'Consider if planning extended outdoor activities or working with animals.'
    },
    {
        id: 'dengue',
        name: 'Dengue',
        category: 'optional',
        isRequired: false,
        description: 'May be offered depending on personal risk factors. No full protection available.'
    }
]

// ============================================================================
// INSURANCE COVERAGE
// ============================================================================

export const insuranceCoverage: InsuranceCoverage[] = [
    {
        id: 'medical',
        category: 'Medical Coverage',
        items: [
            'Medical emergencies and hospitalization expenses',
            'Coverage for adventure activities',
            'Emergency medical evacuation (essential for remote areas)',
            'Cashless facilities at partner hospitals'
        ]
    },
    {
        id: 'trip-protection',
        category: 'Trip Protection',
        items: [
            'Trip cancellation, delay, or interruption',
            'Lost, delayed, or damaged luggage',
            'Missed departure/connection coverage'
        ]
    }
]

// ============================================================================
// PACKING ESSENTIALS
// ============================================================================

export const packingEssentials: PackingItem[] = [
    {
        id: 'prescription-meds',
        name: 'Prescription Medications',
        description: 'Bring enough for your entire trip in original bottles with doctor\'s note or prescription.',
        isCritical: true,
        category: 'medication'
    },
    {
        id: 'insect-repellent',
        name: 'Insect Repellent',
        description: 'DEET or Picaridin-based spray is crucial for dengue and chikungunya prevention.',
        isCritical: true,
        category: 'protection'
    },
    {
        id: 'ors-packets',
        name: 'Oral Rehydration Salts (ORS)',
        description: 'Essential for recovering from dehydration caused by heat or illness.',
        isCritical: true,
        category: 'medication'
    },
    {
        id: 'antihistamines',
        name: 'Antihistamines',
        description: 'For mild allergic reactions to insect bites or food.',
        isCritical: false,
        category: 'medication'
    },
    {
        id: 'pain-relievers',
        name: 'Pain Relievers (Paracetamol)',
        description: 'Avoid aspirin/ibuprofen if dengue is suspected—use paracetamol instead.',
        isCritical: false,
        category: 'medication'
    },
    {
        id: 'sunscreen',
        name: 'Sunscreen SPF 50+',
        description: 'Tropical sun is intense—reapply regularly, especially at beaches.',
        isCritical: false,
        category: 'protection'
    },
    {
        id: 'first-aid',
        name: 'First Aid Kit',
        description: 'Basic bandages, antiseptic wipes, and blister plasters.',
        isCritical: false,
        category: 'general'
    },
    {
        id: 'motion-sickness',
        name: 'Motion Sickness Medication',
        description: 'Recommended for winding mountain roads and boat trips.',
        isCritical: false,
        category: 'medication'
    }
]

// ============================================================================
// WATER & FOOD SAFETY
// ============================================================================

export const waterSafety = {
    tapWaterSafe: false,
    recommendations: [
        'Drink only bottled water—check the seal before opening',
        'Use bottled water for brushing teeth',
        'Be careful with ice cubes—they may be made from tap water',
        'Rinse produce with bottled or filtered water',
        'Look for SLS (Sri Lanka Standards) certification on bottled water'
    ]
}

export const foodSafety: string[] = [
    'Eat cooked food served hot',
    'Street food is generally safe if served hot',
    'Avoid ice unless in high-end hotels',
    'Be cautious with raw foods like salads',
    'Avoid undercooked meat or unpasteurized dairy'
]

// ============================================================================
// EXPORTED DATA OBJECT
// ============================================================================

export const medicalDirectoryData: MedicalDirectoryData = {
    emergencyServices,
    hospitals,
    healthAlerts,
    vaccinations,
    packingEssentials,
    insuranceCoverage,
    waterSafety,
    foodSafety,
    lastUpdatedText: 'January 2025'
}

// Helper functions
export function getHospitalsByCity(city: string): Hospital[] {
    return hospitals.filter(h => h.city.toLowerCase() === city.toLowerCase())
}

export function getHospitalsByType(type: 'private' | 'public'): Hospital[] {
    return hospitals.filter(h => h.type === type)
}

export function getHospitalsByRegion(region: string): Hospital[] {
    return hospitals.filter(h => h.region.toLowerCase() === region.toLowerCase())
}

export function getPrimaryEmergencyServices(): EmergencyService[] {
    return emergencyServices.filter(s => s.isPrimary)
}

export function getHighSeverityAlerts(): HealthAlert[] {
    return healthAlerts.filter(a => a.severity === 'high')
}

export function getRequiredVaccinations(): Vaccination[] {
    return vaccinations.filter(v => v.isRequired)
}

export function getRecommendedVaccinations(): Vaccination[] {
    return vaccinations.filter(v => v.category === 'travel-specific')
}
