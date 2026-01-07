<template>
  <section class="py-16 bg-background-light dark:bg-background-dark min-h-screen">
    <div class="container mx-auto px-6">
      <div class="mb-10">
        <h2 class="text-3xl font-display font-bold text-primary dark:text-white mb-2">{{ spots.length }} Photo Spots
        </h2>
        <p class="text-text-muted dark:text-gray-400">Curated locations with ideal lighting conditions.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="spot in spots" :key="spot.id" @click="$emit('select', spot)"
          class="bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col group cursor-pointer">
          <div class="relative h-56 overflow-hidden">
            <img :alt="spot.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :src="getSpotImage(spot.heroImage)" />
            <div v-if="spot.droneStatus === 'permit-required'"
              class="absolute top-3 left-3 bg-accent-info/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
              Permit Required
            </div>
            <div v-if="spot.droneStatus === 'not-allowed'"
              class="absolute top-3 left-3 bg-accent-danger/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
              No Drone
            </div>
            <div
              class="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
              {{ spot.category }}
            </div>
          </div>
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="font-bold text-lg text-primary dark:text-white mb-1">{{ spot.name }}</h3>
            <div class="flex items-center gap-1 text-xs text-text-muted dark:text-gray-400 mb-3">
              <span class="material-icons text-[14px]">place</span>
              <span>{{ spot.region }}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-4 mt-auto">
              <span v-for="tag in spot.tags.slice(0, 3)" :key="tag"
                class="bg-gray-100 dark:bg-white/5 text-text-muted dark:text-gray-400 text-[10px] px-2 py-0.5 rounded-full">
                {{ tag }}
              </span>
            </div>
            <button
              class="w-full border border-gray-200 dark:border-gray-700 text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
              <span class="material-icons text-sm">map</span> View Coordinates
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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

defineProps<{
  spots: PhotoSpot[]
  search: string
}>()

defineEmits<{
  (e: 'select', spot: PhotoSpot): void
}>()

function getSpotImage(imagePath: string | null) {
  if (!imagePath || imagePath === 'none') {
    return 'https://images.unsplash.com/photo-1546708773-e57c8e89f6fc?q=80&w=2000&auto=format&fit=crop'
  }
  return imagePath
}
</script>
