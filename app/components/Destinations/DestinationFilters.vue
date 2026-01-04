<template>
  <div class="sticky top-[73px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-[#e6dedb] dark:border-[#3a2d28] w-full">
    <div class="px-6 md:px-20 lg:px-40 max-w-[1440px] mx-auto w-full">
      <div class="flex overflow-x-auto scrollbar-hide gap-8 md:gap-12">
        <a 
          v-for="(filter, index) in filters" 
          :key="index"
          href="#"
          class="group flex flex-col items-center justify-center border-b-[3px] transition-all pb-3 pt-4 cursor-pointer min-w-fit"
          :class="[
            activeFilter === filter.name 
              ? 'border-b-primary' 
              : 'border-b-transparent hover:border-b-[#e6dedb] dark:hover:border-b-[#3a2d28]'
          ]"
          @click.prevent="activeFilter = filter.name"
        >
          <p 
            class="text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
            :class="[
              activeFilter === filter.name 
                ? 'text-primary' 
                : 'text-[#8a6b60] group-hover:text-[#181311] dark:group-hover:text-white'
            ]"
          >
            {{ filter.label }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const filters = [
  { name: 'all', label: 'All Destinations' },
  { name: 'beaches', label: 'Beaches' },
  { name: 'mountains', label: 'Mountains' },
  { name: 'culture', label: 'Culture' },
  { name: 'wildlife', label: 'Wildlife' },
]

const activeFilter = ref('all')
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
