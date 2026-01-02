<template>
  <!-- Quick Actions Section -->
  <section class="py-20 bg-secondary/30 relative overflow-hidden">
    <!-- Abstract Decoration -->
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/40 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent-light/30 rounded-full blur-3xl"></div>
    
    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <div class="mb-12 text-center">
        <h3 class="font-serif text-3xl md:text-4xl font-bold text-primary dark:text-white mb-3">Essential Tools</h3>
        <p class="text-charcoal/70 dark:text-gray-300 font-medium">Everything you need for a smooth journey through Ceylon.</p>
      </div>
      
      <!-- Scrollable Icons Row -->
      <div class="flex overflow-x-auto pb-8 gap-6 md:gap-10 px-4 md:justify-center no-scrollbar snap-x snap-mandatory">
        <!-- Icon Item 1 -->
        <NuxtLink to="/phrasebook" class="group flex flex-col items-center gap-4 min-w-[100px] snap-center">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <span class="material-symbols-outlined text-3xl md:text-4xl text-primary dark:text-white group-hover:text-white transition-colors">translate</span>
          </div>
          <span class="text-sm font-bold text-charcoal dark:text-gray-200 group-hover:text-primary dark:group-hover:text-accent-light transition-colors text-center">Phrasebook</span>
        </NuxtLink>
        
        <!-- Icon Item 2 -->
        <a class="group flex flex-col items-center gap-4 min-w-[100px] snap-center" href="#">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <span class="material-symbols-outlined text-3xl md:text-4xl text-primary dark:text-white group-hover:text-white transition-colors">security</span>
          </div>
          <span class="text-sm font-bold text-charcoal dark:text-gray-200 group-hover:text-primary dark:group-hover:text-accent-light transition-colors text-center">Scam Alerts</span>
        </a>
        
        <!-- Icon Item 3 -->
        <a class="group flex flex-col items-center gap-4 min-w-[100px] snap-center" href="#">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <span class="material-symbols-outlined text-3xl md:text-4xl text-primary dark:text-white group-hover:text-white transition-colors">train</span>
          </div>
          <span class="text-sm font-bold text-charcoal dark:text-gray-200 group-hover:text-primary dark:group-hover:text-accent-light transition-colors text-center">Transport</span>
        </a>
        
        <!-- Icon Item 4 -->
        <a class="group flex flex-col items-center gap-4 min-w-[100px] snap-center" href="#">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <span class="material-symbols-outlined text-3xl md:text-4xl text-primary dark:text-white group-hover:text-white transition-colors">restaurant</span>
          </div>
          <span class="text-sm font-bold text-charcoal dark:text-gray-200 group-hover:text-primary dark:group-hover:text-accent-light transition-colors text-center">Safe Dining</span>
        </a>
        
        <!-- Icon Item 5 -->
        <a class="group flex flex-col items-center gap-4 min-w-[100px] snap-center" href="#">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <span class="material-symbols-outlined text-3xl md:text-4xl text-primary dark:text-white group-hover:text-white transition-colors">medical_services</span>
          </div>
          <span class="text-sm font-bold text-charcoal dark:text-gray-200 group-hover:text-primary dark:group-hover:text-accent-light transition-colors text-center">Health & Visa</span>
        </a>
        
        <!-- Icon Item 6 -->
        <a class="group flex flex-col items-center gap-4 min-w-[100px] snap-center" href="#">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <span class="material-symbols-outlined text-3xl md:text-4xl text-primary dark:text-white group-hover:text-white transition-colors">star_rate</span>
          </div>
          <span class="text-sm font-bold text-charcoal dark:text-gray-200 group-hover:text-primary dark:group-hover:text-accent-light transition-colors text-center">Ratings</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom scrollbar hiding for horizontal scrolls */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
