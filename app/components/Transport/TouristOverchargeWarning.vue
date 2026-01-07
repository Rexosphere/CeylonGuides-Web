<template>
  <div class="bg-white dark:bg-surface-dark w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/5 mx-auto">
    <!-- Header -->
    <div class="bg-orange-50 dark:bg-orange-900/20 p-5 border-b border-orange-100 dark:border-orange-900/40 flex justify-between items-start">
      <div>
        <h3 class="text-xl font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
          <span class="material-symbols-outlined">warning</span>
          Common Tourist Scams
        </h3>
        <p class="text-orange-600/80 dark:text-orange-300/80 text-sm mt-1">Watch out for these tricks in Sri Lanka</p>
      </div>
      <button @click="$emit('close')" class="text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 bg-white/50 dark:bg-black/20 p-2 rounded-full transition-colors">
        <span class="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
    
    <!-- Content -->
    <div class="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
      <div class="space-y-4">
        
        <!-- Scam Item 1 -->
        <div class="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <div class="shrink-0 size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 text-xl">
            📟
          </div>
          <div>
            <h4 class="font-bold text-text-main dark:text-white text-sm mb-1">"Meter Broken" or "No Meter"</h4>
            <p class="text-xs text-text-muted leading-relaxed">
              <strong>The Trick:</strong> Driver claims the meter is broken or they don't have one, then quotes a high fixed price.
            </p>
            <div class="mt-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
              <span class="material-symbols-outlined text-[14px] align-text-bottom mr-1">check_circle</span>
              Solution: Insist on a metered tuk-tuk or agree on a price (using our calculator) before getting in.
            </div>
          </div>
        </div>

        <!-- Scam Item 2 -->
        <div class="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <div class="shrink-0 size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-xl">
            🏨
          </div>
          <div>
            <h4 class="font-bold text-text-main dark:text-white text-sm mb-1">"Hotel Closed" / "Road Closed"</h4>
            <p class="text-xs text-text-muted leading-relaxed">
              <strong>The Trick:</strong> Driver claims your hotel or destination is closed, burned down, or the road is blocked, and offers to take you to a "better" place (where they get a commission).
            </p>
            <div class="mt-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
              <span class="material-symbols-outlined text-[14px] align-text-bottom mr-1">check_circle</span>
              Solution: 99% of the time this is a lie. Insist on going to your original destination.
            </div>
          </div>
        </div>

        <!-- Scam Item 3 -->
        <div class="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <div class="shrink-0 size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
            🎉
          </div>
          <div>
            <h4 class="font-bold text-text-main dark:text-white text-sm mb-1">"Special Festival" / "Gem Exhibition"</h4>
            <p class="text-xs text-text-muted leading-relaxed">
              <strong>The Trick:</strong> A friendly local (or driver) tells you about a "one-day only" government gem sale or festival to get you into a shop.
            </p>
            <div class="mt-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
              <span class="material-symbols-outlined text-[14px] align-text-bottom mr-1">check_circle</span>
              Solution: Politely decline. It's almost always a high-pressure sales stop.
            </div>
          </div>
        </div>

        <!-- Scam Item 4 -->
        <div class="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <div class="shrink-0 size-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xl">
            🪙
          </div>
          <div>
            <h4 class="font-bold text-text-main dark:text-white text-sm mb-1">"No Change"</h4>
            <p class="text-xs text-text-muted leading-relaxed">
              <strong>The Trick:</strong> At the end of the ride, the driver claims to have no change for your Rs. 1000 or Rs. 5000 note, hoping you'll let them keep the difference.
            </p>
            <div class="mt-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
              <span class="material-symbols-outlined text-[14px] align-text-bottom mr-1">check_circle</span>
              Solution: Always carry small notes (Rs. 100, 50, 20) for transport.
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="p-6 pt-4 border-t border-gray-100 dark:border-white/5 bg-slate-50 dark:bg-surface-dark">
      <button @click="$emit('close')" class="w-full py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-text-main dark:text-white font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm">
        Stay Safe
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close'])
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}
</style>
