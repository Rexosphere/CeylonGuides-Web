<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display min-h-screen">
    <!-- 404 State -->
    <div v-if="!itinerary" class="min-h-screen flex flex-col items-center justify-center px-4">
      <span class="material-icons text-6xl text-gray-300 dark:text-neutral-600 mb-4">error_outline</span>
      <h1 class="text-2xl font-bold mb-2">Itinerary Not Found</h1>
      <p class="text-text-muted dark:text-neutral-400 mb-6">The itinerary you're looking for doesn't exist or has been
        removed.</p>
      <NuxtLink to="/itineraries"
        class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
        <span class="material-icons">arrow_back</span>
        Back to Itineraries
      </NuxtLink>
    </div>

    <!-- Content when itinerary exists -->
    <template v-else>
      <!-- Hero Section -->
      <section class="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img :alt="itinerary.title" class="w-full h-full object-cover" :src="heroImage" />
          <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-black/30 mix-blend-multiply">
          </div>
        </div>
        <div class="container mx-auto px-6 relative z-10 text-center pt-20">
          <div class="flex justify-center gap-3 mb-6">
            <span v-for="tag in itinerary.style.slice(0, 3)" :key="tag"
              class="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
              {{ capitalize(tag) }}
            </span>
          </div>
          <h1 class="text-4xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-lg tracking-tight">
            {{ itinerary.title }}
          </h1>
          <p class="text-white/90 text-lg md:text-xl max-w-3xl mx-auto font-light mb-8">
            {{ itinerary.whyYouWillLoveIt }}
          </p>
          <div class="flex items-center justify-center gap-8 text-white/80 text-sm font-medium">
            <span class="flex items-center gap-2">
              <span class="material-icons text-lg">schedule</span> {{ itinerary.durationDays }} Days
            </span>
            <span class="flex items-center gap-2">
              <span class="material-icons text-lg">payments</span> ~${{ itinerary.estimatedCostPerPersonUSD }}/person
            </span>
          </div>
        </div>
      </section>

      <!-- Quick Stats Card -->
      <section class="relative z-20 -mt-10 mb-12">
        <div class="container mx-auto px-6">
          <div
            class="bg-white dark:bg-card-dark rounded-xl shadow-card p-6 border border-gray-100 dark:border-gray-800 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div class="flex flex-col gap-1 border-r border-gray-100 dark:border-gray-700 last:border-0 pr-4">
              <span class="text-xs font-bold text-text-muted uppercase tracking-wider">Duration</span>
              <span class="text-sm font-semibold text-primary dark:text-white">{{ itinerary.durationDays }} Days</span>
            </div>
            <div class="flex flex-col gap-1 border-r border-gray-100 dark:border-gray-700 last:border-0 pr-4">
              <span class="text-xs font-bold text-text-muted uppercase tracking-wider">Travelers</span>
              <span class="text-sm font-semibold text-primary dark:text-white">{{ getTravelersType(itinerary.style)
              }}</span>
            </div>
            <div class="flex flex-col gap-1 border-r border-gray-100 dark:border-gray-700 last:border-0 pr-4">
              <span class="text-xs font-bold text-text-muted uppercase tracking-wider">Budget</span>
              <span class="text-sm font-semibold text-primary dark:text-white">{{ getBudgetLabel(itinerary.budgetType)
              }}</span>
            </div>
            <div class="flex flex-col gap-1 border-r border-gray-100 dark:border-gray-700 last:border-0 pr-4">
              <span class="text-xs font-bold text-text-muted uppercase tracking-wider">Difficulty</span>
              <span class="text-sm font-semibold text-primary dark:text-white">{{ getDifficulty(itinerary.style)
              }}</span>
            </div>
            <div class="flex flex-col gap-1 border-r border-gray-100 dark:border-gray-700 last:border-0 pr-4">
              <span class="text-xs font-bold text-text-muted uppercase tracking-wider">Pace</span>
              <span class="text-sm font-semibold text-primary dark:text-white">{{ getPace(itinerary.durationDays)
              }}</span>
            </div>
            <div class="flex flex-col gap-1 pr-4">
              <span class="text-xs font-bold text-text-muted uppercase tracking-wider">Best Time</span>
              <span class="text-sm font-semibold text-primary dark:text-white">Jan - April</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="bg-background-light dark:bg-background-dark pb-20">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Day-by-Day Itinerary -->
            <div class="lg:col-span-8">
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold text-primary dark:text-white">Day-by-Day Itinerary</h2>
                <div class="flex gap-2">
                  <button class="text-secondary hover:text-primary text-sm font-semibold flex items-center gap-1">
                    <span class="material-icons text-sm">print</span> Print
                  </button>
                  <button class="text-secondary hover:text-primary text-sm font-semibold flex items-center gap-1">
                    <span class="material-icons text-sm">download</span> PDF
                  </button>
                </div>
              </div>

              <div
                class="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent dark:before:via-gray-700">
                <div v-for="(day, index) in displayedDays" :key="day.dayNumber" class="relative flex items-start group">
                  <div class="absolute left-6 w-0.5 h-full bg-gray-200 dark:bg-gray-700 group-last:bg-transparent">
                  </div>
                  <div
                    class="relative flex-shrink-0 w-12 h-12 flex items-center justify-center bg-secondary text-white rounded-full text-sm font-bold shadow-md z-10 border-4 border-background-light dark:border-background-dark">
                    {{ day.dayNumber }}
                  </div>
                  <div
                    class="ml-6 bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 w-full hover:border-secondary/30 transition-colors">
                    <h3 class="text-lg font-bold text-primary dark:text-white mb-1">{{ day.title }}</h3>
                    <p class="text-xs text-text-muted uppercase tracking-wider mb-4">{{ day.locations?.join(' • ') }}
                    </p>

                    <div class="space-y-4">
                      <div v-for="(activity, actIndex) in day.activities" :key="actIndex"
                        :class="['flex gap-4 items-start', actIndex > 0 ? 'border-t border-gray-50 dark:border-gray-800 pt-4' : '']">
                        <div :class="['mt-1 w-2 h-2 rounded-full shrink-0', getActivityColor(activity.type)]"></div>
                        <div>
                          <h4 class="text-sm font-bold text-gray-800 dark:text-gray-200">{{ activity.title }}</h4>
                          <p class="text-sm text-text-muted leading-relaxed">{{ activity.description }}</p>
                          <div class="mt-1 flex items-center gap-2 text-xs text-text-muted">
                            <span class="material-icons text-sm">{{ getActivityIcon(activity.type) }}</span> {{
                              activity.duration }}
                            <span
                              class="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                              {{ capitalize(activity.type) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Show More Button -->
              <div v-if="!showAllDays && itinerary.days.length > 5" class="mt-8 flex justify-center">
                <button @click="showAllDays = true"
                  class="bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 hover:border-secondary text-secondary font-semibold py-3 px-8 rounded-full shadow-sm transition-all flex items-center gap-2">
                  <span>Show {{ itinerary.days.length - 5 }} more days</span>
                  <span class="material-icons text-sm">expand_more</span>
                </button>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-4 space-y-8">
              <!-- Highlights -->
              <div
                class="bg-white dark:bg-card-dark rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800">
                <h3 class="flex items-center gap-2 text-lg font-bold text-primary dark:text-white mb-6">
                  <span class="material-icons text-secondary">star_border</span> Highlights
                </h3>
                <ul class="space-y-3">
                  <li v-for="highlight in itinerary.sidebarHighlights" :key="highlight" class="flex items-start gap-3">
                    <span class="material-icons text-accent-info text-sm mt-0.5">check_circle_outline</span>
                    <span class="text-sm text-text-muted dark:text-gray-400">{{ highlight }}</span>
                  </li>
                </ul>
              </div>

              <!-- Customization Tips -->
              <div v-if="itinerary.customizationNotes?.length"
                class="bg-amber-50 dark:bg-yellow-900/10 rounded-2xl p-6 border border-amber-100 dark:border-yellow-800/30">
                <h3 class="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-yellow-100 mb-4">
                  <span class="material-icons text-amber-500">lightbulb</span> Customization Tips
                </h3>
                <ul class="space-y-3">
                  <li v-for="note in itinerary.customizationNotes" :key="note" class="flex items-start gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                    <span class="text-sm text-gray-600 dark:text-gray-300">{{ note }}</span>
                  </li>
                </ul>
              </div>

              <!-- CTA Card -->
              <div class="bg-primary dark:bg-card-dark rounded-2xl p-8 shadow-card text-center text-white">
                <h3 class="text-xl font-bold mb-4">Ready to go?</h3>
                <p class="text-white/80 text-sm mb-6">Use this itinerary as a template and customize it to fit your
                  dates.</p>
                <button @click="useItinerary"
                  class="w-full bg-secondary hover:bg-white hover:text-primary text-white font-bold py-3 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mb-3">
                  <span class="material-icons text-sm">edit_calendar</span> Use This Itinerary
                </button>
                <button @click="customizeDates"
                  class="w-full bg-transparent border border-white/30 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-all">
                  Customize Dates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Back Link -->
      <div class="container mx-auto px-6 pb-12">
        <NuxtLink to="/itineraries" class="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          <span class="material-icons">arrow_back</span>
          Back to All Itineraries
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import itinerariesData from '~/assets/data/itineraries.json'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const showAllDays = ref(false)

const itinerary = computed(() => {
  return itinerariesData.itineraries.find(i => i.slug === slug)
})

// Display first 5 days or all days based on showAllDays
const displayedDays = computed(() => {
  if (!itinerary.value?.days) return []
  return showAllDays.value ? itinerary.value.days : itinerary.value.days.slice(0, 5)
})

// Hero image mapping
const heroImage = computed(() => {
  const map: Record<string, string> = {
    'cultural-triangle-express': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1YiC7YVXGt-xuGkViSLL7V1J6pGQ4HtWRQB80jgm6vCBH5nlpqcXbVdolhv_QkznZwBtRM6w0QdJmyi0ERRlSWtxDGEbASd9SxoYTENDXchan4g2yEoHbTuYa3G7YJ0qeTe69qqbuVXXnHl9hQjsMm4n4U5CQ38dFpRHqQZVaRyyDFQAnhJ73d4xTxlvcYiC961g5D-YxTxc0AFQzGXX2N5lhws0ZF1w5bLF-SGRi1HDKnwb0L28HL0Qdr4zstG9qBUJX__AffTg',
    'southern-beaches-wildlife': 'https://lh3.googleusercontent.com/aida-public/AB6AXuABljJHQo3ZLy75WcVsx1ak6WycDfazTchJOZqeFGg0DBioDjdYIrJQrgCsBSRMPIcwDvEznlvBMsEqj12zK_LCUXRlmJMAaZEaoBfnB_bPVIOLS6Pjvq7TlvVmCz42hbm2jPVPMdMGc-05sxRRM1dHmHkFF13LbERAY6sqHR06Wzm8-gp46hK05pJLJ55gBU_IJvQkPg_fMyjcsAPFI9xaJTG04YhuXPrpt5e_13YVJX4Bf78ORM2U0kU4Jhbpn7CLeFyk7fd9rZo',
    'cultural-heart-sri-lanka': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE8F1BoWIGRAGXifp-d0Jhi2N76iv-mVWsc4myi0P8ZnTyjuH-w5JXnHDCpDC-pfgmrwam5V1c-nPvQXelnMukA9Yu1DY7EczW1JtZ0-PlzrezMk0In951MD66d334NKvfvvfwBZOMu49PdkAzAM3J-cqEvjUSVFHNJ43q4Zr-i9lxBUPgEQsk4i5J2hNOvpWmu5EfI-Nqs6eLY9SN498ygVlNG8IXu0acHSZPOjEmGShDXr_3m6zAdlFYl6OqBu8D2suEh1cMcIQ',
    'classic-sri-lanka-highlights': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSqrhc-mhTYmxXlikA6_AuCz8oYGdE8Imf_B0eDz0UNY4626_ZTzkNr-ZrYBusptxAJ2MWi1mXPi0pX0M2sdz8Og6M3C9RGYgJLPXraKjoTLcPDWav6WYsgiAgVYWAz3hj4VGDm3TBrjrn_JCey6J0k442fnDNJfZ5zJBXDTAY9LSa3DFZTV0YMw265IHZgGyv4Zs1ISWpCYZvkc8vvLfFXYhSHIt71NPTM3OdcseUtLfDsPc5qjoSgTw9Az02nBR2Y4NLL3W6O0Q',
    'luxury-wellness-tour': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLxv9PTS_GLsYt-wg03sEPiGc24jDjbO1tk0EbOGArt-sA947jeAsIUj1EASeVuLYeDxY4z-3CffLMH1pGKWe6AfbRG9Dfo87O_Bt2jiBXADNsra-4nZ4FsBTEtRLavKGdpidzrcvPmDJsl-Ehi-8Gs2Tc-pnHf9xh0-yrHLvyMiUE6LN-cvSO2jjRzu9-Hg1KUYRKbFphjQ_ZU_NfRYhv5BxKo-BVplvSBLu85HA3P9QpZ698TyB1RE-gusYiRNaSqASX9_H6cmY',
    'backpackers-sri-lanka-adventure': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbz2Xd8JzRE5aU295qn3CVpinm8JbAuZtzbDnCnTh9MGCHc5QH704BFLVcz8TyMMwhVjYDdfNfixNsagELiKaRODsq7k0thHah1awPZJ7wSVVoJiIK8r1VWSHjUY2me4yle3OlKmx4UBH8UdORTe-KxdGToH6yranJE5i8YSYxxuY2CfT9__MJel-J396tnI0ZiDFApsGW_7zJ7b7XE_oA-ouRhtnGIgjk-d4cOySuMtpXwZo0JECyVZepU-klqu2aAN4xOYGyiVM',
  }
  return map[slug] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1YiC7YVXGt-xuGkViSLL7V1J6pGQ4HtWRQB80jgm6vCBH5nlpqcXbVdolhv_QkznZwBtRM6w0QdJmyi0ERRlSWtxDGEbASd9SxoYTENDXchan4g2yEoHbTuYa3G7YJ0qeTe69qqbuVXXnHl9hQjsMm4n4U5CQ38dFpRHqQZVaRyyDFQAnhJ73d4xTxlvcYiC961g5D-YxTxc0AFQzGXX2N5lhws0ZF1w5bLF-SGRi1HDKnwb0L28HL0Qdr4zstG9qBUJX__AffTg'
})

// Helper functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const getTravelersType = (styles: string[]) => {
  if (styles.includes('backpacking')) return 'Solo / Couple'
  if (styles.includes('family-friendly')) return 'Family'
  if (styles.includes('luxury')) return 'Couple / Small Group'
  return 'Any'
}

const getBudgetLabel = (budgetType: string) => {
  const map: Record<string, string> = {
    'budget': 'Low ($30/day)',
    'mid-range': 'Medium ($60/day)',
    'luxury': 'High ($150+/day)'
  }
  return map[budgetType] || 'Medium'
}

const getDifficulty = (styles: string[]) => {
  if (styles.includes('adventure') || styles.includes('backpacking')) return 'Moderate'
  if (styles.includes('luxury') || styles.includes('wellness')) return 'Easy'
  return 'Easy-Moderate'
}

const getPace = (days: number) => {
  if (days <= 5) return 'Fast'
  if (days <= 10) return 'Medium'
  return 'Relaxed'
}

const getActivityColor = (type: string) => {
  const map: Record<string, string> = {
    'activity': 'bg-secondary',
    'transfer': 'bg-accent-info',
    'leisure': 'bg-secondary',
    'arrival': 'bg-secondary',
    'departure': 'bg-accent-info'
  }
  return map[type] || 'bg-secondary'
}

const getActivityIcon = (type: string) => {
  const map: Record<string, string> = {
    'activity': 'schedule',
    'transfer': 'directions_bus',
    'leisure': 'beach_access',
    'arrival': 'flight_land',
    'departure': 'flight_takeoff'
  }
  return map[type] || 'schedule'
}

// Actions
const useItinerary = () => {
  router.push({ path: '/trip-builder', query: { template: slug } })
}

const customizeDates = () => {
  router.push({ path: '/trip-builder', query: { template: slug, customize: 'true' } })
}

// SEO
useHead({
  title: computed(() => `${itinerary.value?.title || 'Itinerary'} - CeylonGuide`),
  meta: [
    { name: 'description', content: computed(() => itinerary.value?.whyYouWillLoveIt || '') }
  ]
})
</script>

<style scoped>
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
