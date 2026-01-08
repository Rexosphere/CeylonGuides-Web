import { ref, computed } from 'vue'
import { staticFallbackRates } from '~/data/moneyData'

// Build fallback rates map from structured data
const FALLBACK_RATES: Record<string, number> = {
    ...Object.fromEntries(staticFallbackRates.map(r => [r.code, r.midMarketApprox])),
    // Additional currencies not in the main display
    AUD: 200,
    INR: 3.7,
    JPY: 2.1,
    CAD: 225,
    SGD: 230,
    CHF: 355,
    CNY: 43,
}

interface CurrencyCache {
    rates: Record<string, number>
    previousRates: Record<string, number> // For computing % change
    timestamp: number
}

interface ExchangeRateApiResponse {
    result: string
    base_code: string
    rates: Record<string, number>
}

type RateStatus = 'live' | 'stale' | 'estimated'

const CACHE_KEY = 'ceylon_currency_cache'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

// Shared state across components
const rates = ref<Record<string, number>>({})
const previousRates = ref<Record<string, number>>({})
const loading = ref(false)
const error = ref<string | null>(null)
const lastUpdated = ref<Date | null>(null)
const rateStatus = ref<RateStatus>('estimated')
const isOffline = ref(false)
let fetchPromise: Promise<void> | null = null

// Detect offline status
if (typeof window !== 'undefined') {
    isOffline.value = !navigator.onLine
    window.addEventListener('online', () => {
        isOffline.value = false
        // Try to fetch fresh rates when coming back online
        if (rateStatus.value !== 'live') {
            fetchRates(true)
        }
    })
    window.addEventListener('offline', () => {
        isOffline.value = true
    })
}

function loadFromCache(): CurrencyCache | null {
    if (typeof window === 'undefined') return null

    try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (!cached) return null
        return JSON.parse(cached) as CurrencyCache
    } catch {
        return null
    }
}

function saveToCache(ratesData: Record<string, number>, prevRates: Record<string, number>) {
    if (typeof window === 'undefined') return

    const cache: CurrencyCache = {
        rates: ratesData,
        previousRates: prevRates,
        timestamp: Date.now()
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
}

function isCacheValid(cache: CurrencyCache): boolean {
    const age = Date.now() - cache.timestamp
    return age < CACHE_TTL
}

async function fetchLiveRates(): Promise<Record<string, number> | null> {
    try {
        // ExchangeRate-API free "open access" endpoint - no key required
        const response = await $fetch<ExchangeRateApiResponse>(
            'https://open.er-api.com/v6/latest/USD'
        )

        if (response.result !== 'success' || !response.rates) {
            return null
        }

        // Convert to "how many LKR per 1 unit of currency"
        const lkrRate = response.rates.LKR
        // Use 309.80 as hardcoded fallback (current USD rate)
        const lkrPerUsd: number = typeof lkrRate === 'number' ? lkrRate : 309.80
        const convertedRates: Record<string, number> = {}

        for (const [currency, rateToUsd] of Object.entries(response.rates)) {
            if (currency === 'LKR') continue
            // If 1 USD = X currency, then 1 currency = 1/X USD
            // And 1 currency = (1/X) * lkrPerUsd LKR
            convertedRates[currency] = lkrPerUsd / rateToUsd
        }

        return convertedRates
    } catch (e) {
        console.warn('Failed to fetch live exchange rates:', e)
        return null
    }
}

async function fetchRates(force = false) {
    // Return existing promise if fetch in progress
    if (fetchPromise && !force) {
        return fetchPromise
    }

    const cached = loadFromCache()

    // Check if cache is valid
    if (!force && cached && isCacheValid(cached)) {
        rates.value = cached.rates
        previousRates.value = cached.previousRates
        lastUpdated.value = new Date(cached.timestamp)
        rateStatus.value = 'live'
        return
    }

    loading.value = true
    error.value = null

    fetchPromise = (async () => {
        try {
            const liveRates = await fetchLiveRates()

            if (liveRates && Object.keys(liveRates).length > 0) {
                // Store current rates as previous before updating
                const prevRates = Object.keys(rates.value).length > 0
                    ? { ...rates.value }
                    : cached?.rates || { ...FALLBACK_RATES }

                previousRates.value = prevRates
                rates.value = liveRates
                lastUpdated.value = new Date()
                rateStatus.value = 'live'
                saveToCache(liveRates, prevRates)
            } else if (cached) {
                // Use stale cache if available
                rates.value = cached.rates
                previousRates.value = cached.previousRates
                lastUpdated.value = new Date(cached.timestamp)
                rateStatus.value = 'stale'
                error.value = 'Using stale cached rates'
            } else {
                // Use estimated fallback values
                rates.value = { ...FALLBACK_RATES }
                previousRates.value = { ...FALLBACK_RATES }
                lastUpdated.value = null
                rateStatus.value = 'estimated'
                error.value = 'Using estimated rates'
            }
        } catch (e) {
            if (cached) {
                rates.value = cached.rates
                previousRates.value = cached.previousRates
                lastUpdated.value = new Date(cached.timestamp)
                rateStatus.value = 'stale'
                error.value = 'Using stale cached rates'
            } else {
                rates.value = { ...FALLBACK_RATES }
                previousRates.value = { ...FALLBACK_RATES }
                lastUpdated.value = null
                rateStatus.value = 'estimated'
                error.value = 'Using estimated rates'
            }
        } finally {
            loading.value = false
            fetchPromise = null
        }
    })()

    return fetchPromise
}

function convert(amount: number, fromCurrency: string, toCurrency: string = 'LKR'): number {
    if (toCurrency === 'LKR') {
        const rate = rates.value[fromCurrency] || FALLBACK_RATES[fromCurrency] || 0
        return amount * rate
    } else if (fromCurrency === 'LKR') {
        const rate = rates.value[toCurrency] || FALLBACK_RATES[toCurrency] || 1
        return amount / rate
    }
    const lkrAmount = convert(amount, fromCurrency, 'LKR')
    return convert(lkrAmount, 'LKR', toCurrency)
}

function getRate(currency: string): number {
    return rates.value[currency] || FALLBACK_RATES[currency] || 0
}

// Compute % change from previous cached rate
function getPercentChange(currency: string): number {
    const current = rates.value[currency]
    const previous = previousRates.value[currency]

    if (!current || !previous || previous === 0) return 0
    return ((current - previous) / previous) * 100
}

export function useCurrency() {
    // Initialize on first use
    if (Object.keys(rates.value).length === 0 && !loading.value) {
        fetchRates()
    }

    const minutesAgo = computed(() => {
        if (!lastUpdated.value) return null
        const diff = Date.now() - lastUpdated.value.getTime()
        return Math.floor(diff / 60000)
    })

    // Check if cache needs refresh (for auto-refresh on expire)
    const needsRefresh = computed(() => {
        if (!lastUpdated.value) return true
        const age = Date.now() - lastUpdated.value.getTime()
        return age >= CACHE_TTL
    })

    // Check if we have live rates
    const isLive = computed(() => rateStatus.value === 'live')

    // Check if there's an error
    const hasError = computed(() => error.value !== null && rateStatus.value !== 'live')

    // Format last updated timestamp
    const lastUpdatedFormatted = computed(() => {
        if (!lastUpdated.value) return null
        return lastUpdated.value.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    })

    const statusLabel = computed(() => {
        if (isOffline.value) return 'Offline'
        switch (rateStatus.value) {
            case 'live': return null
            case 'stale': return 'Cached'
            case 'estimated': return 'Estimated'
        }
    })

    const currencyOptions = [
        { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
        { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
        { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
        { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
        { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
        { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
        { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
        { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
        { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
        { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    ]

    return {
        rates,
        loading,
        error,
        lastUpdated,
        lastUpdatedFormatted,
        rateStatus,
        statusLabel,
        minutesAgo,
        needsRefresh,
        isLive,
        isOffline,
        hasError,
        currencyOptions,
        fetchRates,
        convert,
        getRate,
        getPercentChange,
        FALLBACK_RATES,
        CACHE_TTL
    }
}
