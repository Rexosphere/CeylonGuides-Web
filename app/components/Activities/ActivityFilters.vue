<template>
  <section
    class="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto no-scrollbar">
      <div class="flex items-center gap-3 min-w-max">
        <button @click="$emit('update:category', null)"
          :class="category === null ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-text-muted dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'"
          class="px-5 py-2 rounded-full text-sm font-medium transition-colors">
          All
        </button>
        <button v-for="cat in displayCategories" :key="cat.category" @click="$emit('update:category', cat.category)"
          :class="category === cat.category ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-text-muted dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'"
          class="px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2">
          <span class="material-icons text-lg">{{ getCategoryIcon(cat.category) }}</span> {{ cat.category }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  categories: Array<{ category: string; count: number }>
  category: string | null
}>()

defineEmits<{
  (e: 'update:category', value: string | null): void
}>()

// Category icons mapping
const categoryIcons: Record<string, string> = {
  'Cultural': 'temple_buddhist',
  'Wildlife': 'pets',
  'Adventure': 'paragliding',
  'Hiking': 'hiking',
  'Culinary': 'restaurant',
  'Wellness': 'spa',
  'Beaches': 'beach_access',
  'Scenic': 'landscape'
}

function getCategoryIcon(category: string): string {
  return categoryIcons[category] || 'category'
}

// Display categories (limit to main ones for the filter bar)
const displayCategories = computed(() => {
  const mainCategories = ['Cultural', 'Wildlife', 'Adventure', 'Hiking', 'Culinary', 'Wellness', 'Beaches']
  return props.categories.filter(c => mainCategories.includes(c.category))
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
