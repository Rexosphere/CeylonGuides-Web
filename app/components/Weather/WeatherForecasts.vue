<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-end justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
      <h2 class="text-2xl md:text-3xl font-bold text-weather-text-main dark:text-white">Current Regional Weather</h2>
      <button 
        @click="loadWeather" 
        :disabled="isLoading"
        class="text-weather-primary text-sm font-bold hover:underline flex items-center gap-1 disabled:opacity-50"
      >
        <span v-if="isLoading" class="animate-spin">⟳</span>
        <span v-else class="material-symbols-outlined text-base">refresh</span>
        {{ isLoading ? 'Updating...' : 'Refresh' }}
      </button>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading && Object.keys(weatherData).length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div v-for="i in 4" :key="i" class="bg-weather-surface-light dark:bg-weather-surface-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800 animate-pulse">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-4"></div>
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-4"></div>
        <div class="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
    
    <!-- Weather Cards -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div 
        v-for="district in districtInfo" 
        :key="district.name" 
        class="bg-weather-surface-light dark:bg-weather-surface-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-lg text-weather-text-main dark:text-white">{{ district.name }}</h3>
            <p class="text-xs text-weather-text-muted">{{ district.region }}</p>
          </div>
          <span class="text-3xl">{{ getWeatherIcon(weatherData[district.name]?.description) }}</span>
        </div>
        
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-bold text-weather-text-main dark:text-white">
            {{ weatherData[district.name]?.temperature ?? '--' }}°
          </span>
          <span class="text-sm text-weather-text-muted">
            {{ weatherData[district.name]?.description || 'Loading...' }}
          </span>
        </div>
        
        <div class="h-px w-full bg-gray-100 dark:bg-gray-800"></div>
        
        <div class="grid grid-cols-2 gap-2 text-sm text-weather-text-muted">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-base">water_drop</span>
            <span>{{ weatherData[district.name]?.humidity ?? '--' }}%</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-base">air</span>
            <span>{{ weatherData[district.name]?.windSpeed ?? '--' }} km/h</span>
          </div>
        </div>
        
        <div class="text-xs text-weather-text-muted text-right">
          Updated: {{ weatherData[district.name]?.lastUpdated || '—' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// District coordinates
const districtInfo = [
  { name: 'Colombo', region: 'West Coast', lat: 6.9271, lng: 79.8612 },
  { name: 'Kandy', region: 'Central Hills', lat: 7.2906, lng: 80.6337 },
  { name: 'Galle', region: 'South Coast', lat: 6.0535, lng: 80.2210 },
  { name: 'Jaffna', region: 'Northern', lat: 9.6615, lng: 80.0255 }
]

interface WeatherInfo {
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  lastUpdated: string
}

const weatherData = ref<Record<string, WeatherInfo>>({})
const isLoading = ref(true)

// Get weather icon based on description
function getWeatherIcon(description?: string): string {
  if (!description) return '🌡️'
  const desc = description.toLowerCase()
  if (desc.includes('rain') || desc.includes('shower')) return '🌧️'
  if (desc.includes('thunder') || desc.includes('storm')) return '⛈️'
  if (desc.includes('cloud') || desc.includes('overcast')) return '☁️'
  if (desc.includes('sun') || desc.includes('clear')) return '☀️'
  if (desc.includes('mist') || desc.includes('fog')) return '🌫️'
  if (desc.includes('wind')) return '💨'
  return '🌤️'
}

async function loadWeather() {
  isLoading.value = true
  
  // Load weather for all districts in parallel
  const promises = districtInfo.map(async (district) => {
    try {
      const response = await $fetch<{
        success: boolean
        data: {
          current?: {
            temperature?: number
            description?: string
            humidity?: number
            wind_speed?: number
          }
          // Also support flat structure
          temperature?: number
          condition?: string
          humidity?: number
          wind_speed?: number
        }
      }>(`${apiBase}/api/safety/weather/current`, {
        params: { lat: district.lat, lng: district.lng }
      })
      
      // Handle both nested (data.current) and flat (data) response structures
      const current = response.data?.current || response.data
      if (response.success && current) {
        weatherData.value[district.name] = {
          temperature: current.temperature ?? 28,
          // Handle both 'description' and 'condition' field names
          description: (current as any).description || (current as any).condition || 'Partly cloudy',
          humidity: current.humidity ?? 75,
          windSpeed: current.wind_speed ?? 12,
          lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      } else {
        // API returned no current data
        setFallbackWeather(district.name)
      }
    } catch (error) {
      console.error(`Weather fetch failed for ${district.name}:`, error)
      setFallbackWeather(district.name)
    }
  })
  
  await Promise.all(promises)
  isLoading.value = false
}

function setFallbackWeather(districtName: string) {
  // Realistic fallback data for Sri Lanka
  const fallbacks: Record<string, Partial<WeatherInfo>> = {
    'Colombo': { temperature: 31, description: 'Partly cloudy', humidity: 78, windSpeed: 15 },
    'Kandy': { temperature: 26, description: 'Overcast', humidity: 82, windSpeed: 8 },
    'Galle': { temperature: 29, description: 'Sunny', humidity: 75, windSpeed: 12 },
    'Jaffna': { temperature: 32, description: 'Hot and humid', humidity: 70, windSpeed: 18 }
  }
  
  weatherData.value[districtName] = {
    temperature: fallbacks[districtName]?.temperature ?? 28,
    description: fallbacks[districtName]?.description ?? 'Data unavailable',
    humidity: fallbacks[districtName]?.humidity ?? 0,
    windSpeed: fallbacks[districtName]?.windSpeed ?? 0,
    lastUpdated: 'Offline'
  }
}

onMounted(loadWeather)
</script>
