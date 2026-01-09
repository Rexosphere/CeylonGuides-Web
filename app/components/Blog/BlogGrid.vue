<template>
  <section class="px-4 md:px-6 lg:px-10 py-8">
    <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(100px,auto)]">
      
      <article 
        v-for="(post, index) in posts" 
        :key="post.id"
        class="group relative flex flex-col rounded-xl overflow-hidden bg-white dark:bg-card-dark shadow-sm hover:shadow-md transition-all"
        :class="{ 
          'md:row-span-2': index === 0,  /* First item large vertical */
          'md:col-span-2 md:flex-row': index === 4 /* 5th item wide horizontal */
        }"
      >
        <!-- QUOTE CARD TYPE -->
        <template v-if="post.type === 'quote'">
          <div class="h-full flex flex-col justify-between p-8 bg-[#221510] dark:bg-[#1a1a1a] text-white relative overflow-hidden">
             <!-- Save Action -->
             <button 
               @click.stop="toggleSave(post.id)"
               class="absolute top-4 right-4 z-20 size-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors text-white"
             >
               <span class="material-symbols-outlined text-[18px]" :class="isSaved(post.id) ? 'filled text-primary' : ''">favorite</span>
             </button>

             <div class="absolute -right-10 -top-10 text-white/5 opacity-20">
              <span class="material-symbols-outlined text-[200px]">format_quote</span>
            </div>
            <div class="relative z-10">
              <div class="flex gap-1 text-primary mb-4">
                <span v-for="n in 5" :key="n" class="material-symbols-outlined text-[20px] filled">star</span>
              </div>
              <h3 class="text-xl md:text-2xl font-serif italic leading-relaxed">
                {{ post.quote }}
              </h3>
            </div>
            <div class="mt-6 flex items-center gap-3">
              <div class="size-10 rounded-full border-2 border-primary p-0.5" v-if="post.author.avatar">
                <img :src="post.author.avatar" class="w-full h-full rounded-full object-cover">
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold">{{ post.author.name }}</span>
                <span class="text-xs text-white/60">{{ post.author.role }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- STANDARD CARD TYPE -->
        <template v-else>
           <!-- Image Section -->
           <div 
             class="relative overflow-hidden bg-neutral-200 dark:bg-neutral-800"
             :class="{
               'w-full h-[400px] lg:h-full': index === 0,
               'w-full h-48': index !== 0 && index !== 4,
               'w-full md:w-1/2 h-56 md:h-auto': index === 4
             }"
           >
              <!-- Save Action -->
              <button 
               @click.stop="toggleSave(post.id)"
               class="absolute top-4 right-4 z-20 size-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/30 transition-colors text-white shadow-sm"
              >
               <span class="material-symbols-outlined text-[18px]" :class="isSaved(post.id) ? 'filled text-primary' : ''">favorite</span>
              </button>


              <div 
                v-if="post.image"
                class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                :style="{ backgroundImage: `url(${post.image})` }"
              ></div>
              
              <!-- Placeholder Gradient -->
              <div 
                v-else
                class="absolute inset-0 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center"
                :class="getCategoryStyles(post.category).gradient"
              >
                 <div class="text-white/20">
                    <span class="material-symbols-outlined text-[64px]">{{ getCategoryStyles(post.category).icon }}</span>
                 </div>
                 <!-- Texture Overlay -->
                 <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              </div>

              <div class="absolute top-4 left-4 z-10" v-if="index === 0">
                 <span class="px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur text-xs font-bold uppercase tracking-wider rounded-md text-text-main dark:text-white">Must Read</span>
              </div>
           </div>

           <!-- Content Section -->
           <div 
             class="flex flex-col gap-3 p-5"
             :class="{
               'lg:p-6': index === 0,
               'w-full md:w-1/2 justify-center p-6 md:p-8': index === 4
             }"
           >
             <!-- Meta -->
             <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                {{ post.category }}
             </div>

             <!-- Title -->
             <h3 
               class="font-bold leading-tight group-hover:text-primary transition-colors"
               :class="index === 0 || index === 4 ? 'text-2xl' : 'text-lg leading-snug'"
             >
               {{ post.title }}
             </h3>

             <!-- Excerpt -->
             <p class="text-sm text-text-secondary dark:text-gray-300 line-clamp-2 md:line-clamp-3 leading-relaxed">
               {{ post.excerpt }}
             </p>

             <!-- Footer -->
             <div class="mt-auto flex items-center justify-between pt-2">
                <div class="flex items-center gap-2 text-xs text-text-muted">
                   <span class="material-symbols-outlined text-[14px]">schedule</span> {{ post.readTime }}
                </div>
                <button v-if="index === 4" class="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline">
                   Read Guide <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
             </div>
           </div>
        </template>
      </article>

    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <h3 class="text-xl font-bold text-text-main dark:text-white mb-2">No stories found</h3>
      <p class="text-text-secondary">Try selecting a different category.</p>
    </div>
    
    <div class="flex justify-center mt-12">
      <button class="px-6 py-3 border border-border-color dark:border-neutral-700 rounded-lg text-sm font-bold text-text-secondary dark:text-gray-300 hover:bg-background-light dark:hover:bg-white/5 transition-colors">
        Load More Stories
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlog'
import { useBlog } from '~/composables/useBlog'

defineProps<{
  posts: BlogPost[]
}>()

const { isSaved, toggleSave } = useBlog()

function getCategoryStyles(category: string) {
  const styles: Record<string, { gradient: string, icon: string }> = {
    'Hill Country': { gradient: 'bg-gradient-to-br from-emerald-600 to-teal-800', icon: 'landscape' },
    'Culture': { gradient: 'bg-gradient-to-br from-amber-600 to-orange-800', icon: 'temple_buddhist' },
    'Food & Drink': { gradient: 'bg-gradient-to-br from-red-600 to-rose-800', icon: 'restaurant' },
    'Community': { gradient: 'bg-gradient-to-br from-blue-600 to-indigo-800', icon: 'groups' },
    'Beaches': { gradient: 'bg-gradient-to-br from-cyan-500 to-blue-700', icon: 'beach_access' },
    'Wildlife': { gradient: 'bg-gradient-to-br from-lime-600 to-green-800', icon: 'pets' },
    'Wellness': { gradient: 'bg-gradient-to-br from-teal-400 to-emerald-600', icon: 'spa' }
  }
  
  return styles[category] || { gradient: 'bg-gradient-to-br from-gray-600 to-gray-800', icon: 'article' }
}
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
</style>
