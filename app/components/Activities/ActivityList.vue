<template>
  <div class="flex flex-col">
    <!-- Trending Section Header -->
    <section class="pt-8">
      <div class="layout-container flex justify-center">
        <div class="w-full max-w-[1440px] px-4 md:px-10">
          <div class="flex items-end justify-between mb-6">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-text-main dark:text-white">Trending Experiences</h2>
              <p class="text-text-muted mt-1">Top-rated adventures loved by travelers this week.</p>
            </div>
            <a class="hidden sm:flex items-center gap-1 text-primary font-bold text-sm hover:translate-x-1 transition-transform" href="#">
              View all <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Grid -->
    <section class="pb-16">
      <div class="layout-container flex justify-center">
        <div class="w-full max-w-[1440px] px-4 md:px-10">
          <!-- Grid Container -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <!-- Card 1 -->
            <div class="group flex flex-col gap-3 cursor-pointer">
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">Hiking</div>
                <div class="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                  <span class="material-symbols-outlined fill-current hover:text-primary transition-colors">favorite</span>
                </div>
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="Hiker standing on Little Adam's peak overlooking green mountains" style="background-image: url('/images/downloaded_f042208332ff.avif');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">$15 / person</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">Sunrise Hike at Little Adam's Peak</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> Ella</span>
                  <span>•</span>
                  <span>Moderate</span>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="group flex flex-col gap-3 cursor-pointer">
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">Wellness</div>
                <div class="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                  <span class="material-symbols-outlined fill-current hover:text-primary transition-colors">favorite</span>
                </div>
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="Traditional Ayurveda massage setting with oil and flowers" style="background-image: url('/images/downloaded_7d353ffcc591.avif');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">$45 / session</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">Traditional Ayurveda Treatment</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> Galle</span>
                  <span>•</span>
                  <span>Relaxing</span>
                </div>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="group flex flex-col gap-3 cursor-pointer">
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">Wildlife</div>
                <div class="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                  <span class="material-symbols-outlined fill-current hover:text-primary transition-colors">favorite</span>
                </div>
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="Leopard resting on a tree branch in Yala National Park" style="background-image: url('/images/downloaded_27e8c35d5c2c.avif');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">$60 / person</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">Leopard Safari in Yala</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> Yala</span>
                  <span>•</span>
                  <span>Adventure</span>
                </div>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="group flex flex-col gap-3 cursor-pointer">
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">Water Sports</div>
                <div class="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                  <span class="material-symbols-outlined fill-current hover:text-primary transition-colors">favorite</span>
                </div>
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="Surfer catching a wave in the ocean at sunset" style="background-image: url('/images/downloaded_e4fa93d74062.avif');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">$25 / lesson</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">Surfing Lessons in Weligama</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> Weligama</span>
                  <span>•</span>
                  <span>Active</span>
                </div>
              </div>
            </div>

            <!-- Card 5 -->
            <div class="group flex flex-col gap-3 cursor-pointer">
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">Culture</div>
                <div class="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                  <span class="material-symbols-outlined fill-current hover:text-primary transition-colors">favorite</span>
                </div>
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="Ancient Sigiriya Rock Fortress rising from the jungle" style="background-image: url('/images/downloaded_b6f84a555858.avif');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">$30 / entry</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">Climb Sigiriya Lion Rock</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> Dambulla</span>
                  <span>•</span>
                  <span>Moderate</span>
                </div>
              </div>
            </div>

            <!-- Card 6 -->
            <div class="group flex flex-col gap-3 cursor-pointer">
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">Scenic Train</div>
                <div class="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                  <span class="material-symbols-outlined fill-current hover:text-primary transition-colors">favorite</span>
                </div>
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="Blue train passing over the Nine Arches Bridge in Sri Lanka" style="background-image: url('/images/downloaded_57d1237dafa2.avif');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">$3 / ticket</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">Kandy to Ella Train Journey</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> Hill Country</span>
                  <span>•</span>
                  <span>Relaxing</span>
                </div>
              </div>
            </div>

            <!-- Card 7 -->
            <div class="group flex flex-col gap-3 cursor-pointer">
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">Wildlife</div>
                <div class="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                  <span class="material-symbols-outlined fill-current hover:text-primary transition-colors">favorite</span>
                </div>
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="Group of wild elephants gathering near water in Minneriya" style="background-image: url('/images/downloaded_dd64a547d93a.avif');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">$55 / person</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">The Elephant Gathering</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> Minneriya</span>
                  <span>•</span>
                  <span>Family Friendly</span>
                </div>
              </div>
            </div>

            <!-- Card 8 -->
            <div class="group flex flex-col gap-3 cursor-pointer">
              <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl">
                <div class="absolute top-3 left-3 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-text-main dark:text-white">Culinary</div>
                <div class="absolute top-3 right-3 z-10 text-white drop-shadow-md">
                  <span class="material-symbols-outlined fill-current hover:text-primary transition-colors">favorite</span>
                </div>
                <div class="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="Sri Lankan spices and curry dishes in clay pots" style="background-image: url('/images/downloaded_38dcb2f67ab0.avif');"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <span class="bg-primary px-2 py-0.5 rounded text-xs font-bold">$20 / person</span>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-text-main dark:text-white">Traditional Cooking Class</h3>
                <div class="flex items-center gap-2 mt-1 text-sm text-text-muted dark:text-gray-400">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> Kandy</span>
                  <span>•</span>
                  <span>Easy</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-12 flex justify-center">
            <button class="bg-white dark:bg-surface-dark border border-gray-200 dark:border-neutral-800 text-text-main dark:text-white px-8 py-3 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-surface-dark/80 transition-colors">
              Load More Experiences
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
