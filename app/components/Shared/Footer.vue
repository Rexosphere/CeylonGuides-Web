<template>
  <footer class="bg-surface-inverse text-text-soft py-14 md:py-16 text-sm shadow-md">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10 md:mb-12">
        <!-- Brand Section -->
        <div>
          <div class="flex items-center gap-2 mb-6">
            <span class="material-icons text-brand-accent-400 text-2xl">travel_explore</span>
            <span class="text-xl font-bold font-heading text-text-inverse">CeylonWiki</span>
          </div>
          <p class="mb-6 leading-relaxed text-text-soft">
            Your trusted virtual tour guide for Sri Lanka. Navigate with confidence, safety, and cultural respect.
          </p>
          <div class="flex gap-4">
            <a class="text-text-soft hover:text-brand-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverse rounded-xs transition-colors" href="#" aria-label="Instagram">
              <span class="material-icons text-lg">photo_camera</span>
            </a>
            <a class="text-text-soft hover:text-brand-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverse rounded-xs transition-colors" href="#" aria-label="Twitter">
              <span class="material-icons text-lg">chat_bubble</span>
            </a>
            <a class="text-text-soft hover:text-brand-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverse rounded-xs transition-colors" href="#" aria-label="Facebook">
              <span class="material-icons text-lg">share</span>
            </a>
          </div>
        </div>

        <!-- Explore Column -->
        <div>
          <h5 class="text-text-inverse font-semibold uppercase tracking-wider mb-5 text-xs">Explore</h5>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/destinations" :class="footerLinkClass">Destinations</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/activities" :class="footerLinkClass">Activities</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/itineraries" :class="footerLinkClass">Itineraries</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/weather" :class="footerLinkClass">Weather & Best Times</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Essential Tools Column -->
        <div>
          <h5 class="text-text-inverse font-semibold uppercase tracking-wider mb-5 text-xs">Essential Tools</h5>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/clean-dining" :class="footerLinkClass">Clean Dining</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/transport" :class="footerLinkClass">Transport</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/phrasebook" :class="footerLinkClass">Phrasebook</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/accommodation" :class="footerLinkClass">Accommodation</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/money" :class="footerLinkClass">Money Guide</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Combined Stay Safe & Company Column -->
        <div>
          <div class="grid grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h5 class="text-text-inverse font-semibold uppercase tracking-wider mb-5 text-xs">Stay Safe</h5>
              <ul class="space-y-3">
                <li>
                  <NuxtLink to="/scam-alerts" :class="footerLinkClass">Scam Alerts</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/emergency" :class="footerLinkClass">Emergency Contacts</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/health" :class="footerLinkClass">Health Guide</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/culture" :class="footerLinkClass">Cultural Etiquette</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/visa" :class="footerLinkClass">Visa Information</NuxtLink>
                </li>
              </ul>
            </div>
            <div>
              <h5 class="text-text-inverse font-semibold uppercase tracking-wider mb-5 text-xs">Company</h5>
              <ul class="space-y-3">
                <li>
                  <NuxtLink to="/about" :class="footerLinkClass">About</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/blog" :class="footerLinkClass">Blog</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/contact" :class="footerLinkClass">Contact</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/privacy" :class="footerLinkClass">Privacy & Terms</NuxtLink>
                </li>
                <li>
                  <span class="text-text-soft/60 text-sm cursor-default">App Coming Soon</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-7 md:pt-8 border-t border-text-soft/20 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-text-soft/70">
        <p>© {{ currentYear }} CeylonWiki. All rights reserved.</p>
        <p class="flex items-center gap-1">
          Made with <span class="text-brand-accent-500 material-icons text-xs">favorite</span> for travelers exploring Sri
          Lanka
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const footerLinkClass =
  'text-text-soft hover:text-brand-accent-400 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverse rounded-xs'
</script>
