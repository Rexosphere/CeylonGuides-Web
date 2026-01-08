<template>
    <div class="lg:col-span-4 hidden lg:block">
        <div
            class="sticky top-40 bg-white dark:bg-card-dark rounded-2xl overflow-hidden shadow-card p-2 border border-gray-100 dark:border-gray-800">
            <div class="relative w-full h-[600px] bg-gray-100 rounded-xl overflow-hidden group cursor-pointer">
                <img alt="Map" class="w-full h-full object-cover opacity-90"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOR5YxA3cS9ZWn9ykUUc77dEs4YeAKXIyGs1fQWvnAqgPNnRAWtx2G3RAz_bVoNzJdcmMXXu6Tb_kjgfQGq9N8y2MuNlGgHD9MrT5_DP0nhVmGmgvmRSSrPvh_2jgVKLmsLUP-aVaLcc4JINVlWjOdA5t1ysodoVwh5ik98n4_-ZOcUhrqGjm54BE4qyyIgmP-vdMJdSHZfnK-D9oo3wb34oAa3CRfriDOnHxdmGLFNsz7CtfXuDBPh71UCbS7DeSq44Oe2iUl9UI" />

                <!-- Map Pins -->
                <div v-for="(pin, index) in mapPins" :key="index" class="absolute flex flex-col items-center"
                    :style="{ top: pin.top, left: pin.left }">
                    <span class="material-icons drop-shadow-md" :class="pin.color">location_on</span>
                </div>

                <!-- Map Controls -->
                <div class="absolute top-4 right-4 flex flex-col gap-2">
                    <button
                        class="bg-white w-8 h-8 rounded shadow flex items-center justify-center text-gray-600 hover:text-primary">
                        <span class="material-icons text-sm">add</span>
                    </button>
                    <button
                        class="bg-white w-8 h-8 rounded shadow flex items-center justify-center text-gray-600 hover:text-primary">
                        <span class="material-icons text-sm">remove</span>
                    </button>
                </div>

                <div class="absolute top-4 left-4">
                    <button
                        class="bg-white w-8 h-8 rounded shadow flex items-center justify-center text-gray-600 hover:text-primary">
                        <span class="material-icons text-sm">fullscreen</span>
                    </button>
                </div>

                <!-- Legend -->
                <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow text-xs">
                    <p class="font-bold mb-2 text-primary">Hygiene Rating</p>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="w-2 h-2 rounded-full bg-secondary"></span>
                        <span class="text-text-muted">Safe &amp; Secure / Grade A</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span class="text-text-muted">Grade B</span>
                    </div>
                </div>
            </div>

            <div class="p-3 text-center">
                <span class="text-xs text-gray-400">© OpenStreetMap contributors</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface MapPin {
    top: string
    left: string
    color: string
}

// Sample map pins - these would be dynamically generated based on restaurant locations
const mapPins: MapPin[] = [
    { top: '25%', left: '25%', color: 'text-secondary text-3xl' },
    { top: '50%', left: '50%', color: 'text-secondary text-3xl' },
    { top: '66%', left: '25%', color: 'text-secondary text-3xl' },
    { top: '33%', left: '66%', color: 'text-yellow-600 text-3xl' }
]
</script>
