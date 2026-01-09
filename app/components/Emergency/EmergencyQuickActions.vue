<template>
  <div>
    <!-- Medical Emergency Banner -->
    <div
      class="mb-12 bg-rose-50 dark:bg-rose-900/10 border-l-4 border-critical rounded-r-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
      <div class="flex gap-4">
        <div class="shrink-0 text-critical">
          <span class="material-symbols-outlined text-3xl">medical_services</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-critical dark:text-rose-400 mb-1">Medical Emergency</h3>
          <p class="text-charcoal dark:text-slate-300 text-sm max-w-2xl leading-relaxed">
            Call <span class="font-bold">1990</span> for free GPS-tracked ambulance. Hospital and ambulance information
            is highlighted below.
          </p>
        </div>
      </div>
      <div class="flex gap-3 text-sm font-semibold shrink-0">
        <button
          class="text-primary dark:text-slate-300 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          @click="callNumber('1990')">
          Call Ambulance 1990
        </button>
        <button
          class="text-primary dark:text-slate-300 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          @click="$emit('show-hospitals')">
          Nearby Hospitals
        </button>
      </div>
    </div>

    <!-- Immediate Assistance Section -->
    <div class="mb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold flex items-center gap-3 text-charcoal dark:text-white">
          <span class="material-symbols-outlined text-primary">lightbulb</span>
          Immediate Assistance
        </h2>
        <div class="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <span class="material-symbols-outlined text-sm">touch_app</span> Tap to call instantly
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Police Emergency -->
        <div
          class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-700 flex flex-col h-full hover:border-slate-200 transition-colors">
          <div class="flex justify-between items-start mb-5">
            <div class="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
              <span class="material-symbols-outlined text-critical">local_police</span>
            </div>
            <span
              class="text-[10px] font-bold px-2 py-1 bg-rose-50 dark:bg-rose-900/30 text-critical dark:text-rose-300 rounded tracking-widest border border-rose-100 dark:border-rose-900/50">CRITICAL</span>
          </div>
          <h3 class="text-lg font-bold mb-2 text-charcoal dark:text-white">Police Emergency</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-8 flex-grow leading-relaxed">Primary police emergency
            number for crime, assault, and traffic accidents.</p>
          <button
            class="w-full bg-ocean-slate text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold hover:bg-slate-700 transition-all shadow-md shadow-slate-900/10"
            @click="callNumber('119')">
            <span class="material-symbols-outlined">phone</span> 119
          </button>
        </div>

        <!-- Ambulance -->
        <div
          class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-700 flex flex-col h-full hover:border-slate-200 transition-colors">
          <div class="flex justify-between items-start mb-5">
            <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center">
              <span class="material-symbols-outlined text-slate-600 dark:text-slate-300">medical_services</span>
            </div>
            <span
              class="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded tracking-widest uppercase border border-slate-200 dark:border-slate-600">Medical</span>
          </div>
          <h3 class="text-lg font-bold mb-2 text-charcoal dark:text-white">Suwa Seriya Ambulance</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-8 flex-grow leading-relaxed">Free emergency ambulance
            service with GPS-tracked ambulances across the island.</p>
          <button
            class="w-full bg-ocean-slate text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold hover:bg-slate-700 transition-all shadow-md shadow-slate-900/10"
            @click="callNumber('1990')">
            <span class="material-symbols-outlined">phone</span> 1990
          </button>
        </div>

        <!-- Tourism Hotline -->
        <div
          class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-700 flex flex-col h-full hover:border-slate-200 transition-colors">
          <div class="flex justify-between items-start mb-5">
            <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center">
              <span class="material-symbols-outlined text-slate-600 dark:text-slate-300">tour</span>
            </div>
            <span
              class="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded tracking-widest uppercase border border-slate-200 dark:border-slate-600">Tourist</span>
          </div>
          <h3 class="text-lg font-bold mb-2 text-charcoal dark:text-white">Tourism Hotline 1912</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-8 flex-grow leading-relaxed">24/7 tourism emergency
            and assistance hotline operated by Sri Lanka Tourism.</p>
          <button
            class="w-full bg-ocean-slate text-white py-4 rounded-xl flex items-center justify-center gap-3 font-bold hover:bg-slate-700 transition-all shadow-md shadow-slate-900/10"
            @click="callNumber('1912')">
            <span class="material-symbols-outlined">phone</span> 1912
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  highlightedIntent?: string | null
}>()

const emit = defineEmits<{
  'show-hospitals': []
}>()

function callNumber(number: string) {
  window.location.href = `tel:${number}`
}
</script>

<style scoped>
.text-critical {
  color: #dc2626;
}

.border-critical {
  border-color: #dc2626;
}

.text-charcoal {
  color: #1e293b;
}

.bg-ocean-slate {
  background-color: #475569;
}

.shadow-soft {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>
