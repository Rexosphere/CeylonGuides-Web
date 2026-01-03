<template>
  <footer class="bg-background-light dark:bg-background-dark py-16 border-t border-gray-200 dark:border-neutral-800">
    <div class="layout-container flex justify-center">
      <div class="w-full max-w-[960px] px-4 md:px-10 text-center">
        <div class="size-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <span class="material-symbols-outlined text-primary">mail</span>
        </div>
        <h2 class="text-2xl font-bold mb-3 text-text-main dark:text-white">Join the CeylonGuide Community</h2>
        <p class="text-text-muted mb-8 max-w-lg mx-auto">Get exclusive travel tips, hidden gems, and special offers for your next Sri Lankan adventure delivered to your inbox.</p>
        <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input class="flex-1 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-surface-dark px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white" placeholder="Enter your email address" type="email"/>
          <button class="bg-text-main dark:bg-white text-white dark:text-text-main px-6 py-3 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap" type="button">
            Subscribe
          </button>
        </form>
        <div class="mt-12 flex justify-center gap-8 text-sm font-medium text-text-muted">
          <a class="hover:text-primary transition-colors" href="#">About Us</a>
          <a class="hover:text-primary transition-colors" href="#">Contact</a>
          <a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
        </div>
        <p class="mt-8 text-xs text-gray-400">© 2024 CeylonGuide. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
