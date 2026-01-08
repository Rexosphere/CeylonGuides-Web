<template>
  <section class="relative min-h-[600px] flex items-center pb-20 pt-32 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img alt="Background" class="w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1YiC7YVXGt-xuGkViSLL7V1J6pGQ4HtWRQB80jgm6vCBH5nlpqcXbVdolhv_QkznZwBtRM6w0QdJmyi0ERRlSWtxDGEbASd9SxoYTENDXchan4g2yEoHbTuYa3G7YJ0qeTe69qqbuVXXnHl9hQjsMm4n4U5CQ38dFpRHqQZVaRyyDFQAnhJ73d4xTxlvcYiC961g5D-YxTxc0AFQzGXX2N5lhws0ZF1w5bLF-SGRi1HDKnwb0L28HL0Qdr4zstG9qBUJX__AffTg" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/80 to-primary/40"></div>
    </div>
    <div class="container mx-auto px-6 relative z-10 text-center text-white">
      <h1 class="text-4xl md:text-6xl font-display font-bold mb-4 drop-shadow-lg leading-tight">Navigate Your Finances
        in Paradise</h1>
      <p class="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto font-light">Essential guide to Rupee (LKR),
        ATMs, and smart budgeting for your Sri Lankan adventure.</p>
      <div
        class="bg-white dark:bg-card-dark p-3 rounded-2xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-stretch gap-2">
        <div
          class="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-5 py-3 border border-gray-200 dark:border-gray-700 flex flex-col justify-center">
          <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block text-left">I Have
            (USD)</label>
          <div class="flex items-center gap-2">
            <span class="font-bold text-lg text-gray-500">$</span>
            <input
              class="bg-transparent border-none p-0 text-xl font-bold text-gray-800 dark:text-white focus:ring-0 w-full"
              type="number" value="100" />
            <div class="flex flex-col items-center">
              <button class="text-gray-400 hover:text-primary"><span
                  class="material-icons text-sm">arrow_drop_up</span></button>
              <button class="text-gray-400 hover:text-primary"><span
                  class="material-icons text-sm">arrow_drop_down</span></button>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center px-2">
          <span class="material-icons text-gray-400 text-2xl rotate-90 md:rotate-0">arrow_forward</span>
        </div>
        <div
          class="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-5 py-3 border border-gray-200 dark:border-gray-700 relative flex flex-col justify-center">
          <div class="flex justify-between items-center mb-1">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">You Get (LKR)</label>
            <span
              class="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span class="material-icons text-[10px]">check_circle</span> LIVE
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-lg text-gray-500">Rs</span>
            <input
              class="bg-transparent border-none p-0 text-xl font-bold text-gray-800 dark:text-white focus:ring-0 w-full"
              readonly type="text" value="~30,987" />
          </div>
        </div>
        <button
          class="bg-primary hover:bg-opacity-90 text-white px-8 py-4 rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 md:w-auto w-full">
          More Options
        </button>
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
