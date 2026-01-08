<template>
    <div
        class="flex flex-wrap gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div>
            <h2 class="text-xl font-bold text-slate-800">{{ categoryName }}</h2>
            <p class="text-xs text-slate-500 mt-0.5">{{ phraseCount }} phrases found</p>
        </div>

        <div class="flex items-center gap-3">
            <button @click="toggleLearningMode"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
                <span class="material-symbols-outlined text-base">school</span> Learning Mode
            </button>

            <div class="flex bg-slate-100 rounded-lg p-1">
                <button v-for="lang in languages" :key="lang.value" @click="selectLanguage(lang.value)" :class="[
                    'px-3 py-1 rounded-md text-xs font-medium',
                    selectedLanguage === lang.value
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                ]">
                    {{ lang.label }}
                </button>
            </div>
        </div>
    </div>

    <!-- Category Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3">
        <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)" :class="[
            'flex flex-col items-center justify-center p-3 border rounded-xl transition-all h-24 gap-2 group',
            category.isActive
                ? 'bg-red-600 text-white border-red-600 shadow-md'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
        ]">
            <span :class="[
                'material-symbols-outlined',
                category.isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-800'
            ]">
                {{ category.icon }}
            </span>
            <span :class="[
                'text-[10px] font-semibold text-center leading-tight',
                category.isActive ? 'text-white' : 'text-slate-600'
            ]" v-html="category.name" />
            <span v-if="category.badge" class="text-[8px] bg-red-800/30 px-1.5 py-0.5 rounded text-white font-medium">
                {{ category.badge }}
            </span>
        </button>
    </div>
</template>

<script setup lang="ts">
interface Category {
    id: string
    name: string
    icon: string
    isActive?: boolean
    badge?: string
}

interface Language {
    label: string
    value: string
}

const props = defineProps<{
    categoryName: string
    phraseCount: number
    selectedLanguage: string
    categories: Category[]
}>()

const emit = defineEmits<{
    selectLanguage: [language: string]
    selectCategory: [categoryId: string]
    toggleLearningMode: []
}>()

const languages: Language[] = [
    { label: 'Sinhala', value: 'sinhala' },
    { label: 'Tamil', value: 'tamil' },
    { label: 'Both', value: 'both' }
]

const selectLanguage = (language: string) => {
    emit('selectLanguage', language)
}

const selectCategory = (categoryId: string) => {
    emit('selectCategory', categoryId)
}

const toggleLearningMode = () => {
    emit('toggleLearningMode')
}
</script>
