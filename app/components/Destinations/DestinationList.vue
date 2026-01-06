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
        <div 
          class="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105" 
          :style="{ backgroundImage: `url('${dest.image}')` }"
          :aria-label="dest.alt"
        ></div>
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
        <p class="text-[#5c4a44] dark:text-[#bcaaa4] text-lg leading-relaxed">
          {{ dest.description }}
        </p>
        <div class="flex flex-wrap gap-3 my-2" :class="{ 'justify-start md:justify-end': dest.layout === 'right' }">
          <div 
            v-for="(tag, tIndex) in dest.tags" 
            :key="tIndex"
            class="flex items-center gap-2 text-sm text-[#8a6b60] dark:text-[#9e8a84] bg-white dark:bg-[#2c201a] px-3 py-1.5 rounded-lg border border-[#e6dedb] dark:border-[#3a2d28]"
          >
            <span class="material-symbols-outlined text-[18px]">{{ tag.icon }}</span> {{ tag.label }}
          </div>
        </div>
        <div class="pt-4">
          <button 
            class="flex items-center gap-2 text-[#181311] dark:text-white hover:text-primary dark:hover:text-primary transition-colors font-bold text-base group/btn"
            :class="{ 'md:flex-row-reverse': dest.layout === 'right' }"
          >
            Explore Destination 
            <span 
              class="material-symbols-outlined transition-transform group-hover/btn:translate-x-1"
              :class="{ 'md:group-hover/btn:-translate-x-1 md:rotate-180': dest.layout === 'right' }"
            >arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Layout C: Full Width -->
      <template v-if="dest.layout === 'full'">
        <div class="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          class="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105" 
          :style="{ backgroundImage: `url('${dest.image}')` }"
          :aria-label="dest.alt"
        ></div>
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
            <p class="text-[#5c4a44] dark:text-[#bcaaa4] text-base leading-relaxed mb-6">
              {{ dest.description }}
            </p>
            <button
              class="w-full py-3 rounded-lg bg-[#181311] dark:bg-white text-white dark:text-[#181311] font-bold text-sm hover:opacity-90 transition-opacity"
              @click="openDetails(dest.id)"
            >
              Explore Destination
            </button>
          </div>
        </div>
      </template>

    </article>
  </div>

  <Teleport to="body">
    <div v-if="showDetails" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="closeDetails"></div>
      <div class="relative bg-white dark:bg-surface-dark rounded-2xl max-w-xl w-full shadow-2xl border border-gray-200 dark:border-white/10">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
          <h3 class="text-lg font-bold text-text-main dark:text-white">
            {{ selectedDestination?.name || 'Destination Details' }}
          </h3>
          <button @click="closeDetails" class="text-gray-400 hover:text-gray-600">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-6">
          <div v-if="detailsLoading" class="text-sm text-text-muted">Loading details...</div>
          <div v-else-if="detailsError" class="text-sm text-red-600">{{ detailsError }}</div>
          <div v-else-if="selectedDestination">
            <div class="flex flex-col gap-4">
              <img
                v-if="selectedDestination.image_url"
                :src="selectedDestination.image_url"
                :alt="selectedDestination.name"
                class="h-48 w-full object-cover rounded-xl"
              />
              <p class="text-sm text-text-muted">{{ selectedDestination.description || 'No description available.' }}</p>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="px-2 py-1 rounded bg-primary/10 text-primary">{{ selectedDestination.category }}</span>
                <span v-if="selectedDestination.is_unesco" class="px-2 py-1 rounded bg-amber-100 text-amber-700">UNESCO</span>
                <span v-if="selectedDestination.best_time_to_visit" class="px-2 py-1 rounded bg-gray-100 dark:bg-white/10">{{ selectedDestination.best_time_to_visit }}</span>
              </div>
              <div v-if="selectedDestination.highlights?.length" class="text-xs text-text-muted">
                Highlights: {{ selectedDestination.highlights.join(', ') }}
              </div>
              <div class="text-sm text-text-muted">
                Location: {{ selectedDestination.location?.name || selectedDestination.location?.district || 'Sri Lanka' }}
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-text-muted">No details available.</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick, ref } from 'vue'
import type { Destination } from '~/types/api'

const { apiBase } = useRuntimeConfig().public

const props = defineProps<{
  category: string | null
}>()

// Fetch destinations from API
const { data: apiDestinations, pending, error } = await useFetch<{ success: boolean; data: Destination[] }>(
  () => {
    const params = new URLSearchParams()
    if (props.category) params.set('category', props.category)
    const queryStr = params.toString()
    return `${apiBase}/api/destinations${queryStr ? `?${queryStr}` : ''}`
  },
  { watch: [() => props.category] }
)

// Fallback static destinations for when API is unavailable
const staticDestinations = [
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    title: 'Sigiriya',
    subtitle: 'The Lion Rock',
    description: 'Ascend the ancient rock fortress and marvel at the frescoes and water gardens of a past kingdom. A UNESCO World Heritage site that defies imagination, rising dramatically from the central plains.',
    image: '/images/downloaded_135ae74fa037.avif',
    alt: 'Ancient rock fortress Sigiriya surrounded by green jungle',
    category: 'CULTURAL',
    layout: 'left',
    district: 'Matale',
    tags: [
      { icon: 'hiking', label: 'Hiking' },
      { icon: 'history_edu', label: 'History' },
      { icon: 'photo_camera', label: 'Photography' }
    ]
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    title: 'Mirissa',
    subtitle: 'Sunset & Whales',
    description: 'Relax on pristine golden sands or embark on a boat safari to spot majestic blue whales. Mirissa offers the perfect blend of laid-back beach vibes and exciting marine adventures.',
    image: '/images/downloaded_e69d8138022b.avif',
    alt: 'Golden sunset over coconut palms and ocean waves at Mirissa beach',
    category: 'BEACH',
    layout: 'right',
    district: 'Matara',
    tags: [
      { icon: 'surfing', label: 'Surfing' },
      { icon: 'directions_boat', label: 'Whales' },
      { icon: 'nightlife', label: 'Nightlife' }
    ]
  },
  {
    id: 'ella',
    name: 'Ella',
    title: 'Ella',
    subtitle: '',
    description: 'Misty tea plantations, the iconic Nine Arch Bridge, and endless hiking trails. Ella is a hill country village that feels like a home away from home.',
    image: '/images/downloaded_6015207707b3.avif',
    alt: 'Train crossing the Nine Arch Bridge in misty Ella highlands',
    category: 'NATURE',
    layout: 'full',
    district: 'Badulla',
    tags: []
  },
  {
    id: 'yala',
    name: 'Yala',
    title: 'Yala',
    subtitle: 'The Wild Frontier',
    description: 'Home to the highest density of leopards in the world. Experience the thrill of a safari through dry forests and open grasslands teeming with elephants and exotic birds.',
    image: '/images/downloaded_6c82e6b62a7e.avif',
    alt: 'Leopard resting on a tree branch in Yala National Park',
    category: 'WILDLIFE',
    layout: 'left',
    district: 'Hambantota',
    tags: [
      { icon: 'pets', label: 'Safari' },
      { icon: 'camping', label: 'Camping' },
      { icon: 'nature', label: 'Nature' }
    ]
  }
]

// Use API data if available, otherwise fallback to static
const destinations = computed(() => {
  if (apiDestinations.value?.success && apiDestinations.value.data?.length > 0) {
    return apiDestinations.value.data.map((d: any, index: number) => ({
      id: d.id,
      name: d.name,
      title: d.name,
      subtitle: d.subtitle || d.best_time_to_visit || '',
      description: d.description,
      image: d.image_url || staticDestinations[index % staticDestinations.length]?.image || '/images/downloaded_135ae74fa037.avif',
      alt: d.name,
      category: d.category,
      layout: index === 2 ? 'full' : index % 2 === 0 ? 'left' : 'right',
      district: d.district || d.location?.district || '',
      tags: d.highlights?.map((h: string) => ({ icon: 'check', label: h })) || []
    }))
  }
  return staticDestinations
})

const showDetails = ref(false)
const detailsLoading = ref(false)
const detailsError = ref('')
const selectedDestination = ref<Destination | null>(null)

async function openDetails(id: string) {
  showDetails.value = true
  detailsLoading.value = true
  detailsError.value = ''
  try {
    const response = await $fetch<{ success: boolean; data: Destination }>(`${apiBase}/api/destinations/${id}`)
    if (response.success) {
      selectedDestination.value = response.data
    }
  } catch (err: any) {
    detailsError.value = err?.data?.error || 'Failed to load destination details.'
  } finally {
    detailsLoading.value = false
  }
}

function closeDetails() {
  showDetails.value = false
  selectedDestination.value = null
}

// Handle ?id= deep-link query param
const route = useRoute()

onMounted(() => {
  const targetId = route.query.id as string
  if (targetId) {
    nextTick(() => {
      const el = document.getElementById(`destination-${targetId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('ring-2', 'ring-primary', 'ring-offset-4')
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-primary', 'ring-offset-4')
        }, 3000)
      }
    })
  }
})
</script>
