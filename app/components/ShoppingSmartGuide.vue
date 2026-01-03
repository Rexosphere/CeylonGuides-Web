<template>
  <div class="w-full px-4 md:px-20 lg:px-40 py-10 flex justify-center">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1 gap-12">
      <!-- Comparison Section -->
      <div class="px-4">
        <h2 class="text-text-main dark:text-white text-[28px] font-bold leading-tight mb-6">Smart Shopping Guide</h2>
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Authentic Column -->
          <div class="flex-1 bg-white dark:bg-[#181311] p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <span class="material-symbols-outlined">verified</span>
              </div>
              <h3 class="text-lg font-bold text-text-main dark:text-white">Authentic Experience</h3>
            </div>
            <ul class="flex flex-col gap-3">
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-green-500 text-sm mt-1">check_circle</span>
                <span class="text-text-muted dark:text-gray-300 text-sm">Gems with a government certificate from the NGJA.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-green-500 text-sm mt-1">check_circle</span>
                <span class="text-text-muted dark:text-gray-300 text-sm">Tea packs bearing the "Lion Logo" of authenticity.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-green-500 text-sm mt-1">check_circle</span>
                <span class="text-text-muted dark:text-gray-300 text-sm">Fixed prices in government shops like Laksala.</span>
              </li>
            </ul>
          </div>
          <!-- Trap Column -->
          <div class="flex-1 bg-white dark:bg-[#181311] p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="size-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <span class="material-symbols-outlined">warning</span>
              </div>
              <h3 class="text-lg font-bold text-text-main dark:text-white">Tourist Traps</h3>
            </div>
            <ul class="flex flex-col gap-3">
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-red-500 text-sm mt-1">cancel</span>
                <span class="text-text-muted dark:text-gray-300 text-sm">Tuk-tuk drivers taking you to "special gem museums."</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-red-500 text-sm mt-1">cancel</span>
                <span class="text-text-muted dark:text-gray-300 text-sm">Spice gardens with extremely inflated prices.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-red-500 text-sm mt-1">cancel</span>
                <span class="text-text-muted dark:text-gray-300 text-sm">Beach vendors selling "ebony" that is actually painted wood.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Bottom Info Row: Bargaining + Duty Free -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <!-- Bargaining Card -->
        <div class="md:col-span-2 bg-primary/5 dark:bg-[#2a1d17] p-6 rounded-xl">
          <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-3">
            <span class="material-symbols-outlined text-primary">handshake</span>
            Bargaining Tips
          </h3>
          <p class="text-sm text-text-muted dark:text-gray-300 mb-4">In street markets like Pettah, bargaining is expected. In malls and supermarkets, prices are fixed.</p>
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 bg-white dark:bg-[#181311] p-4 rounded-lg shadow-sm">
              <strong class="block text-primary text-sm mb-1">Start Low</strong>
              <p class="text-xs text-gray-600 dark:text-gray-400">Offer about 50% of the asking price and negotiate upwards to a fair middle ground.</p>
            </div>
            <div class="flex-1 bg-white dark:bg-[#181311] p-4 rounded-lg shadow-sm">
              <strong class="block text-primary text-sm mb-1">Smile Often</strong>
              <p class="text-xs text-gray-600 dark:text-gray-400">Negotiations are friendly interactions, not arguments. A smile gets you a better price.</p>
            </div>
          </div>
        </div>
        <!-- Duty Free Card -->
        <div class="bg-white dark:bg-[#181311] p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-3">
            <span class="material-symbols-outlined text-primary">shopping_bag</span>
            Duty Free Info
          </h3>
          <div class="flex flex-col gap-3 text-sm text-text-muted dark:text-gray-300">
            <p><strong>Tea:</strong> Up to 3kg of tea can be exported duty-free.</p>
            <p><strong>Gems:</strong> Ensure you have an official receipt for customs.</p>
            <p><strong>Currency:</strong> Retain exchange receipts to convert leftover Rupees back at the airport.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
