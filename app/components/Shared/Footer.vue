<template>
  <footer class="bg-[#181311] dark:bg-[#120e0b] text-white pt-16 pb-10 border-t border-white/10 mt-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand & Mission Column -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2.5 mb-4">
            <div class="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span class="material-symbols-outlined text-[18px]">auto_stories</span>
            </div>
            <h2 class="font-serif text-2xl font-bold tracking-tight">CeylonGuide</h2>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            An independent journal of travel stories, cultural guides, and visual essays celebrating the island of Sri Lanka.
          </p>
          
          <div class="flex items-center gap-3 text-gray-400">
            <a href="#" class="hover:text-primary transition-colors p-1.5 rounded-full hover:bg-white/5" aria-label="Instagram">
              <span class="material-symbols-outlined text-[20px]">photo_camera</span>
            </a>
            <a href="#" class="hover:text-primary transition-colors p-1.5 rounded-full hover:bg-white/5" aria-label="Share">
              <span class="material-symbols-outlined text-[20px]">share</span>
            </a>
            <a href="#" class="hover:text-primary transition-colors p-1.5 rounded-full hover:bg-white/5" aria-label="Email">
              <span class="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>

        <!-- Topics Column -->
        <div>
          <h3 class="font-bold text-white mb-4 text-xs uppercase tracking-wider text-primary">
            Story Topics
          </h3>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li>
              <button @click="selectTopic('Hill Country')" class="hover:text-white transition-colors">
                Hill Country & Tea Mist
              </button>
            </li>
            <li>
              <button @click="selectTopic('Culture')" class="hover:text-white transition-colors">
                Heritage & Ancient Temples
              </button>
            </li>
            <li>
              <button @click="selectTopic('Beaches')" class="hover:text-white transition-colors">
                Coastal Surf & Beaches
              </button>
            </li>
            <li>
              <button @click="selectTopic('Food & Spices')" class="hover:text-white transition-colors">
                Flavors & Southern Spice
              </button>
            </li>
            <li>
              <button @click="selectTopic('Wildlife')" class="hover:text-white transition-colors">
                Wildlife Encounters
              </button>
            </li>
          </ul>
        </div>

        <!-- Editorial Navigation -->
        <div>
          <h3 class="font-bold text-white mb-4 text-xs uppercase tracking-wider text-primary">
            The Journal
          </h3>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li>
              <NuxtLink to="/" class="hover:text-white transition-colors">
                Featured Stories
              </NuxtLink>
            </li>
            <li>
              <button @click="openSaved" class="hover:text-white transition-colors">
                Saved Reading List
              </button>
            </li>
            <li>
              <button @click="openModal" class="hover:text-white transition-colors">
                Submit a Story
              </button>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-white transition-colors">
                About the Editorial
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Dispatch Column -->
        <div>
          <h3 class="font-bold text-white mb-4 text-xs uppercase tracking-wider text-primary">
            Ceylon Dispatch
          </h3>
          <p class="text-xs text-gray-400 leading-relaxed mb-4">
            New articles and travel journals published weekly. Read slowly, explore intentionally.
          </p>
          <button 
            @click="openModal"
            class="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[16px]">edit_note</span>
            Become a Contributor
          </button>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© {{ currentYear }} CeylonGuide. All rights reserved.</p>
        <p class="text-gray-500">Curated with ❤️ for slow travelers exploring Sri Lanka</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlog } from '~/composables/useBlog'

const router = useRouter()
const { setCategory, filterSavedOnly, isSubmissionModalOpen } = useBlog()

const currentYear = computed(() => new Date().getFullYear())

function selectTopic(topic: string) {
  filterSavedOnly.value = false
  setCategory(topic)
  router.push('/')
  if (import.meta.client) {
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }
}

function openSaved() {
  filterSavedOnly.value = true
  router.push('/')
  if (import.meta.client) {
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }
}

function openModal() {
  isSubmissionModalOpen.value = true
}
</script>
