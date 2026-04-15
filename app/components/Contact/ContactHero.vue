<template>
  <div class="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
      :style="{ backgroundImage: `linear-gradient(rgba(34, 21, 16, 0.4), rgba(34, 21, 16, 0.6)), url('${image}')` }"
    ></div>
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
      <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4 drop-shadow-lg">
        {{ title }}
      </h1>
      <p class="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
        {{ subtitle }}
      </p>
      
      <!-- Response Stats -->
      <div v-if="responseStats && responseStats.length" class="flex flex-wrap justify-center gap-4 mt-8">
        <div 
          v-for="stat in responseStats" 
          :key="stat.text"
          class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm"
        >
          <span class="material-symbols-outlined text-primary text-lg">{{ stat.icon }}</span>
          <span>{{ stat.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ResponseStat {
  icon: string
  text: string
}

defineProps<{
  title: string
  subtitle: string
  image: string
  responseStats?: ResponseStat[]
}>()
</script>
