<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col items-center">
      <ShoppingHero />
      <ShoppingCuratedFinds />
      <ShoppingDistricts />
      <ShoppingSmartGuide />
    </main>

  </div>
</template>

<script setup lang="ts">
import ShoppingHero from '~/components/Shopping/ShoppingHero.vue'
import ShoppingCuratedFinds from '~/components/Shopping/ShoppingCuratedFinds.vue'
import ShoppingDistricts from '~/components/Shopping/ShoppingDistricts.vue'
import ShoppingSmartGuide from '~/components/Shopping/ShoppingSmartGuide.vue'

useHead({
  title: 'Shopping Guide - CeylonGuide',
  meta: [
    { name: 'description', content: 'The ultimate guide to authentic souvenirs, bustling markets, and smart shopping in Sri Lanka. From Ceylon tea to sapphires.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Shopping page (Orange Theme) */
.group\/design-root {
  --color-primary: #f45c25;
  --color-bg-light: #f8f6f5;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
  /* --color-text-muted is #8a6b60 in the HTML, standardizing on our text-muted token */
}
</style>
