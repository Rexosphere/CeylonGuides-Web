<template>
  <div 
    v-if="visible"
    :class="[
      'px-4 py-3 flex items-center justify-between gap-4 text-sm font-medium',
      typeStyles[type]
    ]"
  >
    <div class="flex items-center gap-3 flex-1">
      <span class="text-lg">{{ typeIcons[type] }}</span>
      <span class="flex-1">{{ message }}</span>
    </div>
    <div class="flex items-center gap-3 shrink-0">
      <NuxtLink 
        v-if="actionLink" 
        :to="actionLink"
        class="underline hover:no-underline font-semibold"
      >
        {{ actionText || 'Learn more' }}
      </NuxtLink>
      <button 
        v-if="dismissible"
        @click="visible = false"
        class="hover:opacity-70"
      >
        <span class="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'info' | 'warning' | 'danger' | 'success'
  message: string
  actionText?: string
  actionLink?: string
  dismissible?: boolean
}>(), {
  type: 'info',
  dismissible: true
})

const visible = ref(true)

const typeStyles: Record<string, string> = {
  info: 'bg-blue-600 text-white',
  warning: 'bg-amber-500 text-amber-950',
  danger: 'bg-red-600 text-white',
  success: 'bg-green-600 text-white'
}

const typeIcons: Record<string, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  danger: '🚨',
  success: '✅'
}
</script>
