<template>
  <section class="sticky top-[65px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 py-4 shadow-sm">
    <div class="layout-container flex justify-center">
      <div class="w-full max-w-[1440px] px-4 md:px-10 flex flex-wrap items-center gap-3 overflow-x-auto no-scrollbar">
        <!-- All button -->
        <button 
          class="flex h-9 shrink-0 items-center justify-center px-4 rounded-full text-sm font-medium transition-all"
          :class="!category 
            ? 'bg-primary text-white' 
            : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 text-text-main dark:text-white hover:border-primary'"
          @click="emit('update:category', null)"
        >
          All
        </button>
        
        <!-- Category chips -->
        <button 
          v-for="item in categoryOptions" 
          :key="item.category"
          class="flex h-9 shrink-0 items-center justify-center gap-2 px-4 rounded-full text-sm font-medium transition-all"
          :class="category === item.category 
            ? 'bg-primary text-white' 
            : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 text-text-main dark:text-white hover:border-primary'"
          @click="emit('update:category', item.category)"
        >
          <span>{{ getCategoryIcon(item.category) }}</span>
          {{ item.category }}
          <span class="text-xs opacity-70">({{ item.count }})</span>
        </button>
        
        <!-- Reset -->
        <button
          v-if="category"
          class="ml-auto text-sm font-medium text-text-muted hover:text-primary transition-colors flex items-center gap-1"
          @click="emit('update:category', null)"
        >
          <span class="material-symbols-outlined text-[16px]">close</span>
          Clear
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  categories: Array<{ category: string; count: number }>
  category: string | null
}>()

const emit = defineEmits<{
  (e: 'update:category', value: string | null): void
}>()

const categoryOptions = computed(() => props.categories || [])

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Cultural': '🏛️',
    'Wildlife': '🐆',
    'Hiking': '🥾',
    'Adventure': '🌊',
    'Culinary': '🍛',
    'Wellness': '🧘',
    'Scenic': '🚂'
  }
  return icons[category] || '✨'
}
</script>
