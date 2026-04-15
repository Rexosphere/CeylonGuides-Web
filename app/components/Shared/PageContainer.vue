<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const containerClass = computed(() => {
  const baseClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'
  return props.class ? `${baseClasses} ${props.class}` : baseClasses
})
</script>

<template>
  <!-- Reusable page container wrapping standardized max-w-7xl pattern -->
  <!-- Provides consistent layout across pages without repetition -->
  <div :class="containerClass">
    <slot />
  </div>
</template>

<!--
USAGE:

Basic usage:
  <PageContainer>
    <h1>Title</h1>
    <p>Content</p>
  </PageContainer>

With additional classes:
  <PageContainer class="py-12 flex flex-col gap-8">
    <h1>Title</h1>
    <p>Content</p>
  </PageContainer>

Replaces repetitive div pattern:
  <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
  
Standardizes: responsive padding (mobile 1rem, tablet 1.5rem, desktop 2rem),
max-width constraint (80rem desktop), mobile-first breakpoints.
-->
