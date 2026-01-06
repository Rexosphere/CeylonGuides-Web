<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <Header variant="solid" />
    
    <!-- Main Content Layout -->
    <main class="relative flex min-h-[calc(100vh-80px)] w-full flex-col md:flex-row pt-[73px] lg:pt-[80px]">
      <!-- Left Panel: Filters & List -->
      <div class="flex flex-1 flex-col overflow-y-auto md:max-w-[60%] border-r border-neutral-light dark:border-white/10 bg-white dark:bg-background-dark">
        <AccommodationHero />
        <AccommodationFilters
          :categories="categories"
          :districts="districts"
          :category="selectedCategory"
          :district="selectedDistrict"
          @update:category="selectedCategory = $event"
          @update:district="selectedDistrict = $event"
        />
        <AccommodationList 
          :category="selectedCategory" 
          :district="selectedDistrict"
          @accommodationsLoaded="onAccommodationsLoaded"
        />
      </div>

      <!-- Right Panel: Map -->
      <AccommodationMap :accommodations="accommodationsForMap" @select="handleMapSelect" />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Accommodation } from '~/types/api'
import AccommodationHero from '~/components/Accommodation/AccommodationHero.vue'
import AccommodationFilters from '~/components/Accommodation/AccommodationFilters.vue'
import AccommodationList from '~/components/Accommodation/AccommodationList.vue'
import AccommodationMap from '~/components/Accommodation/AccommodationMap.vue'
import Header from '~/components/Shared/Header.vue'
import Footer from '~/components/Shared/Footer.vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const selectedCategory = ref<string | null>(null)
const selectedDistrict = ref<string | null>(null)

const { data: categoriesResponse } = await useFetch<{
  success: boolean
  data: Array<{ category: string; count: number }>
}>(`${apiBase}/api/accommodations/categories/list`)

const { data: districtsResponse } = await useFetch<{
  success: boolean
  data: Array<{ district: string; count: number }>
}>(`${apiBase}/api/accommodations/districts/list`)

// Fetch accommodations for map
const { data: accommodationsResponse, refresh: refreshAccommodations } = await useFetch<{
  success: boolean
  data: Accommodation[]
}>(() => {
  const params = new URLSearchParams()
  if (selectedCategory.value) params.set('category', selectedCategory.value)
  if (selectedDistrict.value) params.set('district', selectedDistrict.value)
  const queryStr = params.toString()
  return `${apiBase}/api/accommodations${queryStr ? `?${queryStr}` : ''}`
}, { watch: [selectedCategory, selectedDistrict] })

const categories = computed(() => categoriesResponse.value?.data || [])
const districts = computed(() => districtsResponse.value?.data || [])

const accommodationsForMap = computed(() => {
  return (accommodationsResponse.value?.data || []).map(a => ({
    id: a.id,
    name: a.name,
    location: a.location,
    category: a.category,
    price_per_night_lkr: a.price_per_night_lkr,
    rating: a.rating
  }))
})

function onAccommodationsLoaded(accs: Accommodation[]) {
  // Sync if needed
}

function handleMapSelect(id: string) {
  // Scroll to the accommodation in the list
  const el = document.getElementById(`accommodation-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
    setTimeout(() => {
      el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')
    }, 3000)
  }
}

definePageMeta({
  layout: false
})

useHead({
  title: 'Accommodation Finder - CeylonGuide',
  meta: [
    { name: 'description', content: 'Discover curated hotels, guesthouses, and homestays verified for safety and comfort in Sri Lanka.' }
  ]
})
</script>

