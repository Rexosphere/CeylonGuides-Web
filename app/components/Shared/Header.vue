<template>
  <!-- Fixed header with dropdown navigation -->
  <nav class="fixed top-0 w-full z-50 transition-all duration-300">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo and Brand -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="material-icons text-white text-3xl">travel_explore</span>
        <span class="text-2xl font-bold font-display text-white">CeylonGuide</span>
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <div
        class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-black/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-sm">
        <!-- Explore Dropdown -->
        <div class="relative" @mouseenter="activeDropdown = 'explore'" @mouseleave="activeDropdown = null">
          <button class="hover:text-primary transition-colors flex items-center gap-1">
            Explore
            <span class="material-icons text-sm">expand_more</span>
          </button>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'explore'"
              class="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-white/10 py-2">
              <NuxtLink to="/destinations" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">map</span>
                Destinations
              </NuxtLink>
              <NuxtLink to="/activities" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">hiking</span>
                Activities
              </NuxtLink>
              <NuxtLink to="/photos" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">photo_camera</span>
                Photo Spots
              </NuxtLink>
              <NuxtLink to="/itineraries" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">calendar_month</span>
                Itineraries & Planner
              </NuxtLink>
              <div class="border-t border-gray-200 dark:border-white/10 my-2"></div>
              <NuxtLink to="/weather" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">wb_sunny</span>
                Weather & Best Times
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- Travel Tools Dropdown -->
        <div class="relative" @mouseenter="activeDropdown = 'tools'" @mouseleave="activeDropdown = null">
          <button class="hover:text-primary transition-colors flex items-center gap-1">
            Travel Tools
            <span class="material-icons text-sm">expand_more</span>
          </button>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'tools'"
              class="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-white/10 py-2">
              <NuxtLink to="/transport" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">directions_car</span>
                Transport & Fares
              </NuxtLink>
              <NuxtLink to="/phrasebook" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">translate</span>
                Phrasebook
              </NuxtLink>
              <NuxtLink to="/clean-dining" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">restaurant</span>
                Clean Dining
              </NuxtLink>
              <NuxtLink to="/facilities" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">wc</span>
                Facilities Finder
              </NuxtLink>
              <div class="border-t border-gray-200 dark:border-white/10 my-2"></div>
              <NuxtLink to="/money" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">payments</span>
                Money & Currency
              </NuxtLink>
              <NuxtLink to="/connectivity" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">wifi</span>
                SIM & Connectivity
              </NuxtLink>
              <NuxtLink to="/accommodation" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">hotel</span>
                Accommodation
              </NuxtLink>
              <NuxtLink to="/shopping" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">shopping_bag</span>
                Shopping Guide
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- Safety Dropdown -->
        <div class="relative" @mouseenter="activeDropdown = 'safety'" @mouseleave="activeDropdown = null">
          <button class="hover:text-primary transition-colors flex items-center gap-1">
            Safety
            <span class="material-icons text-sm">expand_more</span>
          </button>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'safety'"
              class="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-white/10 py-2">
              <NuxtLink to="/scam-alerts" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">warning</span>
                Scam Alerts
              </NuxtLink>
              <NuxtLink to="/emergency" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">emergency</span>
                Emergency Contacts
              </NuxtLink>
              <NuxtLink to="/health" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">medical_services</span>
                Health & Insurance
              </NuxtLink>
              <NuxtLink to="/culture" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">temple_buddhist</span>
                Cultural Etiquette
              </NuxtLink>
              <div class="border-t border-gray-200 dark:border-white/10 my-2"></div>
              <NuxtLink to="/safety-mode" class="dropdown-link text-red-600 dark:text-red-400 font-semibold">
                <span class="material-symbols-outlined text-lg">emergency</span>
                🚨 Safety Mode
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- Info Dropdown -->
        <div class="relative" @mouseenter="activeDropdown = 'info'" @mouseleave="activeDropdown = null">
          <button class="hover:text-primary transition-colors flex items-center gap-1">
            Info
            <span class="material-icons text-sm">expand_more</span>
          </button>
          <Transition name="dropdown">
            <div v-if="activeDropdown === 'info'"
              class="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-white/10 py-2">
              <NuxtLink to="/visa" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">badge</span>
                Visa Information
              </NuxtLink>
              <NuxtLink to="/community" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">groups</span>
                Community
              </NuxtLink>
              <div class="border-t border-gray-200 dark:border-white/10 my-2"></div>
              <NuxtLink to="/blog" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">article</span>
                Blog
              </NuxtLink>
              <NuxtLink to="/about" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">info</span>
                About
              </NuxtLink>
              <NuxtLink to="/contact" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">mail</span>
                Contact
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- Search Icon -->
        <button class="hover:text-primary" aria-label="Search">
          <span class="material-icons text-lg">search</span>
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-4">
        <!-- Safety Mode Button -->
        <NuxtLink to="/safety-mode"
          class="bg-accent-danger hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm transition-all">
          <span class="material-icons text-sm">warning</span>
          Safety Mode
        </NuxtLink>

        <!-- Auth Section -->
        <div v-if="!isAuthenticated">
          <NuxtLink to="/auth/login"
            class="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-sm transition-all">
            Login
          </NuxtLink>
        </div>

        <!-- User Dropdown (when authenticated) -->
        <div v-else class="relative" @mouseenter="activeDropdown = 'user'" @mouseleave="activeDropdown = null">
          <button class="flex items-center gap-2 transition-colors"
            :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'">
            <!-- User Avatar -->
            <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
              <img v-if="user?.avatar_url" :src="user.avatar_url" :alt="user.name || 'User'"
                class="w-full h-full object-cover" />
              <span v-else class="material-symbols-outlined text-primary text-lg">person</span>
            </div>
            <span class="text-sm font-medium hidden sm:inline">{{ user?.name || user?.email?.split('@')[0] }}</span>
            <span class="material-symbols-outlined text-sm">expand_more</span>
          </button>

          <Transition name="dropdown">
            <div v-if="activeDropdown === 'user'"
              class="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-white/10 py-2">
              <div class="px-4 py-2 border-b border-gray-200 dark:border-white/10">
                <p class="text-sm font-medium text-charcoal dark:text-white truncate">{{ user?.name || 'User' }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user?.email }}</p>
              </div>
              <button @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <span class="material-symbols-outlined text-lg">logout</span>
                Logout
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="lg:hidden"
        :class="variant === 'transparent' ? 'text-white' : 'text-charcoal dark:text-white'" aria-label="Toggle menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="slide-fade">
      <div v-if="isMobileMenuOpen"
        class="lg:hidden bg-white dark:bg-background-dark backdrop-blur-lg border-t border-gray-200 dark:border-white/20 max-h-[80vh] overflow-y-auto">
        <nav class="flex flex-col p-6">
          <!-- Search -->
          <div class="mb-4 pb-4 border-b border-gray-200 dark:border-white/10">
            <div class="flex items-center gap-2 text-charcoal dark:text-white">
              <span class="material-symbols-outlined">search</span>
              <span class="text-sm font-medium">Search</span>
            </div>
          </div>
          <!-- Explore Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">Explore</h3>
          </div>
          <NuxtLink to="/destinations" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">map</span>
            Destinations
          </NuxtLink>
          <NuxtLink to="/activities" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">hiking</span>
            Activities
          </NuxtLink>
          <NuxtLink to="/photos" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">photo_camera</span>
            Photo Spots
          </NuxtLink>
          <NuxtLink to="/itineraries" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">calendar_month</span>
            Itineraries
          </NuxtLink>
          <NuxtLink to="/weather" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">wb_sunny</span>
            Weather
          </NuxtLink>

          <!-- Travel Tools Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">Travel Tools
            </h3>
          </div>
          <NuxtLink to="/transport" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">directions_car</span>
            Transport & Fares
          </NuxtLink>
          <NuxtLink to="/phrasebook" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">translate</span>
            Phrasebook
          </NuxtLink>
          <NuxtLink to="/clean-dining" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">restaurant</span>
            Clean Dining
          </NuxtLink>
          <NuxtLink to="/facilities" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">wc</span>
            Facilities Finder
          </NuxtLink>
          <NuxtLink to="/money" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">payments</span>
            Money & Currency
          </NuxtLink>
          <NuxtLink to="/connectivity" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">wifi</span>
            SIM & Connectivity
          </NuxtLink>
          <NuxtLink to="/accommodation" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">hotel</span>
            Accommodation
          </NuxtLink>
          <NuxtLink to="/shopping" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">shopping_bag</span>
            Shopping Guide
          </NuxtLink>

          <!-- Safety Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">Safety</h3>
          </div>
          <NuxtLink to="/scam-alerts" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">warning</span>
            Scam Alerts
          </NuxtLink>
          <NuxtLink to="/emergency" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">emergency</span>
            Emergency Contacts
          </NuxtLink>
          <NuxtLink to="/health" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">medical_services</span>
            Health & Insurance
          </NuxtLink>
          <NuxtLink to="/culture" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">temple_buddhist</span>
            Cultural Etiquette
          </NuxtLink>
          <NuxtLink to="/safety-mode"
            class="mobile-link bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold"
            @click="closeMobileMenu">
            <span class="text-lg">🚨</span>
            Safety Mode
          </NuxtLink>

          <!-- Info Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">Info</h3>
          </div>
          <NuxtLink to="/visa" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">badge</span>
            Visa Info
          </NuxtLink>
          <NuxtLink to="/community" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">groups</span>
            Community
          </NuxtLink>
          <NuxtLink to="/blog" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">article</span>
            Blog
          </NuxtLink>
          <NuxtLink to="/about" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">info</span>
            About
          </NuxtLink>
          <NuxtLink to="/contact" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">mail</span>
            Contact
          </NuxtLink>

          <!-- Auth Section (Mobile) -->
          <div class="mt-6 pt-4 border-t border-gray-200 dark:border-white/10">
            <template v-if="!isAuthenticated">
              <NuxtLink to="/auth/login"
                class="block w-full text-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg"
                @click="closeMobileMenu">
                Login
              </NuxtLink>
              <NuxtLink to="/auth/register"
                class="block w-full text-center mt-3 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
                @click="closeMobileMenu">
                Create Account
              </NuxtLink>
            </template>
            <template v-else>
              <!-- User Info -->
              <div class="flex items-center gap-3 px-3 py-2 mb-3">
                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                  <img v-if="user?.avatar_url" :src="user.avatar_url" :alt="user.name || 'User'"
                    class="w-full h-full object-cover" />
                  <span v-else class="material-symbols-outlined text-primary text-xl">person</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-charcoal dark:text-white truncate">{{ user?.name || 'User' }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ user?.email }}</p>
                </div>
              </div>
              <!-- Logout Button -->
              <button @click="handleLogout"
                class="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-red-100 dark:hover:bg-red-900/30">
                <span class="material-symbols-outlined text-lg">logout</span>
                Logout
              </button>
            </template>
          </div>
        </nav>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'transparent',
    validator: (value: string) => ['transparent', 'solid'].includes(value)
  }
})

// Auth state
const { user, isAuthenticated, logout } = useAuth()

const isMobileMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = async () => {
  closeMobileMenu()
  await logout()
}
</script>

<style scoped>
/* Mobile menu transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Dropdown transitions */
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}

.dropdown-leave-active {
  transition: all 0.15s ease-in;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Dropdown link styles */
.dropdown-link {
  @apply flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal dark:text-white/90 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors;
}

/* Mobile link styles */
.mobile-link {
  @apply flex items-center gap-3 px-3 py-2.5 text-sm text-charcoal dark:text-white/90 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors;
}
</style>
