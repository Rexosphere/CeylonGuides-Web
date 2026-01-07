<template>
  <div class="bg-background-light dark:bg-background-dark text-slate-700 dark:text-slate-300 font-sans antialiased min-h-screen flex flex-col">
    
    <!-- Hero Section -->
    <div class="relative h-[75vh] min-h-[550px] flex items-center justify-center overflow-hidden group">
      <div class="absolute inset-0 z-0">
        <img 
          alt="Sri Lankan Coastline with Facilities" 
          class="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-105" 
          src="/facilities_finder_hero_1767780791602.png"
        />
        <div class="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10 text-center text-white mt-12">
        <div class="flex flex-col items-center justify-center gap-6">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-lg">
            <span class="material-symbols-outlined text-secondary">share_location</span>
            <span class="text-xs font-bold tracking-widest uppercase">Travel Essentials</span>
          </div>
          <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg tracking-tight leading-none">
            Facilities Finder
          </h1>
          <p class="text-lg md:text-2xl font-light text-blue-50/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Community-rated restrooms, beaches, and attractions across Sri Lanka
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="relative z-20 -mt-24 px-4 pb-32">
      <div class="container mx-auto max-w-5xl">
        
        <!-- Category Tabs -->
        <div class="bg-surface-light dark:bg-surface-dark p-3 rounded-3xl shadow-floating border border-slate-100 dark:border-slate-700 mx-auto max-w-4xl mb-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button 
              @click="selectedCategory = 'restrooms'"
              :class="[
                'group flex items-center justify-center gap-3 py-4 md:py-5 px-6 rounded-2xl shadow-lg transition-all duration-300 font-medium relative overflow-hidden',
                selectedCategory === 'restrooms' 
                  ? 'bg-primary text-white' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              ]"
            >
              <div v-if="selectedCategory === 'restrooms'" class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span class="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">wc</span>
              <span class="text-lg">Restrooms</span>
            </button>
            
            <button 
              @click="selectedCategory = 'beaches'"
              :class="[
                'group flex items-center justify-center gap-3 py-4 md:py-5 px-6 rounded-2xl transition-all duration-300 font-medium',
                selectedCategory === 'beaches' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              ]"
            >
              <span class="material-symbols-outlined text-2xl text-secondary group-hover:scale-110 transition-transform">beach_access</span>
              <span class="text-lg">Beaches</span>
            </button>
            
            <button 
              @click="selectedCategory = 'attractions'"
              :class="[
                'group flex items-center justify-center gap-3 py-4 md:py-5 px-6 rounded-2xl transition-all duration-300 font-medium',
                selectedCategory === 'attractions' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              ]"
            >
              <span class="material-symbols-outlined text-2xl text-blue-400 group-hover:scale-110 transition-transform">attractions</span>
              <span class="text-lg">Attractions</span>
            </button>
          </div>
        </div>

        <!-- Location Banner -->
        <div v-if="!hasLocation" class="flex items-center justify-center mb-16">
          <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-orange-100 dark:border-orange-900/40 text-orange-600 dark:text-orange-400 text-sm font-medium shadow-soft transition-transform hover:scale-105 cursor-pointer">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span>Location not available — <button @click="enableLocation" class="underline decoration-orange-300 underline-offset-4 hover:text-orange-700 dark:hover:text-orange-300">Enable for distance sorting</button></span>
          </div>
        </div>

        <!-- Empty State / Search Placeholder -->
        <div class="flex flex-col items-center justify-center text-center py-20 px-8 rounded-[3rem] bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-800/30 max-w-4xl mx-auto border border-dashed border-slate-200 dark:border-slate-700/50">
          <div class="relative mb-8 group cursor-pointer">
            <div class="absolute -inset-10 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-0 group-hover:opacity-70 blur-3xl transition-opacity duration-700"></div>
            <div class="bg-white dark:bg-surface-dark p-8 rounded-full shadow-soft dark:shadow-none border border-slate-100 dark:border-slate-700 relative inline-block transform group-hover:scale-110 transition-transform duration-300">
              <span class="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">search</span>
            </div>
          </div>
          
          <h2 class="text-3xl md:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
            Start your search
          </h2>
          
          <p class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg leading-relaxed mb-10 font-light">
            Select a category from the tabs above to discover highly-rated facilities nearby. Whether you need a quick stop or a scenic view, we've got you covered.
          </p>
          
          <!-- Quick Filters -->
          <div class="flex flex-wrap justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <span class="text-xs font-bold uppercase tracking-widest text-slate-400 w-full mb-1">Quick Filters</span>
            <button 
              @click="toggleFilter('wheelchair')"
              :class="[
                'px-4 py-1.5 border rounded-full text-xs font-medium transition-all',
                filters.wheelchair 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
              ]"
            >
              Wheelchair Accessible
            </button>
            <button 
              @click="toggleFilter('familyFriendly')"
              :class="[
                'px-4 py-1.5 border rounded-full text-xs font-medium transition-all',
                filters.familyFriendly 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
              ]"
            >
              Family Friendly
            </button>
            <button 
              @click="toggleFilter('freeAccess')"
              :class="[
                'px-4 py-1.5 border rounded-full text-xs font-medium transition-all',
                filters.freeAccess 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
              ]"
            >
              Free Access
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- AI Assistant FAB -->
    <button class="fixed bottom-6 right-6 bg-secondary hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-50 group">
      <span class="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">smart_toy</span>
      <span class="absolute top-2 right-3 w-3 h-3 bg-green-400 rounded-full border-2 border-secondary"></span>
      <span class="absolute right-16 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Ask AI Guide
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// SEO
useHead({
  title: 'Facilities Finder - CeylonGuide',
  meta: [
    { name: 'description', content: 'Community-rated restrooms, beaches, and attractions across Sri Lanka. Find clean, safe facilities wherever you travel.' }
  ]
})

// State
const selectedCategory = ref('restrooms')
const hasLocation = ref(false)
const filters = ref({
  wheelchair: false,
  familyFriendly: false,
  freeAccess: false
})

// Methods
function enableLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
    return
  }
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      hasLocation.value = true
      console.log('Location enabled:', position.coords)
      // Here you would typically store the coordinates and fetch nearby facilities
    },
    (error) => {
      console.error('Error getting location:', error)
      alert('Unable to get your location. Please check your browser settings.')
    }
  )
}

function toggleFilter(filterName: keyof typeof filters.value) {
  filters.value[filterName] = !filters.value[filterName]
  console.log('Filters:', filters.value)
  // Here you would typically trigger a search/filter update
}
</script>

<style scoped>
.shadow-soft {
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
}

.shadow-floating {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
