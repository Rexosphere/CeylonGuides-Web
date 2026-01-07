<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-800 pb-20">
    
    <!-- Page Header (Compact) -->
    <div class="bg-gradient-to-b from-slate-50 to-white pt-10 pb-6 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        <!-- Pill Badge -->
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100 mb-4 shadow-sm">
          Transport & Routes
        </span>
        
        <!-- Title -->
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 mb-2">
          Transport Assistant
        </h1>
        
        <!-- Subtitle -->
        <p class="text-slate-500 font-medium text-sm flex items-center gap-2">
          Plan smart <span class="w-1 h-1 rounded-full bg-slate-300"></span> Avoid scams <span class="w-1 h-1 rounded-full bg-slate-300"></span> Fair fares
        </p>

      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      <!-- Layout Grid (2 Columns on Desktop) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- LEFT COLUMN - ROUTE FORM (Consolidated Card) -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow space-y-8 sticky top-8">
            
            <!-- Header -->
            <div class="flex items-center gap-3 pb-6 border-b border-slate-100">
               <div class="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                  <span class="material-symbols-outlined text-xl">alt_route</span>
               </div>
               <div>
                  <h2 class="font-bold text-lg text-slate-900">Plan Your Journey</h2>
                  <p class="text-sm text-slate-500">Calculate fair rates for any trip</p>
               </div>
            </div>

            <!-- SECTION: FROM/TO INPUTS -->
            <div class="space-y-4">
               <!-- From -->
               <div class="relative z-20">
                  <label class="text-xs font-medium text-slate-700 uppercase tracking-wide mb-2 block">Origin</label>
                  <div class="flex gap-2">
                    <div class="flex-1 relative">
                       <input
                          v-model="originSearch"
                          @input="handleOriginInput"
                          @focus="showOriginDropdown = true"
                          placeholder="Where are you starting?"
                          class="w-full px-4 py-3 text-sm font-medium border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-all placeholder:text-slate-400 text-slate-900"
                        />
                       <button 
                          v-if="originSearch"
                          @click="clearOrigin"
                          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-slate-100 transition-colors"
                        >
                          <span class="material-symbols-outlined text-sm font-bold">close</span>
                        </button>
                        
                        <!-- Dropdown -->
                        <div v-if="showOriginDropdown" class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 max-h-64 overflow-auto scrollbar-thin">
                           <div v-if="originGeo.isSearching.value" class="p-4 text-center text-sm text-slate-500">
                              <span class="inline-block w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-2"></span>
                              Locating...
                           </div>
                           <template v-else-if="originSearch.length >= 2">
                              <button
                                v-for="place in originGeo.searchResults.value"
                                :key="place.id"
                                @click="selectGeocodedOrigin(place)"
                                class="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 flex items-start gap-3 border-b border-slate-50 last:border-0 transition-colors"
                              >
                                <span class="mt-0.5 text-slate-400 material-symbols-outlined text-lg">location_on</span>
                                <div>
                                  <div class="font-semibold text-slate-900">{{ place.name }}</div>
                                  <div class="text-xs text-slate-500">{{ place.area }}</div>
                                </div>
                              </button>
                              <div v-if="originGeo.searchResults.value.length === 0" class="p-4 text-center text-sm text-slate-500">
                                No locations found
                              </div>
                           </template>
                           <template v-else>
                              <div class="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-50/50">Popular</div>
                              <button v-for="dest in popularDestinations.slice(0,5)" :key="dest.id" @click="selectOrigin(dest)" class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2">
                                 <span>{{ dest.name }}</span>
                              </button>
                           </template>
                        </div>
                    </div>
                    <button @click="setPickMode('from')" :class="pickMode === 'from' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'" class="p-3 rounded-xl transition-colors">
                       <span class="material-symbols-outlined">map</span>
                    </button>
                  </div>
               </div>

               <!-- Swap -->
               <div class="flex justify-center -my-3 relative z-10">
                  <button @click="swapLocations" class="bg-white border border-slate-200 p-2 rounded-full text-slate-400 hover:text-teal-600 hover:border-teal-200 shadow-sm transition-all hover:rotate-180">
                     <span class="material-symbols-outlined">swap_vert</span>
                  </button>
               </div>

               <!-- To -->
               <div class="relative z-10">
                  <label class="text-xs font-medium text-slate-700 uppercase tracking-wide mb-2 block">Destination</label>
                  <div class="flex gap-2">
                    <div class="flex-1 relative">
                       <input
                          v-model="destinationSearch"
                          @input="handleDestinationInput"
                          @focus="showDestinationDropdown = true"
                          placeholder="Where are you going?"
                          class="w-full px-4 py-3 text-sm font-medium border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-all placeholder:text-slate-400 text-slate-900"
                        />
                       <button 
                          v-if="destinationSearch"
                          @click="clearDestination"
                          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-slate-100 transition-colors"
                        >
                          <span class="material-symbols-outlined text-sm font-bold">close</span>
                        </button>
                        
                        <!-- Dropdown -->
                        <div v-if="showDestinationDropdown" class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 max-h-64 overflow-auto scrollbar-thin">
                           <div v-if="destGeo.isSearching.value" class="p-4 text-center text-sm text-slate-500">Loading...</div>
                           <template v-else-if="destinationSearch.length >= 2">
                              <button
                                v-for="place in destGeo.searchResults.value"
                                :key="place.id"
                                @click="selectGeocodedDest(place)"
                                class="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 flex items-start gap-3 border-b border-slate-50 last:border-0 transition-colors"
                              >
                                <span class="mt-0.5 text-slate-400 material-symbols-outlined text-lg">location_on</span>
                                <div>
                                  <div class="font-semibold text-slate-900">{{ place.name }}</div>
                                  <div class="text-xs text-slate-500">{{ place.area }}</div>
                                </div>
                              </button>
                           </template>
                           <template v-else>
                              <div class="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-50/50">Popular</div>
                              <button v-for="dest in popularDestinations.slice(0,5)" :key="dest.id" @click="selectDestination(dest)" class="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2">
                                 <span>{{ dest.name }}</span>
                              </button>
                           </template>
                        </div>
                    </div>
                    <button @click="setPickMode('to')" :class="pickMode === 'to' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'" class="p-3 rounded-xl transition-colors">
                       <span class="material-symbols-outlined">flag</span>
                    </button>
                  </div>
               </div>
            </div>
            
            <hr class="border-slate-100" />
            
            <!-- SECTION: TRANSPORT MODE -->
            <div>
               <label class="text-xs font-medium text-slate-700 uppercase tracking-wide mb-3 block">Transport Mode</label>
               <div class="grid grid-cols-4 gap-3">
                  <button
                    v-for="mode in travelModes"
                    :key="mode.id"
                    @click="selectedMode = mode.id"
                    class="flex flex-col items-center p-3 rounded-xl transition-all text-center border-2"
                    :class="selectedMode === mode.id 
                      ? 'bg-teal-50 border-teal-600 text-teal-700 bg-teal-600/5' 
                      : 'bg-white border-slate-200 hover:border-teal-200 text-slate-500 hover:text-slate-700'"
                  >
                    <span class="text-2xl mb-1 filter drop-shadow-sm">{{ mode.icon }}</span>
                    <span class="text-[10px] font-bold uppercase tracking-wide">{{ mode.label }}</span>
                  </button>
               </div>
            </div>
            
            <hr class="border-slate-100" />

            <!-- SECTION: RATE CARD inputs -->
            <div>
               <div class="flex items-center justify-between mb-3">
                 <label class="text-xs font-medium text-slate-700 uppercase tracking-wide">Rate Structure</label>
                 <button @click="showAdvanced = !showAdvanced" class="text-xs font-semibold text-teal-600 hover:underline">
                   {{ showAdvanced ? 'Simple' : 'Customize' }}
                 </button>
               </div>
               
               <div class="grid grid-cols-2 gap-4">
                  <div>
                     <div class="text-[10px] font-medium text-slate-400 mb-1">Base (1st km)</div>
                     <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Rs.</span>
                        <input v-model.number="fareSettings.firstKmRate" type="number" class="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm font-bold text-slate-900 transition-all" />
                     </div>
                  </div>
                  <div>
                     <div class="text-[10px] font-medium text-slate-400 mb-1">Per km</div>
                     <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Rs.</span>
                         <input v-model.number="fareSettings.perKmRate" type="number" class="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm font-bold text-slate-900 transition-all" />
                     </div>
                  </div>
               </div>
               
               <div v-show="showAdvanced" class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100 animate-[fadeIn_0.2s_ease-out]">
                  <div>
                    <div class="text-[10px] font-medium text-slate-400 mb-1">Min Fare</div>
                    <input v-model.number="fareSettings.minFare" type="number" class="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm" />
                  </div>
                  <div class="flex items-end">
                     <label class="flex items-center gap-2 p-2 w-full bg-slate-50 rounded-lg border border-slate-100 cursor-pointer">
                        <input type="checkbox" v-model="fareSettings.nightMode" class="rounded text-teal-600 focus:ring-teal-500 border-slate-300" />
                        <span class="text-xs font-bold text-slate-700">Night (1.5x)</span>
                     </label>
                  </div>
               </div>
            </div>

            <!-- ACTION BUTTON -->
            <div class="pt-2">
               <button 
                  @click="calculateRoute()"
                  :disabled="!origin || !destination || isRouteLoading"
                  class="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all disabled:opacity-70 disabled:grayscale flex items-center justify-center gap-3 text-sm tracking-wide"
                >
                  <span v-if="isRouteLoading" class="animate-spin material-symbols-outlined text-xl">progress_activity</span>
                  <span v-else class="material-symbols-outlined text-xl">directions</span>
                  {{ isRouteLoading ? 'Calculating...' : 'Find Best Route' }}
                </button>
            </div>

        </div>

        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- RIGHT COLUMN - MAP & RESULTS -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <div class="space-y-6">
            
            <!-- MAP CARD -->
            <div class="bg-slate-50 rounded-2xl overflow-hidden shadow-inner border border-slate-200 relative group">
                <div class="w-full h-[450px] relative">
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
            
            <!-- RESULTS CARD -->
            <!-- RESULTS CARD (Redesigned) -->
            <div v-if="routeResult" class="animate-[slideUp_0.4s_ease-out] space-y-4">
                
                <!-- Main Gradient Card -->
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden transform hover:scale-[1.01] transition-all">
                    <!-- Background Gloss -->
                    <div class="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
                    
                    <div class="relative z-10">
                        <div class="flex justify-between items-start mb-2">
                           <div>
                              <p class="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-1">Estimated Fare</p>
                              <h3 class="text-4xl font-bold tracking-tight">{{ calculatedFare.display }}</h3>
                           </div>
                           <div class="text-right">
                              <!-- Mode Icon Badge -->
                              <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 shadow-inner">
                                 <span class="text-xl">{{ travelModes.find(m => m.id === selectedMode)?.icon || '🚗' }}</span>
                              </div>
                           </div>
                        </div>
                        
                        <!-- Route Stats -->
                        <div class="flex items-center gap-4 mt-4 text-blue-50">
                           <div class="flex items-center gap-2">
                              <span class="material-symbols-outlined text-lg">straighten</span>
                              <span class="text-sm font-medium">{{ routeResult.distanceKm }} km</span>
                           </div>
                           <div class="w-px h-4 bg-white/20"></div>
                           <div class="flex items-center gap-2">
                              <span class="material-symbols-outlined text-lg">schedule</span>
                              <span class="text-sm font-medium">{{ formatDuration(routeResult.durationMinutes) }}</span>
                           </div>
                        </div>

                        <!-- Action Bar (Integrated) -->
                        <div class="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                           <div class="flex gap-1">
                              <button @click="copyQuote" class="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors flex flex-col items-center gap-1 group" title="Copy Details">
                                 <span class="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">content_copy</span>
                              </button>
                              <button @click="shareLink" class="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors flex flex-col items-center gap-1 group" title="Share Link">
                                 <span class="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">share</span>
                              </button>
                              <button @click="exportItinerary" class="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors flex flex-col items-center gap-1 group" title="Save File">
                                 <span class="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">save_alt</span>
                              </button>
                           </div>
                           <div class="text-[10px] font-medium text-blue-200">
                             *Estimates may vary
                           </div>
                        </div>
                    </div>
                </div>

                <!-- Fare Guard Button (Detached) -->
                <button @click="showFareGuard = true" class="w-full py-3 rounded-xl border border-teal-200 bg-teal-50 text-teal-700 text-sm font-bold hover:bg-teal-100 transition-colors flex items-center justify-center gap-2 group shadow-sm">
                   <span class="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">shield_lock</span>
                   Check Price Fairness
                </button>
                
            </div>

            <!-- RECOMMENDATIONS / POPULAR -->
            <!-- RECOMMENDATIONS -->
            <div v-if="routeResult" class="space-y-4 animate-[fadeIn_0.3s_ease-out]">
               <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 px-1">
                   <span class="material-symbols-outlined text-base">explore</span>
                   Recommended Options
               </h3>
               
               <div class="space-y-3">
                  <div v-for="option in recommendedOptions.visible" :key="option.mode" class="p-4 rounded-xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all cursor-pointer group">
                      <div class="flex justify-between items-start mb-2">
                         <div class="flex items-center gap-3">
                             <span class="text-2xl p-2 bg-slate-50 rounded-lg group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">{{ option.icon }}</span>
                             <div>
                                 <div class="font-bold text-slate-900">{{ option.label }}</div>
                                 <div class="text-xs text-slate-500 flex items-center gap-1">
                                     <span v-if="option.subtitle">{{ option.subtitle }} •</span>
                                     <span>{{ option.duration }}</span>
                                 </div>
                             </div>
                         </div>
                         <div class="text-right">
                             <div class="font-bold text-teal-600 text-lg">{{ option.cost }}</div>
                             <span v-if="option.recommended" class="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">BEST</span>
                         </div>
                      </div>
                  </div>
                  
                  <button @click="showMoreOptions = !showMoreOptions" class="w-full py-2 text-xs font-bold text-slate-400 hover:text-teal-600 transition-colors text-center uppercase tracking-wide">
                      {{ showMoreOptions ? 'Show Less' : 'Compare More Options' }}
                  </button>
               </div>
            </div>

            <!-- POPULAR ROUTES (Always Visible) -->
            <div class="space-y-4 pt-2">
               <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 px-1">
                   <span class="material-symbols-outlined text-base">trending_up</span>
                   Popular Routes
               </h3>
               
               <div class="space-y-3">
                  <button v-for="route in popularRoutes" :key="route.id" @click="setPopularRoute(route)" class="w-full text-left p-4 rounded-xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-md transition-all flex items-center gap-4 group">
                     <span class="text-2xl bg-slate-50 p-2 rounded-lg group-hover:scale-110 transition-transform">{{ route.icon }}</span>
                     <div class="flex-1">
                        <div class="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{{ route.tag }}</div>
                        <div class="text-xs text-slate-500 font-medium">{{ route.from }} to {{ route.to }}</div>
                     </div>
                     <span class="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">{{ route.distance }}</span>
                  </button>
               </div>
            </div>
               
               <!-- Disclaimer / Scams (Info Box) -->
               <div class="pt-2">
                  <button @click="showScams = true" class="w-full bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4 hover:bg-amber-100/80 transition-all text-left group">
                    <div class="bg-amber-100 text-amber-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                       <span class="material-symbols-outlined text-xl">warning</span>
                    </div>
                    <div>
                       <div class="font-bold text-amber-900 text-sm">Tourist Scams to Avoid</div>
                       <div class="text-xs font-medium text-slate-700">Tap to see safety tips for this route</div>
                    </div>
                    <span class="material-symbols-outlined text-amber-400 ml-auto">chevron_right</span>
                  </button>
               </div>


        </div>

      </div>
    </div>
    
     <!-- ═══════════════════════════════════════════════════════════════════ -->
     <!-- D) MODALS (Fare Guard) -->
     <!-- ═══════════════════════════════════════════════════════════════════ -->
     
     <div v-if="showFareGuard" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" @click.self="showFareGuard = false">
       <div class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-[scale-in_0.2s_ease-out]">
         <!-- Header -->
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
            <div class="flex justify-between items-end pb-4 border-b border-slate-100">
              <div>
                <div class="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Fair Estimate</div>
                <div class="text-3xl font-bold text-slate-900 tracking-tight">
                  {{ calculatedFare.display }}
                </div>
              </div>
              <div class="inline-flex px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold border border-teal-100">
                Metered Rate
              </div>
            </div>
              
              <!-- Ranges -->
              <div class="space-y-3">
                <div class="flex items-center justify-between p-4 bg-teal-50/50 rounded-xl border border-teal-100">
                  <div class="flex items-center gap-3">
                    <span class="text-xl">✅</span>
                    <div>
                      <div class="font-bold text-sm text-slate-900">Good Price</div>
                      <div class="text-xs text-slate-500">Typical range</div>
                    </div>
                  </div>
                  <div class="font-bold text-teal-700">Rs. {{ calculatedFare.ranges.typical }} - {{ calculatedFare.ranges.high }}</div>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                  <div class="flex items-center gap-3">
                    <span class="text-xl">🚨</span>
                    <div>
                      <div class="font-bold text-sm text-slate-900">Tourist Trap</div>
                      <div class="text-xs text-slate-500">Likely overcharge</div>
                    </div>
                  </div>
                  <div class="font-bold text-rose-700">> Rs. {{ calculatedFare.ranges.tourist }}</div>
                </div>
              </div>
              
              <!-- Tips -->
              <div class="space-y-3">
                 <div class="text-xs font-bold text-slate-400 uppercase tracking-wide">Negotiation 101</div>
                 <ul class="text-sm text-slate-600 space-y-3">
                   <li class="flex gap-3 items-start">
                     <span class="text-teal-600 material-symbols-outlined text-lg shrink-0">check_circle</span>
                     <span>Show this screen to the driver <strong>before</strong> getting in.</span>
                   </li>
                   <li class="flex gap-3 items-start">
                     <span class="text-teal-600 material-symbols-outlined text-lg shrink-0">check_circle</span>
                     <span>"Meter only" is the magic phrase in Colombo.</span>
                   </li>
                   <li class="flex gap-3 items-start">
                     <span class="text-teal-600 material-symbols-outlined text-lg shrink-0">check_circle</span>
                     <span>If they refuse, walk away. There's always another tuk.</span>
                   </li>
                 </ul>
              </div>
           </div>
           
           <div class="pt-6 mt-6 border-t border-slate-100">
             <button @click="showFareGuard = false" class="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
               Got it, thanks
             </button>
           </div>
         </div>
       </div>
     </div>
     
     <div v-if="showScams" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" @click.self="showScams = false">
       <TouristOverchargeWarning @close="showScams = false" />
     </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useTransportRoutes, popularDestinations } from '~/composables/useTransportRoutes'
import { useGeocode, type GeocodedPlace } from '~/composables/useGeocode'
import TransportMap from '~/components/Transport/TransportMap.vue'

const {
  origin,
  destination,
  routeResult, 
  isLoading: isRouteLoading, 
  error: routeError,
  isStale,
  calculateRoute: doCalculate,
  setOrigin,
  setDestination,
  swapLocations: doSwap,
  getRouteRecommendations
} = useTransportRoutes()

// Geocoding instances
const originGeo = useGeocode()
const destGeo = useGeocode()

// Auto-calculate route when both points are set
watch([origin, destination], async ([newOrigin, newDest]) => {
  if (newOrigin && newDest) {
    await doCalculate()
  }
})

// UI State
const originSearch = ref('')
const destinationSearch = ref('')
const showOriginDropdown = ref(false)
const showDestinationDropdown = ref(false)
const showAdvanced = ref(false)
const showFareGuard = ref(false)
const showScams = ref(false)
const showMoreOptions = ref(false)
const pickMode = ref<'from' | 'to' | null>(null)
const selectedMode = ref('tuktuk')

// Travel Modes
const travelModes = [
  { id: 'tuktuk', icon: '🛺', label: 'Tuk-Tuk' },
  { id: 'taxi', icon: '🚕', label: 'Taxi' },
  { id: 'bus', icon: '🚌', label: 'Bus' },
  { id: 'train', icon: '🚂', label: 'Train' }
]

// Fare Settings
const fareSettings = ref({
  firstKmRate: 100,
  perKmRate: 60,
  minFare: 150,
  waitingPerMin: 5,
  nightMode: false
})

// Mode-specific fare multipliers
const modeMultipliers: Record<string, number> = {
  tuktuk: 1.0,
  taxi: 1.4,
  bus: 0.15,
  train: 0.12
}

// Search Handlers
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

// Selection Handlers
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

// Calculate fare based on distance and mode
const calculatedFare = computed(() => {
  if (!routeResult.value) return { 
    total: 0, 
    breakdown: { first: 0, remaining: 0, distance: 0 }, 
    ranges: { typical: 0, high: 0, tourist: 0 },
    display: 'Rs. 0' 
  }
  
  const distance = routeResult.value.distanceKm
  
  // Specific Tuk-tuk Formula
  // Fare = firstKmRate + max(0, distance - 1) * perKmRate
  const firstKmCost = fareSettings.value.firstKmRate
  const remainingKm = Math.max(0, distance - 1)
  const remainingCost = remainingKm * fareSettings.value.perKmRate
  
  let totalRaw = firstKmCost + remainingCost
  
  // Add waiting/night charges if applicable (keeping existing logic optional but applied to raw)
  if (fareSettings.value.nightMode) totalRaw *= 1.5
  
  // Apply mode multiplier if NOT tuktuk (since inputs are designed for tuktuk)
  if (selectedMode.value !== 'tuktuk') {
    totalRaw *= (modeMultipliers[selectedMode.value] || 1)
  }
  
  // Round to nearest 10
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

// Recommended options based on route
const recommendedOptions = computed(() => {
  let recType = 'generic'
  // Try to get smart recommendations from knowledge base first
  const smartRecs = getRouteRecommendations() // Using the new helper
  
  let options: any[] = []

  if (smartRecs && smartRecs.length > 0) {
    recType = 'smart'
    // Map smart recs to UI format (adding icons based on mode)
    options = smartRecs.map((rec: any) => ({
      ...rec,
      modeId: rec.mode,
      icon: travelModes.find(m => m.id === rec.mode)?.icon || '🚗'
    }))
  } else {
      // Fallback: Generic Logic
      const distance = routeResult.value?.distanceKm || 50
      
      if (distance > 30) {
        options.push({
          mode: 'train',
          modeId: 'train',
          icon: '🚂',
          label: 'Train',
          subtitle: 'Most scenic option',
          duration: formatDuration(Math.round(distance / 35 * 60)),
          cost: `Rs. ${Math.round(distance * 5)}`,
          tag: 'Scenic',
          tagClass: 'bg-green-100 text-green-700'
        })
      }
      
      options.push({
        mode: 'bus',
        modeId: 'bus',
        icon: '🚌',
        label: 'Express Bus',
        subtitle: 'Fast A/C coaches',
        duration: formatDuration(Math.round(distance / 50 * 60)),
        cost: `Rs. ${Math.round(distance * 8)}`,
        tag: 'Budget',
        tagClass: 'bg-blue-100 text-blue-700'
      })
      
      options.push({
        mode: 'taxi',
        modeId: 'taxi',
        icon: '🚕',
        label: 'Private Car',
        subtitle: 'Door-to-door comfort',
        duration: formatDuration(Math.round(distance / 55 * 60)),
        cost: `Rs. ${Math.round(distance * 90)}`,
        tag: 'Comfort',
        tagClass: 'bg-purple-100 text-purple-700'
      })
      
      if (distance < 30) {
        options.push({
          mode: 'tuktuk',
          modeId: 'tuktuk',
          icon: '🛺',
          label: 'Tuk-Tuk',
          subtitle: 'Local experience',
          duration: formatDuration(Math.round(distance / 25 * 60)),
          cost: `Rs. ${Math.round(100 + distance * 60)}`,
          tag: 'Fun',
          tagClass: 'bg-orange-100 text-orange-700'
        })
      }
  }
  
  return {
      type: recType,
      data: options,
      visible: showMoreOptions.value ? options : options.slice(0, 3)
  }
})

// Popular routes
const popularRoutes = [
  { id: '1', from: 'Bandaranaike International Airport', to: 'Colombo', icon: '✈️', tag: 'Airport Transfer 45m', distance: '32 km' },
  { id: '2', from: 'Colombo', to: 'Ella', icon: '🚂', tag: 'Scenic Train 9h', distance: '200 km' },
  { id: '3', from: 'Colombo', to: 'Kandy', icon: '🚌', tag: 'Express Bus 3h', distance: '115 km' },
  { id: '4', from: 'Colombo', to: 'Galle', icon: '🚌', tag: 'Highway 1.5h', distance: '120 km' },
  { id: '5', from: 'Kandy', to: 'Sigiriya', icon: '🚕', tag: 'Day Trip 2.5h', distance: '90 km' }
]

function setPopularRoute(route: typeof popularRoutes[0]) {
  // Reset state
  pickMode.value = null
  showFareGuard.value = false
  showScams.value = false
  
  // Find locations
  const from = popularDestinations.find(d => d.name === route.from)
  const to = popularDestinations.find(d => d.name === route.to)
  
  if (from) {
    origin.value = { name: from.name, lat: from.lat, lon: from.lon }
    originSearch.value = from.name
    // Update geocode search result to avoid "Searching..." trap
    originGeo.searchResults.value = [{ 
      id: from.id, 
      name: from.name, 
      lat: from.lat, 
      lon: from.lon, 
      displayName: from.name, 
      type: 'place',
      area: from.region || 'Region'
    }]
  }
  
  if (to) {
    destination.value = { name: to.name, lat: to.lat, lon: to.lon }
    destinationSearch.value = to.name
    destGeo.searchResults.value = [{ 
      id: to.id, 
      name: to.name, 
      lat: to.lat, 
      lon: to.lon, 
      displayName: to.name, 
      type: 'place',
      area: to.region || 'Region'
    }]
  }
}

function setPickMode(mode: 'from' | 'to') {
  pickMode.value = pickMode.value === mode ? null : mode
}

function swapLocations() {
  const tempSearch = originSearch.value
  originSearch.value = destinationSearch.value
  destinationSearch.value = tempSearch

  const tempGeo = originGeo.searchResults.value
  originGeo.searchResults.value = destGeo.searchResults.value 
  destGeo.searchResults.value = tempGeo
  
  doSwap()
}

async function calculateRoute() {
  await doCalculate()
}

function handleMapClick(location: { lat: number; lon: number; name: string }) {
  if (pickMode.value === 'from') {
    origin.value = location
    originSearch.value = location.name
  } else if (pickMode.value === 'to') {
    destination.value = location
    destinationSearch.value = location.name
  }
  pickMode.value = null
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

// Close dropdowns
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      showOriginDropdown.value = false
      showDestinationDropdown.value = false
    }
  })
})

useHead({
  title: 'Transport Assistant - CeylonGuide',
  meta: [{ name: 'description', content: 'Calculate fares, find routes, and avoid scams in Sri Lanka' }]
})

function copyQuote() {
  if (!routeResult.value) return
  
  const text = `🇱🇰 *Transport Quote - CeylonGuides*
  
📍 *From:* ${routeResult.value.origin.name}
🏁 *To:* ${routeResult.value.destination.name}
📏 *Distance:* ${routeResult.value.distanceKm} km
⏱️ *Duration:* ${routeResult.value.durationMinutes} min

💰 *Estimated Fare:* ${calculatedFare.value.display}
⚠️ *Tourist Warning:* Always use a meter or agree on price upfront.

_Generated by CeylonGuides Transport Assistant_`
  
  navigator.clipboard.writeText(text)
  alert('Quote copied to clipboard!')
}

function shareLink() {
  if (!routeResult.value) return
  
  const params = new URLSearchParams()
  params.set('from', `${routeResult.value.origin.lat},${routeResult.value.origin.lon}`)
  params.set('to', `${routeResult.value.destination.lat},${routeResult.value.destination.lon}`)
  params.set('mode', selectedMode.value)
  
  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
  navigator.clipboard.writeText(url)
  alert('Link copied to clipboard!')
}

function exportItinerary() {
  if (!routeResult.value) return

  const text = `TRANSPORT PLAN
--------------------------------
Route: ${routeResult.value.origin.name} to ${routeResult.value.destination.name}
Distance: ${routeResult.value.distanceKm} km
Est. Time: ${formatDuration(routeResult.value.durationMinutes)}

RECOMMENDED OPTIONS
--------------------------------
${routeResult.value.options.map(opt => `- ${opt.label}: ${opt.cost} (${opt.duration})`).join('\n')}

TIPS
--------------------------------
- Negotiate fare before starting trip if no meter.
- Use PickMe or Uber for fixed rates in cities.
- Avoid "tuk-tuk mafia" stands near tourist spots.

Safe Travels!
`
  
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transport-itinerary.txt'
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(async () => {
  const route = useRoute()
  const { from, to, mode } = route.query
  
  if (mode && typeof mode === 'string') {
    selectedMode.value = mode
  }
  
  if (from && typeof from === 'string' && to && typeof to === 'string') {
    const fromParts = from.split(',').map(Number)
    const toParts = to.split(',').map(Number)
    
    if (fromParts.length === 2 && toParts.length === 2) {
      const [fromLat, fromLon] = fromParts
      const [toLat, toLon] = toParts
      
      if (typeof fromLat === 'number' && !isNaN(fromLat) && 
          typeof fromLon === 'number' && !isNaN(fromLon) && 
          typeof toLat === 'number' && !isNaN(toLat) && 
          typeof toLon === 'number' && !isNaN(toLon)) {
            
         origin.value = { name: `${fromLat.toFixed(4)},${fromLon.toFixed(4)}`, lat: fromLat, lon: fromLon }
         destination.value = { name: `${toLat.toFixed(4)},${toLon.toFixed(4)}`, lat: toLat, lon: toLon }
         
         await doCalculate()
      }
    }
  }
})
</script>
