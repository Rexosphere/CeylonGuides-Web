<template>
  <section v-if="post" class="px-4 md:px-6 lg:px-10 py-8">
    <div class="relative w-full rounded-2xl overflow-hidden h-[500px] md:h-[600px] group">
      <div 
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
        :style="{ backgroundImage: `url(${post.image})` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      <div class="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 flex flex-col items-start gap-4 md:gap-6">
        <span class="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider border border-white/30">
          Featured {{ post.category }} Story
        </span>
        
        <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight max-w-4xl drop-shadow-lg">
          {{ post.title }}
        </h1>
        
        <p class="text-white/90 text-base md:text-lg max-w-2xl font-light leading-relaxed line-clamp-3 drop-shadow-md">
          {{ post.excerpt }}
        </p>
        
        <div class="flex flex-wrap gap-4 mt-2">
          <button class="flex items-center gap-2 rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all hover:translate-x-1 shadow-md shadow-primary/30">
            Read Story <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button 
            @click="toggleSave(post.id)"
            class="flex items-center gap-2 rounded-lg h-12 px-6 backdrop-blur-md text-white border text-sm font-bold tracking-wide transition-colors shadow-md"
            :class="isSaved(post.id) ? 'bg-primary border-primary hover:bg-primary/90' : 'bg-white/10 border-white/30 hover:bg-white/20'"
          >
            <span class="material-symbols-outlined text-[18px]" :class="isSaved(post.id) ? 'filled' : ''">
              {{ isSaved(post.id) ? 'bookmark' : 'bookmark_add' }}
            </span> 
            {{ isSaved(post.id) ? 'Saved' : 'Save for Later' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlog'
import { useBlog } from '~/composables/useBlog'

defineProps<{
  post: BlogPost | undefined
}>()

const { toggleSave, isSaved } = useBlog()
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
</style>
