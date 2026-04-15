<template>
  <section class="py-16 bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Power Warning -->
      <ConnectivityPowerWarning />

      <!-- Visa Info -->
      <ConnectivityVisaInfo />

      <!-- Tips & Recommendations -->
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-2">Tips & Recommendations</h2>
      <p class="text-text-muted text-sm mb-8">Expert advice for staying connected in Sri Lanka</p>

      <!-- Recommendation Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col">
          <div class="bg-secondary text-white text-xs font-bold px-4 py-2">For Most Tourists</div>
          <div class="p-4 bg-background-light dark:bg-card-dark h-full">
            <p class="text-xs text-text-muted mb-4">
              Best coverage and value. Purchase at airport for convenience or city for better prices.
            </p>
            <div class="text-[10px] font-bold text-text-main mb-1 uppercase tracking-wide">Suggested Plans:</div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="bg-white border border-gray-200 text-text-muted px-1.5 py-0.5 rounded text-[10px]">Dialog
                Tourist Plus</span>
              <span class="bg-white border border-gray-200 text-text-muted px-1.5 py-0.5 rounded text-[10px]">Mobitel
                30-Day Plan</span>
            </div>
            <div class="text-[10px] font-bold text-text-main mb-1 uppercase tracking-wide">Best Areas:</div>
            <div class="flex flex-wrap gap-1">
              <span class="bg-white border border-gray-200 text-text-muted px-1.5 py-0.5 rounded text-[10px]">All</span>
            </div>
          </div>
        </div>

        <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col">
          <div class="bg-primary text-white text-xs font-bold px-4 py-2">For Digital Nomads</div>
          <div class="p-4 bg-background-light dark:bg-card-dark h-full">
            <p class="text-xs text-text-muted mb-4">
              Base on south coast for best infrastructure. Use Dialog/Mobitel for reliable connectivity.
            </p>
            <div class="text-[10px] font-bold text-text-main mb-1 uppercase tracking-wide">Suggested Plans:</div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="bg-white border border-gray-200 text-text-muted px-1.5 py-0.5 rounded text-[10px]">Dialog
                Tourist Premium</span>
              <span class="bg-white border border-gray-200 text-text-muted px-1.5 py-0.5 rounded text-[10px]">Hutch eSIM
                Premium</span>
            </div>
            <div class="text-[10px] font-bold text-text-main mb-1 uppercase tracking-wide">Best Areas:</div>
            <div class="flex flex-wrap gap-1">
              <span class="text-secondary bg-secondary/5 border border-secondary/20 px-1.5 py-0.5 rounded text-[10px]">•
                Weligama</span>
              <span class="text-secondary bg-secondary/5 border border-secondary/20 px-1.5 py-0.5 rounded text-[10px]">•
                Ahungama</span>
              <span class="text-secondary bg-secondary/5 border border-secondary/20 px-1.5 py-0.5 rounded text-[10px]">•
                Hiriketiya</span>
            </div>
          </div>
        </div>

        <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col">
          <div class="bg-accent-info text-white text-xs font-bold px-4 py-2">For Budget Travelers</div>
          <div class="p-4 bg-background-light dark:bg-card-dark h-full">
            <p class="text-xs text-text-muted mb-4">
              Hutch offers most affordable plans. Adequate for urban areas. May struggle in remote regions.
            </p>
            <div class="text-[10px] font-bold text-text-main mb-1 uppercase tracking-wide">Suggested Plans:</div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="bg-white border border-gray-200 text-text-muted px-1.5 py-0.5 rounded text-[10px]">Hutch
                Tourist SIM</span>
              <span class="bg-white border border-gray-200 text-text-muted px-1.5 py-0.5 rounded text-[10px]">Mobitel
                7-Day Plan</span>
            </div>
          </div>
        </div>

        <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col">
          <div class="bg-secondary text-white text-xs font-bold px-4 py-2">For Short Trips (&lt; 1 week)</div>
          <div class="p-4 bg-background-light dark:bg-card-dark h-full">
            <p class="text-xs text-text-muted mb-4">
              Mobitel 7-day plan offers best value for short visits with unlimited calls.
            </p>
            <div class="text-[10px] font-bold text-text-main mb-1 uppercase tracking-wide">Suggested Plans:</div>
            <div class="flex flex-wrap gap-1 mb-2">
              <span class="bg-white border border-gray-200 text-text-muted px-1.5 py-0.5 rounded text-[10px]">Mobitel
                7-Day Plan</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Best Practices -->
      <div class="bg-secondary/5 dark:bg-blue-900/5 p-6 rounded-xl border border-secondary/20 dark:border-blue-800/20">
        <h4 class="font-bold text-secondary text-sm mb-4 flex items-center gap-2">
          <span class="material-icons text-base">lightbulb_outline</span> Best Practices
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-muted">
          <div class="flex items-center gap-2">
            <span class="material-icons text-secondary text-[14px]">check_circle_outline</span>
            Use WIFI at hotels/cafes and disable background data to extend plan lifespan
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-secondary text-[14px]">check_circle_outline</span>
            Choose Dialog or Mobitel for best coverage if traveling to rural areas
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-secondary text-[14px]">check_circle_outline</span>
            Consider eSIM for convenience if your device supports it
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-secondary text-[14px]">check_circle_outline</span>
            Purchase SIM in city for better deals than airport (10-20% cheaper)
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-secondary text-[14px]">check_circle_outline</span>
            Top up data at any Dialog/Mobitel shop or via their apps
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-secondary text-[14px]">check_circle_outline</span>
            Enable WiFi calling for better indoor coverage
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-secondary text-[14px]">check_circle_outline</span>
            Download offline maps before leaving major cities
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-secondary text-[14px]">check_circle_outline</span>
            Speed test your connection before important video calls
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
