import { ref } from 'vue'

export interface Toast {
    id: string
    message: string
    type: 'success' | 'info' | 'warning' | 'error'
    duration?: number
}

// Global state to be shared across components
const toasts = ref<Toast[]>([])

export const useToast = () => {
    function addToast(message: string, type: Toast['type'] = 'info', duration = 3000) {
        const id = crypto.randomUUID()
        const toast: Toast = {
            id,
            message,
            type,
            duration
        }

        toasts.value.push(toast)

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id)
            }, duration)
        }

        return id
    }

    function removeToast(id: string) {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index > -1) {
            toasts.value.splice(index, 1)
        }
    }

    function success(message: string, duration?: number) {
        return addToast(message, 'success', duration)
    }

    function info(message: string, duration?: number) {
        return addToast(message, 'info', duration)
    }

    function warning(message: string, duration?: number) {
        return addToast(message, 'warning', duration)
    }

    function error(message: string, duration?: number) {
        return addToast(message, 'error', duration)
    }

    // Keep this for backward compatibility if needed, or better yet, update callers to use addToast/success/etc.
    // However, based on the errors, callers are trying to use 'showToast' from the default return?
    // Looking at the errors:
    // "Property 'showToast' does not exist on type..." was NOT one of the errors, actually the error was that properties DID NOT exist on the type that had 'showToast'.
    // The previous implementation returned { showToast, ... }.
    // I will include showToast as an alias to addToast to be safe, but the errors imply consumers want 'success', 'info', 'toasts', 'removeToast'.
    function showToast(msg: string, toastType: 'success' | 'info' = 'success') {
        addToast(msg, toastType)
    }

    return {
        toasts,
        addToast,
        removeToast,
        showToast,
        success,
        info,
        warning,
        error
    }
}
