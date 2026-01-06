<template>
  <section class="w-full max-w-[1000px] px-6 py-16 md:py-24 scroll-mt-24" id="vaccinations">
    <div class="flex flex-wrap md:flex-nowrap justify-between items-end gap-4 mb-10">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
          <span class="material-symbols-outlined text-lg">medical_services</span>
          <span>Before You Go</span>
        </div>
        <h2 class="text-[#181311] dark:text-white text-3xl md:text-4xl font-bold leading-tight">Vaccinations & Meds</h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg max-w-xl">Ensure you are up to date with routine vaccinations. While Sri Lanka is malaria-free, other precautions are advised.</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Checklist Card -->
      <div class="bg-white dark:bg-[#2a1d18] rounded-2xl p-8 shadow-sm border border-[#f0ebe9] dark:border-gray-800">
        <h3 class="text-xl font-bold mb-6 flex items-center gap-3 dark:text-gray-100">
          <span class="material-symbols-outlined text-green-500">check_circle</span>
          Recommended Vaccines
        </h3>
        <div class="space-y-4">
          <div v-if="loading" class="text-sm text-gray-500 dark:text-gray-400">Loading recommendations...</div>
          <template v-else>
            <div v-for="(vaccine, index) in vaccinesList" :key="vaccine.title">
              <label class="flex gap-x-4 items-start cursor-pointer group">
                <input
                  checked
                  class="mt-1 h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-offset-0"
                  disabled
                  type="checkbox"
                />
                <div>
                  <p class="text-base font-semibold text-gray-900 dark:text-gray-200">{{ vaccine.title }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ vaccine.content }}</p>
                </div>
              </label>
              <div v-if="index < vaccinesList.length - 1" class="h-px bg-gray-100 dark:bg-gray-800 w-full"></div>
            </div>
          </template>
        </div>
      </div>
      
      <!-- Meds Card -->
      <div class="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/10">
        <h3 class="text-xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-gray-100">
          <span class="material-symbols-outlined text-primary">medication</span>
          Packing Essentials
        </h3>
        <ul class="space-y-4">
          <li v-if="loading" class="text-sm text-gray-500 dark:text-gray-400">Loading essentials...</li>
          <li v-else v-for="item in packingList" :key="item.title" class="flex items-start gap-3">
            <span class="material-symbols-outlined text-primary text-sm mt-1">circle</span>
            <span class="text-gray-700 dark:text-gray-300"><strong>{{ item.title }}:</strong> {{ item.content }}</span>
          </li>
        </ul>
        <div class="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg flex gap-3 items-start shadow-sm">
          <span class="material-symbols-outlined text-orange-400">warning</span>
          <p class="text-sm text-gray-600 dark:text-gray-300 italic">Always consult your doctor or a travel medicine clinic at least 4-6 weeks before departure.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HealthInfo } from '~/types/api'

const props = defineProps<{
  vaccines?: HealthInfo[]
  packing?: HealthInfo[]
  loading?: boolean
}>()

const defaultVaccines: HealthInfo[] = [
  { id: 'v1', title: 'Hepatitis A & B', content: 'Recommended for most travelers due to potential food and water contamination.', category: 'VACCINATION' },
  { id: 'v2', title: 'Typhoid', content: 'Especially if you are visiting smaller cities or rural areas.', category: 'VACCINATION' },
  { id: 'v3', title: 'Routine Vaccines', content: 'MMR, Diphtheria-Tetanus-Pertussis, Chickenpox, Polio.', category: 'VACCINATION' },
]

const defaultPacking: HealthInfo[] = [
  { id: 'p1', title: 'Prescription Meds', content: 'Bring enough for your entire trip in original bottles.', category: 'PACKING' },
  { id: 'p2', title: 'Insect Repellent', content: 'DEET or Picaridin based spray is crucial for dengue prevention.', category: 'PACKING' },
  { id: 'p3', title: 'Antihistamines', content: 'For mild allergic reactions to insect bites or food.', category: 'PACKING' },
  { id: 'p4', title: 'ORS Packets', content: 'Oral Rehydration Salts help recover from dehydration.', category: 'PACKING' },
]

const vaccinesList = computed(() => props.vaccines && props.vaccines.length ? props.vaccines : defaultVaccines)
const packingList = computed(() => props.packing && props.packing.length ? props.packing : defaultPacking)
</script>
