<template>
  <section class="py-12 bg-background-light dark:bg-background-dark">
    <div class="container mx-auto px-6">
      <h2 class="text-3xl font-display font-bold text-primary dark:text-white mb-2">Trending Experiences</h2>
      <p class="text-text-muted mb-8">Top-rated adventures loved by travelers this week.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="activity in filteredActivities" :key="activity.slug"
          class="group bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer">
          <div class="relative h-64 overflow-hidden">
            <img :alt="activity.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :src="getActivityImage(activity.heroImage)" />
            <span
              class="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
              {{ activity.category }}
            </span>
            <button
              class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-white text-white hover:text-red-500 backdrop-blur flex items-center justify-center transition-all">
              <span class="material-icons text-base">favorite_border</span>
            </button>
            <span v-if="activity.displayPrice" :class="activity.priceUSD === null ? 'bg-secondary' : 'bg-primary'"
              class="absolute bottom-4 left-4 text-white text-xs font-bold px-2 py-1 rounded">
              {{ activity.displayPrice }}
            </span>
          </div>
          <div class="p-4">
            <h3
              class="font-bold text-lg text-primary dark:text-white mb-1 group-hover:text-secondary transition-colors">
              {{ activity.title }}
            </h3>
            <div class="flex items-center text-xs text-text-muted gap-2">
              <span class="material-icons text-sm">location_on</span> {{ activity.region }}
              <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>{{ formatDifficulty(activity.difficulty) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import adventuresData from '~/assets/data/adventures.json'

const props = defineProps<{
  category: string | null
  search: string
}>()

// Filtered activities
const filteredActivities = computed(() => {
  let filtered = adventuresData

  // Filter by category
  if (props.category) {
    filtered = filtered.filter((a: any) => a.category === props.category)
  }

  // Filter by search query
  if (props.search && props.search.trim()) {
    const query = props.search.toLowerCase()
    filtered = filtered.filter((a: any) =>
      a.title.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query) ||
      a.region.toLowerCase().includes(query)
    )
  }

  return filtered.map((a: any) => ({
    ...a,
    displayPrice: a.priceUSD === null ? 'Free' : `$${a.priceUSD}`
  }))
})

function formatDifficulty(difficulty: string): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
}

function getActivityImage(imagePath: string) {
  if (!imagePath || imagePath === 'none') {
    return 'https://images.unsplash.com/photo-1546708773-e57c8e89f6fc?q=80&w=2000&auto=format&fit=crop'
  }
  return imagePath
}
</script>
