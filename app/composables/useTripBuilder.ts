import { reactive, computed, toRefs } from 'vue'

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

// ==================== GLOBAL STATE ====================

const UNDO_LIMIT = 50

const createEmptyTrip = (): TripState => ({
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
})

// Global reactive state - persists across navigation
const state = reactive<{
    trip: TripState
    undoStack: HistoryEntry[]
    redoStack: HistoryEntry[]
    isDirty: boolean
}>({
    trip: createEmptyTrip(),
    undoStack: [],
    redoStack: [],
    isDirty: false
})

// ==================== HELPERS ====================

function generateId(): string {
    return Math.random().toString(36).substring(2, 11)
}

function cloneState(): string {
    return JSON.stringify(state.trip)
}

function saveToHistory() {
    state.undoStack.push({
        state: cloneState(),
        timestamp: Date.now()
    })
    if (state.undoStack.length > UNDO_LIMIT) {
        state.undoStack.shift()
    }
    state.redoStack = [] // Clear redo on new action
    state.isDirty = true
    state.trip.metadata.lastModified = new Date().toISOString()
}

function recalculateCosts() {
    let confirmed = 0
    let tbd = 0
    const breakdown = { transport: 0, tickets: 0, tours: 0, accommodation: 0 }

    state.trip.days.forEach(day => {
        day.activities.forEach(activity => {
            if (activity.cost.value !== null) {
                const cost = activity.cost.type === 'perPerson'
                    ? activity.cost.value * state.trip.travelersCount
                    : activity.cost.value
                confirmed += cost

                // Categorize
                if (activity.category === 'transfer' || activity.category === 'transport') {
                    breakdown.transport += cost
                } else if (activity.category === 'heritage' || activity.category === 'cultural') {
                    breakdown.tickets += cost
                } else {
                    breakdown.tours += cost
                }
            } else {
                tbd++
            }
        })
    })

    state.trip.costSummary = { confirmed, tbd, breakdown }
}

// ==================== ACTIONS ====================

function setDates(startDate: string, endDate: string) {
    saveToHistory()
    state.trip.startDate = startDate
    state.trip.endDate = endDate

    // Calculate days between dates
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

    // Create empty days
    state.trip.days = Array.from({ length: diffDays }, (_, i) => ({
        id: generateId(),
        title: `Day ${i + 1}`,
        activities: [],
        warnings: []
    }))
}

function setTravelersCount(count: number) {
    if (count < 1) return
    saveToHistory()
    state.trip.travelersCount = count
    recalculateCosts()
}

function setTravelStyle(style: string) {
    saveToHistory()
    state.trip.travelStyle = style
}

function addDay(position?: number) {
    saveToHistory()
    const newDay: Day = {
        id: generateId(),
        title: `Day ${state.trip.days.length + 1}`,
        activities: [],
        warnings: []
    }
    if (position !== undefined && position >= 0 && position <= state.trip.days.length) {
        state.trip.days.splice(position, 0, newDay)
    } else {
        state.trip.days.push(newDay)
    }
    // Renumber titles
    state.trip.days.forEach((day, i) => {
        if (!day.title || day.title.startsWith('Day ')) {
            day.title = `Day ${i + 1}`
        }
    })
}

function removeDay(dayIndex: number) {
    if (state.trip.days.length <= 1) return
    saveToHistory()
    state.trip.days.splice(dayIndex, 1)
    // Renumber
    state.trip.days.forEach((day, i) => {
        if (day.title?.startsWith('Day ')) {
            day.title = `Day ${i + 1}`
        }
    })
    recalculateCosts()
}

function reorderDay(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return
    saveToHistory()
    const [day] = state.trip.days.splice(fromIndex, 1)
    state.trip.days.splice(toIndex, 0, day)
    // Renumber
    state.trip.days.forEach((d, i) => {
        if (d.title?.startsWith('Day ')) {
            d.title = `Day ${i + 1}`
        }
    })
}

function addActivity(dayIndex: number, activity: Partial<Activity>, position?: number) {
    if (dayIndex < 0 || dayIndex >= state.trip.days.length) return
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

    const day = state.trip.days[dayIndex]
    if (position !== undefined && position >= 0) {
        day.activities.splice(position, 0, newActivity)
    } else {
        day.activities.push(newActivity)
    }
    recalculateCosts()
}

function moveActivity(fromDayIndex: number, toDayIndex: number, activityId: string, toPosition?: number) {
    saveToHistory()
    const fromDay = state.trip.days[fromDayIndex]
    const activityIndex = fromDay.activities.findIndex(a => a.id === activityId)
    if (activityIndex === -1) return

    const [activity] = fromDay.activities.splice(activityIndex, 1)
    const toDay = state.trip.days[toDayIndex]

    if (toPosition !== undefined && toPosition >= 0) {
        toDay.activities.splice(toPosition, 0, activity)
    } else {
        toDay.activities.push(activity)
    }
    recalculateCosts()
}

function removeActivity(dayIndex: number, activityId: string) {
    saveToHistory()
    const day = state.trip.days[dayIndex]
    const idx = day.activities.findIndex(a => a.id === activityId)
    if (idx !== -1) {
        day.activities.splice(idx, 1)
        recalculateCosts()
    }
}

function updateActivityTime(dayIndex: number, activityId: string, startTimeMinutes: number, durationMinutes: number) {
    saveToHistory()
    const activity = state.trip.days[dayIndex]?.activities.find(a => a.id === activityId)
    if (activity) {
        activity.startTimeMinutes = startTimeMinutes
        activity.durationMinutes = durationMinutes
    }
}

function loadTemplate(template: any) {
    saveToHistory()
    state.trip.metadata.source = 'curated_itinerary'
    state.trip.metadata.templateId = template.slug
    state.trip.travelStyle = template.style?.[0] || ''

    if (template.days && template.days.length > 0) {
        state.trip.days = template.days.map((day: any, idx: number) => ({
            id: generateId(),
            title: day.title || `Day ${idx + 1}`,
            locationAnchor: day.locations?.[0],
            activities: (day.activities || []).map((act: any) => ({
                id: generateId(),
                name: act.title,
                destination: day.locations?.[0] || '',
                category: act.type || 'activity',
                startTimeMinutes: null,
                durationMinutes: parseFloat(act.duration?.replace(/[^0-9.]/g, '') || '1') * 60,
                cost: { value: null, type: 'estimate' as const, currency: 'USD' },
                source: 'itinerary_template' as const,
                tags: act.tags || []
            })),
            warnings: []
        }))
    } else {
        // Create empty days based on duration
        state.trip.days = Array.from({ length: template.durationDays || 3 }, (_, i) => ({
            id: generateId(),
            title: `Day ${i + 1}`,
            activities: [],
            warnings: []
        }))
    }
    recalculateCosts()
}

function undo() {
    if (state.undoStack.length === 0) return

    // Save current state to redo
    state.redoStack.push({ state: cloneState(), timestamp: Date.now() })

    // Restore from undo
    const entry = state.undoStack.pop()!
    state.trip = JSON.parse(entry.state)
}

function redo() {
    if (state.redoStack.length === 0) return

    // Save current to undo
    state.undoStack.push({ state: cloneState(), timestamp: Date.now() })

    // Restore from redo
    const entry = state.redoStack.pop()!
    state.trip = JSON.parse(entry.state)
}

function resetTrip(keepDates = false) {
    saveToHistory()
    const newTrip = createEmptyTrip()
    if (keepDates) {
        newTrip.startDate = state.trip.startDate
        newTrip.endDate = state.trip.endDate
    }
    state.trip = newTrip
    state.isDirty = false
}

function initializeDays(count: number) {
    if (state.trip.days.length === 0) {
        state.trip.days = Array.from({ length: count }, (_, i) => ({
            id: generateId(),
            title: `Day ${i + 1}`,
            activities: [],
            warnings: []
        }))
    }
}

// ==================== COMPOSABLE ====================

export function useTripStore() {
    // Computed values
    const totalActivities = computed(() =>
        state.trip.days.reduce((sum, day) => sum + day.activities.length, 0)
    )

    const totalCost = computed(() => state.trip.costSummary.confirmed)

    const canUndo = computed(() => state.undoStack.length > 0)
    const canRedo = computed(() => state.redoStack.length > 0)

    const tripDuration = computed(() => state.trip.days.length)

    return {
        // State (reactive)
        tripState: state.trip,
        isDirty: computed(() => state.isDirty),

        // Computed
        totalActivities,
        totalCost,
        canUndo,
        canRedo,
        tripDuration,

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
        undo,
        redo,
        resetTrip,
        initializeDays
    }
}

// Also export the old name for backward compatibility
export const useTripBuilder = useTripStore
