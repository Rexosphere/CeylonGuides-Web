<template>
  <div class="w-full max-w-[960px] bg-white dark:bg-[#2a1d18] rounded-xl shadow-xl shadow-black/5 p-2 mb-8 overflow-x-auto">
    <div class="flex md:grid md:grid-cols-4 min-w-max md:min-w-0">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="[
          'flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all whitespace-nowrap mx-1 group',
          activeTab === tab.id 
            ? 'bg-primary/10 text-primary border border-primary/20' 
            : 'hover:bg-background-light dark:hover:bg-[#352620] text-[#896c61] dark:text-gray-400'
        ]"
        :title="tab.description"
        @click="$emit('update:activeTab', tab.id)"
      >
        <span 
          class="material-symbols-outlined text-lg transition-colors"
          :class="activeTab === tab.id ? 'text-primary' : 'group-hover:text-primary'"
        >{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  id: string
  label: string
  icon: string
  description: string
}

defineProps<{
  tabs: Tab[]
  activeTab: string
}>()

defineEmits<{
  (e: 'update:activeTab', value: string): void
}>()
</script>
