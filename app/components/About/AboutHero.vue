<template>
  <div class="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <div class="relative w-full rounded-2xl overflow-hidden min-h-[600px] flex items-center justify-center group">
      <!-- Background Image -->
      <div 
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      
      <!-- Gradient Overlay: Radial for emphasis + Linear for text readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
      <div class="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 opacity-60"></div>

      <!-- Content -->
      <div class="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        <!-- Badge -->
        <span 
          class="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 shadow-lg animate-fade-in-up"
          style="animation-delay: 0.1s;"
        >
          {{ badge }}
        </span>
        
        <!-- Title -->
        <h1 
          class="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 drop-shadow-xl animate-fade-in-up" 
          style="animation-delay: 0.2s;"
          v-html="title.replace('Sri Lanka', '<span class=\'text-primary\'>Sri Lanka</span>')"
        >
        </h1>
        
        <!-- Subtitle -->
        <p 
          class="text-gray-100 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md animate-fade-in-up"
          style="animation-delay: 0.3s;"
        >
          {{ subtitle }}
        </p>

        <!-- Trust Chips -->
        <div 
          v-if="stats" 
          class="flex flex-wrap justify-center gap-4 mt-10 w-full animate-fade-in-up"
          style="animation-delay: 0.4s;"
        >
          <div 
            v-for="stat in stats" 
            :key="stat.label" 
            class="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 hover:bg-black/50 transition-colors"
          >
            <span class="text-primary font-bold text-lg">{{ stat.value }}</span>
            <span class="text-xs uppercase tracking-wide text-white/90 font-bold border-l border-white/20 pl-2">{{ stat.label }}</span>
          </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div 
          class="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce cursor-pointer group/scroll text-white/50 hover:text-white transition-colors"
          @click="$emit('scroll-down')"
        >
          <span class="text-xs font-bold uppercase tracking-widest opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-300">Discover our story</span>
          <span class="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-radial-gradient {
  background-image: radial-gradient(circle, var(--tw-gradient-stops));
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0; /* Start hidden */
}
</style>

<script setup lang="ts">
interface Stat {
  label: string
  value: string
}

defineProps<{
  title: string
  subtitle: string
  badge: string
  image: string
  stats?: Stat[]
}>()
</script>
