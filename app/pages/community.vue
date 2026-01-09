<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <CommunityHero />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CommunityTabs />
      <CommunityTrending />
      
      <!-- 2 Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: Feed -->
        <div class="lg:col-span-8 flex flex-col gap-6">
           <button @click="showPostCreator = true" class="hidden sm:flex w-full items-center gap-3 p-4 bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 shadow-sm hover:border-primary/50 transition-colors group text-left">
             <div class="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <span class="material-symbols-outlined text-text-secondary">edit</span>
             </div>
             <div class="flex-1">
               <span class="block text-sm font-bold text-text-muted group-hover:text-text-main dark:group-hover:text-white transition-colors">Start a discussion...</span>
             </div>
             <div class="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold">Post</div>
           </button>

           <CommunityDiscussions />
        </div>
        
        <!-- Right Column: Sidebar -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <!-- Mobile CTA Button -->
          <button @click="showPostCreator = true" class="w-full flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white py-3 rounded-xl font-bold shadow-md transition-colors active:scale-95">
            <span class="material-symbols-outlined">add</span> Start Discussion
          </button>
          
          <CommunityLocalGuides />
          <CommunityStats />
          <CommunityActivityMap />
          <CommunityGuidelines />
        </div>
      </div>
    </main>
    
    <!-- Floating Action Button (Mobile) -->
    <button @click="showPostCreator = true" class="fixed bottom-8 right-8 bg-primary hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 z-40 lg:hidden">
      <span class="material-symbols-outlined text-2xl">edit</span>
    </button>
    
    <CommunityPostCreator :is-open="showPostCreator" @close="showPostCreator = false" />
    
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
import CommunityPostCreator from '~/components/Community/CommunityPostCreator.vue'
import CommunityStats from '~/components/Community/CommunityStats.vue'
import { ref } from 'vue'

const showPostCreator = ref(false)

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
