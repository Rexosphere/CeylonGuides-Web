<template>
    <div class="bg-primary rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
        <div
            class="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-teal-400/20 rounded-full blur-2xl group-hover:bg-teal-400/30 transition">
        </div>
        <div class="relative z-10">
            <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <span class="material-icons text-xl">smart_toy</span>
            </div>
            <h3 class="font-bold text-lg mb-2">Not sure what to do?</h3>
            <p class="text-sm text-teal-100/90 mb-6 leading-relaxed">Our AI assistant can help guide you through any
                situation safely with local knowledge.</p>
            <NuxtLink to="/"
                class="w-full bg-white text-primary hover:bg-teal-50 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg">
                <span class="material-icons text-lg">chat_bubble_outline</span>
                Ask AI Travel Assistant
            </NuxtLink>
        </div>
    </div>
</template>
