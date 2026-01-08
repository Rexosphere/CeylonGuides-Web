<template>
    <div class="mt-12 bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <div class="flex justify-between items-center mb-8">
            <h3 class="font-bold text-lg text-primary dark:text-white flex items-center gap-2">
                <span class="material-icons text-primary">sim_card</span> eSIM Activation Guide
            </h3>
            <a class="text-xs text-secondary font-medium hover:text-primary underline" href="#">Change</a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <!-- Connection Line -->
            <div class="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
            </div>

            <!-- Step 1 -->
            <div class="flex flex-col items-center md:items-start text-center md:text-left group">
                <div
                    class="w-12 h-12 rounded-full bg-white dark:bg-card-dark border-2 border-primary/20 text-primary font-bold flex items-center justify-center mb-4 z-10 shadow-sm group-hover:border-primary transition-colors">
                    1
                </div>
                <h4 class="font-bold text-sm text-primary dark:text-white mb-1">Buy Online</h4>
                <p class="text-xs text-text-muted">Purchase your plan via the provider's website before you travel.</p>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center md:items-start text-center md:text-left group">
                <div
                    class="w-12 h-12 rounded-full bg-white dark:bg-card-dark border-2 border-primary/20 text-primary font-bold flex items-center justify-center mb-4 z-10 shadow-sm group-hover:border-primary transition-colors">
                    2
                </div>
                <h4 class="font-bold text-sm text-primary dark:text-white mb-1">Receive QR</h4>
                <p class="text-xs text-text-muted">You'll receive a QR code via email instantly.</p>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center md:items-start text-center md:text-left group">
                <div
                    class="w-12 h-12 rounded-full bg-white dark:bg-card-dark border-2 border-primary/20 text-primary font-bold flex items-center justify-center mb-4 z-10 shadow-sm group-hover:border-primary transition-colors">
                    3
                </div>
                <h4 class="font-bold text-sm text-primary dark:text-white mb-1">Scan & Activate</h4>
                <p class="text-xs text-text-muted">Scan the QR code in your phone settings upon arrival in Sri Lanka.
                </p>
            </div>
        </div>

        <div class="mt-8 text-center">
            <p class="text-xs text-text-muted italic">Showing 7 plans recommended for eSIM</p>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
