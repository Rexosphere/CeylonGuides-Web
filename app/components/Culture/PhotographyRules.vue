<template>
  <section id="photography" class="space-y-4">
    <!-- Header with Ask Permission Callout -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h3 class="text-lg font-bold text-neutral-dark dark:text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary" aria-hidden="true">photo_camera</span>
          Photography Guidelines
        </h3>
        <p class="text-sm text-neutral-500 mt-0.5">What you can and cannot photograph in Sri Lanka</p>
      </div>
    </div>

    <!-- Ask Permission Callout -->
    <div 
      v-if="showAskPermissionCallout"
      class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800"
      role="note"
      aria-label="Important reminder about asking permission"
    >
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl" aria-hidden="true">front_hand</span>
        <div>
          <h4 class="font-bold text-blue-700 dark:text-blue-400">Always Ask Permission First</h4>
          <p class="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1">
            Politely ask before photographing people, especially women, children, or monks. 
            If they decline, respect their wishes. A simple "Istuti" (thank you) shows appreciation.
          </p>
        </div>
      </div>
    </div>

    <!-- Restriction Chips -->
    <div class="space-y-3">
      <!-- High Severity (Critical) -->
      <div>
        <p class="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">Critical Restrictions</p>
        <div class="flex flex-wrap gap-2" role="list" aria-label="Critical photography restrictions">
          <button
            v-for="rule in highSeverityRules"
            :key="rule.id"
            @click="toggleRule(rule.id)"
            @keydown.enter.prevent="toggleRule(rule.id)"
            @keydown.space.prevent="toggleRule(rule.id)"
            class="group relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            :class="[
              expandedRule === rule.id
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
            ]"
            :aria-expanded="expandedRule === rule.id"
            :aria-controls="`rule-detail-${rule.id}`"
            role="listitem"
          >
            <span class="material-symbols-outlined text-base" aria-hidden="true">
              {{ expandedRule === rule.id ? 'close' : 'block' }}
            </span>
            {{ rule.label }}
          </button>
        </div>
      </div>

      <!-- Medium Severity -->
      <div>
        <p class="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">Important Guidelines</p>
        <div class="flex flex-wrap gap-2" role="list" aria-label="Important photography guidelines">
          <button
            v-for="rule in mediumSeverityRules"
            :key="rule.id"
            @click="toggleRule(rule.id)"
            @keydown.enter.prevent="toggleRule(rule.id)"
            @keydown.space.prevent="toggleRule(rule.id)"
            class="group relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            :class="[
              expandedRule === rule.id
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50'
            ]"
            :aria-expanded="expandedRule === rule.id"
            :aria-controls="`rule-detail-${rule.id}`"
            role="listitem"
          >
            <span class="material-symbols-outlined text-base" aria-hidden="true">
              {{ expandedRule === rule.id ? 'close' : 'warning' }}
            </span>
            {{ rule.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Expanded Rule Detail -->
    <Transition name="slide-fade">
      <div 
        v-if="expandedRule && selectedRuleDetails"
        :id="`rule-detail-${expandedRule}`"
        class="bg-neutral-50 dark:bg-[#1a120e] rounded-xl p-4 border border-neutral-200 dark:border-[#3a2d28]"
        role="region"
        :aria-label="`Details for ${selectedRuleDetails.label}`"
      >
        <div class="flex items-start gap-3">
          <div 
            class="p-2 rounded-lg"
            :class="selectedRuleDetails.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-amber-100 dark:bg-amber-900/30'"
          >
            <span 
              class="material-symbols-outlined"
              :class="selectedRuleDetails.severity === 'high' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'"
              aria-hidden="true"
            >
              {{ selectedRuleDetails.severity === 'high' ? 'dangerous' : 'info' }}
            </span>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-neutral-800 dark:text-white">{{ selectedRuleDetails.label }}</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{{ selectedRuleDetails.description }}</p>
            <div v-if="selectedRuleDetails.tags?.length" class="flex flex-wrap gap-1 mt-2">
              <span 
                v-for="tag in selectedRuleDetails.tags" 
                :key="tag"
                class="text-[10px] px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <button 
            @click="expandedRule = null"
            class="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors"
            aria-label="Close details"
          >
            <span class="material-symbols-outlined text-neutral-400" aria-hidden="true">close</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Quick Reference Summary -->
    <div class="bg-neutral-100 dark:bg-[#1a120e] rounded-xl p-4">
      <h4 class="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-2">Quick Reference</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <span class="material-symbols-outlined text-emerald-500 text-sm" aria-hidden="true">check_circle</span>
          Photography allowed in most Buddhist temples
        </div>
        <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <span class="material-symbols-outlined text-emerald-500 text-sm" aria-hidden="true">check_circle</span>
          Ask temple officials when unsure
        </div>
        <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <span class="material-symbols-outlined text-red-500 text-sm" aria-hidden="true">cancel</span>
          No drones at heritage sites
        </div>
        <div class="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <span class="material-symbols-outlined text-red-500 text-sm" aria-hidden="true">cancel</span>
          No flash on ancient murals
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { photoRules, getPhotoRulesBySeverity } from '~/data/culturePageData'

// State
const expandedRule = ref<string | null>(null)

// Get rules by severity
const highSeverityRules = computed(() => getPhotoRulesBySeverity('high'))
const mediumSeverityRules = computed(() => getPhotoRulesBySeverity('medium'))

// Get selected rule details
const selectedRuleDetails = computed(() => {
  if (!expandedRule.value) return null
  return photoRules.find(r => r.id === expandedRule.value)
})

// Check if "ask permission" is mentioned in culture.md data
const showAskPermissionCallout = computed(() => {
  return photoRules.some(r => 
    r.description?.toLowerCase().includes('permission') ||
    r.description?.toLowerCase().includes('ask') ||
    r.description?.toLowerCase().includes('consent')
  )
})

// Toggle rule expansion
function toggleRule(ruleId: string) {
  expandedRule.value = expandedRule.value === ruleId ? null : ruleId
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
