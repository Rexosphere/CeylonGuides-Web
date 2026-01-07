<template>
  <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-primary/20 rounded-lg text-primary">
          <span class="material-symbols-outlined text-2xl">{{ categoryIcon }}</span>
        </div>
        <div>
          <h3 class="font-bold text-lg text-charcoal">{{ categoryTitle }}</h3>
          <p class="text-sm text-gray-600">Cultural etiquette & tips</p>
        </div>
      </div>
    </div>

    <!-- Tips List -->
    <div class="divide-y divide-gray-200">
      <div
        v-for="(tip, index) in tips"
        :key="tip.id"
        class="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
        @click="toggleTip(index)"
      >
        <div class="flex items-start gap-4">
          <div class="shrink-0 mt-1">
            <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {{ index + 1 }}
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-3">
              <h4 class="font-bold text-charcoal text-base">{{ tip.title }}</h4>
              <button
                class="shrink-0 text-gray-400 hover:text-primary transition-colors"
                :class="{ 'rotate-180': expandedTips.includes(index) }"
              >
                <span class="material-symbols-outlined">expand_more</span>
              </button>
            </div>
            <p class="text-sm text-gray-600 mt-1 leading-relaxed">{{ tip.description }}</p>

            <!-- Expanded Details -->
            <div
              v-if="expandedTips.includes(index)"
              class="mt-4 space-y-4 animate-fade-in"
            >
              <!-- Do's -->
              <div v-if="tip.do_list && tip.do_list.length > 0" class="space-y-2">
                <div class="flex items-center gap-2 text-sm font-bold text-green-700">
                  <span class="material-symbols-outlined text-lg">check_circle</span>
                  <span>Do:</span>
                </div>
                <ul class="space-y-1 pl-7">
                  <li
                    v-for="(item, idx) in tip.do_list"
                    :key="idx"
                    class="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span class="text-green-500 mt-0.5">✓</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Don'ts -->
              <div v-if="tip.dont_list && tip.dont_list.length > 0" class="space-y-2">
                <div class="flex items-center gap-2 text-sm font-bold text-red-700">
                  <span class="material-symbols-outlined text-lg">cancel</span>
                  <span>Don't:</span>
                </div>
                <ul class="space-y-1 pl-7">
                  <li
                    v-for="(item, idx) in tip.dont_list"
                    :key="idx"
                    class="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span class="text-red-500 mt-0.5">✗</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="tips.length === 0" class="p-8 text-center">
      <div class="text-4xl mb-3">📚</div>
      <p class="text-gray-600 text-sm">No etiquette tips available for this category.</p>
    </div>

    <!-- Learn More CTA -->
    <div v-if="tips.length > 0" class="p-6 bg-gray-50 border-t border-gray-200">
      <NuxtLink
        to="/culture"
        class="block w-full py-3 text-center bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
      >
        Learn More About Sri Lankan Culture
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface EtiquetteTip {
  id: string
  category: string
  title: string
  description: string
  do_list?: string[]
  dont_list?: string[]
}

const props = defineProps<{
  tips: EtiquetteTip[]
  category?: string
}>()

const expandedTips = ref<number[]>([])

const categoryIcon = computed(() => {
  const category = props.category?.toUpperCase() || props.tips[0]?.category?.toUpperCase() || ''
  const iconMap: Record<string, string> = {
    'TEMPLE': 'temple_buddhist',
    'GREETING': 'handshake',
    'DINING': 'restaurant',
    'SOCIAL': 'groups',
    'TRANSPORT': 'directions_bus',
    'SHOPPING': 'shopping_bag'
  }
  return iconMap[category] || 'info'
})

const categoryTitle = computed(() => {
  const category = props.category || props.tips[0]?.category || 'Cultural'
  return `${category.charAt(0).toUpperCase()}${category.slice(1).toLowerCase()} Etiquette`
})

function toggleTip(index: number) {
  const pos = expandedTips.value.indexOf(index)
  if (pos > -1) {
    expandedTips.value.splice(pos, 1)
  } else {
    expandedTips.value.push(index)
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

button {
  transition: transform 0.3s ease;
}
</style>
