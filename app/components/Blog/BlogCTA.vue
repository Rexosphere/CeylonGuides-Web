<template>
  <section class="relative bg-white dark:bg-[#2c2420] overflow-hidden">
    <!-- Decorative pattern -->
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
    
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
      <div class="flex flex-col gap-4 max-w-xl text-center md:text-left z-10">
        <h2 class="text-3xl md:text-4xl font-black tracking-tight text-[#181311] dark:text-white">
          Have a story to tell?
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Become a CeylonGuide Contributor and share your travel journals, photos, and tips with the world. Your perspective could inspire the next traveler.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
          <button class="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
            <span class="material-symbols-outlined">edit_note</span> Share Your Story
          </button>
          <button class="flex items-center justify-center gap-2 rounded-lg h-12 px-6 text-[#181311] dark:text-white font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            Read Guidelines
          </button>
        </div>
      </div>
      
      <div class="relative w-full max-w-sm md:max-w-md aspect-square md:aspect-[4/3] z-10 rotate-3 hover:rotate-0 transition-transform duration-500">
        <div class="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-2xl rotate-6 scale-95 opacity-50"></div>
        <div class="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded-2xl rotate-3 scale-95 opacity-50"></div>
        <div 
          class="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl bg-cover bg-center" 
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5QagPNrsv2CneI24lpzxu9F_SFuveo0xRVl9qyK4-fO8rAjUQLa0RAJP4AWrZtRZuUBEOx8koqmOw_kvWwTVJemrIYuOKWR_P6MKRLAB2CiuEbTFm42jzDK7ImBrk8zNPweVTEjgtvYkISelYpTzEKlb6FOZshQj4qtKx6NmbQirDAjMhzmT1Atw49sCF-NZfTo8Bvi081wkNevczpYr0tKJy0CsKHv_ldT9GCDN-bLKIk5IxvKKnwzHaiJRL_cyF-TP-65ZfJCw");'
        >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div class="text-white">
              <p class="font-bold text-lg">"Writing by the sea..."</p>
              <p class="text-sm opacity-80">Photo by @travel_lanka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
