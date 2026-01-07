<template>
  <section class="relative">
    <div class="w-full h-[500px] bg-cover bg-center flex items-center justify-center relative" 
         role="img" 
         aria-label="Panoramic view of tea plantations in Sri Lanka with misty mountains" 
         style="background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('/images/downloaded_0bded551fdfb.avif');">
      <div class="text-center px-4 max-w-3xl relative z-10">
        <h1 class="text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] mb-4 drop-shadow-sm">
          Craft Your Ceylon Journey
        </h1>
        <p class="text-white/90 text-lg md:text-xl font-medium mb-8">
          Plan your perfect Sri Lankan adventure with our curated guides and custom tools.
        </p>
        <div class="bg-surface-light dark:bg-surface-dark p-2 rounded-xl shadow-xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
          <div class="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-neutral-700 py-3 md:py-0">
            <span class="material-symbols-outlined text-primary mr-3">calendar_month</span>
            <input 
              v-model="tripDate" 
              class="w-full bg-transparent border-none focus:ring-0 text-sm dark:text-white dark:placeholder-neutral-400 placeholder-text-muted focus:outline-none" 
              placeholder="When are you going?" 
              type="text"
            />
          </div>
          <div class="flex-1 flex items-center px-4 py-3 md:py-0">
            <span class="material-symbols-outlined text-primary mr-3">travel_explore</span>
            <select v-model="travelStyle" class="w-full bg-transparent border-none focus:ring-0 text-sm dark:text-white dark:bg-surface-dark cursor-pointer focus:outline-none text-text-main">
              <option value="">Any Travel Style</option>
              <option value="luxury">Luxury & Leisure</option>
              <option value="backpacking">Backpacking</option>
              <option value="nature">Nature & Wildlife</option>
            </select>
          </div>
          <button 
            @click="startPlanning" 
            class="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Start Planning
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()

const tripDate = ref('')
const travelStyle = ref('')

function startPlanning() {
  // Build query params based on inputs
  const query: Record<string, string> = {}
  if (travelStyle.value) {
    query.style = travelStyle.value
  }
  
  // Navigate to trip builder
  router.push({
    path: '/trip-builder',
    query
  })
}
</script>
