<template>
  <div class="bg-primary rounded-2xl p-6 text-white shadow-xl shadow-teal-900/20">
    <div class="flex items-center gap-3 mb-4">
      <div class="p-2 bg-white/10 rounded-full">
        <span class="material-icons text-xl">my_location</span>
      </div>
      <div>
        <h3 class="font-bold text-lg">Share My Location</h3>
        <p class="text-xs text-teal-100 opacity-80">Send precise coordinates instantly.</p>
      </div>
    </div>

    <!-- Location Status -->
    <div class="bg-black/20 rounded-lg p-3 flex items-center gap-3 mb-6 border border-white/5">
      <span v-if="!hasLocation" class="material-icons text-yellow-400 text-sm">location_disabled</span>
      <span v-else class="material-icons text-green-400 text-sm">check_circle</span>
      <span class="text-sm font-medium">{{ hasLocation ? 'Location detected' : 'Location access denied' }}</span>
    </div>

    <!-- Manual Entry -->
    <div class="space-y-3 mb-4">
      <label class="text-xs font-semibold text-teal-100 uppercase tracking-wider">Manual Entry</label>
      <div class="grid grid-cols-2 gap-3">
        <div class="relative">
          <input v-model="manualLat"
            class="w-full bg-white/10 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-teal-200/50 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition"
            placeholder="0.0000" type="text" />
        </div>
        <div class="relative">
          <input v-model="manualLon"
            class="w-full bg-white/10 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder-teal-200/50 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition"
            placeholder="0.0000" type="text" />
        </div>
      </div>
      <button @click="useManualCoords" :disabled="!manualLat || !manualLon"
        class="w-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition border border-white/10">
        Use Coordinates
      </button>
    </div>

    <!-- Share Options -->
    <div class="grid grid-cols-3 gap-3 pt-2">
      <button @click="shareViaWhatsApp" :disabled="!hasLocation"
        class="flex flex-col items-center justify-center p-3 rounded-xl bg-teal-800/50 hover:bg-teal-800/70 disabled:opacity-50 disabled:cursor-not-allowed transition border border-white/5">
        <span class="material-icons text-xl mb-1">chat</span>
        <span class="text-[10px]">WhatsApp</span>
      </button>
      <button @click="shareViaSMS" :disabled="!hasLocation"
        class="flex flex-col items-center justify-center p-3 rounded-xl bg-teal-800/50 hover:bg-teal-800/70 disabled:opacity-50 disabled:cursor-not-allowed transition border border-white/5">
        <span class="material-icons text-xl mb-1">sms</span>
        <span class="text-[10px]">SMS</span>
      </button>
      <button @click="copyToClipboard" :disabled="!hasLocation"
        class="flex flex-col items-center justify-center p-3 rounded-xl bg-teal-800/50 hover:bg-teal-800/70 disabled:opacity-50 disabled:cursor-not-allowed transition border border-white/5">
        <span class="material-icons text-xl mb-1">content_copy</span>
        <span class="text-[10px]">Copy</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  coords?: { lat: number; lng: number } | null
  loading?: boolean
}>()

const manualLat = ref('')
const manualLon = ref('')
const currentCoords = ref(props.coords)

const hasLocation = computed(() => !!currentCoords.value)

const useManualCoords = () => {
  const lat = parseFloat(manualLat.value)
  const lon = parseFloat(manualLon.value)

  if (!isNaN(lat) && !isNaN(lon)) {
    currentCoords.value = { lat, lng: lon }
  }
}

const getLocationString = () => {
  if (!currentCoords.value) return ''
  return `${currentCoords.value.lat.toFixed(6)}, ${currentCoords.value.lng.toFixed(6)}`
}

const getGoogleMapsLink = () => {
  if (!currentCoords.value) return ''
  return `https://www.google.com/maps?q=${currentCoords.value.lat},${currentCoords.value.lng}`
}

const shareViaWhatsApp = () => {
  if (!hasLocation.value) return
  const message = `🚨 Emergency - My Location: ${getLocationString()}\n${getGoogleMapsLink()}`
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
}

const shareViaSMS = () => {
  if (!hasLocation.value) return
  const message = `Emergency - My Location: ${getLocationString()} ${getGoogleMapsLink()}`
  window.location.href = `sms:?body=${encodeURIComponent(message)}`
}

const copyToClipboard = async () => {
  if (!hasLocation.value) return
  const text = `${getLocationString()}\n${getGoogleMapsLink()}`
  try {
    await navigator.clipboard.writeText(text)
    alert('Location copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Watch for prop changes
watch(() => props.coords, (newCoords) => {
  if (newCoords) {
    currentCoords.value = newCoords
  }
})
</script>
