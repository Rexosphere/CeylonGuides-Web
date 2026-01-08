<template>
  <section class="space-y-6">
    <div class="relative max-w-2xl mx-auto">
      <span class="absolute left-4 top-3.5 text-slate-400 material-symbols-outlined">search</span>
      <input
        class="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full focus:ring-2 focus:ring-primary focus:border-primary outline-none shadow-sm transition-all text-sm placeholder:text-slate-400 text-slate-800 dark:text-white"
        placeholder="Search items, districts, tips... (e.g., 'gems', 'Pettah', 'scam')" type="text" />
    </div>
    <div class="flex flex-wrap justify-center gap-2">
      <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider py-1.5 mr-2">Filter
        by Tags:</span>
      <button
        class="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-600 bg-white hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 transition">Tea</button>
      <button
        class="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-600 bg-white hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 transition">Spices</button>
      <button
        class="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-600 bg-white hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 transition">Gems</button>
      <button
        class="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-600 bg-white hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 transition">Textiles</button>
      <button
        class="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-600 bg-white hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 transition">Handicrafts</button>
      <button
        class="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-600 bg-white hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 transition">Wellness</button>
      <button
        class="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-600 bg-white hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 transition">Markets</button>
      <button
        class="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-600 bg-white hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 transition">Bargaining</button>
      <button
        class="px-3 py-1 text-xs rounded-full bg-rose-50 text-crimson border border-rose-100 hover:bg-rose-100 dark:bg-rose-900/20 dark:border-rose-800/50 dark:text-rose-400 transition font-medium">Scam-Risk</button>
      <button
        class="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 transition font-medium">VAT</button>
    </div>
  </section>
</template>
