<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white dark:bg-[#2a1d18] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-modal-enter">
          <!-- Header with gradient -->
          <div :class="['p-6 text-center', headerGradientClass]">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <span class="material-symbols-outlined text-white text-4xl">{{ icon }}</span>
            </div>
            <h3 class="text-xl font-bold text-white">{{ target?.name }}</h3>
          </div>
          
          <!-- Body -->
          <div class="p-6 space-y-4">
            <!-- Primary Number -->
            <button
              @click="target?.primaryNumber && $emit('confirm', target.primaryNumber)"
              class="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-4 flex items-center justify-between transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-2xl animate-pulse">call</span>
                <div class="text-left">
                  <div class="text-xs opacity-80">Tap to call</div>
                  <div class="text-2xl font-bold tracking-wider">{{ target?.primaryNumber }}</div>
                </div>
              </div>
              <span class="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>

            <!-- Secondary Number (if exists) -->
            <div v-if="target?.secondaryNumber" class="space-y-2">
              <button
                @click="showSecondary = !showSecondary"
                class="w-full flex items-center justify-between text-sm text-neutral-soft hover:text-neutral-dark dark:hover:text-white transition-colors py-2"
              >
                <span>Alternative number available</span>
                <span :class="['material-symbols-outlined text-lg transition-transform', showSecondary ? 'rotate-180' : '']">
                  expand_more
                </span>
              </button>
              
              <Transition name="slide">
                <button
                  v-if="showSecondary"
                  @click="target?.secondaryNumber && $emit('confirm', target.secondaryNumber)"
                  class="w-full bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-dark dark:text-white rounded-xl p-4 flex items-center justify-between transition-all active:scale-[0.98]"
                >
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-xl text-neutral-soft">phone_forwarded</span>
                    <div class="text-left">
                      <div class="text-xs text-neutral-soft">Secondary line</div>
                      <div class="text-lg font-semibold">{{ target?.secondaryNumber }}</div>
                    </div>
                  </div>
                  <span class="material-symbols-outlined text-neutral-soft">call</span>
                </button>
              </Transition>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="px-6 pb-6">
            <button
              @click="$emit('close')"
              class="w-full py-3 text-neutral-soft hover:text-neutral-dark dark:hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface CallTarget {
  name: string
  primaryNumber: string
  secondaryNumber?: string
  category?: string
}

const props = defineProps<{
  isOpen: boolean
  target: CallTarget | null
}>()

defineEmits<{
  close: []
  confirm: [number: string]
}>()

const showSecondary = ref(false)

const headerGradientClass = computed(() => {
  switch (props.target?.category) {
    case 'POLICE':
    case 'police':
      return 'bg-gradient-to-br from-red-500 to-red-700'
    case 'MEDICAL':
    case 'ambulance':
      return 'bg-gradient-to-br from-blue-500 to-blue-700'
    case 'TOURIST_POLICE':
    case 'tourist':
      return 'bg-gradient-to-br from-orange-500 to-orange-700'
    case 'disaster':
      return 'bg-gradient-to-br from-amber-500 to-amber-700'
    default:
      return 'bg-gradient-to-br from-primary to-primary/80'
  }
})

const icon = computed(() => {
  switch (props.target?.category) {
    case 'POLICE':
    case 'police':
      return 'local_police'
    case 'MEDICAL':
    case 'ambulance':
      return 'ambulance'
    case 'TOURIST_POLICE':
    case 'tourist':
      return 'shield_person'
    case 'disaster':
      return 'warning'
    default:
      return 'call'
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9) translateY(20px);
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal-enter {
  animation: modal-enter 0.3s ease-out;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
