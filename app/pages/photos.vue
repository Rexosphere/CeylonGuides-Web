<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <PhotoHero />
      <PhotoFilters />
      <PhotoSpots />
      <PhotoDroneRegulations />
      <PhotoTrending />
    </main>

  </div>
</template>

<script setup lang="ts">
import PhotoHero from '~/components/Photos/PhotoHero.vue'
import PhotoFilters from '~/components/Photos/PhotoFilters.vue'
import PhotoSpots from '~/components/Photos/PhotoSpots.vue'
import PhotoDroneRegulations from '~/components/Photos/PhotoDroneRegulations.vue'
import PhotoTrending from '~/components/Photos/PhotoTrending.vue'

useHead({
  title: 'Photo Spots Guide - CeylonGuide',
  meta: [
    { name: 'description', content: 'Discover the best photography locations in Sri Lanka. Complete guide with lighting conditions, drone regulations, and trending spots.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Photo Spots page */
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
}
</style>
