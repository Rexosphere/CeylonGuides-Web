<template>
    <div>
        <!-- Safety Assistant Panel -->
        <div
            class="rounded-2xl shadow-card border border-indigo-100 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800">
            <div class="bg-gradient-to-r from-slate-800 to-slate-900 p-5 text-white">
                <div class="flex items-center gap-2.5 mb-1.5">
                    <span class="material-icons text-indigo-300">smart_toy</span>
                    <h3 class="font-bold text-lg">Safety Assistant</h3>
                </div>
                <p class="text-xs text-slate-300">AI-powered real-time advice based on your plan.</p>
            </div>

            <div class="p-6 space-y-5 bg-indigo-50/30 dark:bg-slate-800">
                <!-- Location Input -->
                <div>
                    <label
                        class="text-xs font-semibold text-text-muted dark:text-slate-400 mb-1.5 block tracking-wide">Where
                        are you going?</label>
                    <div class="relative">
                        <span class="material-icons absolute left-3 top-2.5 text-slate-400 text-sm">place</span>
                        <select v-model="selectedLocation"
                            class="w-full pl-9 py-2 text-sm rounded-xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                            <option value="pettah">Pettah Market</option>
                            <option value="galle-face">Galle Face Green</option>
                            <option value="kandy">Kandy City Center</option>
                            <option value="colombo-fort">Fort District</option>
                        </select>
                    </div>
                </div>

                <!-- Activity Input -->
                <div>
                    <label
                        class="text-xs font-semibold text-text-muted dark:text-slate-400 mb-1.5 block tracking-wide">What
                        will you do?</label>
                    <div class="relative">
                        <span
                            class="material-icons absolute left-3 top-2.5 text-slate-400 text-sm">directions_car</span>
                        <select v-model="selectedActivity"
                            class="w-full pl-9 py-2 text-sm rounded-xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                            <option value="transport">Transportation & Taxis</option>
                            <option value="shopping">Shopping</option>
                            <option value="sightseeing">Sightseeing</option>
                            <option value="dining">Dining</option>
                        </select>
                    </div>
                </div>

                <!-- Update Button -->
                <button
                    class="w-full bg-slate-800 hover:bg-slate-900 text-white py-2.5 rounded-xl text-sm font-medium shadow-md transition flex justify-center items-center gap-2">
                    <span class="material-icons text-sm">auto_awesome</span> Update Advice
                </button>

                <hr class="border-slate-200 dark:border-slate-700 my-2" />

                <!-- Current Context -->
                <div class="flex flex-wrap gap-2 mb-4">
                    <span
                        class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-white border border-slate-200 dark:bg-slate-700 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                        <span class="material-icons text-[12px] mr-1 text-slate-400">place</span> {{
                            getLocationLabel(selectedLocation) }}
                    </span>
                    <span
                        class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-white border border-slate-200 dark:bg-slate-700 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                        <span class="material-icons text-[12px] mr-1 text-slate-400">directions_car</span> {{
                            getActivityLabel(selectedActivity) }}
                    </span>
                    <span
                        class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-900/40 text-danger">
                        HIGH RISK AREA
                    </span>
                </div>

                <!-- Top Threat -->
                <h4
                    class="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase flex items-center gap-1.5 mb-3 tracking-wide">
                    <span class="material-icons text-sm">warning</span> Top 1 Threat in This Context
                </h4>

                <div
                    class="bg-white dark:bg-slate-700/50 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-600/50">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex items-center gap-2.5">
                            <div
                                class="bg-slate-100 text-slate-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border border-slate-200">
                                #1</div>
                            <h5 class="font-bold text-sm text-slate-800 dark:text-slate-200 leading-tight">Tuk-Tuk
                                Overcharging</h5>
                        </div>
                        <span
                            class="text-[10px] bg-red-100 text-danger px-2 py-0.5 rounded font-bold border border-red-200">HIGH</span>
                    </div>

                    <div
                        class="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg text-xs mb-3 text-slate-700 dark:text-slate-300 border border-blue-100 dark:border-blue-900/30">
                        <p class="font-bold text-slate-800 dark:text-blue-300 mb-1">Why This Happens Here:</p>
                        Pettah is chaotic. Tuk-tuks prey on confused tourists exiting the market, refusing meters.
                    </div>

                    <div class="space-y-2.5">
                        <div class="flex gap-2.5 items-start">
                            <span class="material-icons text-success text-sm mt-0.5">check_circle</span>
                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-snug"><strong>Do:</strong> Walk
                                away from the main gate to hail a metered Uber/PickMe.</p>
                        </div>
                        <div class="flex gap-2.5 items-start">
                            <span class="material-icons text-danger text-sm mt-0.5">cancel</span>
                            <p class="text-xs text-slate-600 dark:text-slate-400 leading-snug"><strong>Don't:</strong>
                                Accept "tour" offers from drivers parked at the entrance.</p>
                        </div>
                    </div>

                    <div class="mt-3 relative rounded-lg overflow-hidden border border-red-200 dark:border-red-900/50">
                        <div
                            class="bg-red-50/50 dark:bg-red-950/20 p-2.5 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                            <span class="text-danger font-bold mr-1">ALERT:</span> Frequent report: "Driver claims meter
                            broken mid-journey"
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- General Tips -->
        <div
            class="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-5 border border-amber-100 dark:border-amber-900/30 mt-6">
            <div class="flex items-start gap-4">
                <div
                    class="bg-amber-100 dark:bg-amber-900/40 p-2.5 rounded-full text-amber-600 dark:text-amber-500 shrink-0">
                    <span class="material-icons text-lg">lightbulb</span>
                </div>
                <div>
                    <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1.5">General Tips for {{
                        getLocationLabel(selectedLocation) }}</h4>
                    <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Always use official transportation apps. Keep emergency number 1912 saved. Take photos of
                        suspicious license plates. Trust your instincts - if something feels wrong, walk away
                        immediately.
                    </p>
                </div>
            </div>
        </div>

        <!-- Emergency Button -->
        <button
            class="w-full bg-gradient-to-br from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 transition transform hover:scale-[1.01] border border-white/10 mt-6">
            <span class="material-icons">emergency_share</span>
            Emergency Contacts & Reporting
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedLocation = ref('pettah')
const selectedActivity = ref('transport')

const getLocationLabel = (location: string) => {
    const labels: Record<string, string> = {
        'pettah': 'Pettah Market',
        'galle-face': 'Galle Face Green',
        'kandy': 'Kandy City Center',
        'colombo-fort': 'Fort District'
    }
    return labels[location] || location
}

const getActivityLabel = (activity: string) => {
    const labels: Record<string, string> = {
        'transport': 'Transport',
        'shopping': 'Shopping',
        'sightseeing': 'Sightseeing',
        'dining': 'Dining'
    }
    return labels[activity] || activity
}
</script>
