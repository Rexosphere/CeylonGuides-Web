/**
 * Safety Mode TypeScript Types
 * 
 * Data structures for emergency contacts, phrases, and hospital directory.
 */

// ============================================================================
// Emergency Contacts
// ============================================================================

export type ContactCategory = 'police' | 'medical' | 'tourist' | 'disaster' | 'hospital'

export interface EmergencyContact {
    id: string
    title: string
    number: string
    altNumbers?: string[]
    description: string
    icon: string
    category: ContactCategory
    color: string  // Tailwind color class prefix (e.g., 'red', 'blue')
}

// ============================================================================
// Emergency Phrases
// ============================================================================

export type PhraseCategory = 'help' | 'medical' | 'police' | 'directions' | 'general'

export interface EmergencyPhrase {
    id: string
    category: PhraseCategory
    english: string
    sinhala: string
    tamil?: string
    pronunciation?: string
    notes?: string
}

// ============================================================================
// Hospitals
// ============================================================================

export type HospitalType = 'private' | 'public'

export interface Hospital {
    id: string
    name: string
    location: string
    city: string
    phone: string
    type: HospitalType
    lat: number
    lng: number
    specialties?: string[]
    is24hr?: boolean
    hasInternationalServices?: boolean
}

// ============================================================================
// Geolocation
// ============================================================================

export type GeolocationStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'error'

export interface GeolocationState {
    status: GeolocationStatus
    coords: { lat: number; lng: number } | null
    accuracy: number | null
    lastUpdated: number | null
    error: string | null
}

// ============================================================================
// Page Data
// ============================================================================

export interface SafetyModeData {
    contacts: EmergencyContact[]
    phrases: EmergencyPhrase[]
    hospitals: Hospital[]
}
