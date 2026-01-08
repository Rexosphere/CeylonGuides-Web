import { ref, computed } from 'vue'
import {
  curatedFinds,
  districts,
  guides,
  vatRefund,
  filterByTag,
  filterDistrictsByTag,
  searchItems,
  searchDistricts,
  getBestMatches,
  getDistrictBestMatches,
  getItemsByPriceRange,
  getDistrictsByBargaining,
  type CuratedFind,
  type ShoppingDistrict,
  type ShoppingGuides,
  type VATRefund
} from '~/data/shopping.data'

export interface FilterState {
  category: string
  priceLevel: string
  searchQuery: string
  tags: string[]
}

export const useShoppingData = () => {
  const filters = ref<FilterState>({
    category: 'all',
    priceLevel: 'all',
    searchQuery: '',
    tags: []
  })

  const filteredItems = computed(() => {
    let results = curatedFinds

    // Filter by category (iconKey)
    if (filters.value.category !== 'all') {
      results = results.filter(item => item.iconKey === filters.value.category)
    }

    // Filter by search query
    if (filters.value.searchQuery !== '') {
      results = searchItems(results, filters.value.searchQuery)
    }

    // Filter by tags if any
    if (filters.value.tags.length > 0) {
      results = getBestMatches(results, filters.value.tags)
    }

    return results
  })

  const filteredDistricts = computed(() => {
    let results = districts

    // Filter by price level
    if (filters.value.priceLevel !== 'all') {
      results = results.filter(district => district.priceLevel === filters.value.priceLevel)
    }

    // Filter by search query
    if (filters.value.searchQuery !== '') {
      results = searchDistricts(results, filters.value.searchQuery)
    }

    // Filter by tags if any
    if (filters.value.tags.length > 0) {
      results = getDistrictBestMatches(results, filters.value.tags)
    }

    return results
  })

  const setCategory = (category: string) => {
    filters.value.category = category
  }

  const setPriceLevel = (level: string) => {
    filters.value.priceLevel = level
  }

  const setSearchQuery = (query: string) => {
    filters.value.searchQuery = query
  }

  const addTag = (tag: string) => {
    if (!filters.value.tags.includes(tag)) {
      filters.value.tags.push(tag)
    }
  }

  const removeTag = (tag: string) => {
    filters.value.tags = filters.value.tags.filter(t => t !== tag)
  }

  const clearFilters = () => {
    filters.value = {
      category: 'all',
      priceLevel: 'all',
      searchQuery: '',
      tags: []
    }
  }

  return {
    // Data from shopping.data.ts
    items: curatedFinds,
    districts,
    guides,
    vatRefund,
    
    // Reactive filters
    filters,
    filteredItems,
    filteredDistricts,
    
    // Filter setters
    setCategory,
    setPriceLevel,
    setSearchQuery,
    addTag,
    removeTag,
    clearFilters,
    
    // Helper functions
    filterByTag,
    filterDistrictsByTag,
    searchItems: (query: string) => searchItems(curatedFinds, query),
    searchDistricts: (query: string) => searchDistricts(districts, query),
    getBestMatches: (tags: string[]) => getBestMatches(curatedFinds, tags),
    getDistrictBestMatches: (tags: string[]) => getDistrictBestMatches(districts, tags),
    getItemsByPriceRange,
    getDistrictsByBargaining
  }
}
