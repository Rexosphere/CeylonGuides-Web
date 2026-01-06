<template>
  <div class="flex flex-col gap-6 p-6">
    <h3 class="text-lg font-bold text-neutral-dark dark:text-white">
      {{ accommodations.length }} Stays found in Sri Lanka
    </h3>
    <div v-if="pending" class="py-10 text-center text-sm text-neutral-gray">Loading stays...</div>
    <div v-else-if="error" class="py-10 text-center text-sm text-red-600">Failed to load stays.</div>
    <template v-else>
      <AccommodationCard 
        v-for="accommodation in accommodationCards"
        :key="accommodation.id" 
        :accommodation="accommodation" 
        @view="openDetails"
      />
    </template>
    <!-- Load More -->
    <div class="flex justify-center p-8">
      <button class="rounded-lg border border-neutral-light bg-white px-6 py-3 text-sm font-bold text-neutral-dark transition-colors hover:bg-neutral-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
        Show More Stays
      </button>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="showDetails" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="closeDetails"></div>
      <div class="relative bg-white dark:bg-surface-dark rounded-2xl max-w-xl w-full shadow-2xl border border-gray-200 dark:border-white/10">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
          <h3 class="text-lg font-bold text-neutral-dark dark:text-white">
            {{ selectedAccommodation?.name || 'Accommodation Details' }}
          </h3>
          <button @click="closeDetails" class="text-gray-400 hover:text-gray-600">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-6">
          <div v-if="detailsLoading" class="text-sm text-neutral-gray">Loading details...</div>
          <div v-else-if="detailsError" class="text-sm text-red-600">{{ detailsError }}</div>
          <div v-else-if="selectedAccommodation">
            <div class="flex flex-col gap-4">
              <img
                v-if="selectedAccommodation.image_url"
                :src="selectedAccommodation.image_url"
                :alt="selectedAccommodation.name"
                class="h-48 w-full object-cover rounded-xl"
              />
              <p class="text-sm text-neutral-gray dark:text-neutral-400">
                {{ selectedAccommodation.description || 'No description available.' }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="inline-flex items-center gap-1 rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
                  {{ selectedAccommodation.category }}
                </span>
                <span v-if="selectedAccommodation.price_per_night_lkr" class="inline-flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                  LKR {{ selectedAccommodation.price_per_night_lkr.toLocaleString() }} / night
                </span>
                <span v-if="selectedAccommodation.price_range" class="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  {{ selectedAccommodation.price_range }} range
                </span>
              </div>
              <div v-if="selectedAccommodation.amenities?.length" class="text-xs text-neutral-gray dark:text-neutral-400">
                Amenities: {{ selectedAccommodation.amenities.join(', ') }}
              </div>
              <div class="text-sm text-neutral-gray dark:text-neutral-400">
                <div v-if="selectedAccommodation.contact_phone">Phone: {{ selectedAccommodation.contact_phone }}</div>
                <div v-if="selectedAccommodation.contact_email">Email: {{ selectedAccommodation.contact_email }}</div>
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-neutral-gray">No details available.</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import AccommodationCard from './AccommodationCard.vue'
import { computed, ref } from 'vue'
import type { Accommodation } from '~/types/api'

const props = defineProps<{
  category: string | null
  district: string | null
}>()

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: accommodationsResponse, pending, error } = await useFetch<{
  success: boolean
  data: Accommodation[]
  count: number
}>(() => {
  const params = new URLSearchParams()
  if (props.category) params.set('category', props.category)
  if (props.district) params.set('district', props.district)
  const queryStr = params.toString()
  return `${apiBase}/api/accommodations${queryStr ? `?${queryStr}` : ''}`
}, { watch: [() => props.category, () => props.district] })

const accommodations = computed(() => accommodationsResponse.value?.data || [])

const amenityIcons: Record<string, string> = {
  WiFi: 'wifi',
  Pool: 'pool',
  Spa: 'spa',
  Restaurant: 'restaurant',
  'Room Service': 'room_service',
  'Hiking Trails': 'hiking',
  Garden: 'yard',
  'Home Cooking': 'restaurant',
  'Tour Help': 'support',
}

function toUsd(lkr?: number) {
  if (!lkr) return 0
  return Math.round(lkr / 300)
}

const accommodationCards = computed(() => {
  return accommodations.value.map((a) => ({
    id: a.id,
    image: a.image_url || '/images/downloaded_eea297ee51ba.avif',
    title: a.name,
    location: a.location?.name || a.location?.district || 'Sri Lanka',
    type: a.category,
    safetyScore: a.rating ? Math.round((a.rating / 5) * 10) : undefined,
    amenities: (a.amenities || []).slice(0, 3).map((item) => ({
      icon: amenityIcons[item] || 'check',
      label: item,
    })),
    price: toUsd(a.price_per_night_lkr),
    rating: a.rating || 0,
    reviews: a.review_count || 0,
  }))
})

const showDetails = ref(false)
const detailsLoading = ref(false)
const detailsError = ref('')
const selectedAccommodation = ref<Accommodation | null>(null)

async function openDetails(id: string | number) {
  showDetails.value = true
  detailsLoading.value = true
  detailsError.value = ''
  try {
    const response = await $fetch<{ success: boolean; data: Accommodation }>(`${apiBase}/api/accommodations/${id}`)
    if (response.success) {
      selectedAccommodation.value = response.data
    }
  } catch (err: any) {
    detailsError.value = err?.data?.error || 'Failed to load accommodation details.'
  } finally {
    detailsLoading.value = false
  }
}

function closeDetails() {
  showDetails.value = false
  selectedAccommodation.value = null
}
</script>
