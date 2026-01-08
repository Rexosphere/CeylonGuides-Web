<script setup lang="ts">
import { useShoppingData } from '~/composables/useShoppingData'

const { guides, vatRefund } = useShoppingData()
</script>

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
              <li v-for="item in guides.authenticExperience" :key="item" class="flex items-start gap-2">
                <span class="material-symbols-outlined text-green-500 text-sm mt-1">check_circle</span>
                <span class="text-text-muted dark:text-gray-300 text-sm">{{ item }}</span>
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
              <li v-for="trap in guides.touristTraps" :key="trap" class="flex items-start gap-2">
                <span class="material-symbols-outlined text-red-500 text-sm mt-1">cancel</span>
                <span class="text-text-muted dark:text-gray-300 text-sm">{{ trap }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Bottom Info Row: Bargaining + Duty Free + VAT -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <!-- Bargaining Card -->
        <div class="md:col-span-2 bg-primary/5 dark:bg-[#2a1d17] p-6 rounded-xl">
          <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-3">
            <span class="material-symbols-outlined text-primary">handshake</span>
            Bargaining Tips
          </h3>
          <div class="flex flex-col gap-3">
            <div
              v-for="tip in guides.bargainingTips"
              :key="tip"
              class="bg-white dark:bg-[#181311] p-3 rounded-lg shadow-sm"
            >
              <p class="text-sm text-text-muted dark:text-gray-300">{{ tip }}</p>
            </div>
          </div>
        </div>
        <!-- Duty Free Card -->
        <div class="bg-white dark:bg-[#181311] p-6 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <h3 class="text-lg font-bold text-text-main dark:text-white flex items-center gap-2 mb-3">
            <span class="material-symbols-outlined text-primary">shopping_bag</span>
            Duty Free Info
          </h3>
          <div class="flex flex-col gap-3">
            <div
              v-for="info in guides.dutyFreeInfo"
              :key="info"
              class="text-sm text-text-muted dark:text-gray-300"
            >
              <p>{{ info }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- VAT Refund Section -->
      <div class="px-4">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
          <div class="flex items-center gap-3 mb-4">
            <div class="size-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
              <span class="material-symbols-outlined text-blue-600 dark:text-blue-300">receipt_long</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-text-main dark:text-white">VAT Refund for Tourists</h3>
              <p class="text-sm text-text-muted dark:text-gray-300">Get {{ vatRefund.percent }}% back on purchases over LKR {{ vatRefund.threshold.toLocaleString() }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 class="font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600">check_circle</span>
                Eligible Items
              </h4>
              <ul class="space-y-2">
                <li v-for="item in vatRefund.eligible" :key="item" class="flex items-start gap-2 text-sm">
                  <span class="material-symbols-outlined text-green-500 text-base mt-0.5">check</span>
                  <span class="text-text-muted dark:text-gray-300">{{ item }}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                <span class="material-symbols-outlined text-red-600">cancel</span>
                Not Eligible
              </h4>
              <ul class="space-y-2">
                <li v-for="item in vatRefund.excludedItems" :key="item" class="flex items-start gap-2 text-sm">
                  <span class="material-symbols-outlined text-red-500 text-base mt-0.5">close</span>
                  <span class="text-text-muted dark:text-gray-300">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600">list</span>
              How to Claim
            </h4>
            <ol class="space-y-2">
              <li v-for="(step, index) in vatRefund.processSteps" :key="step" class="flex items-start gap-3 text-sm">
                <span class="flex-shrink-0 size-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {{ index + 1 }}
                </span>
                <span class="text-text-muted dark:text-gray-300 mt-0.5">{{ step }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
