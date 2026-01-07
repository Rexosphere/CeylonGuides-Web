<template>
  <div 
    class="fixed bottom-0 left-[360px] right-0 z-30 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-white/10 transition-all duration-300 ease-out"
    :class="isExpanded ? 'h-[300px]' : 'h-[48px]'"
    role="region"
    aria-label="Route information panel"
  >
    <!-- Drag Handle -->
    <button 
      @click="$emit('toggle')"
      class="w-full h-12 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
      :aria-expanded="isExpanded"
      aria-controls="bottom-sheet-content"
    >
      <div class="w-12 h-1 bg-gray-300 dark:bg-white/20 rounded-full group-hover:bg-gray-400 dark:group-hover:bg-white/30 transition-colors"></div>
      <span class="sr-only">{{ isExpanded ? 'Collapse panel' : 'Expand panel' }}</span>
    </button>

    <!-- Tab Navigation -->
    <div 
      v-show="isExpanded"
      class="px-6 border-b border-gray-100 dark:border-white/5"
      role="tablist"
      aria-label="Information tabs"
    >
      <div class="flex gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="$emit('tab-change', tab.id)"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :aria-controls="`panel-${tab.id}`"
          :id="`tab-${tab.id}`"
          class="px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all relative"
          :class="activeTab === tab.id 
            ? 'text-teal-deep dark:text-teal-400' 
            : 'text-text-muted hover:text-text-main dark:hover:text-white'"
        >
          <span class="flex items-center gap-2">
            <span class="material-symbols-outlined text-base">{{ tab.icon }}</span>
            {{ tab.label }}
          </span>
          <div 
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-deep dark:bg-teal-400"
          ></div>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div 
      v-show="isExpanded"
      id="bottom-sheet-content"
      class="h-[calc(300px-48px-49px)] overflow-y-auto p-6"
    >
      <!-- Routes & Fares Tab -->
      <div 
        v-if="activeTab === 'fares'"
        :id="`panel-fares`"
        role="tabpanel"
        :aria-labelledby="`tab-fares`"
      >
        <slot name="fares">
          <div v-if="!routeResult" class="text-center py-8 text-text-muted">
            <span class="material-symbols-outlined text-4xl mb-2 block opacity-50">route</span>
            <p class="text-sm">Enter origin and destination to see fare estimates</p>
          </div>
        </slot>
      </div>

      <!-- Travel Tips Tab -->
      <div 
        v-if="activeTab === 'tips'"
        :id="`panel-tips`"
        role="tabpanel"
        :aria-labelledby="`tab-tips`"
      >
        <slot name="tips">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Negotiation Phrases -->
            <div>
              <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-deep text-base">record_voice_over</span>
                Negotiation Phrases
              </h3>
              <div class="space-y-3">
                <div class="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-xl border border-teal-100 dark:border-teal-900/30">
                  <div class="text-xs font-bold text-teal-700 dark:text-teal-400 mb-1">🇱🇰 Sinhala</div>
                  <div class="text-sm font-medium text-text-main dark:text-white">"Mee-tara kee-yada?" (How much?)</div>
                </div>
                <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <div class="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">💰 Negotiate</div>
                  <div class="text-sm font-medium text-text-main dark:text-white">"Mee-tara [price] hari-da?"</div>
                </div>
                <div class="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-100 dark:border-amber-900/30">
                  <div class="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">📱 Meter</div>
                  <div class="text-sm font-medium text-text-main dark:text-white">"Meter danna" (Turn on meter)</div>
                </div>
              </div>
            </div>

            <!-- Quick Tips -->
            <div>
              <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-coral-orange text-base">tips_and_updates</span>
                Quick Tips
              </h3>
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <span class="text-lg">✅</span>
                  <span class="text-xs text-text-main dark:text-white">Agree on price <strong>before</strong> getting in</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-lg">📸</span>
                  <span class="text-xs text-text-main dark:text-white">Photo the license plate</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-lg">🗺️</span>
                  <span class="text-xs text-text-main dark:text-white">Track route on Google Maps</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-lg">💵</span>
                  <span class="text-xs text-text-main dark:text-white">Keep small bills ready</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-lg">🚫</span>
                  <span class="text-xs text-text-main dark:text-white">Avoid drivers who approach first</span>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>

      <!-- Safety Tab -->
      <div 
        v-if="activeTab === 'safety'"
        :id="`panel-safety`"
        role="tabpanel"
        :aria-labelledby="`tab-safety`"
      >
        <slot name="safety">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Emergency Contacts -->
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-2xl p-4">
              <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-red-600 dark:text-red-400 text-base">emergency</span>
                Emergency Contacts
              </h3>
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-red-600 dark:text-red-400">119</span>
                  <span class="text-text-main dark:text-white">Police</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-red-600 dark:text-red-400">1912</span>
                  <span class="text-text-main dark:text-white">Tourist Police</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-red-600 dark:text-red-400">1990</span>
                  <span class="text-text-main dark:text-white">Ambulance</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-red-600 dark:text-red-400">1969</span>
                  <span class="text-text-main dark:text-white">Roadside Help</span>
                </div>
              </div>
            </div>

            <!-- Standard Fares -->
            <div class="bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl p-4">
              <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-teal-deep text-base">payments</span>
                Standard Tuk-Tuk Fares
              </h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-text-muted">First km</span>
                  <span class="font-bold text-text-main dark:text-white">Rs. 100</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-muted">Per km</span>
                  <span class="font-bold text-text-main dark:text-white">Rs. 60</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-muted">Waiting/hr</span>
                  <span class="font-bold text-text-main dark:text-white">Rs. 500</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-muted">Night</span>
                  <span class="font-bold text-coral-orange">+50%</span>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>

    <!-- Collapsed Hint -->
    <div 
      v-if="!isExpanded"
      class="absolute top-0 left-0 right-0 h-12 flex items-center justify-center pointer-events-none"
    >
      <span class="text-xs text-text-muted">
        {{ routeResult ? 'View route details' : 'Enter locations to see routes' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isExpanded: boolean
  activeTab: 'fares' | 'tips' | 'safety'
  routeResult: any | null
}>()

defineEmits<{
  (e: 'toggle'): void
  (e: 'tab-change', tab: 'fares' | 'tips' | 'safety'): void
}>()

const tabs = [
  { id: 'fares' as const, label: 'Routes & Fares', icon: 'payments' },
  { id: 'tips' as const, label: 'Travel Tips', icon: 'lightbulb' },
  { id: 'safety' as const, label: 'Safety', icon: 'shield' }
]
</script>

<style scoped>
/* Custom scrollbar for tab content */
#bottom-sheet-content::-webkit-scrollbar {
  width: 6px;
}
#bottom-sheet-content::-webkit-scrollbar-track {
  background: transparent;
}
#bottom-sheet-content::-webkit-scrollbar-thumb {
  background-color: #d1c4be;
  border-radius: 20px;
}
</style>
