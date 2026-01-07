<template>
  <section class="bg-black/95 relative overflow-hidden py-16 md:py-24">
    <div class="absolute inset-0 z-0 opacity-40">
      <img alt="Winding road tea country" class="w-full h-full object-cover grayscale"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOR5YxA3cS9ZWn9ykUUc77dEs4YeAKXIyGs1fQWvnAqgPNnRAWtx2G3RAz_bVoNzJdcmMXXu6Tb_kjgfQGq9N8y2MuNlGgHD9MrT5_DP0nhVmGmgvmRSSrPvh_2jgVKLmsLUP-aVaLcc4JINVlWjOdA5t1ysodoVwh5ik98n4_-ZOcUhrqGjm54BE4qyyIgmP-vdMJdSHZfnK-D9oo3wb34oAa3CRfriDOnHxdmGLFNsz7CtfXuDBPh71UCbS7DeSq44Oe2iUl9UI" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
    <div class="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="max-w-2xl">
        <div class="flex items-center gap-2 mb-4">
          <span class="material-icons text-accent-danger text-xl">flight_takeoff</span>
          <span class="text-accent-danger font-bold uppercase tracking-widest text-xs">Drone Safety & Regulations</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-display font-bold text-white mb-6">Fly Responsibly in Paradise</h2>
        <p class="text-gray-400 text-lg leading-relaxed mb-8 font-light">
          Sri Lanka has strict drone laws to protect its heritage sites and wildlife. All drones must be registered with
          the Civil Aviation Authority (CAA) before arrival. Respect privacy and sacred airspace.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-accent-danger/20 flex items-center justify-center shrink-0">
              <span class="material-icons text-accent-danger text-lg">block</span>
            </div>
            <div>
              <h4 class="text-white font-bold text-sm mb-1">No Fly Zones</h4>
              <p class="text-gray-500 text-xs">Airports, military bases, and most national parks.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-yellow-600/20 flex items-center justify-center shrink-0">
              <span class="material-icons text-yellow-600 text-lg">vertical_align_top</span>
            </div>
            <div>
              <h4 class="text-white font-bold text-sm mb-1">Height Limit</h4>
              <p class="text-gray-500 text-xs">Maximum flight altitude is 120m (400ft) AGL.</p>
            </div>
          </div>
        </div>
        <button
          class="bg-secondary hover:bg-white hover:text-primary text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center gap-2">
          Learn More
        </button>
      </div>
      <div
        class="relative w-full max-w-md aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hidden lg:block">
        <img alt="Scenic Road" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOR5YxA3cS9ZWn9ykUUc77dEs4YeAKXIyGs1fQWvnAqgPNnRAWtx2G3RAz_bVoNzJdcmMXXu6Tb_kjgfQGq9N8y2MuNlGgHD9MrT5_DP0nhVmGmgvmRSSrPvh_2jgVKLmsLUP-aVaLcc4JINVlWjOdA5t1ysodoVwh5ik98n4_-ZOcUhrqGjm54BE4qyyIgmP-vdMJdSHZfnK-D9oo3wb34oAa3CRfriDOnHxdmGLFNsz7CtfXuDBPh71UCbS7DeSq44Oe2iUl9UI" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this static component
</script>
