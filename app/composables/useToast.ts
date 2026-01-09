import { ref } from 'vue'

const isVisible = ref(false)
const message = ref('')
const type = ref<'success' | 'info'>('success')
const timeout = ref<NodeJS.Timeout | null>(null)

export const useToast = () => {
    function showToast(msg: string, toastType: 'success' | 'info' = 'success') {
        if (timeout.value) clearTimeout(timeout.value)

        message.value = msg
        type.value = toastType
        isVisible.value = true

        timeout.value = setTimeout(() => {
            isVisible.value = false
        }, 3000)
    }

    return {
        isVisible,
        message,
        type,
        showToast
    }
}
