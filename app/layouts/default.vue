<script setup lang="ts">
import { useClickDebug } from '~/composables/useClickDebug'
useClickDebug()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
    <Header variant="solid" />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />

    <!-- Global AI Chat Widget -->
    <AIChatWidget />

    <!-- Global Toast Notifications -->
    <ToastContainer />
  </div>
</template>
