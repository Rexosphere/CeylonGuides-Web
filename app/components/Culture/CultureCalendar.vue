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
        <div class="h-32 bg-cover bg-center relative" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4wkY9LRvOUBklIix-sjjCDUbE3ygs2ghnvSbbl7Ntq3xbGJBY43Rk-rqd87gD_ueth8KdhDyb18IjvlJ9js_g9SZIKz5gPVQ8hQC7-LRd0E371BiBa7jIjswsbYxOkTSQ420Kg1ZtUzpUoCRmOGWKIqNLw23-wNBj94bKnM3oxRkaK8_nBKZ6b491YEvUUPq-iy2mXOYmIO4Cd9RymzSJ3Gc0jeMZV0yxuellZlHZSBDrbIhrcQSaFt6N233PHmCM9w2gumpgQ6s");'>
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
        <div class="h-32 bg-cover bg-center relative" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDY5hx4_fOE53ORgyoIdHjw9TFjtGPf_kvfZddUeSR4WZSa7kqQqebQ-y0P62-3AtQYaojsaidvcQhRN5bCqGWHEVBCONVNbV53ymQzd94xizZ8Ajw6dhaJtczocR3TC43Zsw4EBxYZ6_TZAOhiSto3w2z9s7wSNux44jOhyg_emPvYfF6e99wwuCim1_Kk2xRhdUcuxayI4BN7xZmdHVKZTSRJhOQo7di-AQejqysflf2kVuvJlD1ZduGgZf3scC9G3vH3TjVLBA");'>
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
        <div class="h-32 bg-cover bg-center relative" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjZdWBrQ-ZjWwgxijyAlA5Tf5mljgZ2JON-UBe3igrcNs0FfOqBwGPfHfa04-Vx2QtIWNXhB-wPL8_-IVGbY6RRmuGoahSXWD2EDAIjDy17tT_n1B2PO9aoABdfsMjNYw-Mp6W7kUTVzqSf6m8-cbMXWv2tizMfSc-z0TsFn5BenVxyl_Pwnc-nx8TstRQd7bYjfkRnd3QufUPev6a5gG3qDumg7ehsO678Fo0cchv1_O9BcPyvi_DCuERUEGRkS_0i-0JYom10uM");'>
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
