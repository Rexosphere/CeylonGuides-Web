<template>
  <div>
    <HeroSection />
    <AlertBanner 
      alert-message="Heavy rain expected in Central Province. Landslide warnings issued for Kandy district."
      time-ago="2h ago"
      details-link="#"
    />
    <QuickActionsSection />
    <TravelSmartSection />
    <CTABand />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Your Trusted Virtual Tour Guide for Sri Lanka',
  meta: [
    { 
      name: 'description', 
      content: 'CeylonGuide - Your trusted virtual tour guide for Sri Lanka. Explore destinations, stay safe, communicate with locals, and experience the Pearl of the Indian Ocean with confidence.'
    }
  ]
})
</script>
