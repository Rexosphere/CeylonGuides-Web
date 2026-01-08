<template>
  <div class="w-full">
    <!-- Hero Section -->
    <PhrasebookHero :background-image="heroBackground" @search="handleSearch" />

    <!-- Main Content Container -->
    <main class="flex-grow max-w-[1440px] mx-auto w-full px-4 md:px-6 py-8 -mt-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <!-- Left Sidebar -->
        <PhrasebookSidebar :daily-phrases="dailyPhrases" @shuffle="shuffleDailyPhrases" @select-phrase="openDetails"
          @start-quiz="startQuiz" @download="downloadOffline" />

        <!-- Main Content -->
        <section class="lg:col-span-6 space-y-6">
          <!-- Category Filter & Language Toggle -->
          <PhrasebookCategoryFilter :category-name="currentCategoryName" :phrase-count="phrases.length"
            :selected-language="selectedLanguage" :categories="categoryButtons" @select-language="handleLanguageChange"
            @select-category="selectCategory" @toggle-learning-mode="toggleLearningMode" />

          <!-- Phrases List -->
          <div class="space-y-4">
            <PhrasebookPhraseCard v-for="phrase in displayPhrases" :key="phrase.id" :phrase="phrase"
              :badge="phrase.category === 'EMERGENCY' ? 'Emergency' : undefined"
              :is-emergency="phrase.category === 'EMERGENCY'" :is-favorite="isSaved(phrase.id)"
              :show-decoration="phrase.category === 'EMERGENCY'" @play-audio="speakPhrase"
              @toggle-favorite="toggleSavePhrase" @show-info="openDetails" />
          </div>
        </section>

        <!-- Right Sidebar -->
        <PhrasebookRightSidebar :context-text="contextText" :cultural-tip="culturalTip"
          :related-phrases="relatedPhrases" :progress="userProgress" :category-progress="categoryProgress"
          :recent-activity="recentActivity" @select-phrase="openDetails" @refresh-progress="refreshProgress" />
      </div>
    </main>
  </div>

  <!-- Details Modal -->
  <Teleport to="body">
    <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeDetails">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div class="relative bg-white dark:bg-[#2a1d18] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white dark:bg-[#2a1d18] border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 class="text-xl font-bold text-charcoal dark:text-white">Phrase Details</h2>
          <button @click="closeDetails" class="text-gray-400 hover:text-gray-600 transition-colors">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div v-if="detailsLoading" class="text-sm text-gray-500">Loading details...</div>
          <div v-else-if="detailsError" class="text-sm text-red-600">{{ detailsError }}</div>
          <div v-else-if="selectedPhrase">
            <p class="text-2xl font-bold text-charcoal">{{ selectedPhrase.english }}</p>
            <p class="text-lg text-primary mt-2 sinhala-text">{{ selectedPhrase.sinhala || selectedPhrase.sinhala_native }}</p>
            <p class="text-lg text-primary">{{ selectedPhrase.tamil || selectedPhrase.tamil_native }}</p>
            <p v-if="selectedPhrase.pronunciation" class="text-sm text-gray-500 mt-1">{{ selectedPhrase.pronunciation }}
            </p>
            <p v-if="selectedPhrase.cultural_note || selectedPhrase.cultural_context" class="text-sm text-gray-500 mt-3">{{
              selectedPhrase.cultural_note || selectedPhrase.cultural_context }}</p>
          </div>
          <div v-else class="text-sm text-gray-500">No details available.</div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Learning Mode Modal -->
  <PhrasebookLearningMode :is-open="showLearningMode" :phrases="learningModePhrases"
    :category-name="currentCategoryName" @close="closeLearningMode" @complete="onLearningModeComplete" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useSpeech } from '~/composables/useSpeech'
import { useToast } from '~/composables/useToast'
import phrasebookDataImport from '~/assets/data/phrasebook.json'

// Import components
import PhraseQuiz from '~/components/Shared/PhraseQuiz.vue'
import PhraseProgress from '~/components/Shared/PhraseProgress.vue'
import CulturalTips from '~/components/Shared/CulturalTips.vue'
import CulturalNotes from '~/components/Shared/CulturalNotes.vue'

// Types
import type { Phrase as ApiPhrase } from '~/types/api'

interface Phrase {
  id: string
  phraseId?: string
  sinhala_native?: string
  sinhala_latin?: string
  tamil_native?: string
  tamil_latin?: string
  native: string
  romanized: string
  phonetic: string
  sinhala: string
  tamil: string
  english: string
  pronunciation: string
  category: string
  cultural_context?: string
  cultural_note?: string
  usage_tips?: string
  priority?: number
  emergency_flag?: boolean
}

// Composables
const speech = useSpeech()
const toast = useToast()
const router = useRouter()

// Data
const phrasebookData = phrasebookDataImport as {
  categories: Array<{ id: string; name: string; icon: string; description: string }>
  phrases: Phrase[]
  etiquette_tips: Array<{
    title: string
    do: string[]
    dont: string[]
    icon: string
  }>
  cultural_notes: Array<{ title: string; description: string; icon: string }>
}

// State
const searchQuery = ref('')
const debouncedQuery = ref('')
const selectedLanguage = ref<'sinhala' | 'tamil' | 'both'>('sinhala')
const selectedCategory = ref<string | null>(null)
const favoritePhrases = ref<string[]>([])
const progressTracker = ref<InstanceType<typeof PhraseProgress> | null>(null)
const playingPhraseId = ref<string | null>(null)
const quickLearnPhrases = ref<Phrase[]>([])
const lastShuffleDate = ref<string>('')

// Learning Mode state
const isLearningMode = ref(false)
const learningModeCategory = ref<string | null>(null)
const currentLearningIndex = ref(0)
const isTranslationRevealed = ref(false)
const learnedPhrases = ref<string[]>([])

// Get config
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const { data: categoriesResponse } = await useFetch<{
  success: boolean
  data: Array<{ category: string; count: number }>
}>(`${apiBase}/api/phrases/categories/list`)

// Fetch phrases from API (watches debounced query, not raw input)
const { data: phrasesResponse, pending: phrasesPending } = await useFetch<{ success: boolean; data: Phrase[]; count: number }>(
  () => {
    const params = new URLSearchParams()
    if (selectedCategory.value) params.set('category', selectedCategory.value)
    if (debouncedQuery.value) params.set('search', debouncedQuery.value)
    const queryStr = params.toString()
    return `${apiBase}/api/phrases${queryStr ? `?${queryStr}` : ''}`
  },
  { watch: [selectedCategory, debouncedQuery] }
)

// Fetch etiquette tips from API
import type { EtiquetteTip } from '~/types/api'
const { data: tipsResponse } = await useFetch<{ success: boolean; data: EtiquetteTip[]; count: number }>(
  `${apiBase}/api/phrases/etiquette/tips?category=TEMPLE`
)

const phrases = computed((): Phrase[] => {
  const data = phrasesResponse.value?.data || []
  return data.map(p => ({
    id: p.id,
    native: selectedLanguage.value === 'sinhala' ? p.sinhala : p.tamil,
    romanized: p.pronunciation?.split(' / ')[0] || p.pronunciation || '',
    sinhala: p.sinhala,
    tamil: p.tamil,
    phonetic: p.pronunciation || '',
    pronunciation: p.pronunciation || '',
    english: p.english,
    category: p.category,
    cultural_note: p.cultural_context,
    cultural_context: p.cultural_context,
  }))
})

// Saved phrases state
const savedPhrases = ref<string[]>([])

const showDetailsModal = ref(false)
const detailsLoading = ref(false)
const detailsError = ref('')
const selectedPhrase = ref<Phrase | null>(null)

// Read route for query params
const route = useRoute()

onMounted(() => {
  // Load saved phrases from localStorage
  const saved = localStorage.getItem('ceylon_saved_phrases')
  if (saved) {
    try {
      savedPhrases.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse saved phrases:', e)
    }
  }

  // Read category from URL query param
  if (route.query.category) {
    selectedCategory.value = route.query.category as string
  }

  // Handle ?id= deep-link to auto-open phrase details
  if (route.query.id) {
    openDetails(route.query.id as string)
  }
})

// Watch for route query changes (e.g., user navigates with different category)
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    selectedCategory.value = newCategory as string
  }
})

// Text-to-Speech function
function speakPhrase(phraseId: string) {
  const phrase = phrases.value.find(p => p.id === phraseId)
  if (!phrase) return

  if (!('speechSynthesis' in window)) {
    alert('Text-to-speech not supported in this browser')
    return
  }

  speechSynthesis.cancel() // Stop any ongoing speech
  const utterance = new SpeechSynthesisUtterance(phrase.native)
  utterance.lang = selectedLanguage.value === 'sinhala' ? 'si-LK' : 'ta-LK'
  utterance.rate = 0.8 // Slower for learning
  speechSynthesis.speak(utterance)
}

// Watch for speech ending to clear playing state
watch(() => speech.isSpeaking.value, (isSpeaking) => {
  if (!isSpeaking) {
    playingPhraseId.value = null
  }
})

function toggleSavePhrase(phraseId: string) {
  const index = savedPhrases.value.indexOf(phraseId)
  if (index > -1) {
    savedPhrases.value.splice(index, 1)
    toast.info('Removed from emergency set')
  } else {
    savedPhrases.value.push(phraseId)
    toast.success('Added to emergency set')
  }
  localStorage.setItem('ceylon_saved_phrases', JSON.stringify(savedPhrases.value))
}

function isSaved(phraseId: string): boolean {
  return savedPhrases.value.includes(phraseId)
}

const templeTips = computed(() => {
  const data = tipsResponse.value?.data || []
  return data.map(t => ({
    title: t.title,
    desc: t.description,
    do_list: t.do_list,
    dont_list: t.dont_list,
  }))
})

const categoryIconMap: Record<string, string> = {
  GREETINGS: 'handshake',
  DIRECTIONS: 'explore',
  DINING: 'restaurant',
  SHOPPING: 'shopping_bag',
  EMERGENCY: 'medical_services',
  TRANSPORT: 'directions_bus',
  COMMON_EXPRESSIONS: 'chat_bubble',
}

function getCategoryName(categoryId: string): string {
  const category = phrasebookData.categories.find(c => c.id === categoryId)
  return category?.name || categoryId
}

function formatCategoryLabel(category: string): string {
  return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 text-charcoal font-bold">$1</mark>')
}

const categories = computed(() => {
  const apiList = categoriesResponse.value?.data || []
  if (apiList.length) {
    return apiList.map((item) => ({
      name: formatCategoryLabel(item.category),
      id: item.category,
      icon: categoryIconMap[item.category] || 'translate'
    }))
  }
  return [
    { name: 'Greetings & Politeness', id: 'GREETINGS', icon: 'handshake' },
    { name: 'Asking for Directions', id: 'DIRECTIONS', icon: 'explore' },
    { name: 'Food & Dining', id: 'DINING', icon: 'restaurant' },
    { name: 'Shopping & Bargaining', id: 'SHOPPING', icon: 'shopping_bag' },
    { name: 'Emergency & Safety', id: 'EMERGENCY', icon: 'medical_services' },
    { name: 'Transport', id: 'TRANSPORT', icon: 'directions_bus' },
    { name: 'Common Expressions', id: 'COMMON_EXPRESSIONS', icon: 'chat_bubble' },
  ]
})

function selectCategory(id: string | null) {
  selectedCategory.value = selectedCategory.value === id ? null : id
}

async function openDetails(id: string) {
  showDetailsModal.value = true
  detailsLoading.value = true
  detailsError.value = ''
  try {
    const response = await $fetch<{ success: boolean; data: ApiPhrase }>(`${apiBase}/api/phrases/${id}`)
    if (response.success) {
      selectedPhrase.value = {
        ...response.data,
        native: selectedLanguage.value === 'sinhala' ? response.data.sinhala : response.data.tamil,
        romanized: response.data.pronunciation?.split(' / ')[0] || response.data.pronunciation || '',
        phonetic: response.data.pronunciation || '',
        sinhala: response.data.sinhala,
        tamil: response.data.tamil,
        cultural_note: response.data.cultural_context
      }
    }
  } catch (err: any) {
    detailsError.value = err?.data?.error || 'Failed to load phrase details.'
  } finally {
    detailsLoading.value = false
  }
}

function closeDetails() {
  showDetailsModal.value = false
  selectedPhrase.value = null
}

// New component data and methods
const heroBackground = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpt66VBieVQZbQQywVqdZQYUYLqgKDfRscce78zRB76eM9X6_fJl1dAS63wMPhTYR91nYQMzdzBQdN615E3hyF3H0FWWHCOVRvZPy2NDcQT0JAHAicCCfIHzg8pmteMkOIizGv9thyePZX44RkMVI-JQq5hchWR8ox9cpTLPpNQ3yRTHsx6O7-_B8k1HyozCmRotLCVCYTuzDhX2_0-xf_hdxIcUSuZN-voWUVkvpJwqZaOCF3f6lnYYV2-rHQ6m-0krpTcHO3xIM'

const handleSearch = (query: string) => {
  debouncedQuery.value = query
}

// Daily phrases for sidebar
const dailyPhrases = computed(() => {
  return phrases.value.slice(0, 4).map(p => ({
    id: p.id || '',
    english: p.english || '',
    pronunciation: p.pronunciation || ''
  }))
})

const shuffleDailyPhrases = () => {
  // Shuffle logic would go here - for now just a placeholder
  console.log('Shuffling daily phrases')
}

const startQuiz = () => {
  console.log('Starting quiz')
  // Navigate to quiz page or open quiz modal
}

const downloadOffline = () => {
  console.log('Downloading offline content')
  // Implement offline download
}

// Category filter data
const currentCategoryName = computed(() => {
  if (!selectedCategory.value) return 'All Categories'
  const cat = categories.value.find(c => c.id === selectedCategory.value)
  return cat?.name || 'All Categories'
})

const categoryButtons = computed(() => {
  return categories.value.map(cat => ({
    id: cat.id,
    name: cat.name.replace('&', '&amp;').replace(/\n/g, '<br/>'),
    icon: cat.icon,
    isActive: selectedCategory.value === cat.id,
    badge: cat.id === 'EMERGENCY' ? 'QUICK ACCESS' : undefined
  }))
})

const handleLanguageChange = (language: string) => {
  selectedLanguage.value = language as 'sinhala' | 'tamil' | 'both'
}


// Display phrases for main content
const displayPhrases = computed(() => {
  return phrases.value
})

// Right sidebar data
const contextText = computed(() => {
  if (selectedCategory.value === 'EMERGENCY') {
    return 'Use these loudly and clearly. Locals will help immediately. Keep your phone charged and emergency contacts saved.'
  }
  return 'Practice these phrases in context. Pay attention to tone and body language for better communication.'
})

const culturalTip = computed(() => {
  if (selectedCategory.value === 'EMERGENCY') {
    return 'People will respond quickly to cries for help.'
  }
  return 'Sri Lankans appreciate when visitors make an effort to speak the local language, even if imperfectly.'
})

const relatedPhrases = computed(() => {
  return phrases.value.slice(0, 4).map(p => ({
    id: p.id || '',
    english: p.english || '',
    pronunciation: p.pronunciation || ''
  }))
})

const userProgress = computed(() => ({
  practiced: savedPhrases.value.length,
  percentage: Math.round((savedPhrases.value.length / Math.max(phrases.value.length, 1)) * 100),
  mastered: 0,
  learning: savedPhrases.value.length,
  new: phrases.value.length - savedPhrases.value.length
}))

const categoryProgress = computed(() => {
  return categories.value.map(cat => {
    const totalInCategory = phrases.value.filter(p => p.category === cat.id).length
    const completedInCategory = phrases.value.filter(p => p.category === cat.id && p.id && savedPhrases.value.includes(p.id)).length
    return {
      name: cat.name,
      completed: completedInCategory,
      total: totalInCategory,
      percentage: totalInCategory > 0 ? Math.round((completedInCategory / totalInCategory) * 100) : 0
    }
  })
})

const recentActivity = computed(() => {
  return savedPhrases.value.slice(0, 5).map((id, index) => {
    const phrase = phrases.value.find(p => p.id === id)
    return {
      id,
      phrase: phrase?.english || 'Unknown phrase',
      time: index === 0 ? '7m ago' : '1h ago'
    }
  })
})

const refreshProgress = () => {
  console.log('Refreshing progress')
  // Implement progress refresh
}

// Learning Mode state and methods
const showLearningMode = ref(false)

const learningModePhrases = computed(() => {
  // Return phrases for the current category, or all phrases if no category selected
  if (selectedCategory.value) {
    return phrases.value.filter(p => p.category === selectedCategory.value)
  }
  return phrases.value
})

const toggleLearningMode = () => {
  showLearningMode.value = true
}

const closeLearningMode = () => {
  showLearningMode.value = false
}

const onLearningModeComplete = () => {
  console.log('Learning mode completed!')
  // Could show a congratulations message or update progress
  showLearningMode.value = false
}


// Add custom font for Sinhala text
useHead({
  title: 'Phrasebook - Learn Sinhala & Tamil | CeylonGuides',
  meta: [
    { name: 'description', content: 'Master essential Sinhala and Tamil phrases for your Sri Lanka trip. Interactive audio, cultural tips, and emergency phrases.' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;700&family=Noto+Sans+Tamil:wght@400;700&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
  ]
})
</script>

<style scoped>
.sinhala-text {
  font-family: "Noto Serif Sinhala", "Noto Sans Tamil", serif;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
</style>
