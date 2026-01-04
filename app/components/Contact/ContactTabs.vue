<template>
  <div class="w-full max-w-[960px] bg-white dark:bg-[#2a1d18] rounded-xl shadow-xl shadow-black/5 p-2 mb-8 overflow-x-auto">
    <div class="flex md:grid md:grid-cols-4 min-w-max md:min-w-0">
      <button class="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20 transition-all font-bold text-sm whitespace-nowrap mx-1">
        <span class="material-symbols-outlined text-lg">help</span>
        General Inquiry
      </button>
      <button class="flex items-center justify-center gap-2 px-6 py-3 rounded-lg hover:bg-background-light dark:hover:bg-[#352620] text-[#896c61] dark:text-gray-400 font-bold text-sm transition-all whitespace-nowrap mx-1 group">
        <span class="material-symbols-outlined text-lg group-hover:text-primary transition-colors">warning</span>
        Report Issue
      </button>
      <button class="flex items-center justify-center gap-2 px-6 py-3 rounded-lg hover:bg-background-light dark:hover:bg-[#352620] text-[#896c61] dark:text-gray-400 font-bold text-sm transition-all whitespace-nowrap mx-1 group">
        <span class="material-symbols-outlined text-lg group-hover:text-primary transition-colors">thumb_up</span>
        Feedback
      </button>
      <button class="flex items-center justify-center gap-2 px-6 py-3 rounded-lg hover:bg-background-light dark:hover:bg-[#352620] text-[#896c61] dark:text-gray-400 font-bold text-sm transition-all whitespace-nowrap mx-1 group">
        <span class="material-symbols-outlined text-lg group-hover:text-primary transition-colors">handshake</span>
        Partnerships
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
