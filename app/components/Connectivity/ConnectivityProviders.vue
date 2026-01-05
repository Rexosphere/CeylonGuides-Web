<template>
  <div class="py-5">
    <div class="flex flex-col md:flex-row justify-between items-end px-4 pb-4 pt-5 gap-4">
      <div class="flex flex-col">
        <h2 class="text-[#181311] dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em]">Top Mobile Providers</h2>
        <p class="text-[#896c61] dark:text-gray-400 text-sm mt-1">Compare coverage and reliability across the island.</p>
      </div>
      <div class="flex gap-2">
        <span class="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">Best Coverage</span>
        <span class="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded">Best Value</span>
      </div>
    </div>
    
    <div class="px-4 py-3 @container">
      <div class="flex overflow-hidden rounded-xl border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-surface-dark shadow-sm">
        <table class="flex-1 w-full">
          <thead class="bg-[#fcfbfb] dark:bg-gray-800 border-b border-[#e6dedb] dark:border-gray-700">
            <tr>
              <th class="px-6 py-4 text-left text-[#181311] dark:text-white text-sm font-bold leading-normal w-1/4">Provider</th>
              <th class="px-6 py-4 text-left text-[#181311] dark:text-white text-sm font-bold leading-normal w-1/4">Coverage Area</th>
              <th class="hidden sm:table-cell px-6 py-4 text-left text-[#181311] dark:text-white text-sm font-bold leading-normal">4G Speed</th>
              <th class="px-6 py-4 text-left text-[#181311] dark:text-white text-sm font-bold leading-normal">Tourist Rating</th>
            </tr>
          </thead>
          <tbody>
            <!-- Dialog -->
            <tr class="group hover:bg-background-light dark:hover:bg-gray-800 transition-colors border-b border-[#f4f1f0] dark:border-gray-700 last:border-0">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">D</div>
                  <span class="text-[#181311] dark:text-white text-sm font-bold">Dialog</span>
                </div>
              </td>
              <td class="px-6 py-4 text-[#5c4a45] dark:text-gray-400 text-sm">Island-wide (Best)</td>
              <td class="hidden sm:table-cell px-6 py-4">
                <div class="flex items-center gap-1 text-green-600">
                  <span class="material-symbols-outlined text-[20px]">speed</span>
                  <span class="text-sm font-medium">Fast</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  Excellent
                </span>
              </td>
            </tr>
            
            <!-- Mobitel -->
            <tr class="group hover:bg-background-light dark:hover:bg-gray-800 transition-colors border-b border-[#f4f1f0] dark:border-gray-700 last:border-0">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">M</div>
                  <span class="text-[#181311] dark:text-white text-sm font-bold">Mobitel</span>
                </div>
              </td>
              <td class="px-6 py-4 text-[#5c4a45] dark:text-gray-400 text-sm">Island-wide (Great)</td>
              <td class="hidden sm:table-cell px-6 py-4">
                <div class="flex items-center gap-1 text-green-600">
                  <span class="material-symbols-outlined text-[20px]">speed</span>
                  <span class="text-sm font-medium">Fast</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  Very Good
                </span>
              </td>
            </tr>
            
            <!-- Hutch -->
            <tr class="group hover:bg-background-light dark:hover:bg-gray-800 transition-colors border-b border-[#f4f1f0] dark:border-gray-700 last:border-0">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">H</div>
                  <span class="text-[#181311] dark:text-white text-sm font-bold">Hutch</span>
                </div>
              </td>
              <td class="px-6 py-4 text-[#5c4a45] dark:text-gray-400 text-sm">Urban Areas</td>
              <td class="hidden sm:table-cell px-6 py-4">
                <div class="flex items-center gap-1 text-orange-600">
                  <span class="material-symbols-outlined text-[20px]">wifi_tethering</span>
                  <span class="text-sm font-medium">Medium</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold">
                  Good
                </span>
              </td>
            </tr>
            
            <!-- Airtel -->
            <tr class="group hover:bg-background-light dark:hover:bg-gray-800 transition-colors border-b border-[#f4f1f0] dark:border-gray-700 last:border-0">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">A</div>
                  <span class="text-[#181311] dark:text-white text-sm font-bold">Airtel</span>
                </div>
              </td>
              <td class="px-6 py-4 text-[#5c4a45] dark:text-gray-400 text-sm">Major Cities</td>
              <td class="hidden sm:table-cell px-6 py-4">
                <div class="flex items-center gap-1 text-orange-600">
                  <span class="material-symbols-outlined text-[20px]">wifi_tethering</span>
                  <span class="text-sm font-medium">Medium</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold">
                  Good
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
