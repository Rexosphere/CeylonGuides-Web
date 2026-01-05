<template>
  <section class="relative w-full h-[600px] flex items-end">
    <!-- Background Image with Gradient Overlay -->
    <div class="absolute inset-0 w-full h-full z-0">
      <div 
        class="w-full h-full bg-cover bg-center" 
        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMbQBPmyZ4PDkNCbP5m8vJO5fA8ZhSDjfHzl-T8tKCje8BA1yrxI6isUVFZzJyzD4Zxl79GgjQ2c3pKLgQdJJ-Nb7rvkynE7Izz2zmxywXZ2IWT2i6GpJ1rNDhjSUT82xf6UkXrDgcMG51QyfZcSQAl61UDOzXqNK4LmPp03Tz7EcyslQ-vMFg-r5MMkkpCilEb0SPAYXm8_0Yuokbq6C_SsNjpU-V0empW3TPe2bviAyFO4lhFVtR4PBp1oiXWklw46YdRnm2cAg');"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
    </div>
    
    <!-- Hero Content - Bottom Aligned -->
    <div class="relative z-10 px-6 md:px-20 lg:px-40 pb-16 md:pb-24 max-w-[1440px] mx-auto w-full">
      <div class="flex flex-col gap-6 max-w-4xl">
        <h1 class="text-5xl md:text-8xl font-black leading-[1.05] tracking-[-0.033em] text-white drop-shadow-lg">
          Wander through <span class="text-primary">Ceylon</span>
        </h1>
        <p class="text-white/90 text-lg md:text-xl font-normal leading-relaxed max-w-2xl drop-shadow-md">
          Discover the diverse landscapes, timeless ruins, and golden coasts of the Pearl of the Indian Ocean. Curated journeys for the modern explorer.
        </p>
      </div>
    </div>
  </section>
</template>
