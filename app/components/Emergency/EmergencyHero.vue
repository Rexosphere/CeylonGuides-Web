<template>
  <section class="hero-bg h-[380px] flex items-center relative">
    <div class="max-w-7xl mx-auto px-6 w-full flex justify-between items-end pb-16">
      <div class="text-white">
        <p class="text-xs font-bold uppercase tracking-widest mb-3 opacity-90 text-slate-200">24/7 Assistance</p>
        <h1 class="text-5xl font-bold mb-4 tracking-tight text-white">Emergency Support</h1>
        <p class="max-w-xl text-lg text-slate-200 leading-relaxed font-light">
          Stay safe in Sri Lanka. Access immediate help, find consular services, and locate nearby medical facilities
          instantly.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="glass-card p-5 rounded-2xl flex items-center justify-between min-w-[320px]">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span class="material-symbols-outlined text-white">shield</span>
            </div>
            <div>
              <p class="text-slate-200 text-xs font-semibold">Emergency Mode</p>
              <p class="text-white font-bold">Safety Mode</p>
            </div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input class="sr-only peer" type="checkbox" :checked="showSafetyToggle" @change="$emit('toggle-safety')" />
            <div
              class="w-11 h-6 bg-slate-600/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary">
            </div>
          </label>
        </div>
        <div
          class="glass-card p-5 rounded-2xl flex items-center justify-between min-w-[320px] cursor-pointer hover:bg-white/10 transition-colors"
          @click="$emit('download-pdf')">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span class="material-symbols-outlined text-white">download_for_offline</span>
            </div>
            <div>
              <p class="text-slate-200 text-xs font-semibold">No Internet?</p>
              <p class="text-white font-bold">Download Offline PDF</p>
            </div>
          </div>
          <span class="material-symbols-outlined text-white/60">arrow_forward_ios</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  showSafetyToggle: boolean
  isOffline?: boolean
}>()

defineEmits<{
  'toggle-safety': []
  'download-pdf': []
}>()
</script>

<style scoped>
.hero-bg {
  background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%);
  position: relative;
  overflow: hidden;
}

.hero-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2000');
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  mix-blend-mode: overlay;
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
