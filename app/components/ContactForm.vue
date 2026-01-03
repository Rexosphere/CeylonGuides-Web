<template>
  <div class="flex-1 bg-white dark:bg-[#2a1d18] rounded-2xl shadow-sm border border-[#e6dedb] dark:border-[#3a2d29] p-6 md:p-8">
    <h3 class="text-2xl font-bold text-[#181311] dark:text-white mb-6">Send us a message</h3>
    <form class="flex flex-col gap-6">
      <div class="flex flex-col md:flex-row gap-6">
        <label class="flex flex-col flex-1">
          <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">Your Name</span>
          <input 
            class="form-input w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-[#896c61]/70" 
            placeholder="Ayubowan, what's your name?" 
            type="text"
          />
        </label>
        <label class="flex flex-col flex-1">
          <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">Email Address</span>
          <input 
            class="form-input w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-[#896c61]/70" 
            placeholder="Where can we reach you?" 
            type="email"
          />
        </label>
      </div>
      
      <div class="flex flex-col md:flex-row gap-6">
        <label class="flex flex-col flex-1">
          <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">Topic</span>
          <div class="relative">
            <select class="form-select w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white h-12 px-4 pr-10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow cursor-pointer">
              <option>General Inquiry</option>
              <option>Tour Booking Issue</option>
              <option>Payment Question</option>
              <option>Other</option>
            </select>
          </div>
        </label>
      </div>
      
      <label class="flex flex-col flex-1">
        <span class="text-[#181311] dark:text-gray-200 text-sm font-bold pb-2">Message</span>
        <textarea 
          class="form-textarea w-full rounded-lg border border-[#e6dedb] dark:border-[#4a3b36] bg-[#fcfbfb] dark:bg-[#221510] text-[#181311] dark:text-white min-h-[160px] p-4 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow placeholder:text-[#896c61]/70 resize-none" 
          placeholder="Tell us how we can help..."
        ></textarea>
      </label>
      
      <div class="pt-2">
        <button 
          class="w-full md:w-auto px-8 h-12 bg-primary hover:bg-[#d95223] text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2" 
          type="button"
        >
          <span>Send Message</span>
          <span class="material-symbols-outlined text-sm">send</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
</script>
