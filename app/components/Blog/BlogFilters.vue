<template>
  <div class="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-neutral-800 transition-colors">
    <div class="px-4 md:px-6 lg:px-10 py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
      
      <!-- Search & Categories Row -->
      <div class="flex flex-col gap-4 flex-1">
        <!-- Search -->
        <div class="relative w-full md:max-w-md">
          <input 
            type="text" 
            placeholder="Search stories which inspire you..." 
            class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-card-dark border border-gray-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main dark:text-white placeholder:text-text-muted"
            v-model="searchQuery"
          >
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">search</span>
          <button 
             v-if="searchQuery" 
             @click="setSearch('')"
             class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
          >
             <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Categories (Mobile Scrollable) -->
        <div class="overflow-x-auto no-scrollbar flex items-center gap-2">
           <button 
             v-for="category in categories" 
             :key="category"
             @click="setCategory(category)"
             class="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border"
             :class="activeCategory === category 
               ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' 
               : 'bg-white dark:bg-card-dark border-transparent text-text-secondary dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5 hover:border-gray-200 dark:hover:border-neutral-600'"
           >
             {{ category }}
           </button>
        </div>
      </div>

      <!-- Filters & Sort Row -->
      <div class="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 md:pb-0">
         <!-- Sort -->
         <div class="relative group/sort flex-shrink-0">
             <button class="flex items-center gap-2 px-3 py-2 bg-white dark:bg-card-dark border border-gray-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-text-secondary hover:border-primary/50 transition-colors">
                 <span class="material-symbols-outlined text-[18px]">sort</span>
                 {{ sortBy === 'newest' ? 'Newest First' : 'Popular First' }}
                 <span class="material-symbols-outlined text-[18px]">expand_more</span>
             </button>
             <div class="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-card-dark border border-gray-200 dark:border-neutral-700 rounded-xl shadow-xl overflow-hidden invisible opacity-0 group-hover/sort:visible group-hover/sort:opacity-100 transition-all z-40 transform origin-top-right">
                  <button @click="sortBy = 'newest'" class="w-full text-left px-4 py-2 hover:bg-neutral-50 dark:hover:bg-white/5 text-xs font-medium" :class="sortBy === 'newest' ? 'text-primary' : 'text-text-secondary'">Newest First</button>
                  <button @click="sortBy = 'popular'" class="w-full text-left px-4 py-2 hover:bg-neutral-50 dark:hover:bg-white/5 text-xs font-medium" :class="sortBy === 'popular' ? 'text-primary' : 'text-text-secondary'">Popular First</button>
             </div>
         </div>
         
         <!-- Divider -->
         <div class="w-px h-6 bg-gray-200 dark:bg-neutral-700 mx-1 flex-shrink-0"></div>

         <!-- Read Time -->
         <select v-model="filterReadTime" class="px-3 py-2 bg-white dark:bg-card-dark border border-gray-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-text-secondary outline-none focus:border-primary cursor-pointer flex-shrink-0 appearance-none pr-8 relative">
             <option value="all">Any Duration</option>
             <option value="short">&lt; 5 mins</option>
             <option value="medium">5-10 mins</option>
             <option value="long">10+ mins</option>
         </select>
         
         <!-- Saved Only -->
         <button 
           @click="filterSavedOnly = !filterSavedOnly"
           class="flex items-center gap-2 px-3 py-2 border rounded-lg text-xs font-bold flex-shrink-0 transition-colors"
           :class="filterSavedOnly ? 'bg-primary/10 border-primary text-primary' : 'bg-white dark:bg-card-dark border-gray-200 dark:border-neutral-700 text-text-secondary hover:border-text-secondary/50'"
         >
             <span class="material-symbols-outlined text-[18px]" :class="filterSavedOnly ? 'filled' : ''">bookmark</span>
             Saved
         </button>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlog } from '~/composables/useBlog'

const { categories, activeCategory, setCategory, searchQuery, setSearch, sortBy, filterReadTime, filterSavedOnly } = useBlog()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
