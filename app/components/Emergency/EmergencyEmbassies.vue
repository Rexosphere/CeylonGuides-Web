<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h2 class="text-xl font-bold text-neutral-dark dark:text-white">Embassies & Consulates</h2>
      <div class="flex gap-3 w-full sm:w-auto">
        <div class="relative w-full sm:w-40">
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2 bg-white dark:bg-[#2a1d18] border border-neutral-200 dark:border-[#3a2d28] rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          >
            <option v-for="category in categories" :key="category.category" :value="category.category">
              {{ formatCategory(category.category) }}
            </option>
          </select>
        </div>
        <div class="relative w-full sm:w-64">
          <span class="material-symbols-outlined absolute left-3 top-2.5 text-neutral-soft text-[20px]">search</span>
          <input 
            class="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#2a1d18] border border-neutral-200 dark:border-[#3a2d28] rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-neutral-soft" 
            placeholder="Filter by name..." 
            type="text"
            v-model="searchQuery"
          />
        </div>
      </div>
    </div>
    <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] divide-y divide-neutral-100 dark:divide-[#3a2d28] max-h-[400px] overflow-y-auto custom-scrollbar">
      
      <div 
        v-for="embassy in filteredEmbassies" 
        :key="embassy.country"
        class="p-4 hover:bg-neutral-50 dark:hover:bg-[#32241e] transition-colors flex flex-col sm:flex-row gap-4 justify-between sm:items-center"
      >
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-neutral-100 dark:bg-[#3a2d28] flex items-center justify-center text-lg shadow-sm">{{ embassy.flag }}</div>
          <div>
            <h4 class="font-bold text-neutral-dark dark:text-white">{{ embassy.country }}</h4>
            <p class="text-xs text-neutral-soft">{{ embassy.address }}</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="p-2 rounded-lg bg-neutral-100 dark:bg-[#3a2d28] text-neutral-600 dark:text-neutral-400 hover:bg-primary hover:text-white transition-colors" title="View Map">
            <span class="material-symbols-outlined text-[20px]">location_on</span>
          </button>
          <a 
            :href="`tel:${embassy.phone}`"
            class="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white font-medium text-sm transition-colors" 
          >
            <span class="material-symbols-outlined text-[18px]">call</span>
            <span>Call</span>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const searchQuery = ref('')
const selectedCategory = ref('EMBASSY')

const { data: categoriesResponse } = await useFetch<{
  success: boolean
  data: Array<{ category: string; count: number }>
}>(`${apiBase}/api/emergency/categories/list`)

const categories = computed(() => categoriesResponse.value?.data || [{ category: 'EMBASSY', count: 0 }])

function formatCategory(value: string) {
  return value.replace(/_/g, ' ').toLowerCase().replace(/(^|\\s)\\S/g, (t) => t.toUpperCase())
}

// Fetch contacts from API
const { data: embassiesResponse } = await useFetch<{
  success: boolean
  data: Array<{
    id: string
    name: string
    phone_number: string
    category: string
    description?: string
    emoji?: string
  }>
}>(() => `${apiBase}/api/emergency?category=${selectedCategory.value}`, { watch: [selectedCategory] })

const embassies = computed(() => {
  const data = embassiesResponse.value?.data || []
  return data.map((e: any) => ({
    country: e.name.replace(' Embassy', '').replace(' High Commission', ''),
    flag: e.emoji || '🏛️',
    address: e.description || 'Sri Lanka',
    phone: e.phone || e.phone_number || ''
  }))
})

const filteredEmbassies = computed(() => {
  if (!searchQuery.value) return embassies.value
  return embassies.value.filter(e => e.country.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e5e5e5;
    border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #3a2d28;
}
</style>
