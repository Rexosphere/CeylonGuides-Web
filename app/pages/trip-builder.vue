<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display min-h-screen">
    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showDeleteConfirm = false">
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
          <h3 class="text-lg font-bold mb-2">Delete Day {{ deleteTarget + 1 }}?</h3>
          <p class="text-text-muted text-sm mb-4">This day has {{ tripState.days[deleteTarget]?.activities.length }} activities. They will be removed.</p>
          <div class="flex gap-3">
            <button @click="showDeleteConfirm = false" class="flex-1 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg font-semibold">Cancel</button>
            <button @click="confirmDelete" class="flex-1 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Time Edit Modal -->
    <Teleport to="body">
      <div v-if="editingTime" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeTimeEdit">
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
          <h3 class="text-lg font-bold mb-4">Edit Time</h3>
          <div class="space-y-4">
            <div>
              <label class="text-xs text-text-muted uppercase mb-1 block">Start Time</label>
              <input 
                v-model="editTimeStart"
                type="time" 
                class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              />
            </div>
            <div>
              <label class="text-xs text-text-muted uppercase mb-1 block">Duration (minutes)</label>
              <input 
                v-model.number="editTimeDuration"
                type="number" 
                min="15"
                step="15"
                class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              />
            </div>
            <div class="text-sm text-text-muted">
              End time: <strong>{{ computeEndTime(editTimeStart, editTimeDuration) }}</strong>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="closeTimeEdit" class="flex-1 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg font-semibold">Cancel</button>
            <button @click="saveTimeEdit" class="flex-1 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90">Save</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Export Modal -->
    <Teleport to="body">
      <div v-if="showExportModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showExportModal = false">
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 max-w-sm mx-4 shadow-2xl w-full">
          <h3 class="text-lg font-bold mb-4">Export Trip</h3>
          <div class="space-y-3">
            <button @click="exportJSON" class="w-full py-3 bg-gray-100 dark:bg-neutral-800 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">data_object</span>
              Download JSON
            </button>
            <button @click="exportPDF" class="w-full py-3 bg-gray-100 dark:bg-neutral-800 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">picture_as_pdf</span>
              Download PDF
            </button>
            <button @click="printTrip" class="w-full py-3 bg-gray-100 dark:bg-neutral-800 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">print</span>
              Print
            </button>
          </div>
          <button @click="showExportModal = false" class="w-full mt-4 py-2 text-text-muted font-semibold">Cancel</button>
        </div>
      </div>
    </Teleport>

    <!-- Share Modal -->
    <Teleport to="body">
      <div v-if="showShareModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showShareModal = false">
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 max-w-md mx-4 shadow-2xl w-full">
          <h3 class="text-lg font-bold mb-4">Share Trip</h3>
          <div class="space-y-4">
            <div>
              <label class="text-xs text-text-muted uppercase mb-1 block">Share URL</label>
              <div class="flex gap-2">
                <input 
                  ref="shareUrlInput"
                  :value="shareUrl" 
                  readonly 
                  class="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
                />
                <button @click="copyShareUrl" class="px-4 py-2 bg-primary text-white rounded-lg font-semibold">
                  {{ copied ? '✓' : 'Copy' }}
                </button>
              </div>
            </div>
            <p class="text-xs text-text-muted">Anyone with this link can view (not edit) your trip plan.</p>
          </div>
          <button @click="showShareModal = false" class="w-full mt-4 py-2 text-text-muted font-semibold">Close</button>
        </div>
      </div>
    </Teleport>

    <!-- Save Success Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="saveMessage" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <span class="material-symbols-outlined">check_circle</span>
          <span>{{ saveMessage }}</span>
        </div>
      </Transition>
    </Teleport>
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="duplicateWarning" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <span class="material-symbols-outlined">warning</span>
          <span>{{ duplicateWarning }}</span>
        </div>
      </Transition>
    </Teleport>

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
          <span v-if="isSaving" class="text-xs text-text-muted">Saving...</span>
          <span v-else-if="lastSaved" class="text-xs text-text-muted">Saved {{ formatTimeAgo(lastSaved) }}</span>
          <button 
            @click="() => saveTrip()"
            :disabled="isSaving"
            class="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-1 disabled:opacity-50"
          >
            <span class="material-symbols-outlined text-sm">{{ isSaving ? 'sync' : 'save' }}</span>
            {{ isSaving ? 'Saving...' : 'Save Trip' }}
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
            @dragstart="onDragStartFromSuggested($event, activity)"
            @dragend="onDragEnd"
            :class="[
              'bg-white dark:bg-neutral-900 rounded-lg p-3 border transition-colors cursor-grab',
              isScheduled(activity.id) 
                ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-200 dark:border-neutral-700 hover:border-primary/50'
            ]"
          >
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-text-muted">drag_indicator</span>
              <div class="flex-1">
                <div class="flex items-start justify-between">
                  <p class="font-semibold text-sm">{{ activity.name }}</p>
                  <span v-if="isScheduled(activity.id)" class="text-xs text-green-600 dark:text-green-400">
                    Day {{ getScheduledDay(activity.id) }}
                  </span>
                </div>
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
            v-for="(day, dayIdx) in tripState.days" 
            :key="day.id"
            class="w-80 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-800 flex flex-col"
          >
            <!-- Day Header -->
            <div class="p-4 border-b border-gray-200 dark:border-neutral-800">
              <div class="flex items-center justify-between mb-1">
                <input 
                  v-model="day.title"
                  @blur="updateDayTitle(dayIdx, day.title || '')"
                  class="font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary/30 rounded px-1 -ml-1 w-28"
                  :placeholder="`Day ${dayIdx + 1}`"
                />
                <div class="flex items-center gap-1">
                  <button @click="moveDayUp(dayIdx)" :disabled="dayIdx === 0" :class="dayIdx === 0 ? 'text-gray-300' : 'text-text-muted hover:text-primary'" class="p-1">
                    <span class="material-symbols-outlined text-sm">arrow_back</span>
                  </button>
                  <button @click="moveDayDown(dayIdx)" :disabled="dayIdx === tripState.days.length - 1" :class="dayIdx === tripState.days.length - 1 ? 'text-gray-300' : 'text-text-muted hover:text-primary'" class="p-1">
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <button @click="handleDeleteDay(dayIdx)" class="p-1 text-text-muted hover:text-red-500">
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
              <div class="flex items-center justify-between mt-1">
                <p class="text-xs text-text-muted">{{ getDayDate(dayIdx) }}</p>
                <!-- Day Subtotal -->
                <div class="flex items-center gap-2">
                  <span v-if="getDaySubtotal(dayIdx).confirmed > 0" class="text-xs font-semibold text-primary">${{ getDaySubtotal(dayIdx).confirmed }}</span>
                  <span v-if="getDaySubtotal(dayIdx).tbd > 0" class="text-xs text-amber-600">+{{ getDaySubtotal(dayIdx).tbd }} TBD</span>
                </div>
              </div>
              <div class="flex items-center justify-between mt-1">
                <p class="text-xs text-text-muted">{{ day.activities.length }} activities</p>
                <!-- Overlap warning -->
                <button 
                  v-if="getDayOverlaps(dayIdx).length > 0"
                  @click="autoFixOverlaps(dayIdx)"
                  class="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded flex items-center gap-1 hover:bg-amber-200"
                >
                  <span class="material-symbols-outlined text-xs">warning</span>
                  {{ getDayOverlaps(dayIdx).length }} overlaps • Fix
                </button>
              </div>
              <!-- Day Overload Warning -->
              <div 
                v-if="isDayOverloaded(dayIdx).overloaded"
                class="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-red-500 text-sm">error</span>
                <span class="text-xs text-red-700 dark:text-red-300">Overloaded day: {{ isDayOverloaded(dayIdx).totalHours }}h (max 12h)</span>
              </div>
            </div>

            <!-- Activities Drop Zone -->
            <div 
              class="flex-1 p-3 space-y-2 min-h-[200px] transition-colors"
              :class="dropTargetDay === dayIdx ? 'bg-primary/10' : ''"
              @dragover="onDragOver($event, dayIdx)"
              @dragleave="onDragLeave"
              @drop="onDrop($event, dayIdx)"
            >
              <template v-for="(activity, actIdx) in day.activities" :key="activity.id">
                <!-- Drop indicator -->
                <div v-if="dropTargetDay === dayIdx && dropTargetPosition === actIdx" class="h-1 bg-primary rounded-full mx-2 animate-pulse"></div>
                
                <!-- Activity Card with Time -->
                <div 
                  draggable="true"
                  @dragstart="onDragStartFromDay($event, dayIdx, activity)"
                  @dragend="onDragEnd"
                  :class="[
                    'bg-white dark:bg-neutral-900 rounded-lg p-3 border group cursor-grab',
                    hasOverlap(dayIdx, activity.id) 
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' 
                      : 'border-gray-200 dark:border-neutral-700'
                  ]"
                >
                  <!-- Time Row -->
                  <div class="flex items-center justify-between mb-2">
                    <button 
                      @click="openTimeEdit(dayIdx, activity)"
                      class="flex items-center gap-1 text-xs bg-gray-100 dark:bg-neutral-800 hover:bg-primary/10 px-2 py-1 rounded transition-colors"
                    >
                      <span class="material-symbols-outlined text-xs">schedule</span>
                      <span v-if="activity.startTimeMinutes !== null">
                        {{ formatTime(activity.startTimeMinutes) }} - {{ formatTime(activity.startTimeMinutes + activity.durationMinutes) }}
                      </span>
                      <span v-else class="text-text-muted">Set time</span>
                    </button>
                    <span class="text-xs text-text-muted">{{ Math.round(activity.durationMinutes / 60) }}h</span>
                  </div>
                  
                  <!-- Content Row -->
                  <div class="flex items-start justify-between">
                    <div class="flex items-start gap-2">
                      <span class="material-symbols-outlined text-text-muted text-sm mt-0.5 opacity-50 group-hover:opacity-100">drag_indicator</span>
                      <div>
                        <p class="font-semibold text-sm">{{ activity.name }}</p>
                        <p class="text-xs text-text-muted">${{ activity.cost.value || 'TBD' }}</p>
                      </div>
                    </div>
                    <button 
                      @click="removeActivity(dayIdx, activity.id)"
                      class="opacity-0 group-hover:opacity-100 text-text-muted hover:text-red-500 transition-opacity"
                    >
                      <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </div>
                
                <!-- Travel Warning (inline between activities) -->
                <div 
                  v-if="getTravelWarningAfter(dayIdx, activity.id)"
                  :class="[
                    'mx-2 px-2 py-1 rounded text-xs flex items-center gap-1',
                    getTravelWarningAfter(dayIdx, activity.id)?.type === 'impossible' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                  ]"
                >
                  <span class="material-symbols-outlined text-xs">directions_car</span>
                  {{ getTravelWarningAfter(dayIdx, activity.id)?.message }}
                </div>
              </template>

              <!-- Drop indicator at end -->
              <div v-if="dropTargetDay === dayIdx && dropTargetPosition === day.activities.length" class="h-1 bg-primary rounded-full mx-2 animate-pulse"></div>

              <!-- Empty state -->
              <div 
                v-if="day.activities.length === 0" 
                :class="[
                  'text-center py-8 text-sm border-2 border-dashed rounded-lg transition-colors',
                  dropTargetDay === dayIdx ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-neutral-700 text-text-muted'
                ]"
              >
                {{ dropTargetDay === dayIdx ? 'Drop here!' : `Start planning Day ${dayIdx + 1}` }}
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
            <p class="font-semibold text-sm">{{ formatDate(tripState.startDate) }} → {{ formatDate(tripState.endDate) }}</p>
          </div>
          <div>
            <p class="text-xs text-text-muted uppercase mb-1">Travelers</p>
            <div class="flex items-center gap-2">
              <button @click="setTravelersCount(tripState.travelersCount - 1)" class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-gray-200">-</button>
              <span class="font-semibold w-8 text-center">{{ tripState.travelersCount }}</span>
              <button @click="setTravelersCount(tripState.travelersCount + 1)" class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-gray-200">+</button>
            </div>
          </div>
          <div>
            <p class="text-xs text-text-muted uppercase mb-1">Total Activities</p>
            <p class="font-semibold">{{ totalActivities }}</p>
          </div>
          
          <!-- Cost Summary -->
          <div class="bg-primary/5 dark:bg-primary/10 rounded-lg p-3 -mx-1">
            <p class="text-xs text-text-muted uppercase mb-2">Trip Budget</p>
            <p class="font-bold text-primary text-2xl mb-1">${{ totalCost }}</p>
            <p v-if="tbdCount > 0" class="text-xs text-amber-600 dark:text-amber-400">{{ tbdCount }} items TBD</p>
          </div>
          
          <!-- Cost Breakdown -->
          <div v-if="totalCost > 0">
            <p class="text-xs text-text-muted uppercase mb-2">Breakdown</p>
            <div class="space-y-2">
              <div v-if="costBreakdown.tickets > 0" class="flex justify-between text-sm">
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span> Tickets</span>
                <span class="font-semibold">${{ costBreakdown.tickets }}</span>
              </div>
              <div v-if="costBreakdown.transport > 0" class="flex justify-between text-sm">
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-500"></span> Transport</span>
                <span class="font-semibold">${{ costBreakdown.transport }}</span>
              </div>
              <div v-if="costBreakdown.tours > 0" class="flex justify-between text-sm">
                <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-purple-500"></span> Tours</span>
                <span class="font-semibold">${{ costBreakdown.tours }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-2 pt-4 border-t border-gray-200 dark:border-neutral-800">
          <button @click="showExportModal = true" class="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">download</span>
            Export Trip
          </button>
          <button @click="generateShareUrl" class="w-full py-3 border border-gray-200 dark:border-neutral-700 rounded-lg font-semibold hover:border-primary transition-colors flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">share</span>
            Share Trip
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import itinerariesData from '~/assets/data/itineraries.json'
import { useTripStore, type Activity } from '~/composables/useTripBuilder'

const route = useRoute()
const { 
  tripState, 
  totalActivities, 
  totalCost,
  tbdCount,
  costBreakdown,
  tripDuration,
  canUndo,
  getDaySubtotal,
  canRedo,
  setDates,
  setTravelersCount,
  addDay, 
  removeDay,
  reorderDay,
  addActivity,
  moveActivity,
  removeActivity,
  updateActivityTime,
  loadTemplate,
  setTemplateCache,
  undo,
  redo,
  resetTrip,
  initializeDays
} = useTripStore()

const activities = itinerariesData.activitiesLibrary

const searchQuery = ref('')
const selectedCategory = ref('all')
const showDeleteConfirm = ref(false)
const deleteTarget = ref(-1)
const duplicateWarning = ref('')

// Time editing
const editingTime = ref(false)
const editDayIdx = ref(-1)
const editActivityId = ref('')
const editTimeStart = ref('09:00')
const editTimeDuration = ref(60)

// Drag state
const dragSource = ref<'suggested' | 'scheduled' | null>(null)
const draggedLibraryActivity = ref<typeof activities[0] | null>(null)
const draggedScheduledActivity = ref<{ dayIndex: number; activity: Activity } | null>(null)
const dropTargetDay = ref<number | null>(null)
const dropTargetPosition = ref<number | null>(null)

// Save/Export state
const showExportModal = ref(false)
const showShareModal = ref(false)
const shareUrl = ref('')
const copied = ref(false)
const isSaving = ref(false)
const lastSaved = ref<Date | null>(null)
const saveMessage = ref('')
const shareUrlInput = ref<HTMLInputElement | null>(null)

// Autosave debounce
let autosaveTimeout: ReturnType<typeof setTimeout> | null = null

const triggerAutosave = () => {
  if (autosaveTimeout) clearTimeout(autosaveTimeout)
  autosaveTimeout = setTimeout(() => {
    saveTrip(true)
  }, 5000) // 5 second debounce
}

// Watch for changes to trigger autosave
watch(() => tripState.metadata.lastModified, () => {
  triggerAutosave()
})

// Save trip to localStorage
const saveTrip = async (isAutosave = false) => {
  if (isSaving.value) return
  
  isSaving.value = true
  
  try {
    // Simulate save delay for UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Save to localStorage
    const tripData = JSON.stringify({
      tripState: {
        tripId: tripState.tripId,
        startDate: tripState.startDate,
        endDate: tripState.endDate,
        travelersCount: tripState.travelersCount,
        travelStyle: tripState.travelStyle,
        days: tripState.days,
        costSummary: tripState.costSummary,
        metadata: tripState.metadata
      },
      savedAt: new Date().toISOString()
    })
    
    localStorage.setItem(`trip_${tripState.tripId}`, tripData)
    
    lastSaved.value = new Date()
    
    if (!isAutosave) {
      saveMessage.value = 'Trip saved!'
      setTimeout(() => { saveMessage.value = '' }, 3000)
    }
  } catch (error) {
    console.error('Save failed:', error)
    saveMessage.value = 'Save failed'
    setTimeout(() => { saveMessage.value = '' }, 3000)
  } finally {
    isSaving.value = false
  }
}

// Format time ago
const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ago`
}

// Export as JSON
const exportJSON = () => {
  const tripData = {
    tripId: tripState.tripId,
    exportedAt: new Date().toISOString(),
    startDate: tripState.startDate,
    endDate: tripState.endDate,
    travelersCount: tripState.travelersCount,
    travelStyle: tripState.travelStyle,
    days: tripState.days.map(day => ({
      title: day.title,
      activities: day.activities.map(a => ({
        name: a.name,
        destination: a.destination,
        startTime: a.startTimeMinutes !== null ? formatTime(a.startTimeMinutes) : null,
        duration: `${Math.round(a.durationMinutes / 60)}h`,
        cost: a.cost.value ? `$${a.cost.value}` : 'TBD'
      }))
    })),
    totalCost: `$${totalCost.value}`
  }
  
  const blob = new Blob([JSON.stringify(tripData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `trip-${tripState.tripId.slice(0, 8)}.json`
  a.click()
  URL.revokeObjectURL(url)
  
  showExportModal.value = false
}

// Export as PDF (using print dialog)
const exportPDF = () => {
  printTrip()
}

// Print trip
const printTrip = () => {
  showExportModal.value = false
  
  // Create printable content
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Trip Plan - ${tripState.tripId.slice(0, 8)}</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { color: #f45c25; margin-bottom: 5px; }
        .meta { color: #666; margin-bottom: 20px; }
        .day { margin-bottom: 30px; page-break-inside: avoid; }
        .day-title { font-size: 18px; font-weight: bold; border-bottom: 2px solid #f45c25; padding-bottom: 5px; margin-bottom: 10px; }
        .activity { padding: 10px; margin-bottom: 8px; background: #f5f5f5; border-radius: 8px; }
        .activity-name { font-weight: bold; }
        .activity-details { color: #666; font-size: 14px; }
        .summary { margin-top: 30px; padding: 15px; background: #fff3ec; border-radius: 8px; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <h1>🌴 Sri Lanka Trip Plan</h1>
      <div class="meta">
        ${tripState.startDate ? `${tripState.startDate} to ${tripState.endDate}` : `${tripDuration.value} Days`} • ${tripState.travelersCount} Travelers
      </div>
      
      ${tripState.days.map((day, idx) => `
        <div class="day">
          <div class="day-title">${day.title || `Day ${idx + 1}`}</div>
          ${day.activities.length > 0 ? day.activities.map(a => `
            <div class="activity">
              <div class="activity-name">${a.name}</div>
              <div class="activity-details">
                ${a.startTimeMinutes !== null ? formatTime(a.startTimeMinutes) + ' - ' + formatTime(a.startTimeMinutes + a.durationMinutes) : ''} 
                • ${Math.round(a.durationMinutes / 60)}h 
                • ${a.cost.value ? '$' + a.cost.value : 'TBD'}
              </div>
            </div>
          `).join('') : '<p style="color: #999;">No activities planned</p>'}
        </div>
      `).join('')}
      
      <div class="summary">
        <strong>Total Estimated Cost:</strong> $${totalCost.value}
        ${tbdCount.value > 0 ? ` <span style="color: #d97706;">(+ ${tbdCount.value} items TBD)</span>` : ''}
      </div>
    </body>
    </html>
  `
  
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.print()
    }
  }
}

// Generate share URL
const generateShareUrl = () => {
  // Create a simplified shareable state
  const shareData = btoa(JSON.stringify({
    id: tripState.tripId,
    s: tripState.startDate,
    e: tripState.endDate,
    t: tripState.travelersCount,
    st: tripState.travelStyle,
    d: tripState.days.map(d => ({
      t: d.title,
      a: d.activities.map(a => ({ n: a.name, d: a.destination }))
    }))
  }))
  
  // Use current URL as base
  const baseUrl = window.location.origin
  shareUrl.value = `${baseUrl}/trip-builder?share=${shareData.slice(0, 100)}`
  
  showShareModal.value = true
  copied.value = false
}

// Copy share URL
const copyShareUrl = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Fallback
    shareUrlInput.value?.select()
    document.execCommand('copy')
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

// Keyboard shortcuts
const handleKeydown = (e: KeyboardEvent) => {
  // Skip if user is typing in an input
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  
  // Ctrl+Z = Undo, Ctrl+Shift+Z or Ctrl+Y = Redo, Ctrl+S = Save
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z' && !e.shiftKey) {
      e.preventDefault()
      if (canUndo.value) undo()
    } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
      e.preventDefault()
      if (canRedo.value) redo()
    } else if (e.key === 's') {
      e.preventDefault()
      saveTrip()
    }
  }
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (autosaveTimeout) clearTimeout(autosaveTimeout)
})

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

// Time helpers
const formatTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

const parseTime = (timeStr: string): number => {
  const parts = timeStr.split(':').map(Number)
  const h = parts[0] ?? 0
  const m = parts[1] ?? 0
  return h * 60 + m
}

const computeEndTime = (startStr: string, duration: number): string => {
  const startMins = parseTime(startStr)
  return formatTime(startMins + duration)
}

// Time editing
const openTimeEdit = (dayIdx: number, activity: Activity) => {
  editDayIdx.value = dayIdx
  editActivityId.value = activity.id
  editTimeStart.value = activity.startTimeMinutes !== null ? formatTime(activity.startTimeMinutes) : '09:00'
  editTimeDuration.value = activity.durationMinutes
  editingTime.value = true
}

const closeTimeEdit = () => {
  editingTime.value = false
}

const saveTimeEdit = () => {
  const startMins = parseTime(editTimeStart.value)
  updateActivityTime(editDayIdx.value, editActivityId.value, startMins, editTimeDuration.value)
  closeTimeEdit()
}

// Get next available start time for a day
const getNextAvailableTime = (dayIdx: number): number => {
  const activities = tripState.days[dayIdx]?.activities || []
  if (activities.length === 0) return 9 * 60 // 9:00 AM
  
  let maxEnd = 9 * 60
  activities.forEach(a => {
    if (a.startTimeMinutes !== null) {
      const end = a.startTimeMinutes + a.durationMinutes
      if (end > maxEnd) maxEnd = end
    }
  })
  return maxEnd
}

// Overlap detection
const getDayOverlaps = (dayIdx: number): string[] => {
  const acts = tripState.days[dayIdx]?.activities || []
  const overlaps: string[] = []
  
  for (let i = 0; i < acts.length; i++) {
    const a = acts[i]
    if (!a || a.startTimeMinutes === null) continue
    const aEnd = a.startTimeMinutes + a.durationMinutes
    
    for (let j = i + 1; j < acts.length; j++) {
      const b = acts[j]
      if (!b || b.startTimeMinutes === null) continue
      const bEnd = b.startTimeMinutes + b.durationMinutes
      
      // Check overlap
      if (a.startTimeMinutes < bEnd && b.startTimeMinutes < aEnd) {
        if (!overlaps.includes(a.id)) overlaps.push(a.id)
        if (!overlaps.includes(b.id)) overlaps.push(b.id)
      }
    }
  }
  return overlaps
}

const hasOverlap = (dayIdx: number, activityId: string): boolean => {
  return getDayOverlaps(dayIdx).includes(activityId)
}

const autoFixOverlaps = (dayIdx: number) => {
  const acts = tripState.days[dayIdx]?.activities
  if (!acts) return
  
  // Sort by start time, then assign sequential times
  const sorted = [...acts].sort((a, b) => {
    const aTime = a.startTimeMinutes ?? 9 * 60
    const bTime = b.startTimeMinutes ?? 9 * 60
    return aTime - bTime
  })
  
  let currentTime = 9 * 60 // Start at 9 AM
  sorted.forEach(activity => {
    updateActivityTime(dayIdx, activity.id, currentTime, activity.durationMinutes)
    currentTime += activity.durationMinutes + 30 // Add 30 min travel buffer
  })
}

// ==================== TRAVEL FEASIBILITY ====================

// Simple destination-based travel time (in minutes)
const DESTINATION_TRAVEL_TIMES: Record<string, Record<string, number>> = {
  'Sigiriya': { 'Dambulla': 30, 'Kandy': 90, 'Colombo': 180, 'Ella': 150 },
  'Dambulla': { 'Sigiriya': 30, 'Kandy': 75, 'Colombo': 150, 'Anuradhapura': 60 },
  'Kandy': { 'Sigiriya': 90, 'Ella': 120, 'Colombo': 120, 'Nuwara Eliya': 75 },
  'Colombo': { 'Kandy': 120, 'Galle': 120, 'Negombo': 45, 'Airport': 45 },
  'Ella': { 'Kandy': 120, 'Yala': 90, 'Nuwara Eliya': 60 },
  'Galle': { 'Colombo': 120, 'Mirissa': 30, 'Yala': 180 },
  'Yala': { 'Ella': 90, 'Galle': 180, 'Mirissa': 150 },
}
const DEFAULT_TRAVEL_TIME = 60 // Default 1 hour

const estimateTravelTime = (from: string, to: string): number => {
  if (from === to || !from || !to) return 0
  // Try exact match
  if (DESTINATION_TRAVEL_TIMES[from]?.[to]) return DESTINATION_TRAVEL_TIMES[from][to]
  if (DESTINATION_TRAVEL_TIMES[to]?.[from]) return DESTINATION_TRAVEL_TIMES[to][from]
  // Try partial match
  for (const [key, dests] of Object.entries(DESTINATION_TRAVEL_TIMES)) {
    if (from.includes(key) || key.includes(from)) {
      for (const [dest, time] of Object.entries(dests)) {
        if (to.includes(dest) || dest.includes(to)) return time
      }
    }
  }
  return DEFAULT_TRAVEL_TIME
}

interface TravelWarning {
  afterActivityId: string
  type: 'tight_connection' | 'impossible'
  message: string
  travelTime: number
  availableTime: number
}

// Get travel warnings for a day
const getDayTravelWarnings = (dayIdx: number): TravelWarning[] => {
  const acts = tripState.days[dayIdx]?.activities || []
  const warnings: TravelWarning[] = []
  
  // Sort by start time
  const sorted = [...acts]
    .filter(a => a.startTimeMinutes !== null)
    .sort((a, b) => (a.startTimeMinutes || 0) - (b.startTimeMinutes || 0))
  
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i]
    const next = sorted[i + 1]
    
    if (!current || !next) continue
    if (current.startTimeMinutes === null || next.startTimeMinutes === null) continue
    
    const currentEnd = current.startTimeMinutes + current.durationMinutes
    const travelTime = estimateTravelTime(current.destination, next.destination)
    const availableTime = next.startTimeMinutes - currentEnd
    
    if (availableTime < 0) {
      // Activities overlap - handled by overlap detection
      continue
    } else if (availableTime < travelTime) {
      warnings.push({
        afterActivityId: current.id,
        type: availableTime < travelTime / 2 ? 'impossible' : 'tight_connection',
        message: `${travelTime}min travel needed, only ${availableTime}min available`,
        travelTime,
        availableTime
      })
    }
  }
  
  return warnings
}

// Check if day is overloaded (>12 hours of activities + travel)
const isDayOverloaded = (dayIdx: number): { overloaded: boolean; totalHours: number } => {
  const acts = tripState.days[dayIdx]?.activities || []
  
  let totalMinutes = 0
  
  // Sum activity durations
  acts.forEach(a => {
    totalMinutes += a.durationMinutes
  })
  
  // Add estimated travel time between activities
  const sorted = [...acts]
    .filter(a => a.startTimeMinutes !== null)
    .sort((a, b) => (a.startTimeMinutes || 0) - (b.startTimeMinutes || 0))
  
  for (let i = 0; i < sorted.length - 1; i++) {
    const curr = sorted[i]
    const next = sorted[i + 1]
    if (curr && next) {
      totalMinutes += estimateTravelTime(curr.destination, next.destination)
    }
  }
  
  const totalHours = Math.round(totalMinutes / 60 * 10) / 10
  return { overloaded: totalHours > 12, totalHours }
}

// Get travel warning for specific activity boundary
const getTravelWarningAfter = (dayIdx: number, activityId: string): TravelWarning | null => {
  const warnings = getDayTravelWarnings(dayIdx)
  return warnings.find(w => w.afterActivityId === activityId) || null
}

// Scheduling helpers
const isScheduled = (libraryActivityId: number): boolean => {
  return tripState.days.some(day => 
    day.activities.some(a => a.tags?.includes(`lib:${libraryActivityId}`))
  )
}

const getScheduledDay = (libraryActivityId: number): number => {
  for (let i = 0; i < tripState.days.length; i++) {
    if (tripState.days[i]?.activities.some(a => a.tags?.includes(`lib:${libraryActivityId}`))) {
      return i + 1
    }
  }
  return 0
}

// Day helpers
const getDayDate = (idx: number): string => {
  if (!tripState.startDate) return `Day ${idx + 1}`
  const start = new Date(tripState.startDate)
  start.setDate(start.getDate() + idx)
  return start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const formatDate = (date: string | null): string => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const updateDayTitle = (idx: number, title: string) => {
  if (tripState.days[idx]) tripState.days[idx].title = title || `Day ${idx + 1}`
}

const handleDeleteDay = (idx: number) => {
  const day = tripState.days[idx]
  if (day && day.activities.length > 0) {
    deleteTarget.value = idx
    showDeleteConfirm.value = true
  } else {
    removeDay(idx)
  }
}

const confirmDelete = () => {
  if (deleteTarget.value >= 0) {
    removeDay(deleteTarget.value)
    showDeleteConfirm.value = false
    deleteTarget.value = -1
  }
}

const moveDayUp = (idx: number) => { if (idx > 0) reorderDay(idx, idx - 1) }
const moveDayDown = (idx: number) => { if (idx < tripState.days.length - 1) reorderDay(idx, idx + 1) }

// Drag handlers
const onDragStartFromSuggested = (event: DragEvent, activity: typeof activities[0]) => {
  dragSource.value = 'suggested'
  draggedLibraryActivity.value = activity
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'copy'
}

const onDragStartFromDay = (event: DragEvent, dayIndex: number, activity: Activity) => {
  dragSource.value = 'scheduled'
  draggedScheduledActivity.value = { dayIndex, activity }
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}

const onDragEnd = () => {
  dragSource.value = null
  draggedLibraryActivity.value = null
  draggedScheduledActivity.value = null
  dropTargetDay.value = null
  dropTargetPosition.value = null
}

const onDragOver = (event: DragEvent, dayIndex: number) => {
  event.preventDefault()
  dropTargetDay.value = dayIndex
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const y = event.clientY - rect.top
  const cardHeight = 80
  const activitiesCount = tripState.days[dayIndex]?.activities.length ?? 0
  dropTargetPosition.value = Math.min(Math.floor(y / cardHeight), activitiesCount)
}

const onDragLeave = (event: DragEvent) => {
  const related = event.relatedTarget as HTMLElement
  const current = event.currentTarget as HTMLElement
  if (!current.contains(related)) {
    dropTargetDay.value = null
    dropTargetPosition.value = null
  }
}

const onDrop = (event: DragEvent, dayIndex: number) => {
  event.preventDefault()
  
  if (dragSource.value === 'suggested' && draggedLibraryActivity.value) {
    const libId = draggedLibraryActivity.value.id
    
    if (isScheduled(libId)) {
      duplicateWarning.value = `Already scheduled on Day ${getScheduledDay(libId)}`
      setTimeout(() => { duplicateWarning.value = '' }, 3000)
    } else {
      // Auto-assign time
      const startTime = getNextAvailableTime(dayIndex)
      
      addActivity(dayIndex, {
        name: draggedLibraryActivity.value.name,
        destination: draggedLibraryActivity.value.location,
        category: draggedLibraryActivity.value.category,
        startTimeMinutes: startTime,
        durationMinutes: (draggedLibraryActivity.value.averageDurationHours || 1) * 60,
        cost: {
          value: draggedLibraryActivity.value.estimatedCostUSD,
          type: 'estimate',
          currency: 'USD'
        },
        source: 'library',
        tags: [`lib:${libId}`]
      }, dropTargetPosition.value ?? undefined)
    }
  } else if (dragSource.value === 'scheduled' && draggedScheduledActivity.value) {
    const { dayIndex: fromDayIndex, activity } = draggedScheduledActivity.value
    if (fromDayIndex !== dayIndex || dropTargetPosition.value !== null) {
      moveActivity(fromDayIndex, dayIndex, activity.id, dropTargetPosition.value ?? undefined)
    }
  }
  
  onDragEnd()
}

// Initialize
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  const start = route.query.start as string
  const end = route.query.end as string
  const templateSlug = route.query.template as string

  if (start && end) setDates(start, end)
  else if (templateSlug) {
    const template = itinerariesData.itineraries.find(i => i.slug === templateSlug)
    if (template) {
      setTemplateCache(template)  // Cache for reset
      loadTemplate(template)
    }
  } else if (tripState.days.length === 0) initializeDays(3)
})

useHead({ title: 'Trip Builder - CeylonGuide' })
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 20px); }
</style>
