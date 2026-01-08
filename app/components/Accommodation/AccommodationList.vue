<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-primary dark:text-white mb-6">
      {{ accommodations.length }} Stays found in Sri Lanka
    </h2>

    <div class="space-y-4">

      <div v-if="accommodations.length === 0" class="py-10 text-center">
        <div class="flex flex-col items-center gap-4">
          <span class="material-symbols-outlined text-[48px] text-neutral-gray">search_off</span>
          <div class="text-sm text-neutral-gray dark:text-neutral-400">
            No stays found matching your filters.
          </div>
          <button class="text-sm font-bold text-primary hover:underline" @click="$emit('clearFilters')">
            Clear all filters
          </button>
        </div>
      </div>

      <template v-else>
        <AccommodationCard v-for="accommodation in paginatedAccommodations" :key="accommodation.id"
          :accommodation="accommodation" :isHighlighted="highlightedId === accommodation.id" @view="openDetails"
          @viewOnMap="$emit('viewOnMap', $event)" @hover="$emit('hover', $event)" />
      </template>

      <!-- Load More -->
      <div v-if="hasMoreStays" class="py-4 flex justify-center">
        <button @click="showMoreStays"
          class="bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-gray-300 px-6 py-2.5 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-all shadow-sm">
          Show More Stays ({{ remainingStays }})
        </button>
      </div>
    </div>

    <!-- Details Drawer -->
    <AccommodationDetailsDrawer :isOpen="showDetails" :accommodation="selectedAccommodation" @close="closeDetails" />
  </div>
</template>

<script setup lang="ts">
import AccommodationCard from './AccommodationCard.vue'
import AccommodationDetailsDrawer from './AccommodationDetailsDrawer.vue'
import { computed, ref, nextTick, watch } from 'vue'
import type { Accommodation } from '~/types/api'
import { useAccommodationFavorites } from '~/composables/useAccommodationFavorites'

// Basic props only
const props = defineProps<{
  accommodations: Accommodation[]
  highlightedId: string | number | null
}>()

const emit = defineEmits<{
  (e: 'viewOnMap', id: string | number): void
  (e: 'hover', id: string | number | null): void
  (e: 'clearFilters'): void
}>()

const { favorites, isFavorite } = useAccommodationFavorites()

const visibleCount = ref(10)

const paginatedAccommodations = computed(() => {
  return props.accommodations.slice(0, visibleCount.value)
})

const hasMoreStays = computed(() => {
  return visibleCount.value < props.accommodations.length
})

const remainingStays = computed(() => {
  return props.accommodations.length - visibleCount.value
})

function showMoreStays() {
  visibleCount.value += 10
}

// Reset visible count when accommodations change (filters applied)
watch(() => props.accommodations, () => {
  visibleCount.value = 10
})

const showDetails = ref(false)
const selectedAccommodation = ref<Accommodation | null>(null)
const deepLinkHandled = ref(false)

const route = useRoute()

function scrollToAccommodation(id: string) {
  nextTick(() => {
    const el = document.getElementById(`accommodation-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')
      }, 3000)
    }
  })
}

function openDetails(id: string | number) {
  const match = props.accommodations.find(a => a.id === id)
  if (match) {
    selectedAccommodation.value = match
    showDetails.value = true
  }
}

function closeDetails() {
  showDetails.value = false
  selectedAccommodation.value = null
}

watch(
  () => [route.query.id, props.accommodations.length],
  async ([id]) => {
    if (!id || deepLinkHandled.value || props.accommodations.length === 0) return
    deepLinkHandled.value = true
    await openDetails(id as string)
    scrollToAccommodation(id as string)
  },
  { immediate: true }
)
</script>
