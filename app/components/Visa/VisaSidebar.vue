<template>
  <div class="flex flex-col gap-6">
    <!-- Checklist Card -->
    <div class="bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 shadow-sm sticky top-24">
      <div class="p-6 border-b border-border-color dark:border-neutral-700 bg-background-light/50 dark:bg-white/5">
        <h3 class="font-bold text-lg text-text-main dark:text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">checklist</span>
          Document Checklist
        </h3>
        <p class="text-xs text-text-secondary dark:text-text-muted mt-1">
          For {{ nationality || 'all travelers' }}
        </p>
      </div>
      
      <div class="p-6 flex flex-col gap-4">
        <label
          v-for="(item, index) in checklistItems"
          :key="item"
          class="flex items-start gap-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            :checked="checkedItems.includes(item)"
            @change="toggleItem(item)"
            class="mt-1 rounded border-border-color dark:border-neutral-600 text-primary focus:ring-primary/20 cursor-pointer"
          />
          <span 
            class="text-sm transition-colors"
            :class="checkedItems.includes(item) ? 'text-text-muted line-through opacity-70' : 'text-text-secondary dark:text-gray-300 group-hover:text-text-main dark:group-hover:text-white'"
          >
            {{ item }}
          </span>
        </label>
      </div>
      
      <div class="p-2 border-t border-border-color dark:border-neutral-700 grid grid-cols-2 gap-2">
        <button 
          @click="copyChecklist"
          class="flex items-center justify-center gap-2 text-text-secondary dark:text-gray-400 font-bold text-xs py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors active:scale-95"
        >
          <span class="material-symbols-outlined text-[16px]">{{ copied ? 'check' : 'content_copy' }}</span>
          {{ copied ? 'Copied' : 'Copy List' }}
        </button>
        <button 
          @click="downloadPdf"
          class="flex items-center justify-center gap-2 text-primary font-bold text-xs py-2 hover:bg-primary/5 rounded-lg transition-colors active:scale-95"
        >
          <span class="material-symbols-outlined text-[16px]">picture_as_pdf</span>
          Save PDF
        </button>
      </div>
    </div>

    <!-- Trusted Actions -->
    <div class="bg-white dark:bg-card-dark rounded-xl border border-border-color dark:border-neutral-700 p-6 space-y-4">
      <h3 class="font-bold text-lg text-text-main dark:text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">verified_user</span>
        Trusted Actions
      </h3>

      <!-- Warning -->
      <div class="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg p-3 text-xs leading-relaxed text-amber-800 dark:text-amber-400">
        <strong>Official Only:</strong> Avoid third-party agents. Use only .gov.lk portals to ensure safety and standard fees.
      </div>

      <div class="grid gap-3">
        <a href="https://eta.gov.lk" target="_blank" class="flex items-center justify-between p-3.5 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/50 rounded-xl transition-all group">
          <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
               <span class="material-symbols-outlined text-[18px]">send</span>
             </div>
             <div class="flex flex-col">
               <span class="font-bold text-sm text-text-main dark:text-white">Apply for ETA</span>
               <span class="text-[10px] text-text-secondary dark:text-text-muted">Direct Official Portal</span>
             </div>
          </div>
          <span class="material-symbols-outlined text-text-secondary group-hover:text-primary">open_in_new</span>
        </a>

        <a href="https://eservices.immigration.gov.lk" target="_blank" class="flex items-center justify-between p-3.5 bg-background-light dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl transition-all group">
          <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 text-text-main dark:text-white flex items-center justify-center">
               <span class="material-symbols-outlined text-[18px]">calendar_clock</span>
             </div>
             <div class="flex flex-col">
               <span class="font-bold text-sm text-text-main dark:text-white">Online Extension</span>
               <span class="text-[10px] text-text-secondary dark:text-text-muted">Extend your stay</span>
             </div>
          </div>
          <span class="material-symbols-outlined text-text-secondary group-hover:text-text-main dark:group-hover:text-white">open_in_new</span>
        </a>
      </div>
      
      <!-- Internal Safety Cross-Links -->
      <div class="pt-4 border-t border-border-color dark:border-neutral-700">
        <p class="text-xs font-bold text-text-muted uppercase mb-3">Travel Safety</p>
        <div class="grid grid-cols-2 gap-3">
           <NuxtLink to="/safety-mode" class="flex flex-col items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl transition-colors text-center group">
             <span class="material-symbols-outlined text-red-500 text-xl group-hover:scale-110 transition-transform">health_and_safety</span>
             <span class="text-xs font-bold text-red-700 dark:text-red-400">Safety Mode</span>
           </NuxtLink>
           <NuxtLink to="/safety-mode#contacts" class="flex flex-col items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl transition-colors text-center group">
             <span class="material-symbols-outlined text-blue-500 text-xl group-hover:scale-110 transition-transform">phone_in_talk</span>
             <span class="text-xs font-bold text-blue-700 dark:text-blue-400">Emergency</span>
           </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import jsPDF from 'jspdf'

const props = defineProps<{
  requirements?: string[] | null
  nationality?: string
}>()

const checklistItems = computed(() => {
  return props.requirements && props.requirements.length
    ? props.requirements
    : [
        'Passport (valid for 6 months)',
        'Printed ETA Approval Notice',
        'Return / Onward Ticket',
        'Proof of Sufficient Funds',
        'Hotel Booking Confirmation',
        'Arrival Card (Filled)',
      ]
})

const checkedItems = ref<string[]>([])
const copied = ref(false)

// Load from local storage
onMounted(() => {
  const saved = localStorage.getItem('visa-checklist-state')
  if (saved) {
    try {
      checkedItems.value = JSON.parse(saved)
    } catch (e) { console.error('Error loading checklist state') }
  }
})

function toggleItem(item: string) {
  if (checkedItems.value.includes(item)) {
    checkedItems.value = checkedItems.value.filter(i => i !== item)
  } else {
    checkedItems.value.push(item)
  }
  localStorage.setItem('visa-checklist-state', JSON.stringify(checkedItems.value))
}

async function copyChecklist() {
  const text = `Sri Lanka Visa Checklist for ${props.nationality || 'Travelers'}:\n\n` + 
    checklistItems.value.map(item => {
      const mark = checkedItems.value.includes(item) ? '[x]' : '[ ]'
      return `${mark} ${item}`
    }).join('\n')
  
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch (err) {
    alert('Failed to copy checklist')
  }
}

function downloadPdf() {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(22)
  doc.setTextColor(238, 95, 43) // Brand Orange
  doc.text('Sri Lanka Visa Checklist', 20, 20)
  
  // Meta
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Generated for: ${props.nationality || 'General Traveler'}`, 20, 30)
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35)
  
  // Line
  doc.setDrawColor(200, 200, 200)
  doc.line(20, 40, 190, 40)
  
  // Items
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  let y = 55
  
  checklistItems.value.forEach(item => {
    const isChecked = checkedItems.value.includes(item)
    // Draw box
    doc.setDrawColor(0, 0, 0)
    if (isChecked) {
        doc.setFillColor(230, 230, 230)
        doc.rect(20, y - 4, 4, 4, 'FD')
        doc.text('x', 20.5, y - 0.5)
    } else {
        doc.rect(20, y - 4, 4, 4)
    }
    
    doc.text(item, 30, y)
    y += 10
  })
  
  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text('Generated by CeylonGuide - Official Travel Assistant', 20, 280)
  
  doc.save('sri-lanka-checklist.pdf')
}
</script>
