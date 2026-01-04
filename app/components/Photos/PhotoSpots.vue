<template>
  <div class="mb-16">
    <div class="flex items-end justify-between mb-6">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-[#181311] dark:text-white tracking-tight">Popular Spots</h2>
        <p class="text-[#896c61] dark:text-[#a0908a] mt-1">Curated locations with ideal lighting conditions.</p>
      </div>
      <a class="hidden sm:flex items-center text-primary font-bold text-sm hover:underline" href="#">
        View All
        <span class="material-symbols-outlined text-lg ml-1">arrow_forward</span>
      </a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1: Nine Arches -->
      <div class="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#f4f1f0] dark:border-[#3a2e2a]">
        <div class="relative aspect-[4/3] overflow-hidden">
          <div class="absolute top-3 right-3 z-20">
            <span class="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
              <span class="material-symbols-outlined text-xs text-yellow-400">sunny</span>
              05:55 AM
            </span>
          </div>
          <div 
            class="bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-110" 
            style="background-image: url('/images/downloaded_f999a39c7eaa.avif');"
          ></div>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-bold text-[#181311] dark:text-white leading-tight group-hover:text-primary transition-colors">Nine Arches Bridge</h3>
              <div class="flex items-center gap-1 text-[#896c61] dark:text-[#a0908a] text-sm mt-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                Ella, Badulla District
              </div>
            </div>
          </div>
          <!-- Badges -->
          <div class="flex flex-wrap gap-2 mt-4 mb-4">
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
              <span class="material-symbols-outlined text-sm">flight</span> Drone OK
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-medium">
              <span class="material-symbols-outlined text-sm">photo_camera</span> Portrait
            </span>
          </div>
          <button class="mt-auto w-full py-2.5 rounded-lg border border-[#e0dad7] dark:border-[#3a2e2a] text-[#181311] dark:text-white text-sm font-bold hover:bg-[#f4f1f0] dark:hover:bg-[#3a2e2a] transition-colors flex items-center justify-center gap-2">
            View Coordinates
          </button>
        </div>
      </div>
      
      <!-- Card 2: Sigiriya -->
      <div class="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#f4f1f0] dark:border-[#3a2e2a]">
        <div class="relative aspect-[4/3] overflow-hidden">
          <div class="absolute top-3 right-3 z-20">
            <span class="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
              <span class="material-symbols-outlined text-xs text-orange-400">wb_twilight</span>
              18:15 PM
            </span>
          </div>
          <div 
            class="bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-110" 
            style="background-image: url('/images/downloaded_2b8b5c147867.avif');"
          ></div>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-bold text-[#181311] dark:text-white leading-tight group-hover:text-primary transition-colors">Pidurangala Rock</h3>
              <div class="flex items-center gap-1 text-[#896c61] dark:text-[#a0908a] text-sm mt-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                Sigiriya
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mt-4 mb-4">
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium">
              <span class="material-symbols-outlined text-sm">flight</span> No Drone
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium">
              <span class="material-symbols-outlined text-sm">landscape</span> Landscape
            </span>
          </div>
          <button class="mt-auto w-full py-2.5 rounded-lg border border-[#e0dad7] dark:border-[#3a2e2a] text-[#181311] dark:text-white text-sm font-bold hover:bg-[#f4f1f0] dark:hover:bg-[#3a2e2a] transition-colors flex items-center justify-center gap-2">
            View Coordinates
          </button>
        </div>
      </div>
      
      <!-- Card 3: Mirissa -->
      <div class="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#f4f1f0] dark:border-[#3a2e2a]">
        <div class="relative aspect-[4/3] overflow-hidden">
          <div class="absolute top-3 right-3 z-20">
            <span class="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
              <span class="material-symbols-outlined text-xs text-yellow-400">sunny</span>
              06:10 AM
            </span>
          </div>
          <div 
            class="bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-110" 
            style="background-image: url('/images/downloaded_cd4e419a0ae2.avif');"
          ></div>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-bold text-[#181311] dark:text-white leading-tight group-hover:text-primary transition-colors">Coconut Tree Hill</h3>
              <div class="flex items-center gap-1 text-[#896c61] dark:text-[#a0908a] text-sm mt-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                Mirissa, South Coast
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mt-4 mb-4">
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-medium">
              <span class="material-symbols-outlined text-sm">warning</span> Caution
            </span>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-medium">
              <span class="material-symbols-outlined text-sm">waves</span> Coastal
            </span>
          </div>
          <button class="mt-auto w-full py-2.5 rounded-lg border border-[#e0dad7] dark:border-[#3a2e2a] text-[#181311] dark:text-white text-sm font-bold hover:bg-[#f4f1f0] dark:hover:bg-[#3a2e2a] transition-colors flex items-center justify-center gap-2">
            View Coordinates
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
