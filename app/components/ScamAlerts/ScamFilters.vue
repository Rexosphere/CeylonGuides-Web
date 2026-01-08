<template>
  <div class="scam-filters">
    <!-- Search Bar -->
    <div class="filter-section">
      <label class="filter-label">
        🔍 Search Scams
      </label>
      <input
        v-model="localSearchQuery"
        type="text"
        placeholder="Search by keyword, location, or scam type..."
        class="search-input"
        @input="handleSearchChange"
      />
    </div>

    <!-- Severity Filter -->
    <div class="filter-section">
      <label class="filter-label">
        ⚠️ Risk Severity
      </label>
      <div class="filter-buttons">
        <button
          :class="['filter-btn', { active: localSeverity === 'all' }]"
          @click="setSeverity('all')"
        >
          All
        </button>
        <button
          :class="['filter-btn', 'severity-high', { active: localSeverity === 'high' }]"
          @click="setSeverity('high')"
        >
          🔴 High Risk
        </button>
        <button
          :class="['filter-btn', 'severity-medium', { active: localSeverity === 'medium' }]"
          @click="setSeverity('medium')"
        >
          🟡 Medium Risk
        </button>
        <button
          :class="['filter-btn', 'severity-low', { active: localSeverity === 'low' }]"
          @click="setSeverity('low')"
        >
          🟢 Low Risk
        </button>
      </div>
    </div>

    <!-- Location Filter -->
    <div class="filter-section">
      <label class="filter-label">
        📍 Location
      </label>
      <select
        v-model="localLocation"
        class="filter-select"
        @change="handleLocationChange"
      >
        <option value="all">All Locations</option>
        <optgroup label="High Risk Areas">
          <option
            v-for="location in highRiskLocations"
            :key="location.id"
            :value="location.id"
          >
            🔴 {{ location.name }} - {{ location.area }}
          </option>
        </optgroup>
        <optgroup label="Medium Risk Areas">
          <option
            v-for="location in mediumRiskLocations"
            :key="location.id"
            :value="location.id"
          >
            🟡 {{ location.name }} - {{ location.area }}
          </option>
        </optgroup>
        <optgroup v-if="lowRiskLocations.length > 0" label="Low Risk Areas">
          <option
            v-for="location in lowRiskLocations"
            :key="location.id"
            :value="location.id"
          >
            🟢 {{ location.name }} - {{ location.area }}
          </option>
        </optgroup>
      </select>
    </div>

    <!-- Category Filter -->
    <div class="filter-section">
      <label class="filter-label">
        🏷️ Scam Category
      </label>
      <div class="category-pills">
        <button
          :class="['category-pill', { active: localCategory === 'all' }]"
          @click="setCategory('all')"
        >
          All Categories
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          :class="['category-pill', { active: localCategory === category.id }]"
          @click="setCategory(category.id)"
        >
          {{ category.icon }} {{ category.name }}
        </button>
      </div>
    </div>

    <!-- Tags Filter -->
    <div class="filter-section">
      <label class="filter-label">
        🏷️ Popular Tags
      </label>
      <div class="tags-pills">
        <button
          v-for="tag in popularTags"
          :key="tag"
          :class="['tag-pill', { active: selectedTags.includes(tag) }]"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Show Near Me Button -->
    <div class="filter-section">
      <button
        :class="['nearby-btn', { active: nearbyMode }]"
        @click="handleNearbyToggle"
        :disabled="nearbyLoading"
      >
        <span v-if="nearbyLoading">🔄 Finding your location...</span>
        <span v-else-if="nearbyMode">📍 Near Me Active</span>
        <span v-else>📍 Show Near Me</span>
      </button>
      <p v-if="nearbyMode && nearbyDistance" class="nearby-info">
        Showing scams within {{ nearbyDistance }}km of your location
      </p>
      <p v-if="nearbyError" class="nearby-error">
        {{ nearbyError }}
      </p>
    </div>

    <!-- Active Filters Summary & Reset -->
    <div v-if="hasActiveFilters" class="active-filters">
      <div class="active-filters-header">
        <span class="filter-label">Active Filters:</span>
        <button @click="handleReset" class="reset-btn">
          🔄 Reset All
        </button>
      </div>
      <div class="filter-tags">
        <span v-if="localSeverity !== 'all'" class="filter-tag">
          Severity: {{ localSeverity }}
          <button @click="setSeverity('all')" class="tag-close">×</button>
        </span>
        <span v-if="localLocation !== 'all'" class="filter-tag">
          Location: {{ getLocationName(localLocation) }}
          <button @click="setLocation('all')" class="tag-close">×</button>
        </span>
        <span v-if="localCategory !== 'all'" class="filter-tag">
          Category: {{ getCategoryName(localCategory) }}
          <button @click="setCategory('all')" class="tag-close">×</button>
        </span>
        <span v-if="localSearchQuery" class="filter-tag">
          Search: "{{ localSearchQuery }}"
          <button @click="setSearchQuery('')" class="tag-close">×</button>
        </span>
        <span v-for="tag in selectedTags" :key="tag" class="filter-tag">
          Tag: {{ tag }}
          <button @click="toggleTag(tag)" class="tag-close">×</button>
        </span>
      </div>
    </div>

    <!-- Traveler Type Filter -->
    <div class="filter-section">
      <label class="filter-label">
        🧑‍🤝‍🧑 Traveler Type
        <span class="filter-subtitle">Get personalized safety warnings</span>
      </label>
      <div class="traveler-type-grid">
        <button
          :class="['traveler-btn', { active: localTravelerType === 'all' }]"
          @click="setTravelerType('all')"
        >
          <span class="traveler-icon">👥</span>
          <span class="traveler-label">All Travelers</span>
        </button>
        <button
          :class="['traveler-btn', 'type-solo-female', { active: localTravelerType === 'solo-female' }]"
          @click="setTravelerType('solo-female')"
        >
          <span class="traveler-icon">👩</span>
          <span class="traveler-label">Solo Female</span>
        </button>
        <button
          :class="['traveler-btn', 'type-couple', { active: localTravelerType === 'couple' }]"
          @click="setTravelerType('couple')"
        >
          <span class="traveler-icon">💑</span>
          <span class="traveler-label">Couple</span>
        </button>
        <button
          :class="['traveler-btn', 'type-family', { active: localTravelerType === 'family' }]"
          @click="setTravelerType('family')"
        >
          <span class="traveler-icon">👨‍👩‍👧‍👦</span>
          <span class="traveler-label">Family</span>
        </button>
        <button
          :class="['traveler-btn', 'type-backpacker', { active: localTravelerType === 'backpacker' }]"
          @click="setTravelerType('backpacker')"
        >
          <span class="traveler-icon">🎒</span>
          <span class="traveler-label">Backpacker</span>
        </button>
      </div>
    </div>

    <!-- Results Count -->
    <div class="results-summary">
      <p class="results-text">
        Showing <strong>{{ resultCount }}</strong> scam{{ resultCount !== 1 ? 's' : '' }}
        <span v-if="hasActiveFilters"> matching your filters</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { RiskLocation, ScamCategory, ScamSeverity } from '~/types/scam'
import type { TravelerType } from '~/types/scamData'

const props = defineProps<{
  severity: ScamSeverity | 'all'
  location: string
  category: string
  searchQuery: string
  selectedTags: string[]
  travelerType: TravelerType
  locations: RiskLocation[]
  categories: ScamCategory[]
  resultCount: number
  nearbyMode: boolean
  nearbyLoading: boolean
  nearbyDistance: number | null
  nearbyError: string | null
}>()

const emit = defineEmits<{
  'update:severity': [value: ScamSeverity | 'all']
  'update:location': [value: string]
  'update:category': [value: string]
  'update:searchQuery': [value: string]
  'update:selectedTags': [value: string[]]
  'update:travelerType': [value: TravelerType]
  'toggleNearby': []
  'reset': []
}>()

// Popular tags from scam data
const popularTags = [
  'tuk-tuk',
  'gems',
  'gemstone',
  'card',
  'credit-card',
  'fake',
  'overcharge',
  'taxi',
  'shop',
  'tour',
  'guide',
  'monk',
  'temple',
  'beach',
  'safari',
  'atm'
]

// Local state for v-model
const localSeverity = ref(props.severity)
const localLocation = ref(props.location)
const localCategory = ref(props.category)
const localSearchQuery = ref(props.searchQuery)
const localTravelerType = ref<TravelerType>(props.travelerType)
const selectedTags = ref<string[]>(props.selectedTags || [])

// Sync with props
watch(() => props.severity, (val) => localSeverity.value = val)
watch(() => props.location, (val) => localLocation.value = val)
watch(() => props.travelerType, (val) => localTravelerType.value = val)
watch(() => props.category, (val) => localCategory.value = val)
watch(() => props.searchQuery, (val) => localSearchQuery.value = val)
watch(() => props.selectedTags, (val) => selectedTags.value = val || [])

// Computed location groups
const highRiskLocations = computed(() =>
  props.locations.filter(loc => loc.risk === 'high')
)

const mediumRiskLocations = computed(() =>
  props.locations.filter(loc => loc.risk === 'medium' || loc.risk === 'medium-high')
)

const lowRiskLocations = computed(() =>
  props.locations.filter(loc => loc.risk === 'low')
)

// Check if any filters are active
const hasActiveFilters = computed(() =>
  localSeverity.value !== 'all' ||
  localLocation.value !== 'all' ||
  localCategory.value !== 'all' ||
  localSearchQuery.value.trim() !== '' ||
  selectedTags.value.length > 0
)

// Filter setters
const setSeverity = (value: ScamSeverity | 'all') => {
  localSeverity.value = value
  emit('update:severity', value)
}

const setLocation = (value: string) => {
  localLocation.value = value
  emit('update:location', value)
}

const setCategory = (value: string) => {
  localCategory.value = value
  emit('update:category', value)
}

const setTravelerType = (value: TravelerType) => {
  localTravelerType.value = value
  emit('update:travelerType', value)
}

const setSearchQuery = (value: string) => {
  localSearchQuery.value = value
  emit('update:searchQuery', value)
}

const handleSearchChange = () => {
  emit('update:searchQuery', localSearchQuery.value)
}

const handleLocationChange = () => {
  emit('update:location', localLocation.value)
}

const handleReset = () => {
  setSeverity('all')
  setLocation('all')
  setCategory('all')
  setTravelerType('all')
  setSearchQuery('')
  selectedTags.value = []
  emit('update:selectedTags', [])
  emit('reset')
}

const handleNearbyToggle = () => {
  emit('toggleNearby')
}

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value = [...selectedTags.value, tag]
  }
  emit('update:selectedTags', selectedTags.value)
}

// Helper functions
const getLocationName = (locationId: string): string => {
  const location = props.locations.find(loc => loc.id === locationId)
  return location ? location.name : locationId
}

const getCategoryName = (categoryId: string): string => {
  const category = props.categories.find(cat => cat.id === categoryId)
  return category ? category.name : categoryId
}
</script>

<style scoped>
.scam-filters {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 24px;
}

.filter-section:last-child {
  margin-bottom: 0;
}

.filter-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.filter-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.filter-btn.severity-high.active {
  background: #dc2626;
  border-color: #dc2626;
}

.filter-btn.severity-medium.active {
  background: #d97706;
  border-color: #d97706;
}

.filter-btn.severity-low.active {
  background: #16a34a;
  border-color: #16a34a;
}

.filter-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.category-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.category-pill {
  padding: 8px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  background: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.category-pill:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.category-pill.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
}

/* Tags Pills */
.tags-pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag-pill {
  padding: 6px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 16px;
  background: white;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #6b7280;
}

.tag-pill:hover {
  background: #f9fafb;
  border-color: #cbd5e1;
  color: #374151;
}

.tag-pill.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.category-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.category-pill {
  padding: 8px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  background: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.category-pill:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.category-pill.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.nearby-btn {
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
}

.nearby-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  box-shadow: 0 6px 8px rgba(37, 99, 235, 0.3);
  transform: translateY(-1px);
}

.nearby-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nearby-btn.active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}

.nearby-info {
  margin-top: 8px;
  font-size: 12px;
  color: #059669;
  font-weight: 500;
  text-align: center;
}

.nearby-error {
  margin-top: 8px;
  font-size: 12px;
  color: #dc2626;
  font-weight: 500;
  text-align: center;
}

.active-filters {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid #e5e7eb;
}

.active-filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.reset-btn {
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
}

.tag-close {
  background: none;
  border: none;
  color: #1e40af;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  margin-left: 4px;
}

.tag-close:hover {
  color: #1e3a8a;
}

.results-summary {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
}

.results-text {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.results-text strong {
  color: #1f2937;
  font-weight: 700;
}

/* Traveler Type Filter */
.filter-subtitle {
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: #6b7280;
  margin-top: 2px;
}

.traveler-type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.traveler-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.traveler-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.traveler-btn.active {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-color: #2563eb;
  color: white;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.traveler-btn.type-solo-female.active {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-color: #dc2626;
}

.traveler-btn.type-couple.active {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
  border-color: #ec4899;
}

.traveler-btn.type-family.active {
  background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
  border-color: #16a34a;
}

.traveler-btn.type-backpacker.active {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-color: #f59e0b;
}

.traveler-icon {
  font-size: 28px;
  line-height: 1;
}

.traveler-label {
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}

@media (max-width: 768px) {
  .scam-filters {
    padding: 16px;
  }

  .filter-buttons {
    flex-direction: column;
  }

  .filter-btn {
    width: 100%;
  }

  .active-filters-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .reset-btn {
    width: 100%;
  }
}
</style>
