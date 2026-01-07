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
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-12 items-stretch">
        
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

          <!-- Popular Routes -->
          <div class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card border border-gray-100 dark:border-white/5 p-6">
              <div class="flex items-center gap-2 mb-4">
                <span class="material-symbols-outlined text-text-muted text-[16px]">trending_up</span>
                <h3 class="text-[10px] font-bold text-text-muted uppercase tracking-wider">Popular Routes</h3>
              </div>
              
              <div class="space-y-3">
                <div v-for="route in popularRoutes" :key="route.id" @click="setPopularRoute(route)" class="bg-background-light dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5 hover:border-teal-deep/30 cursor-pointer transition-all group">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined" :class="route.color">{{ route.icon }}</span>
                    <div>
                      <div class="text-xs font-bold text-text-main dark:text-white">{{ route.title }}</div>
                      <div class="text-[10px] text-text-muted">{{ route.from }} to {{ route.to }}</div>
                    </div>
                  </div>
                  <span class="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-text-muted mt-2 inline-block">{{ route.distance }}</span>
                </div>
              </div>
          </div>
        </div>


        <!-- Right Column - Map & Results -->
        <div class="flex-1 w-full space-y-6">
          
          <!-- Map -->
          <div class="relative w-full h-full min-h-[500px] bg-slate-50 rounded-2xl overflow-hidden shadow-inner border border-slate-200 group">
             <ClientOnly fallback-tag="div" fallback="Loading map...">
                <TransportMap
                    :origin="origin"
                    :destination="destination"
                    :polyline="routeResult?.polyline || []"
                    :mode="selectedMode"
                    :pick-mode="pickMode"
                    @select-location="handleMapClick"
                />
             </ClientOnly>
             
             <!-- Overlay Pick Badge -->
             <div v-if="pickMode" class="absolute top-4 left-1/2 -translate-x-1/2 z-[500]">
               <div class="bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold animate-bounce flex items-center gap-2">
                  <span class="material-symbols-outlined text-sm">touch_app</span>
                  Pick {{ pickMode === 'from' ? 'Origin' : 'Destination' }}
               </div>
             </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Collapsible Info Panel with Tabs -->
    <div 
      class="info-panel mx-6 sm:mx-8 lg:mx-12 xl:mx-16 2xl:mx-24 mb-12"
      :class="{ 'collapsed': !infoPanelExpanded }"
    >
      <!-- Tab Bar -->
      <div class="tab-bar flex border-b border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-surface-dark rounded-t-2xl overflow-hidden">
        <button 
          v-for="tab in infoTabs" 
          :key="tab.id"
          @click="activeTab = tab.id as 'routes' | 'tips' | 'phrases' | 'safety'"
          class="tab-button flex-1 h-14 flex items-center justify-center gap-2 text-sm font-medium transition-all border-b-2"
          :class="activeTab === tab.id 
            ? 'bg-white dark:bg-background-dark text-teal-deep border-teal-deep' 
            : 'text-text-muted border-transparent hover:text-teal-deep hover:bg-white/50 dark:hover:bg-white/5'"
        >
          <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
          <span class="hidden sm:inline">{{ tab.label }}</span>
        </button>
        
        <!-- Collapse Toggle -->
        <button 
          @click="infoPanelExpanded = !infoPanelExpanded"
          class="w-14 h-14 flex items-center justify-center border-l border-gray-200 dark:border-white/10 text-text-muted hover:text-teal-deep hover:bg-white/50 dark:hover:bg-white/5 transition-all"
          :aria-label="infoPanelExpanded ? 'Collapse panel' : 'Expand panel'"
        >
          <span class="material-symbols-outlined transition-transform" :class="infoPanelExpanded ? 'rotate-180' : ''">expand_more</span>
        </button>
      </div>
      
      <!-- Tab Content -->
      <div 
        v-if="infoPanelExpanded"
        class="tab-content bg-white dark:bg-surface-dark rounded-b-2xl shadow-card border border-t-0 border-gray-100 dark:border-white/5 p-6 md:p-8"
      >
        <transition name="slide-fade" mode="out-in">
          <!-- Routes & Fares Tab -->
          <div v-if="activeTab === 'routes'" class="space-y-6" key="routes">
            <div v-if="routeResult" class="grid md:grid-cols-2 gap-6">
              <!-- Fare Estimate Card -->
              <div class="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
                <div class="text-xs uppercase font-bold tracking-wider opacity-80 mb-1">Estimated Fare</div>
                <div class="text-4xl font-bold mb-3">{{ calculatedFare.display }}</div>
                <div class="flex gap-4 text-sm opacity-90">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-lg">straighten</span>
                    {{ routeResult.distanceKm.toFixed(1) }} km
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-lg">schedule</span>
                    {{ formatDuration(routeResult.durationMinutes) }}
                  </div>
                </div>
              </div>
              
              <!-- Route Options -->
              <div>
                <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Compare Options</h3>
                <div class="space-y-2">
                  <div 
                    v-for="option in recommendedOptions" 
                    :key="option.label"
                    class="flex items-center justify-between p-3 rounded-xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-teal-deep/30 cursor-pointer transition-all"
                  >
                    <div class="flex items-center gap-3">
                      <div :class="`size-10 rounded-full ${option.bgColor} flex items-center justify-center ${option.textColor}`">
                        <span class="material-symbols-outlined">{{ option.icon }}</span>
                      </div>
                      <div>
                        <div class="text-sm font-bold text-text-main dark:text-white">{{ option.label }}</div>
                        <div class="text-[10px] text-text-muted">{{ option.subtitle }}</div>
                      </div>
                    </div>
                    <div class="font-bold text-teal-deep">{{ option.cost }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-else class="text-center py-12">
              <span class="material-symbols-outlined text-5xl text-text-muted/40 mb-3 block">route</span>
              <p class="text-sm text-text-muted">Enter origin and destination to see fare estimates</p>
            </div>
            
            <!-- Standard Fare Reference -->
            <div class="bg-surface-light dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5">
              <div class="flex items-center gap-2 mb-3">
                <span class="material-symbols-outlined text-teal-deep text-lg">payments</span>
                <h4 class="text-xs font-bold text-text-muted uppercase tracking-wider">Standard Tuk-Tuk Fares</h4>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div class="flex justify-between items-center">
                  <span class="text-text-muted">First km</span>
                  <span class="font-bold text-text-main dark:text-white">Rs. 100</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-muted">Per km</span>
                  <span class="font-bold text-text-main dark:text-white">Rs. 60</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-muted">Waiting/hr</span>
                  <span class="font-bold text-text-main dark:text-white">Rs. 500</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-muted">Night</span>
                  <span class="font-bold text-coral-orange">+50%</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Travel Tips Tab -->
          <div v-else-if="activeTab === 'tips'" class="space-y-6" key="tips">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Quick Tips -->
              <div>
                <div class="flex items-center gap-2 mb-4">
                  <span class="material-symbols-outlined text-coral-orange text-lg">tips_and_updates</span>
                  <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider">Quick Tips</h3>
                </div>
                <div class="space-y-3">
                  <div class="flex items-start gap-3 p-3 bg-surface-light dark:bg-white/5 rounded-xl">
                    <span class="text-lg">✅</span>
                    <div class="text-sm text-text-main dark:text-white">Always agree on price <strong>before</strong> getting in</div>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-surface-light dark:bg-white/5 rounded-xl">
                    <span class="text-lg">📸</span>
                    <div class="text-sm text-text-main dark:text-white">Take a photo of the license plate</div>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-surface-light dark:bg-white/5 rounded-xl">
                    <span class="text-lg">🗺️</span>
                    <div class="text-sm text-text-main dark:text-white">Use Google Maps to track your route</div>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-surface-light dark:bg-white/5 rounded-xl">
                    <span class="text-lg">💵</span>
                    <div class="text-sm text-text-main dark:text-white">Keep small bills - drivers often claim no change</div>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-surface-light dark:bg-white/5 rounded-xl">
                    <span class="text-lg">🚫</span>
                    <div class="text-sm text-text-main dark:text-white">Avoid tuk-tuks that approach you first at tourist spots</div>
                  </div>
                </div>
              </div>
              
              <!-- Scam Warning -->
              <div>
                <div class="flex items-center gap-2 mb-4">
                  <span class="material-symbols-outlined text-orange-500 text-lg">warning</span>
                  <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider">Common Scams</h3>
                </div>
                <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/40 rounded-xl p-4 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors" @click="showScams = true">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="size-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <span class="material-symbols-outlined text-lg">report</span>
                      </div>
                      <div>
                        <h4 class="text-sm font-bold text-text-main dark:text-white">Tourist Scams to Avoid</h4>
                        <p class="text-xs text-text-muted">Tap to see safety tips for traveling</p>
                      </div>
                    </div>
                    <span class="material-symbols-outlined text-orange-400">chevron_right</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Phrases Tab -->
          <div v-else-if="activeTab === 'phrases'" class="space-y-6" key="phrases">
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-teal-deep text-lg">record_voice_over</span>
              <h3 class="text-xs font-bold text-text-muted uppercase tracking-wider">Negotiation Phrases</h3>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl border border-teal-100 dark:border-teal-900/30">
                <div class="text-xs font-bold text-teal-700 dark:text-teal-400 mb-2">🇱🇰 Ask Price</div>
                <div class="text-base font-medium text-text-main dark:text-white mb-1">"Mee-tara kee-yada?"</div>
                <div class="text-xs text-text-muted">How much to here?</div>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <div class="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">💰 Negotiate</div>
                <div class="text-base font-medium text-text-main dark:text-white mb-1">"Mee-tara [price] hari-da?"</div>
                <div class="text-xs text-text-muted">Is [price] okay for here?</div>
              </div>
              <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30">
                <div class="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">📱 Use Meter</div>
                <div class="text-base font-medium text-text-main dark:text-white mb-1">"Meter danna"</div>
                <div class="text-xs text-text-muted">Turn on the meter</div>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                <div class="text-xs font-bold text-green-700 dark:text-green-400 mb-2">🙏 Thank You</div>
                <div class="text-base font-medium text-text-main dark:text-white mb-1">"Istuti"</div>
                <div class="text-xs text-text-muted">Thank you</div>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30">
                <div class="text-xs font-bold text-purple-700 dark:text-purple-400 mb-2">🛑 Stop Here</div>
                <div class="text-base font-medium text-text-main dark:text-white mb-1">"Meh-he nawath-wanna"</div>
                <div class="text-xs text-text-muted">Stop here please</div>
              </div>
              <div class="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30">
                <div class="text-xs font-bold text-rose-700 dark:text-rose-400 mb-2">❌ Too Expensive</div>
                <div class="text-base font-medium text-text-main dark:text-white mb-1">"Ganan wadi"</div>
                <div class="text-xs text-text-muted">That's too expensive</div>
              </div>
            </div>
          </div>
          
          <!-- Safety Tab -->
          <div v-else-if="activeTab === 'safety'" class="space-y-6" key="safety">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Emergency Contacts -->
              <div class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-2xl p-6">
                <div class="flex items-center gap-2 mb-4">
                  <span class="material-symbols-outlined text-red-600 dark:text-red-400 text-lg">emergency</span>
                  <h4 class="text-xs font-bold text-text-muted uppercase tracking-wider">Emergency Contacts</h4>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center gap-3 p-3 bg-white dark:bg-black/20 rounded-xl">
                    <span class="text-2xl font-bold text-red-600 dark:text-red-400">119</span>
                    <span class="text-sm text-text-main dark:text-white">Police</span>
                  </div>
                  <div class="flex items-center gap-3 p-3 bg-white dark:bg-black/20 rounded-xl">
                    <span class="text-2xl font-bold text-red-600 dark:text-red-400">1912</span>
                    <span class="text-sm text-text-main dark:text-white">Tourist Police</span>
                  </div>
                  <div class="flex items-center gap-3 p-3 bg-white dark:bg-black/20 rounded-xl">
                    <span class="text-2xl font-bold text-red-600 dark:text-red-400">1990</span>
                    <span class="text-sm text-text-main dark:text-white">Ambulance</span>
                  </div>
                  <div class="flex items-center gap-3 p-3 bg-white dark:bg-black/20 rounded-xl">
                    <span class="text-2xl font-bold text-red-600 dark:text-red-400">1969</span>
                    <span class="text-sm text-text-main dark:text-white">Roadside Help</span>
                  </div>
                </div>
              </div>
              
              <!-- Safety Tips -->
              <div>
                <div class="flex items-center gap-2 mb-4">
                  <span class="material-symbols-outlined text-teal-deep text-lg">verified_user</span>
                  <h4 class="text-xs font-bold text-text-muted uppercase tracking-wider">Safety Tips</h4>
                </div>
                <div class="space-y-3">
                  <div class="flex items-start gap-3 p-3 bg-surface-light dark:bg-white/5 rounded-xl">
                    <span class="material-symbols-outlined text-teal-deep text-lg">share_location</span>
                    <div class="text-sm text-text-main dark:text-white">Share your live location with a trusted contact</div>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-surface-light dark:bg-white/5 rounded-xl">
                    <span class="material-symbols-outlined text-teal-deep text-lg">night_shelter</span>
                    <div class="text-sm text-text-main dark:text-white">Avoid traveling alone late at night</div>
                  </div>
                  <div class="flex items-start gap-3 p-3 bg-surface-light dark:bg-white/5 rounded-xl">
                    <span class="material-symbols-outlined text-teal-deep text-lg">credit_card</span>
                    <div class="text-sm text-text-main dark:text-white">Keep valuables hidden and secure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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

// Info Panel State
const activeTab = ref<'routes' | 'tips' | 'phrases' | 'safety'>('tips')
const infoPanelExpanded = ref(true)

const infoTabs = [
  { id: 'routes', label: 'Routes & Fares', icon: 'route' },
  { id: 'tips', label: 'Travel Tips', icon: 'tips_and_updates' },
  { id: 'phrases', label: 'Phrases', icon: 'record_voice_over' },
  { id: 'safety', label: 'Safety', icon: 'shield' }
]

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


function handleMapClick(loc: { lat: number; lon: number; name: string }) {
  if (pickMode.value === 'from') {
    origin.value = loc
    originSearch.value = loc.name
    pickMode.value = null
    // If not searching, ensure dropdown is closed
    showOriginDropdown.value = false
  } else if (pickMode.value === 'to') {
    destination.value = loc
    destinationSearch.value = loc.name
    pickMode.value = null
    showDestinationDropdown.value = false
  }
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
/* ============================================
   TRANSPORT PAGE - VISUAL CONSISTENCY FIXES
   CSS-only fixes without template modifications
   ============================================ */

/* 1. SCROLLING FIX (CRITICAL)
   ------------------------------------------ */
/* Remove all viewport height constraints */
.transport-container,
.main-content,
.content-wrapper {
  height: auto !important;
  min-height: calc(100vh - 73px);
}

/* Ensure no overflow hidden prevents scrolling */
:deep(.overflow-hidden) {
  overflow: visible !important;
}

/* Custom scrollbar styling */
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

/* 2. BUTTON STANDARDIZATION
   ------------------------------------------ */
/* All primary action buttons */
:deep(button),
:deep(.btn) {
  transition: all 0.2s ease !important;
}

/* Primary CTA button (Find Best Route) */
:deep(button[class*="bg-teal"]),
:deep(.bg-teal-deep) {
  background: linear-gradient(135deg, #2E7D5F 0%, #236B50 100%) !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  box-shadow: 0 4px 12px rgba(46, 125, 95, 0.25) !important;
}

:deep(button[class*="bg-teal"]:hover),
:deep(.bg-teal-deep:hover) {
  background: linear-gradient(135deg, #236B50 0%, #1a5f47 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 16px rgba(46, 125, 95, 0.35) !important;
}

/* Transport mode selector buttons */
:deep(button[class*="border-2"]) {
  height: 80px !important;
  transition: all 0.2s ease !important;
}

:deep(button[class*="border-teal"]) {
  border-color: #2E7D5F !important;
  background: rgba(46, 125, 95, 0.08) !important;
}

/* 3. FARE CARD VISUAL WEIGHT REDUCTION
   ------------------------------------------ */
/* Tone down the bright blue fare estimation card */
:deep([class*="bg-gradient-to-br"][class*="from-blue"]),
:deep(.bg-blue-500),
:deep(.from-blue-500) {
  background: linear-gradient(135deg, #2E7D5F 0%, #236B50 100%) !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(46, 125, 95, 0.25) !important;
}

/* Fare amount styling */
:deep(.text-4xl) {
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
}

/* Fare card action buttons */
:deep([class*="bg-white\\/10"]),
:deep([class*="bg-white\\/20"]) {
  backdrop-filter: blur(4px) !important;
  border-radius: 8px !important;
}

:deep([class*="bg-white\\/10"]:hover),
:deep([class*="bg-white\\/20"]:hover) {
  background: rgba(255, 255, 255, 0.25) !important;
}

/* 4. CONSISTENT CARD STYLING
   ------------------------------------------ */
/* All cards should have same border radius and shadow */
:deep(.rounded-2xl) {
  border-radius: 16px !important;
}

:deep(.rounded-xl) {
  border-radius: 12px !important;
}

:deep(.shadow-card) {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04) !important;
}

/* Card hover effects */
:deep([class*="hover\\:shadow"]) {
  transition: all 0.2s ease !important;
}

:deep([class*="hover\\:shadow"]:hover) {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  transform: translateY(-2px) !important;
}

/* Route option cards */
:deep(.route-card),
:deep([class*="flex items-center justify-between p-3"]) {
  border-radius: 12px !important;
  transition: all 0.2s ease !important;
}

:deep([class*="flex items-center justify-between p-3"]:hover) {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}

/* 5. SPACING SYSTEM (8px GRID)
   ------------------------------------------ */
/* Section spacing */
:deep(.space-y-6 > * + *) {
  margin-top: 24px !important;
}

:deep(.space-y-4 > * + *) {
  margin-top: 16px !important;
}

:deep(.space-y-3 > * + *) {
  margin-top: 12px !important;
}

:deep(.space-y-2 > * + *) {
  margin-top: 8px !important;
}

/* Padding consistency */
:deep(.p-6) {
  padding: 24px !important;
}

:deep(.p-4) {
  padding: 16px !important;
}

:deep(.p-3) {
  padding: 12px !important;
}

/* Gap consistency */
:deep(.gap-6) {
  gap: 24px !important;
}

:deep(.gap-4) {
  gap: 16px !important;
}

:deep(.gap-3) {
  gap: 12px !important;
}

:deep(.gap-2) {
  gap: 8px !important;
}

/* 6. FORM INPUT CONSISTENCY
   ------------------------------------------ */
/* All form inputs should match */
:deep(input[type="text"]),
:deep(input[type="search"]),
:deep(input[type="number"]),
:deep(select),
:deep(.input-field) {
  height: 48px !important;
  border-radius: 12px !important;
  font-size: 14px !important;
  transition: all 0.2s ease !important;
}

:deep(input:focus),
:deep(select:focus) {
  outline: none !important;
  border-color: #2E7D5F !important;
  box-shadow: 0 0 0 3px rgba(46, 125, 95, 0.15) !important;
}

/* Placeholder styling */
:deep(input::placeholder) {
  color: rgba(0, 0, 0, 0.4) !important;
}

:deep(.dark input::placeholder) {
  color: rgba(255, 255, 255, 0.4) !important;
}

/* 7. ICON CONSISTENCY
   ------------------------------------------ */
:deep(.material-symbols-outlined) {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24 !important;
}

/* Icon in buttons */
:deep(button .material-symbols-outlined) {
  font-size: 20px !important;
}

/* Large icons */
:deep(.text-5xl.material-symbols-outlined),
:deep(.material-symbols-outlined.text-5xl) {
  font-size: 48px !important;
}

/* 8. TYPOGRAPHY REFINEMENTS
   ------------------------------------------ */
/* Headers */
:deep(h1) {
  letter-spacing: -0.02em !important;
}

:deep(h2),
:deep(h3) {
  letter-spacing: -0.01em !important;
}

/* Small text labels - using font-size selector instead */
:deep([style*="font-size: 10px"]),
:deep(.uppercase.tracking-wider) {
  letter-spacing: 0.05em !important;
}

/* 9. ANIMATION SMOOTHNESS
   ------------------------------------------ */
:deep(.transition-all) {
  transition-duration: 200ms !important;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.animate-spin) {
  animation: spin 1s linear infinite !important;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 10. MODAL BACKDROP
   ------------------------------------------ */
:deep(.backdrop-blur-sm) {
  backdrop-filter: blur(8px) !important;
}

/* 11. POPULAR ROUTES CARD HOVER
   ------------------------------------------ */
:deep(button[class*="w-full text-left p-3"]) {
  transition: all 0.2s ease !important;
}

:deep(button[class*="w-full text-left p-3"]:hover) {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(46, 125, 95, 0.12) !important;
  border-color: rgba(46, 125, 95, 0.3) !important;
}

/* 12. NEGOTIATION PHRASES CARDS
   ------------------------------------------ */
:deep(.bg-teal-50),
:deep(.bg-blue-50),
:deep(.bg-amber-50) {
  border-radius: 12px !important;
}

/* 13. MAP CONTAINER
   ------------------------------------------ */
:deep(.leaflet-container) {
  border-radius: 16px !important;
}

/* 14. DARK MODE REFINEMENTS
   ------------------------------------------ */
:deep(.dark .bg-surface-dark) {
  background: #1F1612 !important;
}

/* 15. SELECTION STYLING
   ------------------------------------------ */
::selection {
  background: rgba(46, 125, 95, 0.2);
  color: inherit;
}

::-moz-selection {
  background: rgba(46, 125, 95, 0.2);
  color: inherit;
}

/* 16. INFO PANEL TRANSITIONS
   ------------------------------------------ */
.info-panel {
  transition: all 0.3s ease;
}

.info-panel.collapsed .tab-content {
  max-height: 0;
  padding: 0;
  overflow: hidden;
}

/* Tab content slide animation */
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Tab button active indicator animation */
.tab-button {
  position: relative;
}

.tab-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: #2E7D5F;
  transition: all 0.2s ease;
  transform: translateX(-50%);
}

.tab-button:hover::after {
  width: 30%;
}

/* Collapse toggle rotation */
.rotate-180 {
  transform: rotate(180deg);
}
</style>
