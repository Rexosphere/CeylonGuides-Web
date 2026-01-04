<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col">
      <ActivityHero />
      <ActivityFilters />
      <ActivityList />
      <ActivityFeatured />
      <ActivityNewsletter />
    </main>

  </div>
</template>

<script setup lang="ts">
import ActivityHero from '~/components/Activities/ActivityHero.vue'
import ActivityFilters from '~/components/Activities/ActivityFilters.vue'
import ActivityList from '~/components/Activities/ActivityList.vue'
import ActivityFeatured from '~/components/Activities/ActivityFeatured.vue'
import ActivityNewsletter from '~/components/Activities/ActivityNewsletter.vue'

useHead({
  title: 'Activities & Experiences - CeylonGuide',
  meta: [
    { name: 'description', content: 'Curated adventures in the Pearl of the Indian Ocean. From misty peaks to golden shores, discover authentic experiences.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Activities page (Orange Theme) */
.group\/design-root {
  --color-primary: #f45c25;
  --color-bg-light: #f8f6f5;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
}
</style>
