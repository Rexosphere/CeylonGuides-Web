<template>
    <section
        class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Interactive Planner</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-10 text-sm">Tap a month to see what to expect and find the
            perfect window for your trip.</p>

        <!-- Best Right Now Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
            <div
                class="p-6 border border-slate-100 dark:border-slate-700 rounded-2xl bg-surface-light dark:bg-surface-dark relative hover:shadow-md transition">
                <div class="text-[10px] font-bold text-accent-danger uppercase mb-2">Best Right Now</div>
                <div class="flex justify-between items-start">
                    <h4 class="font-bold text-lg text-slate-900 dark:text-white">West & South</h4>
                    <span class="material-icons text-primary">arrow_forward</span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-4">Sunny skies & calm seas. Perfect for
                    beaches and whales.</p>
                <div class="flex gap-2 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                    <span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">Galle</span>
                    <span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">Mirissa</span>
                    <span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">Hikkaduwa</span>
                </div>
            </div>
            <div
                class="p-6 border border-slate-100 dark:border-slate-700 rounded-2xl bg-surface-light dark:bg-surface-dark relative hover:shadow-md transition">
                <div class="text-[10px] font-bold text-accent-danger uppercase mb-2">Best Right Now</div>
                <div class="flex justify-between items-start">
                    <h4 class="font-bold text-lg text-slate-900 dark:text-white">Hill Country</h4>
                    <span class="material-icons text-primary">arrow_forward</span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-4">Drier and cooler. Ideal for hiking and
                    tea trails.</p>
                <div class="flex gap-2 text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                    <span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">Ella</span>
                    <span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">Nuwara Eliya</span>
                </div>
            </div>
        </div>

        <!-- Region Filter Buttons -->
        <div class="overflow-x-auto">
            <div class="min-w-[800px]">
                <div class="flex justify-center gap-2 mb-8">
                    <button v-for="region in regions" :key="region.id" @click="selectedRegion = region.id" :class="[
                        'px-4 py-1.5 rounded-full text-xs font-medium transition',
                        selectedRegion === region.id
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    ]">
                        {{ region.name }}
                    </button>
                </div>

                <!-- Month Headers -->
                <div
                    class="grid grid-cols-[120px_repeat(12,1fr)] gap-1 mb-4 text-[10px] font-bold text-slate-400 uppercase text-center">
                    <div class="text-left"></div>
                    <div :class="['border rounded-full px-1', currentMonth === 0 ? 'border-primary text-primary' : '']">
                        Jan</div>
                    <div :class="['border rounded-full px-1', currentMonth === 1 ? 'border-primary text-primary' : '']">
                        Feb</div>
                    <div :class="['border rounded-full px-1', currentMonth === 2 ? 'border-primary text-primary' : '']">
                        Mar</div>
                    <div :class="['border rounded-full px-1', currentMonth === 3 ? 'border-primary text-primary' : '']">
                        Apr</div>
                    <div :class="['border rounded-full px-1', currentMonth === 4 ? 'border-primary text-primary' : '']">
                        May</div>
                    <div :class="['border rounded-full px-1', currentMonth === 5 ? 'border-primary text-primary' : '']">
                        Jun</div>
                    <div :class="['border rounded-full px-1', currentMonth === 6 ? 'border-primary text-primary' : '']">
                        Jul</div>
                    <div :class="['border rounded-full px-1', currentMonth === 7 ? 'border-primary text-primary' : '']">
                        Aug</div>
                    <div :class="['border rounded-full px-1', currentMonth === 8 ? 'border-primary text-primary' : '']">
                        Sep</div>
                    <div :class="['border rounded-full px-1', currentMonth === 9 ? 'border-primary text-primary' : '']">
                        Oct</div>
                    <div
                        :class="['border rounded-full px-1', currentMonth === 10 ? 'border-primary text-primary' : '']">
                        Nov</div>
                    <div
                        :class="['border rounded-full px-1', currentMonth === 11 ? 'border-primary text-primary' : '']">
                        Dec</div>
                </div>

                <!-- South Coast Timeline -->
                <div class="grid grid-cols-[120px_repeat(12,1fr)] gap-1 mb-2 items-center text-xs">
                    <div class="font-bold text-slate-800 dark:text-slate-200 text-left">South Coast</div>
                    <div
                        class="col-span-3 bg-primary text-white text-[10px] flex items-center justify-center rounded h-8 font-medium">
                        Peak</div>
                    <div class="bg-primary/50 text-white text-[10px] flex items-center justify-center rounded h-8">
                    </div>
                    <div
                        class="col-span-4 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] flex items-center justify-center rounded h-8">
                        Monsoon</div>
                    <div
                        class="col-span-2 bg-primary/50 text-white text-[10px] flex items-center justify-center rounded h-8">
                    </div>
                    <div
                        class="col-span-2 bg-primary text-white text-[10px] flex items-center justify-center rounded h-8 font-medium">
                        Peak</div>
                </div>

                <!-- East Coast Timeline -->
                <div class="grid grid-cols-[120px_repeat(12,1fr)] gap-1 mb-2 items-center text-xs">
                    <div class="font-bold text-slate-800 dark:text-slate-200 text-left">East Coast</div>
                    <div
                        class="col-span-2 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] flex items-center justify-center rounded h-8">
                        Rain</div>
                    <div
                        class="col-span-2 bg-primary/50 text-white text-[10px] flex items-center justify-center rounded h-8">
                    </div>
                    <div
                        class="col-span-5 bg-primary text-white text-[10px] flex items-center justify-center rounded h-8 font-medium">
                        Best Time</div>
                    <div
                        class="col-span-3 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] flex items-center justify-center rounded h-8">
                        Rain</div>
                </div>

                <!-- Hill Country Timeline -->
                <div class="grid grid-cols-[120px_repeat(12,1fr)] gap-1 mb-6 items-center text-xs">
                    <div class="font-bold text-slate-800 dark:text-slate-200 text-left">Hill Country</div>
                    <div
                        class="col-span-3 bg-primary text-white text-[10px] flex items-center justify-center rounded h-8 font-medium">
                        Dry</div>
                    <div
                        class="col-span-6 bg-primary/40 text-white text-[10px] flex items-center justify-center rounded h-8">
                        Changeable</div>
                    <div
                        class="col-span-3 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] flex items-center justify-center rounded h-8">
                        Wet</div>
                </div>
            </div>
        </div>

        <!-- Current Month Summary -->
        <div
            class="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left border border-slate-100 dark:border-slate-800">
            <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-100 dark:bg-slate-700 rounded-full text-blue-600 dark:text-blue-300">
                    <span class="material-icons">thumb_up</span>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white">Jan: <span class="text-primary">Good
                            Season</span></h4>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">Sri Lanka is a year-round destination.
                    </p>
                    <div class="flex flex-wrap items-center gap-2 text-xs">
                        <span class="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                            <span class="material-icons text-sm">public</span> Best destinations in Jan:
                        </span>
                        <span
                            class="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded border border-red-100 dark:border-red-900/30">Galle</span>
                        <span
                            class="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded border border-red-100 dark:border-red-900/30">Mirissa</span>
                        <span
                            class="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded border border-red-100 dark:border-red-900/30">Hikkaduwa</span>
                    </div>
                </div>
            </div>
            <button
                class="bg-primary hover:bg-teal-700 text-white px-6 py-3 rounded-full font-bold text-sm shadow-md transition flex items-center gap-2 whitespace-nowrap">
                <span class="material-icons text-lg">travel_explore</span> Plan with These Conditions
            </button>
        </div>
        <p class="text-[10px] text-slate-400 mt-6">Click above to get suggested dates for All Regions.</p>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedRegion = ref('all')
const currentMonth = new Date().getMonth()

const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'west-south', name: 'West & South' },
    { id: 'east', name: 'East Coast' },
    { id: 'hill', name: 'Hill Country' }
]
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
