<template>
  <section id="checklist"
    class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark mb-10 overflow-hidden">
    <div
      class="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800/50">
      <h3 class="font-semibold text-lg flex items-center gap-2">
        <span class="material-icons text-gray-400">fact_check</span> Cultural Etiquette Checklist
      </h3>
      <span class="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
        {{ completedCount }}/{{ totalCount }}
      </span>
    </div>

    <!-- Temple Dress Code Section -->
    <div class="border-b border-border-light dark:border-border-dark">
      <button @click="toggleSection('temple')"
        class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
        <div class="flex items-center gap-3">
          <span class="material-icons text-primary">temple_hindu</span>
          <span class="font-medium">Temple Dress Code</span>
          <span class="bg-gray-100 dark:bg-gray-700 text-gray-500 text-xs px-2 py-0.5 rounded-full">
            {{ getSectionCount('temple') }}/5
          </span>
        </div>
        <span class="material-icons text-gray-400">
          {{ expandedSections.temple ? 'expand_less' : 'expand_more' }}
        </span>
      </button>
      <div v-if="expandedSections.temple" class="px-6 pb-6 pl-14 space-y-3">
        <label v-for="item in checklistItems.temple" :key="item.id"
          class="flex items-center gap-3 cursor-pointer group">
          <input v-model="item.checked" class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
            type="checkbox" />
          <span class="text-gray-600 dark:text-gray-300 group-hover:text-charcoal dark:group-hover:text-white">
            {{ item.label }}
          </span>
        </label>
      </div>
    </div>

    <!-- Photography Rules Section -->
    <div class="border-b border-border-light dark:border-border-dark">
      <button @click="toggleSection('photography')"
        class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
        <div class="flex items-center gap-3">
          <span class="material-icons text-muted-crimson">photo_camera</span>
          <span class="font-medium">Photography Rules</span>
          <span class="bg-gray-100 dark:bg-gray-700 text-gray-500 text-xs px-2 py-0.5 rounded-full">
            {{ getSectionCount('photography') }}/5
          </span>
        </div>
        <span class="material-icons text-gray-400">
          {{ expandedSections.photography ? 'expand_less' : 'expand_more' }}
        </span>
      </button>
      <div v-if="expandedSections.photography" class="px-6 pb-6 pl-14 space-y-3">
        <label v-for="item in checklistItems.photography" :key="item.id"
          class="flex items-center gap-3 cursor-pointer group">
          <input v-model="item.checked" class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
            type="checkbox" />
          <span class="text-gray-600 dark:text-gray-300 group-hover:text-charcoal dark:group-hover:text-white">
            {{ item.label }}
          </span>
        </label>
      </div>
    </div>

    <!-- Social Do's & Don'ts Section -->
    <div>
      <button @click="toggleSection('social')"
        class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
        <div class="flex items-center gap-3">
          <span class="material-icons text-blue-500">people</span>
          <span class="font-medium">Social Do's & Don'ts</span>
          <span class="bg-gray-100 dark:bg-gray-700 text-gray-500 text-xs px-2 py-0.5 rounded-full">
            {{ getSectionCount('social') }}/6
          </span>
        </div>
        <span class="material-icons text-gray-400">
          {{ expandedSections.social ? 'expand_less' : 'expand_more' }}
        </span>
      </button>
      <div v-if="expandedSections.social" class="px-6 pb-6 pl-14 space-y-3">
        <label v-for="item in checklistItems.social" :key="item.id"
          class="flex items-center gap-3 cursor-pointer group">
          <input v-model="item.checked" class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
            type="checkbox" />
          <span class="text-gray-600 dark:text-gray-300 group-hover:text-charcoal dark:group-hover:text-white">
            {{ item.label }}
          </span>
        </label>
      </div>
    </div>

    <div class="bg-gray-50 dark:bg-gray-900 px-6 py-3 text-xs text-gray-400 flex items-center gap-2">
      <span class="material-icons text-sm">lightbulb</span>
      Tip: Save this for your trip — your progress is saved automatically
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

const expandedSections = reactive({
  temple: true,
  photography: false,
  social: false,
})

const checklistItems = reactive({
  temple: [
    { id: 't1', label: 'Cover shoulders and knees at temples', checked: false },
    { id: 't2', label: 'Bring a sarong or shawl', checked: false },
    { id: 't3', label: 'Remove shoes before entering shrines', checked: false },
    { id: 't4', label: 'No Buddha imagery on clothing', checked: false },
    { id: 't5', label: 'No leather items at Hindu temples', checked: false },
  ],
  photography: [
    { id: 'p1', label: 'Ask permission before photographing people', checked: false },
    { id: 'p2', label: 'Never turn back to Buddha statues', checked: false },
    { id: 'p3', label: 'No flash photography on ancient murals', checked: false },
    { id: 'p4', label: 'No selfies with Buddha statues', checked: false },
    { id: 'p5', label: 'Respect "No Photography" signs', checked: false },
  ],
  social: [
    { id: 's1', label: 'Greet with "Ayubowan" (palms together)', checked: false },
    { id: 's2', label: 'Remove shoes when entering homes', checked: false },
    { id: 's3', label: 'Use right hand for eating and giving', checked: false },
    { id: 's4', label: 'Never touch someone\'s head', checked: false },
    { id: 's5', label: 'Avoid public displays of affection', checked: false },
    { id: 's6', label: 'Dress modestly in rural areas', checked: false },
  ],
})

const toggleSection = (section: keyof typeof expandedSections) => {
  expandedSections[section] = !expandedSections[section]
}

const getSectionCount = (section: keyof typeof checklistItems) => {
  return checklistItems[section].filter(item => item.checked).length
}

const completedCount = computed(() => {
  return Object.values(checklistItems).flat().filter(item => item.checked).length
})

const totalCount = computed(() => {
  return Object.values(checklistItems).flat().length
})
</script>
