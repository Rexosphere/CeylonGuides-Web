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
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Green tea plantation fields in hill country" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_aA1gm4lBHOb1Im_2jyF-2veXMNqrLsBOrI-GaAqABiy4Wuxw3unFVWpwTooScaIXNMVCaJy-aatJWZrVgw_dxlLKKrjZoJ04kEW7ZDIUyZvayNSIZBZQn8Hns8GULbs8cYcoLGvLy79Im0yZg2TIV7IFEHOP7zAROJ1VRiv9D-htM0Q_vGrFesh666VNVH_9WEsYemFg1PekH0Y2s_cxsMC8xKncC33c3KZjiF0tf0_7c4PLz_-X_s4cDDUot_v_IVTbPj7bHtg');"></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">Ceylon Tea</p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">World-renowned aroma</p>
            </div>
          </div>
          <!-- Item 2 -->
          <div class="group flex flex-col gap-3 pb-3 cursor-pointer">
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Blue sapphire gemstone close up" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAABERS_z6Ud4lh5GzqDhir5Zw5kPR_bALlPQMvBjDhY82ondcLKeXeAt7btSlLq-lXZH0T2NUFZ6xycon_1yWWQ3FRtGLx1IJ5WorKUfgQAKZqLczuDlOFEs5amMWczDT7IPwX1QdnN5dw2R9sx9e7L2fZjP2fTPo2XPpbMmc_hwAjNj-ctKAXezjOovoLBrjbHoGgIKZgJDX5-53n7BFeiP_-4PSjrHZCimD_EDGuqnS7q3jV8MPeiXHZmDGU29_Z7FVIfdKHo84');"></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">Blue Sapphires</p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">Certified gemstones</p>
            </div>
          </div>
          <!-- Item 3 -->
          <div class="group flex flex-col gap-3 pb-3 cursor-pointer">
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Colorful batik fabric pattern textures" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuASTtIZosWVJcLHl4y3xdFW7fcNDQiNa_AIHxILYxqUYqTPd6-gyEv7XNeDyoD6aeOFUSE3oLRYek2dPEXUosz1ES-Pl99sdrelvdHw2ExSOb3wtuFgLXAp8IOMsjnlkn5dVGOErOdyEC06NLNNF_0SK3pggR4kKQpk4YHsLK600f2hK8_LDHHKL82gRzR9U9K6weyw-jrd6H3O62vbDhx1LwnrIU2EtQZ3tvcJ_vh0V6GVPWZzvS8Aw5EXcIw6rgsOBcJ_a6uE8GU');"></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">Handloom & Batik</p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">Traditional artistry</p>
            </div>
          </div>
          <!-- Item 4 -->
          <div class="group flex flex-col gap-3 pb-3 cursor-pointer">
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Cinnamon sticks and spices on wooden table" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6o85DYgtR56AG3CB82jIN1AR1EiFCiD9F9Sisz_eKNjqZY3jnbZ5BXW-8Hew9Dcael7nVZN2VswwXvYBkBu7M4SCiMGONVk_b9SmwZu359j6A-NAaUFHuhtgPHLacfY2pDNUzKkc4SZwebqWZN2nTzxiSg3zqAUItHkm07aHqfQFxrG_JQQjEh7ndp-bm6erFtBgjYiDeOXznSRRE129t7L3VpY0ygBrGNFqHEi5gQVCW8YrA_86YVBHTjjqdupzcF1sFsbryu2s');"></div>
            <div>
              <p class="text-text-main dark:text-white text-base font-bold leading-normal group-hover:text-primary transition-colors">Spices</p>
              <p class="text-text-muted dark:text-gray-400 text-sm font-normal leading-normal">Authentic cinnamon</p>
            </div>
          </div>
          <!-- Item 5 -->
          <div class="group flex flex-col gap-3 pb-3 cursor-pointer">
            <div class="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 group-hover:-translate-y-1 shadow-sm" role="img" aria-label="Traditional Sri Lankan wooden devil mask" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHm9PUVLB6Iq8aKjafAzg9pRvCQjEJTUEi5gN9KsTFtlNxI_gCTkUnBgebkqNMqrePXNJvnCnX1iH_KPUFy1lSYpwEkmhyKmtB10hPWvZv-72IuR67l6_tJu-K1ezq4t-EkmzEj9U8UOiPTzMODMHpwvFxKqeyY2y9jmklRxLKteNfIs2kTuQRFwX_hPu-A1fqJqplzy29x9P79AwOyJM23T9XxU2nElS0solRqf2llJffjpoeZiImO9MvnBPNOCWXHkt1Nr9_tg8');"></div>
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
