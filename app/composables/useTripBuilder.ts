import { reactive, computed, toRef } from 'vue'

// ==================== TYPES ====================

export interface Activity {
    id: string
    name: string
    destination: string
    category: string
    startTimeMinutes: number | null // minutes from midnight
    durationMinutes: number
    cost: {
        value: number | null
        type: 'perPerson' | 'perGroup' | 'fixed' | 'estimate'
        currency: string
    }
    source: 'library' | 'itinerary_template' | 'user_added'
    tags?: string[]
}

export interface Day {
    id: string
    title?: string
    locationAnchor?: string
    activities: Activity[]
    warnings: string[]
}

export interface CostSummary {
    confirmed: number
    tbd: number
    breakdown: {
        transport: number
        tickets: number
        tours: number
        accommodation: number
    }
}

export interface TripState {
    tripId: string
    startDate: string | null
    endDate: string | null
    travelersCount: number
    travelStyle: string
    days: Day[]
    costSummary: CostSummary
    metadata: {
        source: 'blank' | 'curated_itinerary'
        templateId: string | null
        lastModified: string
    }
}

interface HistoryEntry {
    state: string // JSON stringified state
    timestamp: number
}

// ==================== HELPERS ====================

const UNDO_LIMIT = 50

function generateId(): string {
    return Math.random().toString(36).substring(2, 11)
}

function createEmptyTrip(): TripState {
    return {
        tripId: generateId(),
        startDate: null,
        endDate: null,
        travelersCount: 2,
        travelStyle: '',
        days: [],
        costSummary: {
            confirmed: 0,
            tbd: 0,
            breakdown: { transport: 0, tickets: 0, tours: 0, accommodation: 0 }
        },
        metadata: {
            source: 'blank',
            templateId: null,
            lastModified: new Date().toISOString()
        }
    }
}

// Template cache for reset functionality
let templateCache: any = null

// ==================== COMPOSABLE ====================

export function useTripStore() {
    // Use Nuxt's useState for SSR-safe shared state
    const state = useState<{
        trip: TripState
        undoStack: HistoryEntry[]
        redoStack: HistoryEntry[]
        isDirty: boolean
    }>('trip-store', () => ({
        trip: createEmptyTrip(),
        undoStack: [],
        redoStack: [],
        isDirty: false
    }))

    // ==================== INTERNAL HELPERS ====================

    function cloneState(): string {
        return JSON.stringify(state.value.trip)
    }

    function saveToHistory() {
        state.value.undoStack.push({
            state: cloneState(),
            timestamp: Date.now()
        })
        if (state.value.undoStack.length > UNDO_LIMIT) {
            state.value.undoStack.shift()
        }
        state.value.redoStack = [] // Clear redo on new action
        state.value.isDirty = true
        state.value.trip.metadata.lastModified = new Date().toISOString()
    }

    function recalculateCosts() {
        const summary: CostSummary = {
            confirmed: 0,
            tbd: 0,
            breakdown: { transport: 0, tickets: 0, tours: 0, accommodation: 0 }
        }

        state.value.trip.days.forEach((day: Day) => {
            day.activities.forEach((activity: Activity) => {
                if (activity.cost.value !== null) {
                    const cost = activity.cost.type === 'perPerson'
                        ? activity.cost.value * state.value.trip.travelersCount
                        : activity.cost.value
                    summary.confirmed += cost

                    // Categorize by tags
                    if (activity.tags?.includes('transport')) {
                        summary.breakdown.transport += cost
                    } else if (activity.tags?.includes('ticket')) {
                        summary.breakdown.tickets += cost
                    } else if (activity.category === 'heritage' || activity.category === 'cultural') {
                        summary.breakdown.tickets += cost
                    } else {
                        summary.breakdown.tours += cost
                    }
                } else {
                    summary.tbd++
                }
            })
        })

        state.value.trip.costSummary = summary
    }

    // ==================== ACTIONS ====================

    function setDates(start: string, end: string) {
        saveToHistory()
        state.value.trip.startDate = start
        state.value.trip.endDate = end

        // Calculate days from date range
        if (start && end) {
            const startDate = new Date(start)
            const endDate = new Date(end)
            const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

            // Initialize days if empty
            if (state.value.trip.days.length === 0) {
                state.value.trip.days = Array.from({ length: diffDays }, (_, i) => ({
                    id: generateId(),
                    title: `Day ${i + 1}`,
                    activities: [],
                    warnings: []
                }))
            }
        }
    }

    function setTravelersCount(count: number) {
        saveToHistory()
        state.value.trip.travelersCount = Math.max(1, count)
        recalculateCosts()
    }

    function setTravelStyle(style: string) {
        saveToHistory()
        state.value.trip.travelStyle = style
    }

    function addDay() {
        saveToHistory()
        const dayNum = state.value.trip.days.length + 1
        state.value.trip.days.push({
            id: generateId(),
            title: `Day ${dayNum}`,
            activities: [],
            warnings: []
        })
    }

    function removeDay(index: number) {
        if (index < 0 || index >= state.value.trip.days.length) return
        saveToHistory()
        state.value.trip.days.splice(index, 1)
        // Renumber
        state.value.trip.days.forEach((day: Day, i: number) => {
            if (day.title?.startsWith('Day ')) {
                day.title = `Day ${i + 1}`
            }
        })
        recalculateCosts()
    }

    function reorderDay(fromIndex: number, toIndex: number) {
        if (fromIndex === toIndex) return
        saveToHistory()
        const [day] = state.value.trip.days.splice(fromIndex, 1)
        if (!day) return
        state.value.trip.days.splice(toIndex, 0, day)
        // Renumber
        state.value.trip.days.forEach((d: Day, i: number) => {
            if (d.title?.startsWith('Day ')) {
                d.title = `Day ${i + 1}`
            }
        })
    }

    function addActivity(dayIndex: number, activity: Partial<Activity>, position?: number) {
        if (dayIndex < 0 || dayIndex >= state.value.trip.days.length) return
        saveToHistory()

        const newActivity: Activity = {
            id: generateId(),
            name: activity.name || 'New Activity',
            destination: activity.destination || '',
            category: activity.category || 'activity',
            startTimeMinutes: activity.startTimeMinutes ?? null,
            durationMinutes: activity.durationMinutes || 60,
            cost: activity.cost || { value: null, type: 'estimate', currency: 'USD' },
            source: activity.source || 'user_added',
            tags: activity.tags || []
        }

        const day = state.value.trip.days[dayIndex]
        if (!day) return
        if (position !== undefined && position >= 0) {
            day.activities.splice(position, 0, newActivity)
        } else {
            day.activities.push(newActivity)
        }
        recalculateCosts()
    }

    function moveActivity(fromDayIndex: number, toDayIndex: number, activityId: string, toPosition?: number) {
        saveToHistory()
        const fromDay = state.value.trip.days[fromDayIndex]
        if (!fromDay) return
        const activityIndex = fromDay.activities.findIndex((a: Activity) => a.id === activityId)
        if (activityIndex === -1) return

        const [activity] = fromDay.activities.splice(activityIndex, 1)
        if (!activity) return
        const toDay = state.value.trip.days[toDayIndex]
        if (!toDay) return

        if (toPosition !== undefined && toPosition >= 0) {
            toDay.activities.splice(toPosition, 0, activity)
        } else {
            toDay.activities.push(activity)
        }
        recalculateCosts()
    }

    function removeActivity(dayIndex: number, activityId: string) {
        saveToHistory()
        const day = state.value.trip.days[dayIndex]
        if (!day) return
        const idx = day.activities.findIndex((a: Activity) => a.id === activityId)
        if (idx !== -1) {
            day.activities.splice(idx, 1)
            recalculateCosts()
        }
    }

    function updateActivityTime(dayIndex: number, activityId: string, startMinutes: number, durationMinutes: number) {
        saveToHistory()
        const day = state.value.trip.days[dayIndex]
        const activity = day?.activities.find((a: Activity) => a.id === activityId)
        if (activity) {
            activity.startTimeMinutes = startMinutes
            activity.durationMinutes = durationMinutes
        }
    }

    function loadTemplate(template: any) {
        saveToHistory()
        state.value.trip.tripId = generateId()
        state.value.trip.travelStyle = template.style?.[0] || ''
        state.value.trip.metadata.source = 'curated_itinerary'
        state.value.trip.metadata.templateId = template.slug || template.id

        // Convert template days
        if (template.days && Array.isArray(template.days)) {
            state.value.trip.days = template.days.map((day: any, idx: number) => ({
                id: generateId(),
                title: day.title || `Day ${idx + 1}`,
                locationAnchor: day.location,
                activities: (day.activities || []).map((act: any) => ({
                    id: generateId(),
                    name: act.name || act.activity || 'Activity',
                    destination: act.location || day.location || '',
                    category: day.focus || 'activity',
                    startTimeMinutes: parseTimeString(act.time),
                    durationMinutes: act.duration || 60,
                    cost: {
                        value: act.cost || null,
                        type: 'estimate' as const,
                        currency: 'USD'
                    },
                    source: 'itinerary_template' as const,
                    tags: []
                })),
                warnings: []
            }))
        }

        recalculateCosts()
    }

    function parseTimeString(timeStr?: string): number | null {
        if (!timeStr) return null
        const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?/i)
        if (!match) return null
        let hours = parseInt(match[1] || '0')
        const mins = parseInt(match[2] || '0')
        const period = match[3]?.toLowerCase()
        if (period === 'pm' && hours < 12) hours += 12
        if (period === 'am' && hours === 12) hours = 0
        return hours * 60 + mins
    }

    function undo() {
        const entry = state.value.undoStack.pop()
        if (!entry) return
        state.value.redoStack.push({
            state: cloneState(),
            timestamp: Date.now()
        })
        // Mutate in place to maintain reactivity
        const restoredTrip = JSON.parse(entry.state)
        Object.assign(state.value.trip, restoredTrip)
        state.value.trip.days = restoredTrip.days
    }

    function redo() {
        const entry = state.value.redoStack.pop()
        if (!entry) return
        state.value.undoStack.push({
            state: cloneState(),
            timestamp: Date.now()
        })
        // Mutate in place to maintain reactivity
        const restoredTrip = JSON.parse(entry.state)
        Object.assign(state.value.trip, restoredTrip)
        state.value.trip.days = restoredTrip.days
    }

    function resetTrip(keepDates = false) {
        saveToHistory()

        // If from a template and we have the cached template, restore it
        if (state.value.trip.metadata.source === 'curated_itinerary' && templateCache) {
            const startDate = state.value.trip.startDate
            const endDate = state.value.trip.endDate
            const travelersCount = state.value.trip.travelersCount

            // Rebuild from template
            loadTemplate(templateCache)

            // Restore user settings
            if (keepDates && startDate) {
                state.value.trip.startDate = startDate
                state.value.trip.endDate = endDate
            }
            state.value.trip.travelersCount = travelersCount
        } else {
            // Clear to empty trip but keep dates if requested
            const newTrip = createEmptyTrip()
            if (keepDates) {
                newTrip.startDate = state.value.trip.startDate
                newTrip.endDate = state.value.trip.endDate
                // Re-create days based on dates
                if (newTrip.startDate && newTrip.endDate) {
                    const start = new Date(newTrip.startDate)
                    const end = new Date(newTrip.endDate)
                    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
                    newTrip.days = Array.from({ length: diffDays }, (_, i) => ({
                        id: generateId(),
                        title: `Day ${i + 1}`,
                        activities: [],
                        warnings: []
                    }))
                }
            }
            // Mutate in place to maintain reactivity
            Object.assign(state.value.trip, newTrip)
            state.value.trip.days = newTrip.days
        }
        state.value.isDirty = false
    }

    function setTemplateCache(template: any) {
        templateCache = template
    }

    function initializeDays(count: number) {
        if (state.value.trip.days.length === 0) {
            state.value.trip.days = Array.from({ length: count }, (_, i) => ({
                id: generateId(),
                title: `Day ${i + 1}`,
                activities: [],
                warnings: []
            }))
        }
    }

    // ==================== COMPUTED ====================

    const totalActivities = computed(() => {
        return state.value.trip.days.reduce((sum: number, day: Day) => sum + day.activities.length, 0)
    })

    const totalCost = computed(() => state.value.trip.costSummary.confirmed)
    const tbdCount = computed(() => state.value.trip.costSummary.tbd)
    const costBreakdown = computed(() => state.value.trip.costSummary.breakdown)

    const canUndo = computed(() => state.value.undoStack.length > 0)
    const canRedo = computed(() => state.value.redoStack.length > 0)

    const tripDuration = computed(() => {
        if (state.value.trip.startDate && state.value.trip.endDate) {
            const start = new Date(state.value.trip.startDate)
            const end = new Date(state.value.trip.endDate)
            return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
        }
        return state.value.trip.days.length
    })

    // Get subtotal for a specific day
    const getDaySubtotal = (dayIndex: number): { confirmed: number; tbd: number } => {
        const day = state.value.trip.days[dayIndex]
        if (!day) return { confirmed: 0, tbd: 0 }

        let confirmed = 0
        let tbd = 0

        day.activities.forEach((activity: Activity) => {
            if (activity.cost.value !== null) {
                const cost = activity.cost.type === 'perPerson'
                    ? activity.cost.value * state.value.trip.travelersCount
                    : activity.cost.value
                confirmed += cost
            } else {
                tbd++
            }
        })

        return { confirmed, tbd }
    }

    return {
        // State (reactive) - now mutates in place so direct reference works
        tripState: state.value.trip,
        isDirty: computed(() => state.value.isDirty),

        // Computed
        totalActivities,
        totalCost,
        tbdCount,
        costBreakdown,
        canUndo,
        canRedo,
        tripDuration,

        // Functions
        getDaySubtotal,

        // Actions
        setDates,
        setTravelersCount,
        setTravelStyle,
        addDay,
        removeDay,
        reorderDay,
        addActivity,
        moveActivity,
        removeActivity,
        updateActivityTime,
        loadTemplate,
        setTemplateCache,
        undo,
        redo,
        resetTrip,
        initializeDays
    }
}

// Also export the old name for backward compatibility
export const useTripBuilder = useTripStore
