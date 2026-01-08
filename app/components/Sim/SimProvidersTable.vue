<template>
  <section id="sim-providers-table" class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-white">Top Mobile Providers</h2>
          <p class="text-text-muted mt-1">Compare networks, coverage, and value</p>
        </div>
        
        <!-- Sort Controls -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-text-muted mr-2">Sort by:</span>
          <button 
            @click="sortBy = 'coverage'"
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
            :class="sortBy === 'coverage' 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-400 hover:bg-gray-200'"
          >
            <span class="material-symbols-outlined text-sm">signal_cellular_alt</span>
            Best Coverage
          </button>
          <button 
            @click="sortBy = 'value'"
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
            :class="sortBy === 'value' 
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
              : 'bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-gray-400 hover:bg-gray-200'"
          >
            <span class="material-symbols-outlined text-sm">savings</span>
            Best Value
          </button>
        </div>
      </div>


        <!-- Region Selector -->
    <div class="mb-8 bg-gray-50 dark:bg-neutral-800/50 p-6 rounded-2xl border border-gray-100 dark:border-neutral-700">
      <h3 class="text-sm font-bold text-text-muted uppercase mb-4 tracking-wide">Where are you traveling?</h3>
      
      <!-- Pills -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="region in regionCoverage"
          :key="region.regionKey"
          @click="selectRegion(region.regionKey)"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all"
          :class="selectedRegionId === region.regionKey
            ? 'bg-primary text-white shadow-md'
            : 'bg-white dark:bg-neutral-800 text-text-main dark:text-white border border-gray-200 dark:border-neutral-700 hover:border-primary/50 hover:text-primary'"
        >
          {{ region.regionName }}
        </button>
      </div>

      <!-- Recommendation Card -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="selectedRegionDetails" class="bg-white dark:bg-neutral-800 rounded-xl p-5 border-l-4 border-primary shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden">
           <!-- Bg decoration -->
           <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <span class="material-symbols-outlined text-[120px]">map</span>
           </div>

           <div class="flex-1 z-10">
             <div class="flex items-center gap-2 mb-2">
               <span class="material-symbols-outlined text-primary">recommend</span>
               <span class="font-bold text-lg text-text-main dark:text-white">Best Networks for {{ selectedRegionDetails.regionName }}</span>
             </div>
             <p class="text-text-muted text-sm leading-relaxed mb-4">
               {{ selectedRegionDetails.description }}
             </p>
             
             <!-- Ranked List -->
             <div class="flex items-center gap-3 text-sm">
               <div 
                 v-for="(provId, idx) in selectedRegionDetails.recommendedProviders" 
                 :key="provId"
                 class="flex items-center gap-2"
               >
                 <span 
                    class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    :class="idx === 0 ? 'bg-amber-400' : 'bg-gray-400'"
                 >
                   {{ idx + 1 }}
                 </span>
                 <span :class="idx === 0 ? 'font-bold text-text-main dark:text-white' : 'text-text-muted'">
                   {{ getProviderById(provId)?.name }}
                 </span>
                 <span v-if="idx < selectedRegionDetails.recommendedProviders.length - 1" class="text-gray-300">
                   •
                 </span>
               </div>
             </div>
           </div>

           <div class="flex items-center gap-4 z-10 md:border-l md:border-gray-100 md:dark:border-neutral-700 md:pl-6">
              <div class="text-center" v-if="selectedRegionDetails.recommendedProviders[0]">
                 <div class="text-xs text-text-muted uppercase mb-1">Top Pick</div>
                 <div class="text-xl font-bold text-primary">{{ getProviderById(selectedRegionDetails.recommendedProviders[0]!)?.name }}</div>
                 <div class="text-xs text-green-600 font-medium mt-1">Excellent Coverage</div>
              </div>
           </div>
        </div>
      </Transition>
    </div>

    <!-- Table Section -->
      
    <!-- Table Section -->
      <div class="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider w-[300px]">Provider</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Coverage</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Speed</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">eSIM</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Best Value</th>
                <th class="px-6 py-4 text-center text-xs font-semibold text-text-muted uppercase tracking-wider w-[100px]">Compare</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
              <tr 
                v-for="provider in sortedProviders" 
                :key="provider.id"
                class="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer group"
                :class="{ 'bg-blue-50/30 dark:bg-blue-900/10': selectedRegionDetails?.recommendedProviders[0] === provider.id }"
                @click="openDetails(provider)"
              >
                <!-- Provider Info -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <!-- Rank Badge if Region Selected -->
                    <div 
                      v-if="selectedRegionDetails && selectedRegionDetails.recommendedProviders.includes(provider.id)"
                      class="hidden md:flex flex-col items-center justify-center size-8 rounded-full border-2 text-xs font-bold shrink-0"
                      :class="selectedRegionDetails.recommendedProviders.indexOf(provider.id) === 0 ? 'border-amber-400 text-amber-600 bg-amber-50' : 'border-gray-200 text-gray-400'"
                    >
                       <span>{{ selectedRegionDetails.recommendedProviders.indexOf(provider.id) + 1 }}</span>
                    </div>

                    <div 
                      class="size-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
                      :style="{ backgroundColor: provider.brandColor || '#666' }"
                    >
                      {{ provider.name?.split(' ')[0]?.slice(0, 3).toUpperCase() }}
                    </div>
                    <div>
                      <h3 class="font-bold text-text-main dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
                        {{ provider.name }}
                        <span v-if="selectedRegionDetails?.recommendedProviders[0] === provider.id" class="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Top Pick</span>
                      </h3>
                      <div class="flex flex-wrap gap-1 mt-1">
                        <span 
                          v-for="(tag, idx) in provider.bestFor.slice(0, 2)" 
                          :key="idx"
                          class="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-neutral-700 text-text-muted rounded capitalize"
                        >
                          {{ tag.replace('_', ' ') }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
  
                <!-- Coverage Score -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-1">
                    <div class="flex">
                      <span 
                        v-for="i in 5" 
                        :key="i"
                        class="material-symbols-outlined text-sm"
                        :class="i <= provider.coverageScore ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'"
                      >
                        signal_cellular_alt
                      </span>
                    </div>
                    <span class="text-xs text-text-muted ml-1">({{ provider.coverageScore }}/5)</span>
                  </div>
                </td>
  
                <!-- Speed Score -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-1">
                    <div class="flex">
                      <span 
                        v-for="i in 5" 
                        :key="i"
                        class="material-symbols-outlined text-sm"
                        :class="i <= provider.speedScore ? 'text-blue-500' : 'text-gray-300 dark:text-gray-600'"
                      >
                        speed
                      </span>
                    </div>
                    <span class="text-xs text-text-muted ml-1">({{ provider.speedScore }}/5)</span>
                  </div>
                </td>
  
                <!-- eSIM -->
                <td class="px-6 py-4">
                  <span 
                    v-if="provider.esimAvailable"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    <span class="material-symbols-outlined text-xs">check_circle</span>
                    Available
                  </span>
                  <span 
                    v-else
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-neutral-700 dark:text-gray-400"
                  >
                    Not Available
                  </span>
                </td>
  
                <!-- Best Value Metric -->
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-text-main dark:text-white">
                      {{ getBestValueMetric(provider.id).formatted }}
                    </span>
                    <span class="text-[10px] text-text-muted">
                      per GB
                    </span>
                  </div>
                </td>
  
                <!-- Compare Checkbox -->
                <td class="px-6 py-4 text-center" @click.stop>
                  <label class="inline-flex items-center cursor-pointer p-2">
                    <input 
                      type="checkbox"
                      :checked="selectedProviders.includes(provider.id)"
                      @change="$emit('select', provider.id)"
                      class="size-5 rounded border-gray-300 text-primary focus:ring-primary"
                    >
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

<!-- Details Drawer -->
    <Transition
      enter-active-class="transform transition ease-in-out duration-300 sm:duration-500"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-300 sm:duration-500"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="detailsProvider" class="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white dark:bg-neutral-900 shadow-2xl overflow-y-auto border-l border-gray-200 dark:border-neutral-700">
        <!-- Close Button -->
        <button 
          @click="detailsProvider = null"
          class="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 transition-colors z-10"
        >
          <span class="material-symbols-outlined">close</span>
        </button>

        <!-- Header Image/Color -->
        <div class="h-32 w-full relative overflow-hidden" :style="{ backgroundColor: detailsProvider.brandColor }">
           <div class="absolute inset-0 bg-black/20"></div>
           <div class="absolute bottom-4 left-6 text-white">
             <h2 class="text-3xl font-bold">{{ detailsProvider.name }}</h2>
             <span v-if="detailsProvider.esimAvailable" class="inline-flex items-center gap-1 text-xs font-medium bg-white/20 backdrop-blur px-2 py-0.5 rounded-full mt-1">
               <span class="material-symbols-outlined text-[14px]">check_circle</span>
               eSIM Ready
             </span>
           </div>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-8">
           
           <!-- Quick Stats -->
           <div class="grid grid-cols-2 gap-4">
             <div class="p-3 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-100 dark:border-neutral-700">
               <div class="text-xs text-text-muted uppercase mb-1">Coverage Score</div>
               <div class="flex items-center gap-1">
                 <span class="text-xl font-bold text-green-600">{{ detailsProvider.coverageScore }}</span>
                 <span class="text-sm text-text-muted">/ 5</span>
               </div>
               <div class="text-[10px] text-text-muted mt-1">Good for tracking/rural</div>
             </div>
             <div class="p-3 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-100 dark:border-neutral-700">
               <div class="text-xs text-text-muted uppercase mb-1">Internet Speed</div>
               <div class="flex items-center gap-1">
                  <span class="text-xl font-bold text-blue-600">{{ detailsProvider.speedScore }}</span>
                  <span class="text-sm text-text-muted">/ 5</span>
               </div>
               <div class="text-[10px] text-text-muted mt-1">4G/5G Availability</div>
             </div>
           </div>

           <!-- Description -->
           <div>
             <h3 class="font-bold text-lg mb-2">About Network</h3>
             <p class="text-text-muted text-sm leading-relaxed">
               {{ detailsProvider.name }} is one of the leading providers in Sri Lanka...
               <!-- (Real desc would come from data if added, simulating generic for now) -->
               Known for strong connectivity in {{ detailsProvider.bestFor.join(', ').replace('_', ' ') }} areas.
             </p>
           </div>

           <!-- Features -->
           <div>
             <h3 class="font-bold text-lg mb-3">Key Features</h3>
             <ul class="space-y-2">
               <li v-for="tag in detailsProvider.bestFor" :key="tag" class="flex items-start gap-3 text-sm text-text-muted capitalize">
                 <span class="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                 {{ tag.replace('_', ' ') }}
               </li>
               <li class="flex items-start gap-3 text-sm text-text-muted">
                 <span class="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                 Tourist plans include free WhatsApp
               </li>
             </ul>
           </div>

           <!-- Actions -->
           <div class="pt-4 border-t border-gray-100 dark:border-neutral-800">
             <button 
               @click="$emit('select', detailsProvider.id); detailsProvider = null"
               class="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
             >
               View Plans & Pricing
               <span class="material-symbols-outlined">arrow_forward</span>
             </button>
           </div>

        </div>
      </div>
    </Transition>
    
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="detailsProvider" @click="detailsProvider = null" class="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"></div>
    </Transition>

  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { providers, touristPlans, getPlansByProvider, regionCoverage, getProviderById, type Provider } from '~/data/simData'

const props = defineProps<{
  selectedProviders: string[]
}>()

const emit = defineEmits<{
  (e: 'select', providerId: string): void
}>()


const sortBy = ref<'coverage' | 'value'>('coverage')
const selectedRegionId = ref<string | null>(null)
const detailsProvider = ref<Provider | null>(null)

function selectRegion(id: string) {
  if (selectedRegionId.value === id) {
    selectedRegionId.value = null
  } else {
    selectedRegionId.value = id
  }
}

const selectedRegionDetails = computed(() => {
  if (!selectedRegionId.value) return null
  return regionCoverage.find(r => r.regionKey === selectedRegionId.value)
})

// Calculate "Best Value" metric (Lowest Price per GB)
function getBestValueMetric(providerId: string) {
  const plans = getPlansByProvider(providerId)
  if (plans.length === 0) return { value: Infinity, formatted: 'N/A' }
  
  const value = Math.min(...plans.map(p => p.priceUSD / p.dataGB))
  return {
    value,
    formatted: `From $${value.toFixed(2)}`
  }
}

const sortedProviders = computed(() => {
  const list = [...providers]
  
  if (selectedRegionId.value && selectedRegionDetails.value) {
    // Sort by recommendation order in the selected region
    const recommended = selectedRegionDetails.value.recommendedProviders
    return list.sort((a, b) => {
      const idxA = recommended.indexOf(a.id)
      const idxB = recommended.indexOf(b.id)
      
      // If both are recommended, sort by index
      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      // If A is recommended, it comes first
      if (idxA !== -1) return -1
      // If B is recommended, it comes first
      if (idxB !== -1) return 1
      
      // Fallback to score
      return b.coverageScore - a.coverageScore
    })
  }

  if (sortBy.value === 'coverage') {
    return list.sort((a, b) => b.coverageScore - a.coverageScore)
  } else {
    // Sort by best value (lowest price per GB)
    return list.sort((a, b) => {
      const valA = getBestValueMetric(a.id).value
      const valB = getBestValueMetric(b.id).value
      return valA - valB
    })
  }
})

function openDetails(provider: Provider) {
  // If the user clicks the row, we show details.
  // The 'Checkbox' handles selection.
  detailsProvider.value = provider
}
</script>
