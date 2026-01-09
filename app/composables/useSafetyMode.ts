/**
 * Global Safety Mode Composable
 * Manages Safety Mode state across the entire application
 */

import { ref, computed, watch } from 'vue'

// Global state - persists across component instances
const STORAGE_KEY = 'ceylonguides-safety-mode'
const isSafetyModeEnabled = ref(false)
const isInitialized = ref(false)

export function useSafetyMode() {
    // Initialize from localStorage on first use
    if (!isInitialized.value && typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored !== null) {
            isSafetyModeEnabled.value = stored === 'true'
        }
        isInitialized.value = true
    }

    // Watch for changes and persist to localStorage
    watch(isSafetyModeEnabled, (newValue) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, String(newValue))

            // Apply global CSS class for reduced animations
            if (newValue) {
                document.documentElement.classList.add('safety-mode')
            } else {
                document.documentElement.classList.remove('safety-mode')
            }
        }
    }, { immediate: true })

    // Toggle safety mode
    const toggleSafetyMode = () => {
        isSafetyModeEnabled.value = !isSafetyModeEnabled.value
    }

    // Enable safety mode
    const enableSafetyMode = () => {
        isSafetyModeEnabled.value = true
    }

    // Disable safety mode
    const disableSafetyMode = () => {
        isSafetyModeEnabled.value = false
    }

    // Computed property for UI classes when safety mode is on
    const safetyModeClasses = computed(() => ({
        'safety-mode-active': isSafetyModeEnabled.value,
        'reduce-motion': isSafetyModeEnabled.value,
    }))

    // Button size multiplier when safety mode is on
    const buttonSizeMultiplier = computed(() => isSafetyModeEnabled.value ? 1.25 : 1)

    // Check if we should reduce animations
    const shouldReduceAnimations = computed(() => isSafetyModeEnabled.value)

    // Emergency-focused layout flag
    const isEmergencyFocused = computed(() => isSafetyModeEnabled.value)

    return {
        // State
        isSafetyModeEnabled,
        isInitialized,

        // Actions
        toggleSafetyMode,
        enableSafetyMode,
        disableSafetyMode,

        // Computed helpers
        safetyModeClasses,
        buttonSizeMultiplier,
        shouldReduceAnimations,
        isEmergencyFocused,
    }
}
