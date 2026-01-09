<template>
    <section>
        <div
            class="bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-stone-neutral dark:border-gray-700 p-8">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h2 class="text-2xl font-bold text-deep-charcoal dark:text-white mb-2">Stay Longer?</h2>
                    <p class="text-slate-500 dark:text-slate-400 text-sm">Estimate visa extension fees based on your
                        duration.</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6">
                    <div>
                        <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">My
                            Nationality</label>
                        <div
                            class="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3">
                            <span class="material-symbols-outlined text-slate-400 mr-2">public</span>
                            <span class="text-gray-900 dark:text-white font-medium">{{ nationality || 'India' }}</span>
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between items-end mb-4">
                            <div>
                                <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Stay
                                    Duration</p>
                            </div>
                            <div class="text-right">
                                <span class="text-3xl font-bold text-primary">{{ stayDuration }}</span>
                                <span class="text-sm font-medium text-slate-500 dark:text-slate-400">Days</span>
                            </div>
                        </div>

                        <input v-model.number="stayDuration"
                            class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                            max="270" min="30" type="range" />

                        <div class="flex justify-between text-xs text-slate-400 mt-2">
                            <span>30 Days (ETA)</span>
                            <span>270 Days (Max)</span>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <p class="text-deep-charcoal dark:text-white font-bold text-lg">{{ extensionRequired }}</p>
                            <p class="text-slate-500 dark:text-slate-400 text-xs">{{ bracket }}</p>
                        </div>
                        <span
                            class="bg-stone-200 dark:bg-stone-700 text-deep-charcoal dark:text-white text-sm font-bold px-3 py-1 rounded-full">
                            {{ fee }}
                        </span>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-start">
                            <span
                                class="material-symbols-outlined text-primary text-sm mr-3 mt-0.5">calendar_today</span>
                            <div>
                                <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Action</p>
                                <p class="text-deep-charcoal dark:text-white text-sm">Apply before Day 30</p>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <span class="material-symbols-outlined text-primary text-sm mr-3 mt-0.5">attach_money</span>
                            <div>
                                <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Est. Fee</p>
                                <p class="text-deep-charcoal dark:text-white text-sm">{{ fee }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="mt-8 bg-muted-crimson/20 dark:bg-red-900/20 rounded-xl p-4 flex items-start border border-muted-crimson/30 dark:border-red-900/30">
                <span
                    class="material-symbols-outlined text-muted-crimson-text dark:text-red-400 mr-3 mt-0.5">warning_amber</span>
                <div>
                    <p class="font-semibold text-muted-crimson-text dark:text-red-400 text-sm">Overstay Penalties</p>
                    <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">
                        Stays exceeding visa validity without extension incur fines:
                        <span class="font-semibold">$250</span> (7-14 days overdue) or
                        <span class="font-semibold">$500</span> (14+ days overdue) plus visa fees.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{
    nationality?: string
}>()

const stayDuration = ref(130)

const extensionRequired = computed(() => {
    if (stayDuration.value <= 30) return 'No Extension Required'
    return 'Extension Required'
})

const bracket = computed(() => {
    if (stayDuration.value <= 30) return 'ETA Period'
    if (stayDuration.value <= 90) return 'Bracket: 31-90 Days'
    if (stayDuration.value <= 180) return 'Bracket: 91-180 Days'
    return 'Bracket: 181-270 Days'
})

const fee = computed(() => {
    if (stayDuration.value <= 30) return '$0'
    if (stayDuration.value <= 90) return '$100 USD'
    if (stayDuration.value <= 180) return '$150 USD'
    return '$200 USD'
})
</script>
