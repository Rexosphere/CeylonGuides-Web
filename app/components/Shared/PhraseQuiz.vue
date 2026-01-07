<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-white/20 rounded-lg">
            <span class="material-symbols-outlined text-2xl">quiz</span>
          </div>
          <div>
            <h3 class="text-xl font-bold">Phrase Quiz</h3>
            <p class="text-white/80 text-sm">Test your knowledge!</p>
          </div>
        </div>
        <button
          v-if="!isActive && !showResults"
          @click="startQuiz"
          class="px-6 py-2.5 bg-white text-primary rounded-lg font-bold hover:bg-white/90 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>

    <!-- Quiz Content -->
    <div class="p-6">
      <!-- Not Started State -->
      <div v-if="!isActive && !showResults" class="text-center py-8">
        <div class="text-6xl mb-4">🎯</div>
        <p class="text-gray-600 mb-4">
          Ready to test your phrase knowledge?<br />
          You'll get {{ quizSize }} random phrases to translate!
        </p>
        <div class="flex flex-col gap-2 items-center text-sm text-gray-500">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
            <span>Multiple choice questions</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-lg">volume_up</span>
            <span>Audio pronunciation</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-lg">emoji_events</span>
            <span>Track your score</span>
          </div>
        </div>
      </div>

      <!-- Active Quiz -->
      <div v-else-if="isActive && currentQuestion" class="space-y-6">
        <!-- Progress -->
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-600 font-medium">
            Question {{ currentQuestionIndex + 1 }} of {{ quizQuestions.length }}
          </span>
          <span class="text-primary font-bold">Score: {{ score }}/{{ currentQuestionIndex }}</span>
        </div>

        <!-- Progress Bar -->
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-primary transition-all duration-300"
            :style="{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }"
          ></div>
        </div>

        <!-- Question Card -->
        <div class="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
          <p class="text-sm text-primary font-bold uppercase tracking-wide mb-2">Translate this phrase:</p>
          <div class="flex items-center gap-4">
            <p class="text-2xl font-bold text-charcoal flex-1">{{ props.language === 'sinhala' ? currentQuestion.phrase.sinhala_native : currentQuestion.phrase.tamil_native }}</p>
            <button
              @click="playAudio(currentQuestion.phrase)"
              class="shrink-0 h-12 w-12 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center justify-center shadow-md"
              title="Listen to pronunciation"
            >
              <span class="material-symbols-outlined">volume_up</span>
            </button>
          </div>
          <p class="text-sm text-gray-600 mt-2 italic">{{ currentQuestion.phrase.pronunciation }}</p>
        </div>

        <!-- Answer Options -->
        <div class="space-y-3">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(option)"
            :disabled="answered"
            :class="[
              'w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3',
              answered && option === currentQuestion.correctAnswer
                ? 'bg-green-50 border-green-500 text-green-900'
                : answered && option === selectedAnswer && option !== currentQuestion.correctAnswer
                  ? 'bg-red-50 border-red-500 text-red-900'
                  : answered
                    ? 'bg-gray-50 border-gray-200 text-gray-500'
                    : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5 text-charcoal cursor-pointer'
            ]"
          >
            <div
              :class="[
                'flex items-center justify-center h-8 w-8 rounded-full font-bold text-sm shrink-0',
                answered && option === currentQuestion.correctAnswer
                  ? 'bg-green-500 text-white'
                  : answered && option === selectedAnswer && option !== currentQuestion.correctAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600'
              ]"
            >
              <span v-if="!answered">{{ String.fromCharCode(65 + index) }}</span>
              <span v-else-if="option === currentQuestion.correctAnswer" class="material-symbols-outlined text-lg">check</span>
              <span v-else-if="option === selectedAnswer" class="material-symbols-outlined text-lg">close</span>
              <span v-else>{{ String.fromCharCode(65 + index) }}</span>
            </div>
            <span class="font-medium">{{ option }}</span>
          </button>
        </div>

        <!-- Feedback -->
        <div v-if="answered" class="space-y-4">
          <div
            :class="[
              'p-4 rounded-xl flex items-start gap-3',
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            ]"
          >
            <span
              :class="[
                'material-symbols-outlined text-2xl',
                selectedAnswer === currentQuestion.correctAnswer ? 'text-green-600' : 'text-red-600'
              ]"
            >
              {{ selectedAnswer === currentQuestion.correctAnswer ? 'check_circle' : 'cancel' }}
            </span>
            <div class="flex-1">
              <p
                :class="[
                  'font-bold mb-1',
                  selectedAnswer === currentQuestion.correctAnswer ? 'text-green-900' : 'text-red-900'
                ]"
              >
                {{ selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect' }}
              </p>
              <p class="text-sm text-gray-700">
                {{ currentQuestion.phrase.english }}
                <span v-if="selectedAnswer !== currentQuestion.correctAnswer">
                  = <strong>{{ currentQuestion.correctAnswer }}</strong>
                </span>
              </p>
              <p v-if="currentQuestion.phrase.cultural_note" class="text-xs text-gray-600 mt-2 italic">
                💡 {{ currentQuestion.phrase.cultural_note }}
              </p>
            </div>
          </div>

          <button
            @click="nextQuestion"
            class="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            {{ currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results' }}
          </button>
        </div>
      </div>

      <!-- Results -->
      <div v-else-if="showResults" class="text-center py-8 space-y-6">
        <!-- Score Display -->
        <div class="space-y-4">
          <div class="text-6xl">{{ scoreEmoji }}</div>
          <h3 class="text-3xl font-bold text-charcoal">{{ scoreMessage }}</h3>
          <div class="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <span class="text-3xl font-bold text-primary">{{ score }}</span>
            <span class="text-gray-600">/</span>
            <span class="text-xl text-gray-600">{{ quizQuestions.length }}</span>
          </div>
        </div>

        <!-- Score Breakdown -->
        <div class="flex justify-center gap-4 flex-wrap">
          <div class="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-xs text-green-700 font-medium">Correct</p>
            <p class="text-2xl font-bold text-green-900">{{ score }}</p>
          </div>
          <div class="px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-xs text-red-700 font-medium">Incorrect</p>
            <p class="text-2xl font-bold text-red-900">{{ quizQuestions.length - score }}</p>
          </div>
          <div class="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-xs text-blue-700 font-medium">Accuracy</p>
            <p class="text-2xl font-bold text-blue-900">{{ accuracy }}%</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 justify-center">
          <button
            @click="restartQuiz"
            class="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <span class="material-symbols-outlined">refresh</span>
            <span>Try Again</span>
          </button>
          <button
            @click="closeQuiz"
            class="px-6 py-3 bg-white border-2 border-gray-300 text-charcoal rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSpeech } from '~/composables/useSpeech'

interface Phrase {
  phraseId: string
  category: string
  english: string
  sinhala_native: string
  sinhala_latin: string
  tamil_native: string
  tamil_latin: string
  pronunciation: string
  cultural_note?: string
  usage_tips?: string
  priority: number
  emergency_flag: boolean
}

interface QuizQuestion {
  phrase: Phrase
  options: string[]
  correctAnswer: string
}

const props = defineProps<{
  phrases: Phrase[]
  language: 'sinhala' | 'tamil'
}>()

const emit = defineEmits<{
  close: []
}>()

const { speak } = useSpeech()

// Quiz state
const isActive = ref(false)
const showResults = ref(false)
const currentQuestionIndex = ref(0)
const score = ref(0)
const quizQuestions = ref<QuizQuestion[]>([])
const selectedAnswer = ref<string | null>(null)
const answered = ref(false)
const quizSize = 10

// Display language (opposite of learning language)
const displayLang = computed(() => {
  return props.language === 'sinhala' ? 'sinhala' : 'tamil'
})

const currentQuestion = computed(() => {
  return quizQuestions.value[currentQuestionIndex.value] || null
})

const accuracy = computed(() => {
  if (quizQuestions.value.length === 0) return 0
  return Math.round((score.value / quizQuestions.value.length) * 100)
})

const scoreEmoji = computed(() => {
  if (accuracy.value === 100) return '🏆'
  if (accuracy.value >= 80) return '🌟'
  if (accuracy.value >= 60) return '👍'
  if (accuracy.value >= 40) return '📚'
  return '💪'
})

const scoreMessage = computed(() => {
  if (accuracy.value === 100) return 'Perfect Score!'
  if (accuracy.value >= 80) return 'Excellent Work!'
  if (accuracy.value >= 60) return 'Good Job!'
  if (accuracy.value >= 40) return 'Keep Practicing!'
  return 'Keep Learning!'
})

function startQuiz() {
  // Shuffle and select random phrases
  const shuffled = [...props.phrases].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, Math.min(quizSize, props.phrases.length))

  // Generate questions
  quizQuestions.value = selected.map(phrase => {
    const correctAnswer = phrase.english

    // Get wrong answers from other phrases
    const wrongAnswers = props.phrases
      .filter(p => p.phraseId !== phrase.phraseId && p.english !== phrase.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(p => p.english)

    // Mix and shuffle options
    const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5)

    return {
      phrase,
      options,
      correctAnswer
    }
  })

  isActive.value = true
  showResults.value = false
  currentQuestionIndex.value = 0
  score.value = 0
  answered.value = false
  selectedAnswer.value = null
}

function selectAnswer(answer: string) {
  if (answered.value) return

  selectedAnswer.value = answer
  answered.value = true

  if (answer === currentQuestion.value?.correctAnswer) {
    score.value++
  }
}

function nextQuestion() {
  if (currentQuestionIndex.value < quizQuestions.value.length - 1) {
    currentQuestionIndex.value++
    answered.value = false
    selectedAnswer.value = null
  } else {
    showResults.value = true
    isActive.value = false
  }
}

function restartQuiz() {
  startQuiz()
}

function closeQuiz() {
  isActive.value = false
  showResults.value = false
  currentQuestionIndex.value = 0
  score.value = 0
  quizQuestions.value = []
  emit('close')
}

function playAudio(phrase: Phrase) {
  const text = props.language === 'sinhala' ? phrase.sinhala_native : phrase.tamil_native
  speak(text, { lang: props.language, rate: 0.8 })
}
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
