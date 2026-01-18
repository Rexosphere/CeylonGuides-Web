<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <ActivityHero v-model="searchQuery" />
    <ActivityFilters :categories="categories" :category="selectedCategory" @update:category="handleCategoryChange" />
    <ActivityList :category="selectedCategory" :search="searchQuery" />
    <ActivityFeatured />
    <ActivityNewsletter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import adventuresData from '~/assets/data/adventures.json'

const selectedCategory = ref<string | null>(null)
const searchQuery = ref('')

// Derive unique categories from JSON data
const categories = computed(() => {
  const categorySet = new Set<string>()
  adventuresData.forEach((adventure: any) => {
    if (adventure.category) {
      categorySet.add(adventure.category)
    }
  })
  return Array.from(categorySet).map(category => ({
    category,
    count: adventuresData.filter((a: any) => a.category === category).length
  }))
})

// Clear category when searching
watch(searchQuery, (newVal) => {
  if (newVal && newVal.trim()) {
    selectedCategory.value = null
  }
})

function handleCategoryChange(category: string | null) {
  selectedCategory.value = category
  searchQuery.value = ''
}

useHead({
  title: 'Activities & Experiences - CeylonWiki',
  meta: [
    { name: 'description', content: 'Curated adventures in the Pearl of the Indian Ocean. From misty peaks to golden shores, discover authentic experiences.' }
  ]
})
</script>
