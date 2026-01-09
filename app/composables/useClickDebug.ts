export const useClickDebug = () => {
    const route = useRoute()
    const { addToast } = useToast()

    onMounted(() => {
        if (route.query.debugClicks === '1') {
            window.addEventListener('click', (e) => {
                const target = e.target as HTMLElement
                const label = target.innerText || target.tagName || 'Unknown Element'

                console.log('[ClickDebug]', {
                    tag: target.tagName,
                    text: target.innerText,
                    classes: target.className
                })

                addToast(`Clicked: ${label.substring(0, 20)}`, 'info', 2000)
            }, { capture: true }) // Capture phase to see even if stopped? Or bubble? Capture is better for debugging audits.

            addToast('Click Debug Mode Enabled', 'success')
        }
    })
}
