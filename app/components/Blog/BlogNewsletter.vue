<template>
  <section class="px-4 md:px-6 lg:px-10 py-10 my-4">
    <div class="bg-primary/5 dark:bg-white/5 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
      <span class="material-symbols-outlined text-primary text-4xl mb-4 inline-block">mail</span>
      <h2 class="text-2xl md:text-3xl font-bold mb-3 dark:text-white">Weekly Ceylon Insights</h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        Get the latest travel tips, hidden gems, and community stories delivered straight to your inbox.
      </p>
      <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input 
          class="flex-1 h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a120e] text-[#181311] dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400" 
          placeholder="Enter your email address" 
          type="email"
        />
        <button class="h-12 px-6 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Subscribe
        </button>
      </form>
      <p class="text-xs text-gray-400 mt-4">No spam, just wanderlust. Unsubscribe anytime.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
