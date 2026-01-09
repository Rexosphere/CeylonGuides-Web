<template>
  <div class="relative w-full">
    <div class="relative flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-6 lg:p-12" 
         role="img" 
         aria-label="Misty tea plantations in Sri Lanka with golden sunrise light" 
         style='background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("/images/downloaded_de679f9bc051.avif");'>
      <div class="max-w-3xl w-full flex flex-col items-center gap-5 text-center z-10 animate-fade-in-up">
        
        <!-- Badge -->
        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white ring-1 ring-inset ring-white/20 uppercase tracking-wider">
          <span class="material-symbols-outlined text-[16px] text-primary-400">assistant_navigation</span> 
          Visa Assistant 2026
        </span>

        <h1 class="text-white text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-sm">
          Visa & Entry<br class="hidden sm:block" /> Requirements
        </h1>
        
        <p class="text-white/90 text-base sm:text-xl max-w-2xl font-normal leading-relaxed drop-shadow-md">
          Check the latest fees, ETA rules, and exemption status for your nationality.
        </p>

        <!-- Search Box Container -->
        <div class="w-full max-w-md mt-6 relative" v-click-outside="closeDropdown">
          <label class="relative flex items-center w-full h-16 bg-white dark:bg-card-dark rounded-2xl shadow-2xl overflow-visible group focus-within:ring-4 focus-within:ring-primary/20 transition-all z-20">
            <div class="pl-5 pr-3 text-text-secondary flex items-center justify-center">
              <span class="material-symbols-outlined text-2xl group-focus-within:text-primary transition-colors">public</span>
            </div>
            <input
              v-model="searchInput"
              @input="handleInput"
              @focus="showDropdown = true"
              class="w-full h-full border-none bg-transparent text-text-main dark:text-white placeholder:text-text-secondary/60 focus:ring-0 text-lg font-medium"
              placeholder="I am a citizen of..."
              autocomplete="off"
            />
            <div class="pr-2" v-if="searchInput">
              <button 
                @click="clearSearch"
                class="p-2 text-text-secondary hover:text-red-500 transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </label>

          <!-- Autocomplete Dropdown -->
          <div 
            v-if="showDropdown && filteredCountries.length > 0"
            class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-card-dark rounded-xl shadow-xl max-h-64 overflow-y-auto z-30 border border-neutral-100 dark:border-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-800"
          >
            <button
              v-for="country in filteredCountries"
              :key="country"
              @click="selectCountry(country)"
              class="w-full px-5 py-3 text-left hover:bg-bg-light dark:hover:bg-neutral-800 transition-colors flex items-center justify-between group"
            >
              <span class="text-text-main dark:text-white font-medium">{{ country }}</span>
              <span class="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { countries } from '~/data/countries'

const props = defineProps<{
  selectedCountry?: string | null
}>()

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const searchInput = ref(props.selectedCountry || '')
const showDropdown = ref(false)

const filteredCountries = computed(() => {
  if (!searchInput.value) return []
  const query = searchInput.value.toLowerCase()
  return countries.filter(c => c.toLowerCase().includes(query)).slice(0, 8)
})

function handleInput() {
  showDropdown.value = true
}

function selectCountry(country: string) {
  searchInput.value = country
  showDropdown.value = false
  emit('search', country)
  // Scroll to stats
  setTimeout(() => {
    const statsEl = document.getElementById('visa-stats')
    if (statsEl) statsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}

function clearSearch() {
  searchInput.value = ''
  showDropdown.value = false
  emit('search', '')
}

function closeDropdown() {
  // Delay to allow click to register
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

// Directive for click outside (simple implementation)
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
/* Custom Scrollbar for dropdown */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 3px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #374151;
}
</style>
