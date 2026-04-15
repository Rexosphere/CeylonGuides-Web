<template>
  <section class="py-20 bg-background-light dark:bg-background-dark">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="mb-10">
        <span class="text-xs font-bold tracking-widest text-secondary uppercase mb-2 block">Discover Ceylon</span>
        <h2 class="text-3xl md:text-4xl font-display font-bold text-primary dark:text-white">Main Features</h2>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Destinations Card (Large) -->
        <div class="lg:col-span-2 relative h-96 rounded-2xl overflow-hidden group shadow-card cursor-pointer">
          <img
            alt="Sri Lanka Nine Arch Bridge"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="/images/downloaded_9f15b6f18e06.avif"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div class="absolute top-6 left-6">
            <span
              class="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">TOP
              RATED</span>
          </div>
          <div class="absolute bottom-8 left-8 right-8 text-white">
            <h3 class="text-3xl font-display font-bold mb-2">Destinations</h3>
            <p class="text-white/80 mb-6 max-w-lg text-sm md:text-base leading-relaxed">
              Explore iconic locations like the misty train ride to Ella, ancient Sigiriya, and pristine southern
              beaches.
            </p>
            <div class="flex items-center gap-4">
              <NuxtLink
                to="/destinations"
                class="bg-secondary hover:bg-white hover:text-secondary text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2"
              >
                Explore All
                <span class="material-icons text-sm">arrow_forward</span>
              </NuxtLink>
              <div class="flex items-center gap-1 text-sm text-white/80">
                <span class="material-icons text-base">star</span>
                4.9/5 from Travelers
              </div>
            </div>
          </div>
        </div>

        <!-- Itineraries & Planner Card -->
        <div
          class="bg-secondary/10 dark:bg-card-dark rounded-2xl p-8 flex flex-col justify-between shadow-soft hover:shadow-card transition-shadow">
          <div>
            <div
              class="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-secondary mb-6 shadow-sm">
              <span class="material-icons">calendar_today</span>
            </div>
            <h3 class="text-2xl font-display font-bold text-primary dark:text-white mb-3">Itineraries & Planner</h3>
            <p class="text-text-muted dark:text-gray-400 text-sm leading-relaxed">
              Custom trip plans for every type of traveler. From 3-day cultural bursts to 2-week island loops.
            </p>
          </div>
          <NuxtLink
            to="/itineraries"
            class="text-secondary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-6"
          >
            Start Planning
            <span class="material-icons text-sm">chevron_right</span>
          </NuxtLink>
        </div>

        <!-- Activities Card -->
        <div
          class="bg-primary rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden shadow-card group text-white h-64 lg:h-auto">
          <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <span class="material-icons text-9xl">hiking</span>
          </div>
          <div class="relative z-10">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-display font-bold mb-2">Activities</h3>
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span class="material-icons text-white text-sm">hiking</span>
              </div>
            </div>
            <p class="text-white/80 text-sm mb-6">Hiking, Surfing, Tea Tasting, Safari, and more.</p>
            <NuxtLink
              to="/activities"
              class="text-white font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View Activities
              <span class="material-icons text-sm">arrow_forward</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Photo Spots Card -->
        <div
          class="lg:col-span-2 bg-white dark:bg-card-dark rounded-2xl p-8 flex items-center justify-between shadow-soft hover:shadow-card transition-shadow">
          <div class="flex items-start gap-6">
            <div
              class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
              <span class="material-icons text-2xl">photo_camera</span>
            </div>
            <div>
              <h3 class="text-2xl font-display font-bold text-primary dark:text-white mb-2">Photo Spots</h3>
              <p class="text-text-muted dark:text-gray-400 text-sm">Instagrammable locations mapped for you.</p>
              <NuxtLink
                to="/photos"
                class="text-secondary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-4"
              >
                View Gallery
                <span class="material-icons text-sm">arrow_forward</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this static layout
</script>
