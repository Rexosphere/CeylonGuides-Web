import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for detecting online/offline status
 * Used to provide offline mode functionality for emergency page
 */
export function useOfflineMode() {
    const isOffline = ref(false)
    const wasOffline = ref(false)

    function updateOnlineStatus() {
        const offline = !navigator.onLine
        if (offline && !isOffline.value) {
            wasOffline.value = true
        }
        isOffline.value = offline
    }

    onMounted(() => {
        // Check initial status
        updateOnlineStatus()

        // Listen for online/offline events
        window.addEventListener('online', updateOnlineStatus)
        window.addEventListener('offline', updateOnlineStatus)
    })

    onUnmounted(() => {
        window.removeEventListener('online', updateOnlineStatus)
        window.removeEventListener('offline', updateOnlineStatus)
    })

    return {
        isOffline,
        wasOffline
    }
}
