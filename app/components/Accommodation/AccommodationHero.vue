<template>
  <div class="relative flex flex-col items-center justify-center gap-6 bg-cover bg-center p-8 lg:p-12 text-center" 
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${heroImage}')` }">
    <div class="z-10 flex flex-col gap-2">
      <h1 class="text-3xl font-black leading-tight tracking-tight text-white lg:text-4xl">
        Stay in Serenity
      </h1>
      <p class="text-white/90 text-sm lg:text-base max-w-md mx-auto">
        Discover curated hotels, guesthouses, and homestays verified for safety and comfort.
      </p>
    </div>
    <!-- Search Bar -->
    <div class="z-10 w-full max-w-lg rounded-xl bg-white p-2 shadow-xl dark:bg-neutral-800">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div class="relative flex-1">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-gray text-[20px]">search</span>
          <input 
            class="w-full border-none bg-transparent py-3 pl-10 pr-3 text-sm font-medium placeholder-neutral-gray focus:ring-0 dark:text-white" 
            placeholder="Where in Sri Lanka?" 
            type="text"
            v-model="searchQuery"
          />
        </div>
        <div class="h-px w-full bg-neutral-light sm:h-8 sm:w-px dark:bg-white/10"></div>
        <div class="relative flex w-full sm:w-auto">
          <button class="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white transition-colors hover:bg-primary/90">
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const heroImage = '/images/downloaded_3d3dcfa78790.avif'
const searchQuery = ref('')
</script>
