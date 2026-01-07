<template>
  <section class="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img alt="Hero Background" class="w-full h-full object-cover"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1YiC7YVXGt-xuGkViSLL7V1J6pGQ4HtWRQB80jgm6vCBH5nlpqcXbVdolhv_QkznZwBtRM6w0QdJmyi0ERRlSWtxDGEbASd9SxoYTENDXchan4g2yEoHbTuYa3G7YJ0qeTe69qqbuVXXnHl9hQjsMm4n4U5CQ38dFpRHqQZVaRyyDFQAnhJ73d4xTxlvcYiC961g5D-YxTxc0AFQzGXX2N5lhws0ZF1w5bLF-SGRi1HDKnwb0L28HL0Qdr4zstG9qBUJX__AffTg" />
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
    </div>
    <div class="container mx-auto px-6 relative z-10 text-center pt-20">
      <span class="text-white/90 text-sm font-bold tracking-widest uppercase mb-4 block">The Wonder of Asia</span>
      <h1
        class="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg leading-tight max-w-4xl mx-auto">
        Curated Adventures in the Pearl of the Indian Ocean
      </h1>
      <p class="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
        From the misty peaks of Ella to the golden shores of Mirissa, discover authentic experiences that move you.
      </p>
      <div class="max-w-xl mx-auto bg-white rounded-full p-2 flex items-center shadow-lg">
        <span class="material-icons text-gray-400 ml-3">search</span>
        <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          class="w-full border-none focus:ring-0 text-sm text-gray-700 bg-transparent placeholder-gray-400"
          placeholder="Search hiking, surfing, safari..." type="text" />
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
