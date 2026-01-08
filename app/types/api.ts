export interface ApiResponse<T> {
  success: boolean
  data: T
  count?: number
  message?: string
  error?: string
}

export interface Location {
  latitude: number
  longitude: number
  name: string
  district?: string
}

export interface Phrase {
  id: string
  english: string
  sinhala: string
  tamil: string
  pronunciation: string
  category: string
  cultural_context?: string
  audio_url?: string
}

export interface EtiquetteTip {
  id: string
  title: string
  description: string
  category: string
  do_list: string[]
  dont_list: string[]
  icon_emoji?: string
}

export interface ScamAlert {
  id: string
  title: string
  description: string
  location: Location
  category: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  report_count: number
  is_verified: boolean
  prevention_tips: string[]
  last_reported: string
}

export interface FareEstimate {
  origin: string
  destination: string
  distance_km: number
  transport_type: string
  estimated_fare_lkr: number
  fair_range_min: number
  fair_range_max: number
  estimated_duration_minutes: number
  tips: string[]
}

export interface Restaurant {
  id: string
  name: string
  description: string
  location: Location
  category: string
  rating: number
  price_range: string
  is_verified_halal: boolean
  cuisine_types: string[]
  hygiene_rating: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'UNRATED'
  dietary_options: string[]
  review_count: number
  photo_url?: string
  district?: string
  reviews?: RestaurantReview[]
}

export interface RestaurantReview {
  id: string
  rating: number
  comment?: string | null
  photo_urls?: string[]
  user_name?: string | null
  created_at?: string | null
}

export interface Facility {
  id: string
  name: string
  type?: string
  facility_type?: string
  location: Location
  average_rating: number
  cleanliness_rating: number
  safety_rating: number
  rating_count: number
  photos: string[]
  amenities?: string[]
  ratings?: FacilityRating[]
}

export interface FacilityRating {
  id: string
  overall_rating: number
  cleanliness_rating: number
  safety_rating: number
  comment?: string | null
  photo_urls?: string[]
  user_name?: string | null
  created_at?: string | null
}

export interface EmergencyContact {
  id: string
  name: string
  phone_number: string
  category: string
  description?: string
  is_available_24x7: boolean
  emoji?: string
}

export interface Accommodation {
  id: string
  name: string
  description?: string
  category: string
  region_key?: string
  rating: number
  price_range: string
  price_per_night_lkr?: number
  price_per_night_usd?: number
  amenities: string[]
  image_url?: string | null
  is_verified: boolean
  safety_certified?: boolean
  review_count: number
  location: Location
  contact_phone?: string | null
  contact_email?: string | null
  website_url?: string | null
}

export interface Activity {
  id: string
  name: string
  description?: string
  category: string
  difficulty: string
  duration_hours?: number
  price_per_person_lkr?: number
  price_per_person_usd?: number
  rating: number
  includes: string[]
  image_url?: string | null
  provider_name?: string | null
  review_count?: number
  location: Location
}

export interface Destination {
  id: string
  name: string
  description?: string
  category: string
  rating: number
  best_time_to_visit?: string | null
  entry_fee_lkr?: number | null
  entry_fee_tourist_usd?: number | null
  opening_hours?: string | null
  highlights: string[]
  image_url?: string | null
  subtitle?: string | null
  is_unesco: boolean
  review_count?: number
  location: Location
}

export interface SafetyAlert {
  id: string
  title: string
  description: string
  alert_type: 'WEATHER' | 'POLITICAL' | 'HEALTH' | 'GENERAL'
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  affected_areas: string[]
  source?: string
  source_url?: string
  action_required?: string
  issued_at: string
  expires_at: string
}

export interface VisaInfo {
  id: string
  country_code: string
  country_name: string
  visa_type: string
  duration: string
  requirements: string[]
  fee: string
  processing_time: string
  notes?: string | null
  updated_at?: string | null
}

export interface HealthInfo {
  id: string
  title: string
  content: string
  category: string
  created_at?: string | null
}
