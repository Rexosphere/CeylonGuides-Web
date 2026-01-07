<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
          <!-- Header -->
          <div class="bg-gradient-to-r from-weather-primary to-orange-400 p-6 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold">Plan Your Trip</h2>
                <p class="text-white/80 text-sm mt-1">Based on your weather preferences</p>
              </div>
              <button 
                @click="close"
                class="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
          
          <!-- Selection Summary -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-4 mb-4">
              <div class="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p class="text-xs text-weather-text-muted mb-1">Selected Region</p>
                <p class="font-bold text-weather-text-main dark:text-white flex items-center gap-2">
                  <span class="material-symbols-outlined text-weather-primary">location_on</span>
                  {{ regionLabel }}
                </p>
              </div>
              <div class="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p class="text-xs text-weather-text-muted mb-1">Selected Month</p>
                <p class="font-bold text-weather-text-main dark:text-white flex items-center gap-2">
                  <span class="material-symbols-outlined text-weather-primary">calendar_month</span>
                  {{ monthName }}
                </p>
              </div>
            </div>
            
            <!-- Season Status -->
            <div class="p-3 rounded-lg" :class="statusClass">
              <div class="flex items-center gap-2">
                <span class="text-xl">{{ statusEmoji }}</span>
                <div>
                  <p class="font-bold text-sm">{{ seasonalInfo.label }}</p>
                  <p class="text-xs opacity-80">{{ seasonalInfo.tip }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Suggested Date Range -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="font-bold text-sm text-weather-text-muted mb-3 flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">date_range</span>
              Suggested 7-Day Window
            </h3>
            
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {{ suggestedDateRange.start }} – {{ suggestedDateRange.end }}
                  </p>
                  <p class="text-sm text-blue-600/70 dark:text-blue-400/70 mt-1">
                    {{ suggestedDateRange.year }} • 7 nights
                  </p>
                </div>
                <div class="text-4xl">📅</div>
              </div>
            </div>
            
            <p class="text-xs text-weather-text-muted mt-3">
              * Dates are based on typical weather patterns. Always check forecasts closer to travel.
            </p>
          </div>
          
          <!-- Actions -->
          <div class="p-6 flex flex-col gap-3">
            <button 
              @click="addToTripBuilder"
              class="w-full py-3 px-4 bg-weather-primary hover:bg-weather-primary/90 text-white font-bold rounded-xl shadow-lg shadow-weather-primary/20 transition-all flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">add_circle</span>
              Add to Trip Builder
            </button>
            
            <button
              @click="close"
              class="w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-weather-text-main dark:text-white font-medium rounded-xl transition-all"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { regions, getSeasonalInfo } from '../../utils/weatherConfig'

const props = defineProps<{
  isOpen: boolean
  regionKey: string
  monthIndex: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const regionLabel = computed(() => {
  const region = regions.find(r => r.key === props.regionKey)
  return region?.label || 'All Regions'
})

const monthName = computed(() => months[props.monthIndex] || 'January')

const seasonalInfo = computed(() => {
  return getSeasonalInfo(props.regionKey, props.monthIndex)
})

const statusClass = computed(() => {
  switch (seasonalInfo.value.condition) {
    case 'peak': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
    case 'good': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
    case 'mixed': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
    case 'monsoon': return 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
    default: return 'bg-gray-100'
  }
})

const statusEmoji = computed(() => {
  switch (seasonalInfo.value.condition) {
    case 'peak': return '☀️'
    case 'good': return '⛅'
    case 'mixed': return '🌦️'
    case 'monsoon': return '🌧️'
    default: return '🌤️'
  }
})

// Calculate suggested date range (next occurrence of selected month)
const suggestedDateRange = computed(() => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  
  // Determine target year (this year if month is ahead, next year if behind)
  let targetYear = currentYear
  if (props.monthIndex < currentMonth) {
    targetYear = currentYear + 1
  } else if (props.monthIndex === currentMonth && now.getDate() > 15) {
    targetYear = currentYear + 1
  }
  
  // Suggest middle of the month as optimal
  const startDay = 10
  const endDay = 17
  
  const startDate = new Date(targetYear, props.monthIndex, startDay)
  const endDate = new Date(targetYear, props.monthIndex, endDay)
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
  
  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
    year: targetYear.toString(),
    startDate,
    endDate
  }
})

function close() {
  emit('close')
}

function addToTripBuilder() {
  // Navigate to trip builder with query params
  router.push({
    path: '/trip-builder',
    query: {
      region: props.regionKey,
      month: props.monthIndex.toString(),
      start: suggestedDateRange.value.startDate.toISOString().split('T')[0],
      end: suggestedDateRange.value.endDate.toISOString().split('T')[0]
    }
  })
  close()
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}

@keyframes scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
