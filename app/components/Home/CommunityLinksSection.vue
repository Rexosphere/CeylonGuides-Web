<template>
  <section class="py-12 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
      <!-- Community Forum -->
      <NuxtLink to="/community"
        class="group flex flex-col items-start p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors">
        <span class="material-icons text-secondary mb-2 group-hover:scale-110 transition-transform">groups</span>
        <h4 class="font-bold text-primary dark:text-white mb-1">Community Forum</h4>
        <span class="text-xs text-text-muted dark:text-gray-500">Connect with fellow travelers</span>
      </NuxtLink>

      <!-- Travel Blog -->
      <NuxtLink to="/blog"
        class="group flex flex-col items-start p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors">
        <span class="material-icons text-secondary mb-2 group-hover:scale-110 transition-transform">article</span>
        <h4 class="font-bold text-primary dark:text-white mb-1">Travel Blog</h4>
        <span class="text-xs text-text-muted dark:text-gray-500">Stories & hidden gems</span>
      </NuxtLink>

      <!-- About Us -->
      <NuxtLink to="/about"
        class="group flex flex-col items-start p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors">
        <span class="material-icons text-secondary mb-2 group-hover:scale-110 transition-transform">info</span>
        <h4 class="font-bold text-primary dark:text-white mb-1">About Us</h4>
        <span class="text-xs text-text-muted dark:text-gray-500">Our mission & team</span>
      </NuxtLink>

      <!-- Contact -->
      <NuxtLink to="/contact"
        class="group flex flex-col items-start p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors">
        <span class="material-icons text-secondary mb-2 group-hover:scale-110 transition-transform">mail</span>
        <h4 class="font-bold text-primary dark:text-white mb-1">Contact</h4>
        <span class="text-xs text-text-muted dark:text-gray-500">Get in touch with support</span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this static layout
</script>
