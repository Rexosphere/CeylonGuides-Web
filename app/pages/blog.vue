<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col">
    
    <BlogHero :post="featuredPost" />
    <BlogFilters />
    <BlogGrid :posts="filteredPosts" />
    <BlogNewsletter />
    <BlogCTA />
    <Toast />
    
  </div>
</template>

<script setup lang="ts">
import BlogHero from '~/components/Blog/BlogHero.vue'
import BlogFilters from '~/components/Blog/BlogFilters.vue'
import BlogGrid from '~/components/Blog/BlogGrid.vue'
import BlogNewsletter from '~/components/Blog/BlogNewsletter.vue'
import BlogCTA from '~/components/Blog/BlogCTA.vue'
import Toast from '~/components/UI/Toast.vue'
import { useBlog } from '~/composables/useBlog'

const { featuredPost, filteredPosts } = useBlog()

useHead({
  title: 'CeylonWiki - Blog & Travel Stories',
  meta: [
    { name: 'description', content: 'Read inspiring travel stories, hidden gems, and community experiences from Sri Lanka. Join our community of travelers sharing their Ceylon adventures.' }
  ]
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
}
</style>
