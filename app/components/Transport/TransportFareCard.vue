<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-surface-dark rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-primary to-deep-teal text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-2xl font-bold flex items-center gap-2">
              <span class="text-3xl">🛡️</span>
              Fare Guard
            </h2>
            <button 
              @click="emit('close')"
              class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <p class="text-white/90 text-sm">Show this card to your driver to agree on a fair price</p>
        </div>

        <!-- Main Card Content -->
        <div class="p-6 space-y-5">
          
          <!-- Route -->
          <div class="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
            <div class="text-xs text-gray-500 uppercase tracking-wide mb-2">Your Route</div>
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <span class="material-symbols-outlined text-green-500 text-lg">trip_origin</span>
                  From
                </div>
                <div class="font-semibold text-lg dark:text-white ml-7">{{ origin }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2 my-2 ml-2.5">
              <div class="w-0.5 h-6 bg-gray-300 dark:bg-gray-600"></div>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <span class="material-symbols-outlined text-red-500 text-lg">location_on</span>
                  To
                </div>
                <div class="font-semibold text-lg dark:text-white ml-7">{{ destination }}</div>
              </div>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-sm">
              <span class="text-gray-500">Distance</span>
              <span class="font-semibold dark:text-white">~{{ distance }} km</span>
            </div>
          </div>

          <!-- Fair Price - BIG -->
          <div class="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-6 text-center">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Fair {{ transportTypeLabel }} Fare</div>
            <div class="text-5xl font-bold text-green-600 dark:text-green-400 my-3">
              {{ fareRange.currency }} {{ fareRange.min.toLocaleString() }}<span class="text-3xl">-</span>{{ fareRange.max.toLocaleString() }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              Standard rate for this distance • {{ new Date().toLocaleDateString() }}
            </div>
          </div>

          <!-- Warning Box -->
          <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-700 rounded-xl p-4 flex gap-3">
            <span class="text-2xl shrink-0">⚠️</span>
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <strong>Beware:</strong> Some drivers quote 2-3x to tourists. 
              Show this card and insist on the meter or this fair rate.
            </div>
          </div>

          <!-- Useful Phrases -->
          <div class="border-t border-gray-200 dark:border-white/10 pt-5">
            <h3 class="font-semibold mb-3 flex items-center gap-2 dark:text-white">
              <span class="material-symbols-outlined">translate</span>
              Say This (Sinhala)
            </h3>
            <div class="space-y-2">
              <div
                v-for="phrase in negotiationPhrases"
                :key="phrase.english"
                class="bg-gray-50 dark:bg-white/5 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                @click="speakPhrase(phrase.sinhala)"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1">
                    <div class="font-medium text-sm text-gray-600 dark:text-gray-400">{{ phrase.english }}</div>
                    <div class="text-xl mt-1 dark:text-white">{{ phrase.sinhala }}</div>
                    <div class="text-xs text-gray-500 mt-1 italic">{{ phrase.pronunciation }}</div>
                  </div>
                  <button 
                    class="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary shrink-0"
                    title="Speak phrase"
                  >
                    <span class="material-symbols-outlined">volume_up</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-2">
            <button 
              @click="shareFare"
              class="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <span class="material-symbols-outlined text-lg">{{ shareSupported ? 'share' : 'content_copy' }}</span>
              {{ copied ? 'Copied!' : (shareSupported ? 'Share' : 'Copy') }}
            </button>
            <button 
              @click="emit('close')"
              class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 font-medium dark:text-white transition-colors"
            >
              Done
            </button>
          </div>

          <!-- Report Overcharge -->
          <div class="border-t border-gray-200 dark:border-white/10 pt-5">
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4">
              <h3 class="font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">report</span>
                Charged more than this?
              </h3>
              <p class="text-sm text-red-700 dark:text-red-400 mb-3">
                Help other travelers by reporting overcharging incidents
              </p>
              <NuxtLink 
                to="/scam-alerts?openReport=transport"
                @click="emit('close')"
                class="block text-center bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 font-medium transition-colors"
              >
                Report Transport Scam
              </NuxtLink>
            </div>
          </div>

          <!-- Footer tip -->
          <div class="text-xs text-center text-gray-500 pt-1 flex items-center justify-center gap-1">
            <span class="material-symbols-outlined text-sm">lightbulb</span>
            Take a screenshot before your journey
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  origin: string
  destination: string
  distance: number
  fareRange: { min: number; max: number; currency: string }
  transportType: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const copied = ref(false)
const shareSupported = ref(false)

onMounted(() => {
  shareSupported.value = 'share' in navigator
})

const transportTypeLabel = computed(() => {
  const labels: Record<string, string> = {
    TUK_TUK: 'Tuk-Tuk',
    TAXI: 'Taxi',
    BUS: 'Bus',
    TRAIN: 'Train'
  }
  return labels[props.transportType] || props.transportType
})

// Hardcoded negotiation phrases (can be fetched from API)
const negotiationPhrases = [
  {
    english: "Please use the meter",
    sinhala: "කරුණාකර මීටරය පාවිච්චි කරන්න",
    pronunciation: "Karunakara meetaraya pavichchi karanna"
  },
  {
    english: "That's too expensive",
    sinhala: "ඒක ගොඩක් මිල අධිකයි",
    pronunciation: "Eka godak mila adhikay"
  },
  {
    english: "I know the fair price",
    sinhala: "මම හරි මිල දන්නවා",
    pronunciation: "Mama hari mila dannawa"
  }
]

function speakPhrase(text: string) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'si-LK'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }
}

function copyFare() {
  const text = `Fair fare from ${props.origin} to ${props.destination} (${props.distance}km): ${props.fareRange.currency} ${props.fareRange.min}-${props.fareRange.max}`
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

async function shareFare() {
  const text = `Fair ${transportTypeLabel.value} fare from ${props.origin} to ${props.destination}: ${props.fareRange.currency} ${props.fareRange.min}-${props.fareRange.max} (${props.distance}km)`
  
  if (shareSupported.value) {
    try {
      await navigator.share({
        title: 'Fair Transport Fare - CeylonGuides',
        text
      })
    } catch (err) {
      // User cancelled or error, fallback to copy
      copyFare()
    }
  } else {
    copyFare()
  }
}
</script>
