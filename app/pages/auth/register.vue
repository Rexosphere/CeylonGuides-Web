<template>
  <div class="flex min-h-screen w-full flex-row bg-background-light dark:bg-background-dark font-display text-[#181311] dark:text-white overflow-x-hidden antialiased">
    <!-- Left Side: Hero Image (Hidden on mobile, visible on desktop) -->
    <div class="hidden lg:flex w-1/2 relative bg-background-dark overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" 
        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBk7gnCuEcpXJG5zSjdj9qt7Xi-YvRDHOfwQn8XgEp0yWKx6KFbtI8FgaMT-Lq63_nyKcbEcXdYGT7ZsRBjH2WMLZVV1JRX-7u15HPELr9fXmU5h16Zh7F7TDF2-SpoibZLyv9bmM_udSES97VBRShtNb5B8Pt_oi2gjkX4nLnG08kby6352ACfZzJ1pypEAOAli10BuzDDs4Pv0xbBDruGHTcUQEAf_3uQ0i0sf1oKKZHyhEZZF84HIW8c5HmrkF_XFne4VHQRkaQ");'
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
      <div class="relative z-10 flex flex-col justify-between p-12 w-full h-full text-white">
        <div>
          <!-- Logo mark -->
          <div class="size-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/30 text-white">
            <span class="material-symbols-outlined">travel_explore</span>
          </div>
        </div>
        <div class="max-w-lg">
          <p class="text-3xl font-bold leading-tight mb-4">"Sri Lanka is not just a destination, it's a feeling that stays with you forever."</p>
          <div class="flex items-center gap-3">
            <div class="h-[1px] w-8 bg-white/60"></div>
            <p class="text-sm font-medium text-white/80">Discover the Pearl of the Indian Ocean</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side: Signup Form -->
    <div class="w-full lg:w-1/2 flex flex-col bg-white dark:bg-background-dark relative overflow-y-auto">
      <!-- Mobile Header Logo -->
      <div class="lg:hidden p-6 flex items-center gap-2">
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
        <h2 class="text-[#181311] dark:text-white text-lg font-bold tracking-tight">CeylonWiki</h2>
      </div>

      <!-- Main Content Container -->
      <div class="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 py-12">
        <div class="max-w-md w-full mx-auto space-y-8">
          <!-- Header -->
          <div class="space-y-2">
            <h1 class="text-[#181311] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Start your journey</h1>
            <p class="text-[#896c61] dark:text-gray-400 text-base font-normal leading-normal">Create an account to explore the wonders of Sri Lanka.</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleRegister" class="space-y-5">
             <!-- Error Message -->
            <Transition name="fade">
              <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">error</span>
                {{ error }}
              </div>
            </Transition>
            
            <!-- Full Name -->
            <div class="space-y-2">
              <label class="text-[#181311] dark:text-white text-sm font-bold leading-normal" for="fullname">Full Name</label>
              <input 
                id="fullname" 
                v-model="form.name"
                class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#181311] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#896c61] dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-all" 
                placeholder="Enter your full name" 
                type="text"
              />
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label class="text-[#181311] dark:text-white text-sm font-bold leading-normal" for="email">Email Address</label>
              <input 
                id="email" 
                v-model="form.email"
                required
                class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#181311] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#896c61] dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-all" 
                placeholder="name@example.com" 
                type="email"
              />
            </div>

            <!-- Password Group -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="space-y-2">
                <label class="text-[#181311] dark:text-white text-sm font-bold leading-normal" for="password">Password</label>
                <div class="relative">
                  <input 
                    id="password" 
                    v-model="form.password"
                    required
                    :type="showPassword ? 'text' : 'password'"
                    class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#181311] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#896c61] dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-all" 
                    placeholder="••••••••" 
                  />
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-[#181311] dark:text-white text-sm font-bold leading-normal" for="confirm-password">Confirm Password</label>
                <input 
                  id="confirm-password" 
                  v-model="form.confirmPassword"
                  required
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#181311] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e6dedb] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#896c61] dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <!-- CTA Button -->
             <button 
                type="submit"
                :disabled="loading || !!(form.confirmPassword && form.password !== form.confirmPassword)"
                class="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary hover:bg-[#d95223] text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <span v-if="loading" class="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>

          <!-- Divider -->
          <div class="relative flex items-center py-2">
            <div class="flex-grow border-t border-[#e6dedb] dark:border-gray-700"></div>
            <span class="flex-shrink-0 mx-4 text-xs font-medium text-[#896c61] uppercase tracking-wider">Or register with</span>
            <div class="flex-grow border-t border-[#e6dedb] dark:border-gray-700"></div>
          </div>

          <!-- Social Login -->
          <div class="grid grid-cols-2 gap-4">
            <button class="flex items-center justify-center gap-2 h-12 px-4 rounded-lg border border-[#e6dedb] dark:border-gray-700 hover:bg-[#f4f1f0] dark:hover:bg-gray-800 bg-white dark:bg-transparent transition-colors text-[#181311] dark:text-white text-sm font-bold">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"></path>
                <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"></path>
                <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05"></path>
                <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button class="flex items-center justify-center gap-2 h-12 px-4 rounded-lg border border-[#e6dedb] dark:border-gray-700 hover:bg-[#f4f1f0] dark:hover:bg-gray-800 bg-white dark:bg-transparent transition-colors text-[#181311] dark:text-white text-sm font-bold">
              <svg class="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.429C10.125 6.42 11.916 4.76 14.656 4.76C15.97 4.76 17.344 4.996 17.344 4.996V7.951H15.83C14.34 7.951 13.875 8.876 13.875 9.825V12.073H17.203L16.67 15.563H13.875V24C19.612 23.094 24 18.1 24 12.073Z"></path>
              </svg>
              Facebook
            </button>
          </div>

          <!-- Footer Links -->
          <div class="text-center pt-4">
            <p class="text-[#896c61] dark:text-gray-400 text-sm">
              Already have an account? 
              <NuxtLink to="/auth/login" class="text-primary font-bold hover:underline">Log in</NuxtLink>
            </p>
            <div class="mt-8 text-xs text-[#896c61]/80 dark:text-gray-500 max-w-xs mx-auto leading-relaxed">
              By signing up, you agree to our 
              <a class="underline hover:text-primary" href="#">Terms &amp; Conditions</a> and 
              <a class="underline hover:text-primary" href="#">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>

      <!-- Absolute top right corner home link (desktop) -->
      <div class="hidden lg:block absolute top-6 right-8">
        <NuxtLink to="/" class="flex items-center gap-2 text-sm font-medium text-[#181311] dark:text-gray-300 hover:text-primary transition-colors">
          Back to Home
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Sign Up',
  meta: [
    { name: 'description', content: 'Create an account to explore the wonders of Sri Lanka' }
  ]
})

const { register, loading } = useAuth()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''
  
  // Validate passwords match
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  
  // Validate password length
  if (form.password.length < 6) {
    error.value = 'Password must be at least 6 characters'
    return
  }
  
  const result = await register({
    email: form.email,
    password: form.password,
    name: form.name || undefined
  })
  
  if (result.success) {
    await router.push('/')
  } else {
    error.value = result.error || 'Registration failed. Please try again.'
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
