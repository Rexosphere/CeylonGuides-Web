<template>
  <div class="flex flex-col gap-12 md:gap-32 py-12 md:py-20 px-6 md:px-20 lg:px-40 max-w-[1440px] mx-auto w-full">
    <article 
      v-for="(dest, index) in destinations" 
      :key="index"
      :class="[
        'group',
        dest.layout === 'full' ? 'relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden' : 'flex flex-col md:flex-row gap-8 md:gap-16 items-center',
        dest.layout === 'right' ? 'md:flex-row-reverse' : ''
      ]"
    >
      <!-- Layout A & B: Image Section -->
      <div 
        v-if="dest.layout !== 'full'"
        class="w-full md:w-3/5 h-[400px] md:h-[600px] rounded-2xl overflow-hidden relative shadow-2xl shadow-black/5"
      >
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
        <div 
          class="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105" 
          :style="{ backgroundImage: `url('${dest.image}')` }"
          :aria-label="dest.alt"
        ></div>
        <span class="absolute top-6 left-6 z-20 bg-white/90 dark:bg-black/80 backdrop-blur text-[#181311] dark:text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {{ dest.category }}
        </span>
      </div>

      <!-- Layout A & B: Content Section -->
      <div 
        v-if="dest.layout !== 'full'"
        class="w-full md:w-2/5 flex flex-col gap-6"
        :class="{ 'md:items-end md:text-right': dest.layout === 'right' }"
      >
        <div class="flex flex-col gap-2" :class="{ 'md:items-end': dest.layout === 'right' }">
          <h2 class="text-4xl md:text-5xl font-bold text-[#181311] dark:text-white leading-tight">{{ dest.title }}</h2>
          <p class="text-primary text-sm font-bold tracking-widest uppercase">{{ dest.subtitle }}</p>
        </div>
        <p class="text-[#5c4a44] dark:text-[#bcaaa4] text-lg leading-relaxed">
          {{ dest.description }}
        </p>
        <div class="flex flex-wrap gap-3 my-2" :class="{ 'justify-start md:justify-end': dest.layout === 'right' }">
          <div 
            v-for="(tag, tIndex) in dest.tags" 
            :key="tIndex"
            class="flex items-center gap-2 text-sm text-[#8a6b60] dark:text-[#9e8a84] bg-white dark:bg-[#2c201a] px-3 py-1.5 rounded-lg border border-[#e6dedb] dark:border-[#3a2d28]"
          >
            <span class="material-symbols-outlined text-[18px]">{{ tag.icon }}</span> {{ tag.label }}
          </div>
        </div>
        <div class="pt-4">
          <button 
            class="flex items-center gap-2 text-[#181311] dark:text-white hover:text-primary dark:hover:text-primary transition-colors font-bold text-base group/btn"
            :class="{ 'md:flex-row-reverse': dest.layout === 'right' }"
          >
            Explore Destination 
            <span 
              class="material-symbols-outlined transition-transform group-hover/btn:translate-x-1"
              :class="{ 'md:group-hover/btn:-translate-x-1 md:rotate-180': dest.layout === 'right' }"
            >arrow_forward</span>
          </button>
        </div>
      </div>

      <!-- Layout C: Full Width -->
      <template v-if="dest.layout === 'full'">
        <div class="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          class="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105" 
          :style="{ backgroundImage: `url('${dest.image}')` }"
          :aria-label="dest.alt"
        ></div>
        <!-- Floating Content Card -->
        <div class="absolute bottom-0 left-0 md:bottom-12 md:left-12 z-20 w-full md:w-[480px] p-6 md:p-0">
          <div class="bg-white/95 dark:bg-[#1a120e]/95 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/20">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-primary text-xs font-bold tracking-widest uppercase mb-1 block">{{ dest.category }}</span>
                <h2 class="text-3xl font-bold text-[#181311] dark:text-white">{{ dest.title }}</h2>
              </div>
              <div class="bg-[#f5f1f0] dark:bg-[#2c201a] p-2 rounded-full">
                <span class="material-symbols-outlined text-[#8a6b60]">landscape</span>
              </div>
            </div>
            <p class="text-[#5c4a44] dark:text-[#bcaaa4] text-base leading-relaxed mb-6">
              {{ dest.description }}
            </p>
            <button class="w-full py-3 rounded-lg bg-[#181311] dark:bg-white text-white dark:text-[#181311] font-bold text-sm hover:opacity-90 transition-opacity">
              Explore Destination
            </button>
          </div>
        </div>
      </template>

    </article>
  </div>
</template>

<script setup lang="ts">
const destinations = [
  {
    title: 'Sigiriya',
    subtitle: 'The Lion Rock',
    description: 'Ascend the ancient rock fortress and marvel at the frescoes and water gardens of a past kingdom. A UNESCO World Heritage site that defies imagination, rising dramatically from the central plains.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV9FwZoBnSDFz26X8wcFzshChshpy25xJFz7P_E1i2030XAULhMco6SewvaHuc3d65tRQj9uUpQri4kMSgvQUljsiQJOW1iibvbDsNo23V_gJDkcbmtXaJqJOk_MaL0Q-k4LhiUXia1qB6YhOOh_Lcug_664a34PMn4FdncMdDrw7pH4WnT55hvUEzFXMw0E88MhiLJTm_KCG2IfPo9jSDfHgdl_UJON-tgmu-QanL-roNrFCTMpSj5biE0nMSHd4_47liUx-SVxk',
    alt: 'Ancient rock fortress Sigiriya surrounded by green jungle',
    category: 'Culture',
    layout: 'left',
    tags: [
      { icon: 'hiking', label: 'Hiking' },
      { icon: 'history_edu', label: 'History' },
      { icon: 'photo_camera', label: 'Photography' }
    ]
  },
  {
    title: 'Mirissa',
    subtitle: 'Sunset & Whales',
    description: 'Relax on pristine golden sands or embark on a boat safari to spot majestic blue whales. Mirissa offers the perfect blend of laid-back beach vibes and exciting marine adventures.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSjFdHE5ZHcmXtLYJMRsh8j-ggYnBbK71h9luwbr_fDCcvcwx3_hjlo-pFrdVWvFZ8rO0zgzXC0OEnYACZDPYm0o3aGfSojRsX5SqhcsjDwgLqpEx62_qiKNtLTuD3lvxL6R3DudxH3gTmtl1a7rCYc0-JLKQ4ng82jV7kT8gvklLvP_T1euIwbx5yL8sUeTnz34TyGPpPH16-hzpklejPUq63IaJMDGLZG3b8CRef0sTQQ7ps9uJvJgj4_Kwob-cAtwcirLPSDAU',
    alt: 'Golden sunset over coconut palms and ocean waves at Mirissa beach',
    category: 'Beaches',
    layout: 'right',
    tags: [
      { icon: 'surfing', label: 'Surfing' },
      { icon: 'directions_boat', label: 'Whales' },
      { icon: 'nightlife', label: 'Nightlife' }
    ]
  },
  {
    title: 'Ella',
    subtitle: '',
    description: 'Misty tea plantations, the iconic Nine Arch Bridge, and endless hiking trails. Ella is a hill country village that feels like a home away from home.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMbQBPmyZ4PDkNCbP5m8vJO5fA8ZhSDjfHzl-T8tKCje8BA1yrxI6isUVFZzJyzD4Zxl79GgjQ2c3pKLgQdJJ-Nb7rvkynE7Izz2zmxywXZ2IWT2i6GpJ1rNDhjSUT82xf6UkXrDgcMG51QyfZcSQAl61UDOzXqNK4LmPp03Tz7EcyslQ-vMFg-r5MMkkpCilEb0SPAYXm8_0Yuokbq6C_SsNjpU-V0empW3TPe2bviAyFO4lhFVtR4PBp1oiXWklw46YdRnm2cAg',
    alt: 'Train crossing the Nine Arch Bridge in misty Ella highlands',
    category: 'Mountains',
    layout: 'full',
    tags: []
  },
  {
    title: 'Yala',
    subtitle: 'The Wild Frontier',
    description: 'Home to the highest density of leopards in the world. Experience the thrill of a safari through dry forests and open grasslands teeming with elephants and exotic birds.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDm8-pduxc8oyXGP1F0edIgDaspwskQRFWwlBWyEV9e05SWLYz7XnalXhiuaW1uk9sRMaUMavQyYnFSLsc8IfDAfm5POso4yIOU_Qt9G7mpkuzOvZqKBxwTu8TAORsrmOmvutActZfyKVyfVhjL7VhSzjg1uHagapQwPMKfDPeB2yLM2pbq1qPnSObdtRrN9qsgnKplv-3iCNZ-NMvDG1WkbMqUSE5RSidogz4DNV1BhaOxz_WfpmHfs0wbid8BUhqnhidRCnhayA',
    alt: 'Leopard resting on a tree branch in Yala National Park',
    category: 'Wildlife',
    layout: 'left',
    tags: [
      { icon: 'pets', label: 'Safari' },
      { icon: 'camping', label: 'Camping' },
      { icon: 'nature', label: 'Nature' }
    ]
  }
]
</script>
