<template>
  <section class="py-16 md:py-24 bg-background-light dark:bg-background-dark">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h2 class="text-3xl font-display font-bold text-primary dark:text-white mb-2">Curated Itineraries</h2>
          <p class="text-text-muted dark:text-gray-400">Hand-picked routes by local experts</p>
        </div>
        <div class="flex gap-4">
          <select v-model="selectedDuration"
            class="bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm py-2 px-4 focus:ring-secondary focus:border-secondary">
            <option value="">All Durations</option>
            <option value="1-5">1-5 Days</option>
            <option value="5-10">5-10 Days</option>
            <option value="10+">10+ Days</option>
          </select>
          <select v-model="selectedStyle"
            class="bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm py-2 px-4 focus:ring-secondary focus:border-secondary">
            <option value="">All Styles</option>
            <option v-for="style in allStyles" :key="style" :value="style">{{ capitalize(style) }}</option>
          </select>
          <select v-model="selectedBudget"
            class="bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm py-2 px-4 focus:ring-secondary focus:border-secondary">
            <option value="">Any Budget</option>
            <option value="budget">Budget</option>
            <option value="mid-range">Mid-Range</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink v-for="itinerary in filteredItineraries" :key="itinerary.id" :to="`/itineraries/${itinerary.slug}`"
          class="bg-white dark:bg-card-dark rounded-2xl overflow-hidden shadow-card border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow group">
          <div class="relative h-64 overflow-hidden">
            <img :alt="itinerary.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              :src="getItineraryImage(itinerary.slug)" />
            <div
              class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1">
              <span class="material-icons text-xs">schedule</span> {{ itinerary.durationDays }} Days
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3
                class="font-display font-bold text-xl text-primary dark:text-white group-hover:text-secondary transition-colors">
                {{ itinerary.title }}</h3>
              <span :class="getStyleBadgeClass(itinerary.style[0] || '')"
                class="text-[10px] uppercase font-bold px-2 py-1 rounded">
                {{ getStyleLabel(itinerary.style[0] || '') }}
              </span>
            </div>
            <p class="text-sm text-text-muted dark:text-gray-400 mb-4 line-clamp-2">{{ itinerary.whyYouWillLoveIt }}</p>
            <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span class="text-sm font-semibold text-text-main dark:text-gray-300">Est. ${{
                itinerary.estimatedCostPerPersonUSD }}/person</span>
              <button
                class="text-secondary hover:text-primary font-bold text-sm flex items-center gap-1 transition-colors">
                Explore <span class="material-icons text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty State -->
      <div v-if="filteredItineraries.length === 0" class="text-center py-16">
        <span class="material-icons text-6xl text-gray-300 dark:text-neutral-600 mb-4">travel_explore</span>
        <p class="text-text-muted dark:text-neutral-400 text-lg">No itineraries match your filters.</p>
        <button @click="resetFilters" class="mt-4 text-primary font-semibold hover:underline">Reset Filters</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import itinerariesData from '~/assets/data/itineraries.json'

const itineraries = itinerariesData.itineraries

// Filters
const selectedDuration = ref('')
const selectedStyle = ref('')
const selectedBudget = ref('')

// Get all unique styles
const allStyles = computed(() => {
  const styles = new Set<string>()
  itineraries.forEach(i => i.style.forEach(s => styles.add(s)))
  return Array.from(styles).sort()
})

// Filter logic
const filteredItineraries = computed(() => {
  let result = [...itineraries]

  // Duration filter
  if (selectedDuration.value) {
    result = result.filter(i => {
      if (selectedDuration.value === '1-5') return i.durationDays <= 5
      if (selectedDuration.value === '5-10') return i.durationDays >= 5 && i.durationDays <= 10
      if (selectedDuration.value === '10+') return i.durationDays >= 10
      return true
    })
  }

  // Style filter
  if (selectedStyle.value) {
    result = result.filter(i => i.style.includes(selectedStyle.value))
  }

  // Budget filter
  if (selectedBudget.value) {
    result = result.filter(i => i.budgetType === selectedBudget.value)
  }

  return result
})

// Helper functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const getStyleLabel = (style: string) => {
  const map: Record<string, string> = {
    cultural: 'Cultural',
    historic: 'Cultural',
    heritage: 'Cultural',
    beach: 'Beach',
    nature: 'Nature',
    wildlife: 'Nature',
    adventure: 'Adventure',
    luxury: 'Luxury',
    wellness: 'Wellness',
    budget: 'Budget',
    backpacking: 'Budget',
    'family-friendly': 'Standard',
    express: 'Cultural',
    historical: 'Cultural',
    scenic: 'Standard',
    culture: 'Cultural'
  }
  return map[style] || 'Standard'
}

const getStyleBadgeClass = (style: string) => {
  const map: Record<string, string> = {
    cultural: 'bg-teal-50 text-teal-700',
    historic: 'bg-teal-50 text-teal-700',
    heritage: 'bg-teal-50 text-teal-700',
    beach: 'bg-blue-50 text-blue-700',
    nature: 'bg-green-50 text-green-700',
    wildlife: 'bg-green-50 text-green-700',
    adventure: 'bg-orange-50 text-orange-700',
    luxury: 'bg-amber-50 text-amber-700',
    wellness: 'bg-pink-50 text-pink-700',
    budget: 'bg-green-50 text-green-700',
    backpacking: 'bg-green-50 text-green-700',
    'family-friendly': 'bg-purple-50 text-purple-700',
    express: 'bg-teal-50 text-teal-700',
    historical: 'bg-teal-50 text-teal-700',
    scenic: 'bg-purple-50 text-purple-700',
    culture: 'bg-teal-50 text-teal-700'
  }
  return map[style] || 'bg-purple-50 text-purple-700'
}

const getItineraryImage = (slug: string) => {
  const imageMap: Record<string, string> = {
    'cultural-triangle-express': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1YiC7YVXGt-xuGkViSLL7V1J6pGQ4HtWRQB80jgm6vCBH5nlpqcXbVdolhv_QkznZwBtRM6w0QdJmyi0ERRlSWtxDGEbASd9SxoYTENDXchan4g2yEoHbTuYa3G7YJ0qeTe69qqbuVXXnHl9hQjsMm4n4U5CQ38dFpRHqQZVaRyyDFQAnhJ73d4xTxlvcYiC961g5D-YxTxc0AFQzGXX2N5lhws0ZF1w5bLF-SGRi1HDKnwb0L28HL0Qdr4zstG9qBUJX__AffTg',
    'southern-beaches-wildlife': 'https://lh3.googleusercontent.com/aida-public/AB6AXuABljJHQo3ZLy75WcVsx1ak6WycDfazTchJOZqeFGg0DBioDjdYIrJQrgCsBSRMPIcwDvEznlvBMsEqj12zK_LCUXRlmJMAaZEaoBfnB_bPVIOLS6Pjvq7TlvVmCz42hbm2jPVPMdMGc-05sxRRM1dHmHkFF13LbERAY6sqHR06Wzm8-gp46hK05pJLJ55gBU_IJvQkPg_fMyjcsAPFI9xaJTG04YhuXPrpt5e_13YVJX4Bf78ORM2U0kU4Jhbpn7CLeFyk7fd9rZo',
    'cultural-heart-sri-lanka': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE8F1BoWIGRAGXifp-d0Jhi2N76iv-mVWsc4myi0P8ZnTyjuH-w5JXnHDCpDC-pfgmrwam5V1c-nPvQXelnMukA9Yu1DY7EczW1JtZ0-PlzrezMk0In951MD66d334NKvfvvfwBZOMu49PdkAzAM3J-cqEvjUSVFHNJ43q4Zr-i9lxBUPgEQsk4i5J2hNOvpWmu5EfI-Nqs6eLY9SN498ygVlNG8IXu0acHSZPOjEmGShDXr_3m6zAdlFYl6OqBu8D2suEh1cMcIQ',
    'classic-sri-lanka-highlights': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSqrhc-mhTYmxXlikA6_AuCz8oYGdE8Imf_B0eDz0UNY4626_ZTzkNr-ZrYBusptxAJ2MWi1mXPi0pX0M2sdz8Og6M3C9RGYgJLPXraKjoTLcPDWav6WYsgiAgVYWAz3hj4VGDm3TBrjrn_JCey6J0k442fnDNJfZ5zJBXDTAY9LSa3DFZTV0YMw265IHZgGyv4Zs1ISWpCYZvkc8vvLfFXYhSHIt71NPTM3OdcseUtLfDsPc5qjoSgTw9Az02nBR2Y4NLL3W6O0Q',
    'luxury-wellness-tour': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLxv9PTS_GLsYt-wg03sEPiGc24jDjbO1tk0EbOGArt-sA947jeAsIUj1EASeVuLYeDxY4z-3CffLMH1pGKWe6AfbRG9Dfo87O_Bt2jiBXADNsra-4nZ4FsBTEtRLavKGdpidzrcvPmDJsl-Ehi-8Gs2Tc-pnHf9xh0-yrHLvyMiUE6LN-cvSO2jjRzu9-Hg1KUYRKbFphjQ_ZU_NfRYhv5BxKo-BVplvSBLu85HA3P9QpZ698TyB1RE-gusYiRNaSqASX9_H6cmY',
    'backpackers-sri-lanka-adventure': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbz2Xd8JzRE5aU295qn3CVpinm8JbAuZtzbDnCnTh9MGCHc5QH704BFLVcz8TyMMwhVjYDdfNfixNsagELiKaRODsq7k0thHah1awPZJ7wSVVoJiIK8r1VWSHjUY2me4yle3OlKmx4UBH8UdORTe-KxdGToH6yranJE5i8YSYxxuY2CfT9__MJel-J396tnI0ZiDFApsGW_7zJ7b7XE_oA-ouRhtnGIgjk-d4cOySuMtpXwZo0JECyVZepU-klqu2aAN4xOYGyiVM',
  }
  return imageMap[slug] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1YiC7YVXGt-xuGkViSLL7V1J6pGQ4HtWRQB80jgm6vCBH5nlpqcXbVdolhv_QkznZwBtRM6w0QdJmyi0ERRlSWtxDGEbASd9SxoYTENDXchan4g2yEoHbTuYa3G7YJ0qeTe69qqbuVXXnHl9hQjsMm4n4U5CQ38dFpRHqQZVaRyyDFQAnhJ73d4xTxlvcYiC961g5D-YxTxc0AFQzGXX2N5lhws0ZF1w5bLF-SGRi1HDKnwb0L28HL0Qdr4zstG9qBUJX__AffTg'
}

const resetFilters = () => {
  selectedDuration.value = ''
  selectedStyle.value = ''
  selectedBudget.value = ''
}
</script>
