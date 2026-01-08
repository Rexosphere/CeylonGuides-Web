<template>
    <div :class="[
        'border rounded-xl p-5 relative shadow-sm group hover:shadow-md transition-shadow',
        isEmergency
            ? 'bg-rose-50 border-rose-200'
            : 'bg-white border-slate-200'
    ]">
        <div class="flex justify-between items-start">
            <div class="space-y-3 w-full">
                <span v-if="badge"
                    class="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200">
                    <span class="material-symbols-outlined text-[12px] fill">asterisk</span> {{ badge }}
                </span>

                <div>
                    <h3 class="text-2xl font-bold text-slate-800 mb-1 sinhala-text">{{ phrase.native }}</h3>
                    <p class="text-xs font-bold text-slate-700 tracking-wide">{{ phrase.romanized }}</p>
                    <p class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
                        {{ phrase.pronunciation }}
                    </p>
                </div>

                <p class="text-sm text-slate-600">{{ phrase.english }}</p>
            </div>

            <div class="flex items-start gap-2">
                <button @click="playAudio"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white transition-colors border border-transparent hover:border-slate-200"
                    title="Play pronunciation">
                    <span class="material-symbols-outlined text-lg">volume_up</span>
                </button>

                <button @click="toggleFavorite" :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-transparent hover:border-slate-200',
                    isFavorite
                        ? 'text-yellow-500 hover:text-yellow-600 hover:bg-white'
                        : 'text-slate-400 hover:text-yellow-500 hover:bg-white'
                ]" title="Add to favorites">
                    <span class="material-symbols-outlined text-lg">{{ isFavorite ? 'star' : 'star_border' }}</span>
                </button>

                <button @click="showInfo"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-white transition-colors border border-transparent hover:border-slate-200"
                    title="More information">
                    <span class="material-symbols-outlined text-lg">info</span>
                </button>
            </div>
        </div>

        <div v-if="showDecoration" class="absolute bottom-2 right-14 opacity-20 text-rose-300">
            <span class="material-symbols-outlined text-4xl">landscape</span>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Phrase {
    id: string
    native: string
    romanized: string
    pronunciation: string
    english: string
}

const props = defineProps<{
    phrase: Phrase
    badge?: string
    isEmergency?: boolean
    isFavorite?: boolean
    showDecoration?: boolean
}>()

const emit = defineEmits<{
    playAudio: [phraseId: string]
    toggleFavorite: [phraseId: string]
    showInfo: [phraseId: string]
}>()

const playAudio = () => {
    emit('playAudio', props.phrase.id)
}

const toggleFavorite = () => {
    emit('toggleFavorite', props.phrase.id)
}

const showInfo = () => {
    emit('showInfo', props.phrase.id)
}
</script>

<style scoped>
.sinhala-text {
    font-family: "Noto Serif Sinhala", serif;
}
</style>
