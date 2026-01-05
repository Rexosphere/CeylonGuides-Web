<template>
  <div class="bg-background-light dark:bg-background-dark text-[#181311] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden">
    
    <ContactHero />
    
    <main class="flex-grow">
      <div class="layout-container flex flex-col items-center px-4 sm:px-10 lg:px-40 -mt-16 relative z-20 pb-20">
        <ContactTabs />
        
        <div class="flex flex-col lg:flex-row gap-8 w-full max-w-[1100px]">
          <ContactForm />
          <ContactSidebar />
        </div>
      </div>
    </main>
    
  </div>
</template>

<script setup lang="ts">
import ContactHero from '~/components/Contact/ContactHero.vue'
import ContactTabs from '~/components/Contact/ContactTabs.vue'
import ContactForm from '~/components/Contact/ContactForm.vue'
import ContactSidebar from '~/components/Contact/ContactSidebar.vue'

useHead({
  title: 'Contact & Support - CeylonGuide',
  meta: [
    { name: 'description', content: 'Get in touch with CeylonGuide for support, inquiries, feedback, or partnership opportunities. We are here to help you explore Sri Lanka.' }
  ]
})
</script>

<style scoped>
.group\/design-root {
  --color-primary: #ee5f2b;
  --color-bg-light: #f8f6f6;
  --color-bg-dark: #221510;
}
</style>
