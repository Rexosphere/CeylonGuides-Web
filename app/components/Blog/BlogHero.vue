<template>
  <section class="px-4 md:px-6 lg:px-10 py-8">
    <div class="relative w-full rounded-2xl overflow-hidden h-[500px] md:h-[600px] group">
      <div 
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
        style='background-image: url("/images/downloaded_6f4be875f1ff.avif");'
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      <div class="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 flex flex-col items-start gap-4 md:gap-6">
        <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider border border-white/30">
          Featured Story
        </span>
        
        <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight max-w-4xl drop-shadow-sm">
          Chasing Waterfalls in Ella: A Monsoon Diary
        </h1>
        
        <p class="text-white/90 text-base md:text-lg max-w-2xl font-light leading-relaxed">
          Experience the misty magic of the hill country during the rainy season. A journey through tea plantations, hidden pools, and the roaring beauty of Ravana Falls.
        </p>
        
        <div class="flex flex-wrap gap-4 mt-2">
          <button class="flex items-center gap-2 rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all hover:translate-x-1 shadow-lg shadow-primary/30">
            Read Story <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button class="flex items-center gap-2 rounded-lg h-12 px-6 bg-white/10 backdrop-blur-md text-white border border-white/30 text-sm font-bold tracking-wide hover:bg-white/20 transition-colors">
            <span class="material-symbols-outlined text-[18px]">bookmark_add</span> Save for Later
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
