<template>
  <section class="scroll-mt-24 container mx-auto px-6 py-12" id="medical">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
        Medical Directory
      </h2>
      <p class="text-text-sub-light dark:text-text-sub-dark">
        Find hospitals, clinics, and emergency services across Sri Lanka.
      </p>
    </div>

    <!-- Emergency Banner -->
    <div
      class="bg-secondary text-white rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-8 shadow-md">
      <div class="flex items-center gap-4">
        <div class="bg-white/20 p-2 rounded-lg">
          <span class="material-icons text-2xl">local_hospital</span>
        </div>
        <div>
          <h3 class="font-bold text-lg">Medical Emergency?</h3>
          <p class="text-white/80 text-sm">Suwa Seriya Ambulance Service</p>
        </div>
      </div>
      <div class="flex gap-4">
        <button
          class="bg-white text-secondary px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-100 transition shadow-sm">
          <span class="material-icons">call</span> Call 1990
        </button>
        <button
          class="bg-secondary border border-white/30 px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-white/10 transition">
          Alt: 011-2691111
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <!-- Left Sidebar - Search & Filters -->
      <div class="lg:col-span-2 space-y-4">
        <div class="relative">
          <span class="absolute left-3 top-3 text-text-sub-light material-icons">search</span>
          <input v-model="searchQuery"
            class="w-full pl-10 pr-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm"
            placeholder="Search hospitals, cities..." type="text" />
        </div>

        <div class="flex gap-2 mb-4">
          <select v-model="selectedCity"
            class="flex-1 p-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm text-text-sub-light">
            <option value="">All Cities</option>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
          </select>
          <select v-model="selectedType"
            class="flex-1 p-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm text-text-sub-light">
            <option value="">All Types</option>
            <option value="Private">Private Hospital</option>
            <option value="Public">Public Hospital</option>
          </select>
        </div>

        <!-- Hospital Cards -->
        <div v-for="(hospital, index) in filteredHospitals" :key="index"
          class="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:border-primary transition group cursor-pointer">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h4 class="font-bold text-text-main-light dark:text-text-main-dark group-hover:text-primary transition">
                {{ hospital.name }}
              </h4>
              <p class="text-xs text-text-sub-light flex items-center gap-1 mt-1">
                <span class="material-icons text-xs">location_on</span> {{ hospital.location }}
              </p>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded uppercase" :class="hospital.typeClass">
              {{ hospital.type }}
            </span>
          </div>
          <div class="flex gap-2 mt-3">
            <span v-for="(feature, fIndex) in hospital.features" :key="fIndex"
              class="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-text-sub-light">
              {{ feature }}
            </span>
          </div>
          <div class="mt-3 pt-3 border-t border-border-light dark:border-border-dark flex justify-between items-center">
            <button class="text-xs font-medium text-text-sub-light flex items-center gap-1 hover:text-primary">
              <span class="material-icons text-sm">directions</span> Directions
            </button>
            <button
              class="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 p-1.5 rounded-full text-text-sub-light">
              <span class="material-icons text-sm">call</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Side - Map -->
      <div
        class="lg:col-span-3 relative h-96 lg:h-auto rounded-2xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm bg-slate-200 dark:bg-slate-800">
        <img alt="Map of Colombo Hospitals"
          class="w-full h-full object-cover opacity-80 dark:opacity-60 grayscale-[20%]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEhKHXzH6KEngfb05jWlGIm-mTjvhYaFdcgk5pxT_NHgTu_DqU0REldAwzl3SyUEwIgRkqJdrYBhEYpvCE0y_rvSwYF_elLIzdYkpEUf5mu_TLFh9A-MloABbwMQFQehAoN8KwuEaFsCv4KdmLODTblMCgsGcTqkWmbCTMP2qjLSeLJJjfkoekb1g3_4T0HtqFHZnbXfFqNyNlrHV5LoaAGu9lWW4RBZI1mxosE8UILgxsHDfj6ntIFf1JHgCc7Q89DlyjnNSK75I" />
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div class="relative group">
            <div class="bg-primary text-white p-2 rounded-lg shadow-lg flex items-center gap-2 cursor-pointer">
              <span class="material-icons text-sm">local_hospital</span>
              <span class="text-xs font-bold">Asiri Central</span>
            </div>
            <div
              class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-primary">
            </div>
          </div>
        </div>
        <div class="absolute bottom-4 right-4 flex flex-col gap-2">
          <button class="bg-white dark:bg-surface-dark p-2 rounded shadow text-text-sub-light hover:text-primary">
            <span class="material-icons">my_location</span>
          </button>
          <button class="bg-white dark:bg-surface-dark p-2 rounded shadow text-text-sub-light hover:text-primary">
            <span class="material-icons">add</span>
          </button>
          <button class="bg-white dark:bg-surface-dark p-2 rounded shadow text-text-sub-light hover:text-primary">
            <span class="material-icons">remove</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Hospital {
  name: string
  location: string
  type: string
  typeClass: string
  features: string[]
}

const searchQuery = ref('')
const selectedCity = ref('')
const selectedType = ref('')

const hospitals = ref<Hospital[]>([
  {
    name: 'Lanka Hospitals',
    location: 'Colombo 05',
    type: 'Private',
    typeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    features: ['24/7 ER', 'English Spoken']
  },
  {
    name: 'Asiri Central Hospital',
    location: 'Colombo 10',
    type: 'Private',
    typeClass: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    features: ['24/7 ER', 'Cardiac Care']
  }
])

const filteredHospitals = computed(() => {
  return hospitals.value.filter(hospital => {
    const matchesSearch = searchQuery.value === '' ||
      hospital.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCity = selectedCity.value === '' ||
      hospital.location.includes(selectedCity.value)

    const matchesType = selectedType.value === '' ||
      hospital.type === selectedType.value

    return matchesSearch && matchesCity && matchesType
  })
})
</script>
