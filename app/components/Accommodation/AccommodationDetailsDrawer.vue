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
                {{ accommodation?.title || 'Stay Details' }}
              </h2>
              <p v-if="accommodation?.location" class="text-sm text-neutral-gray flex items-center gap-1 mt-0.5">
                <span class="material-symbols-outlined text-[14px]">location_on</span>
                {{ accommodation.location }}
              </p>
            </div>
            <button 
              @click="$emit('close')" 
              class="rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Content -->
          <div v-if="accommodation" class="flex flex-col">
            <!-- Hero Image -->
            <img 
              v-if="accommodation.image" 
              :src="accommodation.image" 
              :alt="accommodation.title"
              class="w-full h-56 object-cover"
            />

            <div class="p-6 flex flex-col gap-6">
              <!-- Price & Rating Row -->
              <div class="flex items-center justify-between">
                <div>
                  <div class="flex items-baseline gap-1">
                    <span class="text-3xl font-bold text-primary">${{ accommodation.price }}</span>
                    <span class="text-sm text-neutral-gray">/ night</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="flex items-center gap-1 text-lg font-bold text-neutral-dark dark:text-white">
                    <span class="material-symbols-outlined text-yellow-500 fill-current text-[20px]">star</span>
                    {{ accommodation.rating?.toFixed(1) || 'N/A' }}
                  </div>
                  <div class="text-xs text-neutral-gray">
                    {{ accommodation.reviews?.toLocaleString() || 0 }} reviews
                  </div>
                </div>
              </div>

              <!-- Type & Safety Badge -->
              <div class="flex flex-wrap gap-2">
                <span class="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:bg-white/10 dark:text-neutral-300">
                  <span class="material-symbols-outlined text-[16px]">{{ categoryIcons[accommodation.type] || 'hotel' }}</span>
                  {{ formatCategory(accommodation.type) }}
                </span>
                
                <!-- Safety Certified Badge with Tooltip -->
                <div v-if="accommodation.isSafetyCertified" class="relative group">
                  <span class="inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300 cursor-help">
                    <span class="material-symbols-outlined text-[16px]">verified_user</span>
                    Safety Certified
                  </span>
                  <!-- Tooltip -->
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 z-20">
                    <div class="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                      <div class="font-semibold mb-1">✓ CeylonWiki Verified</div>
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
                    :key="amenity.label"
                    class="flex items-center gap-2 rounded-lg bg-gray-50 dark:bg-white/5 px-3 py-2"
                  >
                    <span class="material-symbols-outlined text-[18px] text-primary">{{ amenity.icon }}</span>
                    <span class="text-sm text-neutral-dark dark:text-neutral-300">{{ amenity.label }}</span>
                  </div>
                </div>
              </div>

              <!-- Region Travel Tips -->
              <div v-if="regionTip" class="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4">
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-amber-600 dark:text-amber-400 text-[20px] mt-0.5">lightbulb</span>
                  <div>
                    <h4 class="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">
                      {{ accommodation.region ? regionLabels[accommodation.region] : 'Travel Tip' }}
                    </h4>
                    <p class="text-xs text-amber-700 dark:text-amber-400">
                      {{ regionTip }}
                    </p>
                  </div>
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
import { computed } from 'vue'
import type { Accommodation } from '~/types/api'

const props = defineProps<{
  isOpen: boolean
  accommodation: Accommodation | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

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
  if (!props.accommodation?.region) return null
  return regionTips[props.accommodation.region] || null
})

function formatCategory(category: string): string {
  return (category || '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}
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
