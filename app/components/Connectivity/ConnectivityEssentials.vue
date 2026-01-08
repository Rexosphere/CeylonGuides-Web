<template>
    <section class="py-16 bg-white dark:bg-card-dark border-y border-gray-200 dark:border-gray-800">
        <div class="container mx-auto px-6">
            <h2 class="text-2xl font-bold text-primary dark:text-white mb-4">Connectivity Essentials</h2>
            <p class="text-text-muted text-sm mb-10">Everything you need to know about getting connected</p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Where to Buy -->
                <div
                    class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark hover:shadow-card transition-all h-full">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="material-icons text-secondary text-2xl">storefront</span>
                        <h3 class="font-bold text-sm text-primary dark:text-white">Where to Buy</h3>
                    </div>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Airport Arrival Lobby (24/7)</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Dialog, Mobitel, Hutch counters at Arrival lobby</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Prices slightly higher than city but convenient</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>City: Arcades, retail chains (Keells, Singer) offer deals</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Passport required for registration</span>
                        </li>
                    </ul>
                </div>

                <!-- APN Settings -->
                <div
                    class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark hover:shadow-card transition-all h-full flex flex-col">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="material-icons text-secondary text-2xl">settings</span>
                        <h3 class="font-bold text-sm text-primary dark:text-white">APN Settings</h3>
                    </div>
                    <div class="text-[10px] uppercase text-text-muted font-bold mb-2 tracking-wide">Usually Automatic
                    </div>
                    <ul class="space-y-3 mb-4 flex-grow">
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">code</span>
                            <span>Dialog: "dialogbb"</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">code</span>
                            <span>Mobitel: "mobitel"</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">code</span>
                            <span>Hutch: "hutch3g"</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">refresh</span>
                            <span>Restart phone after installing SIM</span>
                        </li>
                    </ul>
                    <div
                        class="bg-accent-danger/5 dark:bg-red-900/10 p-2 rounded border border-accent-danger/20 flex gap-2 items-start">
                        <span class="material-icons text-accent-danger text-[14px] mt-0.5">warning_amber</span>
                        <p class="text-[10px] text-accent-danger dark:text-red-300 font-medium">If data fails, ensure
                            APN is set correctly.</p>
                    </div>
                </div>

                <!-- Top Up Anywhere -->
                <div
                    class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark hover:shadow-card transition-all h-full">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="material-icons text-secondary text-2xl">payments</span>
                        <h3 class="font-bold text-sm text-primary dark:text-white">Top Up Anywhere</h3>
                    </div>
                    <div class="text-[10px] uppercase text-text-muted font-bold mb-2 tracking-wide">Easy Reload Options
                    </div>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Use Provider Apps (MyDialog, SelfCare)</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Supermarkets (Keells, Cargills) checkout counters</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Communication shops in every town</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Online banking or Daraz app</span>
                        </li>
                    </ul>
                </div>

                <!-- Coverage & Gaps -->
                <div
                    class="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark hover:shadow-card transition-all h-full flex flex-col">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="material-icons text-secondary text-2xl">signal_cellular_off</span>
                        <h3 class="font-bold text-sm text-primary dark:text-white">Coverage & Gaps</h3>
                    </div>
                    <div class="text-[10px] uppercase text-text-muted font-bold mb-2 tracking-wide">Varies by Terrain
                    </div>
                    <ul class="space-y-3 mb-4 flex-grow">
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Colombo/West Coast: Excellent 4G/5G</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Hill Country: Signal drops common (Dialog/Mobitel best)</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Power cuts may affect towers (check via apps)</span>
                        </li>
                        <li class="flex items-start gap-2 text-xs text-text-muted">
                            <span class="material-icons text-secondary text-[14px] mt-0.5">check</span>
                            <span>Download offline maps for remote areas</span>
                        </li>
                    </ul>
                    <div class="bg-accent-danger/10 p-2 rounded border border-accent-danger/20 flex gap-2 items-start">
                        <span class="material-icons text-accent-danger text-[14px] mt-0.5">warning</span>
                        <p class="text-[10px] text-accent-danger dark:text-red-300 font-medium">Stick to Dialog/Mobitel
                            for deep rural travel.</p>
                    </div>
                </div>
            </div>

            <!-- eSIM Activation Guide -->
            <ConnectivityESIMGuide />
        </div>
    </section>
</template>

<script setup lang="ts">
</script>
