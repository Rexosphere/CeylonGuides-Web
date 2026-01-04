<template>
  <div 
    class="relative w-full h-[400px] flex items-center justify-center bg-cover bg-center" 
    style='background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%), url("/images/downloaded_7f28e8b3d626.avif");'
  >
    <div class="flex flex-col gap-4 text-center max-w-[720px] px-4">
      <h1 class="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] drop-shadow-md">
        Connect with Ceylon Travelers
      </h1>
      <h2 class="text-white/90 text-base md:text-lg font-medium max-w-xl mx-auto drop-shadow-sm">
        Share your journey, ask questions, and find local hidden gems with a community of explorers.
      </h2>
      
      <div class="mt-4 relative w-full max-w-[560px] mx-auto group">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-subtle">
          <span class="material-symbols-outlined">search</span>
        </div>
        <input 
          class="block w-full pl-11 pr-32 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary shadow-lg text-text-main placeholder:text-text-subtle text-base" 
          placeholder="Search for tips, guides, or friends..." 
          type="text"
        />
        <button class="absolute right-2 top-2 bottom-2 bg-primary hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-lg text-sm transition-colors">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
