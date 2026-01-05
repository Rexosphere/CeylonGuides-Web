<template>
  <nav class="sticky top-[65px] z-40 bg-white/95 dark:bg-[#1a100c]/95 backdrop-blur border-b border-[#e6dedb] dark:border-gray-800 shadow-sm w-full overflow-x-auto">
    <div class="max-w-[1200px] mx-auto px-4 md:px-10 flex gap-6 md:gap-10 py-3 text-sm md:text-base font-medium whitespace-nowrap scrollbar-hide">
      <a 
        class="text-primary border-b-2 border-primary pb-0.5" 
        href="#vaccinations"
      >
        Vaccinations
      </a>
      <a 
        class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" 
        href="#insurance"
      >
        Insurance
      </a>
      <a 
        class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" 
        href="#concerns"
      >
        Common Concerns
      </a>
      <a 
        class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" 
        href="#safety"
      >
        Food & Water
      </a>
      <a 
        class="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" 
        href="#hospitals"
      >
        Medical Directory
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
