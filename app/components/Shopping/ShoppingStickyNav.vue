<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('what-to-buy')

const sections = [
  { id: 'what-to-buy', label: 'What to Buy' },
  { id: 'shopping-map', label: 'Map' },
  { id: 'where-to-shop', label: 'Where to Shop' },
  { id: 'smart-tips', label: 'Smart Tips' },
  { id: 'vat-refund', label: 'VAT Refund' }
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80 // Account for sticky nav height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const updateActiveSection = () => {
  const scrollPosition = window.pageYOffset + 150 // Offset for better detection

  for (let i = sections.length - 1; i >= 0; i--) {
    const sectionData = sections[i]
    if (!sectionData) continue
    
    const section = document.getElementById(sectionData.id)
    if (section) {
      const sectionTop = section.offsetTop
      if (scrollPosition >= sectionTop) {
        activeSection.value = sectionData.id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<template>
  <div class="sticky top-0 z-40 bg-white/95 dark:bg-[#181311]/95 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 shadow-sm">
    <div class="w-full px-4 md:px-20 lg:px-40 py-0 flex justify-center">
      <div class="layout-content-container flex max-w-[960px] flex-1">
        <nav class="flex items-center justify-center gap-1 w-full overflow-x-auto scrollbar-hide py-2">
          <button
            v-for="section in sections"
            :key="section.id"
            @click="scrollToSection(section.id)"
            :class="[
              'px-6 py-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap',
              activeSection === section.id
                ? 'bg-primary text-white shadow-md'
                : 'text-text-muted dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary'
            ]"
          >
            {{ section.label }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
