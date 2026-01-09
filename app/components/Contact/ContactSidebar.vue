<template>
  <div class="w-full lg:w-[320px] flex flex-col gap-6">
    
    <!-- Direct Contact Card -->
    <div class="bg-[#221510] text-white rounded-2xl p-6 shadow-lg bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <h4 class="text-lg font-bold mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">support_agent</span>
        Other ways to connect
      </h4>
      <ul class="space-y-4">
        <li 
          v-for="method in contactMethods" 
          :key="method.id"
          class="flex items-start gap-3"
        >
          <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-sm">{{ method.icon }}</span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="text-xs text-white/60 font-medium uppercase tracking-wider">{{ method.label }}</p>
              <!-- Online indicator for chat -->
              <span 
                v-if="method.isOnline !== undefined" 
                class="w-2 h-2 rounded-full"
                :class="method.isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'"
              ></span>
            </div>
            <a 
              v-if="method.link"
              :href="method.link"
              class="text-sm font-semibold hover:text-primary transition-colors"
            >
              {{ method.value }}
            </a>
            <p v-else class="text-sm font-semibold">{{ method.value }}</p>
            <p v-if="method.note" class="text-xs text-white/50 mt-0.5">{{ method.note }}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- FAQ Mini Section -->
    <div class="bg-white dark:bg-[#2a1d18] rounded-2xl shadow-sm border border-[#e6dedb] dark:border-[#3a2d29] p-6">
      <h4 class="text-lg font-bold text-[#181311] dark:text-white mb-4">Common Questions</h4>
      <div class="flex flex-col gap-3">
        <details 
          v-for="faq in displayedFaqs" 
          :key="faq.question"
          class="group bg-background-light dark:bg-[#221510] rounded-lg p-3 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary class="flex items-center justify-between cursor-pointer font-bold text-sm text-[#181311] dark:text-gray-200">
            {{ faq.question }}
            <span class="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
          </summary>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ faq.answer }}
          </p>
        </details>
      </div>
      <div class="mt-4 pt-4 border-t border-[#e6dedb] dark:border-[#3a2d29]">
        <a class="text-primary text-sm font-bold hover:underline flex items-center gap-1" href="/faq">
          View all FAQs 
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
    </div>

    <!-- Partnership Promo -->
    <div v-if="partnership" class="bg-primary/10 rounded-2xl p-6 border border-primary/20">
      <h4 class="text-lg font-bold text-[#181311] dark:text-white mb-2">{{ partnership.title }}</h4>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ partnership.subtitle }}</p>
      
      <!-- Benefits List -->
      <ul v-if="partnership.benefits && partnership.benefits.length" class="mb-4 space-y-1">
        <li 
          v-for="benefit in partnership.benefits.slice(0, 3)" 
          :key="benefit"
          class="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-primary text-sm">check</span>
          {{ benefit }}
        </li>
      </ul>
      
      <button class="w-full py-2 bg-white dark:bg-[#221510] text-primary font-bold rounded-lg text-sm border border-primary/20 hover:bg-primary/5 transition-colors">
        {{ partnership.buttonText }}
      </button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ContactMethod {
  id: string
  icon: string
  label: string
  value: string
  link?: string
  note?: string
  isOnline?: boolean
}

interface FAQ {
  question: string
  answer: string
  tab?: string
}

interface Partnership {
  title: string
  subtitle: string
  buttonText: string
  benefits?: string[]
}

const props = defineProps<{
  contactMethods: ContactMethod[]
  faqs: FAQ[]
  partnership?: Partnership
}>()

// Show only first 3 FAQs
const displayedFaqs = computed(() => {
  return props.faqs.slice(0, 3)
})
</script>
