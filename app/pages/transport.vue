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
                <div class="relative flex items-center transition-all duration-200" :class="{ 'scale-[1.02]': inputFocused === 'origin' }">
                  <input 
                    v-model="journeyState.origin"
                    @focus="() => { showOriginDropdown = true; inputFocused = 'origin' }"
                    @blur="inputFocused = null"
                    class="w-full pl-4 pr-10 py-3 rounded-lg bg-background-light dark:bg-[#2d1f1a] border-none text-sm text-text-main dark:text-white placeholder:text-text-muted/60 transition-all border border-transparent focus:border-teal-deep focus:ring-4 focus:ring-teal-deep/10"
                    :class="{ 'border-teal-deep/50': journeyState.origin }" 
                    type="text" 
                    placeholder="Enter origin..."
                  />
                  
                  <div class="absolute right-2 flex items-center gap-1">
                    <transition name="scale-in">
                        <span v-if="origin" class="material-symbols-outlined text-teal-500 text-[18px]">check_circle</span>
                    </transition>
                    
                    <button 
                        v-if="journeyState.origin"
                        @click="() => { journeyState.origin = ''; originGeo.clearSearch(); }"
                        class="p-1 text-text-muted hover:text-teal-deep rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                        <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>

                  <button 
                    @click="setPickMode('from')"
                    class="p-2 text-text-muted hover:text-teal-deep rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group shrink-0"
                    title="Pick on map"
                  >
                    <span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">map</span>
                  </button>
                  
                  <!-- Dropdown -->
                  <div v-if="showOriginDropdown" v-click-outside="() => showOriginDropdown = false" class="absolute z-50 w-full mt-2 top-full bg-white dark:bg-surface-dark rounded-xl shadow-xl ring-1 ring-slate-900/5 max-h-64 overflow-auto">
                    <div v-if="originGeo.isSearching.value" class="p-4 text-center text-sm text-text-muted">
                      <span class="inline-block w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-2"></span>
                      Locating...
                    </div>
                    <template v-else-if="journeyState.origin.length >= 2">
                      <button
                        v-for="place in originGeo.searchResults.value"
                        :key="place.id"
                        @click="handleOriginSelect(place)"
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
                <div class="relative flex items-center transition-all duration-200" :class="{ 'scale-[1.02]': inputFocused === 'destination' }">
                  <input 
                    v-model="journeyState.destination"
                    @focus="() => { showDestinationDropdown = true; inputFocused = 'destination' }"
                    @blur="inputFocused = null"
                    class="w-full pl-4 pr-10 py-3 rounded-lg bg-background-light dark:bg-[#2d1f1a] border-none text-sm text-text-main dark:text-white placeholder:text-text-muted/60 transition-all border border-transparent focus:border-teal-deep focus:ring-4 focus:ring-teal-deep/10"
                    :class="{ 'border-teal-deep/50': journeyState.destination }"
                    type="text" 
                    placeholder="Enter destination..."
                  />
                  
                  <div class="absolute right-2 flex items-center gap-1">
                    <transition name="scale-in">
                        <span v-if="destination" class="material-symbols-outlined text-teal-500 text-[18px]">check_circle</span>
                    </transition>

                    <button 
                        v-if="journeyState.destination"
                        @click="() => { journeyState.destination = ''; destGeo.clearSearch(); }"
                        class="p-1 text-text-muted hover:text-teal-deep rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                        <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>

                  <button 
                    @click="setPickMode('to')"
                    class="p-2 text-text-muted hover:text-teal-deep rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group shrink-0"
                    title="Pick on map"
                  >
                    <span class="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">flag</span>
                  </button>
                  
                  <!-- Dropdown -->
                  <div v-if="showDestinationDropdown" v-click-outside="() => showDestinationDropdown = false" class="absolute z-50 w-full mt-2 top-full bg-white dark:bg-surface-dark rounded-xl shadow-xl ring-1 ring-slate-900/5 max-h-64 overflow-auto">
                    <div v-if="destGeo.isSearching.value" class="p-4 text-center text-sm text-text-muted">Loading...</div>
                    <template v-else-if="journeyState.destination.length >= 2">
                      <button
                        v-for="place in destGeo.searchResults.value"
                        :key="place.id"
                        @click="handleDestSelect(place)"
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
            <!-- Find Route Button -->
            <button 
              @click="handleSearch"
              :disabled="!origin || !destination || isRouteLoading"
              class="w-full py-3.5 bg-teal-light hover:bg-teal-deep text-white font-bold text-sm rounded-full shadow-lg shadow-teal-deep/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 relative overflow-hidden group"
            >
              <div v-if="isSearching" class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                <span>Calculating...</span>
              </div>
              <div v-else class="flex items-center gap-2 group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[20px]">directions</span>
                <span>Find Best Route</span>
              </div>
            </button>
          </div>
          
          <!-- Search Error Message -->
          <transition name="slide-down">
             <div v-if="searchError" class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-xs font-bold flex items-center gap-2 mb-4 border border-red-100 dark:border-red-900/30">
                <span class="material-symbols-outlined text-sm">error</span>
                {{ searchError }}
             </div>
          </transition>

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
          <div 
            class="map-container relative w-full h-full min-h-[500px] bg-slate-50 rounded-2xl overflow-hidden shadow-inner border border-slate-200 group transition-all duration-300"
            @touchstart.passive="mapTouchStart"
            @touchend="mapTouchEnd"
          >
             <ClientOnly fallback-tag="div" fallback="Loading map...">
                <TransportMap
                    :origin="mapOrigin"
                    :destination="mapDestination"
                    :polyline="resultsState.routes?.polyline || []"
                    :mode="undefined"
                    :pick-mode="pickMode"
                    @select-location="handleMapClick"
                />
             </ClientOnly>
             
             <!-- Mobile Map Interaction Overlay Button -->
             <button 
                v-if="!uiState.showMap"
                @click.stop="uiState.showMap = true"
                class="map-overlay-button md:hidden flex items-center gap-2 px-4 py-2 bg-white text-teal-deep rounded-full border border-teal-deep/20 font-medium text-sm shadow-lg backdrop-blur-sm"
             >
                <span class="material-symbols-outlined text-[18px]">touch_app</span>
                Tap to interact
             </button>
             
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
          @click="uiState.activeTab = tab.id as any"
          class="tab-button flex-1 h-14 flex items-center justify-center gap-2 text-sm font-medium transition-all border-b-2"
          :class="uiState.activeTab === tab.id 
            ? 'bg-white dark:bg-background-dark text-teal-deep border-teal-deep' 
            : 'text-text-muted border-transparent hover:text-teal-deep hover:bg-white/50 dark:hover:bg-white/5'"
        >
          <span class="material-symbols-outlined text-lg">{{ tab.icon }}</span>
          <span class="hidden sm:inline">{{ tab.label }}</span>
        </button>
        
        <!-- Collapse Toggle -->
        <button 
          @click="uiState.infoPanelExpanded = !uiState.infoPanelExpanded"
          class="w-14 h-14 flex items-center justify-center border-l border-gray-200 dark:border-white/10 text-text-muted hover:text-teal-deep hover:bg-white/50 dark:hover:bg-white/5 transition-all"
          :aria-label="uiState.infoPanelExpanded ? 'Collapse panel' : 'Expand panel'"
        >
          <span class="material-symbols-outlined transition-transform" :class="uiState.infoPanelExpanded ? 'rotate-180' : ''">expand_more</span>
        </button>
      </div>
      
      <!-- Tab Content -->
      <div 
        v-if="uiState.infoPanelExpanded"
        class="tab-content bg-white dark:bg-surface-dark rounded-b-2xl shadow-card border border-t-0 border-gray-100 dark:border-white/5 p-6 md:p-8"
      >
        <transition name="slide-fade" mode="out-in">
          <!-- Routes & Fares Tab -->
          <div v-if="uiState.activeTab === 'routes'" class="space-y-6" key="routes">
            <!-- Loading State -->
            <div v-if="isRouteLoading">
              <RouteSkeleton />
              <RouteSkeleton />
            </div>

            <div v-else-if="routeResult" class="grid md:grid-cols-2 gap-6">
              <!-- Fare Estimate Card -->
              <div class="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
                <div class="text-xs uppercase font-bold tracking-wider opacity-80 mb-1">Estimated Fare</div>
                <div class="text-4xl font-bold mb-3 flex items-baseline gap-1">
                   Rs. <AnimatedNumber :value="calculatedFare.total" :duration="1500" />
                </div>
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
                
                <button 
                  @click="showFareGuard = true"
                  class="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-white/20"
                >
                  <span class="material-symbols-outlined text-sm">shield_person</span>
                  Fair Estimate Check
                </button>
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
            <!-- Empty State -->
            <div v-else class="text-center py-12 px-4">
              <div v-if="!journeyState.origin && !journeyState.destination" class="flex flex-col items-center">
                 <div class="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4">
                    <span class="material-symbols-outlined text-3xl">map</span>
                 </div>
                 <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">Ready to plan your journey?</h3>
                 <p class="text-sm text-text-muted max-w-xs mx-auto">Enter your origin and destination above to see the best routes and fare estimates.</p>
              </div>
              <div v-else class="flex flex-col items-center">
                 <div class="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center text-text-muted mb-4">
                    <span class="material-symbols-outlined text-3xl">wrong_location</span>
                 </div>
                 <h3 class="text-lg font-bold text-text-main dark:text-white mb-2">No routes found</h3>
                 <p class="text-sm text-text-muted max-w-xs mx-auto">We couldn't find a route between these locations. Try selecting a different destination.</p>
              </div>
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
          <div v-else-if="uiState.activeTab === 'tips'" class="space-y-6" key="tips">
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
                <div class="space-y-3">
                  <!-- Meter Scam -->
                  <div class="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div class="shrink-0 size-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 text-lg">
                      📟
                    </div>
                    <div>
                      <h4 class="font-bold text-text-main dark:text-white text-xs mb-1">"Meter Broken" or "No Meter"</h4>
                      <p class="text-[10px] text-text-muted leading-relaxed mb-1.5">
                        Driver claims meter is broken or missing, then quotes a high fixed price.
                      </p>
                      <div class="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                        Solution: Insist on a metered tuk-tuk.
                      </div>
                    </div>
                  </div>

                  <!-- Closed Hotel Scam -->
                  <div class="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div class="shrink-0 size-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-lg">
                      🏨
                    </div>
                    <div>
                      <h4 class="font-bold text-text-main dark:text-white text-xs mb-1">"Hotel Closed" / "Road Closed"</h4>
                      <p class="text-[10px] text-text-muted leading-relaxed mb-1.5">
                        Driver claims your destination is closed to take you elsewhere for commission.
                      </p>
                      <div class="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                        Solution: Check Google Maps, insist on original drop-off.
                      </div>
                    </div>
                  </div>

                  <!-- Festival Scam -->
                  <div class="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div class="shrink-0 size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg">
                      🎉
                    </div>
                    <div>
                      <h4 class="font-bold text-text-main dark:text-white text-xs mb-1">"Special Festival Today"</h4>
                      <p class="text-[10px] text-text-muted leading-relaxed mb-1.5">
                        Tells you about a fake "one-day only" festival to detour you to shops.
                      </p>
                      <div class="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                        Solution: Politely decline and stick to the plan.
                      </div>
                    </div>
                  </div>

                  <!-- Change Scam -->
                  <div class="flex gap-4 p-4 rounded-xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div class="shrink-0 size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-lg">
                      🪙
                    </div>
                    <div>
                      <h4 class="font-bold text-text-main dark:text-white text-xs mb-1">"No Change"</h4>
                      <p class="text-[10px] text-text-muted leading-relaxed mb-1.5">
                        Driver claims no change for big notes to keep the difference.
                      </p>
                      <div class="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                        Solution: Carry small notes (Rs. 100, 50).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Phrases Tab -->
          <div v-else-if="uiState.activeTab === 'phrases'" class="space-y-6" key="phrases">
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
              <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 flex flex-col justify-between">
                <div>
                  <div class="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">📱 Use Meter</div>
                  <div class="text-base font-medium text-text-main dark:text-white mb-1">"Meter danna"</div>
                  <div class="text-xs text-text-muted">Turn on the meter</div>
                </div>
                <button 
                  @click="showFareGuard = true"
                  class="mt-3 w-full py-1.5 bg-white/50 hover:bg-white/80 dark:bg-black/10 dark:hover:bg-black/20 rounded-lg text-[10px] font-bold text-amber-800 dark:text-amber-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span class="material-symbols-outlined text-[14px]">shield_person</span>
                  Tips
                </button>
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
          <div v-else-if="uiState.activeTab === 'safety'" class="space-y-6" key="safety">
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
import { ref, computed, watch, onMounted, onUnmounted, nextTick, reactive } from 'vue'
import RouteSkeleton from '~/components/Transport/RouteSkeleton.vue'
import { useNotifications } from '~/composables/useNotifications'

import { useTransportSearch } from '~/composables/useTransportSearch'
import { popularDestinations } from '~/composables/useTransportRoutes'
import { useGeocode, type GeocodedPlace } from '~/composables/useGeocode'

// SEO
useHead({
  title: 'Transport Assistant - CeylonGuide',
  meta: [
    { name: 'description', content: 'Plan your journey in Sri Lanka with fair pricing, route planning, and scam protection.' }
  ]
})

// Centralized State
const {
  journeyState,
  searchState,
  resultsState,
  uiState,
  validationState,
  canSearch,
  hasResults,
  sortedOptions,
  cheapestRoute,
  fastestRoute,
  performSearch: originalPerformSearch,
  selectRoute,
  resetForm,
  addToSearchHistory,
  mapOrigin,
  mapDestination
} = useTransportSearch()

// const { isRouteLoading, routeResult } = useTransportRoutes() // Removed to avoid duplicates with existing computed props
const { show: showNotification } = useNotifications()

// --- Performance Monitoring ---
const performanceMetrics = reactive({
  searchTime: 0
})

const performSearch = async () => {
  const start = performance.now()
  try {
    await originalPerformSearch()
  } catch (err) {
    showNotification('Search failed. Please try again.', 'error')
  } finally {
    const end = performance.now()
    performanceMetrics.searchTime = end - start
    if (performanceMetrics.searchTime > 2000) {
      console.warn('Long search detected:', performanceMetrics.searchTime, 'ms')
    }
  }
}

// Monitor long tasks
let longTaskObserver: PerformanceObserver | null = null

onMounted(() => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            // Log silently
          }
        }
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    } catch (e) {
      // Observer not supported
    }
  }
})

onUnmounted(() => {
  longTaskObserver?.disconnect()
})

// Geocoding (kept separate as it drives the autocomplete UI)
const originGeo = useGeocode()
const destGeo = useGeocode()

// Local UI state (specific to dropdown interactions, etc.)
const showOriginDropdown = ref(false)
const showDestinationDropdown = ref(false)
const showAdvanced = ref(false)
const showFareGuard = ref(false)
const showScams = ref(false)
const pickMode = ref<'from' | 'to' | null>(null)

// UI Interaction State (Restored)
const inputFocused = ref<'origin' | 'destination' | null>(null)
const hoveredOption = ref<string | null>(null)
const selectedMode = computed({
  get: () => journeyState.transportMode.toLowerCase(),
  set: (val: any) => journeyState.transportMode = val.toUpperCase()
})
const origin = computed(() => journeyState.origin) // Proxy for template check
const destination = computed(() => journeyState.destination) // Proxy for template check
const routeResult = computed(() => resultsState.routes) // Proxy for legacy template parts


// Watchers for Autocomplete
watch(() => journeyState.origin, (val) => {
  if (val && !validationState.originError) {
      // If manually typed, we might want to trigger search
      originGeo.searchPlaces(val)
  }
})

watch(() => journeyState.destination, (val) => {
  if (val && !validationState.destinationError) {
      destGeo.searchPlaces(val)
  }
})

// Map Selection Handler
const handleMapClick = (location: { lat: number; lon: number; name?: string }) => {
  if (pickMode.value === 'from') {
    journeyState.origin = location.name || `${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`
    mapOrigin.value = { 
        name: location.name || 'Selected Location',
        lat: location.lat,
        lon: location.lon
    }
    showOriginDropdown.value = false
    pickMode.value = null
  } else if (pickMode.value === 'to') {
    journeyState.destination = location.name || `${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`
    mapDestination.value = { 
        name: location.name || 'Selected Location',
        lat: location.lat,
        lon: location.lon
    }
    showDestinationDropdown.value = false
    pickMode.value = null
  }
}

// Input Handlers
const handleOriginSelect = (place: GeocodedPlace) => {
    journeyState.origin = place.displayName
    showOriginDropdown.value = false
}

const handleDestSelect = (place: GeocodedPlace) => {
    journeyState.destination = place.displayName
    showDestinationDropdown.value = false
}

const setPickMode = (mode: 'from' | 'to') => {
    pickMode.value = mode
    uiState.showMap = true
    // Scroll to map on mobile?
}

const handleSearch = async () => {
    if (!canSearch.value) return;
    await performSearch()
    // Auto scroll to results check is in the composable's watcher or here
}

const swapLocations = () => {
    const temp = journeyState.origin
    journeyState.origin = journeyState.destination
    journeyState.destination = temp
}

import AnimatedNumber from '~/components/Shared/AnimatedNumber.vue'

// UI Constants
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

const modeMultipliers: Record<string, number> = {
  tuktuk: 1.0,
  taxi: 1.4,
  bus: 0.15,
  train: 0.12
}

const fareSettings = ref({
  firstKmRate: 100,
  perKmRate: 60,
  minFare: 150,
  nightMode: false
})

const popularRoutes = [
  { id: '1', from: 'Bandaranaike International Airport', to: 'Colombo', icon: 'flight_takeoff', title: 'Airport Transfer 45m', distance: '32 km', color: 'text-teal-deep' },
  { id: '2', from: 'Colombo', to: 'Ella', icon: 'landscape', title: 'Scenic Train 9h', distance: '200 km', color: 'text-coral-orange' },
  { id: '3', from: 'Colombo', to: 'Kandy', icon: 'directions_bus', title: 'Express Bus 3h', distance: '115 km', color: 'text-blue-600' },
  { id: '4', from: 'Colombo', to: 'Galle', icon: 'directions_car', title: 'Highway 1.5h', distance: '120 km', color: 'text-green-600' },
  { id: '5', from: 'Kandy', to: 'Sigiriya', icon: 'sunny', title: 'Day Trip 2.5h', distance: '90 km', color: 'text-yellow-600' }
]

// Adapted Computed Properties
const calculatedFare = computed(() => {
  if (!resultsState.routes) return {
    total: 0,
    breakdown: { first: 0, remaining: 0, distance: 0 },
    ranges: { typical: 0, high: 0, tourist: 0 },
    display: 'Rs. 0'
  }

  const distance = resultsState.routes.distanceKm
  const firstKmCost = fareSettings.value.firstKmRate
  const remainingKm = Math.max(0, distance - 1)
  const remainingCost = remainingKm * fareSettings.value.perKmRate

  let totalRaw = firstKmCost + remainingCost

  if (fareSettings.value.nightMode) totalRaw *= 1.5

  const mode = resultsState.selectedRoute?.mode || 'tuktuk'
  if (mode !== 'tuktuk') {
    totalRaw *= (modeMultipliers[mode] || 1)
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

function setPopularRoute(route: typeof popularRoutes[0]) {
  pickMode.value = null
  showFareGuard.value = false
  showScams.value = false
  
  // Set in centralized state
  // We need to resolve Name to Lat/Lon if possible, or just set name for geocoding
  // Based on old logic, popularDestinations has the data
  
  const from = popularDestinations.find(d => d.name === route.from)
  const to = popularDestinations.find(d => d.name === route.to)

  if (from) {
      journeyState.origin = from.name
      // If we need lat/lon in pure state, we should add it:
      // But journeyState only has string origin/dest. 
      // The composable watchers will trigger logic if needed.
  }
  
  if (to) {
      journeyState.destination = to.name
  }
  
  // Trigger search if both valid? 
  // Let user click search or trigger it manually
  if (from && to) {
      performSearch()
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



// UI State & Helpers (Restored for template compatibility)
const infoPanelExpanded = computed({
  get: () => uiState.infoPanelExpanded,
  set: (val) => uiState.infoPanelExpanded = val
})

const isSearching = computed(() => searchState.isSearching)
const searchError = computed(() => searchState.error)

// Re-implement recommendedOptions using resultsState or fallback
const recommendedOptions = computed(() => {
  if (!resultsState.routes) return []
  
  // Start with all options
  let options = [...resultsState.routes.options]
  
  // Format them for the UI card if needed, or if the template expects specific fields
  // The template expects: id, label, subtitle, cost, icon, bgColor, textColor
  // Our RouteOptions have similar fields but we might need to map them to visual styles
  
  return options.map(opt => {
     let bgColor = 'bg-gray-50 dark:bg-white/5'
     let textColor = 'text-gray-600'
     
     if (opt.mode === 'train') {
         bgColor = 'bg-teal-deep/5'
         textColor = 'text-teal-deep'
     } else if (opt.mode === 'bus') {
         bgColor = 'bg-blue-50 dark:bg-blue-900/20'
         textColor = 'text-blue-600 dark:text-blue-400'
     } else if (opt.mode === 'taxi') {
         bgColor = 'bg-yellow-50 dark:bg-yellow-900/20'
         textColor = 'text-yellow-600 dark:text-yellow-400'
     }
     
     return {
         ...opt,
         id: opt.mode, // template uses :key="option.id"
         subtitle: opt.description, // template uses option.subtitle
         bgColor,
         textColor
     }
  })
})

function selectOrigin(dest: typeof popularDestinations[0]) {
  journeyState.origin = dest.name
  performSearch() // Optional: trigger search immediately or just set value
}

function selectDestination(dest: typeof popularDestinations[0]) {
  journeyState.destination = dest.name
  performSearch()
}

// Alias for template compatibility
const isRouteLoading = computed(() => searchState.isSearching)


// Map & Touch Interaction State
const isMapActive = ref(false)
const touchStartY = ref(0)
const touchCurrentY = ref(0)
const isDragging = ref(false)
let touchTimer: any

// Map Interaction Handlers
function handleMapInteraction(active: boolean) {
  isMapActive.value = active
  if (active) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function mapTouchStart() {
  touchTimer = setTimeout(() => {
    handleMapInteraction(true)
  }, 200)
}

function mapTouchEnd() {
  clearTimeout(touchTimer)
  handleMapInteraction(false)
}

// Info Panel Touch Handlers
function handleTouchStart(e: TouchEvent) {
  // Only handle drag on mobile
  if (window.innerWidth >= 768) return
  
  const target = e.target as HTMLElement
  // Allow scrolling in content if expanded
  if (infoPanelExpanded.value && target.closest('.tab-content')) {
     const content = target.closest('.tab-content')
     if (content && content.scrollTop > 0) return
  }
  
  const touch = e.touches[0]
  if (touch) {
    touchStartY.value = touch.clientY
    isDragging.value = true
  }
}

function handleTouchMove(e: TouchEvent) {
  if (!isDragging.value || e.touches.length === 0) return
  
  const touch = e.touches[0]
  if (!touch) return
  
  touchCurrentY.value = touch.clientY
  const diff = touchCurrentY.value - touchStartY.value
  
  // Swipe down to collapse
  if (diff > 50 && infoPanelExpanded.value) {
    infoPanelExpanded.value = false
    isDragging.value = false
  }
  // Swipe up to expand
  else if (diff < -50 && !infoPanelExpanded.value) {
    infoPanelExpanded.value = true
    isDragging.value = false
  }
}

function handleTouchEnd() {
  isDragging.value = false
}

// Global click/touch listener to deactivate map when touching elsewhere
function handleGlobalTouch(e: Event) {
  if (isMapActive.value) {
    const target = e.target as HTMLElement
    if (!target.closest('.map-container')) {
      handleMapInteraction(false)
    }
  }
}

onMounted(() => {
  // Add listeners for info panel
  const panel = document.querySelector('.info-panel')
  panel?.addEventListener('touchstart', handleTouchStart as any, { passive: true })
  panel?.addEventListener('touchmove', handleTouchMove as any, { passive: true })
  panel?.addEventListener('touchend', handleTouchEnd as any)
  
  document.addEventListener('touchstart', handleGlobalTouch as any, { passive: true })
})

onUnmounted(() => {
  const panel = document.querySelector('.info-panel')
  panel?.removeEventListener('touchstart', handleTouchStart as any)
  panel?.removeEventListener('touchmove', handleTouchMove as any)
  panel?.removeEventListener('touchend', handleTouchEnd as any)
  
  document.removeEventListener('touchstart', handleGlobalTouch as any)
})
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

/* =========================================
   RESPONSIVE LAYOUT & MOBILE OPTIMIZATION
   ========================================= */

/* MOBILE LAYOUT (< 768px) */
@media (max-width: 767px) {
  /* Info panel becomes bottom sheet */
  .info-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    margin: 0 !important; /* Override standard margin */
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    max-height: 85vh;
  }

  .info-panel.collapsed {
    max-height: 60px; /* Only show tab bar */
  }

  /* Make panel visually draggable */
  .tab-bar::before {
    content: '';
    width: 40px;
    height: 4px;
    background: #E2E8F0;
    border-radius: 2px;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  
  /* Larger tap targets for mobile */
  .tab-button {
    min-height: 56px;
  }

  /* Hide tab label text on mobile to save space */
  .tab-button span:not(.material-symbols-outlined) {
    display: none;
  }
  
  /* Map container fixed height on mobile */
  .map-container {
    height: 400px;
  }
  
  /* Ensure content is scrollable within sheet */
  .tab-content {
    max-height: calc(85vh - 60px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 40px; /* Safety padding */
  }
}

/* TABLET LAYOUT (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Info panel grid placement */
  .info-panel {
    margin-top: 24px;
    border-radius: 16px;
    position: relative;
    z-index: 90;
  }
  
  /* Show tab labels */
  .tab-button span:not(.material-symbols-outlined) {
    display: inline;
    font-size: 13px;
  }
  
  .map-container {
     height: 500px;
  }
}

/* DESKTOP LAYOUT (1024px+) */
@media (min-width: 1024px) {
  /* Sticky sidebar behavior handled by parent flex/grid */
  
  /* Info panel style */
  .info-panel {
    margin-top: 32px;
    border-radius: 16px;
    overflow: visible; /* Allow popups/tooltips */
  }
  
  /* Full tab labels */
  .tab-button span:not(.material-symbols-outlined) {
    display: inline;
    font-size: 14px;
  }
  
  /* Map height handled by utility classes, but min-height enforced */
  .map-container {
    min-height: 600px;
  }
}

/* Map Interaction Overlay Button */
.map-overlay-button {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 400; /* Above Leaflet controls */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

/* Landscape Mobile Fixes */
@media (max-width: 767px) and (orientation: landscape) {
  .info-panel {
    max-height: 60vh;
  }
  
  .tab-content {
    max-height: calc(60vh - 60px);
  }
  
  .map-container {
    height: 100vh; /* Full screen map preference in landscape */
  }
}
</style>
