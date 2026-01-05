<template>
  <div>
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl font-serif font-bold text-charcoal dark:text-white mb-2">Create Account</h2>
      <p class="text-gray-600 dark:text-gray-400">Join us and explore the beauty of Sri Lanka</p>
    </div>

    <!-- Register Form -->
    <form @submit.prevent="handleRegister" class="space-y-5">
      <!-- Error Message -->
      <Transition name="fade">
        <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <span class="material-symbols-outlined text-lg">error</span>
          {{ error }}
        </div>
      </Transition>

      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm font-medium text-charcoal dark:text-white mb-2">Full Name</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">person</span>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="John Doe"
            class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-charcoal dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

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
            minlength="6"
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
        <p class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Minimum 6 characters</p>
      </div>

      <!-- Confirm Password Field -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-charcoal dark:text-white mb-2">Confirm Password</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            required
            minlength="6"
            placeholder="••••••••"
            class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-charcoal dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            :class="{ 'ring-2 ring-red-500': form.confirmPassword && form.password !== form.confirmPassword }"
          />
        </div>
        <p v-if="form.confirmPassword && form.password !== form.confirmPassword" class="mt-1.5 text-xs text-red-500">
          Passwords do not match
        </p>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading || !!(form.confirmPassword && form.password !== form.confirmPassword)"
        class="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span v-if="loading" class="material-symbols-outlined animate-spin">progress_activity</span>
        <span>{{ loading ? 'Creating account...' : 'Create Account' }}</span>
      </button>
    </form>

    <!-- Divider -->
    <div class="relative my-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200 dark:border-white/10"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-4 bg-white dark:bg-background-dark text-gray-500">Already have an account?</span>
      </div>
    </div>

    <!-- Login Link -->
    <NuxtLink
      to="/auth/login"
      class="block w-full text-center py-3 px-6 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-xl transition-all"
    >
      Sign In
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useHead({
  title: 'Register'
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
