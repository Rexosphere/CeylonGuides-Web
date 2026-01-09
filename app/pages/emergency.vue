<template>
  <div :class="{ 'pt-10': isSafetyModeEnabled }">
    <!-- Safety Mode Banner (when enabled) -->
    <div 
      v-if="isSafetyModeEnabled" 
      class="safety-mode-banner"
    >
      <span class="material-symbols-outlined animate-pulse-call">emergency</span>
      <span>Safety Mode Active — Emergency numbers pinned</span>
      <button 
        @click="disableSafetyMode"
        class="ml-4 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs transition-colors"
      >
        Exit
      </button>
    </div>

    <!-- Offline Mode Banner -->
    <div 
      v-if="isOffline" 
      class="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white py-2 px-4 flex items-center justify-center gap-3 shadow-lg"
    >
      <span class="material-symbols-outlined">cloud_off</span>
      <span class="font-medium">Offline Mode Active — All emergency data available</span>
      <button 
        @click="downloadPDF"
        class="ml-4 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
      >
        <span class="material-symbols-outlined text-sm">download</span>
        Download PDF
      </button>
    </div>

    <!-- Hero with Safety Mode Toggle -->
    <EmergencyHero :show-safety-toggle="true" :is-offline="isOffline" @download-pdf="downloadPDF" />
    
    <!-- Full-width content container -->
    <div class="px-4 md:px-8 lg:px-12 py-8" :class="isSafetyModeEnabled ? 'space-y-6' : 'space-y-8'">
      
      <!-- Intent Shortcuts (quick access under stress) -->
      <EmergencyIntentShortcuts 
        v-if="!isSafetyModeEnabled"
        @intent-change="handleIntentChange" 
      />

      <!-- Emergency Numbers (always first in safety mode) -->
      <EmergencyQuickActions 
        :class="{ 'emergency-priority': isSafetyModeEnabled }" 
        :highlighted-intent="selectedIntent"
      />
      
      <!-- Two Column Layout: Embassies + Map | Phrases -->
      <div :class="{ 'non-essential-ui': isSafetyModeEnabled }">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- LEFT COLUMN: Embassies + Map -->
          <div class="space-y-6">
            <EmergencyEmbassies 
              :is-offline="isOffline" 
              :selected-embassy-id="selectedEmbassyId"
              @select-embassy="handleEmbassySelect"
            />
            
            <!-- Map for Embassies -->
            <EmergencyMap 
              :selected-location="selectedMapLocation"
              :is-offline="isOffline"
            />
          </div>
          
          <!-- RIGHT COLUMN: Emergency Phrases -->
          <div>
            <EmergencyPhrases :highlighted-intent="selectedIntent" />
          </div>
          
        </div>
      </div>

    </div>
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
import type { Embassy } from '~/data/emergency'
import type { MapLocation } from '~/components/Emergency/EmergencyMap.vue'

const { isSafetyModeEnabled, disableSafetyMode } = useSafetyMode()
const { isOffline } = useOfflineMode()

const selectedIntent = ref<string | null>(null)
const selectedEmbassy = ref<Embassy | null>(null)

const selectedEmbassyId = computed(() => 
  selectedEmbassy.value ? `${selectedEmbassy.value.country}-${selectedEmbassy.value.city}` : null
)

// Map location from embassy selection
const selectedMapLocation = computed<MapLocation | null>(() => {
  if (selectedEmbassy.value) {
    return {
      name: selectedEmbassy.value.country,
      lat: selectedEmbassy.value.mapCoordinates.lat,
      lng: selectedEmbassy.value.mapCoordinates.lng,
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

function downloadPDF() {
  generateEmergencyPDF()
}

useHead({
  title: 'Emergency Contacts - CeylonGuide',
  meta: [
    { name: 'description', content: 'Stay safe in Sri Lanka. Access immediate help, find consular services, and locate nearby medical facilities instantly.' }
  ]
})

// Define page as always accessible (no auth required)
definePageMeta({
  auth: false,
})
</script>

