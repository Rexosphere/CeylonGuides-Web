<template>
  <section class="py-12 bg-white dark:bg-[#1a100c] border-y border-gray-200 dark:border-neutral-700">
    <div class="px-4 md:px-10 max-w-7xl mx-auto w-full">
      <div class="flex flex-col lg:flex-row gap-12">
        <div class="lg:w-1/3 flex flex-col justify-center space-y-6">
          <div class="space-y-2">
            <h2 class="text-3xl font-bold tracking-tight text-text-main dark:text-white">Trusted ATMs & Exchange</h2>
            <p class="text-text-muted dark:text-gray-400">
              Avoid unauthorized money changers. Stick to registered banks and official ATMs for the best rates and safety.
            </p>
          </div>
          <div class="space-y-4">
            <div class="flex gap-4 items-start">
              <div class="size-10 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined">account_balance</span>
              </div>
              <div>
                <h4 class="font-bold text-lg text-text-main dark:text-white">Trusted Banks</h4>
                <p class="text-sm text-text-muted dark:text-gray-400">Commercial Bank, Sampath Bank, HNB, and BOC are widely available and reliable.</p>
              </div>
            </div>
            <div class="flex gap-4 items-start">
              <div class="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined">local_atm</span>
              </div>
              <div>
                <h4 class="font-bold text-lg text-text-main dark:text-white">ATM Limits</h4>
                <p class="text-sm text-text-muted dark:text-gray-400">Most ATMs allow withdrawals up to 80,000 LKR per transaction. Charges apply.</p>
              </div>
            </div>
          </div>
          <button class="flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-6 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-lg transition-colors">
            <span class="material-symbols-outlined">map</span>
            Find Nearest ATM
          </button>
        </div>
        <div class="lg:w-2/3 h-[400px] lg:h-auto min-h-[400px] rounded-2xl overflow-hidden relative shadow-lg group">
          <!-- Map Placeholder Image -->
          <img alt="Map view of Colombo with ATM pins" class="w-full h-full object-cover filter brightness-[0.85] group-hover:brightness-100 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmr4weqyYEReVza1MF3Tz8m4OtDW4qCqUdhFWsTWcMeqzE2xzPAe4hhonQWq_d5nQ_1CRYEgH7HJclZubS0vgvYaetjU8kciLR5Td-lvHLmbKdhEFi7wpN5QI8OYZBCsQkcaVRSNfcRePgdT2PqMH3Ogee1lGchvk4xgNWYnCSp576BMwUn5vqtD-vX9ment1K10XQiM-LFzaMPnxgnGQ8fz6wf8QzPxxt96CUpl_ma6C-J4hL7_VKQMJmyBq5WQBc2x1SE3WkhYo"/>
          <!-- Decorative Pins -->
          <div class="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
            <div class="bg-white dark:bg-surface-dark px-3 py-1 rounded shadow-md text-xs font-bold mb-1 text-text-main dark:text-white">Commercial Bank</div>
            <span class="material-symbols-outlined text-4xl text-primary drop-shadow-md">location_on</span>
          </div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style="animation: bounce 2s infinite 0.5s;">
            <div class="bg-white dark:bg-surface-dark px-3 py-1 rounded shadow-md text-xs font-bold mb-1 text-text-main dark:text-white">Sampath Bank</div>
            <span class="material-symbols-outlined text-4xl text-primary drop-shadow-md">location_on</span>
          </div>
          <div class="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style="animation: bounce 2s infinite 1s;">
            <div class="bg-white dark:bg-surface-dark px-3 py-1 rounded shadow-md text-xs font-bold mb-1 text-text-main dark:text-white">HNB ATM</div>
            <span class="material-symbols-outlined text-4xl text-primary drop-shadow-md">location_on</span>
          </div>
          <!-- Overlay Button -->
          <div class="absolute bottom-4 right-4">
            <button class="bg-white dark:bg-surface-dark text-text-main dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <span class="material-symbols-outlined text-primary">my_location</span>
              Use my location
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
