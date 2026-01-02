<template>
  <footer class="bg-background-dark text-white pt-16 pb-8 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Main Footer Content -->
      <div class="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
        <!-- Brand Section -->
        <div class="text-center md:text-left">
          <div class="flex items-center justify-center md:justify-start gap-2 mb-4">
            <span class="material-symbols-outlined text-accent text-3xl">travel_explore</span>
            <h2 class="font-serif text-2xl font-bold">CeylonGuide</h2>
          </div>
          <p class="text-gray-400 max-w-xs">
            Helping you navigate Sri Lanka with confidence, safety, and cultural respect.
          </p>
        </div>

        <!-- Footer Links -->
        <div class="flex flex-wrap justify-center gap-8 md:gap-16">
          <NuxtLink 
            to="/about" 
            class="text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            About Us
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            Contact
          </NuxtLink>
          <NuxtLink 
            to="/privacy" 
            class="text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            Privacy Policy
          </NuxtLink>
          <span class="text-gray-500 text-sm font-medium cursor-default">
            App Coming Soon
          </span>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>© {{ currentYear }} CeylonGuide. All rights reserved.</p>
        
        <!-- Social Links -->
        <div class="flex gap-4">
          <a 
            href="#" 
            class="hover:text-white transition-colors"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a 
            href="#" 
            class="hover:text-white transition-colors"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a 
            href="#" 
            class="hover:text-white transition-colors"
            aria-label="Facebook"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
