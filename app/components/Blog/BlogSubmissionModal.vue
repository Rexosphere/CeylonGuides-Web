<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('update:modelValue', false)"></div>
      
      <div class="relative w-full max-w-2xl bg-white dark:bg-card-dark rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-hidden border border-gray-100 dark:border-white/10">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6 flex-shrink-0 border-b border-gray-100 dark:border-white/5 pb-4">
          <div>
             <span class="text-[11px] font-bold uppercase tracking-wider text-primary">CeylonGuide Dispatch</span>
             <h2 class="text-2xl font-serif font-bold text-charcoal dark:text-white mt-0.5">Share Your Travel Story</h2>
             <p class="text-xs text-gray-500 dark:text-gray-400">Publish your journal, photo essay, or island tips.</p>
          </div>
          <button @click="$emit('update:modelValue', false)" class="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-full text-gray-500 transition-colors">
             <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Form Scroll Area -->
        <div class="overflow-y-auto custom-scrollbar flex-1 pr-2">
            <form @submit.prevent="submit" class="space-y-4">
                
                <!-- Title -->
                <div>
                   <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Story Title</label>
                   <input 
                     v-model="form.title" 
                     required
                     class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors text-sm"
                     placeholder="e.g., Sunrise Above the Clouds in Haputale"
                   />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Category -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Category</label>
                        <select 
                            v-model="form.category" 
                            class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors text-sm"
                        >
                            <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                    </div>
                    
                    <!-- Cover Image URL -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Cover Image URL (Optional)</label>
                        <input 
                          v-model="form.image"
                          class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors text-sm"
                          placeholder="/images/destinations/ella.jpg"
                        />
                    </div>
                </div>

                <!-- Excerpt -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Short Excerpt (1-2 sentences)</label>
                    <textarea 
                        v-model="form.excerpt"
                        required
                        rows="2"
                        class="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors resize-none text-sm"
                        placeholder="A brief hook describing the journey..."
                    ></textarea>
                </div>

                <!-- Content -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Full Journal (Markdown supported)</label>
                    <textarea 
                        v-model="form.content"
                        required
                        rows="6"
                        class="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors resize-none font-mono text-xs leading-relaxed"
                        placeholder="## The Morning Train&#10;&#10;We departed early under mist..."
                    ></textarea>
                </div>

                <!-- Author Name -->
                <div>
                   <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Author Name</label>
                   <input 
                     v-model="form.authorName" 
                     required
                     class="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors text-sm"
                     placeholder="Your name or traveler handle"
                   />
                </div>

            </form>
        </div>

        <!-- Footer -->
        <div class="pt-4 mt-2 border-t border-gray-100 dark:border-neutral-800 flex justify-end gap-3 flex-shrink-0">
             <button @click="$emit('update:modelValue', false)" class="px-5 py-2 rounded-full font-bold text-xs text-gray-500 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">
               Cancel
             </button>
             <button @click="submit" class="px-6 py-2 rounded-full bg-primary text-white font-bold text-xs hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                Publish Story
             </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useBlog } from '~/composables/useBlog'
import { useToast } from '~/composables/useToast'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const { categories, addPost } = useBlog()
const { showToast } = useToast()

const availableCategories = computed(() => {
  return categories.value.filter(c => c !== 'All Stories')
})

const form = reactive({
    title: '',
    category: 'Hill Country',
    image: '',
    excerpt: '',
    content: '',
    authorName: ''
})

const submit = () => {
    if (!form.title || !form.content || !form.authorName) {
        showToast('Please fill in title, content, and author name', 'info')
        return
    }

    addPost({
        title: form.title,
        category: form.category,
        image: form.image || '/images/destinations/ella.jpg',
        excerpt: form.excerpt,
        content: form.content,
        author: { name: form.authorName, avatar: '', role: 'Traveler' },
        readTime: '4 min read'
    })

    showToast('Story published successfully!', 'success')
    emit('update:modelValue', false)
    
    // Reset form
    form.title = ''
    form.category = 'Hill Country'
    form.image = ''
    form.excerpt = ''
    form.content = ''
    form.authorName = ''
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.4);
  border-radius: 20px;
}
</style>
