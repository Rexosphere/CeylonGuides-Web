<template>
  <section class="px-4 md:px-6 lg:px-10 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(100px,auto)]">
      
      <!-- Large Vertical Card -->
      <article class="group relative flex flex-col gap-4 row-span-2 rounded-xl overflow-hidden bg-white dark:bg-[#2c2420] shadow-sm hover:shadow-md transition-all">
        <div class="relative w-full h-[400px] lg:h-full overflow-hidden">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style='background-image: url("/images/downloaded_e54d2abd2d5e.avif");'
          ></div>
          <div class="absolute top-4 left-4">
            <span class="px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur text-xs font-bold uppercase tracking-wider rounded-md">Hidden Gems</span>
          </div>
        </div>
        <div class="p-6 flex flex-col gap-3">
          <div class="flex items-center gap-2 text-sm text-[#896c61] dark:text-gray-400">
            <span class="material-symbols-outlined text-[16px]">schedule</span> 5 min read
          </div>
          <h3 class="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
            The Ancient Majesty of Sigiriya: A Climb Through History
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
            Walking through the lion's paws and ascending the spiral staircases reveals not just a fortress, but a story of power, art, and engineering marvels from ancient Ceylon.
          </p>
          <div class="mt-auto flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div 
              class="size-8 rounded-full bg-gray-300 bg-cover bg-center" 
              style='background-image: url("/images/downloaded_14ff402ae3d9.avif");'
            ></div>
            <span class="text-sm font-medium dark:text-gray-300">By David Chen</span>
          </div>
        </div>
      </article>

      <!-- Standard Card -->
      <article class="group flex flex-col gap-3 rounded-xl overflow-hidden bg-white dark:bg-[#2c2420] shadow-sm hover:shadow-md transition-all h-full">
        <div class="w-full h-48 bg-cover bg-center overflow-hidden relative">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style='background-image: url("/images/downloaded_a78fb194635d.avif");'
          ></div>
          <div class="absolute top-3 right-3">
            <button class="bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-1.5 transition-colors text-white">
              <span class="material-symbols-outlined text-[18px]">favorite</span>
            </button>
          </div>
        </div>
        <div class="p-5 flex flex-col gap-2 h-full">
          <span class="text-primary text-xs font-bold uppercase tracking-wider">Culture</span>
          <h3 class="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
            The Art of Ceylon Tea
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            From the misty slopes of Nuwara Eliya to your morning cup.
          </p>
        </div>
      </article>

      <!-- Quote/Testimonial Card -->
      <article class="group relative flex flex-col justify-between p-8 rounded-xl bg-[#221510] dark:bg-[#2c2420] text-white overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div class="absolute -right-10 -top-10 text-white/5 opacity-20">
          <span class="material-symbols-outlined text-[200px]">format_quote</span>
        </div>
        <div class="relative z-10">
          <div class="flex gap-1 text-primary mb-4">
            <span class="material-symbols-outlined text-[20px]">star</span>
            <span class="material-symbols-outlined text-[20px]">star</span>
            <span class="material-symbols-outlined text-[20px]">star</span>
            <span class="material-symbols-outlined text-[20px]">star</span>
            <span class="material-symbols-outlined text-[20px]">star</span>
          </div>
          <h3 class="text-xl md:text-2xl font-serif italic leading-relaxed">
            "Sri Lanka is a universe in an island. Every corner holds a new surprise, a new flavor, a new friend."
          </h3>
        </div>
        <div class="mt-6 flex items-center gap-3">
          <div class="size-10 rounded-full border-2 border-primary p-0.5">
            <div 
              class="w-full h-full rounded-full bg-cover bg-center" 
              style='background-image: url("/images/downloaded_a6c73e891fa9.avif");'
            ></div>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold">Sarah Jenkins</span>
            <span class="text-xs text-white/60">Solo Traveler</span>
          </div>
        </div>
      </article>

      <!-- Standard Card -->
      <article class="group flex flex-col gap-3 rounded-xl overflow-hidden bg-white dark:bg-[#2c2420] shadow-sm hover:shadow-md transition-all h-full">
        <div class="w-full h-48 bg-cover bg-center overflow-hidden relative">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style='background-image: url("/images/downloaded_bc33951277d3.avif");'
          ></div>
        </div>
        <div class="p-5 flex flex-col gap-2 h-full">
          <span class="text-primary text-xs font-bold uppercase tracking-wider">Community Story</span>
          <h3 class="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
            My First Tuk-Tuk Ride
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            Navigating the chaotic yet charming streets of Colombo on three wheels.
          </p>
        </div>
      </article>

      <!-- Wide Horizontal Card -->
      <article class="md:col-span-2 group relative flex flex-col md:flex-row gap-0 rounded-xl overflow-hidden bg-white dark:bg-[#2c2420] shadow-sm hover:shadow-md transition-all">
        <div class="w-full md:w-1/2 h-56 md:h-auto overflow-hidden relative">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style='background-image: url("/images/downloaded_df76468379ff.avif");'
          ></div>
        </div>
        <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center gap-4">
          <span class="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 w-fit text-xs font-bold uppercase tracking-wider rounded-full">Foodie Guide</span>
          <h3 class="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
            A Culinary Journey: Spices of the South
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover the fiery curries and coconut-infused sambols that define southern Sri Lankan cuisine. Includes a list of must-visit local eateries.
          </p>
          <a class="inline-flex items-center gap-2 text-primary font-bold text-sm mt-2 hover:underline" href="#">
            Read the Guide <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </article>

      <!-- Standard Card -->
      <article class="group flex flex-col gap-3 rounded-xl overflow-hidden bg-white dark:bg-[#2c2420] shadow-sm hover:shadow-md transition-all h-full">
        <div class="w-full h-48 bg-cover bg-center overflow-hidden relative">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style='background-image: url("/images/downloaded_bea3130b5790.avif");'
          ></div>
        </div>
        <div class="p-5 flex flex-col gap-2 h-full">
          <span class="text-primary text-xs font-bold uppercase tracking-wider">Seasonal</span>
          <h3 class="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
            Surfing Season is Here
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            Why Arugam Bay should be your next stop this June.
          </p>
        </div>
      </article>

    </div>
    
    <div class="flex justify-center mt-12">
      <button class="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        Load More Stories
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
