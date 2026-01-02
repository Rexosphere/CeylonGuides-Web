<template>
  <!-- Travel Smart Section (Asymmetric Layout) -->
  <section class="py-24 px-4 bg-white dark:bg-background-dark">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Text Content -->
        <div class="lg:col-span-5 order-2 lg:order-1 space-y-8">
          <div class="space-y-4">
            <p class="text-accent font-bold uppercase tracking-widest text-sm">Travel Smart Today</p>
            <h2 class="font-serif text-4xl md:text-5xl font-bold text-primary dark:text-white leading-tight">
              The Iconic Train Journey to Ella
            </h2>
            <p class="text-charcoal/80 dark:text-gray-300 text-lg leading-relaxed">
              Experience one of the most scenic train rides in the world. Winding through tea plantations and misty mountains, the route from Kandy to Ella is a must-do. 
            </p>
          </div>
          <div class="bg-secondary/20 p-6 rounded-2xl border-l-4 border-primary">
            <div class="flex items-start gap-4">
              <span class="material-symbols-outlined text-primary text-3xl">lightbulb</span>
              <div>
                <h4 class="font-bold text-primary dark:text-white text-lg">Pro Tip</h4>
                <p class="text-charcoal dark:text-gray-300 mt-1">
                  Tickets sell out weeks in advance. For the best views, book a seat on the right side of the train when heading towards Ella.
                </p>
              </div>
            </div>
          </div>
          <div class="pt-4">
            <a class="inline-flex items-center gap-2 text-primary dark:text-accent-light font-bold text-lg hover:gap-4 transition-all" href="#">
              Read Full Guide <span class="material-symbols-outlined">arrow_right_alt</span>
            </a>
          </div>
        </div>
        <!-- Image Grid / Feature -->
        <div class="lg:col-span-7 order-1 lg:order-2 relative">
          <div class="relative rounded-[3rem] overflow-hidden shadow-2xl group">
            <div class="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Blue train moving along the Nine Arches Bridge in Ella surrounded by dense tea plantations" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1fliR7-M_tkFML1WjxbrReVPAefPkbogYH5jNYoqxc-wyyITxrxPvXDM8VrSlcadDIVZHho54L0UsbXHAO2HsYnR2GSSFRBJ28pTAebz9ntqjzBq-r5xs6ZC7715dPN6rVj_Eq-oIJ3ALvcj5Wq-2ulszN2b662spmtn8deXnaZOUNIG0gvUqiJU0ALYxYCe1cnRz8a3YhBHQgb-2ab8Tfvc2sICqKGtYfAOexuRrBrkMAgAVMPATvHhKgB7O4vZmnWN1zy_iqTG6');">
            </div>
            <!-- Floating Badge -->
            <div class="absolute bottom-6 right-6 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <span class="material-symbols-outlined text-accent">local_fire_department</span>
              <span class="font-bold text-primary dark:text-white text-sm">Top Rated Activity</span>
            </div>
          </div>
          <!-- Decorative overlapping element -->
          <div class="hidden lg:block absolute -bottom-12 -left-12 w-48 h-48 bg-accent-light/20 rounded-full blur-2xl -z-10"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Travel Smart Section component showcasing featured content or tips
</script>
