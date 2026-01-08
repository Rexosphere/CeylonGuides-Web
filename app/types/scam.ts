export type ScamSeverity = 'high' | 'medium' | 'low'
export type LocationRisk = 'high' | 'medium-high' | 'medium' | 'low'

export interface ScamAlert {
  id: string
  title: string
  severity: ScamSeverity
  description: string
  example: string
  tips: string[]
  categories: string[]
}

export interface RiskLocation {
  id: string
  name: string
  area: string
  risk: LocationRisk
  lat: number
  lng: number
  scamTypes: string[]
  description: string
  color: string
}

export interface ScamCategory {
  id: string
  name: string
  icon: string
}

export interface SafetyTip {
  category: string
  tips: string[]
}
