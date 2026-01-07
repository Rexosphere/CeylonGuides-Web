<template>
  <div class="flex flex-col gap-12">
    <!-- Main Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <!-- Left Column: Context & Controls -->
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <h3 class="text-weather-primary font-bold text-sm tracking-widest uppercase">Climate Overview</h3>
          <h2 class="text-[32px] md:text-[40px] font-bold leading-tight text-weather-text-main dark:text-white">
            {{ currentMonsoon === 'yala' ? 'South-West Monsoon (Yala)' : 'North-East Monsoon (Maha)' }}
          </h2>
        </div>

        <!-- Monsoon Toggle -->
        <div class="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl flex relative">
          <div 
            class="absolute inset-y-1.5 w-1/2 rounded-lg bg-white dark:bg-gray-700 shadow-sm transition-all duration-300 ease-out"
            :class="currentMonsoon === 'yala' ? 'left-1.5' : 'left-[calc(50%-6px)] translate-x-full'"
          ></div>
          <button 
            @click="setMonsoon('yala')"
            class="relative z-10 w-1/2 py-2 text-sm font-bold transition-colors duration-300"
            :class="currentMonsoon === 'yala' ? 'text-weather-primary' : 'text-weather-text-muted'"
          >
            ☀️ Yala Season (May–Sep)
          </button>
          <button 
            @click="setMonsoon('maha')"
            class="relative z-10 w-1/2 py-2 text-sm font-bold transition-colors duration-300"
            :class="currentMonsoon === 'maha' ? 'text-weather-primary' : 'text-weather-text-muted'"
          >
            🌧️ Maha Season (Dec–Mar)
          </button>
        </div>

        <!-- Dynamic Description with transition -->
        <Transition name="fade" mode="out-in">
          <div :key="currentMonsoon" class="min-h-[100px]">
            <p class="text-weather-text-muted dark:text-gray-300 text-lg leading-relaxed">
              {{ monsoonDescription }}
            </p>
          </div>
        </Transition>
        
        <!-- Wind Direction Indicator -->
        <div class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <span class="text-2xl">{{ currentMonsoon === 'yala' ? '🌊' : '💨' }}</span>
          <div>
            <p class="font-bold text-sm text-blue-700 dark:text-blue-300">
              {{ currentMonsoon === 'yala' ? 'South-West winds bring rain' : 'North-East winds bring rain' }}
            </p>
            <p class="text-xs text-blue-600/70 dark:text-blue-400/70">
              {{ currentMonsoon === 'yala' ? 'Affecting West & Hill Country' : 'Affecting East & North' }}
            </p>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="flex gap-6">
          <div class="flex items-center gap-2 text-sm font-bold text-weather-text-main dark:text-gray-200">
            <span class="w-3 h-3 rounded-full bg-orange-400 shadow-sm shadow-orange-400/50 animate-pulse"></span> Best Time
          </div>
          <div class="flex items-center gap-2 text-sm font-medium text-weather-text-muted dark:text-gray-400">
            <span class="w-3 h-3 rounded-full bg-blue-400/50"></span> Rainy Season
          </div>
        </div>
      </div>
      
      <!-- Right Column: Map with Wind Overlay -->
      <div class="relative">
        <WeatherRadarMap />
        
        <!-- Animated Wind Arrows Overlay -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
          <Transition name="fade" mode="out-in">
            <div :key="currentMonsoon" class="absolute inset-0">
              <!-- Yala: SW to NE arrows -->
              <template v-if="currentMonsoon === 'yala'">
                <div class="wind-arrow wind-arrow-sw-ne" style="top: 20%; left: 10%;"></div>
                <div class="wind-arrow wind-arrow-sw-ne" style="top: 40%; left: 15%; animation-delay: 0.5s;"></div>
                <div class="wind-arrow wind-arrow-sw-ne" style="top: 60%; left: 20%; animation-delay: 1s;"></div>
              </template>
              <!-- Maha: NE to SW arrows -->
              <template v-else>
                <div class="wind-arrow wind-arrow-ne-sw" style="top: 15%; right: 15%;"></div>
                <div class="wind-arrow wind-arrow-ne-sw" style="top: 35%; right: 20%; animation-delay: 0.5s;"></div>
                <div class="wind-arrow wind-arrow-ne-sw" style="top: 55%; right: 10%; animation-delay: 1s;"></div>
              </template>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Best Regions Recommendation Cards -->
    <div class="mt-4">
      <h4 class="text-sm font-bold text-weather-text-muted mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined text-weather-primary">recommend</span>
        Best Regions During {{ currentMonsoon === 'yala' ? 'Yala' : 'Maha' }} Season
      </h4>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Transition name="slide-fade" mode="out-in">
          <div :key="currentMonsoon" class="contents">
            <button
              v-for="rec in currentRecommendations"
              :key="rec.region"
              @click="selectRegion(rec.regionKey)"
              class="group p-4 bg-gradient-to-br rounded-xl border-2 transition-all hover:scale-[1.02] text-left"
              :class="rec.isPrimary 
                ? 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-300 dark:border-orange-700 shadow-lg shadow-orange-200/50 dark:shadow-orange-900/30 animate-pulse-slow' 
                : 'from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700'"
            >
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">{{ rec.icon }}</span>
                <div>
                  <h5 class="font-bold text-weather-text-main dark:text-white">{{ rec.region }}</h5>
                  <span class="text-xs px-2 py-0.5 rounded-full" :class="rec.isPrimary ? 'bg-orange-200 text-orange-700 dark:bg-orange-800 dark:text-orange-200' : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'">
                    {{ rec.label }}
                  </span>
                </div>
              </div>
              <p class="text-sm text-weather-text-muted">{{ rec.description }}</p>
              <div class="mt-3 flex flex-wrap gap-1">
                <span 
                  v-for="dest in rec.destinations" 
                  :key="dest"
                  class="text-xs px-2 py-0.5 bg-white/80 dark:bg-gray-700 rounded-full text-weather-text-muted"
                >
                  {{ dest }}
                </span>
              </div>
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWeather } from '../../composables/useWeather'
import WeatherRadarMap from './WeatherRadarMap.vue'

const { selectedRegionKey } = useWeather()

type Monsoon = 'yala' | 'maha'
const currentMonsoon = ref<Monsoon>('maha') // Default to Maha (Jan is Maha)

const setMonsoon = (monsoon: Monsoon) => {
    currentMonsoon.value = monsoon
}

const selectRegion = (regionKey: string) => {
    selectedRegionKey.value = regionKey
}

const monsoonDescription = computed(() => {
    if (currentMonsoon.value === 'yala') {
        return "During Yala (May–September), the South-West monsoon drenches the western and southern coasts. The East Coast and Cultural Triangle enjoy their best weather—perfect for Trincomalee's beaches and Sigiriya's ancient ruins."
    } else {
        return "During Maha (December–March), the North-East monsoon reverses the pattern. The South and West Coasts bask in sunshine—ideal for whale watching in Mirissa, exploring Galle's fort, or relaxing in Colombo."
    }
})

interface Recommendation {
    region: string
    regionKey: string
    icon: string
    label: string
    description: string
    destinations: string[]
    isPrimary: boolean
}

const currentRecommendations = computed<Recommendation[]>(() => {
    if (currentMonsoon.value === 'yala') {
        return [
            {
                region: 'East Coast',
                regionKey: 'east',
                icon: '🏖️',
                label: 'Peak Season',
                description: 'Calm seas, perfect visibility for diving and snorkeling.',
                destinations: ['Trincomalee', 'Arugam Bay', 'Pasikudah'],
                isPrimary: true
            },
            {
                region: 'Cultural Triangle',
                regionKey: 'cultural_triangle',
                icon: '🏛️',
                label: 'Dry & Clear',
                description: 'Explore ancient ruins without the rain.',
                destinations: ['Sigiriya', 'Polonnaruwa', 'Anuradhapura'],
                isPrimary: true
            },
            {
                region: 'Northern',
                regionKey: 'northern',
                icon: '🌴',
                label: 'Hot & Sunny',
                description: 'Discover untouched beaches and Tamil culture.',
                destinations: ['Jaffna', 'Delft Island', 'Mannar'],
                isPrimary: false
            }
        ]
    } else {
        return [
            {
                region: 'West & South Coast',
                regionKey: 'west_south',
                icon: '🐋',
                label: 'Peak Season',
                description: 'Best for whale watching and beach relaxation.',
                destinations: ['Mirissa', 'Unawatuna', 'Hikkaduwa'],
                isPrimary: true
            },
            {
                region: 'Hill Country',
                regionKey: 'hill_country',
                icon: '🍃',
                label: 'Cool & Pleasant',
                description: 'Perfect for tea plantations and scenic trains.',
                destinations: ['Ella', 'Nuwara Eliya', 'Kandy'],
                isPrimary: true
            },
            {
                region: 'Galle & South',
                regionKey: 'west_south',
                icon: '🏰',
                label: 'Sunny Days',
                description: 'Explore the historic fort and coastal towns.',
                destinations: ['Galle', 'Weligama', 'Tangalle'],
                isPrimary: false
            }
        ]
    }
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

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Animated Wind Arrows */
.wind-arrow {
  position: absolute;
  width: 60px;
  height: 20px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.6));
  border-radius: 10px;
  animation: drift 3s infinite ease-in-out;
}

.wind-arrow::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  border-left: 12px solid rgba(59, 130, 246, 0.6);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

.wind-arrow-sw-ne {
  transform: rotate(-45deg);
}

.wind-arrow-ne-sw {
  transform: rotate(135deg);
}

@keyframes drift {
  0%, 100% {
    opacity: 0.3;
    transform: rotate(-45deg) translateX(0);
  }
  50% {
    opacity: 0.8;
    transform: rotate(-45deg) translateX(30px);
  }
}

.wind-arrow-ne-sw {
  animation-name: drift-reverse;
}

@keyframes drift-reverse {
  0%, 100% {
    opacity: 0.3;
    transform: rotate(135deg) translateX(0);
  }
  50% {
    opacity: 0.8;
    transform: rotate(135deg) translateX(30px);
  }
}

/* Slow pulse for primary cards */
.animate-pulse-slow {
  animation: pulse-slow 2s infinite;
}

@keyframes pulse-slow {
  0%, 100% {
    box-shadow: 0 10px 25px -5px rgba(251, 146, 60, 0.3);
  }
  50% {
    box-shadow: 0 15px 35px -5px rgba(251, 146, 60, 0.5);
  }
}
</style>
