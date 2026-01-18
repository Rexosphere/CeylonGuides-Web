<template>
  <footer class="bg-surface-dark text-gray-400 py-16 text-sm">
    <div class="container mx-auto px-6">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Brand Section -->
        <div>
          <div class="flex items-center gap-2 mb-6">
            <span class="material-icons text-white text-2xl">travel_explore</span>
            <span class="text-xl font-bold font-display text-white">CeylonWiki</span>
          </div>
          <p class="mb-6 leading-relaxed text-gray-500">
            Your trusted virtual tour guide for Sri Lanka. Navigate with confidence, safety, and cultural respect.
          </p>
          <div class="flex gap-4">
            <a class="hover:text-white transition-colors" href="#" aria-label="Instagram">
              <span class="material-icons text-lg">photo_camera</span>
            </a>
            <a class="hover:text-white transition-colors" href="#" aria-label="Twitter">
              <span class="material-icons text-lg">chat_bubble</span>
            </a>
            <a class="hover:text-white transition-colors" href="#" aria-label="Facebook">
              <span class="material-icons text-lg">share</span>
            </a>
          </div>
        </div>

        <!-- Explore Column -->
        <div>
          <h5 class="text-white font-bold uppercase tracking-wider mb-6 text-xs">Explore</h5>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/destinations" class="footer-link">Destinations</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/activities" class="footer-link">Activities</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/itineraries" class="footer-link">Itineraries</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/weather" class="footer-link">Weather & Best Times</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Essential Tools Column -->
        <div>
          <h5 class="text-white font-bold uppercase tracking-wider mb-6 text-xs">Essential Tools</h5>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/clean-dining" class="footer-link">Clean Dining</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/transport" class="footer-link">Transport</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/phrasebook" class="footer-link">Phrasebook</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/accommodation" class="footer-link">Accommodation</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/money" class="footer-link">Money Guide</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Combined Stay Safe & Company Column -->
        <div>
          <div class="grid grid-cols-2 gap-8">
            <div>
              <h5 class="text-white font-bold uppercase tracking-wider mb-6 text-xs">Stay Safe</h5>
              <ul class="space-y-3">
                <li>
                  <NuxtLink to="/scam-alerts" class="footer-link">Scam Alerts</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/emergency" class="footer-link">Emergency Contacts</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/health" class="footer-link">Health Guide</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/culture" class="footer-link">Cultural Etiquette</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/visa" class="footer-link">Visa Information</NuxtLink>
                </li>
              </ul>
            </div>
            <div>
              <h5 class="text-white font-bold uppercase tracking-wider mb-6 text-xs">Company</h5>
              <ul class="space-y-3">
                <li>
                  <NuxtLink to="/about" class="footer-link">About</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/blog" class="footer-link">Blog</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/contact" class="footer-link">Contact</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/privacy" class="footer-link">Privacy & Terms</NuxtLink>
                </li>
                <li>
                  <span class="text-gray-600 text-sm cursor-default">App Coming Soon</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>© {{ currentYear }} CeylonWiki. All rights reserved.</p>
        <p class="mt-2 md:mt-0 flex items-center gap-1">
          Made with <span class="text-accent-danger material-icons text-xs">favorite</span> for travelers exploring Sri
          Lanka
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-link {
  @apply text-gray-400 hover:text-secondary transition-colors text-sm;
}
</style>
