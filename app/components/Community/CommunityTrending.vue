<template>
  <div class="mb-12">
    <div class="flex items-center gap-2 mb-6">
      <span class="material-symbols-outlined text-primary">trending_up</span>
      <h2 class="font-bold text-xl text-text-main dark:text-white">Trending Now</h2>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="trend in trending" 
        :key="trend.id"
        class="bg-white dark:bg-card-dark p-5 rounded-xl border border-border-color dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined">tag</span>
          </div>
          <span class="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">Active</span>
        </div>
        
        <h3 class="font-bold text-text-main dark:text-white mb-1 group-hover:text-primary transition-colors">{{ trend.topic }}</h3>
        <p class="text-xs text-text-secondary dark:text-gray-400">{{ trend.posts }} Discussions</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommunity } from '~/composables/useCommunity'
const { trending } = useCommunity()
</script>
