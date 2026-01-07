<template>
  <section
    class="py-8 bg-white dark:bg-card-dark border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
    <div class="container mx-auto px-6">
      <div class="flex flex-wrap items-center justify-center gap-3">
        <button @click="$emit('update:category', null)"
          :class="selectedCategory === null ? 'bg-primary text-white shadow-md hover:shadow-lg' : 'bg-background-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 text-text-muted dark:text-gray-300 border border-gray-200 dark:border-gray-700'"
          class="px-4 py-2 rounded-full text-xs font-bold transition-all">
          All Spots
        </button>
        <button v-for="cat in displayCategories" :key="cat" @click="$emit('update:category', cat)"
          :class="selectedCategory === cat ? 'bg-primary text-white shadow-md hover:shadow-lg' : 'bg-background-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-700 text-text-muted dark:text-gray-300 border border-gray-200 dark:border-gray-700'"
          class="px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5">
          <span class="material-icons text-xs">{{ getCategoryIcon(cat) }}</span> {{ cat }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  categories: string[]
  droneStatuses: string[]
  selectedCategory: string | null
  selectedDroneStatus: string | null
}>()

defineEmits<{
  (e: 'update:category', value: string | null): void
  (e: 'update:droneStatus', value: string | null): void
}>()

// Category icons mapping
const categoryIcons: Record<string, string> = {
  'Heritage': 'temple_buddhist',
  'Architecture': 'apartment',
  'Coastal': 'beach_access',
  'Nature': 'forest',
  'Cultural': 'festival',
  'Urban': 'location_city',
  'Landscape': 'landscape',
  'Wildlife': 'pets'
}

function getCategoryIcon(category: string): string {
  return categoryIcons[category] || 'photo_camera'
}

// Display main categories
const displayCategories = computed(() => {
  const mainCategories = ['Heritage', 'Architecture', 'Coastal', 'Nature', 'Cultural', 'Urban', 'Landscape', 'Wildlife']
  return props.categories.filter(c => mainCategories.includes(c))
})
</script>
