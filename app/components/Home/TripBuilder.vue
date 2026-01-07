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
    
    <!-- Builder UI Preview - Live Data -->
    <div class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-gray-200 dark:border-neutral-800 overflow-hidden min-h-[600px] flex flex-col">
      <!-- Toolbar -->
      <div class="bg-gray-50 dark:bg-[#251814] p-4 border-b border-gray-200 dark:border-neutral-700 flex flex-wrap gap-4 items-center justify-between">
        <div class="flex items-center gap-4 flex-wrap">
          <div class="flex items-center gap-2 bg-white dark:bg-surface-dark px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700">
            <span class="material-symbols-outlined text-gray-400">calendar_month</span>
            <span class="text-sm font-medium dark:text-white text-text-main">
              {{ formattedDateRange }}
            </span>
          </div>
          <div class="flex items-center gap-2 bg-white dark:bg-surface-dark px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700">
            <span class="material-symbols-outlined text-gray-400">group</span>
            <span class="text-sm font-medium dark:text-white text-text-main">{{ tripState.travelersCount }} Travelers</span>
          </div>
          <div class="flex items-center gap-2 bg-white dark:bg-surface-dark px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700">
            <span class="material-symbols-outlined text-gray-400">schedule</span>
            <span class="text-sm font-medium dark:text-white text-text-main">{{ tripDuration }} Days</span>
          </div>
        </div>
        <!-- Budget Estimator Widget -->
        <div class="flex items-center gap-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900 px-4 py-2 rounded-lg">
          <span class="material-symbols-outlined text-green-700 dark:text-green-500">attach_money</span>
          <div class="flex flex-col">
            <span class="text-[10px] text-green-700 dark:text-green-500 font-bold uppercase tracking-wider">Est. Budget</span>
            <span class="text-sm font-bold text-green-800 dark:text-green-400">${{ totalCost.toLocaleString() }} USD</span>
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
              @click="() => addSuggestedItem(item)"
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
                  <span class="material-symbols-outlined text-gray-300 group-hover:text-primary text-sm">add_circle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Main Timeline Area -->
        <div class="flex-1 p-6 bg-white dark:bg-surface-dark overflow-y-auto">
          <div class="max-w-3xl mx-auto space-y-8">
            <!-- Empty State -->
            <div v-if="tripState.days.length === 0" class="text-center py-16">
              <div class="bg-gray-50 dark:bg-neutral-800 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span class="material-symbols-outlined text-4xl text-gray-400">map</span>
              </div>
              <h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2">No trip planned yet</h3>
              <p class="text-gray-500 mb-6 max-w-md mx-auto">Start planning your Sri Lankan adventure by selecting dates in the hero section or opening the full Trip Builder.</p>
              <NuxtLink 
                to="/trip-builder" 
                class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                <span class="material-symbols-outlined">add</span>
                Start Planning
              </NuxtLink>
            </div>
            
            <!-- Days with Activities -->
            <div 
              v-for="(day, dayIndex) in tripState.days.slice(0, 3)" 
              :key="day.id" 
              class="relative pl-8 border-l-2"
              :class="day.activities.length > 0 ? 'border-primary/30' : 'border-gray-200 dark:border-neutral-700'"
            >
              <div 
                class="absolute -left-[9px] top-0 size-4 rounded-full border-4 border-white dark:border-surface-dark"
                :class="day.activities.length > 0 ? 'bg-primary' : 'bg-gray-300 dark:bg-neutral-600'"
              ></div>
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-bold text-neutral-900 dark:text-white">{{ day.title || `Day ${dayIndex + 1}` }}</h3>
                  <p class="text-sm text-gray-500">{{ getDayDate(dayIndex) }}</p>
                </div>
                <span 
                  v-if="day.activities.length > 0"
                  class="text-xs bg-primary/10 text-primary font-medium px-2 py-1 rounded"
                >
                  {{ day.activities.length }} {{ day.activities.length === 1 ? 'activity' : 'activities' }}
                </span>
              </div>
              
              <!-- Activities -->
              <div v-if="day.activities.length > 0" class="space-y-3">
                <div 
                  v-for="activity in day.activities" 
                  :key="activity.id"
                  class="bg-gray-50 dark:bg-[#251814] rounded-lg border border-gray-100 dark:border-neutral-800 p-3 flex gap-4 shadow-sm group"
                >
                  <div class="text-center min-w-[60px] flex flex-col justify-center border-r border-gray-200 dark:border-neutral-700 pr-4 py-1">
                    <span class="text-xs font-bold text-gray-400">{{ formatTime(activity.startTimeMinutes) }}</span>
                    <span class="text-[10px] text-gray-400">{{ activity.durationMinutes }}min</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between">
                      <h4 class="text-base font-semibold text-neutral-800 dark:text-white">{{ activity.name }}</h4>
                      <div class="flex items-center gap-2">
                        <span v-if="activity.cost.value" class="text-xs font-medium text-gray-400">${{ activity.cost.value }}</span>
                        <button 
                          @click.stop="removeActivityFromDay(dayIndex, activity.id)"
                          class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
                        >
                          <span class="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">{{ activity.destination }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Empty Day CTA -->
              <NuxtLink 
                v-else
                to="/trip-builder"
                class="block border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-lg p-6 text-center bg-gray-50/50 dark:bg-neutral-900/30 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group"
              >
                <span class="material-symbols-outlined text-primary text-2xl mb-2">add_location_alt</span>
                <p class="text-sm text-gray-500">Click to add activities to {{ day.title || `Day ${dayIndex + 1}` }}</p>
              </NuxtLink>
            </div>
            
            <!-- More Days Indicator -->
            <div v-if="tripState.days.length > 3" class="text-center py-4">
              <NuxtLink 
                to="/trip-builder" 
                class="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                <span class="material-symbols-outlined text-sm">more_horiz</span>
                View all {{ tripState.days.length }} days in Trip Builder
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTripStore } from '~/composables/useTripBuilder'

const router = useRouter()

// Get shared trip state
const { 
  tripState, 
  tripDuration, 
  totalCost, 
  addActivity,
  removeActivity 
} = useTripStore()

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
    durationMinutes: 120,
    image: '/images/downloaded_3a8fa6a7d1ee.avif',
    cost: 0
  },
  { 
    name: 'Yala Safari', 
    location: 'Yala', 
    type: 'Wildlife', 
    duration: '4 hrs',
    durationMinutes: 240,
    image: '/images/downloaded_70a4d73e03d3.avif',
    cost: 45
  },
  { 
    name: 'Galle Fort Walk', 
    location: 'Galle', 
    type: 'History', 
    duration: '3 hrs',
    durationMinutes: 180,
    image: '/images/downloaded_4718d233d0ed.avif',
    cost: 0
  }
]

// Computed date range
const formattedDateRange = computed(() => {
  if (tripState.startDate && tripState.endDate) {
    const start = new Date(tripState.startDate)
    const end = new Date(tripState.endDate)
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
  }
  return 'Select dates above'
})

// Get formatted date for a day
function getDayDate(dayIndex: number): string {
  if (!tripState.startDate) return ''
  const date = new Date(tripState.startDate)
  date.setDate(date.getDate() + dayIndex)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

// Format time from minutes
function formatTime(minutes: number | null): string {
  if (minutes === null) return '--:--'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`
}

// Add suggested item to first day
function addSuggestedItem(item: typeof suggestedItems[0]) {
  if (tripState.days.length === 0) {
    // If no days, go to trip builder
    router.push('/trip-builder')
    return
  }
  
  // Add to first day with no activities, or last day
  const targetDayIndex = tripState.days.findIndex(d => d.activities.length === 0)
  const dayIndex = targetDayIndex >= 0 ? targetDayIndex : 0
  
  addActivity(dayIndex, {
    name: item.name,
    destination: item.location,
    category: item.type.toLowerCase(),
    durationMinutes: item.durationMinutes,
    startTimeMinutes: null, // Will be assigned in trip builder
    cost: { value: item.cost > 0 ? item.cost : null, type: 'perPerson', currency: 'USD' },
    source: 'library'
  })
}

// Remove activity from day
function removeActivityFromDay(dayIndex: number, activityId: string) {
  removeActivity(dayIndex, activityId)
}

function goToTripBuilder() {
  router.push('/trip-builder')
}
</script>
