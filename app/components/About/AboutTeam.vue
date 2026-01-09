<template>
  <div ref="containerRef" class="w-full bg-[#f8f6f6] dark:bg-[#1f1612] py-20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16 max-w-3xl mx-auto">
        <h2 class="text-[#181311] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight mb-6">
          Meet the Explorers
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          {{ intro }}
        </p>
      </div>

      <!-- Team Stats Row -->
      <div v-if="stats" class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div v-for="(stat, index) in stats" :key="stat.label" 
             class="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-white/10 hover:border-primary/20 transition-all duration-700"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
             :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="text-2xl md:text-3xl font-black text-primary mb-1">{{ stat.value }}</div>
          <div class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Team Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(member, index) in members" 
          :key="member.name" 
          class="group relative bg-white dark:bg-[#2a1d18] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 cursor-pointer border border-gray-100 dark:border-white/5 focus:outline-none focus:ring-4 focus:ring-primary/20"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
          :style="{ transitionDelay: `${300 + index * 100}ms` }"
          tabindex="0"
          @click="openMember(member)"
          @keydown.enter="openMember(member)"
        >
          <!-- Image -->
          <div class="aspect-[4/5] w-full overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10"></div>
            <img 
              :src="member.image" 
              :alt="member.name" 
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <!-- Quick View Badge -->
            <div class="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
               <span class="bg-white/90 dark:bg-black/80 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">View Profile</span>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6 relative z-10 bg-white dark:bg-[#2a1d18]">
            <h3 class="text-xl font-bold text-[#181311] dark:text-white mb-1 group-hover:text-primary transition-colors">{{ member.name }}</h3>
            <p class="text-sm font-medium text-primary uppercase tracking-wide opacity-80 mb-3">{{ member.role }}</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
              {{ member.bio }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Member Modal -->
    <Transition name="modal">
      <div v-if="selectedMember" class="fixed inset-0 z-[100] flex items-center justify-center px-4" @click.self="closeMember">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-4xl bg-white dark:bg-[#221510] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-auto">
          <button 
            class="absolute top-4 right-4 z-20 p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 text-text-main dark:text-white rounded-full transition-colors"
            @click="closeMember"
          >
            <span class="material-symbols-outlined">close</span>
          </button>

          <!-- Modal Image -->
          <div class="w-full md:w-2/5 h-64 md:h-auto relative">
             <img 
              :src="selectedMember.image" 
              :alt="selectedMember.name" 
              class="absolute inset-0 w-full h-full object-cover"
            />
             <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
          </div>

          <!-- Modal Details -->
          <div class="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
            <div class="mb-6">
              <h3 class="text-3xl font-black text-[#181311] dark:text-white mb-2">{{ selectedMember.name }}</h3>
              <p class="text-lg font-bold text-primary uppercase tracking-wide">{{ selectedMember.role }}</p>
            </div>

            <div v-if="selectedMember.location" class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-bold mb-8 uppercase tracking-wider">
               <span class="material-symbols-outlined text-lg">location_on</span>
               {{ selectedMember.location }}
            </div>

            <div class="prose dark:prose-invert mb-8">
              <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {{ selectedMember.bio }}
              </p>
            </div>

            <div v-if="selectedMember.specialties" class="border-t border-gray-100 dark:border-white/10 pt-8">
              <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Specialties</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="spec in selectedMember.specialties" 
                  :key="spec"
                  class="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-lg"
                >
                  {{ spec }}
                </span>
              </div>
            </div>
            
            <div class="mt-8 pt-8 border-t border-gray-100 dark:border-white/10 flex gap-4">
               <!-- Social placeholders -->
               <button class="size-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-gray-500">
                 <span class="material-symbols-outlined text-xl">link</span>
               </button>
               <button class="size-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-gray-500">
                 <span class="material-symbols-outlined text-xl">mail</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollObserver } from '~/composables/useScrollObserver'

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  location?: string
  specialties?: string[]
}

interface TeamStat {
  label: string
  value: string
}

const props = defineProps<{
  intro: string
  stats?: TeamStat[]
  members: TeamMember[]
}>()

const selectedMember = ref<TeamMember | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const { observe } = useScrollObserver()

onMounted(() => {
  if (containerRef.value) {
    observe(containerRef.value, () => {
      isVisible.value = true
    })
  }
})

const openMember = (member: TeamMember) => {
  selectedMember.value = member
  document.body.style.overflow = 'hidden'
}

const closeMember = () => {
  selectedMember.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .scale-95,
.modal-leave-active .scale-95 {
  transition: transform 0.3s ease;
}
</style>
