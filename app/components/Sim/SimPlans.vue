<template>
  <section id="sim-plans" class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <!-- eSIM Compatibility Wizard -->
    <div class="mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 md:p-8 border border-blue-100 dark:border-blue-900/30 shadow-sm relative overflow-hidden">
      <!-- Background SVG -->
      <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <span class="material-symbols-outlined text-[150px]">sim_card</span>
      </div>

      <div class="relative z-10 max-w-3xl mx-auto text-center" v-if="wizardStep === 'ask'">
        <h2 class="text-2xl font-bold text-text-main dark:text-white mb-3">Does your phone support eSIM?</h2>
        <p class="text-text-muted mb-8">We'll recommend the best activation method and plans for you.</p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="setEsimPreference(true)"
            class="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-surface-dark border-2 border-transparent hover:border-primary rounded-xl shadow-sm hover:shadow-md transition-all group w-full sm:w-64"
          >
            <span class="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined">qr_code_2</span>
            </span>
            <div class="text-left">
              <div class="font-bold text-text-main dark:text-white">Yes, it does</div>
              <div class="text-xs text-text-muted">I prefer digital activation</div>
            </div>
          </button>

          <button 
            @click="setEsimPreference(false)"
            class="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-surface-dark border-2 border-transparent hover:border-primary rounded-xl shadow-sm hover:shadow-md transition-all group w-full sm:w-64"
          >
            <span class="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined">sim_card</span>
            </span>
            <div class="text-left">
              <div class="font-bold text-text-main dark:text-white">No / Not Sure</div>
              <div class="text-xs text-text-muted">I need a physical SIM</div>
            </div>
          </button>
        </div>
      </div>

      <div v-else class="relative z-10 max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-6">
           <h3 class="text-xl font-bold flex items-center gap-2 text-text-main dark:text-white">
             <span class="material-symbols-outlined" :class="isEsimCompatible ? 'text-blue-600' : 'text-orange-600'">
               {{ isEsimCompatible ? 'qr_code_2' : 'sim_card' }}
             </span>
             {{ isEsimCompatible ? 'eSIM Activation Guide' : 'Physical SIM Guide' }}
           </h3>
           <button @click="wizardStep = 'ask'; isEsimCompatible = null" class="text-sm text-text-muted hover:text-primary underline">Change</button>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-8 text-left">
          <!-- Steps -->
          <div v-for="(step, i) in guideSteps" :key="i" class="flex gap-4">
             <div class="flex-shrink-0 size-8 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center font-bold text-sm shadow-sm border border-gray-100 dark:border-neutral-700" :class="isEsimCompatible ? 'text-blue-600' : 'text-orange-600'">{{ i + 1 }}</div>
             <div>
               <h4 class="font-bold text-sm text-text-main dark:text-white mb-1">{{ step.title }}</h4>
               <p class="text-xs text-text-muted leading-relaxed">{{ step.desc }}</p>
             </div>
          </div>
        </div>

        <div class="bg-white/50 dark:bg-neutral-800/50 rounded-lg p-3 text-center border border-dashed border-gray-300 dark:border-neutral-700">
           <p class="text-sm font-medium text-text-main dark:text-white">
             Showing {{ displayedPlans.length }} plans recommended for {{ isEsimCompatible ? 'eSIM' : 'Physical SIM' }}
           </p>
        </div>
      </div>
    </div>
    
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-white">Recommended Tourist Data Packages</h2>
          <p class="text-text-muted mt-1">
            {{ selectedProvider ? `Showing ${getProviderById(selectedProvider)?.name} plans` : 'Find the perfect plan for your trip' }}
          </p>
        </div>
        
        <!-- Compare Badge -->
        <div v-if="selectedPlans.length > 0" class="flex items-center gap-2">
          <span class="text-sm text-text-muted">Comparing {{ selectedPlans.length }}/3 plans</span>
          <button 
            @click="$emit('clear-compare')"
            class="text-sm text-red-500 hover:underline"
          >
            Clear Comparison
          </button>
        </div>
      </div>
      
      <!-- Enhanced Filters -->
      <div class="flex flex-wrap gap-3 p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-neutral-700 shadow-sm">
        <!-- Duration Filter -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold text-text-muted uppercase">Duration</label>
          <select 
            v-model="filterDuration"
            class="px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-sm focus:ring-primary focus:border-primary"
          >
            <option value="all">Any Duration</option>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
          </select>
        </div>

        <!-- Data Filter -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold text-text-muted uppercase">Data Amount</label>
          <select 
            v-model="filterData"
            class="px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-sm focus:ring-primary focus:border-primary"
          >
            <option value="all">Any Data</option>
            <option value="low">≤ 20 GB</option>
            <option value="medium">20 - 50 GB</option>
            <option value="high">50+ GB</option>
          </select>
        </div>

        <!-- Best For Filter -->
        <div class="flex flex-col gap-1">
          <label class="text-xs font-bold text-text-muted uppercase">Travel Style</label>
          <select 
            v-model="filterTag"
            class="px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-sm focus:ring-primary focus:border-primary"
          >
            <option value="">All Styles</option>
            <option value="budget">💰 Budget</option>
            <option value="weekender">🏖️ Weekender</option>
            <option value="explorer">🧭 Explorer</option>
            <option value="nomad">💻 Digital Nomad</option>
            <option value="short_trip">⚡ Short Trip</option>
          </select>
        </div>

        <!-- eSIM Checkbox -->
        <div class="flex items-end pb-2">
          <label class="flex items-center gap-2 text-sm font-medium text-text-main dark:text-white cursor-pointer select-none">
            <input type="checkbox" v-model="showEsimOnly" class="size-4 rounded border-gray-300 text-primary focus:ring-primary">
            eSIM Only
          </label>
        </div>
      </div>
      
      <!-- Plans Grid -->
      <!-- Empty State -->
      <div v-if="displayedPlans.length === 0" class="text-center py-12 bg-gray-50 dark:bg-neutral-800/50 rounded-xl border border-dashed border-gray-300 dark:border-neutral-700">
        <span class="material-symbols-outlined text-4xl text-text-muted mb-2">filter_alt_off</span>
        <h3 class="text-lg font-bold text-text-main dark:text-white">No plans match your filters</h3>
        <p class="text-text-muted mb-4">Try adjusting your duration or data requirements.</p>
        <button 
          @click="resetFilters"
          class="text-primary font-medium hover:underline"
        >
          Reset all filters
        </button>
      </div>
      
      <!-- Plans Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="plan in displayedPlans"
          :key="plan.id"
          class="bg-white dark:bg-surface-dark rounded-xl border-2 overflow-hidden transition-all relative flex flex-col"
          :class="selectedPlans.includes(plan.id) 
            ? 'border-primary ring-2 ring-primary/20 shadow-lg' 
            : 'border-gray-200 dark:border-neutral-700 hover:border-primary/50 hover:shadow-md'"
        >
          <!-- Saved Badge -->
          <div 
            v-if="isDetailsSaved(plan.id)" 
            class="absolute top-2 right-2 z-10 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-sm"
          >
            <span class="material-symbols-outlined text-[12px]">check</span>
            Saved to Kit
          </div>

          <!-- Provider Badge -->
          <div 
            class="px-4 py-3 text-white flex items-center justify-between"
            :style="{ backgroundColor: getProviderById(plan.providerId)?.brandColor || '#666' }"
          >
            <span class="font-bold tracking-wide">{{ getProviderById(plan.providerId)?.name }}</span>
            <span class="bg-white/20 px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm">
              {{ getBestForTagLabel(plan.bestForTag) }}
            </span>
          </div>
          
          <div class="p-5 flex-grow flex flex-col">
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-bold text-lg text-text-main dark:text-white leading-tight w-2/3">{{ plan.name }}</h3>
              <div class="text-right">
                <div class="text-2xl font-bold text-green-600">${{ plan.priceUSD }}</div>
                <div class="text-xs text-text-muted">Rs. {{ plan.priceLKR.toLocaleString() }}</div>
              </div>
            </div>
            
            <!-- Main Stats -->
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-800/50 rounded-lg">
                <span class="material-symbols-outlined text-primary text-2xl">data_usage</span>
                <div>
                  <div class="font-bold text-lg text-text-main dark:text-white">{{ plan.dataGB }} GB</div>
                  <div class="text-xs text-text-muted">Data</div>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-800/50 rounded-lg">
                <span class="material-symbols-outlined text-orange-500 text-2xl">calendar_today</span>
                <div>
                  <div class="font-bold text-lg text-text-main dark:text-white">{{ plan.validityDays }} Days</div>
                  <div class="text-xs text-text-muted">Validity</div>
                </div>
              </div>
            </div>
            
            <!-- Features List -->
            <div class="space-y-2 mb-6 flex-grow">
              <div class="flex items-start gap-2 text-sm text-text-muted">
                <span class="material-symbols-outlined text-green-500 text-sm mt-0.5">call</span>
                {{ plan.localCalls }}
              </div>
              <div v-if="plan.intlCalls" class="flex items-start gap-2 text-sm text-text-muted">
                <span class="material-symbols-outlined text-blue-500 text-sm mt-0.5">public</span>
                {{ plan.intlCalls }}
              </div>
              <div class="flex flex-wrap gap-1 mt-2">
                <span 
                  v-for="(freebie, idx) in plan.freebies.slice(0, 3)" 
                  :key="idx"
                  class="text-[10px] px-2 py-0.5 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-full font-medium"
                >
                  {{ freebie }}
                </span>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 mt-auto">
              <button
                @click="$emit('toggle-plan', plan.id)"
                class="px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                :class="selectedPlans.includes(plan.id)
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-text-muted hover:border-primary hover:text-primary'"
              >
                <span class="material-symbols-outlined text-lg">{{ selectedPlans.includes(plan.id) ? 'check_box' : 'check_box_outline_blank' }}</span>
                {{ selectedPlans.includes(plan.id) ? 'Compare' : 'Compare' }}
              </button>
              
              <button
                @click="addToKit(plan.id)"
                class="px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                :class="isDetailsSaved(plan.id)
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-primary text-white hover:bg-primary/90'"
              >
                {{ isDetailsSaved(plan.id) ? 'Saved' : 'Select' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Comparison Drawer / Panel -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-full"
        enter-to-class="translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0"
        leave-to-class="translate-y-full text-opacity-0"
      >
        <div v-if="selectedPlans.length > 0" class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-neutral-700 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] max-h-[80vh] overflow-y-auto">
          <div class="max-w-7xl mx-auto px-4 md:px-10 py-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-text-main dark:text-white flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">compare_arrows</span>
                Direct Comparison
                <span class="text-sm font-normal text-text-muted ml-2">({{ selectedPlans.length }} plans selected)</span>
              </h3>
              <div class="flex gap-4">
                <button 
                   @click="$emit('clear-compare')"
                   class="text-sm text-text-muted hover:text-red-500"
                >
                  Clear All
                </button>
                <button 
                  @click="$emit('clear-compare')"
                  class="md:hidden p-2 bg-gray-100 rounded-full"
                >
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            <div class="overflow-x-auto pb-6">
              <table class="w-full text-sm text-left">
                <thead>
                  <tr class="bg-gray-50 dark:bg-neutral-800/50">
                    <th class="p-4 rounded-tl-xl text-text-muted font-medium w-1/4">Features</th>
                    <th 
                      v-for="planId in selectedPlans" 
                      :key="planId"
                      class="p-4 text-center font-bold text-text-main dark:text-white text-lg"
                      :class="{ 'rounded-tr-xl': selectedPlans.indexOf(planId) === selectedPlans.length - 1 }"
                    >
                      {{ getPlanById(planId)?.name }}
                      <div class="text-xs font-normal text-text-muted mt-1">{{ getProviderById(getPlanById(planId)!.providerId)?.name }}</div>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-neutral-700">
                  <tr>
                    <td class="p-4 text-text-muted font-medium">Price (USD)</td>
                    <td v-for="planId in selectedPlans" :key="planId" class="p-4 text-center">
                      <span class="text-2xl font-bold text-green-600">${{ getPlanById(planId)?.priceUSD }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="p-4 text-text-muted font-medium">Data</td>
                    <td v-for="planId in selectedPlans" :key="planId" class="p-4 text-center font-bold text-primary">
                      {{ getPlanById(planId)?.dataGB }} GB
                    </td>
                  </tr>
                  <tr>
                    <td class="p-4 text-text-muted font-medium">Cost per GB</td>
                    <td v-for="planId in selectedPlans" :key="planId" class="p-4 text-center text-text-muted">
                      ${{ (getPlanById(planId)!.priceUSD / getPlanById(planId)!.dataGB).toFixed(2) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="p-4 text-text-muted font-medium">Validity</td>
                    <td v-for="planId in selectedPlans" :key="planId" class="p-4 text-center">
                      {{ getPlanById(planId)?.validityDays }} Days
                    </td>
                  </tr>
                  <tr>
                    <td class="p-4 text-text-muted font-medium">Calls</td>
                    <td v-for="planId in selectedPlans" :key="planId" class="p-4 text-center text-xs">
                      <div>{{ getPlanById(planId)?.localCalls }}</div>
                      <div v-if="getPlanById(planId)?.intlCalls" class="text-text-muted mt-1">{{ getPlanById(planId)?.intlCalls }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="p-4 text-text-muted font-medium">Freebies</td>
                    <td v-for="planId in selectedPlans" :key="planId" class="p-4 text-center">
                      <div class="flex flex-wrap gap-1 justify-center">
                        <span 
                          v-for="freebie in getPlanById(planId)?.freebies" 
                          :key="freebie"
                          class="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-full"
                        >
                          {{ freebie }}
                        </span>
                      </div>
                    </td>
                  </tr>
                   <tr>
                    <td class="p-4 text-text-muted font-medium">Where to Buy</td>
                    <td v-for="planId in selectedPlans" :key="planId" class="p-4 text-center">
                      <div class="flex flex-wrap gap-1 justify-center">
                        <span 
                          v-for="loc in getPlanById(planId)?.whereToBuy" 
                          :key="loc"
                          class="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-neutral-700 rounded capitalize"
                        >
                          {{ loc }}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <!-- Action Row -->
                  <tr class="bg-gray-50 dark:bg-neutral-800/20">
                    <td class="p-4"></td>
                    <td v-for="planId in selectedPlans" :key="planId" class="p-4 text-center">
                      <button 
                        @click="addToKit(planId)"
                        class="w-full py-2 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2"
                        :class="isDetailsSaved(planId)
                          ? 'bg-green-500 text-white cursor-default'
                          : 'bg-primary text-white hover:bg-primary/90'"
                      >
                        <span class="material-symbols-outlined text-sm">
                          {{ isDetailsSaved(planId) ? 'check' : 'add_circle' }}
                        </span>
                        {{ isDetailsSaved(planId) ? 'Added to Kit' : 'Add to Trip Kit' }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { touristPlans, getProviderById, getPlanById, getBestForTagLabel, type BestForTag } from '~/data/simData'

const props = defineProps<{
  selectedProvider: string | null
  selectedPlans: string[]
  savedPlanIds: string[]
}>()

const emit = defineEmits<{
  (e: 'toggle-plan', planId: string): void
  (e: 'clear-compare'): void
  (e: 'toggle-save', planId: string): void
}>()

// Filters
const filterDuration = ref('all')
const filterData = ref('all')
const filterTag = ref('')
const showEsimOnly = ref(false)

// Wizard State
const wizardStep = ref<'ask' | 'result'>('ask')
const isEsimCompatible = ref<boolean | null>(null)

function setEsimPreference(compatible: boolean) {
  isEsimCompatible.value = compatible
  wizardStep.value = 'result'
  
  if (compatible) {
    showEsimOnly.value = true
  } else {
    showEsimOnly.value = false
  }
}

const guideSteps = computed(() => {
  if (isEsimCompatible.value) {
    return [
      { title: 'Buy Online', desc: 'Purchase your plan via the provider\'s website before you travel.' },
      { title: 'Receive QR', desc: 'You\'ll receive a QR code via email instantly.' },
      { title: 'Scan & Activate', desc: 'Scan the QR code in your phone settings upon arrival in Sri Lanka.' }
    ]
  } else {
    return [
      { title: 'Pre-order / Buy', desc: 'Reserve online or visit the 24/7 airport counters at Arrival.' },
      { title: 'Register', desc: 'Present your passport for mandatory SIM registration by staff.' },
      { title: 'Install', desc: 'Staff will install the SIM and configure your internet settings.' }
    ]
  }
})

function addToKit(planId: string) {
  emit('toggle-save', planId)
}

function isDetailsSaved(planId: string) {
  return props.savedPlanIds.includes(planId)
}

function resetFilters() {
  filterDuration.value = 'all'
  filterData.value = 'all'
  filterTag.value = ''
  showEsimOnly.value = false
  wizardStep.value = 'ask'
  isEsimCompatible.value = null
}

const displayedPlans = computed(() => {
  let plans = [...touristPlans]
  
  // Filter by provider (prop)
  if (props.selectedProvider) {
    plans = plans.filter(p => p.providerId === props.selectedProvider)
  }
  
  // Filter by Duration
  if (filterDuration.value !== 'all') {
    const dur = parseInt(filterDuration.value)
    // Precise match for 7, 14, 30 days common plans
    // Or we could do ranges, but the requirement said "7 days / 14 days / 30 days"
    // I'll assume exact match or close enough (e.g. 28-30 for month)
    if (dur === 30) {
      plans = plans.filter(p => p.validityDays >= 28 && p.validityDays <= 31)
    } else {
      plans = plans.filter(p => p.validityDays === dur)
    }
  }

  // Filter by Data
  if (filterData.value !== 'all') {
    if (filterData.value === 'low') {
      plans = plans.filter(p => p.dataGB <= 20)
    } else if (filterData.value === 'medium') {
      plans = plans.filter(p => p.dataGB > 20 && p.dataGB < 50)
    } else if (filterData.value === 'high') {
      plans = plans.filter(p => p.dataGB >= 50)
    }
  }
  
  // Filter by Tag
  if (filterTag.value) {
    plans = plans.filter(p => p.bestForTag === filterTag.value)
  }
  
  // Filter eSIM only
  if (showEsimOnly.value) {
    // Check if plan has 'eSIM' in freebies OR requires online (often eSIM)
    // Better to rely on the provider's eSIM capability or the plan's specific freebie/note
    plans = plans.filter(p => 
      p.freebies.some(f => f.toLowerCase().includes('esim')) || 
      (p.whereToBuy.includes('online') && getProviderById(p.providerId)?.esimAvailable)
    )
  }
  
  return plans
})
</script>
