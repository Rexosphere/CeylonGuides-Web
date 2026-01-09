<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
    <div class="grid grid-cols-4 gap-2 max-w-md mx-auto">
      <!-- Ambulance (1990) -->
      <a 
        href="tel:1990" 
        class="flex flex-col items-center justify-center p-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 active:scale-95 transition-transform"
      >
        <div class="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mb-1 shadow-sm">
          <span class="material-symbols-outlined">emergency</span>
        </div>
        <span class="text-[10px] font-bold">1990</span>
      </a>

      <!-- Police (119) -->
      <a 
        href="tel:119" 
        class="flex flex-col items-center justify-center p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 active:scale-95 transition-transform"
      >
        <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1 shadow-sm">
          <span class="material-symbols-outlined">local_police</span>
        </div>
        <span class="text-[10px] font-bold">119</span>
      </a>

      <!-- Share Location -->
      <button 
        @click="scrollTo('share-location')" 
        class="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 active:scale-95 transition-transform"
      >
        <div class="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center mb-1 border border-neutral-200 dark:border-neutral-600 shadow-sm">
          <span class="material-symbols-outlined text-green-600 dark:text-green-400">share_location</span>
        </div>
        <span class="text-[10px] font-medium truncate w-full text-center">Share</span>
      </button>

      <!-- Nearest Hospital -->
      <button 
        @click="scrollTo('nearest-hospitals')" 
        class="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 active:scale-95 transition-transform"
      >
        <div class="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center mb-1 border border-neutral-200 dark:border-neutral-600 shadow-sm">
          <span class="material-symbols-outlined text-teal-600 dark:text-teal-400">local_hospital</span>
        </div>
        <span class="text-[10px] font-medium truncate w-full text-center">Hospital</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 16px);
}
</style>
