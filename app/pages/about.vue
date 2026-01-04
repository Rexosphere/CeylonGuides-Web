<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-[#181311] dark:text-white antialiased">
    <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      
      <main class="flex flex-col items-center">
        <AboutHero />
        <AboutMission />
        <AboutProblemSolution />
        <AboutTeam />
        <AboutCTA />
      </main>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import AboutHero from '~/components/About/AboutHero.vue'
import AboutMission from '~/components/About/AboutMission.vue'
import AboutProblemSolution from '~/components/About/AboutProblemSolution.vue'
import AboutTeam from '~/components/About/AboutTeam.vue'
import AboutCTA from '~/components/About/AboutCTA.vue'

useHead({
  title: 'About & Mission - CeylonGuide',
  meta: [
    { name: 'description', content: 'Learn about CeylonGuide\'s mission to simplify travel planning and unveil the authentic soul of Sri Lanka. Meet our team of passionate explorers.' }
  ]
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
}
</style>
