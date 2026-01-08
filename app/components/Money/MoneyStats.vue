<template>
  <section class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <div class="flex flex-col gap-6">
      <!-- Offline/Error Banner -->
      <div 
        v-if="isOffline || hasError" 
        class="rounded-lg p-4 flex items-center justify-between gap-4"
        :class="isOffline 
          ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800' 
          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'"
      >
        <div class="flex items-center gap-3">
          <span 
            class="material-symbols-outlined text-xl"
            :class="isOffline ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'"
          >
            {{ isOffline ? 'cloud_off' : 'error' }}
          </span>
          <div>
            <p 
              class="font-medium"
              :class="isOffline ? 'text-amber-800 dark:text-amber-200' : 'text-red-800 dark:text-red-200'"
            >
              {{ isOffline ? 'Offline — using cached/estimated rates' : 'Failed to fetch live rates' }}
            </p>
            <p 
              class="text-sm"
              :class="isOffline ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'"
            >
              {{ isOffline 
                ? 'Connect to internet for live exchange rates' 
                : error || 'Check your connection and try again' 
              }}
            </p>
          </div>
        </div>
        <button 
          v-if="!isOffline && hasError"
          @click="handleRetry"
          :disabled="loading"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <span v-if="loading" class="material-symbols-outlined text-lg animate-spin">sync</span>
          <span v-else class="material-symbols-outlined text-lg">refresh</span>
          {{ loading ? 'Retrying...' : 'Retry' }}
        </button>
      </div>
      
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-white">Live Exchange Rates</h2>
        <div class="flex items-center gap-3">
          <!-- Status Badge -->
          <span v-if="statusLabel" :class="statusBadgeClass">
            <span class="material-symbols-outlined text-xs mr-1">{{ statusIcon }}</span>
            {{ statusLabel }}
          </span>
          <!-- Timestamp -->
          <span class="text-sm text-text-muted flex items-center gap-1">
            <span v-if="loading" class="material-symbols-outlined text-sm animate-spin">sync</span>
            <span v-else class="material-symbols-outlined text-sm">schedule</span>
            <span v-if="loading">Updating...</span>
            <span v-else-if="lastUpdatedFormatted">Last updated {{ lastUpdatedFormatted }}</span>
            <span v-else-if="minutesAgo !== null">Updated {{ minutesAgo === 0 ? 'just now' : `${minutesAgo}m ago` }}</span>
            <span v-else>--</span>
          </span>
          <!-- Refresh Button -->
          <button 
            v-if="!loading && !isOffline"
            @click="handleRefresh"
            class="text-sm text-primary hover:text-primary/80 flex items-center gap-1 px-2 py-1 rounded hover:bg-primary/10 transition-colors"
            title="Refresh rates"
          >
            <span class="material-symbols-outlined text-sm">refresh</span>
            Refresh
          </button>
        </div>
      </div>
      
      <!-- Rate Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Loading Skeletons -->
        <template v-if="loading && !hasRates">
          <div 
            v-for="i in 3" 
            :key="i"
            class="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm animate-pulse"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div class="size-10 rounded-full bg-gray-200 dark:bg-neutral-700"></div>
                <div>
                  <div class="h-5 w-24 bg-gray-200 dark:bg-neutral-700 rounded mb-1"></div>
                  <div class="h-3 w-16 bg-gray-200 dark:bg-neutral-700 rounded"></div>
                </div>
              </div>
              <div class="h-6 w-14 bg-gray-200 dark:bg-neutral-700 rounded"></div>
            </div>
            <div class="space-y-2">
              <div class="h-4 w-20 bg-gray-200 dark:bg-neutral-700 rounded"></div>
              <div class="h-10 w-32 bg-gray-200 dark:bg-neutral-700 rounded"></div>
              <div class="h-3 w-28 bg-gray-200 dark:bg-neutral-700 rounded"></div>
            </div>
          </div>
        </template>
        
        <!-- Actual Rate Cards -->
        <template v-else>
          <div 
            v-for="currency in staticFallbackRates" 
            :key="currency.code"
            class="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div 
                  class="size-10 rounded-full flex items-center justify-center font-bold text-sm"
                  :class="getCurrencyBgClass(currency.color)"
                >
                  {{ currency.code }}
                </div>
                <div>
                  <p class="font-bold text-lg text-text-main dark:text-white">{{ currency.name }}</p>
                  <p class="text-xs text-text-muted">{{ currency.country }}</p>
                </div>
              </div>
              <!-- % Change Badge -->
              <span v-if="!loading" :class="getChangeClass(getPercentChange(currency.code))">
                {{ formatChange(getPercentChange(currency.code)) }}
              </span>
              <span v-else class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs animate-pulse w-12 h-5"></span>
            </div>
            <div class="space-y-1">
              <p class="text-text-muted text-sm font-medium">Buying Rate</p>
              <p v-if="loading && !hasRates" class="text-3xl font-bold tracking-tight text-primary animate-pulse">---</p>
              <p v-else class="text-3xl font-bold tracking-tight text-primary">
                {{ formatRate(getRate(currency.code)) }} <span class="text-sm text-text-main dark:text-white font-normal">LKR</span>
              </p>
              <p class="text-xs text-text-muted">
                Bank buys: ~₨{{ currency.bankBuyApprox }}
              </p>
            </div>
          </div>
        </template>
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
