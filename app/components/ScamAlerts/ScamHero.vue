<template>
  <div class="relative w-full h-96 bg-primary overflow-hidden mb-6">
    <!-- Background Image -->
    <img 
      alt="Sri Lanka Safety" 
      class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
      src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2070&auto=format&fit=crop" 
    />
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-primary/95"></div>
    
    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
        Scam Alerts
      </h1>

      <!-- Stats Row -->
      <div class="flex flex-wrap justify-center gap-6 mb-8 w-full">
        <div class="stat-card">
          <span class="stat-value">{{ stats.total }}</span>
          <span class="stat-label">Active Scams</span>
        </div>
        <div class="stat-card border-red-500/30 bg-red-500/10">
          <span class="stat-value text-red-400">{{ stats.high }}</span>
          <span class="stat-label text-red-200">High Risk</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ stats.locations }}</span>
          <span class="stat-label">Hotspots</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 justify-center">
        <button 
          @click="$emit('report')"
          class="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-900/20 transform hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <span class="text-xl">📢</span> Report a Scam
        </button>
        

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stats: {
    total: number
    high: number
    locations: number
  }
  reportCount: number
}>()

defineEmits(['report', 'toggle-reports'])
</script>

<style scoped>
.stat-card {
  @apply flex flex-col items-center justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 min-w-[120px] transition-transform hover:scale-105;
}

.stat-value {
  @apply text-3xl font-bold text-white mb-1;
}

.stat-label {
  @apply text-sm text-blue-100 font-medium uppercase tracking-wider;
}
</style>
