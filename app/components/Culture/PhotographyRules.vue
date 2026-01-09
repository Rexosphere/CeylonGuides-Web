<template>
  <section id="photography" class="mb-12">
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
      <span class="material-icons text-charcoal dark:text-white">camera_alt</span> Photography Guidelines
    </h2>
    <p class="text-gray-600 dark:text-gray-300 mb-6">What you can and cannot photograph in Sri Lanka.</p>

    <!-- Always Ask Permission -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-5 mb-8">
      <h4 class="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
        <span class="material-icons">handshake</span> Always Ask Permission First
      </h4>
      <p class="text-sm text-blue-800/80 dark:text-blue-300/80">
        Politely ask before photographing people, especially women, children, or monks. If they decline, respect their
        wishes.
        A simple "Istuti" (thank you) shows appreciation.
      </p>
    </div>

    <!-- Critical Restrictions -->
    <div class="mb-6">
      <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Critical Restrictions</h5>
      <div class="flex flex-wrap gap-3">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-muted-crimson/10 text-muted-crimson border border-muted-crimson/20">
          <span class="material-icons text-base">block</span> Standing with back to Buddha
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-muted-crimson/10 text-muted-crimson border border-muted-crimson/20">
          <span class="material-icons text-base">block</span> Selfies with Buddha statues
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-muted-crimson/10 text-muted-crimson border border-muted-crimson/20">
          <span class="material-icons text-base">block</span> Photographing monks
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-muted-crimson/10 text-muted-crimson border border-muted-crimson/20">
          <span class="material-icons text-base">block</span> Flash on murals
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-muted-crimson/10 text-muted-crimson border border-muted-crimson/20">
          <span class="material-icons text-base">flight_takeoff</span> Drone photography
        </span>
      </div>
    </div>

    <!-- Important Guidelines -->
    <div class="mb-6">
      <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Important Guidelines</h5>
      <div class="flex flex-wrap gap-3">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
          <span class="material-icons text-base">warning_amber</span> Filming ceremonies
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
          <span class="material-icons text-base">warning_amber</span> Photographing people
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
          <span class="material-icons text-base">warning_amber</span> Inner shrine photography
        </span>
      </div>
    </div>

    <!-- Featured Restriction Card -->
    <div
      class="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-5 shadow-sm relative overflow-hidden">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <span class="material-icons">close</span>
      </button>
      <div class="flex gap-4">
        <div class="w-10 h-10 rounded-full bg-muted-crimson/10 flex items-center justify-center flex-shrink-0">
          <span class="material-icons text-muted-crimson">no_photography</span>
        </div>
        <div>
          <h4 class="font-bold text-charcoal dark:text-white mb-1">Standing with back to Buddha</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Never take photos with your back to a Buddha statue — always face the statue with reverence.
          </p>
          <div class="flex gap-2">
            <span
              class="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded uppercase font-semibold">temples</span>
            <span
              class="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded uppercase font-semibold">critical</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Reference -->
    <div class="bg-cool-stone dark:bg-gray-800/50 rounded-xl p-6 mt-6">
      <h5 class="text-sm font-bold text-charcoal dark:text-gray-200 mb-3">Quick Reference</h5>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span class="material-icons text-primary text-base">check_circle</span>
          Photography allowed in most Buddhist temples
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span class="material-icons text-primary text-base">check_circle</span>
          Ask temple officials when unsure
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span class="material-icons text-muted-crimson text-base">cancel</span>
          No drones at heritage sites
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span class="material-icons text-muted-crimson text-base">cancel</span>
          No flash on ancient murals
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
