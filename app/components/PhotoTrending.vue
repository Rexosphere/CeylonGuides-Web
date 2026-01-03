<template>
  <div class="mb-10">
    <div class="flex items-end justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-[#181311] dark:text-white tracking-tight">Trending on Social</h2>
        <p class="text-[#896c61] dark:text-[#a0908a] mt-1">#CeylonGuide spots with the most engagement.</p>
      </div>
    </div>
    
    <div class="relative group/scroll">
      <!-- Cards Container -->
      <div class="flex gap-4 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory">
        <!-- Story Card 1 -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer group">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCd6n1WZOSDvSbLzlMMAl6KJt_lY39NsPs62d2NTmCB3sEEhkFPlB9Qt8dInNp52yBllS9cDXFIbnskNwhttpPlBYMTRXbdNgizhkWMQZUKfXVF7IzNFym2x4s37uPHj4Nuvs5Bi5lRrssMjr2-VxGCQ40Ma_Xf6VUi_27PmYwv9O2bjvzrye3NuGS2tCrEfg24_7yLOdJDgl0uAZFfO5sChUcROIgG7voCrpKlg8sW6E0zu8dxUficOvxjW8VbpgPmNiDsnOdK7Ew');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xs">favorite</span>
              </div>
              <span class="text-white text-xs font-medium">12.5k Likes</span>
            </div>
            <h3 class="text-white font-bold leading-tight">Red Mosque, Colombo</h3>
          </div>
        </div>
        
        <!-- Story Card 2 -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer group">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEqnxLQ9v20GYUkl2Oan_MYDZ_OdfD8Qt_gl_BcTbS7qWEdBpw51ZbEX6JvP9c6rdv89EbYS7Hu2FRl37DJ4RpcM58wH3D4D5bqLKFm36gacDNF2xqUDWgvnUqBc-UdWErbpmP7lRleh6JXj9m9Te3gzdUDihcbxYDH1igVXcKYXa4gjo16pGNgqeQz0NgVQsk-cLry8c5X9DmMid-n8zca6rHGf-21WG1vXOBgRzRhdOBp-04M_AK9MSSsvSIiu8YfVp0qPxSBSk');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xs">favorite</span>
              </div>
              <span class="text-white text-xs font-medium">8.2k Likes</span>
            </div>
            <h3 class="text-white font-bold leading-tight">Kandy to Ella Train</h3>
          </div>
        </div>
        
        <!-- Story Card 3 -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer group">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCVIkI5HSFp8_npZI9Und-QdYefc7Rxc9BxvhLOlz8sxwK7j0RhpYO-o4pXtQmM00fFis2vNhgZUdG04Zb5i5NiHcsuYMraGpzBLghTcM0aCxRuOcbu0_GB6L2c3FTSEw2uuEtFX516KrKsLIvQ-KJzZlAfKWbzyAklV7IXPRKIcpykyD-g9Rsku4LIBTP18TmTpBiV29X261qvIwY7Y83bDRHKOt3SsHr792xRar5qBo_5IczVlBoAJvBXaw8ejZxqFb_hfQVuxa0');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xs">favorite</span>
              </div>
              <span class="text-white text-xs font-medium">15k Likes</span>
            </div>
            <h3 class="text-white font-bold leading-tight">Yala Safari</h3>
          </div>
        </div>
        
        <!-- Story Card 4 -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer group">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZmRTOnD-1MY-E6axQeH0bbHHLi4t0WTLE7UrL_YAfrmcYzUXT3lBFJdYm2uHTeY8H5oj2EqwvWqUfHSJAe5DqWy1G_P3X8JNzJ5GJjWxL0azsL3cZ51mggbBUYO8dAro39rTs7-3b5BYka0nhhthzgrE88MQDmR9yNPz6g6FvaObnhZYARh3sBjRW8xmlX_Ybs0Lh9z_h1saMrzT70NNGxolOszATxr8bqniJItqypl5MbI4ceyDovSoVtjke6cd-9u_Jwq0it3Q');"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span class="material-symbols-outlined text-white text-xs">favorite</span>
              </div>
              <span class="text-white text-xs font-medium">9.1k Likes</span>
            </div>
            <h3 class="text-white font-bold leading-tight">Stilt Fishermen</h3>
          </div>
        </div>
        
        <!-- Story Card 5 (More) -->
        <div class="snap-center shrink-0 w-[240px] h-[360px] relative rounded-xl overflow-hidden cursor-pointer bg-[#f4f1f0] dark:bg-surface-dark border-2 border-dashed border-[#d0c9c6] dark:border-[#3a2e2a] flex flex-col items-center justify-center group hover:border-primary transition-colors">
          <div class="w-12 h-12 rounded-full bg-white dark:bg-[#3a2e2a] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
            <span class="material-symbols-outlined text-primary">add_a_photo</span>
          </div>
          <p class="text-[#181311] dark:text-white font-bold text-center px-4">Submit Your Shot</p>
          <p class="text-[#896c61] dark:text-[#a0908a] text-xs text-center mt-1">Get featured next week</p>
        </div>
      </div>
    </div>
  </div>
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
</style>
