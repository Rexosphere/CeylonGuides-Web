<template>
  <div class="mb-12">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-[#181311] dark:text-white">Filter by Category</h3>
    </div>
    
    <div class="flex gap-3 overflow-x-auto no-scrollbar pb-2">
      <button class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#181311] dark:bg-primary text-white px-5 transition-transform hover:scale-105 active:scale-95">
        <span class="text-sm font-medium">All Regions</span>
      </button>
      
      <button class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-white dark:bg-surface-dark border border-[#e0dad7] dark:border-[#3a2e2a] px-5 hover:border-primary group transition-colors">
        <span class="material-symbols-outlined text-[18px] text-[#896c61] dark:text-[#a0908a] group-hover:text-primary">landscape</span>
        <span class="text-[#181311] dark:text-[#d0c9c6] text-sm font-medium">Hill Country</span>
      </button>
      
      <button class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-white dark:bg-surface-dark border border-[#e0dad7] dark:border-[#3a2e2a] px-5 hover:border-primary group transition-colors">
        <span class="material-symbols-outlined text-[18px] text-[#896c61] dark:text-[#a0908a] group-hover:text-primary">water_drop</span>
        <span class="text-[#181311] dark:text-[#d0c9c6] text-sm font-medium">South Coast</span>
      </button>
      
      <button class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-white dark:bg-surface-dark border border-[#e0dad7] dark:border-[#3a2e2a] px-5 hover:border-primary group transition-colors">
        <span class="material-symbols-outlined text-[18px] text-[#896c61] dark:text-[#a0908a] group-hover:text-primary">temple_buddhist</span>
        <span class="text-[#181311] dark:text-[#d0c9c6] text-sm font-medium">Cultural Triangle</span>
      </button>
      
      <button class="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-white dark:bg-surface-dark border border-[#e0dad7] dark:border-[#3a2e2a] px-5 hover:border-primary group transition-colors">
        <span class="material-symbols-outlined text-[18px] text-[#896c61] dark:text-[#a0908a] group-hover:text-primary">flight</span>
        <span class="text-[#181311] dark:text-[#d0c9c6] text-sm font-medium">Drone Friendly</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
