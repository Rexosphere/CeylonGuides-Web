/**
 * Comprehensive type definitions for Scam Alert system
 * Based on structured data from scam.md
 */

export type ScamSeverity = 'critical' | 'high' | 'medium' | 'low'

export type ScamCategory =
  | 'transport'
  | 'shopping'
  | 'guides'
  | 'money'
  | 'nightlife'
  | 'temple'
  | 'beach'
  | 'safari'
  | 'general'

export type RiskLevel = 'high' | 'medium' | 'low'

export type TravelerType = 'solo-female' | 'couple' | 'family' | 'backpacker' | 'all'

/**
 * Scam Type
 * Comprehensive information about a specific scam
 */
export interface ScamType {
  id: string
  title: string
  severity: ScamSeverity
  category: ScamCategory
  description: string
  realExamples: string[]
  preventionTips: string[]
  commonLocations: string[] // location ids
  tags: string[]
  travelerWarnings?: {
    'solo-female'?: string[]
    'couple'?: string[]
    'family'?: string[]
    'backpacker'?: string[]
  }
}

/**
 * Location
 * Geographic location with risk assessment and scam associations
 */
export interface Location {
  id: string
  name: string
  area?: string
  riskLevel: RiskLevel
  coordinates: {
    lat: number
    lng: number
  }
  summary: string
  commonScams: string[] // scam type ids
  precautions?: string[]
  saferAlternatives?: Array<{
    icon: string
    title: string
    description: string
  }>
}

/**
 * Activity
 * Tourist activity with related scam warnings
 */
export interface Activity {
  id: string
  label: string
  relatedScams: string[] // scam type ids
}

/**
 * Reporting Information
 * Emergency contacts and guidance for scam victims
 */
export interface ReportingInfo {
  touristPoliceContact: {
    number: string
    description: string
  }
  emergencyNumbers: {
    police: string
    touristPolice: string
    emergency: string
    consumerAffairs: string
  }
  whatToDoIfScammed: string[]
}

/**
 * Filter State
 * UI state for scam filtering
 */
export interface ScamFilterState {
  severity: ScamSeverity | null
  category: ScamCategory | null
  location: string | null
  searchQuery: string
  activityType: string | null
}

/**
 * Map Marker Data
 * Data structure for map visualization
 */
export interface MapMarker {
  id: string
  position: [number, number] // [lat, lng]
  name: string
  riskLevel: RiskLevel
  scamCount: number
  scamTypes: string[]
}
