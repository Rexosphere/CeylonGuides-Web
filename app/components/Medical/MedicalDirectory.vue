<template>
  <section class="space-y-4">
    <!-- Emergency Banner -->
    <div v-if="primaryEmergency" class="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl p-4 shadow-lg">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-white/20 rounded-full">
            <span class="material-symbols-outlined text-2xl" aria-hidden="true">emergency</span>
          </div>
          <div>
            <h3 class="font-bold text-lg">Medical Emergency?</h3>
            <p class="text-white/80 text-sm">{{ primaryEmergency.name }}</p>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-2">
          <a 
            :href="`tel:${primaryEmergency.phone}`"
            class="flex items-center justify-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
            :aria-label="`Call emergency number ${primaryEmergency.phone}`"
          >
            <span class="material-symbols-outlined" aria-hidden="true">call</span>
            Call {{ primaryEmergency.phone }}
          </a>
          <a 
            v-if="alternativeEmergency"
            :href="`tel:${alternativeEmergency.phone}`"
            class="flex items-center justify-center gap-2 bg-white/20 text-white font-medium px-4 py-3 rounded-lg hover:bg-white/30 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
            :aria-label="`Call alternative emergency number ${alternativeEmergency.phone}`"
          >
            <span class="material-symbols-outlined text-sm" aria-hidden="true">call</span>
            Alt: {{ alternativeEmergency.phone }}
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile: Collapsible Map Panel -->
    <div class="lg:hidden">
      <button
        @click="mobileMapExpanded = !mobileMapExpanded"
        class="w-full flex items-center justify-between p-3 bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28]"
      >
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary" aria-hidden="true">map</span>
          <span class="font-medium text-neutral-700 dark:text-neutral-300">
            {{ mobileMapExpanded ? 'Hide Map' : 'Show Map' }}
          </span>
        </div>
        <span class="material-symbols-outlined text-neutral-400 transition-transform" :class="{ 'rotate-180': mobileMapExpanded }">
          expand_more
        </span>
      </button>
      <Transition name="slide">
        <div v-if="mobileMapExpanded" class="mt-2 rounded-xl overflow-hidden border border-neutral-100 dark:border-[#3a2d28] h-[300px]">
          <ClientOnly>
            <MedicalDirectoryMap
              ref="mobileMapRef"
              :hospitals="filteredHospitals"
              :selected-hospital-id="selectedHospital?.id"
              @select-hospital="handleMapHospitalSelect"
              @user-location="handleUserLocation"
              @location-status="handleLocationStatus"
            />
          </ClientOnly>
        </div>
      </Transition>
    </div>

    <!-- Info Chips -->
    <div class="flex flex-wrap gap-2">
      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-full text-xs font-medium">
        <span class="w-2 h-2 bg-purple-500 rounded-full" aria-hidden="true"></span>
        Private hospitals: English-friendly
      </div>
      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
        <span class="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true"></span>
        Public hospitals: May have wait times
      </div>
    </div>

    <!-- Filters (compact) -->
    <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] p-3">
      <div class="flex flex-col lg:flex-row gap-3">
        <!-- Search Input -->
        <div class="flex-1 relative">
          <span class="material-symbols-outlined absolute left-3 top-2 text-neutral-400 text-xl" aria-hidden="true">search</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search hospitals, cities, specialties..."
            class="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-[#1a120e] border border-neutral-200 dark:border-[#3a2d28] rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            aria-label="Search hospitals"
          />
        </div>

        <!-- City Filter -->
        <div class="w-full lg:w-40">
          <select
            v-model="selectedCity"
            class="w-full px-3 py-2 bg-neutral-50 dark:bg-[#1a120e] border border-neutral-200 dark:border-[#3a2d28] rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer"
            aria-label="Filter by city"
          >
            <option value="">All Cities</option>
            <option v-for="city in availableCities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>

        <!-- Type Toggle -->
        <div class="flex bg-neutral-100 dark:bg-[#1a120e] rounded-lg p-0.5">
          <button
            v-for="typeOption in typeOptions"
            :key="typeOption"
            @click="selectedType = typeOption"
            class="px-3 py-1.5 rounded-md text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            :class="selectedType === typeOption 
              ? 'bg-white dark:bg-[#3a2d28] text-primary shadow-sm' 
              : 'text-neutral-500 hover:text-neutral-700'"
          >
            {{ typeOption === 'all' ? 'All' : typeOption.charAt(0).toUpperCase() + typeOption.slice(1) }}
          </button>
        </div>
      </div>

      <!-- Quick Filters -->
      <div class="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-neutral-100 dark:border-[#3a2d28]">
        <label class="flex items-center gap-1.5 cursor-pointer text-xs">
          <input
            v-model="showInternationalOnly"
            type="checkbox"
            class="w-3.5 h-3.5 text-primary bg-neutral-100 border-neutral-300 rounded focus:ring-primary"
          />
          <span class="text-neutral-600 dark:text-neutral-400">Intl. Patients</span>
        </label>

        <label class="flex items-center gap-1.5 cursor-pointer text-xs">
          <input
            v-model="show24HourOnly"
            type="checkbox"
            class="w-3.5 h-3.5 text-primary bg-neutral-100 border-neutral-300 rounded focus:ring-primary"
          />
          <span class="text-neutral-600 dark:text-neutral-400">24/7</span>
        </label>

        <button
          v-if="userLocation"
          @click="sortByNearest = !sortByNearest"
          class="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors"
          :class="sortByNearest 
            ? 'bg-primary text-white' 
            : 'bg-neutral-100 dark:bg-[#3a2d28] text-neutral-600 dark:text-neutral-400 hover:bg-primary/10'"
        >
          <span class="material-symbols-outlined text-xs" aria-hidden="true">near_me</span>
          Nearest
        </button>

        <span class="text-[10px] text-neutral-400 ml-auto">
          {{ filteredHospitals.length }}/{{ hospitals.length }}
        </span>
      </div>
    </div>

    <!-- Two Column Layout: List (scrollable) + Map (sticky) -->
    <div class="flex flex-col lg:flex-row gap-4">
      
      <!-- Hospital List (scrollable) -->
      <div class="w-full lg:w-1/2 xl:w-2/5 space-y-3 lg:max-h-[600px] lg:overflow-y-auto custom-scrollbar lg:pr-2">
        <div
          v-for="hospital in filteredHospitals"
          :key="hospital.id"
          @click="selectHospital(hospital)"
          class="bg-white dark:bg-[#2a1d18] rounded-lg border border-neutral-100 dark:border-[#3a2d28] p-3 cursor-pointer transition-all hover:shadow-md"
          :class="{ 'ring-2 ring-primary border-primary': selectedHospital?.id === hospital.id }"
          :id="`hospital-${hospital.id}`"
        >
          <!-- Header (compact) -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-bold text-sm text-neutral-dark dark:text-white leading-tight">{{ hospital.name }}</h4>
                <span 
                  class="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                  :class="hospital.type === 'private' 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'"
                >
                  {{ hospital.type === 'private' ? 'Private' : 'Public' }}
                </span>
              </div>
              <p class="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
                <span class="material-symbols-outlined text-[10px]" aria-hidden="true">location_on</span>
                {{ hospital.city }}
                <span v-if="hospital.distance" class="text-primary font-medium">• {{ hospital.distance.toFixed(1) }}km</span>
              </p>
            </div>
            <a
              v-if="hospital.phone"
              :href="`tel:${hospital.phone}`"
              @click.stop
              class="flex-shrink-0 p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              :aria-label="`Call ${hospital.name}`"
              :title="`Call ${hospital.phone}`"
            >
              <span class="material-symbols-outlined text-lg" aria-hidden="true">call</span>
            </a>
          </div>

          <!-- Tags (compact) -->
          <div class="flex flex-wrap gap-1 mt-2">
            <span v-if="hospital.is24_7" class="tag tag-green">24/7</span>
            <span v-if="hospital.hasInternationalPatientServices" class="tag tag-blue">Intl.</span>
            <span v-for="specialty in hospital.specialties.slice(0, 1)" :key="specialty" class="tag tag-neutral">
              {{ specialty }}
            </span>
          </div>

          <!-- Action Buttons (compact) -->
          <div class="flex gap-2 mt-2 pt-2 border-t border-neutral-100 dark:border-[#3a2d28]">
            <a
              :href="getGoogleMapsUrl(hospital)"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
              class="flex-1 flex items-center justify-center gap-1 text-[11px] bg-neutral-100 dark:bg-[#3a2d28] text-neutral-600 dark:text-neutral-400 px-2 py-1.5 rounded-md hover:bg-primary hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              :aria-label="`Get directions to ${hospital.name}`"
            >
              <span class="material-symbols-outlined text-xs" aria-hidden="true">directions</span>
              Directions
            </a>
            <button
              @click.stop="selectHospital(hospital)"
              class="flex-1 flex items-center justify-center gap-1 text-[11px] bg-primary/10 text-primary px-2 py-1.5 rounded-md hover:bg-primary hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary lg:hidden"
              :aria-label="`View ${hospital.name} on map`"
            >
              <span class="material-symbols-outlined text-xs" aria-hidden="true">map</span>
              Map
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredHospitals.length === 0" class="text-center py-8">
          <span class="material-symbols-outlined text-4xl text-neutral-300 mb-2" aria-hidden="true">search_off</span>
          <p class="text-neutral-500 text-sm">No hospitals match your filters</p>
          <button @click="clearFilters" class="mt-2 text-primary text-xs hover:underline">
            Clear all filters
          </button>
        </div>
      </div>

      <!-- Map (sticky, desktop only) -->
      <div class="hidden lg:block lg:w-1/2 xl:w-3/5">
        <div class="sticky top-4 bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] overflow-hidden h-[600px]">
          <div class="p-2 border-b border-neutral-100 dark:border-[#3a2d28] flex items-center justify-between bg-neutral-50 dark:bg-[#1a120e]">
            <h3 class="font-bold text-xs text-neutral-dark dark:text-white flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-base" aria-hidden="true">map</span>
              Hospital Locations
            </h3>
            <span v-if="selectedHospital" class="text-[10px] text-primary font-medium truncate max-w-[180px]">
              {{ selectedHospital.name }}
            </span>
          </div>
          <div class="h-[calc(100%-36px)]">
            <ClientOnly>
              <MedicalDirectoryMap
                ref="mapRef"
                :hospitals="filteredHospitals"
                :selected-hospital-id="selectedHospital?.id"
                @select-hospital="handleMapHospitalSelect"
                @user-location="handleUserLocation"
                @location-status="handleLocationStatus"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  hospitals, 
  emergencyServices,
  getPrimaryEmergencyServices
} from '~/data/medicalDirectoryData'
import type { Hospital } from '~/types/medical'
import MedicalDirectoryMap from './MedicalDirectoryMap.vue'

// Refs
const mapRef = ref<InstanceType<typeof MedicalDirectoryMap> | null>(null)
const mobileMapRef = ref<InstanceType<typeof MedicalDirectoryMap> | null>(null)

// State
const searchQuery = ref('')
const selectedCity = ref('')
const selectedType = ref<'all' | 'private' | 'public'>('all')
const showInternationalOnly = ref(false)
const show24HourOnly = ref(false)
const sortByNearest = ref(false)
const selectedHospital = ref<Hospital | null>(null)
const expandedAddresses = ref(new Set<string>())
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const locationStatus = ref<'idle' | 'loading' | 'granted' | 'denied'>('idle')
const mobileMapExpanded = ref(false)

// Emergency services
const primaryEmergency = computed(() => getPrimaryEmergencyServices()[0])
const alternativeEmergency = computed(() => emergencyServices.find(s => !s.isPrimary))

// Type options
const typeOptions: ('all' | 'private' | 'public')[] = ['all', 'private', 'public']

// Available cities from data
const availableCities = computed(() => {
  const cities = [...new Set(hospitals.map(h => h.city))]
  return cities.sort()
})

// Haversine distance calculation
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Add distance to hospitals
const hospitalsWithDistance = computed(() => {
  if (!userLocation.value) return hospitals.map(h => ({ ...h, distance: undefined }))
  
  return hospitals.map(h => {
    if (!h.lat || !h.lng) return { ...h, distance: undefined }
    const distance = calculateDistance(
      userLocation.value!.lat,
      userLocation.value!.lng,
      h.lat,
      h.lng
    )
    return { ...h, distance }
  })
})

// Filtered hospitals
const filteredHospitals = computed(() => {
  let result = hospitalsWithDistance.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(h => 
      h.name.toLowerCase().includes(query) ||
      h.city.toLowerCase().includes(query) ||
      h.specialties.some(s => s.toLowerCase().includes(query))
    )
  }

  // City filter
  if (selectedCity.value) {
    result = result.filter(h => h.city === selectedCity.value)
  }

  // Type filter
  if (selectedType.value !== 'all') {
    result = result.filter(h => h.type === selectedType.value)
  }

  // International patient services filter
  if (showInternationalOnly.value) {
    result = result.filter(h => h.hasInternationalPatientServices)
  }

  // 24/7 filter
  if (show24HourOnly.value) {
    result = result.filter(h => h.is24_7)
  }

  // Sort by nearest
  if (sortByNearest.value && userLocation.value) {
    result = [...result].sort((a, b) => {
      if (!a.distance) return 1
      if (!b.distance) return -1
      return a.distance - b.distance
    })
  }

  return result
})

// Clear filters
function clearFilters() {
  searchQuery.value = ''
  selectedCity.value = ''
  selectedType.value = 'all'
  showInternationalOnly.value = false
  show24HourOnly.value = false
  sortByNearest.value = false
}

// Select hospital
function selectHospital(hospital: Hospital) {
  selectedHospital.value = hospital
  
  // Expand mobile map if on mobile
  if (window.innerWidth < 1024) {
    mobileMapExpanded.value = true
  }
  
  // Focus on map
  mapRef.value?.focusOnHospital(hospital.id)
  mobileMapRef.value?.focusOnHospital(hospital.id)
}

// Handle map hospital select
function handleMapHospitalSelect(hospitalId: string) {
  const hospital = hospitals.find(h => h.id === hospitalId)
  if (hospital) {
    selectedHospital.value = hospital
    // Scroll to card
    const card = document.getElementById(`hospital-${hospitalId}`)
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

// Handle user location
function handleUserLocation(location: { lat: number; lng: number } | null) {
  userLocation.value = location
}

// Handle location status
function handleLocationStatus(status: 'idle' | 'loading' | 'granted' | 'denied') {
  locationStatus.value = status
}

// Get Google Maps URL
function getGoogleMapsUrl(hospital: Hospital): string {
  if (hospital.lat && hospital.lng) {
    return `https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lng}`
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ', ' + hospital.city + ', Sri Lanka')}`
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.tag {
  @apply text-[10px] px-1.5 py-0.5 rounded-full font-medium flex items-center gap-0.5;
}

.tag-green {
  @apply bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400;
}

.tag-blue {
  @apply bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400;
}

.tag-neutral {
  @apply bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>
