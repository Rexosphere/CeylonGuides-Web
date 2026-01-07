<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary/10 rounded-lg text-primary">
          <span class="material-symbols-outlined">military_tech</span>
        </div>
        <div>
          <h3 class="font-bold text-lg text-charcoal">Your Progress</h3>
          <p class="text-sm text-gray-500">{{ totalPracticed }} phrases practiced</p>
        </div>
      </div>
      <button
        v-if="totalPracticed > 0"
        @click="resetProgress"
        class="text-sm text-gray-500 hover:text-red-600 transition-colors"
        title="Reset progress"
      >
        <span class="material-symbols-outlined text-lg">restart_alt</span>
      </button>
    </div>

    <!-- Overall Progress -->
    <div class="mb-6">
      <div class="flex items-center justify-between text-sm mb-2">
        <span class="text-gray-600 font-medium">Overall Mastery</span>
        <span class="text-primary font-bold">{{ overallProgress }}%</span>
      </div>
      <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
          :style="{ width: `${overallProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-3 gap-3 mb-6">
      <div class="text-center p-3 bg-green-50 rounded-xl border border-green-200">
        <div class="text-2xl font-bold text-green-900">{{ masteredCount }}</div>
        <div class="text-xs text-green-700 font-medium mt-1">Mastered</div>
      </div>
      <div class="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
        <div class="text-2xl font-bold text-blue-900">{{ learningCount }}</div>
        <div class="text-xs text-blue-700 font-medium mt-1">Learning</div>
      </div>
      <div class="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
        <div class="text-2xl font-bold text-gray-900">{{ newCount }}</div>
        <div class="text-xs text-gray-600 font-medium mt-1">New</div>
      </div>
    </div>

    <!-- Category Breakdown -->
    <div class="space-y-3">
      <h4 class="text-sm font-bold text-charcoal flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-lg">category</span>
        By Category
      </h4>
      <div class="space-y-2">
        <div
          v-for="cat in categoryProgress"
          :key="cat.category"
          class="flex items-center gap-3"
        >
          <div class="flex-1">
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="font-medium text-gray-700">{{ cat.name }}</span>
              <span class="text-gray-500">{{ cat.practiced }}/{{ cat.total }}</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-primary transition-all duration-300"
                :style="{ width: `${cat.percentage}%` }"
              ></div>
            </div>
          </div>
          <div
            v-if="cat.percentage === 100"
            class="shrink-0 text-yellow-500"
            title="Category completed!"
          >
            <span class="material-symbols-outlined text-xl">workspace_premium</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div v-if="recentActivity.length > 0" class="mt-6 pt-6 border-t border-gray-200">
      <h4 class="text-sm font-bold text-charcoal mb-3 flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-lg">history</span>
        Recent Activity
      </h4>
      <div class="space-y-2">
        <div
          v-for="activity in recentActivity.slice(0, 5)"
          :key="activity.timestamp"
          class="flex items-start gap-2 text-xs"
        >
          <span
            :class="[
              'material-symbols-outlined text-sm mt-0.5',
              activity.level === 'mastered' ? 'text-green-600' : 'text-blue-600'
            ]"
          >
            {{ activity.level === 'mastered' ? 'check_circle' : 'school' }}
          </span>
          <div class="flex-1">
            <p class="text-gray-900 font-medium">{{ activity.phrase }}</p>
            <p class="text-gray-500">{{ formatTime(activity.timestamp) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Motivation Message -->
    <div v-if="totalPracticed > 0" class="mt-6 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
      <p class="text-sm text-primary font-medium text-center">
        {{ motivationMessage }}
      </p>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-8">
      <div class="text-4xl mb-3">🎯</div>
      <p class="text-gray-600 text-sm">
        Start practicing phrases to track your progress!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface PhraseProgress {
  phraseId: string
  phrase: string
  category: string
  practiceCount: number
  lastPracticed: number
  level: 'new' | 'learning' | 'mastered'
}

interface Activity {
  phraseId: string
  phrase: string
  timestamp: number
  level: 'learning' | 'mastered'
}

const props = defineProps<{
  phrases: Array<{
    phraseId: string
    category: string
    english: string
    sinhala_native: string
    tamil_native: string
  }>
  categories: Array<{
    id: string
    name: string
  }>
}>()

const progress = ref<Record<string, PhraseProgress>>({})
const recentActivity = ref<Activity[]>([])

// Load progress from localStorage
onMounted(() => {
  const stored = localStorage.getItem('ceylon_phrase_progress')
  if (stored) {
    try {
      progress.value = JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse progress:', e)
    }
  }

  const storedActivity = localStorage.getItem('ceylon_phrase_activity')
  if (storedActivity) {
    try {
      recentActivity.value = JSON.parse(storedActivity)
    } catch (e) {
      console.error('Failed to parse activity:', e)
    }
  }
})

// Computed stats
const totalPracticed = computed(() => {
  return Object.keys(progress.value).length
})

const masteredCount = computed(() => {
  return Object.values(progress.value).filter(p => p.level === 'mastered').length
})

const learningCount = computed(() => {
  return Object.values(progress.value).filter(p => p.level === 'learning').length
})

const newCount = computed(() => {
  return props.phrases.length - totalPracticed.value
})

const overallProgress = computed(() => {
  if (props.phrases.length === 0) return 0
  return Math.round((totalPracticed.value / props.phrases.length) * 100)
})

const categoryProgress = computed(() => {
  return props.categories.map(cat => {
    const categoryPhrases = props.phrases.filter(p => p.category === cat.id)
    const practiced = categoryPhrases.filter(p => progress.value[p.phraseId]).length
    
    return {
      category: cat.id,
      name: cat.name,
      total: categoryPhrases.length,
      practiced,
      percentage: categoryPhrases.length > 0 ? Math.round((practiced / categoryPhrases.length) * 100) : 0
    }
  }).filter(cat => cat.total > 0)
})

const motivationMessage = computed(() => {
  const percent = overallProgress.value
  if (percent === 100) return '🎉 Amazing! You\'ve mastered all phrases!'
  if (percent >= 80) return '🌟 Almost there! Keep up the excellent work!'
  if (percent >= 60) return '💪 Great progress! You\'re doing fantastic!'
  if (percent >= 40) return '📚 Halfway there! Keep practicing!'
  if (percent >= 20) return '🚀 Good start! Consistency is key!'
  return '🎯 Every phrase brings you closer to fluency!'
})

// Methods
function markPracticed(phraseId: string) {
  const phrase = props.phrases.find(p => p.phraseId === phraseId)
  if (!phrase) return

  if (!progress.value[phraseId]) {
    progress.value[phraseId] = {
      phraseId,
      phrase: phrase.english,
      category: phrase.category,
      practiceCount: 1,
      lastPracticed: Date.now(),
      level: 'learning'
    }
  } else {
    progress.value[phraseId].practiceCount++
    progress.value[phraseId].lastPracticed = Date.now()
    
    // Upgrade to mastered after 5 practices
    if (progress.value[phraseId].practiceCount >= 5) {
      progress.value[phraseId].level = 'mastered'
    }
  }

  // Add to activity (only for learning/mastered, not 'new')
  if (progress.value[phraseId].level !== 'new') {
    recentActivity.value.unshift({
      phraseId,
      phrase: phrase.english,
      timestamp: Date.now(),
      level: progress.value[phraseId].level as 'learning' | 'mastered'
    })
  }

  // Keep only last 20 activities
  if (recentActivity.value.length > 20) {
    recentActivity.value = recentActivity.value.slice(0, 20)
  }

  // Save to localStorage
  localStorage.setItem('ceylon_phrase_progress', JSON.stringify(progress.value))
  localStorage.setItem('ceylon_phrase_activity', JSON.stringify(recentActivity.value))
}

function getPhraseLevel(phraseId: string): 'new' | 'learning' | 'mastered' {
  return progress.value[phraseId]?.level || 'new'
}

function getPracticeCount(phraseId: string): number {
  return progress.value[phraseId]?.practiceCount || 0
}

function resetProgress() {
  if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
    progress.value = {}
    recentActivity.value = []
    localStorage.removeItem('ceylon_phrase_progress')
    localStorage.removeItem('ceylon_phrase_activity')
  }
}

function formatTime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

// Expose methods to parent
defineExpose({
  markPracticed,
  getPhraseLevel,
  getPracticeCount
})
</script>
