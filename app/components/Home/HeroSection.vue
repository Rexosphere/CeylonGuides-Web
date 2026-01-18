<template>
  <div>
    <!-- Active Alert Banner (fetched from API) -->
    <AlertBanner v-if="activeAlert" :type="activeAlert.severity === 'CRITICAL' ? 'danger' : 'warning'"
      :message="activeAlert.title || activeAlert.description || 'Safety Alert'" action-text="View Details"
      :action-link="alertLink" />

    <section class="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img alt="Sri Lanka Coastline" class="w-full h-full object-cover" src="/images/downloaded_870c30a3afb8.avif" />
        <div
          class="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-background-light dark:to-background-dark">
        </div>
        <div class="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
      </div>

      <!-- Hero Content -->
      <div class="container mx-auto px-6 relative z-10 text-center pt-20">
        <h1 class="text-5xl md:text-7xl font-display font-bold text-white mb-4 drop-shadow-lg tracking-tight">
          CeylonWiki
        </h1>
        <p class="text-xl md:text-2xl text-white/90 font-light mb-12 drop-shadow-md">
          Your Trusted Virtual Tour Guide for Sri Lanka
        </p>

        <!-- Live Stats Grid -->
        <div class="flex justify-center gap-6 md:gap-10 mb-12 flex-wrap">
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center">
            <div
              class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white mb-2 shadow-lg">
              <span v-if="stat.loading" class="text-2xl font-bold animate-pulse">...</span>
              <span v-else class="text-2xl font-bold">{{ stat.value }}</span>
            </div>
            <span class="text-xs text-white/80 font-medium tracking-wide uppercase">{{ stat.label }}</span>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/safety-mode"
            class="bg-accent-danger hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
            <span class="material-icons">warning</span>
            Safety Mode
          </NuxtLink>
          <NuxtLink to="/destinations"
            class="bg-secondary hover:bg-secondary/90 text-white px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
            Start Exploring
            <span class="material-icons text-sm">arrow_forward</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Floating Chat Button -->
      <div class="absolute bottom-10 right-10 z-20">
        <button
          class="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-secondary/80 transition-all">
          <span class="material-icons">chat</span>
        </button>
      </div>
    </section>
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
