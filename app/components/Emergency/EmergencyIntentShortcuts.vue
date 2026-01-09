<template>
  <div
    class="bg-white dark:bg-slate-800 shadow-soft rounded-2xl p-4 flex flex-wrap items-center gap-6 border border-slate-100 dark:border-slate-700">
    <span class="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">What's happening?</span>
    <div class="flex flex-wrap gap-3">
      <button :class="[
        'flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all shadow-sm',
        selectedIntent === 'hurt'
          ? 'border-slate-200 dark:border-slate-700 bg-ocean-slate dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
      ]" @click="handleIntent('hurt')">
        <span class="material-symbols-outlined"
          :class="selectedIntent === 'hurt' ? 'text-white' : 'text-slate-500'">personal_injury</span> I'm hurt
      </button>
      <button :class="[
        'flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all shadow-sm',
        selectedIntent === 'lost'
          ? 'border-slate-200 dark:border-slate-700 bg-ocean-slate dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
      ]" @click="handleIntent('lost')">
        <span class="material-symbols-outlined"
          :class="selectedIntent === 'lost' ? 'text-white' : 'text-slate-500'">location_off</span> I'm lost
      </button>
      <button :class="[
        'flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all shadow-sm',
        selectedIntent === 'crime'
          ? 'border-slate-200 dark:border-slate-700 bg-ocean-slate dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
      ]" @click="handleIntent('crime')">
        <span class="material-symbols-outlined"
          :class="selectedIntent === 'crime' ? 'text-white' : 'text-slate-500'">gpp_maybe</span> Crime / Danger
      </button>
      <button :class="[
        'flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all shadow-sm',
        selectedIntent === 'disaster'
          ? 'border-slate-200 dark:border-slate-700 bg-ocean-slate dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
      ]" @click="handleIntent('disaster')">
        <span class="material-symbols-outlined"
          :class="selectedIntent === 'disaster' ? 'text-white' : 'text-slate-500'">tsunami</span> Disaster
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedIntent = ref<string | null>(null)

const emit = defineEmits<{
  'intent-change': [intent: string | null]
}>()

function handleIntent(intent: string) {
  if (selectedIntent.value === intent) {
    selectedIntent.value = null
    emit('intent-change', null)
  } else {
    selectedIntent.value = intent
    emit('intent-change', intent)
  }
}
</script>

<style scoped>
.bg-ocean-slate {
  background-color: #475569;
}
</style>
