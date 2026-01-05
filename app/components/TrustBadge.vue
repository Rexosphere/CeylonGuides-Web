<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'verification' | 'freshness' | 'confidence' | 'hygiene' | 'severity'
  value: string | number | boolean
  label?: string
}>()

const config = computed(() => {
  switch (props.type) {
    case 'verification':
      return {
        icon: '✓',
        bg: props.value ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800',
        text: props.value ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400',
        border: props.value ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-700',
        display: props.value ? 'Verified' : 'Unverified'
      }
    case 'freshness':
      const daysAgo = Number(props.value) || 0
      const freshColors = daysAgo < 7 
        ? { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-800' }
        : daysAgo < 30 
        ? { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-800' }
        : { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-700' }
      return {
        icon: '🕐',
        ...freshColors,
        display: daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo}d ago`
      }
    case 'confidence':
      const count = Number(props.value) || 0
      const confColors = count > 10 
        ? { icon: '🔥', bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' }
        : count > 5 
        ? { icon: '✓', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' }
        : { icon: '📝', bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-700' }
      return {
        ...confColors,
        display: count === 1 ? '1 report' : `${count} reports`
      }
    case 'hygiene':
      const grade = String(props.value).toUpperCase()
      const hygieneColors = grade === 'A' || grade === 'EXCELLENT'
        ? { icon: '⭐', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-800' }
        : grade === 'B' || grade === 'GOOD'
        ? { icon: '✓', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' }
        : { icon: '○', bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-800' }
      const gradeLabel = grade === 'EXCELLENT' ? 'A' : grade === 'GOOD' ? 'B' : grade === 'FAIR' ? 'C' : grade
      return {
        ...hygieneColors,
        display: `Grade ${gradeLabel}`
      }
    case 'severity':
      const severity = String(props.value).toUpperCase()
      const severityColors = severity === 'CRITICAL' 
        ? { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-800' }
        : severity === 'HIGH' 
        ? { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' }
        : severity === 'MEDIUM' 
        ? { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-800' }
        : { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' }
      return {
        icon: '⚠️',
        ...severityColors,
        display: severity.charAt(0) + severity.slice(1).toLowerCase()
      }
    default:
      return {
        icon: '•',
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-700',
        display: String(props.value)
      }
  }
})
</script>

<template>
  <span 
    :class="[config.bg, config.text, config.border, 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border']"
    :title="label"
  >
    <span>{{ config.icon }}</span>
    <span>{{ config.display }}</span>
  </span>
</template>
