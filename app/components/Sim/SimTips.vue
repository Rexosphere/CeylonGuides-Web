<template>
  <section class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full mb-12">
    <div class="flex flex-col gap-6">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-white">Tips & Recommendations</h2>
        <p class="text-text-muted mt-1">Expert advice for staying connected in Sri Lanka</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recommendation Cards -->
        <div
          v-for="(rec, key) in recommendations"
          :key="key"
          class="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden"
        >
          <div 
            class="px-5 py-3 font-bold text-white"
            :class="getRecBg(key)"
          >
            {{ rec.title }}
          </div>
          <div class="p-5">
            <p class="text-sm text-text-muted mb-4">{{ rec.description }}</p>
            
            <!-- Suggested Plans -->
            <div v-if="rec.suggestedPlans" class="mb-4">
              <p class="text-xs font-bold text-text-main dark:text-white mb-2">Suggested Plans:</p>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="planId in rec.suggestedPlans" 
                  :key="planId"
                  class="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                >
                  {{ getPlanById(planId)?.name }}
                </span>
              </div>
            </div>
            
            <!-- Recommended Areas (for nomads) -->
            <div v-if="(rec as any).recommendedAreas" class="mb-4">
              <p class="text-xs font-bold text-text-main dark:text-white mb-2">Best Areas:</p>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="area in (rec as any).recommendedAreas" 
                  :key="area"
                  class="text-xs px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded"
                >
                  📍 {{ area }}
                </span>
              </div>
            </div>
            
            <!-- Providers -->
            <div class="flex gap-2">
              <span 
                v-for="providerId in rec.providers" 
                :key="providerId"
                class="text-xs px-2 py-1 rounded flex items-center gap-1 border"
                :style="{ borderColor: getProviderById(providerId)?.brandColor, color: getProviderById(providerId)?.brandColor }"
              >
                {{ getProviderById(providerId)?.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Best Practices -->
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 class="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined">tips_and_updates</span>
          Best Practices
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div 
            v-for="(tip, idx) in wifiAndNomad.bestPractices" 
            :key="idx"
            class="flex items-start gap-2"
          >
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm mt-0.5">lightbulb</span>
            <span class="text-sm text-blue-700 dark:text-blue-300">{{ tip }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { recommendations, wifiAndNomad, getProviderById, getPlanById } from '~/data/simData'

function getRecBg(key: string): string {
  switch (key) {
    case 'tourist': return 'bg-green-600'
    case 'nomad': return 'bg-blue-600'
    case 'budget': return 'bg-orange-500'
    case 'shortTrip': return 'bg-purple-600'
    default: return 'bg-gray-600'
  }
}
</script>
