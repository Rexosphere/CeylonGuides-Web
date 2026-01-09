<template>
  <div 
    ref="containerRef"
    class="w-full max-w-4xl px-4 sm:px-6 py-16 md:py-24 mx-auto transition-all duration-1000 ease-out"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
  >
    <!-- Top Icon -->
    <div class="flex justify-center mb-8">
      <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
        <span class="material-symbols-outlined text-4xl">explore</span>
      </div>
    </div>

    <!-- Context Section ("How it started") -->
    <div class="mb-12 text-center max-w-2xl mx-auto">
      <h2 class="text-sm font-bold tracking-[0.2em] uppercase mb-6 text-primary">{{ contextTitle }}</h2>
      <p class="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-medium">
        {{ contextText }}
      </p>
    </div>

    <!-- Divider -->
    <div class="flex justify-center mb-12">
      <div class="h-10 w-px bg-gradient-to-b from-gray-200 to-transparent dark:from-white/10"></div>
    </div>

    <!-- Quote Section -->
    <div class="relative text-center mx-auto max-w-3xl">
      <span class="text-6xl text-primary/20 font-serif leading-none absolute -top-8 left-1/2 -translate-x-1/2 select-none">"</span>
      
      <blockquote class="relative z-10 mb-8">
        <p class="text-xl md:text-2xl font-serif italic text-text-main dark:text-white leading-relaxed">
          {{ quote }}
        </p>
      </blockquote>

      <!-- Attribution -->
      <footer class="flex items-center justify-center gap-4">
        <img 
          :src="authorImage" 
          :alt="author" 
          loading="lazy"
          class="size-14 rounded-full object-cover border-2 border-white dark:border-[#221510] shadow-md" 
        />
        <div class="text-left">
          <cite class="block text-base font-bold not-italic text-text-main dark:text-white">{{ author }}</cite>
          <span class="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mt-0.5">{{ authorRole }}</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollObserver } from '~/composables/useScrollObserver'

defineProps<{
  contextTitle: string
  contextText: string
  quote: string
  author: string
  authorRole: string
  authorImage: string
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
