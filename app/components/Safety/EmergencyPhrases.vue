<template>
  <div
    class="bg-card-light dark:bg-card-dark rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
          <span class="material-icons text-primary text-2xl">translate</span>
        </div>
        <div>
          <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Emergency Phrases</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">Local language assistance for critical situations</p>
        </div>
      </div>
      <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id" :class="[
          'px-4 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition',
          selectedCategory === category.id
            ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
        ]">
          {{ category.name }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="phrase in filteredPhrases" :key="phrase.id"
        class="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:border-primary/50 dark:hover:border-primary/50 transition duration-300">
        <div class="mb-4">
          <p class="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">English</p>
          <p class="text-lg font-bold text-slate-900 dark:text-white">{{ phrase.english }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Sinhala</p>
            <p class="text-xl text-primary font-medium mb-1">{{ phrase.sinhala }}</p>
            <p class="text-xs text-slate-500 italic">"{{ phrase.sinhalaPhonetic }}"</p>
          </div>
          <div>
            <p class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Tamil</p>
            <p class="text-xl text-primary font-medium mb-1">{{ phrase.tamil }}</p>
            <p class="text-xs text-slate-500 italic">"{{ phrase.tamilPhonetic }}"</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button @click="copyPhrase(phrase)"
            class="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition">
            <span class="material-icons text-sm">content_copy</span> Copy
          </button>
          <button
            class="w-10 py-2 rounded-lg border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 flex items-center justify-center transition">
            <span class="material-icons text-lg">volume_up</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Phrase {
  id: number
  category: string
  english: string
  sinhala: string
  sinhalaPhonetic: string
  tamil: string
  tamilPhonetic: string
}

const categories = [
  { id: 'sos', name: 'SOS / Urgent' },
  { id: 'medical', name: 'Medical' },
  { id: 'police', name: 'Police' },
  { id: 'directions', name: 'Directions' }
]

const selectedCategory = ref('sos')

const phrases: Phrase[] = [
  {
    id: 1,
    category: 'sos',
    english: 'Help!',
    sinhala: 'උදව්!',
    sinhalaPhonetic: 'Udavv!',
    tamil: 'உதவி!',
    tamilPhonetic: 'Udavi!'
  },
  {
    id: 2,
    category: 'sos',
    english: 'I need help',
    sinhala: 'මට උදව් ඕන',
    sinhalaPhonetic: 'Mata udaw ona',
    tamil: 'எனக்கு உதவி தேவை',
    tamilPhonetic: 'Enakku udavi devai'
  },
  {
    id: 3,
    category: 'sos',
    english: 'Can you help me?',
    sinhala: 'මට උදව් කරන්න පුලුවන්ද?',
    sinhalaPhonetic: 'Mata udaw karanna puluwanda?',
    tamil: 'உங்களால் உதவ முடியுமா?',
    tamilPhonetic: 'Ungalal udava mudiyuma?'
  },
  {
    id: 4,
    category: 'medical',
    english: 'Where is the hospital?',
    sinhala: 'රෝහල කොහෙද?',
    sinhalaPhonetic: 'Rohala koheda?',
    tamil: 'மருத்துவமனை எங்கே?',
    tamilPhonetic: 'Maruttuvamanai enge?'
  },
  {
    id: 5,
    category: 'medical',
    english: 'I need a doctor',
    sinhala: 'මට ඩොක්ටර්කෙනෙක් ඕන',
    sinhalaPhonetic: 'Mata doctor kenek ona',
    tamil: 'எனக்கு மருத்துவர் தேவை',
    tamilPhonetic: 'Enakku maruttuvar devai'
  },
  {
    id: 6,
    category: 'police',
    english: 'Call the police',
    sinhala: 'පොලිසියට කතා කරන්න',
    sinhalaPhonetic: 'Polisiyata katha karanna',
    tamil: 'காவல்துறையை அழைக்கவும்',
    tamilPhonetic: 'Kavalthuraiyai azhaikavum'
  },
  {
    id: 7,
    category: 'directions',
    english: 'Where is this?',
    sinhala: 'මේක කොහෙද?',
    sinhalaPhonetic: 'Meka koheda?',
    tamil: 'இது எங்கே?',
    tamilPhonetic: 'Ithu enge?'
  }
]

const filteredPhrases = computed(() => {
  return phrases.filter(phrase => phrase.category === selectedCategory.value)
})

const copyPhrase = async (phrase: Phrase) => {
  const text = `${phrase.english}\nSinhala: ${phrase.sinhala} (${phrase.sinhalaPhonetic})\nTamil: ${phrase.tamil} (${phrase.tamilPhonetic})`
  try {
    await navigator.clipboard.writeText(text)
    alert('Phrase copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>
