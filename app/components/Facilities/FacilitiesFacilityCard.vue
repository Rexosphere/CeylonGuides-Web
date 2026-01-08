<template>
    <div class="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
        @click="$emit('click')">
        <!-- Header with Icon and Rating -->
        <div class="flex justify-between items-start mb-2">
            <div class="flex gap-4">
                <!-- Icon -->
                <div :class="[
                    'w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0',
                    iconBgColor
                ]">
                    <span class="material-icons">{{ icon }}</span>
                </div>

                <!-- Name and Location Type -->
                <div>
                    <h3 class="font-bold text-gray-900 text-base group-hover:text-primary transition-colors">
                        {{ name }}
                    </h3>
                    <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <span class="material-icons text-[14px]">location_on</span>
                        {{ locationType }}
                    </div>
                </div>
            </div>

            <!-- Rating Badge -->
            <div
                class="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded text-xs font-bold text-gray-700 border border-gray-100">
                <span class="material-icons text-yellow-500 text-[14px]">star</span>
                {{ rating }}
                <span class="text-gray-400 font-normal">({{ reviewCount }})</span>
            </div>
        </div>

        <!-- Tags -->
        <div class="mt-3 flex items-center gap-3 flex-wrap">
            <!-- Price Tag -->
            <span :class="[
                'inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold border',
                isFree
                    ? 'bg-green-50 text-green-700 border-green-100'
                    : 'bg-orange-50 text-orange-700 border-orange-100'
            ]">
                <span class="material-icons text-[14px]">
                    {{ isFree ? 'check_circle' : 'payments' }}
                </span>
                {{ isFree ? 'Free' : price }}
            </span>

            <!-- Accessible Badge -->
            <span v-if="isAccessible"
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                <span class="material-icons text-[14px]">accessible</span> Accessible
            </span>

            <!-- City -->
            <span class="text-xs text-gray-500">{{ city }}</span>
        </div>

        <!-- Description -->
        <p class="mt-3 text-sm text-gray-600 line-clamp-2">
            {{ description }}
        </p>

        <!-- View Details Button -->
        <div class="mt-4 pt-3 border-t border-gray-100 flex justify-end">
            <button class="text-sm font-bold text-primary flex items-center gap-1 hover:text-primary/80">
                View Details
                <span class="material-icons text-sm transition-transform group-hover:translate-x-1">
                    arrow_forward
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    name: string
    locationType: string
    rating: number
    reviewCount: number
    isFree: boolean
    price?: string
    isAccessible?: boolean
    city: string
    description: string
    icon?: string
    colorScheme?: 'green' | 'orange' | 'blue' | 'purple'
}

const props = withDefaults(defineProps<Props>(), {
    icon: 'wc',
    colorScheme: 'green',
    isAccessible: false,
    price: 'Rs 20'
})

defineEmits<{
    click: []
}>()

const iconBgColor = computed(() => {
    const colors = {
        green: 'bg-green-500',
        orange: 'bg-orange-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500'
    }
    return colors[props.colorScheme] || colors.green
})
</script>
