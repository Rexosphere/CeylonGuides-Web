<template>
  <div class="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-2">
        <div class="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
          <span class="material-icons text-xl">local_hospital</span>
        </div>
        <h3 class="font-bold text-slate-800 dark:text-slate-100">Nearest Hospitals</h3>
      </div>
      <a class="text-primary text-xs font-semibold hover:underline flex items-center" href="#">
        View All
        <span class="material-icons text-sm ml-1">arrow_forward</span>
      </a>
    </div>

    <!-- Empty State -->
    <div v-if="!coords"
      class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 flex flex-col items-center text-center border border-slate-100 dark:border-slate-700 mb-4">
      <div class="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-3">
        <span class="material-icons text-slate-400">location_off</span>
      </div>
      <h4 class="font-semibold text-sm mb-1 text-slate-800 dark:text-slate-200">Location Required</h4>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-4 px-4">Enable location access to automatically find the
        nearest medical facilities.</p>
      <button @click="$emit('requestLocation')"
        class="bg-slate-800 dark:bg-slate-600 hover:bg-slate-700 text-white text-xs font-medium py-2 px-4 rounded-full transition">
        Enable Location
      </button>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i"
        class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 animate-pulse">
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Hospital List (when we have location) -->
    <div v-else class="space-y-3 mb-4">
      <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
        <p class="text-xs text-slate-500 dark:text-slate-400 text-center">
          Hospital data will be loaded based on your location
        </p>
      </div>
    </div>

    <div class="flex items-start gap-2 text-slate-400">
      <span class="material-icons text-sm mt-0.5">info</span>
      <p class="text-[10px] leading-relaxed">Distances are straight-line estimates. Always verify route.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  coords?: { lat: number; lng: number } | null
  loading?: boolean
}>()

defineEmits<{
  requestLocation: []
}>()
</script>
