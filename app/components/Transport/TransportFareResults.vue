<template>
    <div
        class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
        <!-- Tabs -->
        <div class="flex border-b border-slate-100 dark:border-slate-800">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                :class="activeTab === tab.id ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400'"
                class="flex-1 py-4 text-sm font-semibold transition flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-xl">{{ tab.icon }}</span>
                {{ tab.label }}
            </button>
            <div class="flex-1 hidden lg:block border-b border-slate-100 dark:border-slate-800"></div>
        </div>

        <!-- Tab Content -->
        <div class="p-6 lg:p-8">
            <!-- Routes & Fares Tab -->
            <div v-if="activeTab === 'fares'" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- Fare Card -->
                <div class="lg:col-span-4">
                    <div
                        class="bg-[#0f766e] rounded-2xl p-6 text-white h-full relative overflow-hidden shadow-lg flex flex-col justify-center">
                        <div class="absolute -top-4 -right-4 p-8 opacity-10 rotate-12">
                            <span class="material-symbols-outlined text-9xl">calculate</span>
                        </div>

                        <h4 class="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Estimated Fare</h4>
                        <div class="flex items-baseline gap-2 mb-6">
                            <span class="text-5xl font-bold tracking-tight">3,610</span>
                            <span class="text-xl font-medium opacity-80">LKR</span>
                        </div>

                        <div
                            class="flex items-center gap-6 mb-8 text-sm font-medium opacity-90 border-t border-white/20 pt-4">
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-xl">distance</span> 32.4 km
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="material-symbols-outlined text-xl">schedule</span> 55 min
                            </div>
                        </div>

                        <button
                            class="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-sm">
                            <span class="material-symbols-outlined text-lg">verified_user</span>
                            Fair Estimate Check
                        </button>

                        <p class="text-[10px] text-center mt-4 opacity-70 font-medium">
                            Based on standard meter rates. Negotiate if higher.
                        </p>
                    </div>
                </div>

                <!-- Comparison Options -->
                <div class="lg:col-span-8 flex flex-col justify-between">
                    <div>
                        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">Compare Options</h3>
                        <div class="space-y-3">
                            <div v-for="option in comparisonOptions" :key="option.id"
                                class="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl hover:shadow-md hover:border-slate-200 transition-all group cursor-pointer">
                                <div class="flex items-center gap-4">
                                    <div :class="option.iconBg" class="p-2.5 rounded-lg">
                                        <span class="material-symbols-outlined text-2xl">{{ option.icon }}</span>
                                    </div>
                                    <div>
                                        <h5 class="font-bold text-slate-900 dark:text-white text-base">{{ option.title
                                        }}</h5>
                                        <p class="text-xs text-slate-500 font-medium">{{ option.subtitle }}</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-slate-900 dark:text-white">{{ option.price }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Standard Rates Footer -->
                    <div
                        class="mt-8 pt-5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                        <div
                            class="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                            <span class="material-symbols-outlined text-primary text-xl">payments</span>
                            Standard Tuk-Tuk Fares
                        </div>
                        <div class="flex gap-6 font-medium">
                            <span>First km: <strong class="text-slate-900 dark:text-white">Rs. 100</strong></span>
                            <span>Per km: <strong class="text-slate-900 dark:text-white">Rs. 100</strong></span>
                            <span>Waiting/hr: <strong class="text-slate-900 dark:text-white">Rs. 60</strong></span>
                            <span class="text-accent-danger font-bold">Night +15%</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Travel Tips Tab -->
            <div v-else-if="activeTab === 'tips'" class="flex-1 w-full -mx-6 lg:-mx-8 px-6 lg:px-8">
                <div class="mx-auto flex max-w-[1024px] flex-col gap-8 lg:flex-row items-start">
                    <!-- Sidebar -->
                    <aside class="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-24">
                        <div
                            class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-soft overflow-hidden">
                            <div
                                class="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                                <h2 class="text-slate-900 dark:text-white text-base font-bold flex items-center gap-2">
                                    <span class="material-symbols-outlined text-secondary text-[20px]">summarize</span>
                                    Journey Context
                                </h2>
                            </div>
                            <div class="p-0">
                                <div
                                    class="flex justify-between items-center px-5 py-3.5 border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">Location</span>
                                    <span class="text-slate-900 dark:text-white text-sm font-bold">Sri Lanka</span>
                                </div>
                                <div
                                    class="flex justify-between items-center px-5 py-3.5 border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">Currency</span>
                                    <span class="text-slate-900 dark:text-white text-sm font-bold">LKR (Rs.)</span>
                                </div>
                                <div
                                    class="flex justify-between items-center px-5 py-3.5 border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <span
                                        class="text-slate-500 dark:text-slate-400 text-sm font-medium">Emergency</span>
                                    <span class="text-slate-900 dark:text-white text-sm font-bold">119</span>
                                </div>
                                <div
                                    class="flex justify-between items-center px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">Tourist
                                        Police</span>
                                    <span class="text-slate-900 dark:text-white text-sm font-bold">1912</span>
                                </div>
                            </div>
                        </div>

                        <div
                            class="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden h-[220px] relative group cursor-pointer shadow-soft">
                            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBD5B_lPFHqHDO9-hKqkE6UjNb9iHuaoGL34ig6mx8yQl5rVAGPNfvz--9bSoGriZKagQN0MU7pH-R0hsjrfEf7aJg92SLhyCXr9ZsC0syYVynhipoF4wI6A9ITC78idBwbg5-yKfdZPqXNEKdT82cIS-Xyvx-5BBw2Ovwx2BhFdOOuS9u6q6MGFLJPgMHRaFQ8K6QWExm4sP6jGdwzb1wy88yDIxPKuNgR4K2hguLNVpvLf3NM-531tW900L1jeLGsqdTP7Cnxvjc");'>
                            </div>
                            <div class="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors">
                            </div>
                            <div class="absolute bottom-4 left-4 right-4">
                                <button
                                    class="w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm py-2.5 px-4 rounded-lg text-sm font-bold text-slate-900 dark:text-white shadow-sm flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-slate-700 hover:text-primary transition-all border border-slate-200 dark:border-slate-700">
                                    <span class="material-symbols-outlined text-[18px] text-primary">map</span>
                                    View Safe Zones
                                </button>
                            </div>
                        </div>
                    </aside>

                    <!-- Main Content -->
                    <main class="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-10 items-start">
                        <!-- Quick Tips Section -->
                        <section class="flex flex-col gap-6">
                            <div
                                class="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700/50">
                                <span class="material-symbols-outlined text-primary text-[24px]">lightbulb</span>
                                <h2 class="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Quick Tips
                                </h2>
                            </div>

                            <div class="flex flex-col gap-6">
                                <div class="flex gap-4 items-start group">
                                    <div
                                        class="flex-shrink-0 mt-0.5 text-primary transition-transform duration-300 group-hover:scale-110">
                                        <span class="material-symbols-outlined text-[24px]">handshake</span>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-bold text-slate-900 dark:text-white">Agree on price
                                            first</h3>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">Always
                                            negotiate and agree on the fare before getting in.</p>
                                    </div>
                                </div>

                                <div class="flex gap-4 items-start group">
                                    <div
                                        class="flex-shrink-0 mt-0.5 text-primary transition-transform duration-300 group-hover:scale-110">
                                        <span class="material-symbols-outlined text-[24px]">photo_camera</span>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-bold text-slate-900 dark:text-white">Take a photo of
                                            plate</h3>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">Snap
                                            the license plate before entering. Acts as a safety record.</p>
                                    </div>
                                </div>

                                <div class="flex gap-4 items-start group">
                                    <div
                                        class="flex-shrink-0 mt-0.5 text-primary transition-transform duration-300 group-hover:scale-110">
                                        <span class="material-symbols-outlined text-[24px]">explore</span>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-bold text-slate-900 dark:text-white">Track your route
                                        </h3>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">Use
                                            Google Maps to ensure the driver takes the optimal path.</p>
                                    </div>
                                </div>

                                <div class="flex gap-4 items-start group">
                                    <div
                                        class="flex-shrink-0 mt-0.5 text-primary transition-transform duration-300 group-hover:scale-110">
                                        <span class="material-symbols-outlined text-[24px]">payments</span>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-bold text-slate-900 dark:text-white">Keep small bills
                                        </h3>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                            Drivers often claim no change. Keep small notes ready.</p>
                                    </div>
                                </div>

                                <div class="flex gap-4 items-start group">
                                    <div
                                        class="flex-shrink-0 mt-0.5 text-primary transition-transform duration-300 group-hover:scale-110">
                                        <span class="material-symbols-outlined text-[24px]">person_off</span>
                                    </div>
                                    <div>
                                        <h3 class="text-sm font-bold text-slate-900 dark:text-white">Avoid touts at
                                            tourist spots</h3>
                                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">Ignore
                                            overly friendly strangers approaching you at landmarks.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Common Scams Section -->
                        <section class="flex flex-col gap-6">
                            <div
                                class="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700/50">
                                <span class="material-symbols-outlined text-accent-danger text-[24px]">warning</span>
                                <h2 class="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Common Scams
                                </h2>
                            </div>

                            <div class="flex flex-col gap-4">
                                <div
                                    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-700/30 transition-all group">
                                    <div class="flex gap-4 items-start">
                                        <div class="flex-shrink-0 mt-0.5">
                                            <div
                                                class="size-8 rounded-full bg-red-50 dark:bg-red-900/20 text-accent-danger flex items-center justify-center border border-red-200 dark:border-red-800">
                                                <span class="material-symbols-outlined text-[18px]">no_crash</span>
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex justify-between items-start mb-1">
                                                <h3 class="text-sm font-bold text-slate-900 dark:text-white">"Meter
                                                    Broken" or "No Meter"</h3>
                                                <span
                                                    class="text-[10px] font-bold uppercase tracking-wider text-accent-danger bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800">High
                                                    Risk</span>
                                            </div>
                                            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                                                Driver claims meter is broken or missing, then quotes an inflated fixed
                                                price.</p>
                                            <p class="text-xs text-slate-600 dark:text-slate-300">
                                                <span class="font-bold text-secondary">Solution:</span> Insist on a
                                                metered tuk-tuk or find another driver.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-700/30 transition-all group">
                                    <div class="flex gap-4 items-start">
                                        <div class="flex-shrink-0 mt-0.5">
                                            <div
                                                class="size-8 rounded-full bg-red-50 dark:bg-red-900/20 text-accent-danger flex items-center justify-center border border-red-200 dark:border-red-800">
                                                <span class="material-symbols-outlined text-[18px]">block</span>
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex justify-between items-start mb-1">
                                                <h3 class="text-sm font-bold text-slate-900 dark:text-white">"Hotel
                                                    Closed" / "Road Closed"</h3>
                                            </div>
                                            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                                                Driver claims your destination is closed to take you elsewhere for
                                                commission.</p>
                                            <p class="text-xs text-slate-600 dark:text-slate-300">
                                                <span class="font-bold text-secondary">Solution:</span> Check Google
                                                Maps, insist on original drop-off.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-700/30 transition-all group">
                                    <div class="flex gap-4 items-start">
                                        <div class="flex-shrink-0 mt-0.5">
                                            <div
                                                class="size-8 rounded-full bg-red-50 dark:bg-red-900/20 text-accent-danger flex items-center justify-center border border-red-200 dark:border-red-800">
                                                <span class="material-symbols-outlined text-[18px]">celebration</span>
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex justify-between items-start mb-1">
                                                <h3 class="text-sm font-bold text-slate-900 dark:text-white">"Special
                                                    Festival Today"</h3>
                                            </div>
                                            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                                                Tells you about a fake "one-day only" festival to detour you to gem
                                                shops.</p>
                                            <p class="text-xs text-slate-600 dark:text-slate-300">
                                                <span class="font-bold text-secondary">Solution:</span> Politely decline
                                                and stick to the plan.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-700/30 transition-all group">
                                    <div class="flex gap-4 items-start">
                                        <div class="flex-shrink-0 mt-0.5">
                                            <div
                                                class="size-8 rounded-full bg-red-50 dark:bg-red-900/20 text-accent-danger flex items-center justify-center border border-red-200 dark:border-red-800">
                                                <span class="material-symbols-outlined text-[18px]">money_off</span>
                                            </div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex justify-between items-start mb-1">
                                                <h3 class="text-sm font-bold text-slate-900 dark:text-white">"No Change"
                                                </h3>
                                            </div>
                                            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                                                Driver claims no change for big notes to keep the difference.</p>
                                            <p class="text-xs text-slate-600 dark:text-slate-300">
                                                <span class="font-bold text-secondary">Solution:</span> Carry small
                                                notes (approx 20s, 50s, 100s).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            <!-- Phrases Tab -->
            <div v-else-if="activeTab === 'phrases'">
                <div class="flex items-center gap-2 mb-6 text-slate-600 dark:text-slate-300">
                    <span class="material-symbols-outlined text-xl">record_voice_over</span>
                    <h2 class="text-xs font-bold uppercase tracking-wider">Negotiation Phrases</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Ask Price -->
                    <div
                        class="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 rounded-xl p-5 hover:border-primary/30 transition-colors group h-full flex flex-col justify-between">
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-lg">🇱🇰</span>
                                <h3 class="text-sm font-bold text-slate-700 dark:text-slate-200">Ask Price</h3>
                            </div>
                            <p class="text-lg font-bold text-slate-900 dark:text-white mb-1">"Mee-tara kee-yada?"</p>
                            <p class="text-xs text-slate-500 font-medium">How much to here?</p>
                        </div>
                    </div>

                    <!-- Negotiate -->
                    <div
                        class="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-slate-700 rounded-xl p-5 hover:border-blue-200 transition-colors group h-full flex flex-col justify-between">
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-lg">💰</span>
                                <h3 class="text-sm font-bold text-blue-700 dark:text-blue-300">Negotiate</h3>
                            </div>
                            <p class="text-lg font-bold text-slate-900 dark:text-white mb-1">"Mee-tara [price] hari-da?"
                            </p>
                            <p class="text-xs text-slate-500 font-medium">Is [price] okay for here?</p>
                        </div>
                    </div>

                    <!-- Use Meter -->
                    <div
                        class="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-slate-700 rounded-xl p-5 hover:border-orange-200 transition-colors group h-full flex flex-col justify-between relative">
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span
                                    class="material-symbols-outlined text-orange-700 dark:text-orange-300 text-lg">smartphone</span>
                                <h3 class="text-sm font-bold text-orange-700 dark:text-orange-300">Use Meter</h3>
                            </div>
                            <p class="text-lg font-bold text-slate-900 dark:text-white mb-1">"Meter danna"</p>
                            <p class="text-xs text-slate-500 font-medium">Turn on the meter</p>
                        </div>
                        <div
                            class="mt-4 bg-orange-50/80 dark:bg-slate-800 rounded-lg py-2 px-3 flex items-center justify-center gap-2 border border-orange-100 dark:border-slate-600">
                            <span class="material-symbols-outlined text-orange-700 text-sm">shield</span>
                            <span
                                class="text-[10px] font-bold text-orange-800 dark:text-orange-200 uppercase tracking-wide">Tips</span>
                        </div>
                    </div>

                    <!-- Thank You -->
                    <div
                        class="bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-slate-700 rounded-xl p-5 hover:border-green-200 transition-colors group h-full flex flex-col justify-between">
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-lg">🙏</span>
                                <h3 class="text-sm font-bold text-green-700 dark:text-green-300">Thank You</h3>
                            </div>
                            <p class="text-lg font-bold text-slate-900 dark:text-white mb-1">"Istuti"</p>
                            <p class="text-xs text-slate-500 font-medium">Thank you</p>
                        </div>
                    </div>

                    <!-- Stop Here -->
                    <div
                        class="bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-slate-700 rounded-xl p-5 hover:border-purple-200 transition-colors group h-full flex flex-col justify-between">
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span
                                    class="material-symbols-outlined text-purple-700 dark:text-purple-300 text-lg">pan_tool</span>
                                <h3 class="text-sm font-bold text-purple-700 dark:text-purple-300">Stop Here</h3>
                            </div>
                            <p class="text-lg font-bold text-slate-900 dark:text-white mb-1">"Meh-he nawath-wanna"</p>
                            <p class="text-xs text-slate-500 font-medium">Stop here please</p>
                        </div>
                    </div>

                    <!-- Too Expensive -->
                    <div
                        class="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-slate-700 rounded-xl p-5 hover:border-red-200 transition-colors group h-full flex flex-col justify-between">
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span
                                    class="material-symbols-outlined text-accent-danger dark:text-red-400 text-lg">close</span>
                                <h3 class="text-sm font-bold text-accent-danger dark:text-red-400">Too Expensive</h3>
                            </div>
                            <p class="text-lg font-bold text-slate-900 dark:text-white mb-1">"Ganan wadi"</p>
                            <p class="text-xs text-slate-500 font-medium">That's too expensive</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Safety Tab -->
            <div v-else-if="activeTab === 'safety'">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <!-- Emergency Contacts -->
                    <div
                        class="bg-red-50/50 dark:bg-red-900/10 rounded-xl p-6 border border-red-100 dark:border-red-900/20">
                        <div class="flex items-center gap-2 mb-6">
                            <span class="material-symbols-outlined text-accent-danger text-2xl">medical_services</span>
                            <h2 class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Emergency Contacts</h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                                class="bg-white dark:bg-surface-dark rounded-lg p-3 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                                <span class="text-xl font-bold text-accent-danger">119</span>
                                <span class="text-sm text-slate-600 dark:text-slate-300">Police</span>
                            </div>

                            <div
                                class="bg-white dark:bg-surface-dark rounded-lg p-3 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                                <span class="text-xl font-bold text-accent-danger">1912</span>
                                <span class="text-sm text-slate-600 dark:text-slate-300">Tourist Police</span>
                            </div>

                            <div
                                class="bg-white dark:bg-surface-dark rounded-lg p-3 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                                <span class="text-xl font-bold text-accent-danger">1990</span>
                                <span class="text-sm text-slate-600 dark:text-slate-300">Ambulance</span>
                            </div>

                            <div
                                class="bg-white dark:bg-surface-dark rounded-lg p-3 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                                <span class="text-xl font-bold text-accent-danger">1969</span>
                                <span class="text-sm text-slate-600 dark:text-slate-300">Roadside Help</span>
                            </div>
                        </div>
                    </div>

                    <!-- Safety Tips -->
                    <div>
                        <div class="flex items-center gap-2 mb-6">
                            <span class="material-symbols-outlined text-primary text-xl">verified_user</span>
                            <h2 class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Safety Tips</h2>
                        </div>

                        <div class="space-y-6">
                            <div class="flex gap-3">
                                <span
                                    class="material-symbols-outlined text-primary text-xl shrink-0">share_location</span>
                                <p class="text-sm text-slate-600 dark:text-slate-400 leading-snug">Share your live
                                    location with a trusted contact</p>
                            </div>

                            <div class="flex gap-3">
                                <span
                                    class="material-symbols-outlined text-primary text-xl shrink-0">night_shelter</span>
                                <p class="text-sm text-slate-600 dark:text-slate-400 leading-snug">Avoid traveling alone
                                    late at night</p>
                            </div>

                            <div class="flex gap-3">
                                <span class="material-symbols-outlined text-primary text-xl shrink-0">credit_card</span>
                                <p class="text-sm text-slate-600 dark:text-slate-400 leading-snug">Keep valuables hidden
                                    and secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Other Tabs (Placeholder) -->
            <div v-else class="text-center py-12 text-slate-500 dark:text-slate-400">
                <span class="material-symbols-outlined text-5xl mb-4 opacity-30">{{tabs.find(t => t.id ===
                    activeTab)?.icon}}</span>
                <p class="font-medium">{{tabs.find(t => t.id === activeTab)?.label}} content coming soon...</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('fares')

const tabs = [
    { id: 'fares', label: 'Routes & Fares', icon: 'currency_rupee' },
    { id: 'tips', label: 'Travel Tips', icon: 'lightbulb' },
    { id: 'phrases', label: 'Phrases', icon: 'translate' },
    { id: 'safety', label: 'Safety', icon: 'security' }
]

const comparisonOptions = [
    {
        id: 1,
        icon: 'directions_bus',
        iconBg: 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400',
        title: 'Express Bus',
        subtitle: 'Fast A/C express buses via highway',
        price: 'Rs. 950'
    },
    {
        id: 2,
        icon: 'train',
        iconBg: 'bg-amber-50 dark:bg-slate-700 text-amber-600 dark:text-amber-500',
        title: 'Train (2nd Class)',
        subtitle: 'Scenic railway journey (unreserved)',
        price: 'Rs. 600'
    },
    {
        id: 3,
        icon: 'local_taxi',
        iconBg: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
        title: 'PickMe / Uber',
        subtitle: 'App-based ride with fixed pricing',
        price: 'Rs. 3,800'
    },
    {
        id: 4,
        icon: 'star',
        iconBg: 'bg-yellow-50 dark:bg-slate-700 text-yellow-600 dark:text-yellow-500',
        title: 'Private Taxi',
        subtitle: 'Comfortable private car with driver',
        price: 'Rs. 4,500'
    }
]
</script>
