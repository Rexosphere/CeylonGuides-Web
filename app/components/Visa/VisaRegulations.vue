<template>
  <section>
    <div class="flex items-center space-x-3 mb-8">
      <div class="w-1 h-8 bg-primary rounded-full"></div>
      <h2 class="text-2xl font-bold text-deep-charcoal dark:text-white">Regulations &amp; Procedures</h2>
    </div>

    <div class="space-y-4">
      <!-- Entry Requirements -->
      <div
        class="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-stone-neutral dark:border-gray-700 overflow-hidden">
        <button class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
          @click="toggleSection('entry')">
          <div class="flex items-center">
            <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400 mr-4">
              <span class="material-symbols-outlined">login</span>
            </div>
            <span class="font-bold text-deep-charcoal dark:text-white">Entry Requirements</span>
          </div>
          <span class="material-symbols-outlined text-slate-400" :class="{ 'rotate-180': openSection === 'entry' }">
            expand_more
          </span>
        </button>
        <div v-if="openSection === 'entry'" class="px-6 pb-6 pt-2">
          <ul v-if="requirements && requirements.length > 0" class="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2">
            <li v-for="(req, index) in requirements" :key="index">{{ req }}</li>
          </ul>
          <p v-else class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            All visitors must have a valid passport with at least 6 months validity from the date of arrival.
          </p>
        </div>
      </div>

      <!-- Online ETA Process -->
      <div
        class="bg-white dark:bg-surface-dark rounded-xl shadow-soft border border-stone-neutral dark:border-gray-700 overflow-hidden">
        <button
          class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none bg-slate-50/50 dark:bg-slate-800/50"
          @click="toggleSection('online')">
          <div class="flex items-center">
            <div
              class="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-primary mr-4 border border-slate-100 dark:border-slate-600">
              <span class="material-symbols-outlined">laptop_mac</span>
            </div>
            <span class="font-bold text-deep-charcoal dark:text-white">Online ETA Process (Recommended)</span>
          </div>
          <span class="material-symbols-outlined text-slate-400" :class="{ 'rotate-180': openSection === 'online' }">
            expand_more
          </span>
        </button>
        <div v-if="openSection === 'online'" class="px-6 pb-6 pt-2">
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            We strongly advise applying online before travel to avoid queues.
          </p>
          <ol class="list-decimal list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2 ml-2 mb-4">
            <li>Visit the official eta.gov.lk portal.</li>
            <li>Fill out the application and pay via Credit/Debit card.</li>
            <li>Receive approval email within 24-48 hours.</li>
          </ol>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-800">
            Fastest &amp; Cheapest Option
          </span>
        </div>
      </div>

      <!-- On-Arrival ETA -->
      <div
        class="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-stone-neutral dark:border-gray-700 overflow-hidden">
        <button class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
          @click="toggleSection('arrival')">
          <div class="flex items-center">
            <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400 mr-4">
              <span class="material-symbols-outlined">flight_land</span>
            </div>
            <span class="font-bold text-deep-charcoal dark:text-white">On-Arrival ETA</span>
          </div>
          <span class="material-symbols-outlined text-slate-400" :class="{ 'rotate-180': openSection === 'arrival' }">
            expand_more
          </span>
        </button>
        <div v-if="openSection === 'arrival'" class="px-6 pb-6 pt-2">
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Available at Colombo (CMB) and Mattala (HRI) airports. Processing may take longer and fees may be higher.
          </p>
        </div>
      </div>

      <!-- Customs & Restricted Items -->
      <div
        class="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-stone-neutral dark:border-gray-700 overflow-hidden">
        <button class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
          @click="toggleSection('customs')">
          <div class="flex items-center">
            <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400 mr-4">
              <span class="material-symbols-outlined">local_police</span>
            </div>
            <span class="font-bold text-deep-charcoal dark:text-white">Customs &amp; Restricted Items</span>
          </div>
          <span class="material-symbols-outlined text-slate-400" :class="{ 'rotate-180': openSection === 'customs' }">
            expand_more
          </span>
        </button>
        <div v-if="openSection === 'customs'" class="px-6 pb-6 pt-2">
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            {{ notes || 'Declare all items of value. Prohibited items include narcotics, firearms, and certain cultural artifacts.' }}
          </p>
        </div>
      </div>

      <!-- Health Declaration -->
      <div
        class="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-stone-neutral dark:border-gray-700 overflow-hidden">
        <button class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
          @click="toggleSection('health')">
          <div class="flex items-center">
            <div class="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400 mr-4">
              <span class="material-symbols-outlined">health_and_safety</span>
            </div>
            <span class="font-bold text-deep-charcoal dark:text-white">Health Declaration</span>
          </div>
          <span class="material-symbols-outlined text-slate-400" :class="{ 'rotate-180': openSection === 'health' }">
            expand_more
          </span>
        </button>
        <div v-if="openSection === 'health'" class="px-6 pb-6 pt-2">
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Complete the health declaration form before arrival. Check current vaccination requirements.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  requirements?: string[]
  notes?: string
}>()

const openSection = ref<string | null>('online')

function toggleSection(section: string) {
  openSection.value = openSection.value === section ? null : section
}
</script>
