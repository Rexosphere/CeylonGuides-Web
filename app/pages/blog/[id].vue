<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen text-text-main dark:text-gray-200 font-display transition-colors">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300" :style="{ width: `${progress}%` }"></div>
    
    <!-- Hero Section -->
    <div v-if="post" class="relative h-[60vh] min-h-[400px] w-full bg-neutral-900">
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-70"
        :style="{ backgroundImage: `url(${post.image})` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-black/30"></div>
      
      <div class="absolute bottom-0 left-0 w-full px-4 md:px-6 lg:px-20 py-12 flex flex-col gap-4 max-w-5xl">
        <div class="flex flex-wrap items-center gap-3">
          <span class="px-3 py-1 bg-primary text-white text-xs font-bold uppercase rounded-md tracking-wider">
            {{ post.category }}
          </span>
          <span class="text-white/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
             <span class="material-symbols-outlined text-[16px]">schedule</span> {{ post.readTime }}
          </span>
        </div>
        
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-sm">
          {{ post.title }}
        </h1>
        
        <div class="flex items-center gap-4 mt-2">
           <div class="size-10 rounded-full bg-white/10 backdrop-blur border border-white/20 p-0.5" v-if="post.author.avatar">
               <img :src="post.author.avatar" class="w-full h-full rounded-full object-cover">
           </div>
           <div class="flex flex-col text-white">
             <span class="text-sm font-bold">{{ post.author.name }}</span>
             <span class="text-xs text-white/70">{{ post.date }}</span>
           </div>
        </div>
      </div>
    </div>
    
    <div v-else class="h-[50vh] flex items-center justify-center">
       <div class="text-xl">Loading story...</div>
    </div>

    <div v-if="post" class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 relative">
      
      <!-- Table of Contents (Desktop Sticky) -->
      <aside class="hidden lg:block w-64 flex-shrink-0">
         <div class="sticky top-24">
            <h4 class="font-bold text-sm uppercase tracking-wider text-text-muted mb-4">Table of Contents</h4>
            <ul class="space-y-3 border-l-2 border-gray-100 dark:border-neutral-800 pl-4">
               <li v-for="heading in toc" :key="heading.id">
                 <a 
                   :href="`#${heading.id}`" 
                   class="text-sm hover:text-primary transition-colors block"
                   :class="activeHeading === heading.id ? 'text-primary font-bold' : 'text-text-secondary'"
                   @click.prevent="scrollToHeading(heading.id)"
                 >
                    {{ heading.text }}
                 </a>
               </li>
            </ul>
            
            <div class="mt-8 pt-6 border-t border-gray-100 dark:border-neutral-800">
               <div class="flex items-center gap-2">
                  <button 
                    @click="toggleSave(post.id)"
                    class="size-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
                    :class="isSaved(post.id) ? 'bg-primary/10 border-primary text-primary' : 'text-text-secondary'"
                  >
                    <span class="material-symbols-outlined text-[20px]" :class="isSaved(post.id) ? 'filled' : ''">
                      {{ isSaved(post.id) ? 'bookmark' : 'bookmark_add' }}
                    </span>
                  </button>
                  <button class="size-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-white/5 text-text-secondary transition-colors">
                     <span class="material-symbols-outlined text-[20px]">share</span>
                  </button>
               </div>
            </div>
         </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 max-w-3xl">
         <div class="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-text-main dark:prose-headings:text-white prose-p:text-text-secondary dark:prose-p:text-gray-300 prose-img:rounded-xl">
            <div v-html="renderedContent"></div>
         </div>

         <!-- Mobile TOC (Button + Modal/Dropdown could act here, simpler: just actions) -->
         <div class="lg:hidden mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800 flex justify-between items-center">
             <button 
                @click="toggleSave(post.id)"
                class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 font-bold text-sm"
                :class="isSaved(post.id) ? 'bg-primary/10 border-primary text-primary' : 'text-text-secondary'"
             >
                <span class="material-symbols-outlined text-[20px]" :class="isSaved(post.id) ? 'filled' : ''">
                  {{ isSaved(post.id) ? 'bookmark' : 'bookmark_add' }}
                </span>
                {{ isSaved(post.id) ? 'Saved' : 'Save Story' }}
             </button>
             <button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-text-secondary font-bold text-sm hover:bg-neutral-50 dark:hover:bg-white/5">
                <span class="material-symbols-outlined text-[20px]">share</span> Share
             </button>
         </div>
      </main>

    </div>

    <!-- Related Stories -->
    <section v-if="relatedPosts.length > 0" class="bg-neutral-50 dark:bg-background-dark border-t border-gray-200 dark:border-neutral-800 py-16 px-4 md:px-6 lg:px-20 mt-12">
       <div class="max-w-6xl mx-auto">
          <h2 class="text-2xl font-bold mb-8">Read Next</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
             <a 
               v-for="rel in relatedPosts" 
               :key="rel.id" 
               :href="`/blog/${rel.id}`"
               class="group block bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
             >
                 <div class="h-48 overflow-hidden">
                    <div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" :style="{ backgroundImage: `url(${rel.image})` }"></div>
                 </div>
                 <div class="p-5">
                    <span class="text-xs font-bold text-primary uppercase tracking-wider">{{ rel.category }}</span>
                    <h3 class="font-bold text-lg leading-snug mt-2 mb-2 group-hover:text-primary transition-colors">{{ rel.title }}</h3>
                    <span class="text-xs text-text-muted">{{ rel.readTime }}</span>
                 </div>
             </a>
          </div>
       </div>
    </section>
    
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
// @ts-ignore - marked types are available but import resolution issue
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

// Scroll Handling
const handleScroll = () => {
    // 1. Progress Bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    if (totalHeight > 0) {
        progress.value = Math.min(100, Math.max(0, (scrolled / totalHeight) * 100))
    }

    // 2. Active Heading
    // Simple heuristic: find last heading above center of screen
    const headings = toc.value.map(t => document.getElementById(t.id)).filter(h => h) as HTMLElement[]
    for (const h of headings) {
        const rect = h.getBoundingClientRect()
        if (rect.top < 150) { // 150px form top
            activeHeading.value = h.id
        }
    }
    
    // 3. Save Position (Debounced ideally, but simple check here)
    if (scrolled % 50 < 5 && import.meta.client) { // Only save occasionally
        localStorage.setItem(`blog-scroll-${postId.value}`, scrolled.toString())
    }
}

const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
        window.scrollTo({
            top: el.offsetTop - 100, // Offset for sticky header if exists, or breathing room
            behavior: 'smooth'
        })
        activeHeading.value = id
    }
}

onMounted(async () => {
    if (post.value?.content) {
        // Parse markdown
        renderedContent.value = await marked(post.value.content)
        
        // Generate TOC manually after render (nextTick)
        setTimeout(() => {
            const tempDiv = document.createElement('div')
            tempDiv.innerHTML = renderedContent.value
            
            const headings = tempDiv.querySelectorAll('h2, h3')
            toc.value = Array.from(headings).map((h, index) => {
               const id = `heading-${index}`
               h.id = id // Note: This doesn't apply to the v-html DOM unless we modify that string or do DOM manipulation on the actual elements
               return { id, text: h.textContent || '' }
            })

            // We need to inject IDs into the actual rendered HTML for anchor links to work
            // Let's do a simple string replacement for IDs in the markdown render if possible, 
            // or just modify DOM after mount. DOM mod is easier here.
            
            const contentDiv = document.querySelector('.prose')
            if (contentDiv) {
                const liveHeadings = contentDiv.querySelectorAll('h2, h3')
                liveHeadings.forEach((h, i) => {
                    h.id = `heading-${i}`
                })
            }
            
            // Restore Scroll Position
            if (import.meta.client) {
                const savedScroll = localStorage.getItem(`blog-scroll-${postId.value}`)
                if (savedScroll) {
                    window.scrollTo({
                        top: parseInt(savedScroll),
                        behavior: 'smooth'
                    })
                }
            }
        }, 100)
    }
    
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

useHead({
    title: post.value ? `${post.value.title} - CeylonWiki` : 'Story Not Found',
})
</script>

<style scoped>
.filled {
  font-variation-settings: 'FILL' 1;
}
/* Custom Prose Styles for consistency */
:deep(blockquote) {
    border-left-color: #FA5725; /* Primary */
    font-style: italic;
    background: rgba(250, 87, 37, 0.05);
    padding: 1rem;
    border-radius: 0 0.5rem 0.5rem 0;
}
</style>
