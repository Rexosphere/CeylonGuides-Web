<template>
  <div class="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-5">
    <h3 class="font-bold text-lg text-text-main dark:text-white mb-3">Community Activity</h3>
    
    <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-blue-50">
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-60" 
        style='background-image: url("/images/downloaded_9d8945823e78.avif");'
      ></div>
      
      <!-- Pin 1 -->
      <div class="absolute top-[60%] left-[40%] flex flex-col items-center group cursor-pointer">
        <div class="w-3 h-3 bg-primary rounded-full animate-ping absolute"></div>
        <span class="material-symbols-outlined text-primary text-2xl drop-shadow-md z-10">location_on</span>
        <div class="hidden group-hover:block absolute -top-8 bg-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">5 active threads in Ella</div>
      </div>
      
      <!-- Pin 2 -->
      <div class="absolute top-[40%] left-[30%] flex flex-col items-center group cursor-pointer">
        <span class="material-symbols-outlined text-text-main text-2xl drop-shadow-md hover:text-primary transition-colors z-10">location_on</span>
        <div class="hidden group-hover:block absolute -top-8 bg-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">Colombo Meetup</div>
      </div>
    </div>
    
    <p class="text-xs text-text-subtle mt-3 text-center">See where travelers are right now.</p>
  </div>
</template>

<script setup lang="ts">
</script>
