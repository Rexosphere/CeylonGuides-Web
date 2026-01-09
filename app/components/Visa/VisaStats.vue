<template>
  <div class="relative z-20 max-w-7xl mx-auto px-4 -mt-16 mb-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        class="bg-white dark:bg-surface-dark rounded-xl shadow-soft p-6 flex items-center border border-stone-neutral dark:border-gray-700">
        <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-full mr-4 text-primary">
          <span class="material-symbols-outlined">schedule</span>
        </div>
        <div>
          <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Processing Time</p>
          <p class="text-gray-900 dark:text-white font-medium">{{ processingTime || 'Usually 24-48 Hours' }}</p>
        </div>
      </div>

      <div
        class="bg-white dark:bg-surface-dark rounded-xl shadow-soft p-6 flex items-center border border-stone-neutral dark:border-gray-700">
        <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-full mr-4 text-primary">
          <span class="material-symbols-outlined">payments</span>
        </div>
        <div>
          <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Standard Fee</p>
          <p class="text-gray-900 dark:text-white font-medium">{{ fee || 'Free (Waived)' }}</p>
        </div>
      </div>

      <div
        class="bg-white dark:bg-surface-dark rounded-xl shadow-soft p-6 flex items-center border border-stone-neutral dark:border-gray-700">
        <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-full mr-4 text-primary">
          <span class="material-symbols-outlined">event_available</span>
        </div>
        <div>
          <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Validity</p>
          <p class="text-gray-900 dark:text-white font-medium">{{ duration || '30 Days (Extendable)' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  processingTime?: string
  fee?: string
  duration?: string
}>()
</script>
