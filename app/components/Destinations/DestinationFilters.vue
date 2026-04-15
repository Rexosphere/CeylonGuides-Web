<template>
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-12">
    <div
      class="bg-white dark:bg-card-dark rounded-xl shadow-card p-4 flex overflow-x-auto gap-4 items-center justify-start md:justify-center no-scrollbar">
      <button v-for="filter in filters" :key="filter.name"
        class="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors" :class="[
          activeFilter === filter.name
            ? 'bg-primary text-white shadow-sm'
            : 'hover:bg-gray-100 dark:hover:bg-white/5 text-text-muted dark:text-gray-300 font-medium'
        ]" @click="setFilter(filter.name)">
        {{ filter.label }}
      </button>
    </div>
  </div>
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

function formatLabel(value: string) {
  return value.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase())
}

const filters = computed(() => {
  const items = (props.categories || []).map((item) => ({
    name: item.category,
    label: formatLabel(item.category),
  }))
  return [{ name: 'all', label: 'All Destinations' }, ...items]
})

const activeFilter = computed(() => props.category || 'all')

function setFilter(value: string) {
  emit('update:category', value === 'all' ? null : value)
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
