import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'ceylon-guides-shopping-saved-items'

export interface SavedItem {
  id: string
  type: 'curated-find' | 'district'
  savedAt: number
}

// Shared state across all instances
const savedItems = ref<SavedItem[]>([])
const isInitialized = ref(false)

export const useSavedItems = () => {
  // Initialize from localStorage on first use
  if (!isInitialized.value && typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        savedItems.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse saved items:', e)
        savedItems.value = []
      }
    }
    isInitialized.value = true
  }

  // Watch for changes and persist to localStorage
  if (typeof window !== 'undefined') {
    watch(savedItems, (newValue) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    }, { deep: true })
  }

  const savedCuratedFinds = computed(() => 
    savedItems.value.filter(item => item.type === 'curated-find')
  )

  const savedDistricts = computed(() => 
    savedItems.value.filter(item => item.type === 'district')
  )

  const totalSavedCount = computed(() => savedItems.value.length)

  const isSaved = (id: string, type: 'curated-find' | 'district'): boolean => {
    return savedItems.value.some(item => item.id === id && item.type === type)
  }

  const toggleSave = (id: string, type: 'curated-find' | 'district') => {
    const index = savedItems.value.findIndex(item => item.id === id && item.type === type)
    if (index > -1) {
      savedItems.value.splice(index, 1)
    } else {
      savedItems.value.push({
        id,
        type,
        savedAt: Date.now()
      })
    }
  }

  const clearAllSaved = () => {
    savedItems.value = []
  }

  const removeSaved = (id: string, type: 'curated-find' | 'district') => {
    const index = savedItems.value.findIndex(item => item.id === id && item.type === type)
    if (index > -1) {
      savedItems.value.splice(index, 1)
    }
  }

  return {
    savedItems,
    savedCuratedFinds,
    savedDistricts,
    totalSavedCount,
    isSaved,
    toggleSave,
    clearAllSaved,
    removeSaved
  }
}
