<template>
  <section id="currency-converter" class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-white">Currency Converter</h2>
      </div>
      
      <div class="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
        <div class="flex flex-col lg:flex-row gap-6 items-stretch">
          <!-- From Section -->
          <div class="flex-1 w-full">
            <label class="block text-sm font-medium text-text-muted mb-2">
              {{ direction === 'toLKR' ? 'From' : 'From (LKR)' }}
            </label>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-medium">
                  {{ direction === 'toLKR' ? getCurrencySymbol(selectedCurrency) : '₨' }}
                </span>
                <input
                  v-model="amountInput"
                  type="text"
                  inputmode="decimal"
                  placeholder="0.00"
                  @input="handleAmountInput"
                  class="w-full h-14 pl-10 pr-4 text-xl font-bold rounded-lg border text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  :class="isValidAmount ? 'border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800' : 'border-red-400 bg-red-50 dark:bg-red-900/20'"
                />
              </div>
              <!-- Currency Selector (only show when direction is toLKR) -->
              <select
                v-if="direction === 'toLKR'"
                v-model="selectedCurrency"
                class="h-14 px-3 text-base font-medium rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer min-w-[100px]"
              >
                <option v-for="curr in currencyOptions" :key="curr.code" :value="curr.code">
                  {{ curr.flag }} {{ curr.code }}
                </option>
              </select>
              <div v-else class="h-14 px-4 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-neutral-700 text-text-main dark:text-white font-bold min-w-[80px]">
                🇱🇰 LKR
              </div>
            </div>
            <!-- Validation Error -->
            <p v-if="!isValidAmount && amountInput !== ''" class="text-red-500 text-xs mt-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">error</span>
              Please enter a valid positive amount
            </p>
          </div>

          <!-- Swap Button -->
          <div class="flex items-center justify-center lg:pt-6">
            <button
              @click="toggleDirection"
              class="size-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              :title="direction === 'toLKR' ? 'Switch to: LKR → ' + selectedCurrency : 'Switch to: ' + selectedCurrency + ' → LKR'"
            >
              <span class="material-symbols-outlined text-2xl">swap_horiz</span>
            </button>
          </div>

          <!-- To Section -->
          <div class="flex-1 w-full">
            <label class="block text-sm font-medium text-text-muted mb-2">
              {{ direction === 'toLKR' ? 'To (LKR)' : 'To' }}
            </label>
            <div class="flex gap-2">
              <div class="relative flex-1">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-medium">
                  {{ direction === 'toLKR' ? '₨' : getCurrencySymbol(selectedCurrency) }}
                </span>
                <div class="w-full h-14 pl-10 pr-4 flex items-center text-xl font-bold rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 text-primary">
                  <span v-if="loading" class="animate-pulse text-base">Calculating...</span>
                  <span v-else-if="!isValidAmount || amount <= 0" class="text-text-muted font-normal">--</span>
                  <span v-else>{{ formattedResult }}</span>
                </div>
              </div>
              <!-- Currency display -->
              <select
                v-if="direction === 'fromLKR'"
                v-model="selectedCurrency"
                class="h-14 px-3 text-base font-medium rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer min-w-[100px]"
              >
                <option v-for="curr in currencyOptions" :key="curr.code" :value="curr.code">
                  {{ curr.flag }} {{ curr.code }}
                </option>
              </select>
              <div v-else class="h-14 px-4 flex items-center justify-center rounded-lg bg-primary/10 text-primary font-bold min-w-[80px]">
                🇱🇰 LKR
              </div>
            </div>
          </div>
        </div>

        <!-- Rate Info Footer -->
        <div class="mt-5 pt-4 border-t border-gray-100 dark:border-neutral-700">
          <div class="flex flex-wrap items-center justify-between gap-3 text-sm">
            <!-- Rate Display -->
            <div class="flex items-center gap-2 text-text-muted">
              <span class="material-symbols-outlined text-base text-primary">currency_exchange</span>
              <span class="font-medium">
                1 {{ selectedCurrency }} = <span class="text-text-main dark:text-white font-bold">₨{{ formatNumber(currentRate) }}</span> LKR
              </span>
            </div>
            
            <!-- Rate Source / Timestamp -->
            <div class="flex items-center gap-2">
              <span v-if="rateStatus === 'live'" class="flex items-center gap-1 text-green-600 dark:text-green-400">
                <span class="material-symbols-outlined text-sm">check_circle</span>
                <span class="text-xs">Using live rate{{ minutesAgo !== null ? ` from ${minutesAgo === 0 ? 'just now' : minutesAgo + 'm ago'}` : '' }}</span>
              </span>
              <span v-else-if="rateStatus === 'stale'" class="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span class="text-xs">Using cached rate{{ minutesAgo !== null ? ` from ${minutesAgo}m ago` : '' }}</span>
              </span>
              <span v-else class="flex items-center gap-1 text-gray-500">
                <span class="material-symbols-outlined text-sm">info</span>
                <span class="text-xs">Using estimated rate</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCurrency } from '~/composables/useCurrency'

const { loading, rateStatus, minutesAgo, currencyOptions, convert, getRate } = useCurrency()

const amountInput = ref<string>('100')
const selectedCurrency = ref<string>('USD')
const direction = ref<'toLKR' | 'fromLKR'>('toLKR')

// Parse amount from input string
const amount = computed(() => {
  const parsed = parseFloat(amountInput.value.replace(/,/g, ''))
  return isNaN(parsed) ? 0 : parsed
})

// Validate amount
const isValidAmount = computed(() => {
  if (amountInput.value === '') return true
  const parsed = parseFloat(amountInput.value.replace(/,/g, ''))
  return !isNaN(parsed) && parsed >= 0
})

const currentRate = computed(() => getRate(selectedCurrency.value))

const convertedAmount = computed(() => {
  if (!isValidAmount.value || amount.value <= 0) return 0
  
  if (direction.value === 'toLKR') {
    return convert(amount.value, selectedCurrency.value, 'LKR')
  } else {
    return convert(amount.value, 'LKR', selectedCurrency.value)
  }
})

const formattedResult = computed(() => formatNumber(convertedAmount.value))

// Handle input to allow only valid number characters
function handleAmountInput(event: Event) {
  const input = event.target as HTMLInputElement
  // Allow digits, decimal point, and commas
  let value = input.value.replace(/[^0-9.,]/g, '')
  // Only keep one decimal point
  const parts = value.split('.')
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('')
  }
  amountInput.value = value
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  if (num < 0.01 && num > 0) {
    return num.toFixed(4)
  }
  return num.toFixed(2)
}

function toggleDirection() {
  direction.value = direction.value === 'toLKR' ? 'fromLKR' : 'toLKR'
}

function getCurrencySymbol(code: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    AUD: 'A$',
    INR: '₹',
    JPY: '¥',
    CAD: 'C$',
    SGD: 'S$',
    CHF: 'CHF',
    CNY: '¥'
  }
  return symbols[code] || code
}
</script>
