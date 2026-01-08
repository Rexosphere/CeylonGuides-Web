<template>
  <transition name="warning-slide">
    <div v-if="show" :class="['warning-banner', `severity-${severity}`]">
      <div class="warning-content">
        <div class="warning-icon">
          <span v-if="severity === 'critical'">🚨</span>
          <span v-else-if="severity === 'high'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>
        <div class="warning-text">
          <h3 class="warning-title">{{ title }}</h3>
          <p class="warning-message">{{ message }}</p>
          <div v-if="nearbyScams.length > 0" class="nearby-scams-list">
            <p class="list-title">Nearby Scam Hotspots:</p>
            <ul>
              <li v-for="scam in nearbyScams" :key="scam.id" class="scam-item">
                <strong>{{ scam.name }}</strong>
                <span class="distance">{{ scam.distance }}</span>
              </li>
            </ul>
          </div>
        </div>
        <button class="close-btn" @click="$emit('close')" aria-label="Close warning">
          ×
        </button>
      </div>
      <div class="privacy-notice">
        <span class="privacy-icon">🔒</span>
        <span class="privacy-text">Your location is not stored and is only used to show nearby scams</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface NearbyScam {
  id: string
  name: string
  distance: string
}

defineProps<{
  show: boolean
  severity: 'critical' | 'high' | 'medium'
  title: string
  message: string
  nearbyScams: NearbyScam[]
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.warning-banner {
  position: relative;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.warning-banner.severity-critical {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(185, 28, 28, 0.95) 100%);
  border: 2px solid #dc2626;
  color: white;
}

.warning-banner.severity-high {
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.95) 0%, rgba(249, 115, 22, 0.95) 100%);
  border: 2px solid #f59e0b;
  color: white;
}

.warning-banner.severity-medium {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%);
  border: 2px solid #3b82f6;
  color: white;
}

.warning-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.warning-icon {
  font-size: 36px;
  line-height: 1;
  flex-shrink: 0;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.warning-text {
  flex: 1;
}

.warning-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: inherit;
}

.warning-message {
  font-size: 15px;
  margin: 0 0 12px 0;
  line-height: 1.5;
  opacity: 0.95;
}

.nearby-scams-list {
  margin-top: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(5px);
}

.list-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.nearby-scams-list ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.scam-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.scam-item:last-child {
  border-bottom: none;
}

.distance {
  font-size: 12px;
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.15);
  padding: 2px 8px;
  border-radius: 12px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
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
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.privacy-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
  opacity: 0.9;
}

.privacy-icon {
  font-size: 16px;
}

.privacy-text {
  line-height: 1.4;
}

/* Transition */
.warning-slide-enter-active,
.warning-slide-leave-active {
  transition: all 0.4s ease;
}

.warning-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.warning-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .warning-banner {
    padding: 16px;
  }

  .warning-icon {
    font-size: 28px;
  }

  .warning-title {
    font-size: 18px;
  }

  .warning-message {
    font-size: 14px;
  }

  .close-btn {
    top: 12px;
    right: 12px;
  }
}
</style>
