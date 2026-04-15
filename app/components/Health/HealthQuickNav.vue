<template>
  <div
    class="sticky top-0 z-40 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-sm">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav
        class="flex gap-8 overflow-x-auto no-scrollbar py-4 text-sm font-medium text-text-sub-light dark:text-text-sub-dark whitespace-nowrap">
        <a class="text-primary border-b-2 border-primary pb-1" href="#vaccinations">
          Vaccinations
        </a>
        <a class="hover:text-primary transition pb-1" href="#insurance">
          Insurance
        </a>
        <a class="hover:text-primary transition pb-1" href="#concerns">
          Common Concerns
        </a>
        <a class="hover:text-primary transition pb-1" href="#food">
          Food &amp; Water
        </a>
        <a class="hover:text-primary transition pb-1" href="#medical">
          Medical Directory
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
