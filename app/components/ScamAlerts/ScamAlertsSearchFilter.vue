<template>
    <div
        class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card p-6 border border-slate-200 dark:border-slate-700/50">
        <!-- Search Bar -->
        <div class="mb-6">
            <label class="text-xs font-semibold uppercase text-text-muted mb-2 block tracking-wider">Search
                Scams</label>
            <div class="relative group">
                <span
                    class="material-icons absolute left-3 top-2.5 text-slate-400 group-focus-within:text-accent transition-colors">search</span>
                <input :value="searchQuery"
                    @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
                    class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent dark:text-white transition-all placeholder-slate-400"
                    placeholder="Search by keyword, location, or scam type..." type="text" />
            </div>
        </div>

        <!-- Risk Severity & Location -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Risk Severity -->
            <div>
                <label class="text-xs font-semibold uppercase text-text-muted mb-2 block tracking-wider">Risk
                    Severity</label>
                <div class="flex flex-wrap gap-2">
                    <button
                        :class="['px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition',
                            severity === 'all' ? 'bg-secondary text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300']"
                        @click="$emit('update:severity', 'all')">
                        All
                    </button>
                    <button
                        :class="['px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition',
                            severity === 'high' ? 'bg-danger text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-danger hover:bg-red-50 dark:hover:bg-red-900/20']"
                        @click="$emit('update:severity', 'high')">
                        <span class="w-1.5 h-1.5 rounded-full bg-danger"></span> High Risk
                    </button>
                    <button
                        :class="['px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition',
                            severity === 'medium' ? 'bg-warning text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-warning hover:bg-amber-50 dark:hover:bg-amber-900/20']"
                        @click="$emit('update:severity', 'medium')">
                        <span class="w-1.5 h-1.5 rounded-full bg-warning"></span> Medium Risk
                    </button>
                    <button
                        :class="['px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition',
                            severity === 'low' ? 'bg-success text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-success hover:bg-emerald-50 dark:hover:bg-emerald-900/20']"
                        @click="$emit('update:severity', 'low')">
                        <span class="w-1.5 h-1.5 rounded-full bg-success"></span> Low Risk
                    </button>
                </div>
            </div>

            <!-- Location -->
            <div>
                <label
                    class="text-xs font-semibold uppercase text-text-muted mb-2 block tracking-wider">Location</label>
                <select :value="location" @change="$emit('update:location', ($event.target as HTMLSelectElement).value)"
                    class="w-full pl-3 pr-8 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent dark:text-white">
                    <option value="all">All Locations</option>
                    <option v-for="loc in locations" :key="loc.id" :value="loc.id">
                        {{ loc.name }}
                    </option>
                </select>
            </div>
        </div>

        <!-- Scam Category -->
        <div class="mb-6">
            <label class="text-xs font-semibold uppercase text-text-muted mb-2 block tracking-wider">Scam
                Category</label>
            <div class="flex flex-wrap gap-2">
                <button
                    :class="['px-3 py-1.5 rounded-lg text-xs font-medium transition',
                        category === 'all' ? 'bg-secondary text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700']"
                    @click="$emit('update:category', 'all')">
                    All Categories
                </button>
                <button v-for="cat in categories" :key="cat.id"
                    :class="['px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5',
                        category === cat.id ? 'bg-secondary text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700']"
                    @click="$emit('update:category', cat.id)">
                    <span class="material-icons text-xs">{{ cat.icon }}</span> {{ cat.name }}
                </button>
            </div>
        </div>

        <!-- Show Near Me Button -->
        <button :class="['w-full py-3 rounded-xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 mb-8 transition-colors',
            nearbyMode ? 'bg-accent text-white hover:bg-accent/90' : 'bg-secondary hover:bg-slate-700 text-white']"
            @click="$emit('toggleNearby')" :disabled="nearbyLoading">
            <span class="material-icons text-sm">{{ nearbyMode ? 'location_off' : 'my_location' }}</span>
            {{ nearbyLoading ? 'Loading...' : nearbyMode ? 'Hide Nearby' : 'Show Near Me' }}
        </button>

        <!-- Traveler Type -->
        <div>
            <label class="text-xs font-semibold uppercase text-text-muted mb-3 block tracking-wider">Traveler Type
                (Personalize Results)</label>
            <div class="grid grid-cols-5 gap-3">
                <button
                    :class="['flex flex-col items-center justify-center p-3 rounded-xl border transition-all',
                        travelerType === 'all' ? 'bg-secondary text-white border-transparent shadow-sm' : 'bg-white dark:bg-slate-800 text-text-muted border-slate-200 dark:border-slate-700 hover:border-accent hover:text-accent dark:hover:text-accent hover:bg-slate-50 dark:hover:bg-slate-800/80']"
                    @click="$emit('update:travelerType', 'all')">
                    <span class="material-icons text-xl mb-1.5">groups</span>
                    <span class="text-[10px] font-medium tracking-wide">All</span>
                </button>
                <button
                    :class="['flex flex-col items-center justify-center p-3 rounded-xl border transition-all',
                        travelerType === 'solo-female' ? 'bg-secondary text-white border-transparent shadow-sm' : 'bg-white dark:bg-slate-800 text-text-muted border-slate-200 dark:border-slate-700 hover:border-accent hover:text-accent dark:hover:text-accent hover:bg-slate-50 dark:hover:bg-slate-800/80']"
                    @click="$emit('update:travelerType', 'solo-female')">
                    <span class="material-icons text-xl mb-1.5">person</span>
                    <span class="text-[10px] font-medium tracking-wide">Solo Female</span>
                </button>
                <button
                    :class="['flex flex-col items-center justify-center p-3 rounded-xl border transition-all',
                        travelerType === 'couple' ? 'bg-secondary text-white border-transparent shadow-sm' : 'bg-white dark:bg-slate-800 text-text-muted border-slate-200 dark:border-slate-700 hover:border-accent hover:text-accent dark:hover:text-accent hover:bg-slate-50 dark:hover:bg-slate-800/80']"
                    @click="$emit('update:travelerType', 'couple')">
                    <span class="material-icons text-xl mb-1.5">favorite</span>
                    <span class="text-[10px] font-medium tracking-wide">Couple</span>
                </button>
                <button
                    :class="['flex flex-col items-center justify-center p-3 rounded-xl border transition-all',
                        travelerType === 'family' ? 'bg-secondary text-white border-transparent shadow-sm' : 'bg-white dark:bg-slate-800 text-text-muted border-slate-200 dark:border-slate-700 hover:border-accent hover:text-accent dark:hover:text-accent hover:bg-slate-50 dark:hover:bg-slate-800/80']"
                    @click="$emit('update:travelerType', 'family')">
                    <span class="material-icons text-xl mb-1.5">family_restroom</span>
                    <span class="text-[10px] font-medium tracking-wide">Family</span>
                </button>
                <button
                    :class="['flex flex-col items-center justify-center p-3 rounded-xl border transition-all',
                        travelerType === 'backpacker' ? 'bg-secondary text-white border-transparent shadow-sm' : 'bg-white dark:bg-slate-800 text-text-muted border-slate-200 dark:border-slate-700 hover:border-accent hover:text-accent dark:hover:text-accent hover:bg-slate-50 dark:hover:bg-slate-800/80']"
                    @click="$emit('update:travelerType', 'backpacker')">
                    <span class="material-icons text-xl mb-1.5">backpack</span>
                    <span class="text-[10px] font-medium tracking-wide">Backpacker</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Result Count -->
    <div class="text-xs text-text-muted dark:text-slate-400 font-medium ml-1 flex items-center gap-2 mt-4">
        <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
        Showing {{ resultCount }} scams
    </div>
</template>

<script setup lang="ts">
interface Location {
    id: string
    name: string
}

interface Category {
    id: string
    name: string
    icon: string
}

defineProps<{
    searchQuery: string
    severity: string
    location: string
    category: string
    travelerType: string
    locations: Location[]
    categories: Category[]
    resultCount: number
    nearbyMode: boolean
    nearbyLoading: boolean
}>()

defineEmits<{
    'update:searchQuery': [value: string]
    'update:severity': [value: string]
    'update:location': [value: string]
    'update:category': [value: string]
    'update:travelerType': [value: string]
    'toggleNearby': []
}>()
</script>
