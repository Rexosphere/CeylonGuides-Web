<template>
  <div class="bg-white dark:bg-weather-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-weather-primary">calendar_month</span>
        <h3 class="font-bold text-lg text-weather-text-main dark:text-white">7-Day Snapshot</h3>
        
        <!-- City Selector -->
        <div class="relative">
          <select 
            v-model="selectedCityId"
            @change="onCityChange"
            class="appearance-none bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-weather-text-main dark:text-white cursor-pointer hover:border-weather-primary transition-colors focus:outline-none focus:ring-2 focus:ring-weather-primary/50"
          >
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
          <span class="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-weather-text-muted pointer-events-none text-sm">expand_more</span>
        </div>
      </div>
      
      <button 
        @click="refreshForecast" 
        class="text-weather-text-muted hover:text-weather-primary transition-colors flex items-center gap-1 text-sm"
        :class="{ 'animate-spin': isLoading }"
      >
        <span class="material-symbols-outlined">refresh</span>
        <span class="hidden sm:inline">Refresh</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && !forecast.length" class="flex justify-center py-8">
      <div class="w-8 h-8 border-4 border-weather-primary border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8 text-red-500 dark:text-red-400">
      <span class="material-symbols-outlined text-3xl mb-2">cloud_off</span>
      <p class="text-sm">{{ error }}</p>
    </div>

    <!-- Forecast Strip -->
    <div v-else class="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      <button
        v-for="(day, index) in forecast"
        :key="day.date"
        @click="selectDay(index)"
        class="flex-shrink-0 w-24 p-3 rounded-xl border-2 transition-all text-center hover:border-weather-primary/50"
        :class="selectedDayIndex === index 
          ? 'border-weather-primary bg-weather-primary/10' 
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'"
      >
        <div class="text-xs font-medium text-weather-text-muted mb-1">
          {{ index === 0 ? 'Today' : getDayLabel(day.date) }}
        </div>
        <div class="text-2xl mb-1">{{ getWeatherEmoji(day.weatherCode) }}</div>
        <div class="text-sm font-bold text-weather-text-main dark:text-white">
          {{ Math.round(day.maxTemp) }}° / {{ Math.round(day.minTemp) }}°
        </div>
        <div v-if="day.precipProbability > 0" class="text-xs text-blue-500 mt-1 flex items-center justify-center gap-1">
          <span class="material-symbols-outlined text-sm">water_drop</span>
          {{ day.precipProbability }}%
        </div>
      </button>
    </div>

    <!-- Day Details Tooltip -->
    <Transition name="fade">
      <div 
        v-if="selectedDay" 
        class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-4 mb-3">
          <span class="text-3xl">{{ getWeatherEmoji(selectedDay.weatherCode) }}</span>
          <div>
            <h4 class="font-bold text-weather-text-main dark:text-white">
              {{ selectedDayIndex === 0 ? 'Today' : getFullDayLabel(selectedDay.date) }}
            </h4>
            <p class="text-sm text-weather-text-muted">{{ getWeatherDescription(selectedDay.weatherCode) }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-red-400">device_thermostat</span>
            <span><strong>High:</strong> {{ Math.round(selectedDay.maxTemp) }}°</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-400">ac_unit</span>
            <span><strong>Low:</strong> {{ Math.round(selectedDay.minTemp) }}°</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-cyan-400">air</span>
            <span><strong>Wind:</strong> {{ Math.round(selectedDay.windSpeed) }} km/h</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-purple-400">humidity_percentage</span>
            <span><strong>Humidity:</strong> {{ selectedDay.humidity }}%</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useWeather } from '../../composables/useWeather'
import { cities, regions } from '../../utils/weatherConfig'

const { selectedRegionKey, temperatureUnit, getDisplayTemp } = useWeather()

// Types
interface DayForecast {
  date: string
  weatherCode: number
  minTemp: number
  maxTemp: number
  precipProbability: number
  windSpeed: number
  humidity: number
}

// State
const forecast = ref<DayForecast[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const selectedDayIndex = ref(0)
const cacheTime = ref(0)
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

// City selection - defaults to Colombo or region primary
const selectedCityId = ref<string>('colombo')

// Get selected city object
const selectedCity = computed(() => {
  return cities.find(c => c.id === selectedCityId.value) || cities[0]
})

const selectedCityName = computed(() => selectedCity.value?.name || 'Colombo')

function onCityChange() {
  cacheTime.value = 0 // Invalidate cache
  fetchForecast()
}

const selectedDay = computed(() => forecast.value[selectedDayIndex.value] || null)

// Fetch forecast from Open-Meteo
async function fetchForecast() {
  const city = selectedCity.value
  if (!city) return
  
  // Check cache
  const now = Date.now()
  if (forecast.value.length > 0 && (now - cacheTime.value) < CACHE_DURATION) {
    return
  }
  
  isLoading.value = true
  error.value = null
  
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max,relative_humidity_2m_mean&timezone=auto&forecast_days=7`
    
    const response = await $fetch<{
      daily: {
        time: string[]
        weathercode: number[]
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        precipitation_probability_max: number[]
        windspeed_10m_max: number[]
        relative_humidity_2m_mean: number[]
      }
    }>(url)
    
    forecast.value = response.daily.time.map((date, i) => ({
      date,
      weatherCode: response.daily.weathercode[i] ?? 0,
      minTemp: response.daily.temperature_2m_min[i] ?? 0,
      maxTemp: response.daily.temperature_2m_max[i] ?? 0,
      precipProbability: response.daily.precipitation_probability_max[i] ?? 0,
      windSpeed: response.daily.windspeed_10m_max[i] ?? 0,
      humidity: response.daily.relative_humidity_2m_mean[i] ?? 0
    }))
    
    cacheTime.value = now
    selectedDayIndex.value = 0
  } catch (e) {
    console.error('Forecast fetch error:', e)
    error.value = 'Failed to load forecast'
  } finally {
    isLoading.value = false
  }
}

function refreshForecast() {
  cacheTime.value = 0 // Invalidate cache
  fetchForecast()
}

function selectDay(index: number) {
  selectedDayIndex.value = index
}

function getDayLabel(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

function getFullDayLabel(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

// WMO Weather interpretation codes
function getWeatherEmoji(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code >= 45 && code <= 48) return '🌫️'
  if (code >= 51 && code <= 55) return '🌦️'
  if (code >= 56 && code <= 57) return '🌨️'
  if (code >= 61 && code <= 65) return '🌧️'
  if (code >= 66 && code <= 67) return '🌨️'
  if (code >= 71 && code <= 77) return '❄️'
  if (code >= 80 && code <= 82) return '🌧️'
  if (code >= 85 && code <= 86) return '🌨️'
  if (code >= 95 && code <= 99) return '⛈️'
  return '🌤️'
}

function getWeatherDescription(code: number): string {
  if (code === 0) return 'Clear sky'
  if (code === 1) return 'Mainly clear'
  if (code === 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if (code >= 45 && code <= 48) return 'Fog'
  if (code >= 51 && code <= 55) return 'Drizzle'
  if (code >= 61 && code <= 65) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 80 && code <= 82) return 'Rain showers'
  if (code >= 95 && code <= 99) return 'Thunderstorm'
  return 'Partly cloudy'
}

// Watch for region changes
watch(selectedRegionKey, () => {
  cacheTime.value = 0 // Invalidate cache when region changes
  fetchForecast()
})

onMounted(() => {
  fetchForecast()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
