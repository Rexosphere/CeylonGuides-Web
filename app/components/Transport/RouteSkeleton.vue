<template>
  <div class="bg-white dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-white/5 shadow-sm mb-4">
    <!-- Header -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse"></div> <!-- Icon -->
        <div class="space-y-2">
          <div class="h-4 w-24 bg-slate-200 dark:bg-white/5 rounded animate-pulse"></div> <!-- Title -->
          <div class="h-3 w-16 bg-slate-100 dark:bg-white/5 rounded animate-pulse"></div> <!-- Subtitle -->
        </div>
      </div>
      <div class="h-6 w-20 bg-slate-200 dark:bg-white/5 rounded-full animate-pulse"></div> <!-- Badge -->
    </div>

    <!-- Content -->
    <div class="flex justify-between items-end">
      <div class="space-y-2">
         <div class="h-8 w-32 bg-slate-200 dark:bg-white/5 rounded animate-pulse"></div> <!-- Price -->
         <div class="h-3 w-40 bg-slate-100 dark:bg-white/5 rounded animate-pulse"></div> <!-- Distance/Time -->
      </div>
      <div class="h-8 w-24 bg-slate-200 dark:bg-white/5 rounded-lg animate-pulse"></div> <!-- Button shape -->
    </div>
  </div>
</template>
