<template>
  <div class="flex flex-col">
    <!-- Trending Section Header -->
    <section class="pt-8">
      <div class="layout-container flex justify-center">
        <div class="w-full max-w-[1440px] px-4 md:px-10">
          <div class="flex items-end justify-between mb-6">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-text-main dark:text-white">Trending Experiences</h2>
              <p class="text-text-muted mt-1">Top-rated adventures loved by travelers this week.</p>
            </div>
            <a class="hidden sm:flex items-center gap-1 text-primary font-bold text-sm hover:translate-x-1 transition-transform" href="#">
              View all <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Grid -->
    <section class="pb-16">
      <div class="layout-container flex justify-center">
        <div class="w-full max-w-[1440px] px-4 md:px-10">
          
          <!-- Loading State -->
          <div v-if="pending" class="flex justify-center py-12">
            <div class="text-4xl animate-pulse">⏳</div>
          </div>
          
          <!-- Grid Container -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="activity in activities" 
              :key="activity.id"
              :id="`activity-${activity.id}`"
              class="group flex flex-col gap-3 cursor-pointer transition-all"
              @click="openDetails(activity.id)"
            >
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">
                  {{ activity.category }}
                </div>
                <div class="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                  <span class="material-symbols-outlined fill-current hover:text-primary transition-colors">favorite</span>
                </div>
                <div 
                  class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" 
                  role="img" 
                  :aria-label="activity.name"
                  :style="{ backgroundImage: `url('${activity.image}')` }"
                ></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">{{ activity.price }}</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">{{ activity.name }}</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> {{ activity.location }}</span>
                  <span>•</span>
                  <span>{{ activity.difficulty }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-12 flex justify-center">
            <button class="bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-800 text-text-main dark:text-white px-8 py-3 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-surface-dark/80 transition-colors">
              Load More Experiences
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>

  <Teleport to="body">
    <div v-if="showDetails" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="closeDetails"></div>
      <div class="relative bg-white dark:bg-surface-dark rounded-2xl max-w-xl w-full shadow-2xl border border-gray-200 dark:border-white/10">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
          <h3 class="text-lg font-bold text-text-main dark:text-white">
            {{ selectedActivity?.name || 'Activity Details' }}
          </h3>
          <button @click="closeDetails" class="text-gray-400 hover:text-gray-600">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-6">
          <div v-if="detailsLoading" class="text-sm text-text-muted">Loading details...</div>
          <div v-else-if="detailsError" class="text-sm text-red-600">{{ detailsError }}</div>
          <div v-else-if="selectedActivity">
            <div class="flex flex-col gap-4">
              <img
                v-if="selectedActivity.image_url"
                :src="selectedActivity.image_url"
                :alt="selectedActivity.name"
                class="h-48 w-full object-cover rounded-xl"
              />
              <p class="text-sm text-text-muted">{{ selectedActivity.description || 'No description available.' }}</p>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="px-2 py-1 rounded bg-primary/10 text-primary">{{ selectedActivity.category }}</span>
                <span v-if="selectedActivity.difficulty" class="px-2 py-1 rounded bg-gray-100 dark:bg-white/10">{{ selectedActivity.difficulty }}</span>
                <span v-if="selectedActivity.duration_hours" class="px-2 py-1 rounded bg-gray-100 dark:bg-white/10">{{ selectedActivity.duration_hours }} hrs</span>
                <span v-if="selectedActivity.price_per_person_usd" class="px-2 py-1 rounded bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                  ${{ selectedActivity.price_per_person_usd }} / person
                </span>
                <span v-else-if="selectedActivity.price_per_person_lkr" class="px-2 py-1 rounded bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                  LKR {{ selectedActivity.price_per_person_lkr.toLocaleString() }} / person
                </span>
              </div>
              <div v-if="selectedActivity.includes?.length" class="text-xs text-text-muted">
                Includes: {{ selectedActivity.includes.join(', ') }}
              </div>
              <div v-if="selectedActivity.provider_name" class="text-xs text-text-muted">
                Provider: {{ selectedActivity.provider_name }}
              </div>
              <div class="text-sm text-text-muted">
                Location: {{ selectedActivity.location?.name || 'Sri Lanka' }}
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
import type { Activity } from '~/types/api'

const { apiBase } = useRuntimeConfig().public

const props = defineProps<{
  category: string | null
}>()

// Fetch activities from API
const { data: apiActivities, pending } = await useFetch<{ success: boolean; data: Activity[] }>(
  () => {
    const params = new URLSearchParams()
    if (props.category) params.set('category', props.category)
    const queryStr = params.toString()
    return `${apiBase}/api/activities${queryStr ? `?${queryStr}` : ''}`
  },
  { watch: [() => props.category] }
)

// Static fallback data
const staticActivities = [
  {
    id: '1',
    name: 'Sunrise Hike at Little Adam\'s Peak',
    category: 'Hiking',
    location: 'Ella',
    difficulty: 'Moderate',
    price: '$15 / person',
    image: '/images/downloaded_f042208332ff.avif'
  },
  {
    id: '2',
    name: 'Traditional Ayurveda Treatment',
    category: 'Wellness',
    location: 'Galle',
    difficulty: 'Relaxing',
    price: '$45 / session',
    image: '/images/downloaded_7d353ffcc591.avif'
  },
  {
    id: '3',
    name: 'Leopard Safari in Yala',
    category: 'Wildlife',
    location: 'Yala',
    difficulty: 'Adventure',
    price: '$60 / person',
    image: '/images/downloaded_27e8c35d5c2c.avif'
  },
  {
    id: '4',
    name: 'Surfing Lessons in Weligama',
    category: 'Water Sports',
    location: 'Weligama',
    difficulty: 'Active',
    price: '$25 / lesson',
    image: '/images/downloaded_e4fa93d74062.avif'
  },
  {
    id: '5',
    name: 'Climb Sigiriya Lion Rock',
    category: 'Culture',
    location: 'Dambulla',
    difficulty: 'Moderate',
    price: '$30 / entry',
    image: '/images/downloaded_b6f84a555858.avif'
  },
  {
    id: '6',
    name: 'Kandy to Ella Train Journey',
    category: 'Scenic Train',
    location: 'Hill Country',
    difficulty: 'Relaxing',
    price: '$3 / ticket',
    image: '/images/downloaded_57d1237dafa2.avif'
  },
  {
    id: '7',
    name: 'The Elephant Gathering',
    category: 'Wildlife',
    location: 'Minneriya',
    difficulty: 'Family Friendly',
    price: '$55 / person',
    image: '/images/downloaded_dd64a547d93a.avif'
  },
  {
    id: '8',
    name: 'Traditional Cooking Class',
    category: 'Culinary',
    location: 'Kandy',
    difficulty: 'Easy',
    price: '$20 / person',
    image: '/images/downloaded_38dcb2f67ab0.avif'
  }
]

const activities = computed(() => {
  const apiList = apiActivities.value?.data || []
  if (apiList.length) {
    return apiList.map((a) => ({
      id: a.id,
      name: a.name,
      category: a.category?.replace(/_/g, ' ') || 'Experience',
      location: a.location?.name || 'Sri Lanka',
      difficulty: a.difficulty || 'Moderate',
      price: a.price_per_person_usd
        ? `$${a.price_per_person_usd} / person`
        : a.price_per_person_lkr
          ? `LKR ${a.price_per_person_lkr} / person`
          : 'Contact for price',
      image: a.image_url || '/images/downloaded_f042208332ff.avif'
    }))
  }
  return staticActivities
})

const showDetails = ref(false)
const detailsLoading = ref(false)
const detailsError = ref('')
const selectedActivity = ref<Activity | null>(null)

async function openDetails(id: string) {
  showDetails.value = true
  detailsLoading.value = true
  detailsError.value = ''
  try {
    const response = await $fetch<{ success: boolean; data: Activity }>(`${apiBase}/api/activities/${id}`)
    if (response.success) {
      selectedActivity.value = response.data
    }
  } catch (err: any) {
    detailsError.value = err?.data?.error || 'Failed to load activity details.'
  } finally {
    detailsLoading.value = false
  }
}

function closeDetails() {
  showDetails.value = false
  selectedActivity.value = null
}

// Handle ?id= deep-link query param
const route = useRoute()

onMounted(async () => {
  const targetId = route.query.id as string
  if (targetId) {
    await openDetails(targetId)
    nextTick(() => {
      const el = document.getElementById(`activity-${targetId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')
        }, 3000)
      }
    })
  }
})
</script>
