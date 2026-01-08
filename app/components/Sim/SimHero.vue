<template>
  <section class="relative w-full">
    <div class="relative w-full h-[540px] flex items-center justify-center p-4">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-cover bg-center z-0" 
           role="img" 
           aria-label="Hand holding smartphone in Sri Lanka tea plantations" 
           style="background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url('/images/downloaded_2e782d1a6f27.avif');">
      </div>
      
      <div class="relative z-10 flex flex-col items-center max-w-4xl text-center gap-6">
        <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          Stay Connected in Paradise
        </h1>
        
        <p class="text-white/90 text-lg md:text-xl font-medium max-w-2xl">
          From Colombo's bustling streets to Ella's quiet peaks, find the best SIM cards, data plans, and WiFi spots for your Sri Lankan journey.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-wrap justify-center gap-4 mt-4">
          <button 
            @click="scrollToPlans"
            class="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg transition-all flex items-center gap-2"
          >
            <span class="material-symbols-outlined">sim_card</span>
            Compare Plans
          </button>
          <button 
            @click="scrollToNomad"
            class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold rounded-lg border border-white/30 transition-all flex items-center gap-2"
          >
            <span class="material-symbols-outlined">wifi</span>
            Find WiFi
          </button>
        </div>
        
        <!-- Quick Stats -->
        <div class="flex flex-wrap justify-center gap-6 mt-6">
          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span class="material-symbols-outlined text-green-400">cell_tower</span>
            <span class="text-white font-medium">4 Providers</span>
          </div>
          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span class="material-symbols-outlined text-blue-400">sim_card</span>
            <span class="text-white font-medium">9+ Tourist Plans</span>
          </div>
          <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span class="material-symbols-outlined text-purple-400">5g</span>
            <span class="text-white font-medium">5G Available</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
function scrollToPlans() {
  const section = document.querySelector('#sim-providers')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function scrollToNomad() {
  const section = document.querySelector('#nomad-hub')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.scrollBy({ top: 2500, behavior: 'smooth' })
  }
}
</script>
