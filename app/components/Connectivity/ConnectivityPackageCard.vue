<template>
    <div
        class="bg-white dark:bg-card-dark rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-card transition-all flex flex-col">
        <!-- Header -->
        <div :class="[
            'p-2.5 flex justify-between items-center text-white',
            headerColorClass
        ]">
            <span class="font-bold text-xs">{{ plan.provider }}</span>
            <span class="text-[10px] flex items-center gap-1 font-medium bg-white/10 px-2 py-0.5 rounded">
                <span class="material-icons text-[12px]">{{ plan.categoryIcon }}</span> {{ plan.category }}
            </span>
        </div>

        <!-- Content -->
        <div class="p-5 flex-grow">
            <!-- Title and Price -->
            <div class="flex justify-between items-start mb-4">
                <h3 class="font-bold text-primary dark:text-white">{{ plan.name }}</h3>
                <div class="text-right">
                    <span class="block font-bold text-xl text-primary">${{ plan.priceUSD }}</span>
                    <span class="text-[10px] text-text-muted">Rs. {{ plan.priceLKR }}</span>
                </div>
            </div>

            <!-- Data and Validity -->
            <div class="flex gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div class="flex items-center gap-2">
                    <span class="material-icons text-secondary text-lg">data_usage</span>
                    <div>
                        <div class="font-bold text-sm text-primary dark:text-white">{{ plan.data }}</div>
                        <div class="text-[10px] text-text-muted">Data</div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-icons text-secondary text-lg">calendar_today</span>
                    <div>
                        <div class="font-bold text-sm text-primary dark:text-white">{{ plan.validity }}</div>
                        <div class="text-[10px] text-text-muted">Validity</div>
                    </div>
                </div>
            </div>

            <!-- Features -->
            <div class="space-y-2 mb-6">
                <div v-for="(feature, index) in plan.features" :key="index"
                    class="flex items-center gap-2 text-xs text-text-muted">
                    <span class="material-icons text-secondary text-[12px]">check</span> {{ feature }}
                </div>
                <div class="flex gap-2 flex-wrap pt-1">
                    <span v-for="(tag, index) in plan.tags" :key="index"
                        class="text-[9px] px-2 py-1 bg-background-light dark:bg-gray-800 text-secondary rounded font-medium border border-gray-200 dark:border-gray-700">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="p-5 pt-0 flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
                <input class="rounded border-gray-300 text-primary focus:ring-primary h-3 w-3" type="checkbox" />
                <span class="text-xs text-text-muted hover:text-primary transition-colors">Compare</span>
            </label>
            <button
                class="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg text-xs font-bold transition-all shadow-sm">
                Select
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Plan {
    id: string
    provider: string
    name: string
    category: string
    categoryIcon: string
    priceUSD: number
    priceLKR: number
    data: string
    validity: string
    features: string[]
    tags: string[]
    headerColor: string
}

const props = defineProps<{
    plan: Plan
}>()

const headerColorClass = computed(() => {
    const colorMap: Record<string, string> = {
        'accent-info': 'bg-accent-info',
        'secondary': 'bg-secondary',
        'primary': 'bg-primary'
    }
    return colorMap[props.plan.headerColor] || 'bg-accent-info'
})
</script>
