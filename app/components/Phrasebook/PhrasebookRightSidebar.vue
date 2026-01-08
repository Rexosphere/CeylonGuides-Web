<template>
    <aside class="lg:col-span-3 space-y-6">
        <!-- When to Use This -->
        <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div class="flex gap-3 mb-2">
                <span class="material-symbols-outlined text-slate-500 mt-1">schedule</span>
                <h4 class="text-sm font-bold text-slate-800 pt-1">When to Use This</h4>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
                {{ contextText }}
            </p>
        </div>

        <!-- Cultural Tip -->
        <div class="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100 flex gap-3">
            <span class="material-symbols-outlined text-blue-600 mt-0.5">info</span>
            <div>
                <h4 class="text-sm font-bold text-blue-900">Cultural Tip</h4>
                <p class="text-xs text-blue-800 mt-1 leading-relaxed opacity-90">
                    {{ culturalTip }}
                </p>
            </div>
        </div>

        <!-- Related Phrases -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-4 border-b border-slate-100 flex items-center gap-2">
                <span class="material-symbols-outlined text-slate-500 text-sm">link</span>
                <h4 class="text-sm font-bold text-slate-800">Related Phrases</h4>
            </div>
            <ul class="divide-y divide-slate-100">
                <li v-for="phrase in relatedPhrases" :key="phrase.id" @click="selectPhrase(phrase.id)"
                    class="p-4 hover:bg-slate-50 transition-colors cursor-pointer group flex items-center justify-between">
                    <div>
                        <p class="text-xs font-bold text-slate-800">{{ phrase.english }}</p>
                        <p class="text-[10px] text-slate-500 truncate w-32">{{ phrase.pronunciation }}</p>
                    </div>
                    <span class="material-symbols-outlined text-slate-300 text-sm group-hover:text-slate-500">
                        arrow_forward
                    </span>
                </li>
            </ul>
        </div>

        <!-- Your Progress -->
        <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div class="flex justify-between items-start mb-4">
                <div class="flex gap-3">
                    <span class="material-symbols-outlined text-slate-500">emoji_events</span>
                    <div>
                        <h4 class="text-sm font-bold text-slate-800">Your Progress</h4>
                        <p class="text-xs text-slate-500">{{ progress.practiced }} phrases practiced</p>
                    </div>
                </div>
                <span @click="refreshProgress"
                    class="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-slate-600">
                    refresh
                </span>
            </div>

            <div class="mb-4">
                <div class="flex justify-between items-end mb-1">
                    <span class="text-xs font-medium text-slate-600">Overall Mastery</span>
                    <span class="text-xs font-bold text-slate-800">{{ progress.percentage }}%</span>
                </div>
                <div class="w-full bg-slate-100 rounded-full h-1.5">
                    <div class="bg-slate-800 h-1.5 rounded-full transition-all"
                        :style="{ width: `${progress.percentage}%` }" />
                </div>
            </div>

            <div class="grid grid-cols-3 gap-2">
                <div class="bg-green-50 p-2 rounded-lg text-center border border-green-100">
                    <span class="block text-lg font-bold text-green-700">{{ progress.mastered }}</span>
                    <span class="block text-[10px] text-green-600 font-medium">Mastered</span>
                </div>
                <div class="bg-blue-50 p-2 rounded-lg text-center border border-blue-100">
                    <span class="block text-lg font-bold text-blue-700">{{ progress.learning }}</span>
                    <span class="block text-[10px] text-blue-600 font-medium">Learning</span>
                </div>
                <div class="bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
                    <span class="block text-lg font-bold text-slate-700">{{ progress.new }}</span>
                    <span class="block text-[10px] text-slate-600 font-medium">New</span>
                </div>
            </div>
        </div>

        <!-- By Category Progress -->
        <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <div class="flex gap-2 mb-4">
                <span class="material-symbols-outlined text-slate-500 text-sm mt-0.5">category</span>
                <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wide">By Category</h4>
            </div>
            <div class="space-y-3">
                <div v-for="category in categoryProgress" :key="category.name">
                    <div class="flex justify-between text-[10px] text-slate-600 mb-1">
                        <span>{{ category.name }}</span>
                        <span>{{ category.completed }}/{{ category.total }}</span>
                    </div>
                    <div class="w-full bg-slate-100 rounded-full h-1">
                        <div class="bg-slate-400 h-1 rounded-full transition-all"
                            :style="{ width: `${category.percentage}%` }" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="p-4 border-b border-slate-100 flex items-center gap-2">
                <span class="material-symbols-outlined text-slate-500 text-sm">history</span>
                <h4 class="text-sm font-bold text-slate-800">Recent Activity</h4>
            </div>
            <ul class="divide-y divide-slate-100">
                <li v-for="activity in recentActivity" :key="activity.id"
                    class="p-3 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div class="mt-0.5">
                        <span class="material-symbols-outlined text-slate-400 text-lg">school</span>
                    </div>
                    <div>
                        <p class="text-xs font-semibold text-slate-800">{{ activity.phrase }}</p>
                        <p class="text-[10px] text-slate-500">{{ activity.time }}</p>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Motivation Card -->
        <div class="bg-slate-100 p-4 rounded-xl border border-slate-200 text-center flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-rose-500 text-sm">local_fire_department</span>
            </div>
            <p class="text-xs text-slate-600 font-medium">
                Every phrase brings you closer to fluency!
            </p>
        </div>
    </aside>
</template>

<script setup lang="ts">
interface RelatedPhrase {
    id: string
    english: string
    pronunciation: string
}

interface Progress {
    practiced: number
    percentage: number
    mastered: number
    learning: number
    new: number
}

interface CategoryProgress {
    name: string
    completed: number
    total: number
    percentage: number
}

interface RecentActivity {
    id: string
    phrase: string
    time: string
}

const props = defineProps<{
    contextText: string
    culturalTip: string
    relatedPhrases: RelatedPhrase[]
    progress: Progress
    categoryProgress: CategoryProgress[]
    recentActivity: RecentActivity[]
}>()

const emit = defineEmits<{
    selectPhrase: [id: string]
    refreshProgress: []
}>()

const selectPhrase = (id: string) => {
    emit('selectPhrase', id)
}

const refreshProgress = () => {
    emit('refreshProgress')
}
</script>
