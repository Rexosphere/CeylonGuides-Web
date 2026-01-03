<template>
  <div class="sticky top-0 z-20 flex w-full flex-col gap-4 border-b border-neutral-light bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-white/10 dark:bg-background-dark/95">
    <div class="flex flex-wrap items-center gap-2">
      <!-- Type Chips -->
      <button 
        v-for="type in accommodationTypes" 
        :key="type.id"
        class="flex h-8 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-colors"
        :class="activeType === type.id 
          ? 'border-primary bg-primary/10 text-primary hover:bg-primary hover:text-white' 
          : 'border-neutral-light bg-transparent text-neutral-dark hover:border-primary hover:text-primary dark:border-white/20 dark:text-white dark:hover:border-primary'"
        @click="activeType = type.id"
      >
        <span v-if="type.icon" class="material-symbols-outlined text-[16px]">{{ type.icon }}</span>
        {{ type.label }}
      </button>
    </div>
    <!-- Secondary Filters -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2 rounded-lg bg-background-light px-3 py-1.5 dark:bg-white/5">
          <span class="text-xs font-medium text-neutral-gray">Price:</span>
          <span class="text-xs font-bold text-neutral-dark dark:text-white">$20 - $300+</span>
        </div>
        <div class="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 dark:bg-green-900/20">
          <span class="material-symbols-outlined text-[14px] text-green-600 dark:text-green-400">shield</span>
          <span class="text-xs font-bold text-green-700 dark:text-green-300">Safe Certified</span>
        </div>
      </div>
      <button class="flex items-center gap-1 text-xs font-bold text-neutral-dark underline dark:text-white">
        <span class="material-symbols-outlined text-[16px]">tune</span>
        More Filters
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const accommodationTypes = [
  { id: 'all', label: 'All Stays', icon: 'hotel' },
  { id: 'hotel', label: 'Hotels', icon: null },
  { id: 'villa', label: 'Villas', icon: null },
  { id: 'homestay', label: 'Homestays', icon: null }
]

const activeType = ref('all')
</script>
