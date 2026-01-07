<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display min-h-screen">
    <!-- 404 State -->
    <div v-if="!itinerary" class="min-h-screen flex flex-col items-center justify-center px-4">
      <span class="material-symbols-outlined text-6xl text-gray-300 dark:text-neutral-600 mb-4">error_outline</span>
      <h1 class="text-2xl font-bold mb-2">Itinerary Not Found</h1>
      <p class="text-text-muted dark:text-neutral-400 mb-6">The template you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/itineraries" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
        <span class="material-symbols-outlined">arrow_back</span>
        Back to Itineraries
      </NuxtLink>
    </div>

    <!-- Content when itinerary exists -->
    <template v-else>
    <!-- Hero -->
    <section class="relative h-[400px]">
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="`background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${heroImage}');`"
      ></div>
      <div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div class="flex gap-2 mb-4">
          <span 
            v-for="tag in itinerary?.style.slice(0, 3)" 
            :key="tag" 
            class="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full"
          >
            {{ capitalize(tag) }}
          </span>
        </div>
        <h1 class="text-white text-4xl md:text-5xl font-black mb-4">{{ itinerary?.title }}</h1>
        <div class="flex items-center gap-6 text-white/90">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-lg">schedule</span>
            {{ itinerary?.durationDays }} Days
          </span>
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-lg">payments</span>
            ~${{ itinerary?.estimatedCostPerPersonUSD }}/person
          </span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <main class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Day by Day -->
        <div class="lg:col-span-2 space-y-6">
          <h2 class="text-2xl font-bold mb-6">Day-by-Day Itinerary</h2>
          
          <!-- Days -->
          <div 
            v-for="day in itinerary?.days" 
            :key="day.dayNumber" 
            class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-100 dark:border-neutral-800"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                {{ day.dayNumber }}
              </div>
              <div>
                <h3 class="font-bold text-lg">Day {{ day.dayNumber }}: {{ day.title }}</h3>
                <p class="text-sm text-text-muted dark:text-neutral-400">{{ day.locations?.join(' → ') }}</p>
              </div>
            </div>

            <!-- Activities -->
            <div class="space-y-4 ml-5 border-l-2 border-gray-200 dark:border-neutral-700 pl-6">
              <div 
                v-for="(activity, idx) in day.activities" 
                :key="idx"
                class="relative"
              >
                <div class="absolute -left-[31px] w-4 h-4 rounded-full bg-white dark:bg-surface-dark border-2 border-primary"></div>
                <div class="flex items-start gap-3">
                  <span :class="getActivityTypeClass(activity.type)" class="text-xs font-semibold px-2 py-0.5 rounded uppercase">
                    {{ activity.type }}
                  </span>
                  <div class="flex-1">
                    <p class="font-semibold">{{ activity.title }}</p>
                    <p class="text-sm text-text-muted dark:text-neutral-400 mt-1">{{ activity.description }}</p>
                    <div v-if="activity.duration" class="text-xs text-text-muted mt-2 flex items-center gap-1">
                      <span class="material-symbols-outlined text-xs">schedule</span>
                      {{ activity.duration }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty state for itineraries without days -->
          <div v-if="!itinerary?.days?.length" class="bg-surface-light dark:bg-surface-dark rounded-xl p-8 text-center">
            <span class="material-symbols-outlined text-4xl text-gray-300 mb-4">event_note</span>
            <p class="text-text-muted">Detailed day-by-day breakdown coming soon!</p>
            <p class="text-sm text-text-muted mt-2">Check the highlights below for an overview.</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Highlights -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-100 dark:border-neutral-800">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">star</span>
              Highlights
            </h3>
            <ul class="space-y-3">
              <li 
                v-for="highlight in itinerary?.sidebarHighlights" 
                :key="highlight"
                class="flex items-start gap-2 text-sm"
              >
                <span class="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                {{ highlight }}
              </li>
            </ul>
          </div>

          <!-- Customization Tips -->
          <div v-if="itinerary?.customizationNotes?.length" class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <span class="material-symbols-outlined">lightbulb</span>
              Customization Tips
            </h3>
            <ul class="space-y-3">
              <li 
                v-for="note in itinerary?.customizationNotes" 
                :key="note"
                class="text-sm text-amber-900 dark:text-amber-100"
              >
                • {{ note }}
              </li>
            </ul>
          </div>

          <!-- CTA -->
          <div class="sticky top-4 space-y-3">
            <button 
              @click="useItinerary"
              class="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">edit_calendar</span>
              Use This Itinerary
            </button>
            <button 
              @click="customizeDates"
              class="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-neutral-700 py-3 rounded-xl font-semibold hover:border-primary transition-colors"
            >
              Customize Dates
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Back Link -->
    <div class="max-w-6xl mx-auto px-4 pb-12">
      <NuxtLink to="/itineraries" class="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
        <span class="material-symbols-outlined">arrow_back</span>
        Back to All Itineraries
      </NuxtLink>
    </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import itinerariesData from '~/assets/data/itineraries.json'
import { useTripBuilder } from '~/composables/useTripBuilder'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const { loadTemplate } = useTripBuilder()

const itinerary = computed(() => {
  return itinerariesData.itineraries.find(i => i.slug === slug)
})

// Hero image mapping
const heroImage = computed(() => {
  const map: Record<string, string> = {
    'cultural-triangle-express': '/images/downloaded_42e12d701946.avif',
    'southern-beaches-wildlife': '/images/downloaded_aac0d66ad44a.avif',
    'cultural-heart-sri-lanka': '/images/downloaded_42e12d701946.avif',
    'classic-sri-lanka-highlights': '/images/downloaded_5ff6b6bbf9ad.avif',
    'luxury-wellness-tour': '/images/downloaded_0bded551fdfb.avif',
    'backpackers-sri-lanka-adventure': '/images/downloaded_aac0d66ad44a.avif',
  }
  return map[slug] || '/images/downloaded_42e12d701946.avif'
})

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const getActivityTypeClass = (type: string) => {
  const map: Record<string, string> = {
    activity: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    transfer: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    leisure: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    arrival: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  }
  return map[type] || 'bg-gray-100 text-gray-800'
}

// Load template into Trip Builder and navigate
const useItinerary = () => {
  if (itinerary.value) {
    loadTemplate(itinerary.value)
    router.push({ path: '/trip-builder', query: { template: slug } })
  }
}

// Navigate to Trip Builder for date customization
const customizeDates = () => {
  router.push({ path: '/explore', query: { template: slug } })
}

useHead({
  title: computed(() => `${itinerary.value?.title || 'Itinerary'} - CeylonGuide`),
  meta: [
    { name: 'description', content: computed(() => itinerary.value?.whyYouWillLoveIt || '') }
  ]
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #f45c25;
}
</style>
