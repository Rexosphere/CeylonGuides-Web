<template>
  <div class="flex flex-col gap-12 md:gap-32 py-12 md:py-20 px-6 md:px-20 lg:px-40 max-w-[1440px] mx-auto w-full">
    <article 
      v-for="(dest, index) in destinations" 
      :key="index"
      :id="`destination-${dest.id}`"
      :class="[
        'group transition-all',
        dest.layout === 'full' ? 'relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden' : 'flex flex-col md:flex-row gap-8 md:gap-16 items-center',
        dest.layout === 'right' ? 'md:flex-row-reverse' : ''
      ]"
    >
      <!-- Layout A & B: Image Section -->
      <div 
        v-if="dest.layout !== 'full'"
        class="w-full md:w-3/5 h-[400px] md:h-[600px] rounded-2xl overflow-hidden relative shadow-2xl shadow-black/5"
      >
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
        <img 
          class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
          :src="dest.image"
          :alt="dest.alt"
        />
        <span class="absolute top-6 left-6 z-20 bg-white/90 dark:bg-black/80 backdrop-blur text-[#181311] dark:text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {{ dest.category }}
        </span>
      </div>

      <!-- Layout A & B: Content Section -->
      <div 
        v-if="dest.layout !== 'full'"
        class="w-full md:w-2/5 flex flex-col gap-6"
        :class="{ 'md:items-end md:text-right': dest.layout === 'right' }"
      >
        <div class="flex flex-col gap-2" :class="{ 'md:items-end': dest.layout === 'right' }">
          <h2 class="text-4xl md:text-5xl font-bold text-[#181311] dark:text-white leading-tight">{{ dest.title }}</h2>
          <p class="text-primary text-sm font-bold tracking-widest uppercase">{{ dest.subtitle }}</p>
        </div>
        <p class="text-[#5c4a44] dark:text-[#bcaaa4] text-lg leading-relaxed line-clamp-4">
          {{ dest.description }}
        </p>
        <div class="flex flex-wrap gap-3 my-2" :class="{ 'justify-start md:justify-end': dest.layout === 'right' }">
          <div 
            v-for="(tag, tIndex) in dest.tags" 
            :key="tIndex"
            class="flex items-center gap-2 text-sm text-[#8a6b60] dark:text-[#9e8a84] bg-white dark:bg-[#2c201a] px-3 py-1.5 rounded-lg border border-[#e6dedb] dark:border-[#3a2d28]"
          >
            <span class="material-symbols-outlined text-[18px]">{{ getTagIcon(tag) }}</span> {{ tag }}
          </div>
        </div>
        <div class="pt-4">
          <NuxtLink 
            :to="`/destinations/${dest.slug}`"
            class="flex items-center gap-2 text-[#181311] dark:text-white hover:text-primary dark:hover:text-primary transition-colors font-bold text-base group/btn"
            :class="{ 'md:flex-row-reverse': dest.layout === 'right' }"
          >
            Explore Destination 
            <span 
              class="material-symbols-outlined transition-transform group-hover/btn:translate-x-1"
              :class="{ 'md:group-hover/btn:-translate-x-1 md:rotate-180': dest.layout === 'right' }"
            >arrow_forward</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Layout C: Full Width -->
      <template v-if="dest.layout === 'full'">
        <div class="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
          :src="dest.image"
          :alt="dest.alt"
        />
        <!-- Floating Content Card -->
        <div class="absolute bottom-0 left-0 md:bottom-12 md:left-12 z-20 w-full md:w-[480px] p-6 md:p-0">
          <div class="bg-white/95 dark:bg-[#1a120e]/95 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/20">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-primary text-xs font-bold tracking-widest uppercase mb-1 block">{{ dest.category }}</span>
                <h2 class="text-3xl font-bold text-[#181311] dark:text-white">{{ dest.title }}</h2>
              </div>
              <div class="bg-[#f5f1f0] dark:bg-[#2c201a] p-2 rounded-full">
                <span class="material-symbols-outlined text-[#8a6b60]">landscape</span>
              </div>
            </div>
            <p class="text-[#5c4a44] dark:text-[#bcaaa4] text-base leading-relaxed mb-6 line-clamp-3">
              {{ dest.description }}
            </p>
            <NuxtLink
              class="block text-center w-full py-3 rounded-lg bg-[#181311] dark:bg-white text-white dark:text-[#181311] font-bold text-sm hover:opacity-90 transition-opacity"
              :to="`/destinations/${dest.slug}`"
            >
              Explore Destination
            </NuxtLink>
          </div>
        </div>
      </template>

    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import destinationsData from '~/assets/data/destinations.json'

const props = defineProps<{
  category: string | null
}>()

// Map tags to Material Symbols
const tagIcons: Record<string, string> = {
  'Ruins': 'foundation',
  'Hiking': 'hiking',
  'History': 'history_edu',
  'UNESCO': 'public',
  'Photogenic': 'photo_camera',
  'Adventure': 'paragliding',
  'Spiritual': 'self_improvement',
  'Lake': 'water',
  'Shopping': 'shopping_bag',
  'Romantic': 'favorite',
  'Foodie': 'restaurant',
  'City': 'location_city',
  'Nightlife': 'local_bar',
  'Off-the-beaten-path': 'explore',
  'TeaEstate': 'emoji_food_beverage',
  'Waterfall': 'water_drop',
  'Nature': 'forest',
  'Relaxation': 'spa',
  'Golf': 'golf_course',
  'Birdwatching': 'visibility',
  'Safari': 'pets',
  'Wildlife': 'pets',
  'Beach': 'beach_access',
  'Surfing': 'surfing',
  'Colonial History': 'castle',
  'Train': 'train',
  'Animals': 'pets'
}

function getTagIcon(tag: string) {
  return tagIcons[tag] || 'check_circle'
}

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
    subtitle: d.location, // Using location as subtitle
    description: d.overview,
    image: d.heroImage === 'none' ? '/images/downloaded_135ae74fa037.avif' : d.heroImage,
    alt: d.name,
    category: d.category,
    // Cycle layouts: left, right, full, left, right...
    layout: index % 3 === 2 ? 'full' : index % 2 === 0 ? 'left' : 'right',
    tags: d.tags.slice(0, 3) // First 3 tags only
  }))
})
</script>
