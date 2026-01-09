import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollObserver(options = { threshold: 0.1, rootMargin: '0px' }) {
    const observer = ref<IntersectionObserver | null>(null)

    const observe = (element: Element, callback: () => void) => {
        if (!observer.value) {
            observer.value = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callback()
                        observer.value?.unobserve(entry.target)
                    }
                })
            }, options)
        }
        observer.value.observe(element)
    }

    onUnmounted(() => {
        observer.value?.disconnect()
    })

    return {
        observe
    }
}

// Helper directive for easier usage if needed, though explicit hook usage is often cleaner in setup script.
// We can also export a specialized version that returns a ref indicating visibility.
export function useElementVisibility(options = { threshold: 0.1 }) {
    const isVisible = ref(false)
    const elementRef = ref<HTMLElement | null>(null)

    let observer: IntersectionObserver | null = null

    onMounted(() => {
        if (elementRef.value) {
            observer = new IntersectionObserver((entries) => {
                const entry = entries[0]
                if (entry && entry.isIntersecting) {
                    isVisible.value = true
                    if (elementRef.value) observer?.unobserve(elementRef.value)
                    observer?.disconnect()
                }
            }, options)
            observer.observe(elementRef.value)
        }
    })

    onUnmounted(() => {
        observer?.disconnect()
    })

    return { elementRef, isVisible }
}
