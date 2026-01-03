<template>
  <section class="w-full max-w-[1000px] px-6 py-20 scroll-mt-24" id="concerns">
    <h2 class="text-[#181311] dark:text-white text-3xl font-bold mb-10 text-center">Common Health Concerns</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <div class="group bg-white dark:bg-[#2a1d18] p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
        <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
          <span class="material-symbols-outlined">pest_control</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Dengue Fever</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          Transmitted by day-biting mosquitoes. There is no vaccine. Prevention is key: use strong repellent, wear long sleeves, and sleep under nets if AC is unavailable.
        </p>
      </div>
      
      <!-- Card 2 -->
      <div class="group bg-white dark:bg-[#2a1d18] p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
        <div class="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-4 text-yellow-600 dark:text-yellow-400">
          <span class="material-symbols-outlined">light_mode</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Sun & Heat</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          The tropical sun is stronger than you think. Use SPF 50+, wear a hat, and stay hydrated. Heat exhaustion is common among tourists who overexert themselves mid-day.
        </p>
      </div>
      
      <!-- Card 3 -->
      <div class="group bg-white dark:bg-[#2a1d18] p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
        <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
          <span class="material-symbols-outlined">water_drop</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Leeches</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          Common in rainforest areas like Sinharaja. They are harmless but annoying. Wear leech socks or apply salt/soap to boots before hiking.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
