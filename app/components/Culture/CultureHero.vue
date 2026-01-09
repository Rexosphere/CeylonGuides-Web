<template>
  <header class="hero-pattern text-white pb-24 pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div class="max-w-2xl">
          <h1 class="text-3xl md:text-4xl font-bold mb-4">Sri Lanka Cultural Etiquette</h1>
          <p class="text-white/80 text-lg mb-6">
            Navigate local customs with confidence. Sri Lanka is a land of ancient traditions;
            understanding them will enrich your experience and show respect for the culture.
          </p>
          <div class="flex items-center gap-6 text-sm text-white/70">
            <span class="flex items-center gap-1">
              <span class="material-icons text-sm">groups</span> 4 Major Religions
            </span>
            <span class="flex items-center gap-1">
              <span class="material-icons text-sm">translate</span> 2 Official Languages
            </span>
            <span class="flex items-center gap-1">
              <span class="material-icons text-sm">temple_buddhist</span> 8 UNESCO Sites
            </span>
          </div>
        </div>
        <div class="mt-8 md:mt-0">
          <button
            class="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all">
            <span class="material-icons">download</span> Download PDF Guide
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-pattern {
  background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
  position: relative;
  overflow: hidden;
}

.hero-pattern::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
  opacity: 0.1;
}
</style>
