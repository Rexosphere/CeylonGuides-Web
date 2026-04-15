<template>
  <section class="py-20 relative bg-accent-info/10 dark:bg-accent-info/5">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <span
        class="inline-block px-3 py-1 rounded bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mb-4">Priority</span>
      <div class="flex justify-between items-end mb-10">
        <h2 class="text-3xl md:text-4xl font-display font-bold text-primary dark:text-white">Safety & Well-being</h2>
        <NuxtLink to="/safety-mode"
          class="text-secondary hover:text-primary dark:hover:text-white text-sm font-semibold hidden md:block">
          View Official Advisories
        </NuxtLink>
      </div>

      <!-- Safety Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Scam Alerts -->
        <div class="bg-white dark:bg-card-dark rounded-xl p-6 border-l-4 border-accent-danger shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-icons text-accent-danger">warning_amber</span>
            <h3 class="font-bold text-lg text-primary dark:text-white">Scam Alerts</h3>
          </div>
          <p class="text-sm text-text-muted dark:text-gray-400 mb-4 h-14">
            Stay ahead of common tourist traps and local scams.
          </p>
          <NuxtLink to="/scam-alerts"
            class="text-accent-danger text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline">
            Check List
            <span class="material-icons text-sm">arrow_forward</span>
          </NuxtLink>
        </div>

        <!-- Emergency -->
        <div class="bg-white dark:bg-card-dark rounded-xl p-6 border-l-4 border-secondary shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-icons text-secondary">local_hospital</span>
            <h3 class="font-bold text-lg text-primary dark:text-white">Emergency</h3>
          </div>
          <p class="text-sm text-text-muted dark:text-gray-400 mb-4 h-14">
            Police (119), Ambulance (1990), and Tourist Police contacts.
          </p>
          <NuxtLink to="/emergency"
            class="text-secondary text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline">
            Save Numbers
            <span class="material-icons text-sm">arrow_forward</span>
          </NuxtLink>
        </div>

        <!-- Health -->
        <div class="bg-white dark:bg-card-dark rounded-xl p-6 border-l-4 border-teal-500 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-icons text-teal-500">health_and_safety</span>
            <h3 class="font-bold text-lg text-primary dark:text-white">Health</h3>
          </div>
          <p class="text-sm text-text-muted dark:text-gray-400 mb-4 h-14">
            Hospital locator, insurance advice, and hygiene ratings.
          </p>
          <NuxtLink to="/health"
            class="text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline">
            Find Care
            <span class="material-icons text-sm">arrow_forward</span>
          </NuxtLink>
        </div>

        <!-- Etiquette -->
        <div class="bg-white dark:bg-card-dark rounded-xl p-6 border-l-4 border-gray-500 shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-icons text-gray-500">temple_buddhist</span>
            <h3 class="font-bold text-lg text-primary dark:text-white">Etiquette</h3>
          </div>
          <p class="text-sm text-text-muted dark:text-gray-400 mb-4 h-14">
            Respect local customs, temple attire, and photography rules.
          </p>
          <NuxtLink to="/culture"
            class="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline">
            Read Guide
            <span class="material-icons text-sm">arrow_forward</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this static layout
</script>
