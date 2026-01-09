<template>
  <section>
    <div class="mb-6 flex items-center gap-3">
      <div class="h-8 w-1 bg-primary rounded-full"></div>
      <h2 class="text-2xl font-bold text-text-main dark:text-white">Regulations & Procedures</h2>
    </div>
    
    <div class="flex flex-col gap-3">
      <div v-for="(item, index) in faqItems" :key="index" class="relative group">
        <details class="bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 overflow-hidden open:ring-1 open:ring-primary/20 transition-all duration-300">
          <summary class="flex items-center justify-between p-5 cursor-pointer hover:bg-background-light dark:hover:bg-white/5 transition-colors select-none list-none">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined">{{ item.icon }}</span>
              </div>
              <span class="font-bold text-text-main dark:text-white text-lg">{{ item.title }}</span>
            </div>
            <span class="material-symbols-outlined text-text-secondary transform group-open:rotate-180 transition-transform duration-300">expand_more</span>
          </summary>
          
          <div class="px-5 pb-5 pl-[76px] text-text-secondary dark:text-gray-400 text-sm leading-relaxed border-t border-transparent group-open:border-border-color dark:group-open:border-neutral-700 group-open:pt-4">
            <div v-html="item.content"></div>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const faqItems = [
  {
    icon: 'input',
    title: 'Entry Requirements',
    content: `
      <ul class="list-disc space-y-1 pl-4">
        <li><strong>Passport:</strong> Must be valid for at least 6 months from arrival date.</li>
        <li><strong>Return Ticket:</strong> Proof of confirmed return or onward travel.</li>
        <li><strong>Sufficient Funds:</strong> Evidence you can support your stay.</li>
        <li><strong>ETA Approval:</strong> Printed copy of your Electronic Travel Authorization.</li>
      </ul>
    `
  },
  {
    icon: 'laptop_mac',
    title: 'Online ETA Process (Recommended)',
    content: `
      <p class="mb-2">We strongly advise applying online before travel to avoid queues.</p>
      <ol class="list-decimal space-y-1 pl-4 mb-2">
        <li>Visit the official <a href="https://eta.gov.lk" target="_blank" class="text-primary hover:underline">eta.gov.lk</a> portal.</li>
        <li>Fill out the application and pay via Credit/Debit card.</li>
        <li>Receive approval email within 24-48 hours.</li>
      </ol>
      <div class="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg text-xs font-semibold inline-block">
        Fastest & Cheapest Option
      </div>
    `
  },
  {
    icon: 'flight_land',
    title: 'On-Arrival ETA',
    content: `
      <p class="mb-2">Available at Bandaranaike International Airport (Colombo) if you didn't apply online.</p>
      <div class="space-y-2">
        <p><strong>Fee:</strong> Generally $10 USD higher than the online rate (Std: $60).</p>
        <p class="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">warning</span> 
          Warning: Long queues are common during peak hours.
        </p>
      </div>
    `
  },
  {
    icon: 'local_police',
    title: 'Customs & Restricted Items',
    content: `
      <p class="mb-2"><strong>Duty-Free Allowance:</strong> 1.5L of spirits, 2 bottles of wine, and small quantity of perfume ($250 value).</p>
      <p class="mb-2"><strong>Personal Electronics:</strong> 1 Laptop, 1 Camera allowed duty-free.</p>
      <div class="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg">
        <p class="font-bold text-red-700 dark:text-red-400 text-xs uppercase mb-1">Strictly Prohibited / Restricted</p>
        <ul class="list-disc pl-4 text-xs text-red-600/80 dark:text-red-400/80">
          <li><strong>Drugs/Narcotics:</strong> Severe penalties including life imprisonment.</li>
          <li><strong>Drones:</strong> Require prior approval from Civil Aviation Authority (CAA).</li>
          <li><strong>Plants/Animals:</strong> Strict quarantine rules apply.</li>
        </ul>
      </div>
    `
  },
  {
    icon: 'health_and_safety',
    title: 'Health Declaration', // icon fix below
    content: `
      <p><strong>COVID-19:</strong> No vaccination cards or PCR tests are currently required for entry.</p>
      <p class="mt-2"><strong>Yellow Fever:</strong> Certificate required ONLY if arriving from a country with risk of Yellow Fever transmission (e.g., parts of Africa/South America).</p>
    `
  },
  {
    icon: 'update',
    title: 'Extensions & Overstay',
    content: `
      <p class="mb-2"><strong>Extensions:</strong> Must be requested before your current visa expires. Apply online at <a href="https://eservices.immigration.gov.lk" target="_blank" class="text-primary hover:underline">eservices.immigration.gov.lk</a> or at the Head Office in Battaramulla.</p>
      <p class="font-bold text-red-600 dark:text-red-400">Overstay Penalties:</p>
      <ul class="list-disc pl-4 text-sm">
        <li>$250 USD fine (7-14 days overdue)</li>
        <li>$500 USD fine (14+ days overdue)</li>
        <li>Possible deportation and future entry ban.</li>
      </ul>
    `
  }
]


</script>

<style scoped>
/* Remove default summary marker */
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
</style>
