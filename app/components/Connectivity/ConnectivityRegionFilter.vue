<template>
    <div class="mb-8">
        <div class="text-[10px] uppercase font-bold text-text-muted mb-3 tracking-wider">Where are you traveling?</div>
        <div class="flex flex-wrap gap-2">
            <button v-for="region in regions" :key="region.id" @click="selectRegion(region.id)" :class="[
                'px-4 py-2 border rounded-full text-xs font-medium shadow-sm transition-colors',
                selectedRegion === region.id
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-white dark:bg-card-dark border-gray-200 dark:border-gray-700 text-text-muted hover:border-secondary hover:text-secondary'
            ]">
                {{ region.name }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const regions = [
    { id: 'colombo', name: 'Colombo & Western Province' },
    { id: 'central', name: 'Central Highlands' },
    { id: 'south', name: 'Southern Coast' },
    { id: 'east', name: 'East Coast' },
    { id: 'cultural', name: 'Cultural Triangle' },
    { id: 'jaffna', name: 'Jaffna Peninsula' }
]

const selectedRegion = ref('colombo')

const selectRegion = (regionId: string) => {
    selectedRegion.value = regionId
}
</script>
