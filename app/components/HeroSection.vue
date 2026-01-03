<template>
  <header class="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <div 
        class="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[20s] animate-kenburns" 
        style="background-image: linear-gradient(rgba(10, 61, 98, 0.3), rgba(45, 52, 54, 0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_qzDllDNJvD480mVeA5gPWrd1aaVugj7JDwzfUQbk3CFFL5mVI1uH6vTg4vcnNNdOxZUyZLIPbved9BBveycTr8SjsRqHZ8dYXntjvF2Wq_x_y0jbN7JtFtIikSwRVOXY-FoPQgDO0GYmcQkvvXwlAM6oG9Z8hWCJwj5bT40MsIKgce2YaTjtZ3SQVzLDL3_crdAjwl5g3rPMHuWG1NHFRqzQxsmHus9YB5qDqvfplmEeN_HWuZlZ9KU9n3mLM4gK-ilMHzAU9Ks');"
        role="img"
        aria-label="Stunning aerial view of Galle Fort Lighthouse and coast in Sri Lanka"
      >
      </div>
    </div>

    <div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8 mt-16">
      <div class="space-y-6">
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight drop-shadow-2xl">
          CeylonGuide
        </h1>
        <p class="text-lg md:text-2xl font-light text-white/95 tracking-wide font-display max-w-2xl mx-auto drop-shadow-lg">
          Your Trusted Virtual Tour Guide for Sri Lanka
        </p>
      </div>

      <!-- Mission Chips -->
      <div class="flex flex-wrap justify-center gap-3 md:gap-4 my-2">
        <div class="backdrop-blur-md bg-white/10 border border-white/20 px-5 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-colors cursor-default">
          <span class="material-symbols-outlined text-accent-light text-lg">explore</span> Explore
        </div>
        <div class="backdrop-blur-md bg-white/10 border border-white/20 px-5 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-colors cursor-default">
          <span class="material-symbols-outlined text-accent-light text-lg">shield</span> Stay Safe
        </div>
        <div class="backdrop-blur-md bg-white/10 border border-white/20 px-5 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-colors cursor-default">
          <span class="material-symbols-outlined text-accent-light text-lg">chat</span> Communicate
        </div>
        <div class="backdrop-blur-md bg-white/10 border border-white/20 px-5 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-colors cursor-default">
          <span class="material-symbols-outlined text-accent-light text-lg">local_florist</span> Experience
        </div>
      </div>

      <button class="group mt-8 bg-accent hover:bg-accent/90 text-white text-base md:text-lg font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(244,124,60,0.5)] hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3">
        Start Exploring
        <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
      </button>
    </div>

    <!-- Bottom Fade -->
    <BottomFade />
  </header>
</template>

<style scoped>
@keyframes kenburns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.animate-kenburns {
  animation: kenburns 20s ease-in-out infinite alternate;
}
</style>
