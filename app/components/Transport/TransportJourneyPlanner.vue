<template>
    <div
        class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 h-full">
        <div class="flex items-center gap-3 mb-6">
            <div class="text-primary">
                <span class="material-symbols-outlined text-3xl">alt_route</span>
            </div>
            <div>
                <h2 class="text-lg font-bold text-slate-900 dark:text-white leading-tight">Plan Your Journey</h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Calculate fair rates for any trip</p>
            </div>
        </div>

        <form class="space-y-5" @submit.prevent="handleSubmit">
            <!-- Origin Input -->
            <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Origin</label>
                <div class="relative group">
                    <input v-model="origin"
                        class="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-slate-800 dark:text-slate-200 placeholder-slate-400"
                        placeholder="Enter pickup location" type="text" />
                    <span v-if="origin"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-primary material-symbols-outlined text-lg">
                        check_circle
                    </span>
                </div>
            </div>

            <!-- Swap Button -->
            <div class="flex justify-center -my-3 relative z-10">
                <button @click="handleSwap"
                    class="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full p-1.5 text-slate-400 hover:text-primary hover:border-primary transition shadow-sm"
                    type="button">
                    <span class="material-symbols-outlined text-lg">swap_vert</span>
                </button>
            </div>

            <!-- Destination Input -->
            <div class="space-y-1.5">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Destination</label>
                <div class="relative group">
                    <input v-model="destination"
                        class="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-slate-800 dark:text-slate-200 placeholder-slate-400"
                        placeholder="Enter destination" type="text" />
                    <span v-if="destination"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-primary material-symbols-outlined text-lg">
                        check_circle
                    </span>
                </div>
            </div>

            <!-- Transport Mode -->
            <div class="pt-2 space-y-2">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Transport Mode</label>
                <div class="grid grid-cols-4 gap-3">
                    <button v-for="mode in transportModes" :key="mode.id" @click="selectedMode = mode.id"
                        :class="selectedMode === mode.id ? 'border-2 border-primary bg-primary/5 text-primary' : 'border border-slate-200 dark:border-slate-700 hover:border-primary/40 text-slate-500 hover:text-primary bg-white dark:bg-slate-800/50'"
                        class="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all shadow-sm"
                        type="button">
                        <span class="material-symbols-outlined text-xl">{{ mode.icon }}</span>
                        <span class="text-[9px] font-bold uppercase tracking-wide">{{ mode.label }}</span>
                    </button>
                </div>
            </div>

            <!-- Rate Structure -->
            <div
                class="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 border border-slate-100 dark:border-slate-700/50">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rate Structure</span>
                    <span @click="showCustomize = !showCustomize"
                        class="text-[10px] text-primary font-semibold cursor-pointer hover:underline">
                        {{ showCustomize ? 'Hide' : 'Customize' }}
                    </span>
                </div>

                <div class="flex gap-4">
                    <div class="flex-1">
                        <label class="text-[9px] text-slate-400 block mb-1 font-medium">Base (1st km)</label>
                        <div class="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                            Rs.
                            <input v-model.number="baseRate"
                                class="w-12 ml-1 p-0 bg-transparent border-0 border-b border-slate-300 focus:ring-0 text-sm font-bold text-center text-slate-900 dark:text-white"
                                type="number" :disabled="!showCustomize" />
                        </div>
                    </div>
                    <div class="flex-1 border-l border-slate-200 dark:border-slate-700 pl-4">
                        <label class="text-[9px] text-slate-400 block mb-1 font-medium">Per km</label>
                        <div class="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                            Rs.
                            <input v-model.number="perKmRate"
                                class="w-12 ml-1 p-0 bg-transparent border-0 border-b border-slate-300 focus:ring-0 text-sm font-bold text-center text-slate-900 dark:text-white"
                                type="number" :disabled="!showCustomize" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit Button -->
            <button
                class="w-full bg-[#115e59] hover:bg-[#0f766e] text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
                type="submit">
                <span class="material-symbols-outlined text-[20px]">search</span>
                Find Best Route
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const origin = ref('Bandaranaike Intl Airport')
const destination = ref('Colombo Fort')
const selectedMode = ref('tuktuk')
const baseRate = ref(100)
const perKmRate = ref(60)
const showCustomize = ref(false)

const transportModes = [
    { id: 'tuktuk', icon: 'electric_rickshaw', label: 'Tuk-Tuk' },
    { id: 'taxi', icon: 'local_taxi', label: 'Taxi' },
    { id: 'bus', icon: 'directions_bus', label: 'Bus' },
    { id: 'train', icon: 'train', label: 'Train' }
]

const emit = defineEmits(['search', 'swap'])

const handleSubmit = () => {
    emit('search', {
        origin: origin.value,
        destination: destination.value,
        mode: selectedMode.value,
        baseRate: baseRate.value,
        perKmRate: perKmRate.value
    })
}

const handleSwap = () => {
    const temp = origin.value
    origin.value = destination.value
    destination.value = temp
    emit('swap')
}
</script>
