export interface ShoppingItem {
  id: string
  name: string
  category: 'tea' | 'gems' | 'textiles' | 'spices' | 'handicrafts' | 'ayurveda'
  priceRange: string
  priceRangeLKR: string
  image: string
  description: string
  authenticity: string[]
  bestPlaces: string[]
  scamWarnings?: string[]
  tips: string[]
  featured?: boolean
}

export interface ShoppingDistrict {
  id: string
  name: string
  location: string
  description: string
  image: string
  bestFor: string[]
  priceLevel: 'budget' | 'moderate' | 'premium'
  bargaining: boolean
  featured?: boolean
}

export interface FilterState {
  category: string
  priceLevel: string
  searchQuery: string
}
