<template>
  <div class="w-full lg:w-[320px] flex flex-col gap-6">
    
    <!-- Direct Contact Card -->
    <div class="bg-[#221510] text-white rounded-2xl p-6 shadow-lg bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <h4 class="text-lg font-bold mb-5 flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">support_agent</span>
        Other ways to connect
      </h4>
      
      <div class="space-y-4">
        <!-- WhatsApp -->
        <a 
          :href="whatsappLink"
          target="_blank"
          class="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 transition-all cursor-pointer"
        >
          <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-white">chat</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-bold text-white group-hover:text-green-400 transition-colors">WhatsApp</p>
            <p class="text-xs text-white/60">+94 77 123 4567</p>
          </div>
          <span class="material-symbols-outlined text-white/40 group-hover:text-green-400 transition-colors">open_in_new</span>
        </a>
        
        <!-- Phone -->
        <a 
          href="tel:+94771234567"
          class="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 transition-all cursor-pointer"
        >
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-white">call</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-bold text-white group-hover:text-primary transition-colors">Call Us</p>
            <p class="text-xs text-white/60">24/7 emergency support</p>
          </div>
          <span class="material-symbols-outlined text-white/40 group-hover:text-primary transition-colors">phone_forwarded</span>
        </a>
        
        <!-- Email -->
        <div 
          class="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer"
          @click="copyEmail"
        >
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-white">mail</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Email</p>
            <p class="text-xs text-white/60">hello@ceylonwiki.com</p>
          </div>
          <div class="flex gap-1">
            <button 
              class="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              :class="emailCopied ? 'text-green-400' : 'text-white/60'"
              title="Copy email"
            >
              <span class="material-symbols-outlined text-sm">{{ emailCopied ? 'check' : 'content_copy' }}</span>
            </button>
            <a 
              href="mailto:hello@ceylonwiki.com"
              class="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-blue-400 transition-colors"
              title="Send email"
              @click.stop
            >
              <span class="material-symbols-outlined text-sm">send</span>
            </a>
          </div>
        </div>
        
        <!-- Live Chat -->
        <div 
          class="group flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer"
          :class="isLiveChatOnline 
            ? 'bg-white/5 hover:bg-emerald-500/20 border-white/10 hover:border-emerald-500/30' 
            : 'bg-white/5 hover:bg-gray-500/20 border-white/10 hover:border-gray-500/30'"
        >
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform relative"
            :class="isLiveChatOnline ? 'bg-emerald-500' : 'bg-gray-500'"
          >
            <span class="material-symbols-outlined text-white">forum</span>
            <span 
              v-if="isLiveChatOnline"
              class="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#221510] animate-pulse"
            ></span>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p 
                class="text-sm font-bold transition-colors"
                :class="isLiveChatOnline ? 'text-white group-hover:text-emerald-400' : 'text-white/70'"
              >Live Chat</p>
              <span 
                class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                :class="isLiveChatOnline 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-gray-500/20 text-gray-400'"
              >
                {{ isLiveChatOnline ? 'Online' : 'Offline' }}
              </span>
            </div>
            <p class="text-xs text-white/60">
              {{ isLiveChatOnline ? 'Avg. response: 2 min' : 'Returns at 9am IST' }}
            </p>
          </div>
          <button 
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            :class="isLiveChatOnline 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
              : 'bg-white/10 text-white/60'"
          >
            {{ isLiveChatOnline ? 'Start Chat' : 'Leave Message' }}
          </button>
        </div>
        
        <!-- Office Location -->
        <div class="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-white/80">location_on</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-bold text-white">Office</p>
            <p class="text-xs text-white/60">123 Galle Road, Colombo 07</p>
            <p class="text-xs text-white/40 mt-0.5">Mon-Fri 9am-5pm</p>
          </div>
          <a 
            href="https://maps.google.com/?q=Colombo+07+Sri+Lanka"
            target="_blank"
            class="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-primary transition-colors"
            title="Get directions"
          >
            <span class="material-symbols-outlined text-sm">directions</span>
          </a>
        </div>
      </div>
    </div>

    <!-- FAQ Mini Section -->
    <div class="bg-white dark:bg-[#2a1d18] rounded-2xl shadow-sm border border-[#e6dedb] dark:border-[#3a2d29] p-6">
      <h4 class="text-lg font-bold text-[#181311] dark:text-white mb-4">Common Questions</h4>
      
      <!-- FAQ Search -->
      <div class="relative mb-4">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">search</span>
        <input 
          v-model="faqSearch"
          type="text"
          placeholder="Search FAQs..."
          class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-gray-400"
        />
        <button 
          v-if="faqSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          @click="faqSearch = ''"
        >
          <span class="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
      
      <!-- FAQ Accordions -->
      <div class="flex flex-col gap-3">
        <div 
          v-for="faq in displayedFaqs" 
          :key="faq.question"
          class="group bg-background-light dark:bg-[#221510] rounded-lg overflow-hidden"
        >
          <details class="[&_summary::-webkit-details-marker]:hidden">
            <summary 
              class="flex items-center justify-between cursor-pointer font-bold text-sm text-[#181311] dark:text-gray-200 p-3"
              @click="faqFeedback[faq.question] = undefined"
            >
              {{ faq.question }}
              <span class="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
            </summary>
            <div class="px-3 pb-3">
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ faq.answer }}
              </p>
              
              <!-- Did this help? -->
              <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div v-if="faqFeedback[faq.question] === undefined" class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">Did this help?</span>
                  <div class="flex gap-1">
                    <button 
                      class="p-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-gray-400 hover:text-green-500 transition-all"
                      @click.prevent="markHelpful(faq.question, true)"
                    >
                      <span class="material-symbols-outlined text-lg">thumb_up</span>
                    </button>
                    <button 
                      class="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-all"
                      @click.prevent="markHelpful(faq.question, false)"
                    >
                      <span class="material-symbols-outlined text-lg">thumb_down</span>
                    </button>
                  </div>
                </div>
                <div v-else class="flex items-center gap-2">
                  <span 
                    class="material-symbols-outlined text-sm"
                    :class="faqFeedback[faq.question] ? 'text-green-500' : 'text-gray-400'"
                  >{{ faqFeedback[faq.question] ? 'check_circle' : 'info' }}</span>
                  <span class="text-xs" :class="faqFeedback[faq.question] ? 'text-green-600 dark:text-green-400' : 'text-gray-500'">
                    {{ faqFeedback[faq.question] ? 'Thanks for the feedback!' : 'We\'ll improve this answer' }}
                  </span>
                </div>
              </div>
            </div>
          </details>
        </div>
        
        <!-- No results -->
        <div v-if="displayedFaqs.length === 0" class="text-center py-4">
          <span class="material-symbols-outlined text-3xl text-gray-300 dark:text-gray-600">search_off</span>
          <p class="text-sm text-gray-500 mt-2">No FAQs match your search</p>
        </div>
      </div>
      
      <div class="mt-4 pt-4 border-t border-[#e6dedb] dark:border-[#3a2d29]">
        <button 
          class="text-primary text-sm font-bold hover:underline flex items-center gap-1"
          @click="faqSearch = ''; showAllFaqs = !showAllFaqs"
        >
          {{ showAllFaqs ? 'Show less' : 'View all FAQs' }}
          <span class="material-symbols-outlined text-sm">{{ showAllFaqs ? 'expand_less' : 'arrow_forward' }}</span>
        </button>
      </div>
    </div>

    <!-- Partnership Promo -->
    <div v-if="partnership" class="bg-primary/10 rounded-2xl p-6 border border-primary/20">
      <h4 class="text-lg font-bold text-[#181311] dark:text-white mb-2">{{ partnership.title }}</h4>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ partnership.subtitle }}</p>
      
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
      
      <button 
        class="w-full py-2 bg-white dark:bg-[#221510] text-primary font-bold rounded-lg text-sm border border-primary/20 hover:bg-primary/5 transition-colors"
        @click="showPartnershipModal = true"
      >
        {{ partnership.buttonText }}
      </button>
    </div>
    
    <!-- Partnership Modal -->
    <PartnershipModal 
      :is-open="showPartnershipModal"
      @close="showPartnershipModal = false"
    />
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import PartnershipModal from './PartnershipModal.vue'

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
  topics?: string[]
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
  activeTab?: string
}>()

// Email copy state
const emailCopied = ref(false)

// Partnership modal state
const showPartnershipModal = ref(false)

// FAQ search
const faqSearch = ref('')

// Show all FAQs toggle
const showAllFaqs = ref(false)

// FAQ feedback state
const faqFeedback = reactive<Record<string, boolean | undefined>>({})

// Live chat status
const isLiveChatOnline = computed(() => {
  const now = new Date()
  const hour = now.getHours()
  return hour >= 9 && hour < 18
})

// WhatsApp link
const whatsappLink = computed(() => {
  const phone = '94771234567'
  const message = encodeURIComponent('Hello! I would like to inquire about your services.')
  return `https://wa.me/${phone}?text=${message}`
})

// Filtered FAQs based on tab, search, and limit
const displayedFaqs = computed(() => {
  let filtered = props.faqs
  
  // First filter by tab
  if (props.activeTab) {
    filtered = filtered.filter(faq => !faq.tab || faq.tab === props.activeTab || faq.tab === 'general')
  }
  
  // Then filter by search
  if (faqSearch.value.trim()) {
    const searchLower = faqSearch.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower) ||
      (faq.topics && faq.topics.some(t => t.toLowerCase().includes(searchLower)))
    )
  }
  
  // Limit to 4 FAQs unless searching or showing all
  return (faqSearch.value.trim() || showAllFaqs.value) ? filtered : filtered.slice(0, 4)
})

// Copy email
async function copyEmail() {
  try {
    await navigator.clipboard.writeText('hello@ceylonwiki.com')
    emailCopied.value = true
    setTimeout(() => {
      emailCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// FAQ feedback
function markHelpful(question: string, helpful: boolean) {
  faqFeedback[question] = helpful
}
</script>
