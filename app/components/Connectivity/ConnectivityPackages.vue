<template>
  <section class="py-16 bg-background-light dark:bg-background-dark">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-primary dark:text-white mb-2">Recommended Tourist Data Packages</h2>
      <p class="text-text-muted text-sm mb-8">Find the perfect plan for your trip</p>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-10 items-center">
        <div class="flex flex-col gap-1">
          <span class="text-[10px] font-bold text-text-muted uppercase tracking-wide">Duration</span>
          <select
            class="form-select rounded-lg border-gray-300 text-xs py-2 pl-3 pr-8 focus:ring-primary focus:border-primary bg-white dark:bg-card-dark">
            <option>Any Duration</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-[10px] font-bold text-text-muted uppercase tracking-wide">Data Amount</span>
          <select
            class="form-select rounded-lg border-gray-300 text-xs py-2 pl-3 pr-8 focus:ring-primary focus:border-primary bg-white dark:bg-card-dark">
            <option>Any Data</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-[10px] font-bold text-text-muted uppercase tracking-wide">Travel Style</span>
          <select
            class="form-select rounded-lg border-gray-300 text-xs py-2 pl-3 pr-8 focus:ring-primary focus:border-primary bg-white dark:bg-card-dark">
            <option>All Styles</option>
          </select>
        </div>
        <label class="flex items-center gap-2 cursor-pointer mt-5 ml-2">
          <input checked class="rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
          <span class="text-xs text-primary font-medium">eSIM Only</span>
        </label>
      </div>

      <!-- Package Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ConnectivityPackageCard v-for="plan in plans" :key="plan.id" :plan="plan" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const plans = [
  {
    id: 'dialog-basic',
    provider: 'Dialog Axiata',
    name: 'Dialog Tourist Basic',
    category: 'Weekender',
    categoryIcon: 'event',
    priceUSD: 4,
    priceLKR: 1399,
    data: '20 GB',
    validity: '30 Days',
    features: ['Rs. 174 call credit'],
    tags: ['4G/5G Access', 'Hotspot enabled'],
    headerColor: 'accent-info'
  },
  {
    id: 'dialog-plus',
    provider: 'Dialog Axiata',
    name: 'Dialog Tourist Plus',
    category: 'Explorer',
    categoryIcon: 'star',
    priceUSD: 5,
    priceLKR: 1799,
    data: '30 GB',
    validity: '30 Days',
    features: ['Rs. 164 call credit'],
    tags: ['4G/5G Access', 'Hotspot enabled', 'Intl Roaming Ready'],
    headerColor: 'accent-info'
  },
  {
    id: 'dialog-premium',
    provider: 'Dialog Axiata',
    name: 'Dialog Tourist Premium',
    category: 'Digital Nomad',
    categoryIcon: 'workspace_premium',
    priceUSD: 7,
    priceLKR: 2450,
    data: '50 GB',
    validity: '30 Days',
    features: ['Rs. 250 call credit'],
    tags: ['Hotspot enabled', 'Priority Support'],
    headerColor: 'accent-info'
  },
  {
    id: 'mobitel-7day',
    provider: 'SLT-Mobitel',
    name: 'Mobitel 7-Day Plan',
    category: 'Short Trip',
    categoryIcon: 'bolt',
    priceUSD: 3,
    priceLKR: 821,
    data: '15 GB',
    validity: '7 Days',
    features: ['Unlimited local calls'],
    tags: ['1,000 SMS', '4G Access'],
    headerColor: 'secondary'
  },
  {
    id: 'mobitel-30day',
    provider: 'SLT-Mobitel',
    name: 'Mobitel 30-Day Plan',
    category: 'Explorer',
    categoryIcon: 'star',
    priceUSD: 5,
    priceLKR: 1540,
    data: '30 GB',
    validity: '30 Days',
    features: ['Pay-as-you-go'],
    tags: ['4G access', 'Hotspot enabled', 'Best Value'],
    headerColor: 'secondary'
  },
  {
    id: 'hutch-premium',
    provider: 'Hutch',
    name: 'Hutch eSIM Premium',
    category: 'Digital Nomad',
    categoryIcon: 'workspace_premium',
    priceUSD: 10,
    priceLKR: 3000,
    data: '125 GB',
    validity: '30 Days',
    features: ['Unlimited local calls', 'Rs. 500 IDD credit'],
    tags: ['eSIM - no physical card', 'Most data for price'],
    headerColor: 'accent-info'
  }
]
</script>
