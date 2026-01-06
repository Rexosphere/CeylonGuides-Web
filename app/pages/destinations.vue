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

const { data: categoriesResponse } = await useFetch<{
  success: boolean
  data: Array<{ category: string; count: number }>
}>(`${apiBase}/api/destinations/categories/list`)

const categories = computed(() => categoriesResponse.value?.data || [])

// Page metadata
useHead({
  title: 'CeylonGuide - Explore Destinations'
})
</script>
