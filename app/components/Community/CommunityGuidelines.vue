<template>
  <div class="bg-background-light dark:bg-background-dark rounded-xl border border-border-color dark:border-neutral-700 p-5">
    <div class="flex items-start gap-3">
      <span class="material-symbols-outlined text-primary">verified_user</span>
      <div>
        <h3 class="font-bold text-sm text-text-main dark:text-white mb-1">Community Guidelines</h3>
        <p class="text-xs text-text-secondary dark:text-gray-400 leading-relaxed">
          CeylonWiki is a friendly space. Be respectful, share helpful tips, and keep promotional content to the designated areas. 
          <button @click="showModal = true" class="text-primary hover:underline font-bold">Read full rules</button>.
        </p>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
       <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showModal = false"></div>
          
          <div class="relative w-full max-w-lg bg-white dark:bg-card-dark rounded-2xl shadow-2xl p-6 flex flex-col max-h-[80vh] overflow-y-auto custom-scrollbar">
             <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-2">
                   <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span class="material-symbols-outlined text-primary">gavel</span>
                   </div>
                   <h2 class="text-xl font-bold text-text-main dark:text-white">Our Community Rules</h2>
                </div>
                <button @click="showModal = false" class="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-full text-text-secondary transition-colors">
                   <span class="material-symbols-outlined">close</span>
                </button>
             </div>

             <div class="space-y-6">
                <!-- Rule 1 -->
                <div class="flex gap-4">
                   <span class="font-bold text-lg text-primary">1.</span>
                   <div>
                      <h4 class="font-bold text-text-main dark:text-white mb-1">Be Respectful & Kind</h4>
                      <p class="text-sm text-text-secondary dark:text-gray-300">Treat all members with respect. No harassment, hate speech, or bullying. We are a diverse community of travelers and locals.</p>
                   </div>
                </div>
                
                 <!-- Rule 2 -->
                <div class="flex gap-4">
                   <span class="font-bold text-lg text-primary">2.</span>
                   <div>
                      <h4 class="font-bold text-text-main dark:text-white mb-1">No Spam or Scams</h4>
                      <p class="text-sm text-text-secondary dark:text-gray-300">Self-promotion is only allowed in designated areas. Do not spam discussions or sell services aggressively.</p>
                   </div>
                </div>

                 <!-- Rule 3 -->
                <div class="flex gap-4">
                   <span class="font-bold text-lg text-primary">3.</span>
                   <div>
                      <h4 class="font-bold text-text-main dark:text-white mb-1">Authentic Content Only</h4>
                      <p class="text-sm text-text-secondary dark:text-gray-300">Share your own photos and experiences. If using others' content, please credit them. No fake reviews.</p>
                   </div>
                </div>

                 <!-- Rule 4 -->
                <div class="flex gap-4">
                   <span class="font-bold text-lg text-primary">4.</span>
                   <div>
                      <h4 class="font-bold text-text-main dark:text-white mb-1">Safe Meetups</h4>
                      <p class="text-sm text-text-secondary dark:text-gray-300">When resolving "Find a Buddy" requests, meet in public places initially. Verify profiles via our badge system.</p>
                   </div>
                </div>

                <div class="border-t border-border-color dark:border-neutral-700 pt-4 mt-6">
                   <h4 class="font-bold text-sm text-text-main dark:text-white mb-2">Reporting Issues</h4>
                   <p class="text-sm text-text-secondary dark:text-gray-300">
                     If you see a violation, please click the <span class="material-symbols-outlined align-middle text-sm px-1">more_vert</span> menu on any post and select <strong>Report</strong>. Our team reviews all reports within 24 hours.
                   </p>
                </div>
             </div>
             
             <div class="mt-6 flex justify-end">
                <button @click="showModal = false" class="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
                   I Understand
                </button>
             </div>
          </div>
       </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
</style>
