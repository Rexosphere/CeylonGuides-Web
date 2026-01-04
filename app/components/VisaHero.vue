<template>
  <div class="relative w-full">
    <div class="relative flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-6 lg:p-12" 
         role="img" 
         aria-label="Misty tea plantations in Sri Lanka with golden sunrise light" 
         style='background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("/images/downloaded_de679f9bc051.avif");'>
      <div class="max-w-3xl w-full flex flex-col items-center gap-4 text-center z-10 animate-fade-in-up">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
          <span class="material-symbols-outlined text-[16px]">public</span> Official Travel Guide
        </span>
        <h1 class="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
          Visa & Entry Requirements
        </h1>
        <p class="text-white/90 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
          Everything you need to know before landing in paradise. Check specific requirements for your nationality below.
        </p>
        <!-- Search Box -->
        <div class="w-full max-w-md mt-6">
          <label class="relative flex items-center w-full h-14 bg-white dark:bg-card-dark rounded-xl shadow-xl overflow-hidden group focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <div class="pl-4 pr-2 text-text-secondary flex items-center justify-center">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input class="w-full h-full border-none bg-transparent text-text-main dark:text-white placeholder:text-text-secondary/70 focus:ring-0 text-base" placeholder="I am a citizen of..."/>
            <div class="pr-2">
              <button class="bg-primary hover:bg-primary/90 text-white rounded-lg h-10 px-4 text-sm font-bold transition-colors">
                Check
              </button>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
