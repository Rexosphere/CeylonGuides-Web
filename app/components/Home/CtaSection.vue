<template>
  <section class="py-24 relative overflow-hidden bg-primary">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
    <div class="absolute inset-0 opacity-10"
      style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div>

    <!-- Content -->
    <div class="container mx-auto px-6 relative z-10 text-center text-white">
      <h2 class="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
        Ready to experience the Pearl of the<br />Indian Ocean?
      </h2>
      <p class="text-lg text-white/80 mb-10 max-w-2xl mx-auto font-light">
        Join thousands of travelers who plan safer, smarter trips with CeylonGuide.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink to="/auth/register"
          class="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-full font-bold shadow-lg transition-colors">
          Create Free Account
        </NuxtLink>
        <NuxtLink to="/itineraries"
          class="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-bold transition-colors">
          View Sample Itineraries
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this static layout
</script>
