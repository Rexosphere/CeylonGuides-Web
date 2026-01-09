<template>
  <div class="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-lg shadow-neutral-200/50 dark:shadow-neutral-900/50 border border-neutral-100 dark:border-neutral-800 overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
          <span class="material-symbols-outlined text-xl">contact_phone</span>
        </div>
        <h2 class="text-xl font-bold text-neutral-900 dark:text-white">Emergency Contacts</h2>
      </div>
    </div>

    <!-- Contacts Grid -->
    <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="contact in contacts" 
        :key="contact.id"
        class="relative bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-5 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/30 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-all duration-300 group"
      >
        <!-- Header -->
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1 min-w-0 pr-4">
            <p class="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full" :class="getDotClass(contact.color)"></span>
              {{ contact.title }}
            </p>
            <p class="text-3xl font-bold text-neutral-900 dark:text-white font-mono tracking-tight leading-none group-hover:scale-105 transition-transform origin-left duration-300">
              {{ contact.number }}
            </p>
          </div>
          <div 
            class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:rotate-6"
            :class="getIconBgClass(contact.color)"
          >
            <span class="material-symbols-outlined text-2xl" :class="getIconTextClass(contact.color)">
              {{ contact.icon }}
            </span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed line-clamp-2">
          {{ contact.description }}
        </p>

        <!-- Actions -->
        <div class="flex gap-3">
          <a 
            :href="`tel:${(contact.number || '').replace(/\D/g, '')}`"
            class="flex-1 text-center py-3 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
            :class="getCallButtonClass(contact.color)"
          >
            <span class="material-symbols-outlined text-lg">call</span>
            Call Now
          </a>
          <button 
            @click="copyNumber(contact.number || '')"
            class="px-4 rounded-xl bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-colors shadow-sm active:scale-95"
            :title="copiedId === contact.id ? 'Copied!' : 'Copy number'"
          >
            <span class="material-symbols-outlined text-neutral-600 dark:text-neutral-300 transition-transform duration-300" :class="copiedId === contact.id ? 'scale-0' : 'scale-100'">content_copy</span>
            <span class="material-symbols-outlined text-green-500 absolute -ml-6 mt-0.5 transition-transform duration-300" :class="copiedId === contact.id ? 'scale-100' : 'scale-0'">check</span>
          </button>
        </div>

        <!-- Alt Numbers -->
        <div v-if="contact.altNumbers?.length" class="mt-4 pt-3 border-t border-neutral-200/50 dark:border-neutral-700/50">
          <div class="flex items-center gap-2">
            <span class="text-[10px] text-neutral-400 uppercase tracking-wide font-bold">Or call:</span>
            <div class="flex flex-wrap gap-2">
              <a 
                v-for="alt in (contact.altNumbers || [])" 
                :key="alt"
                :href="`tel:${alt.replace(/\D/g, '')}`"
                class="px-2 py-1 rounded-md bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-300 hover:text-primary hover:border-primary/30 transition-colors"
              >
                {{ alt }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer note -->
    <div class="px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
      <p class="text-xs text-neutral-500 flex items-center gap-2">
        <span class="material-symbols-outlined text-sm text-green-500">verified</span>
        Emergency numbers verified for Sri Lanka (Jan 2025)
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { emergencyContacts } from '~/data/safetyModeData'

const contacts = emergencyContacts
const copiedId = ref<string | null>(null)

async function copyNumber(number: string) {
  try {
    await navigator.clipboard.writeText(number)
    const contact = contacts.find(c => c.number === number)
    if (contact) {
      copiedId.value = contact.id
      setTimeout(() => { copiedId.value = null }, 2000)
    }
  } catch {
    alert(`Copy this number: ${number}`)
  }
}

function getDotClass(color: string): string {
  const classes: Record<string, string> = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
    teal: 'bg-teal-500',
    blue: 'bg-blue-500'
  }
  return classes[color] || 'bg-red-500'
}

function getIconBgClass(color: string): string {
  const defaultClass = 'bg-red-100 dark:bg-red-900/30'
  const classes: Record<string, string> = {
    red: defaultClass,
    orange: 'bg-orange-100 dark:bg-orange-900/30',
    amber: 'bg-amber-100 dark:bg-amber-900/30',
    teal: 'bg-teal-100 dark:bg-teal-900/30',
    blue: 'bg-blue-100 dark:bg-blue-900/30'
  }
  return classes[color] || defaultClass
}

function getIconTextClass(color: string): string {
  const defaultClass = 'text-red-600 dark:text-red-400'
  const classes: Record<string, string> = {
    red: defaultClass,
    orange: 'text-orange-600 dark:text-orange-400',
    amber: 'text-amber-600 dark:text-amber-400',
    teal: 'text-teal-600 dark:text-teal-400',
    blue: 'text-blue-600 dark:text-blue-400'
  }
  return classes[color] || defaultClass
}

function getCallButtonClass(color: string): string {
  const defaultClass = 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 dark:shadow-none'
  const classes: Record<string, string> = {
    red: defaultClass,
    orange: 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200 dark:shadow-none',
    amber: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200 dark:shadow-none',
    teal: 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200 dark:shadow-none',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-none'
  }
  return classes[color] || defaultClass
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
