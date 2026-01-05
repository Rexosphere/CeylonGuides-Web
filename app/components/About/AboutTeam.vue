<template>
  <div class="w-full max-w-[960px] px-6 py-20">
    <div class="text-center mb-16">
      <h2 class="text-[#181311] dark:text-white text-3xl font-black mb-4">Meet the Explorers</h2>
      <p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
        The passionate individuals working behind the scenes to make your Sri Lankan adventure unforgettable.
      </p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <!-- Team Member 1 -->
      <div class="group flex flex-col items-center text-center">
        <div class="relative w-40 h-40 rounded-full mb-5 overflow-hidden border-4 border-white dark:border-[#3a2d28] shadow-lg">
          <img 
            alt="Portrait of Sarah Perera, Founder" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
            src="/images/downloaded_c96287e63ba5.avif"
          />
        </div>
        <h3 class="font-bold text-lg text-[#181311] dark:text-white group-hover:text-primary transition-colors">Sarah Perera</h3>
        <p class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mt-1">Founder & CEO</p>
        <p class="text-sm text-gray-600 dark:text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Former travel journalist with a passion for sustainable tourism.</p>
      </div>
      
      <!-- Team Member 2 -->
      <div class="group flex flex-col items-center text-center">
        <div class="relative w-40 h-40 rounded-full mb-5 overflow-hidden border-4 border-white dark:border-[#3a2d28] shadow-lg">
          <img 
            alt="Portrait of David Silva, Head of Tours" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
            src="/images/downloaded_11c3f1165e23.avif"
          />
        </div>
        <h3 class="font-bold text-lg text-[#181311] dark:text-white group-hover:text-primary transition-colors">David Silva</h3>
        <p class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mt-1">Head of Tours</p>
        <p class="text-sm text-gray-600 dark:text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Certified nature guide with 10 years in the field.</p>
      </div>
      
      <!-- Team Member 3 -->
      <div class="group flex flex-col items-center text-center">
        <div class="relative w-40 h-40 rounded-full mb-5 overflow-hidden border-4 border-white dark:border-[#3a2d28] shadow-lg">
          <img 
            alt="Portrait of Amara Jayasuriya, Content Lead" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
            src="/images/downloaded_3e653f77dfd9.avif"
          />
        </div>
        <h3 class="font-bold text-lg text-[#181311] dark:text-white group-hover:text-primary transition-colors">Amara Jayasuriya</h3>
        <p class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mt-1">Content Lead</p>
        <p class="text-sm text-gray-600 dark:text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Photographer capturing the hidden gems of the island.</p>
      </div>
      
      <!-- Team Member 4 -->
      <div class="group flex flex-col items-center text-center">
        <div class="relative w-40 h-40 rounded-full mb-5 overflow-hidden border-4 border-white dark:border-[#3a2d28] shadow-lg">
          <img 
            alt="Portrait of Rajith Fernando, Tech Lead" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
            src="/images/downloaded_571149fb59fb.avif"
          />
        </div>
        <h3 class="font-bold text-lg text-[#181311] dark:text-white group-hover:text-primary transition-colors">Rajith Fernando</h3>
        <p class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mt-1">Tech Lead</p>
        <p class="text-sm text-gray-600 dark:text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Building the digital bridge for seamless travel.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
