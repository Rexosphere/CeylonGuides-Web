<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('update:modelValue', false)"></div>
      
      <div class="relative w-full max-w-2xl bg-white dark:bg-card-dark rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col max-h-[85vh] overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6 flex-shrink-0">
          <div>
             <h2 class="text-2xl font-black text-text-main dark:text-white">Share Your Story</h2>
             <p class="text-sm text-text-secondary dark:text-gray-400">Join our community of travelers and inspire others.</p>
          </div>
          <button @click="$emit('update:modelValue', false)" class="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-full text-text-secondary transition-colors">
             <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Form Scroll Area -->
        <div class="overflow-y-auto custom-scrollbar flex-1 pr-2">
            <form @submit.prevent="submit" class="space-y-5">
                
                <!-- Title -->
                <div>
                   <label class="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400 mb-2">Title</label>
                   <input 
                     v-model="form.title" 
                     required
                     class="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors"
                     placeholder="e.g., Sunrise at Little Adam's Peak"
                   />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Category -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400 mb-2">Category</label>
                        <select 
                            v-model="form.category" 
                            class="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors appearance-none"
                        >
                            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                        </select>
                    </div>
                    
                    <!-- Cover Image URL -->
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400 mb-2">Cover Image URL (Optional)</label>
                        <input 
                          v-model="form.image"
                          class="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors"
                          placeholder="https://..."
                        />
                    </div>
                </div>

                <!-- Excerpt -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400 mb-2">Short Description</label>
                    <textarea 
                        v-model="form.excerpt"
                        required
                        class="w-full h-20 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors resize-none"
                        placeholder="Briefly describe your story..."
                    ></textarea>
                </div>

                <!-- Content -->
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400 mb-2">Story Content (Markdown Supported)</label>
                    <textarea 
                        v-model="form.content"
                        required
                        class="w-full h-48 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors resize-none font-mono text-sm"
                        placeholder="Write your story here... # Heading 1 ..."
                    ></textarea>
                </div>

                <!-- Author Name -->
                <div>
                   <label class="block text-xs font-bold uppercase tracking-wider text-text-secondary dark:text-gray-400 mb-2">Author Name</label>
                   <input 
                     v-model="form.authorName" 
                     required
                     class="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-neutral-50 dark:bg-black/20 focus:border-primary outline-none transition-colors"
                     placeholder="Your Name"
                   />
                </div>

            </form>
        </div>

        <!-- Footer -->
        <div class="pt-6 mt-2 border-t border-gray-100 dark:border-neutral-800 flex justify-end gap-3 flex-shrink-0">
             <button @click="$emit('update:modelValue', false)" class="px-6 py-2 rounded-lg font-bold text-text-secondary hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">Cancel</button>
             <button @click="submit" class="px-8 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Submit Story
             </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useBlog } from '~/composables/useBlog'
import { useToast } from '~/composables/useToast'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const { categories, addPost } = useBlog()
const { showToast } = useToast()

const form = reactive({
    title: '',
    category: 'Community',
    image: '',
    excerpt: '',
    content: '',
    authorName: ''
})

const submit = () => {
    // Basic validation
    if (!form.title || !form.content || !form.authorName) {
        showToast('Please fill in all required fields', 'info')
        return
    }

    addPost({
        title: form.title,
        category: form.category,
        image: form.image,
        excerpt: form.excerpt,
        content: form.content,
        author: { name: form.authorName, avatar: '', role: 'Community Contributor' },
        readTime: '3 min read' // Mock
    })

    showToast('Story submitted for review!', 'success')
    emit('update:modelValue', false)
    
    // Reset form
    form.title = ''
    form.category = 'Community'
    form.image = ''
    form.excerpt = ''
    form.content = ''
    form.authorName = ''
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
</style>
