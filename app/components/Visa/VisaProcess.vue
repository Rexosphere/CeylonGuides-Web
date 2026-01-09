<template>
  <section>
    <div class="flex items-center space-x-3 mb-8">
      <div class="w-1 h-8 bg-primary rounded-full"></div>
      <h2 class="text-2xl font-bold text-deep-charcoal dark:text-white">The ETA Process</h2>
    </div>

    <div
      class="bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-stone-neutral dark:border-gray-700 p-8">
      <div class="relative">
        <div class="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

        <div class="space-y-10">
          <div class="relative flex items-start group">
            <div
              class="flex-shrink-0 w-12 h-12 bg-white dark:bg-surface-dark border-2 border-primary text-primary rounded-full flex items-center justify-center z-10 shadow-sm">
              <span class="material-symbols-outlined">computer</span>
            </div>
            <div class="ml-6 pt-1">
              <h3 class="text-lg font-bold text-deep-charcoal dark:text-white">Apply Online</h3>
              <p class="text-slate-600 dark:text-slate-300 text-sm mt-1 leading-relaxed">
                Visit the official <a class="text-primary hover:underline font-medium" href="#">eta.gov.lk</a> portal.
                Fill out the application form with your personal details and passport information.
              </p>
              <span
                class="inline-block mt-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                Form ETA-01
              </span>
            </div>
          </div>

          <div class="relative flex items-start group">
            <div
              class="flex-shrink-0 w-12 h-12 bg-white dark:bg-surface-dark border-2 border-slate-200 dark:border-slate-600 text-slate-400 rounded-full flex items-center justify-center z-10 shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
              <span class="material-symbols-outlined">credit_card</span>
            </div>
            <div class="ml-6 pt-1">
              <h3 class="text-lg font-bold text-deep-charcoal dark:text-white">Pay Processing Fee</h3>
              <p class="text-slate-600 dark:text-slate-300 text-sm mt-1 leading-relaxed">
                Securely pay the visa fee using a major Credit or Debit card (Visa, MasterCard, Amex).
              </p>
            </div>
          </div>

          <div class="relative flex items-start group">
            <div
              class="flex-shrink-0 w-12 h-12 bg-white dark:bg-surface-dark border-2 border-slate-200 dark:border-slate-600 text-slate-400 rounded-full flex items-center justify-center z-10 shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
              <span class="material-symbols-outlined">mark_email_read</span>
            </div>
            <div class="ml-6 pt-1">
              <h3 class="text-lg font-bold text-deep-charcoal dark:text-white">Receive Approval</h3>
              <p class="text-slate-600 dark:text-slate-300 text-sm mt-1 leading-relaxed">
                You will receive an acknowledgement email immediately, followed by the approval notice typically within
                24-48 hours.
              </p>
            </div>
          </div>

          <div class="relative flex items-start group">
            <div
              class="flex-shrink-0 w-12 h-12 bg-white dark:bg-surface-dark border-2 border-slate-200 dark:border-slate-600 text-slate-400 rounded-full flex items-center justify-center z-10 shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
              <span class="material-symbols-outlined">flight_takeoff</span>
            </div>
            <div class="ml-6 pt-1">
              <h3 class="text-lg font-bold text-deep-charcoal dark:text-white">Travel to Sri Lanka</h3>
              <p class="text-slate-600 dark:text-slate-300 text-sm mt-1 leading-relaxed">
                Print your ETA approval and present it at the immigration counter upon arrival in Colombo (CMB) or
                Mattala (HRI).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
