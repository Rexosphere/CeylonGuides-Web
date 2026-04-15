<template>
  <div 
    v-if="visible"
    :role="a11yByType[currentType].role"
    :aria-live="a11yByType[currentType].live"
    aria-atomic="true"
    :class="[
      'flex items-start justify-between gap-3 sm:gap-4 px-4 py-3 rounded-sm border shadow-sm text-sm font-medium transition-opacity duration-200',
      typeStyles[currentType]
    ]"
  >
    <div class="flex items-start gap-3 flex-1 min-w-0">
      <span class="text-lg leading-none mt-0.5" aria-hidden="true">{{ typeIcons[currentType] }}</span>
      <span class="sr-only">{{ typeLabels[currentType] }}:</span>
      <span class="flex-1 leading-5 break-words">{{ message }}</span>
    </div>
    <div class="flex items-center gap-2 sm:gap-3 shrink-0">
      <NuxtLink 
        v-if="actionLink" 
        :to="actionLink"
        :class="[
          'font-semibold underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xs px-1 py-0.5',
          actionStyles[currentType]
        ]"
      >
        {{ actionText || 'Learn more' }}
      </NuxtLink>
      <button 
        v-if="dismissible"
        @click="visible = false"
        type="button"
        :class="[
          'rounded-xs p-1 leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          dismissStyles[currentType]
        ]"
        aria-label="Dismiss alert"
      >
        <span class="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type AlertType = 'info' | 'warning' | 'danger' | 'success'

const props = withDefaults(defineProps<{
  type?: AlertType
  message: string
  actionText?: string
  actionLink?: string
  dismissible?: boolean
}>(), {
  type: 'info',
  dismissible: true
})

const visible = ref(true)
const currentType = computed<AlertType>(() => props.type)

const typeStyles: Record<AlertType, string> = {
  info: 'bg-semantic-info text-text-inverse border-brand-primary-400/30',
  warning: 'bg-semantic-warning text-text-inverse border-brand-secondary-700/30',
  danger: 'bg-semantic-danger text-text-inverse border-brand-accent-600/35',
  success: 'bg-semantic-success text-text-inverse border-brand-primary-500/30'
}

const actionStyles: Record<AlertType, string> = {
  info: 'text-text-inverse focus-visible:ring-surface-base/80 focus-visible:ring-offset-semantic-info',
  warning: 'text-text-inverse focus-visible:ring-surface-base/80 focus-visible:ring-offset-semantic-warning',
  danger: 'text-text-inverse focus-visible:ring-surface-base/80 focus-visible:ring-offset-semantic-danger',
  success: 'text-text-inverse focus-visible:ring-surface-base/80 focus-visible:ring-offset-semantic-success'
}

const dismissStyles: Record<AlertType, string> = {
  info: 'text-text-inverse/90 hover:text-text-inverse hover:bg-surface-base/10 focus-visible:ring-surface-base/80 focus-visible:ring-offset-semantic-info',
  warning: 'text-text-inverse/90 hover:text-text-inverse hover:bg-surface-base/10 focus-visible:ring-surface-base/80 focus-visible:ring-offset-semantic-warning',
  danger: 'text-text-inverse/90 hover:text-text-inverse hover:bg-surface-base/10 focus-visible:ring-surface-base/80 focus-visible:ring-offset-semantic-danger',
  success: 'text-text-inverse/90 hover:text-text-inverse hover:bg-surface-base/10 focus-visible:ring-surface-base/80 focus-visible:ring-offset-semantic-success'
}

const a11yByType: Record<AlertType, { role: 'status' | 'alert', live: 'polite' | 'assertive' }> = {
  info: { role: 'status', live: 'polite' },
  warning: { role: 'alert', live: 'assertive' },
  danger: { role: 'alert', live: 'assertive' },
  success: { role: 'status', live: 'polite' }
}

const typeLabels: Record<AlertType, string> = {
  info: 'Information',
  warning: 'Warning',
  danger: 'Danger',
  success: 'Success'
}

const typeIcons: Record<AlertType, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  danger: '🚨',
  success: '✅'
}
</script>
