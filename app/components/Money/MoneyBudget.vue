<template>
  <section class="py-16 bg-white dark:bg-card-dark">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 class="text-2xl font-bold text-primary dark:text-white mb-2">Daily Budget Estimator</h2>
          <p class="text-sm text-text-muted mb-8">Calculate your trip budget based on travel style.</p>
          <label class="block text-xs font-bold text-text-muted uppercase mb-3">Travel Style</label>
          <div class="grid grid-cols-3 gap-3 mb-6">
            <button
              class="border border-gray-200 rounded-xl p-3 text-center hover:border-primary transition-colors bg-white">
              <span class="material-icons text-green-500 mb-1">backpack</span>
              <div class="text-sm font-bold text-primary">Backpacker</div>
              <div class="text-[10px] text-gray-400">$20 - $30/day</div>
            </button>
            <button class="border-2 border-primary bg-primary/5 rounded-xl p-3 text-center relative">
              <span class="material-icons text-orange-400 mb-1">hiking</span>
              <div class="text-sm font-bold text-primary">Comfort Traveler</div>
              <div class="text-[10px] text-gray-500">$50 - $80/day</div>
              <span class="absolute top-2 right-2 material-icons text-primary text-sm">check_circle</span>
            </button>
            <button
              class="border border-gray-200 rounded-xl p-3 text-center hover:border-primary transition-colors bg-white">
              <span class="material-icons text-purple-500 mb-1">diamond</span>
              <div class="text-sm font-bold text-primary">Luxury</div>
              <div class="text-[10px] text-gray-400">$180+/day</div>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-xs font-bold text-text-muted uppercase mb-2">Travelers</label>
              <div class="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2">
                <button class="text-gray-400 hover:text-primary"><span
                    class="material-icons text-sm">remove</span></button>
                <span class="font-bold text-primary">2</span>
                <button class="text-gray-400 hover:text-primary"><span
                    class="material-icons text-sm">add</span></button>
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-text-muted uppercase mb-2">Days</label>
              <div class="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2">
                <button class="text-gray-400 hover:text-primary"><span
                    class="material-icons text-sm">remove</span></button>
                <span class="font-bold text-primary">7</span>
                <button class="text-gray-400 hover:text-primary"><span
                    class="material-icons text-sm">add</span></button>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
            <div class="flex justify-between items-start mb-4">
              <span class="text-xs font-bold text-text-muted uppercase">Estimated Total</span>
              <span class="text-[10px] text-green-600 flex items-center gap-1"><span
                  class="material-icons text-[10px]">check_circle</span> Live rate</span>
            </div>
            <div class="flex justify-between items-end mb-6">
              <div>
                <span class="text-4xl font-bold text-primary dark:text-white block">$910</span>
                <span class="text-sm text-text-muted">Rs 281,985</span>
              </div>
              <div class="text-right text-xs text-text-muted">
                <div>2 people x 7 days</div>
                <div>$65/person/day</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white dark:bg-card-dark p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="text-[10px] text-text-muted mb-1">Per Person</div>
                <div class="font-bold text-primary">$455</div>
                <div class="text-[10px] text-gray-400">Rs 140,992</div>
              </div>
              <div class="bg-white dark:bg-card-dark p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="text-[10px] text-text-muted mb-1">Per Day (all)</div>
                <div class="font-bold text-primary">$130</div>
                <div class="text-[10px] text-gray-400">Rs 40,284</div>
              </div>
            </div>
            <div class="mt-4 flex items-center gap-2 text-[10px] text-gray-400 italic">
              <span class="material-icons text-sm">info</span> Estimates vary by season and route
            </div>
          </div>
          
          <p class="text-xs text-text-muted italic flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">info</span>
            Estimates vary by season and route
          </p>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-primary dark:text-white mb-2">Tipping Calculator</h2>
          <p class="text-sm text-text-muted mb-8">Calculate appropriate tips for different services.</p>
          <div class="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-8">
            <button
              class="flex-1 py-2 text-xs font-bold text-text-muted hover:text-primary flex items-center justify-center gap-2">
              <span class="material-icons text-sm">restaurant</span> Restaurant
            </button>
            <button
              class="flex-1 py-2 text-xs font-bold text-text-muted hover:text-primary flex items-center justify-center gap-2">
              <span class="material-icons text-sm">directions_car</span> Driver
            </button>
            <button
              class="flex-1 py-2 bg-white dark:bg-card-dark shadow-sm rounded-lg text-xs font-bold text-primary flex items-center justify-center gap-2">
              <span class="material-icons text-sm">hotel</span> Hotel
            </button>
          </div>
          <div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div class="flex items-start gap-3 mb-6">
              <div
                class="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <span class="material-icons text-xl">room_service</span>
              </div>
              <div>
                <h3 class="font-bold text-primary dark:text-white text-sm">Hotel Staff Tips</h3>
                <p class="text-xs text-text-muted">Porters, housekeeping, concierge</p>
              </div>
            </div>
            <div class="space-y-4 mb-6">
              <div>
                <label class="block text-xs text-text-muted mb-2">Number of Bags (for porters)</label>
                <div class="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
                  <button class="text-gray-400 hover:text-primary"><span
                      class="material-icons text-sm">remove</span></button>
                  <span class="font-bold text-sm text-primary">2</span>
                  <button class="text-gray-400 hover:text-primary"><span
                      class="material-icons text-sm">add</span></button>
                </div>
              </div>
              <div>
                <label class="block text-xs text-text-muted mb-2">Nights of Stay (for housekeeping)</label>
                <div class="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2">
                  <button class="text-gray-400 hover:text-primary"><span
                      class="material-icons text-sm">remove</span></button>
                  <span class="font-bold text-sm text-primary">3</span>
                  <button class="text-gray-400 hover:text-primary"><span
                      class="material-icons text-sm">add</span></button>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
              <div class="flex justify-between text-xs">
                <span class="flex items-center gap-2 text-text-muted"><span
                    class="material-icons text-[14px]">luggage</span> Porters</span>
                <span class="font-bold text-primary">Rs400 – Rs600</span>
              </div>
              <div class="flex justify-between text-xs border-b border-gray-200 pb-3">
                <span class="flex items-center gap-2 text-text-muted"><span
                    class="material-icons text-[14px]">cleaning_services</span> Housekeeping</span>
                <span class="font-bold text-primary">Rs600 – Rs900</span>
              </div>
              <div class="flex justify-between items-center pt-1">
                <span class="text-xs font-bold text-primary">Total Hotel Tips</span>
                <span class="text-lg font-bold text-primary">Rs1,000 – Rs1,500</span>
              </div>
              <p class="text-[10px] text-center text-gray-400 mt-2">Concierge: Rs500-1,000 for special assistance</p>
            </div>
          </div>
          
          <!-- Result -->
          <div class="rounded-xl p-4 bg-primary/10 dark:bg-primary/20 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-text-muted">luggage</span>
                <span class="text-sm text-text-main dark:text-white">Porters</span>
              </div>
              <div class="font-bold text-primary">
                <template v-if="numBags > 0">
                  ₨{{ formatNumber(porterTipMin) }} – ₨{{ formatNumber(porterTipMax) }}
                </template>
                <template v-else>—</template>
              </div>
            </div>
            <div class="border-t border-primary/20 pt-3 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-text-muted">cleaning_services</span>
                <span class="text-sm text-text-main dark:text-white">Housekeeping</span>
              </div>
              <div class="font-bold text-primary">
                <template v-if="numNights > 0">
                  ₨{{ formatNumber(housekeepingTipMin) }} – ₨{{ formatNumber(housekeepingTipMax) }}
                </template>
                <template v-else>—</template>
              </div>
            </div>
            <div class="border-t border-primary/20 pt-3 flex items-center justify-between bg-white/30 dark:bg-white/5 rounded-lg px-2 py-1.5 -mx-2">
              <span class="text-sm font-medium text-text-main dark:text-white">Total Hotel Tips</span>
              <div class="text-xl font-bold text-primary">
                ₨{{ formatNumber(hotelTotalMin) }} – ₨{{ formatNumber(hotelTotalMax) }}
              </div>
            </div>
            <p class="text-xs text-text-muted text-center">Concierge: ₨500–1,000 for special assistance</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { budgetPresets, formatBudgetRange } from '~/data/moneyData'
import { useCurrency } from '~/composables/useCurrency'

// ============================================================================
// BUDGET ESTIMATOR STATE
// ============================================================================
const selectedStyle = ref('comfort')
const people = ref(2)
const days = ref(7)

const { rates, isLive } = useCurrency()
const isLiveRate = computed(() => isLive.value)

const usdToLkr = computed(() => {
  const rate = rates.value?.['USD']
  return rate || 309.80
})

const selectedBudget = computed(() => {
  return budgetPresets.find(b => b.id === selectedStyle.value) || budgetPresets[1]
})

const perPersonPerDay = computed(() => {
  const budget = selectedBudget.value
  if (!budget) return 50
  if (budget.usdMax === null) {
    return budget.usdMin
  }
  return (budget.usdMin + budget.usdMax) / 2
})

const totalUSD = computed(() => perPersonPerDay.value * people.value * days.value)
const totalLKR = computed(() => totalUSD.value * usdToLkr.value)
const totalPerPerson = computed(() => perPersonPerDay.value * days.value)
const totalPerPersonLKR = computed(() => totalPerPerson.value * usdToLkr.value)
const totalPerDay = computed(() => perPersonPerDay.value * people.value)
const totalPerDayLKR = computed(() => totalPerDay.value * usdToLkr.value)

// ============================================================================
// TIPPING CALCULATOR STATE
// ============================================================================
const activeTipTab = ref('restaurant')
const tipTabs = [
  { id: 'restaurant', label: 'Restaurant', icon: 'restaurant' },
  { id: 'driver', label: 'Driver', icon: 'directions_car' },
  { id: 'hotel', label: 'Hotel', icon: 'room_service' }
]

// Restaurant
const restaurantBill = ref(0)
const serviceChargeIncluded = ref(false)

const restaurantTipMin = computed(() => Math.round(restaurantBill.value * 0.05))
const restaurantTipMax = computed(() => Math.round(restaurantBill.value * 0.10))

// Driver/Guide
const tourType = ref<'half' | 'full'>('half')
const driverPeople = ref(2)

// Half-day: ₨500-1000/person, Full-day: ₨1000-2000/person
const driverTipPerPersonMin = computed(() => tourType.value === 'half' ? 500 : 1000)
const driverTipPerPersonMax = computed(() => tourType.value === 'half' ? 1000 : 2000)
const driverTipMin = computed(() => driverTipPerPersonMin.value * driverPeople.value)
const driverTipMax = computed(() => driverTipPerPersonMax.value * driverPeople.value)

// Hotel Staff
const numBags = ref(2)
const numNights = ref(3)

// Porters: ₨200-300 per bag
const porterTipMin = computed(() => numBags.value * 200)
const porterTipMax = computed(() => numBags.value * 300)

// Housekeeping: ₨200-300 per night
const housekeepingTipMin = computed(() => numNights.value * 200)
const housekeepingTipMax = computed(() => numNights.value * 300)

// Total hotel tips
const hotelTotalMin = computed(() => porterTipMin.value + housekeepingTipMin.value)
const hotelTotalMax = computed(() => porterTipMax.value + housekeepingTipMax.value)

// ============================================================================
// HELPERS
// ============================================================================
function formatNumber(num: number): string {
  return num.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function getBudgetColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
  }
  return colorMap[color] || 'bg-gray-100 text-gray-600'
}
</script>
