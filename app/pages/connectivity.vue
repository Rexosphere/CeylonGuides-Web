<template>
  <div class="min-h-screen bg-background-light dark:bg-[#1a0f0a]">
    <!-- Hero Section -->
    <ConnectivityHero />

    <!-- Quick Picks Bar -->
    <ConnectivityQuickPicks />

    <!-- Provider Table -->
    <ConnectivityProvidersTable />

    <!-- Essentials -->
    <ConnectivityEssentials />

    <!-- Plans -->
    <ConnectivityPackages />

    <!-- Interactive Coverage Map -->
    <ConnectivityMap />

    <!-- Digital Nomad Section -->
    <ConnectivityNomadHub />

    <!-- Tips & Recommendations -->
    <ConnectivityTips />
  </div>
</template>

<script setup lang="ts">
// SEO
useSeoMeta({
  title: 'Connectivity Guide - Sri Lanka SIMs & Coverage',
  description: 'Complete guide to tourist SIM cards, eSIMs, and coverage in Sri Lanka. Compare Dialog, Mobitel, Hutch plans.'
})
</script>
