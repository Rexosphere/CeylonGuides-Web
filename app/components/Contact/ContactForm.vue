<template>
  <div class="flex-1 bg-white dark:bg-[#2a1d18] rounded-2xl shadow-sm border border-[#e6dedb] dark:border-[#3a2d29] p-6 md:p-8">
    <h3 class="text-2xl font-bold text-[#181311] dark:text-white mb-6">{{ title }}</h3>
    <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
      <div class="flex flex-col md:flex-row gap-6">
        <label class="flex flex-col flex-1">
          <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">
            {{ fields.name.label }} <span class="text-primary">*</span>
          </span>
          <input 
            v-model="formData.name"
            class="form-input w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-[#896c61]/70" 
            :placeholder="fields.name.placeholder" 
            type="text"
            required
          />
        </label>
        <label class="flex flex-col flex-1">
          <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">
            {{ fields.email.label }} <span class="text-primary">*</span>
          </span>
          <input 
            v-model="formData.email"
            class="form-input w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-[#896c61]/70" 
            :placeholder="fields.email.placeholder" 
            type="email"
            required
          />
        </label>
      </div>
      
      <div class="flex flex-col md:flex-row gap-6">
        <label class="flex flex-col flex-1">
          <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">{{ fields.topic.label }}</span>
          <div class="relative">
            <select 
              v-model="formData.topic"
              class="form-select w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow cursor-pointer"
            >
              <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
            </select>
          </div>
        </label>
      </div>
      
      <label class="flex flex-col flex-1">
        <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">
          {{ fields.message.label }} <span class="text-primary">*</span>
        </span>
        <textarea 
          v-model="formData.message"
          class="form-textarea w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white min-h-[160px] p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-[#896c61]/70 resize-none" 
          :placeholder="fields.message.placeholder"
          required
        ></textarea>
        <div class="flex justify-between mt-1">
          <span class="text-xs text-gray-500">Tip: Include dates, locations, or booking reference if applicable</span>
          <span class="text-xs text-gray-500">{{ formData.message.length }}/1000</span>
        </div>
      </label>
      
      <div class="pt-2">
        <button 
          class="w-full md:w-auto px-8 h-12 bg-primary hover:bg-[#d95223] text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
          type="submit"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Sending...</span>
          <span v-else>{{ submitButtonText }}</span>
          <span v-if="!isSubmitting" class="material-symbols-outlined text-sm">send</span>
          <span v-else class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
        </button>
      </div>
      
      <!-- Privacy Note -->
      <p v-if="privacyNote" class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">lock</span>
        {{ privacyNote }}
      </p>
    </form>
    
    <!-- Success Message -->
    <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
        <div>
          <h4 class="font-bold text-green-800 dark:text-green-300">Message Sent Successfully!</h4>
          <p class="text-sm text-green-700 dark:text-green-400 mt-1">We typically respond within 2 hours during business hours (9am-6pm IST).</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

interface FormField {
  label: string
  placeholder?: string
}

interface Fields {
  name: FormField
  email: FormField
  topic: FormField
  message: FormField
}

const props = defineProps<{
  title: string
  fields: Fields
  topics: string[]
  submitButtonText: string
  privacyNote?: string
}>()

const formData = reactive({
  name: '',
  email: '',
  topic: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

// Set default topic when topics change
watch(() => props.topics, (newTopics) => {
  if (newTopics && newTopics.length > 0) {
    formData.topic = newTopics[0] ?? ''
  }
}, { immediate: true })

async function handleSubmit() {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Show success message
  showSuccess.value = true
  isSubmitting.value = false
  
  // Reset form
  formData.name = ''
  formData.email = ''
  formData.message = ''
  if (props.topics.length > 0) {
    formData.topic = props.topics[0] ?? ''
  }
  
  // Hide success after 5 seconds
  setTimeout(() => {
    showSuccess.value = false
  }, 5000)
}
</script>
