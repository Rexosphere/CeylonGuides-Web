<template>
  <section class="relative w-full bg-neutral-dark py-12 md:py-20 overflow-hidden">
    <!-- Background Image (decorative - hidden in safety mode) -->
    <div 
      class="absolute inset-0 z-0 bg-cover bg-center decorative-element" 
      style="background-image: url('/images/downloaded_76b4f2112848.avif');"
    ></div>
    <div class="absolute inset-0 z-10 bg-gradient-to-r from-neutral-dark/80 via-neutral-dark/50 to-transparent"></div>
    
    <div class="relative z-20 max-w-[960px] mx-auto px-5 lg:px-0 flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="flex flex-col gap-4 max-w-lg">
        <div class="flex items-center gap-2 text-primary font-bold tracking-wide uppercase text-xs">
          <span class="w-2 h-2 rounded-full bg-primary" :class="{ 'animate-pulse': !isSafetyModeEnabled }"></span>
          24/7 Assistance
        </div>
        <h1 class="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Emergency Support
        </h1>
        <p class="text-gray-300 text-lg leading-relaxed non-essential-ui">
          Stay safe in Sri Lanka. Access immediate help, find consular services, and locate nearby medical facilities instantly.
        </p>
      </div>
      
      <!-- Right side: Safety Mode Toggle & Download -->
      <div class="flex flex-col gap-4 flex-shrink-0">
        <!-- Safety Mode Toggle -->
        <div 
          v-if="showSafetyToggle"
          class="flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-xl transition-all"
        >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined" :class="isSafetyModeEnabled ? 'text-red-400' : 'text-primary'">
              {{ isSafetyModeEnabled ? 'emergency' : 'shield' }}
            </span>
            <div class="text-left">
              <div class="text-xs font-medium opacity-80">Emergency Mode</div>
              <div class="text-sm font-bold">Safety Mode</div>
            </div>
          </div>
          
          <!-- Toggle Switch -->
          <button
            @click="toggleSafetyMode"
            class="safety-mode-toggle"
            :data-enabled="isSafetyModeEnabled"
            :aria-label="isSafetyModeEnabled ? 'Disable Safety Mode' : 'Enable Safety Mode'"
            role="switch"
            :aria-checked="isSafetyModeEnabled"
          >
            <span class="toggle-knob"></span>
          </button>
        </div>

        <!-- Download Offline PDF (non-essential) -->
        <button 
          @click="$emit('download-pdf')"
          class="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-xl transition-all non-essential-ui"
        >
          <span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">download</span>
          <div class="text-left">
            <div class="text-xs font-medium opacity-80">No Internet?</div>
            <div class="text-sm font-bold">Download Offline PDF</div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  showSafetyToggle?: boolean
  isOffline?: boolean
}>()

defineEmits(['download-pdf'])

const { isSafetyModeEnabled, toggleSafetyMode } = useSafetyMode()
</script>
