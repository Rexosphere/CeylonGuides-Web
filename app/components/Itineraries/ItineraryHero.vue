<template>
  <section class="relative h-[60vh] min-h-[500px] flex items-center justify-center pt-20 overflow-hidden bg-primary">
    <div class="absolute inset-0 z-0">
      <img alt="Sri Lanka Landscape" class="w-full h-full object-cover opacity-60 mix-blend-overlay"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVcdptXDRTK1OUzu1bt-XkF7u5tyNAMRpQ5K4TTqO7MTBIcHHyAOkkRSaPHQJEm_Vd_EeXxiDTBvI2WefntJZveYfw9f5Pw9BVkVCr59o2pj63jPM7T9z314gJ2lhW1HhnvxAPjAWAlcmiE1ERfG1JkV6w0ZLK-3ma6PkH_Jerny_5GaDl0vWBO8sQFuCV_xQnYztdmYIE1t46T0dOQ2H7Qy9QKYMPTvVpoL5i9-Vq-D78jGk51dIdUMrNWDXf8oFv0903ayRpVJU" />
      <div class="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90"></div>
    </div>
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
      <h1 class="text-5xl md:text-6xl font-display font-bold mb-6 drop-shadow-md">Craft Your Ceylon Journey</h1>
      <p class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light mb-10">Perfect Sri Lankan adventure with
        our curated guides and custom tools.</p>
      <div class="bg-white p-2 rounded-full shadow-card max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2">
        <div class="flex-1 flex items-center gap-4 px-6 border-r border-gray-100 w-full md:w-auto py-2 md:py-0">
          <span class="material-icons text-gray-400">calendar_today</span>
          <div class="flex flex-col text-left">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Duration</span>
            <select v-model="selectedDuration"
              class="bg-transparent border-none p-0 text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer">
              <option value="">All Durations</option>
              <option value="1-5">1-5 Days</option>
              <option value="5-10">5-10 Days</option>
              <option value="10+">10+ Days</option>
            </select>
          </div>
        </div>
        <div class="flex-1 flex items-center gap-4 px-6 border-r border-gray-100 w-full md:w-auto py-2 md:py-0">
          <span class="material-icons text-gray-400">group</span>
          <div class="flex flex-col text-left">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Travelers</span>
            <select v-model="selectedTravelers"
              class="bg-transparent border-none p-0 text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer">
              <option value="">2 Travelers</option>
              <option value="solo">Solo</option>
              <option value="family">Family</option>
              <option value="group">Group</option>
            </select>
          </div>
        </div>
        <div class="flex-1 flex items-center gap-4 px-6 w-full md:w-auto py-2 md:py-0">
          <span class="material-icons text-gray-400">tune</span>
          <div class="flex flex-col text-left">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Preferences</span>
            <select v-model="selectedPreference"
              class="bg-transparent border-none p-0 text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer">
              <option value="">All Styles</option>
              <option value="culture">Culture</option>
              <option value="nature">Nature</option>
              <option value="beach">Beach</option>
            </select>
          </div>
        </div>
        <button @click="startPlanning"
          class="bg-secondary hover:bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md transition-all w-full md:w-auto">
          Start Planning
        </button>
      </div>
      <div class="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-white/70">
        <span class="flex items-center gap-1"><span class="material-icons text-base">verified</span> 6 curated
          itineraries</span>
        <span class="flex items-center gap-1"><span class="material-icons text-base">bolt</span> Free to use</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()

const selectedDuration = ref('')
const selectedTravelers = ref('')
const selectedPreference = ref('')

function startPlanning() {
  // Build query params based on inputs
  const query: Record<string, string> = {}

  if (selectedDuration.value) {
    query.duration = selectedDuration.value
  }
  if (selectedTravelers.value) {
    query.travelers = selectedTravelers.value
  }
  if (selectedPreference.value) {
    query.style = selectedPreference.value
  }

  // Navigate to trip builder with params
  router.push({
    path: '/trip-builder',
    query
  })
}
</script>
