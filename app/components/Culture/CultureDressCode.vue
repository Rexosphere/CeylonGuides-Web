<template>
  <section class="w-full max-w-[960px] px-4 md:px-10 mb-16 mx-auto">
    <div class="flex flex-col gap-4 mb-8">
      <h2 class="text-[28px] font-bold leading-tight tracking-[-0.015em] text-text-main dark:text-white">Temple Dress Code</h2>
      <p class="text-base text-text-muted dark:text-gray-300 max-w-[720px]">
        Modesty is key when visiting temples. Both men and women must cover their shoulders and knees. Hats and footwear must be removed before entering the temple grounds.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Appropriate -->
      <div class="flex flex-col gap-4 bg-white dark:bg-[#2c1e19] p-4 rounded-xl shadow-sm border border-green-100 dark:border-green-900/30">
        <div class="w-full aspect-video bg-cover bg-center rounded-lg overflow-hidden relative" style='background-image: url("/images/downloaded_b6131c7872ea.avif");'>
          <div class="absolute top-3 right-3 bg-green-500 text-white rounded-full p-1">
            <span class="material-symbols-outlined text-sm font-bold">check</span>
          </div>
        </div>
        <div>
          <p class="text-green-700 dark:text-green-400 text-lg font-bold leading-normal flex items-center gap-2">
            <span class="material-symbols-outlined text-xl">check_circle</span> Appropriate Attire
          </p>
          <p class="text-text-muted dark:text-gray-400 text-sm mt-1">Shoulders covered, long pants or skirts extending below the knee, shoes removed at entrance.</p>
        </div>
      </div>
      <!-- Inappropriate -->
      <div class="flex flex-col gap-4 bg-white dark:bg-[#2c1e19] p-4 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30">
        <div class="w-full aspect-video bg-cover bg-center rounded-lg overflow-hidden relative" style='background-image: url("/images/downloaded_8f986fb972ab.avif");'>
          <div class="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1">
            <span class="material-symbols-outlined text-sm font-bold">close</span>
          </div>
        </div>
        <div>
          <p class="text-red-700 dark:text-red-400 text-lg font-bold leading-normal flex items-center gap-2">
            <span class="material-symbols-outlined text-xl">cancel</span> Inappropriate Attire
          </p>
          <p class="text-text-muted dark:text-gray-400 text-sm mt-1">Sleeveless shirts, tank tops, shorts or skirts above the knee, wearing hats or shoes inside.</p>
        </div>
      </div>
    </div>
  </section>
</template>
