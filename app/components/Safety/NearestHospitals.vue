<template>
  <div class="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-lg shadow-neutral-200/50 dark:shadow-neutral-900/50 border border-neutral-100 dark:border-neutral-800 overflow-hidden">
    <!-- Header -->
    <div class="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl text-teal-600 dark:text-teal-400">
          <span class="material-symbols-outlined text-xl">local_hospital</span>
        </div>
        <h2 class="text-xl font-bold text-neutral-900 dark:text-white">Nearest Hospitals</h2>
      </div>
      <NuxtLink 
        to="/emergency" 
        class="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20"
      >
        View All
        <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="p-6">
      
      <!-- Loading State (Skeletons) -->
      <div v-if="loading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="flex gap-4 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 animate-pulse">
          <div class="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-700 flex-shrink-0"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div class="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div class="flex gap-2 mt-2">
              <div class="h-8 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
              <div class="h-8 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- No location -->
      <div v-else-if="!coords" class="text-center py-12 px-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-700">
        <div class="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mx-auto mb-4">
          <span class="material-symbols-outlined text-3xl text-neutral-400">location_off</span>
        </div>
        <h3 class="text-neutral-900 dark:text-white font-medium">Location Required</h3>
        <p class="text-neutral-500 text-sm mt-1 max-w-xs mx-auto">Enable location access to automatically find the nearest medical facilities.</p>
        <button 
          @click="emit('requestLocation')"
          class="mt-6 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg"
        >
          Enable Location
        </button>
      </div>

      <!-- Empty State (Location granted but no hospitals) -->
      <div v-else-if="nearestHospitals.length === 0" class="text-center py-12 px-6">
        <span class="material-symbols-outlined text-4xl text-neutral-300 mb-2">search_off</span>
        <p class="text-neutral-500 text-sm">No hospitals found nearby.</p>
      </div>

      <!-- Hospital List -->
      <div v-else class="space-y-4">
        <div 
          v-for="hospital in nearestHospitals" 
          :key="hospital.id"
          class="group flex items-start gap-4 p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-800 hover:border-teal-200 dark:hover:border-teal-800 hover:shadow-lg hover:shadow-teal-900/5 dark:hover:shadow-teal-900/20 transition-all duration-300"
        >
          <!-- Icon -->
          <div 
            class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
            :class="hospital.type === 'private' 
              ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30' 
              : 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30'"
          >
            <span class="material-symbols-outlined">local_hospital</span>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="font-bold text-neutral-900 dark:text-white text-base leading-tight">{{ hospital.name }}</h3>
                <p class="text-xs text-neutral-500 mt-1 line-clamp-1 break-words max-w-[200px]">{{ hospital.city }} • {{ hospital.location }}</p>
              </div>
              <span 
                class="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-bold flex-shrink-0"
                :class="hospital.type === 'private' 
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' 
                  : 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300'"
              >
                {{ hospital.type === 'private' ? 'Private' : 'Public' }}
              </span>
            </div>

            <!-- Distance and Tags -->
            <div class="flex items-center gap-3 mt-3">
              <div class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-700/50">
                <span class="material-symbols-outlined text-sm text-neutral-500">near_me</span>
                <span class="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  {{ formatDistance(hospital.distance) }}
                </span>
              </div>
              
              <div v-if="hospital.is24hr" class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-100/50 dark:bg-green-900/20">
                <span class="material-symbols-outlined text-xs text-green-600 dark:text-green-400">schedule</span>
                <span class="text-xs font-bold text-green-700 dark:text-green-400">24/7</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 mt-4">
              <a 
                :href="`tel:${hospital.phone.replace(/\D/g, '')}`"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-xl text-xs font-bold transition-colors"
              >
                <span class="material-symbols-outlined text-lg">call</span>
                Call
              </a>
              <a 
                :href="`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`"
                target="_blank"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 rounded-xl text-xs font-bold transition-colors"
              >
                <span class="material-symbols-outlined text-lg">directions</span>
                Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Footer -->
    <div class="px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
      <div v-if="!isOnline" class="mb-2 flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg">
        <span class="material-symbols-outlined text-sm text-amber-500">wifi_off</span>
        <span class="text-xs font-bold text-amber-700 dark:text-amber-400">Offline Mode: Map directions may not load.</span>
      </div>
      <p class="text-xs text-neutral-500 flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">info</span>
        Distances are straight-line estimates. Always verify route.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getNearestHospitals } from '~/data/safetyModeData'
import { useNetwork } from '~/composables/useNetwork'

// Props
interface Props {
  coords: { lat: number; lng: number } | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

// Emits
const emit = defineEmits<{
  (e: 'requestLocation'): void
}>()

const { isOnline } = useNetwork()

// Computed nearest hospitals
const nearestHospitals = computed(() => {
  if (!props.coords) return []
  return getNearestHospitals(props.coords.lat, props.coords.lng, 3)
})

// Format distance
function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`
  }
  return `${km.toFixed(1)}km`
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
