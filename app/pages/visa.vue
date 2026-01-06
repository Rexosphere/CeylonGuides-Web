<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col pb-20">
      <VisaHero
        :selected-country="visaInfo?.country_name"
        :is-loading="visaPending"
        @search="handleVisaSearch"
      />
      <VisaStats
        :processing-time="visaInfo?.processing_time"
        :fee="visaInfo?.fee"
        :duration="visaInfo?.duration"
      />
      
      <!-- Layout Grid -->
      <div class="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <!-- Left Column (Main Content) -->
          <div class="lg:col-span-8 flex flex-col gap-12">
            <VisaProcess />
            <VisaRegulations
              :requirements="visaInfo?.requirements"
              :notes="visaInfo?.notes || undefined"
            />
            <VisaExtension />
          </div>
          
          <!-- Right Column (Sidebar) -->
          <div class="lg:col-span-4 h-full">
            <VisaSidebar :requirements="visaInfo?.requirements" />
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import type { VisaInfo } from '~/types/api'
import { computed, ref } from 'vue'
import VisaHero from '~/components/Visa/VisaHero.vue'
import VisaStats from '~/components/Visa/VisaStats.vue'
import VisaProcess from '~/components/Visa/VisaProcess.vue'
import VisaRegulations from '~/components/Visa/VisaRegulations.vue'
import VisaExtension from '~/components/Visa/VisaExtension.vue'
import VisaSidebar from '~/components/Visa/VisaSidebar.vue'

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

<style scoped>
/* Override global theme for Visa page (Orange-Red Theme) */
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
  /* Matching HTML: text-secondary/muted is #896c61 */
}
</style>
