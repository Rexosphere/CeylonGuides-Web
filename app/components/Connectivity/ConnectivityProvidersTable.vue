<template>
    <section class="py-16 bg-background-light dark:bg-background-dark">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h2 class="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-2">Top Mobile Providers
                    </h2>
                    <p class="text-text-muted text-sm">Compare networks, coverage, and value for your trip.</p>
                </div>
                <div
                    class="flex items-center gap-2 text-sm bg-white dark:bg-card-dark px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <span class="text-text-muted">Sort by:</span>
                    <span
                        class="font-bold text-primary cursor-pointer flex items-center hover:text-secondary transition-colors">
                        Best Coverage <span class="material-icons text-base ml-1">expand_more</span>
                    </span>
                </div>
            </div>

            <ConnectivityRegionFilter />

            <div
                class="bg-white dark:bg-card-dark rounded-xl shadow-card border border-gray-200 dark:border-gray-700 overflow-hidden">
                <!-- Table Header -->
                <div
                    class="hidden md:flex bg-gray-50 dark:bg-gray-800/50 p-4 text-[10px] font-bold text-text-muted uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                    <div class="w-1/4 pl-4">Provider</div>
                    <div class="w-1/4">Coverage</div>
                    <div class="w-1/6">Speed</div>
                    <div class="w-1/6">eSIM</div>
                    <div class="w-1/6">Best Value</div>
                    <div class="w-12 text-center">Compare</div>
                </div>

                <!-- Provider Rows -->
                <ConnectivityProviderRow v-for="provider in providers" :key="provider.id" :provider="provider" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const providers = [
    {
        id: 'dialog',
        name: 'Dialog Axiata',
        initial: 'D',
        color: 'primary',
        type: 'Urban · Rural',
        coverage: 5,
        speed: 4,
        esim: true,
        pricePerGB: 0.14
    },
    {
        id: 'mobitel',
        name: 'SLT-Mobitel',
        initial: 'M',
        color: 'secondary',
        type: 'Urban · Rural',
        coverage: 4,
        speed: 5,
        esim: true,
        pricePerGB: 0.17
    },
    {
        id: 'hutch',
        name: 'Hutch',
        initial: 'H',
        color: 'accent-info',
        type: 'Urban · Budget',
        coverage: 3,
        speed: 3,
        esim: true,
        pricePerGB: 0.08
    },
    {
        id: 'airtel',
        name: 'Airtel',
        initial: 'A',
        color: 'accent-danger',
        type: 'Urban',
        coverage: 2,
        speed: 3,
        esim: false,
        pricePerGB: null
    }
]
</script>
