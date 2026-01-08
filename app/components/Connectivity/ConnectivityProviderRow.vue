<template>
    <div class="p-6 md:p-4 flex flex-col md:flex-row items-start md:items-center border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
        :class="{ 'border-b-0': isLast }">
        <!-- Provider Info -->
        <div class="w-full md:w-1/4 flex items-center gap-4 mb-4 md:mb-0">
            <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg',
                `bg-${provider.color}/10 text-${provider.color}`
            ]">
                {{ provider.initial }}
            </div>
            <div>
                <h4 class="font-bold text-primary dark:text-white text-sm">{{ provider.name }}</h4>
                <span class="text-[10px] text-text-muted">{{ provider.type }}</span>
            </div>
        </div>

        <!-- Coverage -->
        <div class="w-full md:w-1/4 mb-4 md:mb-0">
            <div class="flex gap-0.5 text-primary items-end h-4">
                <div v-for="i in 5" :key="i" :class="[
                    'w-1 rounded-sm',
                    i <= provider.coverage ? 'bg-primary' : 'bg-gray-300'
                ]" :style="{ height: `${(i * 20)}%` }"></div>
                <span class="text-[10px] ml-2 text-text-muted font-medium">({{ provider.coverage }}/5)</span>
            </div>
        </div>

        <!-- Speed -->
        <div class="w-full md:w-1/6 mb-2 md:mb-0 flex items-center gap-1">
            <div class="flex gap-0.5 text-secondary">
                <span v-for="i in 5" :key="i" class="material-icons text-sm"
                    :class="i <= provider.speed ? 'text-secondary' : 'text-gray-300'">
                    bolt
                </span>
            </div>
            <span class="text-[10px] text-text-muted">({{ provider.speed }}/5)</span>
        </div>

        <!-- eSIM -->
        <div class="w-full md:w-1/6 mb-4 md:mb-0">
            <span v-if="provider.esim"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-secondary/10 text-secondary">
                <span class="material-icons text-[10px]">check_circle</span> Available
            </span>
            <span v-else
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-500">
                Not Available
            </span>
        </div>

        <!-- Best Value -->
        <div class="w-full md:w-1/6 md:text-left text-sm font-medium">
            <div v-if="provider.pricePerGB" class="text-xs font-bold text-primary">From ${{ provider.pricePerGB }}</div>
            <div v-else class="text-xs font-bold text-text-muted">N/A</div>
            <div class="text-[10px] text-text-muted">per GB</div>
        </div>

        <!-- Compare Checkbox -->
        <div class="w-full md:w-12 md:text-center mt-2 md:mt-0">
            <input class="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
        </div>
    </div>
</template>

<script setup lang="ts">
interface Provider {
    id: string
    name: string
    initial: string
    color: string
    type: string
    coverage: number
    speed: number
    esim: boolean
    pricePerGB: number | null
}

defineProps<{
    provider: Provider
    isLast?: boolean
}>()
</script>
