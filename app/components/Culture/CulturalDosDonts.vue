<template>
  <section id="dos-donts" class="mb-12">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <h2 class="text-2xl font-bold flex items-center gap-3">
        <span class="material-icons text-charcoal dark:text-white">thumbs_up_down</span> Cultural Do's & Don'ts
      </h2>
      <div class="w-full md:w-auto relative">
        <span class="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">search</span>
        <input v-model="searchQuery"
          class="w-full md:w-64 pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:ring-primary focus:border-primary"
          placeholder="Search customs..." type="text" />
      </div>
    </div>

    <!-- Filter Tabs -->
    <div
      class="flex gap-4 text-sm text-gray-500 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2 overflow-x-auto">
      <button v-for="filter in filters" :key="filter.id" @click="activeFilter = filter.id"
        class="whitespace-nowrap transition-colors" :class="activeFilter === filter.id
          ? 'font-semibold text-charcoal dark:text-white border-b-2 border-charcoal dark:border-white pb-2 -mb-2.5'
          : 'hover:text-charcoal dark:hover:text-white'">
        {{ filter.label }}
      </button>
    </div>

    <!-- Cards Grid -->
    <div class="grid md:grid-cols-2 gap-6">
      <div v-for="item in filteredItems" :key="item.id"
        class="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start gap-4 mb-4">
          <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            :class="item.type === 'do' ? 'bg-primary/10 text-primary' : 'bg-muted-crimson/10 text-muted-crimson'">
            <span class="material-icons">{{ item.icon }}</span>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold uppercase tracking-wide"
                :class="item.type === 'do' ? 'text-primary' : 'text-muted-crimson'">
                {{ item.type === 'do' ? 'DO' : "DON'T" }}
              </span>
              <h4 class="font-bold text-charcoal dark:text-white">{{ item.title }}</h4>
            </div>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <li v-for="(point, index) in item.points" :key="index" class="flex items-start gap-2">
                <span class="material-icons text-sm mt-0.5"
                  :class="item.type === 'do' ? 'text-primary' : 'text-muted-crimson'">
                  {{ item.type === 'do' ? 'done' : 'close' }}
                </span>
                {{ point }}
              </li>
            </ul>
            <div class="flex gap-2">
              <span v-for="tag in item.tags" :key="tag"
                class="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded uppercase">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeFilter = ref('all')

const filters = [
  { id: 'all', label: 'All (8)' },
  { id: 'do', label: "Do's (4)" },
  { id: 'dont', label: "Don'ts (3)" },
  { id: 'info', label: 'Info (1)' },
]

const items = [
  {
    id: 1,
    type: 'do',
    title: 'Greetings',
    icon: 'handshake',
    points: [
      'Say "Ayubowan" (Sinhala) or "Vanakkam" (Tamil) with palms pressed together',
      'Greet elders and monks first',
      'Use "Mr./Mrs./Miss" with surnames in formal settings',
    ],
    tags: ['social', 'essential'],
  },
  {
    id: 2,
    type: 'do',
    title: 'Temple Visits',
    icon: 'temple_hindu',
    points: [
      'Cover shoulders and knees (bring a sarong)',
      'Remove shoes, hats, and socks when required',
      'Stand when monks or nuns enter the room',
    ],
    tags: ['religious', 'essential'],
  },
  {
    id: 3,
    type: 'dont',
    title: 'Temple Don\'ts',
    icon: 'back_hand',
    points: [
      'Never turn your back to Buddha statues',
      'No flash photography on ancient murals',
      'Don\'t take selfies with Buddha statues',
    ],
    tags: ['religious', 'critical'],
  },
  {
    id: 4,
    type: 'dont',
    title: 'Social Don\'ts',
    icon: 'sentiment_very_dissatisfied',
    points: [
      'Never touch anyone\'s head without permission',
      'Women should not touch Buddhist monks',
      'Avoid public displays of affection (kissing, hugging)',
    ],
    tags: ['social', 'critical'],
  },
  {
    id: 5,
    type: 'do',
    title: 'Dining Etiquette',
    icon: 'restaurant',
    points: [
      'Use your right hand for eating and giving',
      'Wait for elders to start eating first',
      'Try local dishes and show appreciation',
    ],
    tags: ['social', 'dining'],
  },
  {
    id: 6,
    type: 'do',
    title: 'Home Visits',
    icon: 'home',
    points: [
      'Remove shoes before entering homes',
      'Bring a small gift when invited',
      'Accept hospitality graciously',
    ],
    tags: ['social', 'essential'],
  },
  {
    id: 7,
    type: 'dont',
    title: 'Photography Don\'ts',
    icon: 'no_photography',
    points: [
      'Don\'t photograph people without permission',
      'Avoid photographing military installations',
      'No drones at heritage sites',
    ],
    tags: ['photography', 'critical'],
  },
  {
    id: 8,
    type: 'info',
    title: 'General Tips',
    icon: 'info',
    points: [
      'Dress modestly in rural areas and religious sites',
      'Learn a few basic Sinhala or Tamil phrases',
      'Be patient and respectful of local customs',
    ],
    tags: ['general', 'helpful'],
  },
]

const filteredItems = computed(() => {
  let result = items

  // Filter by type
  if (activeFilter.value === 'do') {
    result = result.filter(item => item.type === 'do')
  } else if (activeFilter.value === 'dont') {
    result = result.filter(item => item.type === 'dont')
  } else if (activeFilter.value === 'info') {
    result = result.filter(item => item.type === 'info')
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.points.some(point => point.toLowerCase().includes(query)) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return result
})
</script>
