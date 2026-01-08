<template>
    <div class="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
        <button @click="$emit('update:modelValue', null)"
            :class="modelValue === null ? 'bg-primary text-white' : 'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'"
            class="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium shadow-sm transition-colors">
            All
        </button>

        <button v-for="category in categories" :key="category.value" @click="$emit('update:modelValue', category.value)"
            :class="modelValue === category.value ? 'bg-primary text-white' : 'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'"
            class="whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">{{ category.icon }}</span>
            {{ category.label }}
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string | null
}>()

defineEmits<{
    'update:modelValue': [value: string | null]
}>()

const categories = [
    { value: 'Boutique', label: 'Boutique', icon: 'storefront' },
    { value: 'Guesthouse', label: 'Guesthouse', icon: 'home' },
    { value: 'Hotel', label: 'Hotel', icon: 'hotel' },
    { value: 'Resort', label: 'Resort', icon: 'deck' },
    { value: 'Villa', label: 'Villa', icon: 'villa' },
    { value: 'Homestay', label: 'Homestay', icon: 'cottage' }
]
</script>
