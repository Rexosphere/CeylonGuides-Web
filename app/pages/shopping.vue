<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useShoppingData } from '~/composables/useShoppingData'
import { useSavedItems } from '~/composables/useSavedItems'
import ShoppingHero from '~/components/Shopping/ShoppingHero.vue'
import ShoppingStickyNav from '~/components/Shopping/ShoppingStickyNav.vue'
import ShoppingSearchFilter from '~/components/Shopping/ShoppingSearchFilter.vue'
import ShoppingCuratedFinds from '~/components/Shopping/ShoppingCuratedFinds.vue'
import ShoppingDistricts from '~/components/Shopping/ShoppingDistricts.vue'
import ShoppingSmartGuide from '~/components/Shopping/ShoppingSmartGuide.vue'
import ShoppingEmptyState from '~/components/Shopping/ShoppingEmptyState.vue'
import ShoppingSavedPanel from '~/components/Shopping/ShoppingSavedPanel.vue'
import ShoppingMap from '~/components/Shopping/ShoppingMap.vue'
import ShoppingVATRefund from '~/components/Shopping/ShoppingVATRefund.vue'
import ShoppingQuickPicks from '~/components/Shopping/ShoppingQuickPicks.vue'

const { filteredItems, filteredDistricts } = useShoppingData()
const { savedCuratedFinds, savedDistricts } = useSavedItems()
const searchFilterRef = ref()
const mapRef = ref()
const highlightedDistrictId = ref<string | null>(null)
const activeTab = ref<'list' | 'map'>('list')

const selectedTag = computed(() => searchFilterRef.value?.lastSelectedTag)

const showSavedOnly = computed(() => searchFilterRef.value?.showSavedOnly || false)

const displayedItems = computed(() => {
  if (showSavedOnly.value) {
    const savedIds = savedCuratedFinds.value.map(s => s.id)
    return filteredItems.value.filter(item => savedIds.includes(item.id))
  }
  return filteredItems.value
})

const displayedDistricts = computed(() => {
  if (showSavedOnly.value) {
    const savedIds = savedDistricts.value.map(s => s.id)
    return filteredDistricts.value.filter(district => savedIds.includes(district.id))
  }
  return filteredDistricts.value
})

const hasResults = computed(() => {
  return displayedItems.value.length > 0 || displayedDistricts.value.length > 0
})

const handleDistrictCardClick = (districtId: string) => {
  highlightedDistrictId.value = districtId
  // Auto-unhighlight after 3 seconds
  setTimeout(() => {
    highlightedDistrictId.value = null
  }, 3000)
}

const handleMapDistrictClick = (districtId: string) => {
  // Scroll to district card
  const districtElement = document.getElementById(`district-${districtId}`)
  if (districtElement) {
    districtElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // Highlight the card briefly
    highlightedDistrictId.value = districtId
    setTimeout(() => {
      highlightedDistrictId.value = null
    }, 3000)
  }
}

const handleQuickPickClick = (districtId: string) => {
  // Switch to list view on mobile
  activeTab.value = 'list'
  // Scroll to district and highlight
  nextTick(() => {
    const districtElement = document.getElementById(`district-${districtId}`)
    if (districtElement) {
      districtElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      highlightedDistrictId.value = districtId
      setTimeout(() => {
        highlightedDistrictId.value = null
      }, 3000)
    }
  })
}

useHead({
  title: 'Shopping Guide - CeylonGuide',
  meta: [
    { name: 'description', content: 'The ultimate guide to authentic souvenirs, bustling markets, and smart shopping in Sri Lanka. From Ceylon tea to sapphires.' }
  ]
})
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col items-center">
      <ShoppingHero />
      <ShoppingStickyNav />
      <ShoppingSearchFilter ref="searchFilterRef" />
      
      <template v-if="hasResults">
        <!-- Curated Finds with Sidebar -->
        <section id="what-to-buy" class="w-full">
          <div class="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              <!-- Main Content -->
              <div>
                <ShoppingCuratedFinds :items="displayedItems" />
              </div>
              <!-- Quick Picks Sidebar - Desktop Only -->
              <div class="hidden lg:block">
                <ShoppingQuickPicks 
                  :districts="displayedDistricts"
                  :selected-tag="selectedTag"
                  :active-filters="searchFilterRef?.filters?.tags || []"
                  @place-click="handleQuickPickClick"
                />
              </div>
            </div>
          </div>
        </section>
        
        <!-- Districts + Map Section -->
        <section id="where-to-shop" class="w-full bg-gray-50 dark:bg-[#1a0f0a]">
          <div class="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12">
            <!-- Header -->
            <div class="mb-8">
              <h2 class="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-3 flex items-center gap-3">
                <span class="material-symbols-outlined text-primary text-4xl" style="font-variation-settings: 'FILL' 1">store</span>
                Shopping Districts
              </h2>
              <p class="text-text-muted dark:text-gray-400 max-w-3xl">
                Explore top shopping locations across Sri Lanka. Click markers on the map or browse district cards.
              </p>
            </div>

            <!-- Mobile Tabs -->
            <div class="lg:hidden mb-6">
              <div class="flex gap-2 p-1 bg-white dark:bg-[#181311] rounded-lg border border-gray-200 dark:border-neutral-800">
                <button
                  @click="activeTab = 'list'"
                  :class="[
                    'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2',
                    activeTab === 'list'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-text-muted dark:text-gray-400 hover:text-primary'
                  ]"
                >
                  <span class="material-symbols-outlined text-base">view_list</span>
                  List
                </button>
                <button
                  @click="activeTab = 'map'"
                  :class="[
                    'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2',
                    activeTab === 'map'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-text-muted dark:text-gray-400 hover:text-primary'
                  ]"
                >
                  <span class="material-symbols-outlined text-base">map</span>
                  Map
                </button>
              </div>
            </div>

            <!-- Desktop: 2-Column Layout (Districts + Sticky Map) -->
            <div class="hidden lg:grid lg:grid-cols-[1fr_500px] gap-8">
              <!-- Districts List -->
              <div>
                <ShoppingDistricts 
                  :districts="displayedDistricts"
                  :highlighted-district-id="highlightedDistrictId"
                  @district-card-click="handleDistrictCardClick"
                />
              </div>
              
              <!-- Sticky Map -->
              <div class="sticky top-24 h-fit">
                <div class="bg-white dark:bg-[#181311] rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden">
                  <div class="p-4 border-b border-gray-200 dark:border-neutral-800">
                    <h3 class="font-bold text-text-main dark:text-white flex items-center gap-2">
                      <span class="material-symbols-outlined text-primary">map</span>
                      Interactive Map
                    </h3>
                  </div>
                  <div class="h-[600px]">
                    <ClientOnly>
                      <ShoppingMap
                        ref="mapRef"
                        :districts="displayedDistricts"
                        :highlighted-district-id="highlightedDistrictId"
                        @district-click="handleMapDistrictClick"
                      />
                      <template #fallback>
                        <div class="w-full h-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                          <div class="text-center space-y-3">
                            <span class="material-symbols-outlined text-6xl text-gray-400">map</span>
                            <p class="text-text-muted">Loading map...</p>
                          </div>
                        </div>
                      </template>
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile: Tabbed Content -->
            <div class="lg:hidden">
              <!-- List Tab Content -->
              <div v-show="activeTab === 'list'">
                <ShoppingDistricts 
                  :districts="displayedDistricts"
                  :highlighted-district-id="highlightedDistrictId"
                  @district-card-click="handleDistrictCardClick"
                />
              </div>
              
              <!-- Map Tab Content -->
              <div v-show="activeTab === 'map'" class="bg-white dark:bg-[#181311] rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div class="h-[500px]">
                  <ClientOnly>
                    <ShoppingMap
                      ref="mapRef"
                      :districts="displayedDistricts"
                      :highlighted-district-id="highlightedDistrictId"
                      @district-click="handleMapDistrictClick"
                    />
                    <template #fallback>
                      <div class="w-full h-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                        <div class="text-center space-y-3">
                          <span class="material-symbols-outlined text-6xl text-gray-400">map</span>
                          <p class="text-text-muted">Loading map...</p>
                        </div>
                      </div>
                    </template>
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div id="smart-tips">
          <ShoppingSmartGuide />
        </div>
        
        <!-- VAT Refund Section -->
        <ShoppingVATRefund />
      </template>
      
      <ShoppingEmptyState v-else />
    </main>

    <!-- Saved Items Panel -->
    <ShoppingSavedPanel />

  </div>
</template>

<style scoped>
/* Override global theme for Shopping page (Orange Theme) */
.group\/design-root {
  --color-primary: #f45c25;
  --color-bg-light: #f8f6f5;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
  /* --color-text-muted is #8a6b60 in the HTML, standardizing on our text-muted token */
}
</style>
