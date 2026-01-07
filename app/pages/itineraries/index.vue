<template>
  <div
    class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">

    <main class="flex h-full grow flex-col">
      <ItineraryHero />
      <ItineraryList />
      <TripBuilder />
      <ItineraryNewsletter />
    </main>

  </div>
</template>

<script setup lang="ts">
import ItineraryHero from '~/components/Itineraries/ItineraryHero.vue'
import ItineraryList from '~/components/Itineraries/ItineraryList.vue'
import TripBuilder from '~/components/Itineraries/TripBuilder.vue'
import ItineraryNewsletter from '~/components/Itineraries/ItineraryNewsletter.vue'

useHead({
  title: 'Itineraries & Trip Planner - CeylonGuide',
  meta: [
    { name: 'description', content: 'Craft your perfect Sri Lankan journey with our curated guides and trip builder tool.' }
  ]
})
</script>