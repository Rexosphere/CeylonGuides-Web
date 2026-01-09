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
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500'
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            colors[toast.type],
            'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white pointer-events-auto min-w-[280px] max-w-[400px]'
          ]"
        >
          <span class="material-symbols-outlined text-xl">{{ icons[toast.type] }}</span>
          <span class="flex-1 text-sm font-medium">{{ toast.message }}</span>
          <button 
            @click="removeToast(toast.id)"
            class="opacity-70 hover:opacity-100 transition-opacity"
          >
            <span class="material-symbols-outlined text-lg">close</span>
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
    transform: translateX(100%);
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
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
