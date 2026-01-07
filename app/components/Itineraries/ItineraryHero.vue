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
          <!-- Date Range Picker -->
          <div class="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-neutral-700 py-2 md:py-0 relative">
            <span class="material-symbols-outlined text-primary mr-3">calendar_month</span>
            <div class="flex items-center gap-2 flex-1">
              <div class="relative flex-1">
                <input 
                  type="date" 
                  v-model="startDate"
                  :min="minDate"
                  class="w-full bg-transparent border-none focus:ring-0 text-sm dark:text-white text-text-main focus:outline-none cursor-pointer"
                  @change="onStartDateChange"
                />
                <div v-if="!startDate" class="absolute inset-0 flex items-center pointer-events-none text-text-muted text-sm">
                  Start date
                </div>
              </div>
              <span class="text-text-muted">→</span>
              <div class="relative flex-1">
                <input 
                  type="date" 
                  v-model="endDate"
                  :min="startDate || minDate"
                  class="w-full bg-transparent border-none focus:ring-0 text-sm dark:text-white text-text-main focus:outline-none cursor-pointer"
                />
                <div v-if="!endDate" class="absolute inset-0 flex items-center pointer-events-none text-text-muted text-sm">
                  End date
                </div>
              </div>
            </div>
          </div>
          
          <!-- Travel Style Dropdown -->
          <div class="flex-1 flex items-center px-4 py-2 md:py-0">
            <span class="material-symbols-outlined text-primary mr-3">travel_explore</span>
            <select 
              v-model="travelStyle" 
              class="w-full bg-transparent border-none focus:ring-0 text-sm dark:text-white dark:bg-surface-dark cursor-pointer focus:outline-none text-text-main"
            >
              <option value="">Any Travel Style</option>
              <option value="luxury">Luxury & Leisure</option>
              <option value="backpacking">Backpacking</option>
              <option value="nature">Nature & Wildlife</option>
              <option value="cultural">Cultural & Heritage</option>
              <option value="adventure">Adventure</option>
              <option value="beach">Beach & Coastal</option>
            </select>
          </div>
          
          <!-- Start Planning Button -->
          <button 
            @click="startPlanning" 
            class="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-lg">route</span>
            Start Planning
          </button>
        </div>
        
        <!-- Quick Stats -->
        <div class="flex items-center justify-center gap-6 mt-6 text-white/80 text-sm">
          <span v-if="tripDuration" class="flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">schedule</span>
            {{ tripDuration }} day{{ tripDuration > 1 ? 's' : '' }}
          </span>
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">verified</span>
            6 curated itineraries
          </span>
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">bolt</span>
            Free to use
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()

const startDate = ref('')
const endDate = ref('')
const travelStyle = ref('')

// Minimum date is today
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Calculate trip duration
const tripDuration = computed(() => {
  if (!startDate.value || !endDate.value) return 0
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  return diff > 0 ? diff : 0
})

// When start date changes, ensure end date is valid
function onStartDateChange() {
  if (endDate.value && startDate.value && new Date(endDate.value) < new Date(startDate.value)) {
    endDate.value = startDate.value
  }
}

function startPlanning() {
  // Build query params based on inputs
  const query: Record<string, string> = {}
  
  if (startDate.value) {
    query.start = startDate.value
  }
  if (endDate.value) {
    query.end = endDate.value
  }
  if (travelStyle.value) {
    query.style = travelStyle.value
  }
  
  // Navigate to trip builder with dates
  router.push({
    path: '/trip-builder',
    query
  })
}
</script>

<style scoped>
/* Hide default date input styling on webkit */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.6;
  cursor: pointer;
}

input[type="date"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
