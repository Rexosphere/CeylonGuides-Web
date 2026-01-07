<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
    <div class="flex items-end justify-between mb-6">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-text-main dark:text-white tracking-tight">
          {{ filteredSpots.length }} Photo Spots
        </h2>
        <p class="text-text-muted mt-1">Curated locations with ideal lighting conditions.</p>
      </div>
    </div>
    
    <!-- Grid -->
    <div v-if="filteredSpots.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="spot in filteredSpots" 
        :key="spot.id"
        class="group relative flex flex-col bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/10 cursor-pointer"
        @click="$emit('select', spot)"
      >
        <!-- Image -->
        <div class="relative aspect-[4/3] overflow-hidden">
          <!-- Drone Badge -->
          <div class="absolute top-3 left-3 z-20">
            <span 
              class="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded"
              :class="getDroneBadgeClass(spot.droneStatus)"
            >
              <span class="material-symbols-outlined text-xs">flight</span>
              {{ getDroneLabel(spot.droneStatus) }}
            </span>
          </div>
          <!-- Category Badge -->
          <div class="absolute top-3 right-3 z-20">
            <span class="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
              {{ spot.category }}
            </span>
          </div>
          <div 
            class="bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-110 bg-gray-200 dark:bg-gray-800" 
            :style="{ backgroundImage: spot.heroImage ? `url('${spot.heroImage}')` : `linear-gradient(135deg, var(--color-primary) 0%, #ff8a50 100%)` }"
          ></div>
        </div>
        
        <!-- Content -->
        <div class="p-5 flex flex-col flex-1">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-bold text-text-main dark:text-white leading-tight group-hover:text-primary transition-colors">
                {{ spot.name }}
              </h3>
              <div class="flex items-center gap-1 text-text-muted text-sm mt-1">
                <span class="material-symbols-outlined text-sm">location_on</span>
                {{ spot.region }}
              </div>
            </div>
          </div>
          
          <!-- Tags -->
          <div class="flex flex-wrap gap-1 mt-3 mb-4">
            <span 
              v-for="tag in spot.tags.slice(0, 3)" 
              :key="tag"
              class="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-text-muted"
            >
              {{ tag }}
            </span>
          </div>
          
          <!-- CTA -->
          <button 
            class="mt-auto w-full py-2.5 rounded-lg border border-gray-200 dark:border-white/20 text-text-main dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            @click.stop="openInMaps(spot)"
          >
            <span class="material-symbols-outlined text-[16px]">map</span>
            View Coordinates
          </button>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">search_off</span>
      <p class="mt-4 text-lg text-text-muted">No photo spots match your filters</p>
      <p class="mt-2 text-sm text-text-muted">Try clearing some filters or searching for something else</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

const props = defineProps<{
  spots: PhotoSpot[]
  search: string
}>()

defineEmits<{
  (e: 'select', spot: PhotoSpot): void
}>()

// Apply search filter
const filteredSpots = computed(() => {
  if (!props.search.trim()) return props.spots
  
  const q = props.search.toLowerCase().trim()
  return props.spots.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.region.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q) ||
    s.tags.some(t => t.toLowerCase().includes(q))
  )
})

function getDroneBadgeClass(status: string): string {
  switch (status) {
    case 'ok': return 'bg-green-500 text-white'
    case 'permit-required': return 'bg-orange-500 text-white'
    case 'caution': return 'bg-yellow-500 text-black'
    case 'not-allowed': return 'bg-red-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

function getDroneLabel(status: string): string {
  switch (status) {
    case 'ok': return 'OK'
    case 'permit-required': return 'Permit'
    case 'caution': return 'Caution'
    case 'not-allowed': return 'No Fly'
    default: return status
  }
}

function openInMaps(spot: PhotoSpot) {
  const url = `https://www.google.com/maps/search/?api=1&query=${spot.latitude},${spot.longitude}`
  window.open(url, '_blank')
}
</script>
