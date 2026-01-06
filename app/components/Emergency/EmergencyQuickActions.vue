<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-neutral-dark dark:text-white flex items-center gap-3">
        <span class="material-symbols-outlined text-primary">e911_emergency</span>
        Immediate Assistance
      </h2>
      <span class="text-sm text-neutral-soft">Tap to call instantly</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="card in quickCards"
        :key="card.phone"
        class="bg-white dark:bg-[#2a1d18] p-6 rounded-xl shadow-sm border border-neutral-100 dark:border-[#3a2d28] hover:shadow-md transition-shadow relative overflow-hidden group"
      >
        <div :class="['absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110', card.accent]"></div>
        <div class="flex flex-col h-full justify-between gap-4 relative z-10">
          <div>
            <div class="flex justify-between items-start">
              <div :class="['p-3 rounded-lg', card.iconWrap]">
                <span class="material-symbols-outlined text-3xl">{{ card.icon }}</span>
              </div>
              <span :class="['text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider', card.badge]">{{ card.badgeLabel }}</span>
            </div>
            <h3 class="mt-4 text-lg font-bold text-neutral-dark dark:text-white">{{ card.name }}</h3>
            <p class="text-sm text-neutral-soft mt-1">{{ card.description }}</p>
          </div>
          <div class="mt-2">
            <a :class="card.buttonClass" :href="`tel:${card.phone}`">
              {{ card.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { apiBase } = useRuntimeConfig().public

const { data: quickResponse } = await useFetch<{
  success: boolean
  data: Array<{ name: string; phone: string; category: string; emoji?: string }>
}>(`${apiBase}/api/emergency/quick`)

const fallbackQuick = [
  { name: 'Police Emergency', phone: '119', category: 'POLICE' },
  { name: 'Ambulance / Fire', phone: '110', category: 'MEDICAL' },
  { name: 'Tourist Police', phone: '1912', category: 'TOURIST_POLICE' },
]

const styles: Record<string, any> = {
  POLICE: {
    accent: 'bg-red-500/5',
    iconWrap: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    badge: 'bg-red-100 text-red-700',
    badgeLabel: 'Critical',
    icon: 'local_police',
    buttonClass: 'block w-full text-center bg-primary text-white text-2xl font-extrabold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20',
    description: 'For crimes and immediate danger.',
  },
  MEDICAL: {
    accent: 'bg-blue-500/5',
    iconWrap: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    badgeLabel: 'Medical',
    icon: 'ambulance',
    buttonClass: 'block w-full text-center bg-primary text-white text-2xl font-extrabold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20',
    description: 'Free national ambulance service.',
  },
  TOURIST_POLICE: {
    accent: 'bg-orange-500/5',
    iconWrap: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 text-orange-700',
    badgeLabel: 'Tourist',
    icon: 'shield_person',
    buttonClass: 'block w-full text-center border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg font-bold py-3 rounded-lg transition-colors',
    description: 'Dedicated support for travelers.',
  },
}

const quickCards = computed(() => {
  const list = quickResponse.value?.data?.length ? quickResponse.value.data : fallbackQuick
  return list.map((item) => {
    const style = styles[item.category] || styles.POLICE
    return {
      ...item,
      ...style,
    }
  })
})
</script>
