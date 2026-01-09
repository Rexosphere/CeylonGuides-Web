<template>
  <header class="relative h-[500px] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img alt="Sri Lanka Tea Plantation" class="w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZhZSNv569yUw9En6M3VlcQjFiCsGb9x42drSb75depLAtnfrGTQPSeGJ2kVOMUYswiPy-MeMfoKb6gnRfDRoAWzzYBZbrhbXs5Luynz6NWgxZP1YnU5Y364zI7kEENgDar6J-9Y5e4dvBBzp5cKxXXKcLkfR0Emx0Ym6dQLwyMpZvQPKDq1N4RJSlXU0r8qpjygsE0Q9XE054LztXvr_xFdq8YpJL7OpVle_xeGDkA2rxYd2DEAsD4ErzCtZhl4rIFrzwmF76szY" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
    </div>

    <div class="relative z-10 max-w-3xl mx-auto mt-16">
      <div
        class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 mb-6">
        <span class="material-symbols-outlined text-primary text-sm">verified_user</span>
        <span class="text-xs text-gray-200 font-medium tracking-wide uppercase">Visa Assistant 2025</span>
      </div>

      <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
        Visa &amp; Entry Requirements
      </h1>

      <p class="text-gray-200 text-lg mb-8 font-light">
        Check the latest fees, ETA rules, and exemption status for your nationality.
      </p>

      <div
        class="bg-white dark:bg-surface-dark rounded-full p-2 pl-6 flex items-center w-full max-w-md mx-auto shadow-xl">
        <span class="material-symbols-outlined text-gray-400 dark:text-gray-500 mr-3">public</span>
        <input v-model="searchQuery"
          class="flex-grow bg-transparent border-none text-gray-800 dark:text-gray-200 focus:ring-0 placeholder-gray-400 font-medium"
          placeholder="Select your nationality" type="text" @keyup.enter="handleSearch" />
        <button v-if="searchQuery" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
          @click="clearSearch">
          <span class="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  selectedCountry?: string
  isLoading?: boolean
}>()

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref(props.selectedCountry || '')

watch(() => props.selectedCountry, (newVal) => {
  searchQuery.value = newVal || ''
})

function handleSearch() {
  emit('search', searchQuery.value)
}

function clearSearch() {
  searchQuery.value = ''
  emit('search', '')
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
