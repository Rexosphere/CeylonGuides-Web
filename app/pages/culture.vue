<template>
  <div class="bg-culture-bg-light dark:bg-background-dark text-culture-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="layout-container flex h-full grow flex-col items-center">
      <CultureHero />
      <CultureQuickGuidelines />
      <CultureDressCode />
      <CulturePhotography />
      <CultureDoDont />
      <CultureCalendar />
    </main>

  </div>
</template>

<script setup lang="ts">
import CultureHero from '~/components/CultureHero.vue'
import CultureQuickGuidelines from '~/components/CultureQuickGuidelines.vue'
import CultureDressCode from '~/components/CultureDressCode.vue'
import CulturePhotography from '~/components/CulturePhotography.vue'
import CultureDoDont from '~/components/CultureDoDont.vue'
import CultureCalendar from '~/components/CultureCalendar.vue'

useHead({
  title: 'Cultural Guide & Etiquette - CeylonGuide',
  meta: [
    { name: 'description', content: 'Essential cultural etiquette and guidelines for a respectful journey through the sacred lands of Sri Lanka.' }
  ]
})
</script>
