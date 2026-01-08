<template>
  <div class="min-h-screen bg-background-light dark:bg-[#1a0f0a]">
    <!-- Hero Section -->
    <SimHero />
    
    <!-- Quick Recommendations Bar (Optional enhancement) -->
    <div class="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-neutral-700 py-3 shadow-sm overflow-x-auto no-scrollbar">
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
        </div>
      </div>
    </div>
    
    <!-- Provider Table -->
    <SimProvidersTable 
      :selected-providers="selectedProviders"
      @select="toggleProvider"
    />
    
    <!-- Essentials -->
    <SimPurchase />
    
    <!-- Plans -->
    <SimPlans 
      :selected-providers="selectedProviders"
      :selected-plans="selectedPlans"
      :saved-plan-ids="Array.from(savedPlanIds)"
      @toggle-plan="togglePlan"
      @toggle-save="toggleSaved"
      @toggle-select="toggleProvider"
      @clear-compare="selectedPlans = []"
    />
    
    <!-- My Trip Kit (Visible if items saved) -->
    <section v-if="savedPlanIds.size > 0" class="py-8 px-4 md:px-10 max-w-7xl mx-auto w-full">
         <SimKit 
            :saved-plan-ids="Array.from(savedPlanIds)" 
            @remove="toggleSaved" 
         />
    </section>

    <!-- Interactive Coverage Map -->
    <SimCoverageMap />
    
    <!-- Digital Nomad Section -->
    <SimNomad />
    
    <!-- Tips & Recommendations -->
    <SimTips />
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
const selectedProviders = ref<string[]>([])
const selectedPlans = ref<string[]>([])
const savedPlanIds = ref<Set<string>>(new Set())

// ...

function toggleProvider(id: string | null) {
  if (!id) return // Null check if strict
  const index = selectedProviders.value.indexOf(id)
  if (index === -1) {
    selectedProviders.value.push(id)
  } else {
    selectedProviders.value.splice(index, 1)
  }
}

// ... reset logic if needed

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
