<template>
  <section class="sticky top-[65px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 py-4 shadow-sm">
    <div class="layout-container flex justify-center">
      <div class="w-full max-w-[1440px] px-4 md:px-10 flex flex-wrap items-center gap-3 overflow-x-auto no-scrollbar">
        <span class="text-xs font-bold uppercase tracking-wider text-text-muted mr-2 shrink-0">Filter By:</span>
        <button class="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 hover:border-primary pl-4 pr-3 transition-all">
          <p class="text-sm font-medium text-text-main dark:text-white">Region</p>
          <span class="material-symbols-outlined text-gray-400 group-hover:text-primary text-[20px]">keyboard_arrow_down</span>
        </button>
        <div class="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 hover:border-primary pl-4 pr-3 transition-all">
          <p class="text-sm font-medium text-text-main dark:text-white">Activity Type</p>
          <select
            class="bg-transparent text-sm font-medium text-text-main dark:text-white focus:outline-none"
            :value="category || ''"
            @change="setCategory(($event.target as HTMLSelectElement).value)"
          >
            <option value="">All</option>
            <option v-for="item in categoryOptions" :key="item.category" :value="item.category">
              {{ formatLabel(item.category) }}
            </option>
          </select>
        </div>
        <button class="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 hover:border-primary pl-4 pr-3 transition-all">
          <p class="text-sm font-medium text-text-main dark:text-white">Difficulty</p>
          <span class="material-symbols-outlined text-gray-400 group-hover:text-primary text-[20px]">keyboard_arrow_down</span>
        </button>
        <button class="group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 hover:border-primary pl-4 pr-3 transition-all">
          <p class="text-sm font-medium text-text-main dark:text-white">Price Range</p>
          <span class="material-symbols-outlined text-gray-400 group-hover:text-primary text-[20px]">keyboard_arrow_down</span>
        </button>
        <div class="ml-auto flex items-center gap-2">
          <button
            class="text-sm font-medium text-text-muted hover:text-primary underline decoration-transparent hover:decoration-current transition-all"
            @click="resetFilters"
          >
            Reset Filters
          </button>
        </div>
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

function formatLabel(value: string) {
  return value.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase())
}

function setCategory(value: string) {
  emit('update:category', value || null)
}

function resetFilters() {
  emit('update:category', null)
}
</script>
