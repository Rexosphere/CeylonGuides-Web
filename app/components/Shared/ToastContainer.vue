<script setup lang="ts">
import { useToast, type Toast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()

const icons: Record<Toast['type'], string> = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info'
}

const colors: Record<Toast['type'], string> = {
  success: 'bg-semantic-success text-text-inverse',
  error: 'bg-semantic-danger text-text-inverse',
  warning: 'bg-semantic-warning text-text-inverse',
  info: 'bg-semantic-info text-text-inverse'
}

const dismissClasses: Record<Toast['type'], string> = {
  success: 'text-text-inverse/80 hover:text-text-inverse focus-visible:ring-surface-base/70 focus-visible:ring-offset-semantic-success',
  error: 'text-text-inverse/80 hover:text-text-inverse focus-visible:ring-surface-base/70 focus-visible:ring-offset-semantic-danger',
  warning: 'text-text-inverse/80 hover:text-text-inverse focus-visible:ring-text-strong/40 focus-visible:ring-offset-semantic-warning',
  info: 'text-text-inverse/80 hover:text-text-inverse focus-visible:ring-surface-base/70 focus-visible:ring-offset-semantic-info'
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-x-0 bottom-0 sm:bottom-6 sm:right-6 sm:left-auto z-[9999] flex flex-col gap-3 px-4 sm:px-0 pb-6 pointer-events-none max-w-sm w-full">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :role="toast.type === 'error' || toast.type === 'warning' ? 'alert' : 'status'"
          :aria-live="toast.type === 'error' || toast.type === 'warning' ? 'assertive' : 'polite'"
          aria-atomic="true"
          :class="[
            colors[toast.type],
            'flex items-center gap-3 px-4 py-3 rounded-sm shadow-sm pointer-events-auto min-w-full sm:min-w-max transition-opacity duration-200'
          ]"
        >
          <span class="material-symbols-outlined text-xl flex-shrink-0">{{ icons[toast.type] }}</span>
          <span class="flex-1 text-sm font-medium leading-snug">{{ toast.message }}</span>
          <button 
            @click="removeToast(toast.id)"
            type="button"
            :class="[
              'flex-shrink-0 rounded-xs p-0.5 leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors',
              dismissClasses[toast.type]
            ]"
            aria-label="Dismiss notification"
          >
            <span class="material-symbols-outlined text-lg leading-none">close</span>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active {
  animation: toast-in 0.3s ease-out;
}
.toast-leave-active {
  animation: toast-out 0.2s ease-in;
}

@keyframes toast-in {
  from {
    transform: translateX(24px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(24px);
    opacity: 0;
  }
}
</style>
