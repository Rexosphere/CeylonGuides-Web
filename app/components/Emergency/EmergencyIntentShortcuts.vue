<template>
  <div class="mb-8">
    <p class="text-sm text-neutral-soft mb-3 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-lg">crisis_alert</span>
      <span>What's happening?</span>
    </p>
    
    <div class="flex flex-wrap gap-2">
      <button
        v-for="intent in intents"
        :key="intent.id"
        @click="selectIntent(intent.id)"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
        :class="selectedIntent === intent.id 
          ? `${intent.activeClass} ring-2 ring-offset-2 scale-105` 
          : 'bg-neutral-100 dark:bg-[#3a2d28] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#4a3d38]'"
      >
        <span class="material-symbols-outlined text-lg">{{ intent.icon }}</span>
        <span>{{ intent.label }}</span>
      </button>

      <!-- Clear selection -->
      <button
        v-if="selectedIntent"
        @click="clearIntent"
        class="px-3 py-2 rounded-full text-xs font-medium bg-neutral-50 dark:bg-[#2a1d18] text-neutral-400 hover:text-neutral-600 transition-colors flex items-center gap-1"
      >
        <span class="material-symbols-outlined text-sm">close</span>
        Clear
      </button>
    </div>

    <!-- Intent-specific guidance -->
    <Transition name="slide">
      <div 
        v-if="selectedIntent && currentIntent"
        class="mt-4 p-4 rounded-lg border-l-4"
        :class="currentIntent.guideClass"
      >
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined text-2xl">{{ currentIntent.icon }}</span>
          <div>
            <h4 class="font-bold text-sm">{{ currentIntent.guidanceTitle }}</h4>
            <p class="text-xs mt-1 opacity-80">{{ currentIntent.guidanceText }}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <span 
                v-for="action in currentIntent.highlightedActions" 
                :key="action"
                class="text-xs px-2 py-1 bg-white/50 dark:bg-black/20 rounded font-medium"
              >
                {{ action }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits<{
  (e: 'intent-change', intent: string | null): void
}>()

const selectedIntent = ref<string | null>(null)

const intents = [
  {
    id: 'hurt',
    label: "I'm hurt",
    icon: 'healing',
    activeClass: 'bg-red-500 text-white ring-red-500',
    guideClass: 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200',
    guidanceTitle: 'Medical Emergency',
    guidanceText: 'Call 1990 for free GPS-tracked ambulance. Hospital and ambulance information highlighted below.',
    highlightedActions: ['Call Ambulance 1990', 'Nearby Hospitals', 'Hospital Phrase'],
    relevantCategories: ['ambulance', 'doctor'],
    relevantNumbers: ['ambulance-1990'],
    relevantPhrases: ['ambulance', 'doctor']
  },
  {
    id: 'lost',
    label: "I'm lost",
    icon: 'explore_off',
    activeClass: 'bg-orange-500 text-white ring-orange-500',
    guideClass: 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-800 dark:text-orange-200',
    guidanceTitle: 'Tourist Assistance',
    guidanceText: 'Call Tourism Hotline 1912 (24/7 English) or Tourist Police for help with navigation and safety.',
    highlightedActions: ['Tourism Hotline 1912', 'Tourist Police', 'Lost Phrase'],
    relevantCategories: ['tourist'],
    relevantNumbers: ['tourism-hotline', 'tourist-police'],
    relevantPhrases: ['lost']
  },
  {
    id: 'crime',
    label: 'Crime / Danger',
    icon: 'gpp_bad',
    activeClass: 'bg-blue-600 text-white ring-blue-600',
    guideClass: 'bg-blue-50 dark:bg-blue-900/20 border-blue-600 text-blue-800 dark:text-blue-200',
    guidanceTitle: 'Police Emergency',
    guidanceText: 'Call 119 immediately for police. Stay in a safe location if possible.',
    highlightedActions: ['Police Emergency 119', 'Call Police Phrase', 'Help Phrase'],
    relevantCategories: ['police'],
    relevantNumbers: ['police-119'],
    relevantPhrases: ['police', 'help']
  },
  {
    id: 'disaster',
    label: 'Disaster',
    icon: 'flood',
    activeClass: 'bg-amber-500 text-white ring-amber-500',
    guideClass: 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-800 dark:text-amber-200',
    guidanceTitle: 'Natural Disaster',
    guidanceText: 'Call 177 for Disaster Management. Move to higher ground for floods, stay away from damaged structures.',
    highlightedActions: ['Disaster Management 177', 'Tourism Hotline 1912'],
    relevantCategories: ['disaster'],
    relevantNumbers: ['disaster-management'],
    relevantPhrases: ['help']
  }
]

const currentIntent = computed(() => {
  return intents.find(i => i.id === selectedIntent.value) || null
})

function selectIntent(intentId: string) {
  selectedIntent.value = intentId
  emit('intent-change', intentId)
}

function clearIntent() {
  selectedIntent.value = null
  emit('intent-change', null)
}

// Expose for parent to use
defineExpose({
  selectedIntent,
  currentIntent
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
