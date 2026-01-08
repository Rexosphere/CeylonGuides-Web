<template>
    <div
        class="relative h-full min-h-[600px] bg-[#eef2f6] dark:bg-slate-800 rounded-2xl overflow-hidden shadow-soft border border-slate-200 dark:border-slate-700 group">
        <img alt="Sri Lanka Map" class="w-full h-full object-cover transition duration-700" :src="mapImage" />

        <!-- Map Controls -->
        <div class="absolute top-4 right-4 flex flex-col gap-2">
            <button @click="$emit('fullscreen')"
                class="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md text-slate-600 dark:text-slate-300 hover:text-primary transition border border-slate-100 dark:border-slate-700">
                <span class="material-symbols-outlined text-xl">fullscreen</span>
            </button>
            <div
                class="bg-white dark:bg-slate-800 flex flex-col rounded-lg shadow-md overflow-hidden border border-slate-100 dark:border-slate-700">
                <button @click="$emit('zoom-in')"
                    class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition border-b border-slate-100 dark:border-slate-700">
                    <span class="material-symbols-outlined text-xl">add</span>
                </button>
                <button @click="$emit('zoom-out')"
                    class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition">
                    <span class="material-symbols-outlined text-xl">remove</span>
                </button>
            </div>
        </div>

        <!-- Location Pins -->
        <div
            class="absolute top-[40%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin cursor-pointer">
            <div
                class="bg-primary text-white p-2 rounded-full shadow-lg transform group-hover/pin:scale-110 transition ring-2 ring-white dark:ring-slate-800">
                <span class="material-symbols-outlined text-base">local_taxi</span>
            </div>
            <div
                class="bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow text-[10px] font-bold mt-1 text-slate-800 dark:text-white opacity-0 group-hover/pin:opacity-100 transition">
                Colombo
            </div>
        </div>

        <div
            class="absolute top-[35%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin cursor-pointer">
            <div
                class="bg-slate-700 text-white p-2 rounded-full shadow-lg transform group-hover/pin:scale-110 transition border-2 border-white dark:border-slate-800">
                <span class="material-symbols-outlined text-base">flight</span>
            </div>
            <div
                class="bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow text-[10px] font-bold mt-1 text-slate-800 dark:text-white">
                Airport
            </div>
        </div>

        <!-- Route Line -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 0;">
            <path d="M 220 280 Q 240 260 250 240" fill="none" stroke="#0f766e" stroke-dasharray="0" stroke-width="3" />
        </svg>

        <!-- Legend -->
        <div
            class="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 max-w-xs">
            <h5 class="text-xs font-bold text-slate-900 dark:text-white mb-3">Route Style</h5>
            <div class="space-y-2.5">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-1 bg-primary rounded-full"></div>
                    <span class="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Tuk-Tuk
                        (Recommended)</span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-1 bg-slate-400 rounded-full"></div>
                    <span class="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Taxi / Car</span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-1 border-b-2 border-slate-400 border-dashed"></div>
                    <span class="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Highway</span>
                </div>
            </div>
        </div>

        <!-- Attribution -->
        <div
            class="absolute bottom-1 right-1 bg-white/60 px-1.5 py-0.5 rounded text-[8px] text-slate-500 backdrop-blur-sm">
            © OpenStreetMap contributors
        </div>
    </div>
</template>

<script setup lang="ts">
const mapImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuALNLAWSUO2iOCueY18GL7gwo3qydzhV7UGPKKpOwVPPErBcWr3Gq0Et1DihXMcL0EdJAk5NdCmH5hm3H99PmvpsgKcnCAIFSx4Ad6HallNyiViWPJX5UxBxe8FXE4gC6__43O2w0x1s4nyWGwmWBmhpXUURVJSIEYE51O215Y7pdD4yrAKl1ZSVswzQsXF1uK9HETMDZsmOJorhbCs5jVITt3AakKesRKVgyuL8fuZCYIt6rVcch2zFPYjv43OvDWPzVupjnniD_U"

defineEmits(['fullscreen', 'zoom-in', 'zoom-out'])
</script>
