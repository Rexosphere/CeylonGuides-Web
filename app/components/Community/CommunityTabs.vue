<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="setTab(tab)"
      class="px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border"
      :class="activeTab === tab
        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
        : 'bg-white dark:bg-card-dark text-text-secondary dark:text-gray-400 border-border-color dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'"
    >
      {{ tab }}
      <span v-if="tabCounts[tab]" class="ml-1.5 opacity-80 text-xs bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded-full">
        {{ tabCounts[tab] }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCommunity } from '~/composables/useCommunity'

const tabs = ['All Topics', 'Trip Reports', 'Q&A', 'Find a Buddy', 'Local Guides']
const { activeTab, setTab, tabCounts } = useCommunity()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
