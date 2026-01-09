<template>
  <div class="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-soft">
    <div
      class="bg-slate-50 dark:bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        <span class="material-symbols-outlined text-primary">map</span> Location Map
      </div>
      <div class="flex gap-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
        <span>Embassy</span>
        <span class="text-slate-600 dark:text-slate-300">{{ selectedLocation?.name || 'Australia' }}</span>
      </div>
    </div>
    <div class="h-64 relative bg-slate-200">
      <img alt="Location Map" class="w-full h-full object-cover grayscale-[0.2] contrast-[0.95]"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt8-miFsdBKecP9uf6Qhdlfp6d6UIxZmaI56Tg8FpRBZ069MIqnsRN5FOyvlcdUYyVZD4ckT3puVb1kHmwQFrVq625WGOUZxq_bJdzzyKLYfd5W-WDoSMZomOuoy6VOtlJ4W8J2fGjQKx90veDEME1Rz39VlBQivO-f2V587vfB44tuuDdVX73B-cu-_b-_aoFY9FvI7ieDXfVhyBqew0ZLSimoFWIEtHAmPMI7VEz0-spkTEUdFmKqusPF0609Zs-2B-qkhrYO8g" />
      <div
        class="absolute top-4 left-4 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 max-w-[200px]">
        <p class="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Current selection</p>
        <p class="text-xs font-bold leading-tight text-charcoal dark:text-white">6°54'22.7"N 79°51'40.3"E</p>
        <p class="text-[9px] text-slate-500 mt-1 leading-none">WV46+GFG Colombo</p>
        <a class="text-[10px] text-primary font-bold mt-2 inline-block hover:underline" href="#">View larger map</a>
      </div>
      <button
        class="absolute bottom-4 right-4 bg-white dark:bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform">
        <span class="material-symbols-outlined text-slate-600">fullscreen</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MapLocation {
  name: string
  lat?: number
  lng?: number
  type?: string
}

defineProps<{
  selectedLocation?: MapLocation | null
  isOffline?: boolean
}>()
</script>

<style scoped>
.text-charcoal {
  color: #1e293b;
}

.shadow-soft {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>
