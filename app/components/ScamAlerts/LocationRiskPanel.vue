<template>
  <transition name="slide-in">
    <div v-if="location" class="risk-panel">
      <div class="panel-header">
        <div class="header-left">
          <h3 class="location-name">{{ location.name }}</h3>
          <span class="location-area">{{ location.area }}</span>
        </div>
        <button class="close-btn" @click="$emit('close')" aria-label="Close panel">
          ×
        </button>
      </div>

      <!-- Risk Score -->
      <div :class="['risk-score-card', `risk-${location.riskLevel}`]">
        <div class="score-label">Overall Risk Level</div>
        <div class="score-display">
          <span class="score-icon">{{ getRiskIcon(location.riskLevel) }}</span>
          <span class="score-text">{{ location.riskLevel.toUpperCase() }}</span>
        </div>
        <div class="risk-description">
          {{ getRiskDescription(location.riskLevel) }}
        </div>
      </div>

      <!-- Top Scams in This Area -->
      <div class="panel-section">
        <h4 class="section-title">⚠️ Top Scams in This Area</h4>
        <div class="scams-list">
          <div
            v-for="scam in topScams"
            :key="scam.id"
            :class="['scam-item', `severity-${scam.severity}`]"
            @click="$emit('scamSelected', scam.id)"
          >
            <div class="scam-item-header">
              <span class="scam-severity-badge">{{ getSeverityIcon(scam.severity) }}</span>
              <span class="scam-name">{{ scam.title }}</span>
            </div>
            <p class="scam-brief">{{ scam.description.substring(0, 100) }}...</p>
          </div>
        </div>
      </div>

      <!-- Recommended Precautions -->
      <div class="panel-section">
        <h4 class="section-title">🛡️ Recommended Precautions</h4>
        <ul class="precautions-list">
          <li v-for="(precaution, index) in locationPrecautions" :key="index">
            {{ precaution }}
          </li>
        </ul>
      </div>

      <!-- Safer Alternatives -->
      <div v-if="saferAlternatives.length > 0" class="panel-section alternatives-section">
        <h4 class="section-title">✅ Safer Alternatives</h4>
        <div class="alternatives-grid">
          <div
            v-for="(alt, index) in saferAlternatives"
            :key="index"
            class="alternative-card"
          >
            <div class="alt-icon">{{ alt.icon }}</div>
            <div class="alt-content">
              <strong class="alt-title">{{ alt.title }}</strong>
              <p class="alt-description">{{ alt.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="quick-stats">
        <div class="stat-item">
          <div class="stat-value">{{ topScams.length }}</div>
          <div class="stat-label">Active Scams</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ highRiskCount }}</div>
          <div class="stat-label">High Risk</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ mediumRiskCount }}</div>
          <div class="stat-label">Medium Risk</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Location {
  id: string
  name: string
  area?: string
  riskLevel: 'high' | 'medium' | 'low'
  coordinates: { lat: number; lng: number }
  summary?: string
  commonScams?: string[]
  precautions?: string[]
  saferAlternatives?: Array<{
    icon: string
    title: string
    description: string
  }>
}

interface Scam {
  id: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  commonLocations: string[]
}

const props = defineProps<{
  location: Location | null
  scams: Scam[]
}>()

const emit = defineEmits<{
  close: []
  scamSelected: [scamId: string]
}>()

// Top scams for this location
const topScams = computed(() => {
  if (!props.location) return []
  
  return props.scams
    .filter(scam => scam.commonLocations.includes(props.location!.id))
    .sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return severityOrder[a.severity] - severityOrder[b.severity]
    })
    .slice(0, 5)
})

// Risk counts
const highRiskCount = computed(() => 
  topScams.value.filter(s => s.severity === 'critical' || s.severity === 'high').length
)

const mediumRiskCount = computed(() => 
  topScams.value.filter(s => s.severity === 'medium').length
)

// Location-specific precautions
const locationPrecautions = computed(() => {
  if (!props.location) return []
  
  // Use custom precautions if available
  if (props.location.precautions && props.location.precautions.length > 0) {
    return props.location.precautions
  }
  
  // Default precautions based on risk level
  const defaults = {
    high: [
      'Stay in well-lit, populated areas',
      'Keep valuables hidden and secure',
      'Use licensed taxis or ride-sharing apps only',
      'Be extremely cautious of unsolicited offers',
      'Travel in groups when possible'
    ],
    medium: [
      'Research prices before making purchases',
      'Use registered tour operators',
      'Keep emergency contacts readily available',
      'Be wary of deals that seem too good to be true'
    ],
    low: [
      'Stay alert and aware of your surroundings',
      'Keep important documents secure',
      'Use common sense with strangers'
    ]
  }
  
  return defaults[props.location.riskLevel] || []
})

// Safer alternatives
const saferAlternatives = computed(() => {
  if (!props.location) return []
  
  // Use custom alternatives if available
  if (props.location.saferAlternatives && props.location.saferAlternatives.length > 0) {
    return props.location.saferAlternatives
  }
  
  // Default alternatives
  return [
    {
      icon: '🚕',
      title: 'Use Uber/PickMe',
      description: 'Metered rides with GPS tracking instead of street tuk-tuks'
    },
    {
      icon: '🏪',
      title: 'Shop at Fixed-Price Stores',
      description: 'Government-run stores have transparent pricing'
    },
    {
      icon: '🎫',
      title: 'Book Official Tours',
      description: 'Use SLTDA-registered tour operators'
    }
  ]
})

// Helper functions
const getRiskIcon = (level: string): string => {
  const icons = { high: '🔴', medium: '🟡', low: '🟢' }
  return icons[level as keyof typeof icons] || '⚪'
}

const getSeverityIcon = (severity: string): string => {
  const icons = { critical: '🚨', high: '🔴', medium: '🟡', low: '🟢' }
  return icons[severity as keyof typeof icons] || '⚪'
}

const getRiskDescription = (level: string): string => {
  const descriptions = {
    high: 'Heightened caution required. Multiple high-risk scams are common in this area.',
    medium: 'Moderate vigilance needed. Some scams are present but manageable with awareness.',
    low: 'Generally safe with minimal scam activity. Standard precautions sufficient.'
  }
  return descriptions[level as keyof typeof descriptions] || ''
}
</script>

<style scoped>
.risk-panel {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 24px;
  margin-bottom: 32px;
  border: 2px solid #e5e7eb;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.location-name {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.location-area {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 24px;
  line-height: 1;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}

/* Risk Score Card */
.risk-score-card {
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  text-align: center;
  border: 2px solid;
}

.risk-score-card.risk-high {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.02) 100%);
  border-color: #dc2626;
}

.risk-score-card.risk-medium {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(251, 146, 60, 0.02) 100%);
  border-color: #f59e0b;
}

.risk-score-card.risk-low {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 100%);
  border-color: #10b981;
}

.score-label {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.score-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.score-icon {
  font-size: 32px;
}

.score-text {
  font-size: 28px;
  font-weight: 800;
}

.risk-high .score-text {
  color: #dc2626;
}

.risk-medium .score-text {
  color: #d97706;
}

.risk-low .score-text {
  color: #059669;
}

.risk-description {
  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;
  max-width: 500px;
  margin: 0 auto;
}

/* Panel Sections */
.panel-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
}

/* Scams List */
.scams-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.scam-item {
  padding: 16px;
  border-radius: 10px;
  border-left: 4px solid;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s;
}

.scam-item:hover {
  background: #f3f4f6;
  transform: translateX(4px);
}

.scam-item.severity-critical,
.scam-item.severity-high {
  border-left-color: #dc2626;
}

.scam-item.severity-medium {
  border-left-color: #f59e0b;
}

.scam-item.severity-low {
  border-left-color: #10b981;
}

.scam-item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.scam-severity-badge {
  font-size: 16px;
}

.scam-name {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.scam-brief {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Precautions List */
.precautions-list {
  margin: 0;
  padding-left: 24px;
}

.precautions-list li {
  font-size: 14px;
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 10px;
  position: relative;
}

.precautions-list li::marker {
  color: #2563eb;
  font-weight: 700;
}

/* Alternatives Section */
.alternatives-section {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.01) 100%);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #dbeafe;
}

.alternatives-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alternative-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;
}

.alternative-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.alt-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.alt-content {
  flex: 1;
}

.alt-title {
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
  display: block;
  margin-bottom: 4px;
}

.alt-description {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid #f3f4f6;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Animations */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.4s ease;
}

.slide-in-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-in-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .risk-panel {
    padding: 16px;
  }

  .location-name {
    font-size: 20px;
  }

  .score-text {
    font-size: 24px;
  }

  .quick-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .stat-value {
    font-size: 24px;
  }
}
</style>
