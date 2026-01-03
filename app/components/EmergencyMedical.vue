<template>
  <section class="pb-12">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-neutral-dark dark:text-white">Nearest Hospitals</h2>
      <button class="text-primary text-sm font-bold flex items-center hover:underline">
        View All Locations
        <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span>
      </button>
    </div>
    <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] overflow-hidden shadow-sm flex flex-col md:flex-row h-[400px]">
      
      <!-- Hospital List Sidebar -->
      <div class="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-[#3a2d28] overflow-y-auto custom-scrollbar bg-neutral-50/50 dark:bg-[#2a1d18]">
        
        <div 
          v-for="hospital in hospitals" 
          :key="hospital.name"
          class="p-5 border-b border-neutral-100 dark:border-[#3a2d28] cursor-pointer hover:bg-white dark:hover:bg-[#32241e] transition-colors border-l-4"
          :class="hospital.active ? 'border-l-primary bg-white dark:bg-[#32241e]' : 'border-l-transparent'"
        >
          <h4 class="font-bold text-neutral-dark dark:text-white">{{ hospital.name }}</h4>
          <p class="text-xs text-neutral-soft mt-1">{{ hospital.address }}</p>
          <div class="flex items-center gap-3 mt-3">
            <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">{{ hospital.type }}</span>
            <span class="text-xs text-neutral-400">{{ hospital.distance }}</span>
          </div>
        </div>

      </div>

      <!-- Map Area -->
      <div class="w-full md:w-2/3 relative bg-gray-100">
        <div class="absolute inset-0 bg-cover bg-center" 
             style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKotZfq8YbX9xIZ4XTeqh6aK4vS2uprs__koxENRINNRriXY4MEHsBdpE_WD6bRn7gnsKcjnf0ZMDvrk9WCyWj1vesHmE2uGD5mykitPCRIuOyL1chY3su4qSk2XuS7pd-kSqay3mMFI0jMa7e4inBQKP_w91LT7WRoUPm117Civ_nYOt2FPiobvcufiiVG2jWJJ5vSPVnWuNgtAo9LY6PVz4GgOCrzKAxDixm2WYQ7bOeZTDf2MhLFFmBmLbm4MPPPu3iwtDtv4E');">
        </div>
        <!-- Map Controls Overlay -->
        <div class="absolute bottom-4 right-4 flex flex-col gap-2">
          <button class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-neutral-600 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">my_location</span>
          </button>
          <button class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-neutral-600 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">add</span>
          </button>
          <button class="w-10 h-10 bg-white shadow-md rounded-lg flex items-center justify-center text-neutral-600 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">remove</span>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const hospitals = [
  {
    name: 'Asiri Surgical Hospital',
    address: '21 Kirimandala Mawatha, Colombo 05',
    type: 'Open 24/7',
    distance: '0.8 km',
    active: true
  },
  {
    name: 'Lanka Hospitals',
    address: '578 Elvitigala Mawatha, Colombo 05',
    type: 'Open 24/7',
    distance: '1.2 km',
    active: false
  },
  {
    name: 'National Hospital',
    address: 'Regent St, Colombo 01000',
    type: 'Public',
    distance: '2.5 km',
    active: false
  }
]
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e5e5e5;
    border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #3a2d28;
}
</style>
