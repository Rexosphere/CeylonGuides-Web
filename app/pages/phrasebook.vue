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
              class="w-full bg-transparent border-none text-charcoal placeholder:text-gray-500 focus:ring-0 h-12 px-3 text-base outline-none" 
              placeholder="Search phrases (e.g., 'How much?', 'Thank you')..."
            />
            <button class="flex items-center justify-center h-10 w-10 rounded-lg text-gray-500 hover:text-primary hover:bg-background-light transition-colors" title="Voice Search">
              <span class="material-symbols-outlined">mic</span>
            </button>
            <button class="hidden sm:flex h-10 px-6 ml-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg items-center justify-center transition-colors">
              Search
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
          <h2 class="text-2xl font-bold text-charcoal font-display">Categories</h2>
          <p class="text-gray-500 mt-1">Select a topic to start learning</p>
        </div>
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

      <!-- Categories Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        <div 
          v-for="category in categories" 
          :key="category.id"
          @click="selectCategory(category.id)"
          :class="[
            'group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-sm border cursor-pointer transition-all',
            selectedCategory === category.id 
              ? 'border-primary shadow-md bg-primary/5' 
              : 'border-gray-200 hover:border-primary hover:shadow-md'
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
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg text-primary">
              <span class="material-symbols-outlined">handshake</span>
            </div>
            <h3 class="text-xl font-bold text-charcoal font-display">Greetings & Politeness</h3>
          </div>

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

          <!-- Phrases Loops -->
          <template v-for="(phrase, index) in phrases" :key="phrase.id || index">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow gap-4">
              <div class="flex flex-col gap-1 flex-1">
                <p class="sinhala-text text-2xl font-bold text-charcoal">{{ phrase.native }}</p>
                <p class="text-sm font-bold text-primary uppercase tracking-wide">{{ phrase.phonetic }}</p>
                <p class="text-gray-500 text-sm mt-1">{{ phrase.english }}</p>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex items-center gap-2">
                <!-- Details Button -->
                <button
                  @click="openDetails(phrase.id)"
                  class="shrink-0 h-12 w-12 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all flex items-center justify-center border border-gray-200"
                  title="View details"
                >
                  <span class="material-symbols-outlined">info</span>
                </button>
                <!-- Speak Button -->
                <button 
                  @click="speakPhrase(phrase.native)"
                  class="shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-primary/20 group"
                  title="Speak this phrase"
                >
                  <span class="material-symbols-outlined">volume_up</span>
                </button>
                
                <!-- Save Button -->
                <button 
                  @click="toggleSavePhrase(phrase.id)"
                  :class="[
                    'shrink-0 h-12 w-12 rounded-full transition-all flex items-center justify-center border text-xl',
                    isSaved(phrase.id) 
                      ? 'bg-yellow-100 text-yellow-600 border-yellow-300' 
                      : 'bg-background-light text-gray-400 border-gray-200 hover:border-yellow-300 hover:text-yellow-500'
                  ]"
                  :title="isSaved(phrase.id) ? 'Remove from emergency set' : 'Save to emergency set'"
                >
                  {{ isSaved(phrase.id) ? '★' : '☆' }}
                </button>
              </div>
            </div>

            <!-- Insert Etiquette Banner after 2nd item -->
            <div v-if="index === 1" class="relative overflow-hidden rounded-2xl bg-[#10221f] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center border border-primary/20 shadow-lg my-2">
              <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl"></div>
              <div class="relative z-10 p-4 bg-white/10 backdrop-blur-md rounded-xl text-primary border border-white/10 shrink-0">
                <span class="material-symbols-outlined text-4xl">dry_cleaning</span>
              </div>
              <div class="relative z-10 flex-1 text-center sm:text-left">
                <h4 class="text-white font-bold text-lg mb-1 flex items-center justify-center sm:justify-start gap-2">
                  <span class="material-symbols-outlined text-primary text-sm">info</span>
                  Cultural Tip: Greeting
                </h4>
                <p class="text-gray-300 text-sm leading-relaxed">
                  When saying "Ayubowan", place your palms together in a prayer-like gesture at chest height. A slight bow of the head shows deeper respect.
                </p>
              </div>
            </div>
          </template>
        </div>

        <!-- Sidebar -->
        <div class="w-full lg:w-[320px] flex flex-col gap-6">
          <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm h-fit sticky top-24">
            <div class="flex items-center gap-2 mb-4 text-charcoal">
              <span class="material-symbols-outlined text-primary">temple_buddhist</span>
              <h3 class="font-bold text-lg">Temple Etiquette</h3>
            </div>
            <div class="flex flex-col gap-4">
              <div v-for="(tip, idx) in templeTips" :key="idx" class="flex gap-4 items-start">
                <div class="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></div>
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-bold text-charcoal">{{ tip.title }}</span>
                  <p class="text-xs text-text-muted leading-relaxed text-gray-500">{{ tip.desc }}</p>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-100">
                <button class="w-full py-2.5 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">
                  Read Full Guide
                </button>
              </div>
            </div>
          </div>

          <!-- Ad Card -->
          <div 
            class="rounded-2xl bg-cover bg-center h-64 relative overflow-hidden group cursor-pointer" 
            style='background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("/images/downloaded_c08da80504a7.avif");'
          >
            <div class="absolute bottom-0 left-0 p-6 w-full">
              <span class="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-2">Popular Tour</span>
              <h3 class="text-white font-bold text-xl leading-tight mb-1">Ella Tea Plantations</h3>
              <div class="flex items-center text-white/80 text-sm gap-1 group-hover:translate-x-1 transition-transform">
                <span>Book a local guide</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="closeDetails"></div>
      <div class="relative bg-white dark:bg-[#2a1d18] rounded-2xl shadow-2xl w-full max-w-md">
        <div class="border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-charcoal dark:text-white">Phrase Details</h2>
          <button @click="closeDetails" class="text-gray-400 hover:text-gray-600">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div v-if="detailsLoading" class="text-sm text-gray-500">Loading details...</div>
          <div v-else-if="detailsError" class="text-sm text-red-600">{{ detailsError }}</div>
          <div v-else-if="selectedPhrase">
            <p class="text-2xl font-bold text-charcoal">{{ selectedPhrase.english }}</p>
            <p class="text-lg text-primary mt-2">{{ selectedPhrase.sinhala }}</p>
            <p class="text-lg text-primary">{{ selectedPhrase.tamil }}</p>
            <p v-if="selectedPhrase.pronunciation" class="text-sm text-gray-500 mt-1">{{ selectedPhrase.pronunciation }}</p>
            <p v-if="selectedPhrase.cultural_context" class="text-sm text-gray-500 mt-3">{{ selectedPhrase.cultural_context }}</p>
          </div>
          <div v-else class="text-sm text-gray-500">No details available.</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { Phrase, EtiquetteTip } from '~/types/api'

const searchQuery = ref('')
const debouncedQuery = ref('')
const selectedLanguage = ref<'sinhala' | 'tamil'>('sinhala')
const selectedCategory = ref<string | null>(null)

// Debounce search input (300ms)
let debounceTimer: ReturnType<typeof setTimeout>
watch(searchQuery, (newVal) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = newVal
  }, 300)
})

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
const { data: tipsResponse } = await useFetch<{ success: boolean; data: EtiquetteTip[]; count: number }>(
  `${apiBase}/api/phrases/etiquette/tips?category=TEMPLE`
)

const phrases = computed(() => {
  const data = phrasesResponse.value?.data || []
  return data.map(p => ({
    id: p.id,
    native: selectedLanguage.value === 'sinhala' ? p.sinhala : p.tamil,
    sinhala: p.sinhala,
    tamil: p.tamil,
    phonetic: p.pronunciation,
    english: p.english,
    category: p.category,
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
})

// Watch for route query changes (e.g., user navigates with different category)
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    selectedCategory.value = newCategory as string
  }
})

// Text-to-Speech function
function speakPhrase(text: string) {
  if (!('speechSynthesis' in window)) {
    alert('Text-to-speech not supported in this browser')
    return
  }
  
  speechSynthesis.cancel() // Stop any ongoing speech
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = selectedLanguage.value === 'sinhala' ? 'si-LK' : 'ta-LK'
  utterance.rate = 0.8 // Slower for learning
  speechSynthesis.speak(utterance)
}

// Toggle save phrase
function toggleSavePhrase(phraseId: string) {
  const index = savedPhrases.value.indexOf(phraseId)
  if (index > -1) {
    savedPhrases.value.splice(index, 1)
  } else {
    savedPhrases.value.push(phraseId)
  }
  localStorage.setItem('ceylon_saved_phrases', JSON.stringify(savedPhrases.value))
}

// Check if phrase is saved
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
  EMERGENCY: 'emergency',
  TRANSPORT: 'directions_bus',
}

function formatCategoryLabel(value: string) {
  return value.replace(/_/g, ' ').toLowerCase().replace(/(^|\\s)\\S/g, (t) => t.toUpperCase())
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
    { name: 'Greetings', id: 'GREETINGS', icon: 'handshake' },
    { name: 'Directions', id: 'DIRECTIONS', icon: 'explore' },
    { name: 'Dining', id: 'DINING', icon: 'restaurant' },
    { name: 'Shopping', id: 'SHOPPING', icon: 'shopping_bag' },
    { name: 'Emergency', id: 'EMERGENCY', icon: 'emergency' },
    { name: 'Transport', id: 'TRANSPORT', icon: 'directions_bus' },
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
    const response = await $fetch<{ success: boolean; data: Phrase }>(`${apiBase}/api/phrases/${id}`)
    if (response.success) {
      selectedPhrase.value = response.data
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

// Add custom font for Sinhala text
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;700&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
  ]
})
</script>

<style scoped>
.sinhala-text {
  font-family: "Noto Serif Sinhala", serif;
}
</style>
