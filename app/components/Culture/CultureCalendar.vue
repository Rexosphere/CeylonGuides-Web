<template>
  <section class="w-full max-w-[960px] px-4 md:px-10 mb-20 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-[28px] font-bold leading-tight tracking-[-0.015em] text-text-main dark:text-white">Cultural Calendar</h2>
      <a class="text-culture-primary font-bold text-sm hover:underline flex items-center gap-1" href="#">
        View Full Year <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Event 1 -->
      <div class="group cursor-pointer bg-white dark:bg-[#2c1e19] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#e6e0dd] dark:border-[#3a2d28]">
        <div class="h-32 bg-cover bg-center relative" style='background-image: url("/images/downloaded_9cbc6e3f96ba.avif");'>
          <div class="w-full h-full bg-black/30 group-hover:bg-black/10 transition-colors"></div>
        </div>
        <div class="p-5 relative">
          <div class="absolute -top-6 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            May
          </div>
          <h3 class="text-lg font-bold text-text-main dark:text-white mb-1">Vesak Festival</h3>
          <p class="text-xs text-culture-primary font-bold uppercase tracking-wider mb-2">Religious</p>
          <p class="text-sm text-text-muted dark:text-gray-400">Celebration of Buddha's birth, enlightenment, and passing. Streets are decorated with lanterns.</p>
        </div>
      </div>

      <!-- Event 2 -->
      <div class="group cursor-pointer bg-white dark:bg-[#2c1e19] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#e6e0dd] dark:border-[#3a2d28]">
        <div class="h-32 bg-cover bg-center relative" style='background-image: url("/images/downloaded_83bd3f2348d8.avif");'>
          <div class="w-full h-full bg-black/30 group-hover:bg-black/10 transition-colors"></div>
        </div>
        <div class="p-5 relative">
          <div class="absolute -top-6 right-4 bg-culture-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            July/Aug
          </div>
          <h3 class="text-lg font-bold text-text-main dark:text-white mb-1">Esala Perahera</h3>
          <p class="text-xs text-culture-primary font-bold uppercase tracking-wider mb-2">Cultural</p>
          <p class="text-sm text-text-muted dark:text-gray-400">Kandy's grand procession featuring dancers, drummers, and bedecked elephants honoring the Tooth Relic.</p>
        </div>
      </div>

      <!-- Event 3 -->
      <div class="group cursor-pointer bg-white dark:bg-[#2c1e19] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#e6e0dd] dark:border-[#3a2d28]">
        <div class="h-32 bg-cover bg-center relative" style='background-image: url("/images/downloaded_1647ac3ed391.avif");'>
          <div class="w-full h-full bg-black/30 group-hover:bg-black/10 transition-colors"></div>
        </div>
        <div class="p-5 relative">
          <div class="absolute -top-6 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            April
          </div>
          <h3 class="text-lg font-bold text-text-main dark:text-white mb-1">Sinhala & Tamil New Year</h3>
          <p class="text-xs text-culture-primary font-bold uppercase tracking-wider mb-2">National</p>
          <p class="text-sm text-text-muted dark:text-gray-400">A major harvest festival marked by traditional games, sweets, and family reunions.</p>
        </div>
      </div>

    </div>
  </section>
</template>
