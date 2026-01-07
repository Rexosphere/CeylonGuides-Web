<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-dark-charcoal dark:text-white font-display antialiased">
    
    <!-- Hero Section -->
    <section class="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center" 
        style='background-image: linear-gradient(rgba(16, 32, 34, 0.4) 0%, rgba(16, 32, 34, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2xNtC6Msj0wV0Tayt-tD_VIILj7f1Irigig_tna9kLLbT8-yAmzXL7uDX1mX-Mu8FyRfrnVPT8wtNLwicbBZYF3c83iuJZnwt8fQ8SpoWNfszslkw1kJg8Svwc3IO5FYie78bOYCpvDWUafqt0fDRZ844Z1_HSJKr-ZMRfyAgJ98kc6VDgrWi7qCG4Gj4kfQFV7vgIxMbsCNdjMjYfTT2sce-YdFHHUUeUm_BgKc6N_FpNZOpooDYXNTQN94wUkFRTxEiGsobQeA");'>
      </div>
      <div class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div class="max-w-4xl space-y-6">
          <h1 class="font-display text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-md">
            Clean Dining & Safe Food Guide
          </h1>
          <p class="mx-auto max-w-2xl text-lg font-medium text-white/90 md:text-xl drop-shadow-sm">
            Discover hygienic and certified culinary experiences across Sri Lanka's most beautiful locales.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="sticky top-[73px] z-40 w-full border-b border-[#f0f4f4] dark:border-gray-700 bg-white dark:bg-background-dark py-4 shadow-sm">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
          <!-- Active Filter -->
          <button 
            @click="selectedFilter = selectedFilter === 'safe' ? null : 'safe'"
            :class="[
              'flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105',
              selectedFilter === 'safe' ? 'bg-primary text-dark-charcoal' : 'bg-[#f0f4f4] dark:bg-gray-800 text-dark-charcoal dark:text-white hover:bg-[#e0e8e9] dark:hover:bg-gray-700'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">verified_user</span>
            Safe & Secure
          </button>
          <!-- Inactive Filters -->
          <button 
            @click="selectedFilter = selectedFilter === 'vegetarian' ? null : 'vegetarian'"
            :class="[
              'flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
              selectedFilter === 'vegetarian' ? 'bg-primary text-dark-charcoal' : 'bg-[#f0f4f4] dark:bg-gray-800 text-dark-charcoal dark:text-white hover:bg-[#e0e8e9] dark:hover:bg-gray-700'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">spa</span>
            Vegetarian
          </button>
          <button 
            @click="selectedFilter = selectedFilter === 'vegan' ? null : 'vegan'"
            :class="[
              'flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
              selectedFilter === 'vegan' ? 'bg-primary text-dark-charcoal' : 'bg-[#f0f4f4] dark:bg-gray-800 text-dark-charcoal dark:text-white hover:bg-[#e0e8e9] dark:hover:bg-gray-700'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">nutrition</span>
            Vegan
          </button>
          <button 
            @click="selectedFilter = selectedFilter === 'halal' ? null : 'halal'"
            :class="[
              'flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
              selectedFilter === 'halal' ? 'bg-primary text-dark-charcoal' : 'bg-[#f0f4f4] dark:bg-gray-800 text-dark-charcoal dark:text-white hover:bg-[#e0e8e9] dark:hover:bg-gray-700'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">restaurant_menu</span>
            Halal
          </button>
          <button 
            @click="selectedFilter = selectedFilter === 'hygiene' ? null : 'hygiene'"
            :class="[
              'flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
              selectedFilter === 'hygiene' ? 'bg-primary text-dark-charcoal' : 'bg-[#f0f4f4] dark:bg-gray-800 text-dark-charcoal dark:text-white hover:bg-[#e0e8e9] dark:hover:bg-gray-700'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">water_drop</span>
            High Hygiene
          </button>
          <button 
            @click="selectedFilter = selectedFilter === 'finedining' ? null : 'finedining'"
            :class="[
              'flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
              selectedFilter === 'finedining' ? 'bg-primary text-dark-charcoal' : 'bg-[#f0f4f4] dark:bg-gray-800 text-dark-charcoal dark:text-white hover:bg-[#e0e8e9] dark:hover:bg-gray-700'
            ]"
          >
            <span class="material-symbols-outlined text-[18px]">local_fire_department</span>
            Fine Dining
          </button>
        </div>
      </div>
    </section>

    <!-- Hybrid Content: List & Map -->
    <div class="container mx-auto flex flex-col-reverse px-4 py-8 lg:flex-row lg:gap-8 lg:px-8 lg:py-12">
      <!-- Venue List (Left) -->
      <div class="flex w-full flex-col gap-6 lg:w-[55%] xl:w-[60%]">
        <!-- Card 1 -->
        <div class="group flex flex-col gap-4 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm ring-1 ring-slate-100 dark:ring-gray-700 transition-all hover:shadow-md md:flex-row md:items-stretch">
          <div class="h-56 w-full shrink-0 overflow-hidden rounded-xl md:h-auto md:w-64">
            <div 
              class="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOyJB0PUaR1LeNhV5kSLLX-t9dLJkClvwTnhPl7x6gq38QU6xKQTBg7Ve4MMbDUhHJwzYP_OWA8R073ZfZgRDHgCxNVl2y981AAxlwcJAS7d8QTBjT_gl3zFW6lY2DMVVdaDlI7obiA4NaujRXmBNuwHPk40mS82gNYqCjv3zxGlX6ynGHdcW9VHmUromJ2sCvY86e_YiFZpQJeJ6L9dZ7BZsJG_QAvRZCkj7hR6caYyGII2AJwsdYB0N_aKQaFIS0nx-t4dsc-k4");'>
            </div>
          </div>
          <div class="flex flex-1 flex-col justify-between py-2">
            <div>
              <div class="mb-2 flex items-start justify-between">
                <h3 class="text-xl font-bold text-dark-charcoal dark:text-white">Ministry of Crab</h3>
                <span class="flex items-center gap-1 rounded-lg bg-green-50 dark:bg-green-900/20 px-2 py-1 text-xs font-bold text-green-700 dark:text-green-300">
                  <span class="material-symbols-outlined text-[14px]">check_circle</span>
                  Certified
                </span>
              </div>
              <div class="mb-3 flex items-center gap-1">
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">(5/5 Hygiene)</span>
              </div>
              <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Situated in the Old Dutch Hospital, this venue offers a world-class seafood experience with stringent hygiene protocols and premium ingredient sourcing.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary">Seafood</span>
                <span class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary">Halal Options</span>
                <span class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary">Premium</span>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button class="group/btn flex items-center gap-1 text-sm font-bold text-deep-teal dark:text-primary hover:text-primary transition-colors">
                View Details
                <span class="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="group flex flex-col gap-4 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm ring-1 ring-slate-100 dark:ring-gray-700 transition-all hover:shadow-md md:flex-row md:items-stretch">
          <div class="h-56 w-full shrink-0 overflow-hidden rounded-xl md:h-auto md:w-64">
            <div 
              class="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYFjLkWSPHb9yQj3GwN7D4xWEV_LYQs7Eql27oGcdnkVOcHmC3QUG4Bd8w9NtLt_Jft6uNOONmddhd28jSkZbOWWLJlauMJlcBoiQaW8p3CSBcNh20VKy4U9wuqemdi5KQErAjo6uX3NJuBGt54KzXZmLKOhczV8Lvv5dGQk3_zMI25YxWxDwC0cVxcaokNMEzAUSR8EK5bKDmg0Ci_dWKn0riuArya9COCAs60vufTXZnHlhjo26mZp3vLupxIJ_jCnyCkCrm5nc");'>
            </div>
          </div>
          <div class="flex flex-1 flex-col justify-between py-2">
            <div>
              <div class="mb-2 flex items-start justify-between">
                <h3 class="text-xl font-bold text-dark-charcoal dark:text-white">Nuga Gama</h3>
                <span class="flex items-center gap-1 rounded-lg bg-green-50 dark:bg-green-900/20 px-2 py-1 text-xs font-bold text-green-700 dark:text-green-300">
                  <span class="material-symbols-outlined text-[14px]">check_circle</span>
                  Certified
                </span>
              </div>
              <div class="mb-3 flex items-center gap-1">
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[20px]">local_florist</span>
                <span class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">(4/5 Hygiene)</span>
              </div>
              <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                A rustic village experience in the heart of the city. Traditional clay pot cooking using organic vegetables directly from the garden.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary">Organic</span>
                <span class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary">Vegetarian Friendly</span>
                <span class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary">Outdoor</span>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button class="group/btn flex items-center gap-1 text-sm font-bold text-deep-teal dark:text-primary hover:text-primary transition-colors">
                View Details
                <span class="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="group flex flex-col gap-4 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm ring-1 ring-slate-100 dark:ring-gray-700 transition-all hover:shadow-md md:flex-row md:items-stretch">
          <div class="h-56 w-full shrink-0 overflow-hidden rounded-xl md:h-auto md:w-64">
            <div 
              class="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOHd0eHrPpfadjBcE2EH8HccXm4ufhtFweYXeVchLHS2mrKvqoX1X7-V5vQGZsqv6KNBrH7MDkaT7UUoUXrC0GJ_eemg0CYsW5Hz1ApSnK-rFXmxCWR7Ji3_wWl6QcYPhHAdTMOePYSJ29YqN9bOCKS9igfKrPwT9QBADkFDL334DsSntQPTzROeLktRgIPVd9fzl6r09IbjLIMMdqn8rZFtQNZrQEfB_uXkO5DoDcfqsFsm5p9wnmjCK2WdMJIGBPlQWbn2XTwJE");'>
            </div>
          </div>
          <div class="flex flex-1 flex-col justify-between py-2">
            <div>
              <div class="mb-2 flex items-start justify-between">
                <h3 class="text-xl font-bold text-dark-charcoal dark:text-white">The Vegan Kitchen</h3>
              </div>
              <div class="mb-3 flex items-center gap-1">
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="material-symbols-outlined text-coral-orange text-[20px] fill-current">local_florist</span>
                <span class="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">(5/5 Hygiene)</span>
              </div>
              <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Fully plant-based menu featuring local flavors reimagined. Certified clean kitchen with an open layout for transparency.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary">Vegan</span>
                <span class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary">Gluten Free</span>
                <span class="rounded-md bg-[#f0f4f4] dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-deep-teal dark:text-primary">Cafe</span>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button class="group/btn flex items-center gap-1 text-sm font-bold text-deep-teal dark:text-primary hover:text-primary transition-colors">
                View Details
                <span class="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Map (Right) -->
      <div class="mb-8 w-full lg:mb-0 lg:h-[calc(100vh-200px)] lg:w-[45%] xl:w-[40%] sticky lg:top-36">
        <div class="h-[400px] w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-gray-800 shadow-md lg:h-full">
          <!-- Abstract Map Representation -->
          <div class="relative h-full w-full bg-[#f0f4f4] dark:bg-gray-800">
            <div 
              class="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-no-repeat bg-[center_top_300px]"
            >
            </div>
            <!-- Map Pins -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div class="group relative flex cursor-pointer flex-col items-center">
                <div class="rounded-lg bg-white dark:bg-gray-900 p-2 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 absolute bottom-10 w-32 text-center">
                  <p class="text-xs font-bold text-dark-charcoal dark:text-white">Ministry of Crab</p>
                  <p class="text-[10px] text-coral-orange">5/5 Hygiene</p>
                </div>
                <span class="material-symbols-outlined text-4xl text-primary drop-shadow-md">location_on</span>
              </div>
            </div>
            <div class="absolute top-1/3 left-1/3 transform">
              <div class="group relative flex cursor-pointer flex-col items-center">
                <div class="rounded-lg bg-white dark:bg-gray-900 p-2 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 absolute bottom-10 w-32 text-center">
                  <p class="text-xs font-bold text-dark-charcoal dark:text-white">Nuga Gama</p>
                  <p class="text-[10px] text-coral-orange">4/5 Hygiene</p>
                </div>
                <span class="material-symbols-outlined text-4xl text-deep-teal/80 dark:text-primary/80 drop-shadow-md">location_on</span>
              </div>
            </div>
            <div class="absolute bottom-1/3 right-1/3 transform">
              <div class="group relative flex cursor-pointer flex-col items-center">
                <div class="rounded-lg bg-white dark:bg-gray-900 p-2 shadow-lg opacity-0 transition-opacity group-hover:opacity-100 absolute bottom-10 w-32 text-center">
                  <p class="text-xs font-bold text-dark-charcoal dark:text-white">The Vegan Kitchen</p>
                  <p class="text-[10px] text-coral-orange">5/5 Hygiene</p>
                </div>
                <span class="material-symbols-outlined text-4xl text-deep-teal/80 dark:text-primary/80 drop-shadow-md">location_on</span>
              </div>
            </div>
            <!-- Map Controls -->
            <div class="absolute bottom-4 right-4 flex flex-col gap-2">
              <button class="rounded-lg bg-white dark:bg-gray-700 p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 text-dark-charcoal dark:text-white">
                <span class="material-symbols-outlined">add</span>
              </button>
              <button class="rounded-lg bg-white dark:bg-gray-700 p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 text-dark-charcoal dark:text-white">
                <span class="material-symbols-outlined">remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <button class="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-bold text-dark-charcoal shadow-xl transition-transform hover:scale-105 hover:bg-primary/90">
      <span class="material-symbols-outlined">rate_review</span>
      Submit Rating
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// SEO Meta
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Clean Dining & Food Guide - CeylonGuide',
  meta: [
    { name: 'description', content: 'Discover hygienic and certified culinary experiences across Sri Lanka\'s most beautiful locales.' }
  ]
})

// Filter state
const selectedFilter = ref<string | null>('safe')
</script>

<style scoped>
/* Custom scrollbar for horizontal lists */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
