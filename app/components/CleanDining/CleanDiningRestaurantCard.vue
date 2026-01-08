<template>
    <div
        class="bg-white dark:bg-card-dark rounded-xl shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row group hover:shadow-card transition-shadow duration-300">
        <!-- Restaurant Image -->
        <div class="md:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden">
            <img :alt="restaurant.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                :src="restaurant.imageUrl" />
            <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                :class="gradeColor">
                <span class="material-symbols-outlined text-sm">verified</span> {{ restaurant.grade }}
            </div>
        </div>

        <!-- Restaurant Details -->
        <div class="p-6 flex flex-col flex-grow">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h3 class="text-xl font-display font-bold text-primary dark:text-white mb-1">
                        {{ restaurant.name }}
                    </h3>
                    <div class="flex items-center gap-1 text-xs text-text-muted">
                        <span class="material-icons text-sm text-secondary">place</span> {{ restaurant.location }}
                    </div>
                </div>
                <!-- Star Rating -->
                <div class="flex gap-1">
                    <span v-for="n in 5" :key="n" class="material-icons text-sm"
                        :class="n <= restaurant.rating ? 'text-secondary' : 'text-gray-300'">
                        star
                    </span>
                </div>
            </div>

            <!-- Description -->
            <p class="text-sm text-text-muted dark:text-gray-400 line-clamp-2 mb-4">
                {{ restaurant.description }}
            </p>

            <!-- Tags & Action -->
            <div class="mt-auto flex items-center justify-between">
                <div class="flex flex-wrap gap-2">
                    <span v-for="tag in restaurant.tags" :key="tag"
                        class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-text-muted text-[10px] font-bold uppercase rounded">
                        {{ tag }}
                    </span>
                </div>
                <button @click="$emit('viewDetails')"
                    class="text-secondary hover:text-primary text-xs font-bold uppercase flex items-center gap-1 transition-colors">
                    View Details <span class="material-icons text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Restaurant {
    name: string
    location: string
    rating: number
    description: string
    imageUrl: string
    grade: string
    tags: string[]
}

interface Props {
    restaurant: Restaurant
}

const props = defineProps<Props>()

defineEmits<{
    'viewDetails': []
}>()

const gradeColor = computed(() => {
    switch (props.restaurant.grade) {
        case 'Grade A':
            return 'text-secondary'
        case 'Grade B':
            return 'text-yellow-600'
        case 'Safe & Secure':
            return 'text-secondary'
        default:
            return 'text-gray-600'
    }
})
</script>
