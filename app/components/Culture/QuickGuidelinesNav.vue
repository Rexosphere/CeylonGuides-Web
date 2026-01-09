<template>
  <nav 
    class="sticky top-16 z-40 bg-white/95 dark:bg-[#1a120e]/95 backdrop-blur-sm border-b border-neutral-100 dark:border-[#3a2d28] -mx-4 px-4 lg:-mx-0 lg:px-0 lg:rounded-xl lg:border"
    aria-label="Quick navigation"
  >
    <div class="flex items-center gap-1 py-2 overflow-x-auto custom-scrollbar">
      <button
        v-for="item in navigationItems"
        :key="item.id"
        @click="handleClick(item.id)"
        class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        :class="[
          activeSection === item.id
            ? 'bg-primary text-white shadow-md'
            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-[#2a1d18] hover:text-neutral-900 dark:hover:text-white'
        ]"
        :aria-current="activeSection === item.id ? 'true' : undefined"
        :aria-label="`Navigate to ${item.title} section`"
      >
        <span class="material-symbols-outlined text-lg" aria-hidden="true">{{ item.icon }}</span>
        <span class="hidden sm:inline">{{ item.title }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSectionSpy } from '~/composables/useSectionSpy'
import type { SectionNavItem } from '~/types/culture'

// Props
interface Props {
  items?: SectionNavItem[]
}

const props = withDefaults(defineProps<Props>(), {
  items: () => []
})

// Default navigation items if none provided
const defaultItems: SectionNavItem[] = [
  { id: 'temple-etiquette', title: 'Temple Etiquette', icon: 'temple_buddhist' },
  { id: 'dress-code', title: 'Dress Code', icon: 'checkroom' },
  { id: 'greetings', title: 'Greetings', icon: 'waving_hand' },
  { id: 'social-etiquette', title: 'Social Customs', icon: 'groups' },
  { id: 'photography', title: 'Photography', icon: 'photo_camera' },
  { id: 'festivals', title: 'Festivals', icon: 'celebration' },
]

const navigationItems = computed(() => 
  props.items.length > 0 ? props.items : defaultItems
)

const sectionIds = computed(() => navigationItems.value.map(item => item.id))

// Use section spy composable
const { activeSection, scrollToSection } = useSectionSpy({
  sectionIds: sectionIds.value,
  offset: 120, // Account for sticky nav height
  updateHash: true,
})

function handleClick(sectionId: string) {
  scrollToSection(sectionId)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* Hide scrollbar on mobile for cleaner look */
@media (max-width: 640px) {
  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .custom-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
