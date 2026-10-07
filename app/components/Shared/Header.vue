<template>
  <!-- Clean Editorial Navigation Header -->
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-md"
    :class="[
      variant === 'transparent'
        ? 'bg-black/20 border-white/10 text-white'
        : 'bg-white/95 dark:bg-background-dark/95 border-gray-200/80 dark:border-white/10 text-charcoal dark:text-white'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-18 flex items-center justify-between">
      <!-- Brand / Publication Logo -->
      <NuxtLink to="/" class="flex items-center gap-2.5 group">
        <div class="size-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
          <span class="material-symbols-outlined text-[20px]">auto_stories</span>
        </div>
        <div class="flex flex-col">
          <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-none group-hover:text-primary transition-colors">
            CeylonGuide
          </span>
          <span class="text-[10px] uppercase font-bold tracking-widest text-primary/90 mt-0.5">
            Travel Journals & Stories
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Editorial Navigation -->
      <nav class="hidden md:flex items-center gap-7">
        <NuxtLink 
          to="/" 
          @click="resetFilters"
          class="text-sm font-semibold transition-colors hover:text-primary flex items-center gap-1.5"
          :class="isHomeActive ? 'text-primary' : 'text-charcoal/80 dark:text-white/80'"
        >
          <span>Stories</span>
        </NuxtLink>

        <!-- Topics Dropdown -->
        <div
          class="relative"
          @mouseenter="isTopicsOpen = true"
          @mouseleave="isTopicsOpen = false"
        >
          <button
            class="text-sm font-semibold transition-colors hover:text-primary flex items-center gap-1 text-charcoal/80 dark:text-white/80"
          >
            <span>Topics</span>
            <span class="material-symbols-outlined text-sm transition-transform" :class="{ 'rotate-180': isTopicsOpen }">expand_more</span>
          </button>
          
          <Transition name="dropdown">
            <div
              v-if="isTopicsOpen"
              class="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 py-2 z-50 overflow-hidden"
            >
              <button
                v-for="cat in topicCategories"
                :key="cat.name"
                @click="selectTopic(cat.name)"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-charcoal/80 dark:text-gray-200 hover:bg-primary/5 hover:text-primary transition-colors text-left"
              >
                <span class="material-symbols-outlined text-base text-primary">{{ cat.icon }}</span>
                <span>{{ cat.name }}</span>
              </button>
            </div>
          </Transition>
        </div>

        <!-- Saved Reads with Badge -->
        <button
          @click="showSavedOnly"
          class="text-sm font-semibold transition-colors hover:text-primary flex items-center gap-1.5 relative"
          :class="filterSavedOnly ? 'text-primary' : 'text-charcoal/80 dark:text-white/80'"
        >
          <span class="material-symbols-outlined text-[18px]" :class="filterSavedOnly ? 'filled' : ''">bookmark</span>
          <span>Saved</span>
          <span 
            v-if="savedCount > 0"
            class="size-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center -ml-0.5"
          >
            {{ savedCount }}
          </span>
        </button>

        <NuxtLink 
          to="/about" 
          class="text-sm font-semibold transition-colors hover:text-primary text-charcoal/80 dark:text-white/80"
        >
          About
        </NuxtLink>
      </nav>

      <!-- Right Action Area -->
      <div class="hidden sm:flex items-center gap-4">
        <!-- Share a Story CTA Button -->
        <button
          @click="openSubmissionModal"
          class="flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-md shadow-primary/20 hover:scale-105"
        >
          <span class="material-symbols-outlined text-[16px]">edit_note</span>
          <span>Write a Story</span>
        </button>

        <!-- User profile or login -->
        <div v-if="!isAuthenticated">
          <NuxtLink 
            to="/auth/login"
            class="text-xs font-bold px-3 py-1.5 rounded-full border border-gray-300 dark:border-neutral-700 hover:border-primary hover:text-primary transition-colors text-charcoal dark:text-white"
          >
            Sign In
          </NuxtLink>
        </div>
        
        <div v-else class="relative">
          <button 
            @click="isUserMenuOpen = !isUserMenuOpen"
            class="flex items-center gap-2 text-xs font-semibold"
          >
            <div class="size-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/30">
              <img v-if="user?.avatar_url" :src="user.avatar_url" :alt="user.name || 'User'" class="w-full h-full object-cover" />
              <span v-else class="material-symbols-outlined text-primary text-sm">person</span>
            </div>
          </button>
          
          <div 
            v-if="isUserMenuOpen" 
            class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-card-dark rounded-xl shadow-xl border border-gray-100 dark:border-white/10 py-2 z-50"
          >
            <div class="px-4 py-2 border-b border-gray-100 dark:border-white/10 text-xs">
              <p class="font-bold truncate">{{ user?.name || 'Reader' }}</p>
              <p class="text-gray-400 truncate">{{ user?.email }}</p>
            </div>
            <button 
              @click="handleLogout" 
              class="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
            >
              <span class="material-symbols-outlined text-sm">logout</span>
              Log Out
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center gap-3 md:hidden">
        <button
          @click="openSubmissionModal"
          class="flex items-center justify-center size-8 rounded-full bg-primary text-white"
          aria-label="Write a Story"
        >
          <span class="material-symbols-outlined text-[16px]">edit</span>
        </button>

        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="p-2 text-charcoal dark:text-white"
          aria-label="Toggle navigation menu"
        >
          <span class="material-symbols-outlined text-2xl">
            {{ isMobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Overlay -->
    <Transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-white dark:bg-card-dark border-b border-gray-200 dark:border-white/10 px-6 py-5 flex flex-col gap-4 shadow-xl"
      >
        <NuxtLink 
          to="/" 
          @click="navigateHome"
          class="flex items-center gap-3 py-2 text-sm font-bold text-charcoal dark:text-white"
        >
          <span class="material-symbols-outlined text-primary">auto_stories</span>
          <span>All Stories</span>
        </NuxtLink>

        <!-- Topic Categories for Mobile -->
        <div class="py-2 border-y border-gray-100 dark:border-white/5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">Explore Topics</span>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="cat in topicCategories"
              :key="cat.name"
              @click="selectTopicMobile(cat.name)"
              class="flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-charcoal/80 dark:text-gray-200 hover:bg-primary/10 hover:text-primary text-left"
            >
              <span class="material-symbols-outlined text-sm text-primary">{{ cat.icon }}</span>
              <span class="truncate">{{ cat.name }}</span>
            </button>
          </div>
        </div>

        <button
          @click="showSavedOnlyMobile"
          class="flex items-center justify-between py-2 text-sm font-bold text-charcoal dark:text-white text-left"
        >
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">bookmark</span>
            <span>Saved Stories</span>
          </div>
          <span v-if="savedCount > 0" class="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
            {{ savedCount }}
          </span>
        </button>

        <NuxtLink 
          to="/about" 
          @click="isMobileMenuOpen = false"
          class="flex items-center gap-3 py-2 text-sm font-bold text-charcoal dark:text-white"
        >
          <span class="material-symbols-outlined text-primary">info</span>
          <span>About CeylonGuide</span>
        </NuxtLink>

        <div class="pt-2 border-t border-gray-100 dark:border-white/5 flex gap-2">
          <button
            @click="openSubmissionModalMobile"
            class="flex-1 py-2.5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-sm">edit_note</span>
            Write a Story
          </button>
          
          <NuxtLink 
            v-if="!isAuthenticated"
            to="/auth/login"
            @click="isMobileMenuOpen = false"
            class="px-4 py-2.5 rounded-full border border-gray-200 dark:border-neutral-700 text-xs font-bold text-center"
          >
            Sign In
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Global Story Submission Modal -->
    <BlogSubmissionModal v-model="isSubmissionModalOpen" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlog } from '~/composables/useBlog'
import { useAuth } from '~/composables/useAuth'
import BlogSubmissionModal from '~/components/Blog/BlogSubmissionModal.vue'

defineProps({
  variant: {
    type: String,
    default: 'solid'
  }
})

const route = useRoute()
const router = useRouter()
const { user, isAuthenticated, logout } = useAuth()
const { 
  setCategory, 
  filterSavedOnly, 
  savedCount, 
  resetFilters, 
  isSubmissionModalOpen 
} = useBlog()

const isMobileMenuOpen = ref(false)
const isTopicsOpen = ref(false)
const isUserMenuOpen = ref(false)

const isHomeActive = computed(() => route.path === '/' && !filterSavedOnly.value)

const topicCategories = [
  { name: 'Hill Country', icon: 'landscape' },
  { name: 'Culture', icon: 'temple_buddhist' },
  { name: 'Beaches', icon: 'beach_access' },
  { name: 'Food & Spices', icon: 'restaurant' },
  { name: 'Wildlife', icon: 'pets' },
  { name: 'Community', icon: 'groups' }
]

function selectTopic(catName: string) {
  isTopicsOpen.value = false
  filterSavedOnly.value = false
  setCategory(catName)
  if (route.path !== '/') {
    router.push('/')
  }
}

function selectTopicMobile(catName: string) {
  isMobileMenuOpen.value = false
  selectTopic(catName)
}

function showSavedOnly() {
  filterSavedOnly.value = true
  if (route.path !== '/') {
    router.push('/')
  }
}

function showSavedOnlyMobile() {
  isMobileMenuOpen.value = false
  showSavedOnly()
}

function navigateHome() {
  isMobileMenuOpen.value = false
  resetFilters()
}

function openSubmissionModal() {
  isSubmissionModalOpen.value = true
}

function openSubmissionModalMobile() {
  isMobileMenuOpen.value = false
  isSubmissionModalOpen.value = true
}

async function handleLogout() {
  isUserMenuOpen.value = false
  await logout()
}
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-out;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
