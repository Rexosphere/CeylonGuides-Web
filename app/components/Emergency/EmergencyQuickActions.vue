<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-neutral-dark dark:text-white flex items-center gap-3">
        <span class="material-symbols-outlined text-primary">e911_emergency</span>
        Immediate Assistance
      </h2>
      <span class="text-sm text-neutral-soft flex items-center gap-1">
        <span class="material-symbols-outlined text-xs">touch_app</span>
        Tap to call instantly
      </span>
    </div>

    <!-- Mobile hint for long-press -->
    <p v-if="isMobile" class="text-xs text-neutral-soft mb-4 flex items-center gap-2">
      <span class="material-symbols-outlined text-sm">info</span>
      Long-press for alternative numbers
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button
        v-for="card in quickCards"
        :key="card.id"
        type="button"
        class="group text-left bg-white dark:bg-[#2a1d18] p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-[#3a2d28] hover:shadow-lg transition-all relative overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98]"
        :class="[
          isCallingNumber === card.primaryNumber && 'ring-2 ring-primary animate-pulse',
          isCardHighlighted(card) && 'ring-2 ring-primary bg-primary/5 scale-[1.02] shadow-lg'
        ]"
        @click="handleCardClick(card)"
        @touchstart.passive="handleTouchStart(card)"
        @touchend.passive="handleTouchEnd(card)"
        @touchcancel.passive="cancelLongPress"
        @contextmenu.prevent
      >
        <!-- Decorative accent -->
        <div :class="['absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110', card.accent]"></div>
        
        <!-- Call feedback overlay -->
        <Transition name="fade">
          <div
            v-if="isCallingNumber === card.primaryNumber"
            class="absolute inset-0 bg-primary/10 flex items-center justify-center z-20"
          >
            <span class="material-symbols-outlined text-4xl text-primary animate-bounce">call</span>
          </div>
        </Transition>

        <div class="flex flex-col h-full justify-between gap-4 relative z-10">
          <div>
            <div class="flex justify-between items-start">
              <div :class="['p-3 rounded-lg', card.iconWrap]">
                <span class="material-symbols-outlined text-3xl">{{ card.icon }}</span>
              </div>
              <span :class="['text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider', card.badge]">
                {{ card.badgeLabel }}
              </span>
            </div>
            <h3 class="mt-4 text-lg font-bold text-neutral-dark dark:text-white">{{ card.name }}</h3>
            <p class="text-sm text-neutral-soft mt-1">{{ card.description }}</p>
          </div>

          <!-- Number display (actionable, not plain text) -->
          <div class="mt-2">
            <div
              :class="[card.buttonClass, 'flex items-center justify-center gap-2']"
            >
              <span class="material-symbols-outlined text-lg">call</span>
              <span>{{ card.primaryNumber }}</span>
              <span v-if="card.secondaryNumber" class="material-symbols-outlined text-sm opacity-60">more_horiz</span>
            </div>
          </div>
        </div>
      </button>
    </div>

    <!-- Call Confirmation Modal -->
    <CallConfirmModal
      :is-open="modalState.isOpen"
      :target="modalState.target"
      @close="closeModal"
      @confirm="confirmCall"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { emergencyNumbers, type EmergencyNumber } from '~/data/emergency'
import CallConfirmModal from './CallConfirmModal.vue'

const props = defineProps<{
  highlightedIntent?: string | null
}>()

const { 
  modalState, 
  isCallingNumber, 
  isMobile,
  handleTap, 
  handleLongPressStart, 
  handleLongPressEnd, 
  cancelLongPress,
  confirmCall, 
  closeModal 
} = useTapToCall()

// Intent to category mapping
const intentCategories: Record<string, string[]> = {
  hurt: ['ambulance'],
  lost: ['tourist'],
  crime: ['police'],
  disaster: ['disaster']
}

function isCardHighlighted(card: any): boolean {
  if (!props.highlightedIntent) return false
  const categories = intentCategories[props.highlightedIntent] || []
  return categories.includes(card.category)
}

// Map emergency numbers to card format
const styles: Record<string, any> = {
  police: {
    accent: 'bg-red-500/5',
    iconWrap: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    badge: 'bg-red-100 text-red-700',
    badgeLabel: 'Critical',
    icon: 'local_police',
    buttonClass: 'block w-full text-center bg-primary text-white text-2xl font-extrabold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20',
  },
  ambulance: {
    accent: 'bg-blue-500/5',
    iconWrap: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    badgeLabel: 'Medical',
    icon: 'ambulance',
    buttonClass: 'block w-full text-center bg-primary text-white text-2xl font-extrabold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20',
  },
  tourist: {
    accent: 'bg-orange-500/5',
    iconWrap: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 text-orange-700',
    badgeLabel: 'Tourist',
    icon: 'shield_person',
    buttonClass: 'block w-full text-center border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg font-bold py-3 rounded-lg transition-colors',
  },
  disaster: {
    accent: 'bg-amber-500/5',
    iconWrap: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-700',
    badgeLabel: 'Emergency',
    icon: 'warning',
    buttonClass: 'block w-full text-center border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white text-lg font-bold py-3 rounded-lg transition-colors',
  },
}

// Filter to show only the most critical numbers (police, ambulance, tourist hotline)
const priorityNumbers = ['police-119', 'ambulance-1990', 'tourism-hotline']

const quickCards = computed(() => {
  return emergencyNumbers
    .filter((num: EmergencyNumber) => priorityNumbers.includes(num.id))
    .map((item: EmergencyNumber) => {
      const style = styles[item.category] || styles.police
      return {
        id: item.id,
        name: item.name,
        primaryNumber: item.primaryNumber,
        secondaryNumber: item.secondaryNumber,
        description: item.description.split('.')[0] + '.', // First sentence only
        category: item.category,
        ...style,
      }
    })
})

// Handle card click (desktop)
const handleCardClick = (card: any) => {
  if (isMobile.value) return // Mobile uses touch events
  handleTap({
    name: card.name,
    primaryNumber: card.primaryNumber,
    secondaryNumber: card.secondaryNumber,
    category: card.category,
  })
}

// Touch event handlers for mobile
const handleTouchStart = (card: any) => {
  if (card.secondaryNumber) {
    handleLongPressStart({
      name: card.name,
      primaryNumber: card.primaryNumber,
      secondaryNumber: card.secondaryNumber,
      category: card.category,
    })
  }
}

const handleTouchEnd = (card: any) => {
  handleLongPressEnd({
    name: card.name,
    primaryNumber: card.primaryNumber,
    secondaryNumber: card.secondaryNumber,
    category: card.category,
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
