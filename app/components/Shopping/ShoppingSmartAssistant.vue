<template>
    <section
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-subtle border border-slate-200 dark:border-slate-700 p-6 md:p-8">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Smart Shopping Assistant</h2>
        <p class="text-slate-500 dark:text-slate-400 mb-6 text-sm">Get personalized advice based on what and where
            you're buying</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1">I'm buying:</label>
                <select
                    class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    <option>Gems</option>
                    <option>Tea</option>
                    <option>Spices</option>
                    <option>Masks</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1">Where are you shopping?</label>
                <select
                    class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    <option>Boutique (Galle Fort)</option>
                    <option>Market (Pettah)</option>
                    <option>Gem Store (Kandy)</option>
                    <option>Mall (Colombo)</option>
                </select>
            </div>
        </div>
        <div class="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-crimson p-4 mb-8 rounded-r-lg">
            <div class="flex items-center gap-2 mb-1">
                <span class="material-symbols-outlined text-crimson text-lg">warning</span>
                <h4 class="font-bold text-rose-800 dark:text-rose-300 text-sm">High Scam Risk</h4>
            </div>
            <p class="text-xs text-rose-700 dark:text-rose-300">Exercise extreme caution with this combination</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
                <div class="flex items-center gap-2 mb-4">
                    <span class="material-symbols-outlined text-primary">fact_check</span>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white">Authenticity Checklist</h4>
                </div>
                <ul class="space-y-3">
                    <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span class="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                        Demand gem certificate from NGJA, GIA, or IGI
                    </li>
                    <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span class="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                        Verify certificate online before leaving Sri Lanka
                    </li>
                    <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span class="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                        Real certificates have watermarked paper and unique numbering
                    </li>
                    <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span class="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                        Buy from licensed dealers recognized by National Gem and Jewelry Authority
                    </li>
                    <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span class="material-symbols-outlined text-crimson text-[16px]">cancel</span>
                        NEVER accept stone without certification - this is a red flag
                    </li>
                </ul>
            </div>
            <div>
                <div class="flex items-center gap-2 mb-4">
                    <span class="material-symbols-outlined text-primary">psychology</span>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white">Bargaining Strategy</h4>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">Limited bargaining. You can
                    try asking for 5-10% discount on high-value items, but most prices are firm.</p>
            </div>
        </div>
        <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 mb-6 border border-slate-200 dark:border-slate-700">
            <div class="flex items-center gap-2 mb-3">
                <span class="material-symbols-outlined text-crimson">error</span>
                <h4 class="font-bold text-sm text-slate-900 dark:text-white">Scam Risks to Watch For</h4>
            </div>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                <li class="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-400">
                    <span class="material-symbols-outlined text-[14px]">warning</span>
                    <span class="font-bold">EXTREME RISK:</span> 90% of street gem offers are complete scams
                </li>
                <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-[14px] text-crimson">warning</span>
                    Tuk-tuk drivers get 30-50% commission to bring you to "special" gem shops
                </li>
                <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-[14px] text-crimson">warning</span>
                    Fake certificates that don't verify online
                </li>
                <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-[14px] text-crimson">warning</span>
                    Heat-treated stones worth 10x less sold as premium
                </li>
                <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-[14px] text-crimson">warning</span>
                    Colored glass sold as genuine sapphires
                </li>
                <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-[14px] text-crimson">warning</span>
                    Pressure tactics: "Special price today only" or "My cousin owns the mine"
                </li>
            </ul>
        </div>
        <div class="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-5 border border-teal-100 dark:border-teal-900/30">
            <div class="flex items-center gap-2 mb-3">
                <span class="material-symbols-outlined text-primary">storefront</span>
                <h4 class="font-bold text-sm text-primary dark:text-teal-300">Recommended Safe Places</h4>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                    class="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                    <h5 class="font-bold text-xs text-slate-800 dark:text-white">Galle Fort</h5>
                    <p class="text-[10px] text-slate-500 uppercase mb-1">Galle</p>
                    <p class="text-[10px] text-primary dark:text-teal-400 font-medium">Premium boutiques with verified
                        quality</p>
                </div>
                <div
                    class="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                    <h5 class="font-bold text-xs text-slate-800 dark:text-white">Barefoot</h5>
                    <p class="text-[10px] text-slate-500 uppercase mb-1">Colombo &amp; Galle</p>
                    <p class="text-[10px] text-primary dark:text-teal-400 font-medium">Authentic handwoven textiles
                        &amp; art</p>
                </div>
            </div>
        </div>
    </section>
</template>
