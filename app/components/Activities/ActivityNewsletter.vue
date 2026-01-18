<template>
  <section class="py-24 bg-background-light dark:bg-background-dark">
    <div class="container mx-auto px-6 text-center">
      <div class="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <span class="material-icons text-secondary text-2xl">mail_outline</span>
      </div>
      <h2 class="text-3xl font-display font-bold text-primary dark:text-white mb-4">Join the CeylonWiki Community</h2>
      <p class="text-text-muted dark:text-gray-400 mb-8 max-w-lg mx-auto">
        Get exclusive travel tips, hidden gems, and special offers for your next Sri Lankan adventure delivered to your
        inbox.
      </p>
      <form class="max-w-md mx-auto flex gap-2" @submit.prevent="handleSubmit">
        <input v-model="email"
          class="flex-1 rounded-full border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark px-6 py-3 text-sm focus:border-secondary focus:ring-secondary"
          placeholder="Enter your email address" type="email" required />
        <button
          class="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full text-sm font-bold shadow-sm transition-all"
          type="submit">
          Subscribe
        </button>
      </form>
      <div class="mt-8 flex justify-center gap-6 text-xs text-text-muted">
        <a class="hover:text-primary transition-colors" href="#">About Us</a>
        <a class="hover:text-primary transition-colors" href="#">Contact</a>
        <a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

function handleSubmit() {
  // Handle newsletter subscription
  console.log('Subscribing email:', email.value)
  // Reset form
  email.value = ''
}
</script>
