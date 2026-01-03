<template>
  <div>
    <EmergencyHero />
    
    <div class="layout-container max-w-[960px] mx-auto px-5 lg:px-0 py-10 space-y-16">
      
      <EmergencyQuickActions />
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <EmergencyEmbassies />
        </div>
        <div class="lg:col-span-1">
          <EmergencyPhrases />
        </div>
      </div>

      <EmergencyMedical />

    </div>
  </div>
</template>

<script setup lang="ts">
import EmergencyHero from '~/components/EmergencyHero.vue'
import EmergencyQuickActions from '~/components/EmergencyQuickActions.vue'
import EmergencyEmbassies from '~/components/EmergencyEmbassies.vue'
import EmergencyPhrases from '~/components/EmergencyPhrases.vue'
import EmergencyMedical from '~/components/EmergencyMedical.vue'


useHead({
  title: 'Emergency Contacts - CeylonGuide',
  meta: [
    { name: 'description', content: 'Stay safe in Sri Lanka. Access immediate help, find consular services, and locate nearby medical facilities instantly.' }
  ]
})
</script>
