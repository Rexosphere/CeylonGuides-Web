<template>
  <div class="mb-12">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-text-main dark:text-white text-2xl font-bold tracking-tight">Trending in Sri Lanka</h2>
      <a class="text-primary text-sm font-bold hover:underline" href="#">View all</a>
    </div>
    
    <div class="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
      <!-- Card 1 -->
      <div class="min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-md transition-all cursor-pointer">
        <div 
          class="h-40 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
          style='background-image: url("/images/downloaded_5dcf59d2f707.avif");'
        ></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wide">Trip Report</span>
            <span class="text-xs text-text-subtle">2 days ago</span>
          </div>
          <h3 class="text-text-main dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">The Ultimate 10-day Itinerary: Kandy to Ella by Train</h3>
          <div class="flex items-center gap-2 mt-2">
            <div 
              class="w-6 h-6 rounded-full bg-gray-200 bg-cover" 
              style='background-image: url("/images/downloaded_4cb15ccc7bcc.avif")'
            ></div>
            <span class="text-sm text-text-subtle">Sarah Jenkins</span>
          </div>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-md transition-all cursor-pointer">
        <div 
          class="h-40 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
          style='background-image: url("/images/downloaded_f53be3a1dc76.avif");'
        ></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wide">Guide</span>
            <span class="text-xs text-text-subtle">5 hours ago</span>
          </div>
          <h3 class="text-text-main dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">Hidden spots for the best sunset in Galle Fort</h3>
          <div class="flex items-center gap-2 mt-2">
            <div 
              class="w-6 h-6 rounded-full bg-gray-200 bg-cover" 
              style='background-image: url("/images/downloaded_903db0d83532.avif")'
            ></div>
            <span class="text-sm text-text-subtle">Mark Thompson</span>
          </div>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-md transition-all cursor-pointer">
        <div 
          class="h-40 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
          style='background-image: url("/images/downloaded_e0c463a1ec1e.avif");'
        ></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wide">Q&A</span>
            <span class="text-xs text-text-subtle">1 day ago</span>
          </div>
          <h3 class="text-text-main dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">Is it better to hike Sigiriya in the morning or evening?</h3>
          <div class="flex items-center gap-2 mt-2">
            <div 
              class="w-6 h-6 rounded-full bg-gray-200 bg-cover" 
              style='background-image: url("/images/downloaded_64a499dbd74d.avif")'
            ></div>
            <span class="text-sm text-text-subtle">Alex & Sam</span>
          </div>
        </div>
      </div>
      
      <!-- Card 4 -->
      <div class="min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark overflow-hidden group hover:shadow-md transition-all cursor-pointer">
        <div 
          class="h-40 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
          style='background-image: url("/images/downloaded_e3ffaa4ce494.avif");'
        ></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wide">Meetup</span>
            <span class="text-xs text-text-subtle">Just now</span>
          </div>
          <h3 class="text-text-main dark:text-white font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">Anyone in Mirissa next week for surfing?</h3>
          <div class="flex items-center gap-2 mt-2">
            <div 
              class="w-6 h-6 rounded-full bg-gray-200 bg-cover" 
              style='background-image: url("/images/downloaded_6065ddd282ab.avif")'
            ></div>
            <span class="text-sm text-text-subtle">Kai S.</span>
          </div>
        </div>
      </div>
    </div>
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
