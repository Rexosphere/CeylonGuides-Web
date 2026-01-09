/**
 * TypeScript interfaces for Medical Directory Data
 * Generated from hospital.md - all hospital data is sourced from this file
 */

export interface EmergencyService {
    id: string
    name: string
    phone: string
    note?: string
    isPrimary: boolean
}

export interface Hospital {
    id: string
    name: string
    city: 'Colombo' | 'Kandy' | 'Galle' | 'Anuradhapura' | 'Badulla' | string
    region: 'Western' | 'Central' | 'Southern' | 'North Central' | 'Uva' | string
    type: 'private' | 'public'
    address?: string
    phone: string
    specialties: string[]
    notes: string[]
    accreditation: string[]
    hasInternationalPatientServices: boolean
    is24_7: boolean
    lat?: number
    lng?: number
    sourceRefs?: string[]
}

export interface HealthAlert {
    id: string
    title: string
    severity: 'high' | 'medium' | 'low'
    icon: string
    description: string
    prevention: string[]
    seasonalInfo?: string
}

export interface Vaccination {
    id: string
    name: string
    category: 'routine' | 'travel-specific' | 'optional'
    isRequired: boolean
    description: string
    specialNotes?: string
}

export interface InsuranceCoverage {
    id: string
    category: string
    items: string[]
}

export interface PackingItem {
    id: string
    name: string
    description: string
    isCritical: boolean
    category: 'medication' | 'protection' | 'general'
}

export interface MedicalDirectoryData {
    emergencyServices: EmergencyService[]
    hospitals: Hospital[]
    healthAlerts: HealthAlert[]
    vaccinations: Vaccination[]
    packingEssentials: PackingItem[]
    insuranceCoverage: InsuranceCoverage[]
    waterSafety: {
        tapWaterSafe: boolean
        recommendations: string[]
    }
    foodSafety: string[]
    lastUpdatedText: string
}
