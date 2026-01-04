<template>
  <div class="flex-1">
    <!-- Loading State -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin size-10 border-3 border-coral-orange border-t-transparent rounded-full mb-4"></div>
      <p class="text-gray-500">Searching...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!query" class="text-center py-20">
      <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">search</span>
      <h2 class="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">Start Your Search</h2>
      <p class="text-gray-500">Search for destinations, restaurants, phrases, and more</p>
    </div>

    <!-- No Results -->
    <div v-else-if="results.length === 0" class="text-center py-20">
      <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
      <h2 class="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">No results found</h2>
      <p class="text-gray-500">Try different keywords or filters</p>
    </div>

    <!-- Results -->
    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">
          {{ totalCount }} results for "<span class="text-coral-orange">{{ query }}</span>"
        </h2>
      </div>

      <div class="space-y-4">
        <NuxtLink
          v-for="result in results"
          :key="`${result.type}-${result.id}`"
          :to="result.link"
          class="block bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-coral-orange/20 group"
        >
          <div class="flex gap-4">
            <!-- Type Icon -->
            <div :class="[
              'size-12 rounded-xl flex items-center justify-center shrink-0',
              getTypeColor(result.type)
            ]">
              <span class="material-symbols-outlined text-white">{{ getTypeIcon(result.type) }}</span>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span :class="['text-xs font-medium px-2 py-0.5 rounded-full capitalize', getTypeBadge(result.type)]">
                  {{ result.type }}
                </span>
                <span v-if="result.extra?.rating" class="text-xs text-gray-500 flex items-center gap-1">
                  <span class="material-symbols-outlined text-amber-500 text-sm">star</span>
                  {{ result.extra.rating.toFixed(1) }}
                </span>
                <span v-if="result.extra?.severity" :class="['text-xs font-medium px-2 py-0.5 rounded-full', getSeverityClass(result.extra.severity)]">
                  {{ result.extra.severity }}
                </span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 dark:text-white group-hover:text-coral-orange transition-colors truncate">
                {{ result.title }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm truncate">{{ result.subtitle }}</p>
            </div>

            <!-- Arrow -->
            <div class="flex items-center">
              <span class="material-symbols-outlined text-gray-400 group-hover:text-coral-orange group-hover:translate-x-1 transition-all">
                arrow_forward
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SearchResult {
  type: 'scam' | 'phrase' | 'restaurant' | 'facility' | 'destination' | 'activity'
  id: string
  title: string
  subtitle: string
  link: string
  extra?: Record<string, any>
}

const route = useRoute()
const config = useRuntimeConfig()

const query = computed(() => (route.query.q as string) || '')
const type = computed(() => (route.query.type as string) || 'all')

const { data: searchResponse, pending } = await useFetch<{
  success: boolean
  query: string
  results: SearchResult[]
  count: number
  total: number
}>(() => {
  if (!query.value) return null as any
  const params = new URLSearchParams({ q: query.value, type: type.value, limit: '30' })
  return `${config.public.apiBase}/api/search?${params}`
}, {
  watch: [query, type],
  immediate: true,
})

const results = computed(() => searchResponse.value?.results || [])
const totalCount = computed(() => searchResponse.value?.total || 0)

function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    destination: 'place',
    restaurant: 'restaurant',
    phrase: 'translate',
    scam: 'warning',
    activity: 'hiking',
    facility: 'apartment',
  }
  return icons[type] || 'search'
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    destination: 'bg-emerald-500',
    restaurant: 'bg-coral-orange',
    phrase: 'bg-blue-500',
    scam: 'bg-red-500',
    activity: 'bg-purple-500',
    facility: 'bg-gray-500',
  }
  return colors[type] || 'bg-gray-500'
}

function getTypeBadge(type: string): string {
  const badges: Record<string, string> = {
    destination: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    restaurant: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    phrase: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    scam: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    activity: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    facility: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
  }
  return badges[type] || 'bg-gray-100 text-gray-700'
}

function getSeverityClass(severity: string): string {
  const classes: Record<string, string> = {
    LOW: 'bg-yellow-100 text-yellow-700',
    MEDIUM: 'bg-orange-100 text-orange-700',
    HIGH: 'bg-red-100 text-red-700',
    CRITICAL: 'bg-red-200 text-red-800',
  }
  return classes[severity] || 'bg-gray-100 text-gray-700'
}
</script>
