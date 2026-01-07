<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { regions } from '../../utils/weatherConfig'
import { useWeather } from '../../composables/useWeather'

import WeatherDetailsDrawer from './WeatherDetailsDrawer.vue'
import type { City } from '../../utils/weatherConfig'

const { 
    cityWeatherMap, lastUpdatedAt, init, refreshAll, refreshCity, 
    selectedRegionKey, displayedCities,
    temperatureUnit, toggleUnit, autoRefreshEnabled, toggleAutoRefresh, getDisplayTemp 
} = useWeather()

const activeCity = ref<City | null>(null)

const openDrawer = (city: City) => {
    activeCity.value = city
}

// Refresh Throttling
const isThrottled = ref(false)
const handleRefreshAll = async () => {
    if (isThrottled.value) return
    isThrottled.value = true
    await refreshAll()
    setTimeout(() => {
        isThrottled.value = false
    }, 10000)
}

// local isLoading for the refresh button visual state (global)
// or we can compute checks
const isAnyLoading = computed(() => Object.values(cityWeatherMap.value).some(s => s.loading))

// Get weather icon based on description
function getWeatherIcon(description?: string): string {
  if (!description) return '🌡️'
  const desc = description.toLowerCase()
  if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️'
  if (desc.includes('thunder') || desc.includes('storm')) return '⛈️'
  if (desc.includes('cloud') || desc.includes('overcast')) return '☁️'
  if (desc.includes('sun') || desc.includes('clear') || desc.includes('mainly clear')) return '☀️'
  if (desc.includes('mist') || desc.includes('fog')) return '🌫️'
  if (desc.includes('snow') || desc.includes('ice')) return '❄️'
  return '🌤️'
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-6">
      <div class="flex items-end justify-between border-b border-gray-200 dark:border-gray-800 pb-4 flex-wrap gap-4">
        <h2 class="text-2xl md:text-3xl font-bold text-weather-text-main dark:text-white">Current Regional Weather</h2>
        
        <!-- Control Panel -->
        <div class="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
          
          <!-- Last Updated -->
          <span v-if="lastUpdatedAt" class="text-xs text-weather-text-muted px-2 border-r border-gray-200 dark:border-gray-700">
             Updated: {{ lastUpdatedAt }}
          </span>

          <!-- Unit Toggle -->
          <button 
            @click="toggleUnit" 
            class="text-xs font-bold px-2 py-1 rounded transition-colors"
            :class="temperatureUnit === 'C' ? 'bg-weather-primary text-white' : 'text-weather-text-muted hover:bg-gray-200 dark:hover:bg-gray-700'"
          >
            °C
          </button>
          <button 
            @click="toggleUnit" 
            class="text-xs font-bold px-2 py-1 rounded transition-colors -ml-2"
            :class="temperatureUnit === 'F' ? 'bg-weather-primary text-white' : 'text-weather-text-muted hover:bg-gray-200 dark:hover:bg-gray-700'"
          >
            °F
          </button>

          <!-- Auto Refresh -->
          <button 
            @click="toggleAutoRefresh"
            class="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded transition-colors"
            :class="autoRefreshEnabled ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'text-weather-text-muted hover:bg-gray-200 dark:hover:bg-gray-700'"
            title="Auto-refresh every 30m"
          >
            <span class="material-symbols-outlined text-[14px]">{{ autoRefreshEnabled ? 'timer' : 'timer_off' }}</span>
            <span class="hidden sm:inline">Auto</span>
          </button>

          <!-- Manual Refresh -->
          <button 
            @click="handleRefreshAll" 
            :disabled="isAnyLoading || isThrottled"
            class="text-weather-primary text-xs font-bold hover:bg-white dark:hover:bg-gray-700 px-2 py-1 rounded flex items-center gap-1 disabled:opacity-50 transition-all shadow-sm"
          >
            <span v-if="isAnyLoading" class="animate-spin">⟳</span>
            <span v-else class="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>
      </div>

      <!-- Region Selector -->
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="region in regions" 
          :key="region.key"
          @click="selectedRegionKey = region.key"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors border"
          :class="selectedRegionKey === region.key 
            ? 'bg-weather-primary text-white border-weather-primary' 
            : 'bg-white dark:bg-gray-800 text-weather-text-muted border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
        >
          {{ region.label }}
        </button>
      </div>
    </div>
    
    <!-- Weather Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
      <div 
        v-for="city in displayedCities" 
        :key="city.id" 
        @click="openDrawer(city)"
        class="bg-weather-surface-light dark:bg-weather-surface-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden min-h-[180px] flex flex-col justify-between cursor-pointer group"
      >
        <!-- 1. Skeleton State (Loading & No Data) -->
        <div v-if="!cityWeatherMap[city.id]?.data && cityWeatherMap[city.id]?.loading" class="animate-pulse flex flex-col gap-4 h-full">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div class="flex justify-between items-end">
                <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
            </div>
            <div class="h-px w-full bg-gray-100 dark:bg-gray-800"></div>
            <div class="grid grid-cols-2 gap-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
        </div>

        <!-- 2. Error State (Error & No Data) -->
        <div v-else-if="!cityWeatherMap[city.id]?.data && cityWeatherMap[city.id]?.error" class="flex flex-col items-center justify-center h-full text-center gap-3">
             <div class="bg-red-50 dark:bg-red-900/20 p-2 rounded-full text-red-500">
                <span class="material-symbols-outlined text-xl">cloud_off</span>
             </div>
             <div>
                <h3 class="font-bold text-gray-900 dark:text-white">{{ city.name }}</h3>
                <p class="text-xs text-red-500">Unable to load weather</p>
             </div>
             <button 
                @click.stop="refreshCity(city.id)" 
                class="text-xs bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white px-3 py-1.5 rounded-full font-medium transition-colors"
                :disabled="cityWeatherMap[city.id]?.loading"
             >
                {{ cityWeatherMap[city.id]?.loading ? 'Retrying...' : 'Retry' }}
             </button>
        </div>

        <!-- 3. Content State (Has Data) -->
        <template v-else>
            <!-- Stale / Error Indicators (Overlay) -->
            <div v-if="cityWeatherMap[city.id]?.error && cityWeatherMap[city.id]?.data" class="absolute top-0 left-0 w-full bg-red-500/10 text-red-500 text-[10px] text-center font-bold">
               Update Failed
            </div>
            <div v-else-if="cityWeatherMap[city.id]?.stale" class="absolute top-0 left-0 w-full bg-orange-500/10 text-orange-500 text-[10px] text-center font-bold">
               Cached Data
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-bold text-lg text-weather-text-main dark:text-white">{{ city.name }}</h3>
                    <p class="text-xs text-weather-text-muted">{{ city.displayLabel }}</p>
                  </div>
                  <div class="flex flex-col items-end gap-1">
                     <span class="text-3xl">{{ getWeatherIcon(cityWeatherMap[city.id]?.data?.conditionText) }}</span>

                     <!-- Retry Button if Error and we have old data -->
                     <button 
                        v-if="cityWeatherMap[city.id]?.error"
                        @click.stop="refreshCity(city.id)" 
                        class="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded hover:bg-red-100 flex items-center gap-1"
                        :disabled="cityWeatherMap[city.id]?.loading"
                     >
                        <span v-if="cityWeatherMap[city.id]?.loading" class="animate-spin w-3 h-3 border-2 border-red-600/50 border-t-red-600 rounded-full"></span>
                        <span v-else class="material-symbols-outlined text-[14px]">refresh</span>
                        Retry
                     </button>
                     
                     <!-- Standard Refresh -->
                     <button 
                        v-else
                        @click.stop="refreshCity(city.id)" 
                        class="text-xs text-weather-primary mt-1 opacity-50 hover:opacity-100" 
                        :disabled="cityWeatherMap[city.id]?.loading"
                     >
                        <span v-if="cityWeatherMap[city.id]?.loading" class="animate-spin inline-block">⟳</span>
                        <span v-else>↻</span>
                     </button>
                  </div>
                </div>
                
                <div class="flex items-baseline gap-2">
                  <span class="text-4xl font-bold text-weather-text-main dark:text-white">
                    {{ getDisplayTemp(cityWeatherMap[city.id]?.data?.temperatureC) }}°
                  </span>
                  <span class="text-lg font-medium text-weather-text-muted self-start mt-2">
                    {{ temperatureUnit }}
                  </span>
                  <span class="text-sm text-weather-text-muted ml-auto">
                    {{ cityWeatherMap[city.id]?.data?.conditionText || 'Unknown' }}
                  </span>
                </div>
            </div>
            
            <div class="flex flex-col gap-2">
                <div class="h-px w-full bg-gray-100 dark:bg-gray-800"></div>
                
                <div class="grid grid-cols-2 gap-2 text-sm text-weather-text-muted">
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-base">water_drop</span>
                    <span>{{ cityWeatherMap[city.id]?.data?.humidityPercent ?? '--' }}%</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-base">air</span>
                    <span>{{ cityWeatherMap[city.id]?.data?.windKmh ?? '--' }} km/h</span>
                  </div>
                </div>
                
                <div class="text-xs text-weather-text-muted text-right">
                  Updated: {{ cityWeatherMap[city.id]?.data?.fetchedAt ? new Date(cityWeatherMap[city.id]?.data?.fetchedAt!).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '—' }}
                </div>
            </div>
        </template>
      </div>
    </div>
  </div>
  <WeatherDetailsDrawer 
    :isOpen="!!activeCity" 
    :city="activeCity" 
    @close="activeCity = null" 
  />
</template>


