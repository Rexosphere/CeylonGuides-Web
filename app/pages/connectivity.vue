<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <div class="max-w-7xl mx-auto w-full">
      <ConnectivityHero />
      <ConnectivityProviders />
    </div>
    
    <ConnectivityPackages />
    
    <div class="max-w-7xl mx-auto w-full">
      <ConnectivityLocator />
      <ConnectivityTips />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import ConnectivityHero from '~/components/ConnectivityHero.vue'
import ConnectivityProviders from '~/components/ConnectivityProviders.vue'
import ConnectivityPackages from '~/components/ConnectivityPackages.vue'
import ConnectivityLocator from '~/components/ConnectivityLocator.vue'
import ConnectivityTips from '~/components/ConnectivityTips.vue'

useHead({
  title: 'Local SIM & Connectivity - CeylonGuide',
  meta: [
    { name: 'description', content: 'Find the best SIM cards, data plans, and WiFi spots in Sri Lanka. Compare mobile providers and get connected upon arrival.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Connectivity page */
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
}
</style>
