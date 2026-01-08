<template>
  <div class="flex flex-col bg-background-light dark:bg-background-dark font-display text-charcoal dark:text-white">
    <!-- Header with solid variant -->
    <Header variant="solid" />

    <!-- Hero Section -->
    <section class="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center" 
        style='background-image: linear-gradient(rgba(16, 32, 34, 0.5) 0%, rgba(16, 32, 34, 0.7) 100%), url("/scam_alert_hero_1767782820867.png");'>
      </div>
      <div class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div class="max-w-4xl space-y-6">
          <div class="flex items-center justify-center gap-3 mb-4">
            <span class="material-symbols-outlined text-red-500 text-5xl md:text-6xl">shield_with_heart</span>
          </div>
          <h1 class="font-display text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-md">
            Scam Alert Database
          </h1>
          <p class="mx-auto max-w-2xl text-lg font-medium text-white/90 md:text-xl drop-shadow-sm">
            Real-time community reports to keep you safe. Stay informed about common scams and report suspicious activities to protect fellow travelers.
          </p>
          <div class="flex items-center justify-center gap-4 pt-4">
            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span class="material-symbols-outlined text-white text-[20px]">verified_user</span>
              <span class="text-white text-sm font-semibold">Community Verified</span>
            </div>
            <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span class="material-symbols-outlined text-white text-[20px]">update</span>
              <span class="text-white text-sm font-semibold">Real-time Updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Proximity Alert Banner -->
    <Transition name="slide-down">
      <div 
        v-if="showDangerBanner && dangerLocation"
        :class="[
          'flex-none border-b px-6 py-2 flex items-center justify-center gap-3 text-sm font-medium z-20',
          dangerLocation.risk === 'HIGH' 
            ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/50 text-red-700 dark:text-red-300'
            : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/50 text-amber-700 dark:text-amber-300'
        ]"
      >
        <span class="material-symbols-outlined text-[20px]">fmd_bad</span>
        <p>
          <strong>{{ dangerLocation.risk }} Risk:</strong> 
          You are viewing {{ dangerLocation.name }}, a high-activity area for reported scams.
          <span v-if="dangerLocation.count > 0" class="text-xs opacity-80">({{ dangerLocation.count }} alerts nearby)</span>
        </p>
        <button 
          @click="dismissDangerBanner"
          class="ml-4 opacity-60 hover:opacity-100 transition-opacity"
        >
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </Transition>

    <!-- Main Layout -->
    <main class="flex relative" style="min-height: 700px;">
      <!-- Sidebar (List View & Controls) -->
      <aside
        class="w-full md:w-[420px] lg:w-[480px] bg-white dark:bg-surface-dark flex flex-col border-r border-gray-200 dark:border-white/10 z-10 shadow-xl md:shadow-none absolute inset-0 md:relative transform transition-transform duration-300 bg-background-light"
        style="height: 700px;"
        :class="[
          viewMode === 'list' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]"
      >
        <!-- Sidebar Header & Filters -->
        <div class="flex-none p-6 pb-2 border-b border-transparent">
          <div class="flex flex-col gap-4 mb-6">
            <div>
              <h1 class="text-2xl font-bold text-charcoal dark:text-white leading-tight">Scam Database</h1>
              <p class="text-gray-500 text-sm mt-1">Real-time community reports to keep you safe.</p>
            </div>
            
            <!-- View Toggle (Mobile Only) -->
            <div class="md:hidden bg-background-light dark:bg-background-dark p-1 rounded-lg flex self-start">
              <label class="cursor-pointer relative">
                <input 
                  type="radio" 
                  name="view" 
                  value="map" 
                  v-model="viewMode" 
                  class="peer sr-only"
                />
                <div class="px-4 py-1.5 rounded-md text-sm font-medium text-gray-500 peer-checked:bg-white dark:peer-checked:bg-[#4a3b36] peer-checked:text-accent peer-checked:shadow-sm transition-all flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">map</span>
                  Map
                </div>
              </label>
              <label class="cursor-pointer relative">
                <input 
                  type="radio" 
                  name="view" 
                  value="list" 
                  v-model="viewMode" 
                  class="peer sr-only"
                />
                <div class="px-4 py-1.5 rounded-md text-sm font-medium text-gray-500 peer-checked:bg-white dark:peer-checked:bg-[#4a3b36] peer-checked:text-accent peer-checked:shadow-sm transition-all flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">list</span>
                  List
                </div>
              </label>
            </div>
          </div>
          
          <!-- Category Filter Chips -->
          <div class="flex gap-2 overflow-x-auto pb-3 custom-scrollbar -mx-6 px-6">
            <button 
              v-for="cat in categories" 
              :key="cat.id ?? 'all'"
              @click="selectedCategory = cat.id"
              :class="[
                'shrink-0 h-8 px-4 rounded-full text-xs font-medium flex items-center gap-1 transition-colors',
                selectedCategory === cat.id 
                  ? 'bg-charcoal text-white shadow-sm' 
                  : 'bg-white dark:bg-background-dark border border-gray-200 dark:border-white/10 text-charcoal dark:text-white hover:border-accent'
              ]"
            >
              <span v-if="cat.id" :class="['size-2 rounded-full', cat.color]"></span>
              {{ cat.label }}
            </button>
          </div>

          <!-- Severity Filter Chips -->
          <div class="flex gap-2 overflow-x-auto pb-3 custom-scrollbar -mx-6 px-6">
            <span class="shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400 pr-1 self-center">Risk:</span>
            <button 
              v-for="sev in severities" 
              :key="sev.id ?? 'all-risk'"
              @click="selectedSeverity = sev.id"
              :class="[
                'shrink-0 h-7 px-3 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors',
                selectedSeverity === sev.id 
                  ? 'bg-charcoal text-white shadow-sm' 
                  : 'bg-white dark:bg-background-dark border border-gray-200 dark:border-white/10 text-charcoal dark:text-white hover:border-accent'
              ]"
            >
              <span v-if="sev.icon">{{ sev.icon }}</span>
              {{ sev.label }}
            </button>
          </div>

          <!-- Location Filter Dropdown -->
          <div class="flex items-center gap-3 pb-3 -mx-6 px-6">
            <span class="shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400">Location:</span>
            <select
              v-model="selectedLocation"
              class="flex-1 h-8 px-3 rounded-lg text-xs font-medium bg-white dark:bg-background-dark border border-gray-200 dark:border-white/10 text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option v-for="loc in locations" :key="loc.id ?? 'all-loc'" :value="loc.id">
                {{ loc.label }}
              </option>
            </select>
          </div>

          <!-- Active Filters Summary & Clear -->
          <div 
            v-if="selectedCategory || selectedSeverity || selectedLocation || nearMeMode"
            class="flex items-center gap-2 pb-3 -mx-6 px-6"
          >
            <span class="text-xs text-gray-500">Active filters:</span>
            <div class="flex gap-1 flex-wrap">
              <span 
                v-if="selectedCategory" 
                class="text-[10px] px-2 py-0.5 bg-accent/10 text-accent rounded-full"
              >
                {{ categories.find(c => c.id === selectedCategory)?.label }}
              </span>
              <span 
                v-if="selectedSeverity" 
                class="text-[10px] px-2 py-0.5 bg-accent/10 text-accent rounded-full"
              >
                {{ severities.find(s => s.id === selectedSeverity)?.label }} Risk
              </span>
              <span 
                v-if="selectedLocation" 
                class="text-[10px] px-2 py-0.5 bg-accent/10 text-accent rounded-full"
              >
                {{ selectedLocation }}
              </span>
              <span 
                v-if="nearMeMode" 
                class="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full"
              >
                📍 Within {{ radiusKm }}km
              </span>
            </div>
            <button 
              @click="selectedCategory = null; selectedSeverity = null; selectedLocation = null; disableNearMe()"
              class="text-xs text-red-500 hover:text-red-600 font-medium"
            >
              Clear all
            </button>
          </div>

          <!-- Near Me Toggle -->
          <div class="flex items-center gap-3 pb-4 -mx-6 px-6">
            <button
              v-if="!nearMeMode"
              @click="enableNearMe"
              :disabled="gettingLocation"
              class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-wait text-sm font-medium transition-colors"
            >
              <span v-if="gettingLocation" class="animate-spin">⏳</span>
              <span v-else>📍</span>
              {{ gettingLocation ? 'Getting location...' : 'Show Near Me' }}
            </button>
            
            <div v-else class="flex items-center gap-3 flex-wrap">
              <span class="text-green-600 dark:text-green-400 font-semibold text-sm flex items-center gap-1">
                📍 Near Me
              </span>
              <input
                v-model.number="radiusKm"
                type="range"
                min="1"
                max="20"
                class="w-24 accent-accent"
              />
              <span class="text-xs text-gray-600 dark:text-gray-400">{{ radiusKm }}km</span>
              <button
                @click="disableNearMe"
                class="px-3 py-1 text-xs border border-gray-300 dark:border-white/20 rounded hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <!-- Near Me Risk Gauge -->
          <div v-if="nearMeMode" class="pb-4 -mx-6 px-6">
            <!-- Risk Gauge Card -->
            <div 
              :class="[
                'rounded-xl p-4 border-2',
                riskScore >= 70 ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
                riskScore >= 40 ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500' :
                'bg-green-50 dark:bg-green-900/20 border-green-500'
              ]"
            >
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 
                    :class="[
                      'text-lg font-bold',
                      riskScore >= 70 ? 'text-red-700 dark:text-red-300' :
                      riskScore >= 40 ? 'text-orange-700 dark:text-orange-300' :
                      'text-green-700 dark:text-green-300'
                    ]"
                  >
                    {{ riskScore >= 70 ? '🔴 High Risk' : riskScore >= 40 ? '🟠 Moderate Risk' : '🟢 Low Risk' }}
                  </h3>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {{ scamAlerts.length }} alert{{ scamAlerts.length !== 1 ? 's' : '' }} 
                    within {{ radiusKm }}km
                  </p>
                </div>
                <div class="text-right">
                  <div 
                    :class="[
                      'text-3xl font-bold',
                      riskScore >= 70 ? 'text-red-600 dark:text-red-400' :
                      riskScore >= 40 ? 'text-orange-600 dark:text-orange-400' :
                      'text-green-600 dark:text-green-400'
                    ]"
                  >
                    {{ riskScore }}
                  </div>
                  <div class="text-[10px] text-gray-500 uppercase tracking-wide">Risk Score</div>
                </div>
              </div>
              
              <!-- Risk Details -->
              <div v-if="scamAlerts.length > 0" class="grid grid-cols-2 gap-3 text-xs">
                <div class="bg-white/50 dark:bg-black/20 rounded-lg p-2">
                  <div class="text-gray-500">Most Common</div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200 truncate">{{ getMostCommonCategory() }}</div>
                </div>
                <div class="bg-white/50 dark:bg-black/20 rounded-lg p-2">
                  <div class="text-gray-500">High/Critical</div>
                  <div class="font-semibold text-red-600 dark:text-red-400">
                    {{ scamAlerts.filter(s => s.severity === 'HIGH' || s.severity === 'CRITICAL').length }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Location Privacy Note -->
            <p class="text-[10px] text-gray-400 mt-2 text-center">
              📍 Your location is used locally only and never stored.
            </p>
          </div>
        </div>

        <!-- Scrollable List Area -->
        <div class="flex-1 overflow-y-auto custom-scrollbar px-6 pb-20">
          <!-- Loading State -->
          <div v-if="pending" class="flex items-center justify-center py-12">
            <div class="animate-spin size-8 border-2 border-accent border-t-transparent rounded-full"></div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-12 text-red-500">
            <span class="material-symbols-outlined text-4xl mb-2">error</span>
            <p>Failed to load alerts. Please try again.</p>
            <button @click="refresh()" class="mt-4 px-4 py-2 bg-accent text-white rounded-lg">Retry</button>
          </div>

          <!-- Empty State with Helpful Guidance -->
          <div v-else-if="scamAlerts.length === 0" class="text-center py-12 px-6">
            <span class="material-symbols-outlined text-5xl mb-3 text-green-500">verified_user</span>
            <h3 class="text-lg font-bold text-charcoal dark:text-white mb-2">No scam alerts found</h3>
            
            <!-- Dynamic guidance based on active filters -->
            <div v-if="selectedCategory || selectedSeverity || selectedLocation || nearMeMode" class="text-sm text-gray-500 dark:text-gray-400 space-y-2">
              <p>No results match your current filters:</p>
              <div class="flex flex-wrap justify-center gap-2 mt-2 mb-4">
                <span v-if="selectedCategory" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  {{ categories.find(c => c.id === selectedCategory)?.label }}
                </span>
                <span v-if="selectedSeverity" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  {{ severities.find(s => s.id === selectedSeverity)?.label }} Risk
                </span>
                <span v-if="selectedLocation" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  {{ selectedLocation }}
                </span>
                <span v-if="nearMeMode" class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                  📍 Within {{ radiusKm }}km
                </span>
              </div>
              <p class="text-gray-400">Try broadening your search by removing some filters.</p>
              <button 
                @click="selectedCategory = null; selectedSeverity = null; selectedLocation = null; disableNearMe()"
                class="mt-3 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-accent/90"
              >
                Clear all filters
              </button>
            </div>
            
            <!-- No filters active - actually no scams in area -->
            <div v-else class="text-sm text-gray-500 dark:text-gray-400">
              <p>Great news! No scam alerts have been reported in this area.</p>
              <p class="mt-2">Stay vigilant and help others by reporting any suspicious activities.</p>
              <button 
                @click="showReportModal = true"
                class="mt-4 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-accent/90 inline-flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-[18px]">add_alert</span>
                Report a Scam
              </button>
            </div>
          </div>

          <!-- Alert Cards -->
          <div v-else class="flex flex-col gap-4">
            <div 
              v-for="alert in scamAlerts" 
              :key="alert.id"
              :id="`scam-${alert.id}`"
              @click="handleSidebarClick(alert)"
              :class="[
                'group relative bg-white dark:bg-background-dark rounded-xl border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer',
                getSeverityClass(alert.severity),
                highlightedScamId === alert.id ? 'ring-2 ring-primary ring-offset-2' : ''
              ]"
            >
              <div class="absolute top-4 right-4 text-xs font-medium text-gray-400">
                {{ getTimeAgo(alert.last_reported) }}
              </div>
              <div class="flex items-start gap-3">
                <div :class="['size-10 rounded-full flex items-center justify-center shrink-0', getSeverityColor(alert.severity, alert.category)]">
                  <span class="material-symbols-outlined">{{ getSeverityIcon(alert.category) }}</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-bold text-charcoal dark:text-white text-base">{{ alert.title }}</h3>
                    <span 
                      v-if="alert.severity === 'HIGH' || alert.severity === 'CRITICAL'"
                      class="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider"
                    >
                      High Risk
                    </span>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                    {{ alert.description }}
                  </p>
                  <div class="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-3 mt-1">
                    <div class="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <span class="material-symbols-outlined text-[16px]">location_on</span>
                      {{ alert.location?.name || 'Unknown location' }}
                    </div>
                    <div class="flex items-center gap-2">
                      <!-- Trust Badges -->
                      <TrustBadge 
                        type="severity" 
                        :value="alert.severity" 
                      />
                      <TrustBadge 
                        type="confidence" 
                        :value="alert.report_count" 
                        label="Number of confirmations"
                      />
                      <button
                        class="text-xs font-semibold text-accent hover:text-accent/80"
                        @click.stop="openScamDetails(alert.id)"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="scamAlerts.length > 0" class="mt-6 text-center pb-6">
            <button
              v-if="hasMore"
              @click="loadMore"
              :disabled="loadingMore"
              class="px-6 py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span v-if="loadingMore" class="animate-spin size-4 border-2 border-white border-t-transparent rounded-full"></span>
              <span>{{ loadingMore ? 'Loading...' : 'Load more reports' }}</span>
            </button>
            <p v-else class="text-gray-400 text-sm">All reports loaded ({{ totalCount }} total)</p>
          </div>
        </div>

        <!-- Mobile Toggle Handle -->
        <div 
          @click="viewMode = 'list'"
          v-if="viewMode === 'map'"
          class="absolute -right-8 top-1/2 bg-white dark:bg-background-dark p-2 rounded-r-lg shadow-md md:hidden cursor-pointer border-y border-r border-gray-200 dark:border-white/10"
        >
          <span class="material-symbols-outlined text-gray-500">chevron_left</span>
        </div>
      </aside>

      <!-- Map Area -->
      <div
        class="flex-1 relative bg-gray-200 dark:bg-[#1a1614] z-0"
        :class="[viewMode === 'map' ? 'block' : 'hidden md:block']"
        style="height: 700px;"
      >
        <!-- Interactive Leaflet Map -->
        <ClientOnly>
          <ScamAlertsMap
            ref="scamMapRef"
            :scams="scamAlerts"
            :highlighted-id="highlightedScamId"
            @select-scam="handleMarkerClick"
            @report-at="handleMapReport"
            @map-center="handleMapCenter"
            class="w-full h-full z-0"
          />
          <template #fallback>
            <div class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-surface-dark">
              <div class="text-center">
                <div class="animate-spin size-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-2"></div>
                <p class="text-gray-500">Loading map...</p>
              </div>
            </div>
          </template>
        </ClientOnly>

        <!-- Floating Tip Banner -->
        <div class="absolute top-4 left-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg px-3 py-2 z-10 max-w-[200px]">
          <p class="text-xs text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Click anywhere on the map to report a scam at that location
          </p>
        </div>

        <!-- Floating Action Button (FAB) -->
        <div class="absolute bottom-8 right-8 z-20">
          <button @click="showReportModal = true" class="group flex items-center gap-2 bg-accent hover:bg-accent/90 text-white rounded-full pl-5 pr-6 py-4 shadow-lg shadow-accent/30 transition-all active:scale-95">
            <span class="material-symbols-outlined text-[24px]">add_alert</span>
            <span class="text-base font-bold">Report a Scam</span>
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Report Scam Modal -->
    <Teleport to="body">
      <div v-if="showReportModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="showReportModal = false"></div>
        <div class="relative bg-white dark:bg-background-dark rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="sticky top-0 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
            <h2 class="text-xl font-bold text-charcoal dark:text-white">Report a Scam</h2>
            <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <!-- Modal Body -->
          <form @submit.prevent="submitReport" class="p-6 space-y-5">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
              <input v-model="reportForm.title" type="text" required minlength="5" maxlength="200" 
                class="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-surface-dark text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Brief title for this scam..." />
            </div>
            
            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
              <textarea v-model="reportForm.description" required minlength="20" maxlength="2000" rows="4"
                class="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-surface-dark text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                placeholder="Describe what happened, how to avoid it..."></textarea>
            </div>
            
            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
              <select v-model="reportForm.category" required
                class="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-surface-dark text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent">
                <option value="" disabled>Select a category</option>
                <option value="GEM_SCAM">Gem Scam</option>
                <option value="TRANSPORT_SCAM">Transport/Tuk-tuk Scam</option>
                <option value="ACCOMMODATION_SCAM">Accommodation Scam</option>
                <option value="TOUR_GUIDE_SCAM">Fake Tour Guide</option>
                <option value="RESTAURANT_SCAM">Restaurant Scam</option>
                <option value="SHOPPING_SCAM">Shopping/Exchange Scam</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            
            <!-- Severity -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Severity</label>
              <div class="flex gap-3">
                <label v-for="sev in ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']" :key="sev" class="flex-1">
                  <input type="radio" v-model="reportForm.severity" :value="sev" class="sr-only peer" />
                  <div class="text-center py-2 rounded-lg border-2 cursor-pointer transition-all"
                    :class="[
                      reportForm.severity === sev 
                        ? 'border-accent bg-accent/10 text-accent font-bold'
                        : 'border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                    ]">
                    {{ sev }}
                  </div>
                </label>
              </div>
            </div>
            
            <!-- Location -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
              <input v-model="reportForm.location_name" type="text" required
                class="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-surface-dark text-charcoal dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., Pettah Market, Colombo" />
            </div>
            
            <!-- Submit Button -->
            <button type="submit" :disabled="isSubmitting"
              class="w-full py-4 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              <span v-if="isSubmitting" class="animate-spin size-5 border-2 border-white border-t-transparent rounded-full"></span>
              <span>{{ isSubmitting ? 'Submitting...' : 'Submit Report' }}</span>
            </button>
            
            <p v-if="submitError" class="text-red-500 text-sm text-center">{{ submitError }}</p>
            <p v-if="submitSuccess" class="text-green-500 text-sm text-center">Report submitted successfully!</p>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Scam Details Modal -->
    <Teleport to="body">
      <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="closeScamDetails"></div>
        <div class="relative bg-white dark:bg-background-dark rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-white/10 px-6 py-4 flex items-center justify-between">
            <h2 class="text-xl font-bold text-charcoal dark:text-white">Scam Details</h2>
            <button @click="closeScamDetails" class="text-gray-400 hover:text-gray-600">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="p-6">
            <div v-if="detailsLoading" class="flex items-center justify-center py-10">
              <div class="animate-spin size-8 border-2 border-accent border-t-transparent rounded-full"></div>
            </div>

            <div v-else-if="detailsError" class="text-center py-8 text-red-500">
              <span class="material-symbols-outlined text-4xl mb-2">error</span>
              <p>{{ detailsError }}</p>
              <button @click="openScamDetails(selectedScamId || highlightedScamId || '')" class="mt-4 px-4 py-2 bg-accent text-white rounded-lg">Retry</button>
            </div>

            <div v-else-if="scamDetails" class="space-y-5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-xl font-bold text-charcoal dark:text-white">{{ scamDetails.title }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ formatCategoryLabel(scamDetails.category) }} · {{ scamDetails.severity }}
                  </p>
                </div>
                <span :class="['text-xs font-bold px-2.5 py-1 rounded-full uppercase', scamDetails.severity === 'CRITICAL' || scamDetails.severity === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700']">
                  {{ scamDetails.severity }}
                </span>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ scamDetails.description }}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="bg-gray-50 dark:bg-white/5 rounded-lg p-3">
                  <div class="text-gray-500">Location</div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">{{ scamDetails.location?.name || 'Unknown location' }}</div>
                </div>
                <div class="bg-gray-50 dark:bg-white/5 rounded-lg p-3">
                  <div class="text-gray-500">Last reported</div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">{{ getTimeAgo(scamDetails.last_reported) }}</div>
                </div>
                <div class="bg-gray-50 dark:bg-white/5 rounded-lg p-3">
                  <div class="text-gray-500">Confirmations</div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">{{ scamDetails.report_count }}</div>
                </div>
                <div class="bg-gray-50 dark:bg-white/5 rounded-lg p-3">
                  <div class="text-gray-500">Verified</div>
                  <div class="font-semibold text-gray-800 dark:text-gray-200">{{ scamDetails.is_verified ? 'Yes' : 'Pending' }}</div>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-bold text-charcoal dark:text-white mb-2">How to avoid</h4>
                <ul v-if="scamDetails.prevention_tips?.length" class="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li v-for="tip in scamDetails.prevention_tips" :key="tip">{{ tip }}</li>
                </ul>
                <p v-else class="text-sm text-gray-500">No prevention tips yet.</p>
              </div>

              <div class="flex items-center justify-between gap-3 pt-2">
                <button
                  class="px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 disabled:opacity-60"
                  :disabled="confirmingDetails"
                  @click="confirmDetailsAlert"
                >
                  {{ confirmingDetails ? 'Confirming...' : 'Confirm this report' }}
                </button>
                <button
                  class="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5"
                  @click="closeScamDetails"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import type { ScamAlert } from '~/types/api'
import { useModal } from '~/composables/useModal'

const route = useRoute()

definePageMeta({
  layout: false
})

const viewMode = ref<'list' | 'map'>('list')
const selectedCategory = ref<string | null>(null)
const selectedSeverity = ref<string | null>(null)  // Filter by severity: HIGH, MEDIUM, LOW
const selectedLocation = ref<string | null>(null)  // Filter by location/district

// Dynamic danger banner state
const showDangerBanner = ref(false)
const dangerBannerDismissed = ref(false)
const dangerLocation = ref<{ name: string; risk: string; count: number } | null>(null)
const mapCenter = ref<{ lat: number; lng: number }>({ lat: 7.8731, lng: 80.7718 })

// High-risk scam hotspots with coordinates and risk levels
const HIGH_RISK_LOCATIONS = [
  { name: 'Pettah Market', lat: 6.9375, lng: 79.8556, risk: 'HIGH', radius: 1.5 },
  { name: 'Colombo Fort', lat: 6.9344, lng: 79.8428, risk: 'HIGH', radius: 1 },
  { name: 'Temple of the Tooth', lat: 7.2936, lng: 80.6413, risk: 'HIGH', radius: 0.8 },
  { name: 'Galle Fort', lat: 6.0269, lng: 80.2167, risk: 'MEDIUM', radius: 1 },
  { name: 'Sigiriya', lat: 7.9570, lng: 80.7603, risk: 'HIGH', radius: 1.5 },
  { name: 'Negombo Beach', lat: 7.2088, lng: 79.8357, risk: 'MEDIUM', radius: 2 },
  { name: 'Hikkaduwa Beach', lat: 6.1395, lng: 80.1063, risk: 'MEDIUM', radius: 1.5 },
  { name: 'Unawatuna Beach', lat: 6.0116, lng: 80.2488, risk: 'MEDIUM', radius: 1 },
  { name: 'Ratnapura Gem District', lat: 6.6828, lng: 80.3981, risk: 'HIGH', radius: 2 },
  { name: 'Kandy City', lat: 7.2906, lng: 80.6337, risk: 'MEDIUM', radius: 1.5 },
  { name: 'Airport Road', lat: 7.1808, lng: 79.8845, risk: 'MEDIUM', radius: 2 },
  { name: 'Yala National Park Entrance', lat: 6.3556, lng: 81.5167, risk: 'HIGH', radius: 3 },
]

// Calculate distance in km using Haversine formula
function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Handle map center change - check if near a high-risk location
function handleMapCenter(coords: { lat: number; lng: number }) {
  mapCenter.value = coords
  
  // Reset if dismissed
  if (dangerBannerDismissed.value) {
    // Check if moved far away to un-dismiss
    const anyNearby = HIGH_RISK_LOCATIONS.some(loc => 
      getDistanceKm(coords.lat, coords.lng, loc.lat, loc.lng) <= loc.radius
    )
    if (!anyNearby) {
      dangerBannerDismissed.value = false
    }
    return
  }
  
  // Find nearest high-risk location
  let nearestDanger: typeof HIGH_RISK_LOCATIONS[0] | null = null
  let nearestDistance = Infinity
  
  for (const loc of HIGH_RISK_LOCATIONS) {
    const dist = getDistanceKm(coords.lat, coords.lng, loc.lat, loc.lng)
    if (dist <= loc.radius && dist < nearestDistance) {
      nearestDistance = dist
      nearestDanger = loc
    }
  }
  
  if (nearestDanger) {
    // Count scams in this area
    const scamCount = scamAlerts.value.filter(scam => {
      if (!scam.location?.latitude || !scam.location?.longitude) return false
      const dist = getDistanceKm(scam.location.latitude, scam.location.longitude, nearestDanger!.lat, nearestDanger!.lng)
      return dist <= nearestDanger!.radius
    }).length
    
    dangerLocation.value = {
      name: nearestDanger.name,
      risk: nearestDanger.risk,
      count: scamCount
    }
    showDangerBanner.value = true
  } else {
    showDangerBanner.value = false
    dangerLocation.value = null
  }
}

// Dismiss danger banner
function dismissDangerBanner() {
  showDangerBanner.value = false
  dangerBannerDismissed.value = true
}

// Report Modal State
const showReportModal = ref(false)
const showDetailsModal = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

// Modal Esc-close support
useModal(showReportModal, () => { showReportModal.value = false })
useModal(showDetailsModal, () => { showDetailsModal.value = false })

const reportForm = ref({
  title: '',
  description: '',
  category: '',
  severity: 'MEDIUM',
  location_name: '',
  location_lat: 7.8731, // Default to Sri Lanka center
  location_lng: 80.7718,
})

// Details modal state
const detailsLoading = ref(false)
const detailsError = ref('')
const scamDetails = ref<ScamAlert | null>(null)
const confirmingDetails = ref(false)

// Pagination state
const currentOffset = ref(0)
const limit = 20
const allAlerts = ref<ScamAlert[]>([])
const hasMore = ref(true)
const totalCount = ref(0)
const loadingMore = ref(false)

// Near Me mode state
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const nearMeMode = ref(false)
const radiusKm = ref(5)
const gettingLocation = ref(false)

// Handle deep-links for report modal, category filter, or specific scam
const highlightedScamId = ref<string | null>(null)
const selectedScamId = ref<string | null>(null)

// Ref to the map component for pan/zoom control
const scamMapRef = ref<{ panToScam: (id: string) => void } | null>(null)

onMounted(async () => {
  // Handle openReport query param
  if (route.query.openReport) {
    const category = route.query.openReport as string
    showReportModal.value = true
    
    // Pre-fill category based on query param
    if (category === 'transport') {
      reportForm.value.category = 'TRANSPORT_SCAM'
    }
  }
  
  // Handle category filter from URL
  if (route.query.category) {
    selectedCategory.value = route.query.category as string
  }
  
  // Handle specific scam ID - highlight and scroll to it
  if (route.query.id) {
    highlightedScamId.value = route.query.id as string
    
    // Wait for DOM update then scroll
    await nextTick()
    setTimeout(() => {
      const element = document.getElementById(`scam-${highlightedScamId.value}`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 500)

    openScamDetails(highlightedScamId.value)
  }
})

// Fetch scam alerts from API
const { data: scamsResponse, pending, error, refresh } = await useFetch<{ 
  success: boolean; 
  data: ScamAlert[]; 
  count: number;
  total: number;
  nextOffset: number | null;
}>(
  () => {
    const config = useRuntimeConfig()
    const base = config.public.apiBase
    const params = new URLSearchParams()
    if (selectedCategory.value) params.set('category', selectedCategory.value)
    if (selectedSeverity.value) params.set('severity', selectedSeverity.value)
    if (selectedLocation.value) params.set('location', selectedLocation.value)
    params.set('limit', String(limit))
    params.set('offset', String(currentOffset.value))
    // Add location params if Near Me mode is active
    if (nearMeMode.value && userLocation.value) {
      params.set('lat', String(userLocation.value.lat))
      params.set('lng', String(userLocation.value.lng))
      params.set('radius', String(radiusKm.value))
    }
    return `${base}/api/scams?${params}`
  },
  { 
    watch: [selectedCategory, selectedSeverity, selectedLocation, nearMeMode, radiusKm],
    onResponse({ response }) {
      if (response._data?.success) {
        if (currentOffset.value === 0) {
          allAlerts.value = response._data.data || []
        } else {
          allAlerts.value = [...allAlerts.value, ...(response._data.data || [])]
        }
        totalCount.value = response._data.total || 0
        hasMore.value = response._data.nextOffset !== null
      }
    }
  }
)

const scamAlerts = computed(() => allAlerts.value)

// Load more function
async function loadMore() {
  if (!hasMore.value || loadingMore.value) return
  loadingMore.value = true
  currentOffset.value += limit
  await refresh()
  loadingMore.value = false
}

// Near Me mode functions
async function enableNearMe() {
  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser')
    return
  }
  
  gettingLocation.value = true
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      nearMeMode.value = true
      currentOffset.value = 0
      allAlerts.value = []
      gettingLocation.value = false
    },
    (error) => {
      alert('Could not get your location. Please enable location access.')
      console.error('Geolocation error:', error)
      gettingLocation.value = false
    },
    { timeout: 10000 }
  )
}

function disableNearMe() {
  nearMeMode.value = false
  userLocation.value = null
  currentOffset.value = 0
  allAlerts.value = []
}

function getMostCommonCategory(): string {
  if (allAlerts.value.length === 0) return 'None'
  const counts: Record<string, number> = {}
  allAlerts.value.forEach(s => {
    counts[s.category] = (counts[s.category] || 0) + 1
  })
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted[0]?.[0]?.replace(/_/g, ' ') || 'Various'
}

// Calculate weighted risk score (0-100)
const riskScore = computed(() => {
  if (scamAlerts.value.length === 0) return 0
  
  const weights: Record<string, number> = { CRITICAL: 10, HIGH: 5, MEDIUM: 2, LOW: 1 }
  const total = scamAlerts.value.reduce((sum, scam) => {
    return sum + (weights[scam.severity] || 1)
  }, 0)
  
  // Normalize: more alerts = higher score, weighted by severity
  const avgWeight = total / scamAlerts.value.length
  const countFactor = Math.min(scamAlerts.value.length / 5, 2) // Cap at 2x for 10+ alerts
  return Math.min(100, Math.round(avgWeight * 10 * countFactor))
})

// Handle map click for reporting
function handleMapReport(coords: { lat: number; lng: number }) {
  // Pre-fill report form with coordinates
  reportForm.value = {
    ...reportForm.value,
    location_lat: coords.lat,
    location_lng: coords.lng,
    location_name: `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
  }
  
  // Open report modal
  showReportModal.value = true
}

// Reset pagination when any filter changes
watch([selectedCategory, selectedSeverity, selectedLocation], () => {
  currentOffset.value = 0
  allAlerts.value = []
})

// Severity options for filter
const severities = [
  { id: null, label: 'All Risk', color: 'bg-gray-500' },
  { id: 'HIGH', label: 'High', color: 'bg-red-500', icon: '🔴' },
  { id: 'MEDIUM', label: 'Medium', color: 'bg-orange-500', icon: '🟠' },
  { id: 'LOW', label: 'Low', color: 'bg-green-500', icon: '🟢' },
]

// Location options for filter (major tourist areas)
const locations = [
  { id: null, label: 'All Locations' },
  { id: 'Colombo', label: 'Colombo' },
  { id: 'Kandy', label: 'Kandy' },
  { id: 'Galle', label: 'Galle' },
  { id: 'Negombo', label: 'Negombo' },
  { id: 'Sigiriya', label: 'Sigiriya' },
  { id: 'Hikkaduwa', label: 'Hikkaduwa' },
  { id: 'Unawatuna', label: 'Unawatuna' },
  { id: 'Weligama', label: 'Weligama' },
  { id: 'Yala', label: 'Yala' },
  { id: 'Ratnapura', label: 'Ratnapura' },
]

// Filter categories
const categories = [
  { id: null, label: 'All', color: 'bg-charcoal' },
  { id: 'TRANSPORT_SCAM', label: 'Tuk-tuk', color: 'bg-orange-500' },
  { id: 'GEM_SCAM', label: 'Gem Scams', color: 'bg-purple-500' },
  { id: 'TOUR_GUIDE_SCAM', label: 'Fake Guides', color: 'bg-red-500' },
  { id: 'ACCOMMODATION_SCAM', label: 'Stays', color: 'bg-slate-500' },
  { id: 'RESTAURANT_SCAM', label: 'Dining', color: 'bg-emerald-500' },
  { id: 'SHOPPING_SCAM', label: 'Exchange', color: 'bg-blue-500' },
  { id: 'OTHER', label: 'Other', color: 'bg-gray-500' },
]

// Helper functions
function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return `${Math.floor(diffHours / 24)}d ago`
}

function getSeverityClass(severity: string) {
  switch (severity) {
    case 'HIGH':
    case 'CRITICAL':
      return 'border-red-100 dark:border-red-900/30'
    case 'MEDIUM':
      return 'border-orange-100 dark:border-orange-900/30'
    default:
      return 'border-gray-200 dark:border-white/10'
  }
}

function getSeverityIcon(category: string) {
  switch (category) {
    case 'TOUR_GUIDE_SCAM':
      return 'person_alert'
    case 'TRANSPORT_SCAM':
      return 'local_taxi'
    case 'GEM_SCAM':
      return 'diamond'
    case 'ACCOMMODATION_SCAM':
      return 'hotel'
    case 'RESTAURANT_SCAM':
      return 'restaurant'
    case 'SHOPPING_SCAM':
      return 'currency_exchange'
    default:
      return 'warning'
  }
}

function getSeverityColor(severity: string, category: string) {
  if (severity === 'HIGH' || severity === 'CRITICAL') {
    return 'bg-red-50 dark:bg-red-900/20 text-red-500'
  }
  switch (category) {
    case 'TRANSPORT_SCAM':
      return 'bg-orange-50 dark:bg-orange-900/20 text-orange-500'
    case 'GEM_SCAM':
      return 'bg-purple-50 dark:bg-purple-900/20 text-purple-500'
    case 'ACCOMMODATION_SCAM':
      return 'bg-slate-50 dark:bg-slate-900/20 text-slate-500'
    case 'RESTAURANT_SCAM':
      return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500'
    case 'SHOPPING_SCAM':
      return 'bg-blue-50 dark:bg-blue-900/20 text-blue-500'
    default:
      return 'bg-gray-50 dark:bg-gray-900/20 text-gray-500'
  }
}

function getDaysAgo(dateStr: string): number {
  const date = new Date(dateStr)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

async function confirmAlert(id: string) {
  const config = useRuntimeConfig()
  await $fetch(`${config.public.apiBase}/api/scams/${id}/confirm`, { method: 'POST' })
  refresh()
}

// Handle clicking a sidebar scam card - pan map to location
function handleSidebarClick(alert: ScamAlert) {
  // Highlight this scam in the sidebar
  highlightedScamId.value = alert.id
  
  // Pan map to the scam location (if it has coordinates)
  if (alert.location?.latitude && alert.location?.longitude) {
    scamMapRef.value?.panToScam(alert.id)
  }
  
  // Open the details modal
  openScamDetails(alert.id)
}

// Handle marker click from map - highlight sidebar item and scroll to it
function handleMarkerClick(id: string) {
  highlightedScamId.value = id
  
  // Scroll the sidebar to show this scam card
  nextTick(() => {
    const element = document.getElementById(`scam-${id}`)
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
  
  // Open the details modal
  openScamDetails(id)
}

async function openScamDetails(id: string) {
  const config = useRuntimeConfig()
  if (!id) {
    detailsError.value = 'Missing scam ID.'
    showDetailsModal.value = true
    return
  }
  selectedScamId.value = id
  showReportModal.value = false
  showDetailsModal.value = true
  detailsLoading.value = true
  detailsError.value = ''
  scamDetails.value = null
  
  try {
    const response = await $fetch<{ success: boolean; data: ScamAlert; error?: string }>(`${config.public.apiBase}/api/scams/${id}`)
    if (response.success) {
      scamDetails.value = response.data
    } else {
      detailsError.value = response.error || 'Failed to load scam details.'
    }
  } catch (err: any) {
    detailsError.value = err?.data?.error || 'Failed to load scam details.'
  } finally {
    detailsLoading.value = false
  }
}

function closeScamDetails() {
  showDetailsModal.value = false
  detailsError.value = ''
}

async function confirmDetailsAlert() {
  if (!scamDetails.value || confirmingDetails.value) return
  confirmingDetails.value = true
  try {
    await confirmAlert(scamDetails.value.id)
    scamDetails.value = {
      ...scamDetails.value,
      report_count: (scamDetails.value.report_count || 0) + 1
    }
  } finally {
    confirmingDetails.value = false
  }
}

function formatCategoryLabel(value: string) {
  return value.replace(/_/g, ' ').toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase())
}

async function submitReport() {
  const config = useRuntimeConfig()
  isSubmitting.value = true
  submitError.value = ''
  submitSuccess.value = false
  
  try {
    await $fetch(`${config.public.apiBase}/api/scams`, {
      method: 'POST',
      body: {
        title: reportForm.value.title,
        description: reportForm.value.description,
        category: reportForm.value.category,
        severity: reportForm.value.severity,
        location_name: reportForm.value.location_name,
        location_lat: reportForm.value.location_lat,
        location_lng: reportForm.value.location_lng,
      }
    })
    
    submitSuccess.value = true
    setTimeout(() => {
      showReportModal.value = false
      reportForm.value = {
        title: '',
        description: '',
        category: '',
        severity: 'MEDIUM',
        location_name: '',
        location_lat: 7.8731,
        location_lng: 80.7718,
      }
      submitSuccess.value = false
      refresh()
    }, 1500)
  } catch (err: any) {
    submitError.value = err?.data?.error || 'Failed to submit report. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Custom scrollbar for the sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e6dedb;
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4a3b36;
}
</style>
