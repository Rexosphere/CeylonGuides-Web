<template>
  <div class="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-bold text-lg text-text-main dark:text-white">Meet a Local</h3>
      <a class="text-xs font-bold text-primary hover:underline" href="#">View All</a>
    </div>
    
    <div class="flex flex-col gap-4">
      <!-- Guide 1 -->
      <div class="flex items-center gap-3 pb-3 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
        <div 
          class="w-12 h-12 rounded-full bg-cover" 
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQby4oFZo615v2lmKCBi-pkypRRmN2ozNgNKPUlexNxqUtz44ojE8RBKOx7x8f8Gtja5TnWN1pKC--MOA9s00QNJja6kd7_0MASFzH8l9THaEub8NrYLBYbDrtJWw2ejg9a8DtERwaPGEiukNLPQiRJY7QvEOXOnaF4lMIPGoArxT_9ccqASap4YJPYlmMeErjfjV4P8UHJ9oU2cpCuYUN_-Gcz3imSOnYpJJbgk1LRnRJ2Vh37U6mfCtIEh7hTC_fPdardXsee8U");'
        ></div>
        <div class="flex-1">
          <h4 class="font-bold text-sm text-text-main dark:text-white">Chamara Perera</h4>
          <div class="flex items-center text-xs text-text-subtle">
            <span class="material-symbols-outlined text-[14px] text-yellow-500 mr-1">star</span>
            4.9 • Kandy Expert
          </div>
        </div>
        <button class="p-2 rounded-full bg-background-light dark:bg-gray-800 text-primary hover:bg-primary hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[20px]">mail</span>
        </button>
      </div>
      
      <!-- Guide 2 -->
      <div class="flex items-center gap-3 pb-3 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
        <div 
          class="w-12 h-12 rounded-full bg-cover" 
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjxhth_FSTJgZyZvXZfMIhTZsBPXrSaHnlUfGU4ThYo-F5jZC1Zhw3jzF3fRayj8pi5mS2khagq7UJVLK52VoOz3HOGVDsFQ0Ls9SFXQaPUkm-MjNc9Q4bcReTjplX1edVv2ER8xt8lT2q-j_UWIKK6O2gkGpuSFr_cuxHGpFywjF-teBx-dfPI2DUOL5ZG5qvfC_qGiOonDMO-FKeK10ZUoAGeDaBtnRrvoVMCFBVzBnGiyE2nh1nL6h0eHx9qG8RXO04lOKeuTU");'
        ></div>
        <div class="flex-1">
          <h4 class="font-bold text-sm text-text-main dark:text-white">Nimali Silva</h4>
          <div class="flex items-center text-xs text-text-subtle">
            <span class="material-symbols-outlined text-[14px] text-yellow-500 mr-1">star</span>
            5.0 • Wildlife Guide
          </div>
        </div>
        <button class="p-2 rounded-full bg-background-light dark:bg-gray-800 text-primary hover:bg-primary hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[20px]">mail</span>
        </button>
      </div>
      
      <!-- Guide 3 -->
      <div class="flex items-center gap-3 pb-3 border-b border-border-light dark:border-border-dark last:border-0 last:pb-0">
        <div 
          class="w-12 h-12 rounded-full bg-cover" 
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8cq4sNgFcr7V7BJzuZoU_GZsVdtdnC9uuMdP0OZmI3fcI3fex392eOWxveCEi0g-f0I6bCResS9AozUBHUAfBtsylcANGg9XNdVAjMj8IRw59Mchkuw744zu2_uRaFHEjgbTVI8X1GVs_iIipDN1WOyMnow6GVAwu6SlhKjkjc4WAbei6qMijS0tLmtx9bSscRiuSNYoRu8OMTS-ER_1R9frXZbdnCkvdmPP_p-9tustbclzJV-7FpErhe0_Rapg1zL7Fi77zUw4");'
        ></div>
        <div class="flex-1">
          <h4 class="font-bold text-sm text-text-main dark:text-white">Kasun Raj</h4>
          <div class="flex items-center text-xs text-text-subtle">
            <span class="material-symbols-outlined text-[14px] text-yellow-500 mr-1">star</span>
            4.8 • Surfing Instructor
          </div>
        </div>
        <button class="p-2 rounded-full bg-background-light dark:bg-gray-800 text-primary hover:bg-primary hover:text-white transition-colors">
          <span class="material-symbols-outlined text-[20px]">mail</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
