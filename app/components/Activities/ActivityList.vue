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
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Grid -->
    <section class="pb-16">
      <div class="layout-container flex justify-center">
        <div class="w-full max-w-[1440px] px-4 md:px-10">
          
          <!-- Grid Container -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="activity in filteredActivities" 
              :key="activity.id"
              :id="`activity-${activity.id}`"
              class="group flex flex-col gap-3 cursor-pointer transition-all hover:scale-[1.02]"
              @click="openDetails(activity)"
            >
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">
                  {{ activity.category }}
                </div>
                <button 
                  class="absolute top-3 right-3 z-10 text-white drop-shadow-md hover:scale-110 transition-transform"
                  @click.stop="toggleFavorite(activity.id)"
                >
                  <span class="material-symbols-outlined" :class="{ 'fill-icon text-red-500': favorites.includes(activity.id) }">favorite</span>
                </button>
                <div 
                  class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105 bg-gray-200 dark:bg-gray-800" 
                  role="img" 
                  :aria-label="activity.title"
                  :style="{ backgroundImage: activity.heroImage ? `url('${activity.heroImage}')` : `linear-gradient(135deg, var(--color-primary) 0%, #ff8a50 100%)` }"
                ></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">
                    {{ activity.priceUSD ? `$${activity.priceUSD}` : 'Free' }}
                  </span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">{{ activity.title }}</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> {{ activity.region }}</span>
                  <span>•</span>
                  <span class="capitalize">{{ activity.difficulty || 'Easy' }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-if="filteredActivities.length === 0" class="text-center py-16">
            <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">search_off</span>
            <p class="mt-4 text-lg text-text-muted">No experiences match your filters</p>
            <button @click="$emit('update:category', null)" class="mt-4 text-primary font-bold hover:underline">Clear filters</button>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Modal Popup -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showDetails" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeDetails"></div>
        <div 
          class="relative bg-white dark:bg-surface-dark rounded-t-2xl sm:rounded-2xl w-full sm:max-w-xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 flex flex-col"
          @keydown.esc="closeDetails"
        >
          <!-- Sticky Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-surface-dark sticky top-0 z-10">
            <button @click="closeDetails" class="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
            <h3 class="text-base font-bold text-text-main dark:text-white truncate max-w-[70%]">
              {{ selectedActivity?.title || 'Experience Details' }}
            </h3>
            <div class="w-6"></div>
          </div>
          
          <!-- Scrollable Content -->
          <div class="overflow-y-auto flex-1 overscroll-contain">
            <div v-if="selectedActivity" class="flex flex-col">
              <!-- Hero Image -->
              <div 
                class="w-full aspect-video bg-gray-200 dark:bg-gray-800 bg-cover bg-center"
                :style="{ backgroundImage: selectedActivity.heroImage ? `url('${selectedActivity.heroImage}')` : `linear-gradient(135deg, var(--color-primary) 0%, #ff8a50 100%)` }"
              ></div>
              
              <div class="p-5 flex flex-col gap-4">
                <!-- Short Description -->
                <p class="text-sm text-text-muted dark:text-gray-300 leading-relaxed">{{ selectedActivity.shortDescription }}</p>
                
                <!-- Info Pills -->
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">{{ selectedActivity.category }}</span>
                  <span v-if="selectedActivity.difficulty" class="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-medium capitalize">{{ selectedActivity.difficulty }}</span>
                  <span v-if="selectedActivity.duration" class="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-medium">{{ selectedActivity.duration }}</span>
                  <span class="px-3 py-1.5 rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs font-bold">
                    {{ selectedActivity.priceUSD ? `$${selectedActivity.priceUSD} / person` : 'Free' }}
                  </span>
                </div>
                
                <!-- Full Description -->
                <div>
                  <h4 class="text-sm font-bold text-text-main dark:text-white mb-2">About This Experience</h4>
                  <p class="text-sm text-text-muted dark:text-gray-400 leading-relaxed">{{ selectedActivity.fullDescription }}</p>
                </div>
                
                <!-- Includes List -->
                <div v-if="selectedActivity.includes?.length">
                  <h4 class="text-sm font-bold text-text-main dark:text-white mb-2">What's Included</h4>
                  <ul class="space-y-1.5">
                    <li v-for="item in selectedActivity.includes" :key="item" class="flex items-center gap-2 text-sm text-text-muted dark:text-gray-400">
                      <span class="material-symbols-outlined text-green-500 text-[16px]">check_circle</span>
                      {{ item }}
                    </li>
                  </ul>
                </div>
                
                <!-- Location -->
                <div class="flex items-center gap-2 text-sm text-text-muted dark:text-gray-400">
                  <span class="material-symbols-outlined text-[18px]">location_on</span>
                  <span>{{ selectedActivity.region }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sticky CTA -->
          <div class="p-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-surface-dark space-y-2">
            <button class="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl text-sm font-bold transition-colors">
              Book This Experience
            </button>
            <button 
              class="w-full border border-gray-200 dark:border-white/20 text-text-main dark:text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              @click="toggleFavorite(selectedActivity?.id); closeDetails()"
            >
              <span class="material-symbols-outlined text-[18px]" :class="{ 'fill-icon text-red-500': selectedActivity && favorites.includes(selectedActivity.id) }">favorite</span>
              {{ selectedActivity && favorites.includes(selectedActivity.id) ? 'Saved' : 'Save for Later' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import adventuresData from '~/assets/data/adventures.json'

interface Adventure {
  id: number
  title: string
  slug: string
  category: string
  region: string
  priceUSD: number | null
  difficulty: string | null
  duration: string | null
  tags: string[]
  shortDescription: string
  fullDescription: string
  includes: string[]
  provider: string | null
  heroImage: string | null
  suggestedPhoto: string
  isTrending: boolean
}

const props = defineProps<{
  category: string | null
  search: string
}>()

const emit = defineEmits(['update:category'])

// Load adventures from JSON
const adventures = ref<Adventure[]>(adventuresData as Adventure[])

// Filter by category and search
const filteredActivities = computed(() => {
  let result = adventures.value
  
  // Filter by category
  if (props.category) {
    result = result.filter(a => 
      a.category.toLowerCase() === props.category?.toLowerCase()
    )
  }
  
  // Filter by search query
  if (props.search && props.search.trim()) {
    const query = props.search.toLowerCase().trim()
    result = result.filter(a => 
      a.title.toLowerCase().includes(query) ||
      a.region.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query) ||
      a.shortDescription.toLowerCase().includes(query) ||
      a.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return result
})

// Modal state
const showDetails = ref(false)
const selectedActivity = ref<Adventure | null>(null)

// Favorites
const favorites = ref<number[]>([])

function openDetails(activity: Adventure) {
  selectedActivity.value = activity
  showDetails.value = true
  document.body.style.overflow = 'hidden'
}

function closeDetails() {
  showDetails.value = false
  selectedActivity.value = null
  document.body.style.overflow = ''
}

function toggleFavorite(id: number | undefined) {
  if (!id) return
  const index = favorites.value.indexOf(id)
  if (index === -1) {
    favorites.value.push(id)
  } else {
    favorites.value.splice(index, 1)
  }
}

// Handle ESC key
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && showDetails.value) {
    closeDetails()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.fill-icon {
  font-variation-settings: 'FILL' 1;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from > div:last-child {
  transform: translateY(100%);
}
.modal-leave-to > div:last-child {
  transform: translateY(100%);
}
@media (min-width: 640px) {
  .modal-enter-from > div:last-child,
  .modal-leave-to > div:last-child {
    transform: translateY(20px) scale(0.95);
  }
}
</style>
