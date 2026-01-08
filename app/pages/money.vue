<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col">
      <MoneyHero />
      <MoneyStats />
      <MoneyConverter />
      <MoneyATM />
      <MoneyBudget />
      <MoneyScamAlert />
    </main>

  </div>
</template>

<script setup lang="ts">
import MoneyHero from '~/components/Money/MoneyHero.vue'
import MoneyStats from '~/components/Money/MoneyStats.vue'
import MoneyConverter from '~/components/Money/MoneyConverter.vue'
import MoneyATM from '~/components/Money/MoneyATM.vue'
import MoneyBudget from '~/components/Money/MoneyBudget.vue'
import MoneyScamAlert from '~/components/Money/MoneyScamAlert.vue'

useHead({
  title: 'Money & Currency - CeylonGuide',
  meta: [
    { name: 'description', content: 'Essential guide to Money & Currency in Sri Lanka. Rupee (LKR) exchange rates, ATM locations, daily budgets, and tipping etiquette.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Money page (Orange-Red Theme) */
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
  /* Matching HTML: text-muted is #896c61, which is close to our global default but we can leave it to inherit or set if needed. */
}
</style>
