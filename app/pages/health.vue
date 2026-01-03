<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col items-center">
      <HealthHero />
      <HealthQuickNav />
      <HealthVaccinations />
      <HealthInsurance />
      <HealthConcerns />
      <HealthFoodSafety />
      <HealthMedicalDirectory />
    </main>

  </div>
</template>

<script setup lang="ts">
import HealthHero from '~/components/HealthHero.vue'
import HealthQuickNav from '~/components/HealthQuickNav.vue'
import HealthVaccinations from '~/components/HealthVaccinations.vue'
import HealthInsurance from '~/components/HealthInsurance.vue'
import HealthConcerns from '~/components/HealthConcerns.vue'
import HealthFoodSafety from '~/components/HealthFoodSafety.vue'
import HealthMedicalDirectory from '~/components/HealthMedicalDirectory.vue'

useHead({
  title: 'Travel Insurance & Health - CeylonGuide',
  meta: [
    { name: 'description', content: 'Your comprehensive guide to health, vaccinations, and insurance for a worry-free journey through Sri Lanka. Stay safe in paradise.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Health page */
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
}
</style>
