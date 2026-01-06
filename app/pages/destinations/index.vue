<template>
  <div class="relative flex flex-col min-h-screen w-full overflow-x-hidden">
    <!-- Header is automatically included by default layout, but if we need a specific variant we might need to look at layout customization. 
         Assuming default layout for now as per plan. -->
    
    <DestinationHero />
    <DestinationFilters
      :categories="categories"
      :category="selectedCategory"
      @update:category="selectedCategory = $event"
    />
    <DestinationList :category="selectedCategory" />
    <DestinationCTA />

    <!-- Footer is automatically included by default layout -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const selectedCategory = ref<string | null>(null)

import destinationsData from '~/assets/data/destinations.json'

// Derive unique categories from JSON data
const categories = computed(() => {
  const counts: Record<string, number> = {}
  destinationsData.forEach(d => {
    counts[d.category] = (counts[d.category] || 0) + 1
  })
  
  return Object.entries(counts).map(([category, count]) => ({
    category,
    count
  })).sort((a, b) => b.count - a.count)
})

// Page metadata
useHead({
  title: 'CeylonGuide - Explore Destinations'
})
</script>
