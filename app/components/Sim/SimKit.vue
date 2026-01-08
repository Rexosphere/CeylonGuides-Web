<template>
  <div class="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm overflow-hidden flex flex-col">
    <div class="p-4 border-b border-gray-100 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-800/50">
      <h3 class="font-bold text-text-main dark:text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-green-600">backpack</span>
        My Trip Kit
        <span v-if="savedPlanIds.length > 0" class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{{ savedPlanIds.length }}</span>
      </h3>
    </div>
    
    <div v-if="savedPlanIds.length === 0" class="p-8 text-center text-text-muted">
      <span class="material-symbols-outlined text-4xl mb-2 opacity-50">shopping_bag</span>
      <p class="text-sm">Your kit is empty.</p>
      <p class="text-xs mt-1">Save plans to compare and print.</p>
    </div>
    
    <div v-else class="flex flex-col">
      <div class="divide-y divide-gray-100 dark:divide-neutral-700 max-h-[300px] overflow-y-auto">
        <div 
          v-for="planId in savedPlanIds" 
          :key="planId"
          class="p-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors relative group"
        >
          <button 
            @click="$emit('remove', planId)" 
            class="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove"
          >
            <span class="material-symbols-outlined text-sm">close</span>
          </button>
          
          <div class="flex items-start gap-3">
            <div 
              class="w-1 rounded-full self-stretch"
              :style="{ backgroundColor: getPlanProvider(planId)?.brandColor || '#ccc' }"
            ></div>
            <div class="flex-grow">
              <div class="font-bold text-sm text-text-main dark:text-white leading-tight mb-0.5">
                {{ getPlanById(planId)?.name }}
              </div>
              <div class="text-xs text-text-muted flex items-center gap-2">
                <span>{{ getPlanProvider(planId)?.name }}</span>
                <span>•</span>
                <span>{{ getPlanById(planId)?.dataGB }}GB</span>
              </div>
              <div class="mt-1 text-sm font-bold text-green-600">
                ${{ getPlanById(planId)?.priceUSD }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Total -->
      <div class="p-4 border-t border-gray-100 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-800/50">
        <div class="flex justify-between items-center mb-3">
          <span class="text-sm font-medium text-text-muted">Total Estimate</span>
          <span class="text-xl font-bold text-green-600">${{ totalCostUSD }}</span>
        </div>
        <button class="w-full py-2 bg-text-main dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span class="material-symbols-outlined text-sm">print</span>
          Print / Save PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getPlanById, getProviderById } from '~/data/simData'

const props = defineProps<{
  savedPlanIds: string[]
}>()

defineEmits<{
  (e: 'remove', planId: string): void
}>()

const totalCostUSD = computed(() => {
  return props.savedPlanIds.reduce((acc, id) => {
    const plan = getPlanById(id)
    return acc + (plan?.priceUSD || 0)
  }, 0).toFixed(2)
})

function getPlanProvider(planId: string) {
  const plan = getPlanById(planId)
  if (!plan) return null
  return getProviderById(plan.providerId)
}
</script>
