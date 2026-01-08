<template>
  <section class="relative w-full">
    <div class="relative w-full h-[540px] flex items-center justify-center p-4">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-cover bg-center z-0" 
           role="img" 
           aria-label="Stunning aerial view of Sri Lanka tea plantations and mountains" 
           style="background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url('/images/downloaded_2e782d1a6f27.avif');">
      </div>
      <div class="relative z-10 flex flex-col items-center max-w-4xl text-center gap-8 animate-fade-in-up">
        <div class="space-y-4">
          <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Navigate Your Finances in Paradise
          </h1>
          <p class="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Essential guide to Rupee (LKR), ATMs, and smart budgeting for your Sri Lankan adventure.
          </p>
        </div>
        <!-- Quick Currency Preview (Functional) -->
        <div class="w-full max-w-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-2 rounded-xl shadow-2xl">
          <div class="bg-white dark:bg-surface-dark rounded-lg p-6 flex flex-col md:flex-row gap-4 items-center shadow-sm">
            <div class="flex-1 w-full space-y-2 text-left">
              <label class="text-xs font-bold text-text-muted uppercase tracking-wider">I have (USD)</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">attach_money</span>
                <input 
                  v-model.number="usdAmount"
                  class="w-full h-12 rounded-lg border border-gray-200 dark:border-neutral-700 bg-background-light dark:bg-[#221510] pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-bold text-lg text-text-main dark:text-white focus:outline-none" 
                  placeholder="100" 
                  type="number"
                />
              </div>
            </div>
            <div class="flex items-end pb-2 md:pb-0">
              <div class="size-10 rounded-full bg-background-light dark:bg-[#3a2c26] flex items-center justify-center text-primary border border-gray-200 dark:border-neutral-700">
                <span class="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
            <div class="flex-1 w-full space-y-2 text-left">
              <label class="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                You get (LKR)
                <span 
                  v-if="isLive" 
                  class="text-green-500 text-[10px] font-medium flex items-center gap-0.5"
                >
                  <span class="material-symbols-outlined text-xs">check_circle</span>
                  Live
                </span>
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">₨</span>
                <div class="w-full h-12 rounded-lg border border-primary/30 bg-primary/5 dark:bg-primary/10 pl-10 pr-4 flex items-center font-bold text-lg text-primary">
                  {{ formattedLkr }}
                </div>
              </div>
            </div>
            <div class="flex items-end w-full md:w-auto mt-2 md:mt-0">
              <button 
                @click="scrollToConverter"
                class="h-12 w-full md:w-auto px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all active:scale-95 whitespace-nowrap flex items-center gap-2"
              >
                <span class="material-symbols-outlined">expand_more</span>
                More Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCurrency } from '~/composables/useCurrency'

const { getRate, isLive } = useCurrency()

const usdAmount = ref(100)

const lkrAmount = computed(() => {
  const rate = getRate('USD')
  return usdAmount.value * rate
})

const formattedLkr = computed(() => {
  return `~${lkrAmount.value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
})

function scrollToConverter() {
  const converterSection = document.querySelector('#currency-converter')
  if (converterSection) {
    converterSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    // Fallback: scroll down 600px
    window.scrollBy({ top: 600, behavior: 'smooth' })
  }
}
</script>
