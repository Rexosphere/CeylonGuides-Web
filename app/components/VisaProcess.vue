<template>
  <section>
    <div class="mb-6 flex items-center gap-3">
      <div class="h-8 w-1 bg-primary rounded-full"></div>
      <h2 class="text-2xl font-bold text-text-main dark:text-white">The ETA Process</h2>
    </div>
    <!-- Timeline Component -->
    <div class="bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 p-6 sm:p-8">
      <div class="grid grid-cols-[40px_1fr] gap-x-4">
        <!-- Step 1 -->
        <div class="flex flex-col items-center gap-2 pt-1">
          <div class="text-primary bg-primary/10 p-2 rounded-full">
            <span class="material-symbols-outlined text-[20px]">laptop_mac</span>
          </div>
          <div class="w-[2px] bg-border-color dark:bg-neutral-700 h-full grow rounded-full"></div>
        </div>
        <div class="flex flex-col pb-8">
          <h3 class="text-lg font-bold text-text-main dark:text-white mb-1">Apply Online</h3>
          <p class="text-text-secondary dark:text-gray-400 text-sm leading-relaxed mb-3">
            Visit the official <a class="text-primary hover:underline decoration-primary/30 underline-offset-2" href="#">eta.gov.lk</a> portal. Fill out the application form with your personal details and passport information.
          </p>
          <div class="inline-flex gap-2">
            <span class="text-xs font-medium bg-background-light dark:bg-white/5 px-2 py-1 rounded text-text-secondary border border-border-color dark:border-neutral-700">Form ETA-01</span>
          </div>
        </div>
        <!-- Step 2 -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-[2px] bg-border-color dark:bg-neutral-700 h-4 rounded-full"></div>
          <div class="text-primary bg-primary/10 p-2 rounded-full">
            <span class="material-symbols-outlined text-[20px]">credit_card</span>
          </div>
          <div class="w-[2px] bg-border-color dark:bg-neutral-700 h-full grow rounded-full"></div>
        </div>
        <div class="flex flex-col py-2 pb-8">
          <h3 class="text-lg font-bold text-text-main dark:text-white mb-1">Pay Processing Fee</h3>
          <p class="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
            Securely pay the visa fee using a major Credit or Debit card (Visa, MasterCard, Amex).
          </p>
        </div>
        <!-- Step 3 -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-[2px] bg-border-color dark:bg-neutral-700 h-4 rounded-full"></div>
          <div class="text-primary bg-primary/10 p-2 rounded-full">
            <span class="material-symbols-outlined text-[20px]">mail</span>
          </div>
          <div class="w-[2px] bg-border-color dark:bg-neutral-700 h-full grow rounded-full"></div>
        </div>
        <div class="flex flex-col py-2 pb-8">
          <h3 class="text-lg font-bold text-text-main dark:text-white mb-1">Receive Approval</h3>
          <p class="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
            You will receive an acknowledgement email immediately, followed by the approval notice typically within 24-48 hours.
          </p>
        </div>
        <!-- Step 4 -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-[2px] bg-border-color dark:bg-neutral-700 h-4 rounded-full"></div>
          <div class="text-primary bg-primary/10 p-2 rounded-full">
            <span class="material-symbols-outlined text-[20px]">flight_takeoff</span>
          </div>
        </div>
        <div class="flex flex-col py-2">
          <h3 class="text-lg font-bold text-text-main dark:text-white mb-1">Travel to Sri Lanka</h3>
          <p class="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
            Print your ETA approval and present it at the immigration counter upon arrival in Colombo (CMB) or Mattala (HRI).
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
