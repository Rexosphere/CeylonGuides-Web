<template>
  <div class="bg-white dark:bg-[#2a1d18] rounded-xl border border-neutral-100 dark:border-[#3a2d28] overflow-hidden">
    <!-- Header -->
    <div class="p-4 border-b border-neutral-100 dark:border-[#3a2d28] flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary" aria-hidden="true">checklist</span>
        <h3 class="font-bold text-neutral-dark dark:text-white">Cultural Etiquette Checklist</h3>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-neutral-400">{{ completedCount }}/{{ totalCount }}</span>
        <button
          v-if="completedCount > 0"
          @click="resetChecklist"
          class="text-xs text-neutral-500 hover:text-red-500 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          aria-label="Reset checklist"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="h-1 bg-neutral-100 dark:bg-[#1a120e]">
      <div 
        class="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-300"
        :style="{ width: `${progressPercent}%` }"
      ></div>
    </div>

    <!-- Checklist Sections -->
    <div class="divide-y divide-neutral-100 dark:divide-[#3a2d28]">
      <!-- Temple Dress Code -->
      <div class="p-4">
        <button 
          @click="toggleSection('dress')"
          class="w-full flex items-center justify-between text-left"
        >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-purple-500" aria-hidden="true">checkroom</span>
            <span class="font-medium text-sm text-neutral-700 dark:text-neutral-300">Temple Dress Code</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
              {{ getSectionProgress('dress') }}
            </span>
          </div>
          <span class="material-symbols-outlined text-neutral-400 transition-transform" :class="{ 'rotate-180': expandedSections.has('dress') }">
            expand_more
          </span>
        </button>
        <Transition name="slide">
          <div v-if="expandedSections.has('dress')" class="mt-3 space-y-2 pl-7">
            <label 
              v-for="item in dressCodeItems" 
              :key="item.id"
              class="flex items-start gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                :checked="checkedItems.has(item.id)"
                @change="toggleItem(item.id)"
                class="mt-0.5 w-4 h-4 text-primary bg-neutral-100 border-neutral-300 rounded focus:ring-primary"
              />
              <span 
                class="text-sm transition-colors"
                :class="checkedItems.has(item.id) ? 'text-neutral-400 line-through' : 'text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white'"
              >
                {{ item.label }}
              </span>
            </label>
          </div>
        </Transition>
      </div>

      <!-- Photography Rules -->
      <div class="p-4">
        <button 
          @click="toggleSection('photo')"
          class="w-full flex items-center justify-between text-left"
        >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-red-500" aria-hidden="true">photo_camera</span>
            <span class="font-medium text-sm text-neutral-700 dark:text-neutral-300">Photography Rules</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
              {{ getSectionProgress('photo') }}
            </span>
          </div>
          <span class="material-symbols-outlined text-neutral-400 transition-transform" :class="{ 'rotate-180': expandedSections.has('photo') }">
            expand_more
          </span>
        </button>
        <Transition name="slide">
          <div v-if="expandedSections.has('photo')" class="mt-3 space-y-2 pl-7">
            <label 
              v-for="item in photoItems" 
              :key="item.id"
              class="flex items-start gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                :checked="checkedItems.has(item.id)"
                @change="toggleItem(item.id)"
                class="mt-0.5 w-4 h-4 text-primary bg-neutral-100 border-neutral-300 rounded focus:ring-primary"
              />
              <span 
                class="text-sm transition-colors"
                :class="checkedItems.has(item.id) ? 'text-neutral-400 line-through' : 'text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white'"
              >
                {{ item.label }}
              </span>
            </label>
          </div>
        </Transition>
      </div>

      <!-- Social Etiquette -->
      <div class="p-4">
        <button 
          @click="toggleSection('social')"
          class="w-full flex items-center justify-between text-left"
        >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-blue-500" aria-hidden="true">groups</span>
            <span class="font-medium text-sm text-neutral-700 dark:text-neutral-300">Social Do's & Don'ts</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
              {{ getSectionProgress('social') }}
            </span>
          </div>
          <span class="material-symbols-outlined text-neutral-400 transition-transform" :class="{ 'rotate-180': expandedSections.has('social') }">
            expand_more
          </span>
        </button>
        <Transition name="slide">
          <div v-if="expandedSections.has('social')" class="mt-3 space-y-2 pl-7">
            <label 
              v-for="item in socialItems" 
              :key="item.id"
              class="flex items-start gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                :checked="checkedItems.has(item.id)"
                @change="toggleItem(item.id)"
                class="mt-0.5 w-4 h-4 text-primary bg-neutral-100 border-neutral-300 rounded focus:ring-primary"
              />
              <span 
                class="text-sm transition-colors"
                :class="checkedItems.has(item.id) ? 'text-neutral-400 line-through' : 'text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white'"
              >
                {{ item.label }}
              </span>
            </label>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Helper Tip -->
    <div class="px-4 py-3 bg-neutral-50 dark:bg-[#1a120e] border-t border-neutral-100 dark:border-[#3a2d28]">
      <p class="text-xs text-neutral-500 flex items-center gap-1.5">
        <span class="material-symbols-outlined text-sm text-primary" aria-hidden="true">lightbulb</span>
        <span>Tip: Save this for your trip — your progress is saved automatically</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// ============================================================================
// Storage Configuration
// ============================================================================

const STORAGE_KEY = 'ceylonguide_culture_checklist'
const STORAGE_VERSION = 1

interface StorageData {
  version: number
  checkedIds: string[]
  timestamp: number
}

// ============================================================================
// Checklist Items (sourced from culturePageData)
// ============================================================================

interface ChecklistItem {
  id: string
  label: string
  section: 'dress' | 'photo' | 'social'
}

const allItems: ChecklistItem[] = [
  // Dress Code
  { id: 'dress-1', label: 'Cover shoulders and knees at temples', section: 'dress' },
  { id: 'dress-2', label: 'Bring a sarong or shawl', section: 'dress' },
  { id: 'dress-3', label: 'Remove shoes before entering shrines', section: 'dress' },
  { id: 'dress-4', label: 'No Buddha imagery on clothing', section: 'dress' },
  { id: 'dress-5', label: 'No leather items at Hindu temples', section: 'dress' },
  
  // Photography
  { id: 'photo-1', label: 'Never turn back to Buddha for photos', section: 'photo' },
  { id: 'photo-2', label: 'No selfies with Buddha statues', section: 'photo' },
  { id: 'photo-3', label: 'Ask permission before photographing monks', section: 'photo' },
  { id: 'photo-4', label: 'No flash on murals or frescoes', section: 'photo' },
  { id: 'photo-5', label: 'No drone photography at heritage sites', section: 'photo' },
  
  // Social
  { id: 'social-1', label: 'Use right hand for giving/receiving', section: 'social' },
  { id: 'social-2', label: 'Never touch anyone\'s head', section: 'social' },
  { id: 'social-3', label: 'Women should not touch monks', section: 'social' },
  { id: 'social-4', label: 'Avoid public displays of affection', section: 'social' },
  { id: 'social-5', label: 'Greet elders first with respect', section: 'social' },
  { id: 'social-6', label: 'Give up bus seats to Buddhist clergy', section: 'social' },
]

const dressCodeItems = computed(() => allItems.filter(i => i.section === 'dress'))
const photoItems = computed(() => allItems.filter(i => i.section === 'photo'))
const socialItems = computed(() => allItems.filter(i => i.section === 'social'))

// ============================================================================
// State
// ============================================================================

const checkedItems = ref(new Set<string>())
const expandedSections = ref(new Set<string>(['dress'])) // First section expanded by default

// ============================================================================
// Computed
// ============================================================================

const totalCount = computed(() => allItems.length)
const completedCount = computed(() => checkedItems.value.size)
const progressPercent = computed(() => 
  totalCount.value > 0 ? (completedCount.value / totalCount.value) * 100 : 0
)

function getSectionProgress(section: 'dress' | 'photo' | 'social'): string {
  const sectionItems = allItems.filter(i => i.section === section)
  const checkedCount = sectionItems.filter(i => checkedItems.value.has(i.id)).length
  return `${checkedCount}/${sectionItems.length}`
}

// ============================================================================
// Actions
// ============================================================================

function toggleItem(itemId: string) {
  if (checkedItems.value.has(itemId)) {
    checkedItems.value.delete(itemId)
  } else {
    checkedItems.value.add(itemId)
  }
  checkedItems.value = new Set(checkedItems.value) // Trigger reactivity
  saveToStorage()
}

function toggleSection(sectionId: string) {
  if (expandedSections.value.has(sectionId)) {
    expandedSections.value.delete(sectionId)
  } else {
    expandedSections.value.add(sectionId)
  }
  expandedSections.value = new Set(expandedSections.value) // Trigger reactivity
}

function resetChecklist() {
  if (confirm('Reset all checked items?')) {
    checkedItems.value = new Set()
    saveToStorage()
  }
}

// ============================================================================
// LocalStorage with Versioning
// ============================================================================

function saveToStorage() {
  if (typeof window === 'undefined') return
  
  const data: StorageData = {
    version: STORAGE_VERSION,
    checkedIds: Array.from(checkedItems.value),
    timestamp: Date.now()
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('Failed to save checklist to localStorage:', e)
  }
}

function loadFromStorage() {
  if (typeof window === 'undefined') return
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    
    const data: StorageData = JSON.parse(raw)
    
    // Version check - if schema changes, we can migrate or reset
    if (data.version !== STORAGE_VERSION) {
      console.log('Checklist storage version mismatch, resetting...')
      localStorage.removeItem(STORAGE_KEY)
      return
    }
    
    // Validate IDs still exist in current schema
    const validIds = new Set(allItems.map(i => i.id))
    const validCheckedIds = data.checkedIds.filter(id => validIds.has(id))
    
    checkedItems.value = new Set(validCheckedIds)
  } catch (e) {
    console.warn('Failed to load checklist from localStorage:', e)
    localStorage.removeItem(STORAGE_KEY)
  }
}

// ============================================================================
// Lifecycle
// ============================================================================

onMounted(() => {
  loadFromStorage()
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
