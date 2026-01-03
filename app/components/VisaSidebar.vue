<template>
  <div class="flex flex-col gap-6">
    <!-- Checklist Card -->
    <div class="bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 shadow-sm sticky top-24">
      <div class="p-6 border-b border-border-color dark:border-neutral-700 bg-background-light/50 dark:bg-white/5">
        <h3 class="font-bold text-lg text-text-main dark:text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">checklist</span>
          Document Checklist
        </h3>
        <p class="text-xs text-text-secondary dark:text-text-muted mt-1">Have these ready at immigration.</p>
      </div>
      <div class="p-6 flex flex-col gap-4">
        <label class="flex items-start gap-3 cursor-pointer group">
          <input checked class="mt-1 rounded border-border-color dark:border-neutral-600 text-primary focus:ring-primary/20" type="checkbox"/>
          <span class="text-sm text-text-secondary dark:text-text-muted group-hover:text-text-main dark:group-hover:text-white transition-colors">Passport (valid for 6 months)</span>
        </label>
        <label class="flex items-start gap-3 cursor-pointer group">
          <input class="mt-1 rounded border-border-color dark:border-neutral-600 text-primary focus:ring-primary/20" type="checkbox"/>
          <span class="text-sm text-text-secondary dark:text-text-muted group-hover:text-text-main dark:group-hover:text-white transition-colors">Printed ETA Approval Notice</span>
        </label>
        <label class="flex items-start gap-3 cursor-pointer group">
          <input class="mt-1 rounded border-border-color dark:border-neutral-600 text-primary focus:ring-primary/20" type="checkbox"/>
          <span class="text-sm text-text-secondary dark:text-text-muted group-hover:text-text-main dark:group-hover:text-white transition-colors">Return / Onward Ticket</span>
        </label>
        <label class="flex items-start gap-3 cursor-pointer group">
          <input class="mt-1 rounded border-border-color dark:border-neutral-600 text-primary focus:ring-primary/20" type="checkbox"/>
          <span class="text-sm text-text-secondary dark:text-text-muted group-hover:text-text-main dark:group-hover:text-white transition-colors">Proof of Sufficient Funds</span>
        </label>
        <label class="flex items-start gap-3 cursor-pointer group">
          <input class="mt-1 rounded border-border-color dark:border-neutral-600 text-primary focus:ring-primary/20" type="checkbox"/>
          <span class="text-sm text-text-secondary dark:text-text-muted group-hover:text-text-main dark:group-hover:text-white transition-colors">Hotel Booking Confirmation</span>
        </label>
        <label class="flex items-start gap-3 cursor-pointer group">
          <input class="mt-1 rounded border-border-color dark:border-neutral-600 text-primary focus:ring-primary/20" type="checkbox"/>
          <span class="text-sm text-text-secondary dark:text-text-muted group-hover:text-text-main dark:group-hover:text-white transition-colors">Arrival Card (Filled)</span>
        </label>
      </div>
      <div class="p-4 border-t border-border-color dark:border-neutral-700">
        <button class="w-full flex items-center justify-center gap-2 text-primary font-bold text-sm py-2 hover:bg-primary/5 rounded-lg transition-colors">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Download PDF Checklist
        </button>
      </div>
    </div>
    <!-- Helpful Links -->
    <div class="bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 p-6">
      <h3 class="font-bold text-lg text-text-main dark:text-white mb-4">Official Resources</h3>
      <div class="flex flex-col gap-3">
        <a class="flex items-center justify-between p-3 rounded-lg border border-border-color dark:border-neutral-700 hover:border-primary/50 hover:bg-primary/5 transition-all group" href="#">
          <div class="flex flex-col">
            <span class="text-sm font-bold text-text-main dark:text-white">ETA Portal</span>
            <span class="text-xs text-text-secondary dark:text-text-muted">www.eta.gov.lk</span>
          </div>
          <span class="material-symbols-outlined text-text-secondary dark:text-text-muted group-hover:text-primary text-[20px]">open_in_new</span>
        </a>
        <a class="flex items-center justify-between p-3 rounded-lg border border-border-color dark:border-neutral-700 hover:border-primary/50 hover:bg-primary/5 transition-all group" href="#">
          <div class="flex flex-col">
            <span class="text-sm font-bold text-text-main dark:text-white">Immigration Dept</span>
            <span class="text-xs text-text-secondary dark:text-text-muted">immigration.gov.lk</span>
          </div>
          <span class="material-symbols-outlined text-text-secondary dark:text-text-muted group-hover:text-primary text-[20px]">open_in_new</span>
        </a>
      </div>
    </div>
  </div>
</template>
