<template>
  <section class="scroll-mt-24 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="food">
    <div
      class="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-border-light dark:border-border-dark">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="relative h-64 lg:h-auto">
          <img alt="Fresh Fruit" class="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrc4y2YwV8PU3CWnXKhtLGjwUfs_4fYeLyhUVfnVtJQYppuAC5MmCkt_DcPvlDKL0H3IGpa5Kxy0qjPBWcVEhgvEGyAB-PtEW33B2r7PDtQviDYtwRrflEow5J_pceqiCkomUpsdiPSc8Ka3Odb5vpQpvruqKpAudQu7yosfg8eyCcDAIHhY0ctq-H2hQKMX49-TIgVC56yJuM70_J_z6SIuWVtfxk2QPRSWqar_vSM75sI1eO7-8fNFnKowe4PcZpa6vevzGkFk8" />
          <div
            class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
            Eat Fresh, Eat Safe.
          </div>
        </div>
        <div class="p-8 lg:p-12">
          <h2 class="text-2xl font-bold mb-4">Food &amp; Water Safety</h2>
          <p class="text-text-sub-light dark:text-text-sub-dark mb-8 leading-relaxed">
            Sri Lankan food is delicious, but travelers' stomachs can be sensitive. Follow these simple rules to stay
            healthy.
          </p>

          <div class="space-y-6">
            <div>
              <h4 class="font-bold flex items-center gap-2 mb-3 text-primary">
                <span class="material-icons">water_drop</span> Water Safety
                <span
                  class="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded border border-secondary/20 uppercase ml-2">
                  Tap Water Not Safe
                </span>
              </h4>
              <ul class="space-y-2 text-sm text-text-sub-light dark:text-text-sub-dark ml-1">
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  Drink only bottled water—check the seal.
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  Use bottled water for brushing teeth.
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  Be careful with ice cubes in small cafes.
                </li>
              </ul>
            </div>

            <div class="h-px bg-border-light dark:bg-border-dark"></div>

            <div>
              <h4 class="font-bold flex items-center gap-2 mb-3 text-primary">
                <span class="material-icons">restaurant</span> Food Tips
              </h4>
              <ul class="space-y-2 text-sm text-text-sub-light dark:text-text-sub-dark ml-1">
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  Eat cooked food served hot.
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  Peel fruit yourself (bananas, mangoes).
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                  Avoid raw salads in budget eateries.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
