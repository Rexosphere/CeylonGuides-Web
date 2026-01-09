<template>
  <section class="scroll-mt-24 container mx-auto px-6 py-12" id="insurance">
    <div class="text-center mb-10">
      <p class="text-xs font-bold uppercase tracking-widest text-text-sub-light dark:text-text-sub-dark mb-2">
        Peace of Mind
      </p>
      <h2 class="text-3xl font-bold text-text-main-light dark:text-text-main-dark mb-4">
        Travel Insurance
      </h2>
      <p class="text-text-sub-light dark:text-text-sub-dark max-w-2xl mx-auto">
        Medical treatment in private hospitals can be expensive. Comprehensive travel insurance is mandatory for a
        stress-free trip.
      </p>
    </div>

    <div
      class="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
              <th
                class="p-6 text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider w-1/3">
                Coverage Area
              </th>
              <th
                class="p-6 text-xs font-bold text-text-sub-light dark:text-text-sub-dark uppercase tracking-wider w-1/3">
                Basic Plan
              </th>
              <th class="p-6 text-xs font-bold text-primary uppercase tracking-wider w-1/3 flex items-center gap-2">
                Recommended <span class="material-icons text-sm">star</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light dark:divide-border-dark">
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
              <td class="p-6 font-medium">Medical Emergencies</td>
              <td class="p-6 text-text-sub-light">$50,000 Limit</td>
              <td class="p-6 font-bold text-text-main-light dark:text-text-main-dark">$100,000+ Limit</td>
            </tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
              <td class="p-6 font-medium">Trip Cancellation</td>
              <td class="p-6 text-text-sub-light">Included</td>
              <td class="p-6 font-bold text-text-main-light dark:text-text-main-dark">Included (CFAR Optional)</td>
            </tr>
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
              <td class="p-6 font-medium">Adventure Sports</td>
              <td class="p-6 text-secondary font-medium">Excluded</td>
              <td class="p-6 font-bold text-text-main-light dark:text-text-main-dark">Hiking, Snorkeling, Scooter</td>
            </tr>
            <tr class="bg-slate-50/50 dark:bg-slate-800/20">
              <td class="p-6"></td>
              <td class="p-6">
                <a class="text-sm font-medium text-text-sub-light underline hover:text-primary" href="#">
                  View Details
                </a>
              </td>
              <td class="p-6">
                <button
                  class="bg-primary hover:bg-teal-800 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition">
                  Get Quote
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
