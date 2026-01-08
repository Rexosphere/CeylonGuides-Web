<template>
  <div v-if="filteredItems.length > 0">
    <!-- Intro / Page Heading -->
    <div class="w-full px-4 md:px-20 lg:px-40 py-5 flex justify-center">
      <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div class="flex flex-wrap justify-between gap-3 p-4">
          <div class="flex min-w-72 flex-col gap-3">
            <p class="text-text-main dark:text-white tracking-light text-[32px] font-bold leading-tight">Curated Finds: What to Buy</p>
            <p class="text-text-muted dark:text-gray-400 text-lg font-normal leading-normal max-w-2xl">
              From world-famous Ceylon tea to intricate hand-carved masks, discover the treasures that define our island's craftsmanship.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Items Grid -->
    <div class="w-full px-4 md:px-20 lg:px-40 pb-5 flex justify-center">
      <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            @click="selectItem(item)"
            class="group flex flex-col gap-3 pb-3 cursor-pointer"
          >
            <div 
              class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm"
              :style="{ backgroundImage: `url('${item.image}')` }"
              role="img"
              :aria-label="item.title"
            ></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">
                {{ item.title }}
              </p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">
                {{ item.priceRangeUSD }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Item Details Modal -->
    <Teleport to="body">
      <div
        v-if="selectedItem"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click="selectedItem = null"
      >
        <div
          @click.stop
          class="bg-white dark:bg-[#181311] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <!-- Image -->
          <div class="relative h-64 w-full">
            <div
              class="h-full w-full bg-cover bg-center"
              :style="{ backgroundImage: `url('${selectedItem.image}')` }"
            ></div>
            <button
              @click="selectedItem = null"
              class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <div>
              <h3 class="text-2xl font-bold text-text-main dark:text-white mb-2">{{ selectedItem.title }}</h3>
              <div class="flex items-center gap-4 text-sm">
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold">
                  {{ selectedItem.priceRangeUSD }}
                </span>
                <span class="text-text-muted">{{ selectedItem.priceRangeLKR }}</span>
              </div>
            </div>

            <p class="text-text-muted dark:text-gray-300">{{ selectedItem.description }}</p>

            <div v-if="selectedItem.authenticityChecklist.length">
              <h4 class="font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-green-500">verified</span>
                Authenticity Check
              </h4>
              <ul class="space-y-2">
                <li v-for="item in selectedItem.authenticityChecklist" :key="item" class="flex items-start gap-2 text-sm text-text-muted dark:text-gray-300">
                  <span class="material-symbols-outlined text-green-500 text-sm mt-0.5">check_circle</span>
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="selectedItem.buyWhere.length">
              <h4 class="font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">store</span>
                Best Places to Buy
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="place in selectedItem.buyWhere"
                  :key="place"
                  class="px-3 py-1 bg-gray-100 dark:bg-[#221510] text-text-main dark:text-white text-sm rounded-lg"
                >
                  {{ place }}
                </span>
              </div>
            </div>

            <div v-if="selectedItem.avoid && selectedItem.avoid.length" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 class="font-bold text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined">warning</span>
                Avoid / Scams
              </h4>
              <ul class="space-y-1">
                <li v-for="warning in selectedItem.avoid" :key="warning" class="text-sm text-red-600 dark:text-red-200 list-disc ml-4">
                  {{ warning }}
                </li>
              </ul>
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
import type { CuratedFind } from '~/data/shopping.data'

const { filteredItems } = useShoppingData()
const selectedItem = ref<CuratedFind | null>(null)

const selectItem = (item: CuratedFind) => {
  selectedItem.value = item
}
</script>
