<template>
  <section class="relative bg-white dark:bg-card-dark overflow-hidden border-t border-gray-100 dark:border-white/5">
    <!-- Decorative Ambient Glow -->
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
    
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
      <div class="flex flex-col gap-4 max-w-xl text-center md:text-left z-10">
        <span class="text-xs uppercase font-bold tracking-widest text-primary">Contributors Welcome</span>
        <h2 class="text-3xl md:text-4xl font-serif font-bold tracking-tight text-charcoal dark:text-white">
          Have an island story to share?
        </h2>
        <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
          Contribute to CeylonGuide and publish your travel journals, photography series, and field notes with fellow slow travelers.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 mt-3 justify-center md:justify-start">
          <button 
            @click="isSubmissionModalOpen = true" 
            class="flex items-center justify-center gap-2 rounded-full h-12 px-7 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:scale-105"
          >
            <span class="material-symbols-outlined text-[18px]">edit_note</span> Share Your Story
          </button>
        </div>
      </div>
      
      <div class="relative w-full max-w-sm md:max-w-md aspect-[4/3] z-10">
        <div class="absolute inset-0 bg-primary/10 rounded-3xl rotate-3 scale-95 opacity-50"></div>
        <div 
          class="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center border border-white/20" 
          style='background-image: url("/images/downloaded_6cf5e18d1a6b.avif");'
        >
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <div class="text-white">
              <p class="font-serif italic text-base">"Writing slow journals by the Indian Ocean..."</p>
              <p class="text-xs text-white/70 mt-1">Photo from southern shores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useBlog } from '~/composables/useBlog'

const { isSubmissionModalOpen } = useBlog()
</script>
