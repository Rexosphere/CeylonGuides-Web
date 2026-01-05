<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col items-center">
      <WeatherHero />
      
      <div class="layout-container flex flex-col items-center py-12 md:py-20 px-4 md:px-10">
        <div class="max-w-[1080px] w-full flex flex-col gap-20">
          <WeatherClimate />
          <WeatherForecasts />
          <WeatherSeasonalGuide />
          <WeatherPacking />
        </div>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import WeatherHero from '~/components/Weather/WeatherHero.vue'
import WeatherClimate from '~/components/Weather/WeatherClimate.vue'
import WeatherForecasts from '~/components/Weather/WeatherForecasts.vue'
import WeatherSeasonalGuide from '~/components/Weather/WeatherSeasonalGuide.vue'
import WeatherPacking from '~/components/Weather/WeatherPacking.vue'

useHead({
  title: 'Weather & Best Times - CeylonGuide',
  meta: [
    { name: 'description', content: 'Navigate the dual monsoons and discover the perfect season for your island getaway.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Weather page */
.group\/design-root {
  --color-primary: #f45c25;
  --color-bg-light: #f8f6f5;
  --color-bg-dark: #221510;
  --color-surface-light: #ffffff;
  --color-surface-dark: #2a1d18;
  --color-text-main: #181311;
  --color-text-muted: #8a6b60;
}
</style>
