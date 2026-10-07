<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen text-text-main dark:text-gray-200 font-display transition-colors">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300" :style="{ width: `${progress}%` }"></div>
    
    <!-- Hero Section -->
    <div v-if="post" class="relative h-[65vh] min-h-[440px] w-full bg-neutral-900">
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-75"
        :style="{ backgroundImage: `url(${post.image})` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-black/40 to-black/60"></div>
      
      <!-- Back to Stories Nav Button -->
      <div class="absolute top-6 left-4 md:left-6 lg:left-20 z-20">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs font-bold transition-all border border-white/20 shadow-md"
        >
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to Stories</span>
        </NuxtLink>
      </div>

      <div class="absolute bottom-0 left-0 w-full px-4 md:px-6 lg:px-20 py-10 flex flex-col gap-4 max-w-5xl">
        <div class="flex flex-wrap items-center gap-3">
          <span class="px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded-full tracking-wider shadow-sm">
            {{ post.category }}
          </span>
          <span class="text-white/80 text-xs font-medium uppercase tracking-wider flex items-center gap-1">
             <span class="material-symbols-outlined text-[16px]">schedule</span> {{ post.readTime }}
          </span>
        </div>
        
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-sm">
          {{ post.title }}
        </h1>
        
        <div class="flex items-center gap-3 mt-1">
           <div class="size-10 rounded-full bg-white/10 backdrop-blur border border-white/20 p-0.5 overflow-hidden" v-if="post.author.avatar">
               <img :src="post.author.avatar" :alt="post.author.name" class="w-full h-full rounded-full object-cover">
           </div>
           <div class="flex flex-col text-white">
             <span class="text-sm font-semibold">{{ post.author.name }}</span>
             <span class="text-xs text-white/70">{{ post.date }}</span>
           </div>
        </div>
      </div>
    </div>
    
    <div v-else class="h-[50vh] flex items-center justify-center">
       <div class="text-xl font-serif">Loading story...</div>
    </div>

    <div v-if="post" class="container mx-auto px-4 md:px-6 lg:px-20 py-12 flex flex-col lg:flex-row gap-12 relative">
      
      <!-- Table of Contents (Desktop Sticky) -->
      <aside class="hidden lg:block w-64 flex-shrink-0">
         <div class="sticky top-28 bg-white dark:bg-card-dark p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
            <h4 class="font-bold text-xs uppercase tracking-wider text-primary mb-4 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">toc</span>
              In This Story
            </h4>
            <ul class="space-y-3 border-l-2 border-gray-100 dark:border-neutral-800 pl-3">
               <li v-for="heading in toc" :key="heading.id">
                 <a 
                   :href="`#${heading.id}`" 
                   class="text-xs hover:text-primary transition-colors block leading-relaxed"
                   :class="activeHeading === heading.id ? 'text-primary font-bold' : 'text-gray-600 dark:text-gray-400'"
                   @click.prevent="scrollToHeading(heading.id)"
                 >
                    {{ heading.text }}
                 </a>
               </li>
            </ul>
            
            <div class="mt-6 pt-6 border-t border-gray-100 dark:border-neutral-800">
               <div class="flex items-center gap-3">
                  <button 
                    @click="toggleSave(post.id)"
                    class="flex-1 h-10 flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-neutral-700 text-xs font-bold transition-all"
                    :class="isSaved(post.id) ? 'bg-primary/10 border-primary text-primary' : 'hover:bg-neutral-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'"
                  >
                    <span class="material-symbols-outlined text-[18px]" :class="isSaved(post.id) ? 'filled' : ''">
                      {{ isSaved(post.id) ? 'bookmark' : 'bookmark_add' }}
                    </span>
                    <span>{{ isSaved(post.id) ? 'Saved' : 'Save Story' }}</span>
                  </button>
               </div>
            </div>
         </div>
      </aside>

      <!-- Main Article Content -->
      <main class="flex-1 max-w-3xl">
         <div class="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-headings:text-charcoal dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-img:rounded-2xl prose-img:shadow-lg prose-a:text-primary">
            <div v-html="renderedContent"></div>
         </div>

         <!-- Mobile TOC & Bottom Actions -->
         <div class="lg:hidden mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800 flex justify-between items-center">
             <button 
                @click="toggleSave(post.id)"
                class="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-neutral-700 font-bold text-xs"
                :class="isSaved(post.id) ? 'bg-primary/10 border-primary text-primary' : 'text-charcoal dark:text-white'"
             >
                <span class="material-symbols-outlined text-[18px]" :class="isSaved(post.id) ? 'filled' : ''">
                  {{ isSaved(post.id) ? 'bookmark' : 'bookmark_add' }}
                </span>
                {{ isSaved(post.id) ? 'Saved in Reading List' : 'Save Story' }}
             </button>
             
             <NuxtLink 
               to="/"
               class="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary text-white font-bold text-xs hover:bg-primary/90"
             >
               <span>More Stories</span>
               <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
             </NuxtLink>
         </div>
      </main>

    </div>

    <!-- Related Stories -->
    <section v-if="relatedPosts.length > 0" class="bg-white/60 dark:bg-card-dark/40 border-t border-gray-200 dark:border-neutral-800 py-16 px-4 md:px-6 lg:px-20 mt-12">
       <div class="max-w-6xl mx-auto">
          <div class="flex items-center justify-between mb-8">
            <h2 class="font-serif text-2xl font-bold">More from {{ post?.category }}</h2>
            <NuxtLink to="/" class="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              Explore All <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
             <NuxtLink 
               v-for="rel in relatedPosts" 
               :key="rel.id" 
               :to="`/blog/${rel.id}`"
               class="group block bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all"
             >
                 <div class="h-44 overflow-hidden relative">
                    <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" :style="{ backgroundImage: `url(${rel.image})` }"></div>
                 </div>
                 <div class="p-5">
                    <span class="text-[11px] font-bold text-primary uppercase tracking-wider">{{ rel.category }}</span>
                    <h3 class="font-serif font-bold text-base leading-snug mt-1.5 mb-2 text-charcoal dark:text-white group-hover:text-primary transition-colors">
                      {{ rel.title }}
                    </h3>
                    <span class="text-xs text-gray-400 flex items-center gap-1">
                      <span class="material-symbols-outlined text-[13px]">schedule</span> {{ rel.readTime }}
                    </span>
                 </div>
             </NuxtLink>
          </div>
       </div>
    </section>
    
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
// @ts-ignore
import { marked } from 'marked'
import { useBlog } from '~/composables/useBlog'
import Toast from '~/components/UI/Toast.vue'

const route = useRoute()
const { posts, getRelatedPosts, toggleSave, isSaved } = useBlog()

const postId = computed(() => route.params.id as string)
const post = computed(() => posts.value.find(p => p.id === postId.value))

const relatedPosts = computed(() => {
  if (!post.value) return []
  return getRelatedPosts(post.value.id, post.value.category)
})

const renderedContent = ref('')
const toc = ref<{ id: string, text: string }[]>([])
const activeHeading = ref('')
const progress = ref(0)

const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    if (totalHeight > 0) {
        progress.value = Math.min(100, Math.max(0, (scrolled / totalHeight) * 100))
    }

    const headings = toc.value.map(t => document.getElementById(t.id)).filter(h => h) as HTMLElement[]
    for (const h of headings) {
        const rect = h.getBoundingClientRect()
        if (rect.top < 150) {
            activeHeading.value = h.id
        }
    }
}

const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
        window.scrollTo({
            top: el.offsetTop - 100,
            behavior: 'smooth'
        })
        activeHeading.value = id
    }
}

onMounted(async () => {
    if (post.value?.content) {
        renderedContent.value = await marked(post.value.content)
        
        setTimeout(() => {
            const contentDiv = document.querySelector('.prose')
            if (contentDiv) {
                const liveHeadings = contentDiv.querySelectorAll('h2, h3')
                toc.value = Array.from(liveHeadings).map((h, i) => {
                    const id = `heading-${i}`
                    h.id = id
                    return { id, text: h.textContent || '' }
                })
            }
        }, 100)
    }
    
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

useHead({
    title: computed(() => post.value ? `${post.value.title} - CeylonGuide` : 'Story Not Found'),
})
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
:deep(blockquote) {
    border-left-color: #ee5f2b;
    font-style: italic;
    background: rgba(238, 95, 43, 0.05);
    padding: 1rem 1.5rem;
    border-radius: 0 0.75rem 0.75rem 0;
}
</style>
