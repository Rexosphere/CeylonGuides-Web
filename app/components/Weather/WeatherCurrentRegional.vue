<template>
    <section>
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">Current Regional Weather</h2>
            <div class="flex items-center gap-4 text-xs text-slate-500">
                <span>Updated: {{ currentTime }}</span>
                <div class="flex bg-slate-200 dark:bg-slate-700 rounded p-1">
                    <button @click="unit = 'C'"
                        :class="['px-2 py-0.5 rounded transition', unit === 'C' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : '']">
                        °C
                    </button>
                    <button @click="unit = 'F'"
                        :class="['px-2 py-0.5 rounded transition', unit === 'F' ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : '']">
                        °F
                    </button>
                </div>
                <button class="hover:text-primary transition">
                    <span class="material-icons text-sm align-middle">refresh</span>
                </button>
            </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-8">
            <button v-for="region in regions" :key="region.id" @click="selectedRegion = region.id" :class="[
                'px-4 py-2 rounded-full text-xs font-medium transition',
                selectedRegion === region.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'
            ]">
                {{ region.name }}
            </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div v-for="city in cities" :key="city.name"
                class="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h5 class="font-bold text-slate-900 dark:text-white text-sm">{{ city.name }}</h5>
                        <p class="text-[10px] text-slate-500">{{ city.region }}</p>
                    </div>
                    <span :class="['material-icons', getWeatherIconColor(city.condition)]">{{
                        getWeatherIcon(city.condition) }}</span>
                </div>
                <div class="flex items-end gap-2 mb-4">
                    <span class="text-3xl font-light text-slate-900 dark:text-white">{{ city.temp }}°</span>
                    <span class="text-[10px] text-slate-500 mb-1">{{ unit }}</span>
                    <span class="text-[10px] text-slate-500 mb-1 ml-auto">{{ city.condition }}</span>
                </div>
                <div
                    class="flex justify-between text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
                    <div class="flex items-center gap-1">
                        <span class="material-icons text-[10px]">water_drop</span> {{ city.humidity }}%
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="material-icons text-[10px]">air</span> {{ city.wind }} km/h
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const unit = ref('C')
const selectedRegion = ref('all')

const currentTime = computed(() => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
})

const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'west-south', name: 'West & South' },
    { id: 'east', name: 'East Coast' },
    { id: 'hill', name: 'Hill Country' },
    { id: 'cultural', name: 'Cultural Triangle' }
]

const cities = [
    { name: 'Colombo', region: 'West Coast', temp: 28, condition: 'Partly cloudy', humidity: 69, wind: 30 },
    { name: 'Galle', region: 'South Coast', temp: 30, condition: 'Overcast', humidity: 67, wind: 5.4 },
    { name: 'Kandy', region: 'Central Hills', temp: 28, condition: 'Clear', humidity: 57, wind: 16.3 },
    { name: 'Trincomalee', region: 'East Coast', temp: 29, condition: 'Overcast', humidity: 55, wind: 17.6 },
    { name: 'Jaffna', region: 'Northern', temp: 26, condition: 'Overcast', humidity: 67, wind: 34.7 }
]

const getWeatherIcon = (condition: string) => {
    const map: Record<string, string> = {
        'Clear': 'sunny',
        'Partly cloudy': 'cloud',
        'Overcast': 'cloud_queue',
        'Cloudy': 'partly_cloudy_day'
    }
    return map[condition] || 'cloud'
}

const getWeatherIconColor = (condition: string) => {
    const map: Record<string, string> = {
        'Clear': 'text-yellow-500',
        'Partly cloudy': 'text-slate-400',
        'Overcast': 'text-slate-400',
        'Cloudy': 'text-slate-300'
    }
    return map[condition] || 'text-slate-400'
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
</style>
