<template>
    <div class="relative h-[420px] w-full flex flex-col items-center justify-center text-center text-white px-4">
        <div class="absolute inset-0 bg-slate-900">
            <img alt="Sri Lanka Background" class="w-full h-full object-cover opacity-60" :src="backgroundImage" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/60"></div>
        </div>

        <div class="relative z-10 max-w-3xl mx-auto space-y-6 mt-12">
            <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                Speak Like a Local
            </h1>
            <p class="text-lg md:text-xl text-slate-100 font-light max-w-2xl mx-auto drop-shadow-md">
                Connect deeply with Sri Lanka. Master essential phrases and learn the cultural etiquette that opens
                hearts.
            </p>

            <div class="relative max-w-xl mx-auto w-full mt-4">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <span class="material-symbols-outlined text-slate-400">search</span>
                </div>
                <input v-model="searchQuery" @input="handleSearch"
                    class="w-full py-4 pl-12 pr-6 rounded-full bg-white text-slate-800 shadow-xl border-none focus:ring-2 focus:ring-slate-700 placeholder-slate-400 text-base outline-none"
                    placeholder="Search phrases (e.g., 'How much?', 'Thank you')..." type="text" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')

const props = defineProps<{
    backgroundImage?: string
}>()

const emit = defineEmits<{
    search: [query: string]
}>()

const handleSearch = () => {
    emit('search', searchQuery.value)
}
</script>
