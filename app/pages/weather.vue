<template>
  <div
    class="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden min-h-screen flex flex-col">

    <!-- Hero Header -->
    <header class="relative h-[500px] w-full overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 z-0">
        <img alt="Sri Lanka Tea Plantation" class="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCChtqD91BB3sPWmKs0nsNBMSfIXmh_McVoJHlHtJdxxD1dZdPU_CxNy_JkSzQw_aginyUN5RQY73vhxxsW1kwuSuR-lSRriqIIRiXOHHQ-xyOaSwr8Wx-gxKUNPPSur5znA5JMxitvZ4o9lPR5ngQYEnBZy8KDdJBqXujxM_olUx2HVe0ZYe5NImJOTh8L0Ah-6rmQo0ImY_CvCTCbQcuz0JEOD2UK7kNvJV6O7YdoalcWZJbDVSBV5avk4NC_sV6CtoQVeSu9uoQ" />
        <div class="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80"></div>
      </div>
      <div class="relative z-10 text-center max-w-4xl px-4 mt-10">
        <div
          class="inline-block px-3 py-1 mb-4 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white tracking-wider uppercase">
          Planning & Logistics
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">When to Explore Ceylon</h1>
        <p class="text-lg md:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed">
          Navigate the dual monsoons and discover the perfect season for your island getaway.
        </p>
      </div>
      <div class="absolute top-6 right-6 z-20 hidden md:block">
        <button
          class="flex items-center gap-2 bg-slate-900/50 hover:bg-slate-900/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium border border-white/20 transition">
          <span class="material-icons text-sm">radar</span> Switch to Live Radar
        </button>
      </div>
      <div
        class="absolute bottom-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-3 text-white text-xs md:text-sm font-medium">
        <div class="max-w-7xl mx-auto px-6 flex justify-center gap-8 md:gap-16">
          <div class="flex items-center gap-2">
            <span class="material-icons text-base">location_on</span> Colombo: 28°C Partly cloudy
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-base">water_drop</span> Humidity: 69%
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-base">air</span> Wind: 30.9 km/h
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <!-- Climate Overview Section -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h6 class="text-accent-danger text-xs font-bold uppercase tracking-widest mb-2">Climate Overview</h6>
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-6">North-East Monsoon (Maha)</h2>
          <div class="flex items-center gap-4 mb-6 text-sm font-medium">
            <span class="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1 rounded-full">
              <span class="material-icons text-sm">light_mode</span> Yala Season (May–Sep)
            </span>
            <span class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <span class="material-icons text-sm">umbrella</span> Maha Season (Dec–Mar)
            </span>
          </div>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            During Maha (December–March), the North-East monsoon reverses the pattern. The South and West Coasts bask in
            sunshine—ideal for whale watching in Mirissa, exploring Galle's fort, or relaxing in Colombo.
          </p>
          <div
            class="bg-blue-50 dark:bg-slate-800/50 p-4 rounded-xl border border-blue-100 dark:border-slate-700 flex items-start gap-3 mb-8">
            <div class="bg-blue-100 dark:bg-slate-700 p-2 rounded-full text-primary">
              <span class="material-icons">cyclone</span>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-slate-900 dark:text-white">North-East winds bring rain</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">Affecting East & North</p>
            </div>
          </div>
          <div class="flex items-center gap-6 text-sm">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-primary"></span>
              <span class="text-slate-700 dark:text-slate-300 font-medium">Best Time</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              <span class="text-slate-500 dark:text-slate-400">Rainy Season</span>
            </div>
          </div>
        </div>
        <div
          class="relative bg-slate-200 dark:bg-slate-700 rounded-3xl overflow-hidden shadow-inner aspect-[4/3] group">
          <img alt="Map of Sri Lanka"
            class="w-full h-full object-cover opacity-80 mix-blend-multiply dark:mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALNLAWSUO2iOCueY18GL7gwo3qydzhV7UGPKKpOwVPPErBcWr3Gq0Et1DihXMcL0EdJAk5NdCmH5hm3H99PmvpsgKcnCAIFSx4Ad6HallNyiViWPJX5UxBxe8FXE4gC6__43O2w0x1s4nyWGwmWBmhpXUURVJSIEYE51O215Y7pdD4yrAKl1ZSVswzQsXF1uK9HETMDZsmOJorhbCs5jVITt3AakKesRKVgyuL8fuZCYIt6rVcch2zFPYjv43OvDWPzVupjnniD_U" />
          <div
            class="absolute top-1/4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg shadow-lg text-xs font-bold flex items-center gap-1 transform transition hover:scale-110 cursor-pointer">
            <span class="material-icons text-slate-400 text-sm">cloud</span> Jaffna 26°
          </div>
          <div
            class="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-xl p-3 shadow-lg flex items-center gap-3">
            <button class="bg-primary text-white p-2 rounded-full hover:bg-teal-700 transition">
              <span class="material-icons text-sm">play_arrow</span>
            </button>
            <div class="flex-1">
              <div class="h-1 bg-slate-200 dark:bg-slate-700 rounded-full w-full">
                <div class="h-1 bg-primary rounded-full w-1/3"></div>
              </div>
              <div class="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Radar</span>
                <span>Satellite</span>
                <span>12:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Best Regions Section -->
      <WeatherBestRegions />

      <!-- Current Regional Weather -->
      <WeatherCurrentRegional />

      <!-- 7-Day Snapshot -->
      <Weather7DaySnapshot />

      <!-- Interactive Planner -->
      <WeatherSeasonalGuide />

      <!-- Packing Essentials -->
      <WeatherPacking />
    </main>

  </div>
</template>

<script setup lang="ts">
// Components are auto-imported by Nuxt
useHead({
  title: 'Weather & Best Times - CeylonWiki',
  meta: [
    { name: 'description', content: 'Navigate the dual monsoons and discover the perfect season for your island getaway.' }
  ]
})
</script>

<style scoped>
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
