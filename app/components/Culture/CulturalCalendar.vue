<template>
  <section id="festivals" class="mb-12">
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
      <span class="material-icons text-charcoal dark:text-white">event_note</span> Cultural Calendar
    </h2>

    <!-- Month Filter -->
    <div class="flex gap-4 mb-6 overflow-x-auto pb-2">
      <button v-for="month in months" :key="month.id" @click="activeMonth = month.id"
        class="flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-sm whitespace-nowrap transition-all"
        :class="activeMonth === month.id
          ? 'bg-charcoal text-white'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'">
        <span class="material-icons text-xs">calendar_today</span> {{ month.label }}
      </button>
    </div>

    <!-- Festival Cards -->
    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="festival in filteredFestivals" :key="festival.id"
        class="bg-cool-stone dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-2xl overflow-hidden flex flex-col">
        <div class="p-6 pb-4">
          <div class="flex justify-between items-start mb-2">
            <span
              class="text-xs font-bold text-gray-500 bg-white dark:bg-gray-700 px-2 py-1 rounded uppercase tracking-wide">
              {{ festival.month }}
            </span>
            <span class="material-icons text-gray-400">{{ festival.icon }}</span>
          </div>
          <h3 class="text-xl font-bold text-charcoal dark:text-white mb-1">{{ festival.name }}</h3>
          <p class="text-xs text-primary font-medium mb-3">{{ festival.date }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{{ festival.description }}</p>

          <div class="space-y-2 mb-4">
            <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <span class="material-icons text-xs">lightbulb</span> Etiquette Tips
            </h5>
            <div v-for="(tip, index) in festival.tips" :key="index"
              class="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
              <span class="material-icons text-primary text-xs mt-0.5">check_circle_outline</span>
              {{ tip }}
            </div>
          </div>
        </div>

        <div class="bg-white/50 dark:bg-gray-700/50 p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <div class="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2">
            <span class="material-icons text-amber-500 text-sm">info</span>
            <span>{{ festival.info }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeMonth = ref('may')

const months = [
  { id: 'may', label: 'May' },
  { id: 'april', label: 'April' },
  { id: 'july-aug', label: 'July/August' },
]

const festivals = [
  {
    id: 1,
    month: 'May',
    monthId: 'may',
    name: 'Vesak',
    date: 'May 12, 2025 (varies with full moon)',
    icon: 'temple_buddhist',
    description: "Sri Lanka's biggest Buddhist festival celebrating Buddha's birth, enlightenment, and passing. Temples and streets are decorated.",
    tips: [
      'Join calm celebrations — observe quietly',
      'Dress in white if visiting temples',
    ],
    info: 'Alcohol and meat sales banned during Vesak week',
  },
  {
    id: 2,
    month: 'April',
    monthId: 'april',
    name: 'Sinhala & Tamil New Year',
    date: 'April 13-14, 2025',
    icon: 'celebration',
    description: 'Traditional New Year marking end of harvest and sun\'s transit into Aries. Island-wide holiday with games.',
    tips: [
      'Greet with "Suba Aluth Avuruddak Wewa"',
      'Respectfully enjoy invitations to join games',
    ],
    info: 'Special sweets: kavum, kokis, plantains are essential',
  },
  {
    id: 3,
    month: 'July/Aug',
    monthId: 'july-aug',
    name: 'Kandy Esala Perahera',
    date: '10-day nighttime procession',
    icon: 'festival',
    description: 'Grand parade honoring the Sacred Tooth Relic with ornately decorated elephants, dancers, and drummers.',
    tips: [
      'Stay on sidewalks behind barriers',
      'Keep quiet when procession nears temples',
    ],
    info: 'Kumbal Perahera: first procession (5 days)',
  },
  {
    id: 4,
    month: 'May',
    monthId: 'may',
    name: 'Poson',
    date: 'June 2025 (varies with full moon)',
    icon: 'temple_buddhist',
    description: 'Commemorates the introduction of Buddhism to Sri Lanka. Pilgrims climb sacred mountains.',
    tips: [
      'Dress modestly for temple visits',
      'Bring water for mountain climbs',
    ],
    info: 'Mihintale is the main pilgrimage site',
  },
  {
    id: 5,
    month: 'April',
    monthId: 'april',
    name: 'Ramadan & Eid',
    date: 'Varies annually (Islamic calendar)',
    icon: 'celebration',
    description: 'Islamic holy month of fasting followed by Eid celebrations. Muslim communities celebrate with feasts.',
    tips: [
      'Be respectful during fasting hours',
      'Accept invitations to Eid meals graciously',
    ],
    info: 'Dates vary based on lunar calendar',
  },
  {
    id: 6,
    month: 'July/Aug',
    monthId: 'july-aug',
    name: 'Nallur Festival',
    date: 'July-August (25 days)',
    icon: 'temple_hindu',
    description: 'Major Hindu festival in Jaffna with processions, music, and rituals at Nallur Kandaswamy Temple.',
    tips: [
      'Remove shoes before entering temple grounds',
      'No leather items allowed',
    ],
    info: 'One of the longest Hindu festivals in Sri Lanka',
  },
]

const filteredFestivals = computed(() => {
  return festivals.filter(festival => festival.monthId === activeMonth.value)
})
</script>
