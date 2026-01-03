<template>
  <section class="relative w-full bg-neutral-dark py-12 md:py-20 overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-40 bg-cover bg-center" 
         style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmx3BDFrBU86j-l7xB436R_AudbqpCbqDW9gof9ofnXfTnV0IP46XXoAXXovXvC_CgC-JWIJMFg7pRzgB-WFNiCH5LOuGhQ_MCDj0oTjoVgpCwPifBEghCascdRvXMf-00RtXGMcYRclEaVekXs4rwLzxaCWCGGGi941nK052J1NlOtdMFataDaP-nSwwqBjpgpZX8aUVtTfc_dXszk-kcArsjIA-LwryUmzEi6xZ5Khwidyp-M_303CQoNywc-pcahAn3H-grK8o');">
    </div>
    <div class="absolute inset-0 z-10 bg-gradient-to-r from-neutral-dark/90 to-neutral-dark/40"></div>
    <div class="relative z-20 max-w-[960px] mx-auto px-5 lg:px-0 flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="flex flex-col gap-4 max-w-lg">
        <div class="flex items-center gap-2 text-primary font-bold tracking-wide uppercase text-xs">
          <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          24/7 Assistance
        </div>
        <h1 class="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Emergency Support
        </h1>
        <p class="text-gray-300 text-lg leading-relaxed">
          Stay safe in Sri Lanka. Access immediate help, find consular services, and locate nearby medical facilities instantly.
        </p>
      </div>
      <div class="flex-shrink-0">
        <button class="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-xl transition-all">
          <span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">download</span>
          <div class="text-left">
            <div class="text-xs font-medium opacity-80">No Internet?</div>
            <div class="text-sm font-bold">Download Offline PDF</div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
