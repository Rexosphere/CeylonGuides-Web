<template>
  <div class="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-white/5 py-8 md:py-12">
    <div class="layout-container max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
      <div class="w-full max-w-3xl flex flex-col gap-6">
        
        <!-- Search Bar -->
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span class="material-symbols-outlined text-[#896c61] dark:text-gray-400 text-2xl">search</span>
          </div>
          <input 
            class="block w-full pl-12 pr-12 py-4 bg-background-light dark:bg-background-dark border-none rounded-xl text-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 shadow-inner transition-all" 
            placeholder="Where do you want to go?" 
            type="text" 
            value="Kandy"
          />
          <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
            <button class="text-[#896c61] hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
              <span class="material-symbols-outlined">cancel</span>
            </button>
          </div>
        </div>
        
        <!-- Filter Chips -->
        <div class="flex gap-3 flex-wrap justify-center sm:justify-start">
          <button class="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 transition-transform hover:scale-105">
            <span>All</span>
          </button>
          <button class="flex items-center gap-2 px-5 py-2 rounded-full bg-background-light dark:bg-background-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 text-sm font-medium transition-colors border border-transparent hover:border-gray-300 dark:hover:border-gray-600">
            <span class="material-symbols-outlined text-lg">location_on</span>
            <span>Destinations</span>
          </button>
          <button class="flex items-center gap-2 px-5 py-2 rounded-full bg-background-light dark:bg-background-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 text-sm font-medium transition-colors border border-transparent hover:border-gray-300 dark:hover:border-gray-600">
            <span class="material-symbols-outlined text-lg">hotel</span>
            <span>Accommodations</span>
          </button>
          <button class="flex items-center gap-2 px-5 py-2 rounded-full bg-background-light dark:bg-background-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 text-sm font-medium transition-colors border border-transparent hover:border-gray-300 dark:hover:border-gray-600">
            <span class="material-symbols-outlined text-lg">hiking</span>
            <span>Activities</span>
          </button>
          <button class="flex items-center gap-2 px-5 py-2 rounded-full bg-background-light dark:bg-background-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 text-sm font-medium transition-colors border border-transparent hover:border-gray-300 dark:hover:border-gray-600">
            <span class="material-symbols-outlined text-lg">article</span>
            <span>Articles</span>
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
