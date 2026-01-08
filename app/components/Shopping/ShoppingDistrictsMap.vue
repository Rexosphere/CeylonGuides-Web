<template>
    <section>
        <div class="flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-primary">map</span>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Shopping Districts Map</h2>
        </div>
        <p class="text-slate-500 dark:text-slate-400 mb-6">Explore shopping locations across Sri Lanka. Click markers to
            view details.</p>
        <div
            class="relative w-full h-[400px] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
            <div
                class="absolute inset-0 flex items-center justify-center opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Sri_Lanka_location_map.svg/1707px-Sri_Lanka_location_map.svg.png')] bg-cover bg-center grayscale contrast-125">
            </div>
            <div class="absolute top-4 right-4 flex flex-col gap-2">
                <button
                    class="bg-white dark:bg-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 flex items-center gap-2 hover:bg-slate-50 transition text-slate-700 dark:text-slate-200">
                    <span class="material-symbols-outlined text-sm">crop_free</span> Fit to Sri Lanka
                </button>
                <button
                    class="bg-white dark:bg-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 flex items-center gap-2 hover:bg-slate-50 transition text-slate-700 dark:text-slate-200">
                    <span class="material-symbols-outlined text-sm">location_on</span> Fit to Markers
                </button>
            </div>
            <div
                class="absolute top-4 left-4 flex flex-col bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600">
                <button
                    class="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-t-lg border-b border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">+</button>
                <button
                    class="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-b-lg text-slate-600 dark:text-slate-300">-</button>
            </div>
        </div>
    </section>
</template>
