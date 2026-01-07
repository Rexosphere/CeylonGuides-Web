<template>
  <div>
    <!-- Hero Section -->
    <header class="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          alt="Lighthouse shining a beam of light at dusk symbolizing safety and guidance" 
          class="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNACZRUkSeqw9-j5qpJeD26Qy2F8tYsEbErr_-WoGICHh8l7OQmKFCOZjA2gXhtn9L1QObvzVjzIC6hetZ0-vaSVLKRKOEtl8LBw9PRbVcg2UQZ8WCqwav7zmHaiG-LSxUxc_OZtEe0gUDI7fZuerLt1ciqmkAZ_je-A4-WCWnbARDHo1l1pS0tNWzK2R3AWnNOAxubSF2a6kXNsF2dk6_-LbHNhAWHQPoN7yi_X7ygvh4aZb7UwMZanG_4w71k8LDsUYdFm9AIDY"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-teal-950/70 via-teal-900/50 to-background-light dark:to-background-dark"></div>
      </div>
      <div class="relative z-10 text-center max-w-3xl px-6 mt-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/90 text-white mb-6 animate-pulse-slow shadow-lg border-4 border-white/20">
          <span class="material-icons text-3xl">local_police</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-md">Safety Mode</h1>
        <p class="text-xl text-white/90 font-light tracking-wide">Emergency assistance ready. You are protected.</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-4 md:px-8 -mt-20 relative z-10 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: Share Location & AI Assistant -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Share My Location Card -->
          <div class="bg-gradient-to-br from-[#2b6cb0] to-[#2c5282] dark:from-[#1e3a8a] dark:to-[#172554] rounded-2xl p-8 text-white shadow-soft relative overflow-hidden">
            <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div class="flex items-start space-x-4 mb-6">
              <div class="bg-white/20 p-3 rounded-full backdrop-blur-sm flex-shrink-0">
                <span class="material-icons text-2xl">my_location</span>
              </div>
              <div>
                <h2 class="text-2xl font-display font-bold">Share My Location</h2>
                <p class="text-blue-100 text-sm mt-1">Send your coordinates to someone you trust instantly.</p>
              </div>
            </div>
            <div class="flex items-center space-x-3 mb-8 bg-black/20 p-3 rounded-lg border border-white/10">
              <span v-if="!userLocation" class="material-icons animate-spin-slow text-blue-200">refresh</span>
              <span v-if="!userLocation" class="text-sm font-mono tracking-wide">Getting your location...</span>
              <span v-else class="text-sm font-mono tracking-wide">📍 {{ userLocation.lat.toFixed(5) }}, {{ userLocation.lng.toFixed(5) }}</span>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <button 
                @click="shareViaWhatsApp"
                :disabled="!userLocation"
                class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl backdrop-blur-sm group disabled:opacity-50"
              >
                <img 
                  alt="WhatsApp" 
                  class="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3sJ3qnij7URcy2lVuTolNQsfPYvZT1DkZz-r1ZPpVg06Okys8c5sxt0vqDxDWK94RLvj8VVqREWbtSwd8daMNd7u8ndLHxG_hMfd3J7jXrIGL5jV62uFx5zHa2esXFXoJoSR9TNeFwXv9gLkieTPPaGHaCZwhKz-VFTQ8SsjP5SjtssXb2zENixAL2VD7n8vBxETBKXDbVAa1oYrCBpRG23PIU0SMW41qH67RhVXdh0KtLFESK4FtQUVHwdiXpNPMjw1sH6QAUks"
                />
                <span class="text-xs font-semibold">WhatsApp</span>
              </button>
              <button 
                @click="shareViaSMS"
                :disabled="!userLocation"
                class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl backdrop-blur-sm group disabled:opacity-50"
              >
                <span class="material-icons text-3xl mb-1 text-blue-200 group-hover:scale-110 transition-transform">sms</span>
                <span class="text-xs font-semibold">SMS</span>
              </button>
              <button 
                @click="copyLocationToClipboard"
                :disabled="!userLocation"
                class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-xl backdrop-blur-sm group disabled:opacity-50"
              >
                <span class="material-icons text-3xl mb-1 text-blue-200 group-hover:scale-110 transition-transform">content_copy</span>
                <span class="text-xs font-semibold">Copy</span>
              </button>
            </div>
          </div>

          <!-- AI Assistant Card -->
          <div class="bg-secondary dark:bg-[#153e4d] rounded-2xl p-8 text-white shadow-soft relative overflow-hidden group">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div class="relative z-10">
              <div class="flex items-center space-x-3 mb-4">
                <div class="bg-white/20 p-2 rounded-lg">
                  <span class="material-icons">smart_toy</span>
                </div>
                <h3 class="font-display font-bold text-xl">Not sure what to do?</h3>
              </div>
              <p class="text-cyan-100 mb-6 text-sm leading-relaxed">Our AI assistant can help guide you through any situation safely with local knowledge.</p>
              <button 
                @click="openAIChat"
                class="w-full bg-white text-secondary hover:bg-cyan-50 font-bold py-4 rounded-xl flex items-center justify-center shadow-lg transition-all transform group-hover:translate-y-[-2px]"
              >
                <span class="material-icons mr-2">chat_bubble_outline</span>
                Ask AI Travel Assistant
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Emergency Contacts -->
        <div class="lg:col-span-7">
          <div class="bg-card-light dark:bg-card-dark rounded-2xl shadow-soft p-6 md:p-8 border border-gray-100 dark:border-gray-700 h-full">
            <div class="flex items-center space-x-3 mb-8">
              <span class="material-icons text-secondary dark:text-gray-300 text-3xl">contact_phone</span>
              <h2 class="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Emergency Contacts</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Police Emergency -->
              <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow border border-transparent hover:border-red-200 dark:hover:border-red-900 flex flex-col justify-between">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <p class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Police Emergency</p>
                    <p class="text-4xl font-display font-bold text-gray-900 dark:text-white">119</p>
                  </div>
                  <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                    <span class="material-icons">local_police</span>
                  </div>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">National police emergency hotline for immediate assistance.</p>
                  <a class="block w-full text-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white font-bold py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" href="tel:119">Call Now</a>
                </div>
              </div>

              <!-- Ambulance / Fire -->
              <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow border border-transparent hover:border-red-200 dark:hover:border-red-900 flex flex-col justify-between">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <p class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Ambulance / Fire</p>
                    <p class="text-4xl font-display font-bold text-gray-900 dark:text-white">110</p>
                  </div>
                  <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                    <span class="material-icons">medical_services</span>
                  </div>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Immediate ambulance and fire services dispatch.</p>
                  <a class="block w-full text-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white font-bold py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" href="tel:110">Call Now</a>
                </div>
              </div>

              <!-- Tourist Police -->
              <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow border border-transparent hover:border-orange-200 dark:hover:border-orange-900 flex flex-col justify-between">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <p class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Tourist Police</p>
                    <p class="text-4xl font-display font-bold text-gray-900 dark:text-white">1912</p>
                  </div>
                  <div class="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <span class="material-icons">support_agent</span>
                  </div>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Dedicated English-speaking tourist assistance division.</p>
                  <a class="block w-full text-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white font-bold py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors" href="tel:1912">Call Now</a>
                </div>
              </div>

              <!-- National Hospital -->
              <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow border border-transparent hover:border-teal-200 dark:hover:border-teal-900 flex flex-col justify-between">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <p class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">National Hospital</p>
                    <p class="text-2xl font-display font-bold text-gray-900 dark:text-white break-all">011-2421052</p>
                  </div>
                  <div class="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <span class="material-icons">local_hospital</span>
                  </div>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Accident & emergency service center in Colombo.</p>
                  <a class="block w-full text-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white font-bold py-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors" href="tel:0112421052">Call Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Emergency Phrases Section -->
      <div class="mt-8 bg-sand/30 dark:bg-gray-800/50 rounded-2xl p-8 border border-sand dark:border-gray-700">
        <div class="flex items-center space-x-3 mb-6">
          <span class="material-icons text-secondary dark:text-gray-300 text-2xl">translate</span>
          <h2 class="text-2xl font-display font-bold text-gray-900 dark:text-white">Say This (Emergency Phrases)</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border-l-4 border-primary">
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">English</p>
            <p class="font-bold text-lg text-gray-900 dark:text-white">I need help.</p>
            <div class="my-2 border-t border-gray-100 dark:border-gray-600"></div>
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">Sinhala</p>
            <p class="font-display text-lg text-secondary dark:text-cyan-100">Mata udaw ona.</p>
          </div>
          <div class="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border-l-4 border-primary">
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">English</p>
            <p class="font-bold text-lg text-gray-900 dark:text-white">Call the police.</p>
            <div class="my-2 border-t border-gray-100 dark:border-gray-600"></div>
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">Sinhala</p>
            <p class="font-display text-lg text-secondary dark:text-cyan-100">Police-iyata katha karanna.</p>
          </div>
          <div class="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border-l-4 border-primary">
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">English</p>
            <p class="font-bold text-lg text-gray-900 dark:text-white">Where is the hospital?</p>
            <div class="my-2 border-t border-gray-100 dark:border-gray-600"></div>
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase">Sinhala</p>
            <p class="font-display text-lg text-secondary dark:text-cyan-100">Rohala koheda?</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Meta configuration
useHead({
  title: 'Safety Mode - CeylonGuide',
  meta: [
    { name: 'description', content: 'Emergency assistance and safety information for travelers in Sri Lanka' },
    { name: 'theme-color', content: '#E2583E' }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&family=Material+Icons&display=swap'
    }
  ]
})

// State for user location
const userLocation = ref<{ lat: number; lng: number } | null>(null)

// Get user location on mount
onMounted(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      },
      (error) => {
        console.warn('Location access denied:', error)
      },
      { timeout: 10000 }
    )
  }
})

// Share location via WhatsApp
function shareViaWhatsApp() {
  if (!userLocation.value) return
  const text = encodeURIComponent(
    `🚨 EMERGENCY: I need help!\n\n📍 My Location:\nhttps://www.google.com/maps?q=${userLocation.value.lat},${userLocation.value.lng}\n\nCoordinates: ${userLocation.value.lat.toFixed(5)}, ${userLocation.value.lng.toFixed(5)}\n\nSent via CeylonGuides Safety Mode`
  )
  window.open(`https://wa.me/?text=${text}`, '_blank')
}

// Share location via SMS
function shareViaSMS() {
  if (!userLocation.value) return
  const text = encodeURIComponent(
    `EMERGENCY: I need help! My location: https://www.google.com/maps?q=${userLocation.value.lat},${userLocation.value.lng}`
  )
  window.location.href = `sms:?body=${text}`
}

// Copy location to clipboard
function copyLocationToClipboard() {
  if (!userLocation.value) return
  const text = `I'm at: https://www.google.com/maps?q=${userLocation.value.lat},${userLocation.value.lng}\nCoordinates: ${userLocation.value.lat.toFixed(5)}, ${userLocation.value.lng.toFixed(5)}`
  navigator.clipboard.writeText(text)
  alert('📋 Location copied! Paste in any app to share.')
}

// Open AI chat
function openAIChat() {
  const router = useRouter()
  router.push('/')
}
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin 2s linear infinite;
}

.bg-sand\/30 {
  background-color: rgb(230 220 202 / 0.3);
}

.border-sand {
  border-color: #E6DCCA;
}
</style>
