<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-charcoal dark:text-white">Emergency Phrases</h2>
      <span
        class="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-600">
        <span class="material-symbols-outlined text-[14px]">offline_bolt</span> Offline Available
      </span>
    </div>

    <div class="space-y-4">
      <!-- Help! -->
      <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-soft">
        <div class="flex items-center gap-3 mb-4">
          <span class="material-symbols-outlined text-primary text-xl">priority_high</span>
          <span class="font-bold text-charcoal dark:text-white">Help!</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div
            class="relative bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <p class="text-[10px] font-bold text-slate-400 uppercase mb-2">Sinhala</p>
            <p class="text-base font-medium mb-1 text-slate-800 dark:text-slate-100">උදවු!</p>
            <p class="text-[11px] text-slate-500 italic">"Udavā!"</p>
            <div class="absolute top-3 right-3 flex gap-2">
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">volume_up</span>
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">content_copy</span>
            </div>
          </div>
          <div
            class="relative bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <p class="text-[10px] font-bold text-slate-400 uppercase mb-2">Tamil</p>
            <p class="text-base font-medium mb-1 text-slate-800 dark:text-slate-100">உதவி!</p>
            <p class="text-[11px] text-slate-500 italic">"Utavi!"</p>
            <div class="absolute top-3 right-3 flex gap-2">
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">volume_up</span>
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">content_copy</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Where is the hospital? -->
      <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-soft">
        <div class="flex items-center gap-3 mb-4">
          <span class="material-symbols-outlined text-primary text-xl">medical_information</span>
          <span class="font-bold text-charcoal dark:text-white">Where is the hospital?</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div
            class="relative bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <p class="text-[10px] font-bold text-slate-400 uppercase mb-2">Sinhala</p>
            <p class="text-base font-medium mb-1 text-slate-800 dark:text-slate-100">රෝහල කොහේද?</p>
            <p class="text-[11px] text-slate-500 italic">"Rōhala kohēda?"</p>
            <div class="absolute top-3 right-3 flex gap-2">
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">volume_up</span>
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">content_copy</span>
            </div>
          </div>
          <div
            class="relative bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <p class="text-[10px] font-bold text-slate-400 uppercase mb-2">Tamil</p>
            <p class="text-base font-medium mb-1 text-slate-800 dark:text-slate-100">மருத்துவமனை எங்கே?</p>
            <p class="text-[11px] text-slate-500 italic">"Maruttuvamanai eṅkē?"</p>
            <div class="absolute top-3 right-3 flex gap-2">
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">volume_up</span>
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">content_copy</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Call an ambulance! -->
      <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-soft">
        <div class="flex items-center gap-3 mb-4">
          <span class="material-symbols-outlined text-primary text-xl">minor_crash</span>
          <span class="font-bold text-charcoal dark:text-white">Call an ambulance!</span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div
            class="relative bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <p class="text-[10px] font-bold text-slate-400 uppercase mb-2">Sinhala</p>
            <p class="text-sm font-medium mb-1 text-slate-800 dark:text-slate-100">ගිලන් රථයක් ගෙන්වන්න!</p>
            <div class="absolute top-3 right-3 flex gap-2">
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">volume_up</span>
            </div>
          </div>
          <div
            class="relative bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <p class="text-[10px] font-bold text-slate-400 uppercase mb-2">Tamil</p>
            <p class="text-sm font-medium mb-1 text-slate-800 dark:text-slate-100">ஆம்புலன்ஸ் அழையுங்கள்!</p>
            <div class="absolute top-3 right-3 flex gap-2">
              <span
                class="material-symbols-outlined text-primary/70 text-lg cursor-pointer hover:text-primary transition-colors">volume_up</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      class="w-full mt-6 py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 hover:border-primary/50 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold flex items-center justify-center gap-2">
      <span class="material-symbols-outlined">list_alt</span> View Full Phrasebook
    </button>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  highlightedIntent?: string | null
}>()
</script>

<style scoped>
.text-charcoal {
  color: #1e293b;
}

.shadow-soft {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>
