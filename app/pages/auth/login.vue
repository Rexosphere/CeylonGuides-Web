<template>
  <div class="flex min-h-screen w-full bg-background-light dark:bg-background-dark font-display antialiased text-[#181311] dark:text-white">
    <!-- Left Split: Hero Image -->
    <div class="relative hidden w-0 flex-1 lg:block group/design-root">
      <div 
        class="absolute inset-0 h-full w-full bg-cover bg-center transition-all duration-700 hover:scale-[1.02]" 
        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCw6E_u3JYvQPZZGiRS3OgALwBd18nhUIaoQMn-7vmuHXQifoXywHyFUumxtaPyYcFw-C2GA2ssz2K7lJ2OTqVCIqdbV2151TOjz_2X5bn7vzBMla1QVg3E0_jK-ww_ID6tT0-pJmQkH92Vkd_frMd8112yM5zXhEJOvJ6gXSZoD1xXEoqjVA6hXvLMVKjeQnfSqZeB71nnuv7Ypgm2oAotEsQqdR6E-7pIAmSDKExuJR5Bnf_-b1uVfL_qVh4hgsvZ03KfKNv9wOI');"
      >
      </div>
      <!-- Gradient Overlay for mood and text readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-16 text-white max-w-2xl">
        <h2 class="text-4xl font-bold leading-tight drop-shadow-lg mb-4">Discover the untold stories of Sri Lanka</h2>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">location_on</span>
          <p class="text-lg font-medium text-white/90 drop-shadow-md tracking-wide">Nuwara Eliya, Sri Lanka</p>
        </div>
      </div>
    </div>

    <!-- Right Split: Login Form -->
    <div class="flex flex-1 flex-col justify-center px-6 py-12 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-background-dark lg:w-[480px] xl:w-[600px] border-l border-[#f4f1f0] dark:border-gray-800 relative z-10">
      <!-- Top branding for mobile/desktop -->
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div class="flex items-center gap-3 mb-10">
          <div class="size-8 text-primary">
            <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-[#181311] dark:text-white">CeylonGuide</h2>
        </div>
        
        <div class="mb-8">
          <h1 class="text-[#181311] dark:text-white tracking-tight text-[32px] font-bold leading-tight">Welcome back</h1>
          <p class="text-[#896c61] dark:text-gray-400 text-base font-normal leading-normal pt-3">
            Log in to continue your virtual journey through paradise.
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
           <!-- Error Message -->
          <Transition name="fade">
            <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">error</span>
              {{ error }}
            </div>
          </Transition>

          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium leading-6 text-[#181311] dark:text-white mb-2" for="email">Email address</label>
            <input 
              id="email" 
              v-model="form.email"
              autocomplete="email" 
              required
              class="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#181311] dark:text-white bg-white dark:bg-[#2e2320] border border-[#e6dedb] dark:border-gray-700 h-14 placeholder:text-[#896c61] dark:placeholder-gray-500 p-[15px] text-base font-normal leading-normal focus:outline-0 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" 
              name="email" 
              placeholder="user@example.com" 
              type="email"
            />
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium leading-6 text-[#181311] dark:text-white" for="password">Password</label>
              <div class="text-sm">
                <a class="font-semibold text-primary hover:text-[#d64d1e] transition-colors" href="#">Forgot password?</a>
              </div>
            </div>
            <div class="relative">
              <input 
                id="password" 
                v-model="form.password"
                autocomplete="current-password" 
                required
                :type="showPassword ? 'text' : 'password'"
                class="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#181311] dark:text-white bg-white dark:bg-[#2e2320] border border-[#e6dedb] dark:border-gray-700 h-14 placeholder:text-[#896c61] dark:placeholder-gray-500 p-[15px] pr-12 text-base font-normal leading-normal focus:outline-0 focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" 
                name="password" 
                placeholder="••••••••" 
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-[#896c61] hover:text-primary transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <!-- Main Action -->
          <div class="pt-2">
            <button 
              type="submit"
              :disabled="loading"
              class="flex w-full justify-center items-center rounded-lg bg-primary px-4 h-12 text-base font-bold text-white shadow-sm hover:bg-[#d64d1e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="material-symbols-outlined animate-spin mr-2">progress_activity</span>
              {{ loading ? 'Logging in...' : 'Log In' }}
            </button>
          </div>
        </form>

        <!-- Social Divider -->
        <div class="mt-8 mb-6">
          <div class="relative">
            <div aria-hidden="true" class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[#e6dedb] dark:border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm font-medium leading-6">
              <span class="bg-white dark:bg-background-dark px-4 text-[#896c61] dark:text-gray-400">Or continue with</span>
            </div>
          </div>
        </div>

        <!-- Social Buttons -->
        <div class="grid grid-cols-2 gap-4">
          <button class="flex w-full items-center justify-center gap-3 rounded-lg bg-white dark:bg-[#2e2320] px-3 h-12 text-sm font-semibold text-[#181311] dark:text-white shadow-sm ring-1 ring-inset ring-[#e6dedb] dark:ring-gray-700 hover:bg-[#f8f6f6] dark:hover:bg-gray-700 transition-colors" type="button">
            <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span>Google</span>
          </button>
          <button class="flex w-full items-center justify-center gap-3 rounded-lg bg-white dark:bg-[#2e2320] px-3 h-12 text-sm font-semibold text-[#181311] dark:text-white shadow-sm ring-1 ring-inset ring-[#e6dedb] dark:ring-gray-700 hover:bg-[#f8f6f6] dark:hover:bg-gray-700 transition-colors" type="button">
            <svg aria-hidden="true" class="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path clip-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill-rule="evenodd"></path>
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        <!-- Footer Sign up -->
        <p class="mt-8 text-center text-sm text-[#896c61] dark:text-gray-400">
          New to CeylonGuide?
          <NuxtLink to="/auth/register" class="font-bold text-primary hover:text-[#d64d1e] transition-colors ml-1">Create an account</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Login',
  meta: [
    { name: 'description', content: 'Login to CeylonGuide' }
  ]
})

const { login, loading } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  
  const result = await login({
    email: form.email,
    password: form.password
  })
  
  if (result.success) {
    await router.push('/')
  } else {
    error.value = result.error || 'Login failed. Please try again.'
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
