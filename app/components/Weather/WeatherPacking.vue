<template>
  <div class="flex flex-col w-full gap-8">
    <h2 class="text-2xl md:text-3xl font-bold text-center text-weather-text-main dark:text-white">Packing Essentials</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- List 1 -->
      <div class="flex flex-col gap-4">
        <div class="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg flex items-center gap-3">
          <span class="material-symbols-outlined text-weather-primary">beach_access</span>
          <h3 class="font-bold text-lg text-weather-text-main dark:text-white">Coast & Culture</h3>
        </div>
        <ul class="flex flex-col gap-3 px-2">
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Lightweight cotton clothing
          </li>
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Strong sunscreen & hat
          </li>
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Modest wear for temples (covers shoulders/knees)
          </li>
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Mosquito repellent
          </li>
        </ul>
      </div>
      <!-- List 2 -->
      <div class="flex flex-col gap-4">
        <div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg flex items-center gap-3">
          <span class="material-symbols-outlined text-blue-500">hiking</span>
          <h3 class="font-bold text-lg text-weather-text-main dark:text-white">Hill Country</h3>
        </div>
        <ul class="flex flex-col gap-3 px-2">
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Light fleece or sweater
          </li>
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Waterproof jacket / poncho
          </li>
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Sturdy walking shoes
          </li>
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Leech socks (for trekking)
          </li>
        </ul>
      </div>
      <!-- List 3 -->
      <div class="flex flex-col gap-4">
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-3">
          <span class="material-symbols-outlined text-gray-500">medical_services</span>
          <h3 class="font-bold text-lg text-weather-text-main dark:text-white">General</h3>
        </div>
        <ul class="flex flex-col gap-3 px-2">
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Universal travel adapter (Type D/G)
          </li>
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Refillable water bottle
          </li>
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Basic first aid kit
          </li>
          <li class="flex items-center gap-3 text-sm text-weather-text-muted dark:text-gray-300">
            <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            Waterproof phone pouch
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
