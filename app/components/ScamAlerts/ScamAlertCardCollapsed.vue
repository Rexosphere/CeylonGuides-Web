<template>
    <div class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50 p-5 hover:shadow-card hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer group"
        @click="$emit('expand')">
        <div class="flex justify-between items-center mb-2">
            <h3 class="font-bold text-slate-800 dark:text-slate-200 group-hover:text-accent transition-colors">
                {{ scam.title }}
            </h3>
            <span class="material-icons text-slate-400 group-hover:text-slate-600">expand_more</span>
        </div>

        <span :class="[
            'inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-3 tracking-wide',
            scam.severity === 'high' || scam.severity === 'critical'
                ? 'bg-danger/10 text-danger border border-danger/20'
                : scam.severity === 'medium'
                    ? 'bg-warning/10 text-warning border border-warning/20'
                    : 'bg-success/10 text-success border border-success/20'
        ]">
            {{ scam.severity === 'critical' ? 'CRITICAL RISK' : scam.severity.toUpperCase() + ' RISK' }}
        </span>

        <p class="text-slate-500 dark:text-slate-400 text-sm line-clamp-1">
            {{ scam.description }}
        </p>

        <div v-if="scam.commonLocations && scam.commonLocations.length > 0" class="mt-3 flex gap-2">
            <span v-for="location in scam.commonLocations.slice(0, 2)" :key="location"
                class="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                {{ getLocationName(location) }}
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
}

defineProps<{
    scam: Scam
    getLocationName: (id: string) => string
}>()

defineEmits<{
    expand: []
}>()
</script>
