<template>
  <!-- Fixed header with dropdown navigation -->
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
    :class="[
      variant === 'transparent'
        ? 'bg-white/10 backdrop-blur-md border-white/10'
        : 'bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-gray-200 dark:border-white/10'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo and Brand -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <span
          class="material-symbols-outlined text-3xl"
          :class="variant === 'transparent' ? 'text-white' : 'text-primary dark:text-white'"
        >travel_explore</span>
        <h2
          class="font-serif text-2xl font-bold tracking-tight"
          :class="variant === 'transparent' ? 'text-white' : 'text-primary dark:text-white'"
        >CeylonGuide</h2>
      </NuxtLink>

      <!-- Desktop Navigation Links -->
      <div class="hidden lg:flex items-center gap-6">
        <!-- Destinations - Direct Link -->
        <NuxtLink
          to="/destinations"
          active-class="text-primary font-bold dark:text-white"
          class="transition-colors text-sm font-medium"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
        >
          Destinations
        </NuxtLink>

          <!-- Activities - Direct Link -->
        <NuxtLink
          to="/activities"
          active-class="text-primary font-bold dark:text-white"
          class="transition-colors text-sm font-medium"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
        >
          Activities
        </NuxtLink>

          <!-- Photo Spots - Direct Link -->
        <NuxtLink
          to="/photos"
          active-class="text-primary font-bold dark:text-white"
          class="transition-colors text-sm font-medium"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
        >
          Photo Spots
        </NuxtLink>

          <!-- Shopping - Direct Link -->
        <NuxtLink
          to="/shopping"
          active-class="text-primary font-bold dark:text-white"
          class="transition-colors text-sm font-medium"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
        >
          Shopping Guide
        </NuxtLink>

        <!-- Essentials Dropdown -->
        <div
          class="relative"
          @mouseenter="activeDropdown = 'essentials'"
          @mouseleave="activeDropdown = null"
        >
          <button
            class="transition-colors text-sm font-medium flex items-center gap-1"
            :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
          >
            Essentials
            <span class="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <Transition name="dropdown">
            <div
              v-if="activeDropdown === 'essentials'"
              class="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-white/10 py-2"
            >
              <NuxtLink to="/clean-dining" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">restaurant</span>
                Clean Dining
              </NuxtLink>
              <NuxtLink to="/transport" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">directions_car</span>
                Transport Assistant
              </NuxtLink>
              <NuxtLink to="/phrasebook" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">translate</span>
                Phrasebook
              </NuxtLink>
              <NuxtLink to="/connectivity" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">wifi</span>
                SIM & Connectivity
              </NuxtLink>
              <NuxtLink to="/accommodation" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">hotel</span>
                Accommodation
              </NuxtLink>
              <NuxtLink to="/money" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">payments</span>
                Money & Currency
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- Safety Dropdown -->
        <div
          class="relative"
          @mouseenter="activeDropdown = 'safety'"
          @mouseleave="activeDropdown = null"
        >
          <button
            class="transition-colors text-sm font-medium flex items-center gap-1"
            :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
          >
            Safety
            <span class="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <Transition name="dropdown">
            <div
              v-if="activeDropdown === 'safety'"
              class="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-white/10 py-2"
            >
              <NuxtLink to="/scam-alerts" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">warning</span>
                Scam Alerts
              </NuxtLink>
              <NuxtLink to="/emergency" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">emergency</span>
                Emergency Contacts
              </NuxtLink>
              <NuxtLink to="/culture" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">temple_buddhist</span>
                Cultural Etiquette
              </NuxtLink>
              <NuxtLink to="/health" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">medical_services</span>
                Health & Insurance
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- More Dropdown -->
        <div
          class="relative"
          @mouseenter="activeDropdown = 'more'"
          @mouseleave="activeDropdown = null"
        >
          <button
            class="transition-colors text-sm font-medium flex items-center gap-1"
            :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
          >
            More
            <span class="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <Transition name="dropdown">
            <div
              v-if="activeDropdown === 'more'"
              class="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-white/10 py-2"
            >
              <NuxtLink to="/itineraries" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">calendar_month</span>
                Itineraries & Planner
              </NuxtLink>
              <NuxtLink to="/weather" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">wb_sunny</span>
                Weather & Best Times
              </NuxtLink>
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
              <NuxtLink to="/blog" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">article</span>
                Blog
              </NuxtLink>
              <NuxtLink to="/contact" class="dropdown-link">
                <span class="material-symbols-outlined text-lg">mail</span>
                Contact
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <!-- Search Icon -->
        <button
          class="transition-colors"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
          aria-label="Search"
        >
          <span class="material-symbols-outlined">search</span>
        </button>

        <!-- Login Button -->
        <button class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg">
          Login
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="lg:hidden"
        :class="variant === 'transparent' ? 'text-white' : 'text-charcoal dark:text-white'"
        aria-label="Toggle menu"
      >
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden bg-white dark:bg-background-dark backdrop-blur-lg border-t border-gray-200 dark:border-white/20 max-h-[80vh] overflow-y-auto"
      >
        <nav class="flex flex-col p-6">
          <!-- Search -->
          <div class="mb-4 pb-4 border-b border-gray-200 dark:border-white/10">
            <div class="flex items-center gap-2 text-charcoal dark:text-white">
              <span class="material-symbols-outlined">search</span>
              <span class="text-sm font-medium">Search</span>
            </div>
          </div>

          <!-- Destinations -->
          <NuxtLink
            to="/destinations"
            class="mobile-link"
            @click="closeMobileMenu"
          >
            <span class="material-symbols-outlined">explore</span>
            Destinations
          </NuxtLink>
          <NuxtLink
            to="/activities"
            class="mobile-link"
            @click="closeMobileMenu"
          >
            <span class="material-symbols-outlined">hiking</span>
            Activities
          </NuxtLink>
          <NuxtLink
            to="/photos"
            class="mobile-link"
            @click="closeMobileMenu"
          >
            <span class="material-symbols-outlined">photo_camera</span>
            Photo Spots
          </NuxtLink>
          <NuxtLink
            to="/shopping"
            class="mobile-link"
            @click="closeMobileMenu"
          >
            <span class="material-symbols-outlined">shopping_bag</span>
            Shopping
          </NuxtLink>

          <!-- Essentials Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">Essentials</h3>
          </div>
          <NuxtLink to="/clean-dining" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">restaurant</span>
            Clean Dining
          </NuxtLink>
          <NuxtLink to="/transport" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">directions_car</span>
            Transport
          </NuxtLink>
          <NuxtLink to="/phrasebook" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">translate</span>
            Phrasebook
          </NuxtLink>
          <NuxtLink to="/connectivity" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">wifi</span>
            Connectivity
          </NuxtLink>
          <NuxtLink to="/accommodation" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">hotel</span>
            Accommodation
          </NuxtLink>
          <NuxtLink to="/money" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">payments</span>
            Money & Currency
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
          <NuxtLink to="/culture" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">temple_buddhist</span>
            Cultural Etiquette
          </NuxtLink>
          <NuxtLink to="/health" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">medical_services</span>
            Health & Insurance
          </NuxtLink>

          <!-- More Section -->
          <div class="mt-4 mb-2">
            <h3 class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">More</h3>
          </div>
          <NuxtLink to="/itineraries" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">calendar_month</span>
            Itineraries
          </NuxtLink>
          <NuxtLink to="/weather" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">wb_sunny</span>
            Weather
          </NuxtLink>
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
          <NuxtLink to="/blog" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">article</span>
            Blog
          </NuxtLink>
          <NuxtLink to="/contact" class="mobile-link" @click="closeMobileMenu">
            <span class="material-symbols-outlined">mail</span>
            Contact
          </NuxtLink>

          <!-- Login Button -->
          <button class="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg w-full mt-6">
            Login
          </button>
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

const isMobileMenuOpen = ref(false)
const activeDropdown = ref<string | null>(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
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

