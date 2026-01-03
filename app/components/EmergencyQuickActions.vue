<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-neutral-dark dark:text-white flex items-center gap-3">
        <span class="material-symbols-outlined text-primary">e911_emergency</span>
        Immediate Assistance
      </h2>
      <span class="text-sm text-neutral-soft">Tap to call instantly</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Police Card -->
      <div class="bg-white dark:bg-[#2a1d18] p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-[#3a2d28] hover:shadow-md transition-shadow relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
        <div class="flex flex-col h-full justify-between gap-4 relative z-10">
          <div>
            <div class="flex justify-between items-start">
              <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400">
                <span class="material-symbols-outlined text-3xl">local_police</span>
              </div>
              <span class="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Critical</span>
            </div>
            <h3 class="mt-4 text-lg font-bold text-neutral-dark dark:text-white">Police Emergency</h3>
            <p class="text-sm text-neutral-soft mt-1">For crimes and immediate danger.</p>
          </div>
          <div class="mt-2">
            <a class="block w-full text-center bg-primary text-white text-2xl font-extrabold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" href="tel:119">
              119
            </a>
          </div>
        </div>
      </div>

      <!-- Ambulance Card -->
      <div class="bg-white dark:bg-[#2a1d18] p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-[#3a2d28] hover:shadow-md transition-shadow relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
        <div class="flex flex-col h-full justify-between gap-4 relative z-10">
          <div>
            <div class="flex justify-between items-start">
              <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                <span class="material-symbols-outlined text-3xl">ambulance</span>
              </div>
              <span class="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Medical</span>
            </div>
            <h3 class="mt-4 text-lg font-bold text-neutral-dark dark:text-white">Suwa Seriya</h3>
            <p class="text-sm text-neutral-soft mt-1">Free national ambulance service.</p>
          </div>
          <div class="mt-2">
            <a class="block w-full text-center bg-primary text-white text-2xl font-extrabold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" href="tel:1990">
              1990
            </a>
          </div>
        </div>
      </div>

      <!-- Tourist Police Card -->
      <div class="bg-white dark:bg-[#2a1d18] p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-[#3a2d28] hover:shadow-md transition-shadow relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
        <div class="flex flex-col h-full justify-between gap-4 relative z-10">
          <div>
            <div class="flex justify-between items-start">
              <div class="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-orange-600 dark:text-orange-400">
                <span class="material-symbols-outlined text-3xl">shield_person</span>
              </div>
              <span class="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Tourist</span>
            </div>
            <h3 class="mt-4 text-lg font-bold text-neutral-dark dark:text-white">Tourist Police</h3>
            <p class="text-sm text-neutral-soft mt-1">Dedicated support for travelers.</p>
          </div>
          <div class="mt-2">
            <a class="block w-full text-center border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg font-bold py-3 rounded-lg transition-colors" href="tel:0112421052">
              011-2421052
            </a>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>
