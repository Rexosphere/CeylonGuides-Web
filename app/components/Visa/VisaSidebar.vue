<template>
  <div class="space-y-8">
    <!-- Document Checklist -->
    <div
      class="bg-white dark:bg-surface-dark rounded-2xl shadow-soft border border-stone-neutral dark:border-gray-700 p-6 sticky top-24">
      <div class="flex items-center space-x-2 mb-6 border-b border-stone-100 dark:border-gray-700 pb-4">
        <span class="material-symbols-outlined text-primary">checklist</span>
        <h3 class="font-bold text-deep-charcoal dark:text-white">Document Checklist</h3>
      </div>

      <p class="text-xs text-slate-400 uppercase font-bold mb-4">For India</p>

      <ul class="space-y-4">
        <li class="flex items-start">
          <div class="flex items-center h-5">
            <input class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded" id="doc1" type="checkbox" />
          </div>
          <div class="ml-3 text-sm">
            <label class="font-medium text-slate-700 dark:text-slate-300" for="doc1">
              Passport valid for at least 6 months
            </label>
            <p class="text-xs text-slate-500 mt-0.5">from arrival.</p>
          </div>
        </li>

        <li class="flex items-start">
          <div class="flex items-center h-5">
            <input class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded" id="doc2" type="checkbox" />
          </div>
          <div class="ml-3 text-sm">
            <label class="font-medium text-slate-700 dark:text-slate-300" for="doc2">
              Confirmed return or onward ticket.
            </label>
          </div>
        </li>

        <li class="flex items-start">
          <div class="flex items-center h-5">
            <input class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded" id="doc3" type="checkbox" />
          </div>
          <div class="ml-3 text-sm">
            <label class="font-medium text-slate-700 dark:text-slate-300" for="doc3">
              Proof of sufficient funds for the stay.
            </label>
          </div>
        </li>

        <li class="flex items-start">
          <div class="flex items-center h-5">
            <input class="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded" id="doc4" type="checkbox" />
          </div>
          <div class="ml-3 text-sm">
            <label class="font-medium text-slate-700 dark:text-slate-300" for="doc4">
              Printed copy of ETA approval
            </label>
            <p class="text-xs text-slate-500 mt-0.5">(recommended).</p>
          </div>
        </li>
      </ul>

      <div class="mt-8 flex justify-between">
        <button
          class="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-base mr-1">content_copy</span> Copy List
        </button>
        <button
          class="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-base mr-1">save_alt</span> Save PDF
        </button>
      </div>
    </div>

    <!-- Trusted Actions -->
    <div class="bg-transparent space-y-4">
      <div class="flex items-center space-x-2 mb-2">
        <span class="material-symbols-outlined text-primary text-sm">verified</span>
        <h3 class="font-bold text-deep-charcoal dark:text-white text-sm uppercase tracking-wide">Trusted Actions</h3>
      </div>

      <div class="bg-stone-50 dark:bg-stone-900 border-l-4 border-primary p-4 rounded-r-lg shadow-sm">
        <p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          <span class="font-bold text-primary block mb-1">Official Only:</span>
          Avoid third-party agents. Use only .gov.lk portals to ensure safety and standard fees.
        </p>
      </div>

      <a class="block w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-4 transition-all group"
        href="#">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="bg-primary/10 p-2 rounded-lg text-primary mr-3 group-hover:bg-primary group-hover:text-white transition-colors">
              <span class="material-symbols-outlined">play_arrow</span>
            </div>
            <div class="text-left">
              <p class="font-bold text-deep-charcoal dark:text-white text-sm">Apply for ETA</p>
              <p class="text-xs text-slate-500">Direct Official Portal</p>
            </div>
          </div>
          <span class="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
        </div>
      </a>

      <a class="block w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-4 transition-all group"
        href="#">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg text-slate-600 dark:text-slate-300 mr-3 group-hover:text-primary transition-colors">
              <span class="material-symbols-outlined">calendar_month</span>
            </div>
            <div class="text-left">
              <p class="font-bold text-deep-charcoal dark:text-white text-sm">Online Extension</p>
              <p class="text-xs text-slate-500">Extend your stay</p>
            </div>
          </div>
          <span class="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
        </div>
      </a>

      <div class="pt-6">
        <p class="text-xs font-bold text-slate-400 uppercase mb-3">Travel Safety</p>
        <div class="grid grid-cols-2 gap-3">
          <button
            class="bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 py-3 px-2 rounded-xl text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-colors border border-red-100 dark:border-red-900/20">
            <span class="material-symbols-outlined text-lg">health_and_safety</span>
            <span>Safety Mode</span>
          </button>
          <button
            class="bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-3 px-2 rounded-xl text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-colors border border-blue-100 dark:border-blue-900/20">
            <span class="material-symbols-outlined text-lg">emergency</span>
            <span>Emergency</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  requirements?: string
}>()
</script>
