<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col">
      <ActivityHero />
      <ActivityFilters
        :categories="categories"
        :category="selectedCategory"
        @update:category="selectedCategory = $event"
      />
      <ActivityList :category="selectedCategory" />
      <ActivityFeatured />
      <ActivityNewsletter />
    </main>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ActivityHero from '~/components/Activities/ActivityHero.vue'
import ActivityFilters from '~/components/Activities/ActivityFilters.vue'
import ActivityList from '~/components/Activities/ActivityList.vue'
import ActivityFeatured from '~/components/Activities/ActivityFeatured.vue'
import ActivityNewsletter from '~/components/Activities/ActivityNewsletter.vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const selectedCategory = ref<string | null>(null)

const { data: categoriesResponse } = await useFetch<{
  success: boolean
  data: Array<{ category: string; count: number }>
}>(`${apiBase}/api/activities/categories/list`)

const categories = computed(() => categoriesResponse.value?.data || [])

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
