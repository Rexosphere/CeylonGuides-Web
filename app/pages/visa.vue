<template>
  <div class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col group/design-root">
    
    <main class="flex h-full grow flex-col pb-20">
      <VisaHero />
      <VisaStats />
      
      <!-- Layout Grid -->
      <div class="max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <!-- Left Column (Main Content) -->
          <div class="lg:col-span-8 flex flex-col gap-12">
            <VisaProcess />
            <VisaRegulations />
            <VisaExtension />
          </div>
          
          <!-- Right Column (Sidebar) -->
          <div class="lg:col-span-4 h-full">
            <VisaSidebar />
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import VisaHero from '~/components/Visa/VisaHero.vue'
import VisaStats from '~/components/Visa/VisaStats.vue'
import VisaProcess from '~/components/Visa/VisaProcess.vue'
import VisaRegulations from '~/components/Visa/VisaRegulations.vue'
import VisaExtension from '~/components/Visa/VisaExtension.vue'
import VisaSidebar from '~/components/Visa/VisaSidebar.vue'

useHead({
  title: 'Visa & Entry Requirements - CeylonGuide',
  meta: [
    { name: 'description', content: 'Comprehensive guide to Sri Lanka Visa & Entry Requirements. ETA process, fees, validity, and document checklists.' }
  ]
})
</script>

<style scoped>
/* Override global theme for Visa page (Orange-Red Theme) */
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
  --color-text-main: #181311;
  /* Matching HTML: text-secondary/muted is #896c61 */
}
</style>
