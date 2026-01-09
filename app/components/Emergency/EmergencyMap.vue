<template>
  <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] shadow-sm overflow-hidden">
    <div class="p-4 border-b border-neutral-100 dark:border-[#3a2d28] flex items-center justify-between">
      <h3 class="font-bold text-neutral-dark dark:text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">map</span>
        Location Map
      </h3>
      <div v-if="selectedLocation" class="flex items-center gap-2">
        <span 
          class="text-xs px-2 py-0.5 rounded font-medium"
          :class="selectedLocation.type === 'embassy' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'"
        >
          {{ selectedLocation.type === 'embassy' ? 'Embassy' : 'Hospital' }}
        </span>
        <span class="text-xs text-neutral-soft truncate max-w-[150px]">{{ selectedLocation.name }}</span>
      </div>
    </div>
    
    <!-- Map -->
    <div v-if="!isOffline" class="h-[300px] relative">
      <div v-if="selectedLocation" class="absolute inset-0">
        <iframe
          :src="`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&z=15&output=embed`"
          class="w-full h-full border-0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-neutral-soft bg-neutral-50 dark:bg-[#1a120e]">
        <span class="material-symbols-outlined text-4xl mb-2">pin_drop</span>
        <p class="text-sm">Select an embassy or hospital to view on map</p>
      </div>
    </div>
    
    <!-- Offline fallback -->
    <div v-else class="h-[100px] flex items-center justify-center gap-3 bg-neutral-50 dark:bg-[#1a120e] text-neutral-soft">
      <span class="material-symbols-outlined">cloud_off</span>
      <span class="text-sm">Map unavailable offline — Use phone's map app</span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface MapLocation {
  name: string
  lat: number
  lng: number
  type: 'embassy' | 'hospital'
}

defineProps<{
  selectedLocation: MapLocation | null
  isOffline?: boolean
}>()
</script>
