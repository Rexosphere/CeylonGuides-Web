<template>
    <div
        class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-slate-200 dark:border-slate-700/50 overflow-hidden group">
        <div class="p-6">
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
                <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    {{ scam.title }}
                </h2>
                <button
                    class="material-icons text-slate-400 group-hover:text-slate-600 transition-colors cursor-pointer p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    @click="$emit('collapse')">
                    expand_less
                </button>
            </div>

            <!-- Severity Badge -->
            <span
                class="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-danger/10 text-danger border border-danger/20 mb-5 tracking-wide">
                <span class="material-icons text-[12px] mr-1">warning</span> {{ scam.severity.toUpperCase() }}
                RISK
            </span>

            <!-- Description -->
            <p class="text-text-main dark:text-slate-300 text-sm mb-5 leading-relaxed">
                {{ scam.description }}
            </p>

            <!-- Location Chips -->
            <div v-if="scam.commonLocations && scam.commonLocations.length > 0" class="flex flex-wrap gap-2 mb-6">
                <span v-for="location in scam.commonLocations.slice(0, 3)" :key="location"
                    class="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 flex items-center">
                    <span class="material-icons text-[12px] mr-1 text-slate-500">place</span> {{
                    getLocationName(location) }}
                </span>
            </div>

            <!-- Real Examples -->
            <div v-if="scam.realExamples && scam.realExamples.length > 0"
                class="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-5 mb-5 border border-amber-100 dark:border-amber-900/40">
                <h3
                    class="text-xs font-bold uppercase text-amber-800 dark:text-amber-500 mb-3 flex items-center gap-1.5 tracking-wide">
                    <span class="material-icons text-sm">feedback</span> Real Examples:
                </h3>
                <ul class="space-y-2">
                    <li v-for="(example, index) in scam.realExamples" :key="index"
                        class="text-sm text-amber-900 dark:text-amber-100/90 italic bg-amber-100/50 dark:bg-amber-900/30 px-3 py-2 rounded-lg border border-amber-100/50 dark:border-amber-900/30">
                        "{{ example }}"
                    </li>
                </ul>
            </div>

            <!-- Prevention Tips -->
            <div v-if="scam.preventionTips && scam.preventionTips.length > 0"
                class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 mb-5 border border-slate-200 dark:border-slate-700/50">
                <h3
                    class="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5 tracking-wide">
                    <span class="material-icons text-sm text-slate-500">shield</span> Prevention (Critical):
                </h3>
                <ul class="text-sm text-text-main dark:text-slate-400 space-y-2 list-disc list-inside">
                    <li v-for="(tip, index) in scam.preventionTips" :key="index">
                        {{ tip }}
                    </li>
                </ul>
            </div>

            <!-- If You're Confronted -->
            <div class="border border-danger/30 rounded-xl p-5 mb-5 bg-red-50/40 dark:bg-red-950/10">
                <h3 class="text-xs font-bold uppercase text-danger mb-3 flex items-center gap-1.5 tracking-wide">
                    <span class="material-icons text-sm">back_hand</span> If You're Confronted:
                </h3>
                <div class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <p><strong class="text-danger font-bold">Stay Calm:</strong> Don't panic or show fear. Remain polite
                        but firm.</p>
                    <p><strong class="text-danger font-bold">Refuse Firmly:</strong> Say "No thank you" clearly and walk
                        away.</p>
                    <p><strong class="text-danger font-bold">Report Immediately:</strong> Contact tourist police if
                        threatened.</p>
                </div>
            </div>

            <!-- Report This Scam -->
            <div
                class="border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 bg-slate-50/50 dark:bg-slate-800/20">
                <h3 class="text-xs font-bold uppercase text-secondary mb-3 flex items-center gap-1.5 tracking-wide">
                    <span class="material-icons text-sm">phone_in_talk</span> Report This Scam:
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                        class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                        <div class="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                            <span class="material-icons">local_police</span>
                        </div>
                        <div>
                            <div class="text-[10px] uppercase text-slate-500 font-bold tracking-wide">Tourist Police
                            </div>
                            <div class="text-lg font-bold text-slate-800 dark:text-white">1912</div>
                        </div>
                    </div>
                    <div
                        class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                        <div class="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-red-600 dark:text-red-400">
                            <span class="material-icons">emergency</span>
                        </div>
                        <div>
                            <div class="text-[10px] uppercase text-slate-500 font-bold tracking-wide">Emergency</div>
                            <div class="text-lg font-bold text-slate-800 dark:text-white">119</div>
                        </div>
                    </div>
                    <div
                        class="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                        <div class="bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg text-slate-500">
                            <span class="material-icons">account_balance</span>
                        </div>
                        <div>
                            <div class="text-[10px] uppercase text-slate-500 font-bold tracking-wide">Embassy</div>
                            <a class="text-sm font-bold text-secondary hover:text-slate-800 hover:underline transition"
                                href="#">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer with Tags -->
        <div
            class="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-t border-slate-200 dark:border-slate-700/50 flex items-center gap-4 text-xs">
            <span class="text-slate-400 font-medium flex items-center gap-1.5">
                <span class="material-icons text-sm">tag</span> Tags:
            </span>
            <span v-for="tag in scam.tags" :key="tag"
                class="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-md font-medium">
                {{ tag }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Scam {
    id: string
    title: string
    severity: string
    description: string
    commonLocations: string[]
    realExamples?: string[]
    preventionTips?: string[]
    tags?: string[]
}

defineProps<{
    scam: Scam
    getLocationName: (id: string) => string
}>()

defineEmits<{
    collapse: []
}>()
</script>
