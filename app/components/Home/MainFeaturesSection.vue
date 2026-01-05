<template>
  <main class="relative z-20 pb-24 px-4 md:px-6">
    <div class="max-w-7xl mx-auto space-y-12">
      <div class="flex justify-between items-start pt-8">
        <div class="text-left">
          <span class="uppercase tracking-widest text-accent font-bold text-xs mb-2 block">Discover Ceylon</span>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-primary dark:text-white">Main Features</h2>
        </div>
      </div>
      <section class="grid grid-cols-1 md:grid-cols-12 grid-rows-auto gap-6" id="features">
        
        <!-- Destinations Card -->
        <div class="md:col-span-8 md:row-span-2 group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer">
          <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style="background-image: url('/images/downloaded_9f15b6f18e06.avif');">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
          <div class="absolute top-6 left-6">
            <div class="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Top Rated
            </div>
          </div>
          <div class="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <h3 class="font-serif text-3xl md:text-5xl font-bold text-white mb-3">Destinations</h3>
            <p class="text-white/90 text-lg md:text-xl font-light mb-6 line-clamp-2">Explore iconic locations like the misty train ride to Ella, ancient Sigiriya, and pristine southern beaches.</p>
            <div class="flex items-center gap-4">
              <span class="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-bold text-sm transition-transform group-hover:translate-x-2">
                Explore All <span class="material-symbols-outlined text-lg">arrow_right_alt</span>
              </span>
              <div class="hidden md:flex items-center gap-2 text-white/80 text-sm font-medium">
                <span class="material-symbols-outlined">star</span> 4.9/5 from Travelers
              </div>
            </div>
          </div>
        </div>

        <!-- Itineraries & Planner Card -->
        <div class="md:col-span-4 md:row-span-2 bg-secondary/20 dark:bg-gray-800 border border-secondary/30 dark:border-gray-700 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group hover:bg-secondary/30 transition-colors">
          <span class="material-symbols-outlined absolute -bottom-10 -right-10 text-[180px] text-primary/5 dark:text-white/5 group-hover:scale-110 transition-transform duration-500">map</span>
          <div class="relative z-10">
            <div class="w-14 h-14 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-primary dark:text-accent-light">
              <span class="material-symbols-outlined text-3xl">calendar_month</span>
            </div>
            <h3 class="font-serif text-2xl md:text-3xl font-bold text-primary dark:text-white mb-3">Itineraries & Planner</h3>
            <p class="text-charcoal/70 dark:text-gray-300 text-sm leading-relaxed">
              Custom trip plans for every type of traveler. From 3-day cultural bursts to 2-week island loops.
            </p>
          </div>
          <div class="relative z-10 mt-8">
            <a href="#" class="text-primary dark:text-white font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              Start Planning <span class="material-symbols-outlined">chevron_right</span>
            </a>
          </div>
        </div>

        <!-- Activities Card -->
        <div class="md:col-span-7 h-64 bg-primary rounded-[2.5rem] relative overflow-hidden group cursor-pointer">
          <div class="absolute inset-0 opacity-10 bg-cover bg-center" style="background-image: url('/images/downloaded_43c72220408c.avif');"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"></div>
          <div class="absolute inset-0 p-8 flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
            <div class="max-w-md">
              <h3 class="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Activities</h3>
              <p class="text-white/70 text-sm mb-6 md:mb-0">Hiking, Surfing, Tea Tasting, Safari, and more.</p>
            </div>
            <div class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
              <span class="material-symbols-outlined text-3xl text-white">hiking</span>
            </div>
          </div>
          <div class="absolute right-0 top-0 w-1/3 h-full bg-cover bg-center opacity-0 group-hover:opacity-40 transition-opacity duration-500" style="background-image: url('/images/downloaded_151b36c7aade.avif'); object-position: right center;"></div>
        </div>

        <!-- Photo Spots Card -->
        <div class="md:col-span-5 h-64 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] p-8 flex items-center gap-6 shadow-lg group hover:shadow-xl transition-all cursor-pointer">
          <div class="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-4xl text-accent">photo_camera</span>
          </div>
          <div>
            <h3 class="font-serif text-2xl font-bold text-primary dark:text-white mb-1">Photo Spots</h3>
            <p class="text-charcoal/60 dark:text-gray-400 text-sm mb-3">Instagrammable locations mapped for you.</p>
            <span class="text-accent text-sm font-bold flex items-center gap-1">View Gallery <span class="material-symbols-outlined text-sm">arrow_forward</span></span>
          </div>
        </div>

      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
// No script needed for this static layout
</script>
