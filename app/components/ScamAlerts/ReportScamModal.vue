<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <!-- Header -->
        <div class="modal-header">
          <h2 class="modal-title">📢 Report a Scam</h2>
          <button aria-label="Close modal" class="close-btn" @click="closeModal">
            ×
          </button>
        </div>

        <!-- Form -->
        <div class="modal-body">
          <!-- Step Indicator -->
          <div class="step-indicator">
            <div :class="['step', { active: currentStep === 1, completed: currentStep > 1 }]">
              <span class="step-number">1</span>
              <span class="step-label">Location</span>
            </div>
            <div class="step-divider" />
            <div :class="['step', { active: currentStep === 2, completed: currentStep > 2 }]">
              <span class="step-number">2</span>
              <span class="step-label">Details</span>
            </div>
            <div class="step-divider" />
            <div :class="['step', { active: currentStep === 3 }]">
              <span class="step-number">3</span>
              <span class="step-label">Submit</span>
            </div>
          </div>

          <!-- Step 1: Location Selection -->
          <div v-if="currentStep === 1" class="form-step">
            <h3 class="step-title">📍 Where did this scam occur?</h3>
            <p class="step-description">Click on the map to mark the exact location</p>
            
            <div class="map-container">
              <ClientOnly>
                <div id="report-map" class="report-map" />
                <template #fallback>
                  <div class="map-loading">Loading map...</div>
                </template>
              </ClientOnly>
            </div>

            <div v-if="selectedLocation" class="location-info">
              <span class="location-icon">📍</span>
              <div class="location-details">
                <strong>Selected Location:</strong>
                <p>Lat: {{ selectedLocation.lat.toFixed(6) }}, Lng: {{ selectedLocation.lng.toFixed(6) }}</p>
              </div>
            </div>

            <div v-else class="location-prompt">
              <span class="prompt-icon">👆</span>
              <p>Click anywhere on the map to place a marker</p>
            </div>
          </div>

          <!-- Step 2: Scam Details -->
          <div v-if="currentStep === 2" class="form-step">
            <h3 class="step-title">⚠️ Scam Details</h3>
            
            <div class="form-group">
              <label class="form-label">
                Scam Type <span class="required">*</span>
              </label>
              <select v-model="formData.scamType" class="form-select" required>
                <option value="">Select scam type...</option>
                <option v-for="scam in scamTypes" :key="scam.id" :value="scam.id">
                  {{ scam.title }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">
                Description <span class="required">*</span>
              </label>
              <textarea
                v-model="formData.description"
                class="form-textarea"
                placeholder="Describe what happened in detail..."
                rows="6"
                required
              />
              <span class="char-count">{{ formData.description.length }} / 500</span>
            </div>

            <div class="form-group">
              <label class="form-label">Severity (Optional)</label>
              <div class="severity-buttons">
                <button
                  v-for="severity in severityOptions"
                  :key="severity.value"
                  type="button"
                  :class="['severity-btn', severity.value, { active: formData.severity === severity.value }]"
                  @click="formData.severity = severity.value"
                >
                  {{ severity.icon }} {{ severity.label }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="formData.anonymous" type="checkbox">
                <span>Report anonymously (your identity will not be shared)</span>
              </label>
            </div>
          </div>

          <!-- Step 3: Review & Submit -->
          <div v-if="currentStep === 3" class="form-step">
            <h3 class="step-title">✅ Review Your Report</h3>
            
            <div class="review-section">
              <div class="review-item">
                <strong>Location:</strong>
                <p>{{ selectedLocation?.lat.toFixed(6) }}, {{ selectedLocation?.lng.toFixed(6) }}</p>
              </div>
              <div class="review-item">
                <strong>Scam Type:</strong>
                <p>{{ getScamTitle(formData.scamType) }}</p>
              </div>
              <div class="review-item">
                <strong>Description:</strong>
                <p>{{ formData.description }}</p>
              </div>
              <div v-if="formData.severity" class="review-item">
                <strong>Severity:</strong>
                <span :class="['severity-badge', formData.severity]">
                  {{ getSeverityLabel(formData.severity) }}
                </span>
              </div>
              <div class="review-item">
                <strong>Anonymous:</strong>
                <p>{{ formData.anonymous ? 'Yes' : 'No' }}</p>
              </div>
            </div>

            <!-- Emergency Contact Info -->
            <div class="emergency-info">
              <h4 class="emergency-title">🚨 Need Immediate Help?</h4>
              <div class="contact-grid">
                <div class="contact-item">
                  <span class="contact-icon">👮</span>
                  <div>
                    <strong>Tourist Police</strong>
                    <a href="tel:1912" class="contact-number">1912</a>
                  </div>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">🚔</span>
                  <div>
                    <strong>Emergency</strong>
                    <a href="tel:119" class="contact-number">119</a>
                  </div>
                </div>
              </div>
              <p class="emergency-note">
                📞 For serious incidents requiring immediate assistance, call the numbers above first
              </p>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="error-message">
            <span class="error-icon">⚠️</span>
            {{ errorMessage }}
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="success-message">
            <span class="success-icon">✅</span>
            {{ successMessage }}
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button
            v-if="currentStep > 1 && !successMessage"
            class="btn btn-secondary"
            @click="previousStep"
          >
            ← Back
          </button>
          <button
            v-if="currentStep < 3 && !successMessage"
            :disabled="!canProceed"
            class="btn btn-primary"
            @click="nextStep"
          >
            Next →
          </button>
          <button
            v-if="currentStep === 3 && !successMessage"
            :disabled="submitting"
            class="btn btn-submit"
            @click="submitReport"
          >
            {{ submitting ? 'Submitting...' : '📢 Submit Report' }}
          </button>
          <button
            v-if="successMessage"
            class="btn btn-primary"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import type { ScamType } from '~/types/scamData'
import type L from 'leaflet'

interface ScamReport {
  id: string
  location: { lat: number; lng: number } | null
  scamType: string
  description: string
  severity: string | null
  anonymous: boolean
  status: string
  timestamp: string
}

const props = defineProps<{
  show: boolean
  scamTypes: ScamType[]
}>()

const emit = defineEmits<{
  close: []
  submit: [report: ScamReport]
}>()

// Form state
const currentStep = ref(1)
const selectedLocation = ref<{ lat: number; lng: number } | null>(null)
const formData = ref({
  scamType: '',
  description: '',
  severity: null as string | null,
  anonymous: false
})
const errorMessage = ref('')
const successMessage = ref('')
const submitting = ref(false)

// Map instance
let map: L.Map | null = null
let marker: L.Marker | null = null

// Severity options
const severityOptions = [
  { value: 'critical', label: 'Critical', icon: '🚨' },
  { value: 'high', label: 'High', icon: '🔴' },
  { value: 'medium', label: 'Medium', icon: '🟡' },
  { value: 'low', label: 'Low', icon: '🟢' }
]

// Computed
const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return selectedLocation.value !== null
  }
  if (currentStep.value === 2) {
    return formData.value.scamType && formData.value.description.trim().length > 10
  }
  return true
})

// Methods
const closeModal = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  currentStep.value = 1
  selectedLocation.value = null
  formData.value = {
    scamType: '',
    description: '',
    severity: null,
    anonymous: false
  }
  errorMessage.value = ''
  successMessage.value = ''
  submitting.value = false
}

const nextStep = () => {
  if (canProceed.value) {
    currentStep.value++
    errorMessage.value = ''
  } else {
    if (currentStep.value === 1) {
      errorMessage.value = 'Please select a location on the map'
    } else if (currentStep.value === 2) {
      errorMessage.value = 'Please fill in all required fields'
    }
  }
}

const previousStep = () => {
  currentStep.value--
  errorMessage.value = ''
}

const getScamTitle = (scamId: string): string => {
  const scam = props.scamTypes.find(s => s.id === scamId)
  return scam ? scam.title : scamId
}

const getSeverityLabel = (severity: string): string => {
  const option = severityOptions.find(s => s.value === severity)
  return option ? option.label : severity
}

const submitReport = async () => {
  submitting.value = true
  errorMessage.value = ''

  try {
    // Create report object
    const report = {
      id: Date.now().toString(),
      location: selectedLocation.value,
      scamType: formData.value.scamType,
      description: formData.value.description,
      severity: formData.value.severity || 'medium',
      anonymous: formData.value.anonymous,
      status: 'pending',
      timestamp: new Date().toISOString()
    }

    // Store in localStorage
    const existingReports = JSON.parse(localStorage.getItem('scamReports') || '[]')
    existingReports.push(report)
    localStorage.setItem('scamReports', JSON.stringify(existingReports))

    // Emit submit event
    emit('submit', report)

    // Show success
    successMessage.value = '✅ Report submitted successfully! Thank you for helping keep travelers safe.'
    
    // Auto-close after 2 seconds
    setTimeout(() => {
      closeModal()
    }, 2000)
  } catch {
    errorMessage.value = 'Failed to submit report. Please try again.'
  } finally {
    submitting.value = false
  }
}

// Initialize map
const initMap = async () => {
  if (typeof window === 'undefined') return

  const L = (await import('leaflet')).default

  // Initialize map
  map = L.map('report-map').setView([7.8731, 80.7718], 8) // Center of Sri Lanka

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  // Add click handler
  map.on('click', (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng
    selectedLocation.value = { lat, lng }

    // Remove existing marker
    if (marker && map) {
      map.removeLayer(marker)
    }

    // Add new marker
    marker = L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }).addTo(map!)

    marker.bindPopup('📍 Scam location').openPopup()
  })
}

// Watch for modal show
watch(() => props.show, (newVal) => {
  if (newVal && currentStep.value === 1) {
    // Wait for DOM to update
    setTimeout(() => {
      initMap()
    }, 100)
  }
})

// Cleanup
onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  overflow-y: auto;
}

.modal-container {
  background: white;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 2px solid #e5e7eb;
}

.modal-title {
  font-size: 24px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 28px;
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

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

/* Step Indicator */
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s;
}

.step.active .step-number {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.step.completed .step-number {
  background: #10b981;
  color: white;
}

.step-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
}

.step.active .step-label {
  color: #2563eb;
}

.step-divider {
  width: 60px;
  height: 2px;
  background: #e5e7eb;
  margin: 0 8px;
}

/* Form Steps */
.form-step {
  animation: fade-in 0.3s ease-out;
}

.step-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.step-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 20px 0;
}

/* Map Container */
.map-container {
  margin-bottom: 20px;
}

.report-map {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
}

.map-loading {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  border-radius: 12px;
  border: 2px dashed #d1d5db;
  color: #6b7280;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 100%);
  border-left: 4px solid #10b981;
  border-radius: 8px;
}

.location-icon {
  font-size: 24px;
}

.location-details strong {
  font-weight: 700;
  color: #065f46;
  display: block;
  margin-bottom: 4px;
}

.location-details p {
  font-size: 13px;
  color: #047857;
  margin: 0;
  font-family: monospace;
}

.location-prompt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  text-align: center;
  justify-content: center;
}

.prompt-icon {
  font-size: 24px;
}

.location-prompt p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* Form Groups */
.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.required {
  color: #ef4444;
}

.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  background: white;
  transition: all 0.2s;
}

.form-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s;
}

.form-textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.char-count {
  font-size: 12px;
  color: #6b7280;
  display: block;
  text-align: right;
  margin-top: 4px;
}

/* Severity Buttons */
.severity-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.severity-btn {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.severity-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.severity-btn.active.critical {
  background: #dc2626;
  border-color: #dc2626;
  color: white;
}

.severity-btn.active.high {
  background: #ea580c;
  border-color: #ea580c;
  color: white;
}

.severity-btn.active.medium {
  background: #f59e0b;
  border-color: #f59e0b;
  color: white;
}

.severity-btn.active.low {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

/* Checkbox */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Review Section */
.review-section {
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.review-item {
  margin-bottom: 16px;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item strong {
  display: block;
  font-weight: 700;
  color: #374151;
  margin-bottom: 4px;
}

.review-item p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.severity-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
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

/* Emergency Info */
.emergency-info {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(220, 38, 38, 0.02) 100%);
  border: 2px solid #dc2626;
  border-radius: 12px;
  padding: 20px;
}

.emergency-title {
  font-size: 16px;
  font-weight: 700;
  color: #dc2626;
  margin: 0 0 16px 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
}

.contact-icon {
  font-size: 24px;
}

.contact-item strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 4px;
}

.contact-number {
  font-size: 18px;
  font-weight: 800;
  color: #dc2626;
  text-decoration: none;
}

.contact-number:hover {
  text-decoration: underline;
}

.emergency-note {
  font-size: 12px;
  color: #7f1d1d;
  margin: 0;
  line-height: 1.6;
}

/* Messages */
.error-message,
.success-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
}

.error-message {
  background: #fee2e2;
  color: #991b1b;
  border: 2px solid #ef4444;
}

.success-message {
  background: #d1fae5;
  color: #065f46;
  border: 2px solid #10b981;
}

.error-icon,
.success-icon {
  font-size: 20px;
}

/* Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 2px solid #e5e7eb;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-primary {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.btn-submit {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .modal-container {
  transform: scale(0.9) translateY(-20px);
}

.modal-fade-leave-to .modal-container {
  transform: scale(0.9) translateY(20px);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-container {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .report-map {
    height: 300px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .severity-buttons {
    grid-template-columns: 1fr;
  }

  .step-indicator {
    gap: 8px;
  }

  .step-divider {
    width: 40px;
  }

  .step-label {
    font-size: 10px;
  }

  .modal-footer {
    flex-direction: column-reverse;
  }

  .btn {
    width: 100%;
  }
}
</style>
