<template>
  <section class="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img alt="Sri Lanka Landscape" class="w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1YiC7YVXGt-xuGkViSLL7V1J6pGQ4HtWRQB80jgm6vCBH5nlpqcXbVdolhv_QkznZwBtRM6w0QdJmyi0ERRlSWtxDGEbASd9SxoYTENDXchan4g2yEoHbTuYa3G7YJ0qeTe69qqbuVXXnHl9hQjsMm4n4U5CQ38dFpRHqQZVaRyyDFQAnhJ73d4xTxlvcYiC961g5D-YxTxc0AFQzGXX2N5lhws0ZF1w5bLF-SGRi1HDKnwb0L28HL0Qdr4zstG9qBUJX__AffTg" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
      <div class="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
    </div>
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-20">
      <div
        class="inline-flex items-center gap-2 text-white/90 text-xs font-bold tracking-widest uppercase mb-4 border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
        <span>Photography Guide</span>
      </div>
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg tracking-tight">
        Capture Sri Lanka's Magic
      </h1>
      <p class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
        Discover 16 stunning locations with optimal lighting times, drone regulations, and insider tips for the perfect
        shot.
      </p>
      <div class="mt-8 max-w-xl mx-auto relative">
        <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          class="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-secondary text-gray-800 placeholder-gray-500 shadow-lg"
          placeholder="Search locations, tags..." type="text" />
        <span class="material-icons absolute left-4 top-3 text-gray-500">search</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
