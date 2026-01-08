<template>
  <div 
    class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 transition-all hover:shadow-md"
    :class="{ 'cursor-pointer': expandable }"
    @click="expandable && (isExpanded = !isExpanded)"
  >
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
        <span class="material-symbols-outlined text-red-600 dark:text-red-400 text-xl">{{ warning.icon }}</span>
      </div>
      
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <h4 class="font-bold text-red-700 dark:text-red-300 text-sm">{{ warning.title }}</h4>
          <span 
            v-if="expandable"
            class="material-symbols-outlined text-red-600 dark:text-red-400 text-lg flex-shrink-0 transition-transform"
            :class="{ 'rotate-180': isExpanded }"
          >
            expand_more
          </span>
        </div>
        
        <p class="text-sm text-red-600 dark:text-red-200 mt-1">{{ warning.description }}</p>
        
        <!-- Expandable details -->
        <div 
          v-if="expandable && warning.details && warning.details.length"
          class="overflow-hidden transition-all duration-300"
          :class="isExpanded ? 'max-h-96 mt-3' : 'max-h-0'"
        >
          <ul class="space-y-2 border-t border-red-200 dark:border-red-800 pt-3">
            <li 
              v-for="(detail, idx) in warning.details" 
              :key="idx"
              class="flex items-start gap-2 text-sm text-red-600 dark:text-red-200"
            >
              <span class="material-symbols-outlined text-red-500 text-base mt-0.5 flex-shrink-0">{{ detail.icon || 'arrow_right' }}</span>
              <span>{{ detail.text }}</span>
            </li>
          </ul>
        </div>
        
        <!-- Action buttons -->
        <div v-if="warning.actions && warning.actions.length" class="flex flex-wrap gap-2 mt-3">
          <button
            v-for="action in warning.actions"
            :key="action.label"
            class="text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
            :class="action.variant === 'primary' 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-200 dark:hover:bg-red-900/60'"
            @click.stop="action.onClick"
          >
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface WarningDetail {
  icon?: string
  text: string
}

export interface WarningAction {
  label: string
  variant?: 'primary' | 'secondary'
  onClick: () => void
}

export interface ShoppingWarning {
  id: string
  title: string
  description: string
  icon: string
  severity: 'high' | 'medium' | 'low'
  details?: WarningDetail[]
  actions?: WarningAction[]
}

defineProps<{
  warning: ShoppingWarning
  expandable?: boolean
}>()

const isExpanded = ref(false)
</script>
