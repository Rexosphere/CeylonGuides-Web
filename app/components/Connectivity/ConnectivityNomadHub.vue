<template>
    <section class="py-16 bg-background-light dark:bg-background-dark">
        <div class="container mx-auto px-6">
            <h2 class="text-2xl font-bold text-primary dark:text-white mb-1">Digital Nomad Hub</h2>
            <p class="text-text-muted text-sm mb-6">Coworking spaces and remote work infrastructure across Sri Lanka</p>

            <!-- Location Tabs -->
            <div class="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">
                <button v-for="location in locations" :key="location.id" @click="selectedLocation = location.id" :class="[
                    'px-3 py-1 text-xs font-medium transition-colors',
                    selectedLocation === location.id
                        ? 'font-bold text-primary border-b-2 border-primary'
                        : 'text-text-muted hover:text-primary'
                ]">
                    {{ location.name }}
                </button>
            </div>

            <!-- Coworking Spaces Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="space in coworkingSpaces" :key="space.id"
                    class="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-card transition-all"
                    :class="{ 'relative': space.price }">
                    <div v-if="space.price" class="absolute top-4 right-4 text-[10px] font-bold text-secondary">
                        {{ space.price }}
                    </div>
                    <h3 class="font-bold text-primary dark:text-white mb-1 text-sm">{{ space.name }}</h3>
                    <p class="text-xs text-text-muted mb-3 flex items-center gap-1">
                        <span class="material-icons text-[12px]">location_on</span> {{ space.location }}
                    </p>
                    <div class="flex flex-wrap gap-1.5">
                        <span v-for="(feature, index) in space.features" :key="index"
                            class="text-[9px] bg-background-light text-text-muted px-2 py-0.5 rounded border border-gray-100">
                            {{ feature }}
                        </span>
                    </div>
                    <p class="text-[10px] text-text-muted mt-3 italic">{{ space.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const locations = [
    { id: 'colombo', name: 'Colombo' },
    { id: 'ahungama', name: 'Ahungama' },
    { id: 'south-coast', name: 'South Coast' },
    { id: 'weligama', name: 'Weligama' },
    { id: 'hiriketiya', name: 'Hiriketiya' },
    { id: 'kandy', name: 'Kandy' },
    { id: 'hill-country', name: 'Hill Country' }
]

const selectedLocation = ref('colombo')

const coworkingSpaces = [
    {
        id: 'regus',
        name: 'Regus',
        location: 'Colombo',
        features: ['High-speed internet', 'Professional atmosphere', 'Meeting rooms'],
        description: 'Multiple locations: International chain with premium facilities'
    },
    {
        id: 'ihatch',
        name: 'iHatch',
        location: 'Colombo',
        features: ['Startup friendly', 'Events & networking', 'Modern workspace'],
        description: 'Popular with local tech community'
    },
    {
        id: 'the-hub',
        name: 'The Hub',
        location: 'Colombo',
        features: ['Community focused', 'Events', 'Mentorship programs'],
        description: 'Great for networking'
    },
    {
        id: 'nets',
        name: 'NETS Cowork & Colive',
        location: 'Ahungama • South Coast',
        price: '~$150/mo',
        features: ['Solar powered', 'Pool access', 'Beachside location', 'Coliving available'],
        description: 'Opened 2023. Eco-friendly with backup power.'
    },
    {
        id: 'focus-hub',
        name: 'Focus Hub Co-Working',
        location: 'Ahungama • South Coast',
        price: '~$120/mo',
        features: ['Generator backup', 'Air conditioning', 'Quiet environment'],
        description: 'Reliable power and AC'
    },
    {
        id: 'outpost',
        name: 'Outpost',
        location: 'Weligama • South Coast',
        features: ['Reliable Wifi', 'Beach community', 'Accommodation available'],
        description: 'Built-in expat community. Very popular.'
    }
]
</script>
