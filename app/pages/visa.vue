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
import type { VisaInfo } from '~/types/api'
import { computed, ref } from 'vue'
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

const visaInfo = computed(() => visaResponse.value?.data || null)

function handleVisaSearch(query: string) {
  selectedCountryQuery.value = query.trim()
}

useHead({
  title: 'Visa & Entry Requirements - CeylonGuide',
  meta: [
    { name: 'description', content: 'Comprehensive guide to Sri Lanka Visa & Entry Requirements. ETA process, fees, validity, and document checklists.' }
  ]
})
</script>
