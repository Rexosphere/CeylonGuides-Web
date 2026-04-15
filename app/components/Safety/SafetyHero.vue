<template>
    <div class="relative pt-32 pb-24 hero-pattern">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div
                class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-6 shadow-xl shadow-red-900/30 ring-4 ring-white/10">
                <span class="material-icons text-white text-3xl">medical_services</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">Safety Mode</h1>
            <p class="text-lg text-slate-300 max-w-2xl mx-auto font-light drop-shadow-md">Emergency assistance ready. You are protected
                with verified contacts and location services.</p>
        </div>
        <div
            class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent">
        </div>
    </div>
</template>

<style scoped>
.hero-pattern {
    background: linear-gradient(135deg, #991b1b 0%, #7f1d1d 50%, #450a0a 100%);
    position: relative;
}

.hero-pattern::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(220, 38, 38, 0.15) 0%, transparent 50%);
    opacity: 0.6;
}
</style>
