<template>
  <div class="bg-background-light dark:bg-dining-dark font-manrope text-[#111718] dark:text-white min-h-screen flex flex-col overflow-x-hidden">
    <Header variant="solid" />

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 mt-[72px]">
      <!-- Header & Filters Section -->
      <div class="flex flex-col gap-6 mb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div class="max-w-2xl">
            <h1 class="text-[#111718] dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight mb-3">Clean Dining & Safe Food Guide</h1>
            <p class="text-[#618689] dark:text-gray-400 text-lg">Discover hygienic and certified culinary experiences across Sri Lanka's most beautiful locales.</p>
          </div>
        </div>
        
        <!-- Filter Chips -->
        <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          <button class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#111718] dark:bg-white px-6 transition-transform hover:scale-105">
            <span class="text-white dark:text-[#111718] text-sm font-bold">All</span>
          </button>
          <button 
            @click="selectDietary(selectedDietary === 'VEGETARIAN' ? null : 'VEGETARIAN')"
            :class="[
              'flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors',
              selectedDietary === 'VEGETARIAN' 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 hover:border-dining-primary'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]" :class="selectedDietary === 'VEGETARIAN' ? 'text-white' : 'text-green-600'">eco</span>
            <span class="text-sm font-medium" :class="selectedDietary === 'VEGETARIAN' ? 'text-white' : 'text-[#111718] dark:text-gray-200'">Vegetarian</span>
          </button>
          <button 
            @click="selectDietary(selectedDietary === 'VEGAN' ? null : 'VEGAN')"
            :class="[
              'flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors',
              selectedDietary === 'VEGAN' 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 hover:border-dining-primary'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]" :class="selectedDietary === 'VEGAN' ? 'text-white' : 'text-green-500'">nutrition</span>
            <span class="text-sm font-medium" :class="selectedDietary === 'VEGAN' ? 'text-white' : 'text-[#111718] dark:text-gray-200'">Vegan</span>
          </button>
          <button 
            @click="selectDietary(selectedDietary === 'HALAL' ? null : 'HALAL')"
            :class="[
              'flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors',
              selectedDietary === 'HALAL' 
                ? 'bg-purple-600 text-white border-purple-600' 
                : 'bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 hover:border-dining-primary'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]" :class="selectedDietary === 'HALAL' ? 'text-white' : 'text-purple-500'">restaurant</span>
            <span class="text-sm font-medium" :class="selectedDietary === 'HALAL' ? 'text-white' : 'text-[#111718] dark:text-gray-200'">Halal</span>
          </button>
          <button 
            @click="selectHygiene(selectedHygiene === 'GOOD' ? null : 'GOOD')"
            :class="[
              'flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors',
              selectedHygiene === 'GOOD' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 hover:border-dining-primary'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]" :class="selectedHygiene === 'GOOD' ? 'text-white' : 'text-blue-500'">verified_user</span>
            <span class="text-sm font-medium" :class="selectedHygiene === 'GOOD' ? 'text-white' : 'text-[#111718] dark:text-gray-200'">Safe & Verified</span>
          </button>
          <button 
            @click="selectHygiene(selectedHygiene === 'EXCELLENT' ? null : 'EXCELLENT')"
            :class="[
              'flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors',
              selectedHygiene === 'EXCELLENT' 
                ? 'bg-coral-orange text-white border-coral-orange' 
                : 'bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 hover:border-dining-primary'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]" :class="selectedHygiene === 'EXCELLENT' ? 'text-white' : 'text-coral-orange'">spa</span>
            <span class="text-sm font-medium" :class="selectedHygiene === 'EXCELLENT' ? 'text-white' : 'text-[#111718] dark:text-gray-200'">5-Lotus Hygiene</span>
          </button>
        </div>
      </div>

      <!-- Split View Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        <!-- List View (Left) -->
        <div class="lg:col-span-7 flex flex-col gap-6">
          <!-- Dynamic Restaurant Cards -->
          <div v-if="pending" class="col-span-full flex justify-center py-12">
            <div class="animate-spin size-8 border-2 border-dining-primary border-t-transparent rounded-full"></div>
          </div>
          
          <div v-else-if="restaurants.length === 0" class="col-span-full text-center py-12 text-gray-500">
            <span class="material-symbols-outlined text-4xl mb-2">restaurant</span>
            <p>No restaurants found. Try adjusting your filters.</p>
          </div>
          
          <div v-for="restaurant in restaurants" :key="restaurant.id" class="group flex flex-col sm:flex-row bg-white dark:bg-[#1f2b2e] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-transparent hover:border-dining-primary/20">
            <div class="sm:w-64 h-56 sm:h-auto shrink-0 bg-cover bg-center relative" :style="`background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400');`">
              <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-deep-teal dark:text-dining-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                {{ restaurant.location?.name || restaurant.district || 'Sri Lanka' }}
              </div>
            </div>
            <div class="flex flex-col flex-grow p-5 justify-between">
              <div>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold text-[#111718] dark:text-white group-hover:text-dining-primary transition-colors">{{ restaurant.name }}</h3>
                  <div class="flex items-center gap-0.5 text-coral-orange" :title="`${restaurant.rating || 0}/5 Rating`">
                    <span v-for="n in 5" :key="n" class="material-symbols-outlined text-lg" :class="n <= Math.round(restaurant.rating || 0) ? 'fill-current' : 'opacity-30'">spa</span>
                  </div>
                </div>
                <p class="text-[#618689] dark:text-gray-400 text-sm mb-4 line-clamp-2">{{ restaurant.description || 'Delicious local cuisine' }}</p>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span v-if="restaurant.is_verified_halal" class="px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium border border-purple-100 dark:border-purple-800">Halal</span>
                <span v-for="option in (restaurant.dietary_options || []).slice(0, 2)" :key="option" class="px-3 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-medium border border-green-100 dark:border-green-800">{{ option }}</span>
                <span v-if="restaurant.hygiene_rating === 'EXCELLENT'" class="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-100 dark:border-blue-800">5-Lotus Hygiene</span>
              </div>
              <!-- Review Button -->
              <button @click="openReviewModal(restaurant)" class="mt-4 flex items-center gap-2 text-dining-primary text-sm font-medium hover:underline">
                <span class="material-symbols-outlined text-lg">rate_review</span>
                Leave a Review
              </button>
            </div>
          </div>
        </div>

        <!-- Map View (Right - Sticky) -->
        <div class="lg:col-span-5 hidden lg:block">
          <div class="sticky top-28 h-[calc(100vh-140px)] w-full rounded-2xl overflow-hidden shadow-sm border border-[#f0f4f4] dark:border-gray-800 bg-[#e5e7eb] relative group/map">
            <!-- Map Image Placeholder -->
            <div class="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-60" style='background-image: url("/images/downloaded_a5ef9569c1a1.avif"); filter: grayscale(20%);'></div>
            <!-- Map UI Overlay -->
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none"></div>
            
            <!-- Map Pins -->
            <div class="absolute top-1/3 left-1/4 group cursor-pointer">
              <div class="relative">
                <div class="w-10 h-10 bg-dining-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white transform transition hover:scale-110 hover:-translate-y-1">
                  <span class="material-symbols-outlined text-sm">restaurant</span>
                </div>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-[#1f2b2e] px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                  <p class="text-xs font-bold text-[#111718] dark:text-white">The Coconut Tree</p>
                  <div class="flex text-coral-orange text-[10px]">★★★★★</div>
                </div>
              </div>
            </div>
            
            <div class="absolute top-1/2 right-1/3 group cursor-pointer">
              <div class="relative">
                <div class="w-10 h-10 bg-white dark:bg-[#1f2b2e] rounded-full border-4 border-white dark:border-gray-700 shadow-lg flex items-center justify-center text-dining-primary transform transition hover:scale-110 hover:-translate-y-1">
                  <span class="material-symbols-outlined text-sm">restaurant</span>
                </div>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white dark:bg-[#1f2b2e] px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                  <p class="text-xs font-bold text-[#111718] dark:text-white">Ministry of Crab</p>
                </div>
              </div>
            </div>
            
            <div class="absolute bottom-1/4 left-1/3 group cursor-pointer">
              <div class="relative">
                <div class="w-10 h-10 bg-white dark:bg-[#1f2b2e] rounded-full border-4 border-white dark:border-gray-700 shadow-lg flex items-center justify-center text-dining-primary transform transition hover:scale-110 hover:-translate-y-1">
                  <span class="material-symbols-outlined text-sm">restaurant</span>
                </div>
              </div>
            </div>
            
            <button class="absolute bottom-4 right-4 bg-white dark:bg-[#1f2b2e] p-2 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition text-[#111718] dark:text-white">
              <span class="material-symbols-outlined block">my_location</span>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Floating Action Button -->
    <div class="fixed bottom-6 right-6 z-40">
      <button class="flex items-center gap-2 bg-dining-primary hover:bg-cyan-400 text-[#102022] px-6 py-4 rounded-full shadow-[0_4px_14px_0_rgba(19,218,236,0.39)] transition-all hover:-translate-y-1 font-bold group">
        <span class="material-symbols-outlined group-hover:rotate-90 transition-transform">add_circle</span>
        Submit Rating
      </button>
    </div>
  </div>

  <!-- Review Modal -->
  <Teleport to="body">
    <div v-if="showReviewModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="showReviewModal = false"></div>
      <div class="relative bg-white dark:bg-dining-dark rounded-2xl shadow-2xl w-full max-w-md">
        <div class="border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-[#111718] dark:text-white">Leave a Review</h2>
          <button @click="showReviewModal = false" class="text-gray-400 hover:text-gray-600">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form @submit.prevent="submitReview" class="p-6 space-y-5">
          <div v-if="selectedRestaurant">
            <p class="text-sm text-gray-500 dark:text-gray-400">Reviewing:</p>
            <p class="font-bold text-[#111718] dark:text-white">{{ selectedRestaurant.name }}</p>
          </div>
          
          <!-- Star Rating -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating *</label>
            <div class="flex gap-2">
              <button v-for="star in 5" :key="star" type="button" @click="reviewForm.rating = star"
                class="text-3xl transition-transform hover:scale-110"
                :class="star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'">
                ★
              </button>
            </div>
          </div>
          
          <!-- Comment -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Comment</label>
            <textarea v-model="reviewForm.comment" rows="3" maxlength="1000"
              class="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-[#1f2b2e] text-[#111718] dark:text-white focus:ring-2 focus:ring-dining-primary focus:border-transparent resize-none"
              placeholder="Share your experience..."></textarea>
          </div>
          
          <button type="submit" :disabled="reviewSubmitting || reviewForm.rating === 0"
            class="w-full py-3 bg-dining-primary hover:bg-dining-primary/90 disabled:bg-gray-400 text-white font-bold rounded-lg transition-all">
            {{ reviewSubmitting ? 'Submitting...' : 'Submit Review' }}
          </button>
          
          <p v-if="reviewError" class="text-red-500 text-sm text-center">{{ reviewError }}</p>
          <p v-if="reviewSuccess" class="text-green-500 text-sm text-center">Review submitted!</p>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Restaurant } from '~/composables/useApi'

definePageMeta({
  layout: false
})

// Get config
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// Filters
const selectedDietary = ref<string | null>(null)
const selectedHygiene = ref<string | null>(null)
const searchQuery = ref('')
const debouncedQuery = ref('')

// Debounce search input (300ms)
let debounceTimer: ReturnType<typeof setTimeout>
watch(searchQuery, (newVal) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = newVal
  }, 300)
})

// Review Modal State
const showReviewModal = ref(false)
const selectedRestaurant = ref<Restaurant | null>(null)
const reviewSubmitting = ref(false)
const reviewError = ref('')
const reviewSuccess = ref(false)
const reviewForm = ref({ rating: 0, comment: '' })

// Fetch restaurants from API (watches debounced query)
const { data: restaurantsResponse, pending, refresh } = await useFetch<{ 
  success: boolean
  data: Restaurant[]
  count: number 
}>(
  () => {
    const params = new URLSearchParams()
    if (selectedDietary.value) params.set('dietary', selectedDietary.value)
    if (selectedHygiene.value) params.set('hygiene', selectedHygiene.value)
    if (debouncedQuery.value) params.set('search', debouncedQuery.value)
    const queryStr = params.toString()
    return `${apiBase}/api/dining${queryStr ? `?${queryStr}` : ''}`
  },
  { watch: [selectedDietary, selectedHygiene, debouncedQuery] }
)

const restaurants = computed(() => restaurantsResponse.value?.data || [])

// Dietary filters
const dietaryFilters = [
  { id: null, label: 'All', icon: 'restaurant' },
  { id: 'VEGETARIAN', label: 'Vegetarian', icon: 'eco' },
  { id: 'VEGAN', label: 'Vegan', icon: 'psychiatry' },
  { id: 'HALAL', label: 'Halal', icon: 'mosque' },
]

// Hygiene rating helper
function getHygieneStars(rating: string): number {
  switch (rating) {
    case 'EXCELLENT': return 5
    case 'GOOD': return 4
    case 'FAIR': return 3
    case 'POOR': return 2
    default: return 0
  }
}

function selectDietary(id: string | null) {
  selectedDietary.value = selectedDietary.value === id ? null : id
}

function selectHygiene(id: string | null) {
  selectedHygiene.value = selectedHygiene.value === id ? null : id
}

function openReviewModal(restaurant: Restaurant) {
  selectedRestaurant.value = restaurant
  reviewForm.value = { rating: 0, comment: '' }
  reviewError.value = ''
  reviewSuccess.value = false
  showReviewModal.value = true
}

async function submitReview() {
  if (!selectedRestaurant.value || reviewForm.value.rating === 0) return
  
  reviewSubmitting.value = true
  reviewError.value = ''
  
  try {
    await $fetch(`${apiBase}/api/dining/${selectedRestaurant.value.id}/reviews`, {
      method: 'POST',
      body: {
        rating: reviewForm.value.rating,
        comment: reviewForm.value.comment || undefined
      }
    })
    
    reviewSuccess.value = true
    setTimeout(() => {
      showReviewModal.value = false
      refresh()
    }, 1500)
  } catch (err: any) {
    reviewError.value = err?.data?.error || 'Failed to submit review'
  } finally {
    reviewSubmitting.value = false
  }
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
