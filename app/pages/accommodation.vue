<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <Header variant="solid" />
    
    <!-- Main Content Layout -->
    <main class="relative flex min-h-[calc(100vh-80px)] w-full flex-col md:flex-row pt-[73px] lg:pt-[80px]">
      <!-- Left Panel: Filters & List -->
      <div class="flex flex-1 flex-col overflow-y-auto md:max-w-[60%] border-r border-neutral-light dark:border-white/10 bg-white dark:bg-background-dark">
        <AccommodationHero />
        <AccommodationFilters />
        <AccommodationList />
      </div>

      <!-- Right Panel: Map -->
      <AccommodationMap />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import AccommodationHero from '~/components/AccommodationHero.vue'
import AccommodationFilters from '~/components/AccommodationFilters.vue'
import AccommodationList from '~/components/AccommodationList.vue'
import AccommodationMap from '~/components/AccommodationMap.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

definePageMeta({
  layout: false
})

useHead({
  title: 'Accommodation Finder - CeylonGuide',
  meta: [
    { name: 'description', content: 'Discover curated hotels, guesthouses, and homestays verified for safety and comfort in Sri Lanka.' }
  ]
})
</script>
