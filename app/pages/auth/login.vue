<template>
  <div>
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl font-serif font-bold text-charcoal dark:text-white mb-2">Welcome Back</h2>
      <p class="text-gray-600 dark:text-gray-400">Sign in to continue your Sri Lankan adventure</p>
    </div>

    <!-- Login Form -->
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
        <label for="email" class="block text-sm font-medium text-charcoal dark:text-white mb-2">Email Address</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-charcoal dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      <!-- Password Field -->
      <div>
        <label for="password" class="block text-sm font-medium text-charcoal dark:text-white mb-2">Password</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            required
            placeholder="••••••••"
            class="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-charcoal dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
          </button>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span v-if="loading" class="material-symbols-outlined animate-spin">progress_activity</span>
        <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200 dark:border-white/10"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-4 bg-white dark:bg-background-dark text-gray-500">Don't have an account?</span>
      </div>
    </div>

    <!-- Register Link -->
    <NuxtLink
      to="/auth/register"
      class="block w-full text-center py-3 px-6 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-xl transition-all"
    >
      Create Account
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useHead({
  title: 'Login'
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
