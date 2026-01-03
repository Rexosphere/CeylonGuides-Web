<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h2 class="text-xl font-bold text-neutral-dark dark:text-white">Embassies & Consulates</h2>
      <div class="relative w-full sm:w-64">
        <span class="material-symbols-outlined absolute left-3 top-2.5 text-neutral-soft text-[20px]">search</span>
        <input 
          class="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#2a1d18] border border-neutral-200 dark:border-[#3a2d28] rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-neutral-soft" 
          placeholder="Filter by country..." 
          type="text"
          v-model="searchQuery"
        />
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

const searchQuery = ref('')

const embassies = [
  { country: 'United Kingdom', flag: '🇬🇧', address: 'High Commission, Colombo 03', phone: '+94115390639' },
  { country: 'United States', flag: '🇺🇸', address: 'Embassy, Colombo 03', phone: '+94112498500' },
  { country: 'Australia', flag: '🇦🇺', address: 'High Commission, Colombo 02', phone: '+94112463200' },
  { country: 'India', flag: '🇮🇳', address: 'High Commission, Colombo 03', phone: '+94112327587' }
]

const filteredEmbassies = computed(() => {
  if (!searchQuery.value) return embassies
  return embassies.filter(e => e.country.toLowerCase().includes(searchQuery.value.toLowerCase()))
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
