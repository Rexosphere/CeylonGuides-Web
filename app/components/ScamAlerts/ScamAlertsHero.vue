<template>
    <div class="relative bg-primary text-white pt-16 pb-20 overflow-hidden">
        <div
            class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546521677-b3f9b23b3634?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none">
        </div>
        <div
            class="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/95 to-background-light dark:to-background-dark pointer-events-none">
        </div>
        <div class="mx-auto w-full max-w-7xl px-4 lg:px-6 relative z-10 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-lg font-sans">
                Scam Alerts
            </h1>
            <p class="text-slate-300 text-lg max-w-2xl mx-auto mb-8 font-light drop-shadow-md">
                Stay informed and travel safely with real-time updates on potential risks.
            </p>
            <div class="flex justify-center gap-4 mb-10 flex-wrap">
                <div
                    class="bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex flex-col items-center min-w-[120px] shadow-lg">
                    <span class="text-3xl font-bold text-white">{{ stats.total }}</span>
                    <span class="text-[10px] uppercase tracking-wider text-slate-300 mt-1 font-medium">Active
                        Scams</span>
                </div>
                <div
                    class="bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-danger/30 flex flex-col items-center min-w-[120px] shadow-lg">
                    <span class="text-3xl font-bold text-red-400">{{ stats.high }}</span>
                    <span class="text-[10px] uppercase tracking-wider text-red-200 mt-1 font-medium">High Risk</span>
                </div>
                <div
                    class="bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex flex-col items-center min-w-[120px] shadow-lg">
                    <span class="text-3xl font-bold text-white">{{ stats.locations }}</span>
                    <span class="text-[10px] uppercase tracking-wider text-slate-300 mt-1 font-medium">Hotspots</span>
                </div>
            </div>
            <button
                class="bg-danger hover:bg-rose-700 text-white font-medium px-8 py-3 rounded-full shadow-md shadow-red-900/20 flex items-center gap-2 mx-auto transition transform hover:-translate-y-0.5 border border-red-500/20"
                @click="$emit('report')">
                <span class="material-icons">report_problem</span>
                Report a Scam
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Stats {
    total: number
    high: number
    locations: number
}

defineProps<{
    stats: Stats
}>()

defineEmits<{
    report: []
}>()
</script>
