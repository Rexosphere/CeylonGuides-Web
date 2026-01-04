<template>
  <div class="@container">
    <div class="@[480px]:p-4">
      <div 
        class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 relative overflow-hidden" 
        style='background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("/images/downloaded_e8ec4d0aae55.avif");'
      >
        <div class="flex flex-col gap-4 text-center max-w-[720px] z-10">
          <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] drop-shadow-md">
            Stay Connected in Paradise
          </h1>
          <h2 class="text-white/90 text-sm font-medium leading-relaxed @[480px]:text-lg @[480px]:font-medium @[480px]:leading-relaxed drop-shadow-sm px-4">
            From Colombo's bustling streets to Ella's quiet peaks, find the best SIM cards, data plans, and WiFi spots for your Sri Lankan journey.
          </h2>
        </div>
        
        <div class="flex gap-3 z-10">
          <button class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 @[480px]:h-12 @[480px]:px-8 bg-primary hover:bg-orange-600 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base">
            <span class="truncate">Compare Plans</span>
          </button>
          <button class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 @[480px]:h-12 @[480px]:px-8 bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base">
            <span class="truncate">Find WiFi</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
