<template>
    <div class="relative mb-4">
        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 material-symbols-outlined text-text-muted">
            search
        </span>
        <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-card-dark text-text-main dark:text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm shadow-sm transition-all"
            placeholder="Where in Sri Lanka? Try 'Ella', 'pool', 'beach'..." type="text" />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string | null
}>()

defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>
