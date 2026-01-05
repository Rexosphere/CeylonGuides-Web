<template>
  <section class="relative w-full">
    <div class="layout-container flex justify-center">
      <div class="w-full max-w-[1440px] px-4 md:px-6 lg:px-10 pt-6 pb-2">
        <div class="relative overflow-hidden rounded-2xl min-h-[480px] md:min-h-[560px] flex items-center justify-center bg-cover bg-center" 
             role="img" 
             aria-label="Stunning aerial view of Sri Lankan coastline with turquoise water and palm trees" 
             style="background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url('/images/downloaded_567ff4cb279b.avif');">
          <div class="relative z-10 flex flex-col gap-6 text-center max-w-[720px] px-4 animate-fade-in-up">
            <span class="text-white/90 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">The Wonder of Asia</span>
            <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
              Curated Adventures in the Pearl of the Indian Ocean
            </h1>
            <p class="text-white/90 text-sm md:text-lg font-normal leading-relaxed max-w-lg mx-auto">
              From the misty peaks of Ella to the golden shores of Mirissa, discover authentic experiences that move you.
            </p>
            <div class="mt-4 flex w-full max-w-[500px] mx-auto bg-white dark:bg-[#2d2420] p-2 rounded-xl shadow-xl">
              <div class="flex items-center pl-3 text-gray-400">
                <span class="material-symbols-outlined">search</span>
              </div>
              <input class="flex-1 bg-transparent border-none focus:ring-0 text-sm md:text-base px-3 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none" placeholder="Search hiking, surfing, safari..." type="text"/>
              <button class="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
