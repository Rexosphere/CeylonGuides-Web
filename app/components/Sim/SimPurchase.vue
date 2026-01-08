<template>
  <section class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <div class="flex flex-col gap-6">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-white">Connectivity Essentials</h2>
        <p class="text-text-muted mt-1">Everything you need to know about getting connected</p>
      </div>

      <!-- Essentials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="item in connectivityEssentials"
          :key="item.id"
          class="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-700 p-6 flex flex-col h-full hover:shadow-md transition-shadow"
        >
          <!-- Icon & Header -->
          <div class="flex items-start gap-4 mb-4">
            <div class="size-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">{{ item.icon }}</span>
            </div>
            <div>
              <h3 class="font-bold text-text-main dark:text-white">{{ item.title }}</h3>
              <p class="text-sm text-text-muted leading-tight">{{ item.summary }}</p>
            </div>
          </div>
          
          <!-- Details List -->
          <ul class="space-y-2 mb-4 flex-grow">
            <li 
              v-for="(point, idx) in item.details" 
              :key="idx"
              class="text-sm text-text-muted flex items-start gap-2"
            >
              <span class="material-symbols-outlined text-gray-400 text-sm mt-0.5 shrink-0">check_small</span>
              <span class="leading-snug">{{ point }}</span>
            </li>
          </ul>
          
          <!-- Warning/Note -->
          <div v-if="item.warning" class="mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800">
             <div class="flex items-start gap-2 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10 p-2 rounded">
               <span class="material-symbols-outlined text-sm">warning</span>
               {{ item.warning }}
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { connectivityEssentials } from '~/data/simData'
</script>
