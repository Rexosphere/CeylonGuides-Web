<template>
  <div>
    <div v-if="displayDistricts.length > 0" class="space-y-4">
      <div
        v-for="district in displayDistricts"
        :id="`district-${district.id}`"
        :key="district.id"
        @click="handleCardClick(district)"
        :class="[
          'flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer',
          isHighlighted(district.id)
            ? 'bg-primary/10 border-primary shadow-lg scale-[1.02]'
            : 'bg-white dark:bg-[#221510] border-gray-200 dark:border-neutral-800 hover:border-primary/30 hover:shadow-md'
        ]"
      >
      <div 
        class="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-cover bg-center shrink-0"
        :style="{ backgroundImage: `url('${district.image}')` }"
        role="img"
        :aria-label="district.name"
      ></div>
      <div class="flex-1 min-w-0">
        <span class="text-primary text-xs font-bold uppercase tracking-wider">{{ district.areaLabel }}</span>
        <h3 class="text-text-main dark:text-white text-base md:text-lg font-bold mt-1 mb-1">{{ district.name }}</h3>
        <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2 mb-2">{{ district.description }}</p>
        <div class="flex items-center gap-2 flex-wrap">
          <span
            :class="[
              'px-2 py-0.5 text-xs font-bold rounded',
              district.priceLevel === 'budget' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
              district.priceLevel === 'moderate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
              'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
            ]"
          >
            {{ district.priceLevel === 'budget' ? '$' : district.priceLevel === 'moderate' ? '$$' : '$$$' }}
          </span>
          <span 
            :class="[
              'px-2 py-0.5 text-xs font-bold rounded',
              district.bargaining === 'expected' 
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            ]"
          >
            {{ district.bargaining === 'expected' ? 'Bargaining' : 'Fixed Price' }}
          </span>
          <span class="text-xs text-text-muted dark:text-gray-400 flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">schedule</span>
            {{ district.suggestedDurationMin }}m
          </span>
        </div>
      </div>
      <span class="material-symbols-outlined text-gray-400 text-xl shrink-0">chevron_right</span>
    </div>
  </div>

    <!-- District Details Modal -->
    <Teleport to="body">
      <div
        v-if="selectedDistrict"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click="selectedDistrict = null"
      >
        <div
          @click.stop
          class="bg-white dark:bg-[#181311] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <!-- Image -->
          <div class="relative h-64 w-full">
            <div
              class="h-full w-full bg-cover bg-center"
              :style="{ backgroundImage: `url('${selectedDistrict.image}')` }"
            ></div>
            <div class="absolute top-4 right-4 flex gap-2">
              <button
                @click="handleToggleSave(selectedDistrict.id)"
                :class="[
                  'bg-white/90 hover:bg-white text-gray-800 rounded-full p-2.5 transition-all shadow-lg',
                  isDistrictSaved(selectedDistrict.id) ? 'text-primary' : ''
                ]"
                :aria-label="isDistrictSaved(selectedDistrict.id) ? 'Remove from saved' : 'Save district'"
              >
                <span class="material-symbols-outlined" :style="{ fontVariationSettings: isDistrictSaved(selectedDistrict.id) ? '\'FILL\' 1' : '\'FILL\' 0' }">
                  bookmark
                </span>
              </button>
              <button
                @click="selectedDistrict = null"
                class="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2.5 transition-colors shadow-lg"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="text-primary text-sm font-bold uppercase tracking-wider">{{ selectedDistrict.areaLabel }}</span>
                <span
                  :class="[
                    'px-3 py-1 text-xs font-bold rounded-full',
                    selectedDistrict.priceLevel === 'budget' ? 'bg-green-100 text-green-700' :
                    selectedDistrict.priceLevel === 'moderate' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  ]"
                >
                  {{ selectedDistrict.priceLevel }}
                </span>
              </div>
              <h3 class="text-2xl font-bold text-text-main dark:text-white mb-2">{{ selectedDistrict.name }}</h3>
              <p class="text-text-muted dark:text-gray-300">{{ selectedDistrict.description }}</p>
            </div>

            <div>
              <h4 class="font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">shopping_cart</span>
                Best For
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="item in selectedDistrict.bestFor"
                  :key="item"
                  class="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg font-medium"
                >
                  {{ item }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#221510] rounded-lg">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">handshake</span>
                <span class="font-semibold text-text-main dark:text-white">Bargaining</span>
              </div>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-bold',
                  selectedDistrict.bargaining === 'expected'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-700'
                ]"
              >
                {{ selectedDistrict.bargaining === 'expected' ? 'Expected' : 'Fixed Prices' }}
              </span>
            </div>

            <div v-if="selectedDistrict.safetyTips && selectedDistrict.safetyTips.length" class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 class="font-bold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined">info</span>
                Safety & Tips
              </h4>
              <ul class="space-y-1 text-sm text-amber-600 dark:text-amber-200">
                <li v-for="tip in selectedDistrict.safetyTips" :key="tip">• {{ tip }}</li>
              </ul>
            </div>

            <!-- Context-specific Warnings (for Pettah) -->
            <div v-if="districtWarnings.length" class="space-y-3">
              <ShoppingWarningCard 
                v-for="warning in districtWarnings" 
                :key="warning.id"
                :warning="warning"
                :expandable="true"
              />
            </div>

            <div class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600">schedule</span>
                <span class="font-semibold text-text-main dark:text-white">Suggested Time</span>
              </div>
              <span class="text-blue-600 dark:text-blue-300 font-bold">
                {{ selectedDistrict.suggestedDurationMin }} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useShoppingData } from '~/composables/useShoppingData'
import { useSavedItems } from '~/composables/useSavedItems'
import { getWarningsByContext } from '~/data/shopping.data'
import type { ShoppingDistrict } from '~/data/shopping.data'
import ShoppingWarningCard from './ShoppingWarningCard.vue'

const props = defineProps<{
  districts?: ShoppingDistrict[]
  highlightedDistrictId?: string | null
}>()

const emit = defineEmits<{
  districtCardClick: [districtId: string]
}>()

const { filteredDistricts } = useShoppingData()
const { isSaved, toggleSave } = useSavedItems()
const selectedDistrict = ref<ShoppingDistrict | null>(null)

const displayDistricts = computed(() => props.districts || filteredDistricts.value)

// Get warnings based on selected district
const districtWarnings = computed(() => {
  if (!selectedDistrict.value) return []
  
  // Show pickpocket warning for Pettah
  if (selectedDistrict.value.id === 'pettah-market') {
    return getWarningsByContext('pettah')
  }
  
  return []
})

const selectDistrict = (district: ShoppingDistrict) => {
  selectedDistrict.value = district
}

const handleCardClick = (district: ShoppingDistrict) => {
  emit('districtCardClick', district.id)
  selectDistrict(district)
}

const handleToggleSave = (districtId: string) => {
  toggleSave(districtId, 'district')
}

const isDistrictSaved = (districtId: string) => {
  return isSaved(districtId, 'district')
}

const isHighlighted = (districtId: string) => {
  return props.highlightedDistrictId === districtId
}
</script>
