<template>
  <div class="relative w-full">
    <div 
      class="flex min-h-[500px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 relative" 
      :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url('/images/downloaded_61761d4e5bd8.avif')` }"
    >
      <div class="flex flex-col gap-3 text-center max-w-3xl z-10">
        <span class="text-white/90 text-sm font-bold tracking-wider uppercase">Planning & Logistics</span>
        <h1 class="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
          When to Explore Ceylon
        </h1>
        <h2 class="text-white/90 text-lg font-medium leading-relaxed max-w-xl mx-auto">
          Navigate the dual monsoons and discover the perfect season for your island getaway.
        </h2>
      </div>
      <!-- Live Weather Ticker -->
      <div class="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 py-4 hidden md:flex justify-center">
        <div class="flex gap-12 text-white">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined">location_on</span>
            <span class="font-bold">Colombo</span>
            <span class="font-light">31°C Sunny</span>
          </div>
          <div class="flex items-center gap-3 opacity-80">
            <span class="material-symbols-outlined">wb_sunny</span>
            <span>UV Index: High</span>
          </div>
          <div class="flex items-center gap-3 opacity-80">
            <span class="material-symbols-outlined">water_drop</span>
            <span>Humidity: 78%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
