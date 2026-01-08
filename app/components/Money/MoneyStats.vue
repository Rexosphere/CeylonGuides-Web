<template>
  <!-- Live Exchange Rates Section -->
  <section class="py-12 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <h2 class="text-2xl font-bold text-primary dark:text-white">Live Exchange Rates</h2>
        <div class="flex items-center gap-4 text-xs font-medium text-text-muted">
          <span class="flex items-center gap-1"><span class="material-icons text-sm">schedule</span> Last updated 6:49
            AM</span>
          <button class="flex items-center gap-1 hover:text-primary transition-colors"><span
              class="material-icons text-sm">refresh</span> Refresh</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                USD</div>
              <div>
                <h3 class="font-bold text-primary dark:text-white leading-tight">US Dollar</h3>
                <p class="text-xs text-text-muted">United States</p>
              </div>
              <div class="h-6 w-14 bg-gray-200 dark:bg-neutral-700 rounded"></div>
            </div>
            <span
              class="bg-gray-100 dark:bg-gray-700 text-text-muted text-[10px] font-bold px-2 py-1 rounded">0.0%</span>
          </div>
          <p class="text-xs font-bold text-text-muted mb-1 uppercase tracking-wide">Buying Rate</p>
          <div class="flex items-baseline gap-1 mb-2">
            <span class="text-3xl font-bold text-primary dark:text-white">309.87</span>
            <span class="text-sm font-medium text-text-muted">LKR</span>
          </div>
          <p class="text-[10px] text-text-muted">Bank buys: ~Rs306</p>
        </div>
        <div class="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                EUR</div>
              <div>
                <h3 class="font-bold text-primary dark:text-white leading-tight">Euro</h3>
                <p class="text-xs text-text-muted">European Union</p>
              </div>
            </div>
            <span
              class="bg-gray-100 dark:bg-gray-700 text-text-muted text-[10px] font-bold px-2 py-1 rounded">0.0%</span>
          </div>
          <p class="text-xs font-bold text-text-muted mb-1 uppercase tracking-wide">Buying Rate</p>
          <div class="flex items-baseline gap-1 mb-2">
            <span class="text-3xl font-bold text-primary dark:text-white">362.05</span>
            <span class="text-sm font-medium text-text-muted">LKR</span>
          </div>
          <p class="text-[10px] text-text-muted">Bank buys: ~Rs353</p>
        </div>
        <div class="bg-white dark:bg-card-dark p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                GBP</div>
              <div>
                <h3 class="font-bold text-primary dark:text-white leading-tight">British Pound</h3>
                <p class="text-xs text-text-muted">United Kingdom</p>
              </div>
            </div>
            <span
              class="bg-gray-100 dark:bg-gray-700 text-text-muted text-[10px] font-bold px-2 py-1 rounded">0.0%</span>
          </div>
          <p class="text-xs font-bold text-text-muted mb-1 uppercase tracking-wide">Buying Rate</p>
          <div class="flex items-baseline gap-1 mb-2">
            <span class="text-3xl font-bold text-primary dark:text-white">417.49</span>
            <span class="text-sm font-medium text-text-muted">LKR</span>
          </div>
          <p class="text-[10px] text-text-muted">Bank buys: ~Rs408</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Currency Converter Section -->
  <section class="py-12 bg-white dark:bg-card-dark">
    <div class="container mx-auto px-6">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-8">Currency Converter</h2>
      <div
        class="bg-background-light dark:bg-gray-900/50 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col lg:flex-row gap-4 items-center mb-6">
          <div class="w-full relative">
            <label class="block text-xs font-bold text-text-muted uppercase mb-2">From</label>
            <div
              class="bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-xl flex items-center px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-primary">
              <span class="font-bold text-gray-400 mr-2">$</span>
              <input
                class="flex-1 bg-transparent border-none p-0 font-bold text-xl text-primary dark:text-white focus:ring-0"
                type="number" value="100" />
              <div class="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-4 ml-2">
                <span class="fi fi-us"></span>
                <span class="font-bold text-sm">USD</span>
                <span class="material-icons text-gray-400 text-sm">expand_more</span>
              </div>
            </div>
          </div>
          <button
            class="w-10 h-10 rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 flex items-center justify-center text-primary shadow-sm hover:bg-gray-50 mt-6">
            <span class="material-icons">swap_horiz</span>
          </button>
          <div class="w-full relative">
            <label class="block text-xs font-bold text-text-muted uppercase mb-2">To (LKR)</label>
            <div
              class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center px-4 py-3 shadow-inner">
              <span class="font-bold text-gray-400 mr-2">Rs</span>
              <input
                class="flex-1 bg-transparent border-none p-0 font-bold text-xl text-primary dark:text-white focus:ring-0"
                readonly type="text" value="30,987.34" />
              <div class="flex items-center gap-2 border-l border-gray-300 dark:border-gray-600 pl-4 ml-2 opacity-70">
                <span class="fi fi-lk"></span>
                <span class="font-bold text-sm">LKR</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex justify-between items-center text-xs text-text-muted border-t border-gray-200 dark:border-gray-700 pt-4">
          <p class="flex items-center gap-1"><span class="material-icons text-sm">sync</span> 1 USD = <span
              class="font-bold">309.87</span> LKR</p>
          <p class="flex items-center gap-1 text-green-600"><span
              class="material-icons text-sm">check_circle_outline</span> Using live rate from 5m ago</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCurrency } from '~/composables/useCurrency'
import { staticFallbackRates } from '~/data/moneyData'

const { 
  loading, 
  rateStatus, 
  statusLabel, 
  minutesAgo, 
  lastUpdatedFormatted,
  needsRefresh, 
  isOffline, 
  hasError, 
  error,
  rates,
  getRate, 
  getPercentChange, 
  fetchRates 
} = useCurrency()

// Check if we have any rates loaded
const hasRates = computed(() => Object.keys(rates.value).length > 0)

function formatRate(rate: number): string {
  return rate.toFixed(2)
}

function formatChange(change: number): string {
  if (Math.abs(change) < 0.01) return '0.0%'
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}

function getChangeClass(change: number): string {
  if (change > 0.01) {
    return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded text-xs font-bold'
  } else if (change < -0.01) {
    return 'text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-xs font-bold'
  }
  return 'text-text-muted bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-bold'
}

function getCurrencyBgClass(color: string): string {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
  }
  return colorMap[color] || 'bg-gray-100 text-gray-600'
}

const statusIcon = computed(() => {
  if (isOffline.value) return 'cloud_off'
  switch (rateStatus.value) {
    case 'stale': return 'cached'
    case 'estimated': return 'info'
    default: return 'check_circle'
  }
})

const statusBadgeClass = computed(() => {
  if (isOffline.value) {
    return 'text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex items-center'
  }
  switch (rateStatus.value) {
    case 'stale':
      return 'text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex items-center'
    case 'estimated':
      return 'text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 flex items-center'
    default:
      return ''
  }
})

async function handleRefresh() {
  await fetchRates(true)
}

async function handleRetry() {
  await fetchRates(true)
}
</script>
