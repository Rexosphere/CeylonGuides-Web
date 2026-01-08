<template>
  <div v-if="filteredDistricts.length > 0" class="w-full px-4 md:px-20 lg:px-40 py-5 flex justify-center bg-white dark:bg-[#181311] border-y border-gray-100 dark:border-neutral-800">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div class="flex flex-wrap justify-between items-center px-4 pb-6 pt-5">
        <h2 class="text-text-main dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em]">Key Shopping Districts</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <div
          v-for="district in filteredDistricts"
          :key="district.id"
          @click="selectDistrict(district)"
          class="flex items-center gap-4 bg-background-light dark:bg-[#221510] p-4 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer"
        >
          <div 
            class="w-24 h-24 rounded-lg bg-cover bg-center shrink-0"
            :style="{ backgroundImage: `url('${district.image}')` }"
            role="img"
            :aria-label="district.name"
          ></div>
          <div class="flex flex-col gap-1">
            <span class="text-primary text-xs font-bold uppercase tracking-wider">{{ district.areaLabel }}</span>
            <h3 class="text-text-main dark:text-white text-lg font-bold">{{ district.name }}</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm line-clamp-2">{{ district.description }}</p>
            <div class="flex items-center gap-2 mt-1">
              <span
                :class="[
                  'px-2 py-0.5 text-xs font-bold rounded',
                  district.priceLevel === 'budget' ? 'bg-green-100 text-green-700' :
                  district.priceLevel === 'moderate' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                ]"
              >
                {{ district.priceLevel }}
              </span>
              <span v-if="district.bargaining === 'expected'" class="px-2 py-0.5 text-xs font-bold rounded bg-orange-100 text-orange-700">
                Bargaining OK
              </span>
            </div>
          </div>
        </div>
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
            <button
              @click="selectedDistrict = null"
              class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
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
import { ref } from 'vue'
import { useShoppingData } from '~/composables/useShoppingData'
import type { ShoppingDistrict } from '~/data/shopping.data'

const { filteredDistricts } = useShoppingData()
const selectedDistrict = ref<ShoppingDistrict | null>(null)

const selectDistrict = (district: ShoppingDistrict) => {
  selectedDistrict.value = district
}
</script>
