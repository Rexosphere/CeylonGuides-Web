<template>
  <div class="sticky top-0 z-20 flex w-full flex-col gap-4 border-b border-neutral-light bg-white/95 px-6 py-4 backdrop-blur-sm dark:border-white/10 dark:bg-background-dark/95">
    <div class="flex flex-wrap items-center gap-2">
      <!-- Type Chips -->
      <button
        v-for="type in categoryOptions"
        :key="type.id || 'all'"
        class="flex h-8 items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-colors"
        :class="activeCategory === (type.id || 'all')
          ? 'border-primary bg-primary/10 text-primary hover:bg-primary hover:text-white'
          : 'border-neutral-light bg-transparent text-neutral-dark hover:border-primary hover:text-primary dark:border-white/20 dark:text-white dark:hover:border-primary'"
        @click="setCategory(type.id)"
      >
        <span v-if="type.icon" class="material-symbols-outlined text-[16px]">{{ type.icon }}</span>
        {{ type.label }}
      </button>
    </div>
    <!-- Secondary Filters -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2 rounded-lg bg-background-light px-3 py-1.5 dark:bg-white/5">
          <span class="text-xs font-medium text-neutral-gray">District:</span>
          <select
            class="bg-transparent text-xs font-bold text-neutral-dark dark:text-white focus:outline-none"
            :value="district || ''"
            @change="setDistrict(($event.target as HTMLSelectElement).value)"
          >
            <option value="">All</option>
            <option v-for="item in districtOptions" :key="item.district" :value="item.district">
              {{ item.district }}
            </option>
          </select>
        </div>
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
import { computed } from 'vue'

const props = defineProps<{
  categories: Array<{ category: string; count: number }>
  districts: Array<{ district: string; count: number }>
  category: string | null
  district: string | null
}>()

const emit = defineEmits<{
  (e: 'update:category', value: string | null): void
  (e: 'update:district', value: string | null): void
}>()

const categoryIcons: Record<string, string> = {
  HOTEL: 'hotel',
  RESORT: 'pool',
  VILLA: 'villa',
  HOMESTAY: 'home',
  GUESTHOUSE: 'bed',
  HOSTEL: 'hotel',
  BOUTIQUE: 'hotel',
}

function formatLabel(value: string) {
  return value.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase())
}

const categoryOptions = computed(() => {
  const items = (props.categories || []).map((item) => ({
    id: item.category,
    label: formatLabel(item.category),
    icon: categoryIcons[item.category],
  }))
  return [{ id: null, label: 'All Stays', icon: 'hotel' }, ...items]
})

const districtOptions = computed(() => props.districts || [])
const activeCategory = computed(() => props.category || 'all')

function setCategory(value: string | null) {
  emit('update:category', value)
}

function setDistrict(value: string) {
  emit('update:district', value || null)
}
</script>
