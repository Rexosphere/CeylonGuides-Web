<template>
  <section class="relative w-full mb-8">
    <div class="relative overflow-hidden rounded-2xl min-h-[400px] md:min-h-[480px] flex items-center justify-center bg-cover bg-center" 
         role="img" 
         aria-label="Stunning photography location in Sri Lanka" 
         style="background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url('/images/downloaded_f999a39c7eaa.avif');">
      <div class="relative z-10 flex flex-col gap-6 text-center max-w-[720px] px-4">
        <span class="text-white/90 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">Photography Guide</span>
        <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
          Capture Sri Lanka's Magic
        </h1>
        <p class="text-white/90 text-sm md:text-lg font-normal leading-relaxed max-w-lg mx-auto">
          16 stunning locations with optimal lighting times, drone regulations, and insider tips for the perfect shot.
        </p>
        <div class="mt-4 flex w-full max-w-[500px] mx-auto bg-white dark:bg-[#2d2420] p-2 rounded-xl shadow-xl">
          <div class="flex items-center pl-3 text-gray-400">
            <span class="material-symbols-outlined">search</span>
          </div>
          <input 
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="flex-1 bg-transparent border-none focus:ring-0 text-sm md:text-base px-3 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none" 
            placeholder="Search locations, tags..." 
            type="text"
          />
          <button 
            v-if="modelValue"
            type="button"
            @click="$emit('update:modelValue', '')"
            class="text-gray-400 hover:text-gray-600 px-2"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
