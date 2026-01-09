<template>
  <section class="scroll-mt-24 container mx-auto px-6 py-12" id="concerns">
    <div class="text-center mb-10">
      <div class="flex items-center justify-center gap-2 mb-2">
        <span class="material-icons text-primary">verified_user</span>
        <p class="text-xs font-bold uppercase tracking-widest text-text-sub-light dark:text-text-sub-dark">
          Stay Safe
        </p>
      </div>
      <h2 class="text-3xl font-bold text-text-main-light dark:text-text-main-dark mb-4">
        Common Health Concerns
      </h2>
      <p class="text-text-sub-light dark:text-text-sub-dark max-w-2xl mx-auto">
        Be aware of these health risks and how to prevent them. Most are easily avoidable with proper precautions.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(concern, index) in healthConcerns" :key="index"
        class="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-sm hover:shadow-md transition">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-primary">
              <span class="material-icons">{{ concern.icon }}</span>
            </div>
            <h3 class="font-bold text-lg">{{ concern.title }}</h3>
          </div>
          <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded" :class="concern.riskClass">
            {{ concern.risk }}
          </span>
        </div>
        <p class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4 leading-relaxed">
          {{ concern.description }}
        </p>
        <div class="space-y-2">
          <div v-for="(tip, tipIndex) in concern.tips" :key="tipIndex"
            class="flex gap-2 items-start text-xs text-text-sub-light dark:text-text-sub-dark">
            <span class="material-icons text-sm text-primary">{{ tip.icon }}</span>
            <span>{{ tip.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mt-8 bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-border-light dark:border-border-dark flex flex-col md:flex-row items-center gap-6">
      <div class="p-3 bg-white dark:bg-surface-dark rounded-full shadow-sm text-primary">
        <span class="material-icons text-2xl">info</span>
      </div>
      <div class="flex-1 text-center md:text-left">
        <h4 class="font-bold text-text-main-light dark:text-text-main-dark mb-1">
          General Health Advice
        </h4>
        <p class="text-sm text-text-sub-light dark:text-text-sub-dark">
          Drink only bottled water. Use insect repellent 24/7. Carry your travel insurance details everywhere.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface HealthTip {
  icon: string
  text: string
}

interface HealthConcern {
  icon: string
  title: string
  risk: string
  riskClass: string
  description: string
  tips: HealthTip[]
}

const healthConcerns: HealthConcern[] = [
  {
    icon: 'pest_control',
    title: 'Dengue Fever',
    risk: 'High Risk',
    riskClass: 'bg-secondary/10 text-secondary border border-secondary/20',
    description: 'Mosquito-borne viral infection common in urban and semi-urban areas.',
    tips: [
      { icon: 'shield', text: 'Use DEET repellent (20-30%)' },
      { icon: 'checkroom', text: 'Wear long sleeves at dawn/dusk' }
    ]
  },
  {
    icon: 'wb_sunny',
    title: 'Sun Exposure',
    risk: 'High Risk',
    riskClass: 'bg-secondary/10 text-secondary border border-secondary/20',
    description: 'UV index is extreme year-round. Sunburn can happen in < 15 mins.',
    tips: [
      { icon: 'beach_access', text: 'Wear hat & sunglasses always' },
      { icon: 'schedule', text: 'Avoid direct sun 11am-3pm' }
    ]
  },
  {
    icon: 'water_drop',
    title: 'Leptospirosis',
    risk: 'Medium Risk',
    riskClass: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
    description: 'Bacterial infection spread through water. Risk in paddy fields/lakes.',
    tips: [
      { icon: 'do_not_step', text: 'Avoid wading in stagnant water' },
      { icon: 'healing', text: 'Cover cuts with waterproof bandages' }
    ]
  }
]
</script>
