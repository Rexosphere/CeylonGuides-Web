<template>
  <section class="flex flex-col gap-6">
    <h2 class="text-xl font-bold text-neutral-dark dark:text-white">Emergency Phrases</h2>
    <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] p-5 shadow-sm">
      <div class="space-y-4">
        
        <div v-for="(phrase, index) in phrases" :key="index" :class="{'pb-4 border-b border-neutral-100 dark:border-[#3a2d28]': index < phrases.length - 1}">
          <p class="text-xs font-bold text-neutral-soft uppercase tracking-wider mb-1">{{ phrase.english }}</p>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <div class="text-sm font-medium text-neutral-dark dark:text-white">{{ phrase.sinhala }}</div>
              <span class="text-[10px] bg-neutral-100 dark:bg-[#3a2d28] px-1.5 py-0.5 rounded text-neutral-500">Sinhala</span>
            </div>
            <div v-if="phrase.tamil" class="flex justify-between items-center">
              <div class="text-sm font-medium text-neutral-dark dark:text-white">{{ phrase.tamil }}</div>
              <span class="text-[10px] bg-neutral-100 dark:bg-[#3a2d28] px-1.5 py-0.5 rounded text-neutral-500">Tamil</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const phrases = [
  {
    english: 'I need a doctor',
    sinhala: 'Mata dostara kenek one',
    tamil: 'Enaku oru maruthuvar venum'
  },
  {
    english: 'Help Me',
    sinhala: 'Mata udaww karanna',
    tamil: 'Enaku udhavungal'
  },
  {
    english: 'Take me to the hospital',
    sinhala: 'Mawa hospital ekata geniyanna',
    tamil: null
  }
]
</script>
