<template>
  <div class="w-full lg:w-80 flex flex-col gap-8 shrink-0">
    
    <!-- Recent Searches Widget -->
    <div class="bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
      <div class="flex items-center justify-between mb-4">
        <h4 class="font-bold text-lg dark:text-white">Recent Searches</h4>
        <button class="text-xs text-primary font-medium hover:underline">Clear</button>
      </div>
      <ul class="flex flex-col gap-1">
        <li class="group flex items-center gap-3 p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors">
          <span class="material-symbols-outlined text-gray-400 group-hover:text-primary text-xl">history</span>
          <span class="text-sm text-gray-700 dark:text-gray-300 font-medium">Ella Train Schedule</span>
        </li>
        <li class="group flex items-center gap-3 p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors">
          <span class="material-symbols-outlined text-gray-400 group-hover:text-primary text-xl">history</span>
          <span class="text-sm text-gray-700 dark:text-gray-300 font-medium">Sigiriya Rock Fees</span>
        </li>
        <li class="group flex items-center gap-3 p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors">
          <span class="material-symbols-outlined text-gray-400 group-hover:text-primary text-xl">history</span>
          <span class="text-sm text-gray-700 dark:text-gray-300 font-medium">Galle Fort Hotels</span>
        </li>
      </ul>
    </div>

    <!-- Popular Suggestions Widget -->
    <div class="bg-white dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5">
      <h4 class="font-bold text-lg mb-5 dark:text-white">Trending in Sri Lanka</h4>
      <div class="flex flex-wrap gap-2">
        <a class="px-4 py-1.5 bg-background-light dark:bg-background-dark border border-transparent hover:border-primary/30 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-all" href="#">Yala Safari</a>
        <a class="px-4 py-1.5 bg-background-light dark:bg-background-dark border border-transparent hover:border-primary/30 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-all" href="#">Mirissa Whales</a>
        <a class="px-4 py-1.5 bg-background-light dark:bg-background-dark border border-transparent hover:border-primary/30 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-all" href="#">Tea Plantations</a>
        <a class="px-4 py-1.5 bg-background-light dark:bg-background-dark border border-transparent hover:border-primary/30 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-all" href="#">Surfing Arugam Bay</a>
        <a class="px-4 py-1.5 bg-background-light dark:bg-background-dark border border-transparent hover:border-primary/30 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 transition-all" href="#">Nine Arch Bridge</a>
      </div>
    </div>

    <!-- Featured Promo -->
    <div class="relative overflow-hidden rounded-xl h-72 flex items-end p-6 group cursor-pointer shadow-md">
      <div 
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
        style="background-image: url('/images/downloaded_161cd218c4e4.avif');"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      <div class="relative z-10 text-white">
        <div class="flex items-center gap-2 mb-2">
          <span class="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">MUST SEE</span>
        </div>
        <h5 class="text-xl font-bold leading-tight mb-2">Climb the 8th Wonder of the World</h5>
        <p class="text-xs text-gray-200 line-clamp-2 mb-3">Discover the ancient palace atop Sigiriya Rock and its marvelous frescoes.</p>
        <span class="text-xs font-bold underline decoration-primary decoration-2 underline-offset-4 group-hover:text-primary transition-colors">View Guide</span>
      </div>
    </div>

    <!-- Newsletter Tiny -->
    <div class="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/10">
      <div class="flex items-center gap-3 mb-2 text-primary">
        <span class="material-symbols-outlined">mail</span>
        <h4 class="font-bold text-sm uppercase tracking-wide">Travel Tips</h4>
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-400 mb-4">Get the latest Sri Lanka travel guides delivered to your inbox.</p>
      <div class="flex">
        <input 
          class="w-full text-sm px-3 py-2 rounded-l-lg border-none focus:ring-0 bg-white dark:bg-background-dark dark:text-white" 
          placeholder="Email address" 
          type="email"
        />
        <button class="bg-primary text-white px-3 py-2 rounded-r-lg hover:bg-orange-600 transition-colors">
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
</script>
