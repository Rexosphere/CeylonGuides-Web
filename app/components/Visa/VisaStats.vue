<template>
  <div class="max-w-[1280px] mx-auto px-4 -mt-8 relative z-20">
    <div class="bg-white dark:bg-card-dark rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-neutral-700">
      <div class="flex items-center gap-4 py-2 md:py-0">
        <div class="bg-primary/10 p-3 rounded-full text-primary">
          <span class="material-symbols-outlined">timer</span>
        </div>
        <div>
          <p class="text-xs text-text-muted uppercase tracking-wider font-semibold">Processing Time</p>
          <p class="text-text-main dark:text-white font-bold">{{ processingTime || 'Usually 24-48 Hours' }}</p>
        </div>
      </div>
      <div class="flex items-center gap-4 py-2 md:py-0 md:pl-6">
        <div class="bg-primary/10 p-3 rounded-full text-primary">
          <span class="material-symbols-outlined">payments</span>
        </div>
        <div>
          <p class="text-xs text-text-muted uppercase tracking-wider font-semibold">Standard Fee</p>
          <p class="text-text-main dark:text-white font-bold">{{ fee || '$50 USD (Tourist)' }}</p>
        </div>
      </div>
      <div class="flex items-center gap-4 py-2 md:py-0 md:pl-6">
        <div class="bg-primary/10 p-3 rounded-full text-primary">
          <span class="material-symbols-outlined">verified</span>
        </div>
        <div>
          <p class="text-xs text-text-muted uppercase tracking-wider font-semibold">Validity</p>
          <p class="text-text-main dark:text-white font-bold">{{ duration || '30 Days (Extendable)' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  processingTime?: string | null
  fee?: string | null
  duration?: string | null
}>()
</script>
