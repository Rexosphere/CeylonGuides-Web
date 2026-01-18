<template>
  <div class="min-h-screen bg-stone-50 dark:bg-[#121212]">
    <!-- Hero Section -->
    <CultureHero />

    <!-- Sticky Navigation -->
    <CultureStickyNav />

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-10 relative z-10">
      <!-- Checklist Section -->
      <CultureChecklist />

      <!-- Temple Dress Code Section -->
      <TempleDressCode />

      <!-- Photography Guidelines Section -->
      <PhotographyRules />

      <!-- Cultural Do's & Don'ts Section -->
      <CulturalDosDonts />

      <!-- Cultural Calendar Section -->
      <CulturalCalendar />
    </main>
  </div>
</template>

<script setup lang="ts">
import CultureHero from '~/components/Culture/CultureHero.vue'
import CultureStickyNav from '~/components/Culture/CultureStickyNav.vue'
import CultureChecklist from '~/components/Culture/CultureChecklist.vue'
import TempleDressCode from '~/components/Culture/TempleDressCode.vue'
import PhotographyRules from '~/components/Culture/PhotographyRules.vue'
import CulturalDosDonts from '~/components/Culture/CulturalDosDonts.vue'
import CulturalCalendar from '~/components/Culture/CulturalCalendar.vue'

useHead({
  title: 'Cultural Etiquette Guide - CeylonWiki',
  meta: [
    { name: 'description', content: 'Essential cultural etiquette for temples, photography, dress code, and social customs in Sri Lanka.' }
  ]
})
</script>
