<template>
    <section
        class="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-700">
        <div class="flex justify-center mb-6">
            <div
                class="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm border border-slate-100 dark:border-slate-600">
                <span class="material-symbols-outlined text-slate-700 dark:text-slate-300 text-3xl">receipt_long</span>
            </div>
        </div>
        <h2 class="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">VAT Refund for Tourists</h2>
        <p class="text-center text-slate-500 dark:text-slate-400 mb-8">Get 18% back on purchases over <span
                class="font-bold text-slate-900 dark:text-white">LKR 50,000</span> (excluding VAT)</p>
        <div class="flex justify-end mb-4">
            <button
                class="flex items-center gap-1 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-sm">
                <span class="material-symbols-outlined text-[16px]">print</span> Print Summary
            </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div
                class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-subtle text-center border border-slate-200 dark:border-slate-600">
                <div class="text-2xl font-bold text-primary dark:text-teal-400">18%</div>
                <div class="text-xs text-slate-500 uppercase font-semibold">VAT Refund Rate</div>
            </div>
            <div
                class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-subtle text-center border border-slate-200 dark:border-slate-600">
                <div class="text-2xl font-bold text-primary dark:text-teal-400">LKR 50,000</div>
                <div class="text-xs text-slate-500 uppercase font-semibold">Minimum Spend (excl. VAT)</div>
            </div>
            <div
                class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-subtle text-center border border-slate-200 dark:border-slate-600">
                <div class="text-2xl font-bold text-slate-800 dark:text-white">BIA</div>
                <div class="text-xs text-slate-500 uppercase font-semibold">Claim at Airport</div>
            </div>
        </div>
        <div
            class="bg-white dark:bg-slate-800 rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-600 shadow-subtle">
            <h4 class="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4">
                <span class="material-symbols-outlined text-primary text-lg">check_circle</span> Who is Eligible?
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-primary text-[16px]">check</span> Non-citizens and
                    non-residents of Sri Lanka
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-primary text-[16px]">check</span> Aged 18 or over
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-primary text-[16px]">check</span> Staying less than 90
                    days
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-primary text-[16px]">check</span> Purchases from
                    authorized retailers
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-primary text-[16px]">check</span> Up to three invoices
                    per day from the same retailer
                </div>
            </div>
        </div>
        <div class="mb-8">
            <h4 class="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4">
                <span class="material-symbols-outlined text-secondary text-lg">list_alt</span> Step-by-Step Refund
                Process
            </h4>
            <div class="space-y-3">
                <div
                    class="flex items-center bg-white dark:bg-slate-800 p-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div
                        class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        1</div>
                    Spend over LKR 50,000 (excluding VAT) in one day at a single authorized shop
                </div>
                <div
                    class="flex items-center bg-white dark:bg-slate-800 p-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div
                        class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        2</div>
                    Obtain Tourist VAT Refund Invoice (TVRI) using receipts and passport
                </div>
                <div
                    class="flex items-center bg-white dark:bg-slate-800 p-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div
                        class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        3</div>
                    Keep goods in baggage or hand luggage (not consumed in Sri Lanka)
                </div>
                <div
                    class="flex items-center bg-white dark:bg-slate-800 p-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div
                        class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        4</div>
                    Fill out TVRS application form at airport
                </div>
                <div
                    class="flex items-center bg-white dark:bg-slate-800 p-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div
                        class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        5</div>
                    Present goods for physical verification at Customs point
                </div>
                <div
                    class="flex items-center bg-white dark:bg-slate-800 p-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div
                        class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        6</div>
                    Submit refund claim at TVRS Counter in departure lounge at BIA
                </div>
                <div
                    class="flex items-center bg-white dark:bg-slate-800 p-3 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div
                        class="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        7</div>
                    Tourist VAT Refund Counter relaunched July 4th, 2025 at Bandaranaike International Airport
                </div>
            </div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 mb-8 border border-slate-200 dark:border-slate-600">
            <h4 class="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-3 text-sm">
                <span class="material-symbols-outlined text-[18px] text-secondary">info</span> Important Notes
            </h4>
            <ul class="space-y-2">
                <li class="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-[14px] mt-0.5 text-secondary">arrow_right</span> The
                    spend threshold of LKR 50,000 is <strong class="mx-1">excluding VAT</strong> and must be at a single
                    authorized shop in one day
                </li>
                <li class="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-[14px] mt-0.5 text-secondary">arrow_right</span> Goods
                    must be available for physical verification at Customs - keep them in your carry-on or checked
                    baggage
                </li>
                <li class="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-[14px] mt-0.5 text-secondary">arrow_right</span> The
                    Tourist VAT Refund Counter is located in the departure lounge at Bandaranaike International Airport
                    (BIA)
                </li>
                <li class="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <span class="material-symbols-outlined text-[14px] mt-0.5 text-secondary">arrow_right</span> Service
                    was relaunched on July 4th, 2025
                </li>
            </ul>
        </div>
        <div class="mb-10">
            <h4 class="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-sm">
                <span class="material-symbols-outlined text-crimson text-lg">cancel</span> What's NOT Eligible for
                Refund
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                    class="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/30 flex items-center gap-2 text-xs text-rose-800 dark:text-rose-300">
                    <span class="material-symbols-outlined text-[16px]">block</span> Services
                </div>
                <div
                    class="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/30 flex items-center gap-2 text-xs text-rose-800 dark:text-rose-300">
                    <span class="material-symbols-outlined text-[16px]">block</span> Food and drinks
                </div>
                <div
                    class="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/30 flex items-center gap-2 text-xs text-rose-800 dark:text-rose-300">
                    <span class="material-symbols-outlined text-[16px]">block</span> VAT-free items
                </div>
                <div
                    class="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/30 flex items-center gap-2 text-xs text-rose-800 dark:text-rose-300">
                    <span class="material-symbols-outlined text-[16px]">block</span> Online purchases
                </div>
                <div
                    class="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/30 flex items-center gap-2 text-xs text-rose-800 dark:text-rose-300">
                    <span class="material-symbols-outlined text-[16px]">block</span> Restricted or prohibited goods
                </div>
                <div
                    class="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/30 flex items-center gap-2 text-xs text-rose-800 dark:text-rose-300">
                    <span class="material-symbols-outlined text-[16px]">block</span> Items consumed in Sri Lanka
                </div>
            </div>
        </div>
        <div
            class="bg-white dark:bg-slate-800 rounded-xl shadow-card border border-slate-200 dark:border-slate-700 p-6 max-w-lg mx-auto">
            <div
                class="flex items-center justify-center gap-2 mb-4 text-slate-400 text-xs uppercase font-bold tracking-wider">
                <span class="material-symbols-outlined text-sm">bookmark</span> Quick Reference Card
            </div>
            <div class="mb-4">
                <h5 class="font-bold text-xs text-slate-400 uppercase mb-2">Quick Facts</h5>
                <div class="grid grid-cols-2 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <div>Refund Rate: <span class="font-bold">18%</span></div>
                    <div>Min. Spend: <span class="font-bold">LKR 50,000</span></div>
                    <div>Age Required: <span class="font-bold">18+</span></div>
                    <div>Stay Limit: <span class="font-bold">&lt;90 days</span></div>
                </div>
            </div>
            <hr class="border-slate-100 dark:border-slate-700 my-4" />
            <div>
                <h5 class="font-bold text-xs text-slate-400 uppercase mb-2">Before You Leave Sri Lanka</h5>
                <div class="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-[14px]">check_box</span> Keep all
                        receipts from authorized retailers
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-[14px]">check_box</span> Get Tourist
                        VAT Refund Invoice (TVRI)
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-[14px]">check_box</span> Pack goods in
                        carry-on or checked baggage (unused)
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-[14px]">check_box</span> Arrive early
                        at airport for verification
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-primary text-[14px]">check_box</span> Visit TVRS
                        Counter in departure lounge at BIA
                    </div>
                </div>
            </div>
            <div class="mt-4 text-[10px] text-center text-slate-400">
                Location: Tourist VAT Refund Counter, Departure Lounge<br />
                Bandaranaike International Airport (BIA), Colombo<br />
                Relaunched July 4th, 2025
            </div>
        </div>
    </section>
</template>
