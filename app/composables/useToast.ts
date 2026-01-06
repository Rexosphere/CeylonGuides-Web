import { ref } from 'vue'

export interface Toast {
    id: string
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    duration?: number
}

const toasts = ref<Toast[]>([])

export function useToast() {
    function addToast(toast: Omit<Toast, 'id'>) {
        const id = Math.random().toString(36).slice(2)
        const newToast: Toast = { id, ...toast }
        toasts.value.push(newToast)

        const duration = toast.duration ?? 3000
        setTimeout(() => {
            removeToast(id)
        }, duration)
    }

    function removeToast(id: string) {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    function success(message: string, duration?: number) {
        addToast({ message, type: 'success', duration })
    }

    function error(message: string, duration?: number) {
        addToast({ message, type: 'error', duration })
    }

    function warning(message: string, duration?: number) {
        addToast({ message, type: 'warning', duration })
    }

    function info(message: string, duration?: number) {
        addToast({ message, type: 'info', duration })
    }

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info
    }
}
