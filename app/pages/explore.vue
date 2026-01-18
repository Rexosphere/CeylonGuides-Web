<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col">
      <!-- Hero with Planner -->
      <section class="relative">
        <div class="w-full h-[500px] bg-cover bg-center flex items-center justify-center relative" 
             role="img" 
             aria-label="Panoramic view of tea plantations in Sri Lanka with misty mountains" 
             style="background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('/images/downloaded_0bded551fdfb.avif');">
          <div class="text-center px-4 max-w-3xl relative z-10">
            <h1 class="text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] mb-4 drop-shadow-sm">
              Craft Your Ceylon Journey
            </h1>
            <p class="text-white/90 text-lg md:text-xl font-medium mb-8">
              Plan your perfect Sri Lankan adventure with our curated guides and custom tools.
            </p>
            <div class="bg-white/95 dark:bg-surface-dark/95 backdrop-blur-sm p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3 max-w-2xl mx-auto border border-white/20">
              <!-- Dates Section -->
              <div class="flex-1 flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer group"
                   @click="dateInputRef?.showPicker?.()">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-primary">calendar_month</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold text-text-muted dark:text-neutral-400 uppercase tracking-wide">When</p>
                  <div class="flex items-center gap-2 text-sm font-medium">
                    <template v-if="startDate && endDate">
                      <span class="text-text-main dark:text-white">{{ formatDate(startDate) }}</span>
                      <span class="text-text-muted">→</span>
                      <span class="text-text-main dark:text-white">{{ formatDate(endDate) }}</span>
                      <span class="text-primary text-xs font-bold ml-1">({{ tripDuration }} days)</span>
                    </template>
                    <span v-else class="text-text-muted dark:text-neutral-500 group-hover:text-text-main dark:group-hover:text-white transition-colors">
                      Select travel dates
                    </span>
                  </div>
                  <!-- Hidden date inputs -->
                  <input 
                    ref="dateInputRef"
                    v-model="startDate" 
                    type="date"
                    class="sr-only"
                    @change="handleStartDateChange"
                  />
                  <input 
                    v-model="endDate" 
                    type="date"
                    class="sr-only"
                    ref="endDateRef"
                  />
                </div>
                <span class="material-symbols-outlined text-text-muted text-sm group-hover:text-primary transition-colors">edit_calendar</span>
              </div>

              <!-- Travel Style Section -->
              <div class="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors min-w-[180px]">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-primary">travel_explore</span>
                </div>
                <div class="flex-1">
                  <p class="text-xs font-semibold text-text-muted dark:text-neutral-400 uppercase tracking-wide">Style</p>
                  <select v-model="travelStyle" class="w-full bg-transparent border-none focus:ring-0 text-sm font-medium dark:text-white cursor-pointer focus:outline-none text-text-main p-0 -ml-1">
                    <option value="">Any style</option>
                    <option value="relaxed">Relaxed</option>
                    <option value="adventure">Adventure</option>
                    <option value="culture">Culture</option>
                    <option value="nature">Nature</option>
                    <option value="budget">Budget</option>
                    <option value="luxury">Luxury</option>
                    <option value="family">Family</option>
                  </select>
                </div>
              </div>

              <!-- CTA Button -->
              <button 
                @click="startPlanning" 
                class="bg-primary text-white px-6 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all whitespace-nowrap flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
                Start Planning
              </button>
            </div>
            
            <!-- Date hint -->
            <p v-if="showDateHint" class="text-center text-red-400 text-sm font-medium mt-3 animate-pulse">
              ⚠️ Please select your travel dates to continue
            </p>
          </div>
        </div>
      </section>

      <!-- Curated Itineraries Section -->
      <section class="py-16 px-4 sm:px-10 layout-container">
        <div class="flex items-end justify-between mb-8 px-2">
          <div>
            <h2 class="text-text-main dark:text-white text-3xl font-bold leading-tight tracking-tight mb-2">Curated Itineraries</h2>
            <p class="text-text-muted dark:text-neutral-400">Hand-picked routes by local experts</p>
          </div>
          <NuxtLink to="/itineraries" class="hidden sm:flex items-center text-primary font-bold text-sm hover:underline">
            View all guides <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span>
          </NuxtLink>
        </div>

        <!-- Grid of 3 featured itineraries -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink 
            v-for="itinerary in featuredItineraries" 
            :key="itinerary.id"
            :to="`/itineraries/${itinerary.slug}`"
            class="group cursor-pointer flex flex-col gap-3 bg-surface-light dark:bg-surface-dark p-3 rounded-xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/10"
          >
            <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all z-10"></div>
              <div 
                class="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-700" 
                :style="`background-image: url('${getItineraryImage(itinerary.slug)}');`"
              ></div>
              <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold z-20 shadow-sm flex items-center gap-1 text-text-main dark:text-white">
                <span class="material-symbols-outlined text-xs">schedule</span> {{ itinerary.durationDays }} Days
              </div>
            </div>
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

        <!-- Mobile View All -->
        <div class="sm:hidden mt-6 text-center">
          <NuxtLink to="/itineraries" class="inline-flex items-center text-primary font-bold text-sm hover:underline">
            View all guides <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Trip Builder CTA -->
      <section class="py-16 px-4 sm:px-10 bg-gradient-to-r from-primary/10 to-orange-100 dark:from-primary/20 dark:to-orange-900/20">
        <div class="layout-container text-center">
          <span class="material-symbols-outlined text-5xl text-primary mb-4">edit_calendar</span>
          <h2 class="text-3xl font-bold mb-4">Build Your Custom Trip</h2>
          <p class="text-text-muted dark:text-neutral-400 max-w-xl mx-auto mb-8">
            Drag and drop activities, set your dates, and create the perfect Sri Lankan adventure tailored just for you.
          </p>
          <NuxtLink to="/trip-builder" class="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors">
            <span class="material-symbols-outlined">construction</span>
            Open Trip Builder
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import itinerariesData from '~/assets/data/itineraries.json'
import { useTripBuilder } from '~/composables/useTripBuilder'

const router = useRouter()
const { setDates, setTravelStyle, initializeDays } = useTripBuilder()

const startDate = ref('')
const endDate = ref('')
const travelStyle = ref('')
const showDateHint = ref(false)
const dateInputRef = ref<HTMLInputElement | null>(null)

const featuredItineraries = computed(() => itinerariesData.itineraries.slice(0, 3))

// Format date for display (e.g. "Oct 15, 2023")
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Calculate trip duration in days
const tripDuration = computed(() => {
  if (!startDate.value || !endDate.value) return 0
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 
})

// Auto-set end date to +7 days when start date changes (if end date is empty or invalid)
const handleStartDateChange = () => {
  if (!startDate.value) return
  
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  
  if (!endDate.value || end <= start) {
    const newEnd = new Date(start)
    newEnd.setDate(start.getDate() + 7)
    endDate.value = newEnd.toISOString().slice(0, 10)
  }
}

const startPlanning = () => {
  // If no dates selected, show hint and focus
  if (!startDate.value || !endDate.value) {
    showDateHint.value = true
    dateInputRef.value?.focus()
    return
  }

  // Set state in composable
  setDates(startDate.value, endDate.value)
  if (travelStyle.value) {
    setTravelStyle(travelStyle.value)
  }

  // Navigate with query params
  router.push({
    path: '/trip-builder',
    query: {
      start: startDate.value,
      end: endDate.value,
      style: travelStyle.value || undefined
    }
  })
}

const openTripBuilder = () => {
  if (travelStyle.value) {
    setTravelStyle(travelStyle.value)
  }
  initializeDays(3) // Default to 3 days
  router.push('/trip-builder')
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
const truncate = (str: string, len: number) => str.length > len ? str.slice(0, len) + '...' : str

const getStyleBadgeClass = (style: string) => {
  const map: Record<string, string> = {
    cultural: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    beach: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    adventure: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    luxury: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  }
  return map[style] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
}

const getItineraryImage = (slug: string) => {
  const map: Record<string, string> = {
    'cultural-triangle-express': '/images/downloaded_42e12d701946.avif',
    'southern-beaches-wildlife': '/images/downloaded_aac0d66ad44a.avif',
    'cultural-heart-sri-lanka': '/images/downloaded_42e12d701946.avif',
  }
  return map[slug] || '/images/downloaded_42e12d701946.avif'
}

useHead({
  title: 'Explore Sri Lanka - CeylonWiki',
  meta: [
    { name: 'description', content: 'Plan your perfect Sri Lankan adventure with curated itineraries and a custom trip builder.' }
  ]
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #f45c25;
}
</style>
