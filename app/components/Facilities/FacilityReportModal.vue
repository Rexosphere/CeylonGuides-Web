<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="show" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-md rounded-3xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-slate-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-800">
            <div>
              <h2 class="text-xl font-bold text-slate-800 dark:text-white">Update Status</h2>
              <p class="text-sm text-slate-500">{{ restroom.name }}</p>
            </div>
            <button 
              @click="$emit('close')"
              class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>

          <!-- Form or Success State -->
          <div v-if="submitted" class="p-8 text-center">
            <div class="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
            </div>
            <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Thank You!</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
              Your update helps the community find better facilities.
            </p>
            <button 
              @click="$emit('close')"
              class="w-full py-3 rounded-xl bg-primary text-dark-charcoal font-bold hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Already submitted warning -->
            <div v-if="alreadySubmitted" class="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-sm text-amber-700 dark:text-amber-300">
              You've already submitted a report for this location recently. You can update it again if things have changed.
            </div>

            <!-- Cleanliness Rating -->
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Cleanliness Rating
              </label>
              <div class="flex gap-2">
                <button 
                  v-for="star in 5" 
                  :key="star"
                  type="button"
                  @click="form.rating = star"
                  class="p-1 transition-transform hover:scale-110 focus:outline-none"
                >
                  <span 
                    class="material-symbols-outlined text-3xl transition-colors"
                    :class="star <= form.rating ? 'text-amber-500 fill-current' : 'text-slate-300 dark:text-gray-600'"
                  >
                    star
                  </span>
                </button>
              </div>
            </div>

            <!-- Fee Status -->
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Fee Status
              </label>
              <div class="flex gap-3 mb-3">
                <button
                  type="button"
                  @click="form.isFree = true"
                  :class="[
                    'flex-1 py-2 rounded-xl border-2 font-bold transition-all',
                    form.isFree 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                      : 'border-slate-200 dark:border-gray-700 text-slate-500 hover:border-emerald-200'
                  ]"
                >
                  Free
                </button>
                <button
                  type="button"
                  @click="form.isFree = false"
                  :class="[
                    'flex-1 py-2 rounded-xl border-2 font-bold transition-all',
                    !form.isFree 
                      ? 'border-amber-500 bg-amber-50 text-amber-700' 
                      : 'border-slate-200 dark:border-gray-700 text-slate-500 hover:border-amber-200'
                  ]"
                >
                  Paid
                </button>
              </div>
              
              <div v-if="!form.isFree">
                <label class="text-xs text-slate-500 mb-1 block">Amount (LKR)</label>
                <input 
                  v-model.number="form.amountLKR"
                  type="number" 
                  placeholder="e.g. 50"
                  class="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:outline-none"
                >
              </div>
            </div>

            <!-- Accessibiltiy -->
            <label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-gray-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors">
              <input 
                v-model="form.wheelchairAccessible"
                type="checkbox" 
                class="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
              >
              <span class="flex-1 font-medium text-slate-700 dark:text-slate-300">Wheelchair Accessible</span>
              <span class="material-symbols-outlined text-blue-500">accessible</span>
            </label>

            <!-- Note -->
            <div>
              <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Note (Optional)
              </label>
              <textarea 
                v-model="form.note"
                rows="3"
                placeholder="Any additional details? e.g. 'Very clean', 'No water', etc."
                class="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              ></textarea>
            </div>

            <!-- Submit -->
            <button 
              type="submit"
              :disabled="isSubmitting || form.rating === 0"
              class="w-full py-3 rounded-xl bg-primary text-dark-charcoal font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="isSubmitting" class="material-symbols-outlined animate-spin">sync</span>
              {{ isSubmitting ? 'Submitting...' : 'Submit Update' }}
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { Restroom } from '~/data/restrooms'

const props = defineProps<{
  show: boolean
  restroom: Restroom
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submitted', review: any): void
}>()

const isSubmitting = ref(false)
const submitted = ref(false)
const alreadySubmitted = ref(false)

const form = reactive({
  rating: 0,
  isFree: true,
  amountLKR: null as number | null,
  wheelchairAccessible: false,
  note: ''
})

// Initialize form from current restroom data
onMounted(() => {
  form.isFree = props.restroom.fees.isFree
  form.amountLKR = props.restroom.fees.amountLKR
  form.wheelchairAccessible = props.restroom.accessibility.wheelchairAccessible || false
  
  // Check local storage
  if (import.meta.client) {
    const key = `submitted_review_${props.restroom.id}`
    if (localStorage.getItem(key)) {
      alreadySubmitted.value = true
    }
  }
})

async function handleSubmit() {
  if (form.rating === 0) return
  isSubmitting.value = true

  const reviewData = {
    restroomId: props.restroom.id,
    ...form
  }

  try {
    const response = await $fetch('/api/reviews', {
      method: 'POST',
      body: reviewData
    })

    if (import.meta.client) {
      localStorage.setItem(`submitted_review_${props.restroom.id}`, 'true')
    }

    emit('submitted', response)
    submitted.value = true
  } catch (e) {
    console.error('Submission failed:', e)
    alert('Failed to submit review. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
/* Fill star icon */
.fill-current {
  font-variation-settings: 'FILL' 1;
}
</style>
