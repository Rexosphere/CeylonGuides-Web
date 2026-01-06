<template>
  <section class="w-full max-w-[1000px] px-6 py-20 scroll-mt-24" id="concerns">
    <h2 class="text-[#181311] dark:text-white text-3xl font-bold mb-10 text-center">Common Health Concerns</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="concern in concernCards"
        :key="concern.title"
        class="group bg-white dark:bg-[#2a1d18] p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
      >
        <div :class="['w-12 h-12 rounded-full flex items-center justify-center mb-4', concern.iconBg, concern.iconText]">
          <span class="material-symbols-outlined">{{ concern.icon }}</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{{ concern.title }}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {{ concern.content }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HealthInfo } from '~/types/api'

const props = defineProps<{
  concerns?: HealthInfo[]
}>()

const defaultConcerns: HealthInfo[] = [
  { id: 'c1', title: 'Dengue Fever', content: 'Transmitted by day-biting mosquitoes. Use strong repellent and cover up.', category: 'CONCERN' },
  { id: 'c2', title: 'Sun & Heat', content: 'Use SPF 50+, wear a hat, and stay hydrated.', category: 'CONCERN' },
  { id: 'c3', title: 'Leeches', content: 'Common in rainforest areas. Wear leech socks when hiking.', category: 'CONCERN' },
]

const iconStyles = [
  { icon: 'pest_control', iconBg: 'bg-red-100 dark:bg-red-900/30', iconText: 'text-red-600 dark:text-red-400' },
  { icon: 'light_mode', iconBg: 'bg-yellow-100 dark:bg-yellow-900/30', iconText: 'text-yellow-600 dark:text-yellow-400' },
  { icon: 'water_drop', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconText: 'text-blue-600 dark:text-blue-400' },
]

const concernCards = computed(() => {
  const list = props.concerns && props.concerns.length ? props.concerns : defaultConcerns
  return list.map((item, index) => ({
    ...item,
    ...iconStyles[index % iconStyles.length],
  }))
})
</script>
