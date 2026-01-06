<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display min-h-screen">
    <!-- Header -->
    <header class="bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-neutral-800 px-4 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink to="/explore" class="flex items-center gap-2 text-text-muted hover:text-primary">
            <span class="material-symbols-outlined">arrow_back</span>
            Back to Explore
          </NuxtLink>
          <span class="text-gray-300 dark:text-neutral-700">|</span>
          <h1 class="font-bold text-lg">Trip Builder</h1>
          <span v-if="tripState.metadata.templateId" class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            From: {{ tripState.metadata.templateId }}
          </span>
        </div>
        <div class="flex items-center gap-3">
          <button 
            @click="undo" 
            :disabled="!canUndo"
            :class="canUndo ? 'text-text-muted hover:text-text-main' : 'text-gray-300 cursor-not-allowed'"
            class="px-4 py-2 text-sm font-semibold flex items-center gap-1"
          >
            <span class="material-symbols-outlined text-sm">undo</span>
            Undo
          </button>
          <button 
            @click="redo"
            :disabled="!canRedo"
            :class="canRedo ? 'text-text-muted hover:text-text-main' : 'text-gray-300 cursor-not-allowed'"
            class="px-4 py-2 text-sm font-semibold flex items-center gap-1"
          >
            <span class="material-symbols-outlined text-sm">redo</span>
            Redo
          </button>
          <button @click="resetTrip()" class="px-4 py-2 text-sm font-semibold text-text-muted hover:text-red-500 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">restart_alt</span>
            Reset
          </button>
          <button class="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">save</span>
            Save Trip
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex h-[calc(100vh-73px)]">
      <!-- Sidebar: Activity Library -->
      <aside class="w-80 bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-neutral-800 flex flex-col">
        <div class="p-4 border-b border-gray-200 dark:border-neutral-800">
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">search</span>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search activities..." 
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        <!-- Category Tabs -->
        <div class="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-neutral-800">
          <button 
            v-for="cat in categories" 
            :key="cat.value"
            @click="selectedCategory = cat.value"
            :class="selectedCategory === cat.value ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-neutral-800 text-text-muted'"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Activity List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <div 
            v-for="activity in filteredActivities" 
            :key="activity.id"
            draggable="true"
            @dragstart="onDragStart($event, activity)"
            class="bg-white dark:bg-neutral-900 rounded-lg p-3 border border-gray-200 dark:border-neutral-700 cursor-grab hover:border-primary/50 transition-colors"
          >
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-text-muted">drag_indicator</span>
              <div class="flex-1">
                <p class="font-semibold text-sm">{{ activity.name }}</p>
                <p class="text-xs text-text-muted">{{ activity.location }} • {{ activity.averageDurationHours }}h</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-xs bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded">{{ activity.category }}</span>
                  <span v-if="activity.estimatedCostUSD" class="text-xs text-text-muted">${{ activity.estimatedCostUSD }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main: Day Canvas -->
      <main class="flex-1 p-6 overflow-x-auto bg-gray-50 dark:bg-neutral-950">
        <div class="flex gap-4 min-w-max">
          <!-- Day Columns -->
          <div 
            v-for="(day, idx) in tripState.days" 
            :key="day.id"
            @dragover.prevent
            @drop="onDrop($event, idx)"
            class="w-72 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-800 flex flex-col"
          >
            <!-- Day Header -->
            <div class="p-4 border-b border-gray-200 dark:border-neutral-800">
              <div class="flex items-center justify-between">
                <h3 class="font-bold">{{ day.title || `Day ${idx + 1}` }}</h3>
                <button @click="removeDay(idx)" class="text-text-muted hover:text-red-500">
                  <span class="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
              <p class="text-xs text-text-muted mt-1">{{ day.activities.length }} activities</p>
            </div>

            <!-- Activities -->
            <div class="flex-1 p-4 space-y-3 min-h-[200px]">
              <div 
                v-for="activity in day.activities" 
                :key="activity.id"
                class="bg-white dark:bg-neutral-900 rounded-lg p-3 border border-gray-200 dark:border-neutral-700 group"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <p class="font-semibold text-sm">{{ activity.name }}</p>
                    <p class="text-xs text-text-muted">{{ Math.round(activity.durationMinutes / 60) }}h • ${{ activity.cost.value || 'TBD' }}</p>
                  </div>
                  <button 
                    @click="removeActivity(idx, activity.id)"
                    class="opacity-0 group-hover:opacity-100 text-text-muted hover:text-red-500 transition-opacity"
                  >
                    <span class="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              </div>
              <div v-if="day.activities.length === 0" class="text-center py-8 text-text-muted text-sm border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-lg">
                Drop activities here
              </div>
            </div>
          </div>

          <!-- Add Day Button -->
          <button 
            @click="addDay()"
            class="w-72 min-h-[300px] bg-white dark:bg-neutral-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-neutral-700 flex flex-col items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-colors"
          >
            <span class="material-symbols-outlined text-3xl mb-2">add</span>
            Add Day
          </button>
        </div>
      </main>

      <!-- Right Sidebar: Summary -->
      <aside class="w-72 bg-surface-light dark:bg-surface-dark border-l border-gray-200 dark:border-neutral-800 p-4 flex flex-col">
        <h3 class="font-bold mb-4">Trip Summary</h3>
        
        <div class="space-y-4 flex-1">
          <div>
            <p class="text-xs text-text-muted uppercase mb-1">Trip ID</p>
            <p class="font-mono text-xs">{{ tripState.tripId.slice(0, 8) }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted uppercase mb-1">Duration</p>
            <p class="font-semibold">{{ tripDuration }} Days</p>
          </div>
          <div v-if="tripState.startDate">
            <p class="text-xs text-text-muted uppercase mb-1">Dates</p>
            <p class="font-semibold text-sm">{{ tripState.startDate }} → {{ tripState.endDate }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted uppercase mb-1">Travelers</p>
            <div class="flex items-center gap-2">
              <button @click="setTravelersCount(tripState.travelersCount - 1)" class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-gray-200">-</button>
              <span class="font-semibold w-8 text-center">{{ tripState.travelersCount }}</span>
              <button @click="setTravelersCount(tripState.travelersCount + 1)" class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-gray-200">+</button>
            </div>
          </div>
          <div v-if="tripState.travelStyle">
            <p class="text-xs text-text-muted uppercase mb-1">Style</p>
            <p class="font-semibold capitalize">{{ tripState.travelStyle }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted uppercase mb-1">Total Activities</p>
            <p class="font-semibold">{{ totalActivities }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted uppercase mb-1">Estimated Cost</p>
            <p class="font-semibold text-primary text-lg">${{ totalCost }}</p>
            <p v-if="tripState.costSummary.tbd > 0" class="text-xs text-text-muted">+ {{ tripState.costSummary.tbd }} items TBD</p>
          </div>
        </div>

        <div class="space-y-2 pt-4 border-t border-gray-200 dark:border-neutral-800">
          <button class="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">download</span>
            Export Trip
          </button>
          <button class="w-full py-3 border border-gray-200 dark:border-neutral-700 rounded-lg font-semibold hover:border-primary transition-colors flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">share</span>
            Share Trip
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import itinerariesData from '~/assets/data/itineraries.json'
import { useTripStore } from '~/composables/useTripBuilder'

const route = useRoute()
const { 
  tripState, 
  totalActivities, 
  totalCost, 
  tripDuration,
  canUndo,
  canRedo,
  setDates,
  setTravelersCount,
  addDay, 
  removeDay, 
  addActivity,
  removeActivity,
  loadTemplate,
  undo,
  redo,
  resetTrip,
  initializeDays
} = useTripStore()

const activities = itinerariesData.activitiesLibrary

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Heritage', value: 'heritage' },
  { label: 'Wildlife', value: 'wildlife' },
  { label: 'Scenic', value: 'scenic' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Cultural', value: 'cultural' },
]

const filteredActivities = computed(() => {
  let result = activities
  if (selectedCategory.value !== 'all') {
    result = result.filter(a => a.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(a => a.name.toLowerCase().includes(q) || a.location.toLowerCase().includes(q))
  }
  return result
})

let draggedActivity: typeof activities[0] | null = null

const onDragStart = (event: DragEvent, activity: typeof activities[0]) => {
  draggedActivity = activity
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'copy'
  }
}

const onDrop = (event: DragEvent, dayIndex: number) => {
  if (draggedActivity) {
    addActivity(dayIndex, {
      name: draggedActivity.name,
      destination: draggedActivity.location,
      category: draggedActivity.category,
      durationMinutes: (draggedActivity.averageDurationHours || 1) * 60,
      cost: {
        value: draggedActivity.estimatedCostUSD,
        type: 'estimate',
        currency: 'USD'
      },
      source: 'library'
    })
    draggedActivity = null
  }
}

// Initialize from query params on mount
onMounted(() => {
  const start = route.query.start as string
  const end = route.query.end as string
  const templateSlug = route.query.template as string

  if (start && end) {
    setDates(start, end)
  } else if (templateSlug) {
    const template = itinerariesData.itineraries.find(i => i.slug === templateSlug)
    if (template) {
      loadTemplate(template)
    }
  } else if (tripState.days.length === 0) {
    initializeDays(3)
  }
})

useHead({
  title: 'Trip Builder - CeylonGuide',
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #f45c25;
}
</style>
