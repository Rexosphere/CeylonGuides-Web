<template>
  <div class="bg-primary/5 rounded-xl border border-primary/10 p-5">
    <h3 class="font-bold text-sm text-text-main dark:text-white mb-4 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">equalizer</span> Community Pulse
    </h3>
    
    <div class="grid grid-cols-3 gap-2">
       <!-- Users Online -->
       <div class="bg-white dark:bg-card-dark p-2 rounded-lg text-center shadow-sm border border-border-color dark:border-neutral-700">
          <span class="material-symbols-outlined text-green-500 text-[20px] mb-1">group</span>
          <div class="text-lg font-bold text-text-main dark:text-white">128</div>
          <div class="text-[10px] text-text-secondary uppercase font-bold">Online</div>
       </div>

       <!-- Posts Today -->
       <div class="bg-white dark:bg-card-dark p-2 rounded-lg text-center shadow-sm border border-border-color dark:border-neutral-700">
          <span class="material-symbols-outlined text-blue-500 text-[20px] mb-1">post_add</span>
          <div class="text-lg font-bold text-text-main dark:text-white">42</div>
          <div class="text-[10px] text-text-secondary uppercase font-bold">New Posts</div>
       </div>

       <!-- Top Region -->
       <div class="bg-white dark:bg-card-dark p-2 rounded-lg text-center shadow-sm border border-border-color dark:border-neutral-700">
          <span class="material-symbols-outlined text-orange-500 text-[20px] mb-1">location_on</span>
          <div class="text-sm font-bold text-text-main dark:text-white truncate">Ella</div>
          <div class="text-[10px] text-text-secondary uppercase font-bold">Trending</div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
