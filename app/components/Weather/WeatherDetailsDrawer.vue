<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { City } from '~/utils/weatherConfig'
import { useWeather } from '~/composables/useWeather'

const props = defineProps<{
  isOpen: boolean
  city: City | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { getDisplayTemp, temperatureUnit } = useWeather()

interface HourlyData {
  time: string
  tempC: number
  weatherCode: number
  conditionText: string
}

interface DetailedWeather {
  current: {
    feelsLikeC: number
    humidity: number
    windKmh: number
  }
  hourly: HourlyData[]
}

const loading = ref(false)
const error = ref<string | null>(null)
const details = ref<DetailedWeather | null>(null)

// Function to fetch details
const fetchDetails = async () => {
  if (!props.city) return
  
  loading.value = true
  error.value = null
  
  try {
    const data = await $fetch<DetailedWeather>('/api/weather/hourly', {
      params: {
        lat: props.city.lat,
        lon: props.city.lon
      }
    })
    details.value = data
  } catch (e) {
    error.value = 'Failed to load detailed forecast'
  } finally {
    loading.value = false
  }
}

// Watch for changes to open/city
watch(() => [props.isOpen, props.city], ([isOpen, newCity]) => {
  if (isOpen && newCity) {
    fetchDetails()
  } else if (!isOpen) {
    // Optional: clear data on close? Or keep for cache-like feel?
    // details.value = null 
  }
})

function formatTime(isoString: string) {
  return new Date(isoString).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
}

function getWeatherIcon(code: number): string {
    // Simple mapping, can be expanded or shared
    if (code === 0 || code === 1) return '☀️'
    if (code === 2 || code === 3) return '☁️'
    if ([45, 48].includes(code)) return '🌫️'
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️'
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️'
    if ([95, 96, 99].includes(code)) return '⛈️'
    return '🌥️'
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
        
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="emit('close')"></div>
        
        <!-- Drawer -->
        <div class="relative w-full max-w-sm h-full bg-surface-light dark:bg-surface-dark shadow-2xl flex flex-col transform transition-transform duration-300 ease-out sm:rounded-l-2xl overflow-hidden bg-white dark:bg-gray-900 text-weather-text-main dark:text-white">
          
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
             <div class="flex flex-col">
                <span class="text-xs font-bold text-weather-text-muted uppercase tracking-wider">Weather Details</span>
                <h2 class="text-xl font-bold">{{ city?.name }}</h2>
             </div>
             <button @click="emit('close')" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
               <span class="material-symbols-outlined">close</span>
             </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
            
            <div v-if="loading" class="flex flex-col gap-4 animate-pulse">
               <div class="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
               <div class="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </div>

            <div v-else-if="error" class="flex flex-col items-center justify-center flex-1 text-center">
              <span class="material-symbols-outlined text-4xl text-gray-300 mb-2">cloud_off</span>
              <p class="text-sm text-red-500">{{ error }}</p>
              <button @click="fetchDetails" class="mt-4 text-xs font-bold text-weather-primary hover:underline">Try Again</button>
            </div>

            <template v-else-if="details">
               <!-- Current Stats Grid -->
               <div class="grid grid-cols-2 gap-4">
                  <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                     <span class="text-xs text-weather-text-muted mb-1">Feels Like</span>
                     <span class="text-2xl font-bold text-weather-primary">
                        {{ getDisplayTemp(details.current.feelsLikeC) }}°
                     </span>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                     <span class="text-xs text-weather-text-muted mb-1">Humidity</span>
                     <span class="text-2xl font-bold text-blue-500">
                        {{ details.current.humidity }}%
                     </span>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl flex flex-col items-center justify-center text-center col-span-2">
                     <span class="text-xs text-weather-text-muted mb-1">Wind Speed</span>
                     <span class="text-2xl font-bold text-weather-text-main dark:text-gray-200">
                        {{ details.current.windKmh }} <span class="text-sm font-normal text-weather-text-muted">km/h</span>
                     </span>
                  </div>
               </div>

               <!-- Hourly Forecast -->
               <div class="flex flex-col gap-3">
                  <h3 class="font-bold text-sm">24-Hour Forecast</h3>
                  <div class="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                     <div v-for="hour in details.hourly" :key="hour.time" class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                        <span class="text-sm font-medium w-20">{{ formatTime(hour.time) }}</span>
                        <span class="text-xl">{{ getWeatherIcon(hour.weatherCode) }}</span>
                        <div class="flex items-center gap-1 w-16 justify-end">
                            <span class="font-bold">{{ getDisplayTemp(hour.tempC) }}°</span>
                        </div>
                     </div>
                  </div>
               </div>
            </template>

          </div>

          <!-- Footer/CTA -->
          <div class="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-surface-dark mt-auto">
             <NuxtLink 
               :to="`/trip-builder?region=${props.city?.id}`"
               class="flex items-center justify-center gap-2 w-full bg-weather-primary hover:bg-weather-primary/90 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-weather-primary/20"
             >
               <span>Plan a trip to {{ props.city?.name }}</span>
               <span class="material-symbols-outlined text-sm">arrow_forward</span>
             </NuxtLink>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide animation logic handled by simple opacity for now or could add slide classes */
</style>
