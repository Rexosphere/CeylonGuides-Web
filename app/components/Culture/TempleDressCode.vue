<template>
  <section id="dress-code" class="space-y-4">
    <!-- Two Column Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Appropriate Attire -->
      <div class="bg-white dark:bg-[#2a1d18] rounded-xl border-2 border-emerald-200 dark:border-emerald-800 overflow-hidden">
        <div class="px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-800">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400" aria-hidden="true">check_circle</span>
            <h4 class="font-bold text-emerald-700 dark:text-emerald-400">Appropriate Attire</h4>
          </div>
          <p class="text-xs text-emerald-600 dark:text-emerald-500 mt-1">Respectful dress for temples and sacred sites</p>
        </div>
        <ul class="p-4 space-y-2">
          <li 
            v-for="rule in appropriateRules" 
            :key="rule.id"
            class="flex items-start gap-2 text-sm"
          >
            <span class="material-symbols-outlined text-emerald-500 text-base mt-0.5 flex-shrink-0" aria-hidden="true">done</span>
            <div>
              <span class="text-neutral-700 dark:text-neutral-300">{{ rule.label }}</span>
              <p v-if="rule.description" class="text-xs text-neutral-500 mt-0.5">{{ rule.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Inappropriate Attire -->
      <div class="bg-white dark:bg-[#2a1d18] rounded-xl border-2 border-red-200 dark:border-red-800 overflow-hidden">
        <div class="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-red-600 dark:text-red-400" aria-hidden="true">cancel</span>
            <h4 class="font-bold text-red-700 dark:text-red-400">Inappropriate Attire</h4>
          </div>
          <p class="text-xs text-red-600 dark:text-red-500 mt-1">Avoid these to prevent being denied entry</p>
        </div>
        <ul class="p-4 space-y-2">
          <li 
            v-for="rule in inappropriateRules" 
            :key="rule.id"
            class="flex items-start gap-2 text-sm"
          >
            <span class="material-symbols-outlined text-red-500 text-base mt-0.5 flex-shrink-0" aria-hidden="true">close</span>
            <div>
              <span class="text-neutral-700 dark:text-neutral-300">{{ rule.label }}</span>
              <p v-if="rule.description" class="text-xs text-neutral-500 mt-0.5">{{ rule.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Quick Pack Tip -->
    <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
      <div class="flex items-start gap-3">
        <div class="p-2 bg-amber-100 dark:bg-amber-800/30 rounded-lg">
          <span class="material-symbols-outlined text-amber-600 dark:text-amber-400" aria-hidden="true">luggage</span>
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
            Quick Pack Tip
            <span class="text-[10px] px-1.5 py-0.5 bg-amber-200 dark:bg-amber-800 rounded-full">Essential</span>
          </h4>
          <p class="text-sm text-amber-700/80 dark:text-amber-400/80 mt-1">
            {{ packTip }}
          </p>
          <div class="flex flex-wrap gap-2 mt-2">
            <span class="inline-flex items-center gap-1 text-xs px-2 py-1 bg-white/50 dark:bg-black/20 rounded-full text-amber-700 dark:text-amber-400">
              <span class="material-symbols-outlined text-xs" aria-hidden="true">checkroom</span>
              Sarong
            </span>
            <span class="inline-flex items-center gap-1 text-xs px-2 py-1 bg-white/50 dark:bg-black/20 rounded-full text-amber-700 dark:text-amber-400">
              <span class="material-symbols-outlined text-xs" aria-hidden="true">dry_cleaning</span>
              Shawl
            </span>
            <span class="inline-flex items-center gap-1 text-xs px-2 py-1 bg-white/50 dark:bg-black/20 rounded-full text-amber-700 dark:text-amber-400">
              <span class="material-symbols-outlined text-xs" aria-hidden="true">sock</span>
              Socks
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Temple Entry Reminder -->
    <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
      <div class="flex items-start gap-3">
        <div class="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
          <span class="material-symbols-outlined text-purple-600 dark:text-purple-400" aria-hidden="true">temple_buddhist</span>
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-purple-700 dark:text-purple-400">Temple Entry Reminder</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div class="flex items-center gap-2 text-sm">
              <span class="w-8 h-8 flex items-center justify-center bg-white dark:bg-purple-800/30 rounded-lg">
                <span class="material-symbols-outlined text-purple-500" aria-hidden="true">do_not_step</span>
              </span>
              <div>
                <p class="font-medium text-purple-700 dark:text-purple-300">Remove Shoes</p>
                <p class="text-xs text-purple-600/70 dark:text-purple-400/70">Before entering shrines</p>
              </div>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="w-8 h-8 flex items-center justify-center bg-white dark:bg-purple-800/30 rounded-lg">
                <span class="material-symbols-outlined text-purple-500" aria-hidden="true">hiking</span>
              </span>
              <div>
                <p class="font-medium text-purple-700 dark:text-purple-300">Remove Hats</p>
                <p class="text-xs text-purple-600/70 dark:text-purple-400/70">Inside temple grounds</p>
              </div>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="w-8 h-8 flex items-center justify-center bg-white dark:bg-purple-800/30 rounded-lg">
                <span class="material-symbols-outlined text-purple-500" aria-hidden="true">sunny</span>
              </span>
              <div>
                <p class="font-medium text-purple-700 dark:text-purple-300">Hot Stone Tip</p>
                <p class="text-xs text-purple-600/70 dark:text-purple-400/70">Bring socks for hot ground</p>
              </div>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="w-8 h-8 flex items-center justify-center bg-white dark:bg-purple-800/30 rounded-lg">
                <span class="material-symbols-outlined text-purple-500" aria-hidden="true">lock</span>
              </span>
              <div>
                <p class="font-medium text-purple-700 dark:text-purple-300">Use Lockers</p>
                <p class="text-xs text-purple-600/70 dark:text-purple-400/70">Available at major temples</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dressCodeRules, getAllowedDressCode, getProhibitedDressCode } from '~/data/culturePageData'

// Get rules from culturePageData
const appropriateRules = computed(() => getAllowedDressCode())
const inappropriateRules = computed(() => getProhibitedDressCode())

// Pack tip derived from culture.md content
const packTip = computed(() => {
  // Check if sarong/shawl mentioned in rules
  const hasSarongMention = dressCodeRules.some(r => 
    r.description?.toLowerCase().includes('sarong') || 
    r.description?.toLowerCase().includes('shawl')
  )
  
  return hasSarongMention
    ? 'Carry a lightweight sarong or shawl in your bag — many temples require covered shoulders and knees, and you can borrow one at entrances for a small fee.'
    : 'Dress modestly when visiting temples. Lightweight, breathable fabrics that cover shoulders and knees are ideal for Sri Lanka\'s tropical climate.'
})
</script>
