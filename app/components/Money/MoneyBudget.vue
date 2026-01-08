<template>
  <section class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Budget Planner -->
      <div class="flex flex-col gap-6">
        <div class="border-l-4 border-primary pl-4">
          <h2 class="text-2xl font-bold text-text-main dark:text-white">Daily Budget Estimator</h2>
          <p class="text-text-muted mt-1">Calculate your trip budget based on travel style.</p>
        </div>
        
        <!-- Travel Style Selector -->
        <div class="space-y-3">
          <label class="text-sm font-bold text-text-muted uppercase tracking-wide">Travel Style</label>
          <div class="grid grid-cols-3 gap-3">
            <button 
              v-for="budget in budgetPresets" 
              :key="budget.id"
              @click="selectedStyle = budget.id"
              class="relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
              :class="selectedStyle === budget.id 
                ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                : 'border-gray-200 dark:border-neutral-700 hover:border-primary/50'"
            >
              <div 
                class="size-10 rounded-full flex items-center justify-center"
                :class="getBudgetColorClass(budget.color)"
              >
                <span class="material-symbols-outlined">{{ budget.icon }}</span>
              </div>
              <span class="font-bold text-sm text-text-main dark:text-white">{{ budget.name }}</span>
              <span class="text-xs text-text-muted">{{ formatBudgetRange(budget) }}/day</span>
              <div 
                v-if="selectedStyle === budget.id" 
                class="absolute top-2 right-2 size-5 rounded-full bg-primary text-white flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-sm">check</span>
              </div>
            </button>
          </div>
        </div>
        
        <!-- People & Days Inputs -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-bold text-text-muted uppercase tracking-wide">Travelers</label>
            <div class="flex items-center bg-white dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-neutral-700">
              <button 
                @click="people = Math.max(1, people - 1)"
                class="p-3 text-text-muted hover:text-primary transition-colors"
              >
                <span class="material-symbols-outlined">remove</span>
              </button>
              <input 
                type="number" 
                v-model.number="people" 
                min="1" 
                max="20"
                class="flex-1 text-center text-xl font-bold bg-transparent border-none outline-none text-text-main dark:text-white"
              />
              <button 
                @click="people = Math.min(20, people + 1)"
                class="p-3 text-text-muted hover:text-primary transition-colors"
              >
                <span class="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-bold text-text-muted uppercase tracking-wide">Days</label>
            <div class="flex items-center bg-white dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-neutral-700">
              <button 
                @click="days = Math.max(1, days - 1)"
                class="p-3 text-text-muted hover:text-primary transition-colors"
              >
                <span class="material-symbols-outlined">remove</span>
              </button>
              <input 
                type="number" 
                v-model.number="days" 
                min="1" 
                max="90"
                class="flex-1 text-center text-xl font-bold bg-transparent border-none outline-none text-text-main dark:text-white"
              />
              <button 
                @click="days = Math.min(90, days + 1)"
                class="p-3 text-text-muted hover:text-primary transition-colors"
              >
                <span class="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Estimate Results -->
        <div class="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-6 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-text-muted uppercase tracking-wide">Estimated Total</span>
            <span class="text-xs text-text-muted flex items-center gap-1">
              <span class="material-symbols-outlined text-sm" :class="isLiveRate ? 'text-green-600' : 'text-amber-500'">
                {{ isLiveRate ? 'check_circle' : 'info' }}
              </span>
              {{ isLiveRate ? 'Live rate' : 'Estimated rate' }}
            </span>
          </div>
          
          <div class="flex items-end justify-between">
            <div>
              <div class="text-4xl font-bold text-primary">${{ formatNumber(totalUSD) }}</div>
              <div class="text-lg text-text-muted">₨{{ formatNumber(totalLKR) }}</div>
            </div>
            <div class="text-right text-sm text-text-muted">
              <div>{{ people }} {{ people === 1 ? 'person' : 'people' }} × {{ days }} {{ days === 1 ? 'day' : 'days' }}</div>
              <div class="font-medium">${{ formatNumber(perPersonPerDay) }}/person/day</div>
            </div>
          </div>
          
          <!-- Breakdown -->
          <div class="border-t border-primary/20 pt-4 grid grid-cols-2 gap-4 text-sm">
            <div class="bg-white/50 dark:bg-white/5 rounded-lg p-3">
              <div class="text-text-muted mb-1">Per Person</div>
              <div class="font-bold text-text-main dark:text-white">${{ formatNumber(totalPerPerson) }}</div>
              <div class="text-xs text-text-muted">₨{{ formatNumber(totalPerPersonLKR) }}</div>
            </div>
            <div class="bg-white/50 dark:bg-white/5 rounded-lg p-3">
              <div class="text-text-muted mb-1">Per Day (all)</div>
              <div class="font-bold text-text-main dark:text-white">${{ formatNumber(totalPerDay) }}</div>
              <div class="text-xs text-text-muted">₨{{ formatNumber(totalPerDayLKR) }}</div>
            </div>
          </div>
          
          <p class="text-xs text-text-muted italic flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">info</span>
            Estimates vary by season and route
          </p>
        </div>
      </div>
      
      <!-- Tipping Calculator -->
      <div class="flex flex-col gap-6">
        <div class="border-l-4 border-primary pl-4">
          <h2 class="text-2xl font-bold text-text-main dark:text-white">Tipping Calculator</h2>
          <p class="text-text-muted mt-1">Calculate appropriate tips for different services.</p>
        </div>
        
        <!-- Tab Selector -->
        <div class="flex gap-2 bg-gray-100 dark:bg-surface-dark rounded-lg p-1">
          <button
            v-for="tab in tipTabs"
            :key="tab.id"
            @click="activeTipTab = tab.id"
            class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all"
            :class="activeTipTab === tab.id 
              ? 'bg-white dark:bg-[#32231e] text-primary shadow-sm' 
              : 'text-text-muted hover:text-text-main'"
          >
            <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
            <span class="hidden sm:inline">{{ tab.label }}</span>
          </button>
        </div>
        
        <!-- Restaurant Calculator -->
        <div v-if="activeTipTab === 'restaurant'" class="bg-white dark:bg-[#32231e] rounded-xl border border-gray-200 dark:border-neutral-700 p-5 space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <span class="material-symbols-outlined text-orange-600 dark:text-orange-400">restaurant</span>
            </div>
            <div>
              <h3 class="font-bold text-text-main dark:text-white">Restaurant Tip</h3>
              <p class="text-xs text-text-muted">5–10% if no service charge included</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium text-text-muted mb-1.5 block">Bill Amount (LKR)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">₨</span>
                <input 
                  type="number" 
                  v-model.number="restaurantBill" 
                  placeholder="2,500"
                  class="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-surface-dark text-text-main dark:text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            
            <label class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-surface-dark cursor-pointer">
              <input 
                type="checkbox" 
                v-model="serviceChargeIncluded"
                class="size-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div>
                <span class="font-medium text-text-main dark:text-white">Service charge already included</span>
                <p class="text-xs text-text-muted">Many mid-to-upscale places add 10% automatically</p>
              </div>
            </label>
          </div>
          
          <!-- Result -->
          <div 
            class="rounded-xl p-4 text-center"
            :class="serviceChargeIncluded ? 'bg-green-50 dark:bg-green-900/20' : 'bg-primary/10 dark:bg-primary/20'"
          >
            <template v-if="serviceChargeIncluded">
              <span class="material-symbols-outlined text-3xl text-green-600 dark:text-green-400 mb-2">check_circle</span>
              <p class="font-medium text-green-700 dark:text-green-400">No additional tip needed</p>
              <p class="text-xs text-green-600/70 dark:text-green-500/70 mt-1">Service charge covers gratuity</p>
            </template>
            <template v-else-if="restaurantBill > 0">
              <p class="text-sm text-text-muted mb-1">Suggested tip (5–10%)</p>
              <div class="text-3xl font-bold text-primary">
                ₨{{ formatNumber(restaurantTipMin) }} – ₨{{ formatNumber(restaurantTipMax) }}
              </div>
              <p class="text-xs text-text-muted mt-2">At small eateries, ₨100–150 is appreciated</p>
            </template>
            <template v-else>
              <p class="text-text-muted">Enter bill amount to calculate tip</p>
            </template>
          </div>
        </div>
        
        <!-- Driver/Guide Calculator -->
        <div v-if="activeTipTab === 'driver'" class="bg-white dark:bg-[#32231e] rounded-xl border border-gray-200 dark:border-neutral-700 p-5 space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">directions_car</span>
            </div>
            <div>
              <h3 class="font-bold text-text-main dark:text-white">Driver & Guide Tip</h3>
              <p class="text-xs text-text-muted">For private tours and day trips</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium text-text-muted mb-1.5 block">Tour Type</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="tourType = 'half'"
                  class="p-3 rounded-lg border-2 text-center transition-all"
                  :class="tourType === 'half' 
                    ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                    : 'border-gray-200 dark:border-neutral-700 hover:border-primary/50'"
                >
                  <span class="material-symbols-outlined text-2xl mb-1" :class="tourType === 'half' ? 'text-primary' : 'text-text-muted'">wb_twilight</span>
                  <div class="font-medium text-sm text-text-main dark:text-white">Half Day</div>
                  <div class="text-xs text-text-muted">~4 hours</div>
                </button>
                <button
                  @click="tourType = 'full'"
                  class="p-3 rounded-lg border-2 text-center transition-all"
                  :class="tourType === 'full' 
                    ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                    : 'border-gray-200 dark:border-neutral-700 hover:border-primary/50'"
                >
                  <span class="material-symbols-outlined text-2xl mb-1" :class="tourType === 'full' ? 'text-primary' : 'text-text-muted'">wb_sunny</span>
                  <div class="font-medium text-sm text-text-main dark:text-white">Full Day</div>
                  <div class="text-xs text-text-muted">8+ hours</div>
                </button>
              </div>
            </div>
            
            <div>
              <label class="text-sm font-medium text-text-muted mb-1.5 block">Number of People</label>
              <div class="flex items-center bg-gray-50 dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-neutral-700">
                <button 
                  @click="driverPeople = Math.max(1, driverPeople - 1)"
                  class="p-3 text-text-muted hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">remove</span>
                </button>
                <input 
                  type="number" 
                  v-model.number="driverPeople" 
                  min="1" 
                  max="10"
                  class="flex-1 text-center text-xl font-bold bg-transparent border-none outline-none text-text-main dark:text-white"
                />
                <button 
                  @click="driverPeople = Math.min(10, driverPeople + 1)"
                  class="p-3 text-text-muted hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Result -->
          <div class="rounded-xl p-4 bg-primary/10 dark:bg-primary/20 text-center">
            <p class="text-sm text-text-muted mb-1">Suggested tip (total)</p>
            <div class="text-3xl font-bold text-primary">
              ₨{{ formatNumber(driverTipMin) }} – ₨{{ formatNumber(driverTipMax) }}
            </div>
            <p class="text-xs text-text-muted mt-2">
              ₨{{ formatNumber(driverTipPerPersonMin) }}–{{ formatNumber(driverTipPerPersonMax) }}/person
            </p>
            <p class="text-xs text-text-muted mt-1">For safari guides: ₨1,000–2,500 for exceptional service</p>
          </div>
        </div>
        
        <!-- Hotel Staff Calculator -->
        <div v-if="activeTipTab === 'hotel'" class="bg-white dark:bg-[#32231e] rounded-xl border border-gray-200 dark:border-neutral-700 p-5 space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <span class="material-symbols-outlined text-purple-600 dark:text-purple-400">room_service</span>
            </div>
            <div>
              <h3 class="font-bold text-text-main dark:text-white">Hotel Staff Tips</h3>
              <p class="text-xs text-text-muted">Porters, housekeeping, concierge</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium text-text-muted mb-1.5 block">Number of Bags (for porters)</label>
              <div class="flex items-center bg-gray-50 dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-neutral-700">
                <button 
                  @click="numBags = Math.max(0, numBags - 1)"
                  class="p-3 text-text-muted hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">remove</span>
                </button>
                <input 
                  type="number" 
                  v-model.number="numBags" 
                  min="0" 
                  max="20"
                  class="flex-1 text-center text-xl font-bold bg-transparent border-none outline-none text-text-main dark:text-white"
                />
                <button 
                  @click="numBags = Math.min(20, numBags + 1)"
                  class="p-3 text-text-muted hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
            
            <div>
              <label class="text-sm font-medium text-text-muted mb-1.5 block">Nights of Stay (for housekeeping)</label>
              <div class="flex items-center bg-gray-50 dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-neutral-700">
                <button 
                  @click="numNights = Math.max(0, numNights - 1)"
                  class="p-3 text-text-muted hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">remove</span>
                </button>
                <input 
                  type="number" 
                  v-model.number="numNights" 
                  min="0" 
                  max="30"
                  class="flex-1 text-center text-xl font-bold bg-transparent border-none outline-none text-text-main dark:text-white"
                />
                <button 
                  @click="numNights = Math.min(30, numNights + 1)"
                  class="p-3 text-text-muted hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined">add</span>
                </button>
              </div>
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
