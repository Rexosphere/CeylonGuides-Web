<template>
  <div class="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
    <!-- Background Image with Overlay -->
    <div 
      class="absolute inset-0 z-0 bg-cover bg-center" 
      style="background-image: url('/images/downloaded_10a9271d6ee5.avif');"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background-light dark:to-background-dark"></div>
    </div>
    
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
        <span class="material-symbols-outlined text-sm">wb_twilight</span>
        Golden Hour Guide
      </div>
      
      <h1 class="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
        Capture Ceylon: The Ultimate Photography Guide
      </h1>
      
      <p class="text-lg md:text-xl text-white/90 max-w-2xl font-medium drop-shadow-sm">
        Discover the best photography locations in Sri Lanka, from misty mountains to golden coasts, complete with light conditions and drone laws.
      </p>
      
      <div class="flex flex-wrap gap-4 justify-center mt-4">
        <button class="h-12 px-8 rounded-lg bg-white text-primary text-base font-bold hover:bg-gray-50 transition-colors shadow-lg flex items-center gap-2">
          Explore Map
          <span class="material-symbols-outlined text-lg">map</span>
        </button>
        <button class="h-12 px-8 rounded-lg bg-primary/90 text-white text-base font-bold hover:bg-primary transition-colors shadow-lg backdrop-blur-sm flex items-center gap-2">
          Download Guide
          <span class="material-symbols-outlined text-lg">download</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
