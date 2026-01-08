<script setup lang="ts">
import { useShoppingData } from '~/composables/useShoppingData'
import ShoppingHero from '~/components/Shopping/ShoppingHero.vue'
import ShoppingSearchFilter from '~/components/Shopping/ShoppingSearchFilter.vue'
import ShoppingCuratedFinds from '~/components/Shopping/ShoppingCuratedFinds.vue'
import ShoppingDistricts from '~/components/Shopping/ShoppingDistricts.vue'
import ShoppingSmartGuide from '~/components/Shopping/ShoppingSmartGuide.vue'
import ShoppingEmptyState from '~/components/Shopping/ShoppingEmptyState.vue'

const { filteredItems, filteredDistricts } = useShoppingData()

const hasResults = computed(() => {
  return filteredItems.value.length > 0 || filteredDistricts.value.length > 0
})

useHead({
  title: 'Shopping Guide - CeylonGuide',
  meta: [
    { name: 'description', content: 'The ultimate guide to authentic souvenirs, bustling markets, and smart shopping in Sri Lanka. From Ceylon tea to sapphires.' }
  ]
})
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col items-center">
      <ShoppingHero />
      <ShoppingSearchFilter />
      
      <template v-if="hasResults">
        <ShoppingCuratedFinds />
        <ShoppingDistricts />
        <ShoppingSmartGuide />
      </template>
      
      <ShoppingEmptyState v-else />
    </main>

  </div>
</template>

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
