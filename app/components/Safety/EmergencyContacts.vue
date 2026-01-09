<template>
  <div
    class="bg-card-light dark:bg-card-dark rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
    <div class="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-700">
      <div class="p-2 bg-red-50 dark:bg-red-900/10 rounded-lg">
        <span class="material-icons text-accent text-2xl">contact_phone</span>
      </div>
      <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100">Emergency Contacts</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Police Emergency -->
      <div
        class="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition">
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> Police Emergency
            </span>
            <h3 class="text-3xl font-bold text-slate-800 dark:text-white mt-1">119</h3>
          </div>
          <div class="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm">
            <span class="material-icons text-accent">local_police</span>
          </div>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">National police emergency hotline for
          immediate assistance with criminal activities.</p>
        <div class="flex gap-2">
          <button @click="callNumber('119')"
            class="flex-1 bg-primary hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition shadow-sm">
            <span class="material-icons text-sm">call</span> Call Now
          </button>
          <button @click="copyNumber('119')"
            class="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition">
            <span class="material-icons text-sm">content_copy</span>
          </button>
        </div>
      </div>

      <!-- Ambulance (Suwa Seriya) -->
      <div
        class="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition">
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-accent"></span> Ambulance (Suwa Seriya)
            </span>
            <h3 class="text-3xl font-bold text-slate-800 dark:text-white mt-1">1990</h3>
          </div>
          <div class="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm">
            <span class="material-icons text-accent">medical_services</span>
          </div>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">Free national emergency medical
          service. GPS-tracked ambulances.</p>
        <div class="flex gap-2">
          <button @click="callNumber('1990')"
            class="flex-1 bg-primary hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition shadow-sm">
            <span class="material-icons text-sm">call</span> Call Now
          </button>
          <button @click="copyNumber('1990')"
            class="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition">
            <span class="material-icons text-sm">content_copy</span>
          </button>
        </div>
      </div>

      <!-- Tourism Police -->
      <div
        class="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition">
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Tourism Police
            </span>
            <h3 class="text-3xl font-bold text-slate-800 dark:text-white mt-1">1912</h3>
          </div>
          <div class="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm">
            <span class="material-icons text-orange-400">support_agent</span>
          </div>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">24/7 English-speaking tourist
          assistance. Safety advice, travel complaints.</p>
        <div class="flex gap-2">
          <button @click="callNumber('1912')"
            class="flex-1 bg-primary hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition shadow-sm">
            <span class="material-icons text-sm">call</span> Call Now
          </button>
          <button @click="copyNumber('1912')"
            class="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition">
            <span class="material-icons text-sm">content_copy</span>
          </button>
        </div>
      </div>

      <!-- Disaster Management -->
      <div
        class="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition">
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Disaster Mgmt
            </span>
            <h3 class="text-3xl font-bold text-slate-800 dark:text-white mt-1">117</h3>
          </div>
          <div class="bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm">
            <span class="material-icons text-slate-400">flood</span>
          </div>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">For road-related issues, landslides,
          and natural disaster emergencies.</p>
        <div class="flex gap-2">
          <button @click="callNumber('117')"
            class="flex-1 bg-primary hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition shadow-sm">
            <span class="material-icons text-sm">call</span> Call Now
          </button>
          <button @click="copyNumber('117')"
            class="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition">
            <span class="material-icons text-sm">content_copy</span>
          </button>
        </div>
      </div>
    </div>

    <div
      class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 text-slate-400 justify-center">
      <span class="material-icons text-sm text-green-600">verified_user</span>
      <p class="text-xs">Emergency numbers verified for Sri Lanka (Jan 2025)</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const callNumber = (number: string) => {
  window.location.href = `tel:${number}`
}

const copyNumber = async (number: string) => {
  try {
    await navigator.clipboard.writeText(number)
    alert(`${number} copied to clipboard!`)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>
