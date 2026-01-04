<template>
  <section class="py-12 px-4 md:px-10 max-w-7xl mx-auto w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Budget Planner -->
      <div class="flex flex-col gap-6">
        <div class="border-l-4 border-primary pl-4">
          <h2 class="text-2xl font-bold text-text-main dark:text-white">Daily Budget Estimator</h2>
          <p class="text-text-muted mt-1">Average daily spend per person including stay, food & travel.</p>
        </div>
        <div class="space-y-4">
          <!-- Budget -->
          <div class="flex items-center p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-700">
            <div class="size-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
              <span class="material-symbols-outlined">backpack</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-text-main dark:text-white">Backpacker</h4>
              <p class="text-xs text-text-muted">Hostels, buses, street food</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-xl text-text-main dark:text-white">$25 - $35</p>
              <p class="text-xs text-text-muted">~9,000 LKR</p>
            </div>
          </div>
          <!-- Mid-range -->
          <div class="flex items-center p-4 bg-white dark:bg-surface-dark rounded-xl border-2 border-primary/20 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-primary text-white text-[10px] px-2 py-0.5 rounded-bl font-bold">POPULAR</div>
            <div class="size-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-4">
              <span class="material-symbols-outlined">hiking</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-text-main dark:text-white">Comfort Traveler</h4>
              <p class="text-xs text-text-muted">Guesthouses, trains, restaurants</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-xl text-text-main dark:text-white">$50 - $80</p>
              <p class="text-xs text-text-muted">~20,000 LKR</p>
            </div>
          </div>
          <!-- Luxury -->
          <div class="flex items-center p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-700">
            <div class="size-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-4">
              <span class="material-symbols-outlined">diamond</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-text-main dark:text-white">Luxury</h4>
              <p class="text-xs text-text-muted">Resorts, private car, fine dining</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-xl text-text-main dark:text-white">$150+</p>
              <p class="text-xs text-text-muted">~48,000 LKR</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Tipping Guide -->
      <div class="flex flex-col gap-6">
        <div class="border-l-4 border-primary pl-4">
          <h2 class="text-2xl font-bold text-text-main dark:text-white">Tipping Etiquette</h2>
          <p class="text-text-muted mt-1">Tipping is appreciated but not mandatory. Here is a rough guide.</p>
        </div>
        <div class="grid grid-cols-2 gap-4 h-full">
          <div class="bg-white dark:bg-[#32231e] p-5 rounded-xl border border-gray-200 dark:border-neutral-700 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <span class="material-symbols-outlined text-3xl text-primary mb-3">restaurant</span>
            <div>
              <h4 class="font-bold mb-1 text-text-main dark:text-white">Restaurants</h4>
              <p class="text-sm text-text-muted">10% service charge is often included. Small change is appreciated.</p>
            </div>
          </div>
          <div class="bg-white dark:bg-[#32231e] p-5 rounded-xl border border-gray-200 dark:border-neutral-700 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <span class="material-symbols-outlined text-3xl text-primary mb-3">directions_car</span>
            <div>
              <h4 class="font-bold mb-1 text-text-main dark:text-white">Drivers & Guides</h4>
              <p class="text-sm text-text-muted">500 - 1000 LKR per day is standard for good service.</p>
            </div>
          </div>
          <div class="bg-white dark:bg-[#32231e] p-5 rounded-xl border border-gray-200 dark:border-neutral-700 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <span class="material-symbols-outlined text-3xl text-primary mb-3">room_service</span>
            <div>
              <h4 class="font-bold mb-1 text-text-main dark:text-white">Hotel Staff</h4>
              <p class="text-sm text-text-muted">100 - 200 LKR for porters or room service.</p>
            </div>
          </div>
          <div class="bg-white dark:bg-[#32231e] p-5 rounded-xl border border-gray-200 dark:border-neutral-700 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <span class="material-symbols-outlined text-3xl text-primary mb-3">temple_buddhist</span>
            <div>
              <h4 class="font-bold mb-1 text-text-main dark:text-white">Temples</h4>
              <p class="text-sm text-text-muted">Donation boxes are available. Small contribution is respectful.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
