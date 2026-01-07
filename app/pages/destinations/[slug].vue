<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark">
    <!-- 404 State -->
    <div v-if="!destination" class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-24">
      <h1 class="text-4xl font-display font-bold mb-4 text-primary dark:text-white">Destination Not Found</h1>
      <p class="text-lg text-text-muted dark:text-gray-400 mb-8">We couldn't find the destination you're looking for.
      </p>
      <NuxtLink to="/destinations"
        class="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors">
        Browse All Destinations
      </NuxtLink>
    </div>

    <div v-else>
      <!-- Hero Section -->
      <section class="relative h-[85vh] min-h-[600px] flex items-end pb-20 overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img :alt="destination.name" class="w-full h-full object-cover" :src="getHeroImage(destination.heroImage)" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div class="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        </div>
        <div class="container mx-auto px-6 relative z-10">
          <div class="mb-4 flex items-center gap-2 text-white/80 text-sm font-medium tracking-wide uppercase">
            <span>Sri Lanka</span>
            <span class="material-icons text-[10px]">fiber_manual_record</span>
            <span>{{ destination.location }}</span>
          </div>
          <h1 class="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg tracking-tight">
            {{ destination.name }}
          </h1>
          <div v-if="destination.unescoStatus === 'Yes'"
            class="inline-flex items-center gap-2 bg-slate-800/40 backdrop-blur-md border border-slate-500/30 px-4 py-2 rounded-full text-slate-100 mb-8">
            <span class="material-icons text-slate-300 text-lg">public</span>
            <span class="text-sm font-semibold">UNESCO World Heritage Site</span>
          </div>
          <div class="flex justify-center w-full absolute bottom-8 left-0 animate-bounce">
            <span class="material-icons text-white/50 text-3xl">keyboard_arrow_down</span>
          </div>
        </div>
      </section>

      <!-- Key Facts Bar -->
      <section
        class="bg-white dark:bg-card-dark border-b border-gray-100 dark:border-gray-800 shadow-sm relative z-20 -mt-10 mx-6 rounded-xl hidden md:block">
        <div class="container mx-auto px-8 py-6">
          <div class="flex justify-between divide-x divide-gray-100 dark:divide-gray-700">
            <div class="flex items-center gap-4 px-4 w-1/3">
              <div
                class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <span class="material-icons">category</span>
              </div>
              <div>
                <p class="text-xs text-text-muted dark:text-gray-500 uppercase font-bold tracking-wider">Category</p>
                <p class="text-text-main dark:text-white font-medium">{{ destination.category }}</p>
              </div>
            </div>
            <div class="flex items-center gap-4 px-4 w-1/3">
              <div
                class="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <span class="material-icons">calendar_month</span>
              </div>
              <div>
                <p class="text-xs text-text-muted dark:text-gray-500 uppercase font-bold tracking-wider">Best Time</p>
                <p class="text-text-main dark:text-white font-medium">{{ destination.bestTimeToVisit }}</p>
              </div>
            </div>
            <div class="flex items-center gap-4 px-4 w-1/3">
              <div
                class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <span class="material-icons">place</span>
              </div>
              <div>
                <p class="text-xs text-text-muted dark:text-gray-500 uppercase font-bold tracking-wider">Location</p>
                <p class="text-text-main dark:text-white font-medium">{{ destination.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="py-16 md:py-24 bg-background-light dark:bg-background-dark">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Left Column -->
            <div class="lg:col-span-8">
              <!-- About Section -->
              <div class="mb-16">
                <h2 class="text-3xl font-display font-bold text-primary dark:text-white mb-8">
                  About {{ destination.name }}
                </h2>
                <div class="prose prose-lg dark:prose-invert text-text-muted dark:text-gray-400 leading-relaxed">
                  <p class="mb-6">
                    <span class="text-5xl float-left font-display font-bold text-secondary mr-3 mt-[-10px]">
                      {{ destination.overview.charAt(0) }}
                    </span>
                    {{ destination.overview.slice(1) }}
                  </p>
                </div>
                <div class="flex flex-wrap gap-2 mt-6">
                  <span v-for="tag in destination.tags" :key="tag"
                    class="bg-gray-100 dark:bg-white/10 text-text-muted dark:text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
                    #{{ tag }}
                  </span>
                </div>
              </div>

              <!-- Highlights -->
              <div class="mb-16">
                <h2 class="text-2xl font-display font-bold text-primary dark:text-white mb-8">Highlights</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="(highlight, index) in destination.highlights" :key="index"
                    class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-start gap-4">
                    <div
                      class="w-6 h-6 rounded-full border-2 border-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <span class="material-icons text-secondary text-sm">check</span>
                    </div>
                    <span class="text-text-main dark:text-gray-200 font-medium">{{ highlight }}</span>
                  </div>
                </div>
              </div>

              <!-- Unmissable Experiences -->
              <div class="mb-10">
                <h2 class="text-2xl font-display font-bold text-primary dark:text-white mb-8">Unmissable Experiences
                </h2>
                <div class="space-y-4">
                  <div v-for="(thing, index) in destination.bestThingsToDo" :key="index"
                    class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex gap-6 group hover:border-secondary/30 transition-colors">
                    <span
                      class="text-4xl font-display font-bold text-gray-100 dark:text-gray-700 group-hover:text-secondary/20 transition-colors">
                      {{ String(index + 1).padStart(2, '0') }}
                    </span>
                    <div>
                      <h3 class="font-bold text-primary dark:text-white mb-2">{{ thing }}</h3>
                      <button
                        class="text-secondary text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:text-primary transition-colors">
                        <span class="material-icons text-sm">add_circle_outline</span> Add to Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column (Sidebar) -->
            <div class="lg:col-span-4 space-y-8">
              <!-- Map -->
              <div class="bg-white dark:bg-card-dark rounded-2xl overflow-hidden shadow-card p-2">
                <div class="relative w-full h-64 bg-gray-200 rounded-xl overflow-hidden group cursor-pointer">
                  <iframe v-if="destination.coordinates"
                    :src="`https://www.openstreetmap.org/export/embed.html?bbox=${destination.coordinates.lng - 0.05}%2C${destination.coordinates.lat - 0.03}%2C${destination.coordinates.lng + 0.05}%2C${destination.coordinates.lat + 0.03}&layer=mapnik&marker=${destination.coordinates.lat}%2C${destination.coordinates.lng}`"
                    class="w-full h-full border-0 opacity-80" loading="lazy"
                    :title="`Map of ${destination.name}`"></iframe>
                  <div v-else class="absolute inset-0 flex items-center justify-center">
                    <span class="material-icons text-6xl text-gray-400">map</span>
                  </div>
                  <a v-if="destination.coordinates"
                    :href="`https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`"
                    target="_blank" rel="noopener noreferrer" class="absolute inset-0 flex items-center justify-center">
                    <div
                      class="bg-white/90 backdrop-blur text-secondary px-4 py-2 rounded-full shadow-lg font-bold text-sm flex items-center gap-2">
                      <span class="material-icons text-sm">map</span> Open Map
                    </div>
                  </a>
                </div>
                <div class="p-4 text-center">
                  <a class="text-xs text-secondary hover:underline" href="#">Report a problem</a> |
                  <span class="text-xs text-gray-400">© OpenStreetMap contributors</span>
                </div>
              </div>

              <!-- Practical Info -->
              <div
                class="bg-white dark:bg-card-dark rounded-2xl p-8 shadow-card border border-gray-100 dark:border-gray-800">
                <h3
                  class="text-xl font-display font-bold text-primary dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                  Practical Info
                </h3>
                <div class="space-y-6">
                  <div class="group cursor-pointer">
                    <div class="flex justify-between items-center mb-2">
                      <h4 class="font-bold text-sm text-primary dark:text-gray-200">Getting There</h4>
                      <span
                        class="material-icons text-gray-400 text-sm group-hover:text-secondary transition-colors">expand_more</span>
                    </div>
                    <p class="text-xs text-text-muted dark:text-gray-500 leading-relaxed">
                      Accessible via train or taxi. Check local schedules for best routes.
                    </p>
                  </div>
                  <div class="group cursor-pointer">
                    <div class="flex justify-between items-center mb-2">
                      <h4 class="font-bold text-sm text-primary dark:text-gray-200">What to Bring</h4>
                      <span
                        class="material-icons text-gray-400 text-sm group-hover:text-secondary transition-colors">expand_more</span>
                    </div>
                    <p class="text-xs text-text-muted dark:text-gray-500 leading-relaxed">
                      Water, sunscreen, hat, and good walking shoes recommended.
                    </p>
                  </div>
                </div>
                <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <span class="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-2">Source</span>
                  <a class="text-sm font-bold text-secondary hover:text-primary flex items-center gap-1 transition-colors"
                    href="#">
                    {{ destination.moreInfo }} <span class="material-icons text-xs">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Continue Your Journey -->
      <section class="py-16 bg-white dark:bg-card-dark border-t border-gray-100 dark:border-gray-800">
        <div class="container mx-auto px-6">
          <div class="flex items-center justify-between mb-10">
            <h2 class="text-3xl font-display font-bold text-primary dark:text-white">Continue Your Journey</h2>
            <div class="flex gap-2">
              <button
                class="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-text-muted hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                <span class="material-icons">arrow_back</span>
              </button>
              <button
                class="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-text-muted hover:bg-secondary hover:text-white hover:border-secondary transition-all">
                <span class="material-icons">arrow_forward</span>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NuxtLink v-for="nearby in nearbyDestinations" :key="nearby.slug" :to="`/destinations/${nearby.slug}`"
              class="group cursor-pointer">
              <div class="rounded-xl overflow-hidden h-48 mb-4 relative">
                <img :alt="nearby.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  :src="getHeroImage(nearby.heroImage)" />
                <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <h3 class="font-bold text-primary dark:text-white mb-1 group-hover:text-secondary transition-colors">
                {{ nearby.name }}
              </h3>
              <p class="text-xs text-text-muted dark:text-gray-500">{{ nearby.category }}</p>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-24 relative overflow-hidden bg-primary">
        <div class="absolute inset-0 opacity-10"
          style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div>
        <div class="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 class="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
            Ready to visit {{ destination.name }}?
          </h2>
          <p class="text-lg text-white/90 mb-10 max-w-2xl mx-auto font-light">
            Add this destination to your custom itinerary and let our AI helper plan the perfect route for you.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button
              class="bg-white text-primary hover:bg-gray-100 px-8 py-3.5 rounded-full font-bold shadow-lg transition-colors flex items-center justify-center gap-2">
              Start Planning Trip
            </button>
            <button
              class="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-bold transition-colors flex items-center justify-center gap-2">
              Save for Later
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import destinationsData from '~/assets/data/destinations.json'

const route = useRoute()
const slug = route.params.slug as string

// Find destination from JSON
const destination = computed(() => {
  return destinationsData.find(d => d.slug === slug)
})

// Get nearby destinations (simple logic: just take first 4 excluding current)
const nearbyDestinations = computed(() => {
  return destinationsData
    .filter(d => d.slug !== slug)
    .slice(0, 4)
})

const getHeroImage = (imagePath: string) => {
  if (!imagePath || imagePath === 'none') {
    return 'https://images.unsplash.com/photo-1546708773-e57c8e89f6fc?q=80&w=2000&auto=format&fit=crop'
  }
  return imagePath
}

// Meta Tags
useHead({
  title: destination.value ? `${destination.value.name} - CeylonGuide` : 'Destination Not Found',
  meta: [
    { name: 'description', content: destination.value?.overview || 'Explore stunning destinations in Sri Lanka.' }
  ]
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
