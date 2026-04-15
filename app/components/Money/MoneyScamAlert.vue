<template>
  <section class="py-16 bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/20">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-start gap-4 mb-10">
        <div
          class="w-12 h-12 rounded-full bg-white text-accent-danger shadow-sm flex items-center justify-center shrink-0">
          <span class="material-icons">gpp_bad</span>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-primary dark:text-white">Common Tourist Scams</h2>
          <p class="text-text-muted dark:text-gray-400">Stay alert to these common tricks targeting visitors</p>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-6 mb-10">
        <div
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 flex gap-4">
          <div class="w-10 h-10 rounded-full bg-red-50 text-accent-danger flex items-center justify-center shrink-0">
            <span class="material-icons text-xl">local_taxi</span>
          </div>
          <div>
            <h3 class="font-bold text-primary dark:text-white text-sm mb-1">Tuk-tuk Driver Tricks</h3>
            <p class="text-xs text-text-muted leading-relaxed">Drivers may refuse to use meters or quote inflated fares.
              Someone may lure you claiming a "festival" while a driver without a meter appears demanding high fees.</p>
          </div>
        </div>
        <div
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 flex gap-4">
          <div class="w-10 h-10 rounded-full bg-red-50 text-accent-danger flex items-center justify-center shrink-0">
            <span class="material-icons text-xl">attractions</span>
          </div>
          <div>
            <h3 class="font-bold text-primary dark:text-white text-sm mb-1">Closed Attraction Scam</h3>
            <p class="text-xs text-text-muted leading-relaxed">A driver or "guide" claims a temple or museum is closed,
              then offers an alternate tour to gem shops or restaurants where they earn commissions.</p>
          </div>
        </div>
        <div
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 flex gap-4">
          <div class="w-10 h-10 rounded-full bg-red-50 text-accent-danger flex items-center justify-center shrink-0">
            <span class="material-icons text-xl">diamond</span>
          </div>
          <div>
            <h3 class="font-bold text-primary dark:text-white text-sm mb-1">Gem & Spice Shop Scams</h3>
            <p class="text-xs text-text-muted leading-relaxed">Tuk-tuk drivers detour to spice gardens or gem shops for
              commission. You may be pressured to buy overpriced or fake goods.</p>
          </div>
        </div>
        <div
          class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 flex gap-4">
          <div class="w-10 h-10 rounded-full bg-red-50 text-accent-danger flex items-center justify-center shrink-0">
            <span class="material-icons text-xl">report_problem</span>
          </div>
          <div>
            <h3 class="font-bold text-primary dark:text-white text-sm mb-1">Pickpocket Distractions</h3>
            <p class="text-xs text-text-muted leading-relaxed">The "bird-poop" scam: someone smears a fake stain on you,
              then a helper cleans it while stealing valuables. Keep belongings secure in crowds.</p>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          class="bg-accent-danger hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2">
          <span class="material-icons text-sm">security</span> View All Scam Alerts
        </button>
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
