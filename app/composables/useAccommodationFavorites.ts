import { ref, watch } from 'vue'

const STORAGE_KEY = 'ceylon-saved-stays'

// Global state to share across components
const favorites = ref<string[]>([])

// Load from localStorage on client
if (typeof window !== 'undefined') {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            favorites.value = JSON.parse(stored)
        }
    } catch (e) {
        console.warn('Failed to load saved stays from localStorage:', e)
    }
}

// Watch for changes and persist
watch(favorites, (newVal) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
        } catch (e) {
            console.warn('Failed to save stays to localStorage:', e)
        }
    }
}, { deep: true })

export function useAccommodationFavorites() {
    const isFavorite = (id: string | number): boolean => {
        return favorites.value.includes(String(id))
    }

    const toggleFavorite = (id: string | number): void => {
        const idStr = String(id)
        const index = favorites.value.indexOf(idStr)
        if (index === -1) {
            favorites.value.push(idStr)
        } else {
            favorites.value.splice(index, 1)
        }
    }

    const clearAll = (): void => {
        favorites.value = []
    }

    return {
        favorites,
        isFavorite,
        toggleFavorite,
        clearAll
    }
}
