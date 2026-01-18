<template>
  <div>
    <!-- Hero Section -->
    <EmergencyHero :show-safety-toggle="isSafetyModeEnabled" :is-offline="isOffline" @toggle-safety="toggleSafetyMode"
      @download-pdf="downloadPDF" />

    <!-- Intent Shortcuts -->
    <div class="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
      <EmergencyIntentShortcuts @intent-change="handleIntentChange" />
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-6 py-12">
      <!-- Emergency Quick Actions -->
      <EmergencyQuickActions :highlighted-intent="selectedIntent" @show-hospitals="showHospitals" />

      <!-- Two Column Layout: Embassies + Map | Phrases -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left Column: Embassies + Map -->
        <section>
          <EmergencyEmbassies :is-offline="isOffline" :selected-embassy-id="selectedEmbassyId"
            @select-embassy="handleEmbassySelect" />

          <!-- Map -->
          <div class="mt-6">
            <EmergencyMap :selected-location="selectedMapLocation" :is-offline="isOffline" />
          </div>
        </section>

        <!-- Right Column: Emergency Phrases -->
        <section>
          <EmergencyPhrases :highlighted-intent="selectedIntent" />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import EmergencyHero from '~/components/Emergency/EmergencyHero.vue'
import EmergencyQuickActions from '~/components/Emergency/EmergencyQuickActions.vue'
import EmergencyEmbassies from '~/components/Emergency/EmergencyEmbassies.vue'
import EmergencyPhrases from '~/components/Emergency/EmergencyPhrases.vue'
import EmergencyMap from '~/components/Emergency/EmergencyMap.vue'
import EmergencyIntentShortcuts from '~/components/Emergency/EmergencyIntentShortcuts.vue'
import { generateEmergencyPDF } from '~/utils/generateEmergencyPDF'

interface MapLocation {
  name: string
  lat?: number
  lng?: number
  type?: string
}

interface Embassy {
  id: string
  country: string
  city: string
  type: string
  flagUrl: string
  phone?: string
  lat?: number
  lng?: number
}

const { isSafetyModeEnabled, disableSafetyMode } = useSafetyMode()
const { isOffline } = useOfflineMode()

const selectedIntent = ref<string | null>(null)
const selectedEmbassy = ref<Embassy | null>(null)

const selectedEmbassyId = computed(() =>
  selectedEmbassy.value ? `${selectedEmbassy.value.id}` : null
)

// Map location from embassy selection
const selectedMapLocation = computed<MapLocation | null>(() => {
  if (selectedEmbassy.value) {
    return {
      name: selectedEmbassy.value.country,
      lat: selectedEmbassy.value.lat,
      lng: selectedEmbassy.value.lng,
      type: 'embassy'
    }
  }
  return null
})

function handleIntentChange(intent: string | null) {
  selectedIntent.value = intent
}

function handleEmbassySelect(embassy: Embassy) {
  selectedEmbassy.value = embassy
}

function toggleSafetyMode() {
  if (isSafetyModeEnabled.value) {
    disableSafetyMode()
  } else {
    // Enable safety mode logic
    isSafetyModeEnabled.value = true
  }
}

function showHospitals() {
  // Navigate to hospitals or show hospital modal
  console.log('Show hospitals')
}

function downloadPDF() {
  generateEmergencyPDF()
}

useHead({
  title: 'Emergency Contacts - CeylonWiki',
  meta: [
    { name: 'description', content: 'Stay safe in Sri Lanka. Access immediate help, find consular services, and locate nearby medical facilities instantly.' }
  ]
})

// Define page as always accessible (no auth required)
definePageMeta({
  auth: false,
})
</script>
