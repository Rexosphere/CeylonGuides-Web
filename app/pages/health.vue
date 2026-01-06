<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col items-center">
      <HealthHero />
      <HealthQuickNav />
      <HealthVaccinations :vaccines="vaccines" :packing="packing" :loading="healthPending" />
      <HealthInsurance />
      <HealthConcerns :concerns="concerns" />
      <HealthFoodSafety :tips="foodSafety" />
      <HealthMedicalDirectory :hospitals="hospitals" :emergency="emergencyContact" />
    </main>

  </div>
</template>

<script setup lang="ts">
import type { HealthInfo } from '~/types/api'
import { computed } from 'vue'
import HealthHero from '~/components/Health/HealthHero.vue'
import HealthQuickNav from '~/components/Health/HealthQuickNav.vue'
import HealthVaccinations from '~/components/Health/HealthVaccinations.vue'
import HealthInsurance from '~/components/Health/HealthInsurance.vue'
import HealthConcerns from '~/components/Health/HealthConcerns.vue'
import HealthFoodSafety from '~/components/Health/HealthFoodSafety.vue'
import HealthMedicalDirectory from '~/components/Health/HealthMedicalDirectory.vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: healthResponse, pending: healthPending } = await useFetch<{
  success: boolean
  data: HealthInfo[]
}>(`${apiBase}/api/health`)

const healthItems = computed(() => healthResponse.value?.data || [])

const vaccines = computed(() => healthItems.value.filter(item => item.category === 'VACCINATION'))
const packing = computed(() => healthItems.value.filter(item => item.category === 'PACKING'))
const concerns = computed(() => healthItems.value.filter(item => item.category === 'CONCERN'))
const foodSafety = computed(() => healthItems.value.filter(item => item.category === 'FOOD_SAFETY'))

function parseContent(content: string) {
  try {
    return JSON.parse(content)
  } catch {
    return null
  }
}

const hospitals = computed(() => {
  return healthItems.value
    .filter(item => item.category === 'HOSPITAL')
    .map(item => {
      const parsed = parseContent(item.content) || {}
      return {
        name: item.title,
        address: parsed.address || item.content,
        phone: parsed.phone || ''
      }
    })
})

const emergencyContact = computed(() => {
  const item = healthItems.value.find(entry => entry.category === 'EMERGENCY')
  if (!item) return null
  const parsed = parseContent(item.content) || {}
  return {
    name: item.title,
    phone: parsed.phone || '',
    note: parsed.note || ''
  }
})

useHead({
  title: 'Travel Insurance & Health - CeylonGuide',
  meta: [
    { name: 'description', content: 'Your comprehensive guide to health, vaccinations, and insurance for a worry-free journey through Sri Lanka. Stay safe in paradise.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Health page */
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
}
</style>
