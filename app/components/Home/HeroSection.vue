<template>
  <div>
    <!-- Active Alert Banner (fetched from API) -->
  <AlertBanner
      v-if="activeAlert"
      :type="activeAlert.severity === 'CRITICAL' ? 'danger' : 'warning'"
      :message="activeAlert.title || activeAlert.description || 'Safety Alert'"
      action-text="View Details"
      :action-link="alertLink"
    />

    <header class="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <div 
          class="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-[20s] animate-kenburns" 
          style="background-image: linear-gradient(rgba(10, 61, 98, 0.3), rgba(45, 52, 54, 0.5)), url('/images/downloaded_870c30a3afb8.avif');"
          role="img"
          aria-label="Stunning aerial view of Galle Fort Lighthouse and coast in Sri Lanka"
        >
        </div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8 mt-16">
        <div class="space-y-6">
          <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight drop-shadow-2xl">
            CeylonGuide
          </h1>
          <p class="text-lg md:text-2xl font-light text-white/95 tracking-wide font-display max-w-2xl mx-auto drop-shadow-lg">
            Your Trusted Virtual Tour Guide for Sri Lanka
          </p>
        </div>

        <!-- Live Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          <div 
            v-for="stat in stats" 
            :key="stat.label"
            class="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-4 rounded-xl text-white"
          >
            <div class="text-2xl md:text-3xl font-bold mb-1">
              <span v-if="stat.loading" class="animate-pulse">...</span>
              <span v-else>{{ stat.value }}</span>
            </div>
            <div class="text-xs text-white/80">{{ stat.label }}</div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap justify-center gap-4 mt-4">
          <NuxtLink 
            to="/safety-mode"
            class="group bg-red-600 hover:bg-red-700 text-white text-base md:text-lg font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3"
          >
            🚨 Safety Mode
          </NuxtLink>
          <NuxtLink 
            to="/destinations"
            class="group bg-accent hover:bg-accent/90 text-white text-base md:text-lg font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(244,124,60,0.5)] hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3"
          >
            Start Exploring
            <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Bottom Fade -->
      <BottomFade />
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

interface SafetyAlert {
  id: string
  title?: string
  description?: string
  severity: string
}

// Fetch active high-priority alerts
const { data: activeAlert } = await useFetch<SafetyAlert | null>(`${apiBase}/api/safety`, {
  query: { severity: 'HIGH,CRITICAL' },
  transform: (response: any) => {
    const alerts = response.data || []
    return alerts.length > 0 ? alerts[0] : null
  }
})

const alertLink = computed(() => activeAlert.value?.id ? `/safety-mode?alertId=${activeAlert.value.id}` : '/safety-mode')

// Live stats
const stats = ref([
  { label: 'Active Alerts', value: '0', loading: true },
  { label: 'Restaurants', value: '0', loading: true },
  { label: 'Phrases', value: '0', loading: true },
  { label: 'Facilities', value: '0', loading: true }
])

async function loadStats() {
  try {
    const [safetyRes, diningRes, phrasesRes, facilitiesRes] = await Promise.allSettled([
      $fetch<any>(`${apiBase}/api/safety/summary/stats`),
      $fetch<any>(`${apiBase}/api/dining`),
      $fetch<any>(`${apiBase}/api/phrases`),
      $fetch<any>(`${apiBase}/api/facilities`)
    ])
    
    if (safetyRes.status === 'fulfilled' && stats.value[0]) {
      const rows = safetyRes.value?.data || []
      const total = rows.reduce((sum: number, row: any) => sum + Number(row.count || 0), 0)
      stats.value[0].value = total.toString()
      stats.value[0].loading = false
    }
    
    if (diningRes.status === 'fulfilled' && stats.value[1]) {
      const count = diningRes.value?.data?.length || 0
      stats.value[1].value = count.toString()
      stats.value[1].loading = false
    }
    
    if (phrasesRes.status === 'fulfilled' && stats.value[2]) {
      const count = phrasesRes.value?.data?.length || 0
      stats.value[2].value = count.toString()
      stats.value[2].loading = false
    }
    
    if (facilitiesRes.status === 'fulfilled' && stats.value[3]) {
      const count = facilitiesRes.value?.data?.length || 0
      stats.value[3].value = count.toString()
      stats.value[3].loading = false
    }
  } catch (error) {
    console.error('Failed to load stats:', error)
    // Set defaults on error
    stats.value.forEach(s => { s.loading = false; s.value = '—' })
  }
}

onMounted(loadStats)
</script>

<style scoped>
@keyframes kenburns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.animate-kenburns {
  animation: kenburns 20s ease-in-out infinite alternate;
}
</style>
