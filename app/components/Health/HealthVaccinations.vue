<template>
  <section class="w-full max-w-[1000px] px-6 py-16 md:py-24 scroll-mt-24" id="vaccinations">
    <!-- Header -->
    <div class="flex flex-wrap md:flex-nowrap justify-between items-end gap-4 mb-10">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
          <span class="material-symbols-outlined text-lg">medical_services</span>
          <span>Before You Go</span>
        </div>
        <h2 class="text-[#181311] dark:text-white text-3xl md:text-4xl font-bold leading-tight">Vaccinations & Meds</h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
          Ensure you are up to date with routine vaccinations. While Sri Lanka is malaria-free, other precautions are advised.
        </p>
      </div>
      <div class="flex gap-2">
        <button
          @click="printChecklist"
          class="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-[#3a2d28] text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-[#4a3d38] transition-colors text-sm font-medium"
        >
          <span class="material-symbols-outlined text-sm">print</span>
          Print Checklist
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Vaccinations Checklist Card -->
      <div class="bg-white dark:bg-[#2a1d18] rounded-2xl p-8 shadow-sm border border-[#f0ebe9] dark:border-gray-800">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold flex items-center gap-3 dark:text-gray-100">
            <span class="material-symbols-outlined text-green-500">check_circle</span>
            Vaccination Checklist
          </h3>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ checkedVaccinesCount }}/{{ vaccinesList.length }} done
          </span>
        </div>
        
        <!-- Progress bar -->
        <div class="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
          <div 
            class="h-full bg-green-500 rounded-full transition-all duration-300"
            :style="{ width: `${(checkedVaccinesCount / vaccinesList.length) * 100}%` }"
          ></div>
        </div>
        
        <div class="space-y-3">
          <div 
            v-for="vaccine in vaccinesList" 
            :key="vaccine.id"
            class="p-3 rounded-lg border transition-all"
            :class="vaccineCheckState[vaccine.id] 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
              : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700'"
          >
            <label class="flex gap-x-3 items-start cursor-pointer">
              <input
                v-model="vaccineCheckState[vaccine.id]"
                class="mt-1 h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-green-500 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                type="checkbox"
                @change="saveChecklistState"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-base font-semibold text-gray-900 dark:text-gray-200" :class="{ 'line-through opacity-60': vaccineCheckState[vaccine.id] }">
                    {{ vaccine.name }}
                  </p>
                  <span 
                    v-if="vaccine.isRequired" 
                    class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-medium"
                  >
                    REQUIRED
                  </span>
                  <span 
                    v-else-if="vaccine.category === 'travel-specific'" 
                    class="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    Recommended
                  </span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ vaccine.description }}</p>
                <p v-if="vaccine.specialNotes" class="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">info</span>
                  {{ vaccine.specialNotes }}
                </p>
              </div>
            </label>
          </div>
        </div>

        <div class="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex gap-3 items-start">
          <span class="material-symbols-outlined text-amber-500">schedule</span>
          <p class="text-sm text-amber-700 dark:text-amber-400">
            Schedule your travel clinic visit <strong>4-6 weeks</strong> before departure.
          </p>
        </div>
      </div>
      
      <!-- Packing Essentials Card -->
      <div class="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/10">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-gray-100">
            <span class="material-symbols-outlined text-primary">medication</span>
            Packing Essentials
          </h3>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ checkedPackingCount }}/{{ packingList.length }} packed
          </span>
        </div>

        <!-- Progress bar -->
        <div class="w-full h-2 bg-white/50 dark:bg-gray-800 rounded-full mb-6 overflow-hidden">
          <div 
            class="h-full bg-primary rounded-full transition-all duration-300"
            :style="{ width: `${(checkedPackingCount / packingList.length) * 100}%` }"
          ></div>
        </div>
        
        <div class="space-y-3">
          <div 
            v-for="item in packingList" 
            :key="item.id"
            class="p-3 rounded-lg border transition-all"
            :class="[
              packingCheckState[item.id] 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                : item.isCritical 
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
                  : 'bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-700'
            ]"
          >
            <label class="flex gap-x-3 items-start cursor-pointer">
              <input
                v-model="packingCheckState[item.id]"
                class="mt-1 h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                type="checkbox"
                @change="saveChecklistState"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-base font-semibold text-gray-900 dark:text-gray-200" :class="{ 'line-through opacity-60': packingCheckState[item.id] }">
                    {{ item.name }}
                  </span>
                  <span 
                    v-if="item.isCritical && !packingCheckState[item.id]" 
                    class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-bold animate-pulse"
                  >
                    CRITICAL
                  </span>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</span>
              </div>
            </label>
          </div>
        </div>

        <div class="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg flex gap-3 items-start shadow-sm">
          <span class="material-symbols-outlined text-orange-400">warning</span>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Keep medications in <strong>original packaging</strong> with prescriptions for customs.
          </p>
        </div>
      </div>
    </div>

    <!-- Print Layout (hidden) -->
    <div id="print-checklist" class="hidden print:block">
      <h1 class="text-2xl font-bold mb-4">🏝️ Sri Lanka Travel Health Checklist</h1>
      <p class="text-sm text-gray-600 mb-6">Generated from CeylonGuide • {{ new Date().toLocaleDateString() }}</p>
      
      <h2 class="text-lg font-bold mt-6 mb-3">✅ Vaccinations</h2>
      <ul class="space-y-2">
        <li v-for="v in vaccinesList" :key="v.id" class="flex items-center gap-2 text-sm">
          <input type="checkbox" :checked="vaccineCheckState[v.id]" disabled class="h-4 w-4" />
          <span :class="{ 'line-through': vaccineCheckState[v.id] }">{{ v.name }}</span>
          <span v-if="v.isRequired" class="text-xs text-red-600">(Required)</span>
        </li>
      </ul>

      <h2 class="text-lg font-bold mt-6 mb-3">💊 Packing Essentials</h2>
      <ul class="space-y-2">
        <li v-for="p in packingList" :key="p.id" class="flex items-center gap-2 text-sm">
          <input type="checkbox" :checked="packingCheckState[p.id]" disabled class="h-4 w-4" />
          <span :class="{ 'line-through': packingCheckState[p.id] }">{{ p.name }}</span>
          <span v-if="p.isCritical" class="text-xs text-red-600">(Critical)</span>
        </li>
      </ul>

      <p class="mt-8 text-xs text-gray-500">Remember to visit your travel clinic 4-6 weeks before departure!</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { vaccinations, packingEssentials } from '~/data/medicalDirectoryData'

const STORAGE_KEY = 'ceylonguide-health-checklist'

// Reactive state for checkboxes
const vaccineCheckState = ref<Record<string, boolean>>({})
const packingCheckState = ref<Record<string, boolean>>({})

// Initialize checkbox states
onMounted(() => {
  // Initialize all items as unchecked
  vaccinations.forEach(v => {
    vaccineCheckState.value[v.id] = false
  })
  packingEssentials.forEach(p => {
    packingCheckState.value[p.id] = false
  })

  // Load saved state from localStorage
  loadChecklistState()
})

// Data lists
const vaccinesList = computed(() => vaccinations)
const packingList = computed(() => packingEssentials)

// Counts
const checkedVaccinesCount = computed(() => 
  Object.values(vaccineCheckState.value).filter(Boolean).length
)
const checkedPackingCount = computed(() => 
  Object.values(packingCheckState.value).filter(Boolean).length
)

// Save to localStorage
function saveChecklistState() {
  const state = {
    vaccines: vaccineCheckState.value,
    packing: packingCheckState.value,
    lastUpdated: new Date().toISOString()
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Could not save checklist state:', e)
  }
}

// Load from localStorage
function loadChecklistState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const state = JSON.parse(saved)
      if (state.vaccines) {
        Object.assign(vaccineCheckState.value, state.vaccines)
      }
      if (state.packing) {
        Object.assign(packingCheckState.value, state.packing)
      }
    }
  } catch (e) {
    console.warn('Could not load checklist state:', e)
  }
}

// Print checklist
function printChecklist() {
  // Create a print-friendly version
  const printContent = document.getElementById('print-checklist')
  if (!printContent) return

  // Open print dialog
  const newWindow = window.open('', '_blank')
  if (!newWindow) return

  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Sri Lanka Travel Health Checklist</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { color: #ee5f2b; border-bottom: 2px solid #ee5f2b; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 24px; }
        ul { list-style: none; padding: 0; }
        li { padding: 8px 0; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 8px; }
        input[type="checkbox"] { width: 18px; height: 18px; }
        .critical { color: #dc2626; font-weight: bold; }
        .required { color: #dc2626; }
        .line-through { text-decoration: line-through; color: #888; }
        @media print { body { padding: 20px; } }
      </style>
    </head>
    <body>
      <h1>🏝️ Sri Lanka Travel Health Checklist</h1>
      <p style="color: #666; font-size: 14px;">Generated from CeylonGuide • ${new Date().toLocaleDateString()}</p>
      
      <h2>✅ Vaccinations</h2>
      <ul>
        ${vaccinations.map(v => `
          <li>
            <input type="checkbox" ${vaccineCheckState.value[v.id] ? 'checked' : ''} />
            <span class="${vaccineCheckState.value[v.id] ? 'line-through' : ''}">${v.name}</span>
            ${v.isRequired ? '<span class="required">(Required)</span>' : ''}
          </li>
        `).join('')}
      </ul>

      <h2>💊 Packing Essentials</h2>
      <ul>
        ${packingEssentials.map(p => `
          <li>
            <input type="checkbox" ${packingCheckState.value[p.id] ? 'checked' : ''} />
            <span class="${packingCheckState.value[p.id] ? 'line-through' : ''}">${p.name}</span>
            ${p.isCritical ? '<span class="critical">(Critical)</span>' : ''}
          </li>
        `).join('')}
      </ul>

      <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
        ⏰ Remember to visit your travel clinic 4-6 weeks before departure!
      </p>
    </body>
    </html>
  `)

  newWindow.document.close()
  newWindow.print()
}
</script>
