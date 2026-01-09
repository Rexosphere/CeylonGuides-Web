<template>
  <div class="bg-white dark:bg-card-dark rounded-2xl border border-border-color dark:border-neutral-700 p-5 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-lg text-text-main dark:text-white">Community Activity</h3>
      
      <!-- Privacy Toggle -->
      <div class="flex bg-background-light dark:bg-neutral-800 rounded-lg p-1">
         <button 
           v-for="mode in ['Off', 'City', 'Precise']"
           :key="mode"
           @click="privacyMode = mode"
           class="px-2 py-1 rounded-md text-[10px] font-bold transition-all"
           :class="privacyMode === mode 
             ? 'bg-white dark:bg-neutral-600 text-primary shadow-sm' 
             : 'text-text-secondary dark:text-gray-400 hover:text-text-main'"
         >
           {{ mode }}
         </button>
      </div>
    </div>
    
    <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-blue-50 dark:bg-neutral-800 group/map">
      <!-- Map Background (Static Image for Demo) -->
      <div 
        class="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
        :class="privacyMode === 'Off' ? 'opacity-30 grayscale' : 'opacity-80'"
        style='background-image: url("https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80");'
      ></div>

      <!-- Nearby Me Button -->
      <button 
        @click="findMe"
        class="absolute bottom-3 right-3 bg-white dark:bg-card-dark p-2 rounded-full shadow-lg z-30 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-transform active:scale-95"
        title="See nearby me"
      >
         <span class="material-symbols-outlined text-primary" :class="isFindingMe ? 'animate-spin' : ''">my_location</span>
      </button>
      
      <!-- Pins -->
      <template v-if="privacyMode !== 'Off'">
        <div 
          v-for="pin in displayedPins" 
          :key="pin.id"
          class="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-110 z-10"
          :style="{ top: `${pin.y}%`, left: `${pin.x}%` }"
          @click.stop="activePin = pin"
        >
          <!-- Pulse Effect -->
          <div class="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
          
          <!-- Pin Icon -->
          <div class="relative w-8 h-8 rounded-full bg-white dark:bg-card-dark border-2 border-white dark:border-neutral-700 shadow-lg overflow-hidden flex items-center justify-center">
             <img v-if="pin.user.avatar" :src="pin.user.avatar" class="w-full h-full object-cover">
             <span v-else class="material-symbols-outlined text-primary text-sm">person</span>
          </div>

          <!-- Tooltip Card (Only active pin) -->
          <div 
            v-if="activePin?.id === pin.id"
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white dark:bg-card-dark rounded-xl shadow-xl border border-border-color dark:border-neutral-700 p-3 z-50 text-center animate-up"
             @click.stop
          >
             <div class="flex flex-col items-center gap-1">
                <div class="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-1">
                   <span class="material-symbols-outlined text-primary">travel_explore</span>
                </div>
                <h4 class="font-bold text-sm text-text-main dark:text-white">{{ pin.user.name }}</h4>
                <p class="text-xs text-text-secondary dark:text-gray-400">{{ pin.city }}</p>
                <span class="inline-block px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-bold mt-1">
                  {{ pin.status }}
                </span>
             </div>
             <!-- Arrow -->
             <div class="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-card-dark border-b border-r border-border-color dark:border-neutral-700 transform rotate-45 -mt-1.5"></div>
          </div>
        </div>
      </template>

      <!-- Privacy Off Message -->
      <div v-if="privacyMode === 'Off'" class="absolute inset-0 flex items-center justify-center">
         <div class="bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold text-text-secondary">
           Map activity hidden
         </div>
      </div>
    </div>
    
    <p class="text-xs text-text-secondary dark:text-gray-400 mt-3 text-center flex items-center justify-center gap-1">
      <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      {{ activeUsersCount }} active travelers in Sri Lanka right now
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const privacyMode = ref('Precise')
const activePin = ref<any>(null)
const isFindingMe = ref(false)
const activeUsersCount = ref(124)

// Mock Data
const pins = [
  { id: 1, x: 20, y: 30, city: 'Colombo', status: 'Meeting up', user: { name: 'Sarah J.', avatar: '' } },
  { id: 2, x: 55, y: 50, city: 'Ella', status: 'Hiking', user: { name: 'Deepal K.', avatar: '' } },
  { id: 3, x: 80, y: 65, city: 'Arugam Bay', status: 'Surfing', user: { name: 'Mike & Jen', avatar: '' } },
  { id: 4, x: 45, y: 25, city: 'Kandy', status: 'Temple Tour', user: { name: 'Kasun P.', avatar: '' } },
]

const displayedPins = computed(() => {
  if (privacyMode.value === 'Off') return []
  return pins
})

function findMe() {
  isFindingMe.value = true
  setTimeout(() => {
    isFindingMe.value = false
    // Mock user location added
    activePin.value = { 
      id: 99, x: 50, y: 50, city: 'Current Location', status: 'It\'s You!', user: { name: 'You', avatar: '' } 
    }
  }, 1500)
}

// Close tooltip on click outside
function closeTooltip() {
  activePin.value = null
}

onMounted(() => {
  document.addEventListener('click', closeTooltip)
})

onUnmounted(() => {
  document.removeEventListener('click', closeTooltip)
})
</script>

<style scoped>
@keyframes up {
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.animate-up {
  animation: up 0.2s ease-out forwards;
}
</style>
