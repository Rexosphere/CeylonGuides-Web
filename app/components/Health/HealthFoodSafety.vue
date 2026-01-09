<template>
  <section class="w-full bg-white dark:bg-[#1f1612] py-20 scroll-mt-24" id="safety">
    <div class="max-w-[1000px] mx-auto px-6">
      <div class="flex flex-col md:flex-row gap-12 items-center">
        <div class="md:w-1/2">
          <div class="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
            <img 
              alt="Fresh tropical fruits" 
              class="object-cover w-full h-full" 
              src="/images/downloaded_3b676fb7ea7e.avif"
            />
            <div class="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p class="text-white font-bold text-lg">Eat Fresh, Eat Safe.</p>
            </div>
          </div>
        </div>
        
        <div class="md:w-1/2">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Food & Water Safety</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Sri Lankan food is delicious, but travelers' stomachs can be sensitive. Follow these simple rules to stay healthy.
          </p>
          
          <!-- Water Safety -->
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-blue-500">water_drop</span>
              <h3 class="font-bold text-gray-900 dark:text-white">Water Safety</h3>
              <span class="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-medium">
                Tap water NOT safe
              </span>
            </div>
            <ul class="space-y-2">
              <li 
                v-for="(tip, index) in waterRecommendations" 
                :key="index"
                class="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
              >
                <span class="text-blue-500 mt-0.5">💧</span>
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>

          <!-- Food Safety -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-green-500">restaurant</span>
              <h3 class="font-bold text-gray-900 dark:text-white">Food Tips</h3>
            </div>
            <ul class="space-y-2">
              <li 
                v-for="(tip, index) in foodTips" 
                :key="index"
                class="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
              >
                <span class="text-green-500 mt-0.5">✓</span>
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { waterSafety, foodSafety } from '~/data/medicalDirectoryData'

const waterRecommendations = computed(() => waterSafety.recommendations)
const foodTips = computed(() => foodSafety)
</script>
