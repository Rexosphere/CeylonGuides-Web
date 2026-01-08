<script setup lang="ts">
import { ref, computed } from 'vue'
import { useShoppingData } from '~/composables/useShoppingData'
import { getWarningsByContext } from '~/data/shopping.data'
import { districts } from '~/data/shopping.data'
import ShoppingWarningCard from './ShoppingWarningCard.vue'

const { guides } = useShoppingData()

// Get all tourist trap warnings
const touristTrapWarnings = computed(() => getWarningsByContext('tourist-traps'))

// Dropdown selections
const selectedProduct = ref<string>('')
const selectedVenue = ref<string>('')

// Product options
const productOptions = [
  { value: 'tea', label: 'Tea', icon: 'local_cafe' },
  { value: 'spices', label: 'Spices', icon: 'nutrition' },
  { value: 'gems', label: 'Gems', icon: 'diamond' },
  { value: 'textiles', label: 'Textiles', icon: 'checkroom' },
  { value: 'masks', label: 'Masks', icon: 'theater_comedy' },
  { value: 'wellness', label: 'Wellness', icon: 'spa' },
  { value: 'other', label: 'Other', icon: 'shopping_bag' }
]

// Venue options
const venueOptions = [
  { value: 'market', label: 'Market (Pettah/Street)', icon: 'storefront' },
  { value: 'boutique', label: 'Boutique (Galle Fort)', icon: 'store' },
  { value: 'government', label: 'Government shop (Laksala)', icon: 'account_balance' },
  { value: 'mall', label: 'Mall (Odel)', icon: 'local_mall' }
]

// Interactive guide logic
const interactiveGuide = computed(() => {
  if (!selectedProduct.value || !selectedVenue.value) {
    return null
  }

  const product = selectedProduct.value
  const venue = selectedVenue.value

  // Risk level calculation
  let riskLevel: 'low' | 'medium' | 'high' = 'low'
  if (product === 'gems' && (venue === 'market' || venue === 'boutique')) {
    riskLevel = 'high'
  } else if (product === 'gems' || venue === 'market') {
    riskLevel = 'medium'
  }

  // Authenticity checks
  let authenticityChecks: string[] = []
  if (product === 'tea') {
    authenticityChecks = [
      'Look for the Lion Logo - Sri Lanka Tea Board certification',
      'Check for "100% Pure Ceylon Tea" label',
      'Vacuum-packed for freshness',
      'Buy from tea estates or branded shops'
    ]
  } else if (product === 'spices') {
    authenticityChecks = [
      'True Ceylon cinnamon has thin, multi-layered quills',
      'Check for organic or ethically-sourced labels',
      'Vacuum-packed for maximum freshness',
      'Look for proper labeling with ingredients'
    ]
  } else if (product === 'gems') {
    authenticityChecks = [
      'Demand gem certificate from NGJA, GIA, or IGI',
      'Verify certificate online before leaving Sri Lanka',
      'Real certificates have watermarked paper and unique numbering',
      'Buy from licensed dealers recognized by National Gem and Jewelry Authority',
      'NEVER accept stone without certification - this is a red flag'
    ]
  } else if (product === 'textiles') {
    authenticityChecks = [
      'Buy from recognized brands like Barefoot and Selyn',
      'Check for quality stitching and fabric weight',
      'Ask about fabric origin and weaving process',
      'Traditional handloom has irregular texture (authentic sign)'
    ]
  } else if (product === 'masks') {
    authenticityChecks = [
      'Traditional masks are hand-carved from Kaduru wood',
      'Should have natural pigments, not chemical paint',
      'Look for brush strokes in details',
      'Authentic masks from Ambalangoda'
    ]
  } else if (product === 'wellness') {
    authenticityChecks = [
      'Buy from certified Ayurveda centers',
      'Check for product registration numbers',
      'Look for ingredient labels in English',
      'Avoid unlabeled oils and herbs'
    ]
  } else {
    authenticityChecks = [
      'Ask for receipts and warranties',
      'Check for genuine labels and tags',
      'Compare prices at multiple stores',
      'Research brand authenticity online'
    ]
  }

  // Bargaining advice
  let bargainingAdvice: string = ''
  if (venue === 'government' || venue === 'mall') {
    bargainingAdvice = "Fixed prices - Don't try to bargain. Prices are set and won't be negotiated."
  } else if (venue === 'boutique') {
    bargainingAdvice = 'Limited bargaining. You can try asking for 5-10% discount on high-value items, but most prices are firm.'
  } else if (venue === 'market') {
    if (product === 'gems') {
      bargainingAdvice = 'DON\'T BARGAIN - Just don\'t buy gems from street markets! 90% are scams. Go to licensed dealers only.'
    } else {
      bargainingAdvice = 'Start at 40-50% of asking price. Vendors expect heavy negotiation. Walk away if they won\'t budge - they\'ll usually call you back with a better offer.'
    }
  }

  // Scam risks
  let scamRisks: string[] = []
  if (product === 'gems') {
    if (venue === 'market' || venue === 'boutique') {
      scamRisks = [
        '🚨 EXTREME RISK: 90% of street gem offers are complete scams',
        'Tuk-tuk drivers get 30-50% commission to bring you to "special" gem shops',
        'Fake certificates that don\'t verify online',
        'Heat-treated stones worth 10x less sold as premium',
        'Colored glass sold as genuine sapphires',
        'Pressure tactics: "Special price today only" or "My cousin owns the mine"'
      ]
    } else if (venue === 'government') {
      scamRisks = [
        'Low risk, but verify all certificates online before purchase',
        'Check that the dealer is licensed by National Gem and Jewelry Authority',
        'Get a second opinion from an independent appraiser'
      ]
    } else {
      scamRisks = [
        'Moderate risk - verify certificates and dealer credentials',
        'Avoid high-pressure sales tactics',
        'Compare prices with multiple certified dealers'
      ]
    }
  } else if (venue === 'market') {
    scamRisks = [
      'Pickpockets in crowded areas - keep valuables secure',
      'Vendors may quote inflated "tourist prices" (3-5x normal)',
      'Counterfeit products labeled as authentic',
      'Broken item scam: "You touched it, you broke it"'
    ]
  } else if (product === 'spices' && venue !== 'government') {
    scamRisks = [
      'Spice gardens charge 3-5x markup over retail',
      'Mixed quality spices sold as "premium grade"',
      'Pre-ground spices may be stale or diluted'
    ]
  } else {
    scamRisks = [
      'Always ask for printed receipts',
      'Verify return/exchange policies',
      'Check product quality before leaving the store'
    ]
  }

  // Suggested safe places (top 3 from districts based on venue)
  let suggestedPlaces: Array<{ name: string; areaLabel: string; reason: string; id: string }> = []
  
  if (venue === 'market') {
    const pettah = districts.find(d => d.id === 'pettah-market')
    if (pettah) {
      suggestedPlaces.push({
        name: pettah.name,
        areaLabel: pettah.areaLabel,
        reason: 'Best for budget shopping, but bargain hard',
        id: pettah.id
      })
    }
    const goodMarket = districts.find(d => d.id === 'good-market')
    if (goodMarket) {
      suggestedPlaces.push({
        name: goodMarket.name,
        areaLabel: goodMarket.areaLabel,
        reason: 'Organic & fair-trade products, fixed prices',
        id: goodMarket.id
      })
    }
  } else if (venue === 'boutique') {
    const galleFort = districts.find(d => d.id === 'galle-fort')
    if (galleFort) {
      suggestedPlaces.push({
        name: galleFort.name,
        areaLabel: galleFort.areaLabel,
        reason: 'Premium boutiques with verified quality',
        id: galleFort.id
      })
    }
    const barefoot = districts.find(d => d.id === 'barefoot')
    if (barefoot) {
      suggestedPlaces.push({
        name: barefoot.name,
        areaLabel: barefoot.areaLabel,
        reason: 'Authentic handwoven textiles & art',
        id: barefoot.id
      })
    }
  } else if (venue === 'government') {
    const laksala = districts.find(d => d.id === 'laksala')
    if (laksala) {
      suggestedPlaces.push({
        name: laksala.name,
        areaLabel: laksala.areaLabel,
        reason: 'Government-run, guaranteed quality, fixed prices',
        id: laksala.id
      })
    }
  } else if (venue === 'mall') {
    const odel = districts.find(d => d.id === 'odel')
    if (odel) {
      suggestedPlaces.push({
        name: odel.name,
        areaLabel: odel.areaLabel,
        reason: 'Premium lifestyle store with international brands',
        id: odel.id
      })
    }
  }

  return {
    riskLevel,
    authenticityChecks,
    bargainingAdvice,
    scamRisks,
    suggestedPlaces
  }
})

const showInteractiveGuide = computed(() => {
  return selectedProduct.value && selectedVenue.value
})
</script>

<template>
  <div class="w-full" id="smart-tips">
    <div class="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12">
      
      <!-- 2-Column Layout: Interactive Assistant + Tips -->
      <div class="grid grid-cols-1 lg:grid-cols-[600px_1fr] gap-8">
        
        <!-- Left Column: Interactive Shopping Assistant -->
        <div class="space-y-6">
          <div>
            <h2 class="text-text-main dark:text-white text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-4xl" style="font-variation-settings: 'FILL' 1">psychology</span>
              Smart Shopping Assistant
            </h2>
            <p class="text-text-muted dark:text-gray-400">Get personalized advice based on what and where you're buying</p>
          </div>
          
          <!-- Dropdowns -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Product Dropdown -->
            <div>
              <label class="block text-sm font-semibold text-text-main dark:text-white mb-2">I'm buying:</label>
              <div class="relative">
                <select
                  v-model="selectedProduct"
                  class="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181311] text-text-main dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-primary focus:border-primary transition"
                >
                  <option value="">Select a product...</option>
                  <option v-for="option in productOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            <!-- Venue Dropdown -->
            <div>
              <label class="block text-sm font-semibold text-text-main dark:text-white mb-2">Where shopping?</label>
              <div class="relative">
                <select
                  v-model="selectedVenue"
                  class="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#181311] text-text-main dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-primary focus:border-primary transition"
                >
                  <option value="">Select a venue...</option>
                  <option v-for="option in venueOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

        <!-- Dynamic Output -->
        <div v-if="showInteractiveGuide && interactiveGuide" class="space-y-6">
          <!-- Risk Level Banner -->
          <div
            :class="[
              'p-4 rounded-lg border-l-4 flex items-center gap-3',
              interactiveGuide.riskLevel === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
              interactiveGuide.riskLevel === 'medium' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500' :
              'bg-green-50 dark:bg-green-900/20 border-green-500'
            ]"
          >
            <span
              class="material-symbols-outlined text-3xl"
              :class="{
                'text-red-500': interactiveGuide.riskLevel === 'high',
                'text-amber-500': interactiveGuide.riskLevel === 'medium',
                'text-green-500': interactiveGuide.riskLevel === 'low'
              }"
            >
              {{ interactiveGuide.riskLevel === 'high' ? 'warning' : interactiveGuide.riskLevel === 'medium' ? 'info' : 'verified' }}
            </span>
            <div>
              <h3
                class="font-bold text-lg"
                :class="{
                  'text-red-700 dark:text-red-300': interactiveGuide.riskLevel === 'high',
                  'text-amber-700 dark:text-amber-300': interactiveGuide.riskLevel === 'medium',
                  'text-green-700 dark:text-green-300': interactiveGuide.riskLevel === 'low'
                }"
              >
                {{ interactiveGuide.riskLevel === 'high' ? '⚠️ High Scam Risk' : interactiveGuide.riskLevel === 'medium' ? '⚡ Medium Risk - Stay Alert' : '✅ Low Risk' }}
              </h3>
              <p
                class="text-sm"
                :class="{
                  'text-red-600 dark:text-red-400': interactiveGuide.riskLevel === 'high',
                  'text-amber-600 dark:text-amber-400': interactiveGuide.riskLevel === 'medium',
                  'text-green-600 dark:text-green-400': interactiveGuide.riskLevel === 'low'
                }"
              >
                {{ interactiveGuide.riskLevel === 'high' ? 'Exercise extreme caution with this combination' :
                   interactiveGuide.riskLevel === 'medium' ? 'Be careful and follow the checklist below' :
                   'This is a relatively safe shopping choice' }}
              </p>
            </div>
          </div>

          <!-- Grid: Authenticity + Bargaining -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Authenticity Checklist -->
            <div class="bg-white dark:bg-[#181311] p-6 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm">
              <h3 class="font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600">fact_check</span>
                Authenticity Checklist
              </h3>
              <ul class="space-y-3">
                <li v-for="check in interactiveGuide.authenticityChecks" :key="check" class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-blue-500 text-sm mt-1 flex-shrink-0">check_circle</span>
                  <span class="text-sm text-text-muted dark:text-gray-300">{{ check }}</span>
                </li>
              </ul>
            </div>

            <!-- Bargaining Advice -->
            <div class="bg-white dark:bg-[#181311] p-6 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm">
              <h3 class="font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-primary">handshake</span>
                Bargaining Strategy
              </h3>
              <p class="text-sm text-text-muted dark:text-gray-300 leading-relaxed">{{ interactiveGuide.bargainingAdvice }}</p>
            </div>
          </div>

          <!-- Scam Risks -->
          <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
            <h3 class="font-bold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-red-600">report</span>
              Scam Risks to Watch For
            </h3>
            <ul class="space-y-2">
              <li v-for="risk in interactiveGuide.scamRisks" :key="risk" class="flex items-start gap-2">
                <span class="material-symbols-outlined text-red-500 text-sm mt-1 flex-shrink-0">warning</span>
                <span class="text-sm text-red-700 dark:text-red-300">{{ risk }}</span>
              </li>
            </ul>
          </div>

          <!-- Suggested Safe Places -->
          <div v-if="interactiveGuide.suggestedPlaces.length > 0" class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h3 class="font-bold text-green-700 dark:text-green-300 mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-green-600">store</span>
              Recommended Safe Places
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                v-for="place in interactiveGuide.suggestedPlaces"
                :key="place.id"
                class="bg-white dark:bg-[#181311] p-4 rounded-lg border border-green-200 dark:border-green-800"
              >
                <h4 class="font-bold text-text-main dark:text-white text-sm mb-1">{{ place.name }}</h4>
                <p class="text-xs text-text-muted dark:text-gray-400 mb-2">{{ place.areaLabel }}</p>
                <p class="text-xs text-green-600 dark:text-green-400">{{ place.reason }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-gray-50 dark:bg-neutral-800/50 p-12 rounded-xl text-center">
          <span class="material-symbols-outlined text-6xl text-gray-400 mb-4">shopping_basket</span>
          <p class="text-text-muted dark:text-gray-400">Select a product and venue to get personalized shopping advice</p>
        </div>
        </div>
      
        <!-- Right Column: Tips & Guides -->
        <div class="space-y-6">
        <h3 class="text-text-main dark:text-white text-2xl font-bold flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">lightbulb</span>
          Essential Tips
        </h3>

        <!-- Authentic vs Tourist Traps -->
        <div class="space-y-4">
          <!-- Authentic Experience -->
          <div class="bg-white dark:bg-[#181311] p-5 rounded-xl border-l-4 border-green-500 shadow-sm">
            <div class="flex items-center gap-2 mb-3">
              <div class="size-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span class="material-symbols-outlined text-green-600 text-lg">verified</span>
              </div>
              <h4 class="text-base font-bold text-text-main dark:text-white">Authentic</h4>
            </div>
            <ul class="space-y-2">
              <li v-for="item in guides.authenticExperience.slice(0, 4)" :key="item" class="flex items-start gap-2">
                <span class="material-symbols-outlined text-green-500 text-sm mt-0.5 flex-shrink-0">check_circle</span>
                <span class="text-text-muted dark:text-gray-300 text-xs leading-relaxed">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Tourist Traps -->
          <div class="bg-white dark:bg-[#181311] p-5 rounded-xl border-l-4 border-red-500 shadow-sm">
            <div class="flex items-center gap-2 mb-3">
              <div class="size-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span class="material-symbols-outlined text-red-600 text-lg">warning</span>
              </div>
              <h4 class="text-base font-bold text-text-main dark:text-white">Watch Out</h4>
            </div>
            <ul class="space-y-2">
              <li v-for="trap in guides.touristTraps.slice(0, 4)" :key="trap" class="flex items-start gap-2">
                <span class="material-symbols-outlined text-red-500 text-sm mt-0.5 flex-shrink-0">cancel</span>
                <span class="text-text-muted dark:text-gray-300 text-xs leading-relaxed">{{ trap }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bargaining Tips -->
        <div class="bg-primary/5 dark:bg-primary/10 p-5 rounded-xl border border-primary/20">
          <h4 class="font-bold text-text-main dark:text-white mb-3 flex items-center gap-2 text-sm">
            <span class="material-symbols-outlined text-primary text-lg">handshake</span>
            Bargaining Tips
          </h4>
          <ul class="space-y-2">
            <li v-for="tip in guides.bargainingTips.slice(0, 3)" :key="tip" class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-sm mt-0.5 flex-shrink-0">arrow_right</span>
              <span class="text-text-muted dark:text-gray-300 text-xs leading-relaxed">{{ tip }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <!-- Full-width Scam Alerts Section -->
    <div class="border-t border-gray-200 dark:border-neutral-800 mt-12 pt-12">
      <div class="space-y-4">
        <h2 class="text-text-main dark:text-white text-3xl font-bold flex items-center gap-2">
          <span class="material-symbols-outlined text-red-600 text-4xl">gpp_bad</span>
          Common Shopping Scams
        </h2>
        <p class="text-sm text-text-muted dark:text-gray-400 mb-4">
          Click each warning to expand and learn how to protect yourself:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ShoppingWarningCard 
            v-for="warning in touristTrapWarnings" 
            :key="warning.id"
            :warning="warning"
            :expandable="true"
          />
        </div>
      </div>
    </div>

    <!-- Bargaining Tips Section -->
    <div class="border-t border-gray-200 dark:border-neutral-800 mt-12 pt-12">
      <h3 class="text-2xl font-bold text-text-main dark:text-white mb-6 flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-3xl">handshake</span>
        Bargaining Strategies
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="(tip, index) in guides.bargainingTips" 
          :key="index"
          class="bg-white dark:bg-[#181311] p-5 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm"
        >
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span class="text-primary font-bold text-sm">{{ index + 1 }}</span>
            </div>
            <p class="text-sm text-text-muted dark:text-gray-300 leading-relaxed">{{ tip }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Duty Free Info -->
    <div class="border-t border-gray-200 dark:border-neutral-800 mt-12 pt-12">
      <h3 class="text-2xl font-bold text-text-main dark:text-white mb-6 flex items-center gap-2">
        <span class="material-symbols-outlined text-blue-600 text-3xl">flight_takeoff</span>
        Duty Free & Export Info
      </h3>
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li v-for="info in guides.dutyFreeInfo" :key="info" class="flex items-start gap-3">
            <span class="material-symbols-outlined text-blue-600 text-lg mt-0.5 flex-shrink-0">info</span>
            <span class="text-sm text-text-muted dark:text-gray-300">{{ info }}</span>
          </li>
        </ul>
      </div>
    </div>

    </div>
  </div>
</template>
