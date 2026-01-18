<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <!-- Modal -->
        <div class="relative bg-white dark:bg-[#2a1d18] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
          <!-- Header -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-[#181311] dark:text-white">Become a Partner</h2>
              <button 
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                @click="close"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <!-- Progress Steps -->
            <div v-if="!isSuccess" class="flex items-center gap-2 mt-4">
              <div 
                v-for="(stepLabel, index) in steps" 
                :key="index"
                class="flex items-center"
              >
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  :class="index < step ? 'bg-green-500 text-white' : index === step ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'"
                >
                  <span v-if="index < step" class="material-symbols-outlined text-sm">check</span>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div 
                  v-if="index < steps.length - 1" 
                  class="w-8 h-0.5 mx-1"
                  :class="index < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'"
                ></div>
              </div>
              <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{ steps[step] }}</span>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6 overflow-y-auto max-h-[60vh]">
            <!-- Step 1: Partner Type -->
            <Transition name="slide" mode="out-in">
              <div v-if="step === 0" key="step1" class="space-y-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">What type of partner are you?</p>
                <div class="grid grid-cols-2 gap-3">
                  <button 
                    v-for="type in partnerTypes" 
                    :key="type.id"
                    class="p-4 rounded-xl border-2 text-left transition-all hover:border-primary/50"
                    :class="formData.partnerType === type.id ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-700'"
                    @click="formData.partnerType = type.id"
                  >
                    <span class="material-symbols-outlined text-2xl mb-2" :class="formData.partnerType === type.id ? 'text-primary' : 'text-gray-400'">{{ type.icon }}</span>
                    <p class="font-bold text-[#181311] dark:text-white text-sm">{{ type.label }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ type.desc }}</p>
                  </button>
                </div>
              </div>
              
              <!-- Step 2: Region & Services -->
              <div v-else-if="step === 1" key="step2" class="space-y-4">
                <label class="block">
                  <span class="text-sm font-bold text-[#181311] dark:text-gray-200">Region / Location</span>
                  <select 
                    v-model="formData.region"
                    class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4"
                  >
                    <option value="">Select region</option>
                    <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
                  </select>
                </label>
                
                <label class="block">
                  <span class="text-sm font-bold text-[#181311] dark:text-gray-200">Services Offered</span>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <button 
                      v-for="service in availableServices" 
                      :key="service"
                      type="button"
                      class="px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
                      :class="formData.services.includes(service) 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white dark:bg-[#221510] text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary'"
                      @click="toggleService(service)"
                    >
                      {{ service }}
                    </button>
                  </div>
                </label>
                
                <label class="block">
                  <span class="text-sm font-bold text-[#181311] dark:text-gray-200">Years of Experience</span>
                  <select 
                    v-model="formData.experience"
                    class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4"
                  >
                    <option value="">Select experience</option>
                    <option value="<1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </label>
              </div>
              
              <!-- Step 3: Contact Info -->
              <div v-else-if="step === 2" key="step3" class="space-y-4">
                <label class="block">
                  <span class="text-sm font-bold text-[#181311] dark:text-gray-200">Full Name <span class="text-primary">*</span></span>
                  <input 
                    v-model="formData.name"
                    type="text"
                    class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4"
                    placeholder="Your name"
                  />
                </label>
                
                <label class="block">
                  <span class="text-sm font-bold text-[#181311] dark:text-gray-200">Email <span class="text-primary">*</span></span>
                  <input 
                    v-model="formData.email"
                    type="email"
                    class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4"
                    placeholder="your@email.com"
                  />
                </label>
                
                <label class="block">
                  <span class="text-sm font-bold text-[#181311] dark:text-gray-200">Phone / WhatsApp</span>
                  <input 
                    v-model="formData.phone"
                    type="tel"
                    class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4"
                    placeholder="+94 XX XXX XXXX"
                  />
                </label>
                
                <label class="block">
                  <span class="text-sm font-bold text-[#181311] dark:text-gray-200">Website / Social Media</span>
                  <input 
                    v-model="formData.website"
                    type="text"
                    class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4"
                    placeholder="https:// or @username"
                  />
                </label>
              </div>
              
              <!-- Success -->
              <div v-else-if="isSuccess" key="success" class="text-center py-6">
                <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <span class="material-symbols-outlined text-green-500 text-3xl">check_circle</span>
                </div>
                <h3 class="text-xl font-bold text-[#181311] dark:text-white mb-2">Application Submitted!</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Thank you for your interest in partnering with CeylonWiki.
                </p>
                <div class="bg-gray-100 dark:bg-[#221510] rounded-xl p-4 mb-4">
                  <p class="text-sm text-gray-500 dark:text-gray-400">Expected Review Time</p>
                  <p class="text-2xl font-bold text-primary">48 hours</p>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  We'll send updates to <strong>{{ formData.email }}</strong>
                </p>
              </div>
            </Transition>
          </div>
          
          <!-- Footer -->
          <div v-if="!isSuccess" class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button 
              v-if="step > 0"
              class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold transition-colors"
              @click="step--"
            >
              Back
            </button>
            <div v-else></div>
            
            <button 
              class="px-6 py-2.5 bg-primary hover:bg-[#d95223] text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              :disabled="!canProceed"
              @click="nextStep"
            >
              <span v-if="step < 2">Continue</span>
              <span v-else-if="isSubmitting">Submitting...</span>
              <span v-else>Submit Application</span>
              <span v-if="!isSubmitting" class="material-symbols-outlined text-sm">{{ step < 2 ? 'arrow_forward' : 'send' }}</span>
              <span v-else class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            </button>
          </div>
          
          <!-- Close button for success -->
          <div v-else class="p-6 border-t border-gray-200 dark:border-gray-700">
            <button 
              class="w-full px-6 py-2.5 bg-primary hover:bg-[#d95223] text-white font-bold rounded-lg transition-all"
              @click="close"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const steps = ['Partner Type', 'Services', 'Contact']
const step = ref(0)
const isSubmitting = ref(false)
const isSuccess = ref(false)

const partnerTypes = [
  { id: 'guide', label: 'Tour Guide', icon: 'directions_walk', desc: 'Licensed guides' },
  { id: 'hotel', label: 'Hotel / B&B', icon: 'hotel', desc: 'Accommodation' },
  { id: 'driver', label: 'Driver', icon: 'directions_car', desc: 'Transportation' },
  { id: 'activity', label: 'Activity', icon: 'kayaking', desc: 'Experiences' }
]

const regions = [
  'Colombo & Western',
  'Kandy & Central',
  'Galle & South',
  'Sigiriya & Cultural Triangle',
  'Ella & Hill Country',
  'Jaffna & North',
  'Trincomalee & East',
  'Nationwide'
]

const servicesByType: Record<string, string[]> = {
  guide: ['Cultural Tours', 'Wildlife Safari', 'Trekking', 'City Walks', 'Food Tours', 'Photography'],
  hotel: ['Luxury', 'Boutique', 'Budget', 'Eco-friendly', 'Beach Resort', 'Mountain Retreat'],
  driver: ['Day Trips', 'Multi-day Tours', 'Airport Transfers', 'Luxury Vehicles', 'Minivans'],
  activity: ['Water Sports', 'Cooking Class', 'Yoga Retreat', 'Tea Plantation Tour', 'Whale Watching']
}

const formData = reactive({
  partnerType: '',
  region: '',
  services: [] as string[],
  experience: '',
  name: '',
  email: '',
  phone: '',
  website: ''
})

const availableServices = computed(() => {
  return servicesByType[formData.partnerType] || []
})

const canProceed = computed(() => {
  if (step.value === 0) return !!formData.partnerType
  if (step.value === 1) return !!formData.region && formData.services.length > 0
  if (step.value === 2) return !!formData.name && !!formData.email
  return true
})

function toggleService(service: string) {
  const idx = formData.services.indexOf(service)
  if (idx === -1) {
    formData.services.push(service)
  } else {
    formData.services.splice(idx, 1)
  }
}

async function nextStep() {
  if (step.value < 2) {
    step.value++
  } else {
    // Submit
    isSubmitting.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    isSubmitting.value = false
    isSuccess.value = true
  }
}

function close() {
  emit('close')
  // Reset after animation
  setTimeout(() => {
    step.value = 0
    isSuccess.value = false
    formData.partnerType = ''
    formData.region = ''
    formData.services = []
    formData.experience = ''
    formData.name = ''
    formData.email = ''
    formData.phone = ''
    formData.website = ''
  }, 300)
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .relative,
.modal-fade-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
