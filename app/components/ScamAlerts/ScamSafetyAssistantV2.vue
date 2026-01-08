<template>
  <div class="safety-assistant">
    <div class="assistant-header">
      <div class="header-content">
        <span class="assistant-icon">🛡️</span>
        <h3>Context-Aware Safety Assistant</h3>
      </div>
      <button @click="toggleAssistant" class="toggle-btn">
        {{ isExpanded ? '−' : '+' }}
      </button>
    </div>

    <div v-if="isExpanded" class="assistant-body">
      <!-- Context Selection -->
      <div class="context-selection">
        <div class="selection-group">
          <label class="selection-label">
            <span class="icon">📍</span>
            Where are you going?
          </label>
          <select v-model="selectedLocationId" class="context-select">
            <option value="">Select Location...</option>
            <optgroup label="High Risk Areas">
              <option 
                v-for="loc in highRiskLocations" 
                :key="loc.id" 
                :value="loc.id"
              >
                {{ loc.name }}
              </option>
            </optgroup>
            <optgroup label="Medium Risk Areas">
              <option 
                v-for="loc in mediumRiskLocations" 
                :key="loc.id" 
                :value="loc.id"
              >
                {{ loc.name }}
              </option>
            </optgroup>
            <optgroup label="Low Risk Areas">
              <option 
                v-for="loc in lowRiskLocations" 
                :key="loc.id" 
                :value="loc.id"
              >
                {{ loc.name }}
              </option>
            </optgroup>
          </select>
        </div>

        <div class="selection-group">
          <label class="selection-label">
            <span class="icon">🎯</span>
            What will you do?
          </label>
          <select v-model="selectedActivityId" class="context-select">
            <option value="">Select Activity...</option>
            <option 
              v-for="activity in allActivities" 
              :key="activity.id" 
              :value="activity.id"
            >
              {{ activity.label }}
            </option>
          </select>
        </div>

        <button 
          @click="getContextualAdvice"
          :disabled="!canGetAdvice"
          :class="['get-advice-btn', { disabled: !canGetAdvice }]"
        >
          {{ adviceGenerated ? '🔄 Update Advice' : '✨ Get Personalized Advice' }}
        </button>
      </div>

      <!-- Contextual Advice Results -->
      <div v-if="adviceGenerated && contextualAdvice" class="advice-results">
        <!-- Context Summary -->
        <div class="context-summary">
          <div class="summary-badge">
            <span class="badge-icon">📍</span>
            <span class="badge-text">{{ selectedLocation?.name }}</span>
          </div>
          <div class="summary-badge">
            <span class="badge-icon">🎯</span>
            <span class="badge-text">{{ selectedActivity?.label }}</span>
          </div>
          <div :class="['risk-indicator', `risk-${selectedLocation?.riskLevel}`]">
            {{ selectedLocation?.riskLevel.toUpperCase() }} RISK AREA
          </div>
        </div>

        <!-- Top 3 Relevant Scams -->
        <div class="top-scams-section">
          <h4 class="section-title">
            <span class="icon">⚠️</span>
            Top {{ contextualAdvice.topScams.length }} Threats in This Context
          </h4>

          <div v-for="(scamInfo, index) in contextualAdvice.topScams" :key="scamInfo.scam.id" class="scam-detail-card">
            <!-- Scam Header -->
            <div class="scam-header">
              <div class="scam-title-row">
                <span class="scam-rank">#{{ index + 1 }}</span>
                <h5 class="scam-title">{{ scamInfo.scam.title }}</h5>
              </div>
              <span :class="['severity-badge', `severity-${scamInfo.scam.severity}`]">
                {{ scamInfo.scam.severity.toUpperCase() }}
              </span>
            </div>

            <!-- Why It Happens Here -->
            <div class="why-section">
              <strong class="subsection-title">🤔 Why This Happens Here:</strong>
              <p class="context-explanation">{{ scamInfo.whyHere }}</p>
            </div>

            <!-- What To Do -->
            <div class="what-to-do-section">
              <strong class="subsection-title">✅ What To Do:</strong>
              <ul class="action-list">
                <li v-for="(tip, tipIndex) in scamInfo.whatToDo" :key="tipIndex">
                  {{ tip }}
                </li>
              </ul>
            </div>

            <!-- Avoid This -->
            <div class="avoid-section">
              <strong class="subsection-title">🚫 Avoid This:</strong>
              <ul class="warning-list">
                <li v-for="(warning, warnIndex) in scamInfo.avoidThis" :key="warnIndex">
                  {{ warning }}
                </li>
              </ul>
            </div>

            <!-- Real Example -->
            <div v-if="scamInfo.realExample" class="example-section">
              <strong class="subsection-title">📖 Real Example:</strong>
              <p class="example-text">{{ scamInfo.realExample }}</p>
            </div>

            <!-- Emergency Note for High/Critical -->
            <div 
              v-if="scamInfo.scam.severity === 'critical' || scamInfo.scam.severity === 'high'" 
              class="emergency-note"
            >
              <span class="emergency-icon">🚨</span>
              <div class="emergency-content">
                <strong>High Risk Alert:</strong>
                <p>
                  If you encounter this scam, document everything (photos, names, receipts) and 
                  <a href="tel:1912" class="emergency-link">call Tourist Police: 1912</a> immediately.
                  {{ scamInfo.scam.severity === 'critical' ? 'This scam has resulted in significant financial losses for tourists.' : '' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Overall Context Tips -->
        <div class="overall-tips-section">
          <h4 class="section-title">
            <span class="icon">💡</span>
            General Tips for {{ selectedLocation?.name }} + {{ selectedActivity?.label }}
          </h4>
          <ul class="general-tips-list">
            <li v-for="(tip, index) in contextualAdvice.generalTips" :key="index">
              {{ tip }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Placeholder when no advice generated -->
      <div v-else-if="!adviceGenerated" class="advice-placeholder">
        <div class="placeholder-icon">🎯</div>
        <h4>Get Personalized Safety Advice</h4>
        <p>Select your destination and activity above to receive context-specific scam warnings and prevention tips.</p>
        <div class="placeholder-examples">
          <strong>Try these combinations:</strong>
          <ul>
            <li>📍 Colombo Fort + 🚕 Transportation</li>
            <li>📍 Kandy Temple + 🛕 Religious Sites</li>
            <li>📍 Galle Fort + 🛍️ Shopping & Markets</li>
            <li>📍 Hikkaduwa Beach + 🌊 Beach & Water Sports</li>
          </ul>
        </div>
      </div>

      <!-- Quick Emergency Access -->
      <div class="quick-emergency">
        <button @click="showEmergencyContacts" class="emergency-btn">
          🚨 Emergency Contacts & Reporting
        </button>
      </div>

      <!-- Emergency Contacts Modal -->
      <div v-if="showEmergency" class="emergency-modal" @click.self="showEmergency = false">
        <div class="emergency-content">
          <button @click="showEmergency = false" class="modal-close">×</button>
          <h3>🚨 Emergency Contacts</h3>
          
          <div class="emergency-contacts">
            <div class="contact-card primary">
              <div class="contact-icon">👮</div>
              <div class="contact-info">
                <strong>Tourist Police Hotline</strong>
                <a :href="`tel:${emergencyInfo.touristPoliceContact.number}`" class="contact-number">
                  {{ emergencyInfo.touristPoliceContact.number }}
                </a>
                <p class="contact-description">{{ emergencyInfo.touristPoliceContact.description }}</p>
              </div>
            </div>

            <div class="contact-card">
              <div class="contact-icon">🚓</div>
              <div class="contact-info">
                <strong>Police Emergency</strong>
                <a :href="`tel:${emergencyInfo.emergencyNumbers.police}`" class="contact-number">
                  {{ emergencyInfo.emergencyNumbers.police }}
                </a>
              </div>
            </div>

            <div class="contact-card">
              <div class="contact-icon">🚨</div>
              <div class="contact-info">
                <strong>General Emergency</strong>
                <a :href="`tel:${emergencyInfo.emergencyNumbers.emergency}`" class="contact-number">
                  {{ emergencyInfo.emergencyNumbers.emergency }}
                </a>
              </div>
            </div>

            <div class="contact-card">
              <div class="contact-icon">🏛️</div>
              <div class="contact-info">
                <strong>Consumer Affairs</strong>
                <a :href="`tel:${emergencyInfo.emergencyNumbers.consumerAffairs}`" class="contact-number">
                  {{ emergencyInfo.emergencyNumbers.consumerAffairs }}
                </a>
              </div>
            </div>
          </div>

          <div class="what-to-do-if-scammed">
            <h4>📋 What To Do If You've Been Scammed:</h4>
            <ol class="steps-list">
              <li v-for="(step, index) in emergencyInfo.whatToDoIfScammed" :key="index">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ScamType, Location, Activity } from '~/types/scamData'
import { useScamData } from '~/composables/useScamData'

const {
  allScams,
  allLocations,
  allActivities,
  emergencyInfo,
  getLocationById,
  getScamsForActivity
} = useScamData()

// Component state
const isExpanded = ref(true)
const showEmergency = ref(false)
const selectedLocationId = ref<string>('')
const selectedActivityId = ref<string>('')
const adviceGenerated = ref(false)

// Computed locations by risk level
const highRiskLocations = computed(() => 
  allLocations.value.filter(loc => loc.riskLevel === 'high')
)
const mediumRiskLocations = computed(() => 
  allLocations.value.filter(loc => loc.riskLevel === 'medium')
)
const lowRiskLocations = computed(() => 
  allLocations.value.filter(loc => loc.riskLevel === 'low')
)

// Selected context
const selectedLocation = computed(() => 
  selectedLocationId.value ? getLocationById(selectedLocationId.value) : null
)
const selectedActivity = computed(() => 
  allActivities.value.find(a => a.id === selectedActivityId.value)
)

const canGetAdvice = computed(() => 
  selectedLocationId.value && selectedActivityId.value
)

// Context-aware advice interface
interface ScamAdviceDetail {
  scam: ScamType
  whyHere: string
  whatToDo: string[]
  avoidThis: string[]
  realExample: string
}

interface ContextualAdvice {
  topScams: ScamAdviceDetail[]
  generalTips: string[]
}

const contextualAdvice = ref<ContextualAdvice | null>(null)

// Generate context-aware advice
function getContextualAdvice() {
  if (!selectedLocation.value || !selectedActivity.value) return

  const location = selectedLocation.value
  const activity = selectedActivity.value

  // Get scams relevant to this location AND activity
  const locationScamIds = location.commonScams
  const activityScamIds = activity.relatedScams
  
  // Find intersection - scams that appear in BOTH location and activity
  const relevantScamIds = locationScamIds.filter(id => activityScamIds.includes(id))
  
  // If no intersection, use location scams that match activity category
  let relevantScams = allScams.value.filter(scam => relevantScamIds.includes(scam.id))
  
  if (relevantScams.length === 0) {
    // Fallback: use activity scams that are in this location
    relevantScams = allScams.value.filter(scam => 
      activityScamIds.includes(scam.id) && locationScamIds.includes(scam.id)
    )
  }
  
  if (relevantScams.length === 0) {
    // Final fallback: just use location scams
    relevantScams = allScams.value.filter(scam => locationScamIds.includes(scam.id))
  }

  // Sort by severity (critical > high > medium > low)
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  relevantScams.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])

  // Take top 3
  const topScams = relevantScams.slice(0, 3).map(scam => ({
    scam,
    whyHere: generateWhyHere(scam, location, activity),
    whatToDo: scam.preventionTips.slice(0, 4),
    avoidThis: generateAvoidThis(scam, location, activity),
    realExample: scam.realExamples[0] || scam.description
  }))

  // Generate general contextual tips
  const generalTips = generateGeneralTips(location, activity, relevantScams)

  contextualAdvice.value = {
    topScams,
    generalTips
  }

  adviceGenerated.value = true
}

// Generate "Why This Happens Here" explanation
function generateWhyHere(scam: ScamType, location: Location, activity: Activity): string {
  const locationName = location.name
  const activityName = activity.label.toLowerCase()

  // Context-specific explanations
  const contexts: Record<string, string> = {
    // Colombo + Transport
    'colombo-fort-transport': `${locationName} is a major transportation hub where tourists frequently arrive. Scammers target new arrivals who are unfamiliar with local prices and transportation options.`,
    'colombo-airport-transport': `At ${locationName}, tourists are especially vulnerable right after arrival - tired, carrying luggage, and unfamiliar with fair taxi prices. Scammers know this is prime opportunity.`,
    
    // Kandy + Temple
    'kandy-temple-temple': `The ${locationName} is Sri Lanka's most sacred Buddhist site, attracting thousands of tourists daily. Scammers disguise themselves as guides or monks to exploit visitors' respect for religious sites.`,
    'kandy-temple-sightseeing': `${locationName} sees massive tourist crowds. Fake guides position themselves at entrances knowing tourists want cultural context and are willing to pay for guidance.`,
    
    // Galle + Shopping
    'galle-fort-shopping': `${locationName} is a UNESCO World Heritage site with many shops. The historic setting makes gem and antique shops seem legitimate, but many use high-pressure tactics on tourists.`,
    'colombo-pettah-shopping': `${locationName} is Colombo's busiest market district. The crowded, chaotic environment makes it easy for scammers to distract tourists while pickpocketing or overcharging.`,
    
    // Beach + Nightlife
    'hikkaduwa-nightlife': `${locationName} is a popular beach party destination. Scammers befriend lone tourists at bars, gain their trust, then disappear leaving victims with inflated bills.`,
    'unawatuna-nightlife': `In ${locationName}'s relaxed beach atmosphere, tourists let their guard down. Friendly locals offering drinks can be working with bartenders to run bill scams.`,
    
    // Safari
    'yala-safari': `${locationName} is Sri Lanka's premier wildlife park. Unlicensed operators prey on tourists' desire to see leopards, taking their money but never actually entering the park.`
  }

  const contextKey = `${location.id}-${activity.id}`
  if (contexts[contextKey]) {
    return contexts[contextKey]
  }

  // Generic context-based explanation
  if (scam.category === activity.id) {
    return `${locationName} is a ${location.riskLevel}-risk area for ${activityName}. ${scam.title} is particularly common here because of the high concentration of tourists engaging in ${activityName}.`
  }

  return `In ${locationName}, ${scam.title.toLowerCase()} frequently targets tourists during ${activityName} activities. The area's ${location.riskLevel} risk level means scammers actively operate here.`
}

// Generate "Avoid This" warnings
function generateAvoidThis(scam: ScamType, location: Location, activity: Activity): string[] {
  const warnings: string[] = []

  // Scam-specific warnings
  const scamWarnings: Record<string, string[]> = {
    'tuktuk-overcharge': [
      'Never accept rides from tuk-tuks that approach you unsolicited',
      'Don\'t agree to "city tours" offered by drivers at tourist spots',
      'Avoid tuk-tuks without working meters or drivers who refuse to use them',
      'Never let the driver make unscheduled stops at shops or gardens'
    ],
    'gemstone-scams': [
      'Never visit gem shops recommended by tuk-tuk drivers or guides',
      'Avoid shops that claim "government approval" without verification',
      'Don\'t believe promises of profitable export business opportunities',
      'Never purchase gems without independent appraisal from your own expert'
    ],
    'fake-tour-guides': [
      'Don\'t accept unsolicited guide services at temple or site entrances',
      'Avoid anyone claiming to be an official guide without proper ID badge',
      'Never follow strangers who offer "free" tours or cultural experiences',
      'Don\'t feel obligated to pay guides you never hired'
    ],
    'fake-monk-blessing': [
      'Never accept flowers, wristbands, or items from anyone at temple entrances',
      'Don\'t give money to anyone aggressively demanding donations',
      'Avoid "monks" who handle cash directly (against Buddhist precepts)',
      'Don\'t participate in blessing ceremonies initiated by strangers'
    ],
    'currency-exchange': [
      'Never exchange money with street vendors or unmarked shops',
      'Avoid exchange counters offering rates significantly above market',
      'Don\'t let money changers handle your cash without counting in front of you',
      'Never let your credit card leave your sight during transactions'
    ],
    'friendly-local-bar': [
      'Don\'t accept drink invitations from strangers you just met',
      'Avoid bars or restaurants suggested by new acquaintances',
      'Never leave your drink unattended or let strangers order for you',
      'Don\'t agree to split bills without seeing the itemized receipt first'
    ],
    'fake-safari-guides': [
      'Don\'t book safari tours from street touts or hotel imposters',
      'Avoid operators who can\'t show official park entry permits',
      'Never pay full price without confirming actual park entrance',
      'Don\'t trust safari operators with unrealistically low prices'
    ]
  }

  const scamSpecificWarnings = scamWarnings[scam.id]
  if (scamSpecificWarnings) {
    warnings.push(...scamSpecificWarnings.slice(0, 3))
  } else {
    // Generic warnings based on scam category
    warnings.push(
      `Avoid anyone offering ${scam.category}-related services unsolicited in ${location.name}`,
      `Don't trust deals that seem too good to be true in this ${location.riskLevel}-risk area`,
      `Never feel pressured to make quick decisions involving money or personal safety`
    )
  }

  return warnings
}

// Generate general contextual tips
function generateGeneralTips(location: Location, activity: Activity, scams: ScamType[]): string[] {
  const tips: string[] = []

  // Location-based tip
  if (location.riskLevel === 'high') {
    tips.push(`${location.name} is a high-risk area - stay extra vigilant and keep valuables secure`)
  } else if (location.riskLevel === 'medium') {
    tips.push(`Exercise normal caution in ${location.name} - be aware of your surroundings`)
  }

  // Activity-based tip
  const activityTips: Record<string, string> = {
    'transport': 'Always use official transportation apps (PickMe, Uber) or pre-book through your hotel',
    'shopping': 'Research market prices before shopping and be prepared to walk away from pushy vendors',
    'sightseeing': 'Book tours through licensed operators and verify guide credentials',
    'temple': 'Dress modestly, respect religious customs, and decline unsolicited blessings or donations',
    'nightlife': 'Stay in groups, watch your drinks, and check bills carefully before paying',
    'beach': 'Inspect rental equipment thoroughly and take photos before use',
    'safari': 'Only book through licensed operators who show official park entry documentation',
    'money': 'Use ATMs inside banks during business hours and count cash carefully',
    'accommodation': 'Verify all hotel staff with reception and never share room numbers'
  }

  const activitySpecificTip = activityTips[activity.id]
  if (activitySpecificTip) {
    tips.push(activitySpecificTip)
  }

  // High-severity scam warning
  const criticalScam = scams.find(s => s.severity === 'critical')
  if (criticalScam) {
    tips.push(`CRITICAL: ${criticalScam.title} has caused major financial losses - be extremely careful`)
  }

  // General tips
  tips.push(
    'Keep emergency number 1912 (Tourist Police) saved in your phone',
    'Take photos of anyone suspicious and document all transactions',
    'Trust your instincts - if something feels wrong, walk away immediately'
  )

  return tips.slice(0, 6)
}

function toggleAssistant() {
  isExpanded.value = !isExpanded.value
}

function showEmergencyContacts() {
  showEmergency.value = true
}
</script>

<style scoped>
.safety-assistant {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

.assistant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.assistant-icon {
  font-size: 1.75rem;
}

.assistant-header h3 {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.assistant-body {
  padding: 1.5rem;
  background: white;
}

/* Context Selection */
.context-selection {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.selection-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.selection-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
}

.selection-label .icon {
  font-size: 1.25rem;
}

.context-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.context-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.get-advice-btn {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.get-advice-btn:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.get-advice-btn.disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  box-shadow: none;
}

/* Advice Results */
.advice-results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.context-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.summary-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.badge-icon {
  font-size: 1.25rem;
}

.badge-text {
  font-weight: 600;
  color: #2d3748;
}

.risk-indicator {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.risk-indicator.risk-high {
  background: #fed7d7;
  color: #c53030;
}

.risk-indicator.risk-medium {
  background: #feebc8;
  color: #c05621;
}

.risk-indicator.risk-low {
  background: #c6f6d5;
  color: #22543d;
}

/* Top Scams Section */
.top-scams-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.section-title .icon {
  font-size: 1.5rem;
}

.scam-detail-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
}

.scam-detail-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.scam-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.scam-title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.scam-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.scam-title {
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.severity-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.severity-badge.severity-critical {
  background: #742a2a;
  color: white;
}

.severity-badge.severity-high {
  background: #fed7d7;
  color: #c53030;
}

.severity-badge.severity-medium {
  background: #feebc8;
  color: #c05621;
}

.severity-badge.severity-low {
  background: #bee3f8;
  color: #2c5282;
}

.subsection-title {
  display: block;
  color: #2d3748;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.why-section,
.what-to-do-section,
.avoid-section,
.example-section {
  padding: 1rem;
  border-radius: 8px;
}

.why-section {
  background: #ebf8ff;
  border-left: 3px solid #3182ce;
}

.context-explanation {
  color: #2c5282;
  line-height: 1.6;
  margin: 0;
}

.what-to-do-section {
  background: #f0fff4;
  border-left: 3px solid #38a169;
}

.action-list {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
  color: #22543d;
}

.action-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.avoid-section {
  background: #fff5f5;
  border-left: 3px solid #e53e3e;
}

.warning-list {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
  color: #742a2a;
}

.warning-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.example-section {
  background: #faf5ff;
  border-left: 3px solid #805ad5;
}

.example-text {
  color: #553c9a;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

.emergency-note {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #742a2a 0%, #c53030 100%);
  border-radius: 8px;
  color: white;
}

.emergency-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.emergency-content strong {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.emergency-content p {
  margin: 0;
  line-height: 1.6;
}

.emergency-link {
  color: #fed7d7;
  text-decoration: underline;
  font-weight: 700;
}

.emergency-link:hover {
  color: white;
}

/* Overall Tips */
.overall-tips-section {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.general-tips-list {
  margin: 1rem 0 0 0;
  padding-left: 1.5rem;
  color: #2d3748;
}

.general-tips-list li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
  font-weight: 500;
}

/* Placeholder */
.advice-placeholder {
  text-align: center;
  padding: 3rem 2rem;
  color: #4a5568;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.advice-placeholder h4 {
  font-size: 1.5rem;
  color: #2d3748;
  margin: 0 0 1rem 0;
}

.advice-placeholder p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.placeholder-examples {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
}

.placeholder-examples strong {
  display: block;
  margin-bottom: 1rem;
  color: #2d3748;
}

.placeholder-examples ul {
  margin: 0;
  padding-left: 1.5rem;
}

.placeholder-examples li {
  margin-bottom: 0.75rem;
  color: #4a5568;
}

/* Quick Emergency */
.quick-emergency {
  margin-top: 1rem;
}

.emergency-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #c53030 0%, #742a2a 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.emergency-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(197, 48, 48, 0.4);
}

/* Emergency Modal */
.emergency-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.emergency-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #e2e8f0;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #cbd5e0;
  transform: scale(1.1);
}

.emergency-content h3 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
  font-size: 1.5rem;
}

.emergency-contacts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.contact-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.contact-card.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.contact-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.contact-info {
  flex: 1;
}

.contact-info strong {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.contact-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  text-decoration: none;
  margin-bottom: 0.5rem;
}

.primary .contact-number {
  color: white;
}

.contact-number:hover {
  text-decoration: underline;
}

.contact-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.contact-email {
  color: #4a5568;
  font-size: 0.95rem;
  margin: 0;
}

.what-to-do-if-scammed {
  background: #fff5f5;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #e53e3e;
}

.what-to-do-if-scammed h4 {
  margin: 0 0 1rem 0;
  color: #742a2a;
}

.steps-list {
  margin: 0;
  padding-left: 1.5rem;
  color: #742a2a;
}

.steps-list li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .assistant-header {
    padding: 1rem;
  }

  .assistant-header h3 {
    font-size: 1rem;
  }

  .assistant-body {
    padding: 1rem;
  }

  .context-selection {
    padding: 1rem;
  }

  .scam-detail-card {
    padding: 1rem;
  }

  .emergency-content {
    padding: 1.5rem;
  }
}
</style>
