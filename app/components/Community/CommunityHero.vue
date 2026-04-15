<template>
  <section class="relative bg-background-dark min-h-[400px] flex items-center justify-center text-center overflow-hidden px-4">
    <!-- Background Image -->
    <div class="absolute inset-0 select-none pointer-events-none">
      <img src="https://images.unsplash.com/photo-1540454378-d56ee6073792?auto=format&fit=crop&q=80" alt="Sri Lanka Tea Plantation" class="w-full h-full object-cover opacity-40">
      <div class="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/50 to-background-light dark:to-background-dark"></div>
    </div>
    
    <div class="relative z-10 max-w-3xl w-full flex flex-col items-center gap-6 mt-12">
      <div class="space-y-2">
        <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
          Join the <span class="text-primary">Ceylon</span> Community
        </h1>
        <p class="text-gray-300 text-lg md:text-xl font-light max-w-xl mx-auto drop-shadow-md">
          Connect with travelers, find buddies, and get tips from locals.
        </p>
      </div>
      
      <!-- Search Bar -->
      <div class="w-full max-w-2xl relative group" v-click-outside="closeSuggestions">
        <div class="relative flex items-center">
            <span class="absolute left-4 material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              v-model="searchQuery"
              @input="handleInput"
              @focus="showSuggestions = true"
              type="text" 
              placeholder="Search discussions, places, or people..."
              class="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/15 transition-all shadow-xl"
            >
            <button v-if="searchQuery" @click="clearSearch" class="absolute right-4 text-gray-400 hover:text-white">
               <span class="material-symbols-outlined text-lg">close</span>
            </button>
        </div>

        <!-- Autocomplete Dropdown -->
        <div v-if="showSuggestions && (suggestions.length > 0 || !searchQuery)" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-card-dark rounded-xl shadow-2xl border border-border-color dark:border-neutral-700 overflow-hidden text-left z-50">
           <!-- Empty State: Trending Chips -->
           <div v-if="!searchQuery" class="p-4">
             <p class="text-xs font-bold text-text-muted uppercase mb-3">Trending Searches</p>
             <div class="flex flex-wrap gap-2">
               <button 
                 v-for="term in ['Ella Train', 'Safari', 'Visa Fees', 'Surfing']" 
                 :key="term"
                 @click="applySearch(term)"
                 class="px-3 py-1.5 bg-background-light dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-sm text-text-secondary dark:text-gray-300 transition-colors"
               >
                 {{ term }}
               </button>
             </div>
           </div>

           <!-- Suggestions List -->
           <div v-else class="py-2">
              <button 
                v-for="sug in suggestions" 
                :key="sug"
                @click="applySearch(sug)"
                class="w-full px-4 py-2 hover:bg-neutral-50 dark:hover:bg-white/5 flex items-center gap-3 text-sm text-text-main dark:text-gray-200 transition-colors"
              >
                <span class="material-symbols-outlined text-text-secondary text-lg">history</span>
                {{ sug }}
              </button>
           </div>
        </div>
      </div>
      
      <!-- Filter Chips -->
      <div class="backdrop-blur-md bg-white/80 dark:bg-black/40 border border-white/20 rounded-xl shadow-md px-3 py-2">
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="filter in ['All', 'Posts', 'People', 'Guides']"
            :key="filter"
            @click="searchFilter = filter as any"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md"
            :class="searchFilter === filter
              ? 'bg-brand-primary-700 text-white'
              : 'bg-white/70 text-black hover:bg-white'"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCommunity } from '~/composables/useCommunity'

const { searchQuery, setSearch, searchFilter, suggestions } = useCommunity()
const showSuggestions = ref(false)

function handleInput() {
  setSearch(searchQuery.value)
  showSuggestions.value = true
}

function applySearch(term: string) {
  setSearch(term)
  showSuggestions.value = false
}

function clearSearch() {
  setSearch('')
}

function closeSuggestions() {
  showSuggestions.value = false
}

// v-click-outside directive
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = function(event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};
</script>
