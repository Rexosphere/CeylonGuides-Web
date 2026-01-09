<template>
  <div class="bg-white dark:bg-card-dark rounded-2xl border border-border-color dark:border-neutral-700 p-5 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-lg text-text-main dark:text-white">Meet a Local</h3>
      <a class="text-xs font-bold text-primary hover:underline cursor-pointer">View All</a>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 mb-5 overflow-x-auto no-scrollbar pb-1">
       <button 
         v-for="filter in filters" 
         :key="filter"
         @click="activeFilter = filter"
         class="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors border"
         :class="activeFilter === filter 
           ? 'bg-primary text-white border-primary' 
           : 'bg-background-light dark:bg-white/5 text-text-secondary dark:text-gray-400 border-transparent hover:border-border-color dark:hover:border-neutral-600'"
       >
         {{ filter }}
       </button>
    </div>
    
    <div class="flex flex-col gap-4">
      <div 
        v-for="guide in filteredGuides" 
        :key="guide.id"
        class="pb-4 border-b border-border-color dark:border-neutral-700 last:border-0 last:pb-0 group"
      >
        <!-- Header -->
        <div class="flex items-start gap-3 mb-2">
           <div class="relative">
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center text-blue-600 text-sm font-bold">
                 {{ guide.name.charAt(0) }}
              </div>
              <div v-if="guide.verified" class="absolute -bottom-1 -right-1 bg-white dark:bg-card-dark rounded-full p-0.5">
                <span class="material-symbols-outlined text-[14px] text-blue-500 filled">verified</span>
              </div>
           </div>
           <div class="flex-1 min-w-0">
             <div class="flex items-center justify-between">
                <h4 class="font-bold text-sm text-text-main dark:text-white truncate">{{ guide.name }}</h4>
                <div class="flex items-center text-xs font-bold text-text-main dark:text-white">
                   <span class="material-symbols-outlined text-[14px] text-yellow-500 filled mr-0.5">star</span>
                   {{ guide.rating }}
                </div>
             </div>
             <p class="text-xs text-text-secondary dark:text-gray-400 truncate">{{ guide.location }}</p>
           </div>
        </div>

        <!-- Bio -->
        <p class="text-xs text-text-secondary dark:text-gray-300 leading-relaxed mb-3 line-clamp-2">
          {{ guide.bio }}
        </p>

        <!-- Tags & Response -->
        <div class="flex flex-wrap items-center gap-2 mb-3">
           <span v-for="tag in guide.specialties?.slice(0, 2)" :key="tag" class="px-2 py-0.5 bg-background-light dark:bg-white/5 rounded text-[10px] font-medium text-text-secondary dark:text-gray-400">
             {{ tag }}
           </span>
           <span class="ml-auto text-[10px] font-bold text-green-600 dark:text-green-400 flex items-center gap-1 bg-green-50 dark:bg-green-900/10 px-1.5 py-0.5 rounded">
             <span class="material-symbols-outlined text-[10px]">bolt</span> {{ guide.responseTime }}
           </span>
        </div>

        <!-- Actions -->
        <div class="grid grid-cols-2 gap-2">
           <button class="py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-sm shadow-primary/20">
             Message
           </button>
           <button class="py-1.5 rounded-lg border border-border-color dark:border-neutral-700 text-text-main dark:text-white text-xs font-bold hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
             View Profile
           </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCommunity } from '~/composables/useCommunity'

const { users } = useCommunity()

const filters = ['Top Rated', 'Nearby', 'Fast Replies']
const activeFilter = ref('Top Rated')

const filteredGuides = computed(() => {
  // Filter only guides
  let guides = users.value.filter(u => u.role === 'Local Guide' || u.role === 'Local Expert') as any[]

  // Mock Sorting/Filtering logic
  if (activeFilter.value === 'Top Rated') {
     guides = guides.sort((a, b) => b.rating - a.rating)
  } else if (activeFilter.value === 'Fast Replies') {
     // Mock logic: put "Instant" or "< 1 hr" first
     guides = guides.sort((a, b) => a.responseTime.localeCompare(b.responseTime))
  }
  
  // Return top 3
  return guides.slice(0, 3)
})
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
