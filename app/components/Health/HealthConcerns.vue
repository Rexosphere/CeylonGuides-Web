<template>
  <section class="w-full max-w-[1000px] px-6 py-20 scroll-mt-24" id="concerns">
    <!-- Header -->
    <div class="text-center mb-10">
      <div class="flex items-center justify-center gap-2 text-primary font-bold uppercase tracking-wider text-xs mb-3">
        <span class="material-symbols-outlined text-lg">health_and_safety</span>
        <span>Stay Safe</span>
      </div>
      <h2 class="text-[#181311] dark:text-white text-3xl font-bold mb-3">Common Health Concerns</h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
        Be aware of these health risks and how to prevent them. Most are easily avoidable with proper precautions.
      </p>
    </div>
    
    <!-- Concern Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="concern in healthAlertsList"
        :key="concern.id"
        class="bg-white dark:bg-[#2a1d18] rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg"
        :class="getBorderClass(concern.severity)"
      >
        <!-- Header with severity -->
        <div 
          class="p-4 flex items-center justify-between"
          :class="getHeaderBgClass(concern.severity)"
        >
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ concern.icon }}</span>
            <h3 class="font-bold text-gray-900 dark:text-white">{{ concern.title }}</h3>
          </div>
          <span 
            class="text-[10px] px-2 py-1 rounded-full font-bold uppercase"
            :class="getSeverityClass(concern.severity)"
          >
            {{ concern.severity }} Risk
          </span>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-4">
          <!-- Description -->
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ concern.description }}
          </p>

          <!-- Prevention Tips -->
          <div>
            <h4 class="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm text-green-500">shield</span>
              Prevention
            </h4>
            <ul class="space-y-1.5">
              <li 
                v-for="(tip, index) in concern.prevention.slice(0, 3)" 
                :key="index"
                class="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
              >
                <span class="text-green-500 mt-0.5">✓</span>
                <span>{{ tip }}</span>
              </li>
            </ul>
          </div>

          <!-- Seasonal Info -->
          <div v-if="concern.seasonalInfo" class="pt-3 border-t border-gray-100 dark:border-gray-700">
            <p class="text-xs text-amber-600 dark:text-amber-400 flex items-start gap-1">
              <span class="material-symbols-outlined text-sm">calendar_month</span>
              {{ concern.seasonalInfo }}
            </p>
          </div>

          <!-- When to Seek Help -->
          <div 
            class="pt-3 border-t border-gray-100 dark:border-gray-700 bg-red-50/50 dark:bg-red-900/10 -mx-4 -mb-4 p-4 mt-4"
          >
            <h4 class="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">emergency</span>
              When to Seek Help
            </h4>
            <p class="text-xs text-red-600 dark:text-red-400">
              {{ getWhenToSeekHelp(concern) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- General Advice -->
    <div class="mt-10 p-6 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl border border-primary/20">
      <div class="flex items-start gap-4">
        <div class="p-3 bg-primary/10 rounded-full">
          <span class="material-symbols-outlined text-primary text-2xl">info</span>
        </div>
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-2">General Health Advice</h3>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-center gap-2">
              <span class="text-primary">•</span>
              Drink only bottled or purified water
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary">•</span>
              Apply sunscreen regularly (SPF 50+)
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary">•</span>
              Use insect repellent 24/7
            </li>
            <li class="flex items-center gap-2">
              <span class="text-primary">•</span>
              Carry your travel insurance details
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { healthAlerts } from '~/data/medicalDirectoryData'
import type { HealthAlert } from '~/types/medical'

// Data
const healthAlertsList = computed(() => healthAlerts)

// Style helpers
function getSeverityClass(severity: string): string {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
    case 'medium': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
    case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
  }
}

function getBorderClass(severity: string): string {
  switch (severity) {
    case 'high': return 'border-red-200 dark:border-red-800'
    case 'medium': return 'border-amber-200 dark:border-amber-800'
    case 'low': return 'border-green-200 dark:border-green-800'
    default: return 'border-gray-100 dark:border-gray-700'
  }
}

function getHeaderBgClass(severity: string): string {
  switch (severity) {
    case 'high': return 'bg-red-50 dark:bg-red-900/20'
    case 'medium': return 'bg-amber-50 dark:bg-amber-900/20'
    case 'low': return 'bg-green-50 dark:bg-green-900/20'
    default: return 'bg-gray-50 dark:bg-gray-800'
  }
}

// Generate "when to seek help" based on concern type
function getWhenToSeekHelp(concern: HealthAlert): string {
  switch (concern.id) {
    case 'dengue':
      return 'Seek immediate medical help if you develop high fever, severe headache, pain behind eyes, or bleeding gums.'
    case 'chikungunya':
      return 'See a doctor if you have fever with severe joint pain lasting more than a few days.'
    case 'sun-heat':
      return 'Get medical attention if you experience confusion, rapid pulse, or stop sweating despite heat.'
    case 'leeches':
      return 'Consult a doctor if a bite becomes infected (swelling, pus, or increasing pain).'
    case 'leptospirosis':
      return 'Seek help for high fever, muscle aches, or jaundice after water exposure.'
    default:
      return 'Consult a doctor if symptoms persist or worsen.'
  }
}
</script>
