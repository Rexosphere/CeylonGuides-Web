<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>
    
    <!-- Modal -->
    <div class="relative w-full max-w-2xl bg-white dark:bg-card-dark rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="p-6 border-b border-border-color dark:border-neutral-700 flex items-center justify-between sticky top-0 bg-white dark:bg-card-dark z-10">
        <div>
          <h2 class="text-xl font-bold text-text-main dark:text-white">Start a Discussion</h2>
          <p class="text-sm text-text-secondary dark:text-gray-400">Connect with the Ceylon community</p>
        </div>
        <button @click="close" class="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-full text-text-secondary transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Content (Scrollable) -->
      <div class="p-6 overflow-y-auto custom-scrollbar">
        <!-- Step 1: Template Selection -->
        <div v-if="!selectedTemplate" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            v-for="template in templates" 
            :key="template.id"
            @click="selectTemplate(template)"
            class="p-4 border border-border-color dark:border-neutral-700 rounded-xl hover:border-primary hover:bg-primary/5 text-left transition-all group"
          >
            <div class="w-10 h-10 rounded-full bg-background-light dark:bg-white/5 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined">{{ template.icon }}</span>
            </div>
            <h3 class="font-bold text-text-main dark:text-white mb-1">{{ template.title }}</h3>
            <p class="text-xs text-text-secondary dark:text-gray-400">{{ template.desc }}</p>
          </button>
        </div>

        <!-- Step 2: Editor -->
        <div v-else class="space-y-6">
           <button @click="selectedTemplate = null" class="flex items-center gap-1 text-xs text-text-secondary hover:text-text-main mb-4">
             <span class="material-symbols-outlined text-[16px]">arrow_back</span> Back to templates
           </button>

           <div class="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
             <span class="material-symbols-outlined text-primary">{{ selectedTemplate.icon }}</span>
             <span class="font-bold text-primary text-sm">{{ selectedTemplate.title }}</span>
           </div>

           <!-- Common Fields -->
          <div class="space-y-4">
             <div>
               <label class="block text-xs font-bold text-text-muted uppercase mb-1">Title</label>
               <input v-model="form.title" type="text" placeholder="Be descriptive..." class="w-full p-3 rounded-xl bg-background-light dark:bg-neutral-800 border-none focus:ring-2 focus:ring-primary/20 text-text-main dark:text-white placeholder-text-muted/50">
             </div>

             <!-- Buddy Specific Fields -->
             <div v-if="selectedTemplate.id === 'buddy'" class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-background-light dark:bg-neutral-800 rounded-xl">
                <div>
                   <label class="block text-xs font-bold text-text-muted uppercase mb-1">Location</label>
                   <input v-model="form.location" type="text" placeholder="e.g. Arugam Bay" class="w-full p-2 rounded-lg bg-white dark:bg-card-dark border border-transparent focus:border-primary outline-none">
                </div>
                <div>
                   <label class="block text-xs font-bold text-text-muted uppercase mb-1">Dates</label>
                   <input v-model="form.dates" type="text" placeholder="Jul 15 - Jul 20" class="w-full p-2 rounded-lg bg-white dark:bg-card-dark border border-transparent focus:border-primary outline-none">
                </div>
                 <div>
                   <label class="block text-xs font-bold text-text-muted uppercase mb-1">Activity</label>
                   <input v-model="form.activity" type="text" placeholder="Surfing, Hiking..." class="w-full p-2 rounded-lg bg-white dark:bg-card-dark border border-transparent focus:border-primary outline-none">
                </div>
                 <div>
                   <label class="block text-xs font-bold text-text-muted uppercase mb-1">Group Size</label>
                   <select v-model="form.groupSize" class="w-full p-2 rounded-lg bg-white dark:bg-card-dark border border-transparent focus:border-primary outline-none text-sm">
                      <option>2 People</option>
                      <option>3-4 People</option>
                      <option>5+ Group</option>
                   </select>
                </div>
                
                <div class="sm:col-span-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/10 p-2 rounded flex items-center gap-2">
                   <span class="material-symbols-outlined text-[16px]">security</span>
                   <strong>Safety Note:</strong> Always meet in public places first. Verify profiles.
                </div>
             </div>

             <div>
               <label class="block text-xs font-bold text-text-muted uppercase mb-1">Content</label>
               <textarea v-model="form.body" rows="6" placeholder="Share your details..." class="w-full p-3 rounded-xl bg-background-light dark:bg-neutral-800 border-none focus:ring-2 focus:ring-primary/20 text-text-main dark:text-white placeholder-text-muted/50 resize-none"></textarea>
             </div>

             <div>
                <label class="block text-xs font-bold text-text-muted uppercase mb-1">Tags (Comma separated)</label>
                <input v-model="form.tagsInput" type="text" placeholder="Tips, Ella, Food..." class="w-full p-3 rounded-xl bg-background-light dark:bg-neutral-800 border-none focus:ring-2 focus:ring-primary/20 text-text-main dark:text-white text-sm">
             </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-border-color dark:border-neutral-700 bg-background-light/50 dark:bg-white/5 flex justify-end gap-3 sticky bottom-0">
         <button @click="close" class="px-5 py-2.5 rounded-xl font-bold text-sm text-text-secondary hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors">Cancel</button>
         <button 
           v-if="selectedTemplate"
           @click="submitPost"
           :disabled="!form.title || !form.body"
           class="px-5 py-2.5 rounded-xl font-bold text-sm bg-primary text-white shadow-lg shadow-primary/30 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
         >
           Post Discussion
         </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useCommunity } from '~/composables/useCommunity'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const { addPost } = useCommunity()

const templates = [
  { id: 'qa', title: 'Ask a Question', icon: 'help', desc: 'Get advice from locals & travelers', type: 'qa' },
  { id: 'report', title: 'Trip Report', icon: 'article', desc: 'Share your experience & itinerary', type: 'report' },
  { id: 'buddy', title: 'Find a Buddy', icon: 'group_add', desc: 'Connect for shared activities', type: 'buddy' },
  { id: 'tip', title: 'Share a Tip', icon: 'lightbulb', desc: 'Help others with advice', type: 'guide' },
]

const selectedTemplate = ref<any>(null)

const form = reactive({
  title: '',
  body: '',
  tagsInput: '',
  location: '',
  dates: '',
  activity: '',
  groupSize: '2 People'
})

function selectTemplate(template: any) {
  selectedTemplate.value = template
  // Reset form
  form.title = ''
  form.body = ''
  form.tagsInput = ''
}

function submitPost() {
  const tags = form.tagsInput.split(',').map(t => t.trim()).filter(t => t)
  
  // Construct body for Buddy post to include details
  let bodyContent = form.body
  if (selectedTemplate.value.id === 'buddy') {
     bodyContent = `**Location:** ${form.location}\n**Dates:** ${form.dates}\n**Activity:** ${form.activity}\n**Group:** ${form.groupSize}\n\n${form.body}`
     tags.push('Travel Buddy', form.location)
  }

  addPost({
    type: selectedTemplate.value.type,
    title: form.title,
    excerpt: bodyContent, // Using excerpt for full body in this simple demo
    tags: tags
  })
  
  close()
}

function close() {
  selectedTemplate.value = null
  emit('close')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
</style>
