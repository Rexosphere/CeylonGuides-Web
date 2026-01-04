<template>
  <div class="py-10">
    <div class="max-w-[960px] mx-auto px-4">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="flex flex-col w-full md:w-1/3 gap-6">
          <div>
            <h2 class="text-[#181311] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-2">Find Connectivity</h2>
            <p class="text-[#896c61] dark:text-gray-400 text-sm">Locate public WiFi, co-working spaces, and SIM retailers.</p>
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="flex items-center p-3 rounded-lg border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-surface-dark cursor-pointer hover:border-primary transition-colors">
              <input checked class="form-checkbox text-primary rounded border-gray-300 focus:ring-primary h-5 w-5 mr-3" type="checkbox"/>
              <span class="material-symbols-outlined text-primary mr-2">wifi</span>
              <span class="text-sm font-medium text-[#181311] dark:text-white">Public WiFi Zones</span>
            </label>
            
            <label class="flex items-center p-3 rounded-lg border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-surface-dark cursor-pointer hover:border-primary transition-colors">
              <input class="form-checkbox text-primary rounded border-gray-300 focus:ring-primary h-5 w-5 mr-3" type="checkbox"/>
              <span class="material-symbols-outlined text-primary mr-2">coffee</span>
              <span class="text-sm font-medium text-[#181311] dark:text-white">Internet Cafes & Coworking</span>
            </label>
            
            <label class="flex items-center p-3 rounded-lg border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-surface-dark cursor-pointer hover:border-primary transition-colors">
              <input class="form-checkbox text-primary rounded border-gray-300 focus:ring-primary h-5 w-5 mr-3" type="checkbox"/>
              <span class="material-symbols-outlined text-primary mr-2">storefront</span>
              <span class="text-sm font-medium text-[#181311] dark:text-white">SIM Card Sellers</span>
            </label>
          </div>
          
          <div class="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 mt-auto">
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined text-primary">tips_and_updates</span>
              <span class="font-bold text-sm text-[#181311] dark:text-white">Did you know?</span>
            </div>
            <p class="text-xs text-[#5c4a45] dark:text-gray-400 leading-relaxed">
              Dialog and Mobitel have kiosks in the arrival lobby at Bandaranaike International Airport. It's the easiest place to get connected upon arrival.
            </p>
          </div>
        </div>
        
        <!-- Map -->
        <div class="w-full md:w-2/3 h-[400px] rounded-xl overflow-hidden relative group">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style='background-image: url("/images/downloaded_3aa36a8a9228.avif");'
          ></div>
          <div class="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors"></div>
          
          <!-- Floating Map Pins -->
          <div class="absolute top-1/4 left-1/4 p-2 bg-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
            <span class="material-symbols-outlined text-primary block">wifi</span>
          </div>
          <div class="absolute top-1/2 left-1/2 p-2 bg-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2">
            <span class="material-symbols-outlined text-primary block">coffee</span>
          </div>
          
          <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 text-xs font-bold text-[#181311] shadow-sm">
            Colombo
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
