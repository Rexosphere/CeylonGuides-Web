<template>
  <div class="relative flex flex-col min-h-screen w-full overflow-x-hidden">
    <!-- Header is automatically included by default layout, but if we need a specific variant we might need to look at layout customization. 
         Assuming default layout for now as per plan. -->
    
    <DestinationHero />
    <DestinationFilters />
    <DestinationList />
    <DestinationCTA />

    <!-- Footer is automatically included by default layout -->
  </div>
</template>

<script setup lang="ts">
// Page metadata
useHead({
  title: 'CeylonGuide - Explore Destinations'
})
</script>
