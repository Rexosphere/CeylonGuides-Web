/**
 * Tap-to-Call Composable
 * Handles phone calling with mobile/desktop differentiation
 */

import { ref, computed } from 'vue'

export interface CallTarget {
    name: string
    primaryNumber: string
    secondaryNumber?: string
    category?: string
}

export interface CallModalState {
    isOpen: boolean
    target: CallTarget | null
    showSecondary: boolean
}

export function useTapToCall() {
    const modalState = ref<CallModalState>({
        isOpen: false,
        target: null,
        showSecondary: false,
    })

    const isCallingNumber = ref<string | null>(null)
    const longPressTimer = ref<ReturnType<typeof setTimeout> | null>(null)
    const longPressTriggered = ref(false)

    // Detect if device is mobile
    const isMobile = computed(() => {
        if (typeof window === 'undefined') return false
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0)
    })

    // Trigger visual feedback
    const triggerCallFeedback = (number: string) => {
        isCallingNumber.value = number
        setTimeout(() => {
            isCallingNumber.value = null
        }, 800)
    }

    // Initiate the actual phone call
    const initiateCall = (number: string) => {
        triggerCallFeedback(number)
        // Small delay for visual feedback before navigation
        setTimeout(() => {
            window.location.href = `tel:${number}`
        }, 150)
    }

    // Handle tap/click on emergency card
    const handleTap = (target: CallTarget) => {
        if (isMobile.value) {
            // Mobile: Immediately dial primary number
            initiateCall(target.primaryNumber)
        } else {
            // Desktop: Show confirmation modal
            modalState.value = {
                isOpen: true,
                target,
                showSecondary: false,
            }
        }
    }

    // Handle long press start (mobile) for secondary number
    const handleLongPressStart = (target: CallTarget) => {
        if (!target.secondaryNumber) return

        longPressTriggered.value = false
        longPressTimer.value = setTimeout(() => {
            longPressTriggered.value = true
            // Show secondary number option
            modalState.value = {
                isOpen: true,
                target,
                showSecondary: true,
            }
        }, 500) // 500ms long press threshold
    }

    // Handle long press end
    const handleLongPressEnd = (target: CallTarget) => {
        if (longPressTimer.value) {
            clearTimeout(longPressTimer.value)
            longPressTimer.value = null
        }

        // If long press wasn't triggered, handle as normal tap
        if (!longPressTriggered.value && !modalState.value.isOpen) {
            handleTap(target)
        }
    }

    // Cancel long press (e.g., on scroll)
    const cancelLongPress = () => {
        if (longPressTimer.value) {
            clearTimeout(longPressTimer.value)
            longPressTimer.value = null
        }
        longPressTriggered.value = false
    }

    // Confirm call from modal
    const confirmCall = (number: string) => {
        closeModal()
        initiateCall(number)
    }

    // Close the modal
    const closeModal = () => {
        modalState.value = {
            isOpen: false,
            target: null,
            showSecondary: false,
        }
    }

    // Toggle secondary number dropdown (desktop)
    const toggleSecondaryDropdown = () => {
        modalState.value.showSecondary = !modalState.value.showSecondary
    }

    return {
        // State
        modalState,
        isCallingNumber,
        isMobile,

        // Actions
        handleTap,
        handleLongPressStart,
        handleLongPressEnd,
        cancelLongPress,
        confirmCall,
        closeModal,
        toggleSecondaryDropdown,
        initiateCall,
    }
}
