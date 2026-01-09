<template>
  <section id="dress-code" class="mb-12">
    <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
      <span class="material-icons text-charcoal dark:text-white">checkroom</span> Temple Dress Code
    </h2>

    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Appropriate Attire -->
      <div
        class="bg-surface-light dark:bg-surface-dark border border-primary/30 dark:border-primary/50 rounded-2xl p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-4 pb-4 border-b border-primary/10">
          <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span class="material-icons text-primary">check_circle</span>
          </div>
          <div>
            <h3 class="font-bold text-lg text-primary">Appropriate Attire</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Respectful dress for temples and sacred sites</p>
          </div>
        </div>
        <ul class="space-y-4">
          <li class="flex gap-3 items-start">
            <span class="material-icons text-primary text-sm mt-1">done</span>
            <div>
              <strong class="block text-sm text-charcoal dark:text-gray-200">Shoulders covered</strong>
              <span class="text-xs text-gray-500 dark:text-gray-400">Cover shoulders at temples, religious sites, and
                rural areas</span>
            </div>
          </li>
          <li class="flex gap-3 items-start">
            <span class="material-icons text-primary text-sm mt-1">done</span>
            <div>
              <strong class="block text-sm text-charcoal dark:text-gray-200">Knees covered</strong>
              <span class="text-xs text-gray-500 dark:text-gray-400">Cover knees at temples and sacred sites — bring a
                sarong</span>
            </div>
          </li>
          <li class="flex gap-3 items-start">
            <span class="material-icons text-primary text-sm mt-1">done</span>
            <div>
              <strong class="block text-sm text-charcoal dark:text-gray-200">Shoes removed</strong>
              <span class="text-xs text-gray-500 dark:text-gray-400">Remove shoes before entering inner halls — wear
                socks if stone is hot</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Inappropriate Attire -->
      <div
        class="bg-surface-light dark:bg-surface-dark border border-muted-crimson/30 dark:border-muted-crimson/50 rounded-2xl p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-4 pb-4 border-b border-muted-crimson/10">
          <div
            class="w-10 h-10 rounded-full bg-muted-crimson-light dark:bg-muted-crimson/20 flex items-center justify-center">
            <span class="material-icons text-muted-crimson">cancel</span>
          </div>
          <div>
            <h3 class="font-bold text-lg text-muted-crimson">Inappropriate Attire</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">Avoid these to prevent being denied entry</p>
          </div>
        </div>
        <ul class="space-y-4">
          <li class="flex gap-3 items-start">
            <span class="material-icons text-muted-crimson text-sm mt-1">close</span>
            <div>
              <strong class="block text-sm text-charcoal dark:text-gray-200">Sleeveless tops</strong>
              <span class="text-xs text-gray-500 dark:text-gray-400">Not appropriate for temples or religious
                sites</span>
            </div>
          </li>
          <li class="flex gap-3 items-start">
            <span class="material-icons text-muted-crimson text-sm mt-1">close</span>
            <div>
              <strong class="block text-sm text-charcoal dark:text-gray-200">Shorts / mini-skirts</strong>
              <span class="text-xs text-gray-500 dark:text-gray-400">Not appropriate for temples — consider wearing
                below-knee length</span>
            </div>
          </li>
          <li class="flex gap-3 items-start">
            <span class="material-icons text-muted-crimson text-sm mt-1">close</span>
            <div>
              <strong class="block text-sm text-charcoal dark:text-gray-200">Buddha imagery on clothing</strong>
              <span class="text-xs text-gray-500 dark:text-gray-400">Extremely offensive — can result in refusal of
                entry</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Quick Pack Tip -->
    <div
      class="bg-cool-stone dark:bg-gray-800 border-l-4 border-primary p-6 rounded-r-xl flex flex-col sm:flex-row gap-6 mb-6">
      <div class="flex-shrink-0">
        <div
          class="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm text-primary">
          <span class="material-icons">backpack</span>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-2 mb-2">
          <h4 class="font-bold text-charcoal dark:text-white">Quick Pack Tip</h4>
          <span
            class="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Essential</span>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Carry a lightweight sarong or shawl in your bag — many temples require covered shoulders and knees,
          and you can borrow one at entrances for a small fee.
        </p>
        <div class="flex gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
          <span class="flex items-center gap-1">
            <span class="material-icons text-sm">checkroom</span> Sarong
          </span>
          <span class="flex items-center gap-1">
            <span class="material-icons text-sm">waves</span> Shawl
          </span>
          <span class="flex items-center gap-1">
            <span class="material-icons text-sm">snow_shoe</span> Socks
          </span>
        </div>
      </div>
    </div>

    <!-- Temple Entry Reminder -->
    <div
      class="bg-desaturated-blue/30 dark:bg-blue-900/10 rounded-xl p-6 border border-desaturated-blue dark:border-blue-900/30">
      <h4 class="font-bold text-charcoal dark:text-white mb-4 flex items-center gap-2">
        <span class="material-icons text-blue-700 dark:text-blue-400">temple_buddhist</span> Temple Entry Reminder
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-center gap-3">
          <span class="material-icons text-blue-600 dark:text-blue-400">do_not_step</span>
          <div class="text-sm">
            <span class="block font-medium text-charcoal dark:text-gray-200">Remove Shoes</span>
            <span class="text-blue-600/70 dark:text-blue-400/70 text-xs">Before entering shrines</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="material-icons text-blue-600 dark:text-blue-400">face</span>
          <div class="text-sm">
            <span class="block font-medium text-charcoal dark:text-gray-200">Remove Hats</span>
            <span class="text-blue-600/70 dark:text-blue-400/70 text-xs">Inside temple grounds</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="material-icons text-blue-600 dark:text-blue-400">wb_sunny</span>
          <div class="text-sm">
            <span class="block font-medium text-charcoal dark:text-gray-200">Hot Stone Tip</span>
            <span class="text-blue-600/70 dark:text-blue-400/70 text-xs">Bring socks for hot ground</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="material-icons text-blue-600 dark:text-blue-400">lock</span>
          <div class="text-sm">
            <span class="block font-medium text-charcoal dark:text-gray-200">Use Lockers</span>
            <span class="text-blue-600/70 dark:text-blue-400/70 text-xs">Available at major temples</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
