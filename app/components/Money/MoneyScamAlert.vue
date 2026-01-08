<template>
  <section class="py-8 px-4 md:px-10 max-w-7xl mx-auto w-full mb-12">
    <!-- Consolidated Scam Warnings Section -->
    <div class="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 md:p-8">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4 mb-6">
        <div class="flex items-center gap-4">
          <div class="size-14 rounded-full bg-red-100 dark:bg-red-800/50 text-red-600 dark:text-red-300 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-3xl">gpp_maybe</span>
          </div>
          <div>
            <h3 class="text-xl font-bold text-text-main dark:text-white">Common Tourist Scams</h3>
            <p class="text-text-muted text-sm mt-1">Stay alert to these common tricks targeting visitors</p>
          </div>
        </div>
      </div>
      
      <!-- Scam List -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div 
          v-for="scam in scamCallouts" 
          :key="scam.id"
          class="bg-white/70 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-red-100 dark:border-red-900/30"
        >
          <div class="flex items-start gap-3">
            <div class="size-8 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="material-symbols-outlined text-lg">{{ getScamIcon(scam.id) }}</span>
            </div>
            <div>
              <h4 class="font-bold text-sm text-text-main dark:text-white mb-1">{{ scam.title }}</h4>
              <p class="text-xs text-text-muted line-clamp-2">{{ scam.summary }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Single CTA Button -->
      <div class="flex justify-center">
        <NuxtLink 
          to="/scam-alerts"
          class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-600/20"
        >
          <span class="material-symbols-outlined">shield</span>
          View All Scam Alerts
          <span class="material-symbols-outlined text-lg">arrow_forward</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { scamCallouts } from '~/data/moneyData'

function getScamIcon(scamId: string): string {
  const iconMap: Record<string, string> = {
    'closed-attraction': 'temple_buddhist',
    'tuktuk-overcharge': 'electric_rickshaw',
    'gem-spice-shops': 'diamond',
    'pickpocket-distraction': 'warning'
  }
  return iconMap[scamId] || 'report'
}
</script>
