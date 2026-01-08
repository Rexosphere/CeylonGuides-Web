<script setup lang="ts">
import { vatRefund } from '~/data/shopping.data'

const handlePrint = () => {
  window.print()
}
</script>

<template>
  <div id="vat-refund" class="w-full px-4 md:px-20 lg:px-40 py-16 flex justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      
      <!-- Header -->
      <div class="mb-8 text-center">
        <div class="inline-flex items-center justify-center size-16 rounded-full bg-blue-100 dark:bg-blue-800 mb-4">
          <span class="material-symbols-outlined text-blue-600 dark:text-blue-300 text-4xl">receipt_long</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-3">
          VAT Refund for Tourists
        </h2>
        <p class="text-lg text-text-muted dark:text-gray-300 max-w-2xl mx-auto">
          Get {{ vatRefund.percent }}% back on purchases over <span class="font-bold text-primary">LKR {{ vatRefund.threshold.toLocaleString() }}</span> (excluding VAT)
        </p>
      </div>

      <!-- Print Button (Hidden in print) -->
      <div class="flex justify-end mb-6 print:hidden">
        <button
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
          @click="handlePrint"
        >
          <span class="material-symbols-outlined">print</span>
          Print Summary
        </button>
      </div>

      <!-- Main Content Card -->
      <div class="bg-white dark:bg-[#181311] rounded-2xl shadow-xl p-6 md:p-8 space-y-8">
        
        <!-- Key Information Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-gray-200 dark:border-neutral-800">
          <div class="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {{ vatRefund.percent }}%
            </div>
            <div class="text-sm text-text-muted dark:text-gray-400">VAT Refund Rate</div>
          </div>
          <div class="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              LKR {{ vatRefund.threshold.toLocaleString() }}
            </div>
            <div class="text-sm text-text-muted dark:text-gray-400">Minimum Spend (excl. VAT)</div>
          </div>
          <div class="text-center p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <div class="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              BIA
            </div>
            <div class="text-sm text-text-muted dark:text-gray-400">Claim at Airport</div>
          </div>
        </div>

        <!-- Eligibility Requirements -->
        <div>
          <h3 class="text-xl font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-green-600">verified_user</span>
            Who is Eligible?
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="requirement in vatRefund.eligible"
              :key="requirement"
              class="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
            >
              <span class="material-symbols-outlined text-green-600 flex-shrink-0 mt-0.5">check_circle</span>
              <span class="text-sm text-text-main dark:text-white">{{ requirement }}</span>
            </div>
          </div>
        </div>

        <!-- Step-by-Step Process -->
        <div>
          <h3 class="text-xl font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-600">list_alt</span>
            Step-by-Step Refund Process
          </h3>
          <div class="space-y-4">
            <div
              v-for="(step, index) in vatRefund.processSteps"
              :key="step"
              class="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <div class="flex-shrink-0 size-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <p class="text-sm text-text-main dark:text-white">{{ step }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Notes -->
        <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <h4 class="font-bold text-amber-700 dark:text-amber-300 mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined">info</span>
            Important Notes
          </h4>
          <ul class="space-y-2 text-sm text-amber-700 dark:text-amber-300">
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-base flex-shrink-0 mt-0.5">arrow_right</span>
              <span>The spend threshold of LKR 50,000 is <strong>excluding VAT</strong> and must be at a single authorized shop in one day</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-base flex-shrink-0 mt-0.5">arrow_right</span>
              <span>Goods must be available for physical verification at Customs - keep them in your carry-on or checked baggage</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-base flex-shrink-0 mt-0.5">arrow_right</span>
              <span>The Tourist VAT Refund Counter is located in the departure lounge at Bandaranaike International Airport (BIA)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-base flex-shrink-0 mt-0.5">arrow_right</span>
              <span>Service was relaunched on July 4th, 2025</span>
            </li>
          </ul>
        </div>

        <!-- Excluded Items -->
        <div>
          <h3 class="text-xl font-bold text-text-main dark:text-white mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-red-600">cancel</span>
            What's NOT Eligible for Refund
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="item in vatRefund.excludedItems"
              :key="item"
              class="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
            >
              <span class="material-symbols-outlined text-red-600 flex-shrink-0 mt-0.5">block</span>
              <span class="text-sm text-text-main dark:text-white">{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- Print-Friendly Summary Card -->
        <div class="border-t-2 border-dashed border-gray-300 dark:border-neutral-700 pt-8 mt-8">
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 rounded-xl p-6 border-2 border-gray-300 dark:border-neutral-700">
            <h4 class="text-lg font-bold text-center text-text-main dark:text-white mb-6 flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-primary">bookmark</span>
              Quick Reference Card
            </h4>
            
            <div class="space-y-4 max-w-2xl mx-auto">
              <!-- Quick Facts -->
              <div class="bg-white dark:bg-[#181311] p-4 rounded-lg">
                <h5 class="font-bold text-text-main dark:text-white mb-3 text-sm uppercase tracking-wider">Quick Facts</h5>
                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span class="text-text-muted dark:text-gray-400">Refund Rate:</span>
                    <span class="font-bold text-text-main dark:text-white ml-2">{{ vatRefund.percent }}%</span>
                  </div>
                  <div>
                    <span class="text-text-muted dark:text-gray-400">Min. Spend:</span>
                    <span class="font-bold text-text-main dark:text-white ml-2">LKR {{ vatRefund.threshold.toLocaleString() }}</span>
                  </div>
                  <div>
                    <span class="text-text-muted dark:text-gray-400">Age Required:</span>
                    <span class="font-bold text-text-main dark:text-white ml-2">18+</span>
                  </div>
                  <div>
                    <span class="text-text-muted dark:text-gray-400">Stay Limit:</span>
                    <span class="font-bold text-text-main dark:text-white ml-2">&lt;90 days</span>
                  </div>
                </div>
              </div>

              <!-- Checklist -->
              <div class="bg-white dark:bg-[#181311] p-4 rounded-lg">
                <h5 class="font-bold text-text-main dark:text-white mb-3 text-sm uppercase tracking-wider">Before You Leave Sri Lanka</h5>
                <ul class="space-y-2 text-sm">
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base text-blue-600 flex-shrink-0">check_box</span>
                    <span class="text-text-muted dark:text-gray-300">Keep all receipts from authorized retailers</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base text-blue-600 flex-shrink-0">check_box</span>
                    <span class="text-text-muted dark:text-gray-300">Get Tourist VAT Refund Invoice (TVRI)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base text-blue-600 flex-shrink-0">check_box</span>
                    <span class="text-text-muted dark:text-gray-300">Pack goods in carry-on or checked baggage (unused)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base text-blue-600 flex-shrink-0">check_box</span>
                    <span class="text-text-muted dark:text-gray-300">Arrive early at airport for verification</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base text-blue-600 flex-shrink-0">check_box</span>
                    <span class="text-text-muted dark:text-gray-300">Visit TVRS Counter in departure lounge at BIA</span>
                  </li>
                </ul>
              </div>

              <!-- Contact Info -->
              <div class="bg-white dark:bg-[#181311] p-4 rounded-lg text-center">
                <p class="text-xs text-text-muted dark:text-gray-400">
                  <strong>Location:</strong> Tourist VAT Refund Counter, Departure Lounge<br>
                  Bandaranaike International Airport (BIA), Colombo<br>
                  <span class="text-primary">Relaunched: July 4th, 2025</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style>
@media print {
  /* Hide non-essential elements when printing */
  .print\:hidden {
    display: none !important;
  }

  /* Optimize print layout */
  body {
    background: white;
    color: black;
  }

  /* Remove shadows and borders for cleaner print */
  .shadow-xl,
  .shadow-lg,
  .shadow-md {
    box-shadow: none !important;
    border: 1px solid #e5e7eb;
  }

  /* Ensure good contrast in print */
  .text-text-muted,
  .dark\:text-gray-300,
  .dark\:text-gray-400 {
    color: #374151 !important;
  }

  .text-text-main,
  .dark\:text-white {
    color: #000000 !important;
  }

  /* Simplify backgrounds for print */
  .bg-blue-50,
  .bg-green-50,
  .bg-amber-50,
  .bg-red-50,
  .dark\:bg-blue-900\/20,
  .dark\:bg-green-900\/20,
  .dark\:bg-amber-900\/20,
  .dark\:bg-red-900\/20 {
    background-color: #f9fafb !important;
  }

  /* Page break management */
  .space-y-8 > * {
    page-break-inside: avoid;
  }

  /* Ensure icons print clearly */
  .material-symbols-outlined {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
</style>
