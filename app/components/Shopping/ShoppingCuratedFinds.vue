<template>
  <div v-if="displayItems.length > 0">
    <!-- Intro / Page Heading -->
    <div class="mb-8">
      <h2 class="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-3 flex items-center gap-3">
        <span class="material-symbols-outlined text-primary text-4xl" style="font-variation-settings: 'FILL' 1">shopping_bag</span>
        Curated Finds: What to Buy
      </h2>
      <p class="text-text-muted dark:text-gray-400 text-lg max-w-3xl">
        From world-famous Ceylon tea to intricate hand-carved masks, discover the treasures that define our island's craftsmanship.
      </p>
    </div>

    <!-- Items Grid - Responsive 5-column on desktop -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      <div
        v-for="item in displayItems"
        :key="item.id"
        @click="selectItem(item)"
        class="group flex flex-col gap-3 cursor-pointer"
      >
        <div 
          class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm group-hover:shadow-lg"
          :style="{ backgroundImage: `url('${item.image}')` }"
          role="img"
          :aria-label="item.title"
        ></div>
        <div>
          <p class="text-text-main dark:text-white text-sm md:text-base font-bold leading-normal group-hover:text-primary transition-colors">
            {{ item.title }}
          </p>
          <p class="text-text-muted dark:text-gray-400 text-xs md:text-sm font-normal leading-normal">
            {{ item.priceRangeUSD }}
          </p>
        </div>
      </div>
    </div>

    <!-- Item Details Modal/Drawer -->
    <Teleport to="body">
      <div
        v-if="selectedItem"
        class="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 p-0 md:p-4"
        @click="selectedItem = null"
      >
        <div
          @click.stop
          class="bg-white dark:bg-[#181311] rounded-t-3xl md:rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        >
          <!-- Header with Image -->
          <div class="relative h-56 w-full">
            <div
              class="h-full w-full bg-cover bg-center"
              :style="{ backgroundImage: `url('${selectedItem.image}')` }"
            ></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <!-- Close and Save buttons -->
            <div class="absolute top-4 right-4 flex gap-2">
              <button
                @click="handleToggleSave(selectedItem.id)"
                :class="[
                  'bg-white/90 hover:bg-white text-gray-800 rounded-full p-2.5 transition-all shadow-lg',
                  isItemSaved(selectedItem.id) ? 'text-primary' : ''
                ]"
                :aria-label="isItemSaved(selectedItem.id) ? 'Remove from saved' : 'Save item'"
              >
                <span class="material-symbols-outlined" :style="{ fontVariationSettings: isItemSaved(selectedItem.id) ? '\'FILL\' 1' : '\'FILL\' 0' }">
                  bookmark
                </span>
              </button>
              <button
                @click="selectedItem = null"
                class="bg-white/90 hover:bg-white text-gray-800 rounded-full p-2.5 transition-all shadow-lg"
                aria-label="Close"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <!-- Title overlay -->
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h3 class="text-3xl font-bold text-white mb-1 drop-shadow-lg">{{ selectedItem.title }}</h3>
              <p class="text-white/90 text-sm drop-shadow">{{ selectedItem.shortTagline }}</p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- What it is -->
            <div>
              <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-2">What it is</h4>
              <p class="text-text-muted dark:text-gray-300">{{ selectedItem.description }}</p>
            </div>

            <!-- Typical Prices -->
            <div class="bg-gray-50 dark:bg-[#221510] rounded-xl p-4">
              <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-3">Typical Prices</h4>
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <p class="text-2xl font-bold text-primary">{{ selectedItem.priceRangeUSD }}</p>
                  <p class="text-sm text-text-muted dark:text-gray-400">{{ selectedItem.priceRangeLKR }}</p>
                </div>
                <div class="text-right">
                  <span class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                    <span class="material-symbols-outlined text-sm">verified</span>
                    From shopping.md
                  </span>
                </div>
              </div>
            </div>

            <!-- Authenticity Checklist -->
            <div v-if="selectedItem.authenticityChecklist.length">
              <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-green-500">verified</span>
                Authenticity Checklist
              </h4>
              <ul class="space-y-2.5 bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-800">
                <li v-for="item in selectedItem.authenticityChecklist" :key="item" class="flex items-start gap-3 text-sm">
                  <span class="material-symbols-outlined text-green-500 text-lg mt-0.5 flex-shrink-0">check_circle</span>
                  <span class="text-text-main dark:text-gray-200">{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- Context-specific Warnings (for Gems) -->
            <div v-if="itemWarnings.length" class="space-y-3">
              <h4 class="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wider flex items-center gap-2">
                <span class="material-symbols-outlined">report</span>
                Critical Scam Alerts
              </h4>
              <ShoppingWarningCard 
                v-for="warning in itemWarnings" 
                :key="warning.id"
                :warning="warning"
                :expandable="true"
              />
            </div>

            <!-- Best Places to Buy -->
            <div v-if="selectedItem.buyWhere.length">
              <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined">store</span>
                Best Places to Buy
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="place in selectedItem.buyWhere"
                  :key="place"
                  class="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-lg border border-blue-200 dark:border-blue-800 font-medium"
                >
                  {{ place }}
                </span>
              </div>
            </div>

            <!-- Common Scams / What to Avoid -->
            <div v-if="selectedItem.avoid && selectedItem.avoid.length" class="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-5">
              <h4 class="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">warning</span>
                Common Scams / What to Avoid
              </h4>
              <ul class="space-y-2">
                <li v-for="warning in selectedItem.avoid" :key="warning" class="flex items-start gap-3 text-sm text-red-700 dark:text-red-300">
                  <span class="material-symbols-outlined text-base mt-0.5 flex-shrink-0">cancel</span>
                  <span>{{ warning }}</span>
                </li>
              </ul>
            </div>

            <!-- Quick Bargaining Tip -->
            <div v-if="selectedItem.bargainingTip" class="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-5">
              <h4 class="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">handshake</span>
                Quick Bargaining Tip
              </h4>
              <p class="text-sm text-amber-700 dark:text-amber-200 font-medium">{{ selectedItem.bargainingTip }}</p>
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
import type { CuratedFind } from '~/data/shopping.data'
import ShoppingWarningCard from './ShoppingWarningCard.vue'

const props = defineProps<{
  items?: CuratedFind[]
}>()

const { filteredItems } = useShoppingData()
const { isSaved, toggleSave } = useSavedItems()
const selectedItem = ref<CuratedFind | null>(null)

const displayItems = computed(() => props.items || filteredItems.value)

// Get warnings based on selected item context
const itemWarnings = computed(() => {
  if (!selectedItem.value) return []
  
  // Show gem warnings for sapphires/rubies
  if (selectedItem.value.id === 'blue-sapphires') {
    return getWarningsByContext('gems')
  }
  
  return []
})

const selectItem = (item: CuratedFind) => {
  selectedItem.value = item
}

const handleToggleSave = (itemId: string) => {
  toggleSave(itemId, 'curated-find')
}

const isItemSaved = (itemId: string) => {
  return isSaved(itemId, 'curated-find')
}
</script>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
