<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex-grow w-full">
      <PhotoHero v-model="searchQuery" />
      <PhotoFilters
        :categories="categories"
        :droneStatuses="droneStatuses"
        :selectedCategory="selectedCategory"
        :selectedDroneStatus="selectedDroneStatus"
        @update:category="handleCategoryChange"
        @update:droneStatus="handleDroneStatusChange"
      />
      <PhotoSpots 
        :spots="filteredSpots" 
        :search="searchQuery"
        @select="openModal"
      />
      <PhotoDroneRegulations />
    </main>

  </div>

  <!-- Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="selectedSpot" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>
        <div 
          class="relative bg-white dark:bg-surface-dark rounded-t-2xl sm:rounded-2xl w-full sm:max-w-xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 flex flex-col"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-surface-dark sticky top-0 z-10">
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
            <h3 class="text-base font-bold text-text-main dark:text-white truncate max-w-[70%]">
              {{ selectedSpot.name }}
            </h3>
            <div class="w-6"></div>
          </div>
          
          <!-- Content -->
          <div class="overflow-y-auto flex-1 overscroll-contain">
            <div class="flex flex-col">
              <!-- Hero Image -->
              <div 
                class="w-full aspect-video bg-gray-200 dark:bg-gray-800 bg-cover bg-center"
                :style="{ backgroundImage: selectedSpot.heroImage ? `url('${selectedSpot.heroImage}')` : `linear-gradient(135deg, var(--color-primary) 0%, #ff8a50 100%)` }"
              ></div>
              
              <div class="p-5 flex flex-col gap-4">
                <!-- Region & Badges -->
                <div class="flex items-center gap-2 text-sm text-text-muted">
                  <span class="material-symbols-outlined text-[16px]">location_on</span>
                  {{ selectedSpot.region }}
                </div>
                
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">{{ selectedSpot.category }}</span>
                  <span 
                    class="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1"
                    :class="getDroneStatusClass(selectedSpot.droneStatus)"
                  >
                    <span class="material-symbols-outlined text-[14px]">flight</span>
                    {{ getDroneStatusLabel(selectedSpot.droneStatus) }}
                  </span>
                </div>
                
                <!-- Description -->
                <p class="text-sm text-text-muted dark:text-gray-300 leading-relaxed">{{ selectedSpot.description }}</p>
                
                <!-- Best Time -->
                <div>
                  <h4 class="text-sm font-bold text-text-main dark:text-white mb-1 flex items-center gap-2">
                    <span class="material-symbols-outlined text-[16px] text-yellow-500">wb_sunny</span>
                    Best Time to Shoot
                  </h4>
                  <p class="text-sm text-text-muted dark:text-gray-400">{{ selectedSpot.bestTimeToShoot }}</p>
                </div>
                
                <!-- Recommended Shot -->
                <div v-if="selectedSpot.recommendedShot">
                  <h4 class="text-sm font-bold text-text-main dark:text-white mb-1 flex items-center gap-2">
                    <span class="material-symbols-outlined text-[16px] text-primary">photo_camera</span>
                    Recommended Shot
                  </h4>
                  <p class="text-sm text-text-muted dark:text-gray-400 italic">{{ selectedSpot.recommendedShot }}</p>
                </div>
                
                <!-- Drone Notes -->
                <div v-if="selectedSpot.droneNotes">
                  <h4 class="text-sm font-bold text-text-main dark:text-white mb-1 flex items-center gap-2">
                    <span class="material-symbols-outlined text-[16px]">flight</span>
                    Drone Info
                  </h4>
                  <p class="text-sm text-text-muted dark:text-gray-400">{{ selectedSpot.droneNotes }}</p>
                </div>
                
                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in selectedSpot.tags" 
                    :key="tag"
                    class="px-2 py-1 bg-gray-100 dark:bg-white/10 rounded text-xs text-text-muted"
                  >
                    #{{ tag }}
                  </span>
                </div>
                
                <!-- Coordinates -->
                <div class="p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                  <div class="text-xs text-text-muted mb-2">Coordinates</div>
                  <div class="text-sm font-mono text-text-main dark:text-white">
                    {{ selectedSpot.latitude }}° N, {{ selectedSpot.longitude }}° E
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- CTA -->
          <div class="p-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-surface-dark space-y-2">
            <button 
              @click="openInMaps(selectedSpot)"
              class="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-[18px]">map</span>
              Open in Google Maps
            </button>
            <button 
              @click="copyCoordinates(selectedSpot)"
              class="w-full border border-gray-200 dark:border-white/20 text-text-main dark:text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-[18px]">content_copy</span>
              Copy Coordinates
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import PhotoHero from '~/components/Photos/PhotoHero.vue'
import PhotoFilters from '~/components/Photos/PhotoFilters.vue'
import PhotoSpots from '~/components/Photos/PhotoSpots.vue'
import PhotoDroneRegulations from '~/components/Photos/PhotoDroneRegulations.vue'
import photospotsData from '~/assets/data/photospots.json'

interface PhotoSpot {
  id: number
  name: string
  slug: string
  region: string
  province: string | null
  category: string
  description: string
  bestTimeToShoot: string
  tags: string[]
  droneStatus: 'ok' | 'permit-required' | 'not-allowed' | 'caution'
  droneNotes: string
  latitude: number
  longitude: number
  recommendedShot: string
  heroImage: string | null
}

const spots = ref<PhotoSpot[]>(photospotsData as PhotoSpot[])

// Filters
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const selectedDroneStatus = ref<string | null>(null)

// Derive categories and drone statuses
const categories = computed(() => {
  const set = new Set<string>()
  spots.value.forEach(s => set.add(s.category))
  return Array.from(set)
})

const droneStatuses = ['ok', 'permit-required', 'caution', 'not-allowed']

// Filtered spots
const filteredSpots = computed(() => {
  let result = spots.value
  
  if (selectedCategory.value) {
    result = result.filter(s => s.category === selectedCategory.value)
  }
  
  if (selectedDroneStatus.value) {
    result = result.filter(s => s.droneStatus === selectedDroneStatus.value)
  }
  
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.region.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    )
  }
  
  return result
})

function handleCategoryChange(cat: string | null) {
  selectedCategory.value = cat
}

function handleDroneStatusChange(status: string | null) {
  selectedDroneStatus.value = status
}

// Modal
const selectedSpot = ref<PhotoSpot | null>(null)

function openModal(spot: PhotoSpot) {
  selectedSpot.value = spot
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedSpot.value = null
  document.body.style.overflow = ''
}

function getDroneStatusClass(status: string) {
  switch (status) {
    case 'ok': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'permit-required': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    case 'caution': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'not-allowed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    default: return 'bg-gray-100 text-gray-700'
  }
}

function getDroneStatusLabel(status: string) {
  switch (status) {
    case 'ok': return 'Drone OK'
    case 'permit-required': return 'Permit Required'
    case 'caution': return 'Use Caution'
    case 'not-allowed': return 'No Drones'
    default: return status
  }
}

function openInMaps(spot: PhotoSpot) {
  const url = `https://www.google.com/maps/search/?api=1&query=${spot.latitude},${spot.longitude}`
  window.open(url, '_blank')
}

function copyCoordinates(spot: PhotoSpot) {
  const text = `${spot.latitude}° N, ${spot.longitude}° E`
  navigator.clipboard.writeText(text)
  closeModal()
}

// ESC key handler
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && selectedSpot.value) {
    closeModal()
  }
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

useHead({
  title: 'Photo Spots Guide - CeylonGuide',
  meta: [
    { name: 'description', content: 'Discover the best photography locations in Sri Lanka. Complete guide with lighting conditions, drone regulations, and trending spots.' }
  ]
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child {
  transform: translateY(100%);
}
.modal-leave-to > div:last-child {
  transform: translateY(100%);
}
@media (min-width: 640px) {
  .modal-enter-from > div:last-child,
  .modal-leave-to > div:last-child {
    transform: translateY(20px) scale(0.95);
  }
}
</style>
