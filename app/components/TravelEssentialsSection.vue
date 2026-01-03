<template>
  <section class="max-w-7xl mx-auto px-4 md:px-6 pt-8" id="essentials">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-primary dark:text-white">Travel Essentials</h2>
        <p class="text-charcoal/60 dark:text-gray-400 mt-2">Everything you need for a smooth journey.</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 rounded-full bg-primary text-white text-sm font-bold">All Tools</button>
        <button class="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-charcoal dark:text-gray-200 border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Logistics</button>
        <button class="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-charcoal dark:text-gray-200 border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Culture</button>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      
      <a href="#" class="service-card group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-2xl">directions_bus</span>
        </div>
        <span class="font-bold text-charcoal dark:text-gray-200 text-sm">Transport</span>
      </a>

      <a href="#" class="service-card group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-2xl">bed</span>
        </div>
        <span class="font-bold text-charcoal dark:text-gray-200 text-sm">Accommodation</span>
      </a>

      <a href="#" class="service-card group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-2xl">restaurant</span>
        </div>
        <span class="font-bold text-charcoal dark:text-gray-200 text-sm">Clean Dining</span>
      </a>

      <a href="#" class="service-card group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-2xl">shopping_bag</span>
        </div>
        <span class="font-bold text-charcoal dark:text-gray-200 text-sm">Shopping Guide</span>
      </a>

      <a href="#" class="service-card group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-2xl">partly_cloudy_day</span>
        </div>
        <span class="font-bold text-charcoal dark:text-gray-200 text-sm">Weather</span>
      </a>

      <a href="#" class="service-card group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-2xl">badge</span>
        </div>
        <span class="font-bold text-charcoal dark:text-gray-200 text-sm">Visa Info</span>
      </a>

      <a href="#" class="service-card group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-2xl">currency_exchange</span>
        </div>
        <span class="font-bold text-charcoal dark:text-gray-200 text-sm">Money</span>
      </a>

      <a href="#" class="service-card group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-2xl">sim_card</span>
        </div>
        <span class="font-bold text-charcoal dark:text-gray-200 text-sm">Connectivity</span>
      </a>

      <a href="#" class="service-card group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3 lg:col-span-2">
        <div class="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
          <span class="material-symbols-outlined text-2xl">translate</span>
        </div>
        <span class="font-bold text-charcoal dark:text-gray-200 text-sm">Sinhala & Tamil Phrasebook</span>
      </a>

    </div>
  </section>
</template>

<style scoped>
.service-card {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.service-card:hover {
    transform: translateY(-5px);
}
</style>
