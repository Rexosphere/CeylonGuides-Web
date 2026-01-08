<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSavedItems } from '~/composables/useSavedItems'
import { curatedFinds, districts } from '~/data/shopping.data'
import type { CuratedFind, ShoppingDistrict } from '~/data/shopping.data'

const {
  savedCuratedFinds,
  savedDistricts,
  totalSavedCount,
  removeSaved,
  clearAllSaved,
} = useSavedItems()

const isOpen = ref(false)

interface SavedItemWithDetails {
  id: string
  type: 'curated-find'
  details: CuratedFind
  savedAt: number
}

interface SavedDistrictWithDetails {
  id: string
  type: 'district'
  details: ShoppingDistrict
  savedAt: number
}

const savedItemsWithDetails = computed(() => {
  return savedCuratedFinds.value
    .map((saved) => {
      const item = curatedFinds.find((f) => f.id === saved.id)
      return item ? { ...saved, details: item } as SavedItemWithDetails : null
    })
    .filter((item): item is SavedItemWithDetails => item !== null)
})

const savedDistrictsWithDetails = computed(() => {
  return savedDistricts.value
    .map((saved) => {
      const district = districts.find((d) => d.id === saved.id)
      return district ? { ...saved, details: district } as SavedDistrictWithDetails : null
    })
    .filter((district): district is SavedDistrictWithDetails => district !== null)
})

const handleRemove = (id: string, type: 'curated-find' | 'district') => {
  removeSaved(id, type)
}

const handleClearAll = () => {
  if (confirm('Are you sure you want to remove all saved items?')) {
    clearAllSaved()
  }
}
</script>

<template>
  <!-- Toggle Button (Floating) -->
  <button
    v-if="totalSavedCount > 0"
    class="fixed bottom-24 right-6 z-50 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-2xl transition-all flex items-center gap-2"
    :aria-label="isOpen ? 'Close saved items' : 'View saved items'"
    @click="isOpen = !isOpen"
  >
    <span class="material-symbols-outlined text-2xl" :style="{ fontVariationSettings: '\'FILL\' 1' }">
      bookmark
    </span>
    <span class="bg-white text-primary font-bold text-sm rounded-full min-w-[24px] h-6 flex items-center justify-center px-2">
      {{ totalSavedCount }}
    </span>
  </button>

  <!-- Saved Items Panel -->
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[60] flex items-end md:items-center justify-end bg-black/40"
      @click="isOpen = false"
    >
      <div
        class="bg-white dark:bg-[#181311] w-full md:w-96 h-[80vh] md:h-[90vh] rounded-t-3xl md:rounded-l-3xl md:rounded-r-none shadow-2xl flex flex-col animate-slide-in"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-800">
          <div>
            <h3 class="text-xl font-bold text-text-main dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary" :style="{ fontVariationSettings: '\'FILL\' 1' }">
                bookmark
              </span>
              Saved Items
            </h3>
            <p class="text-sm text-text-muted dark:text-gray-400 mt-1">
              {{ totalSavedCount }} item{{ totalSavedCount !== 1 ? 's' : '' }} saved
            </p>
          </div>
          <button
            class="text-text-muted hover:text-text-main dark:hover:text-white transition-colors"
            aria-label="Close"
            @click="isOpen = false"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <!-- Empty State -->
          <div v-if="totalSavedCount === 0" class="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div class="size-20 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
              <span class="material-symbols-outlined text-gray-400 text-4xl">bookmark_border</span>
            </div>
            <div>
              <h4 class="font-bold text-text-main dark:text-white mb-2">No Saved Items</h4>
              <p class="text-sm text-text-muted dark:text-gray-400">
                Bookmark items and districts to save them for later
              </p>
            </div>
          </div>

          <!-- Saved Curated Finds -->
          <div v-if="savedItemsWithDetails.length > 0">
            <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-3">
              What to Buy ({{ savedItemsWithDetails.length }})
            </h4>
            <div class="space-y-3">
              <div
                v-for="saved in savedItemsWithDetails"
                :key="saved.id"
                class="flex gap-3 bg-gray-50 dark:bg-[#221510] rounded-lg p-3 group"
              >
                <div
                  class="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  :style="{ backgroundImage: `url('${saved.details.image}')` }"
                />
                <div class="flex-1 min-w-0">
                  <h5 class="font-bold text-text-main dark:text-white text-sm truncate">
                    {{ saved.details.title }}
                  </h5>
                  <p class="text-xs text-text-muted dark:text-gray-400 truncate">
                    {{ saved.details.priceRangeUSD }}
                  </p>
                </div>
                <button
                  class="text-text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove"
                  @click="handleRemove(saved.id, 'curated-find')"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Saved Districts -->
          <div v-if="savedDistrictsWithDetails.length > 0">
            <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-3">
              Where to Shop ({{ savedDistrictsWithDetails.length }})
            </h4>
            <div class="space-y-3">
              <div
                v-for="saved in savedDistrictsWithDetails"
                :key="saved.id"
                class="flex gap-3 bg-gray-50 dark:bg-[#221510] rounded-lg p-3 group"
              >
                <div
                  class="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  :style="{ backgroundImage: `url('${saved.details.image}')` }"
                />
                <div class="flex-1 min-w-0">
                  <h5 class="font-bold text-text-main dark:text-white text-sm truncate">
                    {{ saved.details.name }}
                  </h5>
                  <p class="text-xs text-text-muted dark:text-gray-400 truncate">
                    {{ saved.details.areaLabel }}
                  </p>
                </div>
                <button
                  class="text-text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove"
                  @click="handleRemove(saved.id, 'district')"
                >
                  <span class="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="totalSavedCount > 0" class="p-6 border-t border-gray-200 dark:border-neutral-800">
          <button
            class="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
            @click="handleClearAll"
          >
            <span class="material-symbols-outlined">delete_sweep</span>
            Clear All Saved
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
