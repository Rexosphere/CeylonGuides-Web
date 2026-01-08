<template>
    <aside class="lg:col-span-3 space-y-6">
        <!-- Today's Useful Phrases -->
        <div class="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 text-white">
            <div class="p-5 border-b border-slate-700">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="font-bold text-lg">Today's Useful Phrases</h3>
                    <span class="material-symbols-outlined text-slate-400">school</span>
                </div>
                <p class="text-slate-400 text-xs mb-4">Master these essentials</p>
                <button @click="shufflePhrases"
                    class="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors border border-slate-600">
                    <span class="material-symbols-outlined text-lg">shuffle</span> Shuffle Phrases
                </button>
            </div>

            <div class="bg-slate-50">
                <ul class="divide-y divide-slate-200">
                    <li v-for="(phrase, index) in dailyPhrases" :key="phrase.id" @click="selectPhrase(phrase.id)"
                        class="p-3 hover:bg-white transition-colors cursor-pointer group flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span
                                class="w-6 h-6 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center">
                                {{ index + 1 }}
                            </span>
                            <div>
                                <p class="text-slate-800 text-sm font-semibold">{{ phrase.english }}</p>
                                <p class="text-slate-500 text-[10px]">{{ truncate(phrase.pronunciation, 35) }}</p>
                            </div>
                        </div>
                        <span
                            class="material-symbols-outlined text-slate-400 text-sm group-hover:text-slate-600">arrow_forward</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Pro Tip -->
        <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-3">
            <span class="material-symbols-outlined text-slate-600 mt-1">lightbulb</span>
            <div>
                <h4 class="text-sm font-bold text-slate-800">Pro Tip</h4>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                    Practice pronunciation slowly at first. Locals appreciate the effort, even if not perfect!
                </p>
            </div>
        </div>

        <!-- Phrase Quiz -->
        <div
            class="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700 text-white flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                    <span class="material-symbols-outlined text-white">quiz</span>
                </div>
                <div>
                    <h4 class="text-sm font-bold">Phrase Quiz</h4>
                    <p class="text-[10px] text-slate-400">Test your knowledge!</p>
                </div>
            </div>
            <button @click="startQuiz"
                class="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">
                Start Quiz
            </button>
        </div>

        <!-- Quiz Info Card -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center flex flex-col items-center">
            <div class="w-16 h-16 mb-3 relative flex items-center justify-center">
                <span class="material-symbols-outlined text-5xl text-red-500">target</span>
            </div>
            <p class="text-sm text-slate-600 mb-2 font-medium">Ready to test your phrase knowledge?</p>
            <p class="text-xs text-slate-500 mb-4">You'll get 10 random phrases to translate!</p>
            <div class="w-full space-y-2 text-left px-2">
                <div class="flex items-center gap-2 text-xs text-slate-600">
                    <span class="material-symbols-outlined text-sm">check_circle_outline</span> Multiple choice
                    questions
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-600">
                    <span class="material-symbols-outlined text-sm">volume_up</span> Audio pronunciation
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-600">
                    <span class="material-symbols-outlined text-sm">emoji_events</span> Track your score
                </div>
            </div>
        </div>

        <!-- Download Offline -->
        <div class="bg-[#eef2ff] p-5 rounded-xl border border-indigo-100">
            <h4 class="text-sm font-bold text-slate-800">Download Offline</h4>
            <p class="text-xs text-slate-600 mt-1 mb-3">Access phrases without internet</p>
            <button @click="downloadOffline"
                class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors">
                Download Now
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
interface DailyPhrase {
    id: string
    english: string
    pronunciation: string
}

const props = defineProps<{
    dailyPhrases: DailyPhrase[]
}>()

const emit = defineEmits<{
    shuffle: []
    selectPhrase: [id: string]
    startQuiz: []
    download: []
}>()

const truncate = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text
}

const shufflePhrases = () => {
    emit('shuffle')
}

const selectPhrase = (id: string) => {
    emit('selectPhrase', id)
}

const startQuiz = () => {
    emit('startQuiz')
}

const downloadOffline = () => {
    emit('download')
}
</script>
