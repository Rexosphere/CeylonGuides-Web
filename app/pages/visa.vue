<template>
  <div
    class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    <main class="flex h-full grow flex-col">
      <VisaHero :selected-country="visaInfo?.country_name" :is-loading="visaPending" @search="handleVisaSearch" />

      <VisaStats :processing-time="visaInfo?.processing_time" :fee="visaInfo?.fee" :duration="visaInfo?.duration" />

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column (Main Content) -->
        <div class="lg:col-span-8 space-y-10">
          <VisaFreeVisaBanner />

          <VisaExtensionCalculator :nationality="visaInfo?.country_name" />

          <VisaProcess />

          <VisaRegulations :requirements="visaInfo?.requirements" :notes="visaInfo?.notes || undefined" />
        </div>

        <!-- Right Column (Sidebar) -->
        <div class="lg:col-span-4 space-y-8">
          <VisaSidebar :requirements="visaInfo?.requirements" />
        </div>
      </div>

      <VisaExtension />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VisaHero from '~/components/Visa/VisaHero.vue'
import VisaStats from '~/components/Visa/VisaStats.vue'
import VisaFreeVisaBanner from '~/components/Visa/VisaFreeVisaBanner.vue'
import VisaExtensionCalculator from '~/components/Visa/VisaExtensionCalculator.vue'
import VisaProcess from '~/components/Visa/VisaProcess.vue'
import VisaRegulations from '~/components/Visa/VisaRegulations.vue'
import VisaSidebar from '~/components/Visa/VisaSidebar.vue'
import VisaExtension from '~/components/Visa/VisaExtension.vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const selectedCountryQuery = ref('')

const { data: visaResponse, pending: visaPending } = await useFetch<{
  success: boolean
  data: VisaInfo
}>(() => {
  const params = new URLSearchParams()
  if (selectedCountryQuery.value) params.set('country', selectedCountryQuery.value)
  const queryStr = params.toString()
  return `${apiBase}/api/visa${queryStr ? `?${queryStr}` : ''}`
}, { watch: [selectedCountryQuery] })

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
