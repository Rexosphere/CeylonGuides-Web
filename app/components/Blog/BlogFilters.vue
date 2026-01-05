<template>
  <section class="px-4 md:px-6 lg:px-10 py-2 sticky top-[73px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-transparent transition-all">
    <div class="flex gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar mask-gradient">
      <button class="shrink-0 flex items-center justify-center rounded-full bg-[#181311] dark:bg-white text-white dark:text-[#181311] px-5 py-2 text-sm font-semibold transition-transform hover:scale-105">
        All Stories
      </button>
      <button class="shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-[#2c2420] border border-[#e5e0df] dark:border-[#3a2e2a] hover:border-primary/50 text-[#181311] dark:text-gray-200 px-5 py-2 text-sm font-medium transition-all hover:bg-white/80 hover:shadow-sm">
        Beaches
      </button>
      <button class="shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-[#2c2420] border border-[#e5e0df] dark:border-[#3a2e2a] hover:border-primary/50 text-[#181311] dark:text-gray-200 px-5 py-2 text-sm font-medium transition-all hover:bg-white/80 hover:shadow-sm">
        Hill Country
      </button>
      <button class="shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-[#2c2420] border border-[#e5e0df] dark:border-[#3a2e2a] hover:border-primary/50 text-[#181311] dark:text-gray-200 px-5 py-2 text-sm font-medium transition-all hover:bg-white/80 hover:shadow-sm">
        Culture & Heritage
      </button>
      <button class="shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-[#2c2420] border border-[#e5e0df] dark:border-[#3a2e2a] hover:border-primary/50 text-[#181311] dark:text-gray-200 px-5 py-2 text-sm font-medium transition-all hover:bg-white/80 hover:shadow-sm">
        Food & Spices
      </button>
      <button class="shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-[#2c2420] border border-[#e5e0df] dark:border-[#3a2e2a] hover:border-primary/50 text-[#181311] dark:text-gray-200 px-5 py-2 text-sm font-medium transition-all hover:bg-white/80 hover:shadow-sm">
        Wildlife
      </button>
      <button class="shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-[#2c2420] border border-[#e5e0df] dark:border-[#3a2e2a] hover:border-primary/50 text-[#181311] dark:text-gray-200 px-5 py-2 text-sm font-medium transition-all hover:bg-white/80 hover:shadow-sm">
        Community
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.mask-gradient {
  mask-image: linear-gradient(to right, transparent, black 10px, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10px, black 95%, transparent);
}
</style>
