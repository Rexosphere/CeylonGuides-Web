<template>
  <div class="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center p-4 font-lato transition-colors duration-300 bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark relative overflow-hidden">
    <!-- Unsplash Background -->
    <div class="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://images.unsplash.com/photo-1586618428271-9b63897b7b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
    
    <!-- Ambient Glows -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

    <main class="relative z-10 w-full max-w-lg bg-white/90 dark:bg-card-dark/95 glass-effect rounded-3xl shadow-soft dark:shadow-glow border border-accent-sand/50 dark:border-secondary/30 overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <header class="bg-red-600 text-white p-5 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <span class="material-icons-round text-2xl">emergency_share</span>
          </div>
          <div>
            <h1 class="font-display font-bold text-lg leading-tight">Safety Mode</h1>
            <p class="text-xs text-white/80 font-light">Emergency assistance ready</p>
          </div>
        </div>
        <NuxtLink to="/" class="flex items-center gap-1 bg-black/20 hover:bg-black/30 transition px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm group">
          <span class="material-icons-round text-sm group-hover:rotate-90 transition-transform">close</span>
          Exit
        </NuxtLink>
      </header>

      <!-- Scrollable Content -->
      <div class="overflow-y-auto p-5 space-y-6">
        
        <!-- Emergency Contacts Section -->
        <section class="bg-red-50 dark:bg-red-900/10 rounded-2xl p-5 border border-red-100 dark:border-red-900/20">
          <div class="flex items-center gap-2 mb-4 text-primary">
            <span class="material-icons-round">contact_phone</span>
            <h2 class="font-display font-bold text-lg">Emergency Contacts</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <!-- Police -->
            <a class="group bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all duration-200 flex items-center gap-3" href="tel:119">
              <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 text-primary flex items-center justify-center shrink-0">
                <span class="material-icons-round text-xl">local_police</span>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Police Emergency</p>
                <p class="text-2xl font-bold text-primary group-hover:scale-105 origin-left transition-transform">119</p>
              </div>
            </a>

            <!-- Ambulance -->
            <a class="group bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all duration-200 flex items-center gap-3" href="tel:110">
              <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 text-primary flex items-center justify-center shrink-0">
                <span class="material-icons-round text-xl">medical_services</span>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Ambulance</p>
                <p class="text-2xl font-bold text-primary group-hover:scale-105 origin-left transition-transform">110</p>
              </div>
            </a>

            <!-- National Hospital -->
            <a class="group bg-gray-50 dark:bg-gray-800/40 border border-transparent hover:border-primary/30 p-3 rounded-xl flex items-center gap-3 transition-colors" href="tel:0112421052">
              <div class="w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-primary flex items-center justify-center shadow-sm shrink-0">
                <span class="material-icons-round text-sm">local_hospital</span>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">National Hospital</p>
                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">011-2421052</p>
              </div>
            </a>

            <!-- Tourist Police -->
            <a class="group bg-gray-50 dark:bg-gray-800/40 border border-transparent hover:border-primary/30 p-3 rounded-xl flex items-center gap-3 transition-colors" href="tel:1912">
              <div class="w-8 h-8 rounded-full bg-white dark:bg-gray-700 text-primary flex items-center justify-center shadow-sm shrink-0">
                <span class="material-icons-round text-sm">support_agent</span>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Tourist Police</p>
                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">1912</p>
              </div>
            </a>
          </div>
        </section>

        <!-- Emergency Phrases Section -->
        <section class="space-y-4">
          <div class="flex items-center gap-2 mb-2 text-secondary dark:text-accent-cyan">
            <span class="material-icons-round">translate</span>
            <h2 class="font-display font-bold text-lg">Say This (Emergency Phrases)</h2>
          </div>

          <div class="bg-accent-sand/20 dark:bg-gray-800/30 p-4 rounded-xl border border-accent-sand/30 dark:border-gray-700 relative overflow-hidden group">
            <div class="absolute right-0 top-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <span class="material-icons-round text-6xl">campaign</span>
            </div>
            <p class="text-xs font-bold text-secondary dark:text-accent-cyan uppercase mb-1">Help!</p>
            <p class="text-xl font-serif text-gray-800 dark:text-gray-100 mb-1">උදව් කරන්න!</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 italic">Udaw karanna!</p>
          </div>

          <div class="bg-accent-sand/20 dark:bg-gray-800/30 p-4 rounded-xl border border-accent-sand/30 dark:border-gray-700 relative overflow-hidden group">
            <div class="absolute right-0 top-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <span class="material-icons-round text-6xl">local_police</span>
            </div>
            <p class="text-xs font-bold text-secondary dark:text-accent-cyan uppercase mb-1">Call the police</p>
            <p class="text-xl font-serif text-gray-800 dark:text-gray-100 mb-1">පොලීසියට කතා කරන්න</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 italic">Polisiyata katha karanna</p>
          </div>

          <div class="bg-accent-sand/20 dark:bg-gray-800/30 p-4 rounded-xl border border-accent-sand/30 dark:border-gray-700 relative overflow-hidden group">
            <div class="absolute right-0 top-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <span class="material-icons-round text-6xl">medical_information</span>
            </div>
            <p class="text-xs font-bold text-secondary dark:text-accent-cyan uppercase mb-1">I need a doctor</p>
            <p class="text-xl font-serif text-gray-800 dark:text-gray-100 mb-1">මට වෛද්‍යවරයෙක් අවශ්‍යයි</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 italic">Mata vaidyavarayek awashyai</p>
          </div>
        </section>
      </div>

      <!-- Footer / AI Assistant -->
      <div class="p-5 bg-gradient-to-r from-secondary to-[#004d55] dark:from-gray-800 dark:to-gray-900 text-white shrink-0 relative overflow-hidden">
        <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div class="relative z-10">
          <div class="flex items-start gap-3 mb-4">
            <div class="mt-1 bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
              <span class="material-icons-round text-xl">smart_toy</span>
            </div>
            <div>
              <h3 class="font-display font-bold text-lg">Not sure what to do?</h3>
              <p class="text-sm text-gray-200 dark:text-gray-400 leading-relaxed max-w-xs">Our AI assistant can help guide you through any situation safely.</p>
            </div>
          </div>
          <button @click="openAIChat" class="w-full bg-white text-secondary font-bold py-3.5 px-6 rounded-xl hover:bg-accent-cyan transition-colors shadow-lg flex items-center justify-center gap-2 group">
            <span class="material-icons-round text-lg group-hover:animate-bounce">chat</span>
            Ask AI Travel Assistant
          </button>
        </div>
        <button aria-label="Quick Chat" class="absolute -top-6 right-6 bg-primary text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-20 border-2 border-white dark:border-gray-800">
          <span class="material-icons-round">android</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Emergency Assistance Pop-up - CeylonGuide',
  meta: [
    { name: 'theme-color', content: '#D94E3B' }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Round'
    }
  ]
})

function openAIChat() {
  const router = useRouter()
  router.push('/')
}
</script>

<style scoped>
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: transparent; 
}
::-webkit-scrollbar-thumb {
    background: #D94E3B; 
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: #b93c2b; 
}
.glass-effect {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}
</style>
