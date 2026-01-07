<template>
  <div class="bg-white dark:bg-weather-surface-dark rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-gray-800 w-full transition-all duration-300">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <h2 class="text-2xl md:text-3xl font-bold mb-3 text-weather-text-main dark:text-white">Interactive Planner</h2>
      <p class="text-weather-text-muted">Tap a month to see what to expect and find the perfect window for your trip.</p>
    </div>

    <!-- Recommendations Strip (Dynamic) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      <div 
        v-for="rec in currentRecommendations" 
        :key="rec.regionKey"
        @click="selectRecommendation(rec)"
        class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600 cursor-pointer hover:shadow-md hover:border-weather-primary/30 transition-all group"
      >
        <div class="flex justify-between items-start mb-2">
            <div>
                <span class="text-xs font-bold uppercase tracking-wider text-weather-primary mb-1 block">Best Right Now</span>
                <h3 class="font-bold text-lg text-weather-text-main dark:text-white group-hover:text-weather-primary transition-colors">
                    {{ getRegionLabel(rec.regionKey) }}
                </h3>
            </div>
            <span class="material-symbols-outlined text-weather-primary group-hover:scale-110 transition-transform">arrow_forward</span>
        </div>
        <p class="text-sm text-weather-text-muted dark:text-gray-300 mb-3 line-clamp-2">{{ rec.reason }}</p>
        <div class="flex flex-wrap gap-2">
            <span v-for="dest in rec.destinations" :key="dest" class="text-[10px] font-bold bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-600">
                {{ dest }}
            </span>
        </div>
      </div>
    </div>
    
    <!-- Region Tabs -->
    <div class="flex flex-wrap justify-center gap-2 mb-8" id="planner-tabs">
      <button 
        v-for="region in regions" 
        :key="region.key"
        @click="selectedRegionKey = region.key"
        class="px-5 py-2 rounded-full font-medium text-sm transition-colors shadow-sm"
        :class="selectedRegionKey === region.key 
          ? 'bg-weather-primary text-white' 
          : 'bg-gray-100 dark:bg-gray-800 text-weather-text-muted hover:bg-gray-200 dark:hover:bg-gray-700'"
      >
        {{ region.label }}
      </button>
    </div>

    <!-- Month Grid Visualization -->
    <div class="overflow-x-auto pb-4 no-scrollbar">
      <div class="min-w-[800px] grid grid-cols-12 gap-1 text-center">
        <!-- Interactive Months Header -->
        <button 
            v-for="(month, index) in months" 
            :key="month" 
            @click="selectMonth(index)"
            class="text-xs font-bold uppercase tracking-wider mb-2 py-2 rounded-lg transition-all border-2"
            :class="selectedMonth === index 
                ? 'border-weather-primary text-weather-primary bg-weather-primary/5' 
                : 'border-transparent text-weather-text-muted hover:bg-gray-50 dark:hover:bg-gray-700'"
        >
            {{ month }}
        </button>
        
        <!-- Row 1: South Coast -->
        <div class="col-span-12 flex items-center gap-4 mt-2 mb-1 transition-opacity duration-300" :class="{ 'opacity-30': selectedRegionKey !== 'all' && selectedRegionKey !== 'west_south' }">
          <span class="text-sm font-bold w-32 text-left shrink-0 text-weather-text-main dark:text-white">South Coast</span>
          <div class="grid grid-cols-12 gap-1 w-full h-8">
            <div class="col-span-3 bg-weather-primary rounded-md flex items-center justify-center text-[10px] text-white font-bold" title="Peak Season">Peak</div>
            <div class="col-span-1 bg-[#f45c2566] rounded-md" title="Shoulder"></div>
            <div class="col-span-5 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-[10px] text-gray-500 font-medium" title="Monsoon">Monsoon</div>
            <div class="col-span-1 bg-[#f45c2566] rounded-md" title="Shoulder"></div>
            <div class="col-span-2 bg-weather-primary rounded-md flex items-center justify-center text-[10px] text-white font-bold">Peak</div>
          </div>
        </div>
        
        <!-- Row 2: East Coast -->
        <div class="col-span-12 flex items-center gap-4 mt-2 mb-1 transition-opacity duration-300" :class="{ 'opacity-30': selectedRegionKey !== 'all' && selectedRegionKey !== 'east' }">
          <span class="text-sm font-bold w-32 text-left shrink-0 text-weather-text-main dark:text-white">East Coast</span>
          <div class="grid grid-cols-12 gap-1 w-full h-8">
            <div class="col-span-2 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-[10px] text-gray-500 font-medium">Rain</div>
            <div class="col-span-2 bg-[#f45c2566] rounded-md"></div>
            <div class="col-span-5 bg-weather-primary rounded-md flex items-center justify-center text-[10px] text-white font-bold">Best Time</div>
            <div class="col-span-1 bg-[#f45c2566] rounded-md"></div>
            <div class="col-span-2 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-[10px] text-gray-500 font-medium">Rain</div>
          </div>
        </div>
        
        <!-- Row 3: Hill Country -->
        <div class="col-span-12 flex items-center gap-4 mt-2 mb-1 transition-opacity duration-300" :class="{ 'opacity-30': selectedRegionKey !== 'all' && selectedRegionKey !== 'hill_country' }">
          <span class="text-sm font-bold w-32 text-left shrink-0 text-weather-text-main dark:text-white">Hill Country</span>
          <div class="grid grid-cols-12 gap-1 w-full h-8">
            <div class="col-span-3 bg-weather-primary rounded-md flex items-center justify-center text-[10px] text-white font-bold">Dry</div>
            <div class="col-span-6 bg-[#f45c2566] rounded-md flex items-center justify-center text-[10px] text-weather-text-main">Changeable</div>
            <div class="col-span-3 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-[10px] text-gray-500 font-medium">Wet</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Summary & Planning Widget -->
    <div class="mt-8 border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col items-center">
        
        <!-- Summary Banner -->
        <div class="w-full max-w-3xl bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-6">
            <div class="flex flex-col md:flex-row items-center gap-6 mb-4">
                <div class="p-4 rounded-full" :class="statusColorClass">
                    <span class="material-symbols-outlined text-2xl">{{ statusIcon }}</span>
                </div>
                <div class="flex-1 text-center md:text-left">
                    <h3 class="font-bold text-lg mb-1">
                        {{ months[selectedMonth] }}: <span :class="textColorClass">{{ seasonalInfo.label }}</span>
                    </h3>
                    <p class="text-weather-text-muted text-sm">{{ seasonalInfo.tip }}</p>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex gap-2">
                    <button 
                        @click="openPlanModal"
                        class="shrink-0 bg-weather-primary hover:bg-weather-primary/90 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-weather-primary/20 transition-all flex items-center gap-2"
                    >
                        <span class="material-symbols-outlined text-sm">travel_explore</span>
                        <span>Plan with These Conditions</span>
                    </button>
                </div>
            </div>
            
            <!-- Suggested Destinations for selected month -->
            <div v-if="currentRecommendations.length > 0" class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h4 class="text-sm font-bold text-weather-text-muted mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined text-lg">travel_explore</span>
                    Best destinations in {{ months[selectedMonth] }}:
                </h4>
                <div class="flex flex-wrap gap-2">
                    <span 
                        v-for="dest in currentRecommendations[0]?.destinations" 
                        :key="dest"
                        class="px-3 py-1 bg-weather-primary/10 text-weather-primary text-sm font-medium rounded-full"
                    >
                        {{ dest }}
                    </span>
                </div>
            </div>
        </div>

        <p class="text-xs text-weather-text-muted">Click above to get suggested dates for {{ activeRegionConfig?.label || 'this region' }}.</p>
    </div>
    
    <!-- Plan Modal -->
    <WeatherPlanModal 
        :isOpen="isModalOpen" 
        :regionKey="selectedRegionKey" 
        :monthIndex="selectedMonth" 
        @close="closeModal" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { regions, getSeasonalInfo, getMonthlyRecommendations, type SeasonalInfo, type Recommendation } from '../../utils/weatherConfig'
import { useWeather } from '../../composables/useWeather'
import WeatherPlanModal from './WeatherPlanModal.vue'

const { selectedRegionKey, selectedRegionConfig } = useWeather()

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Initialize to current month by default
const selectedMonth = ref<number>(new Date().getMonth())

// Modal state
const isModalOpen = ref(false)

function openPlanModal() {
    isModalOpen.value = true
}

function closeModal() {
    isModalOpen.value = false
}

// Recommendations Logic - uses selectedMonth instead of hardcoded current month
const currentRecommendations = computed(() => {
    return getMonthlyRecommendations(selectedMonth.value)
})

const getRegionLabel = (key: string) => regions.find(r => r.key === key)?.label || key

const selectRecommendation = (rec: Recommendation) => {
    // Select region
    selectedRegionKey.value = rec.regionKey
    
    // Auto-select current month to show details
    const currentMonth = new Date().getMonth()
    selectedMonth.value = currentMonth

    // Scroll to details
    const el = document.getElementById('planner-tabs')
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

const selectMonth = (index: number) => {
    selectedMonth.value = index
}

const activeRegionConfig = computed(() => selectedRegionConfig.value || regions[0])

const seasonalInfo = computed<SeasonalInfo>(() => {
    return getSeasonalInfo(selectedRegionKey.value, selectedMonth.value)
})

const statusColorClass = computed(() => {
    switch(seasonalInfo.value.condition) {
        case 'peak': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
        case 'good': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        case 'mixed': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
        case 'monsoon': return 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
        default: return 'bg-gray-100'
    }
})

const textColorClass = computed(() => {
    switch(seasonalInfo.value.condition) {
        case 'peak': return 'text-green-600 dark:text-green-400'
        case 'good': return 'text-blue-600 dark:text-blue-400'
        case 'mixed': return 'text-orange-500 dark:text-orange-400'
        case 'monsoon': return 'text-gray-500'
        default: return 'text-gray-800'
    }
})

const statusIcon = computed(() => {
    switch(seasonalInfo.value.condition) {
        case 'peak': return 'wb_sunny'
        case 'good': return 'thumb_up'
        case 'mixed': return 'partly_cloudy_day'
        case 'monsoon': return 'rainy'
        default: return 'info'
    }
})

</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
