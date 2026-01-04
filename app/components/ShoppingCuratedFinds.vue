<template>
  <div>
    <!-- Intro / Page Heading -->
    <div class="w-full px-4 md:px-20 lg:px-40 py-5 flex justify-center">
      <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div class="flex flex-wrap justify-between gap-3 p-4">
          <div class="flex min-w-72 flex-col gap-3">
            <p class="text-text-main dark:text-white tracking-light text-[32px] font-bold leading-tight">Curated Finds: What to Buy</p>
            <p class="text-text-muted dark:text-gray-400 text-lg font-normal leading-normal max-w-2xl">
              From world-famous Ceylon tea to intricate hand-carved masks, discover the treasures that define our island's craftsmanship.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Grid (Curated Finds) -->
    <div class="w-full px-4 md:px-20 lg:px-40 pb-5 flex justify-center">
      <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
          <!-- Item 1 -->
          <div class="group flex flex-col gap-3 pb-3 cursor-pointer">
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Green tea plantation fields in hill country" style="background-image: url('/images/downloaded_be46d60c414a.avif');"></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">Ceylon Tea</p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">World-renowned aroma</p>
            </div>
          </div>
          <!-- Item 2 -->
          <div class="group flex flex-col gap-3 pb-3 cursor-pointer">
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Blue sapphire gemstone close up" style="background-image: url('/images/downloaded_7c1d65c6eea9.avif');"></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">Blue Sapphires</p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">Certified gemstones</p>
            </div>
          </div>
          <!-- Item 3 -->
          <div class="group flex flex-col gap-3 pb-3 cursor-pointer">
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Colorful batik fabric pattern textures" style="background-image: url('/images/downloaded_7bb9f5cc5d8e.avif');"></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">Handloom & Batik</p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">Traditional artistry</p>
            </div>
          </div>
          <!-- Item 4 -->
          <div class="group flex flex-col gap-3 pb-3 cursor-pointer">
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Cinnamon sticks and spices on wooden table" style="background-image: url('/images/downloaded_5eb95fca2bc2.avif');"></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">Spices</p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">Authentic cinnamon</p>
            </div>
          </div>
          <!-- Item 5 -->
          <div class="group flex flex-col gap-3 pb-3 cursor-pointer">
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Traditional Sri Lankan wooden devil mask" style="background-image: url('/images/downloaded_de2043fb1421.avif');"></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">Raksha Masks</p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">Hand-carved wood</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
