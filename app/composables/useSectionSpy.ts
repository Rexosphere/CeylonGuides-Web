/**
 * useSectionSpy Composable
 * 
 * Tracks which section is currently visible in the viewport and updates
 * the active section accordingly. Uses IntersectionObserver for performance.
 */

import { ref, onMounted, onBeforeUnmount, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export interface SectionSpyOptions {
    /** Section IDs to observe */
    sectionIds: string[]
    /** Offset from top (for sticky headers) */
    offset?: number
    /** Update URL hash when section changes */
    updateHash?: boolean
    /** Root margin for IntersectionObserver */
    rootMargin?: string
    /** Threshold for IntersectionObserver */
    threshold?: number | number[]
}

export function useSectionSpy(options: SectionSpyOptions) {
    const {
        sectionIds,
        offset = 100,
        updateHash = true,
        rootMargin = '-20% 0px -70% 0px',
        threshold = 0
    } = options

    const activeSection = ref<string>(sectionIds[0] || '')
    const isScrolling = ref(false)

    const route = useRoute()
    const router = useRouter()

    let observer: IntersectionObserver | null = null
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null

    // Track which sections are currently intersecting
    const intersectingSections = new Map<string, number>()

    function initObserver() {
        if (typeof window === 'undefined') return

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id
                    if (entry.isIntersecting) {
                        // Store the intersection ratio
                        intersectingSections.set(id, entry.intersectionRatio)
                    } else {
                        intersectingSections.delete(id)
                    }
                })

                // Find the most visible section
                if (!isScrolling.value && intersectingSections.size > 0) {
                    let maxRatio = 0
                    let mostVisible = activeSection.value

                    // Prefer sections higher in the viewport order
                    for (const id of sectionIds) {
                        if (intersectingSections.has(id)) {
                            const ratio = intersectingSections.get(id) || 0
                            if (ratio > maxRatio || (ratio === maxRatio && sectionIds.indexOf(id) < sectionIds.indexOf(mostVisible))) {
                                maxRatio = ratio
                                mostVisible = id
                            }
                        }
                    }

                    if (mostVisible && mostVisible !== activeSection.value) {
                        activeSection.value = mostVisible

                        // Update URL hash without scrolling
                        if (updateHash) {
                            const newHash = `#${mostVisible}`
                            if (route.hash !== newHash) {
                                router.replace({ hash: newHash, force: true })
                            }
                        }
                    }
                }
            },
            {
                rootMargin,
                threshold: typeof threshold === 'number'
                    ? [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
                    : threshold
            }
        )

        // Observe all sections
        sectionIds.forEach((id) => {
            const element = document.getElementById(id)
            if (element) {
                observer?.observe(element)
            }
        })
    }

    function scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId)
        if (!element) return

        isScrolling.value = true
        activeSection.value = sectionId

        // Calculate scroll position with offset
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - offset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })

        // Update URL hash
        if (updateHash) {
            router.push({ hash: `#${sectionId}` })
        }

        // Reset scrolling flag after animation completes
        if (scrollTimeout) clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
            isScrolling.value = false
        }, 1000)
    }

    function setActiveFromHash() {
        const hash = route.hash?.replace('#', '')
        if (hash && sectionIds.includes(hash)) {
            activeSection.value = hash
            // Scroll to section on initial load
            setTimeout(() => scrollToSection(hash), 100)
        }
    }

    // Watch for hash changes from external navigation
    watch(() => route.hash, (newHash) => {
        if (!isScrolling.value && newHash) {
            const id = newHash.replace('#', '')
            if (sectionIds.includes(id) && activeSection.value !== id) {
                scrollToSection(id)
            }
        }
    })

    onMounted(() => {
        initObserver()
        setActiveFromHash()
    })

    onBeforeUnmount(() => {
        if (observer) {
            observer.disconnect()
            observer = null
        }
        if (scrollTimeout) {
            clearTimeout(scrollTimeout)
        }
    })

    return {
        activeSection,
        scrollToSection,
        isScrolling
    }
}

export default useSectionSpy
