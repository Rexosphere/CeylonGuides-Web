/**
 * Structured Money & Currency Data for Sri Lanka
 * Source: currency.md
 */

// ============================================================================
// TYPES
// ============================================================================

export interface CurrencyRate {
    code: string
    name: string
    country: string
    midMarketApprox: number
    bankBuyApprox: number
    color: string // Tailwind color class prefix (e.g., 'blue', 'indigo', 'purple')
}

export interface BudgetPreset {
    id: string
    name: string
    description: string
    icon: string // Material Symbol name
    usdMin: number
    usdMax: number | null // null means "X+"
    lkrApprox: number
    color: string
    popular?: boolean
}

export interface TippingGuideItem {
    id: string
    category: string
    icon: string
    description: string
    amountLKR?: string
    amountPercent?: string
}

export interface ATMGuidance {
    trustedBanks: string[]
    withdrawalLimitNotes: string
    feeNotes: string
    tips: string[]
}

export interface ScamCallout {
    id: string
    title: string
    summary: string
    linkTarget: string
}

// ============================================================================
// STATIC FALLBACK RATES (from currency.md)
// ============================================================================

export const staticFallbackRates: CurrencyRate[] = [
    {
        code: 'USD',
        name: 'US Dollar',
        country: 'United States',
        midMarketApprox: 310,
        bankBuyApprox: 306,
        color: 'blue'
    },
    {
        code: 'EUR',
        name: 'Euro',
        country: 'European Union',
        midMarketApprox: 362,
        bankBuyApprox: 353,
        color: 'indigo'
    },
    {
        code: 'GBP',
        name: 'British Pound',
        country: 'United Kingdom',
        midMarketApprox: 417,
        bankBuyApprox: 408,
        color: 'purple'
    }
]

// ============================================================================
// BUDGET PRESETS (from currency.md)
// ============================================================================

export const budgetPresets: BudgetPreset[] = [
    {
        id: 'backpacker',
        name: 'Backpacker',
        description: 'Hostels, buses, street food',
        icon: 'backpack',
        usdMin: 20,
        usdMax: 30,
        lkrApprox: 6700,
        color: 'green'
    },
    {
        id: 'comfort',
        name: 'Comfort Traveler',
        description: 'Guesthouses, trains, restaurants',
        icon: 'hiking',
        usdMin: 50,
        usdMax: 80,
        lkrApprox: 18500,
        color: 'orange',
        popular: true
    },
    {
        id: 'luxury',
        name: 'Luxury',
        description: 'Resorts, private car, fine dining',
        icon: 'diamond',
        usdMin: 180,
        usdMax: null,
        lkrApprox: 55000,
        color: 'purple'
    }
]

// ============================================================================
// TIPPING GUIDE (from currency.md)
// ============================================================================

export const tippingGuide: TippingGuideItem[] = [
    {
        id: 'restaurants',
        category: 'Restaurants',
        icon: 'restaurant',
        description: 'Check for 10% service charge on the bill. If not included, 5–10% is customary. At small eateries, ₨100–150 is appreciated.',
        amountPercent: '5-10%'
    },
    {
        id: 'drivers_guides',
        category: 'Drivers & Guides',
        icon: 'directions_car',
        description: 'Round up taxi fares or add ₨100–200 per ride. For day tours, ₨500–1,000 per person. Safari guides may receive ₨1,000–2,500.',
        amountLKR: '₨500-1,000'
    },
    {
        id: 'hotel_staff',
        category: 'Hotel Staff',
        icon: 'room_service',
        description: 'Porters: ₨200–300 per bag. Housekeeping: ₨200–300 per day. Concierge: ₨500–1,000 for special help.',
        amountLKR: '₨200-300'
    },
    {
        id: 'temples',
        category: 'Temples',
        icon: 'temple_buddhist',
        description: 'Donations in LKR are customary. Drop a few hundred rupees into donation boxes or offer to a monk/attendant.',
        amountLKR: 'Voluntary'
    }
]

// ============================================================================
// ATM GUIDANCE (from currency.md)
// ============================================================================

export const atmGuidance: ATMGuidance = {
    trustedBanks: [
        'Commercial Bank',
        'Sampath Bank',
        'Hatton National Bank (HNB)',
        'Bank of Ceylon (BOC)'
    ],
    withdrawalLimitNotes: 'Daily withdrawal limits vary: typically ₨40,000–100,000 per transaction. Many banks allow ₨100,000+ per day. Confirm with your card issuer.',
    feeNotes: 'ATMs typically charge up to ₨1,000 per withdrawal. Some BOC machines may be fee-free. Your home bank may also charge currency conversion fees.',
    tips: [
        'Use ATMs with official LankaPay logos',
        'Inform your bank of travel plans to avoid blockages',
        'Use ATMs during banking hours if possible',
        'Never use unauthorized money changers'
    ]
}

// ============================================================================
// SCAM CALLOUTS (from currency.md)
// ============================================================================

export const scamCallouts: ScamCallout[] = [
    {
        id: 'tuktuk-overcharge',
        title: 'Tuk-tuk Driver Tricks',
        summary: 'Drivers may refuse to use meters or quote inflated fares. Someone may lure you claiming a "festival" while a driver without a meter appears demanding high payment.',
        linkTarget: '/scam-alerts#transport'
    },
    {
        id: 'closed-attraction',
        title: 'Closed Attraction Scam',
        summary: 'A driver or "guide" claims a temple or museum is closed, then offers an alternate tour to gem shops or restaurants where they earn commissions.',
        linkTarget: '/scam-alerts#tourist-traps'
    },
    {
        id: 'gem-spice-shops',
        title: 'Gem & Spice Shop Scams',
        summary: 'Tuk-tuk drivers detour to spice gardens or gem shops for commission. You may be pressured to buy overpriced or fake goods.',
        linkTarget: '/scam-alerts#shopping'
    },
    {
        id: 'pickpocket-distraction',
        title: 'Pickpocket Distractions',
        summary: 'The "bird-poop" scam: someone smears a fake stain on you, then a helper cleans it while stealing valuables. Keep belongings secure in crowds.',
        linkTarget: '/scam-alerts#theft'
    }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getFallbackRate(currencyCode: string): CurrencyRate | undefined {
    return staticFallbackRates.find(r => r.code === currencyCode)
}

export function formatBudgetRange(preset: BudgetPreset): string {
    if (preset.usdMax === null) {
        return `$${preset.usdMin}+`
    }
    return `$${preset.usdMin} - $${preset.usdMax}`
}

export function formatLKR(amount: number): string {
    return `~₨${amount.toLocaleString()}`
}
