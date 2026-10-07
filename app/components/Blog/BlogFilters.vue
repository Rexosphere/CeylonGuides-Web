<template>
  <div class="sticky top-[73px] z-30 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-y border-gray-200/60 dark:border-white/10 transition-colors">
    <div class="px-4 md:px-6 lg:px-10 py-3.5 flex flex-col md:flex-row gap-3.5 md:items-center justify-between">
      
      <!-- Search & Categories Row -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 min-w-0">
        <!-- Search Input -->
        <div class="relative w-full sm:w-72 md:w-80 flex-shrink-0">
          <input 
            type="text" 
            placeholder="Search stories, topics, authors..." 
            class="w-full pl-9 pr-8 py-2 bg-white dark:bg-card-dark border border-gray-200 dark:border-neutral-700 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main dark:text-white placeholder:text-gray-400"
            v-model="searchQuery"
          >
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
          <button 
             v-if="searchQuery" 
             @click="setSearch('')"
             class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-main dark:hover:text-white"
             aria-label="Clear search"
          >
             <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <!-- Categories horizontal bar -->
        <div class="overflow-x-auto no-scrollbar flex items-center gap-1.5 py-0.5">
           <button 
             v-for="category in categories" 
             :key="category"
             @click="setCategory(category)"
             class="whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border"
             :class="activeCategory === category 
               ? 'bg-primary border-primary text-white shadow-sm' 
               : 'bg-white dark:bg-card-dark border-gray-200 dark:border-neutral-700 text-charcoal/80 dark:text-gray-300 hover:border-primary/40 hover:text-primary'"
           >
             {{ category }}
           </button>
        </div>
      </div>

      <!-- Filters & Sort Options -->
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0 justify-end">
         <!-- Duration Filter -->
         <select 
           v-model="filterReadTime" 
           class="px-3 py-1.5 bg-white dark:bg-card-dark border border-gray-200 dark:border-neutral-700 rounded-full text-xs font-semibold text-charcoal/80 dark:text-gray-300 outline-none focus:border-primary cursor-pointer hover:border-primary/40 transition-colors"
         >
             <option value="all">Any Duration</option>
             <option value="short">Quick (&lt; 5 min)</option>
             <option value="medium">Standard (5-8 min)</option>
             <option value="long">Deep Read (8+ min)</option>
         </select>
         
         <!-- Saved Stories Filter -->
         <button 
           @click="filterSavedOnly = !filterSavedOnly"
           class="flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-semibold transition-all"
           :class="filterSavedOnly 
             ? 'bg-primary border-primary text-white shadow-sm' 
             : 'bg-white dark:bg-card-dark border-gray-200 dark:border-neutral-700 text-charcoal/80 dark:text-gray-300 hover:border-primary/40 hover:text-primary'"
         >
             <span class="material-symbols-outlined text-[16px]" :class="filterSavedOnly ? 'filled' : ''">bookmark</span>
             <span>Saved</span>
             <span v-if="savedCount > 0" class="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px]" :class="filterSavedOnly ? 'bg-white text-primary' : 'bg-primary/10 text-primary'">
               {{ savedCount }}
             </span>
         </button>

         <!-- Reset button if filters active -->
         <button 
           v-if="activeCategory !== 'All Stories' || searchQuery || filterReadTime !== 'all' || filterSavedOnly"
           @click="resetFilters"
           class="flex items-center gap-1 px-2.5 py-1.5 text-xs text-primary font-semibold hover:underline"
           title="Reset all filters"
         >
           <span class="material-symbols-outlined text-[14px]">refresh</span>
           Reset
         </button>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlog } from '~/composables/useBlog'

const { 
  categories, 
  activeCategory, 
  setCategory, 
  searchQuery, 
  setSearch, 
  filterReadTime, 
  filterSavedOnly, 
  savedCount,
  resetFilters 
} = useBlog()
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
