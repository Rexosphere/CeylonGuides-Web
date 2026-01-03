<template>
  <div class="bg-[#181311] dark:bg-surface-dark rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    
    <div class="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
      <div class="flex-1">
        <div class="inline-flex items-center gap-2 text-primary font-bold mb-2">
          <span class="material-symbols-outlined">gavel</span>
          <span>Drone Safety & Regulations</span>
        </div>
        
        <h2 class="text-3xl font-bold text-white mb-4">Fly Responsibly in Paradise</h2>
        
        <p class="text-[#d0c9c6] mb-6 leading-relaxed">
          Sri Lanka has strict drone laws to protect its heritage sites and wildlife. All drones must be registered with the Civil Aviation Authority (CAA) before arrival.
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-red-400 text-sm">block</span>
            </div>
            <div>
              <h4 class="text-white font-bold text-sm">No Fly Zones</h4>
              <p class="text-[#d0c9c6] text-xs mt-1">Airports, military bases, and most national parks.</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-yellow-400 text-sm">straighten</span>
            </div>
            <div>
              <h4 class="text-white font-bold text-sm">Height Limit</h4>
              <p class="text-[#d0c9c6] text-xs mt-1">Maximum flight altitude is 120m (400ft) AGL.</p>
            </div>
          </div>
        </div>
        
        <div class="mt-8">
          <a class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold transition-colors" href="#">
            Get Permit Guide
          </a>
        </div>
      </div>
      
      <div 
        class="w-full md:w-1/3 aspect-video md:aspect-square bg-gray-800 rounded-xl bg-cover bg-center border border-white/10 shadow-2xl" 
        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtwCp4ivQJTZPdbVjYmyKtx9e6uFqdSQmDTGozFUbiFfvAtqxfKuNPtkqfZ4uasBCxkCZ9EpBNaOFyvwTQ8kCcvtxZYEBn9g04PyNnXwj3KYevKpe6G0eOj8X19HA2ZsHbJjXZKIpdgOId5ZPzW-wLt-488fUd_dNFk5Hq7B6d83jEceD38Fkt_kUt69S6bYMj5MhsKpFSuE_s6UQ2jwqzOAH5uh-blEUkpWFWCEketVHs84AAYwC-606a83aoQ6kBWkWNWi-xCOQ');"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
