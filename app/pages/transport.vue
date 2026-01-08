<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">
    <!-- Hero Section -->
    <TransportHero />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 -mt-24 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <!-- Left Column -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <!-- Journey Planner -->
          <TransportJourneyPlanner @search="handleSearch" @swap="handleSwap" />

          <!-- Popular Routes -->
          <TransportPopularRoutes @select-route="handleRouteSelect" />
        </div>

        <!-- Right Column - Map -->
        <div class="lg:col-span-8 relative h-full min-h-[600px]">
          <TransportMapView @fullscreen="handleFullscreen" @zoom-in="handleZoomIn" @zoom-out="handleZoomOut" />
        </div>
      </div>

      <!-- Fare Results Section -->
      <TransportFareResults />
    </main>
  </div>
</template>

<script setup lang="ts">
// Event handlers
const handleSearch = (data: any) => {
  console.log('Search:', data)
  // Implement search logic here
}

const handleSwap = () => {
  console.log('Swap locations')
  // Implement swap logic here
}

const handleRouteSelect = (route: any) => {
  console.log('Route selected:', route)
  // Implement route selection logic here
}

const handleFullscreen = () => {
  console.log('Toggle fullscreen')
  // Implement fullscreen logic here
}

const handleZoomIn = () => {
  console.log('Zoom in')
  // Implement zoom in logic here
}

const handleZoomOut = () => {
  console.log('Zoom out')
  // Implement zoom out logic here
}
</script>
