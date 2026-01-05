<template>
  <section class="w-full max-w-[1200px] px-6 py-20 scroll-mt-24" id="hospitals">
    <div class="text-center mb-10">
      <h2 class="text-[#181311] dark:text-white text-3xl font-bold">Medical Directory</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Private hospitals in major cities offer excellent standards of care.</p>
    </div>
    
    <div class="flex flex-col lg:flex-row gap-6 h-[600px] lg:h-[500px]">
      <!-- Sidebar List -->
      <div class="lg:w-1/3 flex flex-col gap-4 overflow-y-auto pr-2">
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-xl flex items-center gap-4 mb-2">
          <div class="bg-red-500 text-white p-2 rounded-full shrink-0">
            <span class="material-symbols-outlined">call</span>
          </div>
          <div>
            <p class="text-xs font-bold text-red-600 dark:text-red-400 uppercase">Emergency Ambulance</p>
            <p class="text-2xl font-black text-gray-900 dark:text-white">1990</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Suwa Seriya (Free Service)</p>
          </div>
        </div>
        
        <div class="bg-white dark:bg-[#2a1d18] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer hover:border-primary transition-colors">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-bold text-gray-900 dark:text-gray-100">Asiri Central Hospital</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Colombo 10</p>
            </div>
            <span class="material-symbols-outlined text-gray-400 text-sm">open_in_new</span>
          </div>
          <div class="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span class="material-symbols-outlined text-primary text-base">phone</span>
            +94 11 466 5500
          </div>
        </div>
        
        <div class="bg-white dark:bg-[#2a1d18] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer hover:border-primary transition-colors">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-bold text-gray-900 dark:text-gray-100">Lanka Hospitals</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Colombo 05</p>
            </div>
            <span class="material-symbols-outlined text-gray-400 text-sm">open_in_new</span>
          </div>
          <div class="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span class="material-symbols-outlined text-primary text-base">phone</span>
            +94 11 543 0000
          </div>
        </div>
        
        <div class="bg-white dark:bg-[#2a1d18] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer hover:border-primary transition-colors">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-bold text-gray-900 dark:text-gray-100">Ruhunu Hospital</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Galle</p>
            </div>
            <span class="material-symbols-outlined text-gray-400 text-sm">open_in_new</span>
          </div>
          <div class="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span class="material-symbols-outlined text-primary text-base">phone</span>
            +94 91 223 4059
          </div>
        </div>
        
        <div class="bg-white dark:bg-[#2a1d18] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer hover:border-primary transition-colors">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-bold text-gray-900 dark:text-gray-100">Suwasewana Hospital</h4>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Kandy</p>
            </div>
            <span class="material-symbols-outlined text-gray-400 text-sm">open_in_new</span>
          </div>
          <div class="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span class="material-symbols-outlined text-primary text-base">phone</span>
            +94 81 222 2404
          </div>
        </div>
      </div>
      
      <!-- Map Area -->
      <div class="lg:w-2/3 h-full rounded-2xl overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800 relative group">
        <!-- Static Map Image Placeholder -->
        <div 
          class="absolute inset-0 bg-cover bg-center" 
          style='background-image: url("/images/downloaded_81656699918e.avif");'
        ></div>
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
        
        <!-- Interactive Overlay Hint -->
        <div class="absolute bottom-6 right-6 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">map</span>
          <span class="text-sm font-bold text-gray-800 dark:text-gray-200">Open Interactive Map</span>
        </div>
        
        <!-- Fake Pins -->
        <div class="absolute top-[30%] left-[20%]">
          <span class="material-symbols-outlined text-red-600 text-4xl drop-shadow-md cursor-pointer hover:scale-110 transition-transform">location_on</span>
        </div>
        <div class="absolute top-[40%] left-[25%]">
          <span class="material-symbols-outlined text-red-600 text-4xl drop-shadow-md cursor-pointer hover:scale-110 transition-transform">location_on</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
