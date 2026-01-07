<template>
  <div class="fixed top-20 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        v-show="notification.visible"
        class="min-w-[300px] max-w-sm p-4 rounded-lg shadow-lg pointer-events-auto flex items-start gap-3 border dark:border-white/10"
        :class="{
          'bg-white dark:bg-surface-dark border-l-4 border-l-green-500': notification.type === 'success',
          'bg-white dark:bg-surface-dark border-l-4 border-l-red-500': notification.type === 'error',
          'bg-white dark:bg-surface-dark border-l-4 border-l-amber-500': notification.type === 'warning',
          'bg-white dark:bg-surface-dark border-l-4 border-l-blue-500': notification.type === 'info'
        }"
      >
        <!-- Icons -->
        <span v-if="notification.type === 'success'" class="material-symbols-outlined text-green-500 text-xl shrink-0">check_circle</span>
        <span v-else-if="notification.type === 'error'" class="material-symbols-outlined text-red-500 text-xl shrink-0">error</span>
        <span v-else-if="notification.type === 'warning'" class="material-symbols-outlined text-amber-500 text-xl shrink-0">warning</span>
        <span v-else class="material-symbols-outlined text-blue-500 text-xl shrink-0">info</span>

        <div class="flex-1 text-sm font-medium text-text-main dark:text-white pt-0.5">
          {{ notification.message }}
        </div>

        <button @click="remove(notification.id)" class="text-text-muted hover:text-text-main dark:hover:text-white transition-colors shrink-0">
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotifications } from '@/composables/useNotifications'

const { notifications, remove } = useNotifications()
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
