<template>
    <div>
        <!-- Sticky Filter Bar -->
        <div class="sticky top-[72px] z-40 bg-surface-light border-b border-gray-200 shadow-sm">
            <div class="mx-auto w-full max-w-7xl px-4 py-4 space-y-4">
                <!-- Search and Sort Row -->
                <div class="flex flex-col md:flex-row gap-4 items-center">
                    <!-- Search Input -->
                    <div class="relative flex-grow w-full">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="material-icons text-gray-400">search</span>
                        </span>
                        <input v-model="localSearchQuery" @input="$emit('update:searchQuery', localSearchQuery)"
                            class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out"
                            placeholder="Search by name, location, or city..." type="text" />
                    </div>

                    <!-- Sort and Near Me -->
                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <!-- Sort Dropdown -->
                        <div class="relative">
                            <button @click="toggleSortDropdown"
                                class="flex items-center justify-between w-full md:w-48 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none">
                                <span>{{ selectedSortLabel }}</span>
                                <span class="material-icons text-gray-400 ml-2">expand_more</span>
                            </button>

                            <!-- Dropdown Menu -->
                            <div v-if="showSortDropdown"
                                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                <button v-for="option in sortOptions" :key="option.value"
                                    @click="selectSort(option.value)"
                                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    :class="{ 'bg-primary/10 text-primary': localSortBy === option.value }">
                                    {{ option.label }}
                                </button>
                            </div>
                        </div>

                        <!-- Near Me Button -->
                        <button @click="$emit('nearMe')" :disabled="!hasLocation"
                            class="flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-primary/90 focus:outline-none shadow-sm gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            <span class="material-icons text-sm">near_me</span> Near Me
                        </button>
                    </div>
                </div>

                <!-- Filter Chips -->
                <div class="flex flex-wrap items-center gap-3">
                    <button v-for="filter in filters" :key="filter.value" @click="toggleFilter(filter.value)" :class="[
                        'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                        isFilterActive(filter.value)
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    ]">
                        <span class="material-icons text-base mr-1"
                            :class="isFilterActive(filter.value) ? '' : 'text-gray-400'">
                            {{ filter.icon }}
                        </span>
                        {{ filter.label }}
                    </button>
                </div>

                <!-- Location and Results Count -->
                <div class="flex justify-between items-center pt-1 border-t border-gray-100 mt-2">
                    <div class="flex items-center gap-2">
                        <span class="material-icons text-gray-400">location_on</span>
                        <div class="relative">
                            <button @click="toggleCityDropdown"
                                class="text-sm font-medium text-gray-700 flex items-center gap-1 hover:text-primary focus:outline-none">
                                {{ selectedCityLabel }} <span class="material-icons text-sm">expand_more</span>
                            </button>

                            <!-- City Dropdown -->
                            <div v-if="showCityDropdown"
                                class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                <button v-for="city in cities" :key="city.value" @click="selectCity(city.value)"
                                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    :class="{ 'bg-primary/10 text-primary': localSelectedCity === city.value }">
                                    {{ city.label }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <span class="text-xs font-medium text-gray-500">
                        Showing <span class="text-gray-900 font-bold">{{ resultsCount }}</span> restrooms
                    </span>
                </div>
            </div>
        </div>

        <!-- Location Alert -->
        <div v-if="!hasLocation" class="bg-blue-50 border-b border-blue-100 py-2.5 px-4">
            <div class="mx-auto w-full max-w-7xl flex items-center justify-center gap-2 text-sm text-blue-800">
                <span class="material-icons text-blue-500 text-base">my_location</span>
                <span class="font-bold">Location not available</span>
                <span class="mx-1 text-blue-300">|</span>
                <button @click="$emit('enableLocation')" class="text-blue-600 hover:underline">
                    Enable for distance sorting
                </button>
            </div>
        </div>

        <!-- Stats Bar -->
        <div class="bg-white border-b border-gray-200 py-3">
            <div class="mx-auto w-full max-w-7xl px-4 flex gap-6 text-sm">
                <div class="flex items-center gap-2">
                    <span class="material-icons text-gray-400 text-lg">format_list_bulleted</span>
                    <span class="font-bold text-gray-900">{{ resultsCount }}</span>
                    <span class="text-gray-500">Results</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-icons text-green-500 text-lg">check_circle</span>
                    <span class="font-bold text-gray-900">{{ freeCount }}</span>
                    <span class="text-gray-500">Free</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-icons text-yellow-500 text-lg">star</span>
                    <span class="font-bold text-gray-900">{{ avgRating }}</span>
                    <span class="text-gray-500">Avg Rating</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface FilterOption {
    value: string
    label: string
    icon: string
}

interface SortOption {
    value: string
    label: string
}

interface CityOption {
    value: string
    label: string
}

const props = defineProps<{
    searchQuery: string
    sortBy: string
    selectedCity: string
    activeFilters: string[]
    hasLocation: boolean
    resultsCount: number
    freeCount: number
    avgRating: number
}>()

const emit = defineEmits<{
    'update:searchQuery': [value: string]
    'update:sortBy': [value: string]
    'update:selectedCity': [value: string]
    'update:activeFilters': [value: string[]]
    'nearMe': []
    'enableLocation': []
}>()

const localSearchQuery = ref(props.searchQuery)
const localSortBy = ref(props.sortBy)
const localSelectedCity = ref(props.selectedCity)
const localActiveFilters = ref([...props.activeFilters])

const showSortDropdown = ref(false)
const showCityDropdown = ref(false)

const filters: FilterOption[] = [
    { value: 'all', label: 'All', icon: 'grid_view' },
    { value: 'free', label: 'Free', icon: 'check_circle_outline' },
    { value: 'paid', label: 'Paid', icon: 'payments' },
    { value: 'rated', label: 'Highly Rated', icon: 'star_outline' },
    { value: 'accessible', label: 'Accessible', icon: 'accessible' },
    { value: 'transport', label: 'Transport Hubs', icon: 'commute' }
]

const sortOptions: SortOption[] = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'newest', label: 'Recently Added' }
]

const cities: CityOption[] = [
    { value: 'all', label: 'All Cities' },
    { value: 'colombo', label: 'Colombo' },
    { value: 'kandy', label: 'Kandy' },
    { value: 'galle', label: 'Galle' },
    { value: 'maharagama', label: 'Maharagama' }
]

const selectedSortLabel = computed(() => {
    return sortOptions.find(opt => opt.value === localSortBy.value)?.label || 'Recommended'
})

const selectedCityLabel = computed(() => {
    return cities.find(city => city.value === localSelectedCity.value)?.label || 'All Cities'
})

function toggleSortDropdown() {
    showSortDropdown.value = !showSortDropdown.value
    showCityDropdown.value = false
}

function toggleCityDropdown() {
    showCityDropdown.value = !showCityDropdown.value
    showSortDropdown.value = false
}

function selectSort(value: string) {
    localSortBy.value = value
    emit('update:sortBy', value)
    showSortDropdown.value = false
}

function selectCity(value: string) {
    localSelectedCity.value = value
    emit('update:selectedCity', value)
    showCityDropdown.value = false
}

function toggleFilter(value: string) {
    if (value === 'all') {
        localActiveFilters.value = ['all']
    } else {
        const index = localActiveFilters.value.indexOf(value)
        if (index > -1) {
            localActiveFilters.value.splice(index, 1)
            if (localActiveFilters.value.length === 0) {
                localActiveFilters.value = ['all']
            }
        } else {
            localActiveFilters.value = localActiveFilters.value.filter(f => f !== 'all')
            localActiveFilters.value.push(value)
        }
    }
    emit('update:activeFilters', localActiveFilters.value)
}

function isFilterActive(value: string) {
    return localActiveFilters.value.includes(value)
}

// Close dropdowns when clicking outside
if (process.client) {
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (!target.closest('.relative')) {
            showSortDropdown.value = false
            showCityDropdown.value = false
        }
    })
}
</script>
