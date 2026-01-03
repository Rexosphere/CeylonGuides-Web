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
            <button class="text-accent text-sm font-bold hover:underline">Load older reports</button>
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
        <!-- Map Background Image -->
        <div 
          class="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-40" 
          style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBye3UqYEOFRFviYlfu1qfGwERk4DvZ7viiSrjotNb6TgCxVxEkt39moOOpk_n8b1P6gQlpieBykVTDhXAIliOY347015xp638Tt93UMGfMa-ZotbaDyrpYqcnH3kfW4Wv2flmN7A5EChkvCBoIBKTDOx4Tz_wqz25eNjNPo6Xyi6J0JSjOytQeabJrkS-jnjg-fUL0x57ePxii6Dcgs2-fM6MVzOMUf3XQ0z1CZgjQRgvtfSwNVdD9dLyYQMkMizcyuTjFWq_PHmYE'); filter: grayscale(100%) sepia(10%) hue-rotate(180deg) contrast(90%);"
        ></div>

        <!-- Map Controls -->
        <div class="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button class="size-10 bg-white dark:bg-background-dark rounded-lg shadow-md flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-50 transition-colors" title="My Location">
            <span class="material-symbols-outlined">my_location</span>
          </button>
          <button class="size-10 bg-white dark:bg-background-dark rounded-lg shadow-md flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-50 transition-colors" title="Zoom In">
            <span class="material-symbols-outlined">add</span>
          </button>
          <button class="size-10 bg-white dark:bg-background-dark rounded-lg shadow-md flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-50 transition-colors" title="Zoom Out">
            <span class="material-symbols-outlined">remove</span>
          </button>
        </div>

        <!-- Pin: Kandy (Active/High Risk) -->
        <div class="absolute top-[45%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
          <div class="relative flex items-center justify-center">
            <div class="animate-pulse-orange absolute size-14 rounded-full bg-red-500/20"></div>
            <div class="relative size-10 bg-red-500 rounded-full border-2 border-white dark:border-[#221510] shadow-lg flex items-center justify-center text-white transform transition-transform group-hover:scale-110">
              <span class="material-symbols-outlined text-[20px]">person_alert</span>
            </div>
            <!-- Tooltip -->
            <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-background-dark rounded-lg shadow-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-2">
              <div class="text-xs font-bold text-red-600 mb-1">Fake Guide Scams</div>
              <div class="text-[10px] text-gray-500">High activity reported in the last 2 hours near Temple of the Tooth.</div>
              <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 size-3 bg-white dark:bg-background-dark transform rotate-45 shadow-sm"></div>
            </div>
          </div>
        </div>

        <!-- Pin: Colombo (Tuk Tuk) -->
        <div class="absolute top-[65%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
          <div class="relative flex items-center justify-center">
            <div class="relative size-8 bg-orange-500 rounded-full border-2 border-white dark:border-[#221510] shadow-lg flex items-center justify-center text-white transform transition-transform group-hover:scale-110">
              <span class="material-symbols-outlined text-[16px]">local_taxi</span>
            </div>
          </div>
        </div>

        <!-- Pin: Galle (Gem) -->
        <div class="absolute top-[85%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
          <div class="relative flex items-center justify-center">
            <div class="relative size-8 bg-purple-500 rounded-full border-2 border-white dark:border-[#221510] shadow-lg flex items-center justify-center text-white transform transition-transform group-hover:scale-110">
              <span class="material-symbols-outlined text-[16px]">diamond</span>
            </div>
          </div>
        </div>

        <!-- Pin: Ella (Exchange) -->
        <div class="absolute top-[60%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
          <div class="relative flex items-center justify-center">
            <div class="relative size-8 bg-blue-500 rounded-full border-2 border-white dark:border-[#221510] shadow-lg flex items-center justify-center text-white transform transition-transform group-hover:scale-110">
              <span class="material-symbols-outlined text-[16px]">currency_exchange</span>
            </div>
          </div>
        </div>

        <!-- Floating Action Button (FAB) -->
        <div class="absolute bottom-8 right-8 z-30">
          <button class="group flex items-center gap-2 bg-accent hover:bg-accent/90 text-white rounded-full pl-5 pr-6 py-4 shadow-lg shadow-accent/30 transition-all active:scale-95">
            <span class="material-symbols-outlined text-[24px]">add_alert</span>
            <span class="text-base font-bold">Report a Scam</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ScamAlert } from '~/composables/useApi'

definePageMeta({
  layout: false
})

const viewMode = ref<'list' | 'map'>('list')
const selectedCategory = ref<string | null>(null)

// Fetch scam alerts from API
const { data: scamsResponse, pending, error, refresh } = await useFetch<{ success: boolean; data: ScamAlert[]; count: number }>(
  () => {
    const config = useRuntimeConfig()
    const base = config.public.apiBase
    const params = selectedCategory.value ? `?category=${selectedCategory.value}` : ''
    return `${base}/api/scams${params}`
  },
  { watch: [selectedCategory] }
)

const scamAlerts = computed(() => scamsResponse.value?.data || [])

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
