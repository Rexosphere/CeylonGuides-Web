<template>
  <!-- Fixed transparent header that overlays hero -->
  <!-- Fixed header that overlays hero or sits on top of content -->
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
      <div class="hidden lg:flex items-center gap-8">
        <NuxtLink 
          to="/destinations" 
          active-class="text-primary font-bold dark:text-white"
          class="transition-colors text-sm font-medium"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
        >
          Destinations
        </NuxtLink>
        <NuxtLink 
          to="/clean-dining" 
          active-class="text-dining-primary font-bold dark:text-dining-primary"
          class="transition-colors text-sm font-medium"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
        >
          Clean Dining
        </NuxtLink>
        <NuxtLink 
          to="/transport" 
          active-class="text-primary font-bold dark:text-white"
          class="transition-colors text-sm font-medium"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
        >
          Transport
        </NuxtLink>
        <NuxtLink 
          to="/phrasebook" 
          active-class="text-primary font-bold dark:text-white"
          class="transition-colors text-sm font-medium"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
        >
          Phrasebook
        </NuxtLink>
        <NuxtLink 
          to="/scam-alerts" 
          active-class="text-primary font-bold dark:text-white"
          class="transition-colors text-sm font-medium"
          :class="variant === 'transparent' ? 'text-white/90 hover:text-accent' : 'text-charcoal/90 dark:text-white/90 hover:text-primary'"
        >
          Scam Alerts
        </NuxtLink>
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
        class="lg:hidden bg-white/95 backdrop-blur-lg border-t border-white/20"
      >
        <nav class="flex flex-col gap-4 p-6">
          <NuxtLink 
            to="/destinations" 
            class="text-charcoal text-base font-medium hover:text-primary transition-colors"
            @click="closeMobileMenu"
          >
            Destinations
          </NuxtLink>
          <NuxtLink 
            to="/clean-dining" 
            class="text-charcoal text-base font-medium hover:text-primary transition-colors"
            @click="closeMobileMenu"
          >
            Clean Dining
          </NuxtLink>
          <NuxtLink 
            to="/transport" 
            class="text-charcoal text-base font-medium hover:text-primary transition-colors"
            @click="closeMobileMenu"
          >
            Transport
          </NuxtLink>
          <NuxtLink 
            to="/phrasebook" 
            class="text-charcoal text-base font-medium hover:text-primary transition-colors"
            @click="closeMobileMenu"
          >
            Phrasebook
          </NuxtLink>
          <NuxtLink 
            to="/scam-alerts" 
            class="text-charcoal text-base font-medium hover:text-primary transition-colors"
            @click="closeMobileMenu"
          >
            Scam Alerts
          </NuxtLink>
          <button class="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg w-full">
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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
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
</style>

