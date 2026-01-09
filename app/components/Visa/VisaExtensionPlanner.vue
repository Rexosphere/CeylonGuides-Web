<template>
  <div class="bg-white dark:bg-card-dark rounded-xl shadow-lg border border-border-color dark:border-neutral-700 p-6 md:p-8">
    <div class="flex items-center gap-3 mb-6">
      <div class="h-8 w-1 bg-primary rounded-full"></div>
      <div>
        <h2 class="text-2xl font-bold text-text-main dark:text-white">Stay Longer?</h2>
        <p class="text-sm text-text-secondary dark:text-gray-400">Estimate visa extension fees</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <!-- Inputs -->
      <div class="space-y-8">
        <!-- Nationality Display -->
        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider font-bold text-text-muted">My Nationality</label>
          <div class="flex items-center gap-3 bg-background-light dark:bg-white/5 p-3 rounded-lg border border-border-color dark:border-neutral-700">
            <span class="material-symbols-outlined text-primary">public</span>
            <span class="font-bold text-text-main dark:text-white truncate">
              {{ nationality || 'Select nationality above' }}
            </span>
          </div>
        </div>

        <!-- Duration Slider -->
        <div class="space-y-4">
          <div class="flex justify-between items-end">
             <label class="text-xs uppercase tracking-wider font-bold text-text-muted">Total Stay Duration</label>
             <span class="text-2xl font-black text-primary">{{ days }} Days</span>
          </div>
          
          <input 
            type="range" 
            v-model.number="days" 
            min="30" 
            max="270" 
            step="10"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary dark:bg-neutral-700"
          >
          
          <div class="flex justify-between text-xs text-text-secondary font-medium">
            <span>30 Days (ETA)</span>
            <span>270 Days (Max)</span>
          </div>
        </div>
      </div>

      <!-- Results Card -->
      <div class="bg-background-light dark:bg-neutral-800 rounded-xl p-6 border border-border-color dark:border-neutral-700 flex flex-col justify-between">
        <div v-if="days <= 30" class="flex flex-col items-center justify-center h-full text-center py-4">
           <span class="material-symbols-outlined text-4xl text-green-500 mb-2">check_circle</span>
           <h3 class="font-bold text-text-main dark:text-white">Covered by ETA</h3>
           <p class="text-sm text-text-secondary mt-1">Your initial 30-day visa covers this stay. No extension needed.</p>
        </div>

        <div v-else class="space-y-4">
           <div class="flex justify-between items-start">
             <div>
               <h3 class="font-bold text-text-main dark:text-white text-lg">Extension Required</h3>
               <p class="text-sm text-text-secondary">Bracket: {{ extensionInfo.bracket }}</p>
             </div>
             <div class="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold text-lg">
               ${{ extensionInfo.fee }}
             </div>
           </div>

           <div class="space-y-2 pt-4 border-t border-gray-200 dark:border-neutral-700">
             <div class="flex items-center gap-3">
               <span class="material-symbols-outlined text-primary">event</span>
               <div>
                  <p class="text-xs font-bold text-text-muted uppercase">Action</p>
                  <p class="text-sm font-medium text-text-main dark:text-white">Apply before Day 30</p>
               </div>
             </div>
             <div class="flex items-center gap-3">
               <span class="material-symbols-outlined text-primary">attach_money</span>
               <div>
                  <p class="text-xs font-bold text-text-muted uppercase">Est. Fee</p>
                  <p class="text-sm font-medium text-text-main dark:text-white">${{ extensionInfo.fee }} USD</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Penalties Warning -->
    <div class="mt-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg p-4 flex items-start gap-3">
      <span class="material-symbols-outlined text-red-500 mt-0.5">warning</span>
      <div>
        <h4 class="font-bold text-red-700 dark:text-red-400 text-sm">Overstay Penalties</h4>
        <p class="text-xs text-red-600/80 dark:text-red-400/70 mt-1 leading-relaxed">
          Stays exceeding visa validity without extension incur fines:
          <strong class="text-red-700 dark:text-red-300">$250</strong> (7-14 days overdue) or 
          <strong class="text-red-700 dark:text-red-300">$500</strong> (14+ days overdue) plus visa fees.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVisaLogic } from '~/data/visaData'

const props = defineProps<{
  nationality?: string
}>()

const { calculateExtensionFee } = useVisaLogic()
const days = ref(30)

const extensionInfo = computed(() => {
  return calculateExtensionFee(props.nationality || 'General', days.value)
})
</script>
