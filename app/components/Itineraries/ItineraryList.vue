<template>
  <section class="py-16 px-4 sm:px-10 layout-container">
    <div class="flex items-end justify-between mb-8 px-2">
      <div>
        <h2 class="text-text-main dark:text-white text-3xl font-bold leading-tight tracking-tight mb-2">Curated Itineraries</h2>
        <p class="text-text-muted dark:text-neutral-400">Hand-picked routes by local experts</p>
      </div>
      <a class="hidden sm:flex items-center text-primary font-bold text-sm hover:underline" href="#">
        View all guides <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span>
      </a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Card 1 -->
      <div class="group cursor-pointer flex flex-col gap-3 bg-surface-light dark:bg-surface-dark p-3 rounded-xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/10">
        <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all z-10"></div>
          <div class="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700" role="img" aria-label="Ancient Sigiriya rock fortress rising from the jungle" style="background-image: url('/images/downloaded_42e12d701946.avif');"></div>
          <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold z-20 shadow-sm flex items-center gap-1 text-text-main dark:text-white">
            <span class="material-symbols-outlined text-xs">schedule</span> 3 Days
          </div>
        </div>
        <div class="px-1 pb-2">
          <div class="flex justify-between items-start mb-1">
            <p class="text-text-main dark:text-white text-lg font-bold leading-normal group-hover:text-primary transition-colors">The Cultural Triangle</p>
            <span class="text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-0.5 rounded">Heritage</span>
          </div>
          <p class="text-text-muted dark:text-neutral-400 text-sm font-normal leading-normal line-clamp-2">Explore ancient cities, sacred temples, and the magnificent Sigiriya rock fortress.</p>
          <div class="mt-4 pt-3 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between">
            <span class="text-xs font-medium text-text-muted">Est. $350/person</span>
            <span class="text-primary text-sm font-bold flex items-center">Explore <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span></span>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="group cursor-pointer flex flex-col gap-3 bg-surface-light dark:bg-surface-dark p-3 rounded-xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/10">
        <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all z-10"></div>
          <div class="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700" role="img" aria-label="Blue train traveling through lush green tea plantations" style="background-image: url('/images/downloaded_5ff6b6bbf9ad.avif');"></div>
          <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold z-20 shadow-sm flex items-center gap-1 text-text-main dark:text-white">
            <span class="material-symbols-outlined text-xs">schedule</span> 7 Days
          </div>
        </div>
        <div class="px-1 pb-2">
          <div class="flex justify-between items-start mb-1">
            <p class="text-text-main dark:text-white text-lg font-bold leading-normal group-hover:text-primary transition-colors">Hill Country & Tea Estates</p>
            <span class="text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded">Relaxed</span>
          </div>
          <p class="text-text-muted dark:text-neutral-400 text-sm font-normal leading-normal line-clamp-2">A scenic journey through misty mountains, waterfalls, and colonial tea bungalows.</p>
          <div class="mt-4 pt-3 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between">
            <span class="text-xs font-medium text-text-muted">Est. $680/person</span>
            <span class="text-primary text-sm font-bold flex items-center">Explore <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span></span>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="group cursor-pointer flex flex-col gap-3 bg-surface-light dark:bg-surface-dark p-3 rounded-xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/10">
        <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all z-10"></div>
          <div class="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700" role="img" aria-label="Beautiful sandy beach with palm trees at sunset" style="background-image: url('/images/downloaded_aac0d66ad44a.avif');"></div>
          <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold z-20 shadow-sm flex items-center gap-1 text-text-main dark:text-white">
            <span class="material-symbols-outlined text-xs">schedule</span> 14 Days
          </div>
        </div>
        <div class="px-1 pb-2">
          <div class="flex justify-between items-start mb-1">
            <p class="text-text-main dark:text-white text-lg font-bold leading-normal group-hover:text-primary transition-colors">Full Island Loop</p>
            <span class="text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 px-2 py-0.5 rounded">Adventure</span>
          </div>
          <p class="text-text-muted dark:text-neutral-400 text-sm font-normal leading-normal line-clamp-2">The ultimate Sri Lankan experience covering culture, wildlife, hills, and beaches.</p>
          <div class="mt-4 pt-3 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between">
            <span class="text-xs font-medium text-text-muted">Est. $1,400/person</span>
            <span class="text-primary text-sm font-bold flex items-center">Explore <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span></span>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>
