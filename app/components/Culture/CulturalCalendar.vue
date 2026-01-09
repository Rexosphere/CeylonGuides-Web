<template>
  <section id="festivals" class="space-y-4">
    <!-- Month Filter Pills -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="month in monthOptions"
        :key="month.value"
        @click="activeMonth = activeMonth === month.value ? null : month.value"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        :class="[
          activeMonth === month.value
            ? 'bg-primary text-white shadow-md'
            : 'bg-neutral-100 dark:bg-[#2a1d18] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-[#3a2d28]'
        ]"
        :aria-pressed="activeMonth === month.value"
      >
        <span class="flex items-center gap-1.5">
          <span class="material-symbols-outlined text-base" aria-hidden="true">calendar_month</span>
          {{ month.label }}
        </span>
      </button>
    </div>

    <!-- Events Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      <article
        v-for="event in filteredEvents"
        :key="event.id"
        :id="event.id"
        class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- Event Header -->
        <div 
          class="px-4 py-3 border-b border-neutral-100 dark:border-[#3a2d28]"
          :class="getCategoryHeaderClass(event.category)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <!-- Month Label -->
              <span class="text-xs font-bold px-2 py-1 bg-white/80 dark:bg-black/20 rounded-md">
                {{ event.monthLabel }}
              </span>
              <!-- Category Chip -->
              <span 
                class="text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide"
                :class="getCategoryChipClass(event.category)"
              >
                {{ getCategoryLabel(event.category) }}
              </span>
            </div>
            <!-- Add to Calendar -->
            <button
              @click="downloadICS(event)"
              class="p-1.5 hover:bg-white/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              :aria-label="`Add ${event.title} to calendar`"
              title="Add to Calendar"
            >
              <span class="material-symbols-outlined text-lg" aria-hidden="true">calendar_add_on</span>
            </button>
          </div>
          <h3 class="font-bold text-lg mt-2">{{ event.title }}</h3>
          <p v-if="event.dateRange" class="text-sm opacity-80 mt-0.5">{{ event.dateRange }}</p>
        </div>

        <!-- Event Body -->
        <div class="p-4 space-y-3">
          <!-- Description -->
          <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
            {{ event.description }}
          </p>

          <!-- Etiquette Tips -->
          <div>
            <h4 class="text-xs font-bold text-neutral-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm text-primary" aria-hidden="true">tips_and_updates</span>
              Etiquette Tips
            </h4>
            <ul class="space-y-1">
              <li 
                v-for="(tip, idx) in event.etiquetteTips.slice(0, 4)" 
                :key="idx"
                class="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400"
              >
                <span class="material-symbols-outlined text-primary text-xs mt-0.5 flex-shrink-0" aria-hidden="true">check_circle</span>
                {{ tip }}
              </li>
            </ul>
          </div>

          <!-- Important Notes -->
          <div v-if="event.notes?.length" class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
            <h4 class="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm" aria-hidden="true">info</span>
              Important Notes
            </h4>
            <ul class="space-y-1">
              <li 
                v-for="(note, idx) in event.notes.slice(0, 3)" 
                :key="idx"
                class="text-xs text-amber-700/80 dark:text-amber-400/80 flex items-start gap-1.5"
              >
                <span class="text-amber-500">•</span>
                {{ note }}
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-if="filteredEvents.length === 0" class="text-center py-12">
      <span class="material-symbols-outlined text-5xl text-neutral-300 mb-3" aria-hidden="true">event_busy</span>
      <p class="text-neutral-500">No festivals in {{ activeMonth }}</p>
      <button @click="activeMonth = null" class="mt-2 text-primary text-sm hover:underline">
        Show all festivals
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { festivals } from '~/data/culturePageData'
import type { CulturalEvent, EventCategory } from '~/types/culture'

// State
const activeMonth = ref<string | null>(null)

// Month filter options derived from events
const monthOptions = computed(() => {
  const months = [...new Set(festivals.map(f => f.monthLabel))]
  return months.map(m => ({ value: m, label: m }))
})

// Filtered events
const filteredEvents = computed(() => {
  if (!activeMonth.value) return festivals
  return festivals.filter(f => f.monthLabel === activeMonth.value)
})

// Category helpers
function getCategoryLabel(category: EventCategory): string {
  const labels: Record<EventCategory, string> = {
    'buddhist': 'Buddhist',
    'hindu': 'Hindu',
    'national': 'National',
    'multi-faith': 'Multi-Faith'
  }
  return labels[category] || category
}

function getCategoryHeaderClass(category: EventCategory): string {
  const classes: Record<EventCategory, string> = {
    'buddhist': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
    'hindu': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    'national': 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
    'multi-faith': 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
  }
  return classes[category] || 'bg-neutral-500 text-white'
}

function getCategoryChipClass(category: EventCategory): string {
  const classes: Record<EventCategory, string> = {
    'buddhist': 'bg-amber-100/80 text-amber-800',
    'hindu': 'bg-purple-100/80 text-purple-800',
    'national': 'bg-emerald-100/80 text-emerald-800',
    'multi-faith': 'bg-blue-100/80 text-blue-800'
  }
  return classes[category] || 'bg-neutral-100 text-neutral-800'
}

// Generate and download ICS file
function downloadICS(event: CulturalEvent) {
  // Parse date range or use month label
  const year = 2025
  let startDate = ''
  let endDate = ''

  if (event.dateRange) {
    // Try to parse dates like "April 13-14, 2025" or "May 12, 2025"
    const dateMatch = event.dateRange.match(/(\w+)\s+(\d+)(?:-(\d+))?/)
    if (dateMatch && dateMatch[1] && dateMatch[2]) {
      const month = getMonthNumber(dateMatch[1])
      const day = dateMatch[2].padStart(2, '0')
      const endDay = dateMatch[3] ? dateMatch[3].padStart(2, '0') : day
      startDate = `${year}${month}${day}`
      endDate = `${year}${month}${endDay}`
    }
  }

  if (!startDate) {
    // Fallback to month label
    const monthPart = event.monthLabel.split('/')[0] || event.monthLabel
    const month = getMonthNumber(monthPart)
    startDate = `${year}${month}01`
    endDate = `${year}${month}07`
  }

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CeylonGuide//Cultural Calendar//EN',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${startDate}`,
    `DTEND;VALUE=DATE:${endDate}`,
    `SUMMARY:${event.title} - Sri Lanka`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n').substring(0, 200)}...\\n\\nEtiquette Tips:\\n${event.etiquetteTips.slice(0, 3).join('\\n')}`,
    `LOCATION:Sri Lanka`,
    `CATEGORIES:${getCategoryLabel(event.category)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${event.id}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function getMonthNumber(monthName: string): string {
  const months: Record<string, string> = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  }
  return months[monthName] || '01'
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
