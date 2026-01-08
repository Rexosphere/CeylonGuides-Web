<template>
    <div
        class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800">
        <h3
            class="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            <span class="material-symbols-outlined text-primary text-base">trending_up</span>
            Popular Routes
        </h3>

        <div class="space-y-3">
            <div v-for="route in routes" :key="route.id" @click="$emit('select-route', route)"
                class="p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-primary/20 hover:bg-white dark:hover:bg-slate-800 transition cursor-pointer flex items-center gap-3 group">
                <div class="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm group-hover:scale-105 transition-transform"
                    :class="route.iconColor">
                    <span class="material-symbols-outlined text-xl">{{ route.icon }}</span>
                </div>
                <div>
                    <h4
                        class="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">
                        {{ route.title }}
                    </h4>
                    <p class="text-[10px] text-slate-500 font-medium">{{ route.subtitle }}</p>
                </div>
                <span
                    class="ml-auto material-symbols-outlined text-slate-300 group-hover:text-primary text-lg transition-colors">
                    chevron_right
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const routes = [
    {
        id: 1,
        icon: 'flight_takeoff',
        iconColor: 'text-primary',
        title: 'Airport Transfer',
        subtitle: 'CMB to Colombo Fort • 45m'
    },
    {
        id: 2,
        icon: 'landscape',
        iconColor: 'text-amber-600',
        title: 'Scenic Train',
        subtitle: 'Colombo to Ella • 9h'
    },
    {
        id: 3,
        icon: 'directions_bus',
        iconColor: 'text-blue-500',
        title: 'Express Bus',
        subtitle: 'Colombo to Kandy • 3h'
    }
]

defineEmits(['select-route'])
</script>
