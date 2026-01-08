<template>
  <div class="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-accent to-accent/80 px-6 py-5">
      <div class="flex items-center gap-3">
        <div class="size-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <span class="material-symbols-outlined text-white text-[28px]">shield_person</span>
        </div>
        <div>
          <h2 class="text-xl font-bold text-white">Safety Assistant</h2>
          <p class="text-white/80 text-sm">What should I watch out for?</p>
        </div>
      </div>
    </div>

    <!-- Input Section -->
    <div class="p-6 space-y-5">
      <!-- Location Input -->
      <div>
        <label class="block text-sm font-semibold text-charcoal dark:text-white mb-2">
          <span class="material-symbols-outlined text-[18px] align-middle mr-1">location_on</span>
          Where are you?
        </label>
        <select 
          v-model="selectedLocation"
          class="w-full px-4 py-3 border border-gray-200 dark:border-white/20 rounded-xl bg-gray-50 dark:bg-background-dark text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        >
          <option value="">Select a city or area</option>
          <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
        </select>
      </div>

      <!-- Activity Selection -->
      <div>
        <label class="block text-sm font-semibold text-charcoal dark:text-white mb-3">
          <span class="material-symbols-outlined text-[18px] align-middle mr-1">directions_run</span>
          What are you doing?
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="activity in activities"
            :key="activity.id"
            @click="selectedActivity = activity.id"
            :class="[
              'px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all border-2',
              selectedActivity === activity.id
                ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20 scale-105'
                : 'bg-gray-50 dark:bg-background-dark text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-accent/50 hover:bg-accent/5'
            ]"
          >
            <span class="text-lg">{{ activity.icon }}</span>
            {{ activity.label }}
          </button>
        </div>
      </div>

      <!-- Get Advice Button -->
      <button
        @click="getAdvice"
        :disabled="!selectedLocation || !selectedActivity"
        class="w-full py-4 bg-accent hover:bg-accent/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
      >
        <span class="material-symbols-outlined">search_insights</span>
        Get Safety Advice
      </button>
    </div>

    <!-- Results Section -->
    <ClientOnly>
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-[2000px]"
        leave-from-class="opacity-100 max-h-[2000px]"
        leave-to-class="opacity-0 max-h-0"
      >
        <div v-if="showResults" class="border-t border-gray-100 dark:border-white/10 overflow-hidden">
        <div class="p-6 space-y-6 bg-gray-50/50 dark:bg-black/20">
          <!-- Risk Level Banner -->
          <div 
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-xl',
              riskLevel === 'HIGH' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50' :
              riskLevel === 'MEDIUM' ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50' :
              'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50'
            ]"
          >
            <div 
              :class="[
                'size-10 rounded-full flex items-center justify-center',
                riskLevel === 'HIGH' ? 'bg-red-500' :
                riskLevel === 'MEDIUM' ? 'bg-amber-500' : 'bg-green-500'
              ]"
            >
              <span class="material-symbols-outlined text-white text-[20px]">
                {{ riskLevel === 'HIGH' ? 'warning' : riskLevel === 'MEDIUM' ? 'info' : 'check_circle' }}
              </span>
            </div>
            <div>
              <p class="font-bold" :class="[
                riskLevel === 'HIGH' ? 'text-red-700 dark:text-red-300' :
                riskLevel === 'MEDIUM' ? 'text-amber-700 dark:text-amber-300' : 'text-green-700 dark:text-green-300'
              ]">
                {{ riskLevel }} Risk Level
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ relevantScams.length }} scam{{ relevantScams.length !== 1 ? 's' : '' }} reported for {{ getActivityLabel(selectedActivity) }} in {{ selectedLocation }}
              </p>
            </div>
          </div>

          <!-- Top 3 Scams -->
          <div v-if="relevantScams.length > 0">
            <h3 class="flex items-center gap-2 text-base font-bold text-charcoal dark:text-white mb-3">
              <span class="material-symbols-outlined text-red-500 text-[20px]">report</span>
              Top {{ Math.min(3, relevantScams.length) }} Scams to Watch
            </h3>
            <div class="space-y-3">
              <div 
                v-for="(scam, index) in relevantScams.slice(0, 3)" 
                :key="scam.id"
                class="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-sm"
              >
                <div class="flex items-start gap-3">
                  <div class="size-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                    <span class="text-red-500 font-bold text-sm">{{ index + 1 }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-charcoal dark:text-white text-sm">{{ scam.title }}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{{ scam.description }}</p>
                    <span 
                      :class="[
                        'inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
                        scam.severity === 'HIGH' || scam.severity === 'CRITICAL' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                      ]"
                    >
                      {{ scam.severity }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Do / Don't Checklist -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- DO -->
            <div class="bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
              <h3 class="flex items-center gap-2 text-sm font-bold text-green-700 dark:text-green-400 mb-3">
                <span class="material-symbols-outlined text-[18px]">check_circle</span>
                DO
              </h3>
              <ul class="space-y-2">
                <li 
                  v-for="(tip, i) in doTips" 
                  :key="i"
                  class="flex items-start gap-2 text-xs text-green-800 dark:text-green-300"
                >
                  <span class="material-symbols-outlined text-[14px] mt-0.5 shrink-0">done</span>
                  <span>{{ tip }}</span>
                </li>
              </ul>
            </div>

            <!-- DON'T -->
            <div class="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-200 dark:border-red-900/30">
              <h3 class="flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-400 mb-3">
                <span class="material-symbols-outlined text-[18px]">cancel</span>
                DON'T
              </h3>
              <ul class="space-y-2">
                <li 
                  v-for="(tip, i) in dontTips" 
                  :key="i"
                  class="flex items-start gap-2 text-xs text-red-800 dark:text-red-300"
                >
                  <span class="material-symbols-outlined text-[14px] mt-0.5 shrink-0">close</span>
                  <span>{{ tip }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Safe Alternatives -->
          <div class="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200 dark:border-blue-900/30">
            <h3 class="flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-400 mb-3">
              <span class="material-symbols-outlined text-[18px]">verified</span>
              Safe Alternatives
            </h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="alt in safeAlternatives" 
                :key="alt.name"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-surface-dark rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50"
              >
                <span class="material-symbols-outlined text-[14px]">{{ alt.icon }}</span>
                {{ alt.name }}
              </span>
            </div>
          </div>

          <!-- Reset Button -->
          <button
            @click="resetAssistant"
            class="w-full py-3 border-2 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
          >
            <span class="material-symbols-outlined text-[18px] align-middle mr-1">refresh</span>
            Ask Another Question
          </button>
        </div>
      </div>
      </Transition>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ScamAlert } from '~/types/api'

// Props
const props = defineProps<{
  scams: ScamAlert[]
}>()

// State
const selectedLocation = ref('')
const selectedActivity = ref('')
const showResults = ref(false)

// Locations available (derived from scam data)
const locations = [
  'Colombo',
  'Kandy',
  'Galle',
  'Negombo',
  'Sigiriya',
  'Hikkaduwa',
  'Unawatuna',
  'Weligama',
  'Bentota',
  'Ratnapura',
  'Anuradhapura',
  'Yala'
]

// Activity types with icons and category mappings
const activities = [
  { id: 'transport', label: 'Transport', icon: '🚕', categories: ['TRANSPORT_SCAM'] },
  { id: 'shopping', label: 'Shopping', icon: '🛍️', categories: ['SHOPPING_SCAM', 'GEM_SCAM'] },
  { id: 'sightseeing', label: 'Sightseeing', icon: '📸', categories: ['TOUR_GUIDE_SCAM', 'OTHER'] },
  { id: 'nightlife', label: 'Nightlife', icon: '🍹', categories: ['RESTAURANT_SCAM'] },
  { id: 'beach', label: 'Beach', icon: '🏖️', categories: ['OTHER'] },
  { id: 'temple', label: 'Temple Visit', icon: '🛕', categories: ['TOUR_GUIDE_SCAM', 'OTHER'] }
]

// Safe alternatives per activity
const safeAlternativesMap: Record<string, { name: string; icon: string }[]> = {
  transport: [
    { name: 'PickMe App', icon: 'smartphone' },
    { name: 'Uber', icon: 'local_taxi' },
    { name: 'Hotel Taxi', icon: 'hotel' },
    { name: 'Metered Tuk-tuks', icon: 'electric_rickshaw' }
  ],
  shopping: [
    { name: 'Govt. Certified Shops', icon: 'verified' },
    { name: 'NGJA Members', icon: 'diamond' },
    { name: 'Hotel Gift Shops', icon: 'storefront' },
    { name: 'Get Receipts', icon: 'receipt' }
  ],
  sightseeing: [
    { name: 'Licensed Guides', icon: 'badge' },
    { name: 'Hotel Tours', icon: 'tour' },
    { name: 'Official Ticket Counters', icon: 'confirmation_number' }
  ],
  nightlife: [
    { name: 'Hotel Bars', icon: 'nightlife' },
    { name: 'Known Restaurants', icon: 'restaurant' },
    { name: 'Google Reviews', icon: 'reviews' }
  ],
  beach: [
    { name: 'Hotel Rentals', icon: 'surfing' },
    { name: 'Photo Upload Before', icon: 'photo_camera' },
    { name: 'Agree Price First', icon: 'handshake' }
  ],
  temple: [
    { name: 'Official Guides', icon: 'badge' },
    { name: 'Temple Donation Box', icon: 'volunteer_activism' },
    { name: 'Hotel-Arranged Tours', icon: 'tour' }
  ]
}

// Get activity label
function getActivityLabel(activityId: string): string {
  return activities.find(a => a.id === activityId)?.label || activityId
}

// Get relevant scams based on location and activity
const relevantScams = computed(() => {
  if (!selectedLocation.value || !selectedActivity.value) return []
  
  const activity = activities.find(a => a.id === selectedActivity.value)
  if (!activity) return []
  
  const locationLower = selectedLocation.value.toLowerCase()
  
  return props.scams.filter(scam => {
    // Check if scam matches location
    const matchesLocation = 
      scam.location?.name?.toLowerCase().includes(locationLower) ||
      scam.location?.district?.toLowerCase().includes(locationLower)
    
    // Check if scam matches activity categories
    const matchesCategory = activity.categories.includes(scam.category)
    
    return matchesLocation && matchesCategory
  }).sort((a, b) => {
    // Sort by severity (HIGH/CRITICAL first)
    const severityOrder: Record<string, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
    return (severityOrder[a.severity] || 3) - (severityOrder[b.severity] || 3)
  })
})

// Calculate risk level
const riskLevel = computed(() => {
  if (relevantScams.value.length === 0) return 'LOW'
  
  const hasHighRisk = relevantScams.value.some(s => s.severity === 'HIGH' || s.severity === 'CRITICAL')
  const hasMediumRisk = relevantScams.value.some(s => s.severity === 'MEDIUM')
  
  if (hasHighRisk || relevantScams.value.length >= 3) return 'HIGH'
  if (hasMediumRisk || relevantScams.value.length >= 2) return 'MEDIUM'
  return 'LOW'
})

// Extract DO tips from prevention tips
const doTips = computed(() => {
  const tips: string[] = []
  
  for (const scam of relevantScams.value.slice(0, 3)) {
    for (const tip of scam.prevention_tips || []) {
      // Find tips that suggest positive actions
      if (tip.toLowerCase().includes('always') || 
          tip.toLowerCase().includes('use ') ||
          tip.toLowerCase().includes('insist') ||
          tip.toLowerCase().includes('ask ') ||
          tip.toLowerCase().includes('book ') ||
          tip.toLowerCase().includes('research') ||
          tip.toLowerCase().includes('carry') ||
          tip.toLowerCase().includes('check ')) {
        if (!tips.includes(tip) && tips.length < 5) {
          tips.push(tip)
        }
      }
    }
  }
  
  // Fallback tips
  if (tips.length === 0) {
    tips.push('Research prices and services beforehand')
    tips.push('Use official and verified services')
    tips.push('Keep receipts and documentation')
  }
  
  return tips
})

// Extract DON'T tips from prevention tips
const dontTips = computed(() => {
  const tips: string[] = []
  
  for (const scam of relevantScams.value.slice(0, 3)) {
    for (const tip of scam.prevention_tips || []) {
      // Find tips that suggest avoiding actions
      if (tip.toLowerCase().includes('never') || 
          tip.toLowerCase().includes('don\'t') ||
          tip.toLowerCase().includes('avoid') ||
          tip.toLowerCase().includes('refuse') ||
          tip.toLowerCase().includes('be wary') ||
          tip.toLowerCase().includes('be suspicious') ||
          tip.toLowerCase().includes('be skeptical')) {
        if (!tips.includes(tip) && tips.length < 5) {
          tips.push(tip)
        }
      }
    }
  }
  
  // Fallback tips
  if (tips.length === 0) {
    tips.push('Accept unsolicited offers from strangers')
    tips.push('Pay without agreeing on price first')
    tips.push('Follow strangers to unknown locations')
  }
  
  return tips
})

// Get safe alternatives for selected activity
const safeAlternatives = computed(() => {
  return safeAlternativesMap[selectedActivity.value] || []
})

// Get advice
function getAdvice() {
  if (selectedLocation.value && selectedActivity.value) {
    showResults.value = true
  }
}

// Reset assistant
function resetAssistant() {
  showResults.value = false
  selectedLocation.value = ''
  selectedActivity.value = ''
}
</script>
