<template>
  <div class="flex-1 bg-white dark:bg-[#2a1d18] rounded-2xl shadow-sm border border-[#e6dedb] dark:border-[#3a2d29] p-6 md:p-8">
    <h3 class="text-2xl font-bold text-[#181311] dark:text-white mb-6">{{ title }}</h3>
    
    <!-- Emergency Escalation Banner -->
    <Transition name="slide-fade">
      <div 
        v-if="isEmergencyTopic"
        class="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50"
      >
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800/30 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-amber-600 dark:text-amber-400">priority_high</span>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-amber-800 dark:text-amber-300 text-sm">Need Urgent Help?</h4>
            <p class="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              For immediate assistance, use Safety Mode or contact us on WhatsApp.
            </p>
            <div class="flex flex-wrap gap-2 mt-3">
              <a 
                href="/emergency?safetyMode=true"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors"
              >
                <span class="material-symbols-outlined text-sm">shield</span>
                Open Safety Mode
              </a>
              <a 
                :href="whatsappEmergencyLink"
                target="_blank"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-colors"
              >
                <span class="material-symbols-outlined text-sm">chat</span>
                WhatsApp Now
              </a>
            </div>
          </div>
          <button 
            class="p-1 rounded hover:bg-amber-200/50 dark:hover:bg-amber-800/30 text-amber-600 dark:text-amber-400 transition-colors"
            @click="dismissEmergencyBanner"
          >
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>
    </Transition>
    
    <form class="flex flex-col gap-6" @submit.prevent="handleSubmit" novalidate>
      <!-- Name & Email Row -->
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Name Field -->
        <label class="flex flex-col flex-1">
          <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">
            {{ fields.name.label }} <span class="text-primary">*</span>
          </span>
          <div class="relative">
            <input 
              v-model="formData.name"
              class="form-input w-full rounded-lg border bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-[#896c61]/70" 
              :class="getFieldClasses('name')"
              :placeholder="fields.name.placeholder" 
              type="text"
              @blur="touchField('name')"
            />
            <span 
              v-if="touched.name && !errors.name"
              class="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-green-500 text-lg"
            >check_circle</span>
            <span 
              v-if="touched.name && errors.name"
              class="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-red-500 text-lg"
            >error</span>
          </div>
          <p v-if="touched.name && errors.name" class="text-red-500 text-xs mt-1 flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">warning</span>
            {{ errors.name }}
          </p>
        </label>
        
        <!-- Email Field -->
        <label class="flex flex-col flex-1">
          <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">
            {{ fields.email.label }} <span class="text-primary">*</span>
          </span>
          <div class="relative">
            <input 
              v-model="formData.email"
              class="form-input w-full rounded-lg border bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-[#896c61]/70" 
              :class="getFieldClasses('email')"
              :placeholder="fields.email.placeholder" 
              type="email"
              @blur="touchField('email')"
            />
            <span 
              v-if="touched.email && !errors.email"
              class="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-green-500 text-lg"
            >check_circle</span>
            <span 
              v-if="touched.email && errors.email"
              class="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-red-500 text-lg"
            >error</span>
          </div>
          <p v-if="touched.email && errors.email" class="text-red-500 text-xs mt-1 flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">warning</span>
            {{ errors.email }}
          </p>
        </label>
      </div>
      
      <!-- Topic Dropdown -->
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
      
      <!-- Dynamic Extra Fields -->
      <TransitionGroup name="field-fade" tag="div" class="flex flex-col gap-6">
        <template v-for="field in extraFields" :key="field.id">
          <!-- Text Input -->
          <label v-if="field.type === 'text'" class="flex flex-col flex-1">
            <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2 flex items-center gap-2">
              <span v-if="field.icon" class="material-symbols-outlined text-primary text-sm">{{ field.icon }}</span>
              {{ field.label }}
              <span v-if="field.required" class="text-primary">*</span>
            </span>
            <input 
              v-model="formData.extraFields[field.id]"
              class="form-input w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-[#896c61]/70" 
              :placeholder="field.placeholder" 
              type="text"
              :required="field.required"
            />
          </label>
          
          <!-- Select Dropdown -->
          <label v-else-if="field.type === 'select'" class="flex flex-col flex-1">
            <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2 flex items-center gap-2">
              <span v-if="field.icon" class="material-symbols-outlined text-primary text-sm">{{ field.icon }}</span>
              {{ field.label }}
              <span v-if="field.required" class="text-primary">*</span>
            </span>
            <div class="relative">
              <select 
                v-model="formData.extraFields[field.id]"
                class="form-select w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow cursor-pointer"
                :required="field.required"
              >
                <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
          </label>
          
          <!-- Star Rating -->
          <div v-else-if="field.type === 'rating'" class="flex flex-col">
            <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2 flex items-center gap-2">
              <span v-if="field.icon" class="material-symbols-outlined text-primary text-sm">{{ field.icon }}</span>
              {{ field.label }}
            </span>
            <div class="flex gap-1">
              <button 
                v-for="star in 5" 
                :key="star"
                type="button"
                class="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                :class="(formData.extraFields[field.id] ?? 0) >= star 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-background-light dark:bg-[#221510] text-gray-400 hover:text-primary/70'"
                @click="formData.extraFields[field.id] = star"
              >
                <span class="material-symbols-outlined">
                  {{ (formData.extraFields[field.id] ?? 0) >= star ? 'star' : 'star_outline' }}
                </span>
              </button>
            </div>
          </div>
        </template>
      </TransitionGroup>
      
      <!-- Message Field -->
      <label class="flex flex-col flex-1">
        <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">
          {{ fields.message.label }} <span class="text-primary">*</span>
        </span>
        <div class="relative">
          <textarea 
            v-model="formData.message"
            class="form-textarea w-full rounded-lg border bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white min-h-[160px] p-4 focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-[#896c61]/70 resize-none" 
            :class="getFieldClasses('message')"
            :placeholder="messagePlaceholder || fields.message.placeholder"
            @blur="touchField('message')"
          ></textarea>
        </div>
        <div class="flex justify-between items-center mt-1">
          <div class="flex items-center gap-2">
            <p v-if="touched.message && errors.message" class="text-red-500 text-xs flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">warning</span>
              {{ errors.message }}
            </p>
            <span v-else class="text-xs text-gray-500">Tip: Include dates, locations, or booking reference</span>
            <!-- Draft saved indicator -->
            <Transition name="fade">
              <span v-if="draftSaved" class="text-xs text-green-600 dark:text-green-400 flex items-center gap-0.5">
                <span class="material-symbols-outlined text-xs">check_circle</span>
                Draft saved
              </span>
            </Transition>
          </div>
          <span 
            class="text-xs"
            :class="formData.message.length > 900 ? 'text-orange-500' : formData.message.length > 1000 ? 'text-red-500' : 'text-gray-500'"
          >{{ formData.message.length }}/1000</span>
        </div>
      </label>
      
      <!-- File Upload -->
      <div class="flex flex-col">
        <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-sm">attach_file</span>
          Attach File <span class="text-gray-400 font-normal">(optional)</span>
        </span>
        <div 
          class="relative border-2 border-dashed rounded-xl p-4 transition-all cursor-pointer"
          :class="isDragging 
            ? 'border-primary bg-primary/10' 
            : uploadedFile 
              ? 'border-green-400 bg-green-50 dark:bg-green-900/20' 
              : 'border-[#e6dedb] dark:border-[#4a3b36] hover:border-primary/50'"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="handleFileDrop"
          @click="triggerFileInput"
        >
          <input 
            ref="fileInput"
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            class="hidden"
            @change="handleFileSelect"
          />
          
          <div v-if="!uploadedFile" class="flex flex-col items-center gap-2 text-center">
            <span class="material-symbols-outlined text-3xl text-gray-400">cloud_upload</span>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <span class="text-primary font-bold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-400">PNG, JPG or PDF (max 5MB)</p>
          </div>
          
          <div v-else class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-800/30 flex items-center justify-center">
              <span class="material-symbols-outlined text-green-600 dark:text-green-400">
                {{ uploadedFile.type.includes('pdf') ? 'picture_as_pdf' : 'image' }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[#181311] dark:text-white truncate">{{ uploadedFile.name }}</p>
              <p class="text-xs text-gray-500">{{ formatFileSize(uploadedFile.size) }}</p>
            </div>
            <button 
              type="button"
              class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-colors"
              @click.stop="removeFile"
            >
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
        <p v-if="fileError" class="text-red-500 text-xs mt-1 flex items-center gap-1">
          <span class="material-symbols-outlined text-xs">warning</span>
          {{ fileError }}
        </p>
      </div>
      
      <!-- Submit Button -->
      <div class="pt-2">
        <button 
          class="w-full md:w-auto px-8 h-12 bg-primary hover:bg-[#d95223] text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
          type="submit"
          :disabled="isSubmitting || !isFormValid"
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
    
    <!-- Success Message with Ticket -->
    <Transition name="fade">
      <div v-if="showSuccess" class="mt-6 p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">check_circle</span>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-green-800 dark:text-green-300 text-lg">Message Sent Successfully!</h4>
            <p class="text-sm text-green-700 dark:text-green-400 mt-1">
              We typically respond within 2 hours during business hours (9am-6pm IST).
            </p>
            
            <!-- Ticket Reference -->
            <div class="mt-4 p-3 bg-white dark:bg-[#221510] rounded-lg border border-green-200 dark:border-green-700/50">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reference Number</p>
                  <p class="text-lg font-bold text-[#181311] dark:text-white font-mono">{{ ticketReference }}</p>
                </div>
                <button 
                  class="p-2 rounded-lg bg-gray-100 dark:bg-[#352620] hover:bg-gray-200 dark:hover:bg-[#4a3b36] transition-colors"
                  :class="ticketCopied ? 'text-green-500' : 'text-gray-500'"
                  @click="copyTicket"
                >
                  <span class="material-symbols-outlined text-sm">{{ ticketCopied ? 'check' : 'content_copy' }}</span>
                </button>
              </div>
            </div>
            
            <p class="text-xs text-green-600 dark:text-green-500 mt-3 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">mail</span>
              Confirmation sent to {{ submittedEmail }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

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

interface ExtraField {
  id: string
  type: string
  label: string
  placeholder?: string
  required?: boolean
  icon?: string
  options?: string[]
}

const props = defineProps<{
  title: string
  fields: Fields
  topics: string[]
  submitButtonText: string
  privacyNote?: string
  messagePlaceholder?: string
  extraFields?: ExtraField[]
  activeTab?: string
}>()

const formData = reactive({
  name: '',
  email: '',
  topic: '',
  message: '',
  extraFields: {} as Record<string, any>
})

const touched = reactive({
  name: false,
  email: false,
  message: false
})

const errors = computed(() => ({
  name: !formData.name.trim() ? 'Name is required' : formData.name.length < 2 ? 'Name is too short' : '',
  email: !formData.email.trim() ? 'Email is required' : !isValidEmail(formData.email) ? 'Please enter a valid email' : '',
  message: !formData.message.trim() ? 'Message is required' : formData.message.length < 10 ? 'Message must be at least 10 characters' : ''
}))

const isFormValid = computed(() => {
  return !errors.value.name && !errors.value.email && !errors.value.message && 
         formData.name && formData.email && formData.message
})

// Draft saving
const DRAFT_KEY = 'ceylonguide_contact_draft'
const draftSaved = ref(false)
const draftTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

// Auth for autofill
const { user, isAuthenticated } = useAuth()

// Autofill from logged-in user
onMounted(() => {
  // Load draft from localStorage
  if (import.meta.client) {
    const savedDraft = localStorage.getItem(DRAFT_KEY)
    if (savedDraft) {
      formData.message = savedDraft
    }
  }
  
  // Autofill name/email if logged in
  if (isAuthenticated.value && user.value) {
    if (user.value.name && !formData.name) {
      formData.name = user.value.name
    }
    if (user.value.email && !formData.email) {
      formData.email = user.value.email
    }
  }
})

// Watch for auth changes to autofill
watch([isAuthenticated, user], ([isAuth, userData]) => {
  if (isAuth && userData) {
    if (userData.name && !formData.name) {
      formData.name = userData.name
    }
    if (userData.email && !formData.email) {
      formData.email = userData.email
    }
  }
})

// Save draft with debounce (only message, not sensitive data)
watch(() => formData.message, (newMessage) => {
  if (!import.meta.client) return
  
  // Clear previous timeout
  if (draftTimeout.value) {
    clearTimeout(draftTimeout.value)
  }
  
  // Debounce save
  draftTimeout.value = setTimeout(() => {
    if (newMessage.trim()) {
      localStorage.setItem(DRAFT_KEY, newMessage)
      draftSaved.value = true
      // Hide indicator after 2 seconds
      setTimeout(() => {
        draftSaved.value = false
      }, 2000)
    } else {
      localStorage.removeItem(DRAFT_KEY)
    }
  }, 1000)
})

function clearDraft() {
  if (import.meta.client) {
    localStorage.removeItem(DRAFT_KEY)
  }
}

// Emergency topic detection
const emergencyKeywords = ['safety', 'emergency', 'scam', 'medical', 'urgent', 'danger', 'stranded', 'lost', 'help']
const emergencyBannerDismissed = ref(false)

const isEmergencyTopic = computed(() => {
  if (emergencyBannerDismissed.value) return false
  const topicLower = formData.topic.toLowerCase()
  return emergencyKeywords.some(keyword => topicLower.includes(keyword))
})

const whatsappEmergencyLink = computed(() => {
  const phone = '94771234567'
  const message = encodeURIComponent('URGENT: I need immediate assistance!')
  return `https://wa.me/${phone}?text=${message}`
})

function dismissEmergencyBanner() {
  emergencyBannerDismissed.value = true
}

const isSubmitting = ref(false)
const showSuccess = ref(false)
const ticketReference = ref('')
const ticketCopied = ref(false)
const submittedEmail = ref('')

// File upload
const fileInput = ref<HTMLInputElement | null>(null)
const uploadedFile = ref<File | null>(null)
const fileError = ref('')
const isDragging = ref(false)

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function touchField(field: 'name' | 'email' | 'message') {
  touched[field] = true
}

function getFieldClasses(field: 'name' | 'email' | 'message') {
  if (!touched[field]) return 'border-[#e6dedb] dark:border-[#4a3b36] focus:border-primary'
  if (errors.value[field]) return 'border-red-400 focus:border-red-500 focus:ring-red-500/50'
  return 'border-green-400 focus:border-green-500 focus:ring-green-500/50'
}

function generateTicketReference(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  return `CG-${year}-${random}`
}

function triggerFileInput() {
  fileInput.value?.click()
}

function validateFile(file: File): boolean {
  fileError.value = ''
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!validTypes.includes(file.type)) {
    fileError.value = 'Only PNG, JPG, and PDF files are allowed'
    return false
  }
  
  if (file.size > maxSize) {
    fileError.value = 'File size must be less than 5MB'
    return false
  }
  
  return true
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file && validateFile(file)) {
    uploadedFile.value = file
  }
}

function handleFileDrop(event: DragEvent) {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file && validateFile(file)) {
    uploadedFile.value = file
  }
}

function removeFile() {
  uploadedFile.value = null
  fileError.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

async function copyTicket() {
  try {
    await navigator.clipboard.writeText(ticketReference.value)
    ticketCopied.value = true
    setTimeout(() => {
      ticketCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Set default topic when topics change
watch(() => props.topics, (newTopics) => {
  if (newTopics && newTopics.length > 0) {
    formData.topic = newTopics[0] ?? ''
  }
}, { immediate: true })

// Reset extra fields when tab changes
watch(() => props.activeTab, () => {
  formData.extraFields = {}
  if (props.extraFields) {
    for (const field of props.extraFields) {
      if (field.type === 'select' && field.options && field.options.length > 0) {
        formData.extraFields[field.id] = field.options[0]
      }
    }
  }
}, { immediate: true })

// Also watch extraFields prop to set defaults
watch(() => props.extraFields, (newFields) => {
  if (newFields) {
    for (const field of newFields) {
      if (field.type === 'select' && field.options && field.options.length > 0 && !formData.extraFields[field.id]) {
        formData.extraFields[field.id] = field.options[0]
      }
    }
  }
}, { immediate: true })

async function handleSubmit() {
  // Touch all fields to show validation
  touched.name = true
  touched.email = true
  touched.message = true
  
  if (!isFormValid.value) return
  
  isSubmitting.value = true
  submittedEmail.value = formData.email
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Generate ticket reference
  ticketReference.value = generateTicketReference()
  
  // Show success message
  showSuccess.value = true
  isSubmitting.value = false
  
  // Reset form
  formData.name = ''
  formData.email = ''
  formData.message = ''
  formData.extraFields = {}
  uploadedFile.value = null
  touched.name = false
  touched.email = false
  touched.message = false
  
  // Clear saved draft
  clearDraft()
  
  if (props.topics.length > 0) {
    formData.topic = props.topics[0] ?? ''
  }
}
</script>

<style scoped>
.field-fade-enter-active,
.field-fade-leave-active {
  transition: all 0.3s ease;
}

.field-fade-enter-from,
.field-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
