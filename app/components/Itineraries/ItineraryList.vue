<template>
  <section class="py-16 px-4 sm:px-10 layout-container">
    <!-- Header -->
    <div class="flex items-end justify-between mb-8 px-2">
      <div>
        <h2 class="text-text-main dark:text-white text-3xl font-bold leading-tight tracking-tight mb-2">Curated Itineraries</h2>
        <p class="text-text-muted dark:text-neutral-400">Hand-picked routes by local experts</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3 mb-8 px-2">
      <!-- Duration Filter -->
      <select 
        v-model="selectedDuration" 
        class="px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-surface-light dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="">All Durations</option>
        <option value="1-3">1-3 Days</option>
        <option value="4-7">4-7 Days</option>
        <option value="8-14">8-14 Days</option>
        <option value="15+">15+ Days</option>
      </select>

      <!-- Style Filter -->
      <select 
        v-model="selectedStyle" 
        class="px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-surface-light dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="">All Styles</option>
        <option v-for="style in allStyles" :key="style" :value="style">{{ capitalize(style) }}</option>
      </select>

      <!-- Budget Filter -->
      <select 
        v-model="selectedBudget" 
        class="px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-surface-light dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="">Any Budget</option>
        <option value="budget">Budget ($0-500)</option>
        <option value="mid-range">Mid-Range ($500-1000)</option>
        <option value="luxury">Luxury ($1000+)</option>
      </select>

      <!-- Sort -->
      <select 
        v-model="sortBy" 
        class="px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-surface-light dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 ml-auto"
      >
        <option value="recommended">Recommended</option>
        <option value="shortest">Shortest First</option>
        <option value="longest">Longest First</option>
        <option value="cheapest">Lowest Cost</option>
      </select>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink 
        v-for="itinerary in filteredItineraries" 
        :key="itinerary.id"
        :to="`/itineraries/${itinerary.slug}`"
        class="group cursor-pointer flex flex-col gap-3 bg-surface-light dark:bg-surface-dark p-3 rounded-xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/10"
      >
        <!-- Image -->
        <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all z-10"></div>
          <div 
            class="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700" 
            :style="`background-image: url('${getItineraryImage(itinerary.slug)}');`"
          ></div>
          <!-- Duration Badge -->
          <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold z-20 shadow-sm flex items-center gap-1 text-text-main dark:text-white">
            <span class="material-symbols-outlined text-xs">schedule</span> {{ itinerary.durationDays }} Days
          </div>
        </div>

        <!-- Content -->
        <div class="px-1 pb-2">
          <div class="flex justify-between items-start mb-1">
            <p class="text-text-main dark:text-white text-lg font-bold leading-normal group-hover:text-primary transition-colors">{{ itinerary.title }}</p>
            <span :class="getStyleBadgeClass(itinerary.style[0] || '')" class="text-xs font-semibold px-2 py-0.5 rounded">
              {{ capitalize(itinerary.style[0] || '') }}
            </span>
          </div>
          <p class="text-text-muted dark:text-neutral-400 text-sm font-normal leading-normal line-clamp-2">{{ truncate(itinerary.whyYouWillLoveIt, 100) }}</p>
          <div class="mt-4 pt-3 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between">
            <span class="text-xs font-medium text-text-muted">Est. ${{ itinerary.estimatedCostPerPersonUSD }}/person</span>
            <span class="text-primary text-sm font-bold flex items-center">Explore <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span></span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div v-if="filteredItineraries.length === 0" class="text-center py-16">
      <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-neutral-600 mb-4">travel_explore</span>
      <p class="text-text-muted dark:text-neutral-400 text-lg">No itineraries match your filters.</p>
      <button @click="resetFilters" class="mt-4 text-primary font-semibold hover:underline">Reset Filters</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import itinerariesData from '~/assets/data/itineraries.json'

const itineraries = itinerariesData.itineraries

// Filters
const selectedDuration = ref('')
const selectedStyle = ref('')
const selectedBudget = ref('')
const sortBy = ref('recommended')

// Get all unique styles
const allStyles = computed(() => {
  const styles = new Set<string>()
  itineraries.forEach(i => i.style.forEach(s => styles.add(s)))
  return Array.from(styles).sort()
})

// Filter logic
const filteredItineraries = computed(() => {
  let result = [...itineraries]

  // Duration filter
  if (selectedDuration.value) {
    result = result.filter(i => {
      if (selectedDuration.value === '1-3') return i.durationDays <= 3
      if (selectedDuration.value === '4-7') return i.durationDays >= 4 && i.durationDays <= 7
      if (selectedDuration.value === '8-14') return i.durationDays >= 8 && i.durationDays <= 14
      if (selectedDuration.value === '15+') return i.durationDays >= 15
      return true
    })
  }

  // Style filter
  if (selectedStyle.value) {
    result = result.filter(i => i.style.includes(selectedStyle.value))
  }

  // Budget filter
  if (selectedBudget.value) {
    result = result.filter(i => i.budgetType === selectedBudget.value)
  }

  // Sort
  if (sortBy.value === 'shortest') {
    result.sort((a, b) => a.durationDays - b.durationDays)
  } else if (sortBy.value === 'longest') {
    result.sort((a, b) => b.durationDays - a.durationDays)
  } else if (sortBy.value === 'cheapest') {
    result.sort((a, b) => (a.estimatedCostPerPersonUSD || 0) - (b.estimatedCostPerPersonUSD || 0))
  }

  return result
})

// Helper functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const truncate = (str: string, len: number) => str.length > len ? str.slice(0, len) + '...' : str

const getStyleBadgeClass = (style: string) => {
  const map: Record<string, string> = {
    cultural: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    historic: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    heritage: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    beach: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    nature: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    wildlife: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    adventure: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    luxury: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    wellness: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    budget: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    backpacking: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  }
  return map[style] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
}

const getItineraryImage = (slug: string) => {
  const imageMap: Record<string, string> = {
    'cultural-triangle-express': '/images/downloaded_42e12d701946.avif',
    'southern-beaches-wildlife': '/images/downloaded_aac0d66ad44a.avif',
    'cultural-heart-sri-lanka': '/images/downloaded_42e12d701946.avif',
    'classic-sri-lanka-highlights': '/images/downloaded_5ff6b6bbf9ad.avif',
    'luxury-wellness-tour': '/images/downloaded_0bded551fdfb.avif',
    'backpackers-sri-lanka-adventure': '/images/downloaded_aac0d66ad44a.avif',
  }
  return imageMap[slug] || '/images/downloaded_42e12d701946.avif'
}

const resetFilters = () => {
  selectedDuration.value = ''
  selectedStyle.value = ''
  selectedBudget.value = ''
  sortBy.value = 'recommended'
}
</script>
