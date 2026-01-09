<template>
  <div 
    ref="containerRef"
    class="w-full bg-white dark:bg-[#2a1d18] py-20 transition-all duration-1000 ease-out"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
  >
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-[#181311] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight mb-6">
          The Challenge vs The Solution
        </h2>
        <div class="inline-flex items-center gap-3 bg-primary/10 px-6 py-2 rounded-full">
          <span class="material-symbols-outlined text-primary">change_circle</span>
          <span class="text-primary font-bold text-sm md:text-base">{{ mainStat }}</span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
        <!-- Center Divider (Desktop) -->
        <div class="hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 justify-center py-12 z-10 w-12 transition-opacity duration-1000 delay-300" :class="isVisible ? 'opacity-100' : 'opacity-0'">
          <div class="h-full w-px bg-gray-200 dark:bg-white/10 relative">
            <div class="absolute top-1/2 -translate-y-1/2 -left-3 size-6 rounded-full bg-white dark:bg-[#2a1d18] border-2 border-gray-200 dark:border-white/10 flex items-center justify-center">
              <span class="text-xs font-bold text-gray-400">VS</span>
            </div>
          </div>
        </div>

        <!-- Problem Card (Sharp Red Contrast) -->
        <div class="flex flex-col gap-6 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-8 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 delay-100" :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'">
          <div class="flex items-center gap-4 border-b border-red-200 dark:border-red-800/30 pb-4">
            <div class="flex items-center justify-center size-14 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 shadow-sm shrink-0">
              <span class="material-symbols-outlined text-2xl">sentiment_stressed</span>
            </div>
            <h3 class="text-[#181311] dark:text-white text-2xl font-bold">{{ problemTitle }}</h3>
          </div>
          
          <ul class="space-y-4">
            <li v-for="(item, index) in problemItems" :key="index" class="flex items-start gap-3 group">
              <span class="material-symbols-outlined text-red-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform font-bold">close</span>
              <span class="text-[#5c4d47] dark:text-gray-300 font-medium">{{ item }}</span>
            </li>
          </ul>
        </div>
        
        <!-- Solution Card (Sharp Teal/Emerald Contrast) -->
        <div class="flex flex-col gap-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 p-8 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 relative overflow-hidden delay-300" :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'">
          <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <span class="material-symbols-outlined text-[150px] text-emerald-600">verified</span>
          </div>

          <div class="flex items-center gap-4 border-b border-emerald-200 dark:border-emerald-800/30 pb-4 relative z-10">
            <div class="flex items-center justify-center size-14 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 shrink-0">
              <span class="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <h3 class="text-[#181311] dark:text-white text-2xl font-bold">{{ solutionTitle }}</h3>
          </div>
          
          <ul class="space-y-4 relative z-10">
            <li v-for="(item, index) in solutionItems" :key="index" class="flex items-start gap-3 group">
              <span class="material-symbols-outlined text-emerald-600 font-bold mt-0.5 shrink-0 group-hover:scale-110 transition-transform">check</span>
              <span class="text-[#5c4d47] dark:text-gray-200 font-medium">{{ item }}</span>
            </li>
          </ul>
          
          <div class="mt-4 pt-4 border-t border-emerald-200/50 dark:border-emerald-800/30 relative z-10">
            <div class="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wide">
               <span class="material-symbols-outlined text-lg">verified_user</span>
               Our Promise
            </div>
          </div>
        </div>
      </div>
      
      <!-- Process Steps (How We Do It) -->
      <div v-if="processSteps" class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
        <div v-for="(step, index) in processSteps" :key="step.title" 
             class="p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-700 delay-500 group"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
             :style="{ transitionDelay: `${500 + index * 100}ms` }"
        >
          <div class="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{{ step.step }}</div>
          <div class="text-xl font-black text-text-main dark:text-white mb-2 group-hover:text-primary transition-colors">{{ step.title }}</div>
          <p class="text-sm text-gray-500 font-medium">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollObserver } from '~/composables/useScrollObserver'

export interface ProcessStep {
  step: string
  title: string
  desc: string
}

defineProps<{
  mainStat: string
  problemTitle: string
  problemItems: string[]
  solutionTitle: string
  solutionItems: string[]
  processSteps?: ProcessStep[]
}>()

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
</script>
