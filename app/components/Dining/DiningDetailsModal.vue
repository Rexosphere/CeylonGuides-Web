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
        <div class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900 shadow-2xl">
          <!-- Hero Image -->
          <div class="relative h-64 md:h-72 w-full">
            <div 
              class="absolute inset-0 bg-cover bg-center" 
              :style="`background-image: url('${restaurant.image}');`"
            ></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            
            <!-- Close Button -->
            <button 
              @click="$emit('close')"
              class="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
            
            <!-- Title Overlay -->
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <div class="flex items-center gap-2 mb-2">
                <span 
                  :class="[
                    'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold',
                    certificationBadgeClass
                  ]"
                >
                  <span class="material-symbols-outlined text-[14px]">verified</span>
                  {{ certificationLabel }}
                </span>
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{{ restaurant.name }}</h2>
              <p class="text-white/80 mt-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-[18px]">location_on</span>
                {{ restaurant.area || restaurant.city }}
              </p>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Hygiene Rating -->
            <div class="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-gray-800">
              <div class="flex items-center gap-1">
                <template v-for="i in restaurant.hygieneScore" :key="i">
                  <span class="material-symbols-outlined text-coral-orange text-[24px] fill-current">local_florist</span>
                </template>
                <template v-for="i in (5 - restaurant.hygieneScore)" :key="'empty-' + i">
                  <span class="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[24px]">local_florist</span>
                </template>
              </div>
              <div>
                <div class="font-bold text-slate-800 dark:text-white">{{ restaurant.hygieneScore }}/5 Hygiene Rating</div>
                <div class="text-sm text-slate-500">{{ certificationLabel }} Certification</div>
              </div>
            </div>

            <!-- Certification Explanation -->
            <div class="p-4 rounded-xl border-2" :class="certificationBorderClass">
              <div class="flex items-start gap-3">
                <div class="p-2 rounded-lg" :class="certificationIconBgClass">
                  <span class="material-symbols-outlined text-[24px]" :class="certificationIconClass">{{ certificationIcon }}</span>
                </div>
                <div>
                  <h3 class="font-bold text-slate-800 dark:text-white mb-1">{{ certificationLabel }} Certification</h3>
                  <p class="text-sm text-slate-600 dark:text-slate-400">{{ certificationExplanation }}</p>
                </div>
              </div>
            </div>
            
            <!-- Cuisine Type -->
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Cuisine Type</h3>
              <p class="text-lg font-medium text-slate-700 dark:text-slate-200">{{ restaurant.cuisineType }}</p>
            </div>
            
            <!-- Full Description -->
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">About</h3>
              <p class="text-slate-600 dark:text-slate-300 leading-relaxed">{{ restaurant.description }}</p>
            </div>
            
            <!-- Features -->
            <div v-if="restaurant.features.length > 0">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Features & Amenities</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="feature in restaurant.features" 
                  :key="feature"
                  class="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-gray-800 text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  <span class="material-symbols-outlined text-[16px] text-primary">{{ getFeatureIcon(feature) }}</span>
                  {{ getFeatureLabel(feature) }}
                </span>
              </div>
            </div>

            <!-- Mini Map Preview -->
            <div v-if="restaurant.coordinates">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Location</h3>
              <div class="h-48 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-gray-700">
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

            <!-- Source Links -->
            <div v-if="restaurant.sourceLinks.length > 0">
              <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Sources & References</h3>
              <div class="flex flex-wrap gap-2">
                <a 
                  v-for="(source, index) in restaurant.sourceLinks" 
                  :key="index"
                  :href="source.startsWith('http') ? source : '#'"
                  :target="source.startsWith('http') ? '_blank' : undefined"
                  class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span class="material-symbols-outlined text-[14px]">link</span>
                  {{ formatSourceLink(source) }}
                </a>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-gray-700">
              <button 
                @click="handleAddToTrip"
                class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-deep-teal text-white font-bold hover:bg-deep-teal/90 transition-colors"
              >
                <span class="material-symbols-outlined">add_location_alt</span>
                Add to Trip
              </button>
              <button 
                v-if="restaurant.coordinates"
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
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Restaurant, FeatureTag } from '~/data/dining'

const props = defineProps<{
  show: boolean
  restaurant: Restaurant
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add-to-trip', restaurant: Restaurant): void
}>()

// Mini map refs
const miniMapContainer = ref<HTMLDivElement | null>(null)
let miniMap: any = null
let L: any = null

const certificationLabel = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure': return 'Safe & Secure'
    case 'TouristFriendlyGradeA': return 'Grade A'
    case 'TouristFriendlyGradeB': return 'Grade B'
    default: return 'Certified'
  }
})

const certificationBadgeClass = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure':
      return 'bg-emerald-500 text-white'
    case 'TouristFriendlyGradeA':
      return 'bg-green-500 text-white'
    case 'TouristFriendlyGradeB':
      return 'bg-amber-500 text-white'
    default:
      return 'bg-slate-500 text-white'
  }
})

const certificationBorderClass = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure':
      return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20'
    case 'TouristFriendlyGradeA':
      return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
    case 'TouristFriendlyGradeB':
      return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20'
    default:
      return 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
  }
})

const certificationIconBgClass = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure': return 'bg-emerald-100 dark:bg-emerald-900/50'
    case 'TouristFriendlyGradeA': return 'bg-green-100 dark:bg-green-900/50'
    case 'TouristFriendlyGradeB': return 'bg-amber-100 dark:bg-amber-900/50'
    default: return 'bg-slate-100 dark:bg-slate-800'
  }
})

const certificationIconClass = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure': return 'text-emerald-600 dark:text-emerald-400'
    case 'TouristFriendlyGradeA': return 'text-green-600 dark:text-green-400'
    case 'TouristFriendlyGradeB': return 'text-amber-600 dark:text-amber-400'
    default: return 'text-slate-600 dark:text-slate-400'
  }
})

const certificationIcon = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure': return 'verified_user'
    case 'TouristFriendlyGradeA': return 'workspace_premium'
    case 'TouristFriendlyGradeB': return 'verified'
    default: return 'check_circle'
  }
})

const certificationExplanation = computed(() => {
  switch (props.restaurant.certificationType) {
    case 'SafeAndSecure':
      return 'This establishment has received the Sri Lanka Tourism\'s "Safe & Secure" certification, meeting the highest standards for hygiene, food safety, and COVID-19 protocols. Regular inspections ensure continued compliance.'
    case 'TouristFriendlyGradeA':
      return 'Grade A certification from the Tourist Friendly Dining (TFD) program indicates excellent hygiene standards, quality food preparation, and professional service standards verified by tourism authorities.'
    case 'TouristFriendlyGradeB':
      return 'Grade B certification from the Tourist Friendly Dining (TFD) program indicates good hygiene practices and acceptable food safety standards, with minor areas identified for improvement.'
    default:
      return 'This establishment has been reviewed for hygiene and safety standards.'
  }
})

function getFeatureIcon(feature: FeatureTag): string {
  const iconMap: Record<FeatureTag, string> = {
    vegetarian: 'spa',
    vegan: 'eco',
    halal: 'restaurant_menu',
    gluten_free: 'nutrition',
    outdoor: 'deck',
    wifi: 'wifi',
    family_friendly: 'family_restroom',
    premium: 'diamond',
    seafood: 'set_meal',
    bar: 'local_bar',
    budget_friendly: 'savings',
    scenic_view: 'landscape',
    credit_cards: 'credit_card',
    air_conditioned: 'ac_unit',
    pork_free: 'do_not_disturb_on'
  }
  return iconMap[feature] || 'check_circle'
}

function getFeatureLabel(feature: FeatureTag): string {
  const labelMap: Record<FeatureTag, string> = {
    vegetarian: 'Vegetarian',
    vegan: 'Vegan',
    halal: 'Halal',
    gluten_free: 'Gluten-Free',
    outdoor: 'Outdoor Seating',
    wifi: 'Wi-Fi',
    family_friendly: 'Family Friendly',
    premium: 'Premium',
    seafood: 'Seafood',
    bar: 'Bar',
    budget_friendly: 'Budget Friendly',
    scenic_view: 'Scenic View',
    credit_cards: 'Credit Cards',
    air_conditioned: 'Air Conditioned',
    pork_free: 'Pork-Free'
  }
  return labelMap[feature] || feature
}

function formatSourceLink(source: string): string {
  try {
    const url = new URL(source)
    return url.hostname.replace('www.', '')
  } catch {
    return source.length > 30 ? source.substring(0, 30) + '...' : source
  }
}

function openMaps() {
  if (!props.restaurant.coordinates) return
  const { lat, lon } = props.restaurant.coordinates
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`
  window.open(url, '_blank')
}

function handleAddToTrip() {
  emit('add-to-trip', props.restaurant)
}

// Initialize mini map
async function initMiniMap() {
  if (!miniMapContainer.value || !props.restaurant.coordinates) return
  
  try {
    L = await import('leaflet').then(m => m.default || m)
    await import('leaflet/dist/leaflet.css')
    
    miniMap = L.map(miniMapContainer.value, {
      center: [props.restaurant.coordinates.lat, props.restaurant.coordinates.lon],
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
    const markerIcon = L.divIcon({
      html: `<div class="flex items-center justify-center w-10 h-10 rounded-full bg-deep-teal text-white shadow-lg">
        <span class="material-symbols-outlined text-[20px]">restaurant</span>
      </div>`,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    })
    
    L.marker([props.restaurant.coordinates.lat, props.restaurant.coordinates.lon], { icon: markerIcon })
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

// Watch for modal open/close to init/destroy map
watch(() => props.show, async (newShow) => {
  if (newShow && props.restaurant.coordinates) {
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

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(20px);
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

:deep(.custom-marker) {
  background: transparent;
  border: none;
}
</style>
