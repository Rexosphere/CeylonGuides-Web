<script setup lang="ts">
import { useShoppingData } from '~/composables/useShoppingData'

const { clearFilters, filters } = useShoppingData()
</script>

<template>
  <div class="w-full px-4 py-16 flex justify-center">
    <div class="max-w-md text-center space-y-6">
      <!-- Icon -->
      <div class="flex justify-center">
        <div class="size-24 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
          <span class="material-symbols-outlined text-gray-400 text-5xl">search_off</span>
        </div>
      </div>

      <!-- Message -->
      <div>
        <h3 class="text-2xl font-bold text-text-main dark:text-white mb-2">
          No Results Found
        </h3>
        <p class="text-text-muted dark:text-gray-400">
          We couldn't find any items or districts matching your search
          <template v-if="filters.searchQuery">
            for "<strong class="text-primary">{{ filters.searchQuery }}</strong>"
          </template>
          <template v-if="filters.tags.length > 0">
            with the selected tags
          </template>.
        </p>
      </div>

      <!-- Active Filters -->
      <div v-if="filters.tags.length > 0" class="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
        <p class="text-sm font-medium text-text-main dark:text-white mb-2">Active Tags:</p>
        <div class="flex flex-wrap gap-2 justify-center">
          <span
            v-for="tag in filters.tags"
            :key="tag"
            class="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Clear Button -->
      <button
        @click="clearFilters"
        class="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
      >
        <span class="material-symbols-outlined">restart_alt</span>
        Clear All Filters
      </button>

      <!-- Suggestions -->
      <div class="text-sm text-text-muted dark:text-gray-400">
        <p class="mb-2">Try searching for:</p>
        <div class="flex flex-wrap gap-2 justify-center">
          <span class="px-3 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full">gems</span>
          <span class="px-3 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full">tea</span>
          <span class="px-3 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full">Pettah</span>
          <span class="px-3 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full">fixed price</span>
        </div>
      </div>
    </div>
  </div>
</template>
