<template>
    <header class="relative h-[400px] w-full overflow-hidden flex items-center justify-center">
        <div class="absolute inset-0 z-0">
            <img alt="Transport in Sri Lanka" class="w-full h-full object-cover" :src="heroImage" />
            <div class="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/60"></div>
        </div>
        <div class="relative z-10 text-center max-w-4xl px-4 mt-8">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">
                Transport Assistant
            </h1>
            <div class="flex items-center justify-center gap-3 text-base md:text-lg text-white/90 font-medium drop-shadow-md">
                <span>Plan smart</span>
                <span class="text-[#fbbf24]">•</span>
                <span>Avoid scams</span>
                <span class="text-[#fbbf24]">•</span>
                <span>Fair fares</span>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const heroImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCChtqD91BB3sPWmKs0nsNBMSfIXmh_McVoJHlHtJdxxD1dZdPU_CxNy_JkSzQw_aginyUN5RQY73vhxxsW1kwuSuR-lSRriqIIRiXOHHQ-xyOaSwr8Wx-gxKUNPPSur5znA5JMxitvZ4o9lPR5ngQYEnBZy8KDdJBqXujxM_olUx2HVe0ZYe5NImJOTh8L0Ah-6rmQo0ImY_CvCTCbQcuz0JEOD2UK7kNvJV6O7YdoalcWZJbDVSBV5avk4NC_sV6CtoQVeSu9uoQ"
</script>
