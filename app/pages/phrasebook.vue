<template>
  <div class="w-full">
    <!-- Hero Section -->
    <div class="relative w-full">
      <div 
        class="flex min-h-[420px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 relative" 
        style='background-image: linear-gradient(rgba(16, 34, 31, 0.4) 0%, rgba(16, 34, 31, 0.7) 100%), url("/images/downloaded_e51794257d3d.avif");'
      >
        <div class="flex flex-col gap-3 text-center max-w-[720px] z-10 pt-20">
          <h1 class="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg font-display">
            Speak Like a Local
          </h1>
          <p class="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Connect deeply with Sri Lanka. Master essential phrases and learn the cultural etiquette that opens hearts.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="w-full max-w-[560px] z-10 mt-4">
          <div class="flex w-full items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-2 border border-white/20">
            <div class="flex items-center justify-center pl-3 text-gray-500">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input 
              v-model="searchQuery"
              @input="handleSearch"
              class="w-full bg-transparent border-none text-charcoal placeholder:text-gray-500 focus:ring-0 h-12 px-3 text-base outline-none" 
              placeholder="Search phrases (e.g., 'How much?', 'Thank you')..."
            />
            <button 
              v-if="searchQuery"
              @click="clearSearch"
              class="flex items-center justify-center h-10 w-10 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors" 
              title="Clear search"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="flex flex-col items-center px-4 md:px-10 lg:px-40 py-10 gap-12 w-full max-w-[1440px] mx-auto">
      
      <!-- Language Toggle & Controls -->
      <div class="flex flex-col md:flex-row w-full justify-between items-center gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 class="text-2xl font-bold text-charcoal font-display">{{ activeCategory ? activeCategory.name : 'All Phrases' }}</h2>
          <p class="text-gray-500 mt-1">
            {{ filteredPhrases.length }} phrase{{ filteredPhrases.length !== 1 ? 's' : '' }} found
            <span v-if="searchQuery"> for "{{ searchQuery }}"</span>
          </p>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
            <label 
              v-for="lang in ['Sinhala', 'Tamil']" 
              :key="lang"
              class="cursor-pointer"
            >
              <input 
                type="radio" 
                name="lang" 
                :value="lang.toLowerCase()" 
                v-model="selectedLanguage"
                class="peer sr-only"
              />
              <div class="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-500 peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-sm transition-all flex items-center gap-2">
                <span>{{ lang }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        <div 
          v-for="category in phrasebookData.categories" 
          :key="category.id"
          @click="selectCategory(category.id)"
          :class="[
            'group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-sm border cursor-pointer transition-all',
            selectedCategory === category.id 
              ? 'border-primary shadow-md bg-primary/5 scale-105' 
              : 'border-gray-200 hover:border-primary hover:shadow-md hover:scale-105'
          ]"
        >
          <div :class="[
            'h-12 w-12 rounded-full flex items-center justify-center transition-colors',
            selectedCategory === category.id
              ? 'bg-primary text-white'
              : 'bg-background-light text-primary group-hover:bg-primary group-hover:text-white'
          ]">
            <span class="material-symbols-outlined text-2xl">{{ category.icon }}</span>
          </div>
          <span class="text-charcoal font-bold text-sm text-center">{{ category.name }}</span>
        </div>
      </div>

      <!-- Content Area -->
      <div class="w-full flex flex-col lg:flex-row gap-8">
        
        <!-- Phrases List -->
        <div class="flex-1 flex flex-col gap-6">
          <!-- Emergency Phrase Set Banner -->
          <div v-if="savedPhrases.length > 0" class="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="text-2xl">⭐</span>
              <div>
                <h4 class="font-bold text-yellow-900">Emergency Phrase Set</h4>
                <p class="text-sm text-yellow-700">{{ savedPhrases.length }} phrase{{ savedPhrases.length > 1 ? 's' : '' }} saved for quick access</p>
              </div>
            </div>
            <NuxtLink 
              to="/safety-mode"
              class="shrink-0 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Use in Safety Mode
            </NuxtLink>
          </div>

          <!-- Loading State -->
          <div v-if="false" class="space-y-4">
            <div v-for="i in 3" :key="i" class="animate-pulse">
              <div class="h-24 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>

          <!-- No Results -->
          <div v-else-if="filteredPhrases.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-bold text-charcoal mb-2">No phrases found</h3>
            <p class="text-gray-600">Try adjusting your search or filter criteria</p>
            <button
              @click="clearSearch"
              class="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>

          <!-- Phrases -->
          <template v-else>
            <div
              v-for="(phrase, index) in filteredPhrases"
              :key="phrase.phraseId"
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all gap-4 group"
            >
              <div class="flex flex-col gap-2 flex-1 min-w-0">
                <!-- Badge for practice level -->
                <div class="flex items-center gap-2 flex-wrap">
                  <span
                    v-if="getPhraseLevel(phrase.phraseId) === 'mastered'"
                    class="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold"
                  >
                    <span class="material-symbols-outlined text-xs">check_circle</span>
                    Mastered
                  </span>
                  <span
                    v-else-if="getPhraseLevel(phrase.phraseId) === 'learning'"
                    class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold"
                  >
                    <span class="material-symbols-outlined text-xs">school</span>
                    Learning
                  </span>
                  <span v-if="phrase.emergency_flag" class="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                    <span class="material-symbols-outlined text-xs">emergency</span>
                    Emergency
                  </span>
                </div>

                <p 
                  class="sinhala-text text-2xl font-bold text-charcoal truncate"
                  v-html="highlightText(
                    selectedLanguage === 'sinhala' ? phrase.sinhala_native : phrase.tamil_native,
                    searchQuery
                  )"
                ></p>
                <p 
                  class="text-sm font-bold text-primary uppercase tracking-wide"
                  v-html="highlightText(phrase.pronunciation, searchQuery)"
                ></p>
                <p 
                  class="text-gray-600 text-sm"
                  v-html="highlightText(phrase.english, searchQuery)"
                ></p>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex items-center gap-2 shrink-0">
                <!-- Speak Button -->
                <button 
                  @click="speakPhrase(phrase)"
                  :disabled="!speech.isSupported"
                  :class="[
                    'h-12 w-12 rounded-full transition-all flex items-center justify-center border',
                    speech.isSpeaking
                      ? 'bg-primary text-white border-primary'
                      : 'bg-primary/10 text-primary hover:bg-primary hover:text-white border-primary/20'
                  ]"
                  title="Speak this phrase"
                >
                  <span class="material-symbols-outlined">
                    {{ speech.isSpeaking ? 'stop' : 'volume_up' }}
                  </span>
                </button>
                
                <!-- Save Button -->
                <button 
                  @click="toggleSavePhrase(phrase.phraseId)"
                  :class="[
                    'h-12 w-12 rounded-full transition-all flex items-center justify-center border text-xl',
                    isSaved(phrase.phraseId) 
                      ? 'bg-yellow-100 text-yellow-600 border-yellow-300 hover:bg-yellow-200' 
                      : 'bg-background-light text-gray-400 border-gray-200 hover:border-yellow-300 hover:text-yellow-500'
                  ]"
                  :title="isSaved(phrase.phraseId) ? 'Remove from emergency set' : 'Save to emergency set'"
                >
                  {{ isSaved(phrase.phraseId) ? '★' : '☆' }}
                </button>

                <!-- Details Button -->
                <button
                  @click="openDetails(phrase)"
                  class="h-12 w-12 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all flex items-center justify-center border border-gray-200"
                  title="View details"
                >
                  <span class="material-symbols-outlined">info</span>
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Sidebar -->
        <div class="w-full lg:w-[380px] flex flex-col gap-6">
          <!-- Progress Tracker -->
          <PhraseProgress
            ref="progressTracker"
            :phrases="phrasebookData.phrases"
            :categories="phrasebookData.categories"
          />

          <!-- Quiz Component -->
          <PhraseQuiz
            v-if="filteredPhrases.length >= 4"
            :phrases="filteredPhrases"
            :language="selectedLanguage"
          />

          <!-- Cultural Tips -->
          <CulturalTips
            v-if="culturalTipsForCategory.length > 0"
            :tips="culturalTipsForCategory"
            :category="selectedCategory || undefined"
          />

          <!-- Cultural Notes Carousel -->
          <CulturalNotes
            :notes="phrasebookData.cultural_notes"
            :autoRotate="true"
            :rotateInterval="12000"
          />

          <!-- Quick Actions Card -->
          <div class="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white shadow-lg">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined">bolt</span>
              Quick Actions
            </h3>
            <div class="space-y-3">
              <NuxtLink
                to="/safety-mode"
                class="block w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-center font-medium backdrop-blur-sm border border-white/20"
              >
                🚨 Emergency Mode
              </NuxtLink>
              <NuxtLink
                to="/transport"
                class="block w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-center font-medium backdrop-blur-sm border border-white/20"
              >
                🚖 Transport Helper
              </NuxtLink>
              <NuxtLink
                to="/scam-alerts"
                class="block w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-center font-medium backdrop-blur-sm border border-white/20"
              >
                ⚠️ Scam Alerts
              </NuxtLink>
            </div>
          </div>

          <!-- Download Offline Card -->
          <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div class="flex items-start gap-4 mb-4">
              <div class="p-3 bg-blue-100 rounded-xl text-blue-600">
                <span class="material-symbols-outlined text-2xl">cloud_download</span>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-charcoal">Offline Access</h3>
                <p class="text-sm text-gray-600 mt-1">Save phrases for offline use</p>
              </div>
            </div>
            <button
              @click="downloadOfflineData"
              class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              Download All Phrases
            </button>
            <p class="text-xs text-gray-500 mt-2 text-center">
              Access saved phrases without internet
            </p>
          </div>
        </div>
      
      </div>
    </div>
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
        <div v-if="selectedPhrase" class="p-6 space-y-6">
          <!-- Main Phrase Info -->
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">
              <span class="material-symbols-outlined text-sm">{{ getCategoryIcon(selectedPhrase.category) }}</span>
              {{ getCategoryName(selectedPhrase.category) }}
            </div>
            
            <h3 class="text-3xl font-bold text-charcoal dark:text-white">{{ selectedPhrase.english }}</h3>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div class="flex-1">
                  <p class="text-xs text-gray-500 font-medium mb-1">SINHALA</p>
                  <p class="sinhala-text text-2xl font-bold text-charcoal dark:text-white">{{ selectedPhrase.sinhala_native }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ selectedPhrase.sinhala_latin }}</p>
                </div>
                <button
                  @click="() => selectedPhrase && speech.speak(selectedPhrase.sinhala_native, { lang: 'sinhala' })"
                  class="shrink-0 h-10 w-10 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center justify-center"
                >
                  <span class="material-symbols-outlined text-lg">volume_up</span>
                </button>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div class="flex-1">
                  <p class="text-xs text-gray-500 font-medium mb-1">TAMIL</p>
                  <p class="sinhala-text text-2xl font-bold text-charcoal dark:text-white">{{ selectedPhrase.tamil_native }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ selectedPhrase.tamil_latin }}</p>
                </div>
                <button
                  @click="() => selectedPhrase && speech.speak(selectedPhrase.tamil_native, { lang: 'tamil' })"
                  class="shrink-0 h-10 w-10 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center justify-center"
                >
                  <span class="material-symbols-outlined text-lg">volume_up</span>
                </button>
              </div>
            </div>

            <div class="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <p class="text-xs text-primary font-bold uppercase tracking-wide mb-1">Pronunciation</p>
              <p class="text-lg font-medium text-charcoal dark:text-white">{{ selectedPhrase.pronunciation }}</p>
            </div>
          </div>

          <!-- Cultural Context -->
          <div v-if="selectedPhrase.cultural_note" class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-blue-600 text-xl mt-0.5">info</span>
              <div class="flex-1">
                <p class="text-xs text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wide mb-1">Cultural Note</p>
                <p class="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">{{ selectedPhrase.cultural_note }}</p>
              </div>
            </div>
          </div>

          <!-- Usage Tips -->
          <div v-if="selectedPhrase.usage_tips" class="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-green-600 text-xl mt-0.5">lightbulb</span>
              <div class="flex-1">
                <p class="text-xs text-green-700 dark:text-green-400 font-bold uppercase tracking-wide mb-1">Usage Tips</p>
                <p class="text-sm text-green-900 dark:text-green-200 leading-relaxed">{{ selectedPhrase.usage_tips }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button
              @click="toggleSavePhrase(selectedPhrase.phraseId)"
              :class="[
                'flex-1 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2',
                isSaved(selectedPhrase.phraseId)
                  ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
              ]"
            >
              <span class="text-xl">{{ isSaved(selectedPhrase.phraseId) ? '★' : '☆' }}</span>
              <span>{{ isSaved(selectedPhrase.phraseId) ? 'Saved' : 'Save' }}</span>
            </button>
            <button
              @click="markPhraseAsPracticed(selectedPhrase.phraseId)"
              class="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">check_circle</span>
              <span>Mark Practiced</span>
            </button>
          </div>
        </div>
        <div v-else class="p-6 text-center text-gray-500">
          <p>No details available.</p>
        </div>
      </div>
    </div>
  </Teleport>
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

// Composables
const speech = useSpeech()
const toast = useToast()
const route = useRoute()

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
const selectedLanguage = ref<'sinhala' | 'tamil'>('sinhala')
const selectedCategory = ref<string | null>(null)
const savedPhrases = ref<string[]>([])
const showDetailsModal = ref(false)
const selectedPhrase = ref<Phrase | null>(null)
const progressTracker = ref<InstanceType<typeof PhraseProgress> | null>(null)

// Computed
const activeCategory = computed(() => {
  return phrasebookData.categories.find(c => c.id === selectedCategory.value)
})

const filteredPhrases = computed(() => {
  let result = phrasebookData.phrases

  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.english.toLowerCase().includes(query) ||
      p.sinhala_native.includes(query) ||
      p.tamil_native.includes(query) ||
      p.sinhala_latin.toLowerCase().includes(query) ||
      p.tamil_latin.toLowerCase().includes(query) ||
      p.pronunciation.toLowerCase().includes(query)
    )
  }

  return result
})

const culturalTipsForCategory = computed(() => {
  // Since etiquette_tips don't have categories, just return all tips
  return phrasebookData.etiquette_tips
})

// Methods
function selectCategory(id: string | null) {
  selectedCategory.value = selectedCategory.value === id ? null : id
}

function handleSearch() {
  // Debouncing is handled by the user typing
}

function clearSearch() {
  searchQuery.value = ''
  selectedCategory.value = null
}

function speakPhrase(phrase: Phrase) {
  const text = selectedLanguage.value === 'sinhala' ? phrase.sinhala_native : phrase.tamil_native
  speech.speak(text, { lang: selectedLanguage.value, rate: 0.8 })
  
  // Mark as practiced
  if (progressTracker.value) {
    progressTracker.value.markPracticed(phrase.phraseId)
  }
}

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

function openDetails(phrase: Phrase) {
  selectedPhrase.value = phrase
  showDetailsModal.value = true
}

function closeDetails() {
  showDetailsModal.value = false
  selectedPhrase.value = null
}

function markPhraseAsPracticed(phraseId: string) {
  if (progressTracker.value) {
    progressTracker.value.markPracticed(phraseId)
    toast.success('Marked as practiced!')
    closeDetails()
  }
}

function getPhraseLevel(phraseId: string): 'new' | 'learning' | 'mastered' {
  return progressTracker.value?.getPhraseLevel(phraseId) || 'new'
}

function getCategoryIcon(categoryId: string): string {
  const category = phrasebookData.categories.find(c => c.id === categoryId)
  return category?.icon || 'translate'
}

function getCategoryName(categoryId: string): string {
  const category = phrasebookData.categories.find(c => c.id === categoryId)
  return category?.name || categoryId
}

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 text-charcoal font-bold">$1</mark>')
}

function downloadOfflineData() {
  try {
    const dataStr = JSON.stringify(phrasebookData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ceylonguides-phrasebook.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('Phrasebook downloaded!')
  } catch (error) {
    console.error('Download failed:', error)
    toast.error('Failed to download')
  }
}

// Lifecycle
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
})

// Watch for route query changes
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    selectedCategory.value = newCategory as string
  }
})

// SEO
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
</style>
