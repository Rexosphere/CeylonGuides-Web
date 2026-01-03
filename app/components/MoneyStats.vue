<template>
  <section class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-text-main dark:text-white">Live Exchange Rates</h2>
        <span class="text-sm text-text-muted flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">update</span> Updated 5m ago
        </span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- USD Card -->
        <div class="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">USD</div>
              <div>
                <p class="font-bold text-lg text-text-main dark:text-white">US Dollar</p>
                <p class="text-xs text-text-muted">United States</p>
              </div>
            </div>
            <span class="text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">+1.2%</span>
          </div>
          <div class="space-y-1">
            <p class="text-text-muted text-sm font-medium">Buying Rate</p>
            <p class="text-3xl font-bold tracking-tight text-primary">318.50 <span class="text-sm text-text-main dark:text-white font-normal">LKR</span></p>
          </div>
        </div>
        <!-- EUR Card -->
        <div class="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">EUR</div>
              <div>
                <p class="font-bold text-lg text-text-main dark:text-white">Euro</p>
                <p class="text-xs text-text-muted">European Union</p>
              </div>
            </div>
            <span class="text-text-muted bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-bold">0.0%</span>
          </div>
          <div class="space-y-1">
            <p class="text-text-muted text-sm font-medium">Buying Rate</p>
            <p class="text-3xl font-bold tracking-tight text-primary">345.20 <span class="text-sm text-text-main dark:text-white font-normal">LKR</span></p>
          </div>
        </div>
        <!-- GBP Card -->
        <div class="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div class="size-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">GBP</div>
              <div>
                <p class="font-bold text-lg text-text-main dark:text-white">British Pound</p>
                <p class="text-xs text-text-muted">United Kingdom</p>
              </div>
            </div>
            <span class="text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-xs font-bold">-0.4%</span>
          </div>
          <div class="space-y-1">
            <p class="text-text-muted text-sm font-medium">Buying Rate</p>
            <p class="text-3xl font-bold tracking-tight text-primary">402.10 <span class="text-sm text-text-main dark:text-white font-normal">LKR</span></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
