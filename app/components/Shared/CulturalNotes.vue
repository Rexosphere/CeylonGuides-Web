<template>
  <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6 shadow-sm">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <div class="p-2 bg-primary/20 rounded-lg text-primary">
        <span class="material-symbols-outlined text-xl">lightbulb</span>
      </div>
      <h3 class="font-bold text-charcoal">Cultural Insights</h3>
    </div>

    <!-- Current Note -->
    <div v-if="currentNote" class="space-y-4">
      <div class="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/40">
        <h4 class="font-bold text-primary text-sm mb-2 flex items-center gap-2">
          <span class="material-symbols-outlined text-lg">auto_awesome</span>
          {{ currentNote.title }}
        </h4>
        <p class="text-sm text-gray-700 leading-relaxed">{{ currentNote.content }}</p>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between">
        <button
          @click="previousNote"
          :disabled="notes.length <= 1"
          class="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span class="material-symbols-outlined text-lg">chevron_left</span>
          <span>Previous</span>
        </button>
        
        <div class="flex gap-1.5">
          <button
            v-for="(note, index) in notes"
            :key="index"
            @click="goToNote(index)"
            :class="[
              'h-2 rounded-full transition-all',
              currentIndex === index ? 'w-6 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50'
            ]"
            :title="`Go to tip ${index + 1}`"
          ></button>
        </div>

        <button
          @click="nextNote"
          :disabled="notes.length <= 1"
          class="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <span class="material-symbols-outlined text-lg">chevron_right</span>
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-4">
      <div class="text-3xl mb-2">💡</div>
      <p class="text-sm text-gray-600">No cultural notes available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface CulturalNote {
  title: string
  content: string
}

const props = defineProps<{
  notes: CulturalNote[]
  autoRotate?: boolean
  rotateInterval?: number
}>()

const currentIndex = ref(0)
let autoRotateTimer: ReturnType<typeof setInterval> | null = null

const currentNote = computed(() => {
  if (props.notes.length === 0) return null
  return props.notes[currentIndex.value]
})

function nextNote() {
  if (props.notes.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % props.notes.length
}

function previousNote() {
  if (props.notes.length === 0) return
  currentIndex.value = currentIndex.value === 0 ? props.notes.length - 1 : currentIndex.value - 1
}

function goToNote(index: number) {
  currentIndex.value = index
}

// Auto-rotate functionality
onMounted(() => {
  if (props.autoRotate && props.notes.length > 1) {
    const interval = props.rotateInterval || 10000 // Default 10 seconds
    autoRotateTimer = setInterval(() => {
      nextNote()
    }, interval)
  }
})

onUnmounted(() => {
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer)
  }
})
</script>
