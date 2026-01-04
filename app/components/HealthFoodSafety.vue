<template>
  <section class="w-full bg-white dark:bg-[#1f1612] py-20 scroll-mt-24" id="safety">
    <div class="max-w-[1000px] mx-auto px-6">
      <div class="flex flex-col md:flex-row gap-12 items-center">
        <div class="md:w-1/2">
          <div class="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
            <img 
              alt="Fresh tropical fruits" 
              class="object-cover w-full h-full" 
              src="/images/downloaded_3b676fb7ea7e.avif"
            />
            <div class="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p class="text-white font-bold text-lg">Eat Fresh, Eat Safe.</p>
            </div>
          </div>
        </div>
        
        <div class="md:w-1/2">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Food & Water Safety</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Sri Lankan food is delicious, but travelers' stomachs can be sensitive. Follow these simple rules to avoid "Bali Belly".
          </p>
          
          <div class="space-y-6">
            <div class="flex gap-4">
              <div class="w-12 h-12 shrink-0 rounded-full bg-background-light dark:bg-gray-800 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">local_drink</span>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-gray-100">Drink Bottled Water Only</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Tap water is not safe for drinking. Ensure the seal on your bottle is intact.</p>
              </div>
            </div>
            
            <div class="flex gap-4">
              <div class="w-12 h-12 shrink-0 rounded-full bg-background-light dark:bg-gray-800 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">restaurant</span>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-gray-100">Eat Cooked Food</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Ensure street food is cooked piping hot in front of you. Avoid raw salads in budget places.</p>
              </div>
            </div>
            
            <div class="flex gap-4">
              <div class="w-12 h-12 shrink-0 rounded-full bg-background-light dark:bg-gray-800 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">icecream</span>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-gray-100">Avoid Ice</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Unless you are in a high-end hotel, it's safer to skip ice in your drinks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
