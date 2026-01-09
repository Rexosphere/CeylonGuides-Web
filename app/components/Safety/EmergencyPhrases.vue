<template>
  <div class="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-lg shadow-neutral-200/50 dark:shadow-neutral-900/50 border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
          <span class="material-symbols-outlined text-xl">translate</span>
        </div>
        <div>
          <h2 class="text-xl font-bold text-neutral-900 dark:text-white">Emergency Phrases</h2>
          <p class="text-sm text-neutral-500 mt-0.5">Local language assistance for critical situations</p>
        </div>
      </div>
    </div>

    <!-- Category Tabs -->
    <div class="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar scroll-smooth">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="activeCategory = category.id"
        class="px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2"
        :class="activeCategory === category.id
          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg scale-105'
          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'"
      >
        <span class="material-symbols-outlined text-base" v-if="getCategoryIcon(category.id)">{{ getCategoryIcon(category.id) }}</span>
        {{ category.label }}
      </button>
    </div>

    <!-- Phrases Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div 
        v-for="phrase in filteredPhrases" 
        :key="phrase.id"
        class="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-5 hover:shadow-md transition-all border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 group hover:-translate-y-1 relative overflow-hidden"
      >
        <!-- Top decoration -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <!-- English -->
        <div class="mb-4">
          <p class="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">English</p>
          <p class="font-bold text-lg text-neutral-900 dark:text-white leading-tight">{{ phrase.english }}</p>
        </div>

        <div class="w-full h-px bg-neutral-200 dark:bg-neutral-700/50 my-4"></div>

        <!-- Sinhala -->
        <div class="mb-3">
          <div class="flex justify-between items-baseline mb-1">
            <p class="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Sinhala</p>
            <p v-if="phrase.pronunciation" class="text-xs text-neutral-500 italic text-right font-medium">
              "{{ phrase.pronunciation }}"
            </p>
          </div>
          <p class="text-xl text-teal-700 dark:text-teal-400 font-medium tracking-wide">{{ phrase.sinhala }}</p>
        </div>

        <!-- Tamil (if available) -->
        <div v-if="phrase.tamil" class="mt-4 pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-700/50">
          <p class="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Tamil</p>
          <p class="text-base text-purple-700 dark:text-purple-400">{{ phrase.tamil }}</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 mt-5">
          <button 
            @click="copyPhrase(phrase)"
            class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-600 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-all active:scale-95"
          >
            <span class="material-symbols-outlined text-sm transition-transform duration-300" :class="copiedId === phrase.id ? 'scale-0' : 'scale-100'">content_copy</span>
            <span class="material-symbols-outlined text-sm text-green-500 absolute transition-transform duration-300" :class="copiedId === phrase.id ? 'scale-100' : 'scale-0'">check</span>
            {{ copiedId === phrase.id ? 'Copied' : 'Copy' }}
          </button>
          <button 
            @click="speakPhrase(phrase.english)"
            class="px-4 flex items-center justify-center gap-1.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 transition-all active:scale-95"
            title="Listen to details"
          >
            <span class="material-symbols-outlined text-lg">volume_up</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { emergencyPhrases, getPhrasesByCategory } from '~/data/safetyModeData'
import type { EmergencyPhrase } from '~/types/safetyMode'

// Categories
const categories = [
  { id: 'help', label: 'Ask for Help' },
  { id: 'medical', label: 'Medical' },
  { id: 'police', label: 'Police' },
  { id: 'directions', label: 'Directions' },
  { id: 'general', label: 'General' }
]

const activeCategory = ref('help')
const copiedId = ref<string | null>(null)

// Filtered phrases by category
const filteredPhrases = computed(() => 
  getPhrasesByCategory(activeCategory.value)
)

function getCategoryIcon(id: string): string {
  const icons: Record<string, string> = {
    help: 'sos',
    medical: 'medical_services',
    police: 'local_police',
    directions: 'explore',
    general: 'chat'
  }
  return icons[id] || ''
}

// Copy phrase to clipboard
async function copyPhrase(phrase: EmergencyPhrase) {
  const text = `${phrase.english}\n${phrase.sinhala}${phrase.tamil ? '\n' + phrase.tamil : ''}${phrase.pronunciation ? '\n(' + phrase.pronunciation + ')' : ''}`
  
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = phrase.id
    setTimeout(() => { copiedId.value = null }, 2000)
  } catch {
    alert(text)
  }
}

// Speak phrase using Web Speech API
function speakPhrase(text: string) {
  if (!('speechSynthesis' in window)) {
    alert('Speech not supported in this browser')
    return
  }
  
  // Cancel any ongoing speech
  speechSynthesis.cancel()
  
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.9
  
  speechSynthesis.speak(utterance)
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
