<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="show" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900 shadow-2xl">
          <!-- Header -->
          <div class="relative p-6 pb-4 border-b border-slate-100 dark:border-gray-700">
            <!-- Close Button -->
            <button 
              @click="$emit('close')"
              class="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span class="material-symbols-outlined text-slate-500">close</span>
            </button>
            
            <!-- Icon + Title -->
            <div class="flex items-center gap-4">
              <div 
                :class="[
                  'w-14 h-14 rounded-xl flex items-center justify-center',
                  restroom.fees.isFree 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                    : 'bg-amber-100 dark:bg-amber-900/30'
                ]"
              >
                <span 
                  :class="[
                    'material-symbols-outlined text-3xl',
                    restroom.fees.isFree ? 'text-emerald-600' : 'text-amber-600'
                  ]"
                >wc</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-slate-800 dark:text-white">{{ restroom.name }}</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px]">location_on</span>
                  {{ restroom.area || restroom.city }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6 space-y-5">
            <!-- Rating & Fee -->
            <div class="flex flex-wrap gap-3">
              <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-gray-800">
                <span class="material-symbols-outlined text-amber-500">star</span>
                <span class="font-bold text-slate-700 dark:text-white">{{ restroom.communityRating }}/5</span>
                <span v-if="restroom.reviewCount" class="text-sm text-slate-500">({{ restroom.reviewCount }} reviews)</span>
              </div>
              <div 
                :class="[
                  'flex items-center gap-2 px-3 py-2 rounded-xl font-bold',
                  restroom.fees.isFree 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' 
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                ]"
              >
                <span class="material-symbols-outlined text-[20px]">
                  {{ restroom.fees.isFree ? 'check_circle' : 'payments' }}
                </span>
                {{ restroom.fees.isFree ? 'Free to Use' : (restroom.fees.amountLKR ? `Rs ${restroom.fees.amountLKR}` : 'Paid') }}
              </div>
              <div 
                v-if="restroom.accessibility.wheelchairAccessible"
                class="flex items-center gap-2 px-3 py-2 rounded-xl font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                <span class="material-symbols-outlined text-[20px]">accessible</span>
                Wheelchair Accessible
              </div>
            </div>

            <!-- Accessibility Notes -->
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Accessibility</h3>
              <p class="text-slate-600 dark:text-slate-300">{{ restroom.accessibility.notes }}</p>
            </div>

            <!-- Community Notes -->
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Community Notes</h3>
              <p class="text-slate-600 dark:text-slate-300">{{ restroom.communityNotes }}</p>
            </div>

            <!-- Fee Rules -->
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Fees & Rules</h3>
              <p class="text-slate-600 dark:text-slate-300">{{ restroom.fees.rulesNotes }}</p>
            </div>

            <!-- Sources -->
            <div v-if="restroom.sourceLinks.length > 0">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Sources</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(source, index) in restroom.sourceLinks" 
                  :key="index"
                  class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 text-xs font-medium text-slate-600 dark:text-slate-400"
                >
                  <span class="material-symbols-outlined text-[14px]">link</span>
                  {{ source }}
                </span>
              </div>
            </div>

            <!-- Mini Map -->
            <div v-if="restroom.coordinates">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Location</h3>
              <div class="h-40 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-gray-700">
                <ClientOnly>
                  <div ref="miniMapContainer" class="w-full h-full"></div>
                  <template #fallback>
                    <div class="w-full h-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center">
                      <span class="material-symbols-outlined text-3xl text-slate-400 animate-pulse">map</span>
                    </div>
                  </template>
                </ClientOnly>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-gray-700">
              <div class="flex flex-col sm:flex-row gap-3">
                <button 
                  v-if="restroom.coordinates"
                  @click="openMaps"
                  class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-dark-charcoal font-bold hover:bg-primary/90 transition-colors"
                >
                  <span class="material-symbols-outlined">directions</span>
                  Get Directions
                </button>
                <button 
                  @click="$emit('close')"
                  class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span class="material-symbols-outlined">close</span>
                  Close
                </button>
              </div>
              <button 
                @click="$emit('report-issue')"
                class="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors flex items-center justify-center gap-1"
              >
                <span class="material-symbols-outlined text-[16px]">flag</span>
                Report Issue / Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, nextTick } from 'vue'
import type { Restroom } from '~/data/restrooms'

const props = defineProps<{
  show: boolean
  restroom: Restroom
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'report-issue'): void
}>()

// Mini map refs
const miniMapContainer = ref<HTMLDivElement | null>(null)
let miniMap: any = null
let L: any = null

function openMaps() {
  if (!props.restroom.coordinates) return
  const { lat, lon } = props.restroom.coordinates
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`
  window.open(url, '_blank')
}

// Initialize mini map
async function initMiniMap() {
  if (!miniMapContainer.value || !props.restroom.coordinates) return
  
  try {
    L = await import('leaflet').then(m => m.default || m)
    await import('leaflet/dist/leaflet.css')
    
    miniMap = L.map(miniMapContainer.value, {
      center: [props.restroom.coordinates.lat, props.restroom.coordinates.lon],
      zoom: 15,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      attributionControl: false
    })
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(miniMap)
    
    // Add marker
    const markerColor = props.restroom.fees.isFree ? '#10b981' : '#f59e0b'
    const markerIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-10 h-10 rounded-full text-white shadow-lg" style="background-color: ${markerColor}">
        <span class="material-symbols-outlined text-[20px]">wc</span>
      </div>`,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    })
    
    L.marker([props.restroom.coordinates.lat, props.restroom.coordinates.lon], { icon: markerIcon })
      .addTo(miniMap)
    
  } catch (e) {
    console.error('Mini map init failed:', e)
  }
}

function destroyMiniMap() {
  if (miniMap) {
    miniMap.remove()
    miniMap = null
  }
}

// Watch for modal open/close
watch(() => props.show, async (newShow) => {
  if (newShow && props.restroom.coordinates) {
    await nextTick()
    setTimeout(initMiniMap, 100)
  } else {
    destroyMiniMap()
  }
})

onBeforeUnmount(() => {
  destroyMiniMap()
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

:deep(.custom-marker) {
  background: transparent;
  border: none;
}
</style>
