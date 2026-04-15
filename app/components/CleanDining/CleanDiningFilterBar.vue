<template>
    <section
        class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 dark:bg-card-dark/95 shadow-sm">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
                <!-- Search Input -->
                <div class="relative flex-grow max-w-xl">
                    <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input :value="searchQuery"
                        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
                        class="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                        placeholder="Search by name, cuisine, city, or features..." type="text" />
                </div>

                <!-- Filter Buttons -->
                <div class="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                    <button @click="$emit('clearFilters')"
                        class="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium whitespace-nowrap shadow-sm hover:bg-primary/90 transition-colors">
                        <span class="material-symbols-outlined text-lg">restaurant</span> All
                    </button>
                    <button @click="$emit('toggleFilter', 'safe')" :class="[
                        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                        activeFilters.includes('safe')
                            ? 'bg-secondary text-white'
                            : 'bg-white border border-gray-200 text-text-main hover:border-secondary hover:text-secondary'
                    ]">
                        <span class="material-symbols-outlined text-lg">verified_user</span> Safe &amp; Secure
                    </button>
                    <button @click="$emit('toggleFilter', 'vegetarian')" :class="[
                        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                        activeFilters.includes('vegetarian')
                            ? 'bg-secondary text-white'
                            : 'bg-white border border-gray-200 text-text-main hover:border-secondary hover:text-secondary'
                    ]">
                        <span class="material-symbols-outlined text-lg">spa</span> Vegetarian
                    </button>
                    <button @click="$emit('toggleFilter', 'vegan')" :class="[
                        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                        activeFilters.includes('vegan')
                            ? 'bg-secondary text-white'
                            : 'bg-white border border-gray-200 text-text-main hover:border-secondary hover:text-secondary'
                    ]">
                        <span class="material-symbols-outlined text-lg">eco</span> Vegan
                    </button>
                    <button @click="$emit('toggleFilter', 'halal')" :class="[
                        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                        activeFilters.includes('halal')
                            ? 'bg-secondary text-white'
                            : 'bg-white border border-gray-200 text-text-main hover:border-secondary hover:text-secondary'
                    ]">
                        <span class="material-symbols-outlined text-lg">restaurant_menu</span> Halal
                    </button>
                    <button @click="$emit('toggleFilter', 'hygiene')" :class="[
                        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                        activeFilters.includes('hygiene')
                            ? 'bg-secondary text-white'
                            : 'bg-white border border-gray-200 text-text-main hover:border-secondary hover:text-secondary'
                    ]">
                        <span class="material-symbols-outlined text-lg">clean_hands</span> High Hygiene
                    </button>
                    <button @click="$emit('toggleFilter', 'fineDining')" :class="[
                        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                        activeFilters.includes('fineDining')
                            ? 'bg-secondary text-white'
                            : 'bg-white border border-gray-200 text-text-main hover:border-secondary hover:text-secondary'
                    ]">
                        <span class="material-symbols-outlined text-lg">soup_kitchen</span> Fine Dining
                    </button>
                </div>
            </div>

            <!-- Filter Legend & Count -->
            <div
                class="flex flex-wrap items-center gap-6 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-text-muted">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-secondary">verified</span>
                    <span><strong>Safe &amp; Secure</strong>: Highest SLTDA certification</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-secondary">grade</span>
                    <span><strong>Grade A</strong>: Excellent hygiene standards</span>
                </div>
                <div class="flex items-center gap-2 ml-auto">
                    <span>Showing <strong>{{ restaurantCount }}</strong> restaurants</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface Props {
    searchQuery: string
    activeFilters: string[]
    restaurantCount: number
}

defineProps<Props>()

defineEmits<{
    'update:searchQuery': [value: string]
    'toggleFilter': [filter: string]
    'clearFilters': []
}>()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
