<template>
  <div class="flex flex-wrap items-center justify-between border-b border-border-light dark:border-border-dark mb-8 gap-4">
    <div class="flex overflow-x-auto hide-scrollbar gap-8">
      <a 
        class="flex flex-col items-center justify-center border-b-[3px] border-primary text-text-main dark:text-white pb-3 pt-2 min-w-max" 
        href="#"
      >
        <p class="text-sm font-bold leading-normal">All Topics</p>
      </a>
      <a 
        class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-text-subtle dark:text-gray-400 hover:text-primary dark:hover:text-primary pb-3 pt-2 min-w-max transition-colors" 
        href="#"
      >
        <p class="text-sm font-bold leading-normal">Trip Reports</p>
      </a>
      <a 
        class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-text-subtle dark:text-gray-400 hover:text-primary dark:hover:text-primary pb-3 pt-2 min-w-max transition-colors" 
        href="#"
      >
        <p class="text-sm font-bold leading-normal">Q&A</p>
      </a>
      <a 
        class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-text-subtle dark:text-gray-400 hover:text-primary dark:hover:text-primary pb-3 pt-2 min-w-max transition-colors" 
        href="#"
      >
        <p class="text-sm font-bold leading-normal">Find a Buddy</p>
      </a>
      <a 
        class="flex flex-col items-center justify-center border-b-[3px] border-transparent text-text-subtle dark:text-gray-400 hover:text-primary dark:hover:text-primary pb-3 pt-2 min-w-max transition-colors" 
        href="#"
      >
        <p class="text-sm font-bold leading-normal">Local Guides</p>
      </a>
    </div>
    
    <button class="hidden sm:flex items-center gap-2 bg-text-main dark:bg-surface-dark text-white dark:text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-sm">
      <span class="material-symbols-outlined text-[20px]">add</span>
      Start Discussion
    </button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
