<template>
  <div 
    :id="`card-${item.id}`"
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-light bg-white transition-all hover:cursor-pointer hover:shadow-lg dark:border-white/10 dark:bg-white/5"
    :class="{ 'ring-2 ring-primary': isSelected }"
    @click="$emit('view-details', item)"
  >
    <!-- Image -->
    <div class="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
      <img 
        :src="item.image" 
        :alt="item.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
      
      <!-- Icon/Tag Badge -->
      <div class="absolute left-3 top-3 flex gap-2">
        <span class="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md uppercase">
           {{ item.iconKey }}
        </span>
      </div>

      <!-- Price Badge -->
      <div class="absolute bottom-3 left-3">
         <span class="text-lg font-bold text-white shadow-sm">{{ item.priceRangeUSD }}</span>
      </div>

      <!-- Bookmark Btn -->
      <button 
        class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-rose-500"
        :class="{ 'bg-white text-rose-500': isBookmarked }"
        @click.stop="$emit('toggle-bookmark', item.id)"
      >
        <span class="material-symbols-outlined text-[18px]" :class="{ 'fill-current': isBookmarked }">favorite</span>
      </button>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-4">
      <h3 class="mb-1 text-lg font-bold text-neutral-dark dark:text-white">{{ item.title }}</h3>
      <p class="mb-3 line-clamp-2 text-xs text-neutral-gray">{{ item.shortTagline }}</p>

      <!-- Checklist preview -->
      <ul v-if="item.authenticityChecklist?.length" class="mb-3 space-y-1">
        <li v-for="(pt, i) in item.authenticityChecklist.slice(0, 2)" :key="i" class="flex items-start gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400">
           <span class="mt-0.5 material-symbols-outlined text-[10px] text-green-500">check</span>
           <span class="line-clamp-1">{{ pt }}</span>
        </li>
      </ul>

      <div class="mt-auto flex items-center justify-end">
        <button 
          class="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
          @click="$emit('view-details', item)"
        >
          View Guide
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CuratedFind } from '~/data/shopping.data'

defineProps<{
  item: CuratedFind
  isSelected: boolean
  isBookmarked: boolean
}>()

defineEmits<{
  (e: 'toggle-bookmark', id: string): void
  (e: 'view-details', item: CuratedFind): void
}>()
</script>
