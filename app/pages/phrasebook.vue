<template>
  <div class="w-full">
    <!-- Hero Section -->
    <div class="relative w-full">
      <div 
        class="flex min-h-[420px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 relative" 
        style='background-image: linear-gradient(rgba(16, 34, 31, 0.4) 0%, rgba(16, 34, 31, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjEjNjMJxFxsI3nRzu1Nj35p2tjXqo4i8r-a7opPNNryFOPJ1E2D2C5EDxtmBaJtdDMYsB25Uu_J5jAZVd7ZG3HPkwI8TlSOSYs5JdN67tZSVXTn4fH3kB4b-HE6xFvEs82iIRogq-MS0mR_7iX_eEye-odG7HQuCoE6JitFmi2DRUEjRWgi_u5wntLIBszrqCJvNrie8BVQfT8ZzgW_F_P2XnsISu4eRqps-7DpAHP4Vsd-frCDO1slceGZ0wSpavxKmJYAtyD6cT");'
      >
        <div class="flex flex-col gap-3 text-center max-w-[720px] z-10 pt-20">
          <h1 class="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg font-display">
            Speak Like a Local
          </h1>
          <p class="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            Connect deeply with Sri Lanka. Master essential phrases and learn the cultural etiquette that opens hearts.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="w-full max-w-[560px] z-10 mt-4">
          <div class="flex w-full items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-2 border border-white/20">
            <div class="flex items-center justify-center pl-3 text-gray-500">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input 
              v-model="searchQuery"
              class="w-full bg-transparent border-none text-charcoal placeholder:text-gray-500 focus:ring-0 h-12 px-3 text-base outline-none" 
              placeholder="Search phrases (e.g., 'How much?', 'Thank you')..."
            />
            <button class="flex items-center justify-center h-10 w-10 rounded-lg text-gray-500 hover:text-primary hover:bg-background-light transition-colors" title="Voice Search">
              <span class="material-symbols-outlined">mic</span>
            </button>
            <button class="hidden sm:flex h-10 px-6 ml-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg items-center justify-center transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="flex flex-col items-center px-4 md:px-10 lg:px-40 py-10 gap-12 w-full max-w-[1440px] mx-auto">
      
      <!-- Language Toggle & Controls -->
      <div class="flex flex-col md:flex-row w-full justify-between items-center gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 class="text-2xl font-bold text-charcoal font-display">Categories</h2>
          <p class="text-gray-500 mt-1">Select a topic to start learning</p>
        </div>
        <div class="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm">
          <label 
            v-for="lang in ['Sinhala', 'Tamil']" 
            :key="lang"
            class="cursor-pointer"
          >
            <input 
              type="radio" 
              name="lang" 
              :value="lang.toLowerCase()" 
              v-model="selectedLanguage"
              class="peer sr-only"
            />
            <div class="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-500 peer-checked:bg-primary peer-checked:text-white peer-checked:shadow-sm transition-all flex items-center gap-2">
              <span>{{ lang }}</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        <div 
          v-for="category in categories" 
          :key="category.name"
          class="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-primary hover:shadow-md cursor-pointer transition-all"
        >
          <div class="h-12 w-12 rounded-full bg-background-light text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-2xl">{{ category.icon }}</span>
          </div>
          <span class="text-charcoal font-bold text-sm text-center">{{ category.name }}</span>
        </div>
      </div>

      <!-- Content Area -->
      <div class="w-full flex flex-col lg:flex-row gap-8">
        
        <!-- Phrases List -->
        <div class="flex-1 flex flex-col gap-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-primary/10 rounded-lg text-primary">
              <span class="material-symbols-outlined">handshake</span>
            </div>
            <h3 class="text-xl font-bold text-charcoal font-display">Greetings & Politeness</h3>
          </div>

          <!-- Phrases Loops -->
          <template v-for="(phrase, index) in phrases" :key="index">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow gap-4">
              <div class="flex flex-col gap-1">
                <p class="sinhala-text text-2xl font-bold text-charcoal">{{ phrase.native }}</p>
                <p class="text-sm font-bold text-primary uppercase tracking-wide">{{ phrase.phonetic }}</p>
                <p class="text-gray-500 text-sm mt-1">{{ phrase.english }}</p>
              </div>
              <button class="shrink-0 h-12 w-12 rounded-full bg-background-light text-charcoal hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-gray-200 group">
                <span class="material-symbols-outlined group-hover:fill-current">play_arrow</span>
              </button>
            </div>

            <!-- Insert Etiquette Banner after 2nd item -->
            <div v-if="index === 1" class="relative overflow-hidden rounded-2xl bg-[#10221f] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center border border-primary/20 shadow-lg my-2">
              <div class="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl"></div>
              <div class="relative z-10 p-4 bg-white/10 backdrop-blur-md rounded-xl text-primary border border-white/10 shrink-0">
                <span class="material-symbols-outlined text-4xl">dry_cleaning</span>
              </div>
              <div class="relative z-10 flex-1 text-center sm:text-left">
                <h4 class="text-white font-bold text-lg mb-1 flex items-center justify-center sm:justify-start gap-2">
                  <span class="material-symbols-outlined text-primary text-sm">info</span>
                  Cultural Tip: Greeting
                </h4>
                <p class="text-gray-300 text-sm leading-relaxed">
                  When saying "Ayubowan", place your palms together in a prayer-like gesture at chest height. A slight bow of the head shows deeper respect.
                </p>
              </div>
            </div>
          </template>
        </div>

        <!-- Sidebar -->
        <div class="w-full lg:w-[320px] flex flex-col gap-6">
          <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm h-fit sticky top-24">
            <div class="flex items-center gap-2 mb-4 text-charcoal">
              <span class="material-symbols-outlined text-primary">temple_buddhist</span>
              <h3 class="font-bold text-lg">Temple Etiquette</h3>
            </div>
            <div class="flex flex-col gap-4">
              <div v-for="(tip, idx) in templeTips" :key="idx" class="flex gap-4 items-start">
                <div class="mt-1 h-2 w-2 rounded-full bg-primary shrink-0"></div>
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-bold text-charcoal">{{ tip.title }}</span>
                  <p class="text-xs text-text-muted leading-relaxed text-gray-500">{{ tip.desc }}</p>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-100">
                <button class="w-full py-2.5 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">
                  Read Full Guide
                </button>
              </div>
            </div>
          </div>

          <!-- Ad Card -->
          <div 
            class="rounded-2xl bg-cover bg-center h-64 relative overflow-hidden group cursor-pointer" 
            style='background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCY3ePGNrycYwMPrBmJjalSwcYWYjD2vokyFVPeqBlMkc141Cxhlh_KSzlq-CReNWeziyQwNNjpwCQ7wbbdKPBrV6Xmq9pi4Ntaa30ya4z1jJPv1bLyrKyKFc6DO-Pm6p3bN2oRO3NG3rS3o4-ZEaF47Pn0GPqS4Gm9cVdjhXBSlcREki5DlpQIOWLv1xOhFZrfX-xcE7WzkS_T2b_kKHKuYg5aU2ntW6FRqN3-UZE5ntfOvnjJYMiBAAYj3IFnSKjgNBeSuUNML8tz");'
          >
            <div class="absolute bottom-0 left-0 p-6 w-full">
              <span class="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-2">Popular Tour</span>
              <h3 class="text-white font-bold text-xl leading-tight mb-1">Ella Tea Plantations</h3>
              <div class="flex items-center text-white/80 text-sm gap-1 group-hover:translate-x-1 transition-transform">
                <span>Book a local guide</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const selectedLanguage = ref('sinhala')

const categories = [
  { name: 'Greetings', icon: 'handshake' },
  { name: 'Directions', icon: 'explore' },
  { name: 'Dining', icon: 'restaurant' },
  { name: 'Shopping', icon: 'shopping_bag' },
  { name: 'Emergency', icon: 'emergency' },
  { name: 'Temple Rules', icon: 'temple_buddhist' },
]

const phrases = [
  { native: 'ආයුබෝවන්', phonetic: 'Ayu-bo-wan', english: '"May you live long" (Formal Greeting)' },
  { native: 'ස්තුතියි', phonetic: 'Sthu-thi-yi', english: 'Thank you' },
  { native: 'කොහොමද?', phonetic: 'Ko-ho-ma-da?', english: 'How are you? (Informal)' },
  { native: 'මගේ නම...', phonetic: 'Ma-ge na-ma...', english: 'My name is...' },
]

const templeTips = [
  { title: 'Remove Footwear', desc: 'Always remove shoes and hats before entering the sacred temple grounds.' },
  { title: 'Modest Dress', desc: 'Cover shoulders and knees. White clothing is preferred and seen as respectful.' },
  { title: 'No Backs to Buddha', desc: 'Never turn your back to a Buddha statue for a selfie. It is considered very disrespectful.' },
]

// Add custom font for Sinhala text
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;700&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
  ]
})
</script>

<style scoped>
.sinhala-text {
  font-family: "Noto Serif Sinhala", serif;
}
</style>
