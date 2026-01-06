import { onMounted, onUnmounted, watch, type Ref } from 'vue'

/**
 * Composable for managing modal behavior including:
 * - Escape key to close
 * - Click outside to close
 * - Focus trap (keeps focus within modal)
 * - Prevent body scroll when open
 */
export function useModal(
    isOpen: Ref<boolean>,
    onClose: () => void,
    options: { trapFocus?: boolean; preventScroll?: boolean } = {}
) {
    const { trapFocus = true, preventScroll = true } = options

    let previouslyFocused: HTMLElement | null = null
    let focusableElements: HTMLElement[] = []
    let modalElement: HTMLElement | null = null

    function handleKeydown(e: KeyboardEvent) {
        if (!isOpen.value) return

        // Escape to close
        if (e.key === 'Escape') {
            e.preventDefault()
            onClose()
            return
        }

        // Tab trap
        if (trapFocus && e.key === 'Tab') {
            if (focusableElements.length === 0) return

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault()
                lastElement?.focus()
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault()
                firstElement?.focus()
            }
        }
    }

    function updateFocusableElements() {
        if (!modalElement) return

        const selectors = [
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])'
        ].join(',')

        focusableElements = Array.from(
            modalElement.querySelectorAll<HTMLElement>(selectors)
        )
    }

    function setModalElement(el: HTMLElement | null) {
        modalElement = el
        if (el) {
            updateFocusableElements()
            // Focus first focusable element
            const firstEl = focusableElements[0]
            if (firstEl) {
                firstEl.focus()
            }
        }
    }

    watch(isOpen, (newVal) => {
        if (newVal) {
            previouslyFocused = document.activeElement as HTMLElement

            if (preventScroll) {
                document.body.style.overflow = 'hidden'
            }

            document.addEventListener('keydown', handleKeydown)
        } else {
            if (preventScroll) {
                document.body.style.overflow = ''
            }

            document.removeEventListener('keydown', handleKeydown)

            // Restore focus
            previouslyFocused?.focus()
        }
    })

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeydown)
        if (preventScroll) {
            document.body.style.overflow = ''
        }
    })

    return {
        setModalElement,
        updateFocusableElements
    }
}
