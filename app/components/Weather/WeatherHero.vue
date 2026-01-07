<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useWeather } from '../../composables/useWeather'
import { cities } from '~/utils/weatherConfig'

const { cityWeatherMap, primaryCityId, getDisplayTemp, temperatureUnit } = useWeather()

// Hero mode toggle
type HeroMode = 'scenic' | 'radar'
const heroMode = ref<HeroMode>('scenic')

// Find primary city object for name display
const primaryCity = computed(() => cities.find(c => c.id === primaryCityId.value))

// Weather data for primary city
const weather = computed(() => cityWeatherMap.value[primaryCityId.value]?.data)
const isLoading = computed(() => cityWeatherMap.value[primaryCityId.value]?.loading)

function getWeatherIcon(description?: string): string {
    if (!description) return '🌡️'
    const desc = description.toLowerCase()
    if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️'
    if (desc.includes('thunder') || desc.includes('storm')) return '⛈️'
    if (desc.includes('cloud') || desc.includes('overcast')) return '☁️'
    if (desc.includes('sun') || desc.includes('clear')) return '☀️'
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️'
    if (desc.includes('snow') || desc.includes('ice')) return '❄️'
    return '🌤️'
}

function toggleHeroMode() {
    heroMode.value = heroMode.value === 'scenic' ? 'radar' : 'scenic'
}

// Radar map state
const radarMapContainer = ref<HTMLDivElement | null>(null)
let radarMap: any = null
let radarTileLayer: any = null

async function initRadarMap() {
    if (!radarMapContainer.value || radarMap) return
    
    try {
        const L = await import('leaflet').then(m => m.default || m)
        await import('leaflet/dist/leaflet.css')
        
        radarMap = L.map(radarMapContainer.value, {
            center: [7.8731, 80.7718],
            zoom: 7,
            zoomControl: false,
            attributionControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            touchZoom: false
        })
        
        // Use CartoDB dark tiles for dramatic effect
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(radarMap)
        
        // Fetch and add radar overlay
        const rainViewerRes = await $fetch<any>('https://api.rainviewer.com/public/weather-maps.json')
        if (rainViewerRes?.radar?.past?.length > 0) {
            const latestFrame = rainViewerRes.radar.past[rainViewerRes.radar.past.length - 1]
            const tileUrl = `${rainViewerRes.host}${latestFrame.path}/256/{z}/{x}/{y}/2/1_1.png`
            radarTileLayer = L.tileLayer(tileUrl, {
                opacity: 0.6,
                zIndex: 10
            }).addTo(radarMap)
        }
    } catch (e) {
        console.error('Failed to init radar hero map:', e)
    }
}

function destroyRadarMap() {
    if (radarMap) {
        radarMap.remove()
        radarMap = null
        radarTileLayer = null
    }
}

// Watch mode changes
watch(heroMode, async (newMode) => {
    if (newMode === 'radar') {
        await nextTick()
        initRadarMap()
    } else {
        destroyRadarMap()
    }
})

onBeforeUnmount(() => {
    destroyRadarMap()
})
</script>

<template>
  <div class="relative w-full">
    <!-- Hero Mode Toggle Button -->
    <button 
      @click="toggleHeroMode"
      class="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium transition-all flex items-center gap-2 border border-white/20"
    >
      <span class="material-symbols-outlined text-sm">{{ heroMode === 'scenic' ? 'satellite_alt' : 'landscape' }}</span>
      {{ heroMode === 'scenic' ? 'Switch to Live Radar' : 'Switch to Scenic' }}
    </button>
    
    <!-- Scenic Hero Background -->
    <Transition name="fade" mode="out-in">
      <div 
        v-if="heroMode === 'scenic'"
        key="scenic"
        class="flex min-h-[500px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 relative" 
        :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url('/images/downloaded_61761d4e5bd8.avif')` }"
      >
        <div class="flex flex-col gap-3 text-center max-w-3xl z-10">
          <span class="text-white/90 text-sm font-bold tracking-wider uppercase">Planning & Logistics</span>
          <h1 class="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
            When to Explore Ceylon
          </h1>
          <h2 class="text-white/90 text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Navigate the dual monsoons and discover the perfect season for your island getaway.
          </h2>
        </div>
        
        <!-- Live Weather Ticker -->
        <div class="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 py-4 hidden md:flex justify-center transition-all duration-300">
          <div class="flex gap-12 text-white" v-if="weather || isLoading">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined">location_on</span>
              <span class="font-bold">{{ primaryCity?.name || 'Colombo' }}</span>
              <span class="font-light" v-if="weather">{{ getDisplayTemp(weather.temperatureC) }}°{{ temperatureUnit }} {{ weather.conditionText }}</span>
              <span class="font-light animate-pulse" v-else>Loading...</span>
            </div>
            <div class="flex items-center gap-3 opacity-80" v-if="weather">
              <span class="text-xl">{{ getWeatherIcon(weather.conditionText) }}</span>
              <span>Humidity: {{ weather.humidityPercent }}%</span>
            </div>
            <div class="flex items-center gap-3 opacity-80" v-if="weather">
              <span class="material-symbols-outlined">air</span>
              <span>Wind: {{ weather.windKmh }} km/h</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Radar Hero Background -->
      <div 
        v-else
        key="radar"
        class="relative min-h-[500px] flex flex-col items-center justify-center p-4 overflow-hidden"
      >
        <!-- Radar Map Background (Client Only) -->
        <ClientOnly>
          <div 
            ref="radarMapContainer"
            class="absolute inset-0 z-0"
          ></div>
        </ClientOnly>
        
        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-5"></div>
        
        <!-- Blur Effect on Edges -->
        <div class="absolute inset-0 backdrop-blur-[2px] z-5"></div>
        
        <!-- Content -->
        <div class="flex flex-col gap-3 text-center max-w-3xl z-10 relative">
          <div class="flex items-center justify-center gap-2 mb-2">
            <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span class="text-red-400 text-sm font-bold tracking-wider uppercase">Live Weather Radar</span>
          </div>
          <h1 class="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
            When to Explore Ceylon
          </h1>
          <h2 class="text-white/90 text-lg font-medium leading-relaxed max-w-xl mx-auto drop-shadow-md">
            Real-time precipitation data over Sri Lanka. Blue/green = light rain, yellow/red = heavy.
          </h2>
        </div>
        
        <!-- Live Weather Ticker for Radar Mode -->
        <div class="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10 py-4 hidden md:flex justify-center z-10">
          <div class="flex gap-12 text-white" v-if="weather || isLoading">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span class="font-bold">{{ primaryCity?.name || 'Colombo' }}</span>
              <span class="font-light" v-if="weather">{{ getDisplayTemp(weather.temperatureC) }}°{{ temperatureUnit }} {{ weather.conditionText }}</span>
              <span class="font-light animate-pulse" v-else>Loading...</span>
            </div>
            <div class="flex items-center gap-3 opacity-80" v-if="weather">
              <span class="text-xl">{{ getWeatherIcon(weather.conditionText) }}</span>
              <span>Humidity: {{ weather.humidityPercent }}%</span>
            </div>
            <div class="flex items-center gap-3 opacity-80" v-if="weather">
              <span class="material-symbols-outlined">air</span>
              <span>Wind: {{ weather.windKmh }} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ensure Leaflet map fills container */
.leaflet-container {
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
