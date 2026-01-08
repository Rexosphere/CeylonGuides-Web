<template>
    <div class="flex gap-3 overflow-x-auto scrollbar-hide mb-4 pb-1 border-t border-gray-100 dark:border-gray-800 pt-3">
        <!-- Sort Filter -->
        <button
            class="whitespace-nowrap px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted dark:text-gray-400 text-xs font-medium flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-sm">tune</span>
            {{ sortLabel }}
            <span class="material-symbols-outlined text-sm">expand_more</span>
        </button>

        <!-- Region Filter -->
        <button
            class="whitespace-nowrap px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted dark:text-gray-400 text-xs font-medium flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-sm">map</span>
            {{ regionLabel }}
            <span class="material-symbols-outlined text-sm">expand_more</span>
        </button>

        <!-- City Filter -->
        <button
            class="whitespace-nowrap px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted dark:text-gray-400 text-xs font-medium flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-sm">location_city</span>
            {{ cityLabel }}
            <span class="material-symbols-outlined text-sm">expand_more</span>
        </button>

        <!-- Price Filter -->
        <button
            class="whitespace-nowrap px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted dark:text-gray-400 text-xs font-medium flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-sm">payments</span>
            All Prices
            <span class="material-symbols-outlined text-sm">expand_more</span>
        </button>

        <!-- Rating Filter -->
        <button
            class="whitespace-nowrap px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted dark:text-gray-400 text-xs font-medium flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-sm">star</span>
            Any Rating
            <span class="material-symbols-outlined text-sm">expand_more</span>
        </button>

        <!-- Safety Certified Toggle -->
        <button @click="$emit('update:safetyCertified', !safetyCertified)"
            :class="safetyCertified ? 'border-accent-info text-accent-info' : ''"
            class="whitespace-nowrap px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted dark:text-gray-400 text-xs font-medium flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-sm filled text-accent-info">verified_user</span>
            Safe Certified
        </button>

        <!-- Favorites Toggle -->
        <button @click="$emit('update:showFavoritesOnly', !showFavoritesOnly)"
            :class="showFavoritesOnly ? 'border-accent-danger text-accent-danger' : ''"
            class="whitespace-nowrap px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-text-muted dark:text-gray-400 text-xs font-medium flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-sm">favorite</span>
            Favorites
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    sort: string
    region: string | null
    city: string | null
    safetyCertified: boolean
    showFavoritesOnly: boolean
}>()

defineEmits<{
    'update:sort': [value: string]
    'update:region': [value: string | null]
    'update:city': [value: string | null]
    'update:safetyCertified': [value: boolean]
    'update:showFavoritesOnly': [value: boolean]
}>()

const sortLabel = computed(() => {
    const labels: Record<string, string> = {
        'recommended': 'Recommended',
        'price_asc': 'Price: Low to High',
        'price_desc': 'Price: High to Low',
        'rating_desc': 'Highest Rated',
        'most_reviewed': 'Most Reviewed'
    }
    return labels[props.sort] || 'Recommended'
})

const regionLabel = computed(() => props.region || 'All Regions')
const cityLabel = computed(() => props.city || 'All Cities')
</script>
