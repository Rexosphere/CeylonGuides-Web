<template>
  <div class="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-charcoal dark:text-white">
    <!-- Header with solid variant -->
    <Header variant="solid" />

    <!-- Proximity Alert Banner -->
    <div class="flex-none mt-[72px] bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-900/50 px-6 py-2 flex items-center justify-center gap-3 text-red-700 dark:text-red-300 text-sm font-medium z-20">
      <span class="material-symbols-outlined text-[20px]">fmd_bad</span>
      <p>Warning: You are viewing a high-activity area for reported scams (Pettah Market).</p>
      <button class="ml-4 text-red-700/60 hover:text-red-700 dark:text-red-300/60 dark:hover:text-red-300">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>

    <!-- Main Layout -->
    <main class="flex-1 flex overflow-hidden relative">
      <!-- Sidebar (List View & Controls) -->
      <aside 
        class="w-full md:w-[420px] lg:w-[480px] bg-white dark:bg-surface-dark flex flex-col border-r border-gray-200 dark:border-white/10 z-10 shadow-xl md:shadow-none absolute inset-0 md:relative transform transition-transform duration-300 bg-background-light"
        :class="[
          viewMode === 'list' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
      >
        <!-- Sidebar Header & Filters -->
        <div class="flex-none p-6 pb-2 border-b border-transparent">
          <div class="flex flex-col gap-4 mb-6">
            <div>
              <h1 class="text-2xl font-bold text-charcoal dark:text-white leading-tight">Scam Database</h1>
              <p class="text-gray-500 text-sm mt-1">Real-time community reports to keep you safe.</p>
            </div>
            
            <!-- View Toggle (Mobile Only) -->
            <div class="md:hidden bg-background-light dark:bg-background-dark p-1 rounded-lg flex self-start">
              <label class="cursor-pointer relative">
                <input 
                  type="radio" 
                  name="view" 
                  value="map" 
                  v-model="viewMode" 
                  class="peer sr-only"
                />
                <div class="px-4 py-1.5 rounded-md text-sm font-medium text-gray-500 peer-checked:bg-white dark:peer-checked:bg-[#4a3b36] peer-checked:text-accent peer-checked:shadow-sm transition-all flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">map</span>
                  Map
                </div>
              </label>
              <label class="cursor-pointer relative">
                <input 
                  type="radio" 
                  name="view" 
                  value="list" 
                  v-model="viewMode" 
                  class="peer sr-only"
                />
                <div class="px-4 py-1.5 rounded-md text-sm font-medium text-gray-500 peer-checked:bg-white dark:peer-checked:bg-[#4a3b36] peer-checked:text-accent peer-checked:shadow-sm transition-all flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">list</span>
                  List
                </div>
              </label>
            </div>
          </div>
          
          <!-- Filter Chips -->
          <div class="flex gap-2 overflow-x-auto pb-4 custom-scrollbar -mx-6 px-6">
            <button 
              v-for="cat in categories" 
              :key="cat.id ?? 'all'"
              @click="selectedCategory = cat.id"
              :class="[
                'shrink-0 h-8 px-4 rounded-full text-xs font-medium flex items-center gap-1 transition-colors',
                selectedCategory === cat.id 
                  ? 'bg-charcoal text-white shadow-sm' 
                  : 'bg-white dark:bg-background-dark border border-gray-200 dark:border-white/10 text-charcoal dark:text-white hover:border-accent'
              ]"
            >
              <span v-if="cat.id" :class="['size-2 rounded-full', cat.color]"></span>
              {{ cat.label }}
            </button>
          </div>

          <!-- Near Me Toggle -->
          <div class="flex items-center gap-3 pb-4 -mx-6 px-6">
            <button
              v-if="!nearMeMode"
              @click="enableNearMe"
              :disabled="gettingLocation"
              class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-wait text-sm font-medium transition-colors"
            >
              <span v-if="gettingLocation" class="animate-spin">⏳</span>
              <span v-else>📍</span>
              {{ gettingLocation ? 'Getting location...' : 'Show Near Me' }}
            </button>
            
            <div v-else class="flex items-center gap-3 flex-wrap">
              <span class="text-green-600 dark:text-green-400 font-semibold text-sm flex items-center gap-1">
                📍 Near Me
              </span>
              <input
                v-model.number="radiusKm"
                type="range"
                min="1"
                max="20"
                class="w-24 accent-accent"
              />
              <span class="text-xs text-gray-600 dark:text-gray-400">{{ radiusKm }}km</span>
              <button
                @click="disableNearMe"
                class="px-3 py-1 text-xs border border-gray-300 dark:border-white/20 rounded hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <!-- Near Me Risk Summary -->
          <div v-if="nearMeMode && scamAlerts.length > 0" class="pb-4 -mx-6 px-6">
            <div class="p-3 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded-r-lg">
              <div class="flex items-start gap-2">
                <span class="text-lg">⚠️</span>
                <div>
                  <div class="font-semibold text-orange-800 dark:text-orange-300 text-sm">
                    {{ scamAlerts.filter(s => s.severity === 'HIGH' || s.severity === 'CRITICAL').length }} high-risk alert(s) within {{ radiusKm }}km
                  </div>
                  <div class="text-xs text-orange-700 dark:text-orange-400 mt-0.5">
                    Most common: {{ getMostCommonCategory() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scrollable List Area -->
        <div class="flex-1 overflow-y-auto custom-scrollbar px-6 pb-20">
          <!-- Loading State -->
          <div v-if="pending" class="flex items-center justify-center py-12">
            <div class="animate-spin size-8 border-2 border-accent border-t-transparent rounded-full"></div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-12 text-red-500">
            <span class="material-symbols-outlined text-4xl mb-2">error</span>
            <p>Failed to load alerts. Please try again.</p>
            <button @click="refresh()" class="mt-4 px-4 py-2 bg-accent text-white rounded-lg">Retry</button>
          </div>

          <!-- Empty State -->
          <div v-else-if="scamAlerts.length === 0" class="text-center py-12 text-gray-500">
            <span class="material-symbols-outlined text-4xl mb-2">verified_user</span>
            <p>No scam alerts in this area. Stay safe!</p>
          </div>

          <!-- Alert Cards -->
          <div v-else class="flex flex-col gap-4">
            <div 
              v-for="alert in scamAlerts" 
              :key="alert.id"
              :class="[
                'group relative bg-white dark:bg-background-dark rounded-xl border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer',
                getSeverityClass(alert.severity)
              ]"
            >
              <div class="absolute top-4 right-4 text-xs font-medium text-gray-400">
                {{ getTimeAgo(alert.last_reported) }}
              </div>
              <div class="flex items-start gap-3">
                <div :class="['size-10 rounded-full flex items-center justify-center shrink-0', getSeverityColor(alert.severity, alert.category)]">
                  <span class="material-symbols-outlined">{{ getSeverityIcon(alert.category) }}</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-bold text-charcoal dark:text-white text-base">{{ alert.title }}</h3>
                    <span 
                      v-if="alert.severity === 'HIGH' || alert.severity === 'CRITICAL'"
                      class="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider"
                    >
                      High Risk
                    </span>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                    {{ alert.description }}
                  </p>
                  <div class="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-3 mt-1">
                    <div class="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <span class="material-symbols-outlined text-[16px]">location_on</span>
                      {{ alert.location?.name || 'Unknown location' }}
                    </div>
                    <div class="flex items-center gap-1">
                      <button 
                        @click.stop="confirmAlert(alert.id)" 
                        class="p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <span class="material-symbols-outlined text-[18px]">thumb_up</span>
                      </button>
                      <span :class="['text-xs font-bold', alert.report_count > 20 ? 'text-green-600' : 'text-gray-400']">
                        {{ alert.report_count }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="scamAlerts.length > 0" class="mt-6 text-center">
            <button 
              v-if="hasMore"
              @click="loadMore"
              :disabled="loadingMore"
              class="px-6 py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span v-if="loadingMore" class="animate-spin size-4 border-2 border-white border-t-transparent rounded-full"></span>
              <span>{{ loadingMore ? 'Loading...' : 'Load more reports' }}</span>
            </button>
            <p v-else class="text-gray-400 text-sm">All reports loaded ({{ totalCount }} total)</p>
          </div>
        </div>

        <!-- Mobile Toggle Handle -->
        <div 
          @click="viewMode = 'list'"
          v-if="viewMode === 'map'"
          class="absolute -right-8 top-1/2 bg-white dark:bg-background-dark p-2 rounded-r-lg shadow-md md:hidden cursor-pointer border-y border-r border-gray-200 dark:border-white/10"
        >
          <span class="material-symbols-outlined text-gray-500">chevron_left</span>
        </div>
      </aside>

      <!-- Map Area -->
      <div 
        class="flex-1 relative bg-gray-200 dark:bg-[#1a1614] overflow-hidden"
        :class="[viewMode === 'map' ? 'block' : 'hidden md:block']"
      >
        <!-- Interactive Leaflet Map -->
        <ClientOnly>
          <ScamAlertsMap 
            :scams="scamAlerts"
            @select-scam="(id: string) => console.log('Selected scam:', id)"
            @report-at="handleMapReport"
            class="absolute inset-0"
          />
          <template #fallback>
            <div class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-surface-dark">
              <div class="text-center">
                <div class="animate-spin size-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-2"></div>
                <p class="text-gray-500">Loading map...</p>
              </div>
            </div>
          </template>
        </ClientOnly>

        <!-- Floating Tip Banner -->
        <div class="absolute top-4 left-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg px-3 py-2 z-[1000] max-w-[200px]">
          <p class="text-xs text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Click anywhere on the map to report a scam at that location
          </p>
        </div>

        <!-- Floating Action Button (FAB) -->
        <div class="absolute bottom-8 right-8 z-30">
          <button @click="showReportModal = true" class="group flex items-center gap-2 bg-accent hover:bg-accent/90 text-white rounded-full pl-5 pr-6 py-4 shadow-lg shadow-accent/30 transition-all active:scale-95">
            <span class="material-symbols-outlined text-[24px]">add_alert</span>
            <span class="text-base font-bold">Report a Scam</span>
          </button>
        </div>
      </div>
    </main>

    <!-- Report Scam Modal -->
    <Teleport to="body">
      <div v-if="showReportModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="showReportModal = false"></div>
        <div class="relative bg-white dark:bg-background-dark rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="sticky top-0 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
            <h2 class="text-xl font-bold text-charcoal dark:text-white">Report a Scam</h2>
            <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <!-- Modal Body -->
          <form @submit.prevent="submitReport" class="p-6 space-y-5">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
              <input v-model="reportForm.title" type="text" required minlength="5" maxlength="200" 
                class="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-surface-dark text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Brief title for this scam..." />
            </div>
            
            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
              <textarea v-model="reportForm.description" required minlength="20" maxlength="2000" rows="4"
                class="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-surface-dark text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                placeholder="Describe what happened, how to avoid it..."></textarea>
            </div>
            
            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
              <select v-model="reportForm.category" required
                class="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-surface-dark text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent">
                <option value="" disabled>Select a category</option>
                <option value="GEM_SCAM">Gem Scam</option>
                <option value="TRANSPORT_SCAM">Transport/Tuk-tuk Scam</option>
                <option value="ACCOMMODATION_SCAM">Accommodation Scam</option>
                <option value="TOUR_GUIDE_SCAM">Fake Tour Guide</option>
                <option value="RESTAURANT_SCAM">Restaurant Scam</option>
                <option value="SHOPPING_SCAM">Shopping/Exchange Scam</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            
            <!-- Severity -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Severity</label>
              <div class="flex gap-3">
                <label v-for="sev in ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']" :key="sev" class="flex-1">
                  <input type="radio" v-model="reportForm.severity" :value="sev" class="sr-only peer" />
                  <div class="text-center py-2 rounded-lg border-2 cursor-pointer transition-all"
                    :class="[
                      reportForm.severity === sev 
                        ? 'border-accent bg-accent/10 text-accent font-bold'
                        : 'border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                    ]">
                    {{ sev }}
                  </div>
                </label>
              </div>
            </div>
            
            <!-- Location -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
              <input v-model="reportForm.location_name" type="text" required
                class="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-surface-dark text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., Pettah Market, Colombo" />
            </div>
            
            <!-- Submit Button -->
            <button type="submit" :disabled="isSubmitting"
              class="w-full py-4 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              <span v-if="isSubmitting" class="animate-spin size-5 border-2 border-white border-t-transparent rounded-full"></span>
              <span>{{ isSubmitting ? 'Submitting...' : 'Submit Report' }}</span>
            </button>
            
            <p v-if="submitError" class="text-red-500 text-sm text-center">{{ submitError }}</p>
            <p v-if="submitSuccess" class="text-green-500 text-sm text-center">Report submitted successfully!</p>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { ScamAlert } from '~/composables/useApi'

const route = useRoute()

definePageMeta({
  layout: false
})

const viewMode = ref<'list' | 'map'>('list')
const selectedCategory = ref<string | null>(null)

// Report Modal State
const showReportModal = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

const reportForm = ref({
  title: '',
  description: '',
  category: '',
  severity: 'MEDIUM',
  location_name: '',
  location_lat: 7.8731, // Default to Sri Lanka center
  location_lng: 80.7718,
})

// Pagination state
const currentOffset = ref(0)
const limit = 20
const allAlerts = ref<ScamAlert[]>([])
const hasMore = ref(true)
const totalCount = ref(0)
const loadingMore = ref(false)

// Near Me mode state
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const nearMeMode = ref(false)
const radiusKm = ref(5)
const gettingLocation = ref(false)

// Handle deep-link for report modal
onMounted(() => {
  if (route.query.openReport) {
    const category = route.query.openReport as string
    showReportModal.value = true
    
    // Pre-fill category based on query param
    if (category === 'transport') {
      reportForm.value.category = 'TRANSPORT_SCAM'
    }
  }
})

// Fetch scam alerts from API
const { data: scamsResponse, pending, error, refresh } = await useFetch<{ 
  success: boolean; 
  data: ScamAlert[]; 
  count: number;
  total: number;
  nextOffset: number | null;
}>(
  () => {
    const config = useRuntimeConfig()
    const base = config.public.apiBase
    const params = new URLSearchParams()
    if (selectedCategory.value) params.set('category', selectedCategory.value)
    params.set('limit', String(limit))
    params.set('offset', String(currentOffset.value))
    // Add location params if Near Me mode is active
    if (nearMeMode.value && userLocation.value) {
      params.set('lat', String(userLocation.value.lat))
      params.set('lng', String(userLocation.value.lng))
      params.set('radius', String(radiusKm.value))
    }
    return `${base}/api/scams?${params}`
  },
  { 
    watch: [selectedCategory, nearMeMode, radiusKm],
    onResponse({ response }) {
      if (response._data?.success) {
        if (currentOffset.value === 0) {
          allAlerts.value = response._data.data || []
        } else {
          allAlerts.value = [...allAlerts.value, ...(response._data.data || [])]
        }
        totalCount.value = response._data.total || 0
        hasMore.value = response._data.nextOffset !== null
      }
    }
  }
)

const scamAlerts = computed(() => allAlerts.value)

// Load more function
async function loadMore() {
  if (!hasMore.value || loadingMore.value) return
  loadingMore.value = true
  currentOffset.value += limit
  await refresh()
  loadingMore.value = false
}

// Near Me mode functions
async function enableNearMe() {
  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser')
    return
  }
  
  gettingLocation.value = true
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      nearMeMode.value = true
      currentOffset.value = 0
      allAlerts.value = []
      gettingLocation.value = false
    },
    (error) => {
      alert('Could not get your location. Please enable location access.')
      console.error('Geolocation error:', error)
      gettingLocation.value = false
    },
    { timeout: 10000 }
  )
}

function disableNearMe() {
  nearMeMode.value = false
  userLocation.value = null
  currentOffset.value = 0
  allAlerts.value = []
}

function getMostCommonCategory(): string {
  if (allAlerts.value.length === 0) return 'None'
  const counts: Record<string, number> = {}
  allAlerts.value.forEach(s => {
    counts[s.category] = (counts[s.category] || 0) + 1
  })
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted[0]?.[0]?.replace(/_/g, ' ') || 'Various'
}

// Handle map click for reporting
function handleMapReport(coords: { lat: number; lng: number }) {
  // Pre-fill report form with coordinates
  reportForm.value = {
    ...reportForm.value,
    location_lat: coords.lat,
    location_lng: coords.lng,
    location_name: `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
  }
  
  // Open report modal
  showReportModal.value = true
}

// Reset pagination when category changes
watch(selectedCategory, () => {
  currentOffset.value = 0
  allAlerts.value = []
})

// Filter categories
const categories = [
  { id: null, label: 'All', color: 'bg-charcoal' },
  { id: 'TRANSPORT_SCAM', label: 'Tuk-tuk', color: 'bg-orange-500' },
  { id: 'GEM_SCAM', label: 'Gem Scams', color: 'bg-purple-500' },
  { id: 'TOUR_GUIDE_SCAM', label: 'Fake Guides', color: 'bg-red-500' },
  { id: 'SHOPPING_SCAM', label: 'Exchange', color: 'bg-blue-500' },
]

// Helper functions
function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return `${Math.floor(diffHours / 24)}d ago`
}

function getSeverityClass(severity: string) {
  switch (severity) {
    case 'HIGH':
    case 'CRITICAL':
      return 'border-red-100 dark:border-red-900/30'
    case 'MEDIUM':
      return 'border-orange-100 dark:border-orange-900/30'
    default:
      return 'border-gray-200 dark:border-white/10'
  }
}

function getSeverityIcon(category: string) {
  switch (category) {
    case 'TOUR_GUIDE_SCAM':
      return 'person_alert'
    case 'TRANSPORT_SCAM':
      return 'local_taxi'
    case 'GEM_SCAM':
      return 'diamond'
    case 'SHOPPING_SCAM':
      return 'currency_exchange'
    default:
      return 'warning'
  }
}

function getSeverityColor(severity: string, category: string) {
  if (severity === 'HIGH' || severity === 'CRITICAL') {
    return 'bg-red-50 dark:bg-red-900/20 text-red-500'
  }
  switch (category) {
    case 'TRANSPORT_SCAM':
      return 'bg-orange-50 dark:bg-orange-900/20 text-orange-500'
    case 'GEM_SCAM':
      return 'bg-purple-50 dark:bg-purple-900/20 text-purple-500'
    case 'SHOPPING_SCAM':
      return 'bg-blue-50 dark:bg-blue-900/20 text-blue-500'
    default:
      return 'bg-gray-50 dark:bg-gray-900/20 text-gray-500'
  }
}

async function confirmAlert(id: string) {
  const config = useRuntimeConfig()
  await $fetch(`${config.public.apiBase}/api/scams/${id}/confirm`, { method: 'POST' })
  refresh()
}

async function submitReport() {
  const config = useRuntimeConfig()
  isSubmitting.value = true
  submitError.value = ''
  submitSuccess.value = false
  
  try {
    await $fetch(`${config.public.apiBase}/api/scams`, {
      method: 'POST',
      body: {
        title: reportForm.value.title,
        description: reportForm.value.description,
        category: reportForm.value.category,
        severity: reportForm.value.severity,
        location_name: reportForm.value.location_name,
        location_lat: reportForm.value.location_lat,
        location_lng: reportForm.value.location_lng,
      }
    })
    
    submitSuccess.value = true
    setTimeout(() => {
      showReportModal.value = false
      reportForm.value = {
        title: '',
        description: '',
        category: '',
        severity: 'MEDIUM',
        location_name: '',
        location_lat: 7.8731,
        location_lng: 80.7718,
      }
      submitSuccess.value = false
      refresh()
    }, 1500)
  } catch (err: any) {
    submitError.value = err?.data?.error || 'Failed to submit report. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Custom scrollbar for the sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e6dedb;
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4a3b36;
}
</style>
