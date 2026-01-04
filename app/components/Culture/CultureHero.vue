<template>
  <section class="w-full flex justify-center py-5 px-4 md:px-10 lg:px-40">
    <div class="w-full max-w-[960px]">
      <div class="@container">
        <div class="@[480px]:p-4">
          <div 
            class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-6 text-center shadow-sm relative overflow-hidden" 
            :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url('/images/downloaded_46ef208260ac.avif')` }"
          >
            <div class="flex flex-col gap-2 max-w-[700px] z-10">
              <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black">
                Respecting the Pearl of the Indian Ocean
              </h1>
              <h2 class="text-white/90 text-sm font-medium leading-relaxed @[480px]:text-lg mt-2">
                Essential cultural etiquette and guidelines for a respectful journey through the sacred lands of Sri Lanka.
              </h2>
            </div>
            <button class="z-10 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-culture-primary hover:bg-orange-600 transition-colors text-white text-base font-bold shadow-lg">
              <span class="truncate">Download PDF Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
