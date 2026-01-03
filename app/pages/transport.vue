<template>
  <div class="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark font-body text-text-main dark:text-white">
    <Header variant="solid" />

    <!-- Main Layout -->
    <main class="flex-1 flex overflow-hidden relative mt-[80px]">
      <!-- Sidebar -->
      <aside class="w-full md:w-[460px] lg:w-[500px] bg-surface-light dark:bg-surface-dark flex flex-col border-r border-warm-sand dark:border-white/10 z-20 shadow-xl md:shadow-soft absolute inset-0 md:relative overflow-hidden">
        <div class="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div class="p-6 pb-2">
            <h1 class="font-display text-3xl text-teal-deep dark:text-white mb-1">Transport Assistant</h1>
            <p class="text-text-muted text-sm mb-6">Plan your journey across Sri Lanka with fair prices.</p>
            
            <!-- Route Inputs -->
            <div class="bg-light-cyan/30 dark:bg-[#3a2e29]/50 p-4 rounded-2xl border border-warm-sand dark:border-white/10 relative">
              <div class="flex flex-col gap-3 relative z-10">
                <div class="relative group">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-teal-deep text-[20px]">trip_origin</span>
                  <input v-model="origin" class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#221510] border-none ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-teal-deep text-sm font-medium text-text-main placeholder:text-text-muted/60 shadow-sm outline-none" placeholder="Starting point" type="text"/>
                </div>
                <div class="absolute left-[19px] top-[40px] h-[36px] border-l-2 border-dotted border-teal-deep/30 z-0"></div>
                <div class="relative group">
                  <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-coral-orange text-[20px]">location_on</span>
                  <input v-model="destination" class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#221510] border-none ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-teal-deep text-sm font-medium text-text-main placeholder:text-text-muted/60 shadow-sm outline-none" placeholder="Destination" type="text"/>
                </div>
              </div>
              <button @click="swapLocations" class="absolute right-6 top-1/2 -translate-y-1/2 size-8 bg-white dark:bg-[#4a3b36] rounded-full shadow border border-warm-sand dark:border-transparent flex items-center justify-center text-teal-deep hover:rotate-180 transition-transform duration-300 z-20">
                <span class="material-symbols-outlined text-[18px]">swap_vert</span>
              </button>
            </div>
          </div>

          <!-- Fair Fare Calculator -->
          <div class="px-6 py-4">
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-teal-deep">price_check</span>
              <h3 class="font-display text-lg text-text-main dark:text-white">Fair Fare Calculator</h3>
            </div>
            <div class="bg-teal-deep text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div class="absolute top-0 right-0 p-3 opacity-10">
                <span class="material-symbols-outlined text-[100px]">local_taxi</span>
              </div>
              <div class="relative z-10">
                <div class="text-teal-100 text-xs font-medium uppercase tracking-wider mb-1">Estimated Tuk-Tuk Fare</div>
                <div class="flex items-baseline gap-1 mb-4">
                  <span class="text-3xl font-bold font-display">LKR {{ calculatedFare.min.toLocaleString() }}</span>
                  <span class="text-lg opacity-80">-</span>
                  <span class="text-2xl font-bold font-display opacity-80">{{ calculatedFare.max.toLocaleString() }}</span>
                </div>
                <div class="mb-2">
                  <div class="h-2 w-full rounded-full price-meter relative">
                    <div class="absolute top-1/2 -translate-y-1/2 left-[25%] size-4 bg-white border-2 border-teal-deep rounded-full shadow transform -translate-x-1/2"></div>
                  </div>
                  <div class="flex justify-between mt-1.5 text-[10px] font-medium text-teal-100">
                    <span>Typical</span>
                    <span>High</span>
                    <span class="text-coral-orange">Tourist Price</span>
                  </div>
                </div>
                <p class="text-xs text-teal-100/80 italic mt-3">*Always negotiate before getting in if not using a meter.</p>
              </div>
            </div>
          </div>

          <!-- Ride Hailing Apps -->
          <div class="px-6 pb-4">
            <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Ride Hailing Apps</h3>
            <div class="grid grid-cols-2 gap-3">
              <a class="flex items-center gap-3 p-3 rounded-xl border border-warm-sand dark:border-white/10 bg-white dark:bg-[#221510] hover:border-teal-deep transition-colors group" href="#">
                <div class="size-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xs">PM</div>
                <div>
                  <div class="text-xs text-text-muted">PickMe</div>
                  <div class="text-sm font-bold group-hover:text-teal-deep">~480 LKR</div>
                </div>
                <span class="material-symbols-outlined ml-auto text-text-muted text-[18px]">open_in_new</span>
              </a>
              <a class="flex items-center gap-3 p-3 rounded-xl border border-warm-sand dark:border-white/10 bg-white dark:bg-[#221510] hover:border-teal-deep transition-colors group" href="#">
                <div class="size-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">U</div>
                <div>
                  <div class="text-xs text-text-muted">Uber</div>
                  <div class="text-sm font-bold group-hover:text-teal-deep">~520 LKR</div>
                </div>
                <span class="material-symbols-outlined ml-auto text-text-muted text-[18px]">open_in_new</span>
              </a>
            </div>
          </div>

          <!-- Public Transport -->
          <div class="px-6 pb-20">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider">Public Transport</h3>
              <span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Available</span>
            </div>
            <div class="flex flex-col gap-3">
              <!-- Train Card -->
              <div class="group bg-white dark:bg-[#221510] rounded-xl p-4 border border-warm-sand dark:border-white/10 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                      <span class="material-symbols-outlined">train</span>
                    </div>
                    <div>
                      <h4 class="font-bold text-text-main dark:text-white">Udarata Menike</h4>
                      <div class="text-xs text-text-muted">Express Train • 2nd Class</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-display font-bold text-lg text-teal-deep">600 LKR</div>
                    <div class="text-xs text-text-muted">Reserved</div>
                  </div>
                </div>
                <div class="mt-4 flex items-center justify-between text-sm border-t border-dashed border-gray-200 dark:border-gray-700 pt-3">
                  <div class="flex flex-col">
                    <span class="text-text-muted text-xs">Departs</span>
                    <span class="font-bold">05:55 AM</span>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-text-muted">
                    <span class="material-symbols-outlined text-[14px]">schedule</span>
                    9h 30m
                  </div>
                  <div class="flex flex-col text-right">
                    <span class="text-text-muted text-xs">Arrives</span>
                    <span class="font-bold">03:25 PM</span>
                  </div>
                </div>
              </div>

              <!-- Bus Card -->
              <div class="group bg-white dark:bg-[#221510] rounded-xl p-4 border border-warm-sand dark:border-white/10 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                      <span class="material-symbols-outlined">directions_bus</span>
                    </div>
                    <div>
                      <h4 class="font-bold text-text-main dark:text-white">CTB Super Luxury</h4>
                      <div class="text-xs text-text-muted">Highway Bus • A/C</div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-display font-bold text-lg text-teal-deep">950 LKR</div>
                    <div class="text-xs text-text-muted">Ticket</div>
                  </div>
                </div>
                <div class="mt-4 flex items-center justify-between text-sm border-t border-dashed border-gray-200 dark:border-gray-700 pt-3">
                  <div class="flex flex-col">
                    <span class="text-text-muted text-xs">Next Bus</span>
                    <span class="font-bold text-green-600">in 15 mins</span>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-text-muted">
                    <span class="material-symbols-outlined text-[14px]">schedule</span>
                    6h 45m
                  </div>
                  <div class="flex flex-col text-right">
                    <span class="text-text-muted text-xs">Frequency</span>
                    <span class="font-bold">Every 30m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Map Area -->
      <div class="hidden md:block flex-1 relative bg-[#e5e3df] dark:bg-[#1a1614] overflow-hidden map-texture">
        <div class="absolute inset-0 bg-cover bg-center opacity-70 dark:opacity-30 mix-blend-multiply" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBye3UqYEOFRFviYlfu1qfGwERk4DvZ7viiSrjotNb6TgCxVxEkt39moOOpk_n8b1P6gQlpieBykVTDhXAIliOY347015xp638Tt93UMGfMa-ZotbaDyrpYqcnH3kfW4Wv2flmN7A5EChkvCBoIBKTDOx4Tz_wqz25eNjNPo6Xyi6J0JSjOytQeabJrkS-jnjg-fUL0x57ePxii6Dcgs2-fM6MVzOMUf3XQ0z1CZgjQRgvtfSwNVdD9dLyYQMkMizcyuTjFWq_PHmYE'); filter: grayscale(100%) sepia(20%) hue-rotate(150deg) contrast(90%);"></div>
        
        <!-- SVG Route Animation -->
        <div class="absolute inset-0 pointer-events-none">
          <svg class="absolute inset-0 w-full h-full" style="z-index: 10;">
            <path class="animate-dash" d="M 300 450 Q 500 500 650 350" fill="none" stroke="#004d40" stroke-dasharray="10,5" stroke-width="4"></path>
            <circle cx="300" cy="450" fill="#004d40" r="6"></circle>
            <circle cx="650" cy="350" fill="#ff7f50" r="6"></circle>
          </svg>
        </div>

        <!-- Map Controls -->
        <div class="absolute top-4 right-4 flex flex-col gap-2 z-20">
          <button class="size-10 bg-white dark:bg-[#221510] rounded-xl shadow-md flex items-center justify-center text-text-main dark:text-white hover:bg-gray-50 transition-colors" title="My Location">
            <span class="material-symbols-outlined">my_location</span>
          </button>
          <button class="size-10 bg-white dark:bg-[#221510] rounded-xl shadow-md flex items-center justify-center text-text-main dark:text-white hover:bg-gray-50 transition-colors" title="Zoom In">
            <span class="material-symbols-outlined">add</span>
          </button>
          <button class="size-10 bg-white dark:bg-[#221510] rounded-xl shadow-md flex items-center justify-center text-text-main dark:text-white hover:bg-gray-50 transition-colors" title="Zoom Out">
            <span class="material-symbols-outlined">remove</span>
          </button>
        </div>

        <!-- Pins -->
        <div class="absolute top-[65%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30">
          <div class="relative flex items-center justify-center">
            <div class="absolute size-4 bg-teal-deep rounded-full animate-ping opacity-20"></div>
            <div class="relative px-3 py-1.5 bg-white dark:bg-[#221510] rounded-lg border border-teal-deep shadow-lg flex items-center gap-2 transform transition-transform group-hover:scale-105">
              <span class="material-symbols-outlined text-[16px] text-teal-deep">trip_origin</span>
              <span class="text-xs font-bold whitespace-nowrap">Colombo Fort</span>
            </div>
          </div>
        </div>

        <div class="absolute top-[45%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30">
          <div class="relative flex items-center justify-center">
            <div class="relative px-3 py-1.5 bg-teal-deep text-white rounded-lg shadow-xl flex items-center gap-2 transform transition-transform group-hover:scale-105">
              <span class="material-symbols-outlined text-[16px]">location_on</span>
              <span class="text-xs font-bold whitespace-nowrap">Ella</span>
            </div>
            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 bg-white dark:bg-[#221510] rounded-lg shadow-xl p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-2 text-center">
              <div class="text-xs text-text-muted">Tourist Hotspot</div>
              <div class="text-[10px] font-bold text-coral-orange">High Demand</div>
              <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 size-3 bg-white dark:bg-[#221510] transform rotate-45 shadow-sm"></div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="absolute bottom-8 left-8 z-20 bg-white/90 dark:bg-[#221510]/90 backdrop-blur-sm p-3 rounded-xl border border-warm-sand dark:border-[#3a2e29] shadow-lg max-w-xs">
          <h4 class="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Transport Legend</h4>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="size-2 rounded-full bg-teal-deep"></div>
              <span class="text-xs">Train Route (Scenic)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="size-2 rounded-full bg-coral-orange"></div>
              <span class="text-xs">Express Bus Route</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

definePageMeta({
  layout: false
})

// Get config
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// Route inputs
const origin = ref('Colombo Fort')
const destination = ref('Ella Railway Station')
const distanceKm = ref(200) // Default distance estimate
const selectedTransportType = ref<'TUK_TUK' | 'TAXI' | 'BUS' | 'TRAIN' | 'RIDESHARE'>('TUK_TUK')

// Fetch fare rates from API
const { data: ratesResponse } = await useFetch<{
  success: boolean
  data: Record<string, { base: number; perKm: number; minFare: number }>
}>(`${apiBase}/api/transport/rates`)

// Fetch routes from API
const { data: routesResponse } = await useFetch<{ success: boolean; data: any[] }>(
  `${apiBase}/api/transport/routes`
)

const rates = computed(() => ratesResponse.value?.data || {})
const routes = computed(() => routesResponse.value?.data || [])

// Calculate fare based on inputs
const calculatedFare = computed(() => {
  const rate = rates.value[selectedTransportType.value]
  if (!rate) return { min: 0, max: 0 }
  
  const baseFare = rate.base + (distanceKm.value * rate.perKm)
  return {
    min: Math.max(rate.minFare, Math.round(baseFare * 0.9)),
    max: Math.round(baseFare * 1.2),
    type: selectedTransportType.value
  }
})

// Swap origin and destination
function swapLocations() {
  const temp = origin.value
  origin.value = destination.value
  destination.value = temp
}

// Transport types for display
const transportTypes = [
  { id: 'TUK_TUK' as const, name: 'Tuk-Tuk', icon: 'local_taxi' },
  { id: 'TAXI' as const, name: 'Taxi', icon: 'directions_car' },
  { id: 'BUS' as const, name: 'Bus', icon: 'directions_bus' },
  { id: 'TRAIN' as const, name: 'Train', icon: 'train' },
]
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1c4be;
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4a3b36;
}
.map-texture {
  background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuBBeakA_CV8CM9DoriwroN769qST4KRGD2jekWs2OiCNEze2Now3z-1KgEoGZ5PZANkGJoXsaJ-iwaw3wcoWyNfKLHd-aiLNEurRhJEtopztvNBtrYZPkmphzw4gawlU7sA1K1v10kvNWX9TGdgNIymdyTZwW-3J8PIUT01oOK8UfAToESvOEC4pzfdogqYeE_afZ7dhmf9rH0nZUfNFLp2RIEpJTHQtgnyF2_SH2Zn3X-05RQRR2dfjr0kbw_B3OMa-TIK9dN--egI);
}
.price-meter {
  background: linear-gradient(90deg, #10b981 0%, #10b981 40%, #f59e0b 40%, #f59e0b 70%, #ef4444 70%, #ef4444 100%);
}
</style>
