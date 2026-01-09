<template>
  <section class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-neutral-dark dark:text-white">Emergency Phrases</h2>
      <!-- Offline Available Badge -->
      <div class="flex items-center gap-1.5 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
        <span class="material-symbols-outlined text-sm">offline_bolt</span>
        <span>Offline Available</span>
      </div>
    </div>

    <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] shadow-sm overflow-hidden">
      <div class="divide-y divide-neutral-100 dark:divide-[#3a2d28]">
        
        <div 
          v-for="(phrase, index) in emergencyPhrases" 
          :key="index" 
          class="p-4 transition-all"
          :class="isPhraseHighlighted(phrase.intent) && 'bg-primary/5 ring-1 ring-primary'"
        >
          <!-- English phrase header -->
          <div class="flex items-center gap-2 mb-3">
            <span class="material-symbols-outlined text-primary text-lg">{{ getIntentIcon(phrase.intent) }}</span>
            <p class="text-sm font-bold text-neutral-dark dark:text-white">{{ phrase.english }}</p>
          </div>
          
          <!-- Languages grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <!-- Sinhala -->
            <div class="flex items-center justify-between bg-neutral-50 dark:bg-[#32241e] rounded-lg px-3 py-2 group">
              <div class="flex-1 min-w-0">
                <span class="text-[10px] text-neutral-400 uppercase tracking-wide font-medium">Sinhala</span>
                <p class="text-sm font-medium text-neutral-dark dark:text-white truncate">{{ phrase.sinhala }}</p>
              </div>
              <div class="flex items-center gap-1 ml-2">
                <button 
                  @click="speakPhrase(phrase.sinhala, 'si')"
                  class="p-1.5 rounded hover:bg-primary/10 text-neutral-400 hover:text-primary transition-colors"
                  title="Listen"
                  :disabled="!speechSupported"
                >
                  <span class="material-symbols-outlined text-lg">volume_up</span>
                </button>
                <button 
                  @click="copyText(phrase.sinhala, `sinhala-${index}`)"
                  class="p-1.5 rounded hover:bg-primary/10 text-neutral-400 hover:text-primary transition-colors relative"
                  title="Copy"
                >
                  <span class="material-symbols-outlined text-lg">{{ copiedId === `sinhala-${index}` ? 'check' : 'content_copy' }}</span>
                  <!-- Copied feedback -->
                  <span 
                    v-if="copiedId === `sinhala-${index}`" 
                    class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 text-white text-xs rounded whitespace-nowrap"
                  >
                    Copied!
                  </span>
                </button>
              </div>
            </div>

            <!-- Tamil -->
            <div class="flex items-center justify-between bg-neutral-50 dark:bg-[#32241e] rounded-lg px-3 py-2 group">
              <div class="flex-1 min-w-0">
                <span class="text-[10px] text-neutral-400 uppercase tracking-wide font-medium">Tamil</span>
                <p class="text-sm font-medium text-neutral-dark dark:text-white truncate">{{ phrase.tamil }}</p>
              </div>
              <div class="flex items-center gap-1 ml-2">
                <button 
                  @click="speakPhrase(phrase.tamil, 'ta')"
                  class="p-1.5 rounded hover:bg-primary/10 text-neutral-400 hover:text-primary transition-colors"
                  title="Listen"
                  :disabled="!speechSupported"
                >
                  <span class="material-symbols-outlined text-lg">volume_up</span>
                </button>
                <button 
                  @click="copyText(phrase.tamil, `tamil-${index}`)"
                  class="p-1.5 rounded hover:bg-primary/10 text-neutral-400 hover:text-primary transition-colors relative"
                  title="Copy"
                >
                  <span class="material-symbols-outlined text-lg">{{ copiedId === `tamil-${index}` ? 'check' : 'content_copy' }}</span>
                  <!-- Copied feedback -->
                  <span 
                    v-if="copiedId === `tamil-${index}`" 
                    class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 text-white text-xs rounded whitespace-nowrap"
                  >
                    Copied!
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Pronunciation hint -->
          <p v-if="phrase.pronunciationHint" class="text-xs text-neutral-400 mt-2 italic">
            {{ phrase.pronunciationHint }}
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { emergencyPhrases } from '~/data/emergency'

const props = defineProps<{
  highlightedIntent?: string | null
}>()

const copiedId = ref<string | null>(null)
const speechSupported = ref(false)

// Intent to phrase intent mapping
const intentPhrases: Record<string, string[]> = {
  hurt: ['ambulance', 'doctor'],
  lost: ['lost'],
  crime: ['police', 'help'],
  disaster: ['help']
}

function isPhraseHighlighted(phraseIntent: string): boolean {
  if (!props.highlightedIntent) return false
  const intents = intentPhrases[props.highlightedIntent] || []
  return intents.includes(phraseIntent)
}

// Check if Web Speech API is available
onMounted(() => {
  speechSupported.value = 'speechSynthesis' in window
})

// Get icon based on phrase intent
function getIntentIcon(intent: string): string {
  const icons: Record<string, string> = {
    help: 'emergency',
    lost: 'explore_off',
    doctor: 'local_hospital',
    ambulance: 'emergency',
    police: 'local_police'
  }
  return icons[intent] || 'translate'
}

// Copy text to clipboard with feedback
async function copyText(text: string, id: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => {
      copiedId.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Text-to-speech playback
function speakPhrase(text: string, lang: string) {
  if (!speechSupported.value) return
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel()
  
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang === 'si' ? 'si-LK' : 'ta-IN'
  utterance.rate = 0.8 // Slightly slower for clarity
  
  window.speechSynthesis.speak(utterance)
}
</script>

