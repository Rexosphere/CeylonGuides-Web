<template>
  <section id="safety" class="bg-secondary/20 dark:bg-gray-800/50 -mx-4 md:-mx-6 px-4 md:px-6 py-16 mt-8 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-10">
        <div class="relative z-10">
          <div class="inline-block bg-accent/10 text-accent font-bold px-3 py-1 rounded mb-3 text-xs tracking-wider uppercase">Priority</div>
          <h2 class="font-serif text-3xl md:text-4xl font-bold text-primary dark:text-white">Safety & Well-being</h2>
        </div>
        <div class="relative z-10 mt-4 md:mt-0">
          <a href="#" class="text-primary dark:text-accent-light hover:underline font-bold text-sm">View Official Advisories</a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <!-- Scam Alerts -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-red-500 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-symbols-outlined text-red-500">warning</span>
            <h4 class="font-bold text-lg text-charcoal dark:text-white">Scam Alerts</h4>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Stay ahead of common tourist traps and local scams.</p>
          <a href="/scam-alerts" class="text-xs font-bold uppercase text-red-500 hover:text-red-600 flex items-center gap-1">Check List <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>

        <!-- Emergency -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-accent hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-symbols-outlined text-accent">emergency</span>
            <h4 class="font-bold text-lg text-charcoal dark:text-white">Emergency</h4>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Police (119), Ambulance (1990), and Tourist Police contacts.</p>
          <a href="/emergency" class="text-xs font-bold uppercase text-accent hover:text-accent/80 flex items-center gap-1">Save Numbers <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>

        <!-- Health -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-symbols-outlined text-teal-500">medical_services</span>
            <h4 class="font-bold text-lg text-charcoal dark:text-white">Health</h4>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Hospital locator, insurance advice, and hygiene ratings.</p>
          <a href="/health" class="text-xs font-bold uppercase text-teal-500 hover:text-teal-600 flex items-center gap-1">Find Care <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>

        <!-- Etiquette -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-secondary hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-symbols-outlined text-primary/70 dark:text-secondary">temple_buddhist</span>
            <h4 class="font-bold text-lg text-charcoal dark:text-white">Etiquette</h4>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Respect local customs, temple attire, and photography rules.</p>
          <a href="/culture" class="text-xs font-bold uppercase text-primary/70 dark:text-secondary hover:text-primary flex items-center gap-1">Read Guide <span class="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>
      </div>
    </div>
  </section>
</template>
