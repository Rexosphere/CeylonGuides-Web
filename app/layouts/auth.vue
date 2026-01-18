<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-deep via-secondary to-primary/80 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Gradient orbs -->
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      
      <!-- Subtle pattern overlay -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHptMC0xMGg0djRoLTR6bTEwIDEwaDR2NGgtNHptMC0xMGg0djRoLTR6bS0yMCAxMGg0djRoLTR6bTAtMTBoNHY0aC00em0tMTAgMTBoNHY0aC00em0wLTEwaDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
    </div>
    
    <!-- Main content -->
    <div class="relative z-10 w-full max-w-md mx-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center justify-center gap-2 mb-8 group">
        <span class="material-symbols-outlined text-4xl text-white group-hover:scale-110 transition-transform">travel_explore</span>
        <h1 class="font-serif text-3xl font-bold text-white tracking-tight">CeylonWiki</h1>
      </NuxtLink>
      
      <!-- Auth card -->
      <div class="bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <slot />
      </div>
      
      <!-- Footer text -->
      <p class="text-center text-white/60 text-sm mt-6">
        Your trusted virtual tour guide for Sri Lanka 🇱🇰
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Minimal layout for auth pages
</script>
