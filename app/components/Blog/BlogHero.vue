<template>
  <section v-if="post" class="px-4 md:px-6 lg:px-10 pt-4 pb-8">
    <div class="relative w-full rounded-3xl overflow-hidden h-[500px] md:h-[620px] group shadow-xl">
      <!-- Background Image -->
      <NuxtLink :to="`/blog/${post.id}`" class="absolute inset-0 block group/bg" aria-label="Read featured article">
        <div 
          class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105" 
          :style="{ backgroundImage: `url(${post.image})` }"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10"></div>
      </NuxtLink>
      
      <!-- Content Overlay -->
      <div class="absolute bottom-0 left-0 w-full p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col items-start gap-4 md:gap-5">
        <!-- Badges & Category -->
        <div class="flex flex-wrap items-center gap-3">
          <span class="inline-flex items-center px-3.5 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-sm">
            Editor's Choice
          </span>
          <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium tracking-wide border border-white/20">
            {{ post.category }}
          </span>
          <span class="text-white/80 text-xs font-medium flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">schedule</span> {{ post.readTime }}
          </span>
        </div>
        
        <!-- Headline -->
        <NuxtLink :to="`/blog/${post.id}`" class="block group/title">
          <h1 class="text-white font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl group-hover/title:text-accent-cyan transition-colors drop-shadow-sm">
            {{ post.title }}
          </h1>
        </NuxtLink>
        
        <!-- Excerpt -->
        <p class="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed line-clamp-2 md:line-clamp-3">
          {{ post.excerpt }}
        </p>
        
        <!-- Actions & Author -->
        <div class="flex flex-wrap items-center gap-4 mt-2 w-full justify-between">
          <div class="flex items-center gap-3">
            <NuxtLink 
              :to="`/blog/${post.id}`"
              class="flex items-center gap-2 rounded-full h-12 px-7 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/30"
            >
              Read Article <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </NuxtLink>
            
            <button 
              @click="toggleSave(post.id)"
              class="flex items-center gap-2 rounded-full h-12 px-5 backdrop-blur-md text-white border text-sm font-semibold tracking-wide transition-all hover:bg-white/20"
              :class="isSaved(post.id) ? 'bg-primary/40 border-primary text-white' : 'bg-white/10 border-white/30'"
            >
              <span class="material-symbols-outlined text-[18px]" :class="isSaved(post.id) ? 'filled text-primary' : ''">
                {{ isSaved(post.id) ? 'bookmark' : 'bookmark_add' }}
              </span> 
              <span>{{ isSaved(post.id) ? 'Saved' : 'Save' }}</span>
            </button>
          </div>

          <!-- Author info -->
          <div class="hidden sm:flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <div class="size-8 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center border border-white/20">
              <img v-if="post.author.avatar" :src="post.author.avatar" :alt="post.author.name" class="w-full h-full object-cover" />
              <span v-else class="material-symbols-outlined text-white text-base">person</span>
            </div>
            <div class="flex flex-col text-left">
              <span class="text-xs font-semibold text-white">{{ post.author.name }}</span>
              <span class="text-[10px] text-white/60">{{ post.author.role || 'Contributor' }}</span>
            </div>
          </div>
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
