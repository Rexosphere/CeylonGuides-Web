<template>
  <header class="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <div 
        class="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[20s] animate-kenburns" 
        style="background-image: linear-gradient(rgba(10, 61, 98, 0.4), rgba(45, 52, 54, 0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwBGW3nxKqdP8iNhnphVWF3ONsEuP_vcOFKZTsej1XwPCqoYE_qQkG6VuXanrBjHy8kZPJaQNpk7aVJs2ZwoYRQZg3NDdovWXVRqPv_8kMcI4JezJFyd27wOmFKm0qA5frobg3v-Y4JN53Ma7HclvJ9-X-yjOShfIpxwC7M6jTM9ndTB8x0E1jOS7UOzdLCQN7Hch1vGK2ZiPq1gKpjksj8d80h4tiNSWScXhlAKI0CXqpeqFP99JNMRLxOJVYU9FZ5H_wk3pkqpdS');"
        role="img"
        aria-label="Stunning aerial view of Sigiriya Rock Fortress surrounded by lush green jungle in Sri Lanka"
      >
      </div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8 mt-16">
      <div class="space-y-4">
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight drop-shadow-lg">
          CeylonGuide
        </h1>
        <p class="text-lg md:text-2xl font-light text-white/90 tracking-wide font-display max-w-2xl mx-auto drop-shadow-md">
          Your Trusted Virtual Tour Guide for Sri Lanka
        </p>
      </div>

      <!-- Mission Chips -->
      <div class="flex flex-wrap justify-center gap-3 md:gap-4 my-4">
        <div class="backdrop-blur-md bg-white/20 border border-white/30 px-6 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-lg">explore</span> Explore
        </div>
        <div class="backdrop-blur-md bg-white/20 border border-white/30 px-6 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-lg">shield</span> Stay Safe
        </div>
        <div class="backdrop-blur-md bg-white/20 border border-white/30 px-6 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-lg">chat</span> Communicate
        </div>
        <div class="backdrop-blur-md bg-white/20 border border-white/30 px-6 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-lg">local_florist</span> Experience
        </div>
      </div>

      <button class="group mt-6 bg-accent hover:bg-accent/90 text-white text-base md:text-lg font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2">
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
