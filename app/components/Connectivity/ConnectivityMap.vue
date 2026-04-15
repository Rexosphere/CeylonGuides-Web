<template>
    <section class="py-16 bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h2 class="text-2xl font-bold text-primary dark:text-white mb-1">Connectivity Map</h2>
                    <p class="text-text-muted text-sm">Find coverage, WiFi, and SIM sellers</p>
                </div>
                <button
                    class="bg-white border border-secondary text-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-full text-xs font-medium shadow-sm transition-all flex items-center gap-2">
                    <span class="material-icons text-sm">my_location</span> Near Me
                </button>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Sidebar -->
                <div class="w-full lg:w-1/4 space-y-6">
                    <!-- Map Layers -->
                    <div
                        class="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h4 class="font-bold text-primary dark:text-white mb-4 text-xs uppercase tracking-wide">Map
                            Layers</h4>
                        <div class="space-y-3">
                            <label class="flex items-center gap-3 cursor-pointer group">
                                <input checked
                                    class="rounded border-gray-300 text-primary focus:ring-secondary cursor-pointer h-4 w-4"
                                    type="checkbox" />
                                <span class="material-icons text-primary text-sm">public</span>
                                <span
                                    class="text-xs text-text-main dark:text-gray-300 group-hover:text-primary transition-colors">Network
                                    Coverage</span>
                            </label>
                            <label class="flex items-center gap-3 cursor-pointer group">
                                <input
                                    class="rounded border-gray-300 text-primary focus:ring-secondary cursor-pointer h-4 w-4"
                                    type="checkbox" />
                                <span class="material-icons text-secondary text-sm">wifi</span>
                                <span
                                    class="text-xs text-text-main dark:text-gray-300 group-hover:text-primary transition-colors">Public
                                    WiFi Zones</span>
                            </label>
                            <label class="flex items-center gap-3 cursor-pointer group">
                                <input
                                    class="rounded border-gray-300 text-primary focus:ring-secondary cursor-pointer h-4 w-4"
                                    type="checkbox" />
                                <span class="material-icons text-secondary text-sm">laptop_mac</span>
                                <span
                                    class="text-xs text-text-main dark:text-gray-300 group-hover:text-primary transition-colors">Coworking
                                    & Cafes</span>
                            </label>
                            <label class="flex items-center gap-3 cursor-pointer group">
                                <input
                                    class="rounded border-gray-300 text-primary focus:ring-secondary cursor-pointer h-4 w-4"
                                    type="checkbox" />
                                <span class="material-icons text-accent-info text-sm">store</span>
                                <span
                                    class="text-xs text-text-main dark:text-gray-300 group-hover:text-primary transition-colors">SIM
                                    Sellers</span>
                            </label>
                        </div>
                    </div>

                    <!-- Browse Locations -->
                    <div
                        class="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h4 class="font-bold text-primary dark:text-white mb-4 text-xs uppercase tracking-wide">Browse
                            Locations</h4>
                        <ul class="space-y-3 text-xs">
                            <li
                                class="flex items-center gap-2 text-text-muted hover:text-primary cursor-pointer transition-colors group">
                                <span
                                    class="material-icons text-accent-info text-sm group-hover:text-primary transition-colors">flight</span>
                                <div>
                                    <span class="font-bold block">Bandaranaike International Airport</span>
                                    <span class="text-[10px]">Airport SIM Counter</span>
                                </div>
                            </li>
                            <li
                                class="flex items-center gap-2 text-text-muted hover:text-primary cursor-pointer transition-colors group">
                                <span
                                    class="material-icons text-accent-info text-sm group-hover:text-primary transition-colors">flight</span>
                                <div>
                                    <span class="font-bold block">Mattala Rajapaksa International Airport</span>
                                    <span class="text-[10px]">Airport SIM Counter</span>
                                </div>
                            </li>
                            <li
                                class="flex items-center gap-2 text-text-muted hover:text-primary cursor-pointer transition-colors group">
                                <span
                                    class="material-icons text-accent-info text-sm group-hover:text-primary transition-colors">flight</span>
                                <div>
                                    <span class="font-bold block">Jaffna International Airport</span>
                                    <span class="text-[10px]">Airport SIM Counter</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Map -->
                <div class="w-full lg:w-3/4 h-[500px] bg-gray-100 rounded-2xl overflow-hidden relative shadow-inner">
                    <img alt="Connectivity Map Preview" class="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOR5YxA3cS9ZWn9ykUUc77dEs4YeAKXIyGs1fQWvnAqgPNnRAWtx2G3RAz_bVoNzJdcmMXXu6Tb_kjgfQGq9N8y2MuNlGgHD9MrT5_DP0nhVmGmgvmRSSrPvh_2jgVKLmsLUP-aVaLcc4JINVlWjOdA5t1ysodoVwh5ik98n4_-ZOcUhrqGjm54BE4qyyIgmP-vdMJdSHZfnK-D9oo3wb34oAa3CRfriDOnHxdmGLFNsz7CtfXuDBPh71UCbS7DeSq44Oe2iUl9UI" />
                    <div class="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none"></div>
                    <div
                        class="absolute bottom-4 right-4 bg-white dark:bg-card-dark p-1.5 px-3 rounded-lg shadow-md text-[10px] text-text-muted border border-gray-100">
                        Leaflet | © OpenStreetMap contributors © CARTO
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>
