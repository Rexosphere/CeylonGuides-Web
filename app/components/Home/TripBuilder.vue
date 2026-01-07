<template>
  <section class="py-12 px-4 sm:px-10 layout-container bg-background-light dark:bg-[#1a100c] border-y border-gray-200 dark:border-neutral-800">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h2 class="text-text-main dark:text-white text-3xl font-bold leading-tight tracking-tight mb-2">Trip Builder Workshop</h2>
        <p class="text-text-muted dark:text-neutral-400">Drag & drop destinations to craft your custom journey</p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink to="/trip-builder" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-md hover:bg-primary/90 transition-colors">
          <span class="material-symbols-outlined text-[20px]">build</span> Open Trip Builder
        </NuxtLink>
      </div>
    </div>
    
    <!-- Builder UI Preview -->
    <div class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-gray-200 dark:border-neutral-800 overflow-hidden min-h-[600px] flex flex-col">
      <!-- Toolbar -->
      <div class="bg-gray-50 dark:bg-[#251814] p-4 border-b border-gray-200 dark:border-neutral-700 flex flex-wrap gap-4 items-center justify-between">
        <div class="flex items-center gap-4 flex-wrap">
          <div class="flex items-center gap-2 bg-white dark:bg-surface-dark px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700">
            <span class="material-symbols-outlined text-gray-400">calendar_month</span>
            <span class="text-sm font-medium dark:text-white text-text-main">Nov 12 - Nov 19</span>
          </div>
          <div class="flex items-center gap-2 bg-white dark:bg-surface-dark px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700">
            <span class="material-symbols-outlined text-gray-400">group</span>
            <span class="text-sm font-medium dark:text-white text-text-main">2 Travelers</span>
          </div>
        </div>
        <!-- Budget Estimator Widget -->
        <div class="flex items-center gap-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900 px-4 py-2 rounded-lg">
          <span class="material-symbols-outlined text-green-700 dark:text-green-500">attach_money</span>
          <div class="flex flex-col">
            <span class="text-[10px] text-green-700 dark:text-green-500 font-bold uppercase tracking-wider">Est. Budget</span>
            <span class="text-sm font-bold text-green-800 dark:text-green-400">$1,240 USD</span>
          </div>
        </div>
      </div>
      
      <!-- Main Layout -->
      <div class="flex flex-col lg:flex-row flex-1">
        <!-- Sidebar: Library -->
        <div class="w-full lg:w-[320px] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-neutral-700 bg-gray-50/50 dark:bg-[#251814]/50 flex flex-col">
          <div class="p-4 border-b border-gray-200 dark:border-neutral-700">
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
              <input 
                v-model="searchQuery"
                @focus="goToTripBuilder"
                class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-surface-dark text-sm focus:ring-primary focus:border-primary dark:text-white focus:outline-none placeholder-text-muted text-text-main" 
                placeholder="Search places..." 
                type="text"
              />
            </div>
            <div class="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="goToTripBuilder"
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                  activeCategory === category.id 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700'
                ]"
              >
                {{ category.label }}
              </button>
            </div>
          </div>
          <!-- Draggable Items -->
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Suggested</p>
            <!-- Items -->
            <div 
              v-for="item in suggestedItems" 
              :key="item.name"
              @click="goToTripBuilder"
              class="group bg-white dark:bg-surface-dark p-2 rounded-lg border border-gray-200 dark:border-neutral-700 hover:shadow-md transition-shadow cursor-pointer flex gap-3"
            >
              <div 
                class="w-16 h-16 rounded-md bg-cover bg-center shrink-0" 
                role="img" 
                :aria-label="item.name"
                :style="`background-image: url('${item.image}');`"
              ></div>
              <div class="flex flex-col justify-center flex-1">
                <h4 class="text-sm font-bold text-neutral-800 dark:text-white">{{ item.name }}</h4>
                <p class="text-xs text-text-muted">{{ item.location }} • {{ item.type }}</p>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-[10px] bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-neutral-400">{{ item.duration }}</span>
                  <span class="material-symbols-outlined text-gray-300 group-hover:text-primary">drag_indicator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Main Timeline Area -->
        <div class="flex-1 p-6 bg-white dark:bg-surface-dark overflow-y-auto">
          <div class="max-w-3xl mx-auto space-y-8">
            <!-- Day 1 -->
            <div class="relative pl-8 border-l-2 border-primary/30">
              <div class="absolute -left-[9px] top-0 size-4 bg-primary rounded-full border-4 border-white dark:border-surface-dark"></div>
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Day 1: Arrival & Colombo City</h3>
                  <p class="text-sm text-gray-500">Monday, Nov 12</p>
                </div>
              </div>
              <!-- Timeline Item -->
              <div class="bg-gray-50 dark:bg-[#251814] rounded-lg border border-gray-100 dark:border-neutral-800 p-3 mb-3 flex gap-4 shadow-sm">
                <div class="text-center min-w-[60px] flex flex-col justify-center border-r border-gray-200 dark:border-neutral-700 pr-4 py-1">
                  <span class="text-xs font-bold text-gray-400">10:00 AM</span>
                  <span class="text-[10px] text-gray-400">Arrival</span>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between">
                    <h4 class="text-base font-semibold text-neutral-800 dark:text-white">Bandaranaike Intl Airport</h4>
                    <span class="text-xs font-medium text-gray-400">$20 (Taxi)</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">Pickup SIM card and currency exchange.</p>
                </div>
              </div>
              <!-- Timeline Item -->
              <div class="bg-gray-50 dark:bg-[#251814] rounded-lg border border-gray-100 dark:border-neutral-800 p-3 flex gap-4 shadow-sm">
                <div class="text-center min-w-[60px] flex flex-col justify-center border-r border-gray-200 dark:border-neutral-700 pr-4 py-1">
                  <span class="text-xs font-bold text-gray-400">02:00 PM</span>
                  <span class="text-[10px] text-gray-400">Activity</span>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between">
                    <h4 class="text-base font-semibold text-neutral-800 dark:text-white">Gangaramaya Temple</h4>
                    <span class="text-xs font-medium text-gray-400">$5 Entry</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">Visit one of the most important temples in Colombo.</p>
                </div>
              </div>
            </div>
            
            <!-- Day 2 - CTA to open Trip Builder -->
            <div class="relative pl-8 border-l-2 border-gray-200 dark:border-neutral-700">
              <div class="absolute -left-[9px] top-0 size-4 bg-white dark:bg-surface-dark rounded-full border-4 border-gray-300 dark:border-neutral-600"></div>
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Day 2: Kandy Express</h3>
                  <p class="text-sm text-gray-500">Tuesday, Nov 13</p>
                </div>
              </div>
              <!-- Empty State with CTA -->
              <NuxtLink 
                to="/trip-builder"
                class="block border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-lg p-8 text-center bg-gray-50/50 dark:bg-neutral-900/30 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group"
              >
                <div class="bg-white dark:bg-surface-dark p-3 rounded-full mb-3 shadow-sm inline-block group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-primary text-3xl">add_location_alt</span>
                </div>
                <h5 class="text-neutral-900 dark:text-white font-semibold">Start planning Day 2</h5>
                <p class="text-sm text-gray-500 mt-1 max-w-xs mx-auto">Click to open the Trip Builder and start planning your custom itinerary.</p>
                <span class="mt-4 inline-block text-sm font-bold text-primary group-hover:underline">Open Trip Builder →</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()

const searchQuery = ref('')
const activeCategory = ref('all')

const categories = [
  { id: 'all', label: 'All' },
  { id: 'beaches', label: 'Beaches' },
  { id: 'culture', label: 'Culture' },
  { id: 'nature', label: 'Nature' }
]

const suggestedItems = [
  { 
    name: 'Nine Arch Bridge', 
    location: 'Ella', 
    type: 'Sightseeing', 
    duration: '2 hrs',
    image: '/images/downloaded_3a8fa6a7d1ee.avif'
  },
  { 
    name: 'Yala Safari', 
    location: 'Yala', 
    type: 'Wildlife', 
    duration: '4 hrs',
    image: '/images/downloaded_70a4d73e03d3.avif'
  },
  { 
    name: 'Galle Fort Walk', 
    location: 'Galle', 
    type: 'History', 
    duration: '3 hrs',
    image: '/images/downloaded_4718d233d0ed.avif'
  }
]

function goToTripBuilder() {
  router.push('/trip-builder')
}
</script>
