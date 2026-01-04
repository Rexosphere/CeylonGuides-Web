<template>
  <div class="min-h-screen bg-gradient-to-br from-red-600 to-red-800 text-white">
    <!-- Header -->
    <div class="bg-red-900/80 backdrop-blur-sm border-b border-red-700 p-4 sticky top-0 z-50">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center animate-pulse">
            <span class="text-2xl">🚨</span>
          </div>
          <div>
            <h1 class="text-xl font-bold">Safety Mode</h1>
            <p class="text-sm text-red-200">Emergency assistance ready</p>
          </div>
        </div>
        <NuxtLink to="/" class="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
          <span class="material-symbols-outlined text-sm">close</span>
          Exit
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoadingLocation" class="max-w-4xl mx-auto p-6 text-center py-20">
      <div class="animate-pulse">
        <span class="material-symbols-outlined text-6xl mb-4">location_searching</span>
        <p class="text-xl mb-2">Getting your location...</p>
        <p class="text-red-200">This helps us show nearby threats and resources</p>
      </div>
    </div>

    <!-- Error State (but still show content) -->
    <div v-if="error && !briefing" class="max-w-4xl mx-auto p-6">
      <div class="bg-red-900/50 border border-red-700 rounded-xl p-6 text-center mb-6">
        <span class="material-symbols-outlined text-3xl mb-2">location_disabled</span>
        <p class="text-lg mb-4">{{ error }}</p>
        <p class="text-red-200 text-sm mb-4">Using default location (Colombo). Enable location for better results.</p>
        <button 
          @click="getLocation" 
          class="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
        >
          <span class="material-symbols-outlined align-middle mr-1">refresh</span>
          Try Again
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-if="briefing" class="max-w-4xl mx-auto p-6 space-y-6 pb-20">
      
      <!-- Quick Call Buttons - BIGGEST -->
      <section class="bg-red-900/50 backdrop-blur rounded-xl p-6 border border-red-700">
        <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">phone_in_talk</span>
          Emergency Contacts
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- Hardcoded critical numbers -->
          <button
            @click="callNumber('119')"
            class="bg-white text-red-600 p-5 rounded-xl text-left hover:bg-red-50 transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-3xl">local_police</span>
              <div>
                <div class="font-bold text-lg">Police Emergency</div>
                <div class="text-3xl font-mono font-bold">119</div>
              </div>
            </div>
          </button>
          <button
            @click="callNumber('110')"
            class="bg-white text-red-600 p-5 rounded-xl text-left hover:bg-red-50 transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-3xl">emergency</span>
              <div>
                <div class="font-bold text-lg">Ambulance</div>
                <div class="text-3xl font-mono font-bold">110</div>
              </div>
            </div>
          </button>
          <button
            @click="callNumber('011-2421052')"
            class="bg-white/90 text-red-600 p-4 rounded-xl text-left hover:bg-red-50 transition-all hover:scale-[1.02] active:scale-95"
          >
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-2xl">local_hospital</span>
              <div>
                <div class="font-semibold">National Hospital</div>
                <div class="text-xl font-mono">011-2421052</div>
              </div>
            </div>
          </button>
          <button
            @click="callNumber('1912')"
            class="bg-white/90 text-red-600 p-4 rounded-xl text-left hover:bg-red-50 transition-all hover:scale-[1.02] active:scale-95"
          >
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-2xl">support_agent</span>
              <div>
                <div class="font-semibold">Tourist Police</div>
                <div class="text-xl font-mono">1912</div>
              </div>
            </div>
          </button>
        </div>
        
        <!-- Additional contacts from API -->
        <div v-if="briefing.emergency.contacts.length > 0" class="mt-4 pt-4 border-t border-red-700">
          <p class="text-sm text-red-200 mb-3">More contacts:</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              v-for="contact in briefing.emergency.contacts.slice(0, 6)"
              :key="contact.id"
              @click="callNumber(contact.phone_number)"
              class="bg-red-800/50 hover:bg-red-800 p-3 rounded-lg text-left text-sm transition-colors"
            >
              <div class="font-semibold truncate">{{ contact.name }}</div>
              <div class="font-mono text-red-200">{{ contact.phone_number }}</div>
            </button>
          </div>
        </div>
      </section>

      <!-- Emergency Phrases -->
      <section class="bg-red-900/50 backdrop-blur rounded-xl p-6 border border-red-700">
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">translate</span>
          Say This (Emergency Phrases)
        </h2>
        
        <div v-if="briefing.emergency.phrases.length > 0" class="space-y-3">
          <button
            v-for="phrase in briefing.emergency.phrases"
            :key="phrase.english"
            class="w-full bg-red-800/50 hover:bg-red-800 rounded-xl p-4 text-left transition-colors"
            @click="speakPhrase(phrase.sinhala)"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="font-semibold text-red-100">{{ phrase.english }}</div>
                <div class="text-2xl mt-2 font-medium">{{ phrase.sinhala }}</div>
                <div class="text-sm text-red-300 mt-1 italic">{{ phrase.pronunciation }}</div>
              </div>
              <span class="material-symbols-outlined text-red-300 ml-2">volume_up</span>
            </div>
          </button>
        </div>
        
        <!-- Fallback phrases if none from API -->
        <div v-else class="space-y-3">
          <div class="bg-red-800/50 rounded-xl p-4">
            <div class="font-semibold text-red-100">Help!</div>
            <div class="text-2xl mt-2">උදව් කරන්න!</div>
            <div class="text-sm text-red-300 mt-1 italic">Udaw karanna!</div>
          </div>
          <div class="bg-red-800/50 rounded-xl p-4">
            <div class="font-semibold text-red-100">Call the police</div>
            <div class="text-2xl mt-2">පොලීසියට කතා කරන්න</div>
            <div class="text-sm text-red-300 mt-1 italic">Polisiyata katha karanna</div>
          </div>
          <div class="bg-red-800/50 rounded-xl p-4">
            <div class="font-semibold text-red-100">I need a doctor</div>
            <div class="text-2xl mt-2">මට වෛද්‍යවරයෙක් අවශ්‍යයි</div>
            <div class="text-sm text-red-300 mt-1 italic">Mata vaidyavarayek awashyai</div>
          </div>
        </div>
      </section>

      <!-- Nearby Threats -->
      <section 
        v-if="briefing.nearbyThreats && briefing.nearbyThreats.count > 0"
        class="bg-orange-900/80 border-2 border-orange-500 rounded-xl p-6"
      >
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">warning</span>
          {{ briefing.nearbyThreats.count }} Scam Alert(s) Nearby
          <span v-if="briefing.nearbyThreats.highRiskCount" class="ml-auto bg-red-500 px-2 py-1 rounded text-xs">
            {{ briefing.nearbyThreats.highRiskCount }} High Risk
          </span>
        </h2>
        <div class="space-y-3">
          <div
            v-for="scam in briefing.nearbyThreats.scams.slice(0, 5)"
            :key="scam.id"
            class="bg-orange-800/50 rounded-xl p-4"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1">
                <div class="font-semibold">{{ scam.title }}</div>
                <div class="text-sm text-orange-200 mt-1 flex items-center gap-2">
                  <span>{{ scam.category?.replace(/_/g, ' ') }}</span>
                  <span v-if="scam.distance" class="text-orange-300">• {{ scam.distance }} km away</span>
                </div>
              </div>
              <span 
                class="px-3 py-1 rounded-full text-xs font-bold shrink-0"
                :class="{
                  'bg-red-500': scam.severity === 'CRITICAL',
                  'bg-red-400': scam.severity === 'HIGH',
                  'bg-orange-500': scam.severity === 'MEDIUM',
                  'bg-yellow-500 text-yellow-900': scam.severity === 'LOW'
                }"
              >
                {{ scam.severity }}
              </span>
            </div>
          </div>
        </div>
        <NuxtLink 
          to="/scam-alerts" 
          class="block mt-4 text-center bg-orange-700 hover:bg-orange-600 py-3 rounded-xl font-semibold transition-colors"
        >
          View All Scam Alerts →
        </NuxtLink>
      </section>

      <!-- Embassies -->
      <section 
        v-if="briefing.emergency.embassies && briefing.emergency.embassies.length > 0"
        class="bg-blue-900/50 backdrop-blur rounded-xl p-6 border border-blue-700"
      >
        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">account_balance</span>
          Embassies & Consulates
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="embassy in briefing.emergency.embassies.slice(0, 6)"
            :key="embassy.id"
            @click="callNumber(embassy.phone_number)"
            class="bg-blue-800/50 hover:bg-blue-800 p-4 rounded-xl text-left transition-colors"
          >
            <div class="font-semibold">{{ embassy.name }}</div>
            <div class="text-sm text-blue-200 mt-1">{{ embassy.address }}</div>
            <div class="font-mono text-blue-100 mt-2">{{ embassy.phone_number }}</div>
          </button>
        </div>
      </section>

      <!-- Ask AI -->
      <section class="bg-purple-900/50 backdrop-blur rounded-xl p-6 border border-purple-700">
        <h2 class="text-xl font-bold mb-3 flex items-center gap-2">
          <span class="material-symbols-outlined">smart_toy</span>
          Not sure what to do?
        </h2>
        <p class="text-purple-200 mb-4">Our AI assistant can help guide you through any situation.</p>
        <NuxtLink 
          to="/"
          class="block bg-white text-purple-700 py-4 rounded-xl text-center font-bold hover:bg-purple-50 transition-colors"
        >
          <span class="material-symbols-outlined align-middle mr-2">chat</span>
          Ask AI Travel Assistant
        </NuxtLink>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Safety Mode - CeylonGuides',
  meta: [
    { name: 'theme-color', content: '#dc2626' }
  ]
})

interface SafetyBriefing {
  success: boolean
  location: { lat: number; lng: number; radius: number }
  emergency: {
    contacts: Array<{ id: string; name: string; phone_number: string; category: string }>
    phrases: Array<{ english: string; sinhala: string; tamil: string; pronunciation: string }>
    embassies: Array<{ id: string; name: string; address: string; phone_number: string }>
  }
  nearbyThreats: {
    scams: Array<{ id: string; title: string; severity: string; category: string; distance?: number }>
    count: number
    highRiskCount: number
  }
}

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const location = ref<{ lat: number; lng: number } | null>(null)
const isLoadingLocation = ref(true)
const briefing = ref<SafetyBriefing | null>(null)
const error = ref<string | null>(null)

async function getLocation() {
  isLoadingLocation.value = true
  error.value = null
  
  if (!navigator.geolocation) {
    error.value = 'Geolocation not supported by your browser'
    await loadWithDefaultLocation()
    return
  }
  
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      location.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      await loadBriefing()
      isLoadingLocation.value = false
    },
    async () => {
      error.value = 'Location access denied'
      await loadWithDefaultLocation()
    },
    { timeout: 10000 }
  )
}

async function loadWithDefaultLocation() {
  // Default to Colombo
  location.value = { lat: 6.9271, lng: 79.8612 }
  await loadBriefing()
  isLoadingLocation.value = false
}

async function loadBriefing() {
  if (!location.value) return
  
  try {
    briefing.value = await $fetch<SafetyBriefing>(`${apiBase}/api/safety/briefing/nearby`, {
      params: {
        lat: location.value.lat,
        lng: location.value.lng,
        radius: 15
      }
    })
  } catch (err) {
    console.error('Failed to load briefing:', err)
    // Still create a minimal briefing
    briefing.value = {
      success: false,
      location: { ...location.value, radius: 15 },
      emergency: { contacts: [], phrases: [], embassies: [] },
      nearbyThreats: { scams: [], count: 0, highRiskCount: 0 }
    }
  }
}

function callNumber(number: string) {
  window.location.href = `tel:${number.replace(/[^0-9+]/g, '')}`
}

function speakPhrase(text: string) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'si-LK'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }
}

onMounted(() => {
  getLocation()
})
</script>
