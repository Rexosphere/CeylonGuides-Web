<template>
  <section class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <h2 class="text-lg font-bold text-neutral-dark dark:text-white">Embassies & Consulates</h2>
      <div class="relative w-full sm:w-64">
        <span class="material-symbols-outlined absolute left-3 top-2 text-neutral-soft text-[18px]">search</span>
        <input 
          class="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-[#2a1d18] border border-neutral-200 dark:border-[#3a2d28] rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-neutral-soft" 
          placeholder="Search by country or city..." 
          type="text"
          v-model="searchQuery"
        />
      </div>
    </div>

    <!-- Embassy List -->
    <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] overflow-hidden">
      <div class="divide-y divide-neutral-100 dark:divide-[#3a2d28] max-h-[250px] overflow-y-auto custom-scrollbar">
        <div 
          v-for="embassy in filteredEmbassies" 
          :key="`${embassy.country}-${embassy.city}`"
          class="p-3 hover:bg-neutral-50 dark:hover:bg-[#32241e] transition-colors flex gap-3 items-center cursor-pointer"
          :class="{ 'bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary': isSelected(embassy) }"
          @click="selectEmbassy(embassy)"
        >
          <div class="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#3a2d28] flex items-center justify-center text-sm flex-shrink-0">{{ getCountryFlag(embassy.country) }}</div>
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-sm text-neutral-dark dark:text-white truncate">{{ embassy.country }}</h4>
            <p class="text-xs text-neutral-soft truncate">{{ embassy.missionType.charAt(0).toUpperCase() + embassy.missionType.slice(1) }} • {{ embassy.city }}</p>
          </div>
          <div class="flex gap-1 flex-shrink-0">
            <button 
              @click.stop="selectEmbassy(embassy)"
              class="p-1.5 rounded bg-neutral-100 dark:bg-[#3a2d28] text-neutral-600 dark:text-neutral-400 hover:bg-primary hover:text-white transition-colors" 
              title="View on Map"
            >
              <span class="material-symbols-outlined text-[16px]">location_on</span>
            </button>
            <a 
              :href="`tel:${embassy.phone}`"
              @click.stop
              class="p-1.5 rounded bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors" 
              title="Call"
            >
              <span class="material-symbols-outlined text-[16px]">call</span>
            </a>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredEmbassies.length === 0" class="p-6 text-center">
          <span class="material-symbols-outlined text-3xl text-neutral-soft mb-2">search_off</span>
          <p class="text-neutral-soft text-sm">No embassies found for "{{ searchQuery }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { embassies, type Embassy } from '~/data/emergency'

const props = defineProps<{
  isOffline?: boolean
  selectedEmbassyId?: string | null
}>()

const emit = defineEmits<{
  (e: 'select-embassy', embassy: Embassy): void
}>()

const searchQuery = ref('')

// Country flag emoji mapping
const countryFlags: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'Australia': '🇦🇺',
  'Canada': '🇨🇦',
  'India': '🇮🇳',
}

function getCountryFlag(country: string): string {
  return countryFlags[country] || '🏛️'
}

function isSelected(embassy: Embassy): boolean {
  return props.selectedEmbassyId === `${embassy.country}-${embassy.city}`
}

// Filter embassies by country OR city
const filteredEmbassies = computed(() => {
  if (!searchQuery.value) return embassies
  const query = searchQuery.value.toLowerCase()
  return embassies.filter(e => 
    e.country.toLowerCase().includes(query) ||
    e.city.toLowerCase().includes(query)
  )
})

// Select embassy and emit event
function selectEmbassy(embassy: Embassy) {
  emit('select-embassy', embassy)
}
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

