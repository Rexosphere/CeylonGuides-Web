<template>
  <section class="py-20 bg-background-light dark:bg-background-dark">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 class="text-3xl md:text-4xl font-display font-bold text-primary dark:text-white mb-2">Travel Essentials
          </h2>
          <p class="text-text-muted dark:text-gray-400">Everything you need for a smooth journey.</p>
        </div>
        <div class="flex gap-2">
          <button class="px-4 py-1.5 rounded-full text-xs font-semibold bg-secondary text-white shadow-sm">All
            Tools</button>
          <button
            class="px-4 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-muted dark:text-gray-300 hover:border-secondary hover:text-secondary transition-colors">Logistics</button>
          <button
            class="px-4 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-muted dark:text-gray-300 hover:border-secondary hover:text-secondary transition-colors">Culture</button>
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <!-- Transport -->
        <NuxtLink to="/transport"
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 border border-gray-100 dark:border-gray-800 hover:border-secondary/30 group">
          <div
            class="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
            <span class="material-icons text-xl">directions_bus</span>
          </div>
          <span
            class="text-sm font-semibold text-text-main dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white">Transport</span>
        </NuxtLink>

        <!-- Accommodation -->
        <NuxtLink to="/accommodation"
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 border border-gray-100 dark:border-gray-800 hover:border-secondary/30 group">
          <div
            class="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
            <span class="material-icons text-xl">hotel</span>
          </div>
          <span
            class="text-sm font-semibold text-text-main dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white">Accommodation</span>
        </NuxtLink>

        <!-- Clean Dining -->
        <NuxtLink to="/clean-dining"
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 border border-gray-100 dark:border-gray-800 hover:border-secondary/30 group">
          <div
            class="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
            <span class="material-icons text-xl">restaurant</span>
          </div>
          <span
            class="text-sm font-semibold text-text-main dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white">Clean
            Dining</span>
        </NuxtLink>

        <!-- Shopping Guide -->
        <NuxtLink to="/shopping"
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 border border-gray-100 dark:border-gray-800 hover:border-secondary/30 group">
          <div
            class="w-10 h-10 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
            <span class="material-icons text-xl">shopping_bag</span>
          </div>
          <span
            class="text-sm font-semibold text-text-main dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white">Shopping
            Guide</span>
        </NuxtLink>

        <!-- Weather -->
        <NuxtLink to="/weather"
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 border border-gray-100 dark:border-gray-800 hover:border-secondary/30 group">
          <div
            class="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
            <span class="material-icons text-xl">wb_sunny</span>
          </div>
          <span
            class="text-sm font-semibold text-text-main dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white">Weather</span>
        </NuxtLink>

        <!-- Visa Info -->
        <NuxtLink to="/visa"
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 border border-gray-100 dark:border-gray-800 hover:border-secondary/30 group">
          <div
            class="w-10 h-10 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
            <span class="material-icons text-xl">badge</span>
          </div>
          <span
            class="text-sm font-semibold text-text-main dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white">Visa
            Info</span>
        </NuxtLink>

        <!-- Money -->
        <NuxtLink to="/money"
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 border border-gray-100 dark:border-gray-800 hover:border-secondary/30 group">
          <div
            class="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
            <span class="material-icons text-xl">currency_exchange</span>
          </div>
          <span
            class="text-sm font-semibold text-text-main dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white">Money</span>
        </NuxtLink>

        <!-- Connectivity -->
        <NuxtLink to="/connectivity"
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 border border-gray-100 dark:border-gray-800 hover:border-secondary/30 group">
          <div
            class="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
            <span class="material-icons text-xl">sim_card</span>
          </div>
          <span
            class="text-sm font-semibold text-text-main dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white">Connectivity</span>
        </NuxtLink>

        <!-- Phrasebook (Spans 2 columns) -->
        <NuxtLink to="/phrasebook"
          class="col-span-2 md:col-span-1 xl:col-span-2 bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center gap-3 border border-gray-100 dark:border-gray-800 hover:border-secondary/30 group">
          <div
            class="w-10 h-10 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
            <span class="material-icons text-xl">translate</span>
          </div>
          <span
            class="text-sm font-semibold text-text-main dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white">Sinhala
            & Tamil Phrasebook</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this static layout
</script>
