<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col">
    <!-- Featured Hero Story -->
    <BlogHero :post="featuredPost" />
    
    <!-- Filter & Search Bar (Sticky under header) -->
    <BlogFilters />
    
    <!-- Dynamic Editorial Story Grid -->
    <BlogGrid :posts="filteredPosts" />
    
    <!-- Weekly Editorial Dispatch Newsletter -->
    <BlogNewsletter />
    
    <!-- Contributor Invitation Section -->
    <BlogCTA />
    
    <!-- Toast Notifications for Reading List -->
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
  title: 'CeylonGuide - Travel Stories & Journals from Sri Lanka',
  meta: [
    { 
      name: 'description', 
      content: 'Curated travel stories, scenic photo essays, and cultural journals across Sri Lanka. Explore the island through authentic articles.' 
    }
  ]
})
</script>
