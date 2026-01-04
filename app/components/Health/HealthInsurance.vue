<template>
  <section class="w-full bg-white dark:bg-[#1f1612] py-20" id="insurance">
    <div class="max-w-[1000px] mx-auto px-6">
      <div class="text-center mb-12">
        <span class="text-primary font-bold uppercase tracking-wider text-xs mb-2 block">Peace of Mind</span>
        <h2 class="text-[#181311] dark:text-white text-3xl font-bold">Travel Insurance</h2>
        <p class="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">Medical treatment in private hospitals can be expensive. Comprehensive travel insurance is mandatory for a stress-free trip, especially if you plan on hiking or renting scooters.</p>
      </div>
      
      <div class="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg">
        <table class="w-full min-w-[600px] text-left border-collapse bg-white dark:bg-[#2a1d18]">
          <thead>
            <tr class="bg-gray-50 dark:bg-[#362620] border-b border-gray-100 dark:border-gray-700">
              <th class="p-6 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/4">Coverage Area</th>
              <th class="p-6 text-sm font-bold text-gray-900 dark:text-white w-1/4">Basic Plan</th>
              <th class="p-6 text-sm font-bold text-primary w-1/4">
                <div class="flex items-center gap-2">
                  Recommended
                  <span class="material-symbols-outlined text-sm">star</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
            <tr>
              <td class="p-6 font-medium text-gray-900 dark:text-gray-200">Medical Emergencies</td>
              <td class="p-6 text-gray-600 dark:text-gray-400">$50,000 Limit</td>
              <td class="p-6 text-gray-900 dark:text-gray-100 font-semibold">$100,000+ Limit</td>
            </tr>
            <tr>
              <td class="p-6 font-medium text-gray-900 dark:text-gray-200">Trip Cancellation</td>
              <td class="p-6 text-gray-600 dark:text-gray-400">Included</td>
              <td class="p-6 text-gray-900 dark:text-gray-100 font-semibold">Included (CFAR optional)</td>
            </tr>
            <tr>
              <td class="p-6 font-medium text-gray-900 dark:text-gray-200">Adventure Sports</td>
              <td class="p-6 text-gray-600 dark:text-gray-400"><span class="text-red-500">Excluded</span></td>
              <td class="p-6 text-gray-900 dark:text-gray-100 font-semibold">Hiking, Snorkeling, Scooter</td>
            </tr>
            <tr>
              <td class="p-6 font-medium text-gray-900 dark:text-gray-200">COVID-19</td>
              <td class="p-6 text-gray-600 dark:text-gray-400">Limited</td>
              <td class="p-6 text-gray-900 dark:text-gray-100 font-semibold">Full Coverage</td>
            </tr>
            <tr class="bg-gray-50/50 dark:bg-[#362620]/50">
              <td class="p-6"></td>
              <td class="p-6">
                <a class="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium underline" href="#">View Details</a>
              </td>
              <td class="p-6">
                <button class="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-md">Get Quote</button>
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
