<template>
  <div class="min-h-screen bg-stone-50 dark:bg-[#121212]">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
      </div>
      <div class="max-w-5xl mx-auto px-4 py-12 lg:py-16 relative">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div class="flex-1">
            <h1 class="text-3xl lg:text-4xl font-bold mb-2">{{ hero.title }}</h1>
            <p class="text-teal-100 text-lg mb-3">{{ hero.subtitle }}</p>
            <p class="text-teal-200/80 text-sm max-w-xl">{{ hero.description }}</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <DownloadGuideButton />
          </div>
        </div>
        <!-- Quick Stats -->
        <div class="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/20">
          <div v-for="stat in hero.quickStats" :key="stat.label" class="flex items-center gap-2 text-sm">
            <span class="material-symbols-outlined text-teal-300" aria-hidden="true">{{ stat.icon }}</span>
            <span class="font-bold">{{ stat.value }}</span>
            <span class="text-teal-200">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky Quick Guidelines Nav (Desktop) -->
    <div ref="navTrigger" class="h-0"></div>
    <nav 
      class="hidden lg:block bg-white/95 dark:bg-[#1a120e]/95 backdrop-blur-sm border-b border-neutral-100 dark:border-[#3a2d28] z-50 transition-all"
      :class="isNavSticky ? 'sticky top-0 shadow-md' : ''"
    >
      <div class="max-w-5xl mx-auto px-4">
        <div class="flex items-center gap-1 py-2 overflow-x-auto">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="scrollToSection(item.id)"
            class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
            :class="activeSection === item.id
              ? 'bg-primary text-white shadow-md'
              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#2a1d18]'"
          >
            <span class="material-symbols-outlined text-base" aria-hidden="true">{{ item.icon }}</span>
            {{ item.title }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-4 py-6 space-y-6">
      
      <!-- Mobile Accordion Sections -->
      <div class="lg:hidden space-y-3">
        <div v-for="section in mobileAccordions" :key="section.id" class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] overflow-hidden">
          <button
            @click="toggleMobileSection(section.id)"
            class="w-full flex items-center justify-between p-4 text-left"
          >
            <div class="flex items-center gap-3">
              <span 
                class="material-symbols-outlined p-2 rounded-lg"
                :class="section.iconBg"
                aria-hidden="true"
              >{{ section.icon }}</span>
              <span class="font-bold text-neutral-800 dark:text-white">{{ section.title }}</span>
            </div>
            <span class="material-symbols-outlined text-neutral-400 transition-transform" :class="{ 'rotate-180': expandedMobileSections.has(section.id) }">
              expand_more
            </span>
          </button>
          <Transition name="accordion">
            <div v-if="expandedMobileSections.has(section.id)" class="px-4 pb-4">
              <component :is="section.component" />
            </div>
          </Transition>
        </div>
      </div>

      <!-- Desktop Sections -->
      <div class="hidden lg:block space-y-8">
        <!-- Checklist -->
        <section id="checklist" class="scroll-mt-20">
          <CultureChecklist />
        </section>

        <!-- Temple Dress Code -->
        <section id="dress-code" class="scroll-mt-20">
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-2xl" aria-hidden="true">checkroom</span>
            <h2 class="text-xl font-bold text-neutral-800 dark:text-white">Temple Dress Code</h2>
          </div>
          <TempleDressCode />
        </section>

        <!-- Photography -->
        <section id="photography" class="scroll-mt-20">
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-2xl" aria-hidden="true">photo_camera</span>
            <h2 class="text-xl font-bold text-neutral-800 dark:text-white">Photography Guidelines</h2>
          </div>
          <PhotographyRules />
        </section>

        <!-- Do's & Don'ts -->
        <section id="dos-donts" class="scroll-mt-20">
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-2xl" aria-hidden="true">rule</span>
            <h2 class="text-xl font-bold text-neutral-800 dark:text-white">Cultural Do's & Don'ts</h2>
          </div>
          <CulturalDosDonts />
        </section>

        <!-- Festival Calendar -->
        <section id="festivals" class="scroll-mt-20">
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-2xl" aria-hidden="true">celebration</span>
            <h2 class="text-xl font-bold text-neutral-800 dark:text-white">Cultural Calendar</h2>
          </div>
          <CulturalCalendar />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, markRaw } from 'vue'
import { cultureHero } from '~/data/culturePageData'
import CultureChecklist from '~/components/Culture/CultureChecklist.vue'
import TempleDressCode from '~/components/Culture/TempleDressCode.vue'
import PhotographyRules from '~/components/Culture/PhotographyRules.vue'
import CulturalDosDonts from '~/components/Culture/CulturalDosDonts.vue'
import CulturalCalendar from '~/components/Culture/CulturalCalendar.vue'
import DownloadGuideButton from '~/components/Culture/DownloadGuideButton.vue'

useHead({
  title: 'Cultural Etiquette Guide - CeylonGuide',
  meta: [
    { name: 'description', content: 'Essential cultural etiquette for temples, photography, dress code, and social customs in Sri Lanka.' }
  ]
})

// Hero data
const hero = cultureHero

// Navigation items
const navItems = [
  { id: 'checklist', title: 'Checklist', icon: 'checklist' },
  { id: 'dress-code', title: 'Dress Code', icon: 'checkroom' },
  { id: 'photography', title: 'Photography', icon: 'photo_camera' },
  { id: 'dos-donts', title: "Do's & Don'ts", icon: 'rule' },
  { id: 'festivals', title: 'Festivals', icon: 'celebration' },
]

// Mobile accordion sections
const mobileAccordions = computed(() => [
  { id: 'checklist', title: 'Etiquette Checklist', icon: 'checklist', iconBg: 'bg-primary/10 text-primary', component: markRaw(CultureChecklist) },
  { id: 'dress-code', title: 'Temple Dress Code', icon: 'checkroom', iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400', component: markRaw(TempleDressCode) },
  { id: 'photography', title: 'Photography Rules', icon: 'photo_camera', iconBg: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', component: markRaw(PhotographyRules) },
  { id: 'dos-donts', title: "Cultural Do's & Don'ts", icon: 'rule', iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', component: markRaw(CulturalDosDonts) },
  { id: 'festivals', title: 'Festival Calendar', icon: 'celebration', iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', component: markRaw(CulturalCalendar) },
])

// Mobile accordion state
const expandedMobileSections = ref(new Set<string>(['checklist']))

function toggleMobileSection(id: string) {
  if (expandedMobileSections.value.has(id)) {
    expandedMobileSections.value.delete(id)
  } else {
    expandedMobileSections.value.add(id)
  }
  expandedMobileSections.value = new Set(expandedMobileSections.value)
}

// Sticky nav state
const navTrigger = ref<HTMLElement | null>(null)
const isNavSticky = ref(false)
const activeSection = ref('checklist')

function handleScroll() {
  if (navTrigger.value) {
    const rect = navTrigger.value.getBoundingClientRect()
    isNavSticky.value = rect.top <= 0
  }
  
  // Update active section based on scroll position
  for (const item of [...navItems].reverse()) {
    const el = document.getElementById(item.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 100) {
        activeSection.value = item.id
        break
      }
    }
  }
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = id
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
