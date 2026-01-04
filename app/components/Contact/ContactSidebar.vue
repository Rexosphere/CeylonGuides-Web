<template>
  <div class="w-full lg:w-[320px] flex flex-col gap-6">
    
    <!-- Direct Contact Card -->
    <div class="bg-[#221510] text-white rounded-2xl p-6 shadow-lg bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <h4 class="text-lg font-bold mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">support_agent</span>
        Other ways to connect
      </h4>
      <ul class="space-y-4">
        <li class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-sm">mail</span>
          </div>
          <div>
            <p class="text-xs text-white/60 font-medium uppercase tracking-wider">Email Support</p>
            <a class="text-sm font-semibold hover:text-primary transition-colors" href="mailto:hello@ceylonguide.com">hello@ceylonguide.com</a>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-sm">chat</span>
          </div>
          <div>
            <p class="text-xs text-white/60 font-medium uppercase tracking-wider">Live Chat</p>
            <p class="text-sm font-semibold">Available 9am - 6pm IST</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-sm">location_on</span>
          </div>
          <div>
            <p class="text-xs text-white/60 font-medium uppercase tracking-wider">Office</p>
            <p class="text-sm font-semibold">Colombo 07, Sri Lanka</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- FAQ Mini Section -->
    <div class="bg-white dark:bg-[#2a1d18] rounded-2xl shadow-sm border border-[#e6dedb] dark:border-[#3a2d29] p-6">
      <h4 class="text-lg font-bold text-[#181311] dark:text-white mb-4">Common Questions</h4>
      <div class="flex flex-col gap-3">
        <details class="group bg-background-light dark:bg-[#221510] rounded-lg p-3 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-center justify-between cursor-pointer font-bold text-sm text-[#181311] dark:text-gray-200">
            How do I book a guide?
            <span class="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
          </summary>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Simply navigate to the "Guides" section, browse profiles, and click "Book Now" on your chosen guide's page.
          </p>
        </details>
        <details class="group bg-background-light dark:bg-[#221510] rounded-lg p-3 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-center justify-between cursor-pointer font-bold text-sm text-[#181311] dark:text-gray-200">
            Are payments secure?
            <span class="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
          </summary>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Yes, all transactions are encrypted and processed through secure global payment gateways.
          </p>
        </details>
        <details class="group bg-background-light dark:bg-[#221510] rounded-lg p-3 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-center justify-between cursor-pointer font-bold text-sm text-[#181311] dark:text-gray-200">
            Can I cancel a tour?
            <span class="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
          </summary>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Cancellations made 48 hours prior to the scheduled tour are eligible for a full refund.
          </p>
        </details>
      </div>
      <div class="mt-4 pt-4 border-t border-[#e6dedb] dark:border-[#3a2d29]">
        <a class="text-primary text-sm font-bold hover:underline flex items-center gap-1" href="#">
          View all FAQs 
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
    </div>

    <!-- Partnership Promo -->
    <div class="bg-primary/10 rounded-2xl p-6 border border-primary/20">
      <h4 class="text-lg font-bold text-[#181311] dark:text-white mb-2">Join our network</h4>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Are you a local guide or hotelier? Let's showcase Sri Lanka together.</p>
      <button class="w-full py-2 bg-white dark:bg-[#221510] text-primary font-bold rounded-lg text-sm border border-primary/20 hover:bg-primary/5 transition-colors">
        Become a Partner
      </button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
</script>
