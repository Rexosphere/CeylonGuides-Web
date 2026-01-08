<script setup lang="ts">
import ShoppingHero from '~/components/Shopping/ShoppingHero.vue'
import ShoppingStickyNav from '~/components/Shopping/ShoppingStickyNav.vue'
import ShoppingSearchFilter from '~/components/Shopping/ShoppingSearchFilter.vue'
import ShoppingCuratedFinds from '~/components/Shopping/ShoppingCuratedFinds.vue'
import ShoppingDistrictsMap from '~/components/Shopping/ShoppingDistrictsMap.vue'
import ShoppingDistrictsList from '~/components/Shopping/ShoppingDistrictsList.vue'
import ShoppingSmartAssistant from '~/components/Shopping/ShoppingSmartAssistant.vue'
import ShoppingGuide from '~/components/Shopping/ShoppingGuide.vue'
import ShoppingVatRefund from '~/components/Shopping/ShoppingVatRefund.vue'

useHead({
  title: 'Shopping Guide - CeylonGuide',
  meta: [
    { name: 'description', content: 'The ultimate guide to authentic souvenirs, bustling markets, and smart shopping in Sri Lanka. From Ceylon tea to sapphires.' }
  ]
})
</script>

<template>
  <div class="bg-white dark:bg-slate-900 min-h-screen text-slate-900 dark:text-white font-sans">
    <ShoppingHero />
    <ShoppingStickyNav />
    <main class="max-w-6xl mx-auto px-4 py-10 space-y-20">
      <ShoppingSearchFilter />
      <ShoppingCuratedFinds />
      <ShoppingDistrictsMap />
      <ShoppingDistrictsList />
      <ShoppingSmartAssistant />
      <ShoppingGuide />
      <ShoppingVatRefund />
    </main>
  </div>
</template>
