<template>
  <section class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <span class="material-icons text-primary">calendar_month</span>
        <h3 class="font-bold text-slate-900 dark:text-white">7-Day Snapshot</h3>
        <select v-model="selectedCity"
          class="bg-slate-100 dark:bg-slate-700 border-none text-xs font-bold rounded-lg px-3 py-1 ml-2 focus:ring-primary">
          <option value="colombo">Colombo</option>
          <option value="galle">Galle</option>
          <option value="kandy">Kandy</option>
          <option value="ella">Ella</option>
        </select>
      </div>
      <button class="text-xs text-slate-500 flex items-center gap-1 hover:text-primary">
        <span class="material-icons text-sm">refresh</span> Refresh
      </button>
    </div>
    <div class="flex overflow-x-auto gap-4 no-scrollbar pb-4">
      <div v-for="(day, index) in forecast" :key="index" :class="[
        'min-w-[100px] rounded-xl p-3 flex flex-col items-center text-center',
        index === 0
          ? 'bg-primary/5 dark:bg-primary/20 border border-primary'
          : 'border border-slate-100 dark:border-slate-700'
      ]">
        <span :class="['text-xs font-bold mb-2', index === 0 ? 'text-primary' : 'text-slate-500']">
          {{ day.day }}
        </span>
        <span :class="['material-icons text-3xl mb-1', getWeatherIconColor(day.icon)]">
          {{ day.icon }}
        </span>
        <span
          :class="['text-sm font-bold', index === 0 ? 'text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300']">
          {{ day.high }}° / {{ day.low }}°
        </span>
        <span v-if="day.rain" class="text-[10px] text-blue-400 flex items-center gap-0.5 mt-1">
          <span class="material-icons text-[10px]">water_drop</span> {{ day.rain }}%
        </span>
      </div>
    </div>
    <div
      class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mt-6 flex flex-wrap gap-6 items-center text-xs text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
      <div class="flex items-center gap-2 pr-6 border-r border-slate-200 dark:border-slate-700">
        <span class="material-icons text-yellow-500">sunny</span>
        <div class="flex flex-col">
          <span class="font-bold text-slate-900 dark:text-white">Today</span>
          <span>Overcast</span>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <span class="material-icons text-accent-danger text-sm">thermometer</span> High: 29°
      </div>
      <div class="flex items-center gap-1">
        <span class="material-icons text-blue-500 text-sm">ac_unit</span> Low: 26°
      </div>
      <div class="flex items-center gap-1">
        <span class="material-icons text-slate-400 text-sm">air</span> Wind: 39 km/h
      </div>
      <div class="flex items-center gap-1">
        <span class="material-icons text-blue-400 text-sm">water_drop</span> Humidity: 73%
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedCity = ref('colombo')

const forecast = [
  { day: 'Today', icon: 'sunny', high: 29, low: 26, rain: null },
  { day: 'Thu', icon: 'partly_cloudy_day', high: 27, low: 24, rain: 8 },
  { day: 'Fri', icon: 'rainy', high: 28, low: 25, rain: 20 },
  { day: 'Sat', icon: 'rainy', high: 27, low: 25, rain: 29 },
  { day: 'Sun', icon: 'cloud', high: 27, low: 26, rain: 27 },
  { day: 'Mon', icon: 'cloud', high: 27, low: 26, rain: 20 },
  { day: 'Tue', icon: 'partly_cloudy_day', high: 28, low: 25, rain: 23 }
]

const getWeatherIconColor = (icon: string) => {
  const map: Record<string, string> = {
    'sunny': 'text-yellow-500',
    'partly_cloudy_day': 'text-yellow-500',
    'rainy': 'text-slate-400',
    'cloud': 'text-slate-400'
  }
  return map[icon] || 'text-slate-400'
}
</script>

<style scoped>
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
