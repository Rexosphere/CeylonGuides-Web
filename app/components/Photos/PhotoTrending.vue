<template>
  <div class="mb-10">
    <div class="flex items-end justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-[#181311] dark:text-white tracking-tight">Trending on Social</h2>
        <p class="text-[#896c61] dark:text-[#a0908a] mt-1">#CeylonWiki spots with the most engagement.</p>
      </div>
    </div>
    
    <div class="relative group/scroll">
      <!-- Cards Container -->
      <div class="flex gap-4 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
        <!-- Story Card 1 -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer group">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style="background-image: url('/images/downloaded_3aff16898007.avif');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xs">favorite</span>
              </div>
              <span class="text-white text-xs font-medium">12.5k Likes</span>
            </div>
            <h3 class="text-white font-bold leading-tight">Red Mosque, Colombo</h3>
          </div>
        </div>
        
        <!-- Story Card 2 -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer group">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style="background-image: url('/images/downloaded_fc2139c08e07.avif');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xs">favorite</span>
              </div>
              <span class="text-white text-xs font-medium">8.2k Likes</span>
            </div>
            <h3 class="text-white font-bold leading-tight">Kandy to Ella Train</h3>
          </div>
        </div>
        
        <!-- Story Card 3 -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer group">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style="background-image: url('/images/downloaded_de06e9b5cd4b.avif');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xs">favorite</span>
              </div>
              <span class="text-white text-xs font-medium">15k Likes</span>
            </div>
            <h3 class="text-white font-bold leading-tight">Yala Safari</h3>
          </div>
        </div>
        
        <!-- Story Card 4 -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer group">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style="background-image: url('/images/downloaded_93e79b6fbd23.avif');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xs">favorite</span>
              </div>
              <span class="text-white text-xs font-medium">9.1k Likes</span>
            </div>
            <h3 class="text-white font-bold leading-tight">Stilt Fishermen</h3>
          </div>
        </div>
        
        <!-- Story Card 5 (More) -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer bg-[#f4f1f0] dark:bg-surface-dark border-2 border-dashed border-[#d0c9c6] dark:border-[#3a2e2a] flex flex-col items-center justify-center group hover:border-primary transition-colors">
          <div class="w-12 h-12 rounded-full bg-white dark:bg-[#3a2e2a] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <span class="material-symbols-outlined text-primary">add_a_photo</span>
          </div>
          <p class="text-[#181311] dark:text-white font-bold text-center px-4">Submit Your Shot</p>
          <p class="text-[#896c61] dark:text-[#a0908a] text-xs text-center mt-1">Get featured next week</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
