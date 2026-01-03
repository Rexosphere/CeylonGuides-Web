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
          <button class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 px-5 hover:border-dining-primary dark:hover:border-dining-primary transition-colors group">
            <span class="material-symbols-outlined text-[18px] text-green-600">eco</span>
            <span class="text-[#111718] dark:text-gray-200 text-sm font-medium">Vegetarian</span>
          </button>
          <button class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 px-5 hover:border-dining-primary dark:hover:border-dining-primary transition-colors group">
            <span class="material-symbols-outlined text-[18px] text-green-500">nutrition</span>
            <span class="text-[#111718] dark:text-gray-200 text-sm font-medium">Vegan</span>
          </button>
          <button class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 px-5 hover:border-dining-primary dark:hover:border-dining-primary transition-colors group">
            <span class="material-symbols-outlined text-[18px] text-purple-500">restaurant</span>
            <span class="text-[#111718] dark:text-gray-200 text-sm font-medium">Halal</span>
          </button>
          <button class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 px-5 hover:border-dining-primary dark:hover:border-dining-primary transition-colors group">
            <span class="material-symbols-outlined text-[18px] text-blue-500">verified_user</span>
            <span class="text-[#111718] dark:text-gray-200 text-sm font-medium">Safe & Secure</span>
          </button>
          <button class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1f2b2e] border border-gray-200 dark:border-gray-700 px-5 hover:border-dining-primary dark:hover:border-dining-primary transition-colors group">
            <span class="material-symbols-outlined text-[18px] text-coral-orange">spa</span>
            <span class="text-[#111718] dark:text-gray-200 text-sm font-medium">5-Lotus Hygiene</span>
          </button>
        </div>
      </div>

      <!-- Split View Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        <!-- List View (Left) -->
        <div class="lg:col-span-7 flex flex-col gap-6">
          <!-- Card 1 -->
          <div class="group flex flex-col sm:flex-row bg-white dark:bg-[#1f2b2e] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-transparent hover:border-dining-primary/20">
            <div class="sm:w-64 h-56 sm:h-auto shrink-0 bg-cover bg-center relative" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHr9R3dphpY00UnndZV5SRY95xpd63aoBqiQKVPpNh8rH_ptNlzhy8yPnLPk93wmaqd0X5AYA-vJbhILBbVs0p8f34DdUXHSBsJ-akl49oBoNMtZmg4KcmvH653ZCvEqwQSQZ9sG6TCrsTvTLSHnZrKUJ7l_0EiZsJzJBeQf_vrlt35guRYc5Jzr9PvbbvSrzSE5ioo9F5dn2O95HglYuyuO-u9LuA0qK7zwv-q6FEdgVTj7f4Y9IcI_3e2bmRrWXKE4DJ73Wmm5y8");'>
              <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-deep-teal dark:text-dining-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                Kandy
              </div>
            </div>
            <div class="flex flex-col flex-grow p-5 justify-between">
              <div>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold text-[#111718] dark:text-white group-hover:text-dining-primary transition-colors">The Coconut Tree</h3>
                  <div class="flex items-center gap-0.5 text-coral-orange" title="5/5 Hygiene Score">
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                  </div>
                </div>
                <p class="text-[#618689] dark:text-gray-400 text-sm mb-4 line-clamp-2">Authentic clay pot cooking with verified organic ingredients sourced directly from local farmers.</p>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="px-3 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-medium border border-green-100 dark:border-green-800">Vegan Friendly</span>
                <span class="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-100 dark:border-blue-800">Safe & Secure</span>
                <span class="px-3 py-1 rounded-lg bg-background-light dark:bg-white/5 text-[#618689] dark:text-gray-400 text-xs font-medium">Outdoor Seating</span>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="group flex flex-col sm:flex-row bg-white dark:bg-[#1f2b2e] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-transparent hover:border-dining-primary/20">
            <div class="sm:w-64 h-56 sm:h-auto shrink-0 bg-cover bg-center relative" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCAa926dE3EJJlCGlwmQCOJ9f3dQreiP7fNAFl3tJHmbFO5uLLC8hGOWVb-pub2WkUHStVGx0zZG8jWlNYB_MJALCeur91He9UA3xLf5SXqa06y0KQvxgQ0fVtjqDGL35VMGYQkvFctSpl35TQvLcizazZfSYYhAcw3Mt3jbpykFQ3_UGlSbrt4Hy8f3zKbLARLSbqrf0Qy8uG5zLwRE2wlB_MjUUn-9sOcCySdehFGknEBs0iAjokFzXqwfBWeW-ctFFvTCvTFbqt");'>
              <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-deep-teal dark:text-dining-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                Colombo 07
              </div>
            </div>
            <div class="flex flex-col flex-grow p-5 justify-between">
              <div>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold text-[#111718] dark:text-white group-hover:text-dining-primary transition-colors">Ministry of Crab</h3>
                  <div class="flex items-center gap-0.5 text-coral-orange">
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                  </div>
                </div>
                <p class="text-[#618689] dark:text-gray-400 text-sm mb-4 line-clamp-2">World-renowned lagoon crab prepared with high standards of hygiene and traditional spices.</p>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium border border-purple-100 dark:border-purple-800">Halal Certified</span>
                <span class="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-100 dark:border-blue-800">Premium Hygiene</span>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="group flex flex-col sm:flex-row bg-white dark:bg-[#1f2b2e] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-transparent hover:border-dining-primary/20">
            <div class="sm:w-64 h-56 sm:h-auto shrink-0 bg-cover bg-center relative" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_X7j8_HRxMzgWiufFHPBxt2lZZvevI_64QQmzqZENt8BoIoDnquNBUAIp-udk3HJVaGbRv3lps8ZqJmh3oC7aBg70OblwCzd5LzSt0AF-1WYOdVYiP1mO0PDj1xJKEqQtxcYNIqoZEGya-Xrd7Mfx-yJkrA63UPuR73EcGgfyeomp5n0JcVhbxfQifh8fajF4dGLhYMbtalMcSA1sFQbcWoINkHGztQJZlvaR854dqCkzvI01dSMG8jgDAGhBvQ8Kbj--uPdxho6L");'>
              <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-deep-teal dark:text-dining-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                Mirissa
              </div>
            </div>
            <div class="flex flex-col flex-grow p-5 justify-between">
              <div>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold text-[#111718] dark:text-white group-hover:text-dining-primary transition-colors">Shady Lane</h3>
                  <div class="flex items-center gap-0.5 text-coral-orange">
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg text-gray-300 dark:text-gray-600">spa</span>
                  </div>
                </div>
                <p class="text-[#618689] dark:text-gray-400 text-sm mb-4 line-clamp-2">A healthy food cafe serving smoothie bowls, toast, and coffee. Verified water filtration systems.</p>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="px-3 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-medium border border-green-100 dark:border-green-800">Vegetarian</span>
                <span class="px-3 py-1 rounded-lg bg-background-light dark:bg-white/5 text-[#618689] dark:text-gray-400 text-xs font-medium">Breakfast</span>
              </div>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="group flex flex-col sm:flex-row bg-white dark:bg-[#1f2b2e] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-transparent hover:border-dining-primary/20">
            <div class="sm:w-64 h-56 sm:h-auto shrink-0 bg-cover bg-center relative" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAm8KYFa6uvI9L3ry3bRxpi5j3nOjVjG9CfvHlgvSadWPF0Jct_f7peqAdcvxLCR7uUUfHnhNAHQHi7tv8jaMynxe1MTOfyU7Up3HcYFxxUQu4VhyDGzuNqkqoL5cm0ogUiAqb_ka7RV0WC2KCji-UiX8lZLEhGIZqTPbE3iRhI7Dc9qggUZmHMHVmGZaPvrGtIzddYa8HjnxXp9MKjOdUslQ95OcQnDxYj7Ugr8bPEWei6okmPTL9C3ISdDRMmm97cntY94YcYqvS5");'>
              <div class="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-deep-teal dark:text-dining-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                Galle Fort
              </div>
            </div>
            <div class="flex flex-col flex-grow p-5 justify-between">
              <div>
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold text-[#111718] dark:text-white group-hover:text-dining-primary transition-colors">Poonie's Kitchen</h3>
                  <div class="flex items-center gap-0.5 text-coral-orange">
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                    <span class="material-symbols-outlined text-lg fill-current">spa</span>
                  </div>
                </div>
                <p class="text-[#618689] dark:text-gray-400 text-sm mb-4 line-clamp-2">Hidden gem in Galle Fort offering organic salads and squash thalis. Zero-waste kitchen policy.</p>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="px-3 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-medium border border-green-100 dark:border-green-800">Organic</span>
                <span class="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-100 dark:border-blue-800">Safe Certified</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Map View (Right - Sticky) -->
        <div class="lg:col-span-5 hidden lg:block">
          <div class="sticky top-28 h-[calc(100vh-140px)] w-full rounded-2xl overflow-hidden shadow-sm border border-[#f0f4f4] dark:border-gray-800 bg-[#e5e7eb] relative group/map">
            <!-- Map Image Placeholder -->
            <div class="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-60" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuACzXTubaJ8q0wtQ7TAIOO5lDM2IMjgK-FMLeGYM3iuZ-YZP8I8HezCSHT_9klZGrFgWpF-ZrfV-_-falBVrWP6pW6J09HBoeWaiKROUSwE5xMg67qUZ7dPhNmnPNUnOKWVdoN6m2U9FjBq2NSeULQTQ-02yUXnB7395VD4g0K7TWt_CUmVnUKFVRXv75HMUNLJOZX_dNdaS2MbnIV7E6jB-B_xz_JhYcjFJrvNgBuld7LeoomxJaEBn3EwbQxmkbzwe0VuTstp1LZu"); filter: grayscale(20%);'></div>
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

// Fetch restaurants from API
const { data: restaurantsResponse, pending, refresh } = await useFetch<{ 
  success: boolean
  data: Restaurant[]
  count: number 
}>(
  () => {
    const params = new URLSearchParams()
    if (selectedDietary.value) params.set('dietary', selectedDietary.value)
    if (selectedHygiene.value) params.set('hygiene', selectedHygiene.value)
    if (searchQuery.value) params.set('search', searchQuery.value)
    const queryStr = params.toString()
    return `${apiBase}/api/dining${queryStr ? `?${queryStr}` : ''}`
  },
  { watch: [selectedDietary, selectedHygiene, searchQuery] }
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
