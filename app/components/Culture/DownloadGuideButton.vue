<template>
  <button
    @click="handleDownload"
    class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md"
    :disabled="isDownloading"
    aria-label="Download Cultural Etiquette Guide as PDF"
  >
    <span 
      class="material-symbols-outlined text-lg" 
      :class="{ 'animate-bounce': isDownloading }"
      aria-hidden="true"
    >
      {{ isDownloading ? 'hourglass_empty' : 'download' }}
    </span>
    <span>{{ isDownloading ? 'Generating...' : 'Download PDF Guide' }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { downloadCultureGuide } from '~/utils/downloadCultureGuide'

const isDownloading = ref(false)

async function handleDownload() {
  isDownloading.value = true
  
  try {
    downloadCultureGuide()
  } catch (e) {
    console.error('Failed to download guide:', e)
    alert('Failed to generate PDF. Please try again.')
  } finally {
    // Reset after a delay
    setTimeout(() => {
      isDownloading.value = false
    }, 2000)
  }
}
</script>
