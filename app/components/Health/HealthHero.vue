<template>
  <div class="@container w-full">
    <div 
      class="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-cover bg-center bg-no-repeat" 
      style='background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("/images/downloaded_5890478e8df3.avif");'
    >
      <div class="flex flex-col gap-4 text-center max-w-2xl px-4 animate-fade-in-up">
        <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl drop-shadow-sm">
          Stay Safe in Paradise
        </h1>
        <p class="text-white/90 text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm">
          Your comprehensive guide to health, vaccinations, and insurance for a worry-free journey through the pearl of the Indian Ocean.
        </p>
        <div class="flex justify-center mt-4">
          <button class="flex items-center gap-2 cursor-pointer justify-center rounded-lg h-12 px-6 bg-primary hover:bg-orange-600 transition-colors text-white text-base font-bold shadow-lg">
            <span class="material-symbols-outlined text-[20px]">download</span>
            <span>Download Health Checklist</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@keyframes fade-in-up {
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
  animation: fade-in-up 0.8s ease-out;
}
</style>
