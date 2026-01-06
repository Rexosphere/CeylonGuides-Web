<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-manrope text-secondary dark:text-white pb-20">
    <!-- 404 State -->
    <div v-if="!destination" class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-24">
      <h1 class="text-4xl font-serif font-bold mb-4">Destination Not Found</h1>
      <p class="text-lg text-gray-500 mb-8">We couldn't find the destination you're looking for.</p>
      <NuxtLink to="/destinations" class="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-colors">
        Browse All Destinations
      </NuxtLink>
    </div>

    <div v-else>
      <!-- 1. Hero Section -->
      <section class="relative h-[80vh] w-full flex items-end justify-center overflow-hidden">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img 
            :src="getHeroImage(destination.heroImage)" 
            :alt="destination.name"
            class="w-full h-full object-cover transition-transform duration-[20s] hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 md:pb-24">
          <div class="flex items-center gap-2 text-white/80 text-sm font-bold uppercase tracking-widest mb-4">
            <span class="text-accent">Sri Lanka</span>
            <span class="w-1 h-1 bg-white/50 rounded-full"></span>
            <span>{{ destination.location }}</span>
          </div>
          
          <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {{ destination.name }}
          </h1>

          <div v-if="destination.unescoStatus === 'Yes'" class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium mb-8">
            <span class="material-symbols-outlined text-yellow-400">public</span>
            UNESCO World Heritage Site
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <span class="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </div>
      </section>

      <!-- 3. Key Facts Bar (Sticky) -->
      <div class="sticky top-[72px] z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex flex-nowrap overflow-x-auto md:justify-center gap-8 md:gap-16 no-scrollbar">
            <div class="flex items-center gap-3 shrink-0">
              <div class="w-10 h-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-white">
                <span class="material-symbols-outlined">category</span>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Category</p>
                <p class="font-bold whitespace-nowrap">{{ destination.category }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <div class="w-10 h-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-white">
                <span class="material-symbols-outlined">calendar_month</span>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Best Time</p>
                <p class="font-bold whitespace-nowrap">{{ destination.bestTimeToVisit }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <div class="w-10 h-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-white">
                <span class="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Location</p>
                <p class="font-bold whitespace-nowrap">{{ destination.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <main class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- Left Column (Content) -->
        <div class="lg:col-span-8 flex flex-col gap-16">
          
          <!-- 2. Overview -->
          <section>
            <h2 class="font-serif text-3xl font-bold mb-6 text-primary dark:text-white">About {{ destination.name }}</h2>
            <p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300 first-letter:text-5xl first-letter:font-serif first-letter:text-accent first-letter:mr-2 first-letter:float-left">
              {{ destination.overview }}
            </p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-8">
              <span v-for="tag in destination.tags" :key="tag" class="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium">
                #{{ tag }}
              </span>
            </div>
          </section>

          <!-- 4. Highlights -->
          <section>
            <h2 class="font-serif text-3xl font-bold mb-8 text-primary dark:text-white">Highlights</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div v-for="(highlight, index) in destination.highlights" :key="index" class="group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:border-accent">
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-1">
                    <span class="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <p class="font-medium text-lg group-hover:text-primary dark:group-hover:text-white transition-colors">{{ highlight }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 5. Things To Do -->
          <section>
            <h2 class="font-serif text-3xl font-bold mb-8 text-primary dark:text-white">Unmissable Experiences</h2>
            <div class="flex flex-col gap-6">
              <div v-for="(thing, index) in destination.bestThingsToDo" :key="index" class="flex gap-6 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                <span class="font-serif text-4xl font-bold text-gray-200 dark:text-gray-700">0{{ index + 1 }}</span>
                <div>
                  <h3 class="font-bold text-lg mb-2">{{ thing }}</h3>
                  <button class="text-accent text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all mt-2">
                    <span class="material-symbols-outlined text-sm">add_circle</span> Add to Plan
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>

        <!-- Right Column (Sidebar) -->
        <aside class="lg:col-span-4 flex flex-col gap-8">
          
          <!-- 6. Interactive Map Placeholder -->
          <div class="bg-gray-200 dark:bg-gray-800 rounded-3xl h-64 relative overflow-hidden group">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600">map</span>
            </div>
            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <button class="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
              View on Map
            </button>
          </div>

          <!-- 8. Travel Tips (Accordion) -->
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 class="font-serif text-xl font-bold mb-6">Practical Info</h3>
            
            <div class="space-y-4">
              <div class="border-b border-gray-100 dark:border-gray-700 pb-4">
                <button class="flex items-center justify-between w-full font-bold text-sm mb-2">
                  <span>Getting There</span>
                  <span class="material-symbols-outlined text-gray-400">expand_more</span>
                </button>
                <p class="text-sm text-gray-500">Accessible via train or taxi. Check local schedules.</p>
              </div>
              
              <div class="border-b border-gray-100 dark:border-gray-700 pb-4">
                <button class="flex items-center justify-between w-full font-bold text-sm mb-2">
                  <span>What to Bring</span>
                  <span class="material-symbols-outlined text-gray-400">expand_more</span>
                </button>
                <p class="text-sm text-gray-500">Comfortable walking shoes, sunscreen, and water.</p>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <p class="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Source</p>
              <p class="font-serif font-bold">{{ destination.moreInfo }}</p>
            </div>
          </div>

        </aside>

      </main>

      <!-- 7. Nearby Destinations -->
      <section class="max-w-7xl mx-auto px-6 py-16 border-t border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between mb-8">
          <h2 class="font-serif text-3xl font-bold text-primary dark:text-white">Continue Your Journey</h2>
          <div class="flex gap-2">
            <button class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <button class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="nearby in nearbyDestinations" 
            :key="nearby.slug"
            :to="`/destinations/${nearby.slug}`"
            class="group"
          >
            <div class="aspect-[4/3] rounded-2xl overflow-hidden mb-3 relative">
              <img :src="getHeroImage(nearby.heroImage)" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :alt="nearby.name">
              <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 class="font-bold text-lg group-hover:text-accent transition-colors">{{ nearby.name }}</h3>
            <p class="text-sm text-gray-500">{{ nearby.category }}</p>
          </NuxtLink>
        </div>
      </section>

      <!-- 9. CTA Section -->
      <section class="bg-primary text-white py-20 px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to visit {{ destination.name }}?</h2>
          <p class="text-lg text-white/80 mb-10">Add this destination to your custom itinerary and let our AI helper plan the perfect route for you.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/itineraries" class="px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Start Planning Trip
            </NuxtLink>
            <button class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
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
        // Fallback or placeholder
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
