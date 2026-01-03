<template>
  <div class="flex-1 flex flex-col">
    <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 pb-4 border-b border-gray-200 dark:border-white/10">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Search Results for "Kandy"</h3>
      <span class="text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">Showing 4 of 24 results</span>
    </div>
    
    <div class="flex flex-col gap-6">
      
      <!-- Result Card 1: Destination -->
      <div class="group flex flex-col sm:flex-row gap-5 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent hover:border-primary/20">
        <div class="sm:w-48 md:w-64 aspect-video sm:aspect-auto h-48 sm:h-auto shrink-0 relative overflow-hidden rounded-lg">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBo6cFoIBA1uNBSyq_Igdz4yfcA9QSYhFNHRiIUDsUSiZphWDceLXqgXdoU8mQB54Pw1peZwuY5RNt-J2EkvBbWC-2oa0I84EOgSjq0HkMpIurfX_8g8pd5V3c5Tof2rv5rpLFgV284pKZuEMOZD41MpXtfWO7l_zSgU0IuIiABCp1f7n_Dsu3Bs1OKFpOZ-m8sQqrQ3Bb9ZYF8q1TjTzBLUenEKZcf-9gRDIcIJp2GL1gsdD1jsAQ3Ot9Gt-gbBXh4mHmTSySTkbE');"
          ></div>
          <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Destination
          </div>
        </div>
        <div class="flex flex-col flex-1 justify-between py-1">
          <div>
            <div class="flex items-start justify-between">
              <div>
                <h4 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Kandy City Centre</h4>
                <div class="flex items-center gap-1 mt-1 text-sm text-[#896c61] dark:text-gray-400">
                  <span class="material-symbols-outlined text-lg">location_on</span>
                  Central Province, Sri Lanka
                </div>
              </div>
              <button class="text-gray-400 hover:text-primary transition-colors">
                <span class="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              The cultural capital of Sri Lanka, surrounded by mountains and tea plantations. Home to the sacred Temple of the Tooth Relic and a scenic lake.
            </p>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-xs font-medium text-gray-400 dark:text-gray-500">Updated 2 days ago</span>
            <button class="flex items-center gap-1 text-sm font-bold text-primary hover:text-orange-700 transition-colors">
              Explore Details <span class="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Result Card 2: Attraction -->
      <div class="group flex flex-col sm:flex-row gap-5 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent hover:border-primary/20">
        <div class="sm:w-48 md:w-64 aspect-video sm:aspect-auto h-48 sm:h-auto shrink-0 relative overflow-hidden rounded-lg">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCoDFf-R826YNpSHfoTNKBNCPQmvGE-nB-mKsBgYe62ddzeouK-F0-5bUslKUI53GVQxyHt1f7euO57c2GYE4u3R7giqlEQWSxDVo4RBDaX6VB_Z-9-T76a-Kj3r8D5-M_RRePVHlWfYy7XZoB_vXmmKdYdOJELxN-atj7hUooH-d4Zrm6FAEdoS8U_ZjqovaefLDoYiMadBHwDMWhG_2al9PFAH_LbXhVihD7QmVp7p95XnWixn3G1IFE4JaD4L9hPDUvid-7x5Q');"
          ></div>
          <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Attraction
          </div>
        </div>
        <div class="flex flex-col flex-1 justify-between py-1">
          <div>
            <div class="flex items-start justify-between">
              <div>
                <h4 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Temple of the Sacred Tooth Relic</h4>
                <div class="flex items-center gap-1 mt-1 text-sm text-[#896c61] dark:text-gray-400">
                  <span class="material-symbols-outlined text-lg">location_on</span>
                  Kandy, Sri Lanka
                </div>
              </div>
              <button class="text-gray-400 hover:text-primary transition-colors">
                <span class="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              Sri Dalada Maligawa is a Buddhist temple in the city of Kandy, Sri Lanka. It is located in the royal palace complex of the former Kingdom of Kandy.
            </p>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="flex items-center text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded dark:bg-green-900/30 dark:text-green-400">
                <span class="material-symbols-outlined text-sm mr-1">star</span> 4.8
              </span>
              <span class="text-xs text-gray-500">(1,240 reviews)</span>
            </div>
            <button class="flex items-center gap-1 text-sm font-bold text-primary hover:text-orange-700 transition-colors">
              View Details <span class="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Result Card 3: Hotel -->
      <div class="group flex flex-col sm:flex-row gap-5 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent hover:border-primary/20">
        <div class="sm:w-48 md:w-64 aspect-video sm:aspect-auto h-48 sm:h-auto shrink-0 relative overflow-hidden rounded-lg">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCugglnbesjmIAOaJg1U6GmwG2FHyA9ufVBUF9boA5mFa_Pwfm28OFOzlXHx7B9WQvhX1Mu8qJIYHZnSVWe0a0_DB68Jj-CmcBhmgiXHqEo-Ndo9LplKs4YyATx1_xoBUU2zpYD7JyKljWSqyTpajTZeh3pr75NwA1t02VvjlRknd1Rjb5cIF9247GYIrh_Oyf_9oxrWI3ritKdgLdICqQfbEh6gS7oGZNez6ctgPC6Xa0tMmvSCNt3FYBzkRbW0kblD6dhKFLOLvY');"
          ></div>
          <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Accommodation
          </div>
        </div>
        <div class="flex flex-col flex-1 justify-between py-1">
          <div>
            <div class="flex items-start justify-between">
              <div>
                <h4 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">The Kandy House</h4>
                <div class="flex items-center gap-1 mt-1 text-sm text-[#896c61] dark:text-gray-400">
                  <span class="material-symbols-outlined text-lg">location_on</span>
                  Gunnepana, Kandy
                </div>
              </div>
              <button class="text-gray-400 hover:text-primary transition-colors">
                <span class="material-symbols-outlined">favorite</span>
              </button>
            </div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              A unique ancestral manor house providing seclusion and serenity for its guests in a lush tropical garden setting.
            </p>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg font-bold text-gray-900 dark:text-white">$180</span>
              <span class="text-xs text-gray-500">/ night</span>
            </div>
            <button class="flex items-center gap-1 text-sm font-bold text-primary hover:text-orange-700 transition-colors">
              Check Availability <span class="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Result Card 4: Article -->
      <div class="group flex flex-col sm:flex-row gap-5 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent hover:border-primary/20">
        <div class="sm:w-48 md:w-64 aspect-video sm:aspect-auto h-48 sm:h-auto shrink-0 relative overflow-hidden rounded-lg">
          <div 
            class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBc9XigIGU2mfsmYFEn3qqqZQONuhgGU6Vz7yEqkXEqQL7apxtSYuk_EseBro9s9a600aNHLEVHWN6ntJ9H6LmrUQfiNFTu7J8ihpZpKJ9yN8xKV2NYPCUZLIXFhpqemj8ZiKLGkC20M9OEs8FDz-Kldea7uai2ojUPKWkvk4CO0WL51fc0ZWEfc1rWAUbTB7ufWvSTwDUEGVAafDQvZD53ojlB6aYwTewAjSoQnki5dOeGf2CteCdHTQYHpiZxdNUV193DTnlGjy8');"
          ></div>
          <div class="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Article
          </div>
        </div>
        <div class="flex flex-col flex-1 justify-between py-1">
          <div>
            <div class="flex items-start justify-between">
              <div>
                <h4 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Guide to Esala Perahera Festival</h4>
                <div class="flex items-center gap-1 mt-1 text-sm text-[#896c61] dark:text-gray-400">
                  <span class="material-symbols-outlined text-lg">schedule</span>
                  5 min read
                </div>
              </div>
              <button class="text-gray-400 hover:text-primary transition-colors">
                <span class="material-symbols-outlined">bookmark</span>
              </button>
            </div>
            <p class="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              Everything you need to know about witnessing the grandest Buddhist festival in Sri Lanka, featuring traditional dancers and elephants.
            </p>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-xs font-medium text-gray-400 dark:text-gray-500">By Sarah Jenkins</span>
            <button class="flex items-center gap-1 text-sm font-bold text-primary hover:text-orange-700 transition-colors">
              Read Article <span class="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

    </div>
    
    <!-- Load More -->
    <div class="mt-10 flex justify-center">
      <button class="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-400 transition-all text-sm font-bold flex items-center gap-2">
        Load More Results
        <span class="material-symbols-outlined text-lg">expand_more</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
