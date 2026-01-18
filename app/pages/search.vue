<template>
  <div class="bg-background-light dark:bg-background-dark text-[#181311] dark:text-gray-100 overflow-x-hidden min-h-screen flex flex-col">
    
    <SearchBar />
    
    <main class="flex-grow layout-container max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full">
      <div class="flex flex-col lg:flex-row gap-12">
        <SearchResults />
        <SearchSidebar />
      </div>
    </main>
    
  </div>
</template>

<script setup lang="ts">
import SearchBar from '~/components/Search/SearchBar.vue'
import SearchResults from '~/components/Search/SearchResults.vue'
import SearchSidebar from '~/components/Search/SearchSidebar.vue'

useHead({
  title: 'Search Results - CeylonWiki',
  meta: [
    { name: 'description', content: 'Search for destinations, attractions, accommodations, and articles about Sri Lanka. Find everything you need for your Ceylon adventure.' }
  ]
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-surface-dark: #2c1b15;
}
</style>
