<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col">
      <ItineraryHero />
      <ItineraryList />
      <TripBuilder />
      <ItineraryNewsletter />
    </main>

  </div>
</template>

<script setup lang="ts">
import ItineraryHero from '~/components/ItineraryHero.vue'
import ItineraryList from '~/components/ItineraryList.vue'
import TripBuilder from '~/components/TripBuilder.vue'
import ItineraryNewsletter from '~/components/ItineraryNewsletter.vue'

useHead({
  title: 'Itineraries & Trip Planner - CeylonGuide',
  meta: [
    { name: 'description', content: 'Craft your perfect Sri Lankan journey with our curated guides and trip builder tool.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Itineraries page (Orange Theme) */
.group\/design-root {
  --color-primary: #f45c25;
  --color-bg-light: #f8f6f5;
  --color-bg-dark: #221510;
  --color-surface-light: #ffffff;
  --color-surface-dark: #2e1d15;
  --color-text-main: #181311;
  /* --color-text-muted is not explicitly redefined in the provided HTML's config, 
     but we can inherit it or set a specific one if needed. 
     The HTML used #8a6b60 for some text which matches our standard muted text variable */
}
</style>
