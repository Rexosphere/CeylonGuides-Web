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
        <AccommodationList :category="selectedCategory" :district="selectedDistrict" />
      </div>

      <!-- Right Panel: Map -->
      <AccommodationMap />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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

const categories = computed(() => categoriesResponse.value?.data || [])
const districts = computed(() => districtsResponse.value?.data || [])

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
