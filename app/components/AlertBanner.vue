<template>
  <!-- Alert Banner -->
  <div class="relative z-20 -mt-8 mx-auto max-w-5xl px-4">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-8 border-accent overflow-hidden flex flex-col md:flex-row items-start md:items-center p-4 gap-4 animate-fade-in-up">
      <div class="flex items-center gap-3 shrink-0">
        <div class="bg-accent/10 p-2 rounded-full text-accent">
          <span class="material-symbols-outlined">warning</span>
        </div>
        <p class="font-bold text-primary dark:text-white uppercase tracking-wider text-sm">Current Alert</p>
      </div>
      <div class="h-px md:h-8 w-full md:w-px bg-gray-200 dark:bg-gray-700"></div>
      <div class="flex-1">
        <p class="text-charcoal dark:text-gray-300 font-medium text-sm md:text-base">
          {{ alertMessage }}
        </p>
        <p class="text-gray-500 dark:text-gray-400 text-xs mt-1">
          Updated {{ timeAgo }}
        </p>
      </div>
      <a 
        :href="detailsLink" 
        class="shrink-0 text-primary dark:text-accent-light text-sm font-bold flex items-center gap-1 hover:underline"
      >
        View Details <span class="material-symbols-outlined text-sm">open_in_new</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props for the alert banner component
interface Props {
  alertMessage?: string;
  timeAgo?: string;
  detailsLink?: string;
}

// Default values
const props = withDefaults(defineProps<Props>(), {
  alertMessage: 'Heavy rain expected in Central Province. Landslide warnings issued for Kandy district.',
  timeAgo: '2h ago',
  detailsLink: '#'
});
</script>

<style scoped>
/* Fade-in-up animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}
</style>
