<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-end justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
      <h2 class="text-2xl md:text-3xl font-bold text-weather-text-main dark:text-white">Current Regional Weather</h2>
      <button class="text-weather-primary text-sm font-bold hover:underline flex items-center gap-1">
        View Full Forecast <span class="material-symbols-outlined text-base">arrow_forward</span>
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <div v-for="city in cities" :key="city.name" class="bg-weather-surface-light dark:bg-weather-surface-dark p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-lg text-weather-text-main dark:text-white">{{ city.name }}</h3>
            <p class="text-xs text-weather-text-muted">{{ city.region }}</p>
          </div>
          <span class="material-symbols-outlined text-3xl" :class="city.iconClass">{{ city.icon }}</span>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-bold text-weather-text-main dark:text-white">{{ city.temp }}°</span>
          <span class="text-sm text-weather-text-muted">{{ city.condition }}</span>
        </div>
        <div class="h-px w-full bg-gray-100 dark:bg-gray-800"></div>
        <div class="flex justify-between text-xs text-weather-text-muted">
          <div v-for="day in city.forecast" :key="day.day" class="flex flex-col items-center gap-1">
            <span>{{ day.day }}</span>
            <span class="material-symbols-outlined text-base">{{ day.icon }}</span>
            <span>{{ day.temp }}°</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// Fetch weather from API
const { data: weatherResponse } = await useFetch<{
  success: boolean
  data: {
    temperature?: number
    condition?: string
    humidity?: number
    wind_speed?: number
  }
}>(`${apiBase}/api/safety/weather/current`)

// Default city data with API weather for Colombo
const cities = computed(() => {
  const apiWeather = weatherResponse.value?.data
  return [
    {
      name: 'Colombo',
      region: 'West Coast',
      icon: apiWeather?.condition?.toLowerCase().includes('sunny') ? 'wb_sunny' : 'partly_cloudy_day',
      iconClass: 'text-weather-primary',
      temp: apiWeather?.temperature || 31,
      condition: apiWeather?.condition || 'Partly Cloudy',
      forecast: [
        { day: 'Mon', icon: 'wb_sunny', temp: (apiWeather?.temperature || 31) },
        { day: 'Tue', icon: 'partly_cloudy_day', temp: (apiWeather?.temperature || 31) - 1 },
        { day: 'Wed', icon: 'rainy', temp: (apiWeather?.temperature || 31) - 3 }
      ]
    },
    {
      name: 'Kandy',
      region: 'Central Hills',
      icon: 'cloud',
      iconClass: 'text-blue-500',
      temp: 24,
      condition: 'Overcast',
      forecast: [
        { day: 'Mon', icon: 'cloud', temp: 24 },
        { day: 'Tue', icon: 'rainy', temp: 23 },
        { day: 'Wed', icon: 'thunderstorm', temp: 22 }
      ]
    },
    {
      name: 'Galle',
      region: 'South Coast',
      icon: 'wb_sunny',
      iconClass: 'text-weather-primary',
      temp: 29,
      condition: 'Sunny',
      forecast: [
        { day: 'Mon', icon: 'wb_sunny', temp: 29 },
        { day: 'Tue', icon: 'wb_sunny', temp: 30 },
        { day: 'Wed', icon: 'partly_cloudy_day', temp: 29 }
      ]
    },
    {
      name: 'Nuwara Eliya',
      region: 'Highlands',
      icon: 'air',
      iconClass: 'text-gray-400',
      temp: 16,
      condition: 'Misty',
      forecast: [
        { day: 'Mon', icon: 'foggy', temp: 15 },
        { day: 'Tue', icon: 'rainy', temp: 14 },
        { day: 'Wed', icon: 'cloud', temp: 15 }
      ]
    }
  ]
})
</script>
