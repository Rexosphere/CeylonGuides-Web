<script setup lang="ts">
import { useClickDebug } from '~/composables/useClickDebug'
useClickDebug()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
    <!-- Fixed Header (z-50 stacking layer established) -->
    <Header variant="solid" />

    <!-- Main content area with header buffer (prevents content hiding behind fixed nav) -->
    <main class="flex-1 pt-20">
      <!-- Standardized container wrapper: max-w-7xl with responsive padding -->
      <!-- This pattern matches Footer design and establishes visual alignment across all pages -->
      <!-- Padding: mobile 1rem (px-4), tablet 1.5rem (sm:px-6), desktop 2rem (lg:px-8) -->
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

    <!-- Footer: uses same max-w-7xl wrapper (visual alignment anchor) -->
    <Footer />

    <!-- Global AI Chat Widget (z-index managed in component) -->
    <AIChatWidget />

    <!-- Global Toast Notifications (z-index managed in component) -->
    <ToastContainer />
  </div>
</template>
