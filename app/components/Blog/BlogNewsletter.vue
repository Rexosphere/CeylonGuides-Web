<template>
  <section class="container mx-auto px-4 md:px-6 lg:px-20 py-16 my-8">
    <div class="bg-primary/5 dark:bg-white/5 rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-5xl mx-auto relative overflow-hidden backdrop-blur-sm border border-primary/10 dark:border-white/10">
      
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div v-if="status === 'success'" class="relative z-10 py-12 animate-fade-in-up">
        <div class="size-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
           <span class="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4 dark:text-white">You're on the list!</h2>
        <p class="text-text-secondary dark:text-gray-300 max-w-lg mx-auto text-lg leading-relaxed">
           Thank you for subscribing. We've sent a confirmation email to <strong>{{ email }}</strong>. 
           Get ready for your first weekly update on Monday!
        </p>
        <button @click="resetForm" class="mt-8 text-primary font-bold hover:underline">Subscribe another email</button>
      </div>

      <div v-else class="relative z-10 transition-all duration-500" :class="{ 'opacity-50 pointer-events-none': status === 'loading' }">
        <span class="bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary mb-6 inline-block">
           Weekly on Mondays
        </span>
        <h2 class="text-3xl md:text-5xl font-black mb-4 dark:text-white tracking-tight">Unlock the Best of Ceylon</h2>
        <p class="text-text-secondary dark:text-gray-300 max-w-lg mx-auto mb-10 text-lg">
          Curated travel tips, hidden waterfall locations, and community stories delivered straight to your inbox.
        </p>
        
        <!-- Preferences -->
        <div class="max-w-xl mx-auto mb-10">
           <p class="text-xs font-bold uppercase tracking-wider text-text-muted mb-4">I'm interested in:</p>
           <div class="flex flex-wrap justify-center gap-2">
              <button 
                v-for="pref in preferences" 
                :key="pref"
                @click="togglePreference(pref)"
                class="px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200"
                :class="selectedPreferences.includes(pref) 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 transform scale-105' 
                  : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-text-secondary dark:text-gray-300 hover:border-primary/50 hover:text-primary'"
              >
                 {{ pref }}
              </button>
           </div>
        </div>

        <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
          <div class="flex-1 relative">
             <input 
               v-model="email"
               class="w-full h-14 px-5 rounded-xl border-2 bg-white dark:bg-[#1a120e] text-[#181311] dark:text-white outline-none transition-all placeholder:text-gray-400 font-medium" 
               :class="error ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-primary shadow-sm'"
               placeholder="Enter your email address" 
               type="email"
               :disabled="status === 'loading'"
             />
             <span v-if="error" class="absolute -bottom-6 left-0 text-xs text-red-500 font-bold ml-1">{{ error }}</span>
          </div>
          <button 
            type="submit"
            :disabled="status === 'loading'"
            class="h-14 px-8 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-xl shadow-primary/20 flex items-center justify-center gap-2 min-w-[140px]"
          >
            <span v-if="status === 'loading'" class="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span v-else>Subscribe</span>
          </button>
        </form>
        
        <p class="text-xs text-gray-400 mt-10 max-w-xs mx-auto leading-relaxed">
           <span class="material-symbols-outlined text-[14px] align-text-bottom mr-1">lock</span>
           We respect your privacy. No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from '~/composables/useToast'

const { showToast } = useToast()

const email = ref('')
const status = ref<'idle' | 'loading' | 'success'>('idle')
const error = ref('')
const preferences = ['Beaches', 'Food', 'Culture', 'Wildlife', 'Community']
const selectedPreferences = ref<string[]>([])

const togglePreference = (pref: string) => {
  if (selectedPreferences.value.includes(pref)) {
    selectedPreferences.value = selectedPreferences.value.filter(p => p !== pref)
  } else {
    selectedPreferences.value.push(pref)
  }
}

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const subscribe = () => {
  error.value = ''
  
  if (!email.value) {
    error.value = 'Email is required'
    return
  }
  
  if (!validateEmail(email.value)) {
    error.value = 'Please enter a valid email'
    return
  }
  
  status.value = 'loading'
  
  // Simulate API call
  setTimeout(() => {
    // Save to local storage
    if (import.meta.client) {
        const subData = {
            email: email.value,
            preferences: selectedPreferences.value,
            date: new Date().toISOString()
        }
        localStorage.setItem('newsletter-subscription', JSON.stringify(subData))
    }
    
    status.value = 'success'
    showToast('Successfully subscribed!', 'success')
  }, 1500)
}

const resetForm = () => {
    email.value = ''
    selectedPreferences.value = []
    status.value = 'idle'
}

onMounted(() => {
    // Check if already subscribed? Maybe not, usually marketing forms allow re-entry or just show form.
    // But let's pre-fill if we want. For now, separate session logic implies we might want to show success if recently done.
    if (import.meta.client) {
        const saved = localStorage.getItem('newsletter-subscription')
        if (saved) {
             // Optional: could auto-show success state, but often annoying if user wants to sub another.
             // We'll leave it as fresh form for now.
        }
    }
})
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}
</style>
