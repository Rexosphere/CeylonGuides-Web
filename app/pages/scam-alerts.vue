<template>
  <div class="scam-alerts-page">
    <!-- Hero Section -->
    <ScamAlertsHero :stats="scamStats" @report="showReportModal = true" />

    <!-- Main Content -->
    <main class="container mx-auto px-4 lg:px-6 -mt-12 pb-24 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: Filters + Scam List -->
        <div class="lg:col-span-7 xl:col-span-8 space-y-6">
          <ScamAlertsSearchFilter :search-query="searchQuery" :severity="selectedSeverity" :location="selectedLocation"
            :category="selectedCategory" :traveler-type="travelerType" :locations="adaptedLocations"
            :categories="categories" :result-count="filteredScams.length" :nearby-mode="nearbyMode"
            :nearby-loading="nearbyLoading" @update:searchQuery="searchQuery = $event"
            @update:severity="selectedSeverity = $event as 'all' | 'high' | 'medium' | 'low'"
            @update:location="handleLocationFilter" @update:category="selectedCategory = $event"
            @update:travelerType="travelerType = $event as TravelerType" @toggleNearby="handleNearbyToggle" />

          <!-- Scam Alerts List -->
          <div class="space-y-5">
            <!-- First scam - expanded by default -->
            <ScamAlertCardExpanded v-if="filteredScams.length > 0 && filteredScams[0]" :scam="filteredScams[0]!"
              :get-location-name="getLocationName" @collapse="toggleCard(filteredScams[0]!.id)" />

            <!-- Rest of scams - collapsed -->
            <ScamAlertCardCollapsed v-for="scam in filteredScams.slice(1)" :key="scam.id" :scam="scam"
              :get-location-name="getLocationName" @expand="toggleCard(scam.id)" />

            <!-- No results -->
            <div v-if="filteredScams.length === 0" class="text-center py-12">
              <p class="text-slate-500 dark:text-slate-400">🔍 No scams match your filters</p>
              <button @click="resetFilters"
                class="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-slate-700 transition">
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Map + Safety Assistant -->
        <div class="lg:col-span-5 xl:col-span-4 space-y-6">
          <!-- Map -->
          <ScamAlertsMapPanel />

          <!-- Safety Assistant -->
          <ScamAlertsSafetyAssistant />
        </div>
      </div>
    </main>

    <!-- Report Scam Modal -->
    <ReportScamModal :show="showReportModal" :scam-types="scamTypes" @close="showReportModal = false"
      @submit="handleReportSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScamData } from '~/composables/useScamData'
import { getUserLocation, findNearbyLocations, formatDistance, type Coordinates } from '~/utils/geolocation'
import { locations as allLocationData, scamTypes as allScamTypes } from '~/data/scamData'
import type { TravelerType } from '~/types/scamData'

// SEO Meta
useHead({
  title: 'Scam Alerts - Sri Lanka Travel Safety Guide',
  meta: [
    {
      name: 'description',
      content: 'Stay safe in Sri Lanka with our comprehensive scam alert system. Interactive maps, real examples, and protection tips for tourists.'
    },
    {
      name: 'keywords',
      content: 'Sri Lanka scams, tourist safety, travel alerts, scam prevention, Ceylon travel tips'
    }
  ]
})

// Initialize composable
const scamDataComposable = useScamData()
const allScams = scamDataComposable.allScams.value
const allLocations = scamDataComposable.allLocations.value
const scamTypes = allScamTypes

// Adapt locations to RiskLocation type for legacy components
const adaptedLocations = computed(() => {
  return allLocations.map((loc: any) => ({
    id: loc.id,
    name: loc.name,
    area: loc.name, // Use name as area
    risk: loc.riskLevel,
    lat: loc.coordinates.lat,
    lng: loc.coordinates.lng,
    description: loc.summary || '',
    scamTypes: loc.commonScams || [],
    color: getRiskColor(loc.riskLevel)
  }))
})

const getRiskColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'high': return '#dc2626'
    case 'medium': return '#ea580c'
    case 'low': return '#16a34a'
    default: return '#64748b'
  }
}

// Filter states
const selectedSeverity = ref<'all' | 'high' | 'medium' | 'low'>('all')
const selectedLocation = ref<string>('all')
const selectedCategory = ref<string>('all')
const searchQuery = ref<string>('')
const selectedTags = ref<string[]>([])
const travelerType = ref<TravelerType>('all')

// Map state
const selectedLocationForMap = ref<string | null>(null)

// Expanded scam cards
const expandedCards = ref<Set<string>>(new Set())

// Nearby mode state
const nearbyMode = ref(false)
const nearbyLoading = ref(false)
const nearbyDistance = ref<number | null>(5) // Default 5km radius
const nearbyError = ref<string | null>(null)
const userLocation = ref<Coordinates | null>(null)
const nearbyLocationIds = ref<string[]>([])

// Warning banner state
const showWarningBanner = ref(false)
const warningBannerSeverity = ref<'critical' | 'high' | 'medium'>('high')

// Report modal state
const showReportModal = ref(false)
const showMyReports = ref(false)
const userReports = ref<any[]>([])

// Mobile tab state
const activeTab = ref<'alerts' | 'map' | 'assistant' | ''>('alerts')

// Load user reports from localStorage on mount
if (typeof window !== 'undefined') {
  const savedReports = localStorage.getItem('scamReports')
  if (savedReports) {
    try {
      userReports.value = JSON.parse(savedReports)
    } catch (e) {
      console.error('Failed to load reports:', e)
      userReports.value = []
    }
  }
}
const warningBannerTitle = ref('')
const warningBannerMessage = ref('')
const nearbyHighRiskScams = ref<Array<{ id: string; name: string; distance: string }>>([])

// Selected location data for risk panel
const selectedLocationData = computed(() => {
  if (selectedLocation.value === 'all') return null
  return allLocations.find((loc: any) => loc.id === selectedLocation.value) || null
})

// Computed filtered data
const filteredScams = computed(() => {
  let scams = [...allScams]

  // Filter by severity
  if (selectedSeverity.value !== 'all') {
    scams = scams.filter(s => s.severity === selectedSeverity.value)
  }

  // Filter by location
  if (selectedLocation.value !== 'all') {
    scams = scams.filter(s => s.commonLocations.includes(selectedLocation.value))
  }

  // Filter by category
  if (selectedCategory.value !== 'all') {
    scams = scams.filter(s => s.category === selectedCategory.value)
  }

  // Filter by tags
  if (selectedTags.value.length > 0) {
    scams = scams.filter(s =>
      selectedTags.value.some(tag => s.tags?.includes(tag))
    )
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    scams = scams.filter(s =>
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    )
  }

  // Filter by nearby mode
  if (nearbyMode.value && nearbyLocationIds.value.length > 0) {
    scams = scams.filter(s =>
      s.commonLocations.some((locId: string) => nearbyLocationIds.value.includes(locId))
    )
  }

  return scams
})

const filteredLocations = computed(() => {
  if (nearbyMode.value && nearbyLocationIds.value.length > 0) {
    return allLocations.filter((l: any) => nearbyLocationIds.value.includes(l.id))
  }

  if (selectedLocation.value !== 'all') {
    const location = allLocations.find((l: any) => l.id === selectedLocation.value)
    return location ? [location] : []
  }
  return allLocations
})

// Categories
const categories = computed(() => [
  { id: 'transport', name: 'Transport', label: 'Transport', icon: 'directions_car' },
  { id: 'shopping', name: 'Shopping', label: 'Shopping', icon: 'shopping_bag' },
  { id: 'tourism', name: 'Tourism', label: 'Tourism', icon: 'camera_alt' },
  { id: 'accommodation', name: 'Accommodation', label: 'Accommodation', icon: 'hotel' },
  { id: 'wildlife', name: 'Wildlife', label: 'Wildlife', icon: 'forest' },
  { id: 'beach', name: 'Beach & Water', label: 'Beach & Water', icon: 'beach_access' },
  { id: 'nightlife', name: 'Nightlife', label: 'Nightlife', icon: 'nightlife' },
  { id: 'temple', name: 'Temple & Culture', label: 'Temple & Culture', icon: 'temple_buddhist' },
  { id: 'money', name: 'Money & Banking', label: 'Money & Banking', icon: 'payments' }
])

// Stats
const scamStats = computed(() => ({
  total: allScams.length,
  high: allScams.filter((s: any) => s.severity === 'high').length,
  critical: allScams.filter((s: any) => s.severity === 'critical').length,
  highRiskLocations: allLocations.filter((l: any) => l.riskLevel === 'high').length,
  locations: allLocations.length
}));

// Safety tips
const safetyTips = [
  {
    category: 'general',
    tips: [
      'Always research fair prices before purchasing or hiring services',
      'Use official apps (PickMe, Uber) for transportation',
      'Be skeptical of unsolicited help or offers',
      'Keep copies of important documents separate from originals',
      'Trust your instincts - if something feels off, walk away'
    ]
  },
  {
    category: 'transport',
    tips: [
      'Insist on using the meter or agree on a fixed fare before starting',
      'Refuse detours to shops or "special places"',
      'Use reputable taxi apps for transparent pricing',
      'Avoid tuk-tuks that approach you at tourist hotspots'
    ]
  },
  {
    category: 'shopping',
    tips: [
      'Don\'t buy gems or precious items from tuk-tuk drivers\' connections',
      'Research market prices online before shopping',
      'Be prepared to walk away from pushy vendors',
      'Only buy from government-certified shops (verify independently)',
      'Get written authenticity certificates and receipts'
    ]
  }
]

// Methods
const handleLocationFilter = (locationId: string) => {
  selectedLocation.value = locationId
  selectedLocationForMap.value = locationId !== 'all' ? locationId : null
}

const handleMapLocationSelect = (locationId: string) => {
  selectedLocation.value = locationId

  // Scroll to scam list
  const scamsSection = document.querySelector('.scams-section')
  if (scamsSection) {
    scamsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const focusOnLocation = (locationId: string) => {
  selectedLocationForMap.value = locationId
  selectedLocation.value = locationId

  // Scroll to map
  const mapSection = document.querySelector('.map-section')
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const scrollToScamDetails = (locationId: string) => {
  handleMapLocationSelect(locationId)
}

const getAffectedLocations = (scamId: string) => {
  const scam = allScams.find((s: any) => s.id === scamId)
  if (!scam) return []

  return scam.commonLocations
    .map((locId: string) => allLocations.find((l: any) => l.id === locId))
    .filter((location): location is NonNullable<typeof location> => location !== undefined)
    .slice(0, 3)
}

const resetFilters = () => {
  selectedSeverity.value = 'all'
  selectedLocation.value = 'all'
  selectedCategory.value = 'all'
  searchQuery.value = ''
  selectedTags.value = []
  travelerType.value = 'all'
  selectedLocationForMap.value = null
  nearbyMode.value = false
  nearbyLocationIds.value = []
  showWarningBanner.value = false
}

const handleLocationPanelClose = () => {
  selectedLocation.value = 'all'
  selectedLocationForMap.value = null
}

const handleScamSelected = (scamId: string) => {
  // Scroll to the scam card
  const element = document.getElementById(`scam-${scamId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // Expand the card
    expandedCards.value.add(scamId)
    // Highlight the card briefly
    element.classList.add('highlight-flash')
    setTimeout(() => {
      element.classList.remove('highlight-flash')
    }, 2000)
  }
}

const handleNearbyToggle = async () => {
  if (nearbyMode.value) {
    // Disable nearby mode
    nearbyMode.value = false
    nearbyLocationIds.value = []
    userLocation.value = null
    nearbyError.value = null
    showWarningBanner.value = false
    return
  }

  // Enable nearby mode
  nearbyLoading.value = true
  nearbyError.value = null
  showWarningBanner.value = false

  try {
    // Request user location
    const location = await getUserLocation()

    if (!location) {
      nearbyError.value = 'Location access denied. Please enable location services to use this feature.'
      nearbyLoading.value = false
      return
    }

    userLocation.value = location

    // Find nearby locations within radius
    const radius = nearbyDistance.value || 5
    const nearby = findNearbyLocations(
      location,
      allLocations.map((loc: any) => ({
        ...loc,
        coordinates: { lat: loc.coordinates.lat, lng: loc.coordinates.lng }
      })),
      radius
    )

    if (nearby.length === 0) {
      nearbyError.value = `No scam hotspots found within ${radius}km. You're in a relatively safe area!`
      nearbyMode.value = false
      nearbyLoading.value = false
      return
    }

    // Update nearby location IDs
    nearbyLocationIds.value = nearby.map(loc => loc.id)
    nearbyMode.value = true

    // Check for high-risk nearby locations
    const highRiskNearby = nearby.filter((loc: any) =>
      loc.riskLevel === 'high' || loc.riskLevel === 'critical'
    )

    if (highRiskNearby.length > 0) {
      // Show warning banner
      const criticalCount = highRiskNearby.filter((loc: any) => loc.riskLevel === 'critical').length

      if (criticalCount > 0) {
        warningBannerSeverity.value = 'critical'
        warningBannerTitle.value = '🚨 Critical Risk Area Nearby!'
        warningBannerMessage.value = `You are within ${radius}km of ${criticalCount} critical risk location${criticalCount > 1 ? 's' : ''}. Exercise extreme caution!`
      } else {
        warningBannerSeverity.value = 'high'
        warningBannerTitle.value = '⚠️ High Risk Area Nearby'
        warningBannerMessage.value = `You are within ${radius}km of ${highRiskNearby.length} high risk location${highRiskNearby.length > 1 ? 's' : ''}. Stay alert and follow safety guidelines.`
      }

      nearbyHighRiskScams.value = highRiskNearby.slice(0, 5).map((loc: any) => ({
        id: loc.id,
        name: loc.name,
        distance: formatDistance(loc.distance)
      }))

      showWarningBanner.value = true
    }

  } catch (error) {
    console.error('Error getting nearby locations:', error)
    nearbyError.value = 'Failed to get your location. Please try again.'
  } finally {
    nearbyLoading.value = false
  }
}

const toggleCard = (scamId: string) => {
  if (expandedCards.value.has(scamId)) {
    expandedCards.value.delete(scamId)
  } else {
    expandedCards.value.add(scamId)
  }
  // Trigger reactivity
  expandedCards.value = new Set(expandedCards.value)
}

const handleScamCardClick = (scamId: string) => {
  // Highlight related map markers
  const scam = allScams.find((s: any) => s.id === scamId)
  if (scam && scam.commonLocations && scam.commonLocations.length > 0) {
    // Focus on first common location
    selectedLocationForMap.value = scam.commonLocations[0] || null

    // Scroll to map
    setTimeout(() => {
      const mapSection = document.querySelector('.map-section')
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }
}

const getLocationName = (locationId: string): string => {
  const location = allLocations.find((l: any) => l.id === locationId)
  return location ? location.name : locationId
}

const getTravelerIcon = (type: TravelerType): string => {
  switch (type) {
    case 'solo-female': return '👩'
    case 'couple': return '💑'
    case 'family': return '👨‍👩‍👧‍👦'
    case 'backpacker': return '🎒'
    default: return '👥'
  }
}

const getTravelerLabel = (type: TravelerType): string => {
  switch (type) {
    case 'solo-female': return 'Solo Female Traveler'
    case 'couple': return 'Couple'
    case 'family': return 'Family'
    case 'backpacker': return 'Backpacker'
    default: return 'All Travelers'
  }
}

const getSeverityIcon = (severity: string): string => {
  switch (severity) {
    case 'critical': return '🔴'
    case 'high': return '🟠'
    case 'medium': return '🟡'
    case 'low': return '🟢'
    default: return '⚠️'
  }
}

const getCategoryIcon = (category: string): string => {
  const cat = categories.value.find(c => c.id === category)
  return cat?.icon || '🏷️'
}

const getCategoryTitle = (category: string): string => {
  const titles: Record<string, string> = {
    general: '🌍 General Safety',
    transport: '🚕 Transport Safety',
    shopping: '🛍️ Shopping Safety',
    temples: '🛕 Temple & Religious Sites',
    money: '💳 Money & Transactions',
    'solo-female': '👩 Solo Female Travelers'
  }
  return titles[category] || category
}

// Report handling functions
const handleReportSubmit = (report: any) => {
  // Report is already saved in localStorage by the modal
  // Just reload the reports
  if (typeof window !== 'undefined') {
    const savedReports = localStorage.getItem('scamReports')
    if (savedReports) {
      try {
        userReports.value = JSON.parse(savedReports)
        showMyReports.value = true // Auto-show reports after submission
      } catch (e) {
        console.error('Failed to reload reports:', e)
      }
    }
  }
}

const deleteReport = (reportId: string) => {
  if (confirm('Are you sure you want to delete this report?')) {
    userReports.value = userReports.value.filter(r => r.id !== reportId)
    if (typeof window !== 'undefined') {
      localStorage.setItem('scamReports', JSON.stringify(userReports.value))
    }
  }
}

const getScamTitle = (scamId: string): string => {
  const scam = allScams.find((s: any) => s.id === scamId)
  return scam ? scam.title : scamId
}

const formatReportTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}
</script>

<style scoped>
.scam-alerts-page {
  min-height: 100vh;
  background: #f8f9fa;
}

/* Compact Header */
.compact-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 20px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1600px;
  margin: 0 auto;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.page-title {
  font-size: 24px;
  font-weight: 800;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.header-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.header-btn.report-btn {
  background: #10b981;
  color: white;
}

.header-btn.report-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

.header-btn.reports-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.header-btn.reports-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.header-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat {
  font-size: 13px;
  font-weight: 600;
  opacity: 0.95;
}

.stat.critical {
  color: #fca5a5;
  font-weight: 700;
}

/* Mobile Tabs */
.mobile-tabs {
  display: none;
  background: white;
  border-bottom: 2px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.tab-btn {
  flex: 1;
  padding: 14px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  background: rgba(37, 99, 235, 0.05);
}

/* Main Container */
.main-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 16px;
}

/* Layout Grid - Two Column Desktop */
.layout-grid {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 20px;
  align-items: start;
}

.left-column {
  min-height: 80vh;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Compact Components */
.my-reports-section {
  background: rgba(99, 102, 241, 0.05);
  border: 2px solid #6366f1;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.section-header-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title-sm {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.close-btn-sm {
  width: 24px;
  height: 24px;
  border: none;
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
}

.close-btn-sm:hover {
  background: #4f46e5;
  color: white;
}

.reports-grid-compact {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.report-card-compact {
  background: white;
  border-radius: 8px;
  padding: 12px;
  border-left: 3px solid #6366f1;
}

.report-header-compact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.severity-badge-sm {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.severity-badge-sm.critical {
  background: #dc2626;
  color: white;
}

.severity-badge-sm.high {
  background: #ea580c;
  color: white;
}

.severity-badge-sm.medium {
  background: #f59e0b;
  color: white;
}

.severity-badge-sm.low {
  background: #10b981;
  color: white;
}

.delete-btn-sm {
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.5;
}

.delete-btn-sm:hover {
  opacity: 1;
}

.report-title-sm {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.report-meta {
  font-size: 11px;
  color: #9ca3af;
  margin: 0;
}

.filters-compact {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
}

.scams-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.no-results-compact {
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  border: 2px dashed #d1d5db;
}

.no-results-compact p {
  margin: 0 0 12px 0;
  color: #6b7280;
}

.btn-reset-sm {
  padding: 8px 16px;
  border: 2px solid #2563eb;
  background: white;
  color: #2563eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn-reset-sm:hover {
  background: #2563eb;
  color: white;
}

.scam-card-compact {
  background: white;
  border-radius: 10px;
  padding: 16px;
  border-left: 4px solid #d1d5db;
  transition: all 0.2s;
  cursor: pointer;
}

.scam-card-compact:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateX(2px);
}

.scam-card-compact.severity-critical {
  border-left-color: #dc2626;
}

.scam-card-compact.severity-high {
  border-left-color: #ea580c;
}

.scam-card-compact.severity-medium {
  border-left-color: #f59e0b;
}

.scam-card-compact.severity-low {
  border-left-color: #10b981;
}

.scam-card-compact.expanded {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.category-tag-sm {
  font-size: 11px;
  color: #6b7280;
  font-weight: 600;
}

.panel-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
  padding: 0 0 8px 0;
  border-bottom: 2px solid #e5e7eb;
}

.map-sticky,
.assistant-sticky {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}

.map-loading-sm {
  height: 400px;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
}

.risk-panel-sticky {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #ef4444;
  margin-bottom: 16px;
}

@media (max-width: 1024px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }

  .right-column {
    position: static;
    max-height: none;
  }

  .mobile-tabs {
    display: flex;
  }

  .left-column.hidden {
    display: none;
  }

  .right-column.hidden .map-sticky,
  .right-column.hidden .assistant-sticky {
    display: none;
  }

  .right-column:not(.hidden) {
    display: block;
  }

  .right-column:not(.hidden) .map-sticky,
  .right-column:not(.hidden) .assistant-sticky {
    display: block;
  }
}

@media (max-width: 768px) {
  .compact-header {
    padding: 12px 16px;
  }

  .page-title {
    font-size: 20px;
  }

  .header-actions {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .header-btn {
    width: 100%;
    font-size: 13px;
    padding: 10px;
  }
}


/* Legacy Styles Below */


.report-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.report-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.reports-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.reports-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.report-icon,
.reports-icon {
  font-size: 20px;
}

/* My Reports Section */
.my-reports-section {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.02) 100%);
  border: 2px solid #6366f1;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 48px;
  animation: slide-down 0.4s ease-out;
}

.my-reports-section .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.close-reports-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  border-radius: 50%;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s;
}

.close-reports-btn:hover {
  background: #4f46e5;
  color: white;
  transform: scale(1.1);
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.report-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  position: relative;
  border-left: 4px solid #6366f1;
}

.report-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.severity-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.severity-badge.critical {
  background: #dc2626;
  color: white;
}

.severity-badge.high {
  background: #ea580c;
  color: white;
}

.severity-badge.medium {
  background: #f59e0b;
  color: white;
}

.severity-badge.low {
  background: #10b981;
  color: white;
}

.report-status {
  font-size: 12px;
  color: #f59e0b;
  font-weight: 600;
}

.report-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.report-description {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.report-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 12px;
}

.report-location {
  font-family: monospace;
}

.delete-report-btn {
  width: 100%;
  padding: 8px 16px;
  border: 2px solid #ef4444;
  background: white;
  color: #ef4444;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.delete-report-btn:hover {
  background: #ef4444;
  color: white;
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Main Content */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.filters-section,
.risk-panel-section,
.assistant-section,
.map-section,
.scams-section,
.general-tips-section,
.disclaimer-section {
  margin-bottom: 48px;
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 32px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.section-description {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

/* Map Loading */
.map-loading {
  height: 600px;
  background: #f3f4f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #6b7280;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
}

.no-results-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 24px;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.no-results p {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 24px 0;
}

.reset-filters-btn {
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-filters-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* Scams Grid */
.scams-grid {
  display: grid;
  gap: 24px;
}

.scam-card {
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #e5e7eb;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}

.scam-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.scam-card.expanded {
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
  border-left-color: #667eea;
}

.scam-card.severity-critical {
  border-left-color: #dc2626;
  border-left-width: 6px;
  background: linear-gradient(to right, rgba(220, 38, 38, 0.05) 0%, white 100%);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}

.scam-card.severity-critical:hover {
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.25);
}

.scam-card.severity-high {
  border-left-color: #ef4444;
  border-left-width: 5px;
  background: linear-gradient(to right, rgba(239, 68, 68, 0.04) 0%, white 100%);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.12);
}

.scam-card.severity-high:hover {
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.2);
}

.scam-card.severity-medium {
  border-left-color: #f59e0b;
  border-left-width: 4px;
  background: linear-gradient(to right, rgba(245, 158, 11, 0.03) 0%, white 100%);
}

.scam-card.severity-low {
  border-left-color: #10b981;
  border-left-width: 3px;
}

.scam-card.highlight {
  animation: highlight 2s ease;
}

@keyframes highlight {

  0%,
  100% {
    background: white;
  }

  50% {
    background: #fef3c7;
  }
}

@keyframes highlight-flash {

  0%,
  100% {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  50% {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 8px 24px rgba(59, 130, 246, 0.3);
  }
}

.scam-card.highlight-flash {
  animation: highlight-flash 0.8s ease-in-out 2;
}

.scam-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.scam-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.scam-title {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  flex: 1;
}

.expand-btn {
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  flex-shrink: 0;
}

.expand-btn:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.severity-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  align-self: flex-start;
}

.badge-critical {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
  animation: pulse-critical 2s infinite;
}

@keyframes pulse-critical {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.8;
  }
}

.badge-high {
  background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
  color: white;
  box-shadow: 0 2px 6px rgba(234, 88, 12, 0.25);
}

.badge-medium {
  background: #fef3c7;
  color: #d97706;
  border: 1px solid #fbbf24;
}

.badge-low {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #86efac;
}

.scam-description {
  font-size: 15px;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 20px 0;
}

.scam-example,
.scam-tips,
.affected-locations {
  margin-top: 20px;
}

.example-label,
.tips-label,
.locations-label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.example-text {
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
  font-style: italic;
  margin: 0;
  padding: 12px;
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
  border-radius: 4px;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
}

.tips-list li {
  font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 8px;
}

.scam-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.category-tag {
  display: inline-block;
  padding: 4px 10px;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.locations-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.location-tag {
  padding: 6px 12px;
  background: #dbeafe;
  color: #1e40af;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.location-tag:hover {
  background: #bfdbfe;
  transform: translateY(-1px);
}

/* Location Chips */
.location-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}

.location-chip {
  padding: 6px 12px;
  background: #ede9fe;
  color: #7c3aed;
  border: 1.5px solid #c4b5fd;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.location-chip:hover {
  background: #7c3aed;
  color: white;
  transform: translateY(-1px);
}

/* Expanded Content */
.expanded-content {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #f3f4f6;
}

.section-label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
}

.section-label.urgent {
  color: #dc2626;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.scam-examples {
  margin-bottom: 20px;
}

.examples-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.examples-list li {
  font-size: 14px;
  line-height: 1.6;
  color: #6b7280;
  font-style: italic;
  margin-bottom: 10px;
  padding: 10px 12px;
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
  border-radius: 4px;
}

.common-places {
  margin-top: 20px;
}

.places-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.place-btn {
  padding: 8px 14px;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.place-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
}

.scam-tags {
  margin-top: 20px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tags-list .tag {
  padding: 4px 10px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

/* Scam Footer */
.scam-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.expand-hint {
  font-size: 12px;
  color: #9ca3af;
  font-style: italic;
}

/* Expand Transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* General Tips Section */
.tips-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.tip-category-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.tip-category-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
}

.general-tips-list {
  margin: 0;
  padding-left: 20px;
}

.general-tips-list li {
  font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 10px;
}

/* Disclaimer Section */
.disclaimer-card {
  display: flex;
  gap: 20px;
  background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%);
  border-radius: 12px;
  padding: 32px;
  border: 2px solid #3b82f6;
}

.disclaimer-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.disclaimer-content h3 {
  font-size: 22px;
  font-weight: 700;
  color: #1e3a8a;
  margin: 0 0 12px 0;
}

.disclaimer-content p {
  font-size: 15px;
  line-height: 1.7;
  color: #1e40af;
  margin: 0 0 12px 0;
}

.disclaimer-content p:last-child {
  margin-bottom: 0;
}

.disclaimer-content p:last-child {
  margin-bottom: 0;
}

/* Confrontation Guide (Critical/High) */
.confrontation-guide {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(220, 38, 38, 0.02) 100%);
  border: 2px solid #dc2626;
  border-radius: 12px;
}

.emergency-steps {
  margin: 0;
  padding-left: 20px;
}

.emergency-steps li {
  font-size: 14px;
  line-height: 1.8;
  color: #1f2937;
  margin-bottom: 12px;
  font-weight: 500;
}

.emergency-steps li strong {
  color: #dc2626;
  font-weight: 700;
}

/* Reporting Section (Critical/High) */
.reporting-section {
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%);
  border: 2px solid #3b82f6;
  border-radius: 12px;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.contact-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
}

.contact-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.contact-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-info strong {
  font-size: 13px;
  font-weight: 700;
  color: #1f2937;
}

.contact-number {
  font-size: 18px;
  font-weight: 700;
  color: #2563eb;
  text-decoration: none;
  transition: color 0.2s;
}

.contact-number:hover {
  color: #1d4ed8;
}

.contact-note {
  font-size: 11px;
  color: #6b7280;
}

/* Caution Notice (Medium) */
.caution-notice {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(251, 146, 60, 0.02) 100%);
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
}

.caution-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.caution-text {
  font-size: 13px;
  line-height: 1.6;
  color: #92400e;
}

.caution-text strong {
  font-weight: 700;
  color: #d97706;
}

/* Info Notice (Low) */
.info-notice {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%);
  border-left: 4px solid #10b981;
  border-radius: 8px;
}

.info-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.info-text {
  font-size: 13px;
  line-height: 1.6;
  color: #065f46;
}

.info-text strong {
  font-weight: 700;
  color: #059669;
}

/* Traveler-Specific Warnings */
.traveler-warnings {
  margin-top: 24px;
  padding: 20px;
  border-radius: 12px;
  border: 3px solid;
  animation: slide-in 0.3s ease-out;
}

.traveler-warnings.traveler-solo-female {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.12) 0%, rgba(220, 38, 38, 0.04) 100%);
  border-color: #dc2626;
}

.traveler-warnings.traveler-couple {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.04) 100%);
  border-color: #ec4899;
}

.traveler-warnings.traveler-family {
  background: linear-gradient(135deg, rgba(22, 163, 74, 0.12) 0%, rgba(22, 163, 74, 0.04) 100%);
  border-color: #16a34a;
}

.traveler-warnings.traveler-backpacker {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.04) 100%);
  border-color: #f59e0b;
}

.traveler-warning-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.warning-icon {
  font-size: 28px;
}

.warning-list {
  margin: 0;
  padding-left: 24px;
  list-style: disc;
}

.warning-list li {
  font-size: 14px;
  line-height: 1.8;
  color: #1f2937;
  margin-bottom: 12px;
}

.warning-list li:last-child {
  margin-bottom: 0;
}

.traveler-solo-female .warning-list li {
  color: #7f1d1d;
  font-weight: 500;
}

.traveler-couple .warning-list li {
  color: #831843;
}

.traveler-family .warning-list li {
  color: #14532d;
}

.traveler-backpacker .warning-list li {
  color: #78350f;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-description {
    font-size: 16px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-title {
    font-size: 24px;
  }

  .scam-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .disclaimer-card {
    flex-direction: column;
    padding: 24px;
  }

  .tips-categories {
    grid-template-columns: 1fr;
  }
}
</style>
