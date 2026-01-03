<template>
  <div class="bg-gradient-to-r from-coral-orange to-orange-600 py-8">
    <div class="max-w-4xl mx-auto px-6">
      <form @submit.prevent="handleSearch" class="relative">
        <div class="flex gap-3">
          <div class="flex-1 relative">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search destinations, restaurants, phrases..."
              class="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 backdrop-blur text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
              @input="handleInputChange"
            />
            <!-- Suggestions dropdown -->
            <div 
              v-if="showSuggestions && suggestions.length > 0"
              class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl overflow-hidden z-50"
            >
              <button
                v-for="(sug, idx) in suggestions"
                :key="idx"
                type="button"
                @click="selectSuggestion(sug.text)"
                class="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b last:border-0"
              >
                <span class="material-symbols-outlined text-gray-400 text-sm">{{ getTypeIcon(sug.type) }}</span>
                <span class="text-gray-800">{{ sug.text }}</span>
                <span class="ml-auto text-xs text-gray-400 capitalize">{{ sug.type }}</span>
              </button>
            </div>
          </div>
          <button
            type="submit"
            class="px-8 py-4 bg-white text-coral-orange font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <span class="material-symbols-outlined">search</span>
            Search
          </button>
        </div>
        
        <!-- Filter chips -->
        <div class="flex flex-wrap gap-2 mt-4">
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            @click="selectedType = filter.value"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              selectedType === filter.value 
                ? 'bg-white text-coral-orange' 
                : 'bg-white/20 text-white hover:bg-white/30'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const searchQuery = ref((route.query.q as string) || '')
const selectedType = ref((route.query.type as string) || 'all')
const suggestions = ref<{ text: string; type: string }[]>([])
const showSuggestions = ref(false)

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Destinations', value: 'destinations' },
  { label: 'Restaurants', value: 'dining' },
  { label: 'Phrases', value: 'phrases' },
  { label: 'Scam Alerts', value: 'scams' },
  { label: 'Activities', value: 'activities' },
]

function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    destination: 'place',
    dining: 'restaurant',
    phrase: 'translate',
    scam: 'warning',
    activity: 'hiking',
    facility: 'apartment',
  }
  return icons[type] || 'search'
}

async function handleInputChange() {
  if (searchQuery.value.length < 1) {
    suggestions.value = []
    showSuggestions.value = false
    return
  }

  try {
    const response = await $fetch<{ success: boolean; suggestions: { text: string; type: string }[] }>(
      `${config.public.apiBase}/api/search/suggestions?q=${encodeURIComponent(searchQuery.value)}`
    )
    if (response.success) {
      suggestions.value = response.suggestions
      showSuggestions.value = true
    }
  } catch (e) {
    // Ignore suggestion errors
  }
}

function selectSuggestion(text: string) {
  searchQuery.value = text
  showSuggestions.value = false
  handleSearch()
}

function handleSearch() {
  showSuggestions.value = false
  if (!searchQuery.value.trim()) return
  
  router.push({
    path: '/search',
    query: {
      q: searchQuery.value,
      type: selectedType.value !== 'all' ? selectedType.value : undefined,
    },
  })
}

// Close suggestions when clicking outside
onMounted(() => {
  document.addEventListener('click', () => {
    showSuggestions.value = false
  })
})
</script>
