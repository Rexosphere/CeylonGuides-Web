<template>
  <section class="sticky top-[65px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 py-4 shadow-sm mb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center gap-3 overflow-x-auto no-scrollbar">
        <!-- Category Filter -->
        <button 
          class="flex h-9 shrink-0 items-center justify-center px-4 rounded-full text-sm font-medium transition-all"
          :class="!selectedCategory 
            ? 'bg-primary text-white' 
            : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 text-text-main dark:text-white hover:border-primary'"
          @click="$emit('update:category', null)"
        >
          All Spots
        </button>
        
        <button 
          v-for="cat in categories" 
          :key="cat"
          class="flex h-9 shrink-0 items-center justify-center gap-2 px-4 rounded-full text-sm font-medium transition-all"
          :class="selectedCategory === cat 
            ? 'bg-primary text-white' 
            : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 text-text-main dark:text-white hover:border-primary'"
          @click="$emit('update:category', cat)"
        >
          {{ getCategoryIcon(cat) }} {{ cat }}
        </button>
        
        <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
        
        <!-- Drone Status Filter -->
        <button 
          v-for="status in droneStatuses" 
          :key="status"
          class="flex h-9 shrink-0 items-center justify-center gap-1 px-3 rounded-full text-xs font-medium transition-all"
          :class="[
            selectedDroneStatus === status ? getDroneActiveClass(status) : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 hover:border-primary',
            getDroneTextClass(status, selectedDroneStatus === status)
          ]"
          @click="$emit('update:droneStatus', selectedDroneStatus === status ? null : status)"
        >
          <span class="material-symbols-outlined text-[14px]">flight</span>
          {{ getDroneLabel(status) }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  categories: string[]
  droneStatuses: string[]
  selectedCategory: string | null
  selectedDroneStatus: string | null
}>()

defineEmits<{
  (e: 'update:category', value: string | null): void
  (e: 'update:droneStatus', value: string | null): void
}>()

function getCategoryIcon(cat: string): string {
  const icons: Record<string, string> = {
    'Heritage': '🏛️',
    'Coastal': '🌊',
    'Wildlife': '🐆',
    'Nature': '🌿',
    'Cultural': '🎭',
    'Landscape': '⛰️',
    'Spiritual': '🙏'
  }
  return icons[cat] || '📸'
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

function getDroneActiveClass(status: string): string {
  switch (status) {
    case 'ok': return 'bg-green-500 border-green-500'
    case 'permit-required': return 'bg-orange-500 border-orange-500'
    case 'caution': return 'bg-yellow-500 border-yellow-500'
    case 'not-allowed': return 'bg-red-500 border-red-500'
    default: return 'bg-gray-500'
  }
}

function getDroneTextClass(status: string, isActive: boolean): string {
  if (isActive) return 'text-white'
  switch (status) {
    case 'ok': return 'text-green-600 dark:text-green-400'
    case 'permit-required': return 'text-orange-600 dark:text-orange-400'
    case 'caution': return 'text-yellow-600 dark:text-yellow-400'
    case 'not-allowed': return 'text-red-600 dark:text-red-400'
    default: return 'text-text-main dark:text-white'
  }
}
</script>
