<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <!-- Hero Section -->
    <SafetyHero />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Share My Location -->
          <ShareLocation :coords="geo.state.value.coords" :loading="geo.state.value.status === 'loading'" />

          <!-- Nearest Hospitals -->
          <NearestHospitals :coords="geo.state.value.coords" :loading="geo.state.value.status === 'loading'"
            @requestLocation="geo.requestLocation()" />

          <!-- AI Assistant Card -->
          <SafetyAIAssistant />
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Emergency Contacts -->
          <EmergencyContacts />

          <!-- Emergency Phrases Section -->
          <EmergencyPhrases />
        </div>
      </div>
    </main>

    <!-- Mobile Quick Actions -->
    <SafetyQuickActions />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGeolocation } from '~/composables/useGeolocation'
import SafetyHero from '~/components/Safety/SafetyHero.vue'
import ShareLocation from '~/components/Safety/ShareLocation.vue'
import EmergencyContacts from '~/components/Safety/EmergencyContacts.vue'
import EmergencyPhrases from '~/components/Safety/SafetyEmergencyPhrases.vue'
import NearestHospitals from '~/components/Safety/NearestHospitals.vue'
import SafetyQuickActions from '~/components/Safety/SafetyQuickActions.vue'
import SafetyAIAssistant from '~/components/Safety/SafetyAIAssistant.vue'

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
