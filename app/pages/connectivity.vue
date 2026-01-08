<template>
  <div class="min-h-screen bg-background-light dark:bg-[#1a0f0a] pb-20">
    <!-- Hero Section -->
    <SimHero />

    <!-- Compact Recommendations Bar (Quick Access) -->
    <div class="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-neutral-700 py-3 sticky top-0 z-40 shadow-sm overflow-x-auto no-scrollbar">
      <div class="max-w-7xl mx-auto px-4 md:px-10 flex items-center gap-4 min-w-max">
        <span class="text-xs font-bold text-text-muted uppercase tracking-wider mr-2">Quick Picks:</span>
        
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm">trophy</span>
            <div class="flex flex-col leading-none">
              <span class="text-[10px] text-text-muted uppercase">Best Overall</span>
              <span class="text-xs font-bold text-text-main dark:text-white">Dialog / Mobitel</span>
            </div>
          </div>

          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
            <span class="material-symbols-outlined text-orange-600 dark:text-orange-400 text-sm">savings</span>
            <div class="flex flex-col leading-none">
              <span class="text-[10px] text-text-muted uppercase">Best Budget</span>
              <span class="text-xs font-bold text-text-main dark:text-white">Hutch</span>
            </div>
          </div>

           <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
            <span class="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">forest</span>
            <div class="flex flex-col leading-none">
              <span class="text-[10px] text-text-muted uppercase">Remote/Rural</span>
              <span class="text-xs font-bold text-text-main dark:text-white">Dialog</span>
            </div>
          </div>

          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
            <span class="material-symbols-outlined text-purple-600 dark:text-purple-400 text-sm">speed</span>
            <div class="flex flex-col leading-none">
              <span class="text-[10px] text-text-muted uppercase">Fastest Speed</span>
              <span class="text-xs font-bold text-text-main dark:text-white">Mobitel</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Tabs (Below Recs on Mobile) -->
    <div class="md:hidden bg-background-light dark:bg-[#1a0f0a] border-b border-gray-200 dark:border-neutral-700 sticky top-[57px] z-30">
      <div class="flex">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="mobileTab = tab.id"
          class="flex-1 py-3 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2"
          :class="mobileTab === tab.id ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-text-muted hover:text-text-main'"
        >
          <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
          {{ tab.label }}
          <span v-if="tab.id === 'kit' && savedPlanIds.size > 0" class="bg-green-500 text-white text-[10px] px-1.5 rounded-full">{{ savedPlanIds.size }}</span>
        </button>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="max-w-7xl mx-auto px-4 md:px-10 py-8">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        <!-- Left Column: Content -->
        <div 
          class="md:col-span-7 lg:col-span-8 space-y-8"
          :class="{ 'hidden md:block': mobileTab !== 'plans' }"
        >
             <!-- Provider Table -->
             <SimProvidersTable 
               :selected-provider="selectedProvider"
               @select="selectedProvider = $event"
             />
             
             <!-- Essentials -->
             <SimPurchase />
             
             <!-- Plans -->
             <SimPlans 
               :selected-provider="selectedProvider"
               :selected-plans="selectedPlans"
               :saved-plan-ids="Array.from(savedPlanIds)"
               @toggle-plan="togglePlan"
               @toggle-save="toggleSaved"
               @clear-compare="selectedPlans = []"
             />
             
             <!-- Nomad -->
             <SimNomad />
             
             <!-- Tips -->
             <SimTips />
        </div>

        <!-- Right Column: Tools (Sticky on Desktop) -->
        <div 
          class="md:col-span-5 lg:col-span-4 space-y-6 md:sticky md:top-24"
        >
           <!-- Map Container -->
           <div 
             class="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden h-[600px] md:h-auto md:min-h-[400px]"
             :class="{ 'hidden md:block': mobileTab !== 'map' }"
           >
              <!-- Full height map on mobile tab -->
              <SimCoverageMap class="h-full w-full" />
           </div>

           <!-- Kit Container -->
           <div 
             :class="{ 'hidden md:block': mobileTab !== 'kit' }"
           >
              <SimKit 
                :saved-plan-ids="Array.from(savedPlanIds)" 
                @remove="toggleSaved" 
              />
           </div>
           
           <!-- Desktop Only: Ad or extra info? -->
           <!-- Maybe we keep it clean -->
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// SEO
useSeoMeta({
  title: 'Connectivity Guide - Sri Lanka SIMs & Coverage',
  description: 'Complete guide to tourist SIM cards, eSIMs, and coverage in Sri Lanka. Compare Dialog, Mobitel, Hutch plans.'
})

// State
const selectedProvider = ref<string | null>(null)
const selectedPlans = ref<string[]>([])
const mobileTab = ref<'plans' | 'map' | 'kit'>('plans')

const savedPlanIds = ref<Set<string>>(new Set())

const tabs = [
  { id: 'plans', label: 'Guide & Plans', icon: 'list_alt' },
  { id: 'map', label: 'Coverage Map', icon: 'map' },
  { id: 'kit', label: 'My Trip Kit', icon: 'backpack' }
] as const

onMounted(() => {
  // Load saved plans
  if (import.meta.client) {
    const saved = localStorage.getItem('ceylon_connectivity_kit')
    if (saved) {
      try {
        savedPlanIds.value = new Set(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved plans', e)
      }
    }
  }
})

function toggleSaved(planId: string) {
  if (savedPlanIds.value.has(planId)) {
    savedPlanIds.value.delete(planId)
  } else {
    savedPlanIds.value.add(planId)
  }
  
  // Persist
  if (import.meta.client) {
    localStorage.setItem('ceylon_connectivity_kit', JSON.stringify(Array.from(savedPlanIds.value)))
  }
}

function togglePlan(planId: string) {
  const index = selectedPlans.value.indexOf(planId)
  if (index === -1) {
    if (selectedPlans.value.length < 3) {
      selectedPlans.value.push(planId)
    }
  } else {
    selectedPlans.value.splice(index, 1)
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
