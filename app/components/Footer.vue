<template>
  <footer class="bg-background-dark text-white pt-16 pb-8 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-accent text-3xl">travel_explore</span>
            <h2 class="font-serif text-2xl font-bold">CeylonGuide</h2>
          </div>
          <p class="text-gray-400 text-sm mb-4">
            Your trusted virtual tour guide for Sri Lanka. Navigate with confidence, safety, and cultural respect.
          </p>
          <!-- Social Links -->
          <div class="flex gap-4">
            <a
              href="#"
              class="text-gray-400 hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <span class="material-symbols-outlined">photo_camera</span>
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-accent transition-colors"
              aria-label="Twitter"
            >
              <span class="material-symbols-outlined">chat</span>
            </a>
            <a
              href="#"
              class="text-gray-400 hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <span class="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>

        <!-- Explore Column -->
        <div>
          <h3 class="font-bold text-white mb-4 text-sm uppercase tracking-wider">Explore</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/destinations" class="footer-link">
                Destinations
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/activities" class="footer-link">
                Activities
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/itineraries" class="footer-link">
                Itineraries
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/weather" class="footer-link">
                Weather & Best Times
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Essential Tools Column -->
        <div>
          <h3 class="font-bold text-white mb-4 text-sm uppercase tracking-wider">Essential Tools</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/clean-dining" class="footer-link">
                Clean Dining
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/transport" class="footer-link">
                Transport
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/phrasebook" class="footer-link">
                Phrasebook
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/accommodation" class="footer-link">
                Accommodation
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/money" class="footer-link">
                Money Guide
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Stay Safe Column -->
        <div>
          <h3 class="font-bold text-white mb-4 text-sm uppercase tracking-wider">Stay Safe</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/scam-alerts" class="footer-link">
                Scam Alerts
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/emergency" class="footer-link">
                Emergency Contacts
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/health" class="footer-link">
                Health Guide
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/culture" class="footer-link">
                Cultural Etiquette
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/visa" class="footer-link">
                Visa Information
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company Column -->
        <div>
          <h3 class="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/about" class="footer-link">
                About
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="footer-link">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="footer-link">
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="footer-link">
                Privacy & Terms
              </NuxtLink>
            </li>
            <li>
              <span class="text-gray-500 text-sm cursor-default">App Coming Soon</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© {{ currentYear }} CeylonGuide. All rights reserved.</p>
        <p class="text-gray-600">Made with ❤️ for travelers exploring Sri Lanka</p>
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
  @apply text-gray-400 hover:text-white transition-colors text-sm;
}
</style>
