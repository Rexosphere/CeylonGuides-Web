<template>
  <div class="relative flex w-full flex-col items-center justify-center gap-6 bg-cover bg-center py-20 px-8 text-center" 
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${heroImage}')` }">
    <div class="z-10 flex flex-col gap-2">
      <h1 class="text-3xl font-black leading-tight tracking-tight text-white lg:text-4xl">
        Stay in Serenity
      </h1>
      <p class="text-white/90 text-sm lg:text-base max-w-md mx-auto">
        Discover curated hotels, guesthouses, and homestays verified for safety and comfort.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const heroImage = '/images/downloaded_3d3dcfa78790.avif'
</script>
