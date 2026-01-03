<template>
  <section class="relative w-full">
    <div class="relative w-full h-[540px] flex items-center justify-center p-4">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-cover bg-center z-0" 
           role="img" 
           aria-label="Stunning aerial view of Sri Lanka tea plantations and mountains" 
           style="background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMbF8NdWi6SYF_G8ifxxZGTtPY74ilaMsd-Tz39_6avV552b9CksYAgCOrOlklMrbU0l4mxqVwHkzocqCNRGek2rM4H9F9t5H4ooTdq0jCG0ae_OBb0ZQWSMgKdg-zwakU2VdjZwznASt9blF7JZPT20BcuHmF53zGI9E11djsq-UsvDmwgdDVIvUIxzMphMMRthXYMtjmJBpxqFbL2Mts36K7UcMi7AFv6d1jjlGEcZxyeZPw--RdrjQLIBF0xQ5MyoWqlhLqwYw');">
      </div>
      <div class="relative z-10 flex flex-col items-center max-w-4xl text-center gap-8 animate-fade-in-up">
        <div class="space-y-4">
          <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Navigate Your Finances in Paradise
          </h1>
          <p class="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Essential guide to Rupee (LKR), ATMs, and smart budgeting for your Sri Lankan adventure.
          </p>
        </div>
        <!-- Currency Converter Widget -->
        <div class="w-full max-w-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 p-2 rounded-xl shadow-2xl">
          <div class="bg-white dark:bg-surface-dark rounded-lg p-6 flex flex-col md:flex-row gap-4 items-center shadow-sm">
            <div class="flex-1 w-full space-y-2 text-left">
              <label class="text-xs font-bold text-text-muted uppercase tracking-wider">I have (USD)</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">attach_money</span>
                <input class="w-full h-12 rounded-lg border border-gray-200 dark:border-neutral-700 bg-background-light dark:bg-[#221510] pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-bold text-lg text-text-main dark:text-white focus:outline-none" placeholder="100" type="number"/>
              </div>
            </div>
            <div class="flex items-end pb-2 md:pb-0">
              <button class="size-10 rounded-full bg-background-light dark:bg-[#3a2c26] flex items-center justify-center text-primary hover:rotate-180 transition-transform duration-300 border border-gray-200 dark:border-neutral-700">
                <span class="material-symbols-outlined">sync_alt</span>
              </button>
            </div>
            <div class="flex-1 w-full space-y-2 text-left">
              <label class="text-xs font-bold text-text-muted uppercase tracking-wider">I get (LKR)</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">currency_rupee</span>
                <input class="w-full h-12 rounded-lg border border-gray-200 dark:border-neutral-700 bg-background-light dark:bg-[#221510] pl-10 pr-4 text-text-muted cursor-not-allowed font-bold text-lg focus:outline-none" placeholder="~32,000" readonly type="number"/>
              </div>
            </div>
            <div class="flex items-end w-full md:w-auto mt-2 md:mt-0">
              <button class="h-12 w-full md:w-auto px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all active:scale-95 whitespace-nowrap">
                Convert Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
