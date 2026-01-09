<template>
  <div class="min-h-screen bg-stone-50 dark:bg-[#121212]">
    <!-- Hero Section -->
    <header class="relative w-full h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img 
          alt="Lighthouse shining a beam of light at dusk symbolizing safety and guidance" 
          class="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNACZRUkSeqw9-j5qpJeD26Qy2F8tYsEbErr_-WoGICHh8l7OQmKFCOZjA2gXhtn9L1QObvzVjzIC6hetZ0-vaSVLKRKOEtl8LBw9PRbVcg2UQZ8WCqwav7zmHaiG-LSxUxc_OZtEe0gUDI7fZuerLt1ciqmkAZ_je-A4-WCWnbARDHo1l1pS0tNWzK2R3AWnNOAxubSF2a6kXNsF2dk6_-LbHNhAWHQPoN7yi_X7ygvh4aZb7UwMZanG_4w71k8LDsUYdFm9AIDY"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-red-950/80 via-red-900/60 to-stone-50 dark:to-[#121212]"></div>
      </div>
      <div class="relative z-10 text-center max-w-3xl px-6">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white mb-4 shadow-lg border-4 border-white/20 animate-pulse">
          <span class="material-symbols-outlined text-3xl">emergency</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-md">Safety Mode</h1>
        <p class="text-lg text-white/90">Emergency assistance ready. You are protected.</p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-32">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Share My Location -->
          <div id="share-location" class="scroll-mt-24">
            <ShareLocation />
          </div>

          <!-- Nearest Hospitals -->
          <div id="nearest-hospitals" class="scroll-mt-24">
            <NearestHospitals 
              :coords="geo.state.value.coords"
              :loading="geo.state.value.status === 'loading'"
              @requestLocation="geo.requestLocation()"
            />
          </div>

          <!-- AI Assistant Card -->
          <div class="bg-teal-700 dark:bg-teal-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,...')]"></div>
            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-white/20 p-2 rounded-lg">
                  <span class="material-symbols-outlined">smart_toy</span>
                </div>
                <h3 class="font-bold text-xl">Not sure what to do?</h3>
              </div>
              <p class="text-teal-100 mb-5 text-sm leading-relaxed">
                Our AI assistant can help guide you through any situation safely with local knowledge.
              </p>
              <NuxtLink 
                to="/"
                class="block w-full text-center bg-white text-teal-700 hover:bg-teal-50 font-bold py-3 rounded-xl shadow-lg transition-all"
              >
                <span class="material-symbols-outlined align-middle mr-2">chat_bubble_outline</span>
                Ask AI Travel Assistant
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Emergency Contacts -->
          <EmergencyContacts />
        </div>
      </div>

      <!-- Emergency Phrases Section -->
      <div class="mt-8">
        <EmergencyPhrases />
      </div>
    </main>

    <!-- Mobile Quick Actions -->
    <SafetyQuickActions />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGeolocation } from '~/composables/useGeolocation'
import ShareLocation from '~/components/Safety/ShareLocation.vue'
import EmergencyContacts from '~/components/Safety/EmergencyContacts.vue'
import EmergencyPhrases from '~/components/Safety/EmergencyPhrases.vue'
import NearestHospitals from '~/components/Safety/NearestHospitals.vue'
import SafetyQuickActions from '~/components/Safety/SafetyQuickActions.vue'

// Meta configuration
useHead({
  title: 'Safety Mode - CeylonGuide',
  meta: [
    { name: 'description', content: 'Emergency assistance and safety information for travelers in Sri Lanka. Emergency contacts, location sharing, and helpful phrases.' },
    { name: 'theme-color', content: '#DC2626' }
  ]
})

// Geolocation
const geo = useGeolocation()

onMounted(() => {
  geo.requestLocation()
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>
