<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="isOpen" class="fixed inset-0 z-50">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          @click="$emit('close')"
        />
        
        <!-- Drawer -->
        <div class="absolute right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-surface-dark shadow-2xl overflow-y-auto">
          <!-- Header -->
          <div class="sticky top-0 z-10 flex items-center justify-between bg-white/95 dark:bg-surface-dark/95 backdrop-blur-sm px-6 py-4 border-b border-gray-100 dark:border-white/10">
            <div>
              <h2 class="text-xl font-bold text-neutral-dark dark:text-white">
                {{ accommodation?.name || 'Stay Details' }}
              </h2>
              <p v-if="accommodation?.location" class="text-sm text-neutral-gray flex items-center gap-1 mt-0.5">
                <span class="material-symbols-outlined text-[14px]">location_on</span>
                {{ accommodation.location.name }}, {{ accommodation.location.district }}
              </p>
            </div>
            <button 
              @click="$emit('close')" 
              class="rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center py-20">
            <div class="flex flex-col items-center gap-3">
              <div class="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <span class="text-sm text-neutral-gray">Loading details...</span>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-6 text-center">
            <span class="material-symbols-outlined text-[48px] text-red-400">error</span>
            <p class="mt-2 text-sm text-red-600">{{ error }}</p>
          </div>

          <!-- Content -->
          <div v-else-if="accommodation" class="flex flex-col">
            <!-- Hero Image -->
            <img 
              v-if="accommodation.image_url" 
              :src="accommodation.image_url" 
              :alt="accommodation.name"
              class="w-full h-56 object-cover"
            />

            <div class="p-6 flex flex-col gap-6">
              <!-- Price & Rating Row -->
              <div class="flex items-center justify-between">
                <div>
                  <div class="flex items-baseline gap-1">
                    <span class="text-3xl font-bold text-primary">${{ accommodation.price_per_night_usd || toUsd(accommodation.price_per_night_lkr) }}</span>
                    <span class="text-sm text-neutral-gray">/ night</span>
                  </div>
                  <div v-if="accommodation.price_range" class="text-xs text-neutral-gray mt-0.5">
                    {{ priceRangeLabels[accommodation.price_range] || accommodation.price_range }} price range
                  </div>
                </div>
                <div class="text-right">
                  <div class="flex items-center gap-1 text-lg font-bold text-neutral-dark dark:text-white">
                    <span class="material-symbols-outlined text-yellow-500 fill-current text-[20px]">star</span>
                    {{ accommodation.rating?.toFixed(1) || 'N/A' }}
                  </div>
                  <div class="text-xs text-neutral-gray">
                    {{ accommodation.review_count?.toLocaleString() || 0 }} reviews
                  </div>
                </div>
              </div>

              <!-- Type & Safety Badge -->
              <div class="flex flex-wrap gap-2">
                <span class="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:bg-white/10 dark:text-neutral-300">
                  <span class="material-symbols-outlined text-[16px]">{{ categoryIcons[accommodation.category] || 'hotel' }}</span>
                  {{ formatCategory(accommodation.category) }}
                </span>
                
                <!-- Safety Certified Badge with Tooltip -->
                <div v-if="accommodation.safety_certified" class="relative group">
                  <span class="inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300 cursor-help">
                    <span class="material-symbols-outlined text-[16px]">verified_user</span>
                    Safety Certified
                  </span>
                  <!-- Tooltip -->
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 z-20">
                    <div class="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                      <div class="font-semibold mb-1">✓ CeylonGuides Verified</div>
                      <ul class="space-y-0.5 text-gray-300">
                        <li>• Fire safety equipment checked</li>
                        <li>• 24/7 security on premises</li>
                        <li>• Emergency contact available</li>
                        <li>• COVID-19 protocols followed</li>
                      </ul>
                      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                        <div class="border-8 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Review-based Confidence (High Rating + Not Certified) -->
                <div v-else-if="accommodation.rating >= 4.5" class="relative group">
                  <span class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 cursor-help">
                    <span class="material-symbols-outlined text-[16px]">stars</span>
                    Review-based Confidence
                  </span>
                  <!-- Tooltip -->
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 z-20">
                    <div class="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                      <div class="font-semibold mb-1">High Review Confidence</div>
                      <p class="text-gray-300 mb-1">
                        Not officially safety certified, but consistently highly rated by travelers (>4.5★).
                      </p>
                      <div class="text-[10px] text-gray-400 font-medium">
                        Implied Score: {{ (accommodation.rating * 2).toFixed(1) }}/10
                      </div>
                      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                        <div class="border-8 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <span v-if="accommodation.is_verified" class="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  <span class="material-symbols-outlined text-[16px]">verified</span>
                  Verified Listing
                </span>
              </div>

              <!-- Description -->
              <div>
                <h3 class="text-sm font-bold text-neutral-dark dark:text-white mb-2">About this stay</h3>
                <p class="text-sm text-neutral-gray dark:text-neutral-400 leading-relaxed">
                  {{ accommodation.description || 'No description available for this accommodation.' }}
                </p>
              </div>

              <!-- Amenities -->
              <div v-if="accommodation.amenities?.length">
                <h3 class="text-sm font-bold text-neutral-dark dark:text-white mb-3">Amenities</h3>
                <div class="grid grid-cols-2 gap-2">
                  <div 
                    v-for="amenity in accommodation.amenities" 
                    :key="amenity"
                    class="flex items-center gap-2 rounded-lg bg-gray-50 dark:bg-white/5 px-3 py-2"
                  >
                    <span class="material-symbols-outlined text-[18px] text-primary">{{ amenityIcons[amenity] || 'check_circle' }}</span>
                    <span class="text-sm text-neutral-dark dark:text-neutral-300">{{ formatAmenity(amenity) }}</span>
                  </div>
                </div>
              </div>

              <!-- Region Travel Tips -->
              <div v-if="regionTip" class="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4">
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-[20px] mt-0.5">lightbulb</span>
                  <div>
                    <h4 class="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">
                      {{ accommodation.region_key ? regionLabels[accommodation.region_key] : 'Travel Tip' }}
                    </h4>
                    <p class="text-xs text-amber-700 dark:text-amber-400">
                      {{ regionTip }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Contact Info -->
              <div v-if="accommodation.contact_phone || accommodation.contact_email">
                <h3 class="text-sm font-bold text-neutral-dark dark:text-white mb-3">Contact</h3>
                <div class="space-y-2">
                  <a 
                    v-if="accommodation.contact_phone" 
                    :href="`tel:${accommodation.contact_phone}`"
                    class="flex items-center gap-2 text-sm text-neutral-gray hover:text-primary transition-colors"
                  >
                    <span class="material-symbols-outlined text-[18px]">phone</span>
                    {{ accommodation.contact_phone }}
                  </a>
                  <a 
                    v-if="accommodation.contact_email" 
                    :href="`mailto:${accommodation.contact_email}`"
                    class="flex items-center gap-2 text-sm text-neutral-gray hover:text-primary transition-colors"
                  >
                    <span class="material-symbols-outlined text-[18px]">email</span>
                    {{ accommodation.contact_email }}
                  </a>
                </div>
              </div>

              <!-- Booking / Source -->
              <div class="border-t border-gray-100 dark:border-white/10 pt-6">
                <a 
                  v-if="accommodation.website_url"
                  :href="accommodation.website_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
                >
                  <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                  Open in Booking Site
                </a>
                <div v-else class="flex items-center justify-center gap-2 text-sm text-neutral-gray">
                  <span class="material-symbols-outlined text-[16px]">info</span>
                  <span>Source: Booking.com / Expedia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Accommodation } from '~/types/api'

const props = defineProps<{
  isOpen: boolean
  accommodationId: string | number | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const accommodation = ref<Accommodation | null>(null)
const loading = ref(false)
const error = ref('')

// Category icons
const categoryIcons: Record<string, string> = {
  'BOUTIQUE': 'storefront',
  'GUESTHOUSE': 'cottage',
  'HOTEL': 'hotel',
  'RESORT': 'pool',
  'VILLA': 'villa',
  'HOMESTAY': 'home',
  'HOSTEL': 'bed',
}

// Amenity icons
const amenityIcons: Record<string, string> = {
  wifi: 'wifi',
  pool: 'pool',
  spa: 'spa',
  breakfast: 'free_breakfast',
  restaurant: 'restaurant',
  parking: 'local_parking',
  airport_shuttle: 'airport_shuttle',
  garden: 'yard',
  gym: 'fitness_center',
  beach: 'beach_access',
  ac: 'ac_unit',
}

// Price range labels
const priceRangeLabels: Record<string, string> = {
  '$': 'Budget',
  '$$': 'Mid-range',
  '$$$': 'Upscale',
  '$$$$': 'Luxury',
}

// Region labels and tips
const regionLabels: Record<string, string> = {
  west_colombo: 'Colombo & West Coast',
  cultural_triangle: 'Cultural Triangle',
  hill_country: 'Hill Country',
  south: 'Southern Coast',
  east: 'East Coast',
  north: 'Northern Province',
}

const regionTips: Record<string, string> = {
  west_colombo: 'Best time to visit: Year-round. The west coast is well-connected with international airport nearby.',
  cultural_triangle: 'Don\'t miss Sigiriya Rock Fortress and ancient temples. Hire a local guide for deeper insights.',
  hill_country: 'Pack layers - temperatures drop at night. The scenic train from Kandy to Ella is a must-do experience.',
  south: 'Visit Galle Fort for colonial architecture. Best beaches between November and April.',
  east: 'Less crowded eastern beaches are best from April to September. Great surfing at Arugam Bay.',
  north: 'Explore the unique Tamil culture and cuisine. Jaffna is known for its distinctive architecture and spicy food.',
}

const regionTip = computed(() => {
  if (!accommodation.value?.region_key) return null
  return regionTips[accommodation.value.region_key] || null
})

function formatCategory(category: string): string {
  return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function formatAmenity(amenity: string): string {
  return amenity.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function toUsd(lkr?: number): number {
  return lkr ? Math.round(lkr / 300) : 0
}

async function fetchDetails() {
  if (!props.accommodationId) return
  
  loading.value = true
  error.value = ''
  accommodation.value = null

  try {
    const response = await $fetch<{ success: boolean; data: Accommodation }>(
      `${apiBase}/api/accommodations/${props.accommodationId}`
    )
    if (response.success) {
      accommodation.value = response.data
    } else {
      error.value = 'Failed to load accommodation details'
    }
  } catch (e: any) {
    error.value = e?.data?.error || 'Failed to load details. Please try again.'
  } finally {
    loading.value = false
  }
}

watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.accommodationId) {
    fetchDetails()
  }
})

watch(() => props.accommodationId, () => {
  if (props.isOpen && props.accommodationId) {
    fetchDetails()
  }
})
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}

.drawer-enter-active > div:first-child,
.drawer-leave-active > div:first-child {
  transition: opacity 0.3s ease;
}

.drawer-enter-active > div:last-child,
.drawer-leave-active > div:last-child {
  transition: transform 0.3s ease;
}

.drawer-enter-from > div:first-child,
.drawer-leave-to > div:first-child {
  opacity: 0;
}

.drawer-enter-from > div:last-child,
.drawer-leave-to > div:last-child {
  transform: translateX(100%);
}
</style>
