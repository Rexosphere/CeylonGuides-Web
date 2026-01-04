<template>
  <section class="py-12 px-4 sm:px-10 layout-container bg-background-light dark:bg-[#1a100c] border-y border-gray-200 dark:border-neutral-800">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h2 class="text-text-main dark:text-white text-3xl font-bold leading-tight tracking-tight mb-2">Trip Builder Workshop</h2>
        <p class="text-text-muted dark:text-neutral-400">Drag & drop destinations to craft your custom journey</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-surface-dark text-sm font-semibold hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors dark:text-white text-text-main">
          <span class="material-symbols-outlined text-[20px]">ios_share</span> Share
        </button>
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-surface-dark text-sm font-semibold hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors dark:text-white text-text-main">
          <span class="material-symbols-outlined text-[20px]">picture_as_pdf</span> Export
        </button>
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-md hover:bg-primary/90 transition-colors">
          <span class="material-symbols-outlined text-[20px]">save</span> Save Trip
        </button>
      </div>
    </div>
    
    <!-- Builder UI -->
    <div class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-gray-200 dark:border-neutral-800 overflow-hidden min-h-[700px] flex flex-col">
      <!-- Toolbar -->
      <div class="bg-gray-50 dark:bg-[#251814] p-4 border-b border-gray-200 dark:border-neutral-700 flex flex-wrap gap-4 items-center justify-between">
        <div class="flex items-center gap-4 flex-wrap">
          <div class="flex items-center gap-2 bg-white dark:bg-surface-dark px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700">
            <span class="material-symbols-outlined text-gray-400">calendar_month</span>
            <span class="text-sm font-medium dark:text-white text-text-main">Nov 12 - Nov 19</span>
            <span class="material-symbols-outlined text-gray-400 text-sm cursor-pointer">expand_more</span>
          </div>
          <div class="flex items-center gap-2 bg-white dark:bg-surface-dark px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700">
            <span class="material-symbols-outlined text-gray-400">group</span>
            <span class="text-sm font-medium dark:text-white text-text-main">2 Travelers</span>
            <span class="material-symbols-outlined text-gray-400 text-sm cursor-pointer">expand_more</span>
          </div>
        </div>
        <!-- Budget Estimator Widget -->
        <div class="flex items-center gap-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900 px-4 py-2 rounded-lg">
          <span class="material-symbols-outlined text-green-700 dark:text-green-500">attach_money</span>
          <div class="flex flex-col">
            <span class="text-[10px] text-green-700 dark:text-green-500 font-bold uppercase tracking-wider">Est. Budget</span>
            <span class="text-sm font-bold text-green-800 dark:text-green-400">$1,240 USD</span>
          </div>
        </div>
      </div>
      
      <!-- Main Layout -->
      <div class="flex flex-col lg:flex-row flex-1">
        <!-- Sidebar: Library -->
        <div class="w-full lg:w-[320px] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-neutral-700 bg-gray-50/50 dark:bg-[#251814]/50 flex flex-col">
          <div class="p-4 border-b border-gray-200 dark:border-neutral-700">
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
              <input class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-surface-dark text-sm focus:ring-primary focus:border-primary dark:text-white focus:outline-none placeholder-text-muted text-text-main" placeholder="Search places..." type="text"/>
            </div>
            <div class="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
              <button class="px-3 py-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full text-xs font-medium whitespace-nowrap text-text-main dark:text-white active:bg-primary active:text-white active:border-primary">All</button>
              <button class="px-3 py-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full text-xs font-medium whitespace-nowrap text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700">Beaches</button>
              <button class="px-3 py-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full text-xs font-medium whitespace-nowrap text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700">Culture</button>
              <button class="px-3 py-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full text-xs font-medium whitespace-nowrap text-text-main dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700">Nature</button>
            </div>
          </div>
          <!-- Draggable Items -->
          <div class="flex-1 overflow-y-auto p-4 space-y-3">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Suggested</p>
            <!-- Item 1 -->
            <div class="group bg-white dark:bg-surface-dark p-2 rounded-lg border border-gray-200 dark:border-neutral-700 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing flex gap-3">
              <div class="w-16 h-16 rounded-md bg-cover bg-center shrink-0" role="img" aria-label="Nine Arch Bridge in Ella" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfSJOB9wqLlGD1TcrKce6UkYyQDx_bevXyS2zPa4Je3ZCkGH7T2ZOxNtmduFT6t2R70KyNCDb1csD6lyJp8gxQ5wX_TCw6WSdote3AxpweKkBi6fckQ1dW1iclYHpAgZzZOHfvr_dyanP84DpF5G03PbM2QqtThPjoo_i_nduRQ42mZIBc1W-FyUDPTwXM-lmKj2_suZHuilcDgHuQYBax_VxmjF8tH8VpL2dH0zzhsKAOKqVYWBGw7f3hX6U6qAJl-hVDLKaXnjk');"></div>
              <div class="flex flex-col justify-center flex-1">
                <h4 class="text-sm font-bold text-neutral-800 dark:text-white">Nine Arch Bridge</h4>
                <p class="text-xs text-text-muted">Ella • Sightseeing</p>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-[10px] bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-neutral-400">2 hrs</span>
                  <span class="material-symbols-outlined text-gray-300 group-hover:text-primary">drag_indicator</span>
                </div>
              </div>
            </div>
            <!-- Item 2 -->
            <div class="group bg-white dark:bg-surface-dark p-2 rounded-lg border border-gray-200 dark:border-neutral-700 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing flex gap-3">
              <div class="w-16 h-16 rounded-md bg-cover bg-center shrink-0" role="img" aria-label="Leopard resting on a tree branch in Yala National Park" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB958-p3O8WkRwOhlYij5AnrwKCbabE-oageJjwxyd9LYJivGyLfbqh7Ww0TQlE4EAVN-AEddcgbUS4TMEkoq197moZURMmPLD_aBa01StFBXISCXb080dtrHUZhozSFVLyEHlaLVPYYcatOuj1rZqivxT2dfGJtesABtCI0H3jKGeX0eT7548Je7MGJ8b05kUWBgx0S3X0vi79f9vr_cSOM92-_I-qkH3KDeRMiTqElUyaDFBIBafJAeiIdHnuz4EXxaFbXsrDVqc');"></div>
              <div class="flex flex-col justify-center flex-1">
                <h4 class="text-sm font-bold text-neutral-800 dark:text-white">Yala Safari</h4>
                <p class="text-xs text-text-muted">Yala • Wildlife</p>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-[10px] bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-neutral-400">4 hrs</span>
                  <span class="material-symbols-outlined text-gray-300 group-hover:text-primary">drag_indicator</span>
                </div>
              </div>
            </div>
            <!-- Item 3 -->
            <div class="group bg-white dark:bg-surface-dark p-2 rounded-lg border border-gray-200 dark:border-neutral-700 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing flex gap-3">
              <div class="w-16 h-16 rounded-md bg-cover bg-center shrink-0" role="img" aria-label="Galle Fort lighthouse and ramparts" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBE5c8AWhVpuJ4aRJr5ViomQy7L9SHYyZYQwShOzcoA8mzsQTAXX9Roh3zv8bQRyo_sfFr66L50I2rX7okL4uf9YnwSEfg4cJFPQM-S6BkGLGYeO0IPIyTLvJYb_wqSwPDe0aUn9An0bbMev_k4WxHvZgIUM44C-N4bkYGVlGf4c_n9An09lB6BbCInF_9vNGTNL8uNvUviI-crAb7-gbjlFghS-qXaFZirsMSOzWYhvWs2KNi63kVBHs1VqGApNXCoP8O9008naFM');"></div>
              <div class="flex flex-col justify-center flex-1">
                <h4 class="text-sm font-bold text-neutral-800 dark:text-white">Galle Fort Walk</h4>
                <p class="text-xs text-text-muted">Galle • History</p>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-[10px] bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-neutral-400">3 hrs</span>
                  <span class="material-symbols-outlined text-gray-300 group-hover:text-primary">drag_indicator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Main Timeline Area -->
        <div class="flex-1 p-6 bg-white dark:bg-surface-dark overflow-y-auto">
          <div class="max-w-3xl mx-auto space-y-8">
            <!-- Day 1 -->
            <div class="relative pl-8 border-l-2 border-primary/30">
              <div class="absolute -left-[9px] top-0 size-4 bg-primary rounded-full border-4 border-white dark:border-surface-dark"></div>
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Day 1: Arrival & Colombo City</h3>
                  <p class="text-sm text-gray-500">Monday, Nov 12</p>
                </div>
                <button class="text-xs text-primary font-semibold hover:underline">+ Add Note</button>
              </div>
              <!-- Timeline Item -->
              <div class="bg-gray-50 dark:bg-[#251814] rounded-lg border border-gray-100 dark:border-neutral-800 p-3 mb-3 flex gap-4 shadow-sm group hover:border-primary/30 transition-colors">
                <div class="text-center min-w-[60px] flex flex-col justify-center border-r border-gray-200 dark:border-neutral-700 pr-4 py-1">
                  <span class="text-xs font-bold text-gray-400">10:00 AM</span>
                  <span class="text-[10px] text-gray-400">Arrival</span>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between">
                    <h4 class="text-base font-semibold text-neutral-800 dark:text-white">Bandaranaike Intl Airport</h4>
                    <span class="text-xs font-medium text-gray-400">$20 (Taxi)</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">Pickup SIM card and currency exchange.</p>
                </div>
                <div class="opacity-0 group-hover:opacity-100 transition-opacity self-center">
                  <button class="p-1 hover:bg-red-50 hover:text-red-500 rounded text-gray-400 transition-colors"><span class="material-symbols-outlined text-[20px]">delete</span></button>
                </div>
              </div>
              <!-- Timeline Item -->
              <div class="bg-gray-50 dark:bg-[#251814] rounded-lg border border-gray-100 dark:border-neutral-800 p-3 flex gap-4 shadow-sm group hover:border-primary/30 transition-colors">
                <div class="text-center min-w-[60px] flex flex-col justify-center border-r border-gray-200 dark:border-neutral-700 pr-4 py-1">
                  <span class="text-xs font-bold text-gray-400">02:00 PM</span>
                  <span class="text-[10px] text-gray-400">Activity</span>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between">
                    <h4 class="text-base font-semibold text-neutral-800 dark:text-white">Gangaramaya Temple</h4>
                    <span class="text-xs font-medium text-gray-400">$5 Entry</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">Visit one of the most important temples in Colombo.</p>
                </div>
                <div class="opacity-0 group-hover:opacity-100 transition-opacity self-center">
                  <button class="p-1 hover:bg-red-50 hover:text-red-500 rounded text-gray-400 transition-colors"><span class="material-symbols-outlined text-[20px]">delete</span></button>
                </div>
              </div>
            </div>
            
            <!-- Day 2 -->
            <div class="relative pl-8 border-l-2 border-gray-200 dark:border-neutral-700">
              <div class="absolute -left-[9px] top-0 size-4 bg-white dark:bg-surface-dark rounded-full border-4 border-gray-300 dark:border-neutral-600"></div>
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Day 2: Kandy Express</h3>
                  <p class="text-sm text-gray-500">Tuesday, Nov 13</p>
                </div>
              </div>
              <!-- Empty State -->
              <div class="border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-neutral-900/30">
                <div class="bg-white dark:bg-surface-dark p-3 rounded-full mb-3 shadow-sm">
                  <span class="material-symbols-outlined text-primary text-3xl">add_location_alt</span>
                </div>
                <h5 class="text-neutral-900 dark:text-white font-semibold">Start planning Day 2</h5>
                <p class="text-sm text-gray-500 mt-1 max-w-xs">Drag suggested places from the sidebar or search for a specific location.</p>
                <button class="mt-4 text-sm font-bold text-primary hover:text-primary/80">Browse Recommendations</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
