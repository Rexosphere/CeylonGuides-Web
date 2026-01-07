<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-dark-charcoal dark:text-white font-display antialiased">
    
    <!-- Hero Section -->
    <section class="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center" 
        style='background-image: linear-gradient(rgba(16, 32, 34, 0.4) 0%, rgba(16, 32, 34, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2xNtC6Msj0wV0Tayt-tD_VIILj7f1Irigig_tna9kLLbT8-yAmzXL7uDX1mX-Mu8FyRfrnVPT8wtNLwicbBZYF3c83iuJZnwt8fQ8SpoWNfszslkw1kJg8Svwc3IO5FYie78bOYCpvDWUafqt0fDRZ844Z1_HSJKr-ZMRfyAgJ98kc6VDgrWi7qCG4Gj4kfQFV7vgIxMbsCNdjMjYfTT2sce-YdFHHUUeUm_BgKc6N_FpNZOpooDYXNTQN94wUkFRTxEiGsobQeA");'>
      </div>
      <div class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div class="max-w-4xl space-y-6">
          <h1 class="font-display text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-md">
            Clean Dining & Safe Food Guide
          </h1>
          <p class="mx-auto max-w-2xl text-lg font-medium text-white/90 md:text-xl drop-shadow-sm">
            Discover hygienic and certified culinary experiences across Sri Lanka's most beautiful locales.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="sticky top-[73px] z-40 w-full border-b border-[#f0f4f4] dark:border-gray-700 bg-white dark:bg-background-dark py-4 shadow-sm">
      <div class="container mx-auto px-4 lg:px-8">
        <!-- Search Bar -->
        <div class="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
          <div class="relative flex-1">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              v-model="searchInput"
              @input="debouncedSearch"
              type="text"
              placeholder="Search by name, cuisine, city, or features..."
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
              <option value="hygiene">Highest Hygiene</option>
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

        <!-- Category Filters (Toggle Chips) -->
        <div class="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
          <button 
            v-for="filter in filterOptions" 
            :key="filter.value"
            @click="setFilter(filter.value)"
            :class="[
              'flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-105',
              selectedFilter === filter.value 
                ? 'bg-primary text-dark-charcoal font-bold shadow-md' 
                : 'bg-[#f0f4f4] dark:bg-gray-800 text-dark-charcoal dark:text-white hover:bg-[#e0e8e9] dark:hover:bg-gray-700'
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
            Showing <span class="font-bold text-slate-700 dark:text-white">{{ restaurants.length }}</span> restaurants
            <span v-if="locationError" class="ml-2 text-red-500">• {{ locationError }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Panel - Badge Explanations & Disclaimer -->
    <section class="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 border-b border-slate-200 dark:border-gray-700">
      <div class="container mx-auto px-4 lg:px-8 py-4">
        <div class="flex flex-col lg:flex-row lg:items-start gap-4">
          <!-- Badge Explanations -->
          <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
              <div class="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400">verified_user</span>
              </div>
              <div>
                <h4 class="font-bold text-sm text-slate-800 dark:text-white">Safe & Secure</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">Highest SLTDA certification for hygiene & safety protocols</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
              <div class="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <span class="material-symbols-outlined text-green-600 dark:text-green-400">workspace_premium</span>
              </div>
              <div>
                <h4 class="font-bold text-sm text-slate-800 dark:text-white">Grade A</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">Excellent hygiene & professional service standards</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
              <div class="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <span class="material-symbols-outlined text-amber-600 dark:text-amber-400">verified</span>
              </div>
              <div>
                <h4 class="font-bold text-sm text-slate-800 dark:text-white">Grade B</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">Good hygiene practices with minor improvements noted</p>
              </div>
            </div>
          </div>
          
          <!-- Safety Disclaimer -->
          <div class="lg:w-72 xl:w-80 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div class="flex items-start gap-2">
              <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-[18px] mt-0.5">info</span>
              <p class="text-xs text-amber-700 dark:text-amber-300">
                <span class="font-bold">Disclaimer:</span> Ratings are for guidance only and are not medical or legal advice. Always exercise personal judgment when dining.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hybrid Content: List & Map -->
    <div class="container mx-auto flex flex-col-reverse px-4 py-8 lg:flex-row lg:gap-8 lg:px-8 lg:py-12">
      <!-- Venue List (Left) -->
      <div class="flex w-full flex-col gap-6 lg:w-[55%] xl:w-[60%]">
        <!-- Stats Bar -->
        <div class="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-emerald-500">verified_user</span>
            <span class="text-sm font-bold text-slate-700 dark:text-white">{{ safeAndSecureCount }}</span>
            <span class="text-xs text-slate-500">Safe & Secure</span>
          </div>
          <div class="w-px h-6 bg-slate-200 dark:bg-gray-600 hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-green-500">workspace_premium</span>
            <span class="text-sm font-bold text-slate-700 dark:text-white">{{ gradeACount }}</span>
            <span class="text-xs text-slate-500">Grade A</span>
          </div>
          <div class="w-px h-6 bg-slate-200 dark:bg-gray-600 hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-amber-500">verified</span>
            <span class="text-sm font-bold text-slate-700 dark:text-white">{{ gradeBCount }}</span>
            <span class="text-xs text-slate-500">Grade B</span>
          </div>
          <div class="flex-1"></div>
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
            <span class="material-symbols-outlined text-primary text-[18px]">format_list_numbered</span>
            <span class="text-sm font-bold text-primary">{{ restaurants.length }}</span>
            <span class="text-xs text-slate-600 dark:text-slate-400">results</span>
          </div>
        </div>

        <template v-if="restaurants.length > 0">
          <DiningCard 
            v-for="restaurant in restaurants" 
            :key="restaurant.id"
            :data-restaurant-id="restaurant.id"
            :restaurant="restaurant"
            :is-selected="selectedRestaurant?.id === restaurant.id"
            :geocoding-status="getGeocodingStatus(restaurant.id)"
            :distance="userLocation ? formatDistance(getDistanceFromUser(restaurant)) : ''"
            @click="handleCardClick(restaurant)"
            @view-details="openDetails(restaurant)"
          />
        </template>
        
        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-16 text-center">
          <div class="mb-4 p-4 rounded-full bg-slate-100 dark:bg-gray-800">
            <span class="material-symbols-outlined text-4xl text-slate-400">search_off</span>
          </div>
          <h3 class="text-xl font-bold text-slate-700 dark:text-white mb-2">No restaurants found</h3>
          <p class="text-slate-500 dark:text-slate-400 max-w-md">
            Try adjusting your filters or selecting a different city to find more dining options.
          </p>
          <button 
            @click="resetFilters"
            class="mt-4 px-6 py-2 rounded-full bg-primary text-dark-charcoal font-bold hover:bg-primary/90 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <!-- Sticky Map (Right) -->
      <div class="mb-8 w-full lg:mb-0 lg:h-[calc(100vh-200px)] lg:w-[45%] xl:w-[40%] sticky lg:top-36">
        <div class="h-[400px] w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-gray-800 shadow-md lg:h-full">
          <ClientOnly>
            <DiningMap 
              :restaurants="mappableRestaurants"
              :selected-restaurant="selectedRestaurant"
              @select-restaurant="handleMapSelect"
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

    <!-- Restaurant Details Modal -->
    <DiningDetailsModal 
      v-if="selectedRestaurant"
      :show="showDetails"
      :restaurant="selectedRestaurant"
      @close="closeDetails"
      @add-to-trip="handleAddToTrip"
    />

    <!-- Floating Action Button -->
    <button 
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-dark-charcoal shadow-xl transition-transform hover:scale-105 hover:bg-primary/90"
    >
      <span class="material-symbols-outlined">arrow_upward</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import { useDining, type Restaurant, type DiningFilter, type SortOption } from '~/composables/useDining'

// SEO Meta
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Clean Dining & Food Guide - CeylonGuide',
  meta: [
    { name: 'description', content: 'Discover hygienic and certified culinary experiences across Sri Lanka\'s most beautiful locales.' }
  ]
})

// Filter options configuration - drives the filter bar
const filterOptions: { value: DiningFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: 'restaurant' },
  { value: 'safeAndSecure', label: 'Safe & Secure', icon: 'verified_user' },
  { value: 'vegetarian', label: 'Vegetarian', icon: 'spa' },
  { value: 'vegan', label: 'Vegan', icon: 'eco' },
  { value: 'halal', label: 'Halal', icon: 'restaurant_menu' },
  { value: 'highHygiene', label: 'High Hygiene', icon: 'water_drop' },
  { value: 'premium', label: 'Fine Dining', icon: 'diamond' }
]

// Use dining composable
const { 
  restaurants,
  mappableRestaurants,
  cities, 
  selectedFilter,
  selectedRestaurant,
  showDetails,
  setFilter,
  setCity,
  setSearch,
  setSort,
  openDetails,
  closeDetails,
  selectRestaurant,
  resetFilters,
  initGeocoding,
  getGeocodingStatus,
  getUserLocation,
  userLocation,
  isLocating,
  locationError,
  getDistanceFromUser,
  formatDistance
} = useDining()

// Initialize geocoding for restaurants without coordinates
onMounted(() => {
  // Start geocoding in background (won't block UI)
  initGeocoding()
})

// Local state for UI controls
const selectedCityValue = ref('all')
const selectedSortValue = ref<SortOption>('recommended')
const searchInput = ref('')

// Computed stats for current filtered results
const safeAndSecureCount = computed(() => 
  restaurants.value.filter(r => r.certificationType === 'SafeAndSecure').length
)
const gradeACount = computed(() => 
  restaurants.value.filter(r => r.certificationType === 'TouristFriendlyGradeA').length
)
const gradeBCount = computed(() => 
  restaurants.value.filter(r => r.certificationType === 'TouristFriendlyGradeB').length
)

// Debounced search
let searchTimeout: ReturnType<typeof setTimeout> | null = null
function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    setSearch(searchInput.value)
  }, 300)
}

// Clear search
function clearSearch() {
  searchInput.value = ''
  setSearch('')
}

// Handle Near Me button
async function handleNearMe() {
  await getUserLocation()
}

// Handle Add to Trip button (placeholder - fires event)
function handleAddToTrip(restaurant: Restaurant) {
  // TODO: Integrate with trip planning feature
  console.log('Add to trip:', restaurant.id, restaurant.name)
  alert(`"${restaurant.name}" has been added to your trip! (Placeholder)`)
  closeDetails()
}

// Handle clicking a restaurant card - select it (map will pan via watch)
function handleCardClick(restaurant: Restaurant) {
  selectRestaurant(restaurant)
}

// Handle clicking a map marker - select and scroll card into view
function handleMapSelect(restaurant: Restaurant) {
  selectRestaurant(restaurant)
  
  // Scroll the card into view
  nextTick(() => {
    const cardElement = document.querySelector(`[data-restaurant-id="${restaurant.id}"]`)
    if (cardElement) {
      cardElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  })
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* Custom scrollbar for horizontal lists */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
