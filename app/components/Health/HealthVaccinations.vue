<template>
  <main class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-20">
    <section id="vaccinations">
      <div class="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <div
            class="flex items-center gap-2 text-text-sub-light dark:text-text-sub-dark mb-2 text-sm uppercase tracking-wider font-semibold">
            <span class="material-icons text-base">work_outline</span> Before You Go
          </div>
          <h2 class="text-3xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
            Vaccinations &amp; Meds
          </h2>
          <p class="text-text-sub-light dark:text-text-sub-dark max-w-2xl">
            Ensure you are up to date with routine vaccinations. While Sri Lanka is malaria-free, other precautions are
            advised.
          </p>
        </div>
        <button
          class="hidden md:flex items-center gap-2 text-sm font-medium text-text-sub-light hover:text-primary border border-border-light dark:border-border-dark px-4 py-2 rounded-lg bg-white dark:bg-surface-dark mt-4 md:mt-0">
          <span class="material-icons text-base">print</span> Print Checklist
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Vaccination Checklist -->
        <div
          class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 border border-border-light dark:border-border-dark shadow-sm">
          <div class="flex justify-between items-center mb-6 border-b border-border-light dark:border-border-dark pb-4">
            <h3 class="font-semibold text-lg flex items-center gap-2">
              <span class="material-icons text-primary">check_circle_outline</span> Vaccination Checklist
            </h3>
            <span class="text-xs font-mono text-text-sub-light">{{ checkedVaccinations }}/{{ vaccinations.length }}
              done</span>
          </div>
          <div class="space-y-4">
            <div v-for="(vaccination, index) in vaccinations" :key="index" class="flex gap-4 items-start group">
              <div @click="toggleVaccination(index)"
                class="mt-1 w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:border-primary transition"
                :class="{ 'bg-primary border-primary': vaccination.checked }">
                <span v-if="vaccination.checked" class="material-icons text-white text-sm">check</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-medium text-text-main-light dark:text-text-main-dark">{{ vaccination.name }}</h4>
                  <span v-if="vaccination.badge"
                    class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                    :class="vaccination.badgeClass">
                    {{ vaccination.badge }}
                  </span>
                </div>
                <p class="text-sm text-text-sub-light dark:text-text-sub-dark leading-relaxed">
                  {{ vaccination.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Packing Essentials -->
        <div
          class="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-6 border border-border-light dark:border-border-dark shadow-inner">
          <div class="flex justify-between items-center mb-6 border-b border-border-light dark:border-border-dark pb-4">
            <h3 class="font-semibold text-lg flex items-center gap-2">
              <span class="material-icons text-slate-500">backpack</span> Packing Essentials
            </h3>
            <span class="text-xs font-mono text-text-sub-light">{{ checkedEssentials }}/{{ essentials.length }}
              packed</span>
          </div>
          <div class="space-y-4">
            <div v-for="(essential, index) in essentials" :key="index" class="flex gap-4 items-start">
              <div @click="toggleEssential(index)"
                class="mt-1 w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark flex items-center justify-center cursor-pointer"
                :class="{ 'bg-primary border-primary': essential.checked }">
                <span v-if="essential.checked" class="material-icons text-white text-sm">check</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-medium text-text-main-light dark:text-text-main-dark">{{ essential.name }}</h4>
                  <span v-if="essential.badge" class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                    :class="essential.badgeClass">
                    {{ essential.badge }}
                  </span>
                </div>
                <p class="text-sm text-text-sub-light dark:text-text-sub-dark leading-relaxed">
                  {{ essential.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface ChecklistItem {
  name: string
  description: string
  badge?: string
  badgeClass?: string
  checked: boolean
}

const vaccinations = ref<ChecklistItem[]>([
  {
    name: 'Measles-Mumps-Rubella (MMR)',
    description: 'Ensure you are up to date with routine MMR vaccination.',
    checked: false
  },
  {
    name: 'Hepatitis A',
    description: 'Recommended due to potential food and water contamination.',
    badge: 'Recommended',
    badgeClass: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
    checked: false
  },
  {
    name: 'Yellow Fever',
    description: 'Required only if arriving from countries with yellow fever risk.',
    badge: 'Required',
    badgeClass: 'bg-secondary/10 text-secondary border border-secondary/20',
    checked: false
  },
  {
    name: 'Typhoid',
    description: 'Especially recommended if visiting smaller cities or rural areas.',
    badge: 'Recommended',
    badgeClass: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
    checked: false
  }
])

const essentials = ref<ChecklistItem[]>([
  {
    name: 'Prescription Meds',
    description: 'Bring enough for your entire trip in original bottles.',
    badge: 'Critical',
    badgeClass: 'bg-secondary/10 text-secondary border border-secondary/20',
    checked: false
  },
  {
    name: 'Insect Repellent',
    description: 'DEET or Picaridin-based spray is crucial for dengue prevention.',
    badge: 'Critical',
    badgeClass: 'bg-secondary/10 text-secondary border border-secondary/20',
    checked: false
  },
  {
    name: 'Sunscreen SPF 50+',
    description: 'Tropical sun is intense—reapply regularly.',
    checked: false
  },
  {
    name: 'Antihistamines',
    description: 'For mild allergic reactions to insect bites or food.',
    checked: false
  }
])

const checkedVaccinations = computed(() =>
  vaccinations.value.filter(v => v.checked).length
)

const checkedEssentials = computed(() =>
  essentials.value.filter(e => e.checked).length
)

const toggleVaccination = (index: number) => {
  const item = vaccinations.value[index]
  if (item) {
    item.checked = !item.checked
  }
}

const toggleEssential = (index: number) => {
  const item = essentials.value[index]
  if (item) {
    item.checked = !item.checked
  }
}
</script>
