<template>
  <section id="nomad-hub" class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <div class="flex flex-col gap-6">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-white">Digital Nomad Hub</h2>
        <p class="text-text-muted mt-1">Coworking spaces and remote work infrastructure across Sri Lanka</p>
      </div>
      
      <!-- Region Filter -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="area in uniqueAreas"
          :key="area"
          @click="selectedArea = selectedArea === area ? null : area"
          class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
          :class="selectedArea === area 
            ? 'bg-primary text-white' 
            : 'bg-gray-100 dark:bg-neutral-700 text-text-muted hover:bg-primary/10'"
        >
          {{ area }}
        </button>
      </div>
      
      <!-- Coworking Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="space in filteredSpaces"
          :key="space.id"
          class="bg-white dark:bg-surface-dark p-5 rounded-xl border border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="font-bold text-text-main dark:text-white">{{ space.name }}</h3>
              <p class="text-sm text-text-muted flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                {{ space.city }}{{ space.area ? ` • ${space.area}` : '' }}
              </p>
            </div>
            <span 
              v-if="space.priceApprox"
              class="text-sm font-bold text-green-600 dark:text-green-400"
            >
              ~${{ space.priceApprox }}/mo
            </span>
          </div>
          
          <!-- WiFi Speed -->
          <div v-if="space.wifiSpeed" class="flex items-center gap-2 mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">wifi</span>
            <span class="text-sm font-medium text-blue-700 dark:text-blue-300">{{ space.wifiSpeed }}</span>
          </div>
          
          <!-- Features -->
          <div class="flex flex-wrap gap-1 mb-3">
            <span 
              v-for="(feature, idx) in space.features.slice(0, 4)" 
              :key="idx"
              class="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-neutral-700 text-text-muted rounded-full"
            >
              {{ feature }}
            </span>
          </div>
          
          <!-- Notes -->
          <p v-if="space.notes" class="text-xs text-text-muted italic">
            {{ space.notes }}
          </p>
        </div>
      </div>
      
      <!-- Power Cuts Warning -->
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
        <h3 class="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">bolt</span>
          Power Considerations
        </h3>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <li 
            v-for="(note, idx) in wifiAndNomad.powerCutsNotes" 
            :key="idx"
            class="flex items-start gap-2"
          >
            <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-sm mt-0.5">warning</span>
            <span class="text-sm text-amber-700 dark:text-amber-300">{{ note }}</span>
          </li>
        </ul>
      </div>
      
      <!-- Digital Nomad Visa Info -->
      <div class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6">
        <div class="flex items-start gap-4">
          <div class="size-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-2xl text-indigo-600 dark:text-indigo-400">passport</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <h3 class="font-bold text-lg text-text-main dark:text-white">Digital Nomad Visa</h3>
              <span class="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                Available
              </span>
            </div>
            <p class="text-sm text-text-muted mb-4">
              Valid for {{ wifiAndNomad.digitalNomadVisa.validityYears }} year with possibility of renewal. 
              Cost: ${{ wifiAndNomad.digitalNomadVisa.cost }} 
              {{ wifiAndNomad.digitalNomadVisa.coversFamily ? '(covers spouse and dependents)' : '' }}
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="text-sm font-bold text-text-main dark:text-white mb-2">Requirements:</h4>
                <ul class="space-y-1">
                  <li 
                    v-for="(req, idx) in wifiAndNomad.digitalNomadVisa.requirements" 
                    :key="idx"
                    class="text-xs text-text-muted flex items-start gap-2"
                  >
                    <span class="material-symbols-outlined text-xs text-green-500 mt-0.5">check</span>
                    {{ req }}
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="text-sm font-bold text-text-main dark:text-white mb-2">Key Details:</h4>
                <ul class="space-y-1 text-xs text-text-muted">
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-xs text-primary">payments</span>
                    Min. income: ${{ wifiAndNomad.digitalNomadVisa.minMonthlyIncome.toLocaleString() }}/month
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-xs text-primary">calendar_month</span>
                    Validity: {{ wifiAndNomad.digitalNomadVisa.validityYears }} year (renewable)
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-xs text-primary">family_restroom</span>
                    Family: {{ wifiAndNomad.digitalNomadVisa.coversFamily ? 'Included' : 'Not included' }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { wifiAndNomad } from '~/data/simData'

const selectedArea = ref<string | null>(null)

const uniqueAreas = computed(() => {
  const areas = new Set<string>()
  wifiAndNomad.coworkingSpaces.forEach(s => {
    areas.add(s.city)
    if (s.area) areas.add(s.area)
  })
  return Array.from(areas)
})

const filteredSpaces = computed(() => {
  if (!selectedArea.value) return wifiAndNomad.coworkingSpaces
  return wifiAndNomad.coworkingSpaces.filter(s => 
    s.city === selectedArea.value || s.area === selectedArea.value
  )
})
</script>
