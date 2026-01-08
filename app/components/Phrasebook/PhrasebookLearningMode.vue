<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="close"></div>

            <div
                class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <!-- Header -->
                <div class="bg-slate-800 p-5 text-white flex justify-between items-start">
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="material-symbols-outlined text-xl">school</span>
                            <h2 class="text-xl font-bold">Learning Mode</h2>
                        </div>
                        <p class="text-xs text-slate-300">{{ categoryName }}</p>
                    </div>
                    <button @click="close" class="text-slate-300 hover:text-white transition-colors">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>

                <!-- Content -->
                <div class="p-6 overflow-y-auto">
                    <!-- Progress Bar -->
                    <div class="mb-6">
                        <div class="flex justify-between items-end mb-2">
                            <span class="text-sm font-bold text-slate-700">Progress</span>
                            <span class="text-xs font-medium text-slate-500">{{ currentIndex + 1 }} / {{ totalPhrases
                                }}</span>
                        </div>
                        <div class="w-full bg-slate-100 rounded-full h-2">
                            <div class="bg-slate-800 h-2 rounded-full transition-all duration-300"
                                :style="{ width: `${progressPercentage}%` }"></div>
                        </div>
                    </div>

                    <!-- Phrase Card -->
                    <div v-if="currentPhrase"
                        class="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-6 text-center">
                        <h3 class="text-3xl font-bold text-slate-800 mb-2">{{ currentPhrase.english }}</h3>
                        <p class="text-sm text-slate-500 mb-8">{{ currentPhrase.pronunciation }}</p>

                        <div class="space-y-4 text-left">
                            <!-- Sinhala -->
                            <div
                                class="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
                                <span
                                    class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Sinhala</span>
                                <div class="text-2xl font-bold text-slate-800 mb-1 sinhala-text">{{
                                    currentPhrase.sinhala }}</div>
                                <div class="text-sm text-slate-600">{{
                                    getSinhalaPronunciation(currentPhrase.pronunciation) }}</div>
                            </div>

                            <!-- Tamil -->
                            <div
                                class="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors">
                                <span
                                    class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tamil</span>
                                <div class="text-2xl font-bold text-slate-800 mb-1">{{ currentPhrase.tamil }}</div>
                                <div class="text-sm text-slate-600">{{
                                    getTamilPronunciation(currentPhrase.pronunciation) }}</div>
                            </div>
                        </div>

                        <!-- Cultural Context -->
                        <div v-if="currentPhrase.cultural_context"
                            class="mt-6 flex gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg text-left">
                            <span class="material-symbols-outlined text-blue-600 shrink-0">info</span>
                            <p class="text-xs text-blue-900 leading-relaxed">
                                {{ currentPhrase.cultural_context }}
                            </p>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex items-center gap-3 mt-2">
                        <button @click="playAudio('sinhala')"
                            class="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-lg">volume_up</span> Sinhala
                        </button>

                        <button @click="playAudio('tamil')"
                            class="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-lg">volume_up</span> Tamil
                        </button>

                        <button @click="nextPhrase"
                            class="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
                            {{ isLastPhrase ? 'Finish' : 'Next Phrase' }}
                            <span class="material-symbols-outlined text-lg">
                                {{ isLastPhrase ? 'check' : 'arrow_forward' }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
interface Phrase {
    id: string
    english: string
    sinhala: string
    tamil: string
    pronunciation: string
    cultural_context?: string
}

const props = defineProps<{
    isOpen: boolean
    phrases: Phrase[]
    categoryName: string
}>()

const emit = defineEmits<{
    close: []
    complete: []
}>()

const currentIndex = ref(0)

const currentPhrase = computed(() => {
    return props.phrases[currentIndex.value] || null
})

const totalPhrases = computed(() => props.phrases.length)

const progressPercentage = computed(() => {
    if (totalPhrases.value === 0) return 0
    return Math.round(((currentIndex.value + 1) / totalPhrases.value) * 100)
})

const isLastPhrase = computed(() => {
    return currentIndex.value === totalPhrases.value - 1
})

const getSinhalaPronunciation = (pronunciation: string) => {
    // Split by ' / ' and return first part (Sinhala pronunciation)
    const parts = pronunciation.split(' / ')
    return parts[0] || pronunciation
}

const getTamilPronunciation = (pronunciation: string) => {
    // Split by ' / ' and return second part (Tamil pronunciation)
    const parts = pronunciation.split(' / ')
    return parts[1] || pronunciation
}

const playAudio = (language: 'sinhala' | 'tamil') => {
    if (!currentPhrase.value) return

    if (!('speechSynthesis' in window)) {
        alert('Text-to-speech not supported in this browser')
        return
    }

    speechSynthesis.cancel()
    const text = language === 'sinhala' ? currentPhrase.value.sinhala : currentPhrase.value.tamil
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'sinhala' ? 'si-LK' : 'ta-LK'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
}

const nextPhrase = () => {
    if (isLastPhrase.value) {
        // Finished all phrases
        emit('complete')
        close()
    } else {
        currentIndex.value++
    }
}

const close = () => {
    currentIndex.value = 0
    emit('close')
}

// Reset index when modal opens
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        currentIndex.value = 0
    }
})
</script>

<style scoped>
.sinhala-text {
    font-family: "Noto Serif Sinhala", serif;
}
</style>
