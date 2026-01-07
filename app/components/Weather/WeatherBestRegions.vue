<template>
    <section>
        <h3
            class="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-6">
            <span class="material-icons text-primary text-lg">explore</span> Best Regions During Maha Season
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
                class="bg-surface-light dark:bg-surface-dark border border-primary/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden group">
                <div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <div class="flex justify-between items-start mb-4">
                    <div class="p-2 bg-primary/10 rounded-lg text-primary">
                        <span class="material-icons">beach_access</span>
                    </div>
                    <span class="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase">Peak
                        Season</span>
                </div>
                <h4 class="font-bold text-lg text-slate-900 dark:text-white mb-1">West & South Coast</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Best for whale watching and beach relaxation.
                </p>
                <div class="flex gap-2 text-[10px] text-slate-400">
                    <span class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Mirissa</span>
                    <span class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Unawatuna</span>
                </div>
            </div>
            <div
                class="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                        <span class="material-icons">hiking</span>
                    </div>
                    <span
                        class="bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-300 text-[10px] font-bold px-2 py-1 rounded uppercase">Cool
                        & Pleasant</span>
                </div>
                <h4 class="font-bold text-lg text-slate-900 dark:text-white mb-1">Hill Country</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Perfect for tea plantations and scenic
                    trains.</p>
                <div class="flex gap-2 text-[10px] text-slate-400">
                    <span class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Ella</span>
                    <span class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Nuwara Eliya</span>
                </div>
            </div>
            <div
                class="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                        <span class="material-icons">fort</span>
                    </div>
                    <span
                        class="bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-300 text-[10px] font-bold px-2 py-1 rounded uppercase">Sunny
                        Days</span>
                </div>
                <h4 class="font-bold text-lg text-slate-900 dark:text-white mb-1">Galle & South</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Explore the historic fort and coastal towns.
                </p>
                <div class="flex gap-2 text-[10px] text-slate-400">
                    <span class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Galle</span>
                    <span class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Weligama</span>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
}
</style>
