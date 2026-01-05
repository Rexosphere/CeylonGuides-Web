<template>
  <div class="w-full px-4 md:px-20 lg:px-40 py-5 flex justify-center bg-white dark:bg-[#181311] border-y border-gray-100 dark:border-neutral-800">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <h2 class="text-text-main dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-6 pt-5">Key Shopping Districts</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <!-- District Card 1 -->
        <div class="flex items-center gap-4 bg-background-light dark:bg-[#221510] p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
          <div class="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" role="img" aria-label="Busy street of Pettah market Colombo" style="background-image: url('/images/downloaded_a7e696eac85e.avif');"></div>
          <div class="flex flex-col gap-1">
            <span class="text-primary text-xs font-bold uppercase tracking-wider">Colombo 11</span>
            <h3 class="text-text-main dark:text-white text-lg font-bold">Pettah Market</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2">A chaotic, colorful maze of wholesale goods, fabrics, and electronics. The heartbeat of Colombo.</p>
          </div>
        </div>
        <!-- District Card 2 -->
        <div class="flex items-center gap-4 bg-background-light dark:bg-[#221510] p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
          <div class="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" role="img" aria-label="Old colonial streets of Galle Fort" style="background-image: url('/images/downloaded_07a0359bf1ff.avif');"></div>
          <div class="flex flex-col gap-1">
            <span class="text-primary text-xs font-bold uppercase tracking-wider">Galle</span>
            <h3 class="text-text-main dark:text-white text-lg font-bold">Galle Fort</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2">Upscale boutiques set in colonial Dutch architecture. Perfect for gems, art, and linen.</p>
          </div>
        </div>
        <!-- District Card 3 -->
        <div class="flex items-center gap-4 bg-background-light dark:bg-[#221510] p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
          <div class="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" role="img" aria-label="Laksala souvenir shop interior" style="background-image: url('/images/downloaded_e9255d4ed8f7.avif');"></div>
          <div class="flex flex-col gap-1">
            <span class="text-primary text-xs font-bold uppercase tracking-wider">Islandwide</span>
            <h3 class="text-text-main dark:text-white text-lg font-bold">Laksala</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2">State-owned gift shop ensuring authenticity and fixed prices. Great for beginners.</p>
          </div>
        </div>
        <!-- District Card 4 -->
        <div class="flex items-center gap-4 bg-background-light dark:bg-[#221510] p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
          <div class="w-24 h-24 rounded-lg bg-cover bg-center shrink-0" role="img" aria-label="Modern Odel shopping mall entrance" style="background-image: url('/images/downloaded_fdf4536c17e0.avif');"></div>
          <div class="flex flex-col gap-1">
            <span class="text-primary text-xs font-bold uppercase tracking-wider">Colombo 07</span>
            <h3 class="text-text-main dark:text-white text-lg font-bold">Odel</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2">Sri Lanka's premier department store for fashion, tea, and souvenirs in a chic setting.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
