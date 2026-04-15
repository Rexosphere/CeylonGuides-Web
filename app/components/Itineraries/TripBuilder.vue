<template>
  <section class="py-16 bg-white dark:bg-card-dark border-t border-gray-100 dark:border-gray-800">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-display font-bold text-primary dark:text-white mb-2">Trip Builder Workshop</h2>
          <p class="text-text-muted dark:text-gray-400">Drag & drop destinations to craft your custom journey</p>
        </div>
        <button
          class="bg-secondary hover:bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-md transition-all flex items-center gap-2">
          <span class="material-icons text-sm">construction</span> Open Trip Builder
        </button>
      </div>
      <div
        class="bg-background-light dark:bg-background-dark rounded-2xl border border-gray-200 dark:border-gray-800 p-2 shadow-inner">
        <div class="bg-white dark:bg-card-dark rounded-xl p-4 mb-2 flex flex-wrap gap-4 items-center shadow-sm">
          <div
            class="flex items-center gap-2 border px-3 py-1.5 rounded-lg border-gray-200 dark:border-gray-700 text-sm">
            <span class="material-icons text-gray-400 text-sm">calendar_today</span>
            <span class="font-medium">Select dates</span>
          </div>
          <div
            class="flex items-center gap-2 border px-3 py-1.5 rounded-lg border-gray-200 dark:border-gray-700 text-sm">
            <span class="material-icons text-gray-400 text-sm">group</span>
            <span class="font-medium">2 Travelers</span>
          </div>
          <div
            class="flex items-center gap-2 border px-3 py-1.5 rounded-lg border-gray-200 dark:border-gray-700 text-sm">
            <span class="material-icons text-gray-400 text-sm">schedule</span>
            <span class="font-medium">0 Days</span>
          </div>
          <div
            class="ml-auto flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg text-sm font-bold">
            <span class="material-icons text-sm">attach_money</span>
            <span>Est. Budget: $0 USD</span>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-2 h-[500px]">
          <div class="bg-white dark:bg-card-dark rounded-xl p-4 overflow-y-auto shadow-sm">
            <div class="relative mb-4">
              <span class="material-icons absolute left-3 top-2.5 text-gray-400 text-sm">search</span>
              <input
                class="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg py-2 pl-9 pr-4 text-xs font-medium focus:ring-1 focus:ring-secondary"
                placeholder="Search places..." type="text" />
            </div>
            <div class="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              <button
                class="bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap">All</button>
              <button
                class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-colors">Beaches</button>
              <button
                class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-colors">Culture</button>
              <button
                class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-colors">Nature</button>
            </div>
            <p class="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-wider">Suggested</p>
            <div class="space-y-2">
              <div
                class="group flex gap-3 p-2 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-secondary/50 cursor-grab bg-white dark:bg-card-dark transition-all">
                <img alt="Ella" class="w-12 h-12 rounded-md object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCScYdUKte_HMIf_kGmRun0RgQl0Y3TZFqXPSpTUvkbuE2HflgRFIUuOuxPLH0tKa3jRERto243Mv-V023HZlo2Dkw7v3M-gGrRPVbMMJs7GVGuOwpNaALEFAl07ks6_2bt95dUnbPT2qb0mBy-TW0JI45lpowRoCpPJl5jEzN4pHUVR7h3sFjveDfcOtTrLbrgO3NVmWcbf3NCu7esBDHRdGdhGlTMnWd_mpBHSEZpT-65FiY9vhsFnmcWZZDxUf7ebL1IL1WqR7A" />
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-bold text-text-main dark:text-white truncate">Nine Arch Bridge</h4>
                  <p class="text-[10px] text-text-muted truncate">Ella • Sightseeing</p>
                  <span class="text-[10px] text-secondary font-semibold mt-1 block">2hrs</span>
                </div>
                <button class="text-gray-300 hover:text-secondary"><span
                    class="material-icons text-base">add_circle_outline</span></button>
              </div>
              <div
                class="group flex gap-3 p-2 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-secondary/50 cursor-grab bg-white dark:bg-card-dark transition-all">
                <img alt="Yala" class="w-12 h-12 rounded-md object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrNDa4fU4ke_hehpsRNFUqgQN00n2g4u1DbvynfCk2FgIUeWECQQB9n9jc3rEJt1okCuq8OZSNSWDv2Qfliz-3pUggUDZbRoP1h7gNTIoVomX55rUxlYNgHVogokhySS-hKQRioeTi-h_BLw6cusaymPNEBoi6OzNi_g5KocrXifb-F0cN_tojBFVFtsFbKk5xcoV_1cr3Db4HiTC4SKOmSgZI38VU_uOWV3u8NzBskWDGSHsuz9POsmWNN5FpPUneOJoGtU_Xcgw" />
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-bold text-text-main dark:text-white truncate">Yala Safari</h4>
                  <p class="text-[10px] text-text-muted truncate">Yala • Wildlife</p>
                  <span class="text-[10px] text-secondary font-semibold mt-1 block">4hrs</span>
                </div>
                <button class="text-gray-300 hover:text-secondary"><span
                    class="material-icons text-base">add_circle_outline</span></button>
              </div>
              <div
                class="group flex gap-3 p-2 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-secondary/50 cursor-grab bg-white dark:bg-card-dark transition-all">
                <img alt="Galle" class="w-12 h-12 rounded-md object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuABljJHQo3ZLy75WcVsx1ak6WycDfazTchJOZqeFGg0DBioDjdYIrJQrgCsBSRMPIcwDvEznlvBMsEqj12zK_LCUXRlmJMAaZEaoBfnB_bPVIOLS6Pjvq7TlvVmCz42hbm2jPVPMdMGc-05sxRRM1dHmHkFF13LbERAY6sqHR06Wzm8-gp46hK05pJLJ55gBU_IJvQkPg_fMyjcsAPFI9xaJTG04YhuXPrpt5e_13YVJX4Bf78ORM2U0kU4Jhbpn7CLeFyk7fd9rZo" />
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-bold text-text-main dark:text-white truncate">Galle Fort Walk</h4>
                  <p class="text-[10px] text-text-muted truncate">Galle • History</p>
                  <span class="text-[10px] text-secondary font-semibold mt-1 block">3hrs</span>
                </div>
                <button class="text-gray-300 hover:text-secondary"><span
                    class="material-icons text-base">add_circle_outline</span></button>
              </div>
            </div>
          </div>
          <div
            class="lg:col-span-3 bg-white dark:bg-card-dark rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-sm relative">
            <div class="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <span class="material-icons text-gray-300 text-3xl">map</span>
            </div>
            <h3 class="text-xl font-bold text-primary dark:text-white mb-2">No trip planned yet</h3>
            <p class="text-sm text-text-muted dark:text-gray-400 max-w-sm mb-8">Start planning your Sri Lankan adventure
              by selecting dates in the hero section or opening the full Trip Builder.</p>
            <button
              class="bg-secondary hover:bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md transition-all flex items-center gap-2">
              <span class="material-icons text-sm">add</span> Start Planning
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// This is a preview/teaser component for the itineraries page
// The full trip builder functionality is in /pages/trip-builder.vue
</script>
