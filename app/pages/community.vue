<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <CommunityHero />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CommunityTabs />
      <CommunityTrending />
      
      <!-- 2 Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: Feed -->
        <CommunityDiscussions />
        
        <!-- Right Column: Sidebar -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <!-- Mobile CTA Button -->
          <button class="sm:hidden w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold shadow-md">
            <span class="material-symbols-outlined">add</span> Start Discussion
          </button>
          
          <CommunityLocalGuides />
          <CommunityActivityMap />
          <CommunityGuidelines />
        </div>
      </div>
    </main>
    
    <!-- Floating Action Button (Mobile) -->
    <button class="fixed bottom-8 right-8 bg-primary hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-40 lg:hidden">
      <span class="material-symbols-outlined text-2xl">edit</span>
    </button>
    
  </div>
</template>

<script setup lang="ts">
import CommunityHero from '~/components/Community/CommunityHero.vue'
import CommunityTabs from '~/components/Community/CommunityTabs.vue'
import CommunityTrending from '~/components/Community/CommunityTrending.vue'
import CommunityDiscussions from '~/components/Community/CommunityDiscussions.vue'
import CommunityLocalGuides from '~/components/Community/CommunityLocalGuides.vue'
import CommunityActivityMap from '~/components/Community/CommunityActivityMap.vue'
import CommunityGuidelines from '~/components/Community/CommunityGuidelines.vue'

useHead({
  title: 'CeylonGuide - Community',
  meta: [
    { name: 'description', content: 'Connect with fellow Ceylon travelers. Share experiences, ask questions, and find local guides for your Sri Lankan adventure.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Community page */
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
  --color-surface-light: #ffffff;
  --color-surface-dark: #2c201b;
}
</style>
