<template>
  <section id="social-etiquette" class="space-y-4">
    <!-- Header & Filters -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-3">
      <!-- Type Filter -->
      <div class="flex bg-neutral-100 dark:bg-[#1a120e] rounded-lg p-0.5">
        <button
          v-for="filter in filterOptions"
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="px-3 py-1.5 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary"
          :class="activeFilter === filter.value 
            ? 'bg-white dark:bg-[#2a1d18] text-primary shadow-sm' 
            : 'text-neutral-500 hover:text-neutral-700'"
        >
          {{ filter.label }}
          <span class="ml-1 text-[10px] opacity-60">({{ getFilterCount(filter.value) }})</span>
        </button>
      </div>

      <!-- Search -->
      <div class="flex-1 relative">
        <span class="material-symbols-outlined absolute left-3 top-2 text-neutral-400 text-lg" aria-hidden="true">search</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search customs..."
          class="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#2a1d18] border border-neutral-200 dark:border-[#3a2d28] rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          aria-label="Search cultural customs"
        />
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="card in filteredCards"
        :key="card.id"
        :id="card.id"
        class="group bg-white dark:bg-[#2a1d18] rounded-xl border-2 p-4 transition-all hover:shadow-md"
        :class="[
          card.type === 'do' 
            ? 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-300' 
            : card.type === 'dont'
            ? 'border-red-200 dark:border-red-800 hover:border-red-300'
            : 'border-amber-200 dark:border-amber-800 hover:border-amber-300'
        ]"
      >
        <!-- Card Header -->
        <div class="flex items-start gap-3">
          <div 
            class="p-2 rounded-lg flex-shrink-0"
            :class="[
              card.type === 'do' 
                ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                : card.type === 'dont'
                ? 'bg-red-100 dark:bg-red-900/30'
                : 'bg-amber-100 dark:bg-amber-900/30'
            ]"
          >
            <span 
              class="material-symbols-outlined"
              :class="[
                card.type === 'do' 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : card.type === 'dont'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-amber-600 dark:text-amber-400'
              ]"
              aria-hidden="true"
            >
              {{ card.icon }}
            </span>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span 
                class="text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide"
                :class="[
                  card.type === 'do' 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' 
                    : card.type === 'dont'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
                ]"
              >
                {{ card.type === 'do' ? 'Do' : card.type === 'dont' ? "Don't" : 'Info' }}
              </span>
              <h4 class="font-bold text-neutral-800 dark:text-white text-sm truncate">{{ card.title }}</h4>
            </div>

            <!-- Bullets -->
            <ul class="mt-2 space-y-1">
              <li 
                v-for="(bullet, idx) in card.bullets.slice(0, 3)" 
                :key="idx"
                class="flex items-start gap-1.5 text-xs text-neutral-600 dark:text-neutral-400"
              >
                <span 
                  class="material-symbols-outlined text-xs mt-0.5 flex-shrink-0"
                  :class="[
                    card.type === 'do' ? 'text-emerald-500' : card.type === 'dont' ? 'text-red-500' : 'text-amber-500'
                  ]"
                  aria-hidden="true"
                >
                  {{ card.type === 'do' ? 'check' : card.type === 'dont' ? 'close' : 'info' }}
                </span>
                {{ bullet }}
              </li>
            </ul>

            <!-- Tags -->
            <div v-if="card.tags?.length" class="flex flex-wrap gap-1 mt-2">
              <span 
                v-for="tag in card.tags" 
                :key="tag"
                class="text-[10px] px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Share Button -->
          <button
            @click="shareCard(card.id)"
            class="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
            :aria-label="`Share ${card.title} guideline`"
            :title="copiedId === card.id ? 'Copied!' : 'Copy link'"
          >
            <span class="material-symbols-outlined text-sm text-neutral-400" aria-hidden="true">
              {{ copiedId === card.id ? 'check' : 'link' }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredCards.length === 0" class="text-center py-8">
      <span class="material-symbols-outlined text-4xl text-neutral-300 mb-2" aria-hidden="true">search_off</span>
      <p class="text-neutral-500 text-sm">No customs match your search</p>
      <button @click="clearFilters" class="mt-2 text-primary text-xs hover:underline">
        Clear filters
      </button>
    </div>

    <!-- Results Count -->
    <p v-if="searchQuery || activeFilter !== 'all'" class="text-xs text-neutral-400 text-center">
      Showing {{ filteredCards.length }} of {{ allCards.length }} guidelines
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { quickGuidelines, getDoGuidelines, getDontGuidelines, getInfoGuidelines } from '~/data/culturePageData'
import type { GuidelineCard } from '~/types/culture'

// State
const activeFilter = ref<'all' | 'do' | 'dont' | 'info'>('all')
const searchQuery = ref('')
const copiedId = ref<string | null>(null)

// Filter options
const filterOptions = [
  { value: 'all' as const, label: 'All' },
  { value: 'do' as const, label: "Do's" },
  { value: 'dont' as const, label: "Don'ts" },
  { value: 'info' as const, label: 'Info' },
]

// All cards from data
const allCards = computed<GuidelineCard[]>(() => quickGuidelines)

// Get filter count
function getFilterCount(filter: 'all' | 'do' | 'dont' | 'info'): number {
  if (filter === 'all') return allCards.value.length
  return allCards.value.filter(c => c.type === filter).length
}

// Filtered cards
const filteredCards = computed(() => {
  let result = allCards.value

  // Type filter
  if (activeFilter.value !== 'all') {
    result = result.filter(c => c.type === activeFilter.value)
  }

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c =>
      c.title.toLowerCase().includes(query) ||
      c.bullets.some(b => b.toLowerCase().includes(query)) ||
      c.tags?.some(t => t.toLowerCase().includes(query))
    )
  }

  return result
})

// Clear filters
function clearFilters() {
  activeFilter.value = 'all'
  searchQuery.value = ''
}

// Share card (copy link)
async function shareCard(cardId: string) {
  const url = `${window.location.origin}${window.location.pathname}#${cardId}`
  
  try {
    await navigator.clipboard.writeText(url)
    copiedId.value = cardId
    
    // Reset after 2 seconds
    setTimeout(() => {
      copiedId.value = null
    }, 2000)
  } catch (e) {
    console.warn('Failed to copy link:', e)
  }
}
</script>
