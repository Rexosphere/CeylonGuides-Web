import { ref, onMounted, onUnmounted } from 'vue'

export function useNetwork() {
    const isOnline = ref(true)

    function updateStatus() {
        if (typeof navigator !== 'undefined') {
            isOnline.value = navigator.onLine
        }
    }

    onMounted(() => {
        if (typeof window !== 'undefined') {
            updateStatus()
            window.addEventListener('online', updateStatus)
            window.addEventListener('offline', updateStatus)
        }
    })

    onUnmounted(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('online', updateStatus)
            window.removeEventListener('offline', updateStatus)
        }
    })

    return {
        isOnline
    }
}
