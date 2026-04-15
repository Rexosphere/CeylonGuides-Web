<template>
  <section class="pb-24 bg-background-light dark:bg-background-dark">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(dest, index) in destinations" :key="index"
          class="group bg-white dark:bg-card-dark rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
          <!-- Image Section -->
          <div class="relative h-64 overflow-hidden">
            <img :alt="dest.alt"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              :src="dest.image" />
            <div class="absolute top-4 left-4">
              <span
                class="bg-white/90 dark:bg-black/70 backdrop-blur-md text-primary dark:text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-full shadow-sm">
                {{ dest.category }}
              </span>
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-6">
            <h3 class="text-xl font-display font-bold text-primary dark:text-white mb-2">
              {{ dest.title }}
            </h3>
            <p class="text-text-muted dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {{ dest.description }}
            </p>
            <NuxtLink :to="`/destinations/${dest.slug}`"
              class="inline-flex items-center text-sm font-semibold text-secondary hover:text-primary transition-colors">
              Explore Details
              <span class="material-icons text-sm ml-1">arrow_forward</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import destinationsData from '~/assets/data/destinations.json'

const props = defineProps<{
  category: string | null
}>()

// Map JSON data to component model
const destinations = computed(() => {
  let data = destinationsData

  if (props.category) {
    data = data.filter(d => d.category === props.category)
  }

  return data.map((d, index) => ({
    id: index,
    slug: d.slug,
    title: d.name,
    description: d.overview,
    image: d.heroImage === 'none' ? '/images/downloaded_135ae74fa037.avif' : d.heroImage,
    alt: d.name,
    category: d.category,
  }))
})
</script>
