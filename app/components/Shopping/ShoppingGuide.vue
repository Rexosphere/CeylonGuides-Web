<template>
    <section>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Smart Shopping Guide</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
                class="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-subtle">
                <div class="flex items-center gap-2 mb-4">
                    <span class="material-symbols-outlined text-primary">verified</span>
                    <h3 class="font-bold text-slate-900 dark:text-white">Authentic Experience</h3>
                </div>
                <ul class="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <li class="flex gap-2"><span
                            class="material-symbols-outlined text-[16px] text-primary">check_circle</span> Gems with a
                        government certificate from the NGJA (National Gem and Jewelry Authority)</li>
                    <li class="flex gap-2"><span
                            class="material-symbols-outlined text-[16px] text-primary">check_circle</span> Tea packs
                        bearing the "Lion Logo" of authenticity from Sri Lanka Tea Board</li>
                    <li class="flex gap-2"><span
                            class="material-symbols-outlined text-[16px] text-primary">check_circle</span> Fixed prices
                        in government shops like Laksala</li>
                    <li class="flex gap-2"><span
                            class="material-symbols-outlined text-[16px] text-primary">check_circle</span> Spices with
                        organic/ethically-sourced labels</li>
                    <li class="flex gap-2"><span
                            class="material-symbols-outlined text-[16px] text-primary">check_circle</span> Hand-carved
                        masks from Kaduru wood with natural pigments</li>
                    <li class="flex gap-2"><span
                            class="material-symbols-outlined text-[16px] text-primary">check_circle</span> Certificates
                        with online verification for high-value gems</li>
                </ul>
            </div>
            <div
                class="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-subtle">
                <div class="flex items-center gap-2 mb-4">
                    <span class="material-symbols-outlined text-crimson">warning</span>
                    <h3 class="font-bold text-slate-900 dark:text-white">Common Shopping Scams</h3>
                </div>
                <ul class="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <li
                        class="flex gap-2 items-start p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span class="material-symbols-outlined text-[16px] text-crimson shrink-0">cancel</span>
                        <div>
                            <strong class="block text-slate-800 dark:text-white mb-0.5">Tuk-Tuk Commission Gem Shop
                                Scam</strong>
                            Tuk-tuk drivers taking you to "special gem museums" for commission
                        </div>
                    </li>
                    <li
                        class="flex gap-2 items-start p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span class="material-symbols-outlined text-[16px] text-crimson shrink-0">cancel</span>
                        <div>
                            <strong class="block text-slate-800 dark:text-white mb-0.5">Spice Garden Inflated
                                Pricing</strong>
                            Spice gardens with extremely inflated prices (3-5x markup)
                        </div>
                    </li>
                    <li
                        class="flex gap-2 items-start p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span class="material-symbols-outlined text-[16px] text-crimson shrink-0">cancel</span>
                        <div>
                            <strong class="block text-slate-800 dark:text-white mb-0.5">Fake Certificates &amp; Stone
                                Swapping</strong>
                            Street gem vendors with fake stones and certificates. 90% of street offers are scams.
                        </div>
                    </li>
                    <li
                        class="flex gap-2 items-start p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span class="material-symbols-outlined text-[16px] text-crimson shrink-0">cancel</span>
                        <div>
                            <strong class="block text-slate-800 dark:text-white mb-0.5">Pickpocket Risk</strong>
                            Crowded markets often harbor pickpockets. Stay alert.
                        </div>
                    </li>
                </ul>
            </div>
            <div
                class="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-subtle">
                <div class="flex items-center gap-2 mb-4">
                    <span class="material-symbols-outlined text-primary">handshake</span>
                    <h3 class="font-bold text-slate-900 dark:text-white">Bargaining Tips</h3>
                </div>
                <div class="space-y-2">
                    <div
                        class="bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                        In street markets like Pettah, bargaining is expected and polite</div>
                    <div
                        class="bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                        In malls, supermarkets, and Laksala, prices are fixed</div>
                    <div
                        class="bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                        Start by offering 30-50% of the initial price</div>
                    <div
                        class="bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                        Be polite and friendly throughout - smile gets better prices</div>
                    <div
                        class="bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                        If price is too high, politely walk away - vendors often call you back</div>
                    <div
                        class="bg-slate-50 dark:bg-slate-900 p-2.5 rounded border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                        Always ask the price before buying</div>
                </div>
            </div>
            <div
                class="bg-white dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-subtle">
                <div class="flex items-center gap-2 mb-4">
                    <span class="material-symbols-outlined text-primary">shopping_bag</span>
                    <h3 class="font-bold text-slate-900 dark:text-white">Duty Free Info</h3>
                </div>
                <ul class="space-y-4 text-xs text-slate-600 dark:text-slate-400">
                    <li><strong>Tea:</strong> Up to 3kg can be exported duty-free</li>
                    <li><strong>Gems:</strong> Ensure you have an official receipt for customs</li>
                    <li><strong>Currency:</strong> Retain exchange receipts to convert leftover Rupees at airport</li>
                    <li><strong>VAT Refund:</strong> Available for tourists spending over LKR 50,000</li>
                    <li>Save all receipts for large purchases</li>
                    <li>Major shops can assist with VAT refund forms</li>
                </ul>
            </div>
        </div>
    </section>
</template>
