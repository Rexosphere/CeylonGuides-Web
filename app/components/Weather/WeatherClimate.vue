<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h3 class="text-primary font-bold text-sm tracking-widest uppercase">Climate Overview</h3>
        <h2 class="text-[32px] md:text-[40px] font-bold leading-tight text-text-main dark:text-white">Understanding the Dual Monsoons</h2>
      </div>
      <p class="text-text-muted dark:text-gray-300 text-lg leading-relaxed">
        Sri Lanka is a year-round destination with a tropical dual-monsoon system. While one side of the island sees rain, the other is often bathed in sunshine. 
      </p>
      <p class="text-text-muted dark:text-gray-300 text-base leading-relaxed">
        The <strong>Yala Monsoon</strong> brings rain to the south-west from May to September, while the <strong>Maha Monsoon</strong> hits the north-east from October to January. This unique pattern means there's always a perfect beach somewhere on the island.
      </p>
      <div class="flex gap-4 mt-2">
        <div class="flex items-center gap-2 text-sm font-medium text-text-main dark:text-gray-200">
          <span class="w-3 h-3 rounded-full bg-primary"></span> Dry Season
        </div>
        <div class="flex items-center gap-2 text-sm font-medium text-text-main dark:text-gray-200">
          <span class="w-3 h-3 rounded-full bg-blue-400"></span> Wet Season
        </div>
      </div>
    </div>
    <div class="relative w-full aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
      <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
      <img class="w-full h-full object-cover" alt="Illustrated map of Sri Lanka highlighting different climate zones and monsoon directions" src="/images/downloaded_0a1bc3e20e1e.avif"/>
      <!-- Interactive Map Tooltip Simulation -->
      <div class="absolute top-1/4 left-1/4 bg-white dark:bg-surface-dark p-3 rounded-lg shadow-lg max-w-[140px] animate-bounce">
        <div class="text-xs font-bold text-text-muted uppercase">Central Highlands</div>
        <div class="text-sm font-bold text-primary">Cool & Misty</div>
      </div>
    </div>
  </div>
</template>
