<template>
  <div class="bg-[#fffbf9] dark:bg-surface-dark py-10">
    <div class="max-w-[960px] mx-auto px-4">
      <h2 class="text-[#181311] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6">Recommended Tourist Data Packages</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1: The Weekender -->
        <div class="flex flex-col rounded-xl border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-surface-dark p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10">
            <span class="material-symbols-outlined text-[80px]">backpack</span>
          </div>
          <h3 class="text-lg font-bold text-[#181311] dark:text-white">The Weekender</h3>
          <p class="text-[#896c61] dark:text-gray-400 text-sm mb-4">Perfect for short trips.</p>
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-3xl font-black text-primary">10 GB</span>
            <span class="text-sm text-[#896c61] dark:text-gray-400">Anytime Data</span>
          </div>
          <ul class="flex flex-col gap-3 mb-8 flex-1">
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              Valid for 7 Days
            </li>
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              LKR 500 Local Calls
            </li>
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              WhatsApp Free
            </li>
          </ul>
          <div class="flex items-center justify-between mt-auto pt-4 border-t border-[#f4f1f0] dark:border-gray-700">
            <span class="text-lg font-bold text-[#181311] dark:text-white">LKR 1,299</span>
            <button class="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors px-4 py-2 rounded-lg text-sm font-bold">Select</button>
          </div>
        </div>
        
        <!-- Card 2: The Explorer (Featured) -->
        <div class="flex flex-col rounded-xl border-2 border-primary bg-white dark:bg-surface-dark p-6 shadow-lg relative overflow-hidden transform md:-translate-y-2">
          <div class="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>
          <h3 class="text-lg font-bold text-[#181311] dark:text-white">The Explorer</h3>
          <p class="text-[#896c61] dark:text-gray-400 text-sm mb-4">Standard tourist choice.</p>
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-3xl font-black text-primary">30 GB</span>
            <span class="text-sm text-[#896c61] dark:text-gray-400">Anytime Data</span>
          </div>
          <ul class="flex flex-col gap-3 mb-8 flex-1">
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              Valid for 30 Days
            </li>
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              Unlimited Local Calls
            </li>
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              Social Media Free
            </li>
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              LKR 1500 Int. Calls
            </li>
          </ul>
          <div class="flex items-center justify-between mt-auto pt-4 border-t border-[#f4f1f0] dark:border-gray-700">
            <span class="text-lg font-bold text-[#181311] dark:text-white">LKR 2,450</span>
            <button class="bg-primary text-white hover:bg-orange-600 transition-colors px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-orange-200">Select</button>
          </div>
        </div>
        
        <!-- Card 3: Digital Nomad -->
        <div class="flex flex-col rounded-xl border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-surface-dark p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10">
            <span class="material-symbols-outlined text-[80px]">laptop_mac</span>
          </div>
          <h3 class="text-lg font-bold text-[#181311] dark:text-white">Digital Nomad</h3>
          <p class="text-[#896c61] dark:text-gray-400 text-sm mb-4">Heavy usage & work.</p>
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-3xl font-black text-primary">100 GB</span>
            <span class="text-sm text-[#896c61] dark:text-gray-400">Anytime Data</span>
          </div>
          <ul class="flex flex-col gap-3 mb-8 flex-1">
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              Valid for 30 Days
            </li>
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              50GB Off-Peak Bonus
            </li>
            <li class="flex items-center gap-2 text-sm text-[#181311] dark:text-white">
              <span class="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
              Router Support
            </li>
          </ul>
          <div class="flex items-center justify-between mt-auto pt-4 border-t border-[#f4f1f0] dark:border-gray-700">
            <span class="text-lg font-bold text-[#181311] dark:text-white">LKR 4,900</span>
            <button class="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors px-4 py-2 rounded-lg text-sm font-bold">Select</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
