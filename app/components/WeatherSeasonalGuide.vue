<template>
  <div class="bg-white dark:bg-weather-surface-dark rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-gray-800 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <h2 class="text-2xl md:text-3xl font-bold mb-3 text-weather-text-main dark:text-white">Best Time to Visit</h2>
      <p class="text-weather-text-muted">Select a region to see the optimal travel windows and seasonal highlights.</p>
    </div>
    <!-- Region Tabs -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button class="px-5 py-2 rounded-full bg-weather-primary text-white font-medium text-sm shadow-md">All Regions</button>
      <button class="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-weather-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm">West & South Coast</button>
      <button class="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-weather-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm">East Coast</button>
      <button class="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-weather-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm">Cultural Triangle</button>
    </div>
    <!-- Month Grid Visualization -->
    <div class="overflow-x-auto pb-4 no-scrollbar">
      <div class="min-w-[800px] grid grid-cols-12 gap-1 text-center">
        <!-- Months Header -->
        <div v-for="month in months" :key="month" class="text-xs font-bold text-weather-text-muted uppercase tracking-wider mb-2">{{ month }}</div>
        
        <!-- Row 1: South Coast -->
        <div class="col-span-12 flex items-center gap-4 mt-2 mb-1">
          <span class="text-sm font-bold w-32 text-left shrink-0 text-weather-text-main dark:text-white">South Coast</span>
          <div class="grid grid-cols-12 gap-1 w-full h-8">
            <div class="col-span-3 bg-weather-primary rounded-md flex items-center justify-center text-[10px] text-white font-bold" title="Peak Season">Peak</div>
            <div class="col-span-1 bg-[#f45c2566] rounded-md" title="Shoulder"></div>
            <div class="col-span-5 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-[10px] text-gray-500 font-medium" title="Monsoon">Monsoon</div>
            <div class="col-span-1 bg-[#f45c2566] rounded-md" title="Shoulder"></div>
            <div class="col-span-2 bg-weather-primary rounded-md flex items-center justify-center text-[10px] text-white font-bold">Peak</div>
          </div>
        </div>
        
        <!-- Row 2: East Coast -->
        <div class="col-span-12 flex items-center gap-4 mt-2 mb-1">
          <span class="text-sm font-bold w-32 text-left shrink-0 text-weather-text-main dark:text-white">East Coast</span>
          <div class="grid grid-cols-12 gap-1 w-full h-8">
            <div class="col-span-2 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-[10px] text-gray-500 font-medium">Rain</div>
            <div class="col-span-2 bg-[#f45c2566] rounded-md"></div>
            <div class="col-span-5 bg-weather-primary rounded-md flex items-center justify-center text-[10px] text-white font-bold">Best Time</div>
            <div class="col-span-1 bg-[#f45c2566] rounded-md"></div>
            <div class="col-span-2 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-[10px] text-gray-500 font-medium">Rain</div>
          </div>
        </div>
        
        <!-- Row 3: Hill Country -->
        <div class="col-span-12 flex items-center gap-4 mt-2 mb-1">
          <span class="text-sm font-bold w-32 text-left shrink-0 text-weather-text-main dark:text-white">Hill Country</span>
          <div class="grid grid-cols-12 gap-1 w-full h-8">
            <div class="col-span-3 bg-weather-primary rounded-md flex items-center justify-center text-[10px] text-white font-bold">Dry</div>
            <div class="col-span-6 bg-[#f45c2566] rounded-md flex items-center justify-center text-[10px] text-weather-text-main">Changeable</div>
            <div class="col-span-3 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-[10px] text-gray-500 font-medium">Wet</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
