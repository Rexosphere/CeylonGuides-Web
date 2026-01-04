<template>
  <div class="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-lg text-text-main dark:text-white">Meet a Local</h3>
      <a class="text-xs font-bold text-primary hover:underline" href="#">View All</a>
    </div>
    
    <div class="flex flex-col gap-4">
      <!-- Guide 1 -->
      <div class="flex items-center gap-3 pb-3 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
        <div 
          class="w-12 h-12 rounded-full bg-cover" 
          style='background-image: url("/images/downloaded_8bed672b2757.avif");'
        ></div>
        <div class="flex-1">
          <h4 class="font-bold text-sm text-text-main dark:text-white">Chamara Perera</h4>
          <div class="flex items-center text-xs text-text-subtle">
            <span class="material-symbols-outlined text-[14px] text-yellow-500 mr-1">star</span>
            4.9 • Kandy Expert
          </div>
        </div>
        <button class="p-2 rounded-full bg-background-light dark:bg-gray-800 text-primary hover:bg-primary hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[20px]">mail</span>
        </button>
      </div>
      
      <!-- Guide 2 -->
      <div class="flex items-center gap-3 pb-3 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
        <div 
          class="w-12 h-12 rounded-full bg-cover" 
          style='background-image: url("/images/downloaded_9444334a05e9.avif");'
        ></div>
        <div class="flex-1">
          <h4 class="font-bold text-sm text-text-main dark:text-white">Nimali Silva</h4>
          <div class="flex items-center text-xs text-text-subtle">
            <span class="material-symbols-outlined text-[14px] text-yellow-500 mr-1">star</span>
            5.0 • Wildlife Guide
          </div>
        </div>
        <button class="p-2 rounded-full bg-background-light dark:bg-gray-800 text-primary hover:bg-primary hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[20px]">mail</span>
        </button>
      </div>
      
      <!-- Guide 3 -->
      <div class="flex items-center gap-3 pb-3 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
        <div 
          class="w-12 h-12 rounded-full bg-cover" 
          style='background-image: url("/images/downloaded_7239a297101a.avif");'
        ></div>
        <div class="flex-1">
          <h4 class="font-bold text-sm text-text-main dark:text-white">Kasun Raj</h4>
          <div class="flex items-center text-xs text-text-subtle">
            <span class="material-symbols-outlined text-[14px] text-yellow-500 mr-1">star</span>
            4.8 • Surfing Instructor
          </div>
        </div>
        <button class="p-2 rounded-full bg-background-light dark:bg-gray-800 text-primary hover:bg-primary hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[20px]">mail</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
