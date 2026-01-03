<template>
  <section>
    <div class="mb-6 flex items-center gap-3">
      <div class="h-8 w-1 bg-primary rounded-full"></div>
      <h2 class="text-2xl font-bold text-text-main dark:text-white">Regulations & Procedures</h2>
    </div>
    <div class="flex flex-col gap-4">
      <!-- Accordion Item 1 -->
      <details class="group bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 overflow-hidden open:ring-1 open:ring-primary/20">
        <summary class="flex items-center justify-between p-5 cursor-pointer hover:bg-background-light dark:hover:bg-white/5 transition-colors select-none">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-text-secondary group-open:text-primary transition-colors">input</span>
            <span class="font-bold text-text-main dark:text-white text-lg">Entry Requirements</span>
          </div>
          <span class="material-symbols-outlined text-text-secondary transform group-open:rotate-180 transition-transform">expand_more</span>
        </summary>
        <div class="px-5 pb-5 pt-0 text-text-secondary dark:text-gray-400 text-sm leading-relaxed border-t border-transparent group-open:border-border-color dark:group-open:border-neutral-700 group-open:pt-4">
          <p class="mb-2">Apart from the ETA, visitors must hold a passport valid for at least 6 months from the date of arrival. Travelers may be asked to show:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>A confirmed return ticket.</li>
            <li>Proof of sufficient funds for the stay.</li>
            <li>Yellow Fever Vaccination Certificate (if arriving from infected areas).</li>
          </ul>
        </div>
      </details>
      <!-- Accordion Item 2 -->
      <details class="group bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 overflow-hidden open:ring-1 open:ring-primary/20">
        <summary class="flex items-center justify-between p-5 cursor-pointer hover:bg-background-light dark:hover:bg-white/5 transition-colors select-none">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-text-secondary group-open:text-primary transition-colors">local_police</span>
            <span class="font-bold text-text-main dark:text-white text-lg">Customs Regulations</span>
          </div>
          <span class="material-symbols-outlined text-text-secondary transform group-open:rotate-180 transition-transform">expand_more</span>
        </summary>
        <div class="px-5 pb-5 pt-0 text-text-secondary dark:text-gray-400 text-sm leading-relaxed border-t border-transparent group-open:border-border-color dark:group-open:border-neutral-700 group-open:pt-4">
          <p class="mb-2">Visitors can bring personal effects duty-free. Allowance includes:</p>
          <ul class="list-disc pl-5 space-y-1 mb-2">
            <li>1.5 liters of spirits and 2 bottles of wine.</li>
            <li>Perfumes and travel souvenirs within reason ($250 value).</li>
          </ul>
          <p class="font-medium text-primary">Restricted Items:</p>
          <p>Strict penalties apply for drugs/narcotics. Drones require prior approval from the Civil Aviation Authority.</p>
        </div>
      </details>
      <!-- Accordion Item 3 -->
      <details class="group bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 overflow-hidden open:ring-1 open:ring-primary/20">
        <summary class="flex items-center justify-between p-5 cursor-pointer hover:bg-background-light dark:hover:bg-white/5 transition-colors select-none">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-text-secondary group-open:text-primary transition-colors">health_and_safety</span>
            <span class="font-bold text-text-main dark:text-white text-lg">Health Declaration</span>
          </div>
          <span class="material-symbols-outlined text-text-secondary transform group-open:rotate-180 transition-transform">expand_more</span>
        </summary>
        <div class="px-5 pb-5 pt-0 text-text-secondary dark:text-gray-400 text-sm leading-relaxed border-t border-transparent group-open:border-border-color dark:group-open:border-neutral-700 group-open:pt-4">
          <p>As of late 2023, COVID-19 vaccination cards and PCR tests are no longer mandatory for entry. However, travelers should maintain general hygiene and check for specific updates if new health alerts arise globally.</p>
        </div>
      </details>
    </div>
  </section>
</template>

<style scoped>
details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}
details[open] summary ~ * {
  animation: sweep .3s ease-in-out;
}
@keyframes sweep {
  0%    {opacity: 0; transform: translateY(-10px)}
  100%  {opacity: 1; transform: translateY(0)}
}
</style>
