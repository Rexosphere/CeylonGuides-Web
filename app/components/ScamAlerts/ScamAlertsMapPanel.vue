<template>
    <div
        class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-slate-200 dark:border-slate-700/50 p-4">
        <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-sm">
                <span class="material-icons text-danger text-base">place</span> Scam Risk Map
            </h3>
        </div>

        <div class="relative w-full h-72 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 group shadow-inner">
            <img alt="Map of Sri Lanka showing scam hotspots"
                class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500 grayscale-[20%]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAAZWiUAfM18We0V9maBtsvEZwUIqXZ1Xy86YAwOZDoBsJOx9MvIXxLJz3pbxo9LiFq88IO31faBncc1J7OiW9l7lyonro4o-RmD2wSUWGK_M_2sGNzIt61IosEN8U4O26-hAj1zYAEUVwwXOCbFixPI4KVC9j7gDmmoNDf0d3UpjSUA20xHbHwaclgBBb0-MRnN-Dl8vU_37vMg9b6dWRGkHQwiAUvOnxfbRdB7d_jy80YdP2SnlpZg3qutfo7PnV7wDsRDlSKho" />

            <!-- Controls -->
            <div class="absolute top-3 right-3 flex flex-col gap-2">
                <button
                    class="bg-white/90 dark:bg-slate-800/90 backdrop-blur text-slate-700 dark:text-slate-200 p-2 rounded-lg shadow-sm text-xs font-medium flex items-center gap-1.5 hover:bg-white hover:text-accent transition">
                    <span class="material-icons text-sm">my_location</span> My Location
                </button>
                <button
                    class="bg-white/90 dark:bg-slate-800/90 backdrop-blur text-slate-700 dark:text-slate-200 p-2 rounded-lg shadow-sm text-xs font-medium flex items-center gap-1.5 hover:bg-white hover:text-accent transition">
                    <span class="material-icons text-sm">refresh</span> Reset
                </button>
            </div>

            <!-- Legend -->
            <div
                class="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <div class="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wide">Risk Levels</div>
                <div class="flex flex-col gap-1.5">
                    <div class="flex items-center gap-2 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                        <span
                            class="w-2.5 h-2.5 rounded-full bg-danger border border-white dark:border-slate-800 shadow-sm"></span>
                        High Risk
                    </div>
                    <div class="flex items-center gap-2 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                        <span
                            class="w-2.5 h-2.5 rounded-full bg-warning border border-white dark:border-slate-800 shadow-sm"></span>
                        Medium Risk
                    </div>
                    <div class="flex items-center gap-2 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                        <span
                            class="w-2.5 h-2.5 rounded-full bg-success border border-white dark:border-slate-800 shadow-sm"></span>
                        Low Risk
                    </div>
                </div>
            </div>

            <!-- Example Marker -->
            <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div class="relative group/pin cursor-pointer">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span
                        class="relative inline-flex rounded-full h-8 w-8 bg-danger border-2 border-white dark:border-slate-800 items-center justify-center text-xs font-bold text-white shadow-lg group-hover/pin:scale-110 transition-transform">7</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// This is a simplified map component for the new design
// The actual interactive map logic can be integrated later
</script>
