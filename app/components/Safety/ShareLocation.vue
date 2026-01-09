<template>
  <div class="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden ring-1 ring-white/10">
    <!-- Background decoration -->
    <div class="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
    
    <!-- Header -->
    <div class="flex items-start gap-5 mb-8 relative z-10">
      <div class="p-3.5 bg-white/10 rounded-2xl backdrop-blur-md shadow-inner ring-1 ring-white/20 flex-shrink-0">
        <span class="material-symbols-outlined text-2xl text-blue-50">share_location</span>
      </div>
      <div>
        <h2 class="text-xl font-bold tracking-tight text-white">Share My Location</h2>
        <p class="text-blue-100/80 text-sm mt-1 leading-relaxed">Send your precise coordinates instantly in an emergency.</p>
        <div v-if="!isOnline" class="flex items-center gap-2 mt-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-lg w-fit">
          <span class="material-symbols-outlined text-sm text-amber-300">wifi_off</span>
          <span class="text-xs font-bold text-amber-100">You are offline. Maps may not load.</span>
        </div>
      </div>
    </div>

    <!-- Location Status -->
    <div class="mb-8 relative z-10">
      <!-- Loading Skeleton -->
      <div v-if="geo.state.value.status === 'loading'" class="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm animate-pulse">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-5 h-5 rounded-full bg-white/20"></div>
          <div class="h-4 w-32 bg-white/20 rounded"></div>
        </div>
        <div class="flex gap-4">
          <div class="h-3 w-20 bg-white/10 rounded"></div>
          <div class="h-3 w-24 bg-white/10 rounded"></div>
        </div>
      </div>
      
      <!-- Idle / Denied -->
      <div v-else-if="geo.state.value.status === 'idle' || geo.state.value.status === 'denied'" class="space-y-4">
        <!-- Status Banner -->
        <div class="flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-sm"
          :class="geo.state.value.status === 'denied' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/10'"
        >
          <span class="material-symbols-outlined" 
            :class="geo.state.value.status === 'denied' ? 'text-amber-300' : 'text-blue-200'"
          >
            {{ geo.state.value.status === 'denied' ? 'location_off' : 'location_on' }}
          </span>
          <span class="text-sm font-medium text-white/90">
            {{ geo.state.value.status === 'denied' ? 'Location access denied' : 'Location not enabled' }}
          </span>
        </div>
        
        <button 
          v-if="geo.state.value.status === 'idle'"
          @click="geo.requestLocation()"
          class="w-full bg-white text-blue-900 hover:bg-blue-50 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined">gps_fixed</span>
          Enable Location
        </button>

        <!-- Manual input fallback -->
        <div v-if="geo.state.value.status === 'denied'" class="bg-black/20 p-4 rounded-2xl border border-white/10">
          <p class="text-xs font-bold text-blue-200 uppercase tracking-widest mb-3">Manual Entry</p>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div class="relative">
              <input 
                v-model="manualLat"
                type="number" 
                step="any"
                placeholder="0.0000"
                class="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all font-mono"
              />
              <span class="absolute right-3 top-2.5 text-[10px] text-white/40 font-bold pointer-events-none">LAT</span>
            </div>
            <div class="relative">
              <input 
                v-model="manualLng"
                type="number"
                step="any" 
                placeholder="0.0000"
                class="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all font-mono"
              />
              <span class="absolute right-3 top-2.5 text-[10px] text-white/40 font-bold pointer-events-none">LNG</span>
            </div>
          </div>
          <button 
            @click="applyManualLocation"
            :disabled="!manualLat || !manualLng"
            class="w-full bg-blue-500 hover:bg-blue-400 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg"
          >
            Use Coordinates
          </button>
        </div>
      </div>
      
      <!-- Granted -->
      <div v-else-if="geo.state.value.coords" class="bg-black/20 p-5 rounded-2xl border border-white/10 backdrop-blur-sm relative group overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div class="flex items-center gap-3 mb-3 relative z-10">
          <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <span class="material-symbols-outlined text-green-400 text-lg">check_circle</span>
          </div>
          <div>
            <p class="text-[10px] uppercase tracking-wider text-green-300 font-bold">Current Location</p>
            <p class="text-xl font-mono font-bold tracking-tight text-white">
              {{ geo.state.value.coords.lat.toFixed(5) }}, {{ geo.state.value.coords.lng.toFixed(5) }}
            </p>
          </div>
        </div>
        
        <div class="flex items-center gap-5 text-xs font-medium text-blue-200/80 pl-11 relative z-10">
          <span v-if="geo.state.value.accuracy" class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[14px]">gps_fixed</span>
            ±{{ Math.round(geo.state.value.accuracy) }}m
          </span>
          <span v-if="geo.state.value.lastUpdated" class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[14px]">schedule</span>
            {{ formatTime(geo.state.value.lastUpdated) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Share Buttons -->
    <div class="grid grid-cols-3 gap-4 relative z-10">
      <button 
        @click="handleWhatsApp"
        :disabled="!geo.state.value.coords"
        class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all p-4 rounded-2xl backdrop-blur-md border border-white/5 group disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
          <i class="fab fa-whatsapp text-2xl text-green-400"></i> <!-- Fallback to icon if FA not avail, using text -->
          <span class="material-symbols-outlined text-2xl text-green-400">chat</span>
        </div>
        <span class="text-xs font-bold text-white/90">WhatsApp</span>
      </button>
      
      <button 
        @click="handleSMS"
        :disabled="!geo.state.value.coords"
        class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all p-4 rounded-2xl backdrop-blur-md border border-white/5 group disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
          <span class="material-symbols-outlined text-2xl text-blue-300">sms</span>
        </div>
        <span class="text-xs font-bold text-white/90">SMS</span>
      </button>
      
      <button 
        @click="handleCopy"
        :disabled="!geo.state.value.coords"
        class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all p-4 rounded-2xl backdrop-blur-md border border-white/5 group disabled:opacity-40 disabled:cursor-not-allowed relative"
      >
        <div class="absolute inset-0 bg-green-500/20 transition-opacity duration-300 rounded-2xl" :class="copied ? 'opacity-100' : 'opacity-0'"></div>
        
        <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">
          <span class="material-symbols-outlined text-2xl text-purple-300 transition-all duration-300" :class="copied ? 'scale-0' : 'scale-100'">content_copy</span>
          <span class="material-symbols-outlined text-2xl text-green-300 absolute transition-all duration-300 scale-0" :class="copied ? 'scale-100' : ''">check</span>
        </div>
        <span class="text-xs font-bold text-white/90 relative z-10">{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGeolocation } from '~/composables/useGeolocation'
import { useNetwork } from '~/composables/useNetwork'

const geo = useGeolocation()
const { isOnline } = useNetwork()
const copied = ref(false)
const manualLat = ref<number | null>(null)
const manualLng = ref<number | null>(null)

// Request location on mount
onMounted(() => {
  geo.requestLocation()
})

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function applyManualLocation() {
  if (manualLat.value && manualLng.value) {
    geo.setManualLocation(manualLat.value, manualLng.value)
  }
}

function handleWhatsApp() {
  geo.shareViaWhatsApp()
}

function handleSMS() {
  geo.shareViaSMS()
}

async function handleCopy() {
  const success = await geo.copyToClipboard()
  if (success) {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>
