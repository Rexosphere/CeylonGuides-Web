<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-body text-text-main dark:text-white flex flex-col">
    
    <!-- Hero Section -->
    <div class="relative w-full h-[350px] md:h-[450px] overflow-hidden">
      <div class="absolute inset-0">
        <img 
          alt="Scenic Sri Lanka Train Journey" 
          class="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuKu6A3FqBHsDCZaByh_oddxXRZvnHx8mj8OHHBHc93Wago11ZE_zsNWP3MvboDtIZtnXLXstZhBQ46hRQ3-1hlmZjpDNwRvb4UNhLrzR8QO39lhXapk_hZUXFffZxFTnrKk3h41-zZZV-ip0SD3ZiT9PqXr8FyW3hvnvCJlHAAlQAN802wXxAg0qz85cTX8tv2RwEz0dG65ddyFmpV_ZTPg5cP6IP6TzKkeZ7soP24wd42NLney-hLvKzlXb0oHOYwHGIbVhLZIQ"
        />
        <div class="absolute inset-0 bg-teal-deep/30 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
        <h1 class="font-display text-4xl md:text-6xl text-white mb-4 drop-shadow-md tracking-tight">Transport Assistant</h1>
        <div class="flex items-center gap-3 md:gap-4 text-white/95 font-body text-sm md:text-lg tracking-wide font-medium">
          <span>Plan smart</span>
          <span class="size-1.5 bg-coral-orange rounded-full shadow-sm"></span>
          <span>Avoid scams</span>
          <span class="size-1.5 bg-coral-orange rounded-full shadow-sm"></span>
          <span>Fair fares</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6 md:py-8 lg:py-12">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12 items-start">
        
        <!-- Left Column - Journey Planner Card -->
        <div class="w-full lg:w-[600px] xl:w-[650px] 2xl:w-[700px] flex-shrink-0 space-y-6">
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-gray-100 dark:border-white/5 p-6">
            
            <!-- Header -->
            <div class="flex items-center gap-3 mb-6">
              <span class="material-symbols-outlined text-teal-deep">alt_route</span>
              <div>
                <h3 class="font-bold text-text-main dark:text-white text-sm">Plan Your Journey</h3>
                <p class="text-xs text-text-muted">Calculate fair rates for any trip</p>
              </div>
            </div>

            <!-- Origin/Destination Inputs -->
            <div class="space-y-4 mb-6">
              <!-- Origin -->
              <div>
                <label class="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Origin</label>
                <div class="relative flex items-center">
                  <input 
                    v-model="originSearch"
                    @input="handleOriginInput"
                    @focus="showOriginDropdown = true"
                    class="w-full pl-4 pr-10 py-3 rounded-lg bg-background-light dark:bg-[#2d1f1a] border-none text-sm text-text-main dark:text-white placeholder:text-text-muted/60 focus:ring-1 focus:ring-teal-deep" 
                    type="text" 
                    placeholder="Enter origin..."
                  />
                  <button 
                    v-if="originSearch"
                    @click="clearOrigin"
                    class="absolute right-2 p-1.5 text-text-muted hover:text-teal-deep rounded hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <span class="material-symbols-outlined text-[18px]">close</span>
                  </button>
                  <button 
                    @click="setPickMode('from')"
                    class="absolute right-10 p-1.5 text-text-muted hover:text-teal-deep rounded hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <span class="material-symbols-outlined text-[18px]">map</span>
                  </button>
                  
                  <!-- Dropdown -->
                  <div v-if="showOriginDropdown" v-click-outside="() => showOriginDropdown = false" class="absolute z-50 w-full mt-2 top-full bg-white dark:bg-surface-dark rounded-xl shadow-xl ring-1 ring-slate-900/5 max-h-64 overflow-auto">
                    <div v-if="originGeo.isSearching.value" class="p-4 text-center text-sm text-text-muted">
                      <span class="inline-block w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-2"></span>
                      Locating...
                    </div>
                    <template v-else-if="originSearch.length >= 2">
                      <button
                        v-for="place in originGeo.searchResults.value"
                        :key="place.id"
                        @click="selectGeocodedOrigin(place)"
                        class="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/5 flex items-start gap-3 border-b border-slate-50 dark:border-white/5 last:border-0 transition-colors"
                      >
                        <span class="mt-0.5 text-text-muted material-symbols-outlined text-lg">location_on</span>
                        <div>
                          <div class="font-semibold text-text-main dark:text-white">{{ place.name }}</div>
                          <div class="text-xs text-text-muted">{{ place.area }}</div>
                        </div>
                      </button>
                      <div v-if="originGeo.searchResults.value.length === 0" class="p-4 text-center text-sm text-text-muted">
                        No locations found
                      </div>
                    </template>
                    <template v-else>
                      <div class="px-4 py-2 text-[10px] font-bold text-text-muted uppercase tracking-wide bg-slate-50/50 dark:bg-white/5">Popular</div>
                      <button v-for="dest in popularDestinations.slice(0,5)" :key="dest.id" @click="selectOrigin(dest)" class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2">
                        <span>{{ dest.name }}</span>
                      </button>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Swap Button -->
              <div class="flex justify-center -my-2 relative z-10">
                <button @click="swapLocations" class="bg-white dark:bg-[#2d1f1a] border border-gray-100 dark:border-white/10 rounded-full p-1.5 shadow-sm text-text-muted hover:text-teal-deep transition-colors">
                  <span class="material-symbols-outlined text-[16px]">swap_vert</span>
                </button>
              </div>

              <!-- Destination -->
              <div>
                <label class="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Destination</label>
                <div class="relative flex items-center">
                  <input 
                    v-model="destinationSearch"
                    @input="handleDestinationInput"
                    @focus="showDestinationDropdown = true"
                    class="w-full pl-4 pr-10 py-3 rounded-lg bg-background-light dark:bg-[#2d1f1a] border-none text-sm text-text-main dark:text-white placeholder:text-text-muted/60 focus:ring-1 focus:ring-teal-deep" 
                    type="text" 
                    placeholder="Enter destination..."
                  />
                  <button 
                    v-if="destinationSearch"
                    @click="clearDestination"
                    class="absolute right-2 p-1.5 text-text-muted hover:text-teal-deep rounded hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <span class="material-symbols-outlined text-[18px]">close</span>
                  </button>
                  <button 
                    @click="setPickMode('to')"
                    class="absolute right-10 p-1.5 text-text-muted hover:text-teal-deep rounded hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <span class="material-symbols-outlined text-[18px]">flag</span>
                  </button>
                  
                  <!-- Dropdown -->
                  <div v-if="showDestinationDropdown" v-click-outside="() => showDestinationDropdown = false" class="absolute z-50 w-full mt-2 top-full bg-white dark:bg-surface-dark rounded-xl shadow-xl ring-1 ring-slate-900/5 max-h-64 overflow-auto">
                    <div v-if="destGeo.isSearching.value" class="p-4 text-center text-sm text-text-muted">Loading...</div>
                    <template v-else-if="destinationSearch.length >= 2">
                      <button
                        v-for="place in destGeo.searchResults.value"
                        :key="place.id"
                        @click="selectGeocodedDest(place)"
                        class="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/5 flex items-start gap-3 border-b border-slate-50 dark:border-white/5 last:border-0 transition-colors"
                      >
                        <span class="mt-0.5 text-text-muted material-symbols-outlined text-lg">location_on</span>
                        <div>
                          <div class="font-semibold text-text-main dark:text-white">{{ place.name }}</div>
                          <div class="text-xs text-text-muted">{{ place.area }}</div>
                        </div>
                      </button>
                    </template>
                    <template v-else>
                      <div class="px-4 py-2 text-[10px] font-bold text-text-muted uppercase tracking-wide bg-slate-50/50 dark:bg-white/5">Popular</div>
                      <button v-for="dest in popularDestinations.slice(0,5)" :key="dest.id" @click="selectDestination(dest)" class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2">
                        <span>{{ dest.name }}</span>
                      </button>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- Transport Mode Selection -->
            <div class="mb-6">
              <label class="block text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Transport Mode</label>
              <div class="flex gap-3 justify-between">
                <button 
                  v-for="mode in travelModes"
                  :key="mode.id"
                  @click="selectedMode = mode.id"
                  class="flex-1 flex flex-col items-center justify-center py-3 rounded-full border-2 transition-all"
                  :class="selectedMode === mode.id 
                    ? 'border-teal-deep bg-teal-light/5 text-teal-deep' 
                    : 'border-gray-100 dark:border-white/5 bg-background-light dark:bg-[#2d1f1a] text-text-muted hover:border-teal-deep/30 opacity-60 hover:opacity-100'"
                >
                  <span class="material-symbols-outlined mb-1 text-[20px]">{{ mode.icon }}</span>
                  <span class="text-[9px] font-bold uppercase tracking-wider">{{ mode.label }}</span>
                </button>
              </div>
            </div>

            <!-- Rate Structure -->
            <div class="mb-6">
              <div class="flex justify-between items-end mb-2">
                <label class="block text-[10px] font-bold text-text-muted uppercase tracking-wider">Rate Structure</label>
                <button @click="showAdvanced = !showAdvanced" class="text-[10px] font-bold text-teal-deep hover:underline">
                  {{ showAdvanced ? 'Simple' : 'Customize' }}
                </button>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-background-light dark:bg-[#2d1f1a] rounded-lg p-2 flex items-center justify-between border border-transparent focus-within:border-teal-deep/30">
                  <div class="flex flex-col">
                    <span class="text-[9px] text-text-muted mb-0.5">Base (1st km)</span>
                    <div class="flex items-center text-xs font-bold">
                      <span class="text-text-muted mr-1">Rs.</span>
                      <input 
                        v-model.number="fareSettings.firstKmRate"
                        class="w-16 bg-transparent border-none p-0 text-text-main dark:text-white focus:ring-0 text-xs font-bold" 
                        type="number"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <button @click="fareSettings.firstKmRate += 10" class="text-text-muted hover:text-teal-deep"><span class="material-symbols-outlined text-[14px]">expand_less</span></button>
                    <button @click="fareSettings.firstKmRate = Math.max(0, fareSettings.firstKmRate - 10)" class="text-text-muted hover:text-teal-deep"><span class="material-symbols-outlined text-[14px]">expand_more</span></button>
                  </div>
                </div>
                <div class="bg-background-light dark:bg-[#2d1f1a] rounded-lg p-2 flex items-center justify-between border border-transparent focus-within:border-teal-deep/30">
                  <div class="flex flex-col">
                    <span class="text-[9px] text-text-muted mb-0.5">Per km</span>
                    <div class="flex items-center text-xs font-bold">
                      <span class="text-text-muted mr-1">Rs.</span>
                      <input 
                        v-model.number="fareSettings.perKmRate"
                        class="w-16 bg-transparent border-none p-0 text-text-main dark:text-white focus:ring-0 text-xs font-bold" 
                        type="number"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <button @click="fareSettings.perKmRate += 5" class="text-text-muted hover:text-teal-deep"><span class="material-symbols-outlined text-[14px]">expand_less</span></button>
                    <button @click="fareSettings.perKmRate = Math.max(0, fareSettings.perKmRate - 5)" class="text-text-muted hover:text-teal-deep"><span class="material-symbols-outlined text-[14px]">expand_more</span></button>
                  </div>
                </div>
              </div>
              
              <!-- Advanced Settings -->
              <div v-show="showAdvanced" class="grid grid-cols-2 gap-3 mt-3">
                <div class="bg-background-light dark:bg-[#2d1f1a] rounded-lg p-2">
                  <span class="text-[9px] text-text-muted">Min Fare</span>
                  <div class="flex items-center text-xs font-bold">
                    <span class="text-text-muted mr-1">Rs.</span>
                    <input v-model.number="fareSettings.minFare" class="w-16 bg-transparent border-none p-0 text-text-main dark:text-white focus:ring-0 text-xs font-bold" type="number" />
                  </div>
                </div>
                <div class="flex items-end">
                  <label class="flex items-center gap-2 p-2 w-full bg-background-light dark:bg-[#2d1f1a] rounded-lg cursor-pointer">
                    <input type="checkbox" v-model="fareSettings.nightMode" class="rounded text-teal-600 focus:ring-teal-500" />
                    <span class="text-xs font-bold text-text-main dark:text-white">Night (1.5x)</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Find Route Button -->
            <button 
              @click="calculateRoute"
              :disabled="!origin || !destination || isRouteLoading"
              class="w-full py-3.5 bg-teal-light hover:bg-teal-deep text-white font-bold text-sm rounded-full shadow-lg shadow-teal-deep/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span v-if="isRouteLoading" class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              <span v-else class="material-symbols-outlined text-[20px]">directions</span>
              {{ isRouteLoading ? 'Calculating...' : 'Find Best Route' }}
            </button>
          </div>
        </div>

        <!-- Right Column - Map & Results -->
        <div class="flex-1 w-full space-y-6">
          
          <!-- Map -->
          <div class="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-card border border-gray-100 dark:border-white/5 bg-[#e5e3df]">
            <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBye3UqYEOFRFviYlfu1qfGwERk4DvZ7viiSrjotNb6TgCxVxEkt39moOOpk_n8b1P6gQlpieBykVTDhXAIliOY347015xp638Tt93UMGfMa-ZotbaDyrpYqcnH3kfW4Wv2flmN7A5EChkvCBoIBKTDOx4Tz_wqz25eNjNPo6Xyi6J0JSjOytQeabJrkS-jnjg-fUL0x57ePxii6Dcgs2-fM6MVzOMUf3XQ0z1CZgjQRgvtfSwNVdD9dLyYQMkMizcyuTjFWq_PHmYE'); filter: grayscale(10%) contrast(95%);"></div>
            
            <!-- Map Controls -->
            <div class="absolute top-4 left-4">
              <button class="size-9 bg-white dark:bg-surface-dark rounded-lg shadow-sm flex items-center justify-center text-text-muted hover:text-teal-deep transition-colors">
                <span class="material-symbols-outlined text-[20px]">fullscreen</span>
              </button>
            </div>
            <div class="absolute top-4 right-4 flex flex-col gap-2">
              <div class="flex flex-col bg-white dark:bg-surface-dark rounded-lg shadow-sm overflow-hidden">
                <button class="size-8 flex items-center justify-center text-text-muted hover:bg-gray-50 dark:hover:bg-white/5 border-b border-gray-100 dark:border-white/5">
                  <span class="material-symbols-outlined text-[18px]">add</span>
                </button>
                <button class="size-8 flex items-center justify-center text-text-muted hover:bg-gray-50 dark:hover:bg-white/5">
                  <span class="material-symbols-outlined text-[18px]">remove</span>
                </button>
              </div>
            </div>

            <!-- Legend -->
            <div class="absolute bottom-4 left-4 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20">
              <h4 class="text-[10px] font-bold text-text-muted uppercase mb-2">Route Style</h4>
              <div class="space-y-1.5">
                <div class="flex items-center gap-2 text-[10px] font-medium text-text-main dark:text-white">
                  <div class="w-6 h-1 bg-coral-orange rounded-full"></div> Tuk-Tuk
                </div>
                <div class="flex items-center gap-2 text-[10px] font-medium text-text-main dark:text-white">
                  <div class="w-6 h-1 bg-teal-deep rounded-full"></div> Taxi/Car
                </div>
                <div class="flex items-center gap-2 text-[10px] font-medium text-text-muted">
                  <div class="w-6 h-1 border-t-2 border-dotted border-gray-400"></div> Bus (Highway)
                </div>
                <div class="flex items-center gap-2 text-[10px] font-medium text-text-muted">
                  <div class="w-6 h-1 border-t-2 border-dashed border-teal-deep"></div> Train
                </div>
              </div>
            </div>

            <!-- Route Markers (Demo) -->
            <div v-if="origin" class="absolute top-[30%] left-[55%] -translate-x-1/2 -translate-y-1/2">
              <div class="relative group cursor-pointer">
                <div class="bg-white px-2 py-1 rounded shadow text-[10px] font-bold whitespace-nowrap mb-1 absolute -top-6 left-1/2 -translate-x-1/2">{{ origin.name.substring(0, 20) }}...</div>
                <div class="size-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>
            <div v-if="destination" class="absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              <div class="relative group cursor-pointer z-10">
                <div class="bg-white px-2 py-1 rounded shadow text-[10px] font-bold whitespace-nowrap mb-1 absolute -top-6 left-1/2 -translate-x-1/2">{{ destination.name }}</div>
                <div class="size-4 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>

            <!-- Route Line (SVG demo) -->
            <svg v-if="origin && destination" class="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 450 150 Q 480 250 420 320" fill="none" stroke="#ff7f50" stroke-linecap="round" stroke-width="4"></path>
            </svg>
          </div>

          <!-- Fare Result Card -->
          <div v-if="routeResult" class="relative rounded-xl overflow-hidden shadow-floating">
            <div class="bg-[#3b82f6] p-6 text-white relative overflow-hidden">
              <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div class="relative z-10 flex justify-between items-start mb-6">
                <div>
                  <div class="text-[10px] uppercase font-bold tracking-wider opacity-80 mb-1">Estimated Fare</div>
                  <div class="text-4xl font-display font-bold mb-3">{{ calculatedFare.display }}</div>
                  <div class="flex gap-4 text-sm font-medium opacity-90">
                    <div class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-[18px]">straighten</span> {{ routeResult.distanceKm }} km
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-[18px]">schedule</span> {{ formatDuration(routeResult.durationMinutes) }}
                    </div>
                  </div>
                </div>
                <div class="size-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span class="material-symbols-outlined">{{ modeIcons[selectedMode] }}</span>
                </div>
              </div>
              <div class="relative z-10 flex items-center justify-between border-t border-white/20 pt-4">
                <div class="flex gap-2">
                  <button class="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Save">
                    <span class="material-symbols-outlined text-[18px]">bookmark_border</span>
                  </button>
                  <button class="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Share">
                    <span class="material-symbols-outlined text-[18px]">share</span>
                  </button>
                  <button class="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Download">
                    <span class="material-symbols-outlined text-[18px]">download</span>
                  </button>
                </div>
                <div class="text-[9px] opacity-60 italic">*Estimates may vary</div>
              </div>
            </div>
          </div>

          <!-- Check Price Fairness Button -->
          <button v-if="routeResult" @click="showFareGuard = true" class="w-full py-3 bg-light-cyan/50 hover:bg-light-cyan border border-teal-deep/10 text-teal-deep font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-all">
            <span class="material-symbols-outlined text-[18px]">verified_user</span>
            Check Price Fairness
          </button>

          <!-- Recommended Options -->
          <div v-if="routeResult" class="space-y-4 pt-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined text-text-muted text-[16px]">verified</span>
              <h3 class="text-[10px] font-bold text-text-muted uppercase tracking-wider">Recommended Options</h3>
            </div>
            
            <div 
              v-for="option in recommendedOptions"
              :key="option.label"
              class="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-100 dark:border-white/5 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div class="flex items-center gap-4">
                <div :class="`size-10 rounded-full ${option.bgColor} flex items-center justify-center ${option.textColor}`">
                  <span class="material-symbols-outlined">{{ option.icon }}</span>
                </div>
                <div>
                  <div class="font-bold text-text-main dark:text-white text-sm">{{ option.label }}</div>
                  <div class="text-[10px] text-text-muted">{{ option.subtitle }}</div>
                </div>
              </div>
              <div class="font-bold text-teal-deep text-sm">{{ option.cost }}</div>
            </div>
            
            <div class="text-center pt-2">
              <button class="text-[10px] font-bold text-text-muted uppercase tracking-wider hover:text-teal-deep">Compare More Options</button>
            </div>
          </div>

          <!-- Popular Routes -->
          <div class="space-y-3 pt-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined text-text-muted text-[16px]">trending_up</span>
              <h3 class="text-[10px] font-bold text-text-muted uppercase tracking-wider">Popular Routes</h3>
            </div>
            
            <div 
              v-for="route in popularRoutes"
              :key="route.id"
              @click="setPopularRoute(route)"
              class="bg-white dark:bg-surface-dark rounded-xl p-3 flex items-center justify-between border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined" :class="route.color">{{ route.icon }}</span>
                <div>
                  <div class="text-xs font-bold text-text-main dark:text-white">{{ route.title }}</div>
                  <div class="text-[10px] text-text-muted">{{ route.from }} to {{ route.to }}</div>
                </div>
              </div>
              <span class="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-text-muted">{{ route.distance }}</span>
            </div>
          </div>

          <!-- Scam Warning -->
          <div class="mt-8 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/40 rounded-full p-4 flex items-center justify-between cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors" @click="showScams = true">
            <div class="flex items-center gap-3">
              <div class="size-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400">
                <span class="material-symbols-outlined text-[18px]">warning</span>
              </div>
              <div>
                <h4 class="text-xs font-bold text-text-main dark:text-white">Tourist Scams to Avoid</h4>
                <p class="text-[10px] text-text-muted">Tap to see safety tips for this route</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-orange-400 text-[18px] mr-2">chevron_right</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Fare Guard Modal -->
    <div v-if="showFareGuard" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" @click.self="showFareGuard = false">
      <div class="bg-white dark:bg-surface-dark w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/5">
        <div class="bg-slate-900 p-5 text-white flex justify-between items-start relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-teal-600 to-slate-900 opacity-50"></div>
          <div class="relative z-10">
            <h3 class="text-xl font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-teal-400">shield_person</span>
              Fare Guard
            </h3>
            <p class="text-slate-300 text-sm mt-1">Don't overpay for this ride.</p>
          </div>
          <button @click="showFareGuard = false" class="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors relative z-10">
            <span class="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
        
        <div class="p-6">
          <div class="space-y-6">
            <div class="flex justify-between items-end pb-4 border-b border-slate-100 dark:border-white/5">
              <div>
                <div class="text-xs font-bold text-text-muted uppercase tracking-wide mb-1">Fair Estimate</div>
                <div class="text-3xl font-bold text-text-main dark:text-white tracking-tight">
                  {{ calculatedFare.display }}
                </div>
              </div>
              <div class="inline-flex px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-full text-xs font-bold border border-teal-100 dark:border-teal-900/40">
                Metered Rate
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between p-4 bg-teal-50/50 dark:bg-teal-900/10 rounded-xl border border-teal-100 dark:border-teal-900/30">
                <div class="flex items-center gap-3">
                  <span class="text-xl">✅</span>
                  <div>
                    <div class="font-bold text-sm text-text-main dark:text-white">Good Price</div>
                    <div class="text-xs text-text-muted">Typical range</div>
                  </div>
                </div>
                <div class="font-bold text-teal-700 dark:text-teal-400">Rs. {{ calculatedFare.ranges.typical }} - {{ calculatedFare.ranges.high }}</div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-rose-50/50 dark:bg-rose-900/10 rounded-xl border border-rose-100 dark:border-rose-900/30">
                <div class="flex items-center gap-3">
                  <span class="text-xl">🚨</span>
                  <div>
                    <div class="font-bold text-sm text-text-main dark:text-white">Tourist Trap</div>
                    <div class="text-xs text-text-muted">Likely overcharge</div>
                  </div>
                </div>
                <div class="font-bold text-rose-700 dark:text-rose-400">> Rs. {{ calculatedFare.ranges.tourist }}</div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="text-xs font-bold text-text-muted uppercase tracking-wide">Negotiation 101</div>
              <ul class="text-sm text-text-main dark:text-white space-y-3">
                <li class="flex gap-3 items-start">
                  <span class="text-teal-600 dark:text-teal-400 material-symbols-outlined text-lg shrink-0">check_circle</span>
                  <span>Show this screen to the driver <strong>before</strong> getting in.</span>
                </li>
                <li class="flex gap-3 items-start">
                  <span class="text-teal-600 dark:text-teal-400 material-symbols-outlined text-lg shrink-0">check_circle</span>
                  <span>"Meter only" is the magic phrase in Colombo.</span>
                </li>
                <li class="flex gap-3 items-start">
                  <span class="text-teal-600 dark:text-teal-400 material-symbols-outlined text-lg shrink-0">check_circle</span>
                  <span>If they refuse, walk away. There's always another tuk.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
            <button @click="showFareGuard = false" class="w-full py-3 bg-slate-900 dark:bg-teal-600 text-white rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-teal-700 transition-colors shadow-lg">
              Got it, thanks
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Scams Modal -->
    <div v-if="showScams" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" @click.self="showScams = false">
      <TouristOverchargeWarning @close="showScams = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useTransportRoutes, popularDestinations } from '~/composables/useTransportRoutes'
import { useGeocode, type GeocodedPlace } from '~/composables/useGeocode'

// SEO
useHead({
  title: 'Transport Assistant - CeylonGuide',
  meta: [
    { name: 'description', content: 'Plan your journey in Sri Lanka with fair pricing, route planning, and scam protection.' }
  ]
})

const {
  origin,
  destination,
  routeResult,
  isLoading: isRouteLoading,
  calculateRoute: doCalculate,
  setOrigin,
  setDestination,
  swapLocations: doSwap
} = useTransportRoutes()

const originGeo = useGeocode()
const destGeo = useGeocode()

const originSearch = ref('')
const destinationSearch = ref('')
const showOriginDropdown = ref(false)
const showDestinationDropdown = ref(false)
const showAdvanced = ref(false)
const showFareGuard = ref(false)
const showScams = ref(false)
const pickMode = ref<'from' | 'to' | null>(null)
const selectedMode = ref('tuktuk')

const travelModes = [
  { id: 'tuktuk', icon: 'local_taxi', label: 'Tuk-Tuk' },
  { id: 'taxi', icon: 'directions_car', label: 'Taxi' },
  { id: 'bus', icon: 'directions_bus', label: 'Bus' },
  { id: 'train', icon: 'train', label: 'Train' }
]

const modeIcons: Record<string, string> = {
  tuktuk: 'local_taxi',
  taxi: 'directions_car',
  bus: 'directions_bus',
  train: 'train'
}

const fareSettings = ref({
  firstKmRate: 100,
  perKmRate: 60,
  minFare: 150,
  nightMode: false
})

const modeMultipliers: Record<string, number> = {
  tuktuk: 1.0,
  taxi: 1.4,
  bus: 0.15,
  train: 0.12
}

// Auto-calculate route when both points are set
watch([origin, destination], async ([newOrigin, newDest]) => {
  if (newOrigin && newDest) {
    await doCalculate()
  }
})

function handleOriginInput() {
  showOriginDropdown.value = true
  pickMode.value = null
  originGeo.searchPlaces(originSearch.value)
}

function handleDestinationInput() {
  showDestinationDropdown.value = true
  pickMode.value = null
  destGeo.searchPlaces(destinationSearch.value)
}

function clearOrigin() {
  originSearch.value = ''
  origin.value = null
  originGeo.clearSearch()
  routeResult.value = null
}

function clearDestination() {
  destinationSearch.value = ''
  destination.value = null
  destGeo.clearSearch()
  routeResult.value = null
}

function selectGeocodedOrigin(place: GeocodedPlace) {
  origin.value = {
    name: place.name,
    lat: place.lat,
    lon: place.lon
  }
  originSearch.value = place.name
  showOriginDropdown.value = false
  originGeo.clearSearch()
}

function selectGeocodedDest(place: GeocodedPlace) {
  destination.value = {
    name: place.name,
    lat: place.lat,
    lon: place.lon
  }
  destinationSearch.value = place.name
  showDestinationDropdown.value = false
  destGeo.clearSearch()
}

function selectOrigin(dest: typeof popularDestinations[0]) {
  setOrigin(dest)
  originSearch.value = dest.name
  showOriginDropdown.value = false
  pickMode.value = null
  originGeo.clearSearch()
}

function selectDestination(dest: typeof popularDestinations[0]) {
  setDestination(dest)
  destinationSearch.value = dest.name
  showDestinationDropdown.value = false
  pickMode.value = null
  destGeo.clearSearch()
}

function swapLocations() {
  const tempSearch = originSearch.value
  originSearch.value = destinationSearch.value
  destinationSearch.value = tempSearch
  doSwap()
}

function setPickMode(mode: 'from' | 'to') {
  pickMode.value = pickMode.value === mode ? null : mode
  showOriginDropdown.value = false
  showDestinationDropdown.value = false
}

async function calculateRoute() {
  if (origin.value && destination.value) {
    await doCalculate()
  }
}

const calculatedFare = computed(() => {
  if (!routeResult.value) return {
    total: 0,
    breakdown: { first: 0, remaining: 0, distance: 0 },
    ranges: { typical: 0, high: 0, tourist: 0 },
    display: 'Rs. 0'
  }

  const distance = routeResult.value.distanceKm
  const firstKmCost = fareSettings.value.firstKmRate
  const remainingKm = Math.max(0, distance - 1)
  const remainingCost = remainingKm * fareSettings.value.perKmRate

  let totalRaw = firstKmCost + remainingCost

  if (fareSettings.value.nightMode) totalRaw *= 1.5

  if (selectedMode.value !== 'tuktuk') {
    totalRaw *= (modeMultipliers[selectedMode.value] || 1)
  }

  const total = Math.round(totalRaw / 10) * 10

  return {
    total,
    breakdown: {
      first: firstKmCost,
      remaining: Math.round(remainingCost),
      distance: distance
    },
    ranges: {
      typical: total,
      high: Math.round((total * 1.25) / 10) * 10,
      tourist: Math.round((total * 1.6) / 10) * 10
    },
    display: `Rs. ${total.toLocaleString()}`
  }
})

const recommendedOptions = computed(() => {
  if (!routeResult.value) return []
  
  const distance = routeResult.value.distanceKm
  
  return [
    {
      label: 'Train',
      subtitle: 'Most scenic option • 54m',
      cost: 'Rs. 157',
      icon: 'train',
      bgColor: 'bg-teal-deep/5',
      textColor: 'text-teal-deep'
    },
    {
      label: 'Express Bus',
      subtitle: 'Fast A/C coaches • 38m',
      cost: 'Rs. 251',
      icon: 'directions_bus',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Private Car',
      subtitle: 'Door-to-door comfort • 34m',
      cost: 'Rs. 2826',
      icon: 'directions_car',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    }
  ]
})

const popularRoutes = [
  { id: '1', from: 'Bandaranaike International Airport', to: 'Colombo', icon: 'flight_takeoff', title: 'Airport Transfer 45m', distance: '32 km', color: 'text-teal-deep' },
  { id: '2', from: 'Colombo', to: 'Ella', icon: 'landscape', title: 'Scenic Train 9h', distance: '200 km', color: 'text-coral-orange' },
  { id: '3', from: 'Colombo', to: 'Kandy', icon: 'directions_bus', title: 'Express Bus 3h', distance: '115 km', color: 'text-blue-600' },
  { id: '4', from: 'Colombo', to: 'Galle', icon: 'directions_car', title: 'Highway 1.5h', distance: '120 km', color: 'text-green-600' },
  { id: '5', from: 'Kandy', to: 'Sigiriya', icon: 'sunny', title: 'Day Trip 2.5h', distance: '90 km', color: 'text-yellow-600' }
]

function setPopularRoute(route: typeof popularRoutes[0]) {
  pickMode.value = null
  showFareGuard.value = false
  showScams.value = false

  const from = popularDestinations.find(d => d.name === route.from)
  const to = popularDestinations.find(d => d.name === route.to)

  if (from) {
    origin.value = { name: from.name, lat: from.lat, lon: from.lon }
    originSearch.value = from.name
  }

  if (to) {
    destination.value = { name: to.name, lat: to.lat, lon: to.lon }
    destinationSearch.value = to.name
  }
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)}m`
  }
  const hours = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

// Click outside directive
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1c4be;
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4a3b36;
}
</style>
