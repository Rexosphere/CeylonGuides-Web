<template>
  <div class="min-h-screen bg-slate-50 dark:bg-background-dark">
    <!-- Hero Section -->
    <section class="relative min-h-[420px] flex flex-col items-center justify-center text-white overflow-hidden shadow-lg p-4">
      <!-- Background Image & Overlay -->
      <div class="absolute inset-0 z-0">
        <img src="/images/downloaded_870c30a3afb8.avif" alt="Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 backdrop-blur-[1px]"></div>
      </div>

      <div class="flex flex-col gap-3 text-center max-w-[720px] relative z-10">
        <h1 class="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg font-display">
          Restrooms Finder
        </h1>
        <p class="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto drop-shadow-sm">
          Find clean, accessible restrooms across Sri Lanka
        </p>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="sticky top-[73px] z-40 w-full border-b border-slate-200 dark:border-gray-700 bg-white dark:bg-background-dark py-4 shadow-sm">
      <div class="container mx-auto px-4 lg:px-8">
        <!-- Search Bar -->
        <div class="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
          <div class="relative flex-1">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              v-model="searchInput"
              @input="debouncedSearch"
              type="text"
              placeholder="Search by name, location, or city..."
              class="w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-12 pr-4 py-3 text-sm text-slate-700 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              v-if="searchInput"
              @click="clearSearch"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-gray-700"
            >
              <span class="material-symbols-outlined text-slate-400 text-[18px]">close</span>
            </button>
          </div>
          
          <!-- Sort Dropdown -->
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-slate-400 text-[20px]">sort</span>
            <select 
              v-model="selectedSortValue"
              @change="setSort(selectedSortValue)"
              class="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-medium text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="alphabetical">A-Z</option>
              <option value="city">By City</option>
              <option value="distance" :disabled="!userLocation">Near Me</option>
            </select>
          </div>
          
          <!-- Near Me Button -->
          <button 
            @click="handleNearMe"
            :disabled="isLocating"
            :class="[
              'flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all',
              userLocation 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                : 'bg-primary text-dark-charcoal hover:bg-primary/90',
              isLocating && 'opacity-50 cursor-not-allowed'
            ]"
          >
            <span class="material-symbols-outlined text-[20px]" :class="{ 'animate-spin': isLocating }">
              {{ isLocating ? 'sync' : userLocation ? 'my_location' : 'near_me' }}
            </span>
            {{ isLocating ? 'Locating...' : userLocation ? 'Located' : 'Near Me' }}
          </button>
        </div>

        <!-- Category Filters -->
        <div class="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
          <button 
            v-for="filter in filterOptions" 
            :key="filter.value"
            @click="setFilter(filter.value)"
            :class="[
              'flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-105',
              selectedFilter === filter.value 
                ? 'bg-primary text-dark-charcoal font-bold shadow-md' 
                : 'bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-gray-700'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">{{ filter.icon }}</span>
            {{ filter.label }}
          </button>
        </div>
        
        <!-- City Filter + Results Count -->
        <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-slate-400">location_on</span>
            <select 
              v-model="selectedCityValue"
              @change="setCity(selectedCityValue)"
              class="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Cities</option>
              <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
            </select>
          </div>
          
          <div class="text-sm text-slate-500 dark:text-slate-400">
            Showing <span class="font-bold text-slate-700 dark:text-white">{{ restrooms.length }}</span> restrooms
            <span v-if="locationError" class="ml-2 text-red-500">• {{ locationError }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Location Banner -->
    <div 
      v-if="!userLocation" 
      @click="handleNearMe" 
      class="bg-blue-50 dark:bg-blue-900/20 border-y border-blue-100 dark:border-blue-800 py-3 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-center"
    >
      <div class="container mx-auto px-4 lg:px-8 flex items-center justify-center gap-2 text-sm text-blue-700 dark:text-blue-300">
        <span class="material-symbols-outlined text-[18px]">my_location</span>
        <span class="font-bold">Location not available</span>
        <span>—</span>
        <span class="underline decoration-blue-300 underline-offset-2">Enable for distance sorting</span>
      </div>
    </div>

    <!-- Stats Bar -->
    <section class="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 border-b border-slate-200 dark:border-gray-700 py-3 sticky top-[152px] z-30">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <span class="material-symbols-outlined text-slate-500">wc</span>
            <span class="text-sm font-bold text-slate-700 dark:text-white">{{ restrooms.length }}</span>
            <span class="text-xs text-slate-500">Results</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <span class="material-symbols-outlined text-emerald-500">check_circle</span>
            <span class="text-sm font-bold text-slate-700 dark:text-white">{{ freeCount }}</span>
            <span class="text-xs text-slate-500">Free</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <span class="material-symbols-outlined text-amber-500">star</span>
            <span class="text-sm font-bold text-slate-700 dark:text-white">{{ visibleAvgRating }}</span>
            <span class="text-xs text-slate-500">Avg Rating</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="w-full h-[calc(100vh-220px)] overflow-hidden lg:h-[calc(100vh-200px)]">
      <div class="h-full flex flex-col lg:flex-row">
        <!-- List (Left) -->
        <div 
          :class="[
            'w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto px-4 py-6 lg:px-6 lg:border-r border-slate-200 dark:border-gray-700 bg-white dark:bg-background-dark scroll-smooth',
            viewMode === 'map' ? 'hidden lg:block' : 'block'
          ]"
        >
          <div class="max-w-2xl mx-auto space-y-4 pb-24 lg:pb-0">
        <template v-if="restrooms.length > 0">
          <FacilityCard 
            v-for="restroom in restrooms" 
            :key="restroom.id"
            :data-restroom-id="restroom.id"
            :restroom="restroom"
            :is-selected="selectedRestroom?.id === restroom.id"
            :distance="userLocation ? formatDistance(getDistanceFromUser(restroom)) : ''"
            :geocoding-status="getGeocodingStatus(restroom.id)"
            @click="handleCardClick(restroom)"
            @view-details="openDetails(restroom)"
          />
        </template>
        
        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-16 text-center">
          <div class="mb-4 p-4 rounded-full bg-slate-100 dark:bg-gray-800">
            <span class="material-symbols-outlined text-4xl text-slate-400">search_off</span>
          </div>
          <h3 class="text-xl font-bold text-slate-700 dark:text-white mb-2">No restrooms found</h3>
          <p class="text-slate-500 dark:text-slate-400 max-w-md">
            Try adjusting your filters or selecting a different city.
          </p>
          <button 
            @click="resetFilters"
            class="mt-4 px-6 py-2 rounded-xl bg-primary text-dark-charcoal font-bold hover:bg-primary/90 transition-colors"
          >
            Reset Filters
          </button>
          </div>
        </div>

        </div>
      
        <!-- Map (Right) -->
        <div 
          :class="[
            'w-full lg:w-[55%] xl:w-[60%] h-full bg-slate-100 dark:bg-gray-900 relative z-0',
            viewMode === 'list' ? 'hidden lg:block' : 'block'
          ]"
        >
          <ClientOnly>
            <FacilityMap 
              :restrooms="mappableRestrooms"
              :selected-restroom="selectedRestroom"
              :user-location="userLocation"
              @select-restroom="handleMapSelect"
            />
            <template #fallback>
              <div class="h-full w-full flex items-center justify-center bg-slate-100 dark:bg-gray-800">
                <div class="text-center">
                  <span class="material-symbols-outlined text-4xl text-slate-400 animate-pulse">map</span>
                  <p class="mt-2 text-slate-500">Loading map...</p>
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>

    <!-- Mobile Toggle -->
    <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 lg:hidden drop-shadow-2xl">
      <div class="flex p-1.5 rounded-full bg-slate-900/90 backdrop-blur text-white border border-white/10">
        <button 
          @click="viewMode = 'list'"
          :class="[
            'px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2',
            viewMode === 'list' ? 'bg-primary text-slate-900' : 'text-slate-300 hover:text-white'
          ]"
        >
          <span class="material-symbols-outlined text-[18px]">list</span>
          List
        </button>
        <button 
          @click="viewMode = 'map'"
          :class="[
            'px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2',
            viewMode === 'map' ? 'bg-primary text-slate-900' : 'text-slate-300 hover:text-white'
          ]"
        >
          <span class="material-symbols-outlined text-[18px]">map</span>
          Map
        </button>
      </div>
    </div>

    <!-- Details Modal -->
    <FacilityDetailsModal 
      v-if="selectedRestroom"
      :show="showDetails"
      :restroom="selectedRestroom"
      @close="closeDetails"
      @report-issue="handleReportIssue"
    />

    <!-- Report Modal -->
    <FacilityReportModal
      v-if="selectedRestroom"
      :show="showReportModal"
      :restroom="selectedRestroom"
      @close="showReportModal = false"
      @submitted="handleReviewSubmitted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useFacilities, type Restroom, type RestroomFilter, type FacilitySortOption } from '~/composables/useFacilities'

// SEO Meta
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Restrooms Finder - CeylonGuide',
  meta: [
    { name: 'description', content: 'Find clean, accessible public restrooms across Sri Lanka with ratings and directions.' }
  ]
})

// Filter options
const filterOptions: { value: RestroomFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: 'wc' },
  { value: 'free', label: 'Free', icon: 'check_circle' },
  { value: 'paid', label: 'Paid', icon: 'payments' },
  { value: 'highRated', label: 'Highly Rated', icon: 'star' },
  { value: 'wheelchairAccessible', label: 'Accessible', icon: 'accessible' },
  { value: 'transportHub', label: 'Transport Hubs', icon: 'commute' }
]

// Use facilities composable
const { 
  restrooms,
  mappableRestrooms,
  cities, 
  selectedFilter,
  selectedRestroom,
  showDetails,
  setFilter,
  setCity,
  setSearch,
  setSort,
  openDetails,
  closeDetails,
  selectRestroom,
  resetFilters,
  getUserLocation,
  userLocation,
  isLocating,
  locationError,
  getDistanceFromUser,
  formatDistance,
  freeCount,
  paidCount,
  highRatedCount,
  initGeocoding,
  getGeocodingStatus,
  fetchReviews,
  addReview,
  visibleAvgRating
} = useFacilities()

// Initialize geocoding and fetch reviews
onMounted(() => {
  initGeocoding()
  fetchReviews()
})

// Local state
const selectedCityValue = ref('all')
const selectedSortValue = ref<FacilitySortOption>('recommended')
const searchInput = ref('')
const showReportModal = ref(false)
const viewMode = ref<'list' | 'map'>('list')

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout> | null = null
function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    setSearch(searchInput.value)
  }, 300)
}

function clearSearch() {
  searchInput.value = ''
  setSearch('')
}

async function handleNearMe() {
  await getUserLocation()
}

function handleCardClick(restroom: Restroom) {
  selectRestroom(restroom)
}

function handleMapSelect(restroom: Restroom) {
  selectRestroom(restroom)
  nextTick(() => {
    const cardElement = document.querySelector(`[data-restroom-id="${restroom.id}"]`)
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}

function handleReportIssue() {
  showReportModal.value = true
}

function handleReviewSubmitted(response: any) {
  if (response.review) {
    addReview(response.review)
  }
  // Close report modal after short delay or immediately?
  // Modal handles its own "Submitted" state display, so we just wait for it to be closed by user or...
  // Actually the modal emits 'submitted' then shows success message. 
  // We can let the user close it.
  // But we need to update our local data immediately.
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
