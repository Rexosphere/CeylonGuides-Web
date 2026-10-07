<template>
  <section class="px-4 md:px-6 lg:px-10 py-8">
    <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(100px,auto)]">
      
      <article 
        v-for="(post, index) in posts" 
        :key="post.id"
        class="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-card-dark border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300"
        :class="{ 
          'md:row-span-2': index === 0,  /* First item large vertical */
          'md:col-span-2 md:flex-row': index === 3 /* 4th item wide horizontal */
        }"
      >
        <!-- QUOTE CARD TYPE -->
        <template v-if="post.type === 'quote'">
          <div class="h-full flex flex-col justify-between p-8 bg-[#221510] dark:bg-[#1a120e] text-white relative overflow-hidden">
             <!-- Save Action -->
             <button 
               @click.stop.prevent="toggleSave(post.id)"
               class="absolute top-4 right-4 z-20 size-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors text-white"
               :aria-label="isSaved(post.id) ? 'Remove bookmark' : 'Bookmark story'"
             >
               <span class="material-symbols-outlined text-[18px]" :class="isSaved(post.id) ? 'filled text-primary' : ''">
                 {{ isSaved(post.id) ? 'bookmark' : 'bookmark_add' }}
               </span>
             </button>

             <div class="absolute -right-10 -top-10 text-white/5 pointer-events-none">
               <span class="material-symbols-outlined text-[180px]">format_quote</span>
             </div>

             <div class="relative z-10 my-auto">
               <span class="text-xs uppercase tracking-widest text-primary font-bold mb-3 block">Traveler Journal</span>
               <h3 class="text-xl md:text-2xl font-serif italic leading-relaxed text-white/95">
                 {{ post.quote }}
               </h3>
             </div>

             <div class="mt-6 flex items-center gap-3 relative z-10 pt-4 border-t border-white/10">
               <div class="size-9 rounded-full border border-primary p-0.5 overflow-hidden" v-if="post.author.avatar">
                 <img :src="post.author.avatar" :alt="post.author.name" class="w-full h-full rounded-full object-cover">
               </div>
               <div class="flex flex-col">
                 <span class="text-sm font-semibold text-white">{{ post.author.name }}</span>
                 <span class="text-xs text-white/60">{{ post.author.role || 'Contributor' }}</span>
               </div>
             </div>
          </div>
        </template>

        <!-- STANDARD CARD TYPE -->
        <template v-else>
           <!-- Image Section -->
           <NuxtLink 
             :to="`/blog/${post.id}`"
             class="relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 block"
             :class="{
               'w-full h-[320px] lg:h-[420px]': index === 0,
               'w-full h-52': index !== 0 && index !== 3,
               'w-full md:w-1/2 h-64 md:h-auto': index === 3
             }"
           >
              <!-- Bookmark Action -->
              <button 
                @click.stop.prevent="toggleSave(post.id)"
                class="absolute top-3.5 right-3.5 z-20 size-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors text-white shadow-sm"
                :aria-label="isSaved(post.id) ? 'Remove bookmark' : 'Bookmark story'"
              >
                <span class="material-symbols-outlined text-[18px]" :class="isSaved(post.id) ? 'filled text-primary' : ''">
                  {{ isSaved(post.id) ? 'bookmark' : 'bookmark_add' }}
                </span>
              </button>

              <div 
                v-if="post.image"
                class="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" 
                :style="{ backgroundImage: `url(${post.image})` }"
              ></div>
              
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

              <div class="absolute top-3.5 left-3.5 z-10" v-if="index === 0">
                 <span class="px-2.5 py-1 bg-white/90 dark:bg-black/80 backdrop-blur text-[11px] font-bold uppercase tracking-wider rounded-md text-charcoal dark:text-white">
                   Featured
                 </span>
              </div>
           </NuxtLink>

           <!-- Content Section -->
           <div 
             class="flex flex-col gap-2.5 p-5 flex-1"
             :class="{
               'lg:p-6': index === 0,
               'w-full md:w-1/2 justify-center p-6 md:p-8': index === 3
             }"
           >
              <!-- Category & Read time -->
              <div class="flex items-center justify-between text-xs">
                 <span class="font-bold uppercase tracking-wider text-primary text-[11px]">
                   {{ post.category }}
                 </span>
                 <span class="text-gray-400 dark:text-gray-500 text-[11px] flex items-center gap-1">
                   <span class="material-symbols-outlined text-[13px]">schedule</span> {{ post.readTime }}
                 </span>
              </div>

              <!-- Title -->
              <NuxtLink :to="`/blog/${post.id}`" class="block group/title">
                <h3 
                  class="font-serif font-bold text-charcoal dark:text-white group-hover/title:text-primary transition-colors leading-snug"
                  :class="index === 0 || index === 3 ? 'text-2xl md:text-3xl' : 'text-lg'"
                >
                  {{ post.title }}
                </h3>
              </NuxtLink>

              <!-- Excerpt (concise, no walls of text) -->
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                {{ post.excerpt }}
              </p>

              <!-- Footer with author & CTA -->
              <div class="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
                 <div class="flex items-center gap-2">
                   <div class="size-6 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center text-primary text-xs">
                     <img v-if="post.author.avatar" :src="post.author.avatar" :alt="post.author.name" class="w-full h-full object-cover" />
                     <span v-else class="font-bold">{{ post.author.name.charAt(0) }}</span>
                   </div>
                   <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ post.author.name }}</span>
                 </div>

                 <NuxtLink 
                   :to="`/blog/${post.id}`" 
                   class="inline-flex items-center gap-1 text-primary font-bold text-xs hover:underline"
                 >
                   Read <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                 </NuxtLink>
              </div>
           </div>
        </template>
      </article>

    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20 bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-white/5 p-8">
      <span class="material-symbols-outlined text-gray-400 text-5xl mb-3">menu_book</span>
      <h3 class="text-xl font-bold text-charcoal dark:text-white mb-2">No stories found</h3>
      <p class="text-sm text-gray-500 max-w-sm mx-auto mb-6">No articles match your search criteria or filters.</p>
      <button 
        @click="resetFilters" 
        class="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary/90 transition-all shadow-md"
      >
        View All Stories
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

const { isSaved, toggleSave, resetFilters } = useBlog()
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
</style>
