<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="isVisible" 
      class="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:-translate-x-0 sm:bottom-6 sm:right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border border-white/10"
      :class="type === 'success' ? 'bg-primary text-white' : 'bg-[#1a1a1a] text-white'"
    >
      <span class="material-symbols-outlined text-[20px] filled">
        {{ type === 'success' ? 'check_circle' : 'info' }}
      </span>
      <span class="text-sm font-bold tracking-wide">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { isVisible, message, type } = useToast()
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
</style>
