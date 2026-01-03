<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark antialiased transition-colors duration-200">
    <!-- Top Navigation -->
    <header class="sticky top-0 z-50 w-full bg-card-light dark:bg-card-dark border-b border-[#f4f1f0] dark:border-[#3E2D27] px-4 sm:px-10 py-3">
      <div class="max-w-[1440px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="flex items-center gap-4 text-text-main-light dark:text-text-main-dark">
            <div class="size-8 text-primary">
              <svg class="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6_319)">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_319"><rect fill="white" height="48" width="48"></rect></clipPath>
                </defs>
              </svg>
            </div>
            <h2 class="text-xl font-bold leading-tight tracking-tight">CeylonGuide</h2>
          </NuxtLink>
          <nav class="hidden lg:flex items-center gap-9">
            <NuxtLink to="/" class="text-sm font-medium hover:text-primary transition-colors">Home</NuxtLink>
            <NuxtLink to="/destinations" class="text-sm font-medium hover:text-primary transition-colors">Destinations</NuxtLink>
            <NuxtLink to="/itineraries" class="text-sm font-medium hover:text-primary transition-colors">Tours</NuxtLink>
            <NuxtLink to="/blog" class="text-sm font-medium hover:text-primary transition-colors">Blog</NuxtLink>
          </nav>
        </div>
        <div class="flex flex-1 justify-end items-center gap-4 sm:gap-6">
          <!-- Search -->
          <div class="hidden md:flex w-full max-w-xs items-center rounded-lg bg-[#f4f1f0] dark:bg-[#3E2D27] overflow-hidden">
            <div class="pl-3 text-text-muted-light dark:text-text-muted-dark">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input class="w-full bg-transparent border-none focus:ring-0 text-sm py-2.5 px-3 text-text-main-light dark:text-text-main-dark placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark" placeholder="Search places..."/>
          </div>
          <!-- Actions -->
          <div class="flex gap-3">
            <button class="flex items-center justify-center size-10 rounded-full bg-[#f4f1f0] dark:bg-[#3E2D27] hover:bg-gray-200 dark:hover:bg-[#4E3D37] transition-colors relative">
              <span class="material-symbols-outlined text-[20px]">notifications</span>
              <span class="absolute top-2 right-2.5 size-2 bg-primary rounded-full border border-white dark:border-[#3E2D27]"></span>
            </button>
            <div class="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-[#f4f1f0] dark:border-[#3E2D27]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBiXo4EuYCcjU-FStlbEmgX3H2o8mKyao68xp6ekXchto7o9cPaakeORnrNbHh2cDIj73UJtHHsYrgDzPN4Bah97Ri6lDX-6fQ7v7yRvec4kKxJU-3DEz82DTfz1B19O4eO9i-m2kAWN73KnbwSxE7Bzcpb5j35j7iBYzdOK1GZn1diElVBd6gofXTBw3Uj72lX9vrvIo7k4wcHAgKqp-H9QMcfY9TdyNqGNUQAZECiJLPa2Dg1QKO0lPXyGq1-kTAN0CzlwS80DxE");'></div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex min-h-[calc(100vh-73px)] max-w-[1440px] mx-auto">
      <!-- Sidebar Navigation -->
      <aside class="hidden md:flex w-72 flex-col gap-6 p-6 border-r border-[#f4f1f0] dark:border-[#3E2D27] bg-card-light dark:bg-card-dark shrink-0">
        <!-- Profile Summary -->
        <div class="flex flex-col gap-4 pb-6 border-b border-[#f4f1f0] dark:border-[#3E2D27]">
          <div class="flex gap-4 items-center">
            <div class="bg-center bg-no-repeat bg-cover rounded-full size-16 ring-2 ring-primary/20" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCddm6OfJoLVO1x36Wa0hzVg54HH7qKPfDWvdIoMgS3hoYQqXONeWgxfYaaQb8LXu6X2A-WdLiWipR59mcXy7FQDL9XDEoQ9gNeaZ3WCK4M1ty7FGCOayHaULhW2Mx9PX9tUdlcaok_IeOsqJoXw_EaEBcbsmqYC_csPcWCvMO5_NLvuzJGlxxp8fPqv0BL1tThnmsiuyJ0xMPt84VwSXTqP7tIlbNY5frxC7w52d2V8eyvKsqawzsiCEorsU_TERHpqfNcGaXSy40");'></div>
            <div class="flex flex-col">
              <h1 class="text-lg font-bold">{{ userData.name }}</h1>
              <p class="text-text-muted-light dark:text-text-muted-dark text-xs font-medium">{{ userData.level }}</p>
            </div>
          </div>
          <!-- Mini Stats -->
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div class="bg-[#f8f6f6] dark:bg-[#3E2D27] p-3 rounded-lg text-center">
              <p class="text-primary font-bold text-lg">{{ userData.savedCount }}</p>
              <p class="text-[10px] uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">Saved</p>
            </div>
            <div class="bg-[#f8f6f6] dark:bg-[#3E2D27] p-3 rounded-lg text-center">
              <p class="text-primary font-bold text-lg">{{ userData.tripsCount }}</p>
              <p class="text-[10px] uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">Trips</p>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="flex flex-col gap-2">
          <a class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-bold transition-all" href="#">
            <span class="material-symbols-outlined fill-1">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-[#f4f1f0] dark:hover:bg-[#3E2D27] hover:text-text-main-light dark:hover:text-text-main-dark font-medium transition-all group" href="#">
            <span class="material-symbols-outlined group-hover:text-primary transition-colors">map</span>
            <span>My Itineraries</span>
          </a>
          <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-[#f4f1f0] dark:hover:bg-[#3E2D27] hover:text-text-main-light dark:hover:text-text-main-dark font-medium transition-all group" href="#">
            <span class="material-symbols-outlined group-hover:text-primary transition-colors">settings</span>
            <span>Account Settings</span>
          </a>
          <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-[#f4f1f0] dark:hover:bg-[#3E2D27] hover:text-text-main-light dark:hover:text-text-main-dark font-medium transition-all group mt-auto" href="#">
            <span class="material-symbols-outlined group-hover:text-primary transition-colors">logout</span>
            <span>Logout</span>
          </a>
        </nav>

        <!-- Offline Mode Card -->
        <div class="mt-auto bg-[#364233] rounded-xl p-4 text-white relative overflow-hidden group cursor-pointer">
          <div class="absolute -right-4 -bottom-4 opacity-20 group-hover:opacity-30 transition-opacity">
            <span class="material-symbols-outlined text-[100px]">cloud_download</span>
          </div>
          <h3 class="font-bold mb-1 relative z-10">Go Offline</h3>
          <p class="text-xs text-white/80 mb-3 relative z-10 leading-relaxed">Download your itineraries and maps for remote areas.</p>
          <button class="bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-1.5 px-3 rounded-md transition-colors backdrop-blur-sm">
            Download All
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 p-4 sm:p-8 lg:p-10 overflow-x-hidden">
        <div class="max-w-[1000px] mx-auto flex flex-col gap-8">
          <!-- Greeting Header -->
          <div class="flex justify-between items-end">
            <div>
              <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-text-main-light dark:text-text-main-dark mb-2">Ayubowan, {{ userData.firstName }}</h1>
              <p class="text-text-muted-light dark:text-text-muted-dark text-lg">Welcome back to your travel hub.</p>
            </div>
            <div class="hidden sm:block text-right">
              <p class="text-sm font-bold text-primary">Colombo, Sri Lanka</p>
              <div class="flex items-center gap-1 justify-end text-text-muted-light dark:text-text-muted-dark text-sm">
                <span class="material-symbols-outlined text-[16px]">sunny</span>
                <span>28°C</span>
              </div>
            </div>
          </div>

          <!-- Main Grid Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column (Wide) -->
            <div class="lg:col-span-2 flex flex-col gap-8">
              <!-- Hero Section: Next Trip -->
              <div class="relative w-full rounded-2xl overflow-hidden min-h-[300px] flex items-end p-6 sm:p-8 group shadow-lg" style='background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYwuZb2Xzs6JPZtMf0dQrtcCo2IChZ7iMlO_tKaCy5r0qQlmQwQMJiItUKzQWYIjrJNGcOzJ9wy-2RrmIEIZcMOLNLQLPnHQRHd7NmzrQU6xGM_9rYoC-Gq_i1c-04n3gq2tjF-_bS3gHpDANGJanhN1AaMvEf_VNwdTk57NJLqBUE8lxtVavW3743a_5Xg9bf-hIQxZh6lEl9WtTYS1GzstmIDdREPPh8kpn0UC01LZ842SX92h-DTPanpu59M4MEybkSxo3-p4k"); background-size: cover; background-position: center;'>
                <div class="relative z-10 text-white w-full">
                  <div class="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm">
                    <span class="material-symbols-outlined text-[14px]">calendar_clock</span>
                    Starts in 5 days
                  </div>
                  <h2 class="text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-2">Your trip to Ella</h2>
                  <p class="text-white/90 text-sm sm:text-base font-medium max-w-md mb-6">Get ready for misty mountains and tea plantations. Your 4-day itinerary is all set.</p>
                  <div class="flex gap-3">
                    <button class="bg-white text-text-main-light hover:bg-gray-100 font-bold py-2.5 px-5 rounded-lg text-sm transition-colors flex items-center gap-2">
                      View Itinerary
                      <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Saved Collections -->
              <div class="flex flex-col gap-6">
                <!-- Tabs -->
                <div class="border-b border-[#e6dedb] dark:border-[#3E2D27] flex gap-8">
                  <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    class="pb-3 border-b-[3px] font-bold text-sm tracking-wide transition-colors"
                    :class="activeTab === tab.id ? 'border-primary text-text-main-light dark:text-text-main-dark' : 'border-transparent text-text-muted-light dark:text-text-muted-dark hover:text-primary'"
                  >
                    {{ tab.label }}
                  </button>
                </div>

                <!-- Cards Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <!-- Destination Cards -->
                  <div v-for="place in savedPlaces" :key="place.id" class="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden border border-[#f4f1f0] dark:border-[#3E2D27] shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                    <div class="h-48 overflow-hidden relative">
                      <div class="absolute top-3 right-3 z-10 backdrop-blur-sm p-1.5 rounded-full cursor-pointer transition-colors"
                           :class="place.favorite ? 'bg-white/90 dark:bg-black/50 text-primary' : 'bg-white/90 dark:bg-black/50 text-text-muted-light hover:text-primary hover:bg-white'"
                           @click="place.favorite = !place.favorite">
                        <span class="material-symbols-outlined text-[20px]" :class="place.favorite ? 'fill-1' : ''">favorite</span>
                      </div>
                      <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" :style="`background-image: url('${place.image}');`"></div>
                    </div>
                    <div class="p-4 flex flex-col flex-1">
                      <div class="flex justify-between items-start mb-1">
                        <h3 class="font-bold text-lg text-text-main-light dark:text-text-main-dark">{{ place.name }}</h3>
                        <span class="flex items-center text-xs font-bold text-yellow-500 gap-1 bg-yellow-500/10 px-1.5 py-0.5 rounded">
                          {{ place.rating }} <span class="material-symbols-outlined text-[12px] fill-1">star</span>
                        </span>
                      </div>
                      <p class="text-text-muted-light dark:text-text-muted-dark text-sm mb-4">{{ place.location }}</p>
                      <div class="mt-auto flex items-center justify-between pt-3 border-t border-[#f4f1f0] dark:border-[#3E2D27]">
                        <label class="inline-flex items-center cursor-pointer">
                          <input v-model="place.offline" class="sr-only peer" type="checkbox"/>
                          <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                          <span class="ms-2 text-xs font-medium text-text-muted-light dark:text-text-muted-dark">Offline</span>
                        </label>
                        <button class="text-primary hover:text-primary/80 transition-colors">
                          <span class="material-symbols-outlined">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Add New Card -->
                  <button class="bg-[#f4f1f0] dark:bg-[#2A201C] rounded-xl border-2 border-dashed border-[#dcdcdc] dark:border-[#3E2D27] flex flex-col items-center justify-center min-h-[200px] hover:border-primary hover:bg-white dark:hover:bg-[#32241F] transition-all group">
                    <div class="size-12 rounded-full bg-white dark:bg-[#3E2D27] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                      <span class="material-symbols-outlined text-primary">add</span>
                    </div>
                    <span class="font-bold text-sm text-text-muted-light dark:text-text-muted-dark group-hover:text-primary">Discover More Places</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Column (Sidebar Widgets) -->
            <div class="flex flex-col gap-6">
              <!-- Phrasebook Widget -->
              <div class="bg-card-light dark:bg-card-dark rounded-2xl p-5 border border-[#f4f1f0] dark:border-[#3E2D27] shadow-sm relative overflow-hidden">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="font-bold text-lg flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">translate</span>
                    Quick Phrases
                  </h3>
                  <NuxtLink to="/phrasebook" class="text-xs font-bold text-primary hover:underline">View All</NuxtLink>
                </div>
                <div class="flex flex-col gap-3">
                  <div v-for="phrase in quickPhrases" :key="phrase.id" class="flex justify-between items-center p-3 rounded-lg bg-[#f8f6f6] dark:bg-[#251A15] group hover:bg-primary/5 transition-colors cursor-pointer">
                    <div class="flex flex-col">
                      <span class="text-xs text-text-muted-light dark:text-text-muted-dark font-medium uppercase tracking-wide">{{ phrase.english }}</span>
                      <span class="font-bold text-text-main-light dark:text-text-main-dark text-lg">{{ phrase.sinhala }}</span>
                    </div>
                    <span class="material-symbols-outlined text-text-muted-light group-hover:text-primary">volume_up</span>
                  </div>
                </div>
                <!-- Decor: Abstract circle -->
                <div class="absolute -right-10 -top-10 size-24 rounded-full border-8 border-primary/5 pointer-events-none"></div>
              </div>

              <!-- Trip History -->
              <div class="bg-card-light dark:bg-card-dark rounded-2xl p-5 border border-[#f4f1f0] dark:border-[#3E2D27] shadow-sm">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary">history</span>
                  Past Adventures
                </h3>
                <div class="relative pl-2 border-l-2 border-[#f4f1f0] dark:border-[#3E2D27] space-y-6">
                  <!-- Item 1 -->
                  <div class="relative pl-4">
                    <div class="absolute -left-[13px] top-1 size-3 bg-white dark:bg-[#2C201B] border-2 border-primary rounded-full"></div>
                    <p class="text-xs text-text-muted-light dark:text-text-muted-dark font-medium mb-0.5">Dec 2023</p>
                    <h4 class="font-bold text-sm text-text-main-light dark:text-text-main-dark">Kandy & The Hills</h4>
                    <button class="text-xs text-primary font-bold mt-1 hover:underline">Write a Review</button>
                  </div>
                  <!-- Item 2 -->
                  <div class="relative pl-4">
                    <div class="absolute -left-[13px] top-1 size-3 bg-[#f4f1f0] dark:bg-[#3E2D27] rounded-full"></div>
                    <p class="text-xs text-text-muted-light dark:text-text-muted-dark font-medium mb-0.5">Aug 2023</p>
                    <h4 class="font-bold text-sm text-text-main-light dark:text-text-main-dark">Galle Fort Weekend</h4>
                    <div class="flex gap-1 mt-1 text-yellow-500">
                      <span v-for="i in 5" :key="i" class="material-symbols-outlined text-[14px] fill-1">star</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// User data
const userData = ref({
  name: 'Sarah Jenkins',
  firstName: 'Sarah',
  level: 'Explorer Level',
  savedCount: 12,
  tripsCount: 3
})

// Tabs
const tabs = [
  { id: 'destinations', label: 'Destinations' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'phrases', label: 'Phrases' }
]
const activeTab = ref('destinations')

// Saved places data
const savedPlaces = ref([
  {
    id: 1,
    name: 'Sigiriya Fortress',
    location: 'Cultural Triangle',
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfdKbUu_Qo1ETVmq93BwH_cIiz0Cbtv-JvzkgHZ86F1dcAoDRPDFVbY-0TfZYI16uobipN05llHP9CT_qvH8CDolCpvmhM2Wcli7KaZ0ZCNOUWWc77gluIQzQW7vPBpzPNGvr46Xtu0QK2BTvt5iFXrLsVt1EUN2tOTGQ-TqeNqp18mHimXtGMVGKcXSK9lSMCEE8yNtMGn8rOt7fOlSboaMLj09FXH-cUbX1JrYICwG7zfmFDtlUQfFH4hODV9VA05eOGPXsAbVI',
    favorite: true,
    offline: true
  },
  {
    id: 2,
    name: 'Coconut Tree Hill',
    location: 'Mirissa, South Coast',
    rating: 4.7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpyrmiEK6u2o05d_OATUfOlBsZFP2UB93V2m9Vi4yW3dFasgaugG7XVcx8dCCvYMv3r4FRWD9hcxF2xhFvuKIgczOaPbgAirzzX7P2X9SNeQirWkD1DDuMp_FaMcwOeA5__YBLykTrnA2d3h9_TLWSbPTgxzNT-9WZaxDxeh205eXXTM9DsmKa4O1COfMMEed7xRzEekYuH1cplEFbc098fq1qc0HASjx4nT2CtvdqkuMoBtFj-ag9i5SU3SvfGYfNrEZVcaMhyK4',
    favorite: false,
    offline: false
  }
])

// Quick phrases
const quickPhrases = ref([
  { id: 1, english: 'Hello', sinhala: 'Ayubowan' },
  { id: 2, english: 'Thank You', sinhala: 'Stuthi' },
  { id: 3, english: 'Delicious', sinhala: 'Rasi' }
])

// SEO Meta tags
useHead({
  title: 'Dashboard',
  meta: [
    { 
      name: 'description', 
      content: 'Your personal CeylonGuide dashboard. Manage your saved places, itineraries, and travel plans for Sri Lanka.'
    }
  ]
})
</script>

<style scoped>
/* Custom scrollbar for clean look */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent; 
}
::-webkit-scrollbar-thumb {
  background: #d1cdc7; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ee5f2b; 
}
</style>
