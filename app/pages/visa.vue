<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col pb-20">
      <VisaHero
        :selected-country="selectedNationality"
        @search="handleVisaSearch"
      />
      
      <!-- Anchor for scrolling -->
      <div id="visa-stats">
        <VisaStats
          :processing-time="processingTime"
          :fee="displayFee"
          :duration="displayDuration"
        />
      </div>
      
      <!-- Layout Grid -->
      <div class="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <!-- Left Column (Main Content) -->
          <div class="lg:col-span-8 flex flex-col gap-12">
            
            <!-- Result Banner -->
            <div v-if="visaDetails.category !== 'Standard'" class="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col gap-2">
              <div class="flex items-center gap-2 text-primary font-bold text-lg">
                <span class="material-symbols-outlined">info</span>
                {{ visaDetails.category }} Visa Category apply
              </div>
              <p class="text-text-secondary dark:text-gray-300">
                {{ visaDetails.notes[0] }}
              </p>
            </div>

            <!-- Visa Extension Planner Widget -->
            <VisaExtensionPlanner :nationality="selectedNationality" />
            
            <VisaProcess />
            <VisaRegulations
              :requirements="requirements"
              :notes="null"
            />
            <VisaExtension />
          </div>
          
          <!-- Right Column (Sidebar) -->
          <div class="lg:col-span-4 h-full">
            <VisaSidebar 
              :requirements="requirements" 
              :nationality="selectedNationality"
            />
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VisaHero from '~/components/Visa/VisaHero.vue'
import VisaStats from '~/components/Visa/VisaStats.vue'
import VisaProcess from '~/components/Visa/VisaProcess.vue'
import VisaRegulations from '~/components/Visa/VisaRegulations.vue'
import VisaExtensionPlanner from '~/components/Visa/VisaExtensionPlanner.vue'
import VisaExtension from '~/components/Visa/VisaExtension.vue'
import VisaSidebar from '~/components/Visa/VisaSidebar.vue'
import { useVisaLogic } from '~/data/visaData'

const { getVisaDetails } = useVisaLogic()
const selectedNationality = ref('')

// Compute details based on selection or default to General
const visaDetails = computed(() => {
  return getVisaDetails(selectedNationality.value || 'General')
})

const processingTime = computed(() => 'Usually 24-48 Hours')

const displayFee = computed(() => {
  if (visaDetails.value.category === 'Free' || visaDetails.value.category === 'Reciprocal') {
    return 'Free (Waived)'
  }
  return `$${visaDetails.value.fee.eta} USD (Tourist)`
})

const displayDuration = computed(() => {
  return `${visaDetails.value.duration} Days (Extendable)`
})

function handleVisaSearch(query: string) {
  selectedNationality.value = query
}

const requirements = [
  'Passport valid for at least 6 months from arrival.',
  'Confirmed return or onward ticket.',
  'Proof of sufficient funds for the stay.',
  'Printed copy of ETA approval (recommended).',
  'Yellow Fever Certificate (only if arriving from risk country).'
]

useHead({
  title: 'Visa Assistant 2026 - CeylonGuide',
  meta: [
    { name: 'description', content: 'Check Sri Lanka visa fees, ETA requirements, and entry rules for your nationality. Updated 2026.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Visa page (Orange-Red Theme) */
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
}
</style>
