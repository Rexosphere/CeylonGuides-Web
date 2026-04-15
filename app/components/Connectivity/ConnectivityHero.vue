<template>
  <section class="relative h-[70vh] min-h-[600px] flex items-center pb-10 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img alt="Sri Lanka Landscape" class="w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1YiC7YVXGt-xuGkViSLL7V1J6pGQ4HtWRQB80jgm6vCBH5nlpqcXbVdolhv_QkznZwBtRM6w0QdJmyi0ERRlSWtxDGEbASd9SxoYTENDXchan4g2yEoHbTuYa3G7YJ0qeTe69qqbuVXXnHl9hQjsMm4n4U5CQ38dFpRHqQZVaRyyDFQAnhJ73d4xTxlvcYiC961g5D-YxTxc0AFQzGXX2N5lhws0ZF1w5bLF-SGRi1HDKnwb0L28HL0Qdr4zstG9qBUJX__AffTg" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-primary/60 to-primary/30 mix-blend-multiply">
      </div>
      <div class="absolute inset-0 bg-black/30"></div>
    </div>
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-20 text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight leading-tight">
        Stay Connected in Paradise
      </h1>
      <p class="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
        From Colombo to the South Coast, find the best SIM cards, data packs, and WiFi spots for your Sri Lanka journey.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <button
          class="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-colors flex items-center justify-center gap-2 border border-white/10">
          <span class="material-icons text-sm">sim_card</span> Compare Plans
        </button>
        <button
          class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-full font-bold transition-all flex items-center justify-center gap-2">
          <span class="material-icons text-sm">wifi</span> Find WiFi
        </button>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <div
          class="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-white/90 text-sm font-medium">
          <span class="material-icons text-secondary-light text-base">cell_tower</span> 4 Providers
        </div>
        <div
          class="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-white/90 text-sm font-medium">
          <span class="material-icons text-secondary-light text-base">travel_explore</span> 9+ Tourist Plans
        </div>
        <div
          class="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-white/90 text-sm font-medium">
          <span class="material-icons text-secondary-light text-base">5g</span> 5G Available
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
