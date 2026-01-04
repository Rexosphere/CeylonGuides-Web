<template>
  <div class="w-full bg-white dark:bg-[#2a1d18] py-20">
    <div class="max-w-[960px] mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <h2 class="text-[#181311] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4">
            The Challenge vs <br/>The Solution
          </h2>
          <p class="text-[#896c61] dark:text-gray-400 text-base leading-relaxed">
            We noticed a gap in the market. While Sri Lanka is a paradise, navigating it can often be overwhelming. We set out to change that narrative.
          </p>
        </div>
        <div class="hidden md:block">
          <div class="h-px w-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Problem Card -->
        <div class="flex flex-col gap-4 rounded-xl border border-[#e6dedb] dark:border-[#3a2d28] bg-background-light dark:bg-[#221510] p-8 hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-center size-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            <span class="material-symbols-outlined">sentiment_stressed</span>
          </div>
          <div>
            <h3 class="text-[#181311] dark:text-white text-xl font-bold mb-2">The Traveler's Struggle</h3>
            <p class="text-[#5c4d47] dark:text-gray-400 text-sm leading-relaxed">
              Fragmented information across dozens of sites, tourist traps that overcharge, and language barriers that make simple logistics stressful and confusing.
            </p>
          </div>
        </div>
        
        <!-- Solution Card -->
        <div class="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-8 hover:shadow-lg transition-shadow relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10">
            <span class="material-symbols-outlined text-9xl text-primary">verified</span>
          </div>
          <div class="flex items-center justify-center size-12 rounded-full bg-primary text-white">
            <span class="material-symbols-outlined">check_circle</span>
          </div>
          <div class="relative z-10">
            <h3 class="text-[#181311] dark:text-white text-xl font-bold mb-2">The CeylonGuide Way</h3>
            <p class="text-[#5c4d47] dark:text-gray-300 text-sm leading-relaxed">
              Curated digital itineraries crafted by locals, verified guides you can trust, and 24/7 real-time support to give you total peace of mind while exploring.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
