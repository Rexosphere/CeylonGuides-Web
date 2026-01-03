<template>
  <section class="w-full max-w-[960px] px-4 md:px-10 mb-10 mx-auto">
    <div class="bg-white dark:bg-[#2c1e19] rounded-xl shadow-sm border border-[#e6e0dd] dark:border-[#3a2d28] p-6">
      <h3 class="text-lg font-bold mb-6 text-center md:text-left">Quick Temple Guidelines</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="guide in guidelines" :key="guide.label" class="flex flex-col items-center gap-2 text-center group cursor-default">
          <div class="size-12 rounded-full bg-culture-primary/10 flex items-center justify-center text-culture-primary group-hover:bg-culture-primary group-hover:text-white transition-colors">
            <span class="material-symbols-outlined">{{ guide.icon }}</span>
          </div>
          <span class="text-sm font-medium">{{ guide.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase

// Fetch etiquette tips from API
const { data: tipsResponse } = await useFetch<{
  success: boolean
  data: Array<{
    id: string
    tip: string
    category: string
    icon?: string
  }>
}>(`${apiBase}/api/phrases/etiquette/tips`)

// Map API tips to guidelines format with fallback
const guidelines = computed(() => {
  const apiTips = tipsResponse.value?.data || []
  if (apiTips.length > 0) {
    return apiTips.slice(0, 4).map(t => ({
      label: t.tip.length > 20 ? t.tip.substring(0, 20) + '...' : t.tip,
      icon: t.icon || 'info'
    }))
  }
  // Fallback to defaults
  return [
    { label: 'Remove Shoes', icon: 'do_not_step' },
    { label: 'Cover Up', icon: 'checkroom' },
    { label: 'Keep Silence', icon: 'volume_off' },
    { label: 'No Flash', icon: 'no_flash' }
  ]
})
</script>
