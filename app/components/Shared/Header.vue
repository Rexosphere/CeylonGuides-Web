<template>
  <!-- Fixed header with dropdown navigation (full-width, fixed top) -->
  <nav class="fixed top-0 w-full z-50 transition-all duration-300">
    <!-- Standardized max-width container matching Footer and default layout pattern -->
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <!-- Logo and Brand -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <span class="material-icons text-white text-3xl">travel_explore</span>
        <span class="text-2xl font-bold font-display text-white">CeylonWiki</span>
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <div
        class="hidden md:flex items-center gap-8 text-sm font-medium text-text-default dark:text-text-inverse bg-surface-base/80 dark:bg-surface-inverse/10 backdrop-blur-md px-6 py-2.5 rounded-full shadow-sm"
      >
        <!-- Explore Dropdown -->
        <div class="relative" @mouseenter="activeDropdown = 'explore'" @mouseleave="activeDropdown = null">
          <button class="hover:text-primary transition-colors flex items-center gap-1">
            Explore
            <span class="material-icons text-sm">expand_more</span>
          </button>
          <Transition name="dropdown">
            <div
              v-if="activeDropdown === 'explore'"
              class="absolute top-full left-0 mt-2 w-56 bg-surface-base dark:bg-surface-inverse rounded-lg shadow-xl border border-surface-subtle dark:border-surface-inverse/20 py-2"
            >
              <NuxtLink to="/destinations" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">map</span>
                Destinations
              </NuxtLink>
              <NuxtLink to="/activities" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">hiking</span>
                Activities
              </NuxtLink>
              <NuxtLink to="/photos" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">photo_camera</span>
                Photo Spots
              </NuxtLink>
              <NuxtLink to="/itineraries" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">calendar_month</span>
                Itineraries & Planner
              </NuxtLink>
              <div class="border-t border-surface-subtle dark:border-surface-inverse/20 my-2" />
              <NuxtLink to="/weather" :class="dropdownLinkClass">
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
            <div
              v-if="activeDropdown === 'tools'"
              class="absolute top-full left-0 mt-2 w-56 bg-surface-base dark:bg-surface-inverse rounded-lg shadow-xl border border-surface-subtle dark:border-surface-inverse/20 py-2"
            >
              <NuxtLink to="/transport" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">directions_car</span>
                Transport & Fares
              </NuxtLink>
              <NuxtLink to="/phrasebook" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">translate</span>
                Phrasebook
              </NuxtLink>
              <NuxtLink to="/clean-dining" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">restaurant</span>
                Clean Dining
              </NuxtLink>
              <NuxtLink to="/facilities" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">wc</span>
                Facilities Finder
              </NuxtLink>
              <div class="border-t border-surface-subtle dark:border-surface-inverse/20 my-2" />
              <NuxtLink to="/money" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">payments</span>
                Money & Currency
              </NuxtLink>
              <NuxtLink to="/connectivity" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">wifi</span>
                SIM & Connectivity
              </NuxtLink>
              <NuxtLink to="/accommodation" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">hotel</span>
                Accommodation
              </NuxtLink>
              <NuxtLink to="/shopping" :class="dropdownLinkClass">
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
            <div
              v-if="activeDropdown === 'safety'"
              class="absolute top-full left-0 mt-2 w-56 bg-surface-base dark:bg-surface-inverse rounded-lg shadow-xl border border-surface-subtle dark:border-surface-inverse/20 py-2"
            >
              <NuxtLink to="/scam-alerts" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">warning</span>
                Scam Alerts
              </NuxtLink>
              <NuxtLink to="/emergency" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">emergency</span>
                Emergency Contacts
              </NuxtLink>
              <NuxtLink to="/health" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">medical_services</span>
                Health & Insurance
              </NuxtLink>
              <NuxtLink to="/culture" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">temple_buddhist</span>
                Cultural Etiquette
              </NuxtLink>
              <div class="border-t border-surface-subtle dark:border-surface-inverse/20 my-2" />
              <NuxtLink
                to="/safety-mode"
                :class="[dropdownLinkClass, 'text-semantic-danger dark:text-semantic-danger font-semibold']"
              >
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
            <div
              v-if="activeDropdown === 'info'"
              class="absolute top-full left-0 mt-2 w-56 bg-surface-base dark:bg-surface-inverse rounded-lg shadow-xl border border-surface-subtle dark:border-surface-inverse/20 py-2"
            >
              <NuxtLink to="/visa" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">badge</span>
                Visa Information
              </NuxtLink>
              <NuxtLink to="/community" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">groups</span>
                Community
              </NuxtLink>
              <div class="border-t border-surface-subtle dark:border-surface-inverse/20 my-2" />
              <NuxtLink to="/blog" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">article</span>
                Blog
              </NuxtLink>
              <NuxtLink to="/about" :class="dropdownLinkClass">
                <span class="material-symbols-outlined text-lg">info</span>
                About
              </NuxtLink>
              <NuxtLink to="/contact" :class="dropdownLinkClass">
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
        <NuxtLink
          to="/safety-mode"
          class="bg-semantic-danger hover:bg-semantic-danger/90 text-text-inverse px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          <span class="material-icons text-sm">warning</span>
          Safety Mode
        </NuxtLink>

        <!-- Auth Section -->
        <div v-if="!isAuthenticated">
          <NuxtLink
            to="/auth/login"
            class="bg-brand-primary-700 hover:bg-brand-primary-800 text-text-inverse px-6 py-2 rounded-full text-sm font-semibold shadow-sm transition-all"
          >
            Login
          </NuxtLink>
        </div>

        <!-- User Dropdown (when authenticated) -->
        <div v-else class="relative" @mouseenter="activeDropdown = 'user'" @mouseleave="activeDropdown = null">
          <button
            :class="
              variant === 'transparent'
                ? 'text-white/90 hover:text-brand-accent-400'
                : 'text-text-strong dark:text-text-inverse hover:text-brand-primary-700'
            "
            class="flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-400 focus-visible:ring-offset-2 rounded-lg"
          >
            <!-- User Avatar -->
            <div class="w-8 h-8 rounded-full bg-brand-primary-700/20 flex items-center justify-center overflow-hidden">
              <img
                v-if="user?.avatar_url"
                :src="user.avatar_url"
                :alt="user.name || 'User'"
                class="w-full h-full object-cover"
              >
              <span v-else class="material-symbols-outlined text-brand-primary-700 text-lg">person</span>
            </div>
            <span class="text-sm font-medium hidden sm:inline">{{ user?.name || user?.email?.split('@')[0] }}</span>
            <span class="material-symbols-outlined text-sm">expand_more</span>
          </button>

          <Transition name="dropdown">
            <div
              v-if="activeDropdown === 'user'"
              class="absolute top-full right-0 mt-2 w-48 bg-surface-base dark:bg-surface-inverse rounded-lg shadow-xl border border-surface-subtle dark:border-surface-inverse/20 py-2"
            >
              <div class="px-4 py-2 border-b border-surface-subtle dark:border-surface-inverse/20">
                <p class="text-sm font-medium text-text-strong dark:text-text-inverse truncate">{{ user?.name || 'User' }}</p>
                <p class="text-xs text-text-muted dark:text-text-soft truncate">{{ user?.email }}</p>
              </div>
              <button
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-semantic-danger dark:text-semantic-danger hover:bg-semantic-danger/10 dark:hover:bg-semantic-danger/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-danger/30 focus-visible:ring-inset"
                @click="handleLogout"
              >
                <span class="material-symbols-outlined text-lg">logout</span>
                Logout
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button
        :class="
          variant === 'transparent' ? 'text-white' : 'text-text-strong dark:text-text-inverse'
        "
        class="lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-400 rounded-md p-1"
        aria-label="Toggle menu"
        @click="toggleMobileMenu"
      >
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-surface-base dark:bg-surface-inverse backdrop-blur-lg border-t border-surface-subtle dark:border-surface-inverse/20 max-h-[80vh] overflow-y-auto"
      >
        <nav class="flex flex-col p-6">
          <!-- Search -->
          <div class="mb-4 pb-4 border-b border-surface-subtle dark:border-surface-inverse/20">
            <div class="flex items-center gap-2 text-text-strong dark:text-text-inverse">
              <span class="material-symbols-outlined">search</span>
              <span class="text-sm font-medium">Search</span>
            </div>
          </div>
          <!-- Explore Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-text-muted dark:text-text-soft uppercase tracking-wider px-3">Explore</h3>
          </div>
          <NuxtLink to="/destinations" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">map</span>
            Destinations
          </NuxtLink>
          <NuxtLink to="/activities" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">hiking</span>
            Activities
          </NuxtLink>
          <NuxtLink to="/photos" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">photo_camera</span>
            Photo Spots
          </NuxtLink>
          <NuxtLink to="/itineraries" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">calendar_month</span>
            Itineraries
          </NuxtLink>
          <NuxtLink to="/weather" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">wb_sunny</span>
            Weather
          </NuxtLink>

          <!-- Travel Tools Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-text-muted dark:text-text-soft uppercase tracking-wider px-3">Travel Tools</h3>
          </div>
          <NuxtLink to="/transport" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">directions_car</span>
            Transport & Fares
          </NuxtLink>
          <NuxtLink to="/phrasebook" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">translate</span>
            Phrasebook
          </NuxtLink>
          <NuxtLink to="/clean-dining" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">restaurant</span>
            Clean Dining
          </NuxtLink>
          <NuxtLink to="/facilities" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">wc</span>
            Facilities Finder
          </NuxtLink>
          <NuxtLink to="/money" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">payments</span>
            Money & Currency
          </NuxtLink>
          <NuxtLink to="/connectivity" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">wifi</span>
            SIM & Connectivity
          </NuxtLink>
          <NuxtLink to="/accommodation" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">hotel</span>
            Accommodation
          </NuxtLink>
          <NuxtLink to="/shopping" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">shopping_bag</span>
            Shopping Guide
          </NuxtLink>

          <!-- Safety Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-text-muted dark:text-text-soft uppercase tracking-wider px-3">Safety</h3>
          </div>
          <NuxtLink to="/scam-alerts" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">warning</span>
            Scam Alerts
          </NuxtLink>
          <NuxtLink to="/emergency" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">emergency</span>
            Emergency Contacts
          </NuxtLink>
          <NuxtLink to="/health" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">medical_services</span>
            Health & Insurance
          </NuxtLink>
          <NuxtLink to="/culture" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">temple_buddhist</span>
            Cultural Etiquette
          </NuxtLink>
          <NuxtLink
            to="/safety-mode"
            :class="[mobileLinkClass, 'bg-semantic-danger/10 dark:bg-semantic-danger/20 text-semantic-danger dark:text-semantic-danger font-semibold']"
            @click="closeMobileMenu"
          >
            <span class="text-lg">🚨</span>
            Safety Mode
          </NuxtLink>

          <!-- Info Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-text-muted dark:text-text-soft uppercase tracking-wider px-3">Info</h3>
          </div>
          <NuxtLink to="/visa" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">badge</span>
            Visa Info
          </NuxtLink>
          <NuxtLink to="/community" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">groups</span>
            Community
          </NuxtLink>
          <NuxtLink to="/blog" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">article</span>
            Blog
          </NuxtLink>
          <NuxtLink to="/about" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">info</span>
            About
          </NuxtLink>
          <NuxtLink to="/contact" :class="mobileLinkClass" @click="closeMobileMenu">
            <span class="material-symbols-outlined">mail</span>
            Contact
          </NuxtLink>

          <!-- Auth Section (Mobile) -->
          <div class="mt-6 pt-4 border-t border-surface-subtle dark:border-surface-inverse/20">
            <template v-if="!isAuthenticated">
              <NuxtLink
                to="/auth/login"
                class="block w-full text-center bg-brand-primary-700 hover:bg-brand-primary-800 text-text-inverse px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-400 focus-visible:ring-offset-2"
                @click="closeMobileMenu"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/auth/register"
                class="block w-full text-center mt-3 border-2 border-brand-primary-700 text-brand-primary-700 hover:bg-brand-primary-700 hover:text-text-inverse px-6 py-3 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-400 focus-visible:ring-offset-2"
                @click="closeMobileMenu"
              >
                Create Account
              </NuxtLink>
            </template>
            <template v-else>
              <!-- User Info -->
              <div class="flex items-center gap-3 px-3 py-2 mb-3">
                <div class="w-10 h-10 rounded-full bg-brand-primary-700/20 flex items-center justify-center overflow-hidden">
                  <img
                    v-if="user?.avatar_url"
                    :src="user.avatar_url"
                    :alt="user.name || 'User'"
                    class="w-full h-full object-cover"
                  >
                  <span v-else class="material-symbols-outlined text-brand-primary-700 text-xl">person</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-text-strong dark:text-text-inverse truncate">{{ user?.name || 'User' }}</p>
                  <p class="text-xs text-text-muted dark:text-text-soft truncate">{{ user?.email }}</p>
                </div>
              </div>
              <!-- Logout Button -->
              <button
                class="w-full flex items-center justify-center gap-2 bg-semantic-danger/10 dark:bg-semantic-danger/20 text-semantic-danger dark:text-semantic-danger px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-semantic-danger/20 dark:hover:bg-semantic-danger/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-danger/30 focus-visible:ring-offset-2"
                @click="handleLogout"
              >
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

defineProps({
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

const dropdownLinkClass =
  'flex items-center gap-3 px-4 py-2.5 text-sm text-text-strong dark:text-text-inverse hover:bg-surface-subtle dark:hover:bg-surface-inverse/10 transition-colors'

const mobileLinkClass =
  'flex items-center gap-3 px-3 py-2.5 text-sm text-text-strong dark:text-text-inverse hover:bg-surface-subtle dark:hover:bg-surface-inverse/10 rounded-lg transition-colors'

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
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: scaleY(0.95) translateY(-8px);
  opacity: 0;
}
</style>
