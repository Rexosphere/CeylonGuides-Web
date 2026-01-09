<template>
    <div
        class="sticky top-0 z-40 bg-white dark:bg-surface-dark border-b border-border-light dark:border-border-dark shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
                class="flex space-x-8 overflow-x-auto py-4 scrollbar-hide text-sm font-medium text-gray-500 dark:text-gray-400">
                <a v-for="(item, index) in navItems" :key="item.id" :href="`#${item.id}`"
                    class="flex items-center gap-2 transition-colors whitespace-nowrap"
                    :class="index === 0 ? 'text-primary border-b-2 border-primary pb-3.5 -mb-4' : 'hover:text-charcoal dark:hover:text-white'">
                    <span class="material-icons text-lg">{{ item.icon }}</span> {{ item.label }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const navItems = [
    { id: 'checklist', label: 'Checklist', icon: 'checklist' },
    { id: 'dress-code', label: 'Dress Code', icon: 'checkroom' },
    { id: 'photography', label: 'Photography', icon: 'camera_alt' },
    { id: 'dos-donts', label: "Do's & Don'ts", icon: 'thumb_up_off_alt' },
    { id: 'festivals', label: 'Festivals', icon: 'celebration' },
]
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
