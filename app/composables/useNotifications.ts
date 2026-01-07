import { ref } from 'vue'

export interface Notification {
    id: number
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    visible: boolean
}

const notifications = ref<Notification[]>([])

export function useNotifications() {
    const show = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration = 3000) => {
        const id = Date.now()
        const notification: Notification = {
            id,
            message,
            type,
            visible: true
        }

        notifications.value.push(notification)

        if (duration > 0) {
            setTimeout(() => {
                remove(id)
            }, duration)
        }

        return id
    }

    const remove = (id: number) => {
        const index = notifications.value.findIndex(n => n.id === id)
        if (index > -1 && notifications.value[index]) {
            notifications.value[index].visible = false
            // Wait for exit animation
            setTimeout(() => {
                const removeIndex = notifications.value.findIndex(n => n.id === id)
                if (removeIndex > -1) {
                    notifications.value.splice(removeIndex, 1)
                }
            }, 300)
        }
    }

    return {
        notifications,
        show,
        remove
    }
}
